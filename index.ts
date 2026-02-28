/// <reference path="./global.d.ts" />
import manifestJson from "./manifest.json";
import { buildSettingsCardHtmlTemplateEvent } from "./templates/settingsCardHtmlTemplate";
import { buildSettingsCardStylesTemplateEvent } from "./templates/settingsCardStylesTemplate";
import {
  buildAlreadyRolledDiceVisualTemplateEvent,
  buildDiceSvgTemplateEvent,
  buildResultMessageTemplateEvent,
  buildRollingSvgTemplateEvent,
} from "./templates/diceResultTemplates";
import {
  buildDebugTemplateEvent,
  buildEventRollHelpTemplateEvent,
  buildPreBlockTemplateEvent,
  buildRollCommandHelpTemplateEvent,
} from "./templates/helpTemplates";
import {
  buildEventAlreadyRolledCardTemplateEvent,
  buildEventDistributionBlockTemplateEvent,
  buildEventListCardTemplateEvent,
  buildEventListItemTemplateEvent,
  buildEventRolledPrefixTemplateEvent,
  buildEventRollButtonTemplateEvent,
  buildEventRolledBlockTemplateEvent,
  buildEventRollResultCardTemplateEvent,
  buildRollsSummaryTemplateEvent,
  buildEventTimeoutAtBlockTemplateEvent,
} from "./templates/eventCardTemplates";
import type { SettingsCardTemplateIdsEvent } from "./templates/settingsCardTemplateTypes";

interface DiceResult {
  expr: string; // 原始表达式，例如 "3d6+2"
  count: number; // 骰子数量 N
  sides: number; // 面数 M
  modifier: number; // 修正值 X
  rolls: number[]; // 每次掷骰的结果
  rawTotal: number; // 掷骰总和（不含修正）
  total: number; // 最终结果（含修正）
  exploding?: boolean; // 是否启用爆骰
  explosionTriggered?: boolean; // 是否实际触发过爆骰
}

function formatModifier(mod: number): string {
  if (mod === 0) return "0";
  return mod > 0 ? `+${mod}` : `${mod}`;
}

function formatEventModifierBreakdownEvent(
  baseModifier: number,
  skillModifier: number,
  finalModifier: number
): string {
  return `${formatModifier(baseModifier)} + skill ${formatModifier(skillModifier)} = ${formatModifier(finalModifier)}`;
}

function getDiceSvg(
  value: number,
  sides: number,
  color: string,
  size?: number
): string {
  return buildDiceSvgTemplateEvent(value, sides, color, size);
}

function getRollingSvg(color: string, size?: number): string {
  return buildRollingSvgTemplateEvent(color, size);
}

function buildResultMessage(result: DiceResult): string {
  return buildResultMessageTemplateEvent(result);
}

interface STContext {
  chatMetadata: Record<string, any>;
  extensionSettings?: Record<string, any>;
  chat?: any[];
  saveMetadata(): void;
  saveSettingsDebounced?(): void;
  saveChat?(): unknown;
  saveChatConditional?(): unknown;
  saveChatDebounced?(): unknown;
  registerMacro(name: string, fn: () => string): void;

  SlashCommandParser: any;
  SlashCommand: any;
  SlashCommandArgument: any;
  SlashCommandNamedArgument: any;
  ARGUMENT_TYPE: any;

  sendSystemMessage(type: any, text: string, extra?: any): void;
  eventSource?: {
    on(eventName: string, handler: (payload: any) => void): void;
  };
  event_types?: Record<string, string>;
}

const ctx = SillyTavern.getContext() as STContext;

const {
  chatMetadata,
  saveMetadata,
  registerMacro,
  SlashCommandParser,
  SlashCommand,
  SlashCommandArgument,
  SlashCommandNamedArgument,
  ARGUMENT_TYPE,
  sendSystemMessage,
  extensionSettings,
  saveSettingsDebounced,
  eventSource,
  event_types,
} = ctx;

const MAX_DICE_COUNT = 1000;
const MAX_DICE_SIDES = 1000;
const MAX_EXPLOSION_ROLLS = 10000;



interface DiceOptions {
  adv?: boolean; // 是否优势掷骰
  dis?: boolean; // 是否劣势掷骰
  explode?: boolean; // 是否启用爆骰
  rule?: string; // 规则名称（如 coc、dnd、shadowrun）
}

// ===== 解析表达式：NdM+X / NdM-X / NdM =====

function parseDiceExpression(exprRaw: string): {
  count: number;
  sides: number;
  modifier: number;
  explode: boolean;
} {
  const expr = exprRaw.replace(/\s+/g, ""); // 去掉空格
  const regex = /^(\d*)d(\d+)(!)?([+\-]\d+)?$/i;
  const match = expr.match(regex);

  if (!match) {
    throw new Error(`无效的骰子表达式：${exprRaw}，示例：1d20、3d6+2`);
  }

  const count = Number(match[1] || 1); // 没写数量就默认 1
  const sides = Number(match[2]); // 面数
  const explode = !!match[3]; // 是否开启爆骰
  const modifier = Number(match[4] || 0);

  if (count > MAX_DICE_COUNT) {
    throw new Error(`骰子数量过大（${count}），上限为 ${MAX_DICE_COUNT}`);
  }
  if (sides > MAX_DICE_SIDES) {
    throw new Error(`骰子面数过大（${sides}），上限为 ${MAX_DICE_SIDES}`);
  }

  return { count, sides, modifier, explode };
}

// ===== 核心 =====

/**
 * 投掷一次骰子
 * @param sides 骰子面数
 * */
function rollOnce(sides: number): number {
  // 随机数算法
  const max = Math.floor(sides);
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.getRandomValues === "function"
  ) {
    const buf = new Uint32Array(1);
    const limit = Math.floor(0xffffffff / max) * max;
    let rand: number;
    do {
      crypto.getRandomValues(buf);
      rand = buf[0];
    } while (rand >= limit);
    return (rand % max) + 1;
  }
  return Math.floor(Math.random() * max) + 1;
}

function pushRollWithExplosion(
  sides: number,
  explode: boolean,
  rolls: number[]
): void {
  let value = rollOnce(sides);
  rolls.push(value);

  if (!explode) {
    return;
  }

  while (value === sides) {
    if (rolls.length >= MAX_EXPLOSION_ROLLS) {
      throw new Error(
        `爆骰次数过多，已超过安全上限 ${MAX_EXPLOSION_ROLLS} 次，请调整表达式。`
      );
    }
    value = rollOnce(sides);
    rolls.push(value);
  }
}

function rollBaseExpression(exprRaw: string): DiceResult {
  const { count, sides, modifier, explode } = parseDiceExpression(exprRaw);
  const settings = getSettingsEvent();
  const effectiveExplode = explode && settings.enableExplodingDice;
  const rolls: number[] = [];

  for (let i = 0; i < count; i++) {
    pushRollWithExplosion(sides, effectiveExplode, rolls);
  }

  const rawTotal = rolls.reduce((a, b) => a + b, 0);
  const total = rawTotal + modifier;
  const explosionTriggered = effectiveExplode && rolls.length > count;

  return {
    expr: exprRaw,
    count,
    sides,
    modifier,
    rolls,
    rawTotal,
    total,
    exploding: effectiveExplode,
    explosionTriggered,
  };
}

function rollExpression(
  exprRaw: string,
  options: DiceOptions = {}
): DiceResult {
  let result = rollBaseExpression(exprRaw);

  // 优势/劣势
  if (options.adv) {
    // adv: 2d20 取大
    const r1 = rollBaseExpression(exprRaw);
    const r2 = rollBaseExpression(exprRaw);
    result = r1.total >= r2.total ? r1 : r2;
  }

  if (options.dis) {
    const r1 = rollBaseExpression(exprRaw);
    const r2 = rollBaseExpression(exprRaw);
    result = r1.total <= r2.total ? r1 : r2;
  }
  
  // 则名处理（如 CoC）
  if (options.rule) {
    //TODO: 根据规则处理结果
  }

  return result;
}



function pushToChat(message: string) {
  if (typeof sendSystemMessage === "function") {
    try {
      sendSystemMessage("generic", message, {
        uses_system_ui: true,
        isSmallSys: true,
      });
      return;
    } catch (e) {
      console.error("[骰子插件] 发送到聊天框失败:", e);
    }
  }

  // 兜底方案：返回 message，让 ST 用默认方式处理
  return message;
}

// ===== 存储结果到宏 =====

interface DiceMeta {
  last?: DiceResult;
  lastTotal?: number;
}

function getDiceMeta(): DiceMeta {
  if (!chatMetadata.diceRoller) {
    (chatMetadata as any).diceRoller = {};
  }
  return chatMetadata.diceRoller as DiceMeta;
}

function saveLastRoll(result: DiceResult): void {
  const meta = getDiceMeta();
  meta.last = result;
  meta.lastTotal = result.total;
  saveMetadata();
}

function registerBaseMacrosAndCommandsEvent(): void {
  const globalRef = globalThis as any;

  if (!globalRef.__stRollBaseMacrosRegisteredEvent) {
    // {{lastRollTotal}}
    registerMacro("lastRollTotal", () => {
      const meta = getDiceMeta();
      if (meta.lastTotal == null) {
        return "尚未掷骰，请先使用 /roll";
      }
      return String(meta.lastTotal);
    });

    // {{lastRoll}}
    registerMacro("lastRoll", () => {
      const meta = getDiceMeta();
      if (!meta.last) {
        return "尚未掷骰，请先使用 /roll";
      }
      return JSON.stringify(meta.last, null, 2);
    });
    globalRef.__stRollBaseMacrosRegisteredEvent = true;
  }

  if (globalRef.__stRollBaseCommandRegisteredEvent) return;
  if (!SlashCommandParser || !SlashCommand || !SlashCommandArgument || !ARGUMENT_TYPE) {
    return;
  }

  // ===== 注册 /roll 命令 =====
  SlashCommandParser.addCommandObject(
    SlashCommand.fromProps({
      name: "roll",
      aliases: ["dice"],
      returns: "通用骰子：支持 NdM+X，如 3d6+2、1d20",

      namedArgumentList: [],

      unnamedArgumentList: [
        SlashCommandArgument.fromProps({
          description: "骰子表达式（例如 1d20、3d6+2）。留空则等于 1d20。",
          typeList: ARGUMENT_TYPE.STRING,
          isRequired: false,
        }),
      ],

      helpString: buildRollCommandHelpTemplateEvent(),

      callback: (_namedArgs: Record<string, any>, unnamedArgs: any) => {
        try {
          const exprRaw = (unnamedArgs ?? "").toString().trim();
          const expr = exprRaw || "1d20";

          const result = rollExpression(expr);
          saveLastRoll(result);

          const msg = buildResultMessage(result);
          const fallback = pushToChat(msg);

          return fallback ?? "";
        } catch (e: any) {
          const errMsg = `❌ 掷骰出错：${e?.message ?? String(e)}`;
          const fallback = pushToChat(errMsg);
          return fallback ?? "";
        }
      },
    })
  );

  globalRef.__stRollBaseCommandRegisteredEvent = true;
}

// ===== Event: 事件驱动骰子系统 =====
type CompareOperatorEvent = ">=" | ">" | "<=" | "<";
type EventApplyScopeSettingEvent = "protagonist_only" | "all";
type EventScopeTagEvent = "protagonist" | "all" | "character";
type EventTargetTypeEvent = "self" | "scene" | "supporting" | "object" | "other";
type EventRollModeEvent = "auto" | "manual";
type EventRollSourceEvent = "manual_roll" | "ai_auto_roll" | "timeout_auto_fail";
type SummaryDetailModeEvent = "minimal" | "balanced" | "detailed";
type SummaryEventStatusEvent = "pending" | "done" | "timeout";
type EventOutcomeKindEvent = "success" | "failure" | "explode" | "none";

interface EventOutcomesEvent {
  success?: string;
  failure?: string;
  explode?: string;
}

interface EventTimerStateEvent {
  offeredAt: number;
  deadlineAt: number | null;
  expiredAt?: number;
}

interface DicePluginSettingsEvent {
  enabled: boolean;
  autoSendRuleToAI: boolean;
  enableAiRollMode: boolean;
  enableExplodingDice: boolean;
  summaryDetailMode: SummaryDetailModeEvent;
  summaryHistoryRounds: number;
  eventApplyScope: EventApplyScopeSettingEvent;
  enableOutcomeBranches: boolean;
  enableExplodeOutcomeBranch: boolean;
  includeOutcomeInSummary: boolean;
  showOutcomePreviewInListCard: boolean;
  enableTimeLimit: boolean;
  minTimeLimitSeconds: number;
  enableSkillSystem: boolean;
  skillTableText: string;
  skillPresetStoreText: string;
  ruleText: string;
}

interface SkillEditorRowDraftEvent {
  rowId: string;
  skillName: string;
  modifierText: string;
}

interface SkillPresetEvent {
  id: string;
  name: string;
  locked: boolean;
  skillTableText: string;
  createdAt: number;
  updatedAt: number;
}

interface SkillPresetStoreEvent {
  version: 1;
  activePresetId: string;
  presets: SkillPresetEvent[];
}

interface DiceEventSpecEvent {
  id: string;
  title: string;
  checkDice: string;
  dc: number;
  compare?: CompareOperatorEvent;
  scope?: EventScopeTagEvent;
  rollMode?: EventRollModeEvent;
  skill: string;
  targetType: EventTargetTypeEvent;
  targetName?: string;
  targetLabel: string;
  timeLimit?: string;
  offeredAt?: number;
  deadlineAt?: number | null;
  timeLimitMs?: number | null;
  desc: string;
  outcomes?: EventOutcomesEvent;
}

interface EventRollRecordEvent {
  rollId: string;
  roundId: string;
  eventId: string;
  eventTitle: string;
  diceExpr: string;
  result: DiceResult;
  success: boolean | null;
  compareUsed: CompareOperatorEvent;
  dcUsed: number | null;
  skillModifierApplied: number;
  baseModifierUsed: number;
  finalModifierUsed: number;
  targetLabelUsed: string;
  rolledAt: number;
  source: EventRollSourceEvent;
  timeoutAt?: number | null;
}

interface PendingRoundEvent {
  roundId: string;
  status: "open";
  events: DiceEventSpecEvent[];
  rolls: EventRollRecordEvent[];
  eventTimers: Record<string, EventTimerStateEvent>;
  sourceAssistantMsgIds: string[];
  openedAt: number;
}

interface OutboundSummaryCacheEvent {
  userMsgId: string;
  roundId: string;
  summaryText: string;
}

interface RoundSummaryEventItemEvent {
  id: string;
  title: string;
  desc: string;
  targetLabel: string;
  skill: string;
  checkDice: string;
  compare: CompareOperatorEvent;
  dc: number;
  rollMode: EventRollModeEvent;
  timeLimit: string;
  status: SummaryEventStatusEvent;
  resultSource: EventRollSourceEvent | null;
  total: number | null;
  skillModifierApplied: number;
  baseModifierUsed: number;
  finalModifierUsed: number;
  success: boolean | null;
  outcomeKind: EventOutcomeKindEvent;
  outcomeText: string;
  explosionTriggered: boolean;
}

interface RoundSummarySnapshotEvent {
  roundId: string;
  openedAt: number;
  closedAt: number;
  eventsCount: number;
  rolledCount: number;
  events: RoundSummaryEventItemEvent[];
}

interface DiceMetaEvent {
  pendingRound?: PendingRoundEvent;
  outboundSummary?: OutboundSummaryCacheEvent;
  summaryHistory?: RoundSummarySnapshotEvent[];
  lastPromptUserMsgId?: string;
  lastProcessedAssistantMsgId?: string;
}

interface TavernMessageEvent {
  role?: string;
  is_user?: boolean;
  is_system?: boolean;
  mes?: string;
  content?: string;
  id?: string | number;
  cid?: string | number;
  uid?: string | number;
  create_date?: string | number;
  create_time?: string | number;
  timestamp?: string | number;
  [key: string]: any;
}

const MODULE_NAME_Event = "SillyTavern-Roll";
const SETTINGS_CARD_ID_Event = "st-roll-settings-Event-card";
const SETTINGS_STYLE_ID_Event = "st-roll-settings-Event-style";
const SETTINGS_BADGE_ID_Event = "st-roll-settings-Event-badge";
const SETTINGS_ENABLED_ID_Event = "st-roll-settings-Event-enabled";
const SETTINGS_RULE_ID_Event = "st-roll-settings-Event-auto-rule";
const SETTINGS_AI_ROLL_MODE_ID_Event = "st-roll-settings-Event-ai-roll-mode";
const SETTINGS_EXPLODING_ENABLED_ID_Event = "st-roll-settings-Event-exploding-enabled";
const SETTINGS_SUMMARY_DETAIL_ID_Event = "st-roll-settings-Event-summary-detail";
const SETTINGS_SUMMARY_ROUNDS_ID_Event = "st-roll-settings-Event-summary-rounds";
const SETTINGS_SCOPE_ID_Event = "st-roll-settings-Event-apply-scope";
const SETTINGS_OUTCOME_BRANCHES_ID_Event = "st-roll-settings-Event-outcome-branches";
const SETTINGS_EXPLODE_OUTCOME_ID_Event = "st-roll-settings-Event-explode-outcome";
const SETTINGS_SUMMARY_OUTCOME_ID_Event = "st-roll-settings-Event-summary-outcome";
const SETTINGS_LIST_OUTCOME_PREVIEW_ID_Event = "st-roll-settings-Event-list-outcome-preview";
const SETTINGS_TIME_LIMIT_ENABLED_ID_Event = "st-roll-settings-Event-time-limit-enabled";
const SETTINGS_TIME_LIMIT_MIN_ID_Event = "st-roll-settings-Event-time-limit-min-seconds";
const SETTINGS_TIME_LIMIT_ROW_ID_Event = "st-roll-settings-Event-time-limit-row";
const SETTINGS_SKILL_ENABLED_ID_Event = "st-roll-settings-Event-skill-enabled";
const SETTINGS_SKILL_EDITOR_WRAP_ID_Event = "st-roll-settings-Event-skill-editor-wrap";
const SETTINGS_SKILL_ROWS_ID_Event = "st-roll-settings-Event-skill-rows";
const SETTINGS_SKILL_ADD_ID_Event = "st-roll-settings-Event-skill-add";
const SETTINGS_SKILL_TEXT_ID_Event = "st-roll-settings-Event-skill-text";
const SETTINGS_SKILL_IMPORT_TOGGLE_ID_Event = "st-roll-settings-Event-skill-import-toggle";
const SETTINGS_SKILL_IMPORT_AREA_ID_Event = "st-roll-settings-Event-skill-import-area";
const SETTINGS_SKILL_IMPORT_APPLY_ID_Event = "st-roll-settings-Event-skill-import-apply";
const SETTINGS_SKILL_EXPORT_ID_Event = "st-roll-settings-Event-skill-export";
const SETTINGS_SKILL_SAVE_ID_Event = "st-roll-settings-Event-skill-save";
const SETTINGS_SKILL_RESET_ID_Event = "st-roll-settings-Event-skill-reset";
const SETTINGS_SKILL_ERRORS_ID_Event = "st-roll-settings-Event-skill-errors";
const SETTINGS_SKILL_DIRTY_HINT_ID_Event = "st-roll-settings-Event-skill-dirty-hint";
const SETTINGS_SKILL_PRESET_LAYOUT_ID_Event = "st-roll-settings-Event-skill-preset-layout";
const SETTINGS_SKILL_PRESET_SIDEBAR_ID_Event = "st-roll-settings-Event-skill-preset-sidebar";
const SETTINGS_SKILL_PRESET_LIST_ID_Event = "st-roll-settings-Event-skill-preset-list";
const SETTINGS_SKILL_PRESET_CREATE_ID_Event = "st-roll-settings-Event-skill-preset-create";
const SETTINGS_SKILL_PRESET_DELETE_ID_Event = "st-roll-settings-Event-skill-preset-delete";
const SETTINGS_SKILL_PRESET_NAME_ID_Event = "st-roll-settings-Event-skill-preset-name";
const SETTINGS_SKILL_PRESET_RENAME_ID_Event = "st-roll-settings-Event-skill-preset-rename";
const SETTINGS_SKILL_PRESET_META_ID_Event = "st-roll-settings-Event-skill-preset-meta";
const SETTINGS_SKILL_EDITOR_OPEN_ID_Event = "st-roll-settings-Event-skill-editor-open";
const SETTINGS_SKILL_MODAL_ID_Event = "st-roll-settings-Event-skill-modal";
const SETTINGS_SKILL_MODAL_CLOSE_ID_Event = "st-roll-settings-Event-skill-modal-close";
const SETTINGS_RULE_TEXT_ID_Event = "st-roll-settings-Event-rule-text";
const SETTINGS_RULE_SAVE_ID_Event = "st-roll-settings-Event-rule-save";
const SETTINGS_RULE_RESET_ID_Event = "st-roll-settings-Event-rule-reset";
const SETTINGS_SEARCH_ID_Event = "st-roll-settings-Event-search";
const SETTINGS_TAB_MAIN_ID_Event = "st-roll-settings-Event-tab-main";
const SETTINGS_TAB_SKILL_ID_Event = "st-roll-settings-Event-tab-skill";
const SETTINGS_TAB_RULE_ID_Event = "st-roll-settings-Event-tab-rule";
const SETTINGS_TAB_ABOUT_ID_Event = "st-roll-settings-Event-tab-about";
const SETTINGS_PANEL_MAIN_ID_Event = "st-roll-settings-Event-panel-main";
const SETTINGS_PANEL_SKILL_ID_Event = "st-roll-settings-Event-panel-skill";
const SETTINGS_PANEL_RULE_ID_Event = "st-roll-settings-Event-panel-rule";
const SETTINGS_PANEL_ABOUT_ID_Event = "st-roll-settings-Event-panel-about";
const manifestAny_Event = manifestJson as Record<string, any>;
const SETTINGS_BADGE_VERSION_Event =
  typeof manifestJson.version === "string" && manifestJson.version.trim().length > 0
    ? manifestJson.version.trim()
    : "unknown";
const SETTINGS_AUTHOR_TEXT_Event =
  typeof manifestAny_Event.author === "string" && manifestAny_Event.author.trim().length > 0
    ? manifestAny_Event.author.trim()
    : "Shion";
const SETTINGS_EMAIL_TEXT_Event =
  typeof manifestAny_Event.email === "string" && manifestAny_Event.email.trim().length > 0
    ? manifestAny_Event.email.trim()
    : "348591466@qq.com";
const SETTINGS_GITHUB_URL_Event =
  typeof manifestAny_Event.homepage === "string" &&
  /^https?:\/\//i.test(manifestAny_Event.homepage.trim())
    ? manifestAny_Event.homepage.trim()
    : "https://github.com/ShionCox/SillyTavern-Roll";
