/// <reference path="./global.d.ts" />
import { buildSettingsCardHtmlTemplateEvent } from "../templates/settingsCardHtmlTemplate";
import { buildSettingsCardStylesTemplateEvent } from "../templates/settingsCardStylesTemplate";
import {
  evaluateSuccessEvent as evaluateSuccessCoreEvent,
  parseDiceExpression as parseDiceExpressionCoreEvent,
  rollExpression as rollExpressionCoreEvent,
} from "../core/diceEngineEvent";
import { pushToChat as pushToChatCoreEvent } from "../core/chatEvent";
import {
  DEFAULT_RULE_TEXT_Event,
  DEFAULT_SETTINGS_Event,
  DICE_RULE_BLOCK_END_Event,
  DICE_RULE_BLOCK_START_Event,
  DICE_SUMMARY_BLOCK_END_Event,
  DICE_SUMMARY_BLOCK_START_Event,
  ISO_8601_DURATION_REGEX_Event,
  OUTCOME_TEXT_MAX_LEN_Event,
  SETTINGS_BADGE_ID_Event,
  SETTINGS_BADGE_VERSION_Event,
  SETTINGS_CARD_ID_Event,
  SETTINGS_SKILL_DIRTY_HINT_ID_Event,
  SETTINGS_SKILL_ERRORS_ID_Event,
  SETTINGS_SKILL_MODAL_ID_Event,
  SETTINGS_SKILL_PRESET_DELETE_ID_Event,
  SETTINGS_SKILL_PRESET_LIST_ID_Event,
  SETTINGS_SKILL_PRESET_META_ID_Event,
  SETTINGS_SKILL_PRESET_NAME_ID_Event,
  SETTINGS_SKILL_ROWS_ID_Event,
  SETTINGS_STYLE_ID_Event,
  SETTINGS_SYNC_UI_IDS_Event,
  SETTINGS_BASIC_INPUT_IDS_Event,
  SETTINGS_RULE_TEXT_ACTION_IDS_Event,
  SETTINGS_SKILL_IMPORT_EXPORT_IDS_Event,
  SETTINGS_SKILL_PRESET_ACTION_IDS_Event,
  SETTINGS_SKILL_ROWS_EDIT_IDS_Event,
  SETTINGS_TABS_AND_MODAL_IDS_Event,
  SETTINGS_TEMPLATE_STATIC_DEPS_Event,
  SKILL_PRESET_DEFAULT_ID_Event,
  SKILL_PRESET_NEW_NAME_BASE_Event,
  SUMMARY_HISTORY_MAX_STORED_Event,
  SUMMARY_HISTORY_ROUNDS_MAX_Event,
  SUMMARY_HISTORY_ROUNDS_MIN_Event,
  SUMMARY_MAX_EVENTS_Event,
  SUMMARY_MAX_TOTAL_EVENT_LINES_Event,
} from "../settings/constantsEvent";
import {
  ARGUMENT_TYPE,
  SlashCommand,
  SlashCommandArgument,
  SlashCommandParser,
  eventSource,
  event_types,
  type STContext,
  getLiveContextEvent as getLiveContextCoreEvent,
  registerMacro,
} from "../core/runtimeContextEvent";
import {
  createIdEvent as createIdCoreEvent,
  escapeAttrEvent as escapeAttrCoreEvent,
  escapeHtmlEvent as escapeHtmlCoreEvent,
  formatEventModifierBreakdownEvent as formatEventModifierBreakdownCoreEvent,
  formatModifier as formatModifierCoreEvent,
  normalizeBlankLinesEvent as normalizeBlankLinesCoreEvent,
  simpleHashEvent as simpleHashCoreEvent,
} from "../core/utilsEvent";
import {
  buildDefaultSkillPresetStoreEvent as buildDefaultSkillPresetStoreTemplateStoreEvent,
  buildSkillDraftSnapshotEvent as buildSkillDraftSnapshotStoreEvent,
  countSkillEntriesFromSkillTableTextEvent as countSkillEntriesFromSkillTableTextStoreEvent,
  createSkillEditorRowDraftEvent as createSkillEditorRowDraftStoreEvent,
  deserializeSkillTableTextToRowsEvent as deserializeSkillTableTextToRowsStoreEvent,
  getDiceMeta as getDiceMetaStoreEvent,
  getDiceMetaEvent as getDiceMetaStoreMetaEvent,
  getActiveSkillPresetEvent as getActiveSkillPresetStoreEvent,
  getSkillPresetByIdEvent as getSkillPresetByIdStoreEvent,
  getSkillPresetStoreEvent as getSkillPresetStoreStoreEvent,
  getSettingsEvent as getSettingsStoreEvent,
  getSkillModifierTableMapEvent as getSkillModifierTableMapStoreEvent,
  getUniqueSkillPresetNameEvent as getUniqueSkillPresetNameStoreEvent,
  normalizeSkillPresetNameKeyEvent as normalizeSkillPresetNameKeyStoreEvent,
  normalizeSkillTableTextForSettingsEvent as normalizeSkillTableTextForSettingsStoreEvent,
  persistChatSafeEvent as persistChatSafeStoreEvent,
  resolveSkillModifierBySkillNameEvent as resolveSkillModifierBySkillNameStoreEvent,
  saveLastRoll as saveLastRollStoreEvent,
  saveMetadataSafeEvent as saveMetadataSafeStoreEvent,
  saveSkillPresetStoreEvent as saveSkillPresetStoreStoreEvent,
  serializeSkillRowsToSkillTableTextEvent as serializeSkillRowsToSkillTableTextStoreEvent,
  setSyncSettingsUiCallbackEvent as setSyncSettingsUiCallbackStoreEvent,
  updateSettingsEvent as updateSettingsStoreEvent,
  validateSkillRowsEvent as validateSkillRowsStoreEvent,
} from "../settings/storeEvent";
import {
  buildAlreadyRolledDiceVisualTemplateEvent,
  buildDiceSvgTemplateEvent,
  buildResultMessageTemplateEvent,
  buildRollingSvgTemplateEvent,
} from "../templates/diceResultTemplates";
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
} from "../templates/eventCardTemplates";
import { registerBaseMacrosAndCommandsEvent as registerBaseMacrosAndCommandsModuleEvent } from "../commands/baseRollCommandEvent";
import { registerEventRollCommandEvent as registerEventRollCommandModuleEvent } from "../commands/eventRollCommandEvent";
import { registerDebugCommandEvent as registerDebugCommandModuleEvent } from "../commands/debugCommandEvent";
import {
  bindEventButtonsEvent as bindEventButtonsModuleEvent,
  buildAssistantMessageIdEvent as buildAssistantMessageIdModuleEvent,
  clearDiceMetaEventState as clearDiceMetaEventStateModuleEvent,
  findLatestAssistantEvent as findLatestAssistantModuleEvent,
  handleGenerationEndedEvent as handleGenerationEndedModuleEvent,
  registerEventHooksEvent as registerEventHooksModuleEvent,
  sanitizeAssistantMessageEventBlocksEvent as sanitizeAssistantMessageEventBlocksModuleEvent,
  sanitizeCurrentChatEventBlocksEvent as sanitizeCurrentChatEventBlocksModuleEvent,
  startCountdownTickerEvent as startCountdownTickerModuleEvent,
} from "../events/hooksEvent";
import {
  extractPromptChatFromPayloadEvent as extractPromptChatFromPayloadModuleEvent,
  getMessageTextEvent as getMessageTextModuleEvent,
  getPreferredAssistantSourceTextEvent as getPreferredAssistantSourceTextModuleEvent,
  handlePromptReadyEvent as handlePromptReadyModuleEvent,
  isAssistantMessageEvent as isAssistantMessageModuleEvent,
  setMessageTextEvent as setMessageTextModuleEvent,
} from "../events/promptEvent";
import {
  applyTimeLimitPolicyMsEvent as applyTimeLimitPolicyMsModuleEvent,
  filterEventsByApplyScopeEvent as filterEventsByApplyScopeModuleEvent,
  normalizeCompareOperatorEvent as normalizeCompareOperatorModuleEvent,
  parseEventEnvelopesEvent as parseEventEnvelopesModuleEvent,
  parseIsoDurationToMsEvent as parseIsoDurationToMsModuleEvent,
  removeRangesEvent as removeRangesModuleEvent,
  resolveEventTargetEvent as resolveEventTargetModuleEvent,
} from "../events/parserEvent";
import {
  buildSummaryBlockFromHistoryEvent as buildSummaryBlockFromHistoryModuleEvent,
  createRoundSummarySnapshotEvent as createRoundSummarySnapshotModuleEvent,
  ensureSummaryHistoryEvent as ensureSummaryHistoryModuleEvent,
  trimSummaryHistoryEvent as trimSummaryHistoryModuleEvent,
} from "../events/summaryEvent";
import {
  bindMountedSettingsCardEvent as bindMountedSettingsCardModuleEvent,
  buildSettingsCardTemplateIdsEvent as buildSettingsCardTemplateIdsModuleEvent,
  copyTextToClipboardEvent as copyTextToClipboardModuleEvent,
  ensureSettingsCardStylesEvent as ensureSettingsCardStylesModuleEvent,
  isElementVisibleEvent as isElementVisibleModuleEvent,
  mountSettingsCardShellEvent as mountSettingsCardShellModuleEvent,
  syncSettingsUiEvent as syncSettingsUiModuleEvent,
  syncSettingsBadgeVersionEvent as syncSettingsBadgeVersionModuleEvent,
} from "../settings/uiEvent";
import { createSkillEditorRuntimeEvent } from "../settings/skillEditorRuntimeEvent";
import {
  buildEventAlreadyRolledCardEvent as buildEventAlreadyRolledCardModuleEvent,
  buildEventListCardEvent as buildEventListCardModuleEvent,
  buildEventRollResultCardEvent as buildEventRollResultCardModuleEvent,
  getEventRuntimeViewStateEvent as getEventRuntimeViewStateModuleEvent,
  getRuntimeToneStyleEvent as getRuntimeToneStyleModuleEvent,
  hideEventCodeBlocksInDomEvent as hideEventCodeBlocksInDomModuleEvent,
  refreshCountdownDomEvent as refreshCountdownDomModuleEvent,
  type EventRuntimeToneEvent,
  type EventRuntimeViewStateEvent,
} from "../events/renderEvent";
import {
  autoRollEventsByAiModeEvent as autoRollEventsByAiModeModuleEvent,
  applySkillModifierToDiceResultEvent as applySkillModifierToDiceResultModuleEvent,
  createTimeoutFailureRecordEvent as createTimeoutFailureRecordModuleEvent,
  createSyntheticTimeoutDiceResultEvent as createSyntheticTimeoutDiceResultModuleEvent,
  ensureRoundEventTimersSyncedEvent as ensureRoundEventTimersSyncedModuleEvent,
  formatRollRecordSummaryEvent as formatRollRecordSummaryModuleEvent,
  getLatestRollRecordForEvent as getLatestRollRecordForModuleEvent,
  mergeEventsIntoPendingRoundEvent as mergeEventsIntoPendingRoundModuleEvent,
  performEventRollByIdEvent as performEventRollByIdModuleEvent,
  recordTimeoutFailureIfNeededEvent as recordTimeoutFailureIfNeededModuleEvent,
  resolveTriggeredOutcomeEvent as resolveTriggeredOutcomeModuleEvent,
  sweepTimeoutFailuresEvent as sweepTimeoutFailuresModuleEvent,
} from "../events/roundEvent";
import type { DiceMeta, DiceOptions, DiceResult } from "../types/diceEvent";
import type {
  CompareOperatorEvent,
  DiceEventSpecEvent,
  DiceMetaEvent,
  DicePluginSettingsEvent,
  EventApplyScopeSettingEvent,
  EventOutcomeKindEvent,
  EventRollRecordEvent,
  EventScopeTagEvent,
  EventTargetTypeEvent,
  PendingRoundEvent,
  RoundSummarySnapshotEvent,
  SummaryDetailModeEvent,
  TavernMessageEvent,
} from "../types/eventDomainEvent";

