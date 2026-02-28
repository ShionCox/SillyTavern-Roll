/// <reference path="./global.d.ts" />
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

function getDiceSvg(value: number, sides: number, color: string): string {
  const size = 48;
  const stroke = 3;
  const dotR = 4;

  if (sides === 6) {
    // D6: 画点
    const dotsMap: Record<number, number[][]> = {
      1: [[24, 24]],
      2: [[14, 14], [34, 34]],
      3: [[14, 14], [24, 24], [34, 34]],
      4: [[14, 14], [14, 34], [34, 14], [34, 34]],
      5: [[14, 14], [14, 34], [24, 24], [34, 14], [34, 34]],
      6: [[14, 14], [14, 24], [14, 34], [34, 14], [34, 24], [34, 34]]
    };
    const dots = dotsMap[value] || [];
    const circles = dots.map(([cx, cy]) =>
      `<circle cx="${cx}" cy="${cy}" r="${dotR}" fill="${color}" />`
    ).join('');

    return `
      <svg width="${size}" height="${size}" viewBox="0 0 48 48" style="display:inline-block; vertical-align: middle;">
          <rect x="4" y="4" width="40" height="40" rx="8" ry="8" fill="none" stroke="${color}" stroke-width="${stroke}" />
          ${circles}
      </svg>`;
  } else {
    // D20/其他: 画一个多边形（六边形模拟）并显示数值
    return `
      <svg width="${size}" height="${size}" viewBox="0 0 48 48" style="display:inline-block; vertical-align: middle;">
          <path d="M24 4 L43 14 L43 34 L24 44 L5 34 L5 14 Z" fill="none" stroke="${color}" stroke-width="${stroke}" />
          <path d="M24 4 L24 24 M24 24 L43 34 M24 24 L5 34" stroke="${color}" stroke-width="1.5" opacity="0.6"/>
          <text x="24" y="33" font-size="18" text-anchor="middle" fill="${color}" font-weight="bold" style="font-family: sans-serif;">${value}</text>
      </svg>`;
  }
}

function getRollingSvg(color: string): string {
  // 3D 立方体 CSS 结构，不使用 SVG
  return `
    <div class="cube-scene" style="perspective: 600px; width: 40px; height: 40px;">
      <div class="cube" style="
        width: 100%; height: 100%; position: relative; transform-style: preserve-3d;
        /* 动画在 CSS 中定义 */
      ">
        <div class="cube-face front"  style="position: absolute; width: 40px; height: 40px; border: 2px solid ${color}; background: rgba(43, 29, 29, 0.8); color: ${color}; line-height: 40px; text-align: center; font-weight: bold; font-size: 20px; transform: rotateY(  0deg) translateZ(20px);">?</div>
        <div class="cube-face back"   style="position: absolute; width: 40px; height: 40px; border: 2px solid ${color}; background: rgba(43, 29, 29, 0.8); color: ${color}; line-height: 40px; text-align: center; font-weight: bold; font-size: 20px; transform: rotateY(180deg) translateZ(20px);">?</div>
        <div class="cube-face right"  style="position: absolute; width: 40px; height: 40px; border: 2px solid ${color}; background: rgba(43, 29, 29, 0.8); color: ${color}; line-height: 40px; text-align: center; font-weight: bold; font-size: 20px; transform: rotateY( 90deg) translateZ(20px);">?</div>
        <div class="cube-face left"   style="position: absolute; width: 40px; height: 40px; border: 2px solid ${color}; background: rgba(43, 29, 29, 0.8); color: ${color}; line-height: 40px; text-align: center; font-weight: bold; font-size: 20px; transform: rotateY(-90deg) translateZ(20px);">?</div>
        <div class="cube-face top"    style="position: absolute; width: 40px; height: 40px; border: 2px solid ${color}; background: rgba(43, 29, 29, 0.8); color: ${color}; line-height: 40px; text-align: center; font-weight: bold; font-size: 20px; transform: rotateX( 90deg) translateZ(20px);">?</div>
        <div class="cube-face bottom" style="position: absolute; width: 40px; height: 40px; border: 2px solid ${color}; background: rgba(43, 29, 29, 0.8); color: ${color}; line-height: 40px; text-align: center; font-weight: bold; font-size: 20px; transform: rotateX(-90deg) translateZ(20px);">?</div>
      </div>
    </div>
  `;
}