const SETTINGS_GITHUB_TEXT_Event = SETTINGS_GITHUB_URL_Event.replace(
  /^https?:\/\//i,
  ""
);
const DICE_RULE_BLOCK_START_Event = "[DICE_EVENT_RULES]";
const DICE_RULE_BLOCK_END_Event = "[/DICE_EVENT_RULES]";
const DICE_SUMMARY_BLOCK_START_Event = "[DICE_ROUND_SUMMARY]";
const DICE_SUMMARY_BLOCK_END_Event = "[/DICE_ROUND_SUMMARY]";
const SUMMARY_MAX_EVENTS_Event = 20;
const SUMMARY_MAX_TOTAL_EVENT_LINES_Event = 60;
const SUMMARY_HISTORY_ROUNDS_MIN_Event = 1;
const SUMMARY_HISTORY_ROUNDS_MAX_Event = 10;
const SUMMARY_HISTORY_MAX_STORED_Event = 20;
const OUTCOME_TEXT_MAX_LEN_Event = 400;
const SKILL_PRESET_STORE_VERSION_Event = 1 as const;
const SKILL_PRESET_DEFAULT_ID_Event = "skill_preset_default_general_trpg";
const SKILL_PRESET_DEFAULT_NAME_Event = "通用叙事TRPG（默认）";
const SKILL_PRESET_MIGRATION_NAME_Event = "迁移技能预设";
const SKILL_PRESET_NEW_NAME_BASE_Event = "新预设";
const DEFAULT_SKILL_PRESET_TABLE_Event: Record<string, number> = {
  察觉: 10,
  说服: 8,
  潜行: 6,
  调查: 9,
  交涉: 7,
  意志: 8,
  反应: 6,
  体能: 7,
  医疗: 5,
  知识: 8,
};
const DEFAULT_SKILL_PRESET_TABLE_TEXT_Event = JSON.stringify(DEFAULT_SKILL_PRESET_TABLE_Event, null, 2);
const ISO_8601_DURATION_REGEX_Event =
  /^P(?=\d|T\d)(\d+Y)?(\d+M)?(\d+W)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+S)?)?$/i;
const DEFAULT_RULE_TEXT_Event = `你必须严格遵循以下骰子事件协议：
1. 需要触发掷骰事件时，只在回复末尾输出一个 \`\`\`rolljson 代码块（禁止 \`\`\`json）。
2. 顶层固定结构：
{"type":"dice_events","version":"1","events":[...]}
3. events[i] 必填字段：
- id: string
- title: string
- checkDice: string（如 "1d100"、"1d20+3"、"1d6!"）
- dc: number
- skill: string（用于匹配技能系统中的技能表 key）
- desc: string
4. events[i] 可选字段：
- compare: string，仅允许 >= > <= <（默认 >=）
- scope: string，仅允许 protagonist / character / all
- rollMode: string，仅允许 auto / manual（默认 manual）
- timeLimit: string，ISO 8601 duration（例如 PT30S、PT5M）
- target: object，{ type, name? }；type 仅允许 self / scene / supporting / object / other
- outcomes: object，可包含 success / failure / explode 走向文本
5. outcomes 说明：
- outcomes.success: 判定成功走向
- outcomes.failure: 判定失败走向（超时失败也归入 failure）
- outcomes.explode: 爆骰走向（优先于 success/failure）
6. 兼容字段 successOutcome / failureOutcome / explodeOutcome 也可识别，但推荐 outcomes 对象。
7. 字段类型必须正确，尤其 checkDice 必须是字符串。
8. 正确示例：
\`\`\`rolljson
{"type":"dice_events","version":"1","events":[{"id":"observation_check","title":"察觉神情","checkDice":"1d100!","dc":60,"skill":"察觉","desc":"穗秋生试图判断你眼神中的情绪。","scope":"character","compare":">=","target":{"type":"supporting","name":"穗秋生"},"outcomes":{"success":"你成功捕捉到她语气里的迟疑。","failure":"你没读懂她的真实意图。","explode":"你突然意识到她在故意误导你。"}}]}
\`\`\`
9. 非事件叙事文本正常输出；事件信息只能放在 rolljson 代码块内。
10. DICE_ROUND_SUMMARY 是历史事件摘要，会影响后续行为，请据此保持剧情一致。`;
const DEFAULT_SETTINGS_Event: DicePluginSettingsEvent = {
  enabled: true,
  autoSendRuleToAI: true,
  enableAiRollMode: true,
  enableExplodingDice: true,
  summaryDetailMode: "minimal",
  summaryHistoryRounds: 3,
  eventApplyScope: "protagonist_only",
  enableOutcomeBranches: true,
  enableExplodeOutcomeBranch: true,
  includeOutcomeInSummary: true,
  showOutcomePreviewInListCard: true,
  enableTimeLimit: true,
  minTimeLimitSeconds: 10,
  enableSkillSystem: true,
  skillTableText: "{}",
  skillPresetStoreText: "",
  ruleText: DEFAULT_RULE_TEXT_Event,
};
const LOCAL_METADATA_FALLBACK_Event: Record<string, any> = {};
const LOCAL_SETTINGS_FALLBACK_Event: DicePluginSettingsEvent = {
  ...DEFAULT_SETTINGS_Event,
};
let SKILL_EDITOR_ROWS_DRAFT_Event: SkillEditorRowDraftEvent[] = [];
let SKILL_EDITOR_LAST_SAVED_SNAPSHOT_Event = "[]";
let SKILL_EDITOR_LAST_SETTINGS_TEXT_Event = "";
let SKILL_EDITOR_LAST_PRESET_STORE_TEXT_Event = "";
let SKILL_EDITOR_ACTIVE_PRESET_ID_Event = "";
let SKILL_EDITOR_DIRTY_Event = false;
let SKILL_EDITOR_BEFORE_UNLOAD_BOUND_Event = false;
let SKILL_EDITOR_MODAL_KEYDOWN_BOUND_Event = false;
let SKILL_EDITOR_INVALID_SETTINGS_WARNED_TEXT_Event = "";

function getLiveContextEvent(): STContext | null {
  try {
    return SillyTavern.getContext() as STContext;
  } catch {
    return null;
  }
}

function createIdEvent(prefix: string): string {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 9)}`;
}

function simpleHashEvent(input: string): string {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash).toString(36);
}

function escapeHtmlEvent(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function escapeAttrEvent(input: string): string {
  return escapeHtmlEvent(input).replace(/`/g, "&#96;");
}

function normalizeBlankLinesEvent(input: string): string {
  return input.replace(/\n{3,}/g, "\n\n").trim();
}

function getChatMetadataRootEvent(): Record<string, any> {
  const liveCtx = getLiveContextEvent();
  if (!liveCtx) return LOCAL_METADATA_FALLBACK_Event;
  if (!liveCtx.chatMetadata || typeof liveCtx.chatMetadata !== "object") {
    (liveCtx as any).chatMetadata = {};
  }
  return liveCtx.chatMetadata as Record<string, any>;
}

function getDiceMetaEvent(): DiceMetaEvent {
  const root = getChatMetadataRootEvent();
  if (!root.diceRollerEvent || typeof root.diceRollerEvent !== "object") {
    root.diceRollerEvent = {};
  }
  return root.diceRollerEvent as DiceMetaEvent;
}

function saveMetadataSafeEvent(): void {
  const liveCtx = getLiveContextEvent();
  if (typeof liveCtx?.saveMetadata === "function") {
    try {
      liveCtx.saveMetadata();
    } catch (error) {
      console.warn("[骰子插件] 保存 Event 元数据失败", error);
    }
  }
}

function saveSettingsSafeEvent(): void {
  const liveCtx = getLiveContextEvent();
  const saver = liveCtx?.saveSettingsDebounced ?? saveSettingsDebounced;
  if (typeof saver === "function") {
    try {
      saver.call(liveCtx);
    } catch (error) {
      console.warn("[骰子插件] 保存扩展设置失败", error);
    }
  }
}

function persistChatSafeEvent(): void {
  const liveCtx = getLiveContextEvent();
  const fn =
    liveCtx?.saveChat ?? liveCtx?.saveChatConditional ?? liveCtx?.saveChatDebounced;
  if (typeof fn !== "function") return;
  try {
    Promise.resolve(fn.call(liveCtx)).catch((error) => {
      console.warn("[骰子插件] 保存聊天失败", error);
    });
  } catch (error) {
    console.warn("[骰子插件] 保存聊天失败", error);
  }
}

function getSettingsEvent(): DicePluginSettingsEvent {
  const liveCtx = getLiveContextEvent();
  const allSettings = liveCtx?.extensionSettings ?? extensionSettings;
  if (!allSettings || typeof allSettings !== "object") {
    return LOCAL_SETTINGS_FALLBACK_Event;
  }
  if (!allSettings[MODULE_NAME_Event] || typeof allSettings[MODULE_NAME_Event] !== "object") {
    allSettings[MODULE_NAME_Event] = { ...DEFAULT_SETTINGS_Event };
  }
  const bucket = allSettings[MODULE_NAME_Event] as DicePluginSettingsEvent;
  bucket.enabled = bucket.enabled !== false;
  bucket.autoSendRuleToAI = bucket.autoSendRuleToAI !== false;
  bucket.enableAiRollMode = bucket.enableAiRollMode !== false;
  bucket.enableExplodingDice = bucket.enableExplodingDice !== false;
  bucket.enableOutcomeBranches = bucket.enableOutcomeBranches !== false;
  bucket.enableExplodeOutcomeBranch = bucket.enableExplodeOutcomeBranch !== false;
  bucket.includeOutcomeInSummary = bucket.includeOutcomeInSummary !== false;
  bucket.showOutcomePreviewInListCard = bucket.showOutcomePreviewInListCard !== false;
  const rawSummaryDetail = String((bucket as any).summaryDetailMode || "").toLowerCase();
  bucket.summaryDetailMode =
    rawSummaryDetail === "balanced" || rawSummaryDetail === "detailed"
      ? (rawSummaryDetail as SummaryDetailModeEvent)
      : "minimal";
  const rawSummaryRounds = Number((bucket as any).summaryHistoryRounds);
  const normalizedSummaryRounds = Number.isFinite(rawSummaryRounds)
    ? Math.floor(rawSummaryRounds)
    : DEFAULT_SETTINGS_Event.summaryHistoryRounds;
  bucket.summaryHistoryRounds = Math.min(
    SUMMARY_HISTORY_ROUNDS_MAX_Event,
    Math.max(SUMMARY_HISTORY_ROUNDS_MIN_Event, normalizedSummaryRounds)
  );
  bucket.eventApplyScope = bucket.eventApplyScope === "all" ? "all" : "protagonist_only";
  bucket.enableTimeLimit = bucket.enableTimeLimit !== false;
  const minSecondsRaw = Number(bucket.minTimeLimitSeconds);
  const minSeconds = Number.isFinite(minSecondsRaw) ? Math.floor(minSecondsRaw) : 10;
  bucket.minTimeLimitSeconds = Math.max(1, minSeconds);
  bucket.enableSkillSystem = bucket.enableSkillSystem !== false;
  bucket.skillTableText =
    typeof bucket.skillTableText === "string" && bucket.skillTableText.trim().length > 0
      ? bucket.skillTableText
      : "{}";
  bucket.skillPresetStoreText = normalizeSkillPresetStoreTextForSettingsEvent(
    typeof (bucket as any).skillPresetStoreText === "string"
      ? String((bucket as any).skillPresetStoreText)
      : "",
    bucket.skillTableText
  );
  const presetStore = parseSkillPresetStoreTextEvent(bucket.skillPresetStoreText);
  if (presetStore) {
    bucket.skillTableText = syncActivePresetToSkillTableTextEvent(presetStore, bucket.skillTableText);
    bucket.skillPresetStoreText = JSON.stringify(presetStore, null, 2);
  }
  bucket.ruleText =
    typeof bucket.ruleText === "string" && bucket.ruleText.trim().length > 0
      ? bucket.ruleText
      : DEFAULT_RULE_TEXT_Event;
  return bucket;
}

function updateSettingsEvent(patch: Partial<DicePluginSettingsEvent>): void {
  const settings = getSettingsEvent();
  Object.assign(settings, patch);
  saveSettingsSafeEvent();
  syncSettingsUiEvent();
}

function syncSettingsBadgeVersionEvent(): void {
  const badge = document.getElementById(SETTINGS_BADGE_ID_Event);
  if (!badge) return;
  badge.textContent = SETTINGS_BADGE_VERSION_Event;
}

function ensureSettingsCardStylesEvent(): void {
  if (document.getElementById(SETTINGS_STYLE_ID_Event)) return;

  const style = document.createElement("style");
  style.id = SETTINGS_STYLE_ID_Event;
  style.textContent = buildSettingsCardStylesTemplateEvent(SETTINGS_CARD_ID_Event);
  document.head.appendChild(style);
}

