export function buildRollCommandHelpTemplateEvent(): string {
  return `
      <div>
        Generic dice command, supports <code>NdM+X</code> format:
      </div>
      <ul>
        <li><code>/roll</code> (same as <code>/roll 1d20</code>)</li>
        <li><code>/roll 1d20</code></li>
        <li><code>/roll 3d6+2</code></li>
        <li><code>/roll 2d10-1</code></li>
        <li><code>/roll 1d6!+2</code> (<code>!</code> means exploding dice)</li>
      </ul>
      <div>
        Result is saved to <code>chatMetadata.lastRoll</code> and can be read by
        <code>{{lastRoll}}</code> / <code>{{lastRollTotal}}</code>.
      </div>
    `;
}

export function buildEventRollHelpTemplateEvent(): string {
  return `
  <div>
    <div><strong>/eventroll command help</strong></div>
    <ul>
      <li><code>/eventroll list</code>: list current round events</li>
      <li><code>/eventroll roll &lt;eventId&gt;</code>: roll the specified event</li>
      <li><code>/eventroll roll &lt;eventId&gt; &lt;diceExpr&gt;</code>: override default dice expression</li>
      <li><code>/eventroll help</code>: show help</li>
    </ul>
    <div>
      <strong>rolljson outcomes</strong>:
      <code>events[i].outcomes.success</code> / <code>failure</code> / <code>explode</code>.
      If <code>checkDice</code> uses <code>!</code> and explosion is triggered, <code>explode</code> is preferred.
    </div>
    <div>
      <strong>event target</strong>:
      optional <code>events[i].target = { type, name? }</code>, where
      <code>type</code> is one of <code>self</code>/<code>scene</code>/<code>supporting</code>/<code>object</code>/<code>other</code>.
    </div>
  </div>`;
}

export function buildPreBlockTemplateEvent(content: string): string {
  return `<pre>${content}</pre>`;
}

export function buildDebugTemplateEvent(content: string): string {
  return `Dice DEBUG mode\n<pre>${content}</pre>`;
}
