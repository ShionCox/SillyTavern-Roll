import { normalizeBlankLinesEvent, simpleHashEvent } from "../core/utilsEvent";
import type {
  DiceMetaEvent,
  DicePluginSettingsEvent,
  RoundSummarySnapshotEvent,
  SkillPresetEvent,
  SkillPresetStoreEvent,
  TavernMessageEvent,
} from "../types/eventDomainEvent";

export function getMessageTextEvent(message: TavernMessageEvent | undefined): string {
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

export function getPreferredAssistantSourceTextEvent(
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

export function setMessageTextEvent(message: TavernMessageEvent, text: string): void {
  message.mes = text;
  message.content = text;
  (message as any).message = text;
  (message as any).text = text;
}

export function isUserMessageEvent(message: TavernMessageEvent | undefined): boolean {
  if (!message) return false;
  if (message.is_user) return true;
  return String(message.role || "").toLowerCase() === "user";
}

export function isSystemMessageEvent(message: TavernMessageEvent | undefined): boolean {
  if (!message) return false;
  if (message.is_system) return true;
  return String(message.role || "").toLowerCase() === "system";
}

export function isAssistantMessageEvent(message: TavernMessageEvent | undefined): boolean {
  if (!message) return false;
  if (message.is_user || message.is_system) return false;
  const role = String(message.role || "").toLowerCase();
  if (!role) return true;
  return role !== "user" && role !== "system";
}

export function findFirstSystemIndexEvent(chat: TavernMessageEvent[]): number {
  for (let i = 0; i < chat.length; i++) {
    if (isSystemMessageEvent(chat[i])) return i;
  }
  return -1;
}

export function findLastUserMessageEvent(chat: TavernMessageEvent[]): TavernMessageEvent | null {
  for (let i = chat.length - 1; i >= 0; i--) {
    if (isUserMessageEvent(chat[i])) return chat[i];
  }
  return null;
}

export function buildPromptMessageIdEvent(message: TavernMessageEvent): string {
  const explicitId = message.id ?? message.cid ?? message.uid;
  if (explicitId != null) return `msg:${String(explicitId)}`;
  const stamp = String(
    message.create_date ?? message.create_time ?? message.timestamp ?? ""
  );
  return `fp:${stamp}:${simpleHashEvent(getMessageTextEvent(message))}`;
}

export function stripManagedBlocksEvent(input: string): string {
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

export interface DiceRuleBlockDepsEvent {
  getSettingsEvent: () => DicePluginSettingsEvent;
  getSkillModifierTableMapEvent: (
    settings: DicePluginSettingsEvent
  ) => Record<string, number>;
  getSkillPresetStoreEvent: (
    settings: DicePluginSettingsEvent
  ) => SkillPresetStoreEvent;
  getActiveSkillPresetEvent: (store: SkillPresetStoreEvent) => SkillPresetEvent;
  DEFAULT_RULE_TEXT_Event: string;
  DICE_RULE_BLOCK_START_Event: string;
  DICE_RULE_BLOCK_END_Event: string;
}

function parseAllowedDiceSidesForRuleEvent(raw: string): number[] {
  const text = String(raw || "").trim();
  if (!text) return [];
  const unique = new Set<number>();
  for (const part of text.split(/[，,\s]+/)) {
    const value = Number(String(part || "").trim());
    if (!Number.isFinite(value) || !Number.isInteger(value) || value <= 0) continue;
    unique.add(value);
  }
  return Array.from(unique).sort((a, b) => a - b);
}

export function buildDiceRuleBlockCompactEvent(deps: DiceRuleBlockDepsEvent): string {
  const settings = deps.getSettingsEvent();
  const rawRuleText =
    typeof settings.ruleText === "string" && settings.ruleText.trim().length > 0
      ? settings.ruleText
      : deps.DEFAULT_RULE_TEXT_Event;
  const ruleText = rawRuleText.replace(/\[\/?DICE_EVENT_RULES\]/g, "").trim();
  let skillRuleSection = "";
  if (settings.enableSkillSystem) {
    const skillTable = deps.getSkillModifierTableMapEvent(settings);
    const skillTableJson = JSON.stringify(skillTable);
    const store = deps.getSkillPresetStoreEvent(settings);
    const activePreset = deps.getActiveSkillPresetEvent(store);
    const presetNameLine = String(activePreset.name ?? "").replace(/\s+/g, " ").trim() || "unnamed";
    skillRuleSection = `\n[SKILL_SYSTEM]\nenabled=true\npreset_id=${activePreset.id}\npreset_name=${presetNameLine}\nskill_table=${skillTableJson}\n说明：event.skill 会匹配 skill_table 的 key（trim + lowercase），命中后作为技能修正加到检定总值。\n[/SKILL_SYSTEM]`;
  }

  const allowedDiceSides = parseAllowedDiceSidesForRuleEvent(settings.aiAllowedDiceSidesText);
  const allowedDiceSidesRuleSection =
    allowedDiceSides.length > 0
      ? `\n[DICE_ALLOWED_SIDES]\nenabled=true\nallowed_sides=${allowedDiceSides.join(",")}\n要求：生成事件时，checkDice 只能使用上述面数（如 1d20、2d6+3、1d100!）。\n若不在列表内，事件会被系统忽略。\n[/DICE_ALLOWED_SIDES]`
      : "";

  return `${deps.DICE_RULE_BLOCK_START_Event}
${ruleText}${skillRuleSection}${allowedDiceSidesRuleSection}
${deps.DICE_RULE_BLOCK_END_Event}`;
}

export function buildDiceRuleBlockEvent(deps: DiceRuleBlockDepsEvent): string {
  return buildDiceRuleBlockCompactEvent(deps);
}

export function applyManagedSystemContentEvent(
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

export interface ComposePromptDepsEvent extends DiceRuleBlockDepsEvent {
  sweepTimeoutFailuresEvent: () => boolean;
  getDiceMetaEvent: () => DiceMetaEvent;
  ensureSummaryHistoryEvent: (meta: DiceMetaEvent) => RoundSummarySnapshotEvent[];
  createRoundSummarySnapshotEvent: (
    round: any,
    now?: number
  ) => RoundSummarySnapshotEvent;
  trimSummaryHistoryEvent: (history: RoundSummarySnapshotEvent[]) => void;
  buildSummaryBlockFromHistoryEvent: (
    history: RoundSummarySnapshotEvent[],
    detailMode: any,
    lastNRounds: number,
    includeOutcomeInSummary: boolean
  ) => string;
  saveMetadataSafeEvent: () => void;
}

export function composePromptInjectionsEvent(
  promptChat: TavernMessageEvent[],
  deps: ComposePromptDepsEvent
): string {
  const settings = deps.getSettingsEvent();
  if (!settings.enabled) return "";
  deps.sweepTimeoutFailuresEvent();

  const meta = deps.getDiceMetaEvent();
  const lastUser = findLastUserMessageEvent(promptChat);
  const currentUserId = lastUser ? buildPromptMessageIdEvent(lastUser) : "";
  const isNewUserPrompt =
    Boolean(currentUserId) && currentUserId !== meta.lastPromptUserMsgId;

  let summaryToInject = "";
  let changed = false;

  if (isNewUserPrompt) {
    const history = deps.ensureSummaryHistoryEvent(meta);
    if (meta.pendingRound) {
      const snapshot = deps.createRoundSummarySnapshotEvent(meta.pendingRound, Date.now());
      history.push(snapshot);
      deps.trimSummaryHistoryEvent(history);
      delete meta.pendingRound;
      changed = true;
    }

    summaryToInject = deps.buildSummaryBlockFromHistoryEvent(
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
    summaryToInject = meta.outboundSummary.summaryText;
  }

  if (currentUserId && currentUserId !== meta.lastPromptUserMsgId) {
    meta.lastPromptUserMsgId = currentUserId;
    changed = true;
  }

  if (changed) deps.saveMetadataSafeEvent();

  const blocks: string[] = [];
  if (settings.autoSendRuleToAI) blocks.push(buildDiceRuleBlockEvent(deps));
  if (summaryToInject) blocks.push(summaryToInject);
  return blocks.join("\n\n").trim();
}

export function extractPromptChatFromPayloadEvent(payload: any): TavernMessageEvent[] | null {
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

export function handlePromptReadyEvent(
  payload: any,
  deps: ComposePromptDepsEvent,
  sourceEvent = "unknown"
): void {
  if (!payload || payload.dryRun) return;

  const promptChat = extractPromptChatFromPayloadEvent(payload);
  if (!promptChat || !Array.isArray(promptChat)) return;

  const managed = composePromptInjectionsEvent(promptChat, deps);
  if (!managed) {
    const settings = deps.getSettingsEvent();
    if (settings.enabled && settings.autoSendRuleToAI) {
      console.info(`[骰子插件] ${sourceEvent} 命中 prompt 事件，但无需注入（managed 为空）`);
    }
    return;
  }

  applyManagedSystemContentEvent(promptChat, managed);
  console.info(`[骰子插件] 已在 ${sourceEvent} 注入 system 规则`);
}