function formatModifier(mod: number): string {
  return formatModifierCoreEvent(mod);
}

function formatEventModifierBreakdownEvent(
  baseModifier: number,
  skillModifier: number,
  finalModifier: number
): string {
  return formatEventModifierBreakdownCoreEvent(baseModifier, skillModifier, finalModifier);
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

// ===== 解析表达式：NdM+X / NdM-X / NdM =====

function parseDiceExpression(exprRaw: string): {
  count: number;
  sides: number;
  modifier: number;
  explode: boolean;
} {
  return parseDiceExpressionCoreEvent(exprRaw);
}

// ===== 核心 =====

function rollExpression(
  exprRaw: string,
  options: DiceOptions = {}
): DiceResult {
  return rollExpressionCoreEvent(exprRaw, options);
}



function pushToChat(message: string) {
  return pushToChatCoreEvent(message);
}

// ===== 存储结果到宏 =====

function getDiceMeta(): DiceMeta {
  return getDiceMetaStoreEvent();
}

function saveLastRoll(result: DiceResult): void {
  saveLastRollStoreEvent(result);
}

export function registerBaseMacrosAndCommandsEvent(): void {
  registerBaseMacrosAndCommandsModuleEvent({
    registerMacro,
    SlashCommandParser,
    SlashCommand,
    SlashCommandArgument,
    ARGUMENT_TYPE,
    getDiceMeta,
    rollExpression,
    saveLastRoll,
    buildResultMessage,
    pushToChat,
  });
}

// ===== Event: 事件驱动骰子系统 =====

function getLiveContextEvent(): STContext | null {
  return getLiveContextCoreEvent();
}

function createIdEvent(prefix: string): string {
  return createIdCoreEvent(prefix);
}

function simpleHashEvent(input: string): string {
  return simpleHashCoreEvent(input);
}

function escapeHtmlEvent(input: string): string {
  return escapeHtmlCoreEvent(input);
}

function escapeAttrEvent(input: string): string {
  return escapeAttrCoreEvent(input);
}

function normalizeBlankLinesEvent(input: string): string {
  return normalizeBlankLinesCoreEvent(input);
}

function getDiceMetaEvent(): DiceMetaEvent {
  return getDiceMetaStoreMetaEvent();
}

function saveMetadataSafeEvent(): void {
  saveMetadataSafeStoreEvent();
}

function persistChatSafeEvent(): void {
  persistChatSafeStoreEvent();
}

function getSettingsEvent(): DicePluginSettingsEvent {
  return getSettingsStoreEvent();
}

function updateSettingsEvent(patch: Partial<DicePluginSettingsEvent>): void {
  updateSettingsStoreEvent(patch);
}


const skillEditorRuntimeEvent = createSkillEditorRuntimeEvent({
  SETTINGS_SKILL_DIRTY_HINT_ID_Event,
  SETTINGS_SKILL_ERRORS_ID_Event,
  SETTINGS_SKILL_ROWS_ID_Event,
  SETTINGS_SKILL_PRESET_LIST_ID_Event,
  SETTINGS_SKILL_PRESET_META_ID_Event,
  SETTINGS_SKILL_PRESET_NAME_ID_Event,
  SETTINGS_SKILL_PRESET_DELETE_ID_Event,
  getSettingsEvent,
  getSkillPresetStoreEvent: getSkillPresetStoreStoreEvent,
  getActiveSkillPresetEvent: getActiveSkillPresetStoreEvent,
  normalizeSkillTableTextForSettingsEvent,
  deserializeSkillTableTextToRowsEvent: deserializeSkillTableTextToRowsStoreEvent,
  buildSkillDraftSnapshotEvent: buildSkillDraftSnapshotStoreEvent,
  countSkillEntriesFromSkillTableTextEvent: countSkillEntriesFromSkillTableTextStoreEvent,
  pushToChatEvent: pushToChat,
  escapeHtmlEvent,
  escapeAttrEvent,
});


function buildSettingsCardTemplateIdsForMountEvent(
  drawerToggleId: string,
  drawerContentId: string,
  drawerIconId: string
) {
  return buildSettingsCardTemplateIdsModuleEvent({
    ...SETTINGS_TEMPLATE_STATIC_DEPS_Event,
    drawerToggleId,
    drawerContentId,
    drawerIconId,
  });
}

const isSkillDraftDirtyEvent = skillEditorRuntimeEvent.isSkillDraftDirtyEvent;
const refreshSkillDraftDirtyStateEvent = skillEditorRuntimeEvent.refreshSkillDraftDirtyStateEvent;
const renderSkillRowsEvent = skillEditorRuntimeEvent.renderSkillRowsEvent;
const renderSkillValidationErrorsEvent = skillEditorRuntimeEvent.renderSkillValidationErrorsEvent;
const hydrateSkillDraftFromSettingsEvent = skillEditorRuntimeEvent.hydrateSkillDraftFromSettingsEvent;
const confirmDiscardSkillDraftEvent = skillEditorRuntimeEvent.confirmDiscardSkillDraftEvent;

function bindSettingsCardMountedActionsEvent(
  drawerToggleId: string,
  drawerContentId: string
): void {
  bindMountedSettingsCardModuleEvent({
    drawerToggleId,
    drawerContentId,
    tabsAndModalDepsEvent: {
      ...SETTINGS_TABS_AND_MODAL_IDS_Event,
      confirmDiscardSkillDraftEvent,
      isElementVisibleEvent,
      isSkillDraftDirtyEvent,
    },
    basicSettingsInputsDepsEvent: {
      ...SETTINGS_BASIC_INPUT_IDS_Event,
      SUMMARY_HISTORY_ROUNDS_MAX_Event,
      SUMMARY_HISTORY_ROUNDS_MIN_Event,
      DEFAULT_SUMMARY_HISTORY_ROUNDS_Event: DEFAULT_SETTINGS_Event.summaryHistoryRounds,
      updateSettingsEvent,
    },
    skillPresetActionsDepsEvent: {
      ...SETTINGS_SKILL_PRESET_ACTION_IDS_Event,
      SKILL_PRESET_NEW_NAME_BASE_Event,
      SKILL_PRESET_DEFAULT_ID_Event,
      getSkillEditorActivePresetIdEvent: skillEditorRuntimeEvent.getSkillEditorActivePresetIdEvent,
      confirmDiscardSkillDraftEvent,
      getSettingsEvent,
      getSkillPresetStoreEvent: getSkillPresetStoreStoreEvent,
      getSkillPresetByIdEvent: getSkillPresetByIdStoreEvent,
      saveSkillPresetStoreEvent: saveSkillPresetStoreStoreEvent,
      getActiveSkillPresetEvent: getActiveSkillPresetStoreEvent,
      getUniqueSkillPresetNameEvent: getUniqueSkillPresetNameStoreEvent,
      createIdEvent,
      buildDefaultSkillPresetStoreEvent: () => buildDefaultSkillPresetStoreTemplateStoreEvent(),
      normalizeSkillPresetNameKeyEvent: normalizeSkillPresetNameKeyStoreEvent,
      renderSkillValidationErrorsEvent,
      pushToChat,
    },
    skillRowsEditingActionsDepsEvent: {
      ...SETTINGS_SKILL_ROWS_EDIT_IDS_Event,
      getSkillRowsDraftEvent: skillEditorRuntimeEvent.getSkillRowsDraftEvent,
      setSkillRowsDraftEvent: skillEditorRuntimeEvent.setSkillRowsDraftEvent,
      createSkillEditorRowDraftEvent: createSkillEditorRowDraftStoreEvent,
      renderSkillRowsEvent,
      refreshSkillDraftDirtyStateEvent,
      renderSkillValidationErrorsEvent,
    },
    skillImportExportActionsDepsEvent: {
      ...SETTINGS_SKILL_IMPORT_EXPORT_IDS_Event,
      getSkillRowsDraftEvent: skillEditorRuntimeEvent.getSkillRowsDraftEvent,
      setSkillRowsDraftEvent: skillEditorRuntimeEvent.setSkillRowsDraftEvent,
      serializeSkillRowsToSkillTableTextEvent: serializeSkillRowsToSkillTableTextStoreEvent,
      getSettingsEvent,
      getSkillPresetStoreEvent: getSkillPresetStoreStoreEvent,
      getActiveSkillPresetEvent: getActiveSkillPresetStoreEvent,
      normalizeSkillTableTextForSettingsEvent,
      deserializeSkillTableTextToRowsEvent: deserializeSkillTableTextToRowsStoreEvent,
      validateSkillRowsEvent: validateSkillRowsStoreEvent,
      renderSkillRowsEvent,
      refreshSkillDraftDirtyStateEvent,
      renderSkillValidationErrorsEvent,
      copyTextToClipboardEvent,
      pushToChat,
      setSkillEditorLastSavedSnapshotEvent: skillEditorRuntimeEvent.setSkillEditorLastSavedSnapshotEvent,
      buildSkillDraftSnapshotEvent: buildSkillDraftSnapshotStoreEvent,
      setSkillDraftDirtyEvent: skillEditorRuntimeEvent.setSkillDraftDirtyEvent,
      saveSkillPresetStoreEvent: saveSkillPresetStoreStoreEvent,
    },
    ruleTextActionsDepsEvent: {
      ...SETTINGS_RULE_TEXT_ACTION_IDS_Event,
      DEFAULT_RULE_TEXT_Event,
      updateSettingsEvent,
    },
  });
}

export function mountSettingsCardEvent(attempt = 0): void {
  mountSettingsCardShellModuleEvent(
    {
      SETTINGS_CARD_ID_Event,
      SETTINGS_SKILL_MODAL_ID_Event,
      buildSettingsCardHtmlTemplateEvent,
      buildSettingsCardTemplateIdsEvent: buildSettingsCardTemplateIdsForMountEvent,
      ensureSettingsCardStylesEvent: () => {
        ensureSettingsCardStylesModuleEvent({
          SETTINGS_STYLE_ID_Event,
          SETTINGS_CARD_ID_Event,
          buildSettingsCardStylesTemplateEvent,
        });
      },
      syncSettingsBadgeVersionEvent: () => {
        syncSettingsBadgeVersionModuleEvent({
          SETTINGS_BADGE_ID_Event,
          SETTINGS_BADGE_VERSION_Event,
        });
      },
      syncSettingsUiEvent,
      onMountedEvent: ({ drawerToggleId, drawerContentId }) =>
        bindSettingsCardMountedActionsEvent(drawerToggleId, drawerContentId),
    },
    attempt
  );
}

function syncSettingsUiEvent(): void {
  syncSettingsUiModuleEvent({
    getSettingsEvent,
    ...SETTINGS_SYNC_UI_IDS_Event,
    isSkillDraftDirtyEvent,
    hydrateSkillDraftFromSettingsEvent,
    DEFAULT_RULE_TEXT_Event,
    getSkillEditorLastSettingsTextEvent: skillEditorRuntimeEvent.getSkillEditorLastSettingsTextEvent,
    getSkillEditorLastPresetStoreTextEvent: skillEditorRuntimeEvent.getSkillEditorLastPresetStoreTextEvent,
  });
}

setSyncSettingsUiCallbackStoreEvent(() => {
  syncSettingsUiEvent();
});

function isElementVisibleEvent(element: HTMLElement | null): boolean {
  return isElementVisibleModuleEvent(element);
}

function copyTextToClipboardEvent(text: string): Promise<boolean> {
  return copyTextToClipboardModuleEvent(text);
}

function getMessageTextEvent(message: TavernMessageEvent | undefined): string {
  return getMessageTextModuleEvent(message);
}

function getPreferredAssistantSourceTextEvent(
  message: TavernMessageEvent | undefined
): string {
  return getPreferredAssistantSourceTextModuleEvent(message);
}

function setMessageTextEvent(message: TavernMessageEvent, text: string): void {
  setMessageTextModuleEvent(message, text);
}

function isAssistantMessageEvent(message: TavernMessageEvent | undefined): boolean {
  return isAssistantMessageModuleEvent(message);
}

function createRoundSummarySnapshotEvent(
  round: PendingRoundEvent,
  now = Date.now()
): RoundSummarySnapshotEvent {
  return createRoundSummarySnapshotModuleEvent(
    round,
    {
      ensureRoundEventTimersSyncedEvent,
      getSettingsEvent,
      getLatestRollRecordForEvent,
      resolveTriggeredOutcomeEvent,
      normalizeCompareOperatorEvent,
    },
    now
  );
}

function ensureSummaryHistoryEvent(meta: DiceMetaEvent): RoundSummarySnapshotEvent[] {
  return ensureSummaryHistoryModuleEvent(meta);
}

function trimSummaryHistoryEvent(history: RoundSummarySnapshotEvent[]): void {
  trimSummaryHistoryModuleEvent(history, SUMMARY_HISTORY_MAX_STORED_Event);
}

function buildSummaryBlockFromHistoryEvent(
  history: RoundSummarySnapshotEvent[],
  detailMode: SummaryDetailModeEvent,
  lastNRounds: number,
  includeOutcomeInSummary: boolean
): string {
  return buildSummaryBlockFromHistoryModuleEvent(
    history,
    detailMode,
    lastNRounds,
    includeOutcomeInSummary,
    {
      SUMMARY_HISTORY_ROUNDS_MAX_Event,
      SUMMARY_HISTORY_ROUNDS_MIN_Event,
      SUMMARY_MAX_EVENTS_Event,
      SUMMARY_MAX_TOTAL_EVENT_LINES_Event,
      DICE_SUMMARY_BLOCK_START_Event,
      DICE_SUMMARY_BLOCK_END_Event,
    }
  );
}

function extractPromptChatFromPayloadEvent(payload: any): TavernMessageEvent[] | null {
  return extractPromptChatFromPayloadModuleEvent(payload);
}

function handlePromptReadyEvent(payload: any, sourceEvent = "unknown"): void {
  handlePromptReadyModuleEvent(
    payload,
    {
      getSettingsEvent,
      getSkillModifierTableMapEvent,
      getSkillPresetStoreEvent: getSkillPresetStoreStoreEvent,
      getActiveSkillPresetEvent: getActiveSkillPresetStoreEvent,
      DEFAULT_RULE_TEXT_Event,
      DICE_RULE_BLOCK_START_Event,
      DICE_RULE_BLOCK_END_Event,
      sweepTimeoutFailuresEvent,
      getDiceMetaEvent,
      ensureSummaryHistoryEvent,
      createRoundSummarySnapshotEvent,
      trimSummaryHistoryEvent,
      buildSummaryBlockFromHistoryEvent,
      saveMetadataSafeEvent,
    },
    sourceEvent
  );
}

function findLatestAssistantEvent(
  chat: TavernMessageEvent[]
): { msg: TavernMessageEvent; index: number } | null {
  return findLatestAssistantModuleEvent(chat, {
    isAssistantMessageEvent,
  });
}

function buildAssistantMessageIdEvent(message: TavernMessageEvent, index: number): string {
  return buildAssistantMessageIdModuleEvent(message, index, {
    simpleHashEvent,
    getMessageTextEvent,
  });
}

function normalizeCompareOperatorEvent(raw: any): CompareOperatorEvent | null {
  return normalizeCompareOperatorModuleEvent(raw);
}

function normalizeSkillTableTextForSettingsEvent(raw: string): string | null {
  return normalizeSkillTableTextForSettingsStoreEvent(raw);
}

function getSkillModifierTableMapEvent(settings: DicePluginSettingsEvent): Record<string, number> {
  return getSkillModifierTableMapStoreEvent(settings);
}

function resolveSkillModifierBySkillNameEvent(
  skillName: string,
  settings = getSettingsEvent()
): number {
  return resolveSkillModifierBySkillNameStoreEvent(skillName, settings);
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
  return resolveTriggeredOutcomeModuleEvent(event, record, settings);
}

function parseIsoDurationToMsEvent(raw: string): number | null {
  return parseIsoDurationToMsModuleEvent(raw, ISO_8601_DURATION_REGEX_Event);
}

function applyTimeLimitPolicyMsEvent(
  durationMs: number | null,
  settings: DicePluginSettingsEvent
): number | null {
  return applyTimeLimitPolicyMsModuleEvent(durationMs, settings);
}


function createSyntheticTimeoutDiceResultEvent(event: DiceEventSpecEvent): DiceResult {
  return createSyntheticTimeoutDiceResultModuleEvent(event, {
    parseDiceExpression,
  });
}

function applySkillModifierToDiceResultEvent(
  result: DiceResult,
  skillModifier: number
): { result: DiceResult; baseModifierUsed: number; finalModifierUsed: number } {
  return applySkillModifierToDiceResultModuleEvent(result, skillModifier);
}

function getLatestRollRecordForEvent(
  round: PendingRoundEvent,
  eventId: string
): EventRollRecordEvent | null {
  return getLatestRollRecordForModuleEvent(round, eventId);
}

function ensureRoundEventTimersSyncedEvent(round: PendingRoundEvent): void {
  ensureRoundEventTimersSyncedModuleEvent(round, {
    getSettingsEvent,
    resolveEventTargetEvent,
    parseIsoDurationToMsEvent,
    applyTimeLimitPolicyMsEvent,
  });
}

function resolveEventTargetEvent(
  raw: any,
  scope?: EventScopeTagEvent
): { targetType: EventTargetTypeEvent; targetName?: string; targetLabel: string } {
  return resolveEventTargetModuleEvent(raw, scope);
}

function filterEventsByApplyScopeEvent(
  events: DiceEventSpecEvent[],
  applyScope: EventApplyScopeSettingEvent
): DiceEventSpecEvent[] {
  return filterEventsByApplyScopeModuleEvent(events, applyScope);
}

type RemovalRangeEvent = { start: number; end: number };

function parseEventEnvelopesEvent(text: string): {
  events: DiceEventSpecEvent[];
  ranges: RemovalRangeEvent[];
} {
  return parseEventEnvelopesModuleEvent(text, {
    getSettingsEvent,
    OUTCOME_TEXT_MAX_LEN_Event,
    ISO_8601_DURATION_REGEX_Event,
  });
}

function removeRangesEvent(text: string, ranges: RemovalRangeEvent[]): string {
  return removeRangesModuleEvent(text, ranges, normalizeBlankLinesEvent);
}

function createTimeoutFailureRecordEvent(
  round: PendingRoundEvent,
  event: DiceEventSpecEvent,
  now: number
): EventRollRecordEvent {
  return createTimeoutFailureRecordModuleEvent(round, event, now, {
    getSettingsEvent,
    normalizeCompareOperatorEvent,
    createSyntheticTimeoutDiceResultEvent,
    resolveSkillModifierBySkillNameEvent,
    createIdEvent,
  });
}

function recordTimeoutFailureIfNeededEvent(
  round: PendingRoundEvent,
  event: DiceEventSpecEvent,
  now = Date.now()
): EventRollRecordEvent | null {
  return recordTimeoutFailureIfNeededModuleEvent(
    round,
    event,
    {
      getSettingsEvent,
      getLatestRollRecordForEvent,
      ensureRoundEventTimersSyncedEvent,
      createTimeoutFailureRecordEvent,
    },
    now
  );
}

export function sweepTimeoutFailuresEvent(): boolean {
  return sweepTimeoutFailuresModuleEvent({
    getSettingsEvent,
    getDiceMetaEvent,
    ensureRoundEventTimersSyncedEvent,
    recordTimeoutFailureIfNeededEvent,
    saveMetadataSafeEvent,
  });
}

function mergeEventsIntoPendingRoundEvent(
  events: DiceEventSpecEvent[],
  assistantMsgId: string
): PendingRoundEvent {
  return mergeEventsIntoPendingRoundModuleEvent(events, assistantMsgId, {
    getSettingsEvent,
    getDiceMetaEvent,
    createIdEvent,
    parseIsoDurationToMsEvent,
    applyTimeLimitPolicyMsEvent,
    resolveEventTargetEvent,
    saveMetadataSafeEvent,
  });
}

function formatRollRecordSummaryEvent(
  record: EventRollRecordEvent,
  event?: DiceEventSpecEvent
): string {
  return formatRollRecordSummaryModuleEvent(record, event, {
    getSettingsEvent,
    resolveTriggeredOutcomeEvent,
    formatEventModifierBreakdownEvent,
  });
}

function getEventRuntimeViewStateEvent(
  round: PendingRoundEvent,
  event: DiceEventSpecEvent,
  now = Date.now()
): EventRuntimeViewStateEvent {
  return getEventRuntimeViewStateModuleEvent(
    round,
    event,
    {
      getSettingsEvent,
      getLatestRollRecordForEvent,
      ensureRoundEventTimersSyncedEvent,
    },
    now
  );
}

function getRuntimeToneStyleEvent(tone: EventRuntimeToneEvent): {
  border: string;
  background: string;
  color: string;
} {
  return getRuntimeToneStyleModuleEvent(tone);
}

export function refreshCountdownDomEvent(): void {
  refreshCountdownDomModuleEvent({
    getDiceMetaEvent,
    ensureRoundEventTimersSyncedEvent,
    getEventRuntimeViewStateEvent,
    getRuntimeToneStyleEvent,
  });
}

function hideEventCodeBlocksInDomEvent(): void {
  hideEventCodeBlocksInDomModuleEvent();
}

function sanitizeAssistantMessageEventBlocksEvent(message: TavernMessageEvent): boolean {
  return sanitizeAssistantMessageEventBlocksModuleEvent(message, {
    getPreferredAssistantSourceTextEvent,
    getMessageTextEvent,
    parseEventEnvelopesEvent,
    removeRangesEvent,
    setMessageTextEvent,
  });
}

export function sanitizeCurrentChatEventBlocksEvent(): void {
  sanitizeCurrentChatEventBlocksModuleEvent({
    getLiveContextEvent,
    isAssistantMessageEvent,
    sanitizeAssistantMessageEventBlocksEvent,
    persistChatSafeEvent,
    hideEventCodeBlocksInDomEvent,
  });
}

function buildEventListCardEvent(round: PendingRoundEvent): string {
  return buildEventListCardModuleEvent(round, {
    getSettingsEvent,
    ensureRoundEventTimersSyncedEvent,
    getLatestRollRecordForEvent,
    getEventRuntimeViewStateEvent,
    getRuntimeToneStyleEvent,
    buildEventRolledPrefixTemplateEvent,
    buildEventRolledBlockTemplateEvent,
    formatRollRecordSummaryEvent,
    parseDiceExpression,
    resolveSkillModifierBySkillNameEvent,
    formatEventModifierBreakdownEvent,
    buildEventRollButtonTemplateEvent,
    buildEventListItemTemplateEvent,
    buildEventListCardTemplateEvent,
    escapeHtmlEvent,
    escapeAttrEvent,
  });
}

function evaluateSuccessEvent(
  total: number,
  compare: CompareOperatorEvent,
  dc: number | null
): boolean | null {
  return evaluateSuccessCoreEvent(total, compare, dc);
}

function buildEventRollResultCardEvent(
  event: DiceEventSpecEvent,
  record: EventRollRecordEvent
): string {
  return buildEventRollResultCardModuleEvent(event, record, {
    getSettingsEvent,
    resolveTriggeredOutcomeEvent,
    formatEventModifierBreakdownEvent,
    buildRollsSummaryTemplateEvent,
    formatModifier,
    buildEventRollResultCardTemplateEvent,
    escapeHtmlEvent,
    getDiceSvg,
    getRollingSvg,
    buildAlreadyRolledDiceVisualTemplateEvent,
  });
}

function buildEventAlreadyRolledCardEvent(
  event: DiceEventSpecEvent,
  record: EventRollRecordEvent
): string {
  return buildEventAlreadyRolledCardModuleEvent(event, record, {
    getSettingsEvent,
    resolveTriggeredOutcomeEvent,
    formatEventModifierBreakdownEvent,
    buildEventDistributionBlockTemplateEvent,
    buildEventTimeoutAtBlockTemplateEvent,
    buildEventAlreadyRolledCardTemplateEvent,
    escapeHtmlEvent,
    formatModifier,
    getDiceSvg,
    getRollingSvg,
    buildAlreadyRolledDiceVisualTemplateEvent,
  });
}
function performEventRollByIdEvent(
  eventIdRaw: string,
  overrideExpr?: string,
  expectedRoundId?: string
): string {
  return performEventRollByIdModuleEvent(eventIdRaw, overrideExpr, expectedRoundId, {
    sweepTimeoutFailuresEvent,
    getDiceMetaEvent,
    ensureRoundEventTimersSyncedEvent,
    recordTimeoutFailureIfNeededEvent,
    saveMetadataSafeEvent,
    getLatestRollRecordForEvent,
    buildEventAlreadyRolledCardEvent,
    pushToChat,
    refreshCountdownDomEvent,
    rollExpression,
    getSettingsEvent,
    resolveSkillModifierBySkillNameEvent,
    applySkillModifierToDiceResultEvent,
    saveLastRoll,
    normalizeCompareOperatorEvent,
    evaluateSuccessEvent,
    createIdEvent,
    buildEventRollResultCardEvent,
  });
}

function autoRollEventsByAiModeEvent(round: PendingRoundEvent): string[] {
  return autoRollEventsByAiModeModuleEvent(round, {
    getSettingsEvent,
    ensureRoundEventTimersSyncedEvent,
    getLatestRollRecordForEvent,
    rollExpression,
    resolveSkillModifierBySkillNameEvent,
    applySkillModifierToDiceResultEvent,
    normalizeCompareOperatorEvent,
    evaluateSuccessEvent,
    createIdEvent,
    buildEventRollResultCardEvent,
    saveLastRoll,
    saveMetadataSafeEvent,
  });
}

export function bindEventButtonsEvent(): void {
  bindEventButtonsModuleEvent({
    performEventRollByIdEvent,
    pushToChat,
  });
}

function handleGenerationEndedEvent(retry = 0): void {
  handleGenerationEndedModuleEvent(retry, {
    getSettingsEvent,
    getLiveContextEvent,
    findLatestAssistantEvent,
    getDiceMetaEvent,
    buildAssistantMessageIdEvent,
    getPreferredAssistantSourceTextEvent,
    getMessageTextEvent,
    parseEventEnvelopesEvent,
    filterEventsByApplyScopeEvent,
    removeRangesEvent,
    setMessageTextEvent,
    hideEventCodeBlocksInDomEvent,
    persistChatSafeEvent,
    mergeEventsIntoPendingRoundEvent,
    autoRollEventsByAiModeEvent,
    buildEventListCardEvent,
    pushToChat,
    sweepTimeoutFailuresEvent,
    refreshCountdownDomEvent,
    saveMetadataSafeEvent,
  });
}

function clearDiceMetaEventState(reason = "chat_reset"): void {
  clearDiceMetaEventStateModuleEvent(reason, {
    getDiceMetaEvent,
    saveMetadataSafeEvent,
  });
}

export function registerEventRollCommandEvent(): void {
  registerEventRollCommandModuleEvent({
    SlashCommandParser,
    SlashCommand,
    SlashCommandArgument,
    ARGUMENT_TYPE,
    pushToChat,
    sweepTimeoutFailuresEvent,
    getDiceMetaEvent,
    getSettingsEvent,
    ensureRoundEventTimersSyncedEvent,
    getEventRuntimeViewStateEvent,
    resolveSkillModifierBySkillNameEvent,
    performEventRollByIdEvent,
    escapeHtmlEvent,
  });
}

export function startCountdownTickerEvent(): void {
  startCountdownTickerModuleEvent({
    sweepTimeoutFailuresEvent,
    refreshCountdownDomEvent,
  });
}

export function registerEventHooksEvent(): void {
  registerEventHooksModuleEvent({
    getLiveContextEvent,
    eventSource,
    event_types,
    extractPromptChatFromPayloadEvent,
    handlePromptReadyEvent,
    handleGenerationEndedEvent,
    clearDiceMetaEventState,
    sanitizeCurrentChatEventBlocksEvent,
    sweepTimeoutFailuresEvent,
    refreshCountdownDomEvent,
  });
}

export function registerDebugCommandEvent(): void {
  registerDebugCommandModuleEvent({
    SlashCommandParser,
    SlashCommand,
    getDiceMeta,
    getDiceMetaEvent,
    escapeHtmlEvent,
    pushToChat,
  });
}