function mountSettingsCardEvent(attempt = 0): void {
  if (document.getElementById(SETTINGS_CARD_ID_Event)) {
    syncSettingsBadgeVersionEvent();
    syncSettingsUiEvent();
    return;
  }

  const container = document.getElementById("extensions_settings");
  if (!container) {
    if (attempt < 60) {
      setTimeout(() => mountSettingsCardEvent(attempt + 1), 500);
    }
    return;
  }

  ensureSettingsCardStylesEvent();

  const root = document.createElement("div");
  root.id = SETTINGS_CARD_ID_Event;
  const drawerToggleId = `${SETTINGS_CARD_ID_Event}-toggle`;
  const drawerContentId = `${SETTINGS_CARD_ID_Event}-content`;
  const drawerIconId = `${SETTINGS_CARD_ID_Event}-icon`;
  const templateIds: SettingsCardTemplateIdsEvent = {
    cardId: SETTINGS_CARD_ID_Event,
    drawerToggleId,
    drawerContentId,
    drawerIconId,
    badgeId: SETTINGS_BADGE_ID_Event,
    badgeText: SETTINGS_BADGE_VERSION_Event,
    authorText: SETTINGS_AUTHOR_TEXT_Event,
    emailText: SETTINGS_EMAIL_TEXT_Event,
    githubText: SETTINGS_GITHUB_TEXT_Event,
    githubUrl: SETTINGS_GITHUB_URL_Event,
    searchId: SETTINGS_SEARCH_ID_Event,
    tabMainId: SETTINGS_TAB_MAIN_ID_Event,
    tabSkillId: SETTINGS_TAB_SKILL_ID_Event,
    tabRuleId: SETTINGS_TAB_RULE_ID_Event,
    tabAboutId: SETTINGS_TAB_ABOUT_ID_Event,
    panelMainId: SETTINGS_PANEL_MAIN_ID_Event,
    panelSkillId: SETTINGS_PANEL_SKILL_ID_Event,
    panelRuleId: SETTINGS_PANEL_RULE_ID_Event,
    panelAboutId: SETTINGS_PANEL_ABOUT_ID_Event,
    enabledId: SETTINGS_ENABLED_ID_Event,
    ruleId: SETTINGS_RULE_ID_Event,
    aiRollModeId: SETTINGS_AI_ROLL_MODE_ID_Event,
    explodingEnabledId: SETTINGS_EXPLODING_ENABLED_ID_Event,
    summaryDetailId: SETTINGS_SUMMARY_DETAIL_ID_Event,
    summaryRoundsId: SETTINGS_SUMMARY_ROUNDS_ID_Event,
    scopeId: SETTINGS_SCOPE_ID_Event,
    outcomeBranchesId: SETTINGS_OUTCOME_BRANCHES_ID_Event,
    explodeOutcomeId: SETTINGS_EXPLODE_OUTCOME_ID_Event,
    includeOutcomeSummaryId: SETTINGS_SUMMARY_OUTCOME_ID_Event,
    listOutcomePreviewId: SETTINGS_LIST_OUTCOME_PREVIEW_ID_Event,
    timeLimitEnabledId: SETTINGS_TIME_LIMIT_ENABLED_ID_Event,
    timeLimitMinId: SETTINGS_TIME_LIMIT_MIN_ID_Event,
    timeLimitRowId: SETTINGS_TIME_LIMIT_ROW_ID_Event,
    skillEnabledId: SETTINGS_SKILL_ENABLED_ID_Event,
    skillEditorWrapId: SETTINGS_SKILL_EDITOR_WRAP_ID_Event,
    skillRowsId: SETTINGS_SKILL_ROWS_ID_Event,
    skillAddId: SETTINGS_SKILL_ADD_ID_Event,
    skillTextId: SETTINGS_SKILL_TEXT_ID_Event,
    skillImportToggleId: SETTINGS_SKILL_IMPORT_TOGGLE_ID_Event,
    skillImportAreaId: SETTINGS_SKILL_IMPORT_AREA_ID_Event,
    skillImportApplyId: SETTINGS_SKILL_IMPORT_APPLY_ID_Event,
    skillExportId: SETTINGS_SKILL_EXPORT_ID_Event,
    skillSaveId: SETTINGS_SKILL_SAVE_ID_Event,
    skillResetId: SETTINGS_SKILL_RESET_ID_Event,
    skillErrorsId: SETTINGS_SKILL_ERRORS_ID_Event,
    skillDirtyHintId: SETTINGS_SKILL_DIRTY_HINT_ID_Event,
    skillPresetLayoutId: SETTINGS_SKILL_PRESET_LAYOUT_ID_Event,
    skillPresetSidebarId: SETTINGS_SKILL_PRESET_SIDEBAR_ID_Event,
    skillPresetListId: SETTINGS_SKILL_PRESET_LIST_ID_Event,
    skillPresetCreateId: SETTINGS_SKILL_PRESET_CREATE_ID_Event,
    skillPresetDeleteId: SETTINGS_SKILL_PRESET_DELETE_ID_Event,
    skillPresetNameId: SETTINGS_SKILL_PRESET_NAME_ID_Event,
    skillPresetRenameId: SETTINGS_SKILL_PRESET_RENAME_ID_Event,
    skillPresetMetaId: SETTINGS_SKILL_PRESET_META_ID_Event,
    skillEditorOpenId: SETTINGS_SKILL_EDITOR_OPEN_ID_Event,
    skillModalId: SETTINGS_SKILL_MODAL_ID_Event,
    skillModalCloseId: SETTINGS_SKILL_MODAL_CLOSE_ID_Event,
    ruleSaveId: SETTINGS_RULE_SAVE_ID_Event,
    ruleResetId: SETTINGS_RULE_RESET_ID_Event,
    ruleTextId: SETTINGS_RULE_TEXT_ID_Event,
  };
  root.innerHTML = buildSettingsCardHtmlTemplateEvent(templateIds);

  const modalInPanel = root.querySelector(`#${SETTINGS_SKILL_MODAL_ID_Event}`) as HTMLElement | null;
  if (modalInPanel) {
    root.appendChild(modalInPanel);
  }

  container.prepend(root);
  syncSettingsBadgeVersionEvent();

  const tabMain = document.getElementById(SETTINGS_TAB_MAIN_ID_Event) as HTMLButtonElement | null;
  const tabSkill = document.getElementById(SETTINGS_TAB_SKILL_ID_Event) as HTMLButtonElement | null;
  const tabRule = document.getElementById(SETTINGS_TAB_RULE_ID_Event) as HTMLButtonElement | null;
  const tabAbout = document.getElementById(SETTINGS_TAB_ABOUT_ID_Event) as HTMLButtonElement | null;
  const panelMain = document.getElementById(SETTINGS_PANEL_MAIN_ID_Event) as HTMLElement | null;
  const panelSkill = document.getElementById(SETTINGS_PANEL_SKILL_ID_Event) as HTMLElement | null;
  const panelRule = document.getElementById(SETTINGS_PANEL_RULE_ID_Event) as HTMLElement | null;
  const panelAbout = document.getElementById(SETTINGS_PANEL_ABOUT_ID_Event) as HTMLElement | null;
  const skillModal = document.getElementById(
    SETTINGS_SKILL_MODAL_ID_Event
  ) as HTMLDialogElement | null;
  const skillEditorOpenBtn = document.getElementById(
    SETTINGS_SKILL_EDITOR_OPEN_ID_Event
  ) as HTMLButtonElement | null;
  const skillModalCloseBtn = document.getElementById(
    SETTINGS_SKILL_MODAL_CLOSE_ID_Event
  ) as HTMLButtonElement | null;
  const searchInput = document.getElementById(
    SETTINGS_SEARCH_ID_Event
  ) as HTMLInputElement | null;
  const searchableMainItems = panelMain
    ? Array.from(panelMain.querySelectorAll<HTMLElement>(".st-roll-search-item"))
    : [];
  const searchableSkillItems = panelSkill
    ? Array.from(panelSkill.querySelectorAll<HTMLElement>(".st-roll-search-item"))
    : [];
  const searchableRuleItems = panelRule
    ? Array.from(panelRule.querySelectorAll<HTMLElement>(".st-roll-search-item"))
    : [];
  const searchableAboutItems = panelAbout
    ? Array.from(panelAbout.querySelectorAll<HTMLElement>(".st-roll-search-item"))
    : [];
  const searchableItems = [
    ...searchableMainItems,
    ...searchableSkillItems,
    ...searchableRuleItems,
    ...searchableAboutItems,
  ];

  let activeTab: "main" | "skill" | "rule" | "about" = "main";
  const closeSkillEditorModalEvent = () => {
    if (!skillModal) return;
    if (skillModal.open) {
      try {
        skillModal.close();
      } catch {
        // noop
      }
    }
    if (document.body.dataset.stRollSkillModalOpen === "1") {
      document.body.style.overflow = document.body.dataset.stRollSkillModalOverflow || "";
      delete document.body.dataset.stRollSkillModalOpen;
      delete document.body.dataset.stRollSkillModalOverflow;
    }
  };

  const openSkillEditorModalEvent = () => {
    if (!skillModal) return;
    if (!skillModal.open) {
      try {
        skillModal.showModal();
      } catch {
        skillModal.setAttribute("open", "");
      }
    }
    if (document.body.dataset.stRollSkillModalOpen !== "1") {
      document.body.dataset.stRollSkillModalOpen = "1";
      document.body.dataset.stRollSkillModalOverflow = document.body.style.overflow || "";
      document.body.style.overflow = "hidden";
    }
  };

  const activateTab = (tab: "main" | "skill" | "rule" | "about") => {
    activeTab = tab;
    const isMain = tab === "main";
    const isSkill = tab === "skill";
    const isRule = tab === "rule";
    const isAbout = tab === "about";
    tabMain?.classList.toggle("is-active", isMain);
    tabSkill?.classList.toggle("is-active", isSkill);
    tabRule?.classList.toggle("is-active", isRule);
    tabAbout?.classList.toggle("is-active", isAbout);
    if (panelMain) panelMain.hidden = !isMain;
    if (panelSkill) panelSkill.hidden = !isSkill;
    if (panelRule) panelRule.hidden = !isRule;
    if (panelAbout) panelAbout.hidden = !isAbout;
  };

  const tryActivateTab = (nextTab: "main" | "skill" | "rule" | "about"): boolean => {
    if (nextTab === activeTab) return true;
    if (activeTab === "skill" && nextTab !== "skill" && !confirmDiscardSkillDraftEvent()) {
      return false;
    }
    if (nextTab !== "skill") {
      closeSkillEditorModalEvent();
    }
    activateTab(nextTab);
    return true;
  };

  const applySettingsSearchFilter = () => {
    const query = String(searchInput?.value ?? "").trim().toLowerCase();
    const tokens = query.split(/\s+/).filter(Boolean);

    for (const item of searchableItems) {
      const source = `${item.dataset.stRollSearch ?? ""} ${item.textContent ?? ""}`.toLowerCase();
      const matched = tokens.every((token) => source.includes(token));
      item.classList.toggle("is-hidden-by-search", !matched);
    }

    if (!tokens.length) return;

    const hasMainVisible = searchableMainItems.some(
      (item) => !item.classList.contains("is-hidden-by-search")
    );
    const hasSkillVisible = searchableSkillItems.some(
      (item) => !item.classList.contains("is-hidden-by-search")
    );
    const hasRuleVisible = searchableRuleItems.some(
      (item) => !item.classList.contains("is-hidden-by-search")
    );
    const hasAboutVisible = searchableAboutItems.some(
      (item) => !item.classList.contains("is-hidden-by-search")
    );

    const hasVisibleByTab: Record<"main" | "skill" | "rule" | "about", boolean> = {
      main: hasMainVisible,
      skill: hasSkillVisible,
      rule: hasRuleVisible,
      about: hasAboutVisible,
    };
    if (!hasVisibleByTab[activeTab]) {
      const fallbackOrder: Array<"main" | "skill" | "rule" | "about"> = [
        "main",
        "skill",
        "rule",
        "about",
      ];
      const nextTab = fallbackOrder.find((tab) => hasVisibleByTab[tab]);
      if (nextTab) tryActivateTab(nextTab);
    }
  };

  activateTab("main");
  tabMain?.addEventListener("click", () => {
    if (!tryActivateTab("main")) return;
    applySettingsSearchFilter();
  });
  tabSkill?.addEventListener("click", () => {
    if (!tryActivateTab("skill")) return;
    applySettingsSearchFilter();
  });
  tabRule?.addEventListener("click", () => {
    if (!tryActivateTab("rule")) return;
    applySettingsSearchFilter();
  });
  tabAbout?.addEventListener("click", () => {
    if (!tryActivateTab("about")) return;
    applySettingsSearchFilter();
  });
  searchInput?.addEventListener("input", applySettingsSearchFilter);
  applySettingsSearchFilter();

  skillEditorOpenBtn?.addEventListener("click", () => {
    if (!tryActivateTab("skill")) return;
    openSkillEditorModalEvent();
  });

  skillModalCloseBtn?.addEventListener("click", () => {
    closeSkillEditorModalEvent();
  });

  skillModal?.addEventListener("click", (event) => {
    const target = event.target as HTMLElement | null;
    if (event.target === skillModal || target?.dataset.skillModalRole === "backdrop") {
      closeSkillEditorModalEvent();
    }
  });

  skillModal?.addEventListener("cancel", (event) => {
    event.preventDefault();
    closeSkillEditorModalEvent();
  });

  if (!SKILL_EDITOR_MODAL_KEYDOWN_BOUND_Event) {
    window.addEventListener("keydown", (event) => {
      if (event.key !== "Escape") return;
      closeSkillEditorModalEvent();
    });
    SKILL_EDITOR_MODAL_KEYDOWN_BOUND_Event = true;
  }

  const drawerToggle = document.getElementById(drawerToggleId) as HTMLElement | null;
  const drawerContent = document.getElementById(drawerContentId) as HTMLElement | null;
  drawerToggle?.addEventListener(
    "click",
    (event) => {
      if (!isElementVisibleEvent(drawerContent)) return;
      if (confirmDiscardSkillDraftEvent()) {
        closeSkillEditorModalEvent();
        return;
      }
      event.preventDefault();
      event.stopPropagation();
      if (typeof (event as Event & { stopImmediatePropagation?: () => void }).stopImmediatePropagation === "function") {
        (event as Event & { stopImmediatePropagation: () => void }).stopImmediatePropagation();
      }
    },
    true
  );

  if (!SKILL_EDITOR_BEFORE_UNLOAD_BOUND_Event) {
    window.addEventListener("beforeunload", (event) => {
      if (!isSkillDraftDirtyEvent()) return;
      event.preventDefault();
      event.returnValue = "";
    });
    SKILL_EDITOR_BEFORE_UNLOAD_BOUND_Event = true;
  }

  const enabledInput = document.getElementById(
    SETTINGS_ENABLED_ID_Event
  ) as HTMLInputElement | null;
  const ruleInput = document.getElementById(
    SETTINGS_RULE_ID_Event
  ) as HTMLInputElement | null;
  const aiRollModeInput = document.getElementById(
    SETTINGS_AI_ROLL_MODE_ID_Event
  ) as HTMLInputElement | null;
  const explodingEnabledInput = document.getElementById(
    SETTINGS_EXPLODING_ENABLED_ID_Event
  ) as HTMLInputElement | null;
  const summaryDetailInput = document.getElementById(
    SETTINGS_SUMMARY_DETAIL_ID_Event
  ) as HTMLSelectElement | null;
  const summaryRoundsInput = document.getElementById(
    SETTINGS_SUMMARY_ROUNDS_ID_Event
  ) as HTMLInputElement | null;
  const scopeInput = document.getElementById(
    SETTINGS_SCOPE_ID_Event
  ) as HTMLSelectElement | null;
  const outcomeBranchesInput = document.getElementById(
    SETTINGS_OUTCOME_BRANCHES_ID_Event
  ) as HTMLInputElement | null;
  const explodeOutcomeInput = document.getElementById(
    SETTINGS_EXPLODE_OUTCOME_ID_Event
  ) as HTMLInputElement | null;
  const includeOutcomeSummaryInput = document.getElementById(
    SETTINGS_SUMMARY_OUTCOME_ID_Event
  ) as HTMLInputElement | null;
  const listOutcomePreviewInput = document.getElementById(
    SETTINGS_LIST_OUTCOME_PREVIEW_ID_Event
  ) as HTMLInputElement | null;
  const timeLimitEnabledInput = document.getElementById(
    SETTINGS_TIME_LIMIT_ENABLED_ID_Event
  ) as HTMLInputElement | null;
  const minTimeLimitInput = document.getElementById(
    SETTINGS_TIME_LIMIT_MIN_ID_Event
  ) as HTMLInputElement | null;
  const skillEnabledInput = document.getElementById(
    SETTINGS_SKILL_ENABLED_ID_Event
  ) as HTMLInputElement | null;
  const skillRowsWrap = document.getElementById(
    SETTINGS_SKILL_ROWS_ID_Event
  ) as HTMLElement | null;
  const skillPresetListWrap = document.getElementById(
    SETTINGS_SKILL_PRESET_LIST_ID_Event
  ) as HTMLElement | null;
  const skillPresetCreateBtn = document.getElementById(
    SETTINGS_SKILL_PRESET_CREATE_ID_Event
  ) as HTMLButtonElement | null;
  const skillPresetDeleteBtn = document.getElementById(
    SETTINGS_SKILL_PRESET_DELETE_ID_Event
  ) as HTMLButtonElement | null;
  const skillPresetNameInput = document.getElementById(
    SETTINGS_SKILL_PRESET_NAME_ID_Event
  ) as HTMLInputElement | null;
  const skillPresetRenameBtn = document.getElementById(
    SETTINGS_SKILL_PRESET_RENAME_ID_Event
  ) as HTMLButtonElement | null;
  const skillAddBtn = document.getElementById(
    SETTINGS_SKILL_ADD_ID_Event
  ) as HTMLButtonElement | null;
  const skillImportToggleBtn = document.getElementById(
    SETTINGS_SKILL_IMPORT_TOGGLE_ID_Event
  ) as HTMLButtonElement | null;
  const skillImportArea = document.getElementById(
    SETTINGS_SKILL_IMPORT_AREA_ID_Event
  ) as HTMLElement | null;
  const skillTextInput = document.getElementById(
    SETTINGS_SKILL_TEXT_ID_Event
  ) as HTMLTextAreaElement | null;
  const skillImportApplyBtn = document.getElementById(
    SETTINGS_SKILL_IMPORT_APPLY_ID_Event
  ) as HTMLButtonElement | null;
  const skillExportBtn = document.getElementById(
    SETTINGS_SKILL_EXPORT_ID_Event
  ) as HTMLButtonElement | null;
  const skillSaveBtn = document.getElementById(
    SETTINGS_SKILL_SAVE_ID_Event
  ) as HTMLButtonElement | null;
  const skillResetBtn = document.getElementById(
    SETTINGS_SKILL_RESET_ID_Event
  ) as HTMLButtonElement | null;
  const ruleTextInput = document.getElementById(
    SETTINGS_RULE_TEXT_ID_Event
  ) as HTMLTextAreaElement | null;
  const ruleSaveBtn = document.getElementById(
    SETTINGS_RULE_SAVE_ID_Event
  ) as HTMLButtonElement | null;
  const ruleResetBtn = document.getElementById(
    SETTINGS_RULE_RESET_ID_Event
  ) as HTMLButtonElement | null;

  enabledInput?.addEventListener("input", (event) => {
    const value = Boolean((event.target as HTMLInputElement).checked);
    updateSettingsEvent({ enabled: value });
  });

  ruleInput?.addEventListener("input", (event) => {
    const value = Boolean((event.target as HTMLInputElement).checked);
    updateSettingsEvent({ autoSendRuleToAI: value });
  });

  aiRollModeInput?.addEventListener("input", (event) => {
    const value = Boolean((event.target as HTMLInputElement).checked);
    updateSettingsEvent({ enableAiRollMode: value });
  });

  explodingEnabledInput?.addEventListener("input", (event) => {
    const value = Boolean((event.target as HTMLInputElement).checked);
    updateSettingsEvent({ enableExplodingDice: value });
  });

  summaryDetailInput?.addEventListener("change", (event) => {
    const raw = String((event.target as HTMLSelectElement).value || "");
    const value: SummaryDetailModeEvent =
      raw === "balanced" || raw === "detailed" ? (raw as SummaryDetailModeEvent) : "minimal";
    updateSettingsEvent({ summaryDetailMode: value });
  });

  summaryRoundsInput?.addEventListener("change", (event) => {
    const raw = Number((event.target as HTMLInputElement).value);
    const value = Number.isFinite(raw)
      ? Math.min(SUMMARY_HISTORY_ROUNDS_MAX_Event, Math.max(SUMMARY_HISTORY_ROUNDS_MIN_Event, Math.floor(raw)))
      : DEFAULT_SETTINGS_Event.summaryHistoryRounds;
    updateSettingsEvent({ summaryHistoryRounds: value });
  });

  scopeInput?.addEventListener("change", (event) => {
    const value = String((event.target as HTMLSelectElement).value || "");
    updateSettingsEvent({
      eventApplyScope: value === "all" ? "all" : "protagonist_only",
    });
  });

  outcomeBranchesInput?.addEventListener("input", (event) => {
    const value = Boolean((event.target as HTMLInputElement).checked);
    updateSettingsEvent({ enableOutcomeBranches: value });
  });

  explodeOutcomeInput?.addEventListener("input", (event) => {
    const value = Boolean((event.target as HTMLInputElement).checked);
    updateSettingsEvent({ enableExplodeOutcomeBranch: value });
  });

  includeOutcomeSummaryInput?.addEventListener("input", (event) => {
    const value = Boolean((event.target as HTMLInputElement).checked);
    updateSettingsEvent({ includeOutcomeInSummary: value });
  });

  listOutcomePreviewInput?.addEventListener("input", (event) => {
    const value = Boolean((event.target as HTMLInputElement).checked);
    updateSettingsEvent({ showOutcomePreviewInListCard: value });
  });

  timeLimitEnabledInput?.addEventListener("input", (event) => {
    const value = Boolean((event.target as HTMLInputElement).checked);
    updateSettingsEvent({ enableTimeLimit: value });
  });

  minTimeLimitInput?.addEventListener("change", (event) => {
    const raw = Number((event.target as HTMLInputElement).value);
    const value = Number.isFinite(raw) ? Math.max(1, Math.floor(raw)) : 10;
    updateSettingsEvent({ minTimeLimitSeconds: value });
  });

  skillEnabledInput?.addEventListener("input", (event) => {
    const value = Boolean((event.target as HTMLInputElement).checked);
    updateSettingsEvent({ enableSkillSystem: value });
  });

  skillPresetListWrap?.addEventListener("click", (event) => {
    const target = event.target as HTMLElement | null;
    const presetBtn = target?.closest<HTMLButtonElement>("button[data-skill-preset-id]");
    if (!presetBtn) return;
    const nextPresetId = String(presetBtn.dataset.skillPresetId ?? "");
    if (!nextPresetId || nextPresetId === SKILL_EDITOR_ACTIVE_PRESET_ID_Event) return;
    if (!confirmDiscardSkillDraftEvent()) return;
    const settings = getSettingsEvent();
    const store = getSkillPresetStoreEvent(settings);
    const preset = getSkillPresetByIdEvent(store, nextPresetId);
    if (!preset) return;
    store.activePresetId = preset.id;
    saveSkillPresetStoreEvent(store);
  });

  skillPresetCreateBtn?.addEventListener("click", () => {
    if (!confirmDiscardSkillDraftEvent()) return;
    const settings = getSettingsEvent();
    const store = getSkillPresetStoreEvent(settings);
    const activePreset = getActiveSkillPresetEvent(store);
    const now = Date.now();
    const name = getUniqueSkillPresetNameEvent(store, SKILL_PRESET_NEW_NAME_BASE_Event);
    const newPreset: SkillPresetEvent = {
      id: createIdEvent("skill_preset"),
      name,
      locked: false,
      skillTableText: activePreset.skillTableText,
      createdAt: now,
      updatedAt: now,
    };
    store.presets.push(newPreset);
    store.activePresetId = newPreset.id;
    saveSkillPresetStoreEvent(store);
  });

  skillPresetDeleteBtn?.addEventListener("click", () => {
    const settings = getSettingsEvent();
    const store = getSkillPresetStoreEvent(settings);
    const activePreset = getActiveSkillPresetEvent(store);
    if (activePreset.locked) {
      pushToChat("⚠️ 默认预设不可删除。");
      return;
    }
    if (!confirmDiscardSkillDraftEvent()) return;
    const confirmed = window.confirm(`确认删除预设「${activePreset.name}」吗？`);
    if (!confirmed) return;
    store.presets = store.presets.filter((preset) => preset.id !== activePreset.id);
    const fallbackPreset =
      getSkillPresetByIdEvent(store, SKILL_PRESET_DEFAULT_ID_Event) ?? store.presets[0] ?? null;
    if (!fallbackPreset) {
      store.presets = buildDefaultSkillPresetStoreEvent().presets;
      store.activePresetId = SKILL_PRESET_DEFAULT_ID_Event;
    } else {
      store.activePresetId = fallbackPreset.id;
    }
    saveSkillPresetStoreEvent(store);
  });

  const handlePresetRename = () => {
    const nextName = String(skillPresetNameInput?.value ?? "").trim();
    if (!nextName) {
      renderSkillValidationErrorsEvent(["预设名称不能为空。"]);
      return;
    }
    const settings = getSettingsEvent();
    const store = getSkillPresetStoreEvent(settings);
    const activePreset = getActiveSkillPresetEvent(store);
    const duplicated = store.presets.some(
      (preset) =>
        preset.id !== activePreset.id &&
        normalizeSkillPresetNameKeyEvent(preset.name) === normalizeSkillPresetNameKeyEvent(nextName)
    );
    if (duplicated) {
      renderSkillValidationErrorsEvent(["预设名称重复，请使用其他名称。"]);
      return;
    }
    activePreset.name = nextName;
    activePreset.updatedAt = Date.now();
    saveSkillPresetStoreEvent(store);
    renderSkillValidationErrorsEvent([]);
  };

  skillPresetRenameBtn?.addEventListener("click", handlePresetRename);
  skillPresetNameInput?.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;
    event.preventDefault();
    handlePresetRename();
  });

  skillRowsWrap?.addEventListener("input", (event) => {
    const target = event.target as HTMLInputElement | null;
    if (!target) return;
    const rowId = String(target.dataset.skillRowId ?? "");
    const field = String(target.dataset.skillField ?? "");
    if (!rowId || !field) return;
    const row = SKILL_EDITOR_ROWS_DRAFT_Event.find((item) => item.rowId === rowId);
    if (!row) return;
    if (field === "name") {
      row.skillName = target.value;
    } else if (field === "modifier") {
      row.modifierText = target.value;
    }
    refreshSkillDraftDirtyStateEvent();
    renderSkillValidationErrorsEvent([]);
  });

  skillRowsWrap?.addEventListener("click", (event) => {
    const target = event.target as HTMLElement | null;
    const removeBtn = target?.closest<HTMLButtonElement>("button[data-skill-remove-id]");
    if (!removeBtn) return;
    const rowId = String(removeBtn.dataset.skillRemoveId ?? "");
    if (!rowId) return;
    SKILL_EDITOR_ROWS_DRAFT_Event = SKILL_EDITOR_ROWS_DRAFT_Event.filter((row) => row.rowId !== rowId);
    renderSkillRowsEvent();
    refreshSkillDraftDirtyStateEvent();
    renderSkillValidationErrorsEvent([]);
  });

  skillAddBtn?.addEventListener("click", () => {
    SKILL_EDITOR_ROWS_DRAFT_Event = [
      ...SKILL_EDITOR_ROWS_DRAFT_Event,
      createSkillEditorRowDraftEvent("", ""),
    ];
    renderSkillRowsEvent();
    refreshSkillDraftDirtyStateEvent();
    renderSkillValidationErrorsEvent([]);
  });

  skillImportToggleBtn?.addEventListener("click", () => {
    if (!skillImportArea) return;
    const willOpen = skillImportArea.hidden;
    skillImportArea.hidden = !willOpen;
    skillImportToggleBtn.textContent = willOpen ? "收起导入" : "导入 JSON";
    if (!willOpen || !skillTextInput) return;
    const serialized = serializeSkillRowsToSkillTableTextEvent(SKILL_EDITOR_ROWS_DRAFT_Event);
    skillTextInput.value =
      serialized ??
      getActiveSkillPresetEvent(getSkillPresetStoreEvent(getSettingsEvent())).skillTableText;
  });

  skillImportApplyBtn?.addEventListener("click", () => {
    const raw = String(skillTextInput?.value ?? "");
    if (normalizeSkillTableTextForSettingsEvent(raw) == null) {
      renderSkillValidationErrorsEvent([
        "导入失败：必须是 JSON 对象（例如 {\"察觉\":15,\"说服\":8}）。",
      ]);
      return;
    }
    const importedRows = deserializeSkillTableTextToRowsEvent(raw);
    const validation = validateSkillRowsEvent(importedRows);
    if (validation.errors.length > 0) {
      renderSkillValidationErrorsEvent(validation.errors);
      return;
    }
    SKILL_EDITOR_ROWS_DRAFT_Event = importedRows;
    renderSkillRowsEvent();
    refreshSkillDraftDirtyStateEvent();
    renderSkillValidationErrorsEvent([]);
  });

  skillExportBtn?.addEventListener("click", () => {
    const validation = validateSkillRowsEvent(SKILL_EDITOR_ROWS_DRAFT_Event);
    const settings = getSettingsEvent();
    const activePreset = getActiveSkillPresetEvent(getSkillPresetStoreEvent(settings));
    const exportText = validation.errors.length
      ? activePreset.skillTableText
      : JSON.stringify(validation.table, null, 2);
    if (validation.errors.length > 0) {
      renderSkillValidationErrorsEvent([
        "当前草稿有校验错误，已导出已保存的技能表。",
      ]);
    } else {
      renderSkillValidationErrorsEvent([]);
    }
    copyTextToClipboardEvent(exportText).then((ok) => {
      if (ok) {
        pushToChat("✅ 技能表 JSON 已复制到剪贴板。");
        return;
      }
      if (skillImportArea) {
        skillImportArea.hidden = false;
      }
      if (skillImportToggleBtn) {
        skillImportToggleBtn.textContent = "收起导入";
      }
      if (skillTextInput) {
        skillTextInput.value = exportText;
      }
      pushToChat("⚠️ 剪贴板不可用，请在导入框中手动复制 JSON。");
    });
  });

  skillSaveBtn?.addEventListener("click", () => {
    const validation = validateSkillRowsEvent(SKILL_EDITOR_ROWS_DRAFT_Event);
    if (validation.errors.length > 0) {
      renderSkillValidationErrorsEvent(validation.errors);
      pushToChat("❌ 技能表保存失败，请先修正校验错误。");
      return;
    }
    const normalized = JSON.stringify(validation.table, null, 2);
    const normalizedRows = deserializeSkillTableTextToRowsEvent(normalized);
    SKILL_EDITOR_ROWS_DRAFT_Event = normalizedRows;
    SKILL_EDITOR_LAST_SAVED_SNAPSHOT_Event = buildSkillDraftSnapshotEvent(normalizedRows);
    const settings = getSettingsEvent();
    const store = getSkillPresetStoreEvent(settings);
    const activePreset = getActiveSkillPresetEvent(store);
    activePreset.skillTableText = normalized;
    activePreset.updatedAt = Date.now();
    renderSkillRowsEvent();
    setSkillDraftDirtyEvent(false);
    renderSkillValidationErrorsEvent([]);
    saveSkillPresetStoreEvent(store);
    if (skillTextInput) {
      skillTextInput.value = normalized;
    }
  });

  skillResetBtn?.addEventListener("click", () => {
    SKILL_EDITOR_ROWS_DRAFT_Event = [];
    renderSkillRowsEvent();
    refreshSkillDraftDirtyStateEvent();
    renderSkillValidationErrorsEvent([]);
  });

  ruleSaveBtn?.addEventListener("click", () => {
    const value = String(ruleTextInput?.value ?? "");
    const nextValue = value.trim().length > 0 ? value : DEFAULT_RULE_TEXT_Event;
    updateSettingsEvent({ ruleText: nextValue });
  });

  ruleResetBtn?.addEventListener("click", () => {
    if (ruleTextInput) {
      ruleTextInput.value = DEFAULT_RULE_TEXT_Event;
    }
    updateSettingsEvent({ ruleText: DEFAULT_RULE_TEXT_Event });
  });

  syncSettingsUiEvent();
}

