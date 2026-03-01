import { buildEventRollHelpTemplateEvent, buildPreBlockTemplateEvent } from "../templates/helpTemplates";
import type { DiceEventSpecEvent, DicePluginSettingsEvent, DiceMetaEvent, PendingRoundEvent } from "../types/eventDomainEvent";

type RuntimeViewStateEvent = {
  text: string;
};

export interface EventRollCommandDepsEvent {
  SlashCommandParser: any;
  SlashCommand: any;
  SlashCommandArgument: any;
  ARGUMENT_TYPE: any;
  pushToChat: (message: string) => string | void;
  sweepTimeoutFailuresEvent: () => boolean;
  getDiceMetaEvent: () => DiceMetaEvent;
  getSettingsEvent: () => DicePluginSettingsEvent;
  ensureRoundEventTimersSyncedEvent: (round: PendingRoundEvent) => void;
  getEventRuntimeViewStateEvent: (
    round: PendingRoundEvent,
    event: DiceEventSpecEvent,
    now?: number
  ) => RuntimeViewStateEvent;
  resolveSkillModifierBySkillNameEvent: (
    skillName: string,
    settings?: DicePluginSettingsEvent
  ) => number;
  performEventRollByIdEvent: (
    eventIdRaw: string,
    overrideExpr?: string,
    expectedRoundId?: string
  ) => string;
  escapeHtmlEvent: (input: string) => string;
}

function buildEventRollHelpMessageEvent(): string {
  return buildEventRollHelpTemplateEvent();
}

function buildEventListTextEvent(
  round: PendingRoundEvent,
  deps: Pick<
    EventRollCommandDepsEvent,
    | "getSettingsEvent"
    | "ensureRoundEventTimersSyncedEvent"
    | "getEventRuntimeViewStateEvent"
    | "resolveSkillModifierBySkillNameEvent"
  >
): string {
  const settings = deps.getSettingsEvent();
  deps.ensureRoundEventTimersSyncedEvent(round);
  const lines: string[] = [];
  lines.push(`当前轮次: ${round.roundId}`);
  lines.push(`事件数量: ${round.events.length}`);
  for (const event of round.events) {
    const state = deps.getEventRuntimeViewStateEvent(round, event);
    const skillMod = deps.resolveSkillModifierBySkillNameEvent(event.skill, settings);
    lines.push(
      `- ${event.id}: ${event.title} | 目标 =${event.targetLabel} | ${event.checkDice} | ${event.compare ?? ">="} ${event.dc} | ${event.skill} | 技能 =${skillMod} | 骰子模式 =${event.rollMode ?? "manual"} | 时间限制 =${event.timeLimit ?? "none"} | 状态=${state.text}`
    );
  }
  return lines.join("\n");
}

export function registerEventRollCommandEvent(deps: EventRollCommandDepsEvent): void {
  const {
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
  } = deps;

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
            escapeHtmlEvent(
              buildEventListTextEvent(round, {
                getSettingsEvent,
                ensureRoundEventTimersSyncedEvent,
                getEventRuntimeViewStateEvent,
                resolveSkillModifierBySkillNameEvent,
              })
            )
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
