import manifestJson from "../../manifest.json";
import type { DicePluginSettingsEvent } from "../types/eventDomainEvent";

export const MODULE_NAME_Event = "SillyTavern-Roll";
export const SETTINGS_CARD_ID_Event = "st-roll-settings-Event-card";
export const SETTINGS_STYLE_ID_Event = "st-roll-settings-Event-style";
export const SETTINGS_BADGE_ID_Event = "st-roll-settings-Event-badge";
export const SETTINGS_ENABLED_ID_Event = "st-roll-settings-Event-enabled";
export const SETTINGS_RULE_ID_Event = "st-roll-settings-Event-auto-rule";
export const SETTINGS_AI_ROLL_MODE_ID_Event = "st-roll-settings-Event-ai-roll-mode";
export const SETTINGS_EXPLODING_ENABLED_ID_Event = "st-roll-settings-Event-exploding-enabled";
export const SETTINGS_ALLOWED_DICE_SIDES_ID_Event = "st-roll-settings-Event-allowed-dice-sides";
export const SETTINGS_SUMMARY_DETAIL_ID_Event = "st-roll-settings-Event-summary-detail";
export const SETTINGS_SUMMARY_ROUNDS_ID_Event = "st-roll-settings-Event-summary-rounds";
export const SETTINGS_SCOPE_ID_Event = "st-roll-settings-Event-apply-scope";
export const SETTINGS_OUTCOME_BRANCHES_ID_Event = "st-roll-settings-Event-outcome-branches";
export const SETTINGS_EXPLODE_OUTCOME_ID_Event = "st-roll-settings-Event-explode-outcome";
export const SETTINGS_SUMMARY_OUTCOME_ID_Event = "st-roll-settings-Event-summary-outcome";
export const SETTINGS_LIST_OUTCOME_PREVIEW_ID_Event = "st-roll-settings-Event-list-outcome-preview";
export const SETTINGS_TIME_LIMIT_ENABLED_ID_Event = "st-roll-settings-Event-time-limit-enabled";
export const SETTINGS_TIME_LIMIT_MIN_ID_Event = "st-roll-settings-Event-time-limit-min-seconds";
export const SETTINGS_TIME_LIMIT_ROW_ID_Event = "st-roll-settings-Event-time-limit-row";
export const SETTINGS_SKILL_ENABLED_ID_Event = "st-roll-settings-Event-skill-enabled";
export const SETTINGS_SKILL_EDITOR_WRAP_ID_Event = "st-roll-settings-Event-skill-editor-wrap";
export const SETTINGS_SKILL_ROWS_ID_Event = "st-roll-settings-Event-skill-rows";
export const SETTINGS_SKILL_ADD_ID_Event = "st-roll-settings-Event-skill-add";
export const SETTINGS_SKILL_TEXT_ID_Event = "st-roll-settings-Event-skill-text";
export const SETTINGS_SKILL_IMPORT_TOGGLE_ID_Event = "st-roll-settings-Event-skill-import-toggle";
export const SETTINGS_SKILL_IMPORT_AREA_ID_Event = "st-roll-settings-Event-skill-import-area";
export const SETTINGS_SKILL_IMPORT_APPLY_ID_Event = "st-roll-settings-Event-skill-import-apply";
export const SETTINGS_SKILL_EXPORT_ID_Event = "st-roll-settings-Event-skill-export";
export const SETTINGS_SKILL_SAVE_ID_Event = "st-roll-settings-Event-skill-save";
export const SETTINGS_SKILL_RESET_ID_Event = "st-roll-settings-Event-skill-reset";
export const SETTINGS_SKILL_ERRORS_ID_Event = "st-roll-settings-Event-skill-errors";
export const SETTINGS_SKILL_DIRTY_HINT_ID_Event = "st-roll-settings-Event-skill-dirty-hint";
export const SETTINGS_SKILL_PRESET_LAYOUT_ID_Event = "st-roll-settings-Event-skill-preset-layout";
export const SETTINGS_SKILL_PRESET_SIDEBAR_ID_Event = "st-roll-settings-Event-skill-preset-sidebar";
export const SETTINGS_SKILL_PRESET_LIST_ID_Event = "st-roll-settings-Event-skill-preset-list";
export const SETTINGS_SKILL_PRESET_CREATE_ID_Event = "st-roll-settings-Event-skill-preset-create";
export const SETTINGS_SKILL_PRESET_DELETE_ID_Event = "st-roll-settings-Event-skill-preset-delete";
export const SETTINGS_SKILL_PRESET_NAME_ID_Event = "st-roll-settings-Event-skill-preset-name";
export const SETTINGS_SKILL_PRESET_RENAME_ID_Event = "st-roll-settings-Event-skill-preset-rename";
export const SETTINGS_SKILL_PRESET_META_ID_Event = "st-roll-settings-Event-skill-preset-meta";
export const SETTINGS_SKILL_EDITOR_OPEN_ID_Event = "st-roll-settings-Event-skill-editor-open";
export const SETTINGS_SKILL_MODAL_ID_Event = "st-roll-settings-Event-skill-modal";
export const SETTINGS_SKILL_MODAL_CLOSE_ID_Event = "st-roll-settings-Event-skill-modal-close";
export const SETTINGS_RULE_TEXT_ID_Event = "st-roll-settings-Event-rule-text";
export const SETTINGS_RULE_SAVE_ID_Event = "st-roll-settings-Event-rule-save";
export const SETTINGS_RULE_RESET_ID_Event = "st-roll-settings-Event-rule-reset";
export const SETTINGS_SEARCH_ID_Event = "st-roll-settings-Event-search";
export const SETTINGS_TAB_MAIN_ID_Event = "st-roll-settings-Event-tab-main";
export const SETTINGS_TAB_SKILL_ID_Event = "st-roll-settings-Event-tab-skill";
export const SETTINGS_TAB_RULE_ID_Event = "st-roll-settings-Event-tab-rule";
export const SETTINGS_TAB_ABOUT_ID_Event = "st-roll-settings-Event-tab-about";
export const SETTINGS_PANEL_MAIN_ID_Event = "st-roll-settings-Event-panel-main";
export const SETTINGS_PANEL_SKILL_ID_Event = "st-roll-settings-Event-panel-skill";
export const SETTINGS_PANEL_RULE_ID_Event = "st-roll-settings-Event-panel-rule";
export const SETTINGS_PANEL_ABOUT_ID_Event = "st-roll-settings-Event-panel-about";