function syncSettingsUiEvent(): void {
  const settings = getSettingsEvent();
  const enabledInput = document.getElementById(
    SETTINGS_ENABLED_ID_Event
  ) as HTMLInputElement | null;
  const ruleInput = document.getElementById(
    SETTINGS_RULE_ID_Event
  ) as HTMLInputElement | null;
  const aiRollModeInput = document.getElementById(
    SETTINGS_AI_ROLL_MODE_ID_Event
  ) as HTMLInputElement | null;
  const explodingEnabledInput = document.getElementById(
    SETTINGS_EXPLODING_ENABLED_ID_Event
  ) as HTMLInputElement | null;
  const summaryDetailInput = document.getElementById(
    SETTINGS_SUMMARY_DETAIL_ID_Event
  ) as HTMLSelectElement | null;
  const summaryRoundsInput = document.getElementById(
    SETTINGS_SUMMARY_ROUNDS_ID_Event
  ) as HTMLInputElement | null;
  const scopeInput = document.getElementById(
    SETTINGS_SCOPE_ID_Event
  ) as HTMLSelectElement | null;
  const outcomeBranchesInput = document.getElementById(
    SETTINGS_OUTCOME_BRANCHES_ID_Event
  ) as HTMLInputElement | null;
  const explodeOutcomeInput = document.getElementById(
    SETTINGS_EXPLODE_OUTCOME_ID_Event
  ) as HTMLInputElement | null;
  const includeOutcomeSummaryInput = document.getElementById(
    SETTINGS_SUMMARY_OUTCOME_ID_Event
  ) as HTMLInputElement | null;
  const listOutcomePreviewInput = document.getElementById(
    SETTINGS_LIST_OUTCOME_PREVIEW_ID_Event
  ) as HTMLInputElement | null;
  const timeLimitEnabledInput = document.getElementById(
    SETTINGS_TIME_LIMIT_ENABLED_ID_Event
  ) as HTMLInputElement | null;
  const minTimeLimitInput = document.getElementById(
    SETTINGS_TIME_LIMIT_MIN_ID_Event
  ) as HTMLInputElement | null;
  const minTimeLimitRow = document.getElementById(
    SETTINGS_TIME_LIMIT_ROW_ID_Event
  ) as HTMLElement | null;
  const skillEnabledInput = document.getElementById(
    SETTINGS_SKILL_ENABLED_ID_Event
  ) as HTMLInputElement | null;
  const ruleTextInput = document.getElementById(
    SETTINGS_RULE_TEXT_ID_Event
  ) as HTMLTextAreaElement | null;

  if (enabledInput) enabledInput.checked = Boolean(settings.enabled);
  if (ruleInput) ruleInput.checked = Boolean(settings.autoSendRuleToAI);
  if (aiRollModeInput) aiRollModeInput.checked = Boolean(settings.enableAiRollMode);
  if (explodingEnabledInput) explodingEnabledInput.checked = Boolean(settings.enableExplodingDice);
  if (summaryDetailInput) summaryDetailInput.value = settings.summaryDetailMode;
  if (summaryRoundsInput) summaryRoundsInput.value = String(settings.summaryHistoryRounds);
  if (scopeInput) scopeInput.value = settings.eventApplyScope;
  if (outcomeBranchesInput) outcomeBranchesInput.checked = Boolean(settings.enableOutcomeBranches);
  if (explodeOutcomeInput) explodeOutcomeInput.checked = Boolean(settings.enableExplodeOutcomeBranch);
  if (includeOutcomeSummaryInput) {
    includeOutcomeSummaryInput.checked = Boolean(settings.includeOutcomeInSummary);
  }
  if (listOutcomePreviewInput) {
    listOutcomePreviewInput.checked = Boolean(settings.showOutcomePreviewInListCard);
  }
  if (explodeOutcomeInput) {
    explodeOutcomeInput.disabled = !settings.enableOutcomeBranches;
    explodeOutcomeInput.style.opacity = settings.enableOutcomeBranches ? "1" : "0.5";
  }
  if (includeOutcomeSummaryInput) {
    includeOutcomeSummaryInput.disabled = !settings.enableOutcomeBranches;
    includeOutcomeSummaryInput.style.opacity = settings.enableOutcomeBranches ? "1" : "0.5";
  }
  if (listOutcomePreviewInput) {
    listOutcomePreviewInput.disabled = !settings.enableOutcomeBranches;
    listOutcomePreviewInput.style.opacity = settings.enableOutcomeBranches ? "1" : "0.5";
  }
  if (timeLimitEnabledInput) timeLimitEnabledInput.checked = Boolean(settings.enableTimeLimit);
  if (minTimeLimitInput) {
    minTimeLimitInput.value = String(settings.minTimeLimitSeconds);
    minTimeLimitInput.disabled = !settings.enableTimeLimit;
    minTimeLimitInput.style.opacity = settings.enableTimeLimit ? "1" : "0.5";
  }
  minTimeLimitRow?.classList.toggle("is-disabled", !settings.enableTimeLimit);
  if (skillEnabledInput) {
    skillEnabledInput.checked = Boolean(settings.enableSkillSystem);
  }
  if (!isSkillDraftDirtyEvent()) {
    const currentSettingsText = String(settings.skillTableText ?? "{}");
    const currentPresetStoreText = String(settings.skillPresetStoreText ?? "");
    const skillRowsWrap = document.getElementById(SETTINGS_SKILL_ROWS_ID_Event) as HTMLElement | null;
    if (
      currentSettingsText !== SKILL_EDITOR_LAST_SETTINGS_TEXT_Event ||
      currentPresetStoreText !== SKILL_EDITOR_LAST_PRESET_STORE_TEXT_Event ||
      !skillRowsWrap ||
      !skillRowsWrap.hasChildNodes()
    ) {
      hydrateSkillDraftFromSettingsEvent();
    }
  }
  if (ruleTextInput) {
    const nextText = settings.ruleText || DEFAULT_RULE_TEXT_Event;
    if (ruleTextInput.value !== nextText) {
      ruleTextInput.value = nextText;
    }
  }
}

function normalizeSkillPresetNameKeyEvent(raw: string): string {
  return String(raw ?? "").trim().toLowerCase();
}

function createSkillEditorRowDraftEvent(
  skillName: string,
  modifierText: string
): SkillEditorRowDraftEvent {
  return {
    rowId: createIdEvent("skill_row"),
    skillName,
    modifierText,
  };
}

function countSkillEntriesFromSkillTableTextEvent(skillTableText: string): number {
  const normalized = normalizeSkillTableTextForSettingsEvent(skillTableText);
  if (normalized == null) return 0;
  try {
    const parsed = JSON.parse(normalized);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return 0;
    return Object.keys(parsed as Record<string, any>).length;
  } catch {
    return 0;
  }
}

function buildDefaultSkillPresetEvent(now = Date.now()): SkillPresetEvent {
  return {
    id: SKILL_PRESET_DEFAULT_ID_Event,
    name: SKILL_PRESET_DEFAULT_NAME_Event,
    locked: true,
    skillTableText: DEFAULT_SKILL_PRESET_TABLE_TEXT_Event,
    createdAt: now,
    updatedAt: now,
  };
}

function buildDefaultSkillPresetStoreEvent(now = Date.now()): SkillPresetStoreEvent {
  const preset = buildDefaultSkillPresetEvent(now);
  return {
    version: SKILL_PRESET_STORE_VERSION_Event,
    activePresetId: preset.id,
    presets: [preset],
  };
}

function getUniqueSkillPresetNameEvent(
  store: SkillPresetStoreEvent,
  baseName: string,
  excludeId = ""
): string {
  const trimmedBase = String(baseName ?? "").trim() || SKILL_PRESET_NEW_NAME_BASE_Event;
  const usedKeys = new Set(
    store.presets
      .filter((preset) => preset.id !== excludeId)
      .map((preset) => normalizeSkillPresetNameKeyEvent(preset.name))
  );
  let candidate = trimmedBase;
  let index = 2;
  while (usedKeys.has(normalizeSkillPresetNameKeyEvent(candidate))) {
    candidate = `${trimmedBase} ${index}`;
    index += 1;
  }
  return candidate;
}

function normalizeSkillPresetStoreTextForSettingsEvent(
  raw: string,
  legacySkillTableText: string
): string {
  const now = Date.now();
  const legacyNormalized = normalizeSkillTableTextForSettingsEvent(legacySkillTableText) ?? "{}";
  const hasLegacySkillData = legacyNormalized !== "{}";
  const rawText = String(raw ?? "").trim();

  let parsed: any = null;
  if (rawText) {
    try {
      parsed = JSON.parse(rawText);
    } catch {
      parsed = null;
    }
  }

  const presets: SkillPresetEvent[] = [];
  const usedIds = new Set<string>();
  const usedNames = new Set<string>();

  const pushPreset = (presetRaw: any, index: number, fallbackName: string, lockedHint = false) => {
    const rawId = String(presetRaw?.id ?? "").trim();
    const baseId = rawId || createIdEvent("skill_preset");
    let id = baseId;
    while (usedIds.has(id)) {
      id = `${baseId}_${Math.random().toString(36).slice(2, 7)}`;
    }
    usedIds.add(id);

    const rawName = String(presetRaw?.name ?? "").trim();
    const baseName = rawName || fallbackName;
    let name = baseName;
    let idx = 2;
    while (usedNames.has(normalizeSkillPresetNameKeyEvent(name))) {
      name = `${baseName} ${idx}`;
      idx += 1;
    }
    usedNames.add(normalizeSkillPresetNameKeyEvent(name));

    const normalizedSkillTableText =
      normalizeSkillTableTextForSettingsEvent(String(presetRaw?.skillTableText ?? "{}")) ?? "{}";
    const createdAtRaw = Number(presetRaw?.createdAt);
    const createdAt = Number.isFinite(createdAtRaw) ? createdAtRaw : now;
    const updatedAtRaw = Number(presetRaw?.updatedAt);
    const updatedAt = Number.isFinite(updatedAtRaw) ? updatedAtRaw : createdAt;
    presets.push({
      id,
      name,
      locked: Boolean(presetRaw?.locked || lockedHint),
      skillTableText: normalizedSkillTableText,
      createdAt,
      updatedAt,
    });
  };

  if (parsed && typeof parsed === "object" && !Array.isArray(parsed) && Array.isArray(parsed.presets)) {
    parsed.presets.forEach((presetRaw: any, index: number) => {
      pushPreset(presetRaw, index, `${SKILL_PRESET_NEW_NAME_BASE_Event} ${index + 1}`);
    });
  }

  let defaultPreset = presets.find((preset) => preset.id === SKILL_PRESET_DEFAULT_ID_Event) ?? null;
  if (!defaultPreset) {
    defaultPreset = buildDefaultSkillPresetEvent(now);
    presets.unshift(defaultPreset);
    usedIds.add(defaultPreset.id);
    usedNames.add(normalizeSkillPresetNameKeyEvent(defaultPreset.name));
  } else {
    defaultPreset.name = SKILL_PRESET_DEFAULT_NAME_Event;
    defaultPreset.locked = true;
  }

  if (!rawText && hasLegacySkillData) {
    const migrationPreset: SkillPresetEvent = {
      id: createIdEvent("skill_preset_migration"),
      name: getUniqueSkillPresetNameEvent(
        { version: SKILL_PRESET_STORE_VERSION_Event, activePresetId: "", presets },
        SKILL_PRESET_MIGRATION_NAME_Event
      ),
      locked: false,
      skillTableText: legacyNormalized,
      createdAt: now,
      updatedAt: now,
    };
    presets.push(migrationPreset);
  }

  if (!presets.length) {
    presets.push(buildDefaultSkillPresetEvent(now));
  }

  let activePresetId = String(parsed?.activePresetId ?? "").trim();
  if (!activePresetId || !presets.some((preset) => preset.id === activePresetId)) {
    if (!rawText && hasLegacySkillData) {
      const migration = presets.find((preset) => preset.name.includes(SKILL_PRESET_MIGRATION_NAME_Event));
      activePresetId = migration?.id ?? SKILL_PRESET_DEFAULT_ID_Event;
    } else {
      activePresetId = SKILL_PRESET_DEFAULT_ID_Event;
    }
  }

  const normalizedStore: SkillPresetStoreEvent = {
    version: SKILL_PRESET_STORE_VERSION_Event,
    activePresetId,
    presets,
  };
  return JSON.stringify(normalizedStore, null, 2);
}

function parseSkillPresetStoreTextEvent(raw: string): SkillPresetStoreEvent | null {
  const text = String(raw ?? "").trim();
  if (!text) return null;
  try {
    const parsed = JSON.parse(text);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return null;
    if (Number((parsed as any).version) !== SKILL_PRESET_STORE_VERSION_Event) return null;
    if (!Array.isArray((parsed as any).presets)) return null;
    const activePresetId = String((parsed as any).activePresetId ?? "").trim();
    const presets = (parsed as any).presets as any[];
    if (!activePresetId || !presets.length) return null;
    return parsed as SkillPresetStoreEvent;
  } catch {
    return null;
  }
}

function getSkillPresetStoreEvent(settings = getSettingsEvent()): SkillPresetStoreEvent {
  const rawStoreText = String(settings.skillPresetStoreText ?? "");
  const normalizedStoreText = normalizeSkillPresetStoreTextForSettingsEvent(
    rawStoreText,
    settings.skillTableText
  );
  const parsed = parseSkillPresetStoreTextEvent(normalizedStoreText);
  if (parsed) return parsed;
  return buildDefaultSkillPresetStoreEvent();
}

function getSkillPresetByIdEvent(
  store: SkillPresetStoreEvent,
  presetId: string
): SkillPresetEvent | null {
  const id = String(presetId ?? "").trim();
  if (!id) return null;
  return store.presets.find((preset) => preset.id === id) ?? null;
}

function getActiveSkillPresetEvent(store: SkillPresetStoreEvent): SkillPresetEvent {
  const explicit = getSkillPresetByIdEvent(store, store.activePresetId);
  if (explicit) return explicit;
  const fallbackDefault = getSkillPresetByIdEvent(store, SKILL_PRESET_DEFAULT_ID_Event);
  if (fallbackDefault) return fallbackDefault;
  return store.presets[0] ?? buildDefaultSkillPresetEvent();
}

function syncActivePresetToSkillTableTextEvent(
  store: SkillPresetStoreEvent,
  fallbackSkillTableText = "{}"
): string {
  const activePreset = getActiveSkillPresetEvent(store);
  const normalized =
    normalizeSkillTableTextForSettingsEvent(activePreset.skillTableText) ??
    normalizeSkillTableTextForSettingsEvent(fallbackSkillTableText) ??
    "{}";
  activePreset.skillTableText = normalized;
  return normalized;
}

function saveSkillPresetStoreEvent(store: SkillPresetStoreEvent): void {
  const settings = getSettingsEvent();
  const normalizedStoreText = normalizeSkillPresetStoreTextForSettingsEvent(
    JSON.stringify(store),
    settings.skillTableText
  );
  const normalizedStore =
    parseSkillPresetStoreTextEvent(normalizedStoreText) ?? buildDefaultSkillPresetStoreEvent();
  const activeSkillTableText = syncActivePresetToSkillTableTextEvent(
    normalizedStore,
    settings.skillTableText
  );
  updateSettingsEvent({
    skillPresetStoreText: JSON.stringify(normalizedStore, null, 2),
    skillTableText: activeSkillTableText,
  });
}

function buildSkillDraftSnapshotEvent(rows: SkillEditorRowDraftEvent[]): string {
  return JSON.stringify(
    rows.map((row) => ({
      skillName: String(row.skillName ?? ""),
      modifierText: String(row.modifierText ?? ""),
    }))
  );
}

function setSkillDraftDirtyEvent(flag: boolean): void {
  SKILL_EDITOR_DIRTY_Event = Boolean(flag);
  const dirtyHint = document.getElementById(SETTINGS_SKILL_DIRTY_HINT_ID_Event) as HTMLElement | null;
  if (dirtyHint) {
    dirtyHint.hidden = !SKILL_EDITOR_DIRTY_Event;
  }
}

function isSkillDraftDirtyEvent(): boolean {
  return SKILL_EDITOR_DIRTY_Event;
}

function refreshSkillDraftDirtyStateEvent(): void {
  const snapshot = buildSkillDraftSnapshotEvent(SKILL_EDITOR_ROWS_DRAFT_Event);
  setSkillDraftDirtyEvent(snapshot !== SKILL_EDITOR_LAST_SAVED_SNAPSHOT_Event);
}

function renderSkillValidationErrorsEvent(errors: string[]): void {
  const errorWrap = document.getElementById(SETTINGS_SKILL_ERRORS_ID_Event) as HTMLElement | null;
  if (!errorWrap) return;
  if (!errors.length) {
    errorWrap.hidden = true;
    errorWrap.innerHTML = "";
    return;
  }
  errorWrap.hidden = false;
  errorWrap.innerHTML = errors
    .map((item) => `<div class="st-roll-skill-error-item">${escapeHtmlEvent(item)}</div>`)
    .join("");
}

function deserializeSkillTableTextToRowsEvent(skillTableText: string): SkillEditorRowDraftEvent[] {
  const text = String(skillTableText ?? "").trim();
  if (!text) return [];
  try {
    const parsed = JSON.parse(text);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return [];
    return Object.entries(parsed as Record<string, any>).map(([skillName, modifier]) =>
      createSkillEditorRowDraftEvent(String(skillName ?? ""), String(modifier ?? ""))
    );
  } catch {
    return [];
  }
}

function validateSkillRowsEvent(rows: SkillEditorRowDraftEvent[]): {
  errors: string[];
  table: Record<string, number>;
} {
  const errors: string[] = [];
  const table: Record<string, number> = {};
  const seenRowByKey = new Map<string, number>();
  const integerPattern = /^[+-]?\d+$/;

  rows.forEach((row, index) => {
    const rowNo = index + 1;
    const rawName = String(row.skillName ?? "");
    const rawModifier = String(row.modifierText ?? "");
    const skillName = rawName.trim();
    const normalizedSkillKey = normalizeSkillKeyEvent(skillName);
    let rowHasError = false;

    if (!skillName) {
      errors.push(`第 ${rowNo} 行：技能名不能为空`);
      rowHasError = true;
    }

    let modifierValue = 0;
    const modifierText = rawModifier.trim();
    if (!modifierText) {
      errors.push(`第 ${rowNo} 行：加值不能为空`);
      rowHasError = true;
    } else if (!integerPattern.test(modifierText)) {
      errors.push(`第 ${rowNo} 行：加值必须是整数`);
      rowHasError = true;
    } else {
      modifierValue = Number(modifierText);
      if (!Number.isFinite(modifierValue)) {
        errors.push(`第 ${rowNo} 行：加值必须是有限整数`);
        rowHasError = true;
      }
    }

    if (normalizedSkillKey) {
      const duplicatedRow = seenRowByKey.get(normalizedSkillKey);
      if (duplicatedRow != null) {
        errors.push(`第 ${rowNo} 行：技能名与第 ${duplicatedRow + 1} 行重复`);
        rowHasError = true;
      } else {
        seenRowByKey.set(normalizedSkillKey, index);
      }
    }

    if (!rowHasError && normalizedSkillKey) {
      table[normalizedSkillKey] = modifierValue;
    }
  });

  return { errors, table };
}

function serializeSkillRowsToSkillTableTextEvent(rows: SkillEditorRowDraftEvent[]): string | null {
  const validation = validateSkillRowsEvent(rows);
  if (validation.errors.length > 0) return null;
  return JSON.stringify(validation.table, null, 2);
}

function renderSkillPresetListEvent(store: SkillPresetStoreEvent): void {
  const listWrap = document.getElementById(SETTINGS_SKILL_PRESET_LIST_ID_Event) as HTMLElement | null;
  if (!listWrap) return;
  if (!store.presets.length) {
    listWrap.innerHTML = `<div class="st-roll-skill-preset-empty">暂无预设</div>`;
    return;
  }
  listWrap.innerHTML = store.presets
    .map((preset) => {
      const isActive = preset.id === store.activePresetId;
      const skillCount = countSkillEntriesFromSkillTableTextEvent(preset.skillTableText);
      const presetId = escapeAttrEvent(preset.id);
      const presetName = escapeHtmlEvent(preset.name);
      return `
        <button type="button" class="st-roll-skill-preset-item ${isActive ? "is-active" : ""}" data-skill-preset-id="${presetId}">
          <span class="st-roll-skill-preset-name">${presetName}</span>
          <span class="st-roll-skill-preset-tags">
            <span class="st-roll-skill-preset-tag">${skillCount}</span>
            ${isActive ? `<span class="st-roll-skill-preset-tag active">生效中</span>` : ""}
            ${preset.locked ? `<span class="st-roll-skill-preset-tag locked">默认</span>` : ""}
          </span>
        </button>
      `;
    })
    .join("");
}

function renderSkillPresetMetaEvent(store: SkillPresetStoreEvent): void {
  const activePreset = getActiveSkillPresetEvent(store);
  const meta = document.getElementById(SETTINGS_SKILL_PRESET_META_ID_Event) as HTMLElement | null;
  if (meta) {
    const count = countSkillEntriesFromSkillTableTextEvent(activePreset.skillTableText);
    meta.textContent = `当前预设：${activePreset.name}（技能 ${count} 项）`;
  }
  const nameInput = document.getElementById(SETTINGS_SKILL_PRESET_NAME_ID_Event) as HTMLInputElement | null;
  if (nameInput && nameInput.value !== activePreset.name) {
    nameInput.value = activePreset.name;
  }
  const deleteBtn = document.getElementById(
    SETTINGS_SKILL_PRESET_DELETE_ID_Event
  ) as HTMLButtonElement | null;
  if (deleteBtn) {
    deleteBtn.disabled = activePreset.locked;
    deleteBtn.style.opacity = activePreset.locked ? "0.5" : "1";
    deleteBtn.title = activePreset.locked ? "默认预设不可删除" : "";
  }
}

function renderSkillRowsEvent(): void {
  const rowsWrap = document.getElementById(SETTINGS_SKILL_ROWS_ID_Event) as HTMLElement | null;
  if (!rowsWrap) return;
  if (!SKILL_EDITOR_ROWS_DRAFT_Event.length) {
    rowsWrap.innerHTML = `<div class="st-roll-skill-empty">暂无技能，点击“新增技能”开始配置。</div>`;
    return;
  }
  rowsWrap.innerHTML = SKILL_EDITOR_ROWS_DRAFT_Event.map((row) => {
    const rowId = escapeAttrEvent(String(row.rowId ?? ""));
    const skillName = escapeAttrEvent(String(row.skillName ?? ""));
    const modifierText = escapeAttrEvent(String(row.modifierText ?? ""));
    return `
      <div class="st-roll-skill-row" data-row-id="${rowId}">
        <input
          class="st-roll-input st-roll-skill-name"
          type="text"
          placeholder="例如：察觉"
          data-skill-row-id="${rowId}"
          data-skill-field="name"
          value="${skillName}"
        />
        <input
          class="st-roll-input st-roll-skill-modifier"
          type="text"
          inputmode="numeric"
          placeholder="例如：15"
          data-skill-row-id="${rowId}"
          data-skill-field="modifier"
          value="${modifierText}"
        />
        <button type="button" class="st-roll-btn secondary st-roll-skill-remove" data-skill-remove-id="${rowId}">
          删除
        </button>
      </div>
    `;
  }).join("");
}

function hydrateSkillDraftFromSettingsEvent(force = false): void {
  if (!force && isSkillDraftDirtyEvent()) return;
  const settings = getSettingsEvent();
  const store = getSkillPresetStoreEvent(settings);
  const normalizedStoreText = JSON.stringify(store, null, 2);
  const activePreset = getActiveSkillPresetEvent(store);
  const activeSkillTableNormalized = normalizeSkillTableTextForSettingsEvent(activePreset.skillTableText);
  const activeSkillTableText = activeSkillTableNormalized ?? "{}";

  if (activeSkillTableNormalized == null) {
    SKILL_EDITOR_ROWS_DRAFT_Event = [];
    if (SKILL_EDITOR_INVALID_SETTINGS_WARNED_TEXT_Event !== activePreset.skillTableText) {
      SKILL_EDITOR_INVALID_SETTINGS_WARNED_TEXT_Event = activePreset.skillTableText;
      console.warn("[骰子插件] 技能预设配置无效，已按空表载入");
      pushToChat("⚠️ 技能预设配置格式无效，已按空表载入。");
    }
  } else {
    SKILL_EDITOR_INVALID_SETTINGS_WARNED_TEXT_Event = "";
    SKILL_EDITOR_ROWS_DRAFT_Event = deserializeSkillTableTextToRowsEvent(activeSkillTableText);
  }

  SKILL_EDITOR_ACTIVE_PRESET_ID_Event = activePreset.id;
  SKILL_EDITOR_LAST_SAVED_SNAPSHOT_Event = buildSkillDraftSnapshotEvent(SKILL_EDITOR_ROWS_DRAFT_Event);
  SKILL_EDITOR_LAST_SETTINGS_TEXT_Event = activeSkillTableText;
  SKILL_EDITOR_LAST_PRESET_STORE_TEXT_Event = normalizedStoreText;
  setSkillDraftDirtyEvent(false);
  renderSkillValidationErrorsEvent([]);
  renderSkillPresetListEvent(store);
  renderSkillPresetMetaEvent(store);
  renderSkillRowsEvent();
}

function confirmDiscardSkillDraftEvent(): boolean {
  if (!isSkillDraftDirtyEvent()) return true;
  const confirmed = window.confirm("技能改动未保存，是否丢弃并继续？");
  if (!confirmed) return false;
  hydrateSkillDraftFromSettingsEvent(true);
  return true;
}

function isElementVisibleEvent(element: HTMLElement | null): boolean {
  if (!element || element.hidden) return false;
  const style = window.getComputedStyle(element);
  return style.display !== "none" && style.visibility !== "hidden";
}

