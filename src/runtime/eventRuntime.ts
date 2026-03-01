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
  createSkillDraftAccessorEvent as createSkillDraftAccessorModuleEvent,
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
import type { DiceMeta, DiceResult } from "../types/diceEvent";
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

// ===== 存储结果到宏 =====

export function registerBaseMacrosAndCommandsEvent(): void {
  registerBaseMacrosAndCommandsModuleEvent({
    registerMacro,
    SlashCommandParser,
    SlashCommand,
    SlashCommandArgument,
    ARGUMENT_TYPE,
    getDiceMeta: getDiceMetaStoreEvent,
    rollExpression: rollExpressionCoreEvent,
    saveLastRoll: saveLastRollStoreEvent,
    buildResultMessage: buildResultMessageTemplateEvent,
    pushToChat: pushToChatCoreEvent,
  });
}

// ===== Event: 事件驱动骰子系统 =====


const skillEditorRuntimeEvent = createSkillEditorRuntimeEvent({
  SETTINGS_SKILL_DIRTY_HINT_ID_Event,
  SETTINGS_SKILL_ERRORS_ID_Event,
  SETTINGS_SKILL_ROWS_ID_Event,
  SETTINGS_SKILL_PRESET_LIST_ID_Event,
  SETTINGS_SKILL_PRESET_META_ID_Event,
  SETTINGS_SKILL_PRESET_NAME_ID_Event,
  SETTINGS_SKILL_PRESET_DELETE_ID_Event,
  getSettingsEvent: getSettingsStoreEvent,
  getSkillPresetStoreEvent: getSkillPresetStoreStoreEvent,
  getActiveSkillPresetEvent: getActiveSkillPresetStoreEvent,
  normalizeSkillTableTextForSettingsEvent: normalizeSkillTableTextForSettingsStoreEvent,
  deserializeSkillTableTextToRowsEvent: deserializeSkillTableTextToRowsStoreEvent,
  buildSkillDraftSnapshotEvent: buildSkillDraftSnapshotStoreEvent,
  countSkillEntriesFromSkillTableTextEvent: countSkillEntriesFromSkillTableTextStoreEvent,
  pushToChatEvent: pushToChatCoreEvent,
  escapeHtmlEvent: escapeHtmlCoreEvent,
  escapeAttrEvent: escapeAttrCoreEvent,
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

// 此访问器是技能草稿状态唯一入口。
const skillDraftAccessorEvent = createSkillDraftAccessorModuleEvent({
  getRowsEvent: skillEditorRuntimeEvent.getSkillRowsDraftEvent,
  setRowsEvent: skillEditorRuntimeEvent.setSkillRowsDraftEvent,
  getSnapshotEvent: skillEditorRuntimeEvent.getSkillEditorLastSavedSnapshotEvent,
  setSnapshotEvent: skillEditorRuntimeEvent.setSkillEditorLastSavedSnapshotEvent,
});

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
      isElementVisibleEvent: isElementVisibleModuleEvent,
      isSkillDraftDirtyEvent,
    },
    basicSettingsInputsDepsEvent: {
      ...SETTINGS_BASIC_INPUT_IDS_Event,
      SUMMARY_HISTORY_ROUNDS_MAX_Event,
      SUMMARY_HISTORY_ROUNDS_MIN_Event,
      DEFAULT_SUMMARY_HISTORY_ROUNDS_Event: DEFAULT_SETTINGS_Event.summaryHistoryRounds,
      updateSettingsEvent: updateSettingsStoreEvent,
    },
    skillPresetActionsDepsEvent: {
      ...SETTINGS_SKILL_PRESET_ACTION_IDS_Event,
      SKILL_PRESET_NEW_NAME_BASE_Event,
      SKILL_PRESET_DEFAULT_ID_Event,
      getSkillEditorActivePresetIdEvent: skillEditorRuntimeEvent.getSkillEditorActivePresetIdEvent,
      confirmDiscardSkillDraftEvent,
      getSettingsEvent: getSettingsStoreEvent,
      getSkillPresetStoreEvent: getSkillPresetStoreStoreEvent,
      getSkillPresetByIdEvent: getSkillPresetByIdStoreEvent,
      saveSkillPresetStoreEvent: saveSkillPresetStoreStoreEvent,
      getActiveSkillPresetEvent: getActiveSkillPresetStoreEvent,
      getUniqueSkillPresetNameEvent: getUniqueSkillPresetNameStoreEvent,
      createIdEvent: createIdCoreEvent,
      buildDefaultSkillPresetStoreEvent: () => buildDefaultSkillPresetStoreTemplateStoreEvent(),
      normalizeSkillPresetNameKeyEvent: normalizeSkillPresetNameKeyStoreEvent,
      renderSkillValidationErrorsEvent,
      pushToChat: pushToChatCoreEvent,
    },
    skillRowsEditingActionsDepsEvent: {
      ...SETTINGS_SKILL_ROWS_EDIT_IDS_Event,
      // 此访问器是技能草稿状态唯一入口。
      skillDraftAccessorEvent,
      createSkillEditorRowDraftEvent: createSkillEditorRowDraftStoreEvent,
      renderSkillRowsEvent,
      refreshSkillDraftDirtyStateEvent,
      renderSkillValidationErrorsEvent,
    },
    skillImportExportActionsDepsEvent: {
      ...SETTINGS_SKILL_IMPORT_EXPORT_IDS_Event,
      // 此访问器是技能草稿状态唯一入口。
      skillDraftAccessorEvent,
      serializeSkillRowsToSkillTableTextEvent: serializeSkillRowsToSkillTableTextStoreEvent,
      getSettingsEvent: getSettingsStoreEvent,
      getSkillPresetStoreEvent: getSkillPresetStoreStoreEvent,
      getActiveSkillPresetEvent: getActiveSkillPresetStoreEvent,
      normalizeSkillTableTextForSettingsEvent: normalizeSkillTableTextForSettingsStoreEvent,
      deserializeSkillTableTextToRowsEvent: deserializeSkillTableTextToRowsStoreEvent,
      validateSkillRowsEvent: validateSkillRowsStoreEvent,
      renderSkillRowsEvent,
      refreshSkillDraftDirtyStateEvent,
      renderSkillValidationErrorsEvent,
      copyTextToClipboardEvent: copyTextToClipboardModuleEvent,
      pushToChat: pushToChatCoreEvent,
      buildSkillDraftSnapshotEvent: buildSkillDraftSnapshotStoreEvent,
      setSkillDraftDirtyEvent: skillEditorRuntimeEvent.setSkillDraftDirtyEvent,
      saveSkillPresetStoreEvent: saveSkillPresetStoreStoreEvent,
    },
    ruleTextActionsDepsEvent: {
      ...SETTINGS_RULE_TEXT_ACTION_IDS_Event,
      DEFAULT_RULE_TEXT_Event,
      updateSettingsEvent: updateSettingsStoreEvent,
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
    getSettingsEvent: getSettingsStoreEvent,
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

function createRoundSummarySnapshotEvent(
  round: PendingRoundEvent,
  now = Date.now()
): RoundSummarySnapshotEvent {
  return createRoundSummarySnapshotModuleEvent(
    round,
    {
      ensureRoundEventTimersSyncedEvent,
      getSettingsEvent: getSettingsStoreEvent,
      getLatestRollRecordForEvent: getLatestRollRecordForModuleEvent,
      resolveTriggeredOutcomeEvent: resolveTriggeredOutcomeModuleEvent,
      normalizeCompareOperatorEvent: normalizeCompareOperatorModuleEvent,
    },
    now
  );
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

function trimSummaryHistoryEvent(history: RoundSummarySnapshotEvent[]): void {
  trimSummaryHistoryModuleEvent(history, SUMMARY_HISTORY_MAX_STORED_Event);
}

function parseIsoDurationToMsEvent(raw: string): number | null {
  return parseIsoDurationToMsModuleEvent(raw, ISO_8601_DURATION_REGEX_Event);
}

function handlePromptReadyEvent(payload: any, sourceEvent = "unknown"): void {
  handlePromptReadyModuleEvent(
    payload,
    {
      getSettingsEvent: getSettingsStoreEvent,
      getSkillModifierTableMapEvent: getSkillModifierTableMapStoreEvent,
      getSkillPresetStoreEvent: getSkillPresetStoreStoreEvent,
      getActiveSkillPresetEvent: getActiveSkillPresetStoreEvent,
      DEFAULT_RULE_TEXT_Event,
      DICE_RULE_BLOCK_START_Event,
      DICE_RULE_BLOCK_END_Event,
      sweepTimeoutFailuresEvent,
      getDiceMetaEvent: getDiceMetaStoreMetaEvent,
      ensureSummaryHistoryEvent: ensureSummaryHistoryModuleEvent,
      createRoundSummarySnapshotEvent,
      trimSummaryHistoryEvent,
      buildSummaryBlockFromHistoryEvent,
      saveMetadataSafeEvent: saveMetadataSafeStoreEvent,
    },
    sourceEvent
  );
}

function findLatestAssistantEvent(
  chat: TavernMessageEvent[]
): { msg: TavernMessageEvent; index: number } | null {
  return findLatestAssistantModuleEvent(chat, {
    isAssistantMessageEvent: isAssistantMessageModuleEvent,
  });
}

function buildAssistantMessageIdEvent(message: TavernMessageEvent, index: number): string {
  return buildAssistantMessageIdModuleEvent(message, index, {
    simpleHashEvent: simpleHashCoreEvent,
    getMessageTextEvent: getMessageTextModuleEvent,
  });
}

type ResolvedOutcomeEvent = {
  kind: EventOutcomeKindEvent;
  text: string;
  explosionTriggered: boolean;
};


function createSyntheticTimeoutDiceResultEvent(event: DiceEventSpecEvent): DiceResult {
  return createSyntheticTimeoutDiceResultModuleEvent(event, {
    parseDiceExpression: parseDiceExpressionCoreEvent,
  });
}

function ensureRoundEventTimersSyncedEvent(round: PendingRoundEvent): void {
  ensureRoundEventTimersSyncedModuleEvent(round, {
    getSettingsEvent: getSettingsStoreEvent,
    resolveEventTargetEvent: resolveEventTargetModuleEvent,
    parseIsoDurationToMsEvent,
    applyTimeLimitPolicyMsEvent: applyTimeLimitPolicyMsModuleEvent,
  });
}

type RemovalRangeEvent = { start: number; end: number };

function parseEventEnvelopesEvent(text: string): {
  events: DiceEventSpecEvent[];
  ranges: RemovalRangeEvent[];
} {
  return parseEventEnvelopesModuleEvent(text, {
    getSettingsEvent: getSettingsStoreEvent,
    OUTCOME_TEXT_MAX_LEN_Event,
    ISO_8601_DURATION_REGEX_Event,
  });
}

function removeRangesEvent(text: string, ranges: RemovalRangeEvent[]): string {
  return removeRangesModuleEvent(text, ranges, normalizeBlankLinesCoreEvent);
}

function createTimeoutFailureRecordEvent(
  round: PendingRoundEvent,
  event: DiceEventSpecEvent,
  now: number
): EventRollRecordEvent {
  return createTimeoutFailureRecordModuleEvent(round, event, now, {
    getSettingsEvent: getSettingsStoreEvent,
    normalizeCompareOperatorEvent: normalizeCompareOperatorModuleEvent,
    createSyntheticTimeoutDiceResultEvent,
    resolveSkillModifierBySkillNameEvent: resolveSkillModifierBySkillNameStoreEvent,
    createIdEvent: createIdCoreEvent,
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
      getSettingsEvent: getSettingsStoreEvent,
      getLatestRollRecordForEvent: getLatestRollRecordForModuleEvent,
      ensureRoundEventTimersSyncedEvent,
      createTimeoutFailureRecordEvent,
    },
    now
  );
}

export function sweepTimeoutFailuresEvent(): boolean {
  return sweepTimeoutFailuresModuleEvent({
    getSettingsEvent: getSettingsStoreEvent,
    getDiceMetaEvent: getDiceMetaStoreMetaEvent,
    ensureRoundEventTimersSyncedEvent,
    recordTimeoutFailureIfNeededEvent,
    saveMetadataSafeEvent: saveMetadataSafeStoreEvent,
  });
}

function mergeEventsIntoPendingRoundEvent(
  events: DiceEventSpecEvent[],
  assistantMsgId: string
): PendingRoundEvent {
  return mergeEventsIntoPendingRoundModuleEvent(events, assistantMsgId, {
    getSettingsEvent: getSettingsStoreEvent,
    getDiceMetaEvent: getDiceMetaStoreMetaEvent,
    createIdEvent: createIdCoreEvent,
    parseIsoDurationToMsEvent,
    applyTimeLimitPolicyMsEvent: applyTimeLimitPolicyMsModuleEvent,
    resolveEventTargetEvent: resolveEventTargetModuleEvent,
    saveMetadataSafeEvent: saveMetadataSafeStoreEvent,
  });
}

function formatRollRecordSummaryEvent(
  record: EventRollRecordEvent,
  event?: DiceEventSpecEvent
): string {
  return formatRollRecordSummaryModuleEvent(record, event, {
    getSettingsEvent: getSettingsStoreEvent,
    resolveTriggeredOutcomeEvent: resolveTriggeredOutcomeModuleEvent,
    formatEventModifierBreakdownEvent: formatEventModifierBreakdownCoreEvent,
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
      getSettingsEvent: getSettingsStoreEvent,
      getLatestRollRecordForEvent: getLatestRollRecordForModuleEvent,
      ensureRoundEventTimersSyncedEvent,
    },
    now
  );
}

export function refreshCountdownDomEvent(): void {
  refreshCountdownDomModuleEvent({
    getDiceMetaEvent: getDiceMetaStoreMetaEvent,
    ensureRoundEventTimersSyncedEvent,
    getEventRuntimeViewStateEvent,
    getRuntimeToneStyleEvent: getRuntimeToneStyleModuleEvent,
  });
}

function sanitizeAssistantMessageEventBlocksEvent(message: TavernMessageEvent): boolean {
  return sanitizeAssistantMessageEventBlocksModuleEvent(message, {
    getPreferredAssistantSourceTextEvent: getPreferredAssistantSourceTextModuleEvent,
    getMessageTextEvent: getMessageTextModuleEvent,
    parseEventEnvelopesEvent,
    removeRangesEvent,
    setMessageTextEvent: setMessageTextModuleEvent,
  });
}

export function sanitizeCurrentChatEventBlocksEvent(): void {
  sanitizeCurrentChatEventBlocksModuleEvent({
    getLiveContextEvent: getLiveContextCoreEvent,
    isAssistantMessageEvent: isAssistantMessageModuleEvent,
    sanitizeAssistantMessageEventBlocksEvent,
    persistChatSafeEvent: persistChatSafeStoreEvent,
    hideEventCodeBlocksInDomEvent: hideEventCodeBlocksInDomModuleEvent,
  });
}

function buildEventListCardEvent(round: PendingRoundEvent): string {
  return buildEventListCardModuleEvent(round, {
    getSettingsEvent: getSettingsStoreEvent,
    ensureRoundEventTimersSyncedEvent,
    getLatestRollRecordForEvent: getLatestRollRecordForModuleEvent,
    getEventRuntimeViewStateEvent,
    getRuntimeToneStyleEvent: getRuntimeToneStyleModuleEvent,
    buildEventRolledPrefixTemplateEvent,
    buildEventRolledBlockTemplateEvent,
    formatRollRecordSummaryEvent,
    parseDiceExpression: parseDiceExpressionCoreEvent,
    resolveSkillModifierBySkillNameEvent: resolveSkillModifierBySkillNameStoreEvent,
    formatEventModifierBreakdownEvent: formatEventModifierBreakdownCoreEvent,
    buildEventRollButtonTemplateEvent,
    buildEventListItemTemplateEvent,
    buildEventListCardTemplateEvent,
    escapeHtmlEvent: escapeHtmlCoreEvent,
    escapeAttrEvent: escapeAttrCoreEvent,
  });
}

function buildEventRollResultCardEvent(
  event: DiceEventSpecEvent,
  record: EventRollRecordEvent
): string {
  return buildEventRollResultCardModuleEvent(event, record, {
    getSettingsEvent: getSettingsStoreEvent,
    resolveTriggeredOutcomeEvent: resolveTriggeredOutcomeModuleEvent,
    formatEventModifierBreakdownEvent: formatEventModifierBreakdownCoreEvent,
    buildRollsSummaryTemplateEvent,
    formatModifier: formatModifierCoreEvent,
    buildEventRollResultCardTemplateEvent,
    escapeHtmlEvent: escapeHtmlCoreEvent,
    getDiceSvg: buildDiceSvgTemplateEvent,
    getRollingSvg: buildRollingSvgTemplateEvent,
    buildAlreadyRolledDiceVisualTemplateEvent,
  });
}

function buildEventAlreadyRolledCardEvent(
  event: DiceEventSpecEvent,
  record: EventRollRecordEvent
): string {
  return buildEventAlreadyRolledCardModuleEvent(event, record, {
    getSettingsEvent: getSettingsStoreEvent,
    resolveTriggeredOutcomeEvent: resolveTriggeredOutcomeModuleEvent,
    formatEventModifierBreakdownEvent: formatEventModifierBreakdownCoreEvent,
    buildEventDistributionBlockTemplateEvent,
    buildEventTimeoutAtBlockTemplateEvent,
    buildEventAlreadyRolledCardTemplateEvent,
    escapeHtmlEvent: escapeHtmlCoreEvent,
    formatModifier: formatModifierCoreEvent,
    getDiceSvg: buildDiceSvgTemplateEvent,
    getRollingSvg: buildRollingSvgTemplateEvent,
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
    getDiceMetaEvent: getDiceMetaStoreMetaEvent,
    ensureRoundEventTimersSyncedEvent,
    recordTimeoutFailureIfNeededEvent,
    saveMetadataSafeEvent: saveMetadataSafeStoreEvent,
    getLatestRollRecordForEvent: getLatestRollRecordForModuleEvent,
    buildEventAlreadyRolledCardEvent,
    pushToChat: pushToChatCoreEvent,
    refreshCountdownDomEvent,
    rollExpression: rollExpressionCoreEvent,
    getSettingsEvent: getSettingsStoreEvent,
    resolveSkillModifierBySkillNameEvent: resolveSkillModifierBySkillNameStoreEvent,
    applySkillModifierToDiceResultEvent: applySkillModifierToDiceResultModuleEvent,
    saveLastRoll: saveLastRollStoreEvent,
    normalizeCompareOperatorEvent: normalizeCompareOperatorModuleEvent,
    evaluateSuccessEvent: evaluateSuccessCoreEvent,
    createIdEvent: createIdCoreEvent,
    buildEventRollResultCardEvent,
  });
}

function autoRollEventsByAiModeEvent(round: PendingRoundEvent): string[] {
  return autoRollEventsByAiModeModuleEvent(round, {
    getSettingsEvent: getSettingsStoreEvent,
    ensureRoundEventTimersSyncedEvent,
    getLatestRollRecordForEvent: getLatestRollRecordForModuleEvent,
    rollExpression: rollExpressionCoreEvent,
    resolveSkillModifierBySkillNameEvent: resolveSkillModifierBySkillNameStoreEvent,
    applySkillModifierToDiceResultEvent: applySkillModifierToDiceResultModuleEvent,
    normalizeCompareOperatorEvent: normalizeCompareOperatorModuleEvent,
    evaluateSuccessEvent: evaluateSuccessCoreEvent,
    createIdEvent: createIdCoreEvent,
    buildEventRollResultCardEvent,
    saveLastRoll: saveLastRollStoreEvent,
    saveMetadataSafeEvent: saveMetadataSafeStoreEvent,
  });
}

export function bindEventButtonsEvent(): void {
  bindEventButtonsModuleEvent({
    performEventRollByIdEvent,
    pushToChat: pushToChatCoreEvent,
  });
}

function handleGenerationEndedEvent(retry = 0): void {
  handleGenerationEndedModuleEvent(retry, {
    getSettingsEvent: getSettingsStoreEvent,
    getLiveContextEvent: getLiveContextCoreEvent,
    findLatestAssistantEvent,
    getDiceMetaEvent: getDiceMetaStoreMetaEvent,
    buildAssistantMessageIdEvent,
    getPreferredAssistantSourceTextEvent: getPreferredAssistantSourceTextModuleEvent,
    getMessageTextEvent: getMessageTextModuleEvent,
    parseEventEnvelopesEvent,
    filterEventsByApplyScopeEvent: filterEventsByApplyScopeModuleEvent,
    removeRangesEvent,
    setMessageTextEvent: setMessageTextModuleEvent,
    hideEventCodeBlocksInDomEvent: hideEventCodeBlocksInDomModuleEvent,
    persistChatSafeEvent: persistChatSafeStoreEvent,
    mergeEventsIntoPendingRoundEvent,
    autoRollEventsByAiModeEvent,
    buildEventListCardEvent,
    pushToChat: pushToChatCoreEvent,
    sweepTimeoutFailuresEvent,
    refreshCountdownDomEvent,
    saveMetadataSafeEvent: saveMetadataSafeStoreEvent,
  });
}

function clearDiceMetaEventState(reason = "chat_reset"): void {
  clearDiceMetaEventStateModuleEvent(reason, {
    getDiceMetaEvent: getDiceMetaStoreMetaEvent,
    saveMetadataSafeEvent: saveMetadataSafeStoreEvent,
  });
}

export function registerEventRollCommandEvent(): void {
  registerEventRollCommandModuleEvent({
    SlashCommandParser,
    SlashCommand,
    SlashCommandArgument,
    ARGUMENT_TYPE,
    pushToChat: pushToChatCoreEvent,
    sweepTimeoutFailuresEvent,
    getDiceMetaEvent: getDiceMetaStoreMetaEvent,
    getSettingsEvent: getSettingsStoreEvent,
    ensureRoundEventTimersSyncedEvent,
    getEventRuntimeViewStateEvent,
    resolveSkillModifierBySkillNameEvent: resolveSkillModifierBySkillNameStoreEvent,
    performEventRollByIdEvent,
    escapeHtmlEvent: escapeHtmlCoreEvent,
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
    getLiveContextEvent: getLiveContextCoreEvent,
    eventSource,
    event_types,
    extractPromptChatFromPayloadEvent: extractPromptChatFromPayloadModuleEvent,
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
    getDiceMeta: getDiceMetaStoreEvent,
    getDiceMetaEvent: getDiceMetaStoreMetaEvent,
    escapeHtmlEvent: escapeHtmlCoreEvent,
    pushToChat: pushToChatCoreEvent,
  });
}