const manifestAny_Event = manifestJson as Record<string, any>;
export const SETTINGS_BADGE_VERSION_Event =
  typeof manifestJson.version === "string" && manifestJson.version.trim().length > 0
    ? manifestJson.version.trim()
    : "unknown";
export const SETTINGS_AUTHOR_TEXT_Event =
  typeof manifestAny_Event.author === "string" && manifestAny_Event.author.trim().length > 0
    ? manifestAny_Event.author.trim()
    : "Shion";
export const SETTINGS_EMAIL_TEXT_Event =
  typeof manifestAny_Event.email === "string" && manifestAny_Event.email.trim().length > 0
    ? manifestAny_Event.email.trim()
    : "348591466@qq.com";
export const SETTINGS_GITHUB_URL_Event =
  typeof manifestAny_Event.homepage === "string" &&
  /^https?:\/\//i.test(manifestAny_Event.homepage.trim())
    ? manifestAny_Event.homepage.trim()
    : "https://github.com/ShionCox/SillyTavern-Roll";
export const SETTINGS_GITHUB_TEXT_Event = SETTINGS_GITHUB_URL_Event.replace(
  /^https?:\/\//i,
  ""
);
export const SETTINGS_TEMPLATE_STATIC_DEPS_Event = {
  SETTINGS_CARD_ID_Event,
  SETTINGS_BADGE_ID_Event,
  SETTINGS_BADGE_VERSION_Event,
  SETTINGS_AUTHOR_TEXT_Event,
  SETTINGS_EMAIL_TEXT_Event,
  SETTINGS_GITHUB_TEXT_Event,
  SETTINGS_GITHUB_URL_Event,
  SETTINGS_SEARCH_ID_Event,
  SETTINGS_TAB_MAIN_ID_Event,
  SETTINGS_TAB_SKILL_ID_Event,
  SETTINGS_TAB_RULE_ID_Event,
  SETTINGS_TAB_ABOUT_ID_Event,
  SETTINGS_PANEL_MAIN_ID_Event,
  SETTINGS_PANEL_SKILL_ID_Event,
  SETTINGS_PANEL_RULE_ID_Event,
  SETTINGS_PANEL_ABOUT_ID_Event,
  SETTINGS_ENABLED_ID_Event,
  SETTINGS_RULE_ID_Event,
  SETTINGS_AI_ROLL_MODE_ID_Event,
  SETTINGS_EXPLODING_ENABLED_ID_Event,
  SETTINGS_ALLOWED_DICE_SIDES_ID_Event,
  SETTINGS_SUMMARY_DETAIL_ID_Event,
  SETTINGS_SUMMARY_ROUNDS_ID_Event,
  SETTINGS_SCOPE_ID_Event,
  SETTINGS_OUTCOME_BRANCHES_ID_Event,
  SETTINGS_EXPLODE_OUTCOME_ID_Event,
  SETTINGS_SUMMARY_OUTCOME_ID_Event,
  SETTINGS_LIST_OUTCOME_PREVIEW_ID_Event,
  SETTINGS_TIME_LIMIT_ENABLED_ID_Event,
  SETTINGS_TIME_LIMIT_MIN_ID_Event,
  SETTINGS_TIME_LIMIT_ROW_ID_Event,
  SETTINGS_SKILL_ENABLED_ID_Event,
  SETTINGS_SKILL_EDITOR_WRAP_ID_Event,
  SETTINGS_SKILL_ROWS_ID_Event,
  SETTINGS_SKILL_ADD_ID_Event,
  SETTINGS_SKILL_TEXT_ID_Event,
  SETTINGS_SKILL_IMPORT_TOGGLE_ID_Event,
  SETTINGS_SKILL_IMPORT_AREA_ID_Event,
  SETTINGS_SKILL_IMPORT_APPLY_ID_Event,
  SETTINGS_SKILL_EXPORT_ID_Event,
  SETTINGS_SKILL_SAVE_ID_Event,
  SETTINGS_SKILL_RESET_ID_Event,
  SETTINGS_SKILL_ERRORS_ID_Event,
  SETTINGS_SKILL_DIRTY_HINT_ID_Event,
  SETTINGS_SKILL_PRESET_LAYOUT_ID_Event,
  SETTINGS_SKILL_PRESET_SIDEBAR_ID_Event,
  SETTINGS_SKILL_PRESET_LIST_ID_Event,
  SETTINGS_SKILL_PRESET_CREATE_ID_Event,
  SETTINGS_SKILL_PRESET_DELETE_ID_Event,
  SETTINGS_SKILL_PRESET_NAME_ID_Event,
  SETTINGS_SKILL_PRESET_RENAME_ID_Event,
  SETTINGS_SKILL_PRESET_META_ID_Event,
  SETTINGS_SKILL_EDITOR_OPEN_ID_Event,
  SETTINGS_SKILL_MODAL_ID_Event,
  SETTINGS_SKILL_MODAL_CLOSE_ID_Event,
  SETTINGS_RULE_SAVE_ID_Event,
  SETTINGS_RULE_RESET_ID_Event,
  SETTINGS_RULE_TEXT_ID_Event,
} as const;
export const SETTINGS_TABS_AND_MODAL_IDS_Event = {
  SETTINGS_TAB_MAIN_ID_Event,
  SETTINGS_TAB_SKILL_ID_Event,
  SETTINGS_TAB_RULE_ID_Event,
  SETTINGS_TAB_ABOUT_ID_Event,
  SETTINGS_PANEL_MAIN_ID_Event,
  SETTINGS_PANEL_SKILL_ID_Event,
  SETTINGS_PANEL_RULE_ID_Event,
  SETTINGS_PANEL_ABOUT_ID_Event,
  SETTINGS_SKILL_MODAL_ID_Event,
  SETTINGS_SKILL_EDITOR_OPEN_ID_Event,
  SETTINGS_SKILL_MODAL_CLOSE_ID_Event,
  SETTINGS_SEARCH_ID_Event,
} as const;
export const SETTINGS_BASIC_INPUT_IDS_Event = {
  SETTINGS_ENABLED_ID_Event,
  SETTINGS_RULE_ID_Event,
  SETTINGS_AI_ROLL_MODE_ID_Event,
  SETTINGS_EXPLODING_ENABLED_ID_Event,
  SETTINGS_ALLOWED_DICE_SIDES_ID_Event,
  SETTINGS_SUMMARY_DETAIL_ID_Event,
  SETTINGS_SUMMARY_ROUNDS_ID_Event,
  SETTINGS_SCOPE_ID_Event,
  SETTINGS_OUTCOME_BRANCHES_ID_Event,
  SETTINGS_EXPLODE_OUTCOME_ID_Event,
  SETTINGS_SUMMARY_OUTCOME_ID_Event,
  SETTINGS_LIST_OUTCOME_PREVIEW_ID_Event,
  SETTINGS_TIME_LIMIT_ENABLED_ID_Event,
  SETTINGS_TIME_LIMIT_MIN_ID_Event,
  SETTINGS_SKILL_ENABLED_ID_Event,
} as const;
export const SETTINGS_SKILL_PRESET_ACTION_IDS_Event = {
  SETTINGS_SKILL_PRESET_LIST_ID_Event,
  SETTINGS_SKILL_PRESET_CREATE_ID_Event,
  SETTINGS_SKILL_PRESET_DELETE_ID_Event,
  SETTINGS_SKILL_PRESET_NAME_ID_Event,
  SETTINGS_SKILL_PRESET_RENAME_ID_Event,
} as const;
export const SETTINGS_SKILL_ROWS_EDIT_IDS_Event = {
  SETTINGS_SKILL_ROWS_ID_Event,
  SETTINGS_SKILL_ADD_ID_Event,
} as const;
export const SETTINGS_SKILL_IMPORT_EXPORT_IDS_Event = {
  SETTINGS_SKILL_IMPORT_TOGGLE_ID_Event,
  SETTINGS_SKILL_IMPORT_AREA_ID_Event,
  SETTINGS_SKILL_TEXT_ID_Event,
  SETTINGS_SKILL_IMPORT_APPLY_ID_Event,
  SETTINGS_SKILL_EXPORT_ID_Event,
  SETTINGS_SKILL_SAVE_ID_Event,
  SETTINGS_SKILL_RESET_ID_Event,
} as const;
export const SETTINGS_RULE_TEXT_ACTION_IDS_Event = {
  SETTINGS_RULE_TEXT_ID_Event,
  SETTINGS_RULE_SAVE_ID_Event,
  SETTINGS_RULE_RESET_ID_Event,
} as const;
export const SETTINGS_SYNC_UI_IDS_Event = {
  SETTINGS_ENABLED_ID_Event,
  SETTINGS_RULE_ID_Event,
  SETTINGS_AI_ROLL_MODE_ID_Event,
  SETTINGS_EXPLODING_ENABLED_ID_Event,
  SETTINGS_ALLOWED_DICE_SIDES_ID_Event,
  SETTINGS_SUMMARY_DETAIL_ID_Event,
  SETTINGS_SUMMARY_ROUNDS_ID_Event,
  SETTINGS_SCOPE_ID_Event,
  SETTINGS_OUTCOME_BRANCHES_ID_Event,
  SETTINGS_EXPLODE_OUTCOME_ID_Event,
  SETTINGS_SUMMARY_OUTCOME_ID_Event,
  SETTINGS_LIST_OUTCOME_PREVIEW_ID_Event,
  SETTINGS_TIME_LIMIT_ENABLED_ID_Event,
  SETTINGS_TIME_LIMIT_MIN_ID_Event,
  SETTINGS_TIME_LIMIT_ROW_ID_Event,
  SETTINGS_SKILL_ENABLED_ID_Event,
  SETTINGS_RULE_TEXT_ID_Event,
  SETTINGS_SKILL_ROWS_ID_Event,
} as const;
export const DICE_RULE_BLOCK_START_Event = "[DICE_EVENT_RULES]";
export const DICE_RULE_BLOCK_END_Event = "[/DICE_EVENT_RULES]";
export const DICE_SUMMARY_BLOCK_START_Event = "[DICE_ROUND_SUMMARY]";
export const DICE_SUMMARY_BLOCK_END_Event = "[/DICE_ROUND_SUMMARY]";
export const SUMMARY_MAX_EVENTS_Event = 20;
export const SUMMARY_MAX_TOTAL_EVENT_LINES_Event = 60;
export const SUMMARY_HISTORY_ROUNDS_MIN_Event = 1;
export const SUMMARY_HISTORY_ROUNDS_MAX_Event = 10;
export const SUMMARY_HISTORY_MAX_STORED_Event = 20;
export const OUTCOME_TEXT_MAX_LEN_Event = 400;
export const SKILL_PRESET_STORE_VERSION_Event = 1 as const;
export const SKILL_PRESET_DEFAULT_ID_Event = "skill_preset_default_general_trpg";
export const SKILL_PRESET_DEFAULT_NAME_Event = "通用叙事TRPG（默认）";
export const SKILL_PRESET_MIGRATION_NAME_Event = "迁移技能预设";
export const SKILL_PRESET_NEW_NAME_BASE_Event = "新预设";
export const DEFAULT_SKILL_PRESET_TABLE_Event: Record<string, number> = {
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
export const DEFAULT_SKILL_PRESET_TABLE_TEXT_Event = JSON.stringify(DEFAULT_SKILL_PRESET_TABLE_Event, null, 2);
export const ISO_8601_DURATION_REGEX_Event =
  /^P(?=\d|T\d)(\d+Y)?(\d+M)?(\d+W)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+S)?)?$/i;