function buildResultMessage(result: DiceResult): string {
  const modStr = formatModifier(result.modifier);
  const rollsStr = result.rolls.join(", ");
  const hasModifier = result.modifier !== 0;
  const uniqueId = "d" + Math.random().toString(36).substr(2, 9);

  // RPG 风格配色
  const rpgColors = {
    border: '#c5a059', // 古铜金
    bg: 'linear-gradient(135deg, #2b1d1d 0%, #1a1010 100%)', // 深红褐色背景
    headerBg: 'rgba(0, 0, 0, 0.4)',
    textMain: '#e8dcb5', // 羊皮纸白
    textHighlight: '#ffdb78', // 亮金色
    critSuccess: '#4caf50', // 大成功绿
    critFail: '#f44336', // 大失败红
  };

  // 判断大成功/大失败 (通用逻辑：单骰子时，1为大失败，最大值为大成功)
  let critType = 'normal';
  let critText = '';
  let resultColor = rpgColors.textHighlight;
  let resultGlow = '0 2px 4px rgba(0,0,0,0.5)';
  let cardBg = rpgColors.bg;
  let cardBorder = rpgColors.border;

  // 仅当只有一个骰子时判断大成功/大失败
  if (result.count === 1) {
    const val = result.rolls[0];
    const maxVal = result.sides;

    if (val === maxVal) {
      critType = 'success';
      critText = '大成功!';
      resultColor = rpgColors.critSuccess;
      resultGlow = '0 0 15px rgba(76, 175, 80, 0.8)';
      cardBg = 'linear-gradient(135deg, #1b3320 0%, #0d1a10 100%)';
      cardBorder = rpgColors.critSuccess;
    } else if (val === 1) {
      critType = 'fail';
      critText = '大失败!';
      resultColor = rpgColors.critFail;
      resultGlow = '0 0 15px rgba(244, 67, 54, 0.8)';
      cardBg = 'linear-gradient(135deg, #331b1b 0%, #1a0d0d 100%)';
      cardBorder = rpgColors.critFail;
    }
  }

  const showDiceSvgs = result.rolls.length <= 5;
  let diceVisuals = "";
  
  if (showDiceSvgs) {
    diceVisuals = result.rolls.map(r => getDiceSvg(r, result.sides, resultColor)).join(" ");
  } else {
    diceVisuals = getDiceSvg(0, result.sides, resultColor);
  }

  const rollingVisual = getRollingSvg(rpgColors.textHighlight);
  const detailParts: string[] = [];
  if (result.rolls.length) {
    detailParts.push(`骰子: [${rollsStr}]`);
  }
  if (hasModifier) {
    detailParts.push(`修正值: ${modStr}`);
  }
  if (result.exploding) {
    detailParts.push(
      result.explosionTriggered ? '🔥 爆骰触发' : '🔥 爆骰待触发'
    );
  }
  const detailText = detailParts.join(' | ');

  return `
  <style>
    @keyframes spin-3d-${uniqueId} {
      0% { transform: rotateX(0deg) rotateY(0deg); }
      100% { transform: rotateX(360deg) rotateY(360deg); }
    }
    @keyframes fade-out-${uniqueId} {
      0% { opacity: 1; }
      90% { opacity: 0; }
      100% { opacity: 0; display: none; }
    }
    @keyframes fade-in-${uniqueId} {
      0% { opacity: 0; transform: scale(0.8); }
      100% { opacity: 1; transform: scale(1); }
    }
    @keyframes pulse-crit-${uniqueId} {
      0% { transform: scale(1); }
      50% { transform: scale(1.1); }
      100% { transform: scale(1); }
    }
    @keyframes shake-crit-${uniqueId} {
      0% { transform: translate(1px, 1px) rotate(0deg); }
      10% { transform: translate(-1px, -2px) rotate(-1deg); }
      20% { transform: translate(-3px, 0px) rotate(1deg); }
      30% { transform: translate(3px, 2px) rotate(0deg); }
      40% { transform: translate(1px, -1px) rotate(1deg); }
      50% { transform: translate(-1px, 2px) rotate(-1deg); }
      60% { transform: translate(-3px, 1px) rotate(0deg); }
      70% { transform: translate(3px, 1px) rotate(-1deg); }
      80% { transform: translate(-1px, -1px) rotate(1deg); }
      90% { transform: translate(1px, 2px) rotate(0deg); }
      100% { transform: translate(1px, -2px) rotate(-1deg); }
    }
    
    .dice-wrapper-${uniqueId} {
      position: relative;
      min-height: 100px;
      padding: 16px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    
    .dice-rolling-${uniqueId} {
      position: absolute;
      top: 50%; left: 50%;
      transform: translate(-50%, -50%);
      animation: fade-out-${uniqueId} 0.2s forwards 1.2s;
      z-index: 10;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    
    .dice-rolling-${uniqueId} .cube {
      animation: spin-3d-${uniqueId} 1.5s linear infinite;
    }

    .dice-result-${uniqueId} {
      opacity: 0;
      animation: fade-in-${uniqueId} 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards 1.3s;
      text-align: center;
      width: 100%;
    }

    .crit-success-${uniqueId} {
      animation: pulse-crit-${uniqueId} 1s infinite;
      color: ${rpgColors.critSuccess};
      font-weight: bold;
      margin-bottom: 8px;
      text-shadow: 0 0 10px rgba(76, 175, 80, 0.5);
    }

    .crit-fail-${uniqueId} {
      animation: shake-crit-${uniqueId} 0.5s;
      color: ${rpgColors.critFail};
      font-weight: bold;
      margin-bottom: 8px;
      text-shadow: 0 0 10px rgba(244, 67, 54, 0.5);
    }

    .explosion-note-${uniqueId} {
      color: #ffae42;
      font-weight: bold;
      margin-bottom: 8px;
      letter-spacing: 1px;
      text-shadow: 0 0 12px rgba(255, 174, 66, 0.6);
    }
  </style>
  
  <div style="
    border: 2px solid ${cardBorder};
    border-radius: 4px;
    background: ${cardBg};
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5), inset 0 0 30px rgba(0,0,0,0.6);
    font-family: 'Georgia', 'Times New Roman', serif;
    overflow: hidden;
    margin: 8px 0;
    width: 100%;
    box-sizing: border-box;
    color: ${rpgColors.textMain};
    position: relative;
  ">
    <!-- 装饰角标 -->
    <div style="position: absolute; top: 0; left: 0; width: 6px; height: 6px; border-top: 2px solid ${rpgColors.border}; border-left: 2px solid ${rpgColors.border};"></div>
    <div style="position: absolute; top: 0; right: 0; width: 6px; height: 6px; border-top: 2px solid ${rpgColors.border}; border-right: 2px solid ${rpgColors.border};"></div>
    <div style="position: absolute; bottom: 0; left: 0; width: 6px; height: 6px; border-bottom: 2px solid ${rpgColors.border}; border-left: 2px solid ${rpgColors.border};"></div>
    <div style="position: absolute; bottom: 0; right: 0; width: 6px; height: 6px; border-bottom: 2px solid ${rpgColors.border}; border-right: 2px solid ${rpgColors.border};"></div>

    <!-- Header -->
    <div style="
        background-color: ${rpgColors.headerBg};
        padding: 8px 12px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid rgba(197, 160, 89, 0.3);
        font-size: 0.9em;
        letter-spacing: 1px;
        text-transform: uppercase;
    ">
        <span style="display: flex; align-items: center; gap: 8px; color: ${rpgColors.textHighlight};">
            <span style="font-size: 1.2em;">🎲</span> <span style="font-weight: bold;">骰子系统</span>
        </span>
        <span style="
            font-family: monospace;
            color: ${rpgColors.textMain};
            background: rgba(0,0,0,0.3);
            padding: 2px 8px;
            border: 1px solid rgba(197, 160, 89, 0.2);
            border-radius: 2px;
            font-size: 0.9em;
        ">${result.expr}</span>
    </div>

    <!-- Body -->
    <div class="dice-wrapper-${uniqueId}">
        
        <!-- 动画层：Rolling (3D Cube) -->
        <div class="dice-rolling-${uniqueId}">
            ${rollingVisual}
        </div>

        <!-- 结果层：Result -->
        <div class="dice-result-${uniqueId}">
            ${critText ? `<div class="${critType === 'success' ? `crit-success-${uniqueId}` : `crit-fail-${uniqueId}`}">${critText}</div>` : ''}
          ${result.exploding ? `<div class="explosion-note-${uniqueId}">${result.explosionTriggered ? '🔥 连锁爆骰！' : '🔥 爆骰已开启'}</div>` : ''}
            
            <!-- 骰子 SVG 展示 -->
            <div style="margin-bottom: 12px; display: flex; justify-content: center; gap: 8px; flex-wrap: wrap;">
                ${diceVisuals}
            </div>

            <!-- 数值展示 -->
            <div style="
                font-size: 2.5em;
                font-weight: bold;
                color: ${resultColor};
                text-shadow: ${resultGlow};
                line-height: 1;
            ">
                ${result.total}
            </div>
            
            <div style="
                font-size: 0.9em;
                color: ${rpgColors.textMain};
                margin-top: 8px;
                opacity: 0.8;
            ">
              ${detailText}
            </div>
        </div>

    </div>
  </div>
  `;
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
  const rolls: number[] = [];

  for (let i = 0; i < count; i++) {
    pushRollWithExplosion(sides, explode, rolls);
  }

  const rawTotal = rolls.reduce((a, b) => a + b, 0);
  const total = rawTotal + modifier;
  const explosionTriggered = explode && rolls.length > count;

  return {
    expr: exprRaw,
    count,
    sides,
    modifier,
    rolls,
    rawTotal,
    total,
    exploding: explode,
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

    helpString: `
      <div>
        通用骰子指令，支持 <code>NdM+X</code> 形式，例如：
      </div>
      <ul>
        <li><code>/roll</code> （等同于 <code>/roll 1d20</code>）</li>
        <li><code>/roll 1d20</code></li>
        <li><code>/roll 3d6+2</code></li>
        <li><code>/roll 2d10-1</code></li>
        <li><code>/roll 1d6!+2</code> （<code>!</code> 代表爆骰，掷出最大值会继续追加）</li>
      </ul>
      <div>
        结果会记录到 <code>chatMetadata.lastRoll</code>，并可通过
        <code>{{lastRoll}}</code>、<code>{{lastRollTotal}}</code> 宏访问。
      </div>
    `,

    callback: (namedArgs: Record<string, any>, unnamedArgs: any) => {
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

// ===== Event: 事件驱动骰子系统 =====
type CompareOperatorEvent = ">=" | ">" | "<=" | "<";
type EventApplyScopeSettingEvent = "protagonist_only" | "all";
type EventScopeTagEvent = "protagonist" | "all" | "character";
type EventRollSourceEvent = "manual_roll" | "timeout_auto_fail";

interface EventTimerStateEvent {
  offeredAt: number;
  deadlineAt: number | null;
  expiredAt?: number;
}

interface DicePluginSettingsEvent {
  enabled: boolean;
  autoSendRuleToAI: boolean;
  eventApplyScope: EventApplyScopeSettingEvent;
  enableTimeLimit: boolean;
  minTimeLimitSeconds: number;
  ruleText: string;
}

interface DiceEventSpecEvent {
  id: string;
  title: string;
  checkDice: string;
  dc: number;
  compare?: CompareOperatorEvent;
  scope?: EventScopeTagEvent;
  skill: string;
  timeLimit?: string;
  offeredAt?: number;
  deadlineAt?: number | null;
  timeLimitMs?: number | null;
  desc: string;
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
  rolledAt: number;
  source: EventRollSourceEvent;
  timeoutAt?: number | null;
}

interface PendingRoundEvent {
  roundId: string;
  status: "open" | "sealed";
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

interface DiceMetaEvent {
  pendingRound?: PendingRoundEvent;
  outboundSummary?: OutboundSummaryCacheEvent;
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
const SETTINGS_ENABLED_ID_Event = "st-roll-settings-Event-enabled";
const SETTINGS_RULE_ID_Event = "st-roll-settings-Event-auto-rule";
const SETTINGS_SCOPE_ID_Event = "st-roll-settings-Event-apply-scope";
const SETTINGS_TIME_LIMIT_ENABLED_ID_Event = "st-roll-settings-Event-time-limit-enabled";
const SETTINGS_TIME_LIMIT_MIN_ID_Event = "st-roll-settings-Event-time-limit-min-seconds";
const SETTINGS_RULE_TEXT_ID_Event = "st-roll-settings-Event-rule-text";
const SETTINGS_RULE_SAVE_ID_Event = "st-roll-settings-Event-rule-save";
const SETTINGS_RULE_RESET_ID_Event = "st-roll-settings-Event-rule-reset";
const DICE_RULE_BLOCK_START_Event = "[[DICE_EVENT_RULES_V1]]";
const DICE_RULE_BLOCK_END_Event = "[[/DICE_EVENT_RULES_V1]]";
const DICE_SUMMARY_BLOCK_START_Event = "[[DICE_ROUND_SUMMARY_V1]]";
const DICE_SUMMARY_BLOCK_END_Event = "[[/DICE_ROUND_SUMMARY_V1]]";
const ISO_8601_DURATION_REGEX_Event =
  /^P(?=\d|T\d)(\d+Y)?(\d+M)?(\d+W)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+S)?)?$/i;
const DEFAULT_RULE_TEXT_Event = `你必须遵循以下骰子事件协议：
1. 当需要触发掷骰事件时，在回复末尾输出一个 \`\`\`rolljson 代码块。
2. 严禁使用 \`\`\`json 或其他语言标签包装事件数据。
3. JSON 顶层必须是对象，且结构固定为：
{"type":"dice_events","version":"1","events":[...]}
4. events 中每个事件都必须包含字段：id/title/checkDice/dc/skill/desc。
5. compare 可选，支持 >= > <= <，缺省按 >= 处理。
6. 建议增加 scope 字段：protagonist（主角行动事件）/character（角色自身事件）/all（任意一方事件）。
7. timeLimit 可选；若提供，必须使用 ISO 8601 duration 格式（例如 PT30S、PT5M），并用于时限倒计时。
8. 非事件叙事文本请正常输出；事件信息只放在该 rolljson 代码块内。
9. DICE_ROUND_SUMMARY内的是本轮事件总结，会影响AI对事件的理解和后续行为；请务必准确描述事件经过和结果（不需要说骰子结果之类的）。
10. 非必要的时候不需要使用本系统。`;
const DEFAULT_SETTINGS_Event: DicePluginSettingsEvent = {
  enabled: true,
  autoSendRuleToAI: true,
  eventApplyScope: "protagonist_only",
  enableTimeLimit: true,
  minTimeLimitSeconds: 10,
  ruleText: DEFAULT_RULE_TEXT_Event,
};
const LOCAL_METADATA_FALLBACK_Event: Record<string, any> = {};
const LOCAL_SETTINGS_FALLBACK_Event: DicePluginSettingsEvent = {
  ...DEFAULT_SETTINGS_Event,
};

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
  bucket.eventApplyScope = bucket.eventApplyScope === "all" ? "all" : "protagonist_only";
  bucket.enableTimeLimit = bucket.enableTimeLimit !== false;
  const minSecondsRaw = Number(bucket.minTimeLimitSeconds);
  const minSeconds = Number.isFinite(minSecondsRaw) ? Math.floor(minSecondsRaw) : 10;
  bucket.minTimeLimitSeconds = Math.max(1, minSeconds);
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

function mountSettingsCardEvent(attempt = 0): void {
  if (document.getElementById(SETTINGS_CARD_ID_Event)) {
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

  const root = document.createElement("div");
  root.id = SETTINGS_CARD_ID_Event;
  root.style.marginBottom = "12px";
  const drawerToggleId = `${SETTINGS_CARD_ID_Event}-toggle`;
  const drawerContentId = `${SETTINGS_CARD_ID_Event}-content`;
  const drawerIconId = `${SETTINGS_CARD_ID_Event}-icon`;
  root.innerHTML = `
    <div class="st-roll-drawer" style="border:1px solid rgba(197,160,89,0.35);border-radius:8px;overflow:hidden;">
      <div class="st-roll-drawer-toggle" id="${drawerToggleId}" style="cursor:pointer;display:flex;align-items:center;justify-content:space-between;padding:8px 10px;background:rgba(0,0,0,0.28);border-bottom:1px solid rgba(197,160,89,0.2);">
        <b>骰子设置</b>
        <span id="${drawerIconId}" style="font-size:14px;opacity:0.9;">▾</span>
      </div>
      <div class="st-roll-drawer-content" id="${drawerContentId}" style="display:none;padding:10px;background:linear-gradient(135deg, rgba(43,29,29,0.7), rgba(26,16,16,0.7));">
        <label style="display:flex;align-items:center;gap:8px;margin-bottom:8px;cursor:pointer;">
          <input id="${SETTINGS_ENABLED_ID_Event}" type="checkbox" />
          <span>启用事件驱动骰子系统</span>
        </label>
        <label style="display:flex;align-items:center;gap:8px;cursor:pointer;">
          <input id="${SETTINGS_RULE_ID_Event}" type="checkbox" />
          <span>默认发送规则给 AI</span>
        </label>
        <label style="display:flex;align-items:center;gap:8px;margin-top:8px;white-space:nowrap;">
          <span>事件应用范围</span>
          <select id="${SETTINGS_SCOPE_ID_Event}" style="min-width:170px;background:rgba(0,0,0,0.25);color:inherit;border:1px solid rgba(197,160,89,0.35);border-radius:6px;padding:2px 6px;">
            <option value="protagonist_only">仅主角行动事件</option>
            <option value="all">全部事件</option>
          </select>
        </label>
        <label style="display:flex;align-items:center;gap:8px;margin-top:8px;cursor:pointer;">
          <input id="${SETTINGS_TIME_LIMIT_ENABLED_ID_Event}" type="checkbox" />
          <span>开启事件时限功能</span>
        </label>
        <label style="display:flex;align-items:center;gap:8px;margin-top:8px;">
          <span>最短时限(秒)</span>
          <input id="${SETTINGS_TIME_LIMIT_MIN_ID_Event}" type="number" min="1" step="1" style="width:120px;background:rgba(0,0,0,0.25);color:inherit;border:1px solid rgba(197,160,89,0.35);border-radius:6px;padding:2px 6px;" />
        </label>
        <div style="margin-top:8px;font-size:12px;opacity:0.8;line-height:1.4;">
          开启后会在每轮生成前注入事件协议，并在用户发送时隐式附带上一轮掷骰总结。时限开启时，低于最短秒数的时限会自动提升。
        </div>
        <div style="margin-top:10px;">
          <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:6px;">
            <span style="font-size:12px;opacity:0.9;">事件协议规则（可手动编辑）</span>
            <div style="display:flex;gap:8px;">
              <button id="${SETTINGS_RULE_SAVE_ID_Event}" type="button" style="cursor:pointer;padding:2px 8px;border:1px solid rgba(197,160,89,0.45);border-radius:4px;background:rgba(197,160,89,0.12);color:inherit;">保存规则</button>
              <button id="${SETTINGS_RULE_RESET_ID_Event}" type="button" style="cursor:pointer;padding:2px 8px;border:1px solid rgba(255,255,255,0.25);border-radius:4px;background:rgba(255,255,255,0.08);color:inherit;">恢复默认</button>
            </div>
          </div>
          <textarea id="${SETTINGS_RULE_TEXT_ID_Event}" rows="10" style="width:100%;resize:vertical;box-sizing:border-box;border:1px solid rgba(197,160,89,0.3);border-radius:6px;background:rgba(0,0,0,0.25);color:inherit;padding:8px;font-size:12px;line-height:1.5;"></textarea>
        </div>
      </div>
    </div>
  `;

  container.prepend(root);

  const drawerToggle = document.getElementById(drawerToggleId);
  const drawerContent = document.getElementById(drawerContentId) as HTMLElement | null;
  const drawerIcon = document.getElementById(drawerIconId);

  drawerToggle?.addEventListener("click", () => {
    if (!drawerContent) return;
    const isOpen = drawerContent.style.display !== "none";
    drawerContent.style.display = isOpen ? "none" : "block";
    if (drawerIcon) {
      drawerIcon.textContent = isOpen ? "▾" : "▴";
    }
  });

  const enabledInput = document.getElementById(
    SETTINGS_ENABLED_ID_Event
  ) as HTMLInputElement | null;
  const ruleInput = document.getElementById(
    SETTINGS_RULE_ID_Event
  ) as HTMLInputElement | null;
  const scopeInput = document.getElementById(
    SETTINGS_SCOPE_ID_Event
  ) as HTMLSelectElement | null;
  const timeLimitEnabledInput = document.getElementById(
    SETTINGS_TIME_LIMIT_ENABLED_ID_Event
  ) as HTMLInputElement | null;
  const minTimeLimitInput = document.getElementById(
    SETTINGS_TIME_LIMIT_MIN_ID_Event
  ) as HTMLInputElement | null;
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

  scopeInput?.addEventListener("change", (event) => {
    const value = String((event.target as HTMLSelectElement).value || "");
    updateSettingsEvent({
      eventApplyScope: value === "all" ? "all" : "protagonist_only",
    });
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
  const scopeInput = document.getElementById(
    SETTINGS_SCOPE_ID_Event
  ) as HTMLSelectElement | null;
  const timeLimitEnabledInput = document.getElementById(
    SETTINGS_TIME_LIMIT_ENABLED_ID_Event
  ) as HTMLInputElement | null;
  const minTimeLimitInput = document.getElementById(
    SETTINGS_TIME_LIMIT_MIN_ID_Event
  ) as HTMLInputElement | null;
  const ruleTextInput = document.getElementById(
    SETTINGS_RULE_TEXT_ID_Event
  ) as HTMLTextAreaElement | null;

  if (enabledInput) enabledInput.checked = Boolean(settings.enabled);
  if (ruleInput) ruleInput.checked = Boolean(settings.autoSendRuleToAI);
  if (scopeInput) scopeInput.value = settings.eventApplyScope;
  if (timeLimitEnabledInput) timeLimitEnabledInput.checked = Boolean(settings.enableTimeLimit);
  if (minTimeLimitInput) {
    minTimeLimitInput.value = String(settings.minTimeLimitSeconds);
    minTimeLimitInput.disabled = !settings.enableTimeLimit;
    minTimeLimitInput.style.opacity = settings.enableTimeLimit ? "1" : "0.5";
  }
  if (ruleTextInput) {
    const nextText = settings.ruleText || DEFAULT_RULE_TEXT_Event;
    if (ruleTextInput.value !== nextText) {
      ruleTextInput.value = nextText;
    }
  }
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
        /\[\[DICE_EVENT_RULES_V1\]\][\s\S]*?\[\[\/DICE_EVENT_RULES_V1\]\]/g,
        ""
      )
      .replace(
        /\[\[DICE_ROUND_SUMMARY_V1\]\][\s\S]*?\[\[\/DICE_ROUND_SUMMARY_V1\]\]/g,
        ""
      )
  );
}

function buildDiceRuleBlockEvent(): string {
  const settings = getSettingsEvent();
  const rawRuleText =
    typeof settings.ruleText === "string" && settings.ruleText.trim().length > 0
      ? settings.ruleText
      : DEFAULT_RULE_TEXT_Event;
  const ruleText = rawRuleText.replace(/\[\[\/?DICE_EVENT_RULES_V1\]\]/g, "").trim();
  const timeoutRule =
    settings.enableTimeLimit
      ? `时限系统配置：已开启。若输出 timeLimit，则其等效时长不得小于 ${settings.minTimeLimitSeconds} 秒。`
      : "时限系统配置：已关闭。请不要输出 timeLimit 字段。";
  return `${DICE_RULE_BLOCK_START_Event}
${ruleText}

${timeoutRule}
${DICE_RULE_BLOCK_END_Event}`;
}

function buildRoundSummaryEvent(round: PendingRoundEvent): string {
  ensureRoundEventTimersSyncedEvent(round);
  const lines: string[] = [];
  lines.push(DICE_SUMMARY_BLOCK_START_Event);
  lines.push(`round_id: ${round.roundId}`);
  lines.push(`opened_at: ${new Date(round.openedAt).toISOString()}`);
  lines.push(`events_offered: ${round.events.length}`);
  if (round.events.length > 0) {
    lines.push("events:");
    for (const event of round.events) {
      const timer = round.eventTimers?.[event.id];
      const offeredAt =
        timer?.offeredAt ?? (typeof event.offeredAt === "number" ? event.offeredAt : null);
      const deadlineAt =
        timer?.deadlineAt ?? (typeof event.deadlineAt === "number" ? event.deadlineAt : null);
      lines.push(
        `- id=${event.id} | title=${event.title} | skill=${event.skill} | dice=${event.checkDice} | compare=${event.compare ?? ">="} | dc=${event.dc} | timeLimit=${event.timeLimit ?? "none"} | offered_at=${offeredAt ? new Date(offeredAt).toISOString() : "null"} | deadline_at=${deadlineAt ? new Date(deadlineAt).toISOString() : "null"}`
      );
    }
  }
  if (round.rolls.length === 0) {
    lines.push("rolls: 本轮无掷骰记录。");
  } else {
    lines.push("rolls:");
    for (const record of round.rolls) {
      const timer = round.eventTimers?.[record.eventId];
      const deadlineAt = timer?.deadlineAt ?? null;
      const source = record.source || "manual_roll";
      lines.push(
        `- roll_id=${record.rollId} | event_id=${record.eventId} | title=${record.eventTitle} | expr=${record.diceExpr} | rolls=[${record.result.rolls.join(",")}] | raw=${record.result.rawTotal} | modifier=${formatModifier(record.result.modifier)} | total=${record.result.total} | compare=${record.compareUsed} | dc=${record.dcUsed ?? "null"} | success=${record.success === null ? "null" : record.success ? "true" : "false"} | source=${source} | timeout_at=${record.timeoutAt ? new Date(record.timeoutAt).toISOString() : "null"} | deadline_at=${deadlineAt ? new Date(deadlineAt).toISOString() : "null"}`
      );
    }
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
    if (meta.pendingRound && meta.pendingRound.status === "open") {
      summaryToInject = buildRoundSummaryEvent(meta.pendingRound);
      meta.outboundSummary = {
        userMsgId: currentUserId,
        roundId: meta.pendingRound.roundId,
        summaryText: summaryToInject,
      };
      meta.pendingRound.status = "sealed";
      delete meta.pendingRound;
      changed = true;
    } else if (meta.outboundSummary && meta.outboundSummary.userMsgId !== currentUserId) {
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

function isLikelyProtagonistActionEvent(event: DiceEventSpecEvent): boolean {
  if (event.scope === "protagonist" || event.scope === "all") return true;
  if (event.scope === "character") return false;
  const text = `${event.title}\n${event.desc}\n${event.skill}`;
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
  const dc = Number(raw.dc);
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
    skill,
    timeLimitMs,
    timeLimit,
    desc,
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
  if (!meta.pendingRound || meta.pendingRound.status !== "open") {
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
  const compareUsed = normalizeCompareOperatorEvent(event.compare) ?? ">=";
  const dcUsed = Number.isFinite(event.dc) ? Number(event.dc) : null;
  const result = createSyntheticTimeoutDiceResultEvent(event);
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
  if (!round || round.status !== "open") return false;

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

function formatRollRecordSummaryEvent(record: EventRollRecordEvent): string {
  if (record.source === "timeout_auto_fail") {
    return "超时自动判定失败";
  }
  const status =
    record.success === null ? "未判定" : record.success ? "成功" : "失败";
  return `总值 ${record.result.total} (${record.compareUsed} ${record.dcUsed ?? "?"} => ${status})`;
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
  if (!round || round.status !== "open") {
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
      const rolledPrefix = lastRecord?.source === "timeout_auto_fail" 
        ? "<span style='color:#ff4d4f;font-weight:bold;'>[×]</span>" 
        : "<span style='color:#52c41a;font-weight:bold;'>[✓]</span>";
        
      const rolledBlock = lastRecord
        ? `<div style="margin-top:10px;padding:8px;border:1px solid rgba(82, 196, 26, 0.3);background:rgba(20, 35, 20, 0.6);font-size:12px;color:#a0d9a0;text-align:center;letter-spacing:0.5px;">
            ${rolledPrefix} 已结：${escapeHtmlEvent(formatRollRecordSummaryEvent(lastRecord))}
          </div>`
        : "";
        
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

      return `
      <li style="position:relative;list-style:none;margin-bottom:16px;border:1px solid rgba(197,160,89,0.3);border-left:3px solid #c5a059;padding:14px;background:linear-gradient(135deg, rgba(30,20,18,0.8), rgba(15,10,10,0.9));box-shadow: 0 4px 6px rgba(0,0,0,0.3);">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:10px;">
          <div style="font-weight:bold;color:#ffdfa3;font-size:15px;font-family:'Georgia', serif;letter-spacing:1px;">
            ✦ ${escapeHtmlEvent(event.title)}
          </div>
          <div style="font-size:11px;font-family:monospace;color:#8c7b60;background:rgba(0,0,0,0.5);border:1px solid rgba(197,160,89,0.2);padding:2px 6px;">
            ID:${escapeHtmlEvent(event.id)}
          </div>
        </div>
        
        <div style="font-size:13px;line-height:1.6;color:#d1c5a5;opacity:0.9;margin-bottom:12px;">
          ${escapeHtmlEvent(event.desc)}
        </div>
        
        <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:12px;justify-content:center;text-align:center;">
          <span style="font-size:11px;padding:3px 8px;border:1px solid rgba(150,150,150,0.2);background:rgba(255,255,255,0.05);color:#d1c5a5;text-transform:uppercase;">技能 <span style="color:#fff;">${escapeHtmlEvent(event.skill)}</span></span>
          <span style="font-size:11px;padding:3px 8px;border:1px solid rgba(150,150,150,0.2);background:rgba(255,255,255,0.05);color:#d1c5a5;text-transform:uppercase;">骰式 <span style="color:#ffdfa3;">${escapeHtmlEvent(event.checkDice)}</span></span>
          <span style="font-size:11px;padding:3px 8px;border:1px solid rgba(150,150,150,0.2);background:rgba(255,255,255,0.05);color:#d1c5a5;text-transform:uppercase;">判定 <span style="color:#ffbbbb;">${escapeHtmlEvent(compare)} ${event.dc}</span></span>
          <span style="font-size:11px;padding:3px 8px;border:1px solid rgba(150,150,150,0.2);background:rgba(255,255,255,0.05);color:#d1c5a5;text-transform:uppercase;">时限 <span style="color:#a0d9a0;">${escapeHtmlEvent(timeLimitLabel)}</span></span>
        </div>
        
        <div data-dice-countdown="1" data-round-id="${escapeAttrEvent(round.roundId)}" data-event-id="${escapeAttrEvent(event.id)}" data-deadline-at="${escapeAttrEvent(deadlineAttr)}" style="display:inline-block;padding:4px 10px;font-size:11px;font-family:monospace;border:${runtimeStyle.border};background:${runtimeStyle.background};color:${runtimeStyle.color};letter-spacing:1px;margin-bottom:4px;">
          STATUS: ${escapeHtmlEvent(runtime.text)}
        </div>
        
        ${rolledBlock}
        
        <div style="margin-top:14px;display:flex;align-items:center;justify-content:space-between;border-top:1px dashed rgba(197,160,89,0.2);padding-top:12px;">
          <code style="font-size:11px;color:#8c7b60;background:none;padding:0;">/eventroll roll ${escapeHtmlEvent(event.id)}</code>
          ${showRollButton
            ? `<button type="button" data-dice-event-roll="1" data-round-id="${escapeAttrEvent(round.roundId)}" data-dice-event-id="${escapeAttrEvent(event.id)}" data-dice-expr="${escapeAttrEvent(event.checkDice)}" ${buttonDisabled} style="border:1px solid #c5a059;background:linear-gradient(135deg,#3a2515,#1a100a);color:#ffdfa3;padding:6px 16px;font-family:'Georgia', serif;font-weight:bold;font-size:12px;letter-spacing:1px;text-transform:uppercase;transition:all 0.2s;box-shadow:0 2px 4px rgba(0,0,0,0.5);${buttonStateStyle}">
            执行检定
          </button>`
            : ""}
        </div>
      </li>`;
    })
    .join("");

  return `
  <div style="border:1px solid #8c7b60;background:linear-gradient(145deg,#1c1412 0%,#0d0806 100%);padding:16px;color:#d1c5a5;box-shadow:0 8px 24px rgba(0,0,0,0.4), inset 0 0 30px rgba(0,0,0,0.6);font-family:sans-serif;">
    <div style="display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:16px;border-bottom:1px solid #4a3b2c;padding-bottom:10px;">
      <strong style="color:#e8dcb5;font-size:16px;font-family:'Georgia', serif;letter-spacing:2px;">❖ 本轮可用事件 ❖</strong>
      <span style="font-size:11px;color:#6b5a45;font-family:monospace;">ROUND: ${escapeHtmlEvent(round.roundId)}</span>
    </div>
    <ul style="padding:0;margin:0;">${items}</ul>
  </div>`;
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

function buildEventRollResultCardEvent(
  event: DiceEventSpecEvent,
  record: EventRollRecordEvent
): string {
  const status =
    record.success === null ? "PENDING" : record.success ? "判定成功" : "判定失败";
  const statusColor =
    record.success === null ? "#ffdb78" : record.success ? "#52c41a" : "#ff4d4f";

  const sourceText = record.source === "timeout_auto_fail" ? "超时自动检定" : "主动检定";
  
  return `
  <div style="border:1px solid #8c7b60;background:linear-gradient(145deg,#1c1412 0%,#0d0806 100%);padding:16px;color:#d1c5a5;box-shadow:0 8px 24px rgba(0,0,0,0.4), inset 0 0 30px rgba(0,0,0,0.6);">
    <div style="display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:14px;border-bottom:1px solid #4a3b2c;padding-bottom:10px;">
      <strong style="color:#e8dcb5;font-size:15px;font-family:'Georgia', serif;letter-spacing:1px;">❖ 检定结算报告 ❖</strong>
      <span style="font-size:11px;color:#6b5a45;font-family:monospace;">${escapeHtmlEvent(record.rollId)}</span>
    </div>
    
    <div style="margin-bottom:12px;font-weight:bold;font-size:16px;color:#ffdfa3;font-family:'Georgia', serif;">
      ${escapeHtmlEvent(event.title)}
    </div>
    
    <div style="display:grid;grid-template-columns:auto 1fr;gap:6px 12px;font-size:12px;line-height:1.4;opacity:0.9;background:rgba(0,0,0,0.3);padding:10px;border:1px solid rgba(197,160,89,0.15);">
      <div style="color:#8c7b60;text-align:right;">事件 ID</div>
      <div style="font-family:monospace;">${escapeHtmlEvent(event.id)}</div>
      
      <div style="color:#8c7b60;text-align:right;">判定来源</div>
      <div>${escapeHtmlEvent(sourceText)}</div>
      
      <div style="color:#8c7b60;text-align:right;">检定技能</div>
      <div style="color:#fff;">${escapeHtmlEvent(event.skill)}</div>
      
      <div style="color:#8c7b60;text-align:right;">检定方式</div>
      <div style="font-family:monospace;color:#ffdfa3;">${escapeHtmlEvent(record.diceExpr)}</div>
      
      <div style="color:#8c7b60;text-align:right;">原始点数</div>
      <div style="font-family:monospace;">[${escapeHtmlEvent(record.result.rolls.join(", "))}] <span style="color:#8c7b60;">|</span> 修正 ${escapeHtmlEvent(formatModifier(record.result.modifier))}</div>
    </div>
    
    <div style="margin-top:16px;display:flex;align-items:center;justify-content:space-between;background:linear-gradient(90deg, rgba(0,0,0,0.4), rgba(0,0,0,0.1));padding:12px;border-left:3px solid ${statusColor};">
      <div>
        <div style="font-size:11px;color:#8c7b60;letter-spacing:1px;text-transform:uppercase;margin-bottom:4px;">最终结果</div>
        <div style="font-size:32px;line-height:1;font-weight:bold;color:#fff;font-family:'Georgia', serif;">${record.result.total}</div>
      </div>
      <div style="text-align:right;">
        <div style="font-size:11px;color:#8c7b60;letter-spacing:1px;text-transform:uppercase;margin-bottom:4px;">系统判定</div>
        <div style="font-size:13px;font-family:monospace;margin-bottom:2px;">条件: ${escapeHtmlEvent(record.compareUsed)} ${record.dcUsed ?? "N/A"}</div>
        <div style="font-weight:bold;font-size:16px;color:${statusColor};letter-spacing:1px;">[ ${status} ]</div>
      </div>
    </div>
    
    <div style="margin-top:12px;font-size:11px;color:#6b5a45;text-align:right;font-family:monospace;">
      TIME LIMIT: ${escapeHtmlEvent(event.timeLimit ?? "NONE")}
    </div>
  </div>`;
}

function buildEventAlreadyRolledCardEvent(
  event: DiceEventSpecEvent,
  record: EventRollRecordEvent
): string {
  const isTimeout = record.source === "timeout_auto_fail";
  const titleText = isTimeout ? "✦ 事件已超时 ✦" : "✦ 检定已完成 ✦";
  const sourceText = isTimeout ? "系统强制结算" : "玩家主动检定";
  const statusText = record.success === null ? "未决" : record.success ? "成功" : "失败";
  const statusColor = record.success === null ? "#a3957a" : record.success ? "#52c41a" : "#ff4d4f";

  // === 融合 buildResultMessage 的动画与 SVG 逻辑 ===
  let diceVisualBlock = "";
  
  // 只有在非超时（有实际掷骰结果）的情况下才渲染动画
  if (!isTimeout && record.result) {
    const result = record.result;
    const uniqueId = "d" + Math.random().toString(36).substr(2, 9);
    
    let critType = 'normal';
    let critText = '';
    let resultColor = '#ffdb78'; // 默认亮金色
    let resultGlow = '0 2px 4px rgba(0,0,0,0.5)';

    // 判断大成功/大失败 (仅单骰子时)
    if (result.count === 1) {
      const val = result.rolls[0];
      const maxVal = result.sides;
      if (val === maxVal) {
        critType = 'success';
        critText = '大成功!';
        resultColor = '#52c41a'; // 成功绿
        resultGlow = '0 0 15px rgba(82, 196, 26, 0.8)';
      } else if (val === 1) {
        critType = 'fail';
        critText = '大失败!';
        resultColor = '#ff4d4f'; // 失败红
        resultGlow = '0 0 15px rgba(255, 77, 79, 0.8)';
      }
    }

    const showDiceSvgs = result.rolls.length <= 5;
    let diceVisuals = "";
    if (showDiceSvgs) {
      diceVisuals = result.rolls.map(r => getDiceSvg(r, result.sides, resultColor)).join(" ");
    } else {
      diceVisuals = getDiceSvg(0, result.sides, resultColor);
    }

    const rollingVisual = getRollingSvg('#ffdb78');

    diceVisualBlock = `
    <style>
      @keyframes spin-3d-${uniqueId} {
        0% { transform: rotateX(0deg) rotateY(0deg); }
        100% { transform: rotateX(360deg) rotateY(360deg); }
      }
      @keyframes fade-out-${uniqueId} {
        0% { opacity: 1; }
        90% { opacity: 0; }
        100% { opacity: 0; display: none; }
      }
      @keyframes fade-in-${uniqueId} {
        0% { opacity: 0; transform: scale(0.8); }
        100% { opacity: 1; transform: scale(1); }
      }
      @keyframes pulse-crit-${uniqueId} {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
      }
      @keyframes shake-crit-${uniqueId} {
        0% { transform: translate(1px, 1px) rotate(0deg); }
        10% { transform: translate(-1px, -2px) rotate(-1deg); }
        20% { transform: translate(-3px, 0px) rotate(1deg); }
        30% { transform: translate(3px, 2px) rotate(0deg); }
        40% { transform: translate(1px, -1px) rotate(1deg); }
        50% { transform: translate(-1px, 2px) rotate(-1deg); }
        60% { transform: translate(-3px, 1px) rotate(0deg); }
        70% { transform: translate(3px, 1px) rotate(-1deg); }
        80% { transform: translate(-1px, -1px) rotate(1deg); }
        90% { transform: translate(1px, 2px) rotate(0deg); }
        100% { transform: translate(1px, -2px) rotate(-1deg); }
      }
      
      .dice-wrapper-${uniqueId} {
        position: relative;
        min-height: 90px;
        padding: 12px 0;
        margin-top: 12px;
        background: rgba(0,0,0,0.2);
        border-radius: 6px;
        border: 1px solid rgba(197,160,89,0.15);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
      
      .dice-rolling-${uniqueId} {
        position: absolute;
        top: 50%; left: 50%;
        transform: translate(-50%, -50%);
        animation: fade-out-${uniqueId} 0.2s forwards 1.2s;
        z-index: 10;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      
      .dice-rolling-${uniqueId} .cube {
        animation: spin-3d-${uniqueId} 1.5s linear infinite;
      }

      .dice-result-${uniqueId} {
        opacity: 0;
        animation: fade-in-${uniqueId} 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards 1.3s;
        text-align: center;
        width: 100%;
      }

      .crit-success-${uniqueId} {
        animation: pulse-crit-${uniqueId} 1s infinite;
        color: #52c41a;
        font-weight: bold;
        margin-bottom: 8px;
        text-shadow: 0 0 10px rgba(82, 196, 26, 0.5);
      }

      .crit-fail-${uniqueId} {
        animation: shake-crit-${uniqueId} 0.5s;
        color: #ff4d4f;
        font-weight: bold;
        margin-bottom: 8px;
        text-shadow: 0 0 10px rgba(255, 77, 79, 0.5);
      }
    </style>
    
    <div class="dice-wrapper-${uniqueId}">
        <div class="dice-rolling-${uniqueId}">
            ${rollingVisual}
        </div>

        <div class="dice-result-${uniqueId}">
            ${critText ? `<div class="${critType === 'success' ? `crit-success-${uniqueId}` : `crit-fail-${uniqueId}`}">${critText}</div>` : ''}
            
            <div style="margin-bottom: 8px; display: flex; justify-content: center; gap: 8px; flex-wrap: wrap;">
                ${diceVisuals}
            </div>

            <div style="font-size: 28px; font-weight: bold; font-family: 'Georgia', serif; color: ${resultColor}; text-shadow: ${resultGlow}; line-height: 1;">
                ${result.total}
            </div>
        </div>
    </div>
    `;
  }

  return `
  <div style="border:1px solid #5a4b3c;background:linear-gradient(135deg,#241c18 0%,#171210 100%);padding:14px;color:#b3a58b;box-shadow:inset 0 0 20px rgba(0,0,0,0.5);">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;border-bottom:1px dashed #4a3b2c;padding-bottom:8px;">
      <strong style="color:#d1c5a5;font-size:14px;letter-spacing:1px;">${titleText}</strong>
      <span style="font-size:11px;opacity:0.6;font-family:monospace;">${escapeHtmlEvent(record.rollId)}</span>
    </div>
    
    <div style="font-size:13px;line-height:1.6;display:flex;flex-direction:column;gap:4px;">
      <div><span style="color:#8c7b60;">目标事件：</span> <strong style="color:#d1c5a5;">${escapeHtmlEvent(event.title)}</strong> <code style="font-size:11px;color:#6b5a45;">(${escapeHtmlEvent(event.id)})</code></div>
      <div><span style="color:#8c7b60;">判定来源：</span> ${escapeHtmlEvent(sourceText)}</div>
      
      <div style="display:flex;align-items:center;gap:8px;margin-top:4px;padding-top:4px;border-top:1px solid rgba(0,0,0,0.3);">
        <span style="color:#8c7b60;">判定条件：</span> 
        <span style="font-size:12px;color:#d1c5a5;font-family:monospace;">${escapeHtmlEvent(record.compareUsed)} ${record.dcUsed ?? "N/A"}</span>
        <span style="margin-left:auto;color:${statusColor};font-weight:bold;border:1px solid ${statusColor};padding:2px 6px;font-size:11px;border-radius:2px;">
          ${statusText}
        </span>
      </div>

      ${diceVisualBlock}
      
      ${!isTimeout && record.result ? `
      <div style="font-size:11px;color:#6b5a45;margin-top:6px;text-align:center;background:rgba(0,0,0,0.3);padding:4px;border-radius:4px;">
        <span style="color:#8c7b60;">点数分布：</span> [${escapeHtmlEvent(record.result.rolls.join(", "))}] <span style="color:#8c7b60;margin:0 4px;">|</span> <span style="color:#8c7b60;">修正</span> ${escapeHtmlEvent(formatModifier(record.result.modifier))}
      </div>
      ` : ""}
      
      ${record.timeoutAt ? `<div style="font-size:11px;color:#8c7b60;margin-top:6px;font-family:monospace;text-align:right;">截止于: ${escapeHtmlEvent(new Date(record.timeoutAt).toISOString())}</div>` : ""}
    </div>
  </div>`;
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
  if (!round || round.status !== "open") {
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
    const eventCard = buildEventListCardEvent(round);
    pushToChat(eventCard);
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
  delete meta.lastPromptUserMsgId;
  delete meta.lastProcessedAssistantMsgId;
  saveMetadataSafeEvent();
  console.info(`[骰子插件] 已清理 Event 轮次状态 (${reason})`);
}

function buildEventRollHelpMessageEvent(): string {
  return `
  <div>
    <div><strong>/eventroll 命令帮助</strong></div>
    <ul>
      <li><code>/eventroll list</code>：列出当前轮次事件</li>
      <li><code>/eventroll roll &lt;eventId&gt;</code>：对指定事件投骰</li>
      <li><code>/eventroll roll &lt;eventId&gt; &lt;diceExpr&gt;</code>：覆盖默认骰式</li>
      <li><code>/eventroll help</code>：显示帮助</li>
    </ul>
  </div>`;
}

function buildEventListTextEvent(round: PendingRoundEvent): string {
  ensureRoundEventTimersSyncedEvent(round);
  const lines: string[] = [];
  lines.push(`当前轮次: ${round.roundId}`);
  lines.push(`事件数量: ${round.events.length}`);
  for (const event of round.events) {
    const state = getEventRuntimeViewStateEvent(round, event);
    lines.push(
      `- ${event.id}: ${event.title} | ${event.checkDice} | ${event.compare ?? ">="} ${event.dc} | ${event.skill} | timeLimit=${event.timeLimit ?? "none"} | 状态=${state.text}`
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
          if (!round || round.status !== "open") {
            const fallback = pushToChat(
              "当前没有可用事件。请等待 AI 输出事件 JSON。"
            );
            return fallback ?? "";
          }
          const msg = `<pre>${escapeHtmlEvent(buildEventListTextEvent(round))}</pre>`;
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
  mountSettingsCardEvent();
  bindEventButtonsEvent();
  registerEventRollCommandEvent();
  registerEventHooksEvent();
  startCountdownTickerEvent();
  sweepTimeoutFailuresEvent();
  refreshCountdownDomEvent();
  sanitizeCurrentChatEventBlocksEvent();

  const globalRef = globalThis as any;
  if (
    !globalRef.__stRollEventCommandRegisteredEvent ||
    !globalRef.__stRollEventHooksRegisteredEvent
  ) {
    if (attempt < 80) {
      setTimeout(() => initializeEvent(attempt + 1), 500);
    }
    return;
  }

  console.info("[骰子插件] Event 初始化完成");
}

(function bootstrapEvent() {
  const globalRef = globalThis as any;
  if (globalRef.__stDiceRollerEventLoaded) return;
  globalRef.__stDiceRollerEventLoaded = true;
  initializeEvent();
})();

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
      const msg = "骰子DEBUG模式\n" + "<pre>" + escapeHtmlEvent(text) + "</pre>";
      pushToChat(msg);
      return "";
    },
  })
);
