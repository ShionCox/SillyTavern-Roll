/// <reference path="./global.d.ts" />
function formatModifier(mod) {
    if (mod === 0)
        return "0";
    return mod > 0 ? `+${mod}` : `${mod}`;
}
function getDiceSvg(value, sides, color) {
    const size = 48;
    const stroke = 3;
    const dotR = 4;
    if (sides === 6) {
        // D6: 画点
        const dotsMap = {
            1: [[24, 24]],
            2: [[14, 14], [34, 34]],
            3: [[14, 14], [24, 24], [34, 34]],
            4: [[14, 14], [14, 34], [34, 14], [34, 34]],
            5: [[14, 14], [14, 34], [24, 24], [34, 14], [34, 34]],
            6: [[14, 14], [14, 24], [14, 34], [34, 14], [34, 24], [34, 34]]
        };
        const dots = dotsMap[value] || [];
        const circles = dots.map(([cx, cy]) => `<circle cx="${cx}" cy="${cy}" r="${dotR}" fill="${color}" />`).join('');
        return `
      <svg width="${size}" height="${size}" viewBox="0 0 48 48" style="display:inline-block; vertical-align: middle;">
          <rect x="4" y="4" width="40" height="40" rx="8" ry="8" fill="none" stroke="${color}" stroke-width="${stroke}" />
          ${circles}
      </svg>`;
    }
    else {
        // D20/其他: 画一个多边形（六边形模拟）并显示数值
        return `
      <svg width="${size}" height="${size}" viewBox="0 0 48 48" style="display:inline-block; vertical-align: middle;">
          <path d="M24 4 L43 14 L43 34 L24 44 L5 34 L5 14 Z" fill="none" stroke="${color}" stroke-width="${stroke}" />
          <path d="M24 4 L24 24 M24 24 L43 34 M24 24 L5 34" stroke="${color}" stroke-width="1.5" opacity="0.6"/>
          <text x="24" y="33" font-size="18" text-anchor="middle" fill="${color}" font-weight="bold" style="font-family: sans-serif;">${value}</text>
      </svg>`;
    }
}
function getRollingSvg(color) {
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
function buildResultMessage(result) {
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
        }
        else if (val === 1) {
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
    }
    else {
        diceVisuals = getDiceSvg(0, result.sides, resultColor);
    }
    const rollingVisual = getRollingSvg(rpgColors.textHighlight);
    const detailParts = [];
    if (result.rolls.length) {
        detailParts.push(`骰子: [${rollsStr}]`);
    }
    if (hasModifier) {
        detailParts.push(`修正值: ${modStr}`);
    }
    if (result.exploding) {
        detailParts.push(result.explosionTriggered ? '🔥 爆骰触发' : '🔥 爆骰待触发');
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
const ctx = SillyTavern.getContext();
const { chatMetadata, saveMetadata, registerMacro, SlashCommandParser, SlashCommand, SlashCommandArgument, SlashCommandNamedArgument, ARGUMENT_TYPE, sendSystemMessage, } = ctx;
const MAX_DICE_COUNT = 1000;
const MAX_DICE_SIDES = 1000;
const MAX_EXPLOSION_ROLLS = 10000;
// ===== 解析表达式：NdM+X / NdM-X / NdM =====
function parseDiceExpression(exprRaw) {
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
function rollOnce(sides) {
    // 随机数算法
    const max = Math.floor(sides);
    if (typeof crypto !== "undefined" &&
        typeof crypto.getRandomValues === "function") {
        const buf = new Uint32Array(1);
        const limit = Math.floor(0xffffffff / max) * max;
        let rand;
        do {
            crypto.getRandomValues(buf);
            rand = buf[0];
        } while (rand >= limit);
        return (rand % max) + 1;
    }
    return Math.floor(Math.random() * max) + 1;
}
function pushRollWithExplosion(sides, explode, rolls) {
    let value = rollOnce(sides);
    rolls.push(value);
    if (!explode) {
        return;
    }
    while (value === sides) {
        if (rolls.length >= MAX_EXPLOSION_ROLLS) {
            throw new Error(`爆骰次数过多，已超过安全上限 ${MAX_EXPLOSION_ROLLS} 次，请调整表达式。`);
        }
        value = rollOnce(sides);
        rolls.push(value);
    }
}
function rollBaseExpression(exprRaw) {
    const { count, sides, modifier, explode } = parseDiceExpression(exprRaw);
    const rolls = [];
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
function rollExpression(exprRaw, options = {}) {
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
function pushToChat(message) {
    if (typeof sendSystemMessage === "function") {
        try {
            sendSystemMessage("generic", message, {
                uses_system_ui: true,
                isSmallSys: true,
            });
            return;
        }
        catch (e) {
            console.error("[Dice Roller] 发送到聊天框失败:", e);
        }
    }
    // 兜底方案：返回 message，让 ST 用默认方式处理
    return message;
}
function getDiceMeta() {
    if (!chatMetadata.diceRoller) {
        chatMetadata.diceRoller = {};
    }
    return chatMetadata.diceRoller;
}
function saveLastRoll(result) {
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
SlashCommandParser.addCommandObject(SlashCommand.fromProps({
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
    callback: (namedArgs, unnamedArgs) => {
        try {
            const exprRaw = (unnamedArgs ?? "").toString().trim();
            const expr = exprRaw || "1d20";
            const result = rollExpression(expr);
            saveLastRoll(result);
            const msg = buildResultMessage(result);
            const fallback = pushToChat(msg);
            return fallback ?? "";
        }
        catch (e) {
            const errMsg = `❌ 掷骰出错：${e?.message ?? String(e)}`;
            const fallback = pushToChat(errMsg);
            return fallback ?? "";
        }
    },
}));
SlashCommandParser.addCommandObject(SlashCommand.fromProps({
    name: "rollDebug",
    aliases: ["ddebug"],
    returns: "显示 diceRoller 元数据",
    namedArgumentList: [],
    unnamedArgumentList: [],
    callback: () => {
        const meta = getDiceMeta();
        const text = meta.last
            ? JSON.stringify(meta, null, 2)
            : "当前没有掷骰记录，请先使用 /roll";
        // 直接丢到聊天里
        const msg = "骰子DEBUG模式\n" + "<pre>" + text + "</pre>";
        pushToChat(msg);
        return "";
    },
}));