export const DEFAULT_RULE_TEXT_Event = `你必须严格遵循以下骰子事件协议：
1. 需要触发掷骰事件时，只在回复末尾输出一个 \`\`\`rolljson 代码块（禁止 \`\`\`json）。
2. 顶层固定结构：
{"type":"dice_events","version":"1","events":[...]}
3. events[i] 必填字段：
- id: string
- title: string
- checkDice: string（如 "1d20"、"2d6+3"、"1d12!"）
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
8. 当存在 [DICE_ALLOWED_SIDES] 规则时，checkDice 的面数必须取自 allowed_sides，禁止使用列表外面数。
9. 正确示例：
\`\`\`rolljson
{"type":"dice_events","version":"1","events":[{"id":"observation_check","title":"察觉神情","checkDice":"1d20+2","dc":15,"skill":"察觉","desc":"穗秋生试图判断你眼神中的情绪。","scope":"character","compare":">=","target":{"type":"supporting","name":"穗秋生"},"outcomes":{"success":"你成功捕捉到她语气里的迟疑。","failure":"你没读懂她的真实意图。","explode":"你突然意识到她在故意误导你。"}}]}
\`\`\`
10. 非事件叙事文本正常输出；事件信息只能放在 rolljson 代码块内。
11. DICE_ROUND_SUMMARY 是历史事件摘要，会影响后续行为，请据此保持剧情一致。`;
export const DEFAULT_SETTINGS_Event: DicePluginSettingsEvent = {
  enabled: true,
  autoSendRuleToAI: true,
  enableAiRollMode: true,
  enableExplodingDice: true,
  aiAllowedDiceSidesText: "4,6,8,10,12,20,100",
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