function copyTextToClipboardEvent(text: string): Promise<boolean> {
  if (!navigator.clipboard || typeof navigator.clipboard.writeText !== "function") {
    return Promise.resolve(false);
  }
  return navigator.clipboard
    .writeText(text)
    .then(() => true)
    .catch(() => false);
}

function getMessageTextEvent(message: TavernMessageEvent | undefined): string {
  if (!message) return "";
  const content = typeof message.content === "string" ? message.content : "";
  const mes = typeof message.mes === "string" ? message.mes : "";
  if (content && mes) {
    return content.length >= mes.length ? content : mes;
  }
  if (content) return content;
  if (mes) return mes;
  return "";
}

function getPreferredAssistantSourceTextEvent(
  message: TavernMessageEvent | undefined
): string {
  if (!message) return "";
  const candidates = [
    typeof message.mes === "string" ? message.mes : "",
    typeof message.content === "string" ? message.content : "",
    typeof (message as any).message === "string" ? (message as any).message : "",
    typeof (message as any).text === "string" ? (message as any).text : "",
  ];
  for (const candidate of candidates) {
    if (candidate && candidate.trim()) return candidate;
  }
  return "";
}

function setMessageTextEvent(message: TavernMessageEvent, text: string): void {
  message.mes = text;
  message.content = text;
  (message as any).message = text;
  (message as any).text = text;
}

function isUserMessageEvent(message: TavernMessageEvent | undefined): boolean {
  if (!message) return false;
  if (message.is_user) return true;
  return String(message.role || "").toLowerCase() === "user";
}

function isSystemMessageEvent(message: TavernMessageEvent | undefined): boolean {
  if (!message) return false;
  if (message.is_system) return true;
  return String(message.role || "").toLowerCase() === "system";
}

function isAssistantMessageEvent(message: TavernMessageEvent | undefined): boolean {
  if (!message) return false;
  if (message.is_user || message.is_system) return false;
  const role = String(message.role || "").toLowerCase();
  if (!role) return true;
  return role !== "user" && role !== "system";
}

function findFirstSystemIndexEvent(chat: TavernMessageEvent[]): number {
  for (let i = 0; i < chat.length; i++) {
    if (isSystemMessageEvent(chat[i])) return i;
  }
  return -1;
}

function findLastUserMessageEvent(chat: TavernMessageEvent[]): TavernMessageEvent | null {
  for (let i = chat.length - 1; i >= 0; i--) {
    if (isUserMessageEvent(chat[i])) return chat[i];
  }
  return null;
}

function buildPromptMessageIdEvent(message: TavernMessageEvent): string {
  const explicitId = message.id ?? message.cid ?? message.uid;
  if (explicitId != null) return `msg:${String(explicitId)}`;
  const stamp = String(
    message.create_date ?? message.create_time ?? message.timestamp ?? ""
  );
  return `fp:${stamp}:${simpleHashEvent(getMessageTextEvent(message))}`;
}

function stripManagedBlocksEvent(input: string): string {
  return normalizeBlankLinesEvent(
    input
      .replace(
        /\[DICE_EVENT_RULES\][\s\S]*?\[\/DICE_EVENT_RULES\]/g,
        ""
      )
      .replace(
        /\[DICE_ROUND_SUMMARY\][\s\S]*?\[\/DICE_ROUND_SUMMARY\]/g,
        ""
      )
  );
}

function buildDiceRuleBlockCompactEvent(): string {
  const settings = getSettingsEvent();
  const rawRuleText =
    typeof settings.ruleText === "string" && settings.ruleText.trim().length > 0
      ? settings.ruleText
      : DEFAULT_RULE_TEXT_Event;
  const ruleText = rawRuleText.replace(/\[\/?DICE_EVENT_RULES\]/g, "").trim();
  let skillRuleSection = "";
  if (settings.enableSkillSystem) {
    const skillTable = getSkillModifierTableMapEvent(settings);
    const skillTableJson = JSON.stringify(skillTable);
    const store = getSkillPresetStoreEvent(settings);
    const activePreset = getActiveSkillPresetEvent(store);
    const presetNameLine = String(activePreset.name ?? "").replace(/\s+/g, " ").trim() || "unnamed";
    skillRuleSection = `\n[SKILL_SYSTEM]\nenabled=true\npreset_id=${activePreset.id}\npreset_name=${presetNameLine}\nskill_table=${skillTableJson}\n说明：event.skill 会匹配 skill_table 的 key（trim + lowercase），命中后作为技能修正加到检定总值。\n[/SKILL_SYSTEM]`;
  }

  return `${DICE_RULE_BLOCK_START_Event}
${ruleText}${skillRuleSection}
${DICE_RULE_BLOCK_END_Event}`;
}

function buildDiceRuleBlockEvent(): string {
  return buildDiceRuleBlockCompactEvent();
}

function createRoundSummarySnapshotEvent(
  round: PendingRoundEvent,
  now = Date.now()
): RoundSummarySnapshotEvent {
  ensureRoundEventTimersSyncedEvent(round);
  const settings = getSettingsEvent();
  const events: RoundSummaryEventItemEvent[] = [];
  let rolledCount = 0;

  for (const event of round.events) {
    const record = getLatestRollRecordForEvent(round, event.id);
    const status: SummaryEventStatusEvent = record
      ? record.source === "timeout_auto_fail"
        ? "timeout"
        : "done"
      : "pending";
    const total =
      record && Number.isFinite(Number(record.result.total))
        ? Number(record.result.total)
        : null;
    const success = record ? record.success : null;
    const resolvedOutcome = resolveTriggeredOutcomeEvent(event, record, settings);
    if (record) rolledCount++;

    events.push({
      id: event.id,
      title: event.title,
      desc: event.desc,
      targetLabel: event.targetLabel,
      skill: event.skill,
      checkDice: event.checkDice,
      compare: normalizeCompareOperatorEvent(event.compare) ?? ">=",
      dc: Number.isFinite(event.dc) ? Number(event.dc) : 0,
      rollMode: event.rollMode === "auto" ? "auto" : "manual",
      timeLimit: event.timeLimit ?? "none",
      status,
      resultSource: record?.source ?? null,
      total,
      skillModifierApplied: Number(record?.skillModifierApplied ?? 0),
      baseModifierUsed: Number(record?.baseModifierUsed ?? 0),
      finalModifierUsed: Number(record?.finalModifierUsed ?? 0),
      success,
      outcomeKind: resolvedOutcome.kind,
      outcomeText: resolvedOutcome.text,
      explosionTriggered: resolvedOutcome.explosionTriggered,
    });
  }

  return {
    roundId: round.roundId,
    openedAt: round.openedAt,
    closedAt: now,
    eventsCount: round.events.length,
    rolledCount,
    events,
  };
}

function ensureSummaryHistoryEvent(meta: DiceMetaEvent): RoundSummarySnapshotEvent[] {
  if (!Array.isArray(meta.summaryHistory)) {
    meta.summaryHistory = [];
  }
  return meta.summaryHistory;
}

function trimSummaryHistoryEvent(history: RoundSummarySnapshotEvent[]): void {
  if (history.length <= SUMMARY_HISTORY_MAX_STORED_Event) return;
  history.splice(0, history.length - SUMMARY_HISTORY_MAX_STORED_Event);
}

function normalizeSummaryInlineTextEvent(raw: string): string {
  const text = String(raw ?? "").replace(/\s+/g, " ").trim();
  return text.length > 0 ? text : "（空）";
}

function truncateSummaryTextEvent(raw: string, maxLen: number): string {
  const normalized = normalizeSummaryInlineTextEvent(raw);
  if (normalized.length <= maxLen) return normalized;
  return `${normalized.slice(0, Math.max(1, maxLen))}（已截断）`;
}

function getSummaryDescMaxLenByModeEvent(detailMode: SummaryDetailModeEvent): number {
  if (detailMode === "minimal") return 60;
  if (detailMode === "balanced") return 90;
  return 140;
}

function toSummarySourceTextEvent(source: EventRollSourceEvent | null | undefined): string {
  if (source === "manual_roll") return "手动检定";
  if (source === "ai_auto_roll") return "AI自动检定";
  if (source === "timeout_auto_fail") return "超时判定";
  return "未知";
}

function toSummaryResultSentenceEvent(item: RoundSummaryEventItemEvent): string {
  if (item.status === "pending") {
    return "待判定（尚未掷骰）";
  }

  if (item.status === "timeout" || item.resultSource === "timeout_auto_fail") {
    return "超时未操作，系统判定失败";
  }

  const totalText = item.total == null ? "-" : String(item.total);

  if (item.success === true) {
    if (item.resultSource === "ai_auto_roll") {
      return `AI自动检定成功（总值 ${totalText}）`;
    }
    return `成功（总值 ${totalText}）`;
  }

  if (item.success === false) {
    if (item.resultSource === "ai_auto_roll") {
      return `AI自动检定失败（总值 ${totalText}）`;
    }
    return `失败（总值 ${totalText}）`;
  }

  return `已完成（总值 ${totalText}）`;
}

function toSummaryOutcomeSentenceEvent(item: RoundSummaryEventItemEvent): string {
  const text = truncateSummaryTextEvent(item.outcomeText || "", 120);
  if (item.outcomeKind === "explode") {
    return `爆骰走向：${text}`;
  }
  if (item.outcomeKind === "success") {
    return `成功走向：${text}`;
  }
  if (item.outcomeKind === "failure") {
    return `失败走向：${text}`;
  }
  return `走向：${text}`;
}

function buildSummaryEventNaturalLineByModeEvent(
  item: RoundSummaryEventItemEvent,
  detailMode: SummaryDetailModeEvent,
  includeOutcomeInSummary: boolean
): string {
  const title = truncateSummaryTextEvent(item.title, 48);
  const desc = truncateSummaryTextEvent(item.desc, getSummaryDescMaxLenByModeEvent(detailMode));
  const target = truncateSummaryTextEvent(item.targetLabel || "未指定", 20);
  const resultSentence = toSummaryResultSentenceEvent(item);
  const outcomeSentence = includeOutcomeInSummary ? toSummaryOutcomeSentenceEvent(item) : "";
  const baseModifierUsed = Number.isFinite(Number(item.baseModifierUsed))
    ? Number(item.baseModifierUsed)
    : 0;
  const skillModifierApplied = Number.isFinite(Number(item.skillModifierApplied))
    ? Number(item.skillModifierApplied)
    : 0;
  const finalModifierUsed = Number.isFinite(Number(item.finalModifierUsed))
    ? Number(item.finalModifierUsed)
    : baseModifierUsed + skillModifierApplied;
  const modifierSentence = `修正 ${formatModifier(baseModifierUsed)} + 技能 ${formatModifier(
    skillModifierApplied
  )} = ${formatModifier(finalModifierUsed)}`;

  if (detailMode === "minimal") {
    return includeOutcomeInSummary
      ? `- 标题：${title}｜对象：${target}｜描述：${desc}｜结果：${resultSentence}｜${outcomeSentence}`
      : `- 标题：${title}｜对象：${target}｜描述：${desc}｜结果：${resultSentence}`;
  }

  const skill = truncateSummaryTextEvent(item.skill, 20);
  const checkDice = truncateSummaryTextEvent(item.checkDice, 24);
  const checkText = `${skill} ${checkDice}，条件 ${item.compare} ${item.dc}`;

  if (detailMode === "balanced") {
    return includeOutcomeInSummary
      ? `- 标题：${title}｜对象：${target}｜描述：${desc}｜检定：${checkText}｜${modifierSentence}｜结果：${resultSentence}｜${outcomeSentence}`
      : `- 标题：${title}｜对象：${target}｜描述：${desc}｜检定：${checkText}｜${modifierSentence}｜结果：${resultSentence}`;
  }

  const sourceText = toSummarySourceTextEvent(item.resultSource);
  const timeLimit = truncateSummaryTextEvent(item.timeLimit || "none", 26);
  return includeOutcomeInSummary
    ? `- 标题：${title}｜对象：${target}｜描述：${desc}｜检定：${checkText}｜${modifierSentence}｜来源：${sourceText}｜模式：${item.rollMode}｜时限：${timeLimit}｜结果：${resultSentence}｜${outcomeSentence}`
    : `- 标题：${title}｜对象：${target}｜描述：${desc}｜检定：${checkText}｜${modifierSentence}｜来源：${sourceText}｜模式：${item.rollMode}｜时限：${timeLimit}｜结果：${resultSentence}`;
}

function buildSummaryBlockFromHistoryEvent(
  history: RoundSummarySnapshotEvent[],
  detailMode: SummaryDetailModeEvent,
  lastNRounds: number,
  includeOutcomeInSummary: boolean
): string {
  if (!Array.isArray(history) || history.length === 0) return "";
  const roundsWindow = Math.min(
    SUMMARY_HISTORY_ROUNDS_MAX_Event,
    Math.max(SUMMARY_HISTORY_ROUNDS_MIN_Event, Math.floor(Number(lastNRounds) || 1))
  );
  const selected = history.slice(-roundsWindow);
  if (selected.length === 0) return "";

  const lines: string[] = [];
  lines.push(DICE_SUMMARY_BLOCK_START_Event);
  lines.push(
    `v=5 fmt=nl detail=${detailMode} window_rounds=${roundsWindow} included_rounds=${selected.length} include_outcome=${includeOutcomeInSummary ? "1" : "0"}`
  );

  let emittedEventLines = 0;
  let truncatedByTotalLimit = false;
  for (let i = 0; i < selected.length; i++) {
    const snapshot = selected[i];
    const unresolved = Math.max(0, snapshot.eventsCount - snapshot.rolledCount);
    lines.push(
      `【第 ${i + 1} 轮 / roundId=${snapshot.roundId} / 关闭时间=${new Date(
        snapshot.closedAt
      ).toISOString()}】`
    );
    lines.push(
      `本轮事件数=${snapshot.eventsCount}，已结算=${snapshot.rolledCount}，未结算=${unresolved}`
    );

    const limitedPerRound = snapshot.events.slice(0, SUMMARY_MAX_EVENTS_Event);
    for (const item of limitedPerRound) {
      if (emittedEventLines >= SUMMARY_MAX_TOTAL_EVENT_LINES_Event) {
        truncatedByTotalLimit = true;
        break;
      }
      lines.push(buildSummaryEventNaturalLineByModeEvent(item, detailMode, includeOutcomeInSummary));
      emittedEventLines++;
    }

    if (snapshot.events.length > SUMMARY_MAX_EVENTS_Event) {
      lines.push(`注：本轮还有 ${snapshot.events.length - SUMMARY_MAX_EVENTS_Event} 个事件未展开。`);
    }

    if (truncatedByTotalLimit) break;
  }

  if (truncatedByTotalLimit) {
    lines.push("注：后续事件因长度限制未展开。");
  }
  lines.push(DICE_SUMMARY_BLOCK_END_Event);
  return lines.join("\n");
}

function applyManagedSystemContentEvent(
  chat: TavernMessageEvent[],
  managedBlock: string
): void {
  const hasLegacyTextShape = chat.some((item) => {
    if (!item || typeof item !== "object") return false;
    return (
      Object.prototype.hasOwnProperty.call(item, "mes") ||
      Object.prototype.hasOwnProperty.call(item, "message") ||
      Object.prototype.hasOwnProperty.call(item, "text")
    );
  });

  const systemIndex = findFirstSystemIndexEvent(chat);
  if (systemIndex >= 0) {
    const systemMessage = chat[systemIndex];
    const base = stripManagedBlocksEvent(
      typeof systemMessage.content === "string" ? systemMessage.content : getMessageTextEvent(systemMessage)
    );
    const next = normalizeBlankLinesEvent([base, managedBlock].filter(Boolean).join("\n\n"));

    systemMessage.content = next;
    // 不删除 legacy 字段，避免破坏 ST 聊天消息结构导致完整性校验失败。
    if (hasLegacyTextShape || Object.prototype.hasOwnProperty.call(systemMessage, "mes")) {
      systemMessage.mes = next;
    }
    if (
      hasLegacyTextShape ||
      Object.prototype.hasOwnProperty.call(systemMessage as any, "message")
    ) {
      (systemMessage as any).message = next;
    }
    if (hasLegacyTextShape || Object.prototype.hasOwnProperty.call(systemMessage as any, "text")) {
      (systemMessage as any).text = next;
    }
    systemMessage.is_system = true;
    systemMessage.role = systemMessage.role || "system";
    return;
  }

  if (!managedBlock.trim()) return;
  const systemMessage: TavernMessageEvent = {
    role: "system",
    is_system: true,
    content: managedBlock,
  };
  if (hasLegacyTextShape) {
    systemMessage.mes = managedBlock;
    (systemMessage as any).message = managedBlock;
    (systemMessage as any).text = managedBlock;
  }
  chat.unshift(systemMessage);
}

function composePromptInjectionsEvent(promptChat: TavernMessageEvent[]): string {
  const settings = getSettingsEvent();
  if (!settings.enabled) return "";
  sweepTimeoutFailuresEvent();

  const meta = getDiceMetaEvent();
  const lastUser = findLastUserMessageEvent(promptChat);
  const currentUserId = lastUser ? buildPromptMessageIdEvent(lastUser) : "";
  const isNewUserPrompt =
    Boolean(currentUserId) && currentUserId !== meta.lastPromptUserMsgId;

  let summaryToInject = "";
  let changed = false;

  if (isNewUserPrompt) {
    const history = ensureSummaryHistoryEvent(meta);
    if (meta.pendingRound) {
      const snapshot = createRoundSummarySnapshotEvent(meta.pendingRound, Date.now());
      history.push(snapshot);
      trimSummaryHistoryEvent(history);
      delete meta.pendingRound;
      changed = true;
    }

    summaryToInject = buildSummaryBlockFromHistoryEvent(
      history,
      settings.summaryDetailMode,
      settings.summaryHistoryRounds,
      settings.includeOutcomeInSummary
    );

    if (summaryToInject) {
      const latestRoundId = history.length > 0 ? history[history.length - 1].roundId : "none";
      meta.outboundSummary = {
        userMsgId: currentUserId,
        roundId: latestRoundId,
        summaryText: summaryToInject,
      };
      const currentChars = summaryToInject.length;
      console.info(
        `[骰子插件] DICE_ROUND_SUMMARY chars=${currentChars} detail=${settings.summaryDetailMode} rounds=${settings.summaryHistoryRounds} includeOutcome=${settings.includeOutcomeInSummary} format=nl-v5`
      );
      changed = true;
    } else if (meta.outboundSummary) {
      delete meta.outboundSummary;
      changed = true;
    }
  } else if (currentUserId && meta.outboundSummary?.userMsgId === currentUserId) {
    // 同一用户输入触发的重试请求，复用同一份 summary，保证幂等。
    summaryToInject = meta.outboundSummary.summaryText;
  }

  if (currentUserId && currentUserId !== meta.lastPromptUserMsgId) {
    meta.lastPromptUserMsgId = currentUserId;
    changed = true;
  }

  if (changed) saveMetadataSafeEvent();

  const blocks: string[] = [];
  if (settings.autoSendRuleToAI) blocks.push(buildDiceRuleBlockEvent());
  if (summaryToInject) blocks.push(summaryToInject);
  return blocks.join("\n\n").trim();
}

function extractPromptChatFromPayloadEvent(payload: any): TavernMessageEvent[] | null {
  if (!payload || typeof payload !== "object") return null;
  const candidates = [payload, payload?.request, payload?.data, payload?.payload, payload?.params];
  for (const candidate of candidates) {
    if (!candidate || typeof candidate !== "object") continue;
    if (Array.isArray(candidate.messages)) return candidate.messages as TavernMessageEvent[];
  }
  for (const candidate of candidates) {
    if (!candidate || typeof candidate !== "object") continue;
    if (Array.isArray(candidate.chat)) return candidate.chat as TavernMessageEvent[];
  }
  return null;
}

function handlePromptReadyEvent(payload: any, sourceEvent = "unknown"): void {
  if (!payload || payload.dryRun) return;

  const promptChat = extractPromptChatFromPayloadEvent(payload);
  if (!promptChat || !Array.isArray(promptChat)) return;

  const managed = composePromptInjectionsEvent(promptChat);
  if (!managed) {
    const settings = getSettingsEvent();
    if (settings.enabled && settings.autoSendRuleToAI) {
      console.info(`[骰子插件] ${sourceEvent} 命中 prompt 事件，但无需注入（managed 为空）`);
    }
    return;
  }

  applyManagedSystemContentEvent(promptChat, managed);
  console.info(`[骰子插件] 已在 ${sourceEvent} 注入 system 规则`);
}

function findLatestAssistantEvent(
  chat: TavernMessageEvent[]
): { msg: TavernMessageEvent; index: number } | null {
  for (let i = chat.length - 1; i >= 0; i--) {
    if (isAssistantMessageEvent(chat[i])) {
      return { msg: chat[i], index: i };
    }
  }
  return null;
}

function buildAssistantMessageIdEvent(message: TavernMessageEvent, index: number): string {
  const explicitId = message.id ?? message.cid ?? message.uid;
  const hash = simpleHashEvent(getMessageTextEvent(message));
  if (explicitId != null) {
    return `assistant:${String(explicitId)}:${hash}`;
  }
  return `assistant_idx:${index}:${hash}`;
}

function normalizeCompareOperatorEvent(raw: any): CompareOperatorEvent | null {
  if (raw == null || raw === "") return ">=";
  if (raw === ">=" || raw === ">" || raw === "<=" || raw === "<") return raw;
  return null;
}

function normalizeStringFieldEvent(raw: any): string {
  return typeof raw === "string" ? raw.trim() : "";
}

function normalizeSkillKeyEvent(raw: any): string {
  return normalizeStringFieldEvent(raw).toLowerCase();
}

function normalizeSkillTableObjectEvent(raw: any): Record<string, number> | null {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return null;
  const normalized: Record<string, number> = {};
  for (const [key, value] of Object.entries(raw as Record<string, any>)) {
    const normalizedKey = normalizeSkillKeyEvent(key);
    if (!normalizedKey) continue;
    const numericValue = Number(value);
    if (!Number.isFinite(numericValue)) continue;
    normalized[normalizedKey] = numericValue;
  }
  return normalized;
}

function normalizeSkillTableTextForSettingsEvent(raw: string): string | null {
  const text = String(raw ?? "").trim();
  if (!text) return "{}";
  try {
    const parsed = JSON.parse(text);
    const normalized = normalizeSkillTableObjectEvent(parsed);
    if (normalized == null) return null;
    return JSON.stringify(normalized, null, 2);
  } catch {
    return null;
  }
}

let SKILL_TABLE_CACHE_TEXT_Event = "";
let SKILL_TABLE_CACHE_MAP_Event: Record<string, number> = {};

function getSkillModifierTableMapEvent(settings: DicePluginSettingsEvent): Record<string, number> {
  const rawText = String(settings.skillTableText ?? "").trim();
  if (rawText === SKILL_TABLE_CACHE_TEXT_Event) {
    return SKILL_TABLE_CACHE_MAP_Event;
  }
  SKILL_TABLE_CACHE_TEXT_Event = rawText;
  if (!rawText) {
    SKILL_TABLE_CACHE_MAP_Event = {};
    return SKILL_TABLE_CACHE_MAP_Event;
  }
  try {
    const parsed = JSON.parse(rawText);
    const normalized = normalizeSkillTableObjectEvent(parsed);
    if (normalized == null) {
      console.warn("[骰子插件] skillTableText 不是 JSON 对象，已按空表处理");
      SKILL_TABLE_CACHE_MAP_Event = {};
      return SKILL_TABLE_CACHE_MAP_Event;
    }
    SKILL_TABLE_CACHE_MAP_Event = normalized;
    return SKILL_TABLE_CACHE_MAP_Event;
  } catch (error) {
    console.warn("[骰子插件] skillTableText 解析失败，已按空表处理", error);
    SKILL_TABLE_CACHE_MAP_Event = {};
    return SKILL_TABLE_CACHE_MAP_Event;
  }
}

