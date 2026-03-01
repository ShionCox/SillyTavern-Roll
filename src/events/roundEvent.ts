import type { DiceOptions, DiceResult } from "../types/diceEvent";
import type {
  CompareOperatorEvent,
  DiceEventSpecEvent,
  DiceMetaEvent,
  DicePluginSettingsEvent,
  EventOutcomeKindEvent,
  EventRollRecordEvent,
  EventRollModeEvent,
  EventTimerStateEvent,
  PendingRoundEvent,
} from "../types/eventDomainEvent";

export interface CreateSyntheticTimeoutDiceResultDepsEvent {
  parseDiceExpression: (exprRaw: string) => {
    count: number;
    sides: number;
    modifier: number;
    explode: boolean;
  };
}

export function createSyntheticTimeoutDiceResultEvent(
  event: DiceEventSpecEvent,
  deps: CreateSyntheticTimeoutDiceResultDepsEvent
): DiceResult {
  let count = 0;
  let sides = 0;
  let modifier = 0;
  try {
    const parsed = deps.parseDiceExpression(event.checkDice);
    count = parsed.count;
    sides = parsed.sides;
    modifier = parsed.modifier;
  } catch {
    // Keep zeros to avoid timeout settlement being interrupted by parse failures.
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

export function applySkillModifierToDiceResultEvent(
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

export function ensureEventTimerIndexEvent(
  round: PendingRoundEvent
): Record<string, EventTimerStateEvent> {
  if (!round.eventTimers || typeof round.eventTimers !== "object") {
    round.eventTimers = {};
  }
  return round.eventTimers;
}

export function getLatestRollRecordForEvent(
  round: PendingRoundEvent,
  eventId: string
): EventRollRecordEvent | null {
  for (let i = round.rolls.length - 1; i >= 0; i--) {
    if (round.rolls[i]?.eventId === eventId) return round.rolls[i];
  }
  return null;
}

export interface EnsureRoundEventTimersSyncedDepsEvent {
  getSettingsEvent: () => DicePluginSettingsEvent;
  resolveEventTargetEvent: (
    raw: any,
    scope?: DiceEventSpecEvent["scope"]
  ) => { targetType: DiceEventSpecEvent["targetType"]; targetName?: string; targetLabel: string };
  parseIsoDurationToMsEvent: (raw: string) => number | null;
  applyTimeLimitPolicyMsEvent: (
    durationMs: number | null,
    settings: DicePluginSettingsEvent
  ) => number | null;
}

export function ensureRoundEventTimersSyncedEvent(
  round: PendingRoundEvent,
  deps: EnsureRoundEventTimersSyncedDepsEvent
): void {
  const settings = deps.getSettingsEvent();
  const timers = ensureEventTimerIndexEvent(round);
  const now = Date.now();
  const keepIds = new Set<string>();

  for (const event of round.events) {
    keepIds.add(event.id);
    if (!event.targetType || !event.targetLabel) {
      const resolvedTarget = deps.resolveEventTargetEvent(
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
        : deps.parseIsoDurationToMsEvent(event.timeLimit || "");
    const durationMs = deps.applyTimeLimitPolicyMsEvent(parsedDurationMs, settings);
    event.timeLimitMs = durationMs;

    let timer = timers[event.id];
    const existingRecord = getLatestRollRecordForEvent(round, event.id);
    if (!timer) {
      const offeredAt =
        typeof event.offeredAt === "number" && Number.isFinite(event.offeredAt) ? event.offeredAt : now;
      const deadlineAt = durationMs == null ? null : offeredAt + durationMs;
      timer = { offeredAt, deadlineAt };
      timers[event.id] = timer;
    } else {
      if (!Number.isFinite(timer.offeredAt)) {
        timer.offeredAt =
          typeof event.offeredAt === "number" && Number.isFinite(event.offeredAt) ? event.offeredAt : now;
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

export interface EnsureOpenPendingRoundDepsEvent {
  createIdEvent: (prefix: string) => string;
  now?: () => number;
}

export function ensureOpenPendingRoundEvent(
  meta: DiceMetaEvent,
  deps: EnsureOpenPendingRoundDepsEvent
): PendingRoundEvent {
  const status = (meta.pendingRound as any)?.status;
  const currentNow = deps.now ? deps.now() : Date.now();
  if (!meta.pendingRound || status !== "open") {
    meta.pendingRound = {
      roundId: deps.createIdEvent("round"),
      status: "open",
      events: [],
      rolls: [],
      eventTimers: {},
      sourceAssistantMsgIds: [],
      openedAt: currentNow,
    };
  }
  if (!meta.pendingRound.eventTimers || typeof meta.pendingRound.eventTimers !== "object") {
    meta.pendingRound.eventTimers = {};
  }
  return meta.pendingRound;
}

export interface MergeEventsIntoPendingRoundDepsEvent {
  getSettingsEvent: () => DicePluginSettingsEvent;
  getDiceMetaEvent: () => DiceMetaEvent;
  createIdEvent: (prefix: string) => string;
  parseIsoDurationToMsEvent: (raw: string) => number | null;
  applyTimeLimitPolicyMsEvent: (
    durationMs: number | null,
    settings: DicePluginSettingsEvent
  ) => number | null;
  resolveEventTargetEvent: (
    raw: any,
    scope?: DiceEventSpecEvent["scope"]
  ) => { targetType: DiceEventSpecEvent["targetType"]; targetName?: string; targetLabel: string };
  saveMetadataSafeEvent: () => void;
}

export function mergeEventsIntoPendingRoundEvent(
  events: DiceEventSpecEvent[],
  assistantMsgId: string,
  deps: MergeEventsIntoPendingRoundDepsEvent
): PendingRoundEvent {
  const settings = deps.getSettingsEvent();
  const meta = deps.getDiceMetaEvent();
  const round = ensureOpenPendingRoundEvent(meta, {
    createIdEvent: deps.createIdEvent,
  });
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
          : deps.parseIsoDurationToMsEvent(next.timeLimit || "");
      const durationMs = deps.applyTimeLimitPolicyMsEvent(parsedDurationMs, settings);
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

    const resolvedTarget = deps.resolveEventTargetEvent(
      { type: (next as any).targetType, name: (next as any).targetName },
      next.scope
    );
    next.targetType = resolvedTarget.targetType;
    next.targetName = resolvedTarget.targetName;
    next.targetLabel = resolvedTarget.targetLabel;

    merged.set(next.id, next);
  }

  round.events = Array.from(merged.values());
  ensureRoundEventTimersSyncedEvent(round, {
    getSettingsEvent: deps.getSettingsEvent,
    resolveEventTargetEvent: deps.resolveEventTargetEvent,
    parseIsoDurationToMsEvent: deps.parseIsoDurationToMsEvent,
    applyTimeLimitPolicyMsEvent: deps.applyTimeLimitPolicyMsEvent,
  });
  if (!round.sourceAssistantMsgIds.includes(assistantMsgId)) {
    round.sourceAssistantMsgIds.push(assistantMsgId);
  }
  deps.saveMetadataSafeEvent();
  return round;
}

export function resolveTriggeredOutcomeEvent(
  event: DiceEventSpecEvent,
  record: EventRollRecordEvent | null | undefined,
  settings: DicePluginSettingsEvent
): { kind: EventOutcomeKindEvent; text: string; explosionTriggered: boolean } {
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

export interface CreateTimeoutFailureRecordDepsEvent {
  getSettingsEvent: () => DicePluginSettingsEvent;
  normalizeCompareOperatorEvent: (raw: any) => CompareOperatorEvent | null;
  createSyntheticTimeoutDiceResultEvent: (event: DiceEventSpecEvent) => DiceResult;
  resolveSkillModifierBySkillNameEvent: (
    skillName: string,
    settings?: DicePluginSettingsEvent
  ) => number;
  createIdEvent: (prefix: string) => string;
}

export function createTimeoutFailureRecordEvent(
  round: PendingRoundEvent,
  event: DiceEventSpecEvent,
  now: number,
  deps: CreateTimeoutFailureRecordDepsEvent
): EventRollRecordEvent {
  const settings = deps.getSettingsEvent();
  const compareUsed = deps.normalizeCompareOperatorEvent(event.compare) ?? ">=";
  const dcUsed = Number.isFinite(event.dc) ? Number(event.dc) : null;
  const result = deps.createSyntheticTimeoutDiceResultEvent(event);
  const baseModifierUsed = Number(result.modifier) || 0;
  const skillModifierApplied = deps.resolveSkillModifierBySkillNameEvent(event.skill, settings);
  const finalModifierUsed = baseModifierUsed + skillModifierApplied;
  return {
    rollId: deps.createIdEvent("eroll"),
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

export interface RecordTimeoutFailureIfNeededDepsEvent {
  getSettingsEvent: () => DicePluginSettingsEvent;
  getLatestRollRecordForEvent: (
    round: PendingRoundEvent,
    eventId: string
  ) => EventRollRecordEvent | null;
  ensureRoundEventTimersSyncedEvent: (round: PendingRoundEvent) => void;
  createTimeoutFailureRecordEvent: (
    round: PendingRoundEvent,
    event: DiceEventSpecEvent,
    now: number
  ) => EventRollRecordEvent;
}

export function recordTimeoutFailureIfNeededEvent(
  round: PendingRoundEvent,
  event: DiceEventSpecEvent,
  deps: RecordTimeoutFailureIfNeededDepsEvent,
  now = Date.now()
): EventRollRecordEvent | null {
  const settings = deps.getSettingsEvent();
  if (!settings.enableTimeLimit) return null;
  const existing = deps.getLatestRollRecordForEvent(round, event.id);
  if (existing) return null;

  deps.ensureRoundEventTimersSyncedEvent(round);
  const timer = round.eventTimers[event.id];
  if (!timer || timer.deadlineAt == null) return null;
  if (now <= timer.deadlineAt) return null;

  const record = deps.createTimeoutFailureRecordEvent(round, event, now);
  round.rolls.push(record);
  timer.expiredAt = now;
  return record;
}

export interface SweepTimeoutFailuresDepsEvent {
  getSettingsEvent: () => DicePluginSettingsEvent;
  getDiceMetaEvent: () => DiceMetaEvent;
  ensureRoundEventTimersSyncedEvent: (round: PendingRoundEvent) => void;
  recordTimeoutFailureIfNeededEvent: (
    round: PendingRoundEvent,
    event: DiceEventSpecEvent,
    now?: number
  ) => EventRollRecordEvent | null;
  saveMetadataSafeEvent: () => void;
}

export function sweepTimeoutFailuresEvent(deps: SweepTimeoutFailuresDepsEvent): boolean {
  const settings = deps.getSettingsEvent();
  if (!settings.enabled) return false;
  if (!settings.enableTimeLimit) return false;

  const meta = deps.getDiceMetaEvent();
  const round = meta.pendingRound;
  if (!round) return false;

  deps.ensureRoundEventTimersSyncedEvent(round);
  const now = Date.now();
  let changed = false;
  for (const event of round.events) {
    const created = deps.recordTimeoutFailureIfNeededEvent(round, event, now);
    if (created) changed = true;
  }

  if (changed) {
    deps.saveMetadataSafeEvent();
  }
  return changed;
}

export interface PerformEventRollByIdDepsEvent {
  sweepTimeoutFailuresEvent: () => boolean;
  getDiceMetaEvent: () => DiceMetaEvent;
  ensureRoundEventTimersSyncedEvent: (round: PendingRoundEvent) => void;
  recordTimeoutFailureIfNeededEvent: (
    round: PendingRoundEvent,
    event: DiceEventSpecEvent,
    now?: number
  ) => EventRollRecordEvent | null;
  saveMetadataSafeEvent: () => void;
  getLatestRollRecordForEvent: (
    round: PendingRoundEvent,
    eventId: string
  ) => EventRollRecordEvent | null;
  buildEventAlreadyRolledCardEvent: (
    event: DiceEventSpecEvent,
    record: EventRollRecordEvent
  ) => string;
  pushToChat: (message: string) => string | undefined | void;
  refreshCountdownDomEvent: () => void;
  rollExpression: (exprRaw: string, options?: DiceOptions) => DiceResult;
  getSettingsEvent: () => DicePluginSettingsEvent;
  resolveSkillModifierBySkillNameEvent: (
    skillName: string,
    settings?: DicePluginSettingsEvent
  ) => number;
  applySkillModifierToDiceResultEvent: (
    result: DiceResult,
    skillModifier: number
  ) => { result: DiceResult; baseModifierUsed: number; finalModifierUsed: number };
  saveLastRoll: (result: DiceResult) => void;
  normalizeCompareOperatorEvent: (raw: any) => CompareOperatorEvent | null;
  evaluateSuccessEvent: (
    total: number,
    compare: CompareOperatorEvent,
    dc: number | null
  ) => boolean | null;
  createIdEvent: (prefix: string) => string;
  buildEventRollResultCardEvent: (
    event: DiceEventSpecEvent,
    record: EventRollRecordEvent
  ) => string;
}

export function performEventRollByIdEvent(
  eventIdRaw: string,
  overrideExpr: string | undefined,
  expectedRoundId: string | undefined,
  deps: PerformEventRollByIdDepsEvent
): string {
  deps.sweepTimeoutFailuresEvent();
  const eventId = String(eventIdRaw || "").trim();
  if (!eventId) {
    return "❌ 请提供事件 ID，例如：/eventroll roll lockpick_gate";
  }

  const meta = deps.getDiceMetaEvent();
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

  deps.ensureRoundEventTimersSyncedEvent(round);
  const timeoutCreated = deps.recordTimeoutFailureIfNeededEvent(round, event);
  if (timeoutCreated) {
    deps.saveMetadataSafeEvent();
  }

  const existingRecord = deps.getLatestRollRecordForEvent(round, event.id);
  if (existingRecord) {
    const alreadyCard = deps.buildEventAlreadyRolledCardEvent(event, existingRecord);
    const fallback = deps.pushToChat(alreadyCard);
    deps.refreshCountdownDomEvent();
    return typeof fallback === "string" ? fallback : "";
  }

  const expr = (overrideExpr || event.checkDice || "").trim();
  if (!expr) {
    return `❌ 事件 ${eventId} 缺少可用骰式。`;
  }

  const settings = deps.getSettingsEvent();

  let result: DiceResult;
  try {
    result = deps.rollExpression(expr, { rule: settings.ruleText });
  } catch (error: any) {
    return `❌ 掷骰失败：${error?.message ?? String(error)}`;
  }
  const skillModifierApplied = deps.resolveSkillModifierBySkillNameEvent(event.skill, settings);
  const adjusted = deps.applySkillModifierToDiceResultEvent(result, skillModifierApplied);
  result = adjusted.result;

  deps.saveLastRoll(result);
  const compareUsed = deps.normalizeCompareOperatorEvent(event.compare) ?? ">=";
  const dcUsed = Number.isFinite(event.dc) ? Number(event.dc) : null;
  const success = deps.evaluateSuccessEvent(result.total, compareUsed, dcUsed);

  const record: EventRollRecordEvent = {
    rollId: deps.createIdEvent("eroll"),
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
  deps.saveMetadataSafeEvent();
  deps.refreshCountdownDomEvent();

  const message = deps.buildEventRollResultCardEvent(event, record);
  const fallback = deps.pushToChat(message);
  return typeof fallback === "string" ? fallback : "";
}

export interface AutoRollEventsByAiModeDepsEvent {
  getSettingsEvent: () => DicePluginSettingsEvent;
  ensureRoundEventTimersSyncedEvent: (round: PendingRoundEvent) => void;
  getLatestRollRecordForEvent: (
    round: PendingRoundEvent,
    eventId: string
  ) => EventRollRecordEvent | null;
  rollExpression: (exprRaw: string, options?: DiceOptions) => DiceResult;
  resolveSkillModifierBySkillNameEvent: (
    skillName: string,
    settings?: DicePluginSettingsEvent
  ) => number;
  applySkillModifierToDiceResultEvent: (
    result: DiceResult,
    skillModifier: number
  ) => { result: DiceResult; baseModifierUsed: number; finalModifierUsed: number };
  normalizeCompareOperatorEvent: (raw: any) => CompareOperatorEvent | null;
  evaluateSuccessEvent: (
    total: number,
    compare: CompareOperatorEvent,
    dc: number | null
  ) => boolean | null;
  createIdEvent: (prefix: string) => string;
  buildEventRollResultCardEvent: (
    event: DiceEventSpecEvent,
    record: EventRollRecordEvent
  ) => string;
  saveLastRoll: (result: DiceResult) => void;
  saveMetadataSafeEvent: () => void;
}

export function autoRollEventsByAiModeEvent(
  round: PendingRoundEvent,
  deps: AutoRollEventsByAiModeDepsEvent
): string[] {
  const settings = deps.getSettingsEvent();
  if (!settings.enableAiRollMode) return [];

  deps.ensureRoundEventTimersSyncedEvent(round);

  let changed = false;
  let lastResult: DiceResult | null = null;
  const resultCards: string[] = [];

  for (const event of round.events) {
    const mode: EventRollModeEvent = event.rollMode === "auto" ? "auto" : "manual";
    if (mode !== "auto") continue;

    const existingRecord = deps.getLatestRollRecordForEvent(round, event.id);
    if (existingRecord) continue;

    const expr = String(event.checkDice || "").trim();
    if (!expr) continue;

    let result: DiceResult;
    try {
      result = deps.rollExpression(expr, { rule: settings.ruleText });
    } catch (error) {
      console.warn(`[骰子插件] AI 自动投骰失败: event=${event.id}`, error);
      continue;
    }
    const skillModifierApplied = deps.resolveSkillModifierBySkillNameEvent(event.skill, settings);
    const adjusted = deps.applySkillModifierToDiceResultEvent(result, skillModifierApplied);
    result = adjusted.result;

    const compareUsed = deps.normalizeCompareOperatorEvent(event.compare) ?? ">=";
    const dcUsed = Number.isFinite(event.dc) ? Number(event.dc) : null;
    const success = deps.evaluateSuccessEvent(result.total, compareUsed, dcUsed);
    const record: EventRollRecordEvent = {
      rollId: deps.createIdEvent("eroll"),
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
    resultCards.push(deps.buildEventRollResultCardEvent(event, record));
  }

  if (!changed) return [];

  if (lastResult) {
    deps.saveLastRoll(lastResult);
  } else {
    deps.saveMetadataSafeEvent();
  }
  return resultCards;
}

export interface FormatRollRecordSummaryDepsEvent {
  getSettingsEvent: () => DicePluginSettingsEvent;
  resolveTriggeredOutcomeEvent: (
    event: DiceEventSpecEvent,
    record: EventRollRecordEvent | null | undefined,
    settings: DicePluginSettingsEvent
  ) => { kind: EventOutcomeKindEvent; text: string; explosionTriggered: boolean };
  formatEventModifierBreakdownEvent: (
    baseModifier: number,
    skillModifier: number,
    finalModifier: number
  ) => string;
}

export function formatRollRecordSummaryEvent(
  record: EventRollRecordEvent,
  event: DiceEventSpecEvent | undefined,
  deps: FormatRollRecordSummaryDepsEvent
): string {
  const settings = deps.getSettingsEvent();
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
      ? deps.resolveTriggeredOutcomeEvent(event, record, settings)
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
    ? ` | 修正:${deps.formatEventModifierBreakdownEvent(
        baseModifierUsed,
        skillModifierApplied,
        finalModifierUsed
      )}`
    : "";

  if (record.source === "timeout_auto_fail") {
    return `超时自动判定失败${targetTag}${modifierTag}${outcomeTag}`;
  }
  if (record.source === "ai_auto_roll") {
    const status = record.success === null ? "未判定" : record.success ? "成功" : "失败";
    return `AI自动检定，总值 ${record.result.total} (${record.compareUsed} ${record.dcUsed ?? "?"} => ${status})${targetTag}${modifierTag}${outcomeTag}`;
  }
  const status = record.success === null ? "未判定" : record.success ? "成功" : "失败";
  return `总值 ${record.result.total} (${record.compareUsed} ${record.dcUsed ?? "?"} => ${status})${targetTag}${modifierTag}${outcomeTag}`;
}
