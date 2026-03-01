import { sendSystemMessage } from "./runtimeContextEvent";

export function pushToChat(message: string) {
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
  return message;
}