function resolveSkillModifierBySkillNameEvent(
  skillName: string,
  settings = getSettingsEvent()
): number {
  if (!settings.enableSkillSystem) return 0;
  const key = normalizeSkillKeyEvent(skillName);
  if (!key) return 0;
  const table = getSkillModifierTableMapEvent(settings);
  const value = Number(table[key] ?? 0);
  return Number.isFinite(value) ? value : 0;
}

function normalizeOutcomeTextEvent(
  raw: any,
  fieldName: "success" | "failure" | "explode",
  eventId: string
): string | undefined {
  const text = normalizeStringFieldEvent(raw);
  if (!text) return undefined;
  if (text.length <= OUTCOME_TEXT_MAX_LEN_Event) return text;
  const truncated = text.slice(0, OUTCOME_TEXT_MAX_LEN_Event);
  console.warn(
    `[骰子插件] outcomes.${fieldName} 过长，已截断: event=${eventId} len=${text.length}`
  );
  return `${truncated}（已截断）`;
}

function normalizeOutcomesEvent(raw: any, eventId: string): EventOutcomesEvent | undefined {
  if (!raw || typeof raw !== "object") return undefined;
  const success = normalizeOutcomeTextEvent((raw as any).success, "success", eventId);
  const failure = normalizeOutcomeTextEvent((raw as any).failure, "failure", eventId);
  const explode = normalizeOutcomeTextEvent((raw as any).explode, "explode", eventId);
  if (!success && !failure && !explode) return undefined;
  return { success, failure, explode };
}

type ResolvedOutcomeEvent = {
  kind: EventOutcomeKindEvent;
  text: string;
  explosionTriggered: boolean;
};

function resolveTriggeredOutcomeEvent(
  event: DiceEventSpecEvent,
  record: EventRollRecordEvent | null | undefined,
  settings: DicePluginSettingsEvent
): ResolvedOutcomeEvent {
  if (!settings.enableOutcomeBranches) {
    return { kind: "none", text: "走向分支已关闭。", explosionTriggered: false };
  }

  const outcomes = event.outcomes;
  const explosionTriggered = Boolean(record?.result?.explosionTriggered);
  if (
    settings.enableExplodeOutcomeBranch &&
    explosionTriggered &&
    outcomes?.explode &&
    outcomes.explode.trim()
  ) {
    return { kind: "explode", text: outcomes.explode.trim(), explosionTriggered: true };
  }

  if (record?.success === true) {
    return {
      kind: "success",
      text: outcomes?.success?.trim() || "判定成功，剧情向有利方向推进。",
      explosionTriggered,
    };
  }
  if (record?.success === false || record?.source === "timeout_auto_fail") {
    return {
      kind: "failure",
      text: outcomes?.failure?.trim() || "判定失败，剧情向不利方向推进。",
      explosionTriggered,
    };
  }

  return { kind: "none", text: "尚未结算。", explosionTriggered };
}

function parseIsoDurationToMsEvent(raw: string): number | null {
  const value = normalizeStringFieldEvent(raw);
  if (!value) return null;
  if (!ISO_8601_DURATION_REGEX_Event.test(value)) {
    console.warn("[骰子插件] 非法 timeLimit，已按不限时处理:", value);
    return null;
  }

  // 仅支持常用组合：PnW/PnD/PTnHnMnS
  const match = value.match(
    /^P(?:(\d+)W)?(?:(\d+)D)?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?)?$/i
  );
  if (!match) {
    console.warn("[骰子插件] 不支持的 timeLimit 组合，已按不限时处理:", value);
    return null;
  }

  const weeks = Number(match[1] || 0);
  const days = Number(match[2] || 0);
  const hours = Number(match[3] || 0);
  const minutes = Number(match[4] || 0);
  const seconds = Number(match[5] || 0);
  const totalSeconds = (((weeks * 7 + days) * 24 + hours) * 60 + minutes) * 60 + seconds;
  const totalMs = totalSeconds * 1000;
  if (!Number.isFinite(totalMs) || totalMs < 0) {
    console.warn("[骰子插件] timeLimit 解析失败，已按不限时处理:", value);
    return null;
  }
  return totalMs;
}

function applyTimeLimitPolicyMsEvent(
  durationMs: number | null,
  settings: DicePluginSettingsEvent
): number | null {
  if (!settings.enableTimeLimit) return null;
  if (durationMs == null) return null;
  const minSeconds = Math.max(1, Math.floor(Number(settings.minTimeLimitSeconds) || 1));
  const minMs = minSeconds * 1000;
  if (durationMs < minMs) {
    console.info(
      `[骰子插件] timeLimit 低于最短时限，已提升到 ${minSeconds}s（原始 ${durationMs}ms）`
    );
    return minMs;
  }
  return durationMs;
}

