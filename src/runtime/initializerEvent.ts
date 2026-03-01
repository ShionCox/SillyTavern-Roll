import {
  bindEventButtonsEvent,
  mountSettingsCardEvent,
  refreshCountdownDomEvent,
  registerBaseMacrosAndCommandsEvent,
  registerDebugCommandEvent,
  registerEventHooksEvent,
  registerEventRollCommandEvent,
  sanitizeCurrentChatEventBlocksEvent,
  startCountdownTickerEvent,
  sweepTimeoutFailuresEvent,
} from "./eventRuntime";

const INITIALIZE_RETRY_MAX_Event = 80;
const INITIALIZE_RETRY_DELAY_MS_Event = 500;

export function initializeEventRuntimeEvent(attempt = 0): void {
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
    if (attempt < INITIALIZE_RETRY_MAX_Event) {
      setTimeout(() => initializeEventRuntimeEvent(attempt + 1), INITIALIZE_RETRY_DELAY_MS_Event);
    }
    return;
  }

  console.info("[骰子插件] Event 初始化完成");
}