function formatCountdownMsEvent(ms: number): string {
  const totalSeconds = Math.max(0, Math.ceil(ms / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  if (hours > 0) {
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function createSyntheticTimeoutDiceResultEvent(event: DiceEventSpecEvent): DiceResult {
  let count = 0;
  let sides = 0;
  let modifier = 0;
  try {
    const parsed = parseDiceExpression(event.checkDice);
    count = parsed.count;
    sides = parsed.sides;
    modifier = parsed.modifier;
  } catch {
    // 保持 0，避免超时失败因为异常中断
  }
  return {
    expr: event.checkDice || "timeout",
    count,
    sides,
    modifier,
    rolls: [],
    rawTotal: 0,
    total: 0,
  };
}

function applySkillModifierToDiceResultEvent(
  result: DiceResult,
  skillModifier: number
): { result: DiceResult; baseModifierUsed: number; finalModifierUsed: number } {
  const baseModifierUsed = Number.isFinite(Number(result.modifier)) ? Number(result.modifier) : 0;
  const numericSkillModifier = Number.isFinite(Number(skillModifier)) ? Number(skillModifier) : 0;
  const finalModifierUsed = baseModifierUsed + numericSkillModifier;
  if (numericSkillModifier === 0) {
    return { result, baseModifierUsed, finalModifierUsed };
  }
  return {
    result: {
      ...result,
      modifier: finalModifierUsed,
      total: Number(result.rawTotal) + finalModifierUsed,
    },
    baseModifierUsed,
    finalModifierUsed,
  };
}

function ensureEventTimerIndexEvent(
  round: PendingRoundEvent
): Record<string, EventTimerStateEvent> {
  if (!round.eventTimers || typeof round.eventTimers !== "object") {
    round.eventTimers = {};
  }
  return round.eventTimers;
}

function getLatestRollRecordForEvent(
  round: PendingRoundEvent,
  eventId: string
): EventRollRecordEvent | null {
  for (let i = round.rolls.length - 1; i >= 0; i--) {
    if (round.rolls[i]?.eventId === eventId) return round.rolls[i];
  }
  return null;
}

function ensureRoundEventTimersSyncedEvent(round: PendingRoundEvent): void {
  const settings = getSettingsEvent();
  const timers = ensureEventTimerIndexEvent(round);
  const now = Date.now();
  const keepIds = new Set<string>();

  for (const event of round.events) {
    keepIds.add(event.id);
    if (!event.targetType || !event.targetLabel) {
      const resolvedTarget = resolveEventTargetEvent(
        { type: (event as any).targetType, name: (event as any).targetName },
        event.scope
      );
      event.targetType = resolvedTarget.targetType;
      event.targetName = resolvedTarget.targetName;
      event.targetLabel = resolvedTarget.targetLabel;
    }
    const parsedDurationMs =
      typeof event.timeLimitMs === "number" && Number.isFinite(event.timeLimitMs)
        ? Math.max(0, event.timeLimitMs)
        : parseIsoDurationToMsEvent(event.timeLimit || "");
    const durationMs = applyTimeLimitPolicyMsEvent(parsedDurationMs, settings);
    event.timeLimitMs = durationMs;

    let timer = timers[event.id];
    const existingRecord = getLatestRollRecordForEvent(round, event.id);
    if (!timer) {
      const offeredAt =
        typeof event.offeredAt === "number" && Number.isFinite(event.offeredAt)
          ? event.offeredAt
          : now;
      const deadlineAt = durationMs == null ? null : offeredAt + durationMs;
      timer = { offeredAt, deadlineAt };
      timers[event.id] = timer;
    } else {
      if (!Number.isFinite(timer.offeredAt)) {
        timer.offeredAt =
          typeof event.offeredAt === "number" && Number.isFinite(event.offeredAt)
            ? event.offeredAt
            : now;
      }
      if (timer.deadlineAt !== null && !Number.isFinite(timer.deadlineAt)) {
        timer.deadlineAt =
          typeof event.deadlineAt === "number" && Number.isFinite(event.deadlineAt)
            ? event.deadlineAt
            : null;
      }
    }

    if (!existingRecord) {
      timer.deadlineAt = durationMs == null ? null : timer.offeredAt + durationMs;
      if (timer.deadlineAt == null) {
        delete timer.expiredAt;
      }
    } else if (existingRecord.source === "timeout_auto_fail") {
      timer.expiredAt = existingRecord.timeoutAt ?? existingRecord.rolledAt;
    }

    event.offeredAt = timer.offeredAt;
    event.deadlineAt = timer.deadlineAt;
  }

  for (const key of Object.keys(timers)) {
    if (!keepIds.has(key)) {
      delete timers[key];
    }
  }
}

function normalizeEventScopeTagEvent(raw: any): EventScopeTagEvent | undefined {
  const value = normalizeStringFieldEvent(raw).toLowerCase();
  if (!value) return undefined;
  if (
    value === "protagonist" ||
    value === "player" ||
    value === "user" ||
    value === "mc" ||
    value === "main_character"
  ) {
    return "protagonist";
  }
  if (value === "all" || value === "any" || value === "both") {
    return "all";
  }
  if (
    value === "character" ||
    value === "assistant" ||
    value === "npc" ||
    value === "self"
  ) {
    return "character";
  }
  return undefined;
}

function normalizeEventRollModeEvent(raw: any): EventRollModeEvent | undefined {
  const value = normalizeStringFieldEvent(raw).toLowerCase();
  if (!value) return undefined;
  if (value === "auto" || value === "automatic" || value === "system" || value === "ai") {
    return "auto";
  }
  if (value === "manual" || value === "user" || value === "player") {
    return "manual";
  }
  return undefined;
}

function normalizeEventTargetTypeEvent(raw: any): EventTargetTypeEvent | undefined {
  const value = normalizeStringFieldEvent(raw).toLowerCase();
  if (!value) return undefined;
  if (
    value === "self" ||
    value === "protagonist" ||
    value === "player" ||
    value === "mc" ||
    value === "main_character"
  ) {
    return "self";
  }
  if (value === "scene" || value === "situation" || value === "environment" || value === "context") {
    return "scene";
  }
  if (
    value === "supporting" ||
    value === "character" ||
    value === "npc" ||
    value === "assistant"
  ) {
    return "supporting";
  }
  if (value === "object" || value === "item" || value === "thing" || value === "prop") {
    return "object";
  }
  if (value === "other" || value === "misc") {
    return "other";
  }
  return undefined;
}

function formatEventTargetLabelEvent(type: EventTargetTypeEvent, name?: string): string {
  const normalizedName = normalizeStringFieldEvent(name);
  if (type === "self") return "主角自己";
  if (type === "scene") return "情景";
  if (type === "supporting") return normalizedName ? `配角${normalizedName}` : "配角";
  if (type === "object") return normalizedName ? `物件${normalizedName}` : "物件";
  return normalizedName ? `其他对象${normalizedName}` : "其他对象";
}

function resolveEventTargetEvent(
  raw: any,
  scope?: EventScopeTagEvent
): { targetType: EventTargetTypeEvent; targetName?: string; targetLabel: string } {
  const payload =
    raw && typeof raw === "object" && !Array.isArray(raw)
      ? (raw as Record<string, any>)
      : ({} as Record<string, any>);
  let targetType = normalizeEventTargetTypeEvent(
    payload.type ?? payload.targetType ?? payload.kind ?? raw
  );
  const targetName = normalizeStringFieldEvent(
    payload.name ?? payload.targetName ?? payload.label ?? payload.value
  );
  if (!targetType) {
    if (scope === "protagonist") targetType = "self";
    else if (scope === "character") targetType = "supporting";
    else targetType = "scene";
  }
  const normalizedTargetName = targetName || undefined;
  return {
    targetType,
    targetName: normalizedTargetName,
    targetLabel: formatEventTargetLabelEvent(targetType, normalizedTargetName),
  };
}

function isLikelyProtagonistActionEvent(event: DiceEventSpecEvent): boolean {
  if (event.targetType === "self") return true;
  if (event.targetType === "supporting" || event.targetType === "object") return false;
  if (event.scope === "protagonist" || event.scope === "all") return true;
  if (event.scope === "character") return false;
  const text = `${event.title}\n${event.desc}\n${event.skill}\n${event.targetLabel}`;
  return /(你|你要|你需要|你必须|玩家|主角|\byou\b|\byour\b|\bplayer\b|\bprotagonist\b)/i.test(
    text
  );
}

function filterEventsByApplyScopeEvent(
  events: DiceEventSpecEvent[],
  applyScope: EventApplyScopeSettingEvent
): DiceEventSpecEvent[] {
  if (applyScope === "all") return events;
  return events.filter(isLikelyProtagonistActionEvent);
}

function normalizeEventSpecEvent(raw: any): DiceEventSpecEvent | null {
  if (!raw || typeof raw !== "object") return null;

  const id = normalizeStringFieldEvent(raw.id);
  const title = normalizeStringFieldEvent(raw.title);
  const checkDice = normalizeStringFieldEvent(raw.checkDice);
  const skill = normalizeStringFieldEvent(raw.skill);
  const timeLimitRaw = normalizeStringFieldEvent(raw.timeLimit);
  const desc = normalizeStringFieldEvent(raw.desc);
  const compare = normalizeCompareOperatorEvent(raw.compare);
  const scope = normalizeEventScopeTagEvent(raw.scope ?? raw.eventScope ?? raw.applyTo);
  const resolvedTarget = resolveEventTargetEvent(
    raw.target ?? { type: raw.targetType, name: raw.targetName ?? raw.targetLabel },
    scope
  );
  const rollMode = normalizeEventRollModeEvent(raw.rollMode);
  const dc = Number(raw.dc);
  const aliasOutcomes = {
    success: raw.successOutcome,
    failure: raw.failureOutcome,
    explode: raw.explodeOutcome,
  };
  const outcomesRaw =
    raw.outcomes && typeof raw.outcomes === "object"
      ? { ...aliasOutcomes, ...(raw.outcomes as Record<string, any>) }
      : aliasOutcomes;
  const outcomes = normalizeOutcomesEvent(outcomesRaw, id || "unknown_event");
  const rawTimeLimitMs = parseIsoDurationToMsEvent(timeLimitRaw);
  const settings = getSettingsEvent();
  const timeLimitMs = applyTimeLimitPolicyMsEvent(rawTimeLimitMs, settings);
  const timeLimit = timeLimitRaw && rawTimeLimitMs != null ? timeLimitRaw : undefined;

  if (!id || !title || !checkDice || !skill || !desc) return null;
  if (compare == null) return null;
  if (!Number.isFinite(dc)) return null;

  try {
    parseDiceExpression(checkDice);
  } catch {
    return null;
  }

  return {
    id,
    title,
    checkDice,
    dc,
    compare,
    scope,
    rollMode,
    skill,
    targetType: resolvedTarget.targetType,
    targetName: resolvedTarget.targetName,
    targetLabel: resolvedTarget.targetLabel,
    timeLimitMs,
    timeLimit,
    desc,
    outcomes,
  };
}

function normalizeEnvelopeEvent(raw: any): { events: DiceEventSpecEvent[] } | null {
  if (!raw || typeof raw !== "object") return null;
  if (raw.type !== "dice_events") return null;
  if (String(raw.version) !== "1") return null;
  if (!Array.isArray(raw.events)) return null;

  const events: DiceEventSpecEvent[] = [];
  for (const candidate of raw.events) {
    const normalized = normalizeEventSpecEvent(candidate);
    if (!normalized) {
      console.warn("[骰子插件] 丢弃非法事件字段", candidate);
      continue;
    }
    events.push(normalized);
  }
  if (events.length === 0) return null;
  return { events };
}

type RemovalRangeEvent = { start: number; end: number };

function repairAndParseEventJsonEvent(rawInput: string): any | null {
  const base = String(rawInput || "")
    .replace(/[\u200B-\u200D\u2060]/g, "")
    .replace(/\uFEFF/g, "")
    .trim();
  if (!base) return null;

  const variants: string[] = [];
  const pushVariant = (value: string) => {
    const v = value.trim();
    if (!v) return;
    if (!variants.includes(v)) variants.push(v);
  };

  const normalizeTypography = (value: string): string =>
    value
      .replace(/[“”]/g, '"')
      .replace(/[‘’]/g, "'")
      .replace(/：/g, ":")
      .replace(/，/g, ",")
      .replace(/\u00A0/g, " ");

  const stripTrailingComma = (value: string): string => value.replace(/,\s*([}\]])/g, "$1");

  // 兼容被二次包裹的 markdown 代码围栏（例如 <pre><code>```rolljson ... ```</code></pre>）。
  const stripCodeFence = (value: string): string =>
    value
      .replace(/^\s*```[a-zA-Z0-9_-]*\s*[\r\n]+/, "")
      .replace(/[\r\n]+\s*```\s*$/, "")
      .trim();

  // 兼容首行残留语言标签（rolljson/json）。
  const stripLeadingLanguageTag = (value: string): string =>
    value.replace(/^\s*(?:rolljson|json)\s*[\r\n]+/i, "").trim();

  // 从混合文本里提取首个“括号平衡”的 JSON 对象，避免 first/last brace 误截断。
  const extractBalancedObject = (value: string): string | null => {
    const start = value.indexOf("{");
    if (start < 0) return null;

    let depth = 0;
    let inString = false;
    let escaped = false;
    for (let i = start; i < value.length; i++) {
      const ch = value[i];
      if (inString) {
        if (escaped) {
          escaped = false;
          continue;
        }
        if (ch === "\\") {
          escaped = true;
          continue;
        }
        if (ch === '"') {
          inString = false;
        }
        continue;
      }

      if (ch === '"') {
        inString = true;
        continue;
      }
      if (ch === "{") {
        depth += 1;
        continue;
      }
      if (ch === "}") {
        depth -= 1;
        if (depth === 0) {
          return value.slice(start, i + 1);
        }
      }
    }
    return null;
  };

  const seedVariants = [
    base,
    stripCodeFence(base),
    stripLeadingLanguageTag(base),
    stripLeadingLanguageTag(stripCodeFence(base)),
  ];

  for (const seed of seedVariants) {
    if (!seed) continue;
    pushVariant(seed);
    pushVariant(normalizeTypography(seed));
    pushVariant(stripTrailingComma(seed));
    pushVariant(stripTrailingComma(normalizeTypography(seed)));

    const balanced = extractBalancedObject(seed);
    if (balanced) {
      pushVariant(balanced);
      pushVariant(normalizeTypography(balanced));
      pushVariant(stripTrailingComma(balanced));
      pushVariant(stripTrailingComma(normalizeTypography(balanced)));
    }
  }

  for (const candidate of variants) {
    try {
      return JSON.parse(candidate);
    } catch {
      // try next candidate
    }
  }
  return null;
}

function decodeHtmlEntitiesEvent(input: string): string {
  try {
    const textarea = document.createElement("textarea");
    textarea.innerHTML = input;
    return textarea.value;
  } catch {
    return input
      .replace(/&quot;/g, '"')
      .replace(/&#34;/g, '"')
      .replace(/&apos;/g, "'")
      .replace(/&#39;/g, "'")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&amp;/g, "&");
  }
}

function parseEventEnvelopesEvent(text: string): {
  events: DiceEventSpecEvent[];
  ranges: RemovalRangeEvent[];
} {
  const regex = /```(?:rolljson|json)?\s*([\s\S]*?)```/gi;
  const ranges: RemovalRangeEvent[] = [];
  const events: DiceEventSpecEvent[] = [];

  let match: RegExpExecArray | null;
  while ((match = regex.exec(text)) !== null) {
    const raw = decodeHtmlEntitiesEvent(match[1] ?? "").trim();
    if (!raw) continue;
    const hasDiceEventType = /"type"\s*:\s*"dice_events"/i.test(raw);
    if (hasDiceEventType) {
      ranges.push({ start: match.index, end: match.index + match[0].length });
    }

    let parsed: any;
    try {
      parsed = repairAndParseEventJsonEvent(raw);
      if (!parsed) throw new Error("无法修复为合法 JSON");
    } catch (error) {
      if (hasDiceEventType) {
        console.warn("[骰子插件] 事件块 JSON 解析失败，已隐藏代码块", error);
      }
      continue;
    }
    const normalized = normalizeEnvelopeEvent(parsed);
    if (!normalized) continue;

    events.push(...normalized.events);
  }

  const htmlRegex = /<pre\b[\s\S]*?<\/pre>/gi;
  while ((match = htmlRegex.exec(text)) !== null) {
    const preBlock = match[0];
    const codeMatch = preBlock.match(/<code\b[^>]*>([\s\S]*?)<\/code>/i);
    const rawInner = (codeMatch ? codeMatch[1] : preBlock).replace(/<[^>]+>/g, "");
    const raw = decodeHtmlEntitiesEvent(rawInner).trim();
    if (!raw) continue;

    const hasDiceEventType = /"type"\s*:\s*"dice_events"/i.test(raw);
    if (hasDiceEventType) {
      ranges.push({ start: match.index, end: match.index + preBlock.length });
    }

    let parsed: any;
    try {
      parsed = repairAndParseEventJsonEvent(raw);
      if (!parsed) throw new Error("无法修复为合法 JSON");
    } catch (error) {
      if (hasDiceEventType) {
        console.warn("[骰子插件] HTML 事件块 JSON 解析失败，已隐藏代码块", error);
      }
      continue;
    }

    const normalized = normalizeEnvelopeEvent(parsed);
    if (!normalized) continue;
    events.push(...normalized.events);
  }

  return { events, ranges };
}

function removeRangesEvent(text: string, ranges: RemovalRangeEvent[]): string {
  if (ranges.length === 0) return text;
  const sorted = [...ranges].sort((a, b) => a.start - b.start);
  let cursor = 0;
  let output = "";
  for (const range of sorted) {
    if (range.start > cursor) {
      output += text.slice(cursor, range.start);
    }
    cursor = Math.max(cursor, range.end);
  }
  if (cursor < text.length) output += text.slice(cursor);
  return normalizeBlankLinesEvent(output);
}

function ensureOpenPendingRoundEvent(meta: DiceMetaEvent): PendingRoundEvent {
  const status = (meta.pendingRound as any)?.status;
  if (!meta.pendingRound || status !== "open") {
    meta.pendingRound = {
      roundId: createIdEvent("round"),
      status: "open",
      events: [],
      rolls: [],
      eventTimers: {},
      sourceAssistantMsgIds: [],
      openedAt: Date.now(),
    };
  }
  if (!meta.pendingRound.eventTimers || typeof meta.pendingRound.eventTimers !== "object") {
    meta.pendingRound.eventTimers = {};
  }
  return meta.pendingRound;
}

function createTimeoutFailureRecordEvent(
  round: PendingRoundEvent,
  event: DiceEventSpecEvent,
  now: number
): EventRollRecordEvent {
  const settings = getSettingsEvent();
  const compareUsed = normalizeCompareOperatorEvent(event.compare) ?? ">=";
  const dcUsed = Number.isFinite(event.dc) ? Number(event.dc) : null;
  const result = createSyntheticTimeoutDiceResultEvent(event);
  const baseModifierUsed = Number(result.modifier) || 0;
  const skillModifierApplied = resolveSkillModifierBySkillNameEvent(event.skill, settings);
  const finalModifierUsed = baseModifierUsed + skillModifierApplied;
  return {
    rollId: createIdEvent("eroll"),
    roundId: round.roundId,
    eventId: event.id,
    eventTitle: event.title,
    diceExpr: event.checkDice,
    result,
    success: false,
    compareUsed,
    dcUsed,
    skillModifierApplied,
    baseModifierUsed,
    finalModifierUsed,
    targetLabelUsed: event.targetLabel,
    rolledAt: now,
    source: "timeout_auto_fail",
    timeoutAt: now,
  };
}

function recordTimeoutFailureIfNeededEvent(
  round: PendingRoundEvent,
  event: DiceEventSpecEvent,
  now = Date.now()
): EventRollRecordEvent | null {
  const settings = getSettingsEvent();
  if (!settings.enableTimeLimit) return null;
  const existing = getLatestRollRecordForEvent(round, event.id);
  if (existing) return null;

  ensureRoundEventTimersSyncedEvent(round);
  const timer = round.eventTimers[event.id];
  if (!timer || timer.deadlineAt == null) return null;
  if (now <= timer.deadlineAt) return null;

  const record = createTimeoutFailureRecordEvent(round, event, now);
  round.rolls.push(record);
  timer.expiredAt = now;
  return record;
}

function sweepTimeoutFailuresEvent(): boolean {
  const settings = getSettingsEvent();
  if (!settings.enabled) return false;
  if (!settings.enableTimeLimit) return false;

  const meta = getDiceMetaEvent();
  const round = meta.pendingRound;
  if (!round) return false;

  ensureRoundEventTimersSyncedEvent(round);
  const now = Date.now();
  let changed = false;
  for (const event of round.events) {
    const created = recordTimeoutFailureIfNeededEvent(round, event, now);
    if (created) changed = true;
  }

  if (changed) {
    saveMetadataSafeEvent();
  }
  return changed;
}

function mergeEventsIntoPendingRoundEvent(
  events: DiceEventSpecEvent[],
  assistantMsgId: string
): PendingRoundEvent {
  const settings = getSettingsEvent();
  const meta = getDiceMetaEvent();
  const round = ensureOpenPendingRoundEvent(meta);
  const now = Date.now();
  const timers = ensureEventTimerIndexEvent(round);
  const merged = new Map<string, DiceEventSpecEvent>();
  for (const event of round.events) merged.set(event.id, { ...event });

  for (const incomingRaw of events) {
    const incoming = { ...incomingRaw };
    const previous = merged.get(incoming.id);
    const existingRecord = getLatestRollRecordForEvent(round, incoming.id);
    const next: DiceEventSpecEvent = {
      ...(previous || {}),
      ...incoming,
    };

    if (!existingRecord) {
      const parsedDurationMs =
        typeof next.timeLimitMs === "number" && Number.isFinite(next.timeLimitMs)
          ? Math.max(0, next.timeLimitMs)
          : parseIsoDurationToMsEvent(next.timeLimit || "");
      const durationMs = applyTimeLimitPolicyMsEvent(parsedDurationMs, settings);
      next.timeLimitMs = durationMs;
      next.offeredAt = now;
      next.deadlineAt = durationMs == null ? null : now + durationMs;
      timers[next.id] = {
        offeredAt: next.offeredAt,
        deadlineAt: next.deadlineAt,
      };
    } else {
      const timer = timers[next.id];
      if (timer) {
        next.offeredAt = timer.offeredAt;
        next.deadlineAt = timer.deadlineAt;
      } else if (previous) {
        next.offeredAt = previous.offeredAt;
        next.deadlineAt = previous.deadlineAt ?? null;
      }
    }

    merged.set(next.id, next);
  }

  round.events = Array.from(merged.values());
  ensureRoundEventTimersSyncedEvent(round);
  if (!round.sourceAssistantMsgIds.includes(assistantMsgId)) {
    round.sourceAssistantMsgIds.push(assistantMsgId);
  }
  saveMetadataSafeEvent();
  return round;
}

function formatRollRecordSummaryEvent(
  record: EventRollRecordEvent,
  event?: DiceEventSpecEvent
): string {
  const settings = getSettingsEvent();
  const baseModifierUsed = Number.isFinite(Number(record.baseModifierUsed))
    ? Number(record.baseModifierUsed)
    : Number(record.result.modifier) || 0;
  const skillModifierApplied = Number.isFinite(Number(record.skillModifierApplied))
    ? Number(record.skillModifierApplied)
    : 0;
  const finalModifierUsed = Number.isFinite(Number(record.finalModifierUsed))
    ? Number(record.finalModifierUsed)
    : baseModifierUsed + skillModifierApplied;
  let outcomeTag = "";
  if (settings.enableOutcomeBranches) {
    const resolved = event
      ? resolveTriggeredOutcomeEvent(event, record, settings)
      : record.result.explosionTriggered && settings.enableExplodeOutcomeBranch
      ? { kind: "explode" as EventOutcomeKindEvent }
      : record.success === true
      ? { kind: "success" as EventOutcomeKindEvent }
      : record.success === false
      ? { kind: "failure" as EventOutcomeKindEvent }
      : { kind: "none" as EventOutcomeKindEvent };
    if (resolved.kind !== "none") {
      outcomeTag = ` | 走向:${resolved.kind}`;
    }
  }
  const targetLabel = record.targetLabelUsed || event?.targetLabel || "";
  const targetTag = targetLabel ? ` | 对象:${targetLabel}` : "";
  const modifierTag = settings.enableSkillSystem
    ? ` | 修正:${formatEventModifierBreakdownEvent(
        baseModifierUsed,
        skillModifierApplied,
        finalModifierUsed
      )}`
    : "";

  if (record.source === "timeout_auto_fail") {
    return `超时自动判定失败${targetTag}${modifierTag}${outcomeTag}`;
  }
  if (record.source === "ai_auto_roll") {
    const status =
      record.success === null ? "未判定" : record.success ? "成功" : "失败";
    return `AI自动检定，总值 ${record.result.total} (${record.compareUsed} ${record.dcUsed ?? "?"} => ${status})${targetTag}${modifierTag}${outcomeTag}`;
  }
  const status =
    record.success === null ? "未判定" : record.success ? "成功" : "失败";
  return `总值 ${record.result.total} (${record.compareUsed} ${record.dcUsed ?? "?"} => ${status})${targetTag}${modifierTag}${outcomeTag}`;
}

type EventRuntimeToneEvent = "neutral" | "warn" | "danger" | "success";

type EventRuntimeViewStateEvent = {
  text: string;
  tone: EventRuntimeToneEvent;
  locked: boolean;
};

function getEventRuntimeViewStateEvent(
  round: PendingRoundEvent,
  event: DiceEventSpecEvent,
  now = Date.now()
): EventRuntimeViewStateEvent {
  const settings = getSettingsEvent();
  const record = getLatestRollRecordForEvent(round, event.id);
  if (record) {
    if (record.source === "timeout_auto_fail") {
      return { text: "已超时失败", tone: "danger", locked: true };
    }
    if (record.success === false) {
      return { text: "已结算(失败)", tone: "danger", locked: true };
    }
    return { text: "已结算", tone: "success", locked: true };
  }

  if (!settings.enableTimeLimit) {
    return { text: "时限关闭", tone: "neutral", locked: false };
  }

  ensureRoundEventTimersSyncedEvent(round);
  const timer = round.eventTimers[event.id];
  if (!timer || timer.deadlineAt == null) {
    return { text: "不限时", tone: "neutral", locked: false };
  }

  const remainingMs = timer.deadlineAt - now;
  if (remainingMs <= 0) {
    return { text: "已超时", tone: "danger", locked: true };
  }
  if (remainingMs <= 10_000) {
    return { text: `剩余 ${formatCountdownMsEvent(remainingMs)}`, tone: "warn", locked: false };
  }
  return { text: `剩余 ${formatCountdownMsEvent(remainingMs)}`, tone: "neutral", locked: false };
}

function getRuntimeToneStyleEvent(tone: EventRuntimeToneEvent): {
  border: string;
  background: string;
  color: string;
} {
  switch (tone) {
    case "warn":
      return {
        border: "1px solid rgba(255,196,87,0.55)",
        background: "rgba(71,47,14,0.45)",
        color: "#ffd987",
      };
    case "danger":
      return {
        border: "1px solid rgba(255,120,120,0.55)",
        background: "rgba(80,20,20,0.45)",
        color: "#ffb6b6",
      };
    case "success":
      return {
        border: "1px solid rgba(136,255,173,0.55)",
        background: "rgba(18,54,36,0.45)",
        color: "#bfffd1",
      };
    default:
      return {
        border: "1px solid rgba(173,201,255,0.45)",
        background: "rgba(20,36,62,0.45)",
        color: "#d1e6ff",
      };
  }
}

function setEventButtonsDisabledStateEvent(
  roundId: string,
  eventId: string,
  disabled: boolean
): void {
  const buttons = Array.from(
    document.querySelectorAll("button[data-dice-event-roll='1']")
  ) as HTMLButtonElement[];
  for (const button of buttons) {
    const btnRoundId = button.getAttribute("data-round-id") || "";
    const btnEventId = button.getAttribute("data-dice-event-id") || "";
    if (btnRoundId !== roundId || btnEventId !== eventId) continue;
    button.disabled = disabled;
    // 已锁定（已掷骰/超时）后直接隐藏按钮，避免刷新后仍可点击。
    button.style.display = disabled ? "none" : "inline-block";
    button.style.opacity = disabled ? "0.5" : "1";
    button.style.cursor = disabled ? "not-allowed" : "pointer";
    button.style.filter = disabled ? "grayscale(0.35)" : "";
  }
}

function refreshCountdownDomEvent(): void {
  const nodes = Array.from(
    document.querySelectorAll("[data-dice-countdown='1']")
  ) as HTMLElement[];
  const buttons = Array.from(
    document.querySelectorAll("button[data-dice-event-roll='1']")
  ) as HTMLButtonElement[];
  if (nodes.length === 0 && buttons.length === 0) return;

  const meta = getDiceMetaEvent();
  const round = meta.pendingRound;
  if (!round) {
    for (const button of buttons) {
      button.disabled = true;
      button.style.display = "none";
      button.style.opacity = "0.5";
      button.style.cursor = "not-allowed";
      button.style.filter = "grayscale(0.35)";
    }
    return;
  }

  ensureRoundEventTimersSyncedEvent(round);
  const now = Date.now();
  for (const node of nodes) {
    const roundId = node.getAttribute("data-round-id") || "";
    const eventId = node.getAttribute("data-event-id") || "";
    if (!roundId || !eventId || roundId !== round.roundId) continue;

    const event = round.events.find((item) => item.id === eventId);
    if (!event) continue;

    const state = getEventRuntimeViewStateEvent(round, event, now);
    const toneStyle = getRuntimeToneStyleEvent(state.tone);
    node.textContent = `⏱ ${state.text}`;
    node.style.border = toneStyle.border;
    node.style.background = toneStyle.background;
    node.style.color = toneStyle.color;
    setEventButtonsDisabledStateEvent(round.roundId, event.id, state.locked);
  }
}

function hideEventCodeBlocksInDomEvent(): void {
  try {
    const preBlocks = Array.from(document.querySelectorAll("pre"));
    for (const pre of preBlocks) {
      const text = (pre.textContent || "").trim();
      if (!text) continue;
      const hasEventPayload =
        text.includes("dice_events") &&
        text.includes("\"events\"") &&
        text.includes("\"type\"");
      if (!hasEventPayload) continue;
      pre.remove();
    }
  } catch (error) {
    console.warn("[骰子插件] 隐藏事件代码块失败", error);
  }
}

function sanitizeAssistantMessageEventBlocksEvent(message: TavernMessageEvent): boolean {
  const sourceCandidates = [
    getPreferredAssistantSourceTextEvent(message),
    getMessageTextEvent(message),
  ].filter((item, index, array) => item && array.indexOf(item) === index);

  for (const sourceText of sourceCandidates) {
    const { ranges } = parseEventEnvelopesEvent(sourceText);
    if (ranges.length === 0) continue;
    const cleaned = removeRangesEvent(sourceText, ranges);
    setMessageTextEvent(message, cleaned);
    return true;
  }

  return false;
}

function sanitizeCurrentChatEventBlocksEvent(): void {
  const liveCtx = getLiveContextEvent();
  if (!liveCtx?.chat || !Array.isArray(liveCtx.chat)) return;

  let changed = false;
  for (const item of liveCtx.chat as TavernMessageEvent[]) {
    if (!isAssistantMessageEvent(item)) continue;
    if (sanitizeAssistantMessageEventBlocksEvent(item)) {
      changed = true;
    }
  }

  if (changed) {
    persistChatSafeEvent();
  }
  hideEventCodeBlocksInDomEvent();
}

function buildOutcomePreviewHtmlEvent(
  event: DiceEventSpecEvent,
  settings: DicePluginSettingsEvent
): string {
  if (!settings.enableOutcomeBranches || !settings.showOutcomePreviewInListCard) return "";
  const success = event.outcomes?.success?.trim() || "未设置";
  const failure = event.outcomes?.failure?.trim() || "未设置";
  const explode =
    settings.enableExplodeOutcomeBranch
      ? event.outcomes?.explode?.trim() || "未设置"
      : "已关闭";
      
  return `
    <div style="margin-top:8px; margin-bottom:12px; padding:12px; border:1px solid rgba(197,160,89,0.3); border-radius:6px; background:linear-gradient(135deg, rgba(30,30,30,0.6) 0%, rgba(15,15,15,0.8) 100%); font-size:12px; line-height:1.6; box-shadow:inset 0 1px 4px rgba(0,0,0,0.5);">
      <div style="margin-bottom:10px; font-weight:600; color:#d1b67f; font-size:11px; letter-spacing:1px; display:flex; align-items:center;">
        <span style="flex-grow:1; height:1px; background:linear-gradient(90deg, transparent, rgba(197,160,89,0.4)); margin-right:8px;"></span>
        ✦ 走向预览 ✦
        <span style="margin-left:8px; flex-grow:1; height:1px; background:linear-gradient(270deg, transparent, rgba(197,160,89,0.4));"></span>
      </div>
      <div style="display:flex; margin-bottom:6px; align-items:flex-start;">
        <span style="display:inline-block; padding:0 6px; margin-right:10px; background:rgba(82,196,26,0.15); border:1px solid rgba(82,196,26,0.4); border-radius:4px; color:#73d13d; font-size:10px; font-family:monospace; line-height:1.6; white-space:nowrap; user-select:none; box-shadow:0 0 4px rgba(82,196,26,0.1);">成功</span>
        <span style="color:#e0e0e0; flex:1; word-break:break-word;">${escapeHtmlEvent(success)}</span>
      </div>
      <div style="display:flex; margin-bottom:6px; align-items:flex-start;">
        <span style="display:inline-block; padding:0 6px; margin-right:10px; background:rgba(255,77,79,0.15); border:1px solid rgba(255,77,79,0.4); border-radius:4px; color:#ff7875; font-size:10px; font-family:monospace; line-height:1.6; white-space:nowrap; user-select:none; box-shadow:0 0 4px rgba(255,77,79,0.1);">失败</span>
        <span style="color:#e0e0e0; flex:1; word-break:break-word;">${escapeHtmlEvent(failure)}</span>
      </div>
      <div style="display:flex; align-items:flex-start;">
        <span style="display:inline-block; padding:0 6px; margin-right:10px; background:rgba(250,173,20,0.15); border:1px solid rgba(250,173,20,0.4); border-radius:4px; color:#ffc53d; font-size:10px; font-family:monospace; line-height:1.6; white-space:nowrap; user-select:none; box-shadow:0 0 4px rgba(250,173,20,0.1);">爆骰</span>
        <span style="color:#e0e0e0; flex:1; word-break:break-word;">${escapeHtmlEvent(explode)}</span>
      </div>
    </div>
  `;
}

function outcomeKindLabelEvent(kind: EventOutcomeKindEvent): string {
  if (kind === "explode") return "爆骰走向";
  if (kind === "success") return "成功走向";
  if (kind === "failure") return "失败走向";
  return "剧情走向";
}


function buildEventListCardEvent(round: PendingRoundEvent): string {
  const settings = getSettingsEvent();
  ensureRoundEventTimersSyncedEvent(round);
  const items = round.events
    .map((event) => {
      const compare = event.compare ?? ">=";
      const lastRecord = getLatestRollRecordForEvent(round, event.id);
      const runtime = getEventRuntimeViewStateEvent(round, event, Date.now());
      const runtimeStyle = getRuntimeToneStyleEvent(runtime.tone);
      
      // 使用符号替代 Emoji
      const rolledPrefix = buildEventRolledPrefixTemplateEvent(
        lastRecord?.source === "timeout_auto_fail"
      );
        
      const rolledBlock = lastRecord
        ? buildEventRolledBlockTemplateEvent(
            rolledPrefix,
            escapeHtmlEvent(formatRollRecordSummaryEvent(lastRecord, event))
          )
        : "";
      const outcomePreviewHtml = buildOutcomePreviewHtmlEvent(event, settings);
        
      const deadlineAttr =
        typeof event.deadlineAt === "number" && Number.isFinite(event.deadlineAt)
          ? String(event.deadlineAt)
          : "";
      const buttonDisabled = runtime.locked ? "disabled" : "";
      const buttonStateStyle = runtime.locked
        ? "opacity:0.4;cursor:not-allowed;filter:grayscale(1);"
        : "cursor:pointer;";
      const showRollButton = !runtime.locked && !lastRecord;
      const timeLimitLabel = settings.enableTimeLimit
        ? event.timeLimit
          ? event.timeLimit
          : "none"
        : "off";
      let baseModifierUsed = 0;
      try {
        baseModifierUsed = parseDiceExpression(event.checkDice).modifier;
      } catch {
        baseModifierUsed = 0;
      }
      const skillModifierApplied = resolveSkillModifierBySkillNameEvent(event.skill, settings);
      const finalModifierUsed = baseModifierUsed + skillModifierApplied;
      const modifierText = settings.enableSkillSystem
        ? formatEventModifierBreakdownEvent(baseModifierUsed, skillModifierApplied, finalModifierUsed)
        : "";

      const rollButtonHtml = showRollButton
        ? buildEventRollButtonTemplateEvent({
            roundIdAttr: escapeAttrEvent(round.roundId),
            eventIdAttr: escapeAttrEvent(event.id),
            diceExprAttr: escapeAttrEvent(event.checkDice),
            buttonDisabledAttr: buttonDisabled,
            buttonStateStyle,
          })
        : "";

      return buildEventListItemTemplateEvent({
        titleHtml: escapeHtmlEvent(event.title),
        eventIdHtml: escapeHtmlEvent(event.id),
        descHtml: escapeHtmlEvent(event.desc),
        targetHtml: escapeHtmlEvent(event.targetLabel),
        skillHtml: escapeHtmlEvent(event.skill),
        modifierTextHtml: escapeHtmlEvent(modifierText),
        checkDiceHtml: escapeHtmlEvent(event.checkDice),
        compareHtml: escapeHtmlEvent(compare),
        dcText: String(event.dc),
        timeLimitHtml: escapeHtmlEvent(timeLimitLabel),
        roundIdAttr: escapeAttrEvent(round.roundId),
        eventIdAttr: escapeAttrEvent(event.id),
        deadlineAttr: escapeAttrEvent(deadlineAttr),
        runtimeTextHtml: escapeHtmlEvent(runtime.text),
        runtimeBorder: runtimeStyle.border,
        runtimeBackground: runtimeStyle.background,
        runtimeColor: runtimeStyle.color,
        rolledBlockHtml: rolledBlock,
        outcomePreviewHtml,
        commandTextHtml: `/eventroll roll ${escapeHtmlEvent(event.id)}`,
        rollButtonHtml,
      });
    })
    .join("");

  return buildEventListCardTemplateEvent(escapeHtmlEvent(round.roundId), items);
}

function evaluateSuccessEvent(
  total: number,
  compare: CompareOperatorEvent,
  dc: number | null
): boolean | null {
  if (dc == null || !Number.isFinite(dc)) return null;
  switch (compare) {
    case ">=":
      return total >= dc;
    case ">":
      return total > dc;
    case "<=":
      return total <= dc;
    case "<":
      return total < dc;
    default:
      return null;
  }
}

function buildAnimatedDiceVisualBlockEvent(
  result: DiceResult | null | undefined,
  compactMode = false
): string {
  if (!result || !Array.isArray(result.rolls) || result.rolls.length === 0) {
    return "";
  }

  const uniqueId = "d" + Math.random().toString(36).substr(2, 9);
  let critType: "success" | "fail" | "normal" = "normal";
  let critText = "";
  let resultColor = "#ffdb78";

  if (result.count === 1) {
    const val = result.rolls[0];
    const maxVal = result.sides;
    if (val === maxVal) {
      critType = "success";
      critText = "大成功!";
      resultColor = "#52c41a";
    } else if (val === 1) {
      critType = "fail";
      critText = "大失败!";
      resultColor = "#ff4d4f";
    }
  }

  const showDiceSvgs = result.rolls.length <= 5;
  const diceSize = compactMode ? 62 : 68;
  const rollingSize = compactMode ? 52 : 58;
  const diceVisuals = showDiceSvgs
    ? result.rolls
        .map((r) => getDiceSvg(r, result.sides, resultColor, diceSize))
        .join(" ")
    : getDiceSvg(0, result.sides, resultColor, diceSize);
  const rollingVisual = getRollingSvg("#ffdb78", rollingSize);

  return buildAlreadyRolledDiceVisualTemplateEvent({
    uniqueId,
    rollingVisualHtml: rollingVisual,
    diceVisualsHtml: diceVisuals,
    critType,
    critText,
    compactMode,
  });
}

function buildEventRollResultCardEvent(
  event: DiceEventSpecEvent,
  record: EventRollRecordEvent
): string {
  const settings = getSettingsEvent();
  const resolvedOutcome = resolveTriggeredOutcomeEvent(event, record, settings);
  const outcomeLabel = settings.enableOutcomeBranches
    ? outcomeKindLabelEvent(resolvedOutcome.kind)
    : "剧情走向";
  const outcomeText = settings.enableOutcomeBranches
    ? resolvedOutcome.text
    : "走向分支已关闭。";
  const status =
    record.success === null ? "PENDING" : record.success ? "判定成功" : "判定失败";
  const statusColor =
    record.success === null ? "#ffdb78" : record.success ? "#52c41a" : "#ff4d4f";

  const sourceText =
    record.source === "timeout_auto_fail"
      ? "超时自动检定"
      : record.source === "ai_auto_roll"
      ? "AI 自动检定"
      : "主动检定";
  const diceVisualBlock =
    record.source === "timeout_auto_fail"
      ? ""
      : buildAnimatedDiceVisualBlockEvent(record.result, true);
  const baseModifierUsed = Number.isFinite(Number(record.baseModifierUsed))
    ? Number(record.baseModifierUsed)
    : Number(record.result.modifier) || 0;
  const skillModifierApplied = Number.isFinite(Number(record.skillModifierApplied))
    ? Number(record.skillModifierApplied)
    : 0;
  const finalModifierUsed = Number.isFinite(Number(record.finalModifierUsed))
    ? Number(record.finalModifierUsed)
    : baseModifierUsed + skillModifierApplied;
  const modifierBreakdownHtml = settings.enableSkillSystem
    ? formatEventModifierBreakdownEvent(baseModifierUsed, skillModifierApplied, finalModifierUsed)
    : "";

  return buildEventRollResultCardTemplateEvent({
    rollIdHtml: escapeHtmlEvent(record.rollId),
    titleHtml: escapeHtmlEvent(event.title),
    eventIdHtml: escapeHtmlEvent(event.id),
    sourceHtml: escapeHtmlEvent(sourceText),
    targetHtml: escapeHtmlEvent(record.targetLabelUsed || event.targetLabel),
    skillHtml: escapeHtmlEvent(event.skill),
    diceExprHtml: escapeHtmlEvent(record.diceExpr),
    rollsSummaryHtml: buildRollsSummaryTemplateEvent(
      escapeHtmlEvent(record.result.rolls.join(", ")),
      escapeHtmlEvent(formatModifier(record.result.modifier))
    ),
    modifierBreakdownHtml: escapeHtmlEvent(modifierBreakdownHtml),
    compareHtml: escapeHtmlEvent(record.compareUsed),
    dcText: String(record.dcUsed ?? "N/A"),
    statusText: status,
    statusColor,
    totalText: String(record.result.total),
    timeLimitHtml: escapeHtmlEvent(event.timeLimit ?? "NONE"),
    diceVisualBlockHtml: diceVisualBlock,
    outcomeLabelHtml: escapeHtmlEvent(outcomeLabel),
    outcomeTextHtml: escapeHtmlEvent(outcomeText),
  });
}

function buildEventAlreadyRolledCardEvent(
  event: DiceEventSpecEvent,
  record: EventRollRecordEvent
): string {
  const settings = getSettingsEvent();
  const resolvedOutcome = resolveTriggeredOutcomeEvent(event, record, settings);
  const outcomeLabel = settings.enableOutcomeBranches
    ? outcomeKindLabelEvent(resolvedOutcome.kind)
    : "剧情走向";
  const outcomeText = settings.enableOutcomeBranches
    ? resolvedOutcome.text
    : "走向分支已关闭。";
  const isTimeout = record.source === "timeout_auto_fail";
  const titleText = isTimeout ? "✦ 事件已超时 ✦" : "✦ 检定已完成 ✦";
  const sourceText = isTimeout
    ? "系统强制结算"
    : record.source === "ai_auto_roll"
    ? "AI 自动检定"
    : "玩家主动检定";
  const statusText = record.success === null ? "未决" : record.success ? "成功" : "失败";
  const statusColor = record.success === null ? "#a3957a" : record.success ? "#52c41a" : "#ff4d4f";

  const diceVisualBlock = isTimeout ? "" : buildAnimatedDiceVisualBlockEvent(record.result);
  const baseModifierUsed = Number.isFinite(Number(record.baseModifierUsed))
    ? Number(record.baseModifierUsed)
    : Number(record.result.modifier) || 0;
  const skillModifierApplied = Number.isFinite(Number(record.skillModifierApplied))
    ? Number(record.skillModifierApplied)
    : 0;
  const finalModifierUsed = Number.isFinite(Number(record.finalModifierUsed))
    ? Number(record.finalModifierUsed)
    : baseModifierUsed + skillModifierApplied;
  const modifierBreakdownHtml = settings.enableSkillSystem
    ? formatEventModifierBreakdownEvent(baseModifierUsed, skillModifierApplied, finalModifierUsed)
    : "";

  const distributionBlock = !isTimeout && record.result
    ? buildEventDistributionBlockTemplateEvent(
        escapeHtmlEvent(record.result.rolls.join(", ")),
        escapeHtmlEvent(formatModifier(record.result.modifier))
      )
    : "";
  const timeoutBlock = record.timeoutAt
    ? buildEventTimeoutAtBlockTemplateEvent(
        escapeHtmlEvent(new Date(record.timeoutAt).toISOString())
      )
    : "";

  return buildEventAlreadyRolledCardTemplateEvent({
    titleTextHtml: titleText,
    rollIdHtml: escapeHtmlEvent(record.rollId),
    eventTitleHtml: escapeHtmlEvent(event.title),
    eventIdHtml: escapeHtmlEvent(event.id),
    sourceTextHtml: escapeHtmlEvent(sourceText),
    targetHtml: escapeHtmlEvent(record.targetLabelUsed || event.targetLabel),
    modifierBreakdownHtml: escapeHtmlEvent(modifierBreakdownHtml),
    compareHtml: escapeHtmlEvent(record.compareUsed),
    dcText: String(record.dcUsed ?? "N/A"),
    statusText,
    statusColor,
    diceVisualBlockHtml: diceVisualBlock,
    distributionBlockHtml: distributionBlock,
    outcomeLabelHtml: escapeHtmlEvent(outcomeLabel),
    outcomeTextHtml: escapeHtmlEvent(outcomeText),
    timeoutBlockHtml: timeoutBlock,
  });
}
function performEventRollByIdEvent(
  eventIdRaw: string,
  overrideExpr?: string,
  expectedRoundId?: string
): string {
  sweepTimeoutFailuresEvent();
  const eventId = String(eventIdRaw || "").trim();
  if (!eventId) {
    return "❌ 请提供事件 ID，例如：/eventroll roll lockpick_gate";
  }

  const meta = getDiceMetaEvent();
  const round = meta.pendingRound;
  if (!round) {
    return "❌ 当前没有可投掷的事件。";
  }
  if (expectedRoundId && round.roundId !== expectedRoundId) {
    return "❌ 该事件所属轮次已结束。";
  }

  const event = round.events.find((item) => item.id === eventId);
  if (!event) {
    return `❌ 找不到事件 ID：${eventId}`;
  }

  ensureRoundEventTimersSyncedEvent(round);
  const timeoutCreated = recordTimeoutFailureIfNeededEvent(round, event);
  if (timeoutCreated) {
    saveMetadataSafeEvent();
  }

  const existingRecord = getLatestRollRecordForEvent(round, event.id);
  if (existingRecord) {
    const alreadyCard = buildEventAlreadyRolledCardEvent(event, existingRecord);
    const fallback = pushToChat(alreadyCard);
    refreshCountdownDomEvent();
    return fallback ?? "";
  }

  const expr = (overrideExpr || event.checkDice || "").trim();
  if (!expr) {
    return `❌ 事件 ${eventId} 缺少可用骰式。`;
  }

  let result: DiceResult;
  try {
    result = rollExpression(expr);
  } catch (error: any) {
    return `❌ 掷骰失败：${error?.message ?? String(error)}`;
  }
  const settings = getSettingsEvent();
  const skillModifierApplied = resolveSkillModifierBySkillNameEvent(event.skill, settings);
  const adjusted = applySkillModifierToDiceResultEvent(result, skillModifierApplied);
  result = adjusted.result;

  saveLastRoll(result);
  const compareUsed = normalizeCompareOperatorEvent(event.compare) ?? ">=";
  const dcUsed = Number.isFinite(event.dc) ? Number(event.dc) : null;
  const success = evaluateSuccessEvent(result.total, compareUsed, dcUsed);

  const record: EventRollRecordEvent = {
    rollId: createIdEvent("eroll"),
    roundId: round.roundId,
    eventId: event.id,
    eventTitle: event.title,
    diceExpr: expr,
    result,
    success,
    compareUsed,
    dcUsed,
    skillModifierApplied,
    baseModifierUsed: adjusted.baseModifierUsed,
    finalModifierUsed: adjusted.finalModifierUsed,
    targetLabelUsed: event.targetLabel,
    rolledAt: Date.now(),
    source: "manual_roll",
    timeoutAt: null,
  };

  round.rolls.push(record);
  saveMetadataSafeEvent();
  refreshCountdownDomEvent();

  const message = buildEventRollResultCardEvent(event, record);
  const fallback = pushToChat(message);
  return fallback ?? "";
}

function autoRollEventsByAiModeEvent(round: PendingRoundEvent): string[] {
  const settings = getSettingsEvent();
  if (!settings.enableAiRollMode) return [];

  ensureRoundEventTimersSyncedEvent(round);

  let changed = false;
  let lastResult: DiceResult | null = null;
  const resultCards: string[] = [];

  for (const event of round.events) {
    const mode: EventRollModeEvent = event.rollMode === "auto" ? "auto" : "manual";
    if (mode !== "auto") continue;

    const existingRecord = getLatestRollRecordForEvent(round, event.id);
    if (existingRecord) continue;

    const expr = String(event.checkDice || "").trim();
    if (!expr) continue;

    let result: DiceResult;
    try {
      result = rollExpression(expr);
    } catch (error) {
      console.warn(`[骰子插件] AI 自动投骰失败: event=${event.id}`, error);
      continue;
    }
    const skillModifierApplied = resolveSkillModifierBySkillNameEvent(event.skill, settings);
    const adjusted = applySkillModifierToDiceResultEvent(result, skillModifierApplied);
    result = adjusted.result;

    const compareUsed = normalizeCompareOperatorEvent(event.compare) ?? ">=";
    const dcUsed = Number.isFinite(event.dc) ? Number(event.dc) : null;
    const success = evaluateSuccessEvent(result.total, compareUsed, dcUsed);
    const record: EventRollRecordEvent = {
      rollId: createIdEvent("eroll"),
      roundId: round.roundId,
      eventId: event.id,
      eventTitle: event.title,
      diceExpr: expr,
      result,
      success,
      compareUsed,
      dcUsed,
      skillModifierApplied,
      baseModifierUsed: adjusted.baseModifierUsed,
      finalModifierUsed: adjusted.finalModifierUsed,
      targetLabelUsed: event.targetLabel,
      rolledAt: Date.now(),
      source: "ai_auto_roll",
      timeoutAt: null,
    };

    round.rolls.push(record);
    changed = true;
    lastResult = result;
    resultCards.push(buildEventRollResultCardEvent(event, record));
  }

  if (!changed) return [];

  if (lastResult) {
    saveLastRoll(lastResult);
  } else {
    saveMetadataSafeEvent();
  }
  return resultCards;
}

function bindEventButtonsEvent(): void {
  const globalRef = globalThis as any;
  if (globalRef.__stRollEventButtonsBoundEvent) return;

  document.addEventListener(
    "click",
    (event: Event) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;

      const button = target.closest(
        "button[data-dice-event-roll='1']"
      ) as HTMLButtonElement | null;
      if (!button) return;

      event.preventDefault();
      event.stopPropagation();

      const eventId = button.getAttribute("data-dice-event-id") || "";
      const expr = button.getAttribute("data-dice-expr") || "";
      const roundId = button.getAttribute("data-round-id") || "";
      const result = performEventRollByIdEvent(eventId, expr || undefined, roundId || undefined);
      if (result) pushToChat(result);
    },
    true
  );

  globalRef.__stRollEventButtonsBoundEvent = true;
}

function handleGenerationEndedEvent(retry = 0): void {
  const settings = getSettingsEvent();
  if (!settings.enabled) return;

  const liveCtx = getLiveContextEvent();
  if (!liveCtx?.chat || !Array.isArray(liveCtx.chat)) return;

  const latestAssistant = findLatestAssistantEvent(liveCtx.chat as TavernMessageEvent[]);
  if (!latestAssistant) return;

  const meta = getDiceMetaEvent();
  const assistantMsgId = buildAssistantMessageIdEvent(
    latestAssistant.msg,
    latestAssistant.index
  );
  if (meta.lastProcessedAssistantMsgId === assistantMsgId) return;

  const sourceCandidates = [
    getPreferredAssistantSourceTextEvent(latestAssistant.msg),
    getMessageTextEvent(latestAssistant.msg),
  ].filter((item, index, array) => item && array.indexOf(item) === index);

  let chosenText = "";
  let chosenEvents: DiceEventSpecEvent[] = [];
  let chosenRanges: RemovalRangeEvent[] = [];
  for (const sourceText of sourceCandidates) {
    const parsed = parseEventEnvelopesEvent(sourceText);
    if (parsed.events.length > 0 || parsed.ranges.length > 0) {
      chosenText = sourceText;
      chosenEvents = parsed.events;
      chosenRanges = parsed.ranges;
      break;
    }
    if (!chosenText) {
      chosenText = sourceText;
      chosenEvents = parsed.events;
      chosenRanges = parsed.ranges;
    }
  }

  if (!chosenText.trim()) {
    if (retry < 4) {
      setTimeout(() => handleGenerationEndedEvent(retry + 1), 100 + retry * 120);
      return;
    }
    meta.lastProcessedAssistantMsgId = assistantMsgId;
    saveMetadataSafeEvent();
    return;
  }

  const events = filterEventsByApplyScopeEvent(chosenEvents, settings.eventApplyScope);
  const ranges = chosenRanges;
  if (events.length === 0 && ranges.length === 0) {
    if (retry < 4) {
      setTimeout(() => handleGenerationEndedEvent(retry + 1), 140 + retry * 160);
      return;
    }
    meta.lastProcessedAssistantMsgId = assistantMsgId;
    saveMetadataSafeEvent();
    return;
  }

  meta.lastProcessedAssistantMsgId = assistantMsgId;
  const cleaned = removeRangesEvent(chosenText, ranges);
  setMessageTextEvent(latestAssistant.msg, cleaned);
  hideEventCodeBlocksInDomEvent();
  if (ranges.length > 0) {
    persistChatSafeEvent();
  }

  if (events.length > 0) {
    const round = mergeEventsIntoPendingRoundEvent(events, assistantMsgId);
    const autoRollCards = autoRollEventsByAiModeEvent(round);
    const eventCard = buildEventListCardEvent(round);
    pushToChat(eventCard);
    for (const card of autoRollCards) {
      pushToChat(card);
    }
    sweepTimeoutFailuresEvent();
    refreshCountdownDomEvent();
  } else {
    if (chosenEvents.length > 0 && settings.eventApplyScope === "protagonist_only") {
      console.info("[骰子插件] 事件已按“仅主角行动事件”过滤，本次无可用事件");
    }
    saveMetadataSafeEvent();
  }
  setTimeout(() => {
    hideEventCodeBlocksInDomEvent();
    refreshCountdownDomEvent();
  }, 50);
}

function clearDiceMetaEventState(reason = "chat_reset"): void {
  const meta = getDiceMetaEvent();
  const normalizedReason = String(reason || "").toLowerCase();

  // 仅在明确“重置当前聊天”时才硬清理轮次。
  // 页面刷新/重进聊天可能触发 chat_changed/chat_started/chat_new/chat_created，
  // 这些场景保留 pendingRound/outboundSummary，避免丢失 DICE_ROUND_SUMMARY 注入。
  if (normalizedReason !== "chat_reset") {
    delete meta.lastProcessedAssistantMsgId;
    saveMetadataSafeEvent();
    console.info(`[骰子插件] 保留 Event 轮次状态，仅重置会话游标 (${reason})`);
    return;
  }

  delete meta.pendingRound;
  delete meta.outboundSummary;
  delete meta.summaryHistory;
  delete meta.lastPromptUserMsgId;
  delete meta.lastProcessedAssistantMsgId;
  saveMetadataSafeEvent();
  console.info(`[骰子插件] 已清理 Event 轮次状态 (${reason})`);
}

function buildEventRollHelpMessageEvent(): string {
  return buildEventRollHelpTemplateEvent();
}

function buildEventListTextEvent(round: PendingRoundEvent): string {
  const settings = getSettingsEvent();
  ensureRoundEventTimersSyncedEvent(round);
  const lines: string[] = [];
  lines.push(`当前轮次: ${round.roundId}`);
  lines.push(`事件数量: ${round.events.length}`);
  for (const event of round.events) {
    const state = getEventRuntimeViewStateEvent(round, event);
    const skillMod = resolveSkillModifierBySkillNameEvent(event.skill, settings);
    lines.push(
      `- ${event.id}: ${event.title} | target=${event.targetLabel} | ${event.checkDice} | ${event.compare ?? ">="} ${event.dc} | ${event.skill} | skillMod=${skillMod} | rollMode=${event.rollMode ?? "manual"} | timeLimit=${event.timeLimit ?? "none"} | 状态=${state.text}`
    );
  }
  return lines.join("\n");
}

function registerEventRollCommandEvent(): void {
  const globalRef = globalThis as any;
  if (globalRef.__stRollEventCommandRegisteredEvent) return;
  if (!SlashCommandParser || !SlashCommand || !SlashCommandArgument || !ARGUMENT_TYPE) {
    return;
  }

  SlashCommandParser.addCommandObject(
    SlashCommand.fromProps({
      name: "eventroll",
      aliases: ["eroll"],
      returns: "事件骰子命令：list/roll/help",
      namedArgumentList: [],
      unnamedArgumentList: [
        SlashCommandArgument.fromProps({
          description: "子命令，示例：list | roll lockpick_gate 1d20+3",
          typeList: ARGUMENT_TYPE.STRING,
          isRequired: false,
        }),
      ],
      helpString: buildEventRollHelpMessageEvent(),
      callback: (_namedArgs: Record<string, any>, unnamedArgs: any) => {
        const raw = (unnamedArgs ?? "").toString().trim();
        const parts = raw ? raw.split(/\s+/) : [];
        const action = (parts[0] || "help").toLowerCase();

        if (action === "help") {
          const fallback = pushToChat(buildEventRollHelpMessageEvent());
          return fallback ?? "";
        }

        if (action === "list") {
          sweepTimeoutFailuresEvent();
          const meta = getDiceMetaEvent();
          const round = meta.pendingRound;
          if (!round) {
            const fallback = pushToChat(
              "当前没有可用事件。请等待 AI 输出事件 JSON。"
            );
            return fallback ?? "";
          }
          const msg = buildPreBlockTemplateEvent(
            escapeHtmlEvent(buildEventListTextEvent(round))
          );
          const fallback = pushToChat(msg);
          return fallback ?? "";
        }

        if (action === "roll") {
          const eventId = parts[1] || "";
          const overrideExpr =
            parts.length > 2 ? parts.slice(2).join(" ") : undefined;
          const feedback = performEventRollByIdEvent(eventId, overrideExpr);
          if (feedback) {
            const fallback = pushToChat(feedback);
            return fallback ?? "";
          }
          return "";
        }

        const fallback = pushToChat(
          "未知子命令。请使用 /eventroll help 查看帮助。"
        );
        return fallback ?? "";
      },
    })
  );

  globalRef.__stRollEventCommandRegisteredEvent = true;
}

function startCountdownTickerEvent(): void {
  const globalRef = globalThis as any;
  if (globalRef.__stRollEventCountdownTicker) return;
  globalRef.__stRollEventCountdownTicker = setInterval(() => {
    try {
      sweepTimeoutFailuresEvent();
      refreshCountdownDomEvent();
    } catch (error) {
      console.warn("[骰子插件] 倒计时刷新异常", error);
    }
  }, 1000);
}

function registerEventHooksEvent(): void {
  const globalRef = globalThis as any;
  if (globalRef.__stRollEventHooksRegisteredEvent) return;

  const liveCtx = getLiveContextEvent();
  const src = liveCtx?.eventSource ?? eventSource;
  const types = liveCtx?.event_types ?? event_types ?? {};
  if (!src?.on) return;

  const promptEvents = Array.from(
    new Set(
      [types.CHAT_COMPLETION_PROMPT_READY, "chat_completion_prompt_ready"].filter(
        (item): item is string => typeof item === "string" && item.length > 0
      )
    )
  );
  console.info(
    `[骰子插件] prompt 注入监听事件: ${promptEvents.length > 0 ? promptEvents.join(", ") : "(none)"}`
  );
  const bindPrompt =
    typeof (src as any).makeLast === "function"
      ? (src as any).makeLast.bind(src)
      : src.on.bind(src);

  const generationEvents = Array.from(
    new Set(
      [types.GENERATION_ENDED, "generation_ended"].filter(
        (item): item is string => typeof item === "string" && item.length > 0
      )
    )
  );

  const resetEvents = Array.from(
    new Set(
      [
        types.CHAT_CHANGED,
        types.CHAT_RESET,
        types.CHAT_STARTED,
        types.CHAT_NEW,
        types.CHAT_CREATED,
        "chat_changed",
        "chat_reset",
        "chat_started",
        "chat_new",
        "chat_created",
      ].filter((item): item is string => typeof item === "string" && item.length > 0)
    )
  );

  for (const eventName of promptEvents) {
    bindPrompt(eventName, (payload: any) => {
      try {
        if (!extractPromptChatFromPayloadEvent(payload)) {
          console.info(`[骰子插件] ${eventName} 已触发，但 payload 中未发现 chat/messages`);
        }
        handlePromptReadyEvent(payload, eventName);
      } catch (error) {
        console.error("[骰子插件] Prompt hook 错误", error);
      }
    });
  }

  for (const eventName of generationEvents) {
    src.on(eventName, () => {
      try {
        handleGenerationEndedEvent();
      } catch (error) {
        console.error("[骰子插件] Generation hook 错误", error);
      }
    });
  }

  for (const eventName of resetEvents) {
    src.on(eventName, () => {
      try {
        clearDiceMetaEventState(eventName);
        setTimeout(() => {
          sanitizeCurrentChatEventBlocksEvent();
          sweepTimeoutFailuresEvent();
          refreshCountdownDomEvent();
        }, 0);
      } catch (error) {
        console.error("[骰子插件] Reset hook 错误", error);
      }
    });
  }

  globalRef.__stRollEventHooksRegisteredEvent = true;
}

function initializeEvent(attempt = 0): void {
  registerBaseMacrosAndCommandsEvent();
  mountSettingsCardEvent();
  bindEventButtonsEvent();
  registerEventRollCommandEvent();
  registerDebugCommandEvent();
  registerEventHooksEvent();
  startCountdownTickerEvent();
  sweepTimeoutFailuresEvent();
  refreshCountdownDomEvent();
  sanitizeCurrentChatEventBlocksEvent();

  const globalRef = globalThis as any;
  if (
    !globalRef.__stRollEventCommandRegisteredEvent ||
    !globalRef.__stRollBaseCommandRegisteredEvent ||
    !globalRef.__stRollDebugCommandRegisteredEvent ||
    !globalRef.__stRollEventHooksRegisteredEvent
  ) {
    if (attempt < 80) {
      setTimeout(() => initializeEvent(attempt + 1), 500);
    }
    return;
  }

  console.info("[骰子插件] Event 初始化完成");
}

function registerDebugCommandEvent(): void {
  const globalRef = globalThis as any;
  if (globalRef.__stRollDebugCommandRegisteredEvent) return;
  if (!SlashCommandParser || !SlashCommand) return;

  SlashCommandParser.addCommandObject(
    SlashCommand.fromProps({
      name: "rollDebug",
      aliases: ["ddebug"],
      returns: "显示 diceRoller 元数据",
      namedArgumentList: [],
      unnamedArgumentList: [],
      callback: () => {
        const legacy = getDiceMeta();
        const eventMeta = getDiceMetaEvent();
        const text = JSON.stringify({ legacy, eventMeta }, null, 2);

        // 直接丢到聊天里
        const msg = buildDebugTemplateEvent(escapeHtmlEvent(text));
        pushToChat(msg);
        return "";
      },
    })
  );

  globalRef.__stRollDebugCommandRegisteredEvent = true;
}

(function bootstrapEvent() {
  const globalRef = globalThis as any;
  if (globalRef.__stDiceRollerEventLoaded) return;
  globalRef.__stDiceRollerEventLoaded = true;
  initializeEvent();
})();
