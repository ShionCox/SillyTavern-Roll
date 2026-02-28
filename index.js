(()=>{var F={display_name:"\u9AB0\u5B50\u63D2\u4EF6",loading_order:10,requires:[],optional:[],js:"index.js",author:"Shion",version:"1.1.0",auto_update:!1};function Ce(e){return`
    <div class="inline-drawer st-roll-shell">
      <div class="inline-drawer-toggle inline-drawer-header st-roll-head" id="${e.drawerToggleId}">
        <div class="st-roll-head-title">
          <span>\u9AB0\u5B50\u52A9\u624B</span>
          <span id="${e.badgeId}" class="st-roll-head-badge">${e.badgeText}</span>
        </div>
        <div id="${e.drawerIconId}" class="inline-drawer-icon fa-solid fa-circle-chevron-down down interactable" tabindex="0" role="button"></div>
      </div>

      <div class="inline-drawer-content st-roll-content" id="${e.drawerContentId}" style="display:none;">
        <div class="st-roll-filters flex-container">
          <input id="${e.searchId}" class="text_pole flex1 st-roll-search" placeholder="\u641C\u7D22\u8BBE\u7F6E" type="search" />
        </div>

        <div class="st-roll-tabs">
          <button id="${e.tabMainId}" type="button" class="st-roll-tab is-active">
            <i class="fa-solid fa-gear"></i>
            <span>\u4E3B\u8BBE\u7F6E</span>
          </button>
          <button id="${e.tabRuleId}" type="button" class="st-roll-tab">
            <i class="fa-solid fa-scroll"></i>
            <span>\u89C4\u5219\u7F16\u8F91</span>
          </button>
          <button id="${e.tabAboutId}" type="button" class="st-roll-tab">
            <i class="fa-solid fa-circle-info"></i>
            <span>\u5173\u4E8E</span>
          </button>
        </div>

        <div id="${e.panelMainId}" class="st-roll-panel">
          <div class="st-roll-divider">
            <i class="fa-solid fa-power-off"></i>
            <span>\u57FA\u7840\u5F00\u5173</span>
            <div class="st-roll-divider-line"></div>
          </div>

          <label class="st-roll-item st-roll-search-item" data-st-roll-search="enable event dice plugin switch">
            <div class="st-roll-item-main">
              <div class="st-roll-item-title">\u542F\u7528\u4E8B\u4EF6\u9AB0\u5B50\u7CFB\u7EDF</div>
              <div class="st-roll-item-desc">\u603B\u5F00\u5173\uFF0C\u63A7\u5236\u4E8B\u4EF6\u89E3\u6790\u3001\u63B7\u9AB0\u5904\u7406\u4E0E\u7ED3\u679C\u56DE\u586B\u3002</div>
            </div>
            <div class="st-roll-inline">
              <input id="${e.enabledId}" type="checkbox" />
            </div>
          </label>

          <div class="st-roll-item st-roll-search-item" data-st-roll-search="scope protagonist all apply">
            <div class="st-roll-item-main">
              <div class="st-roll-item-title">\u4E8B\u4EF6\u5E94\u7528\u8303\u56F4</div>
              <div class="st-roll-item-desc">\u9650\u5236\u53EA\u5904\u7406\u4E3B\u89D2\u884C\u52A8\u4E8B\u4EF6\uFF0C\u6216\u5904\u7406\u5168\u90E8\u4E8B\u4EF6\u3002</div>
            </div>
            <div class="st-roll-row">
              <select id="${e.scopeId}" class="st-roll-select">
                <option value="protagonist_only">\u4EC5\u4E3B\u89D2\u884C\u52A8\u4E8B\u4EF6</option>
                <option value="all">\u5168\u90E8\u4E8B\u4EF6</option>
              </select>
            </div>
          </div>

          <div class="st-roll-divider">
            <i class="fa-solid fa-robot"></i>
            <span>AI \u4E0E\u534F\u8BAE</span>
            <div class="st-roll-divider-line"></div>
          </div>

          <label class="st-roll-item st-roll-search-item" data-st-roll-search="auto rule inject protocol ai">
            <div class="st-roll-item-main">
              <div class="st-roll-item-title">\u9ED8\u8BA4\u53D1\u9001\u89C4\u5219\u7ED9 AI</div>
              <div class="st-roll-item-desc">\u5728\u751F\u6210\u524D\u6CE8\u5165\u534F\u8BAE\uFF0C\u63D0\u5347\u4E8B\u4EF6 JSON \u53EF\u89E3\u6790\u6027\u3002</div>
            </div>
            <div class="st-roll-inline">
              <input id="${e.ruleId}" type="checkbox" />
            </div>
          </label>

          <label class="st-roll-item st-roll-search-item" data-st-roll-search="rollMode auto manual ai automatic">
            <div class="st-roll-item-main">
              <div class="st-roll-item-title">\u5141\u8BB8 AI \u51B3\u5B9A\u81EA\u52A8/\u624B\u52A8\u63B7\u9AB0</div>
              <div class="st-roll-item-desc">\u5F00\u542F\u540E\u53EF\u901A\u8FC7 event.rollMode \u63A7\u5236 auto/manual\uFF1B\u5173\u95ED\u540E\u7EDF\u4E00\u624B\u52A8\u3002</div>
            </div>
            <div class="st-roll-inline">
              <input id="${e.aiRollModeId}" type="checkbox" />
            </div>
          </label>

          <div class="st-roll-divider">
            <i class="fa-solid fa-dice"></i>
            <span>\u63B7\u9AB0\u89C4\u5219</span>
            <div class="st-roll-divider-line"></div>
          </div>

          <label class="st-roll-item st-roll-search-item" data-st-roll-search="explode exploding dice bang !">
            <div class="st-roll-item-main">
              <div class="st-roll-item-title">\u542F\u7528\u7206\u9AB0\u529F\u80FD</div>
              <div class="st-roll-item-desc">\u5173\u95ED\u540E\uFF0C\u5373\u4F7F\u9AB0\u5F0F\u5305\u542B <code>!</code> \u4E5F\u4E0D\u4F1A\u89E6\u53D1\u8FDE\u9501\u7206\u9AB0\u3002</div>
            </div>
            <div class="st-roll-inline">
              <input id="${e.explodingEnabledId}" type="checkbox" />
            </div>
          </label>

          <div class="st-roll-divider">
            <i class="fa-solid fa-route"></i>
            <span>\u5267\u60C5\u5206\u652F</span>
            <div class="st-roll-divider-line"></div>
          </div>

          <label class="st-roll-item st-roll-search-item" data-st-roll-search="outcome branch success failure">
            <div class="st-roll-item-main">
              <div class="st-roll-item-title">\u542F\u7528\u5267\u60C5\u8D70\u5411\u5206\u652F</div>
              <div class="st-roll-item-desc">\u652F\u6301 success/failure \u8D70\u5411\u6587\u6848\uFF0C\u5E76\u5728\u7ED3\u679C\u5361\u663E\u793A\u547D\u4E2D\u5206\u652F\u3002</div>
            </div>
            <div class="st-roll-inline">
              <input id="${e.outcomeBranchesId}" type="checkbox" />
            </div>
          </label>

          <label class="st-roll-item st-roll-search-item" data-st-roll-search="explode outcome critical special branch">
            <div class="st-roll-item-main">
              <div class="st-roll-item-title">\u542F\u7528\u7206\u9AB0\u7279\u6B8A\u8D70\u5411</div>
              <div class="st-roll-item-desc">\u89E6\u53D1\u7206\u9AB0\u65F6\uFF0C\u5141\u8BB8 outcomes.explode \u4F18\u5148\u8986\u76D6\u666E\u901A\u6210\u529F/\u5931\u8D25\u8D70\u5411\u3002</div>
            </div>
            <div class="st-roll-inline">
              <input id="${e.explodeOutcomeId}" type="checkbox" />
            </div>
          </label>

          <label class="st-roll-item st-roll-search-item" data-st-roll-search="list card outcome preview">
            <div class="st-roll-item-main">
              <div class="st-roll-item-title">\u5217\u8868\u5361\u9884\u89C8\u8D70\u5411</div>
              <div class="st-roll-item-desc">\u672A\u63B7\u9AB0\u65F6\u663E\u793A success/failure/explode \u4E09\u9879\u9884\u89C8\u6587\u672C\u3002</div>
            </div>
            <div class="st-roll-inline">
              <input id="${e.listOutcomePreviewId}" type="checkbox" />
            </div>
          </label>

          <div class="st-roll-divider">
            <i class="fa-solid fa-file-lines"></i>
            <span>\u6458\u8981\u6CE8\u5165</span>
            <div class="st-roll-divider-line"></div>
          </div>

          <div class="st-roll-item st-roll-search-item" data-st-roll-search="summary detail minimal balanced detailed context">
            <div class="st-roll-item-main">
              <div class="st-roll-item-title">\u6458\u8981\u4FE1\u606F\u7B49\u7EA7</div>
              <div class="st-roll-item-desc">\u63A7\u5236\u53D1\u9001\u7ED9 AI \u7684 DICE_ROUND_SUMMARY \u7EC6\u8282\u7A0B\u5EA6\u3002</div>
            </div>
            <div class="st-roll-row">
              <select id="${e.summaryDetailId}" class="st-roll-select">
                <option value="minimal">minimal / \u6807\u9898 + \u63CF\u8FF0 + \u7ED3\u679C</option>
                <option value="balanced">balanced / + \u68C0\u5B9A\u4FE1\u606F</option>
                <option value="detailed">detailed / + \u6765\u6E90 + \u6A21\u5F0F + \u65F6\u9650</option>
              </select>
            </div>
          </div>

          <div class="st-roll-item st-roll-search-item" data-st-roll-search="summary history rounds window">
            <div class="st-roll-item-main">
              <div class="st-roll-item-title">\u5386\u53F2\u8F6E\u6B21\u6570</div>
              <div class="st-roll-item-desc">\u6BCF\u6B21\u53D1\u9001\u65F6\u9644\u5E26\u6700\u8FD1 N \u8F6E summary\uFF08\u6309\u4E8B\u4EF6\u8F6E\u6B21\uFF09\u3002</div>
            </div>
            <div class="st-roll-row">
              <input id="${e.summaryRoundsId}" class="st-roll-input" type="number" min="1" max="10" step="1" />
            </div>
          </div>

          <label class="st-roll-item st-roll-search-item" data-st-roll-search="summary outcome history branch">
            <div class="st-roll-item-main">
              <div class="st-roll-item-title">\u6458\u8981\u5305\u542B\u8D70\u5411\u6587\u672C</div>
              <div class="st-roll-item-desc">\u5728\u6458\u8981\u4E2D\u9644\u52A0\u672C\u6B21\u547D\u4E2D\u7684\u5267\u60C5\u8D70\u5411\u3002</div>
            </div>
            <div class="st-roll-inline">
              <input id="${e.includeOutcomeSummaryId}" type="checkbox" />
            </div>
          </label>

          <div class="st-roll-divider">
            <i class="fa-solid fa-stopwatch"></i>
            <span>\u65F6\u9650\u63A7\u5236</span>
            <div class="st-roll-divider-line"></div>
          </div>

          <label class="st-roll-item st-roll-search-item" data-st-roll-search="time limit timeout">
            <div class="st-roll-item-main">
              <div class="st-roll-item-title">\u542F\u7528\u4E8B\u4EF6\u65F6\u9650</div>
              <div class="st-roll-item-desc">\u4E8B\u4EF6\u58F0\u660E timeLimit \u65F6\uFF0C\u542F\u7528\u5012\u8BA1\u65F6\u4E0E\u8D85\u65F6\u5931\u8D25\u3002</div>
            </div>
            <div class="st-roll-inline">
              <input id="${e.timeLimitEnabledId}" type="checkbox" />
            </div>
          </label>

          <div id="${e.timeLimitRowId}" class="st-roll-item st-roll-search-item" data-st-roll-search="minimum seconds timeout">
            <div class="st-roll-item-main">
              <div class="st-roll-item-title">\u6700\u77ED\u65F6\u9650\uFF08\u79D2\uFF09</div>
              <div class="st-roll-item-desc">\u4F4E\u4E8E\u8BE5\u503C\u7684 timeLimit \u4F1A\u81EA\u52A8\u63D0\u5347\uFF0C\u907F\u514D\u65E0\u6548\u5224\u5B9A\u3002</div>
            </div>
            <div class="st-roll-row">
              <input id="${e.timeLimitMinId}" class="st-roll-input" type="number" min="1" step="1" />
            </div>
          </div>

          <div class="st-roll-tip st-roll-search-item" data-st-roll-search="event protocol prompt summary context">
            \u53D1\u9001\u524D\u4F1A\u81EA\u52A8\u6CE8\u5165\u89C4\u5219\u4E0E\u6458\u8981\uFF0C\u5E2E\u52A9 AI \u5728\u591A\u8F6E\u4E2D\u4FDD\u6301\u4E8B\u4EF6\u72B6\u6001\u4E00\u81F4\u3002
          </div>
        </div>

        <div id="${e.panelRuleId}" class="st-roll-panel" hidden>
          <div class="st-roll-divider">
            <i class="fa-solid fa-scroll"></i>
            <span>\u4E8B\u4EF6\u534F\u8BAE\u89C4\u5219</span>
            <div class="st-roll-divider-line"></div>
          </div>

          <div class="st-roll-textarea-wrap st-roll-search-item" data-st-roll-search="rule text save reset">
            <div class="st-roll-row" style="margin-bottom:8px;">
              <span class="st-roll-field-label">\u53EF\u624B\u52A8\u7F16\u8F91\u53D1\u9001\u7ED9 AI \u7684\u89C4\u5219\u6587\u672C</span>
              <div class="st-roll-actions">
                <button id="${e.ruleSaveId}" type="button" class="st-roll-btn">\u4FDD\u5B58\u89C4\u5219</button>
                <button id="${e.ruleResetId}" type="button" class="st-roll-btn secondary">\u6062\u590D\u9ED8\u8BA4</button>
              </div>
            </div>
            <textarea id="${e.ruleTextId}" class="st-roll-textarea" rows="12"></textarea>
          </div>

          <div class="st-roll-tip st-roll-search-item" data-st-roll-search="rolljson fields">
            \u5EFA\u8BAE\u4FDD\u7559\u5B57\u6BB5\u7EA6\u675F\uFF08id/title/checkDice/dc/skill/desc\uFF09\u548C rolljson \u4EE3\u7801\u5757\u89C4\u8303\uFF0C\u907F\u514D\u4E8B\u4EF6\u63D0\u53D6\u5931\u8D25\u3002
          </div>
        </div>

        <div id="${e.panelAboutId}" class="st-roll-panel" hidden>
          <div class="st-roll-divider">
            <i class="fa-solid fa-circle-info"></i>
            <span>\u5173\u4E8E\u63D2\u4EF6</span>
            <div class="st-roll-divider-line"></div>
          </div>

          <div class="st-roll-item st-roll-search-item" data-st-roll-search="about version author email github">
            <div class="st-roll-item-main">
              <div class="st-roll-item-title">\u9AB0\u5B50\u63D2\u4EF6 Event</div>
              <div class="st-roll-item-desc st-roll-about-meta">
                <span class="st-roll-about-meta-item">
                  <i class="fa-solid fa-tag"></i>
                  <span>\u7248\u672C\uFF1A${e.badgeText}</span>
                </span>
                <span class="st-roll-about-meta-item">
                  <i class="fa-solid fa-user"></i>
                  <span>\u4F5C\u8005\uFF1A${e.authorText}</span>
                </span>
                <span class="st-roll-about-meta-item">
                  <i class="fa-solid fa-envelope"></i>
                  <span>\u90AE\u7BB1\uFF1A<a href="mailto:${e.emailText}">${e.emailText}</a></span>
                </span>
                <span class="st-roll-about-meta-item">
                  <i class="fa-brands fa-github"></i>
                  <span>GitHub\uFF1A<a href="${e.githubUrl}" target="_blank" rel="noopener">${e.githubText}</a></span>
                </span>
              </div>
            </div>
          </div>

          <div class="st-roll-item st-roll-search-item" data-st-roll-search="command roll eventroll help">
            <div class="st-roll-item-main">
              <div class="st-roll-item-title">\u5E38\u7528\u547D\u4EE4</div>
              <div class="st-roll-item-desc">/roll 1d20 /eventroll list /eventroll roll &lt;id&gt;</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `}function Be(e){return`
    #${e} {
      margin-bottom: 5px;
      color: var(--SmartThemeBodyColor, inherit);
    }

    #${e} .st-roll-shell {
      border: 1px solid rgba(197, 160, 89, 0.35);
      border-radius: 12px;
      overflow: hidden;
      background:
        radial-gradient(120% 140% at 100% 0%, rgba(197, 160, 89, 0.12), transparent 55%),
        linear-gradient(160deg, rgba(31, 25, 25, 0.82), rgba(20, 18, 20, 0.82));
      backdrop-filter: blur(3px);
    }

    #${e} .st-roll-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      margin-bottom: 0 !important;
      padding: 10px 12px;
      cursor: pointer;
      user-select: none;
      transition: background-color 0.2s ease, box-shadow 0.2s ease;
    }

    #${e} .st-roll-head-title {
      display: flex;
      align-items: center;
      gap: 6px;
      font-weight: 700;
    }

    #${e} .st-roll-head-badge {
      color: #f06464;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.3px;
    }

    #${e} .st-roll-head .inline-drawer-icon {
      transition: transform 0.2s ease;
    }

    #${e} .st-roll-content {
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      padding: 10px;
      display: block;
    }

    #${e} .st-roll-filters {
      margin-bottom: 10px;
      gap: 8px;
    }

    #${e} .st-roll-search {
      min-height: 32px;
      transition: border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;
    }

    #${e} .st-roll-search-item.is-hidden-by-search {
      display: none !important;
    }

    #${e} .st-roll-tabs {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 4px;
      border: 1px solid rgba(255, 255, 255, 0.16);
      border-radius: 999px;
      margin-bottom: 10px;
      background: rgba(0, 0, 0, 0.2);
    }

    #${e} .st-roll-tab {
      flex: 1;
      border: 0;
      border-radius: 999px;
      background: transparent;
      color: inherit;
      padding: 6px 10px;
      font-size: 12px;
      line-height: 1.2;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      opacity: 0.75;
      transition:
        background-color 0.2s ease,
        opacity 0.2s ease,
        box-shadow 0.2s ease;
    }

    #${e} .st-roll-tab.is-active {
      opacity: 1;
      color: var(--SmartThemeQuoteTextColor, #fff);
      background: rgba(197, 160, 89, 0.58);
    }

    #${e} .st-roll-panel {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    #${e} .st-roll-panel[hidden] {
      display: none !important;
    }

    #${e} .st-roll-divider {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-top: 8px;
      margin-bottom: 6px;
      font-size: 13px;
      font-weight: 700;
      opacity: 0.95;
    }

    #${e} .st-roll-divider-line {
      flex: 1;
      height: 1px;
      background: linear-gradient(
        90deg,
        rgba(255, 255, 255, 0),
        rgba(255, 255, 255, 0.2) 18%,
        rgba(255, 255, 255, 0.26) 50%,
        rgba(255, 255, 255, 0.2) 82%,
        rgba(255, 255, 255, 0)
      );
    }

    #${e} .st-roll-item {
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 10px;
      padding: 12px;
      margin: 2px 0;
      background: rgba(0, 0, 0, 0.16);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      transition:
        border-color 0.2s ease,
        background-color 0.2s ease,
        box-shadow 0.2s ease;
    }

    #${e} .st-roll-item-main {
      min-width: 0;
      flex: 1;
    }

    #${e} .st-roll-item-title {
      font-size: 14px;
      font-weight: 700;
      margin-bottom: 3px;
    }

    #${e} .st-roll-item-desc {
      font-size: 12px;
      line-height: 1.45;
      opacity: 0.75;
    }

    #${e} .st-roll-about-meta {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 10px 24px;
    }

    #${e} .st-roll-about-meta-item {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      white-space: nowrap;
    }

    #${e} .st-roll-about-meta-item i {
      width: 14px;
      text-align: center;
      opacity: 0.86;
    }

    #${e} .st-roll-about-meta a {
      color: inherit;
      text-decoration: none;
      border-bottom: 1px dashed rgba(255, 255, 255, 0.22);
      transition: border-color 0.2s ease, text-shadow 0.2s ease;
    }

    #${e} .st-roll-about-meta a:hover {
      border-bottom-color: rgba(255, 255, 255, 0.5);
      text-shadow: 0 0 8px rgba(255, 255, 255, 0.22);
    }

    #${e} .st-roll-inline {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-shrink: 0;
    }

    #${e} .st-roll-row {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 10px;
    }

    #${e} .st-roll-field-label {
      font-size: 13px;
      opacity: 0.85;
      white-space: nowrap;
    }

    #${e} .st-roll-select,
    #${e} .st-roll-input,
    #${e} .st-roll-textarea {
      background: rgba(0, 0, 0, 0.28);
      color: inherit;
      border: 1px solid rgba(197, 160, 89, 0.36);
      border-radius: 8px;
      box-sizing: border-box;
      transition:
        border-color 0.2s ease,
        box-shadow 0.2s ease,
        background-color 0.2s ease;
    }

    #${e} .st-roll-select,
    #${e} .st-roll-input {
      padding: 4px 8px;
      min-height: 30px;
    }

    #${e} .st-roll-select {
      min-width: 182px;
      max-width: 100%;
      text-align: center;
      text-align-last: center;
      appearance: none;
      -webkit-appearance: none;
      -moz-appearance: none;
      padding-right: 32px;
      background-image:
        linear-gradient(45deg, transparent 50%, rgba(255, 255, 255, 0.75) 50%),
        linear-gradient(135deg, rgba(255, 255, 255, 0.75) 50%, transparent 50%),
        linear-gradient(to right, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.05));
      background-position:
        calc(100% - 16px) calc(50% - 1px),
        calc(100% - 11px) calc(50% - 1px),
        calc(100% - 30px) 50%;
      background-size: 6px 6px, 6px 6px, 1px 62%;
      background-repeat: no-repeat;
    }

    #${e} .st-roll-select option {
      text-align: left;
    }

    #${e} .st-roll-input {
      width: 120px;
    }

    #${e} .st-roll-item.is-disabled {
      opacity: 0.52;
    }

    #${e} .st-roll-actions {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }

    #${e} .st-roll-btn {
      cursor: pointer;
      padding: 4px 10px;
      border-radius: 7px;
      border: 1px solid rgba(197, 160, 89, 0.45);
      background: rgba(197, 160, 89, 0.14);
      color: inherit;
      font-size: 12px;
      transition:
        border-color 0.2s ease,
        background-color 0.2s ease,
        box-shadow 0.2s ease;
    }

    #${e} .st-roll-btn.secondary {
      border-color: rgba(255, 255, 255, 0.2);
      background: rgba(255, 255, 255, 0.08);
    }

    #${e} .st-roll-textarea-wrap {
      border: 1px solid rgba(255, 255, 255, 0.18);
      border-radius: 10px;
      background: rgba(0, 0, 0, 0.15);
      padding: 10px;
      transition: border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;
    }

    #${e} .st-roll-textarea {
      width: 100%;
      resize: vertical;
      padding: 8px;
      font-size: 12px;
      line-height: 1.5;
      min-height: 220px;
    }

    #${e} .st-roll-tip {
      font-size: 12px;
      line-height: 1.5;
      opacity: 0.78;
      padding-top: 4px;
    }

    #${e} input[type="checkbox"] {
      accent-color: rgba(197, 160, 89, 0.92);
      transition: filter 0.2s ease;
    }

    #${e} .st-roll-head:hover {
      background: rgba(255, 255, 255, 0.04);
      box-shadow: inset 0 -1px 0 rgba(255, 255, 255, 0.08);
    }

    #${e} .st-roll-tab:hover {
      opacity: 1;
      background: rgba(197, 160, 89, 0.2);
      box-shadow: 0 0 12px rgba(197, 160, 89, 0.2);
    }

    #${e} .st-roll-item:hover {
      border-color: rgba(197, 160, 89, 0.48);
      background: rgba(0, 0, 0, 0.24);
      box-shadow:
        0 0 0 1px rgba(197, 160, 89, 0.2),
        0 0 16px rgba(197, 160, 89, 0.16);
    }

    #${e} .st-roll-select:hover,
    #${e} .st-roll-input:hover,
    #${e} .st-roll-search:hover,
    #${e} .st-roll-textarea:hover {
      border-color: rgba(197, 160, 89, 0.58);
      background-color: rgba(0, 0, 0, 0.34);
      box-shadow: 0 0 0 1px rgba(197, 160, 89, 0.18);
    }

    #${e} .st-roll-textarea-wrap:hover {
      border-color: rgba(197, 160, 89, 0.45);
      box-shadow: 0 10px 22px rgba(0, 0, 0, 0.2);
    }

    #${e} .st-roll-btn:hover {
      border-color: rgba(197, 160, 89, 0.68);
      background: rgba(197, 160, 89, 0.24);
      box-shadow:
        inset 0 0 0 1px rgba(197, 160, 89, 0.26),
        0 0 14px rgba(197, 160, 89, 0.2);
    }

    #${e} .st-roll-select:focus,
    #${e} .st-roll-input:focus,
    #${e} .st-roll-search:focus,
    #${e} .st-roll-textarea:focus {
      outline: none;
      border-color: rgba(197, 160, 89, 0.72);
      box-shadow: 0 0 0 2px rgba(197, 160, 89, 0.22);
    }
  `}function gn(e){return e===0?"0":e>0?`+${e}`:`${e}`}function J(e,t,n,o=56){if(t===6){let r=({1:[[24,24]],2:[[14,14],[34,34]],3:[[14,14],[24,24],[34,34]],4:[[14,14],[14,34],[34,14],[34,34]],5:[[14,14],[14,34],[24,24],[34,14],[34,34]],6:[[14,14],[14,24],[14,34],[34,14],[34,24],[34,34]]}[e]||[]).map(([c,a])=>`<circle cx="${c}" cy="${a}" r="4" fill="${n}" />`).join("");return`
      <svg width="${o}" height="${o}" viewBox="0 0 48 48" style="display:inline-block; vertical-align: middle;">
          <rect x="4" y="4" width="40" height="40" rx="8" ry="8" fill="none" stroke="${n}" stroke-width="3" />
          ${r}
      </svg>`}return`
      <svg width="${o}" height="${o}" viewBox="0 0 48 48" style="display:inline-block; vertical-align: middle;">
          <path d="M24 4 L43 14 L43 34 L24 44 L5 34 L5 14 Z" fill="none" stroke="${n}" stroke-width="3" />
          <path d="M24 4 L24 24 M24 24 L43 34 M24 24 L5 34" stroke="${n}" stroke-width="1.5" opacity="0.6"/>
          <text x="24" y="33" font-size="18" text-anchor="middle" fill="${n}" font-weight="bold" style="font-family: sans-serif;">${e}</text>
      </svg>`}function se(e,t=52){let n=Math.round(t/2),o=Math.max(20,Math.round(t*.42));return`
    <div class="cube-scene" style="perspective: 600px; width: ${t}px; height: ${t}px;">
      <div class="cube" style="
        width: 100%; height: 100%; position: relative; transform-style: preserve-3d;
      ">
        <div class="cube-face front"  style="position: absolute; width: ${t}px; height: ${t}px; border: 2px solid ${e}; background: rgba(43, 29, 29, 0.8); color: ${e}; line-height: ${t}px; text-align: center; font-weight: bold; font-size: ${o}px; transform: rotateY(  0deg) translateZ(${n}px);">?</div>
        <div class="cube-face back"   style="position: absolute; width: ${t}px; height: ${t}px; border: 2px solid ${e}; background: rgba(43, 29, 29, 0.8); color: ${e}; line-height: ${t}px; text-align: center; font-weight: bold; font-size: ${o}px; transform: rotateY(180deg) translateZ(${n}px);">?</div>
        <div class="cube-face right"  style="position: absolute; width: ${t}px; height: ${t}px; border: 2px solid ${e}; background: rgba(43, 29, 29, 0.8); color: ${e}; line-height: ${t}px; text-align: center; font-weight: bold; font-size: ${o}px; transform: rotateY( 90deg) translateZ(${n}px);">?</div>
        <div class="cube-face left"   style="position: absolute; width: ${t}px; height: ${t}px; border: 2px solid ${e}; background: rgba(43, 29, 29, 0.8); color: ${e}; line-height: ${t}px; text-align: center; font-weight: bold; font-size: ${o}px; transform: rotateY(-90deg) translateZ(${n}px);">?</div>
        <div class="cube-face top"    style="position: absolute; width: ${t}px; height: ${t}px; border: 2px solid ${e}; background: rgba(43, 29, 29, 0.8); color: ${e}; line-height: ${t}px; text-align: center; font-weight: bold; font-size: ${o}px; transform: rotateX( 90deg) translateZ(${n}px);">?</div>
        <div class="cube-face bottom" style="position: absolute; width: ${t}px; height: ${t}px; border: 2px solid ${e}; background: rgba(43, 29, 29, 0.8); color: ${e}; line-height: ${t}px; text-align: center; font-weight: bold; font-size: ${o}px; transform: rotateX(-90deg) translateZ(${n}px);">?</div>
      </div>
    </div>
  `}function Oe(e){let t=gn(e.modifier),n=e.rolls.join(", "),o=e.modifier!==0,s="d"+Math.random().toString(36).substr(2,9),i={border:"#c5a059",bg:"linear-gradient(135deg, #2b1d1d 0%, #1a1010 100%)",headerBg:"rgba(0, 0, 0, 0.4)",textMain:"#e8dcb5",textHighlight:"#ffdb78",critSuccess:"#4caf50",critFail:"#f44336"},l="normal",d="",r=i.textHighlight,c="0 2px 4px rgba(0,0,0,0.5)",a=i.bg,u=i.border;if(e.count===1){let h=e.rolls[0],I=e.sides;h===I?(l="success",d="\u5927\u6210\u529F!",r=i.critSuccess,c="0 0 15px rgba(76, 175, 80, 0.8)",a="linear-gradient(135deg, #1b3320 0%, #0d1a10 100%)",u=i.critSuccess):h===1&&(l="fail",d="\u5927\u5931\u8D25!",r=i.critFail,c="0 0 15px rgba(244, 67, 54, 0.8)",a="linear-gradient(135deg, #331b1b 0%, #1a0d0d 100%)",u=i.critFail)}let p=e.rolls.length<=5?e.rolls.map(h=>J(h,e.sides,r)).join(" "):J(0,e.sides,r),v=se(i.textHighlight),x=[];e.rolls.length&&x.push(`\u9AB0\u5B50: [${n}]`),o&&x.push(`\u4FEE\u6B63\u503C: ${t}`),e.exploding&&x.push(e.explosionTriggered?"\u{1F525} \u7206\u9AB0\u89E6\u53D1":"\u{1F525} \u7206\u9AB0\u5F85\u89E6\u53D1");let E=x.join(" | ");return`
  <style>
    @keyframes spin-3d-${s} {
      0% { transform: rotateX(0deg) rotateY(0deg); }
      100% { transform: rotateX(360deg) rotateY(360deg); }
    }
    @keyframes fade-out-${s} {
      0% { opacity: 1; }
      90% { opacity: 0; }
      100% { opacity: 0; display: none; }
    }
    @keyframes fade-in-${s} {
      0% { opacity: 0; transform: scale(0.8); }
      100% { opacity: 1; transform: scale(1); }
    }
    @keyframes pulse-crit-${s} {
      0% { transform: scale(1); }
      50% { transform: scale(1.1); }
      100% { transform: scale(1); }
    }
    @keyframes shake-crit-${s} {
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
    
    .dice-wrapper-${s} {
      position: relative;
      min-height: 100px;
      padding: 16px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    
    .dice-rolling-${s} {
      position: absolute;
      top: 50%; left: 50%;
      transform: translate(-50%, -50%);
      animation: fade-out-${s} 0.2s forwards 1.2s;
      z-index: 10;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    
    .dice-rolling-${s} .cube {
      animation: spin-3d-${s} 1.5s linear infinite;
    }

    .dice-result-${s} {
      opacity: 0;
      animation: fade-in-${s} 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards 1.3s;
      text-align: center;
      width: 100%;
    }

    .crit-success-${s} {
      animation: pulse-crit-${s} 1s infinite;
      color: ${i.critSuccess};
      font-weight: bold;
      margin-bottom: 8px;
      text-shadow: 0 0 10px rgba(76, 175, 80, 0.5);
    }

    .crit-fail-${s} {
      animation: shake-crit-${s} 0.5s;
      color: ${i.critFail};
      font-weight: bold;
      margin-bottom: 8px;
      text-shadow: 0 0 10px rgba(244, 67, 54, 0.5);
    }

    .explosion-note-${s} {
      color: #ffae42;
      font-weight: bold;
      margin-bottom: 8px;
      letter-spacing: 1px;
      text-shadow: 0 0 12px rgba(255, 174, 66, 0.6);
    }
  </style>
  
  <div style="
    border: 2px solid ${u};
    border-radius: 4px;
    background: ${a};
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5), inset 0 0 30px rgba(0,0,0,0.6);
    font-family: 'Georgia', 'Times New Roman', serif;
    overflow: hidden;
    margin: 8px 0;
    width: 100%;
    box-sizing: border-box;
    color: ${i.textMain};
    position: relative;
  ">
    <div style="position: absolute; top: 0; left: 0; width: 6px; height: 6px; border-top: 2px solid ${i.border}; border-left: 2px solid ${i.border};"></div>
    <div style="position: absolute; top: 0; right: 0; width: 6px; height: 6px; border-top: 2px solid ${i.border}; border-right: 2px solid ${i.border};"></div>
    <div style="position: absolute; bottom: 0; left: 0; width: 6px; height: 6px; border-bottom: 2px solid ${i.border}; border-left: 2px solid ${i.border};"></div>
    <div style="position: absolute; bottom: 0; right: 0; width: 6px; height: 6px; border-bottom: 2px solid ${i.border}; border-right: 2px solid ${i.border};"></div>

    <div style="
        background-color: ${i.headerBg};
        padding: 8px 12px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid rgba(197, 160, 89, 0.3);
        font-size: 0.9em;
        letter-spacing: 1px;
        text-transform: uppercase;
    ">
        <span style="display: flex; align-items: center; gap: 8px; color: ${i.textHighlight};">
            <span style="font-weight: bold;">\u9AB0\u5B50\u7CFB\u7EDF</span>
        </span>
        <span style="
            font-family: monospace;
            color: ${i.textMain};
            background: rgba(0,0,0,0.3);
            padding: 2px 8px;
            border: 1px solid rgba(197, 160, 89, 0.2);
            border-radius: 2px;
            font-size: 0.9em;
        ">${e.expr}</span>
    </div>

    <div class="dice-wrapper-${s}">
        <div class="dice-rolling-${s}">
            ${v}
        </div>

        <div class="dice-result-${s}">
            ${d?`<div class="${l==="success"?`crit-success-${s}`:`crit-fail-${s}`}">${d}</div>`:""}
          ${e.exploding?`<div class="explosion-note-${s}">${e.explosionTriggered?"\u{1F525} \u8FDE\u9501\u7206\u9AB0\uFF01":"\u{1F525} \u7206\u9AB0\u5DF2\u5F00\u542F"}</div>`:""}
            
            <div style="margin-bottom: 12px; display: flex; justify-content: center; gap: 8px; flex-wrap: wrap;">
                ${p}
            </div>

            <div style="
                font-size: 2.5em;
                font-weight: bold;
                color: ${r};
                text-shadow: ${c};
                line-height: 1;
            ">
                ${e.total}
            </div>
            
            <div style="
                font-size: 0.9em;
                color: ${i.textMain};
                margin-top: 8px;
                opacity: 0.8;
            ">
              ${E}
            </div>
        </div>

    </div>
  </div>
  `}function Ne(e){let t=e.compactMode===!0,n=t?"92px":"108px",o=t?"8px 0":"14px 0",s=t?"0":"12px",i=t?"auto":"100%";return`
    <style>
      @keyframes spin-3d-${e.uniqueId} {
        0% { transform: rotateX(0deg) rotateY(0deg); }
        100% { transform: rotateX(360deg) rotateY(360deg); }
      }
      @keyframes fade-out-${e.uniqueId} {
        0% { opacity: 1; }
        90% { opacity: 0; }
        100% { opacity: 0; display: none; }
      }
      @keyframes fade-in-${e.uniqueId} {
        0% { opacity: 0; transform: scale(0.8); }
        100% { opacity: 1; transform: scale(1); }
      }
      @keyframes pulse-crit-${e.uniqueId} {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
      }
      @keyframes shake-crit-${e.uniqueId} {
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
      
      .dice-wrapper-${e.uniqueId} {
        position: relative;
        min-height: ${n};
        padding: ${o};
        margin-top: ${s};
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
      
      .dice-rolling-${e.uniqueId} {
        position: absolute;
        top: 50%; left: 50%;
        transform: translate(-50%, -50%);
        animation: fade-out-${e.uniqueId} 0.2s forwards 1.2s;
        z-index: 10;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      
      .dice-rolling-${e.uniqueId} .cube {
        animation: spin-3d-${e.uniqueId} 1.5s linear infinite;
      }

      .dice-result-${e.uniqueId} {
        opacity: 0;
        animation: fade-in-${e.uniqueId} 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards 1.3s;
        text-align: center;
        width: ${i};
      }

      .crit-success-${e.uniqueId} {
        animation: pulse-crit-${e.uniqueId} 1s infinite;
        color: #52c41a;
        font-weight: bold;
        margin-bottom: 8px;
        text-shadow: 0 0 10px rgba(82, 196, 26, 0.5);
      }

      .crit-fail-${e.uniqueId} {
        animation: shake-crit-${e.uniqueId} 0.5s;
        color: #ff4d4f;
        font-weight: bold;
        margin-bottom: 8px;
        text-shadow: 0 0 10px rgba(255, 77, 79, 0.5);
      }
    </style>
    
    <div class="dice-wrapper-${e.uniqueId}">
        <div class="dice-rolling-${e.uniqueId}">
            ${e.rollingVisualHtml}
        </div>

        <div class="dice-result-${e.uniqueId}">
            ${e.critText?`<div class="${e.critType==="success"?`crit-success-${e.uniqueId}`:`crit-fail-${e.uniqueId}`}">${e.critText}</div>`:""}
             
            <div style="margin-bottom: 8px; display: flex; justify-content: center; gap: 8px; flex-wrap: wrap;">
                ${e.diceVisualsHtml}
            </div>
        </div>
    </div>
    `}function Pe(){return`
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
    `}function Ue(){return`
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
  </div>`}function je(e){return`<pre>${e}</pre>`}function ze(e){return`Dice DEBUG mode
<pre>${e}</pre>`}function Ge(e,t){return`<div style="margin-top:10px;padding:8px;border:1px solid rgba(82, 196, 26, 0.3);background:rgba(20, 35, 20, 0.6);font-size:12px;color:#a0d9a0;text-align:center;letter-spacing:0.5px;">
            ${e} \u5DF2\u7ED3\u7B97\uFF1A${t}
          </div>`}function Ve(e){return e?"<span style='color:#ff4d4f;font-weight:bold;'>[\xD7]</span>":"<span style='color:#52c41a;font-weight:bold;'>[\u2713]</span>"}function Fe(e){return`<button type="button" data-dice-event-roll="1" data-round-id="${e.roundIdAttr}" data-dice-event-id="${e.eventIdAttr}" data-dice-expr="${e.diceExprAttr}" ${e.buttonDisabledAttr} style="border:1px solid #c5a059;background:linear-gradient(135deg,#3a2515,#1a100a);color:#ffdfa3;padding:6px 16px;font-family:'Georgia', serif;font-weight:bold;font-size:12px;letter-spacing:1px;text-transform:uppercase;transition:all 0.2s;box-shadow:0 2px 4px rgba(0,0,0,0.5);${e.buttonStateStyle}">
            \u6267\u884C\u68C0\u5B9A
          </button>`}function qe(e){return`
      <li style="position:relative;list-style:none;margin-bottom:16px;border:1px solid rgba(197,160,89,0.3);border-left:3px solid #c5a059;padding:14px;background:linear-gradient(135deg, rgba(30,20,18,0.8), rgba(15,10,10,0.9));box-shadow: 0 4px 6px rgba(0,0,0,0.3);">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:10px;">
          <div style="font-weight:bold;color:#ffdfa3;font-size:15px;font-family:'Georgia', serif;letter-spacing:1px;">
            \u25C6 ${e.titleHtml}
          </div>
          <div style="font-size:11px;font-family:monospace;color:#8c7b60;background:rgba(0,0,0,0.5);border:1px solid rgba(197,160,89,0.2);padding:2px 6px;">
            ID:${e.eventIdHtml}
          </div>
        </div>

        <div style="font-size:13px;line-height:1.6;color:#d1c5a5;opacity:0.9;margin-bottom:12px;">
          ${e.descHtml}
        </div>

        ${e.outcomePreviewHtml}

        <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:12px;justify-content:center;text-align:center;">
          <span style="font-size:11px;padding:3px 8px;border:1px solid rgba(150,150,150,0.2);background:rgba(255,255,255,0.05);color:#d1c5a5;text-transform:uppercase;">\u6280\u80FD <span style="color:#fff;">${e.skillHtml}</span></span>
          <span style="font-size:11px;padding:3px 8px;border:1px solid rgba(150,150,150,0.2);background:rgba(255,255,255,0.05);color:#d1c5a5;text-transform:uppercase;">\u9AB0\u5F0F <span style="color:#ffdfa3;">${e.checkDiceHtml}</span></span>
          <span style="font-size:11px;padding:3px 8px;border:1px solid rgba(150,150,150,0.2);background:rgba(255,255,255,0.05);color:#d1c5a5;text-transform:uppercase;">\u5224\u5B9A <span style="color:#ffbbbb;">${e.compareHtml} ${e.dcText}</span></span>
          <span style="font-size:11px;padding:3px 8px;border:1px solid rgba(150,150,150,0.2);background:rgba(255,255,255,0.05);color:#d1c5a5;text-transform:uppercase;">\u65F6\u9650 <span style="color:#a0d9a0;">${e.timeLimitHtml}</span></span>
        </div>

        <div data-dice-countdown="1" data-round-id="${e.roundIdAttr}" data-event-id="${e.eventIdAttr}" data-deadline-at="${e.deadlineAttr}" style="display:inline-block;padding:4px 10px;font-size:11px;font-family:monospace;border:${e.runtimeBorder};background:${e.runtimeBackground};color:${e.runtimeColor};letter-spacing:1px;margin-bottom:4px;">
          STATUS: ${e.runtimeTextHtml}
        </div>

        ${e.rolledBlockHtml}

        <div style="margin-top:14px;display:flex;align-items:center;justify-content:space-between;border-top:1px dashed rgba(197,160,89,0.2);padding-top:12px;">
          <code style="font-size:11px;color:#8c7b60;background:none;padding:0;">${e.commandTextHtml}</code>
          ${e.rollButtonHtml}
        </div>
      </li>`}function Ye(e,t){return`
  <div style="border:1px solid #8c7b60;background:linear-gradient(145deg,#1c1412 0%,#0d0806 100%);padding:16px;color:#d1c5a5;box-shadow:0 8px 24px rgba(0,0,0,0.4), inset 0 0 30px rgba(0,0,0,0.6);font-family:sans-serif;">
    <div style="display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:16px;border-bottom:1px solid #4a3b2c;padding-bottom:10px;">
      <strong style="color:#e8dcb5;font-size:16px;font-family:'Georgia', serif;letter-spacing:2px;">\u2756 \u672C\u8F6E\u53EF\u7528\u4E8B\u4EF6 \u2756</strong>
      <span style="font-size:11px;color:#6b5a45;font-family:monospace;">ROUND: ${e}</span>
    </div>
    <ul style="padding:0;margin:0;">${t}</ul>
  </div>`}function Xe(e){return`
  <div style="border:1px solid #8c7b60;background:linear-gradient(145deg,#1c1412 0%,#0d0806 100%);padding:16px;color:#d1c5a5;box-shadow:0 8px 24px rgba(0,0,0,0.4), inset 0 0 30px rgba(0,0,0,0.6);">
    <div style="display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:14px;border-bottom:1px solid #4a3b2c;padding-bottom:10px;">
      <strong style="color:#e8dcb5;font-size:15px;font-family:'Georgia', serif;letter-spacing:1px;">\u2756 \u68C0\u5B9A\u7ED3\u7B97\u62A5\u544A \u2756</strong>
      <span style="font-size:11px;color:#6b5a45;font-family:monospace;">${e.rollIdHtml}</span>
    </div>

    <div style="margin-bottom:12px;font-weight:bold;font-size:16px;color:#ffdfa3;font-family:'Georgia', serif;">
      ${e.titleHtml}
    </div>

    <div style="display:grid;grid-template-columns:auto 1fr;gap:6px 12px;font-size:12px;line-height:1.4;opacity:0.9;background:rgba(0,0,0,0.3);padding:10px;border:1px solid rgba(197,160,89,0.15);">
      <div style="color:#8c7b60;text-align:right;">\u4E8B\u4EF6 ID</div>
      <div style="font-family:monospace;">${e.eventIdHtml}</div>

      <div style="color:#8c7b60;text-align:right;">\u5224\u5B9A\u6765\u6E90</div>
      <div>${e.sourceHtml}</div>

      <div style="color:#8c7b60;text-align:right;">\u68C0\u5B9A\u6280\u80FD</div>
      <div style="color:#fff;">${e.skillHtml}</div>

      <div style="color:#8c7b60;text-align:right;">\u68C0\u5B9A\u65B9\u5F0F</div>
      <div style="font-family:monospace;color:#ffdfa3;">${e.diceExprHtml}</div>

      <div style="color:#8c7b60;text-align:right;">\u539F\u59CB\u70B9\u6570</div>
      <div style="font-family:monospace;">${e.rollsSummaryHtml}</div>
    </div>

    <div style="margin-top:16px;display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:12px;background:linear-gradient(90deg, rgba(0,0,0,0.4), rgba(0,0,0,0.1));padding:12px;border-left:3px solid ${e.statusColor};">
      <div style="justify-self:start;">
        <div style="font-size:11px;color:#8c7b60;letter-spacing:1px;text-transform:uppercase;margin-bottom:4px;">\u7ED3\u679C\u6458\u8981</div>
      </div>
      <div style="justify-self:center;display:flex;align-items:center;justify-content:center;">
        ${e.diceVisualBlockHtml}
      </div>
      <div style="justify-self:end;text-align:right;">
        <div style="font-size:11px;color:#8c7b60;letter-spacing:1px;text-transform:uppercase;margin-bottom:4px;">\u7CFB\u7EDF\u5224\u5B9A</div>
        <div style="font-size:13px;font-family:monospace;margin-bottom:2px;">\u6761\u4EF6: ${e.compareHtml} ${e.dcText}</div>
        <div style="font-weight:bold;font-size:16px;color:${e.statusColor};letter-spacing:1px;">[ ${e.statusText} ]</div>
      </div>
    </div>

    <div style="margin-top:10px;padding:10px;border:1px solid rgba(197,160,89,0.2);background:rgba(0,0,0,0.25);">
      <div style="font-size:11px;color:#8c7b60;letter-spacing:1px;text-transform:uppercase;margin-bottom:6px;">${e.outcomeLabelHtml}</div>
      <div style="font-size:13px;line-height:1.6;color:#e8dcb5;">${e.outcomeTextHtml}</div>
    </div>

    <div style="margin-top:12px;font-size:11px;color:#6b5a45;text-align:right;font-family:monospace;">
      TIME LIMIT: ${e.timeLimitHtml}
    </div>
  </div>`}function Ke(e,t){return`[${e}] <span style="color:#8c7b60;">|</span> \u4FEE\u6B63 ${t}`}function Je(e){return`
  <div style="border:1px solid #5a4b3c;background:linear-gradient(135deg,#241c18 0%,#171210 100%);padding:14px;color:#b3a58b;box-shadow:inset 0 0 20px rgba(0,0,0,0.5);">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;border-bottom:1px dashed #4a3b2c;padding-bottom:8px;">
      <strong style="color:#d1c5a5;font-size:14px;letter-spacing:1px;">${e.titleTextHtml}</strong>
      <span style="font-size:11px;opacity:0.6;font-family:monospace;">${e.rollIdHtml}</span>
    </div>

    <div style="font-size:13px;line-height:1.6;display:flex;flex-direction:column;gap:4px;">
      <div><span style="color:#8c7b60;">\u76EE\u6807\u4E8B\u4EF6\uFF1A</span> <strong style="color:#d1c5a5;">${e.eventTitleHtml}</strong> <code style="font-size:11px;color:#6b5a45;">(${e.eventIdHtml})</code></div>
      <div><span style="color:#8c7b60;">\u5224\u5B9A\u6765\u6E90\uFF1A</span> ${e.sourceTextHtml}</div>

      <div style="display:flex;align-items:center;gap:8px;margin-top:4px;padding-top:4px;border-top:1px solid rgba(0,0,0,0.3);">
        <span style="color:#8c7b60;">\u5224\u5B9A\u6761\u4EF6\uFF1A</span>
        <span style="font-size:12px;color:#d1c5a5;font-family:monospace;">${e.compareHtml} ${e.dcText}</span>
        <span style="margin-left:auto;color:${e.statusColor};font-weight:bold;border:1px solid ${e.statusColor};padding:2px 6px;font-size:11px;border-radius:2px;">
          ${e.statusText}
        </span>
      </div>

      ${e.diceVisualBlockHtml}
      ${e.distributionBlockHtml}
      <div style="margin-top:8px;padding:8px;border:1px solid rgba(140,123,96,0.3);background:rgba(0,0,0,0.25);">
        <div style="font-size:11px;color:#8c7b60;letter-spacing:1px;text-transform:uppercase;margin-bottom:4px;">${e.outcomeLabelHtml}</div>
        <div style="font-size:12px;line-height:1.6;color:#d1c5a5;">${e.outcomeTextHtml}</div>
      </div>
      ${e.timeoutBlockHtml}
    </div>
  </div>`}function We(e,t){return`
      <div style="font-size:11px;color:#6b5a45;margin-top:6px;text-align:center;background:rgba(0,0,0,0.3);padding:4px;border-radius:4px;">
        <span style="color:#8c7b60;">\u70B9\u6570\u5206\u5E03\uFF1A</span> [${e}] <span style="color:#8c7b60;margin:0 4px;">|</span> <span style="color:#8c7b60;">\u4FEE\u6B63</span> ${t}
      </div>
      `}function Ze(e){return`<div style="font-size:11px;color:#8c7b60;margin-top:6px;font-family:monospace;text-align:right;">\u622A\u6B62\u4E8E ${e}</div>`}function $t(e){return e===0?"0":e>0?`+${e}`:`${e}`}function Qe(e,t,n,o){return J(e,t,n,o)}function fn(e,t){return se(e,t)}function vn(e){return Oe(e)}var bn=SillyTavern.getContext(),{chatMetadata:le,saveMetadata:xn,registerMacro:et,SlashCommandParser:z,SlashCommand:G,SlashCommandArgument:Z,SlashCommandNamedArgument:Fo,ARGUMENT_TYPE:Q,sendSystemMessage:tt,extensionSettings:En,saveSettingsDebounced:yn,eventSource:hn,event_types:Tn}=bn,nt=1e3,ot=1e3,it=1e4;function Re(e){let t=e.replace(/\s+/g,""),n=/^(\d*)d(\d+)(!)?([+\-]\d+)?$/i,o=t.match(n);if(!o)throw new Error(`\u65E0\u6548\u7684\u9AB0\u5B50\u8868\u8FBE\u5F0F\uFF1A${e}\uFF0C\u793A\u4F8B\uFF1A1d20\u30013d6+2`);let s=Number(o[1]||1),i=Number(o[2]),l=!!o[3],d=Number(o[4]||0);if(s>nt)throw new Error(`\u9AB0\u5B50\u6570\u91CF\u8FC7\u5927\uFF08${s}\uFF09\uFF0C\u4E0A\u9650\u4E3A ${nt}`);if(i>ot)throw new Error(`\u9AB0\u5B50\u9762\u6570\u8FC7\u5927\uFF08${i}\uFF09\uFF0C\u4E0A\u9650\u4E3A ${ot}`);return{count:s,sides:i,modifier:d,explode:l}}function st(e){let t=Math.floor(e);if(typeof crypto<"u"&&typeof crypto.getRandomValues=="function"){let n=new Uint32Array(1),o=Math.floor(4294967295/t)*t,s;do crypto.getRandomValues(n),s=n[0];while(s>=o);return s%t+1}return Math.floor(Math.random()*t)+1}function Sn(e,t,n){let o=st(e);if(n.push(o),!!t)for(;o===e;){if(n.length>=it)throw new Error(`\u7206\u9AB0\u6B21\u6570\u8FC7\u591A\uFF0C\u5DF2\u8D85\u8FC7\u5B89\u5168\u4E0A\u9650 ${it} \u6B21\uFF0C\u8BF7\u8C03\u6574\u8868\u8FBE\u5F0F\u3002`);o=st(e),n.push(o)}}function q(e){let{count:t,sides:n,modifier:o,explode:s}=Re(e),i=y(),l=s&&i.enableExplodingDice,d=[];for(let u=0;u<t;u++)Sn(n,l,d);let r=d.reduce((u,m)=>u+m,0),c=r+o,a=l&&d.length>t;return{expr:e,count:t,sides:n,modifier:o,rolls:d,rawTotal:r,total:c,exploding:l,explosionTriggered:a}}function _e(e,t={}){let n=q(e);if(t.adv){let o=q(e),s=q(e);n=o.total>=s.total?o:s}if(t.dis){let o=q(e),s=q(e);n=o.total<=s.total?o:s}return t.rule,n}function $(e){if(typeof tt=="function")try{tt("generic",e,{uses_system_ui:!0,isSmallSys:!0});return}catch(t){console.error("[\u9AB0\u5B50\u63D2\u4EF6] \u53D1\u9001\u5230\u804A\u5929\u6846\u5931\u8D25:",t)}return e}function ee(){return le.diceRoller||(le.diceRoller={}),le.diceRoller}function Me(e){let t=ee();t.last=e,t.lastTotal=e.total,xn()}function $n(){let e=globalThis;e.__stRollBaseMacrosRegisteredEvent||(et("lastRollTotal",()=>{let t=ee();return t.lastTotal==null?"\u5C1A\u672A\u63B7\u9AB0\uFF0C\u8BF7\u5148\u4F7F\u7528 /roll":String(t.lastTotal)}),et("lastRoll",()=>{let t=ee();return t.last?JSON.stringify(t.last,null,2):"\u5C1A\u672A\u63B7\u9AB0\uFF0C\u8BF7\u5148\u4F7F\u7528 /roll"}),e.__stRollBaseMacrosRegisteredEvent=!0),!e.__stRollBaseCommandRegisteredEvent&&(!z||!G||!Z||!Q||(z.addCommandObject(G.fromProps({name:"roll",aliases:["dice"],returns:"\u901A\u7528\u9AB0\u5B50\uFF1A\u652F\u6301 NdM+X\uFF0C\u5982 3d6+2\u30011d20",namedArgumentList:[],unnamedArgumentList:[Z.fromProps({description:"\u9AB0\u5B50\u8868\u8FBE\u5F0F\uFF08\u4F8B\u5982 1d20\u30013d6+2\uFF09\u3002\u7559\u7A7A\u5219\u7B49\u4E8E 1d20\u3002",typeList:Q.STRING,isRequired:!1})],helpString:Pe(),callback:(t,n)=>{try{let s=(n??"").toString().trim()||"1d20",i=_e(s);Me(i);let l=vn(i);return $(l)??""}catch(o){let s=`\u274C \u63B7\u9AB0\u51FA\u9519\uFF1A${o?.message??String(o)}`;return $(s)??""}}})),e.__stRollBaseCommandRegisteredEvent=!0))}var W="SillyTavern-Roll",B="st-roll-settings-Event-card",lt="st-roll-settings-Event-style",It="st-roll-settings-Event-badge",ce="st-roll-settings-Event-enabled",de="st-roll-settings-Event-auto-rule",ue="st-roll-settings-Event-ai-roll-mode",me="st-roll-settings-Event-exploding-enabled",pe="st-roll-settings-Event-summary-detail",ge="st-roll-settings-Event-summary-rounds",fe="st-roll-settings-Event-apply-scope",ve="st-roll-settings-Event-outcome-branches",be="st-roll-settings-Event-explode-outcome",xe="st-roll-settings-Event-summary-outcome",Ee="st-roll-settings-Event-list-outcome-preview",ye="st-roll-settings-Event-time-limit-enabled",he="st-roll-settings-Event-time-limit-min-seconds",Rt="st-roll-settings-Event-time-limit-row",Te="st-roll-settings-Event-rule-text",rt="st-roll-settings-Event-rule-save",at="st-roll-settings-Event-rule-reset",ct="st-roll-settings-Event-search",dt="st-roll-settings-Event-tab-main",ut="st-roll-settings-Event-tab-rule",mt="st-roll-settings-Event-tab-about",pt="st-roll-settings-Event-panel-main",gt="st-roll-settings-Event-panel-rule",ft="st-roll-settings-Event-panel-about",L=F,_t=typeof F.version=="string"&&F.version.trim().length>0?F.version.trim():"unknown",In=typeof L.author=="string"&&L.author.trim().length>0?L.author.trim():"Shion",Rn=typeof L.email=="string"&&L.email.trim().length>0?L.email.trim():"348591466@qq.com",Mt=typeof L.homepage=="string"&&/^https?:\/\//i.test(L.homepage.trim())?L.homepage.trim():"https://github.com/ShionCox/SillyTavern-Roll",_n=Mt.replace(/^https?:\/\//i,""),Mn="[DICE_EVENT_RULES]",An="[/DICE_EVENT_RULES]",kn="[DICE_ROUND_SUMMARY]",Ln="[/DICE_ROUND_SUMMARY]",re=20,wn=60,Ae=1,ke=10,vt=20,bt=400,Dn=/^P(?=\d|T\d)(\d+Y)?(\d+M)?(\d+W)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+S)?)?$/i,O=`\u4F60\u5FC5\u987B\u4E25\u683C\u9075\u5FAA\u4EE5\u4E0B\u9AB0\u5B50\u4E8B\u4EF6\u534F\u8BAE\uFF1A
1. \u5F53\u9700\u8981\u89E6\u53D1\u63B7\u9AB0\u4E8B\u4EF6\u65F6\uFF0C\u53EA\u5728\u56DE\u590D\u672B\u5C3E\u8F93\u51FA\u4E00\u4E2A \`\`\`rolljson \u4EE3\u7801\u5757\u3002
2. \u7981\u6B62\u4F7F\u7528 \`\`\`json \u6216\u5176\u4ED6\u8BED\u8A00\u6807\u7B7E\uFF1B\u5FC5\u987B\u662F \`\`\`rolljson\u3002
3. \u9876\u5C42\u7ED3\u6784\u56FA\u5B9A\u4E3A\uFF1A
{"type":"dice_events","version":"1","events":[...]}
4. events[i] \u5FC5\u586B\u5B57\u6BB5\u4E0E\u7C7B\u578B\uFF1A
- id: string
- title: string
- checkDice: string\uFF08\u4F8B\u5982 "1d100"\u3001"1d20+3"\u3001"1d6!"\uFF09
- dc: number
- skill: string
- desc: string
5. events[i] \u53EF\u9009\u5B57\u6BB5\u4E0E\u7C7B\u578B\uFF1A
- compare: string\uFF0C\u4EC5\u5141\u8BB8 >= > <= <\uFF0C\u7F3A\u7701\u6309 >=
- scope: string\uFF0C\u4EC5\u5141\u8BB8 protagonist / character / all
- rollMode: string\uFF0C\u4EC5\u5141\u8BB8 auto / manual\uFF0C\u7F3A\u7701\u6309 manual
- timeLimit: string\uFF0C\u5FC5\u987B\u662F ISO 8601 duration\uFF08\u4F8B\u5982 PT30S\u3001PT5M\uFF09
- outcomes: object\uFF0C\u53EF\u5305\u542B success / failure / explode \u4E09\u4E2A\u5267\u60C5\u8D70\u5411\u6587\u672C
6. outcomes \u5B50\u5B57\u6BB5\u8BF4\u660E\uFF1A
- outcomes.success: \u5224\u5B9A\u6210\u529F\u65F6\u7684\u5267\u60C5\u8D70\u5411
- outcomes.failure: \u5224\u5B9A\u5931\u8D25\u65F6\u7684\u5267\u60C5\u8D70\u5411\uFF08\u8D85\u65F6\u5931\u8D25\u4E5F\u5F52\u5165 failure\uFF09
- outcomes.explode: \u89E6\u53D1\u7206\u9AB0\u65F6\u7684\u7279\u6B8A\u5267\u60C5\u8D70\u5411\uFF08\u4F18\u5148\u4E8E success/failure\uFF09
7. \u517C\u5BB9\u5B57\u6BB5\uFF1AsuccessOutcome / failureOutcome / explodeOutcome \u4E5F\u4F1A\u88AB\u8BC6\u522B\uFF0C\u4F46\u63A8\u8350\u4F7F\u7528 outcomes \u5BF9\u8C61\u3002
8. \u91CD\u8981\uFF1A\u5B57\u6BB5\u7C7B\u578B\u5FC5\u987B\u6B63\u786E\uFF0C\u5C24\u5176 checkDice \u5FC5\u987B\u662F\u5B57\u7B26\u4E32\uFF0C\u4E0D\u80FD\u662F\u5E03\u5C14\u503C\u6216\u6570\u5B57\u3002
9. \u6B63\u786E\u793A\u4F8B\uFF08\u5355\u4E8B\u4EF6\uFF09\uFF1A
\`\`\`rolljson
{"type":"dice_events","version":"1","events":[{"id":"observation_check","title":"\u5BDF\u89C9\u795E\u60C5","checkDice":"1d100!","dc":60,"skill":"\u5BDF\u89C9","desc":"\u7A57\u79CB\u751F\u8BD5\u56FE\u5224\u65AD\u4F60\u773C\u795E\u4E2D\u7684\u60C5\u7EEA\u3002","scope":"character","compare":">=","outcomes":{"success":"\u4F60\u6210\u529F\u6355\u6349\u5230\u5979\u8BED\u6C14\u91CC\u7684\u8FDF\u7591\u3002","failure":"\u4F60\u6CA1\u8BFB\u61C2\u5979\u7684\u771F\u5B9E\u610F\u56FE\u3002","explode":"\u4F60\u7A81\u7136\u610F\u8BC6\u5230\u5979\u5728\u6545\u610F\u8BEF\u5BFC\u4F60\u3002"}}]}
\`\`\`
10. \u975E\u4E8B\u4EF6\u53D9\u4E8B\u6587\u672C\u6B63\u5E38\u8F93\u51FA\uFF1B\u4E8B\u4EF6\u4FE1\u606F\u53EA\u80FD\u653E\u5728 rolljson \u4EE3\u7801\u5757\u5185\u3002
11. DICE_ROUND_SUMMARY \u662F\u5386\u53F2\u4E8B\u4EF6\u6458\u8981\uFF0C\u4F1A\u5F71\u54CD\u540E\u7EED\u884C\u4E3A\uFF1B\u8BF7\u636E\u6B64\u4FDD\u6301\u5267\u60C5\u4E0E\u72B6\u6001\u4E00\u81F4\u3002`,te={enabled:!0,autoSendRuleToAI:!0,enableAiRollMode:!0,enableExplodingDice:!0,summaryDetailMode:"minimal",summaryHistoryRounds:3,eventApplyScope:"protagonist_only",enableOutcomeBranches:!0,enableExplodeOutcomeBranch:!0,includeOutcomeInSummary:!0,showOutcomePreviewInListCard:!0,enableTimeLimit:!0,minTimeLimitSeconds:10,ruleText:O},Hn={},Cn={...te};function H(){try{return SillyTavern.getContext()}catch{return null}}function ne(e){return`${e}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,9)}`}function At(e){let t=0;for(let n=0;n<e.length;n++)t=(t<<5)-t+e.charCodeAt(n),t|=0;return Math.abs(t).toString(36)}function g(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\"/g,"&quot;").replace(/'/g,"&#39;")}function U(e){return g(e).replace(/`/g,"&#96;")}function Le(e){return e.replace(/\n{3,}/g,`

`).trim()}function Bn(){let e=H();return e?((!e.chatMetadata||typeof e.chatMetadata!="object")&&(e.chatMetadata={}),e.chatMetadata):Hn}function w(){let e=Bn();return(!e.diceRollerEvent||typeof e.diceRollerEvent!="object")&&(e.diceRollerEvent={}),e.diceRollerEvent}function R(){let e=H();if(typeof e?.saveMetadata=="function")try{e.saveMetadata()}catch(t){console.warn("[\u9AB0\u5B50\u63D2\u4EF6] \u4FDD\u5B58 Event \u5143\u6570\u636E\u5931\u8D25",t)}}function On(){let e=H(),t=e?.saveSettingsDebounced??yn;if(typeof t=="function")try{t.call(e)}catch(n){console.warn("[\u9AB0\u5B50\u63D2\u4EF6] \u4FDD\u5B58\u6269\u5C55\u8BBE\u7F6E\u5931\u8D25",n)}}function kt(){let e=H(),t=e?.saveChat??e?.saveChatConditional??e?.saveChatDebounced;if(typeof t=="function")try{Promise.resolve(t.call(e)).catch(n=>{console.warn("[\u9AB0\u5B50\u63D2\u4EF6] \u4FDD\u5B58\u804A\u5929\u5931\u8D25",n)})}catch(n){console.warn("[\u9AB0\u5B50\u63D2\u4EF6] \u4FDD\u5B58\u804A\u5929\u5931\u8D25",n)}}function y(){let t=H()?.extensionSettings??En;if(!t||typeof t!="object")return Cn;(!t[W]||typeof t[W]!="object")&&(t[W]={...te});let n=t[W];n.enabled=n.enabled!==!1,n.autoSendRuleToAI=n.autoSendRuleToAI!==!1,n.enableAiRollMode=n.enableAiRollMode!==!1,n.enableExplodingDice=n.enableExplodingDice!==!1,n.enableOutcomeBranches=n.enableOutcomeBranches!==!1,n.enableExplodeOutcomeBranch=n.enableExplodeOutcomeBranch!==!1,n.includeOutcomeInSummary=n.includeOutcomeInSummary!==!1,n.showOutcomePreviewInListCard=n.showOutcomePreviewInListCard!==!1;let o=String(n.summaryDetailMode||"").toLowerCase();n.summaryDetailMode=o==="balanced"||o==="detailed"?o:"minimal";let s=Number(n.summaryHistoryRounds),i=Number.isFinite(s)?Math.floor(s):te.summaryHistoryRounds;n.summaryHistoryRounds=Math.min(ke,Math.max(Ae,i)),n.eventApplyScope=n.eventApplyScope==="all"?"all":"protagonist_only",n.enableTimeLimit=n.enableTimeLimit!==!1;let l=Number(n.minTimeLimitSeconds),d=Number.isFinite(l)?Math.floor(l):10;return n.minTimeLimitSeconds=Math.max(1,d),n.ruleText=typeof n.ruleText=="string"&&n.ruleText.trim().length>0?n.ruleText:O,n}function T(e){let t=y();Object.assign(t,e),On(),Se()}function xt(){let e=document.getElementById(It);e&&(e.textContent=_t)}function Nn(){if(document.getElementById(lt))return;let e=document.createElement("style");e.id=lt,e.textContent=Be(B),document.head.appendChild(e)}function Lt(e=0){if(document.getElementById(B)){xt(),Se();return}let t=document.getElementById("extensions_settings");if(!t){e<60&&setTimeout(()=>Lt(e+1),500);return}Nn();let n=document.createElement("div");n.id=B;let o=`${B}-toggle`,s=`${B}-content`,i=`${B}-icon`,l={cardId:B,drawerToggleId:o,drawerContentId:s,drawerIconId:i,badgeId:It,badgeText:_t,authorText:In,emailText:Rn,githubText:_n,githubUrl:Mt,searchId:ct,tabMainId:dt,tabRuleId:ut,tabAboutId:mt,panelMainId:pt,panelRuleId:gt,panelAboutId:ft,enabledId:ce,ruleId:de,aiRollModeId:ue,explodingEnabledId:me,summaryDetailId:pe,summaryRoundsId:ge,scopeId:fe,outcomeBranchesId:ve,explodeOutcomeId:be,includeOutcomeSummaryId:xe,listOutcomePreviewId:Ee,timeLimitEnabledId:ye,timeLimitMinId:he,timeLimitRowId:Rt,ruleSaveId:rt,ruleResetId:at,ruleTextId:Te};n.innerHTML=Ce(l),t.prepend(n),xt();let d=document.getElementById(dt),r=document.getElementById(ut),c=document.getElementById(mt),a=document.getElementById(pt),u=document.getElementById(gt),m=document.getElementById(ft),p=document.getElementById(ct),v=a?Array.from(a.querySelectorAll(".st-roll-search-item")):[],x=u?Array.from(u.querySelectorAll(".st-roll-search-item")):[],E=m?Array.from(m.querySelectorAll(".st-roll-search-item")):[],h=[...v,...x,...E],I="main",_=b=>{I=b;let f=b==="main",S=b==="rule",D=b==="about";d?.classList.toggle("is-active",f),r?.classList.toggle("is-active",S),c?.classList.toggle("is-active",D),a&&(a.hidden=!f),u&&(u.hidden=!S),m&&(m.hidden=!D)},V=()=>{let f=String(p?.value??"").trim().toLowerCase().split(/\s+/).filter(Boolean);for(let k of h){let dn=`${k.dataset.stRollSearch??""} ${k.textContent??""}`.toLowerCase(),un=f.every(mn=>dn.includes(mn));k.classList.toggle("is-hidden-by-search",!un)}if(!f.length)return;let S=v.some(k=>!k.classList.contains("is-hidden-by-search")),D=x.some(k=>!k.classList.contains("is-hidden-by-search")),K=E.some(k=>!k.classList.contains("is-hidden-by-search"));I==="main"&&!S&&D?_("rule"):I==="main"&&!S&&!D&&K?_("about"):I==="rule"&&!D&&S?_("main"):I==="rule"&&!D&&!S&&K?_("about"):I==="about"&&!K&&S?_("main"):I==="about"&&!K&&!S&&D&&_("rule")};_("main"),d?.addEventListener("click",()=>{_("main"),V()}),r?.addEventListener("click",()=>{_("rule"),V()}),c?.addEventListener("click",()=>{_("about"),V()}),p?.addEventListener("input",V),V();let Xt=document.getElementById(ce),Kt=document.getElementById(de),Jt=document.getElementById(ue),Wt=document.getElementById(me),Zt=document.getElementById(pe),Qt=document.getElementById(ge),en=document.getElementById(fe),tn=document.getElementById(ve),nn=document.getElementById(be),on=document.getElementById(xe),sn=document.getElementById(Ee),ln=document.getElementById(ye),rn=document.getElementById(he),ie=document.getElementById(Te),an=document.getElementById(rt),cn=document.getElementById(at);Xt?.addEventListener("input",b=>{let f=!!b.target.checked;T({enabled:f})}),Kt?.addEventListener("input",b=>{let f=!!b.target.checked;T({autoSendRuleToAI:f})}),Jt?.addEventListener("input",b=>{let f=!!b.target.checked;T({enableAiRollMode:f})}),Wt?.addEventListener("input",b=>{let f=!!b.target.checked;T({enableExplodingDice:f})}),Zt?.addEventListener("change",b=>{let f=String(b.target.value||"");T({summaryDetailMode:f==="balanced"||f==="detailed"?f:"minimal"})}),Qt?.addEventListener("change",b=>{let f=Number(b.target.value),S=Number.isFinite(f)?Math.min(ke,Math.max(Ae,Math.floor(f))):te.summaryHistoryRounds;T({summaryHistoryRounds:S})}),en?.addEventListener("change",b=>{let f=String(b.target.value||"");T({eventApplyScope:f==="all"?"all":"protagonist_only"})}),tn?.addEventListener("input",b=>{let f=!!b.target.checked;T({enableOutcomeBranches:f})}),nn?.addEventListener("input",b=>{let f=!!b.target.checked;T({enableExplodeOutcomeBranch:f})}),on?.addEventListener("input",b=>{let f=!!b.target.checked;T({includeOutcomeInSummary:f})}),sn?.addEventListener("input",b=>{let f=!!b.target.checked;T({showOutcomePreviewInListCard:f})}),ln?.addEventListener("input",b=>{let f=!!b.target.checked;T({enableTimeLimit:f})}),rn?.addEventListener("change",b=>{let f=Number(b.target.value),S=Number.isFinite(f)?Math.max(1,Math.floor(f)):10;T({minTimeLimitSeconds:S})}),an?.addEventListener("click",()=>{let b=String(ie?.value??""),f=b.trim().length>0?b:O;T({ruleText:f})}),cn?.addEventListener("click",()=>{ie&&(ie.value=O),T({ruleText:O})}),Se()}function Se(){let e=y(),t=document.getElementById(ce),n=document.getElementById(de),o=document.getElementById(ue),s=document.getElementById(me),i=document.getElementById(pe),l=document.getElementById(ge),d=document.getElementById(fe),r=document.getElementById(ve),c=document.getElementById(be),a=document.getElementById(xe),u=document.getElementById(Ee),m=document.getElementById(ye),p=document.getElementById(he),v=document.getElementById(Rt),x=document.getElementById(Te);if(t&&(t.checked=!!e.enabled),n&&(n.checked=!!e.autoSendRuleToAI),o&&(o.checked=!!e.enableAiRollMode),s&&(s.checked=!!e.enableExplodingDice),i&&(i.value=e.summaryDetailMode),l&&(l.value=String(e.summaryHistoryRounds)),d&&(d.value=e.eventApplyScope),r&&(r.checked=!!e.enableOutcomeBranches),c&&(c.checked=!!e.enableExplodeOutcomeBranch),a&&(a.checked=!!e.includeOutcomeInSummary),u&&(u.checked=!!e.showOutcomePreviewInListCard),c&&(c.disabled=!e.enableOutcomeBranches,c.style.opacity=e.enableOutcomeBranches?"1":"0.5"),a&&(a.disabled=!e.enableOutcomeBranches,a.style.opacity=e.enableOutcomeBranches?"1":"0.5"),u&&(u.disabled=!e.enableOutcomeBranches,u.style.opacity=e.enableOutcomeBranches?"1":"0.5"),m&&(m.checked=!!e.enableTimeLimit),p&&(p.value=String(e.minTimeLimitSeconds),p.disabled=!e.enableTimeLimit,p.style.opacity=e.enableTimeLimit?"1":"0.5"),v?.classList.toggle("is-disabled",!e.enableTimeLimit),x){let E=e.ruleText||O;x.value!==E&&(x.value=E)}}function Y(e){if(!e)return"";let t=typeof e.content=="string"?e.content:"",n=typeof e.mes=="string"?e.mes:"";return t&&n?t.length>=n.length?t:n:t||n||""}function wt(e){if(!e)return"";let t=[typeof e.mes=="string"?e.mes:"",typeof e.content=="string"?e.content:"",typeof e.message=="string"?e.message:"",typeof e.text=="string"?e.text:""];for(let n of t)if(n&&n.trim())return n;return""}function Dt(e,t){e.mes=t,e.content=t,e.message=t,e.text=t}function Pn(e){return e?e.is_user?!0:String(e.role||"").toLowerCase()==="user":!1}function Un(e){return e?e.is_system?!0:String(e.role||"").toLowerCase()==="system":!1}function Ht(e){if(!e||e.is_user||e.is_system)return!1;let t=String(e.role||"").toLowerCase();return t?t!=="user"&&t!=="system":!0}function jn(e){for(let t=0;t<e.length;t++)if(Un(e[t]))return t;return-1}function zn(e){for(let t=e.length-1;t>=0;t--)if(Pn(e[t]))return e[t];return null}function Gn(e){let t=e.id??e.cid??e.uid;return t!=null?`msg:${String(t)}`:`fp:${String(e.create_date??e.create_time??e.timestamp??"")}:${At(Y(e))}`}function Vn(e){return Le(e.replace(/\[DICE_EVENT_RULES\][\s\S]*?\[\/DICE_EVENT_RULES\]/g,"").replace(/\[DICE_ROUND_SUMMARY\][\s\S]*?\[\/DICE_ROUND_SUMMARY\]/g,""))}function Fn(){let e=y(),n=(typeof e.ruleText=="string"&&e.ruleText.trim().length>0?e.ruleText:O).replace(/\[\/?DICE_EVENT_RULES\]/g,"").trim();return`${Mn}
${n}
${An}`}function qn(){return Fn()}function Yn(e,t=Date.now()){A(e);let n=y(),o=[],s=0;for(let i of e.events){let l=C(e,i.id),d=l?l.source==="timeout_auto_fail"?"timeout":"done":"pending",r=l&&Number.isFinite(Number(l.result.total))?Number(l.result.total):null,c=l?l.success:null,a=oe(i,l,n);l&&s++,o.push({id:i.id,title:i.title,desc:i.desc,skill:i.skill,checkDice:i.checkDice,compare:X(i.compare)??">=",dc:Number.isFinite(i.dc)?Number(i.dc):0,rollMode:i.rollMode==="auto"?"auto":"manual",timeLimit:i.timeLimit??"none",status:d,resultSource:l?.source??null,total:r,success:c,outcomeKind:a.kind,outcomeText:a.text,explosionTriggered:a.explosionTriggered})}return{roundId:e.roundId,openedAt:e.openedAt,closedAt:t,eventsCount:e.events.length,rolledCount:s,events:o}}function Xn(e){return Array.isArray(e.summaryHistory)||(e.summaryHistory=[]),e.summaryHistory}function Kn(e){e.length<=vt||e.splice(0,e.length-vt)}function Jn(e){let t=String(e??"").replace(/\s+/g," ").trim();return t.length>0?t:"\uFF08\u7A7A\uFF09"}function j(e,t){let n=Jn(e);return n.length<=t?n:`${n.slice(0,Math.max(1,t))}\uFF08\u5DF2\u622A\u65AD\uFF09`}function Wn(e){return e==="minimal"?60:e==="balanced"?90:140}function Zn(e){return e==="manual_roll"?"\u624B\u52A8\u68C0\u5B9A":e==="ai_auto_roll"?"AI\u81EA\u52A8\u68C0\u5B9A":e==="timeout_auto_fail"?"\u8D85\u65F6\u5224\u5B9A":"\u672A\u77E5"}function Qn(e){if(e.status==="pending")return"\u5F85\u5224\u5B9A\uFF08\u5C1A\u672A\u63B7\u9AB0\uFF09";if(e.status==="timeout"||e.resultSource==="timeout_auto_fail")return"\u8D85\u65F6\u672A\u64CD\u4F5C\uFF0C\u7CFB\u7EDF\u5224\u5B9A\u5931\u8D25";let t=e.total==null?"-":String(e.total);return e.success===!0?e.resultSource==="ai_auto_roll"?`AI\u81EA\u52A8\u68C0\u5B9A\u6210\u529F\uFF08\u603B\u503C ${t}\uFF09`:`\u6210\u529F\uFF08\u603B\u503C ${t}\uFF09`:e.success===!1?e.resultSource==="ai_auto_roll"?`AI\u81EA\u52A8\u68C0\u5B9A\u5931\u8D25\uFF08\u603B\u503C ${t}\uFF09`:`\u5931\u8D25\uFF08\u603B\u503C ${t}\uFF09`:`\u5DF2\u5B8C\u6210\uFF08\u603B\u503C ${t}\uFF09`}function eo(e){let t=j(e.outcomeText||"",120);return e.outcomeKind==="explode"?`\u7206\u9AB0\u8D70\u5411\uFF1A${t}`:e.outcomeKind==="success"?`\u6210\u529F\u8D70\u5411\uFF1A${t}`:e.outcomeKind==="failure"?`\u5931\u8D25\u8D70\u5411\uFF1A${t}`:`\u8D70\u5411\uFF1A${t}`}function to(e,t,n){let o=j(e.title,48),s=j(e.desc,Wn(t)),i=Qn(e),l=n?eo(e):"";if(t==="minimal")return n?`- \u6807\u9898\uFF1A${o}\uFF5C\u63CF\u8FF0\uFF1A${s}\uFF5C\u7ED3\u679C\uFF1A${i}\uFF5C${l}`:`- \u6807\u9898\uFF1A${o}\uFF5C\u63CF\u8FF0\uFF1A${s}\uFF5C\u7ED3\u679C\uFF1A${i}`;let d=j(e.skill,20),r=j(e.checkDice,24),c=`${d} ${r}\uFF0C\u6761\u4EF6 ${e.compare} ${e.dc}`;if(t==="balanced")return n?`- \u6807\u9898\uFF1A${o}\uFF5C\u63CF\u8FF0\uFF1A${s}\uFF5C\u68C0\u5B9A\uFF1A${c}\uFF5C\u7ED3\u679C\uFF1A${i}\uFF5C${l}`:`- \u6807\u9898\uFF1A${o}\uFF5C\u63CF\u8FF0\uFF1A${s}\uFF5C\u68C0\u5B9A\uFF1A${c}\uFF5C\u7ED3\u679C\uFF1A${i}`;let a=Zn(e.resultSource),u=j(e.timeLimit||"none",26);return n?`- \u6807\u9898\uFF1A${o}\uFF5C\u63CF\u8FF0\uFF1A${s}\uFF5C\u68C0\u5B9A\uFF1A${c}\uFF5C\u6765\u6E90\uFF1A${a}\uFF5C\u6A21\u5F0F\uFF1A${e.rollMode}\uFF5C\u65F6\u9650\uFF1A${u}\uFF5C\u7ED3\u679C\uFF1A${i}\uFF5C${l}`:`- \u6807\u9898\uFF1A${o}\uFF5C\u63CF\u8FF0\uFF1A${s}\uFF5C\u68C0\u5B9A\uFF1A${c}\uFF5C\u6765\u6E90\uFF1A${a}\uFF5C\u6A21\u5F0F\uFF1A${e.rollMode}\uFF5C\u65F6\u9650\uFF1A${u}\uFF5C\u7ED3\u679C\uFF1A${i}`}function no(e,t,n,o){if(!Array.isArray(e)||e.length===0)return"";let s=Math.min(ke,Math.max(Ae,Math.floor(Number(n)||1))),i=e.slice(-s);if(i.length===0)return"";let l=[];l.push(kn),l.push(`v=4 fmt=nl detail=${t} window_rounds=${s} included_rounds=${i.length} include_outcome=${o?"1":"0"}`);let d=0,r=!1;for(let c=0;c<i.length;c++){let a=i[c],u=Math.max(0,a.eventsCount-a.rolledCount);l.push(`\u3010\u7B2C ${c+1} \u8F6E / roundId=${a.roundId} / \u5173\u95ED\u65F6\u95F4=${new Date(a.closedAt).toISOString()}\u3011`),l.push(`\u672C\u8F6E\u4E8B\u4EF6\u6570=${a.eventsCount}\uFF0C\u5DF2\u7ED3\u7B97=${a.rolledCount}\uFF0C\u672A\u7ED3\u7B97=${u}`);let m=a.events.slice(0,re);for(let p of m){if(d>=wn){r=!0;break}l.push(to(p,t,o)),d++}if(a.events.length>re&&l.push(`\u6CE8\uFF1A\u672C\u8F6E\u8FD8\u6709 ${a.events.length-re} \u4E2A\u4E8B\u4EF6\u672A\u5C55\u5F00\u3002`),r)break}return r&&l.push("\u6CE8\uFF1A\u540E\u7EED\u4E8B\u4EF6\u56E0\u957F\u5EA6\u9650\u5236\u672A\u5C55\u5F00\u3002"),l.push(Ln),l.join(`
`)}function oo(e,t){let n=e.some(i=>!i||typeof i!="object"?!1:Object.prototype.hasOwnProperty.call(i,"mes")||Object.prototype.hasOwnProperty.call(i,"message")||Object.prototype.hasOwnProperty.call(i,"text")),o=jn(e);if(o>=0){let i=e[o],l=Vn(typeof i.content=="string"?i.content:Y(i)),d=Le([l,t].filter(Boolean).join(`

`));i.content=d,(n||Object.prototype.hasOwnProperty.call(i,"mes"))&&(i.mes=d),(n||Object.prototype.hasOwnProperty.call(i,"message"))&&(i.message=d),(n||Object.prototype.hasOwnProperty.call(i,"text"))&&(i.text=d),i.is_system=!0,i.role=i.role||"system";return}if(!t.trim())return;let s={role:"system",is_system:!0,content:t};n&&(s.mes=t,s.message=t,s.text=t),e.unshift(s)}function io(e){let t=y();if(!t.enabled)return"";P();let n=w(),o=zn(e),s=o?Gn(o):"",i=!!s&&s!==n.lastPromptUserMsgId,l="",d=!1;if(i){let c=Xn(n);if(n.pendingRound){let a=Yn(n.pendingRound,Date.now());c.push(a),Kn(c),delete n.pendingRound,d=!0}if(l=no(c,t.summaryDetailMode,t.summaryHistoryRounds,t.includeOutcomeInSummary),l){let a=c.length>0?c[c.length-1].roundId:"none";n.outboundSummary={userMsgId:s,roundId:a,summaryText:l};let u=l.length;console.info(`[\u9AB0\u5B50\u63D2\u4EF6] DICE_ROUND_SUMMARY chars=${u} detail=${t.summaryDetailMode} rounds=${t.summaryHistoryRounds} includeOutcome=${t.includeOutcomeInSummary} format=nl-v4`),d=!0}else n.outboundSummary&&(delete n.outboundSummary,d=!0)}else s&&n.outboundSummary?.userMsgId===s&&(l=n.outboundSummary.summaryText);s&&s!==n.lastPromptUserMsgId&&(n.lastPromptUserMsgId=s,d=!0),d&&R();let r=[];return t.autoSendRuleToAI&&r.push(qn()),l&&r.push(l),r.join(`

`).trim()}function Ct(e){if(!e||typeof e!="object")return null;let t=[e,e?.request,e?.data,e?.payload,e?.params];for(let n of t)if(!(!n||typeof n!="object")&&Array.isArray(n.messages))return n.messages;for(let n of t)if(!(!n||typeof n!="object")&&Array.isArray(n.chat))return n.chat;return null}function so(e,t="unknown"){if(!e||e.dryRun)return;let n=Ct(e);if(!n||!Array.isArray(n))return;let o=io(n);if(!o){let s=y();s.enabled&&s.autoSendRuleToAI&&console.info(`[\u9AB0\u5B50\u63D2\u4EF6] ${t} \u547D\u4E2D prompt \u4E8B\u4EF6\uFF0C\u4F46\u65E0\u9700\u6CE8\u5165\uFF08managed \u4E3A\u7A7A\uFF09`);return}oo(n,o),console.info(`[\u9AB0\u5B50\u63D2\u4EF6] \u5DF2\u5728 ${t} \u6CE8\u5165 system \u89C4\u5219`)}function lo(e){for(let t=e.length-1;t>=0;t--)if(Ht(e[t]))return{msg:e[t],index:t};return null}function ro(e,t){let n=e.id??e.cid??e.uid,o=At(Y(e));return n!=null?`assistant:${String(n)}:${o}`:`assistant_idx:${t}:${o}`}function X(e){return e==null||e===""?">=":e===">="||e===">"||e==="<="||e==="<"?e:null}function M(e){return typeof e=="string"?e.trim():""}function ae(e,t,n){let o=M(e);if(!o)return;if(o.length<=bt)return o;let s=o.slice(0,bt);return console.warn(`[\u9AB0\u5B50\u63D2\u4EF6] outcomes.${t} \u8FC7\u957F\uFF0C\u5DF2\u622A\u65AD: event=${n} len=${o.length}`),`${s}\uFF08\u5DF2\u622A\u65AD\uFF09`}function ao(e,t){if(!e||typeof e!="object")return;let n=ae(e.success,"success",t),o=ae(e.failure,"failure",t),s=ae(e.explode,"explode",t);if(!(!n&&!o&&!s))return{success:n,failure:o,explode:s}}function oe(e,t,n){if(!n.enableOutcomeBranches)return{kind:"none",text:"\u8D70\u5411\u5206\u652F\u5DF2\u5173\u95ED\u3002",explosionTriggered:!1};let o=e.outcomes,s=!!t?.result?.explosionTriggered;return n.enableExplodeOutcomeBranch&&s&&o?.explode&&o.explode.trim()?{kind:"explode",text:o.explode.trim(),explosionTriggered:!0}:t?.success===!0?{kind:"success",text:o?.success?.trim()||"\u5224\u5B9A\u6210\u529F\uFF0C\u5267\u60C5\u5411\u6709\u5229\u65B9\u5411\u63A8\u8FDB\u3002",explosionTriggered:s}:t?.success===!1||t?.source==="timeout_auto_fail"?{kind:"failure",text:o?.failure?.trim()||"\u5224\u5B9A\u5931\u8D25\uFF0C\u5267\u60C5\u5411\u4E0D\u5229\u65B9\u5411\u63A8\u8FDB\u3002",explosionTriggered:s}:{kind:"none",text:"\u5C1A\u672A\u7ED3\u7B97\u3002",explosionTriggered:s}}function we(e){let t=M(e);if(!t)return null;if(!Dn.test(t))return console.warn("[\u9AB0\u5B50\u63D2\u4EF6] \u975E\u6CD5 timeLimit\uFF0C\u5DF2\u6309\u4E0D\u9650\u65F6\u5904\u7406:",t),null;let n=t.match(/^P(?:(\d+)W)?(?:(\d+)D)?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?)?$/i);if(!n)return console.warn("[\u9AB0\u5B50\u63D2\u4EF6] \u4E0D\u652F\u6301\u7684 timeLimit \u7EC4\u5408\uFF0C\u5DF2\u6309\u4E0D\u9650\u65F6\u5904\u7406:",t),null;let o=Number(n[1]||0),s=Number(n[2]||0),i=Number(n[3]||0),l=Number(n[4]||0),d=Number(n[5]||0),c=((((o*7+s)*24+i)*60+l)*60+d)*1e3;return!Number.isFinite(c)||c<0?(console.warn("[\u9AB0\u5B50\u63D2\u4EF6] timeLimit \u89E3\u6790\u5931\u8D25\uFF0C\u5DF2\u6309\u4E0D\u9650\u65F6\u5904\u7406:",t),null):c}function De(e,t){if(!t.enableTimeLimit||e==null)return null;let n=Math.max(1,Math.floor(Number(t.minTimeLimitSeconds)||1)),o=n*1e3;return e<o?(console.info(`[\u9AB0\u5B50\u63D2\u4EF6] timeLimit \u4F4E\u4E8E\u6700\u77ED\u65F6\u9650\uFF0C\u5DF2\u63D0\u5347\u5230 ${n}s\uFF08\u539F\u59CB ${e}ms\uFF09`),o):e}function Et(e){let t=Math.max(0,Math.ceil(e/1e3)),n=Math.floor(t/3600),o=Math.floor(t%3600/60),s=t%60;return n>0?`${String(n).padStart(2,"0")}:${String(o).padStart(2,"0")}:${String(s).padStart(2,"0")}`:`${String(o).padStart(2,"0")}:${String(s).padStart(2,"0")}`}function co(e){let t=0,n=0,o=0;try{let s=Re(e.checkDice);t=s.count,n=s.sides,o=s.modifier}catch{}return{expr:e.checkDice||"timeout",count:t,sides:n,modifier:o,rolls:[],rawTotal:0,total:0}}function Bt(e){return(!e.eventTimers||typeof e.eventTimers!="object")&&(e.eventTimers={}),e.eventTimers}function C(e,t){for(let n=e.rolls.length-1;n>=0;n--)if(e.rolls[n]?.eventId===t)return e.rolls[n];return null}function A(e){let t=y(),n=Bt(e),o=Date.now(),s=new Set;for(let i of e.events){s.add(i.id);let l=typeof i.timeLimitMs=="number"&&Number.isFinite(i.timeLimitMs)?Math.max(0,i.timeLimitMs):we(i.timeLimit||""),d=De(l,t);i.timeLimitMs=d;let r=n[i.id],c=C(e,i.id);if(r)Number.isFinite(r.offeredAt)||(r.offeredAt=typeof i.offeredAt=="number"&&Number.isFinite(i.offeredAt)?i.offeredAt:o),r.deadlineAt!==null&&!Number.isFinite(r.deadlineAt)&&(r.deadlineAt=typeof i.deadlineAt=="number"&&Number.isFinite(i.deadlineAt)?i.deadlineAt:null);else{let a=typeof i.offeredAt=="number"&&Number.isFinite(i.offeredAt)?i.offeredAt:o,u=d==null?null:a+d;r={offeredAt:a,deadlineAt:u},n[i.id]=r}c?c.source==="timeout_auto_fail"&&(r.expiredAt=c.timeoutAt??c.rolledAt):(r.deadlineAt=d==null?null:r.offeredAt+d,r.deadlineAt==null&&delete r.expiredAt),i.offeredAt=r.offeredAt,i.deadlineAt=r.deadlineAt}for(let i of Object.keys(n))s.has(i)||delete n[i]}function uo(e){let t=M(e).toLowerCase();if(t){if(t==="protagonist"||t==="player"||t==="user"||t==="mc"||t==="main_character")return"protagonist";if(t==="all"||t==="any"||t==="both")return"all";if(t==="character"||t==="assistant"||t==="npc"||t==="self")return"character"}}function mo(e){let t=M(e).toLowerCase();if(t){if(t==="auto"||t==="automatic"||t==="system"||t==="ai")return"auto";if(t==="manual"||t==="user"||t==="player")return"manual"}}function po(e){if(e.scope==="protagonist"||e.scope==="all")return!0;if(e.scope==="character")return!1;let t=`${e.title}
${e.desc}
${e.skill}`;return/(你|你要|你需要|你必须|玩家|主角|\byou\b|\byour\b|\bplayer\b|\bprotagonist\b)/i.test(t)}function go(e,t){return t==="all"?e:e.filter(po)}function fo(e){if(!e||typeof e!="object")return null;let t=M(e.id),n=M(e.title),o=M(e.checkDice),s=M(e.skill),i=M(e.timeLimit),l=M(e.desc),d=X(e.compare),r=uo(e.scope??e.eventScope??e.applyTo),c=mo(e.rollMode),a=Number(e.dc),u={success:e.successOutcome,failure:e.failureOutcome,explode:e.explodeOutcome},m=e.outcomes&&typeof e.outcomes=="object"?{...u,...e.outcomes}:u,p=ao(m,t||"unknown_event"),v=we(i),x=y(),E=De(v,x),h=i&&v!=null?i:void 0;if(!t||!n||!o||!s||!l||d==null||!Number.isFinite(a))return null;try{Re(o)}catch{return null}return{id:t,title:n,checkDice:o,dc:a,compare:d,scope:r,rollMode:c,skill:s,timeLimitMs:E,timeLimit:h,desc:l,outcomes:p}}function yt(e){if(!e||typeof e!="object"||e.type!=="dice_events"||String(e.version)!=="1"||!Array.isArray(e.events))return null;let t=[];for(let n of e.events){let o=fo(n);if(!o){console.warn("[\u9AB0\u5B50\u63D2\u4EF6] \u4E22\u5F03\u975E\u6CD5\u4E8B\u4EF6\u5B57\u6BB5",n);continue}t.push(o)}return t.length===0?null:{events:t}}function ht(e){let t=String(e||"").replace(/[\u200B-\u200D\u2060]/g,"").replace(/\uFEFF/g,"").trim();if(!t)return null;let n=[],o=a=>{let u=a.trim();u&&(n.includes(u)||n.push(u))},s=a=>a.replace(/[“”]/g,'"').replace(/[‘’]/g,"'").replace(/：/g,":").replace(/，/g,",").replace(/\u00A0/g," "),i=a=>a.replace(/,\s*([}\]])/g,"$1"),l=a=>a.replace(/^\s*```[a-zA-Z0-9_-]*\s*[\r\n]+/,"").replace(/[\r\n]+\s*```\s*$/,"").trim(),d=a=>a.replace(/^\s*(?:rolljson|json)\s*[\r\n]+/i,"").trim(),r=a=>{let u=a.indexOf("{");if(u<0)return null;let m=0,p=!1,v=!1;for(let x=u;x<a.length;x++){let E=a[x];if(p){if(v){v=!1;continue}if(E==="\\"){v=!0;continue}E==='"'&&(p=!1);continue}if(E==='"'){p=!0;continue}if(E==="{"){m+=1;continue}if(E==="}"&&(m-=1,m===0))return a.slice(u,x+1)}return null},c=[t,l(t),d(t),d(l(t))];for(let a of c){if(!a)continue;o(a),o(s(a)),o(i(a)),o(i(s(a)));let u=r(a);u&&(o(u),o(s(u)),o(i(u)),o(i(s(u))))}for(let a of n)try{return JSON.parse(a)}catch{}return null}function Tt(e){try{let t=document.createElement("textarea");return t.innerHTML=e,t.value}catch{return e.replace(/&quot;/g,'"').replace(/&#34;/g,'"').replace(/&apos;/g,"'").replace(/&#39;/g,"'").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&amp;/g,"&")}}function Ot(e){let t=/```(?:rolljson|json)?\s*([\s\S]*?)```/gi,n=[],o=[],s;for(;(s=t.exec(e))!==null;){let l=Tt(s[1]??"").trim();if(!l)continue;let d=/"type"\s*:\s*"dice_events"/i.test(l);d&&n.push({start:s.index,end:s.index+s[0].length});let r;try{if(r=ht(l),!r)throw new Error("\u65E0\u6CD5\u4FEE\u590D\u4E3A\u5408\u6CD5 JSON")}catch(a){d&&console.warn("[\u9AB0\u5B50\u63D2\u4EF6] \u4E8B\u4EF6\u5757 JSON \u89E3\u6790\u5931\u8D25\uFF0C\u5DF2\u9690\u85CF\u4EE3\u7801\u5757",a);continue}let c=yt(r);c&&o.push(...c.events)}let i=/<pre\b[\s\S]*?<\/pre>/gi;for(;(s=i.exec(e))!==null;){let l=s[0],d=l.match(/<code\b[^>]*>([\s\S]*?)<\/code>/i),r=(d?d[1]:l).replace(/<[^>]+>/g,""),c=Tt(r).trim();if(!c)continue;let a=/"type"\s*:\s*"dice_events"/i.test(c);a&&n.push({start:s.index,end:s.index+l.length});let u;try{if(u=ht(c),!u)throw new Error("\u65E0\u6CD5\u4FEE\u590D\u4E3A\u5408\u6CD5 JSON")}catch(p){a&&console.warn("[\u9AB0\u5B50\u63D2\u4EF6] HTML \u4E8B\u4EF6\u5757 JSON \u89E3\u6790\u5931\u8D25\uFF0C\u5DF2\u9690\u85CF\u4EE3\u7801\u5757",p);continue}let m=yt(u);m&&o.push(...m.events)}return{events:o,ranges:n}}function Nt(e,t){if(t.length===0)return e;let n=[...t].sort((i,l)=>i.start-l.start),o=0,s="";for(let i of n)i.start>o&&(s+=e.slice(o,i.start)),o=Math.max(o,i.end);return o<e.length&&(s+=e.slice(o)),Le(s)}function vo(e){let t=e.pendingRound?.status;return(!e.pendingRound||t!=="open")&&(e.pendingRound={roundId:ne("round"),status:"open",events:[],rolls:[],eventTimers:{},sourceAssistantMsgIds:[],openedAt:Date.now()}),(!e.pendingRound.eventTimers||typeof e.pendingRound.eventTimers!="object")&&(e.pendingRound.eventTimers={}),e.pendingRound}function bo(e,t,n){let o=X(t.compare)??">=",s=Number.isFinite(t.dc)?Number(t.dc):null,i=co(t);return{rollId:ne("eroll"),roundId:e.roundId,eventId:t.id,eventTitle:t.title,diceExpr:t.checkDice,result:i,success:!1,compareUsed:o,dcUsed:s,rolledAt:n,source:"timeout_auto_fail",timeoutAt:n}}function Pt(e,t,n=Date.now()){if(!y().enableTimeLimit||C(e,t.id))return null;A(e);let i=e.eventTimers[t.id];if(!i||i.deadlineAt==null||n<=i.deadlineAt)return null;let l=bo(e,t,n);return e.rolls.push(l),i.expiredAt=n,l}function P(){let e=y();if(!e.enabled||!e.enableTimeLimit)return!1;let n=w().pendingRound;if(!n)return!1;A(n);let o=Date.now(),s=!1;for(let i of n.events)Pt(n,i,o)&&(s=!0);return s&&R(),s}function xo(e,t){let n=y(),o=w(),s=vo(o),i=Date.now(),l=Bt(s),d=new Map;for(let r of s.events)d.set(r.id,{...r});for(let r of e){let c={...r},a=d.get(c.id),u=C(s,c.id),m={...a||{},...c};if(u){let p=l[m.id];p?(m.offeredAt=p.offeredAt,m.deadlineAt=p.deadlineAt):a&&(m.offeredAt=a.offeredAt,m.deadlineAt=a.deadlineAt??null)}else{let p=typeof m.timeLimitMs=="number"&&Number.isFinite(m.timeLimitMs)?Math.max(0,m.timeLimitMs):we(m.timeLimit||""),v=De(p,n);m.timeLimitMs=v,m.offeredAt=i,m.deadlineAt=v==null?null:i+v,l[m.id]={offeredAt:m.offeredAt,deadlineAt:m.deadlineAt}}d.set(m.id,m)}return s.events=Array.from(d.values()),A(s),s.sourceAssistantMsgIds.includes(t)||s.sourceAssistantMsgIds.push(t),R(),s}function Eo(e,t){let n=y(),o="";if(n.enableOutcomeBranches){let i=t?oe(t,e,n):e.result.explosionTriggered&&n.enableExplodeOutcomeBranch?{kind:"explode"}:e.success===!0?{kind:"success"}:e.success===!1?{kind:"failure"}:{kind:"none"};i.kind!=="none"&&(o=` | \u8D70\u5411:${i.kind}`)}if(e.source==="timeout_auto_fail")return`\u8D85\u65F6\u81EA\u52A8\u5224\u5B9A\u5931\u8D25${o}`;if(e.source==="ai_auto_roll"){let i=e.success===null?"\u672A\u5224\u5B9A":e.success?"\u6210\u529F":"\u5931\u8D25";return`AI\u81EA\u52A8\u68C0\u5B9A\uFF0C\u603B\u503C ${e.result.total} (${e.compareUsed} ${e.dcUsed??"?"} => ${i})${o}`}let s=e.success===null?"\u672A\u5224\u5B9A":e.success?"\u6210\u529F":"\u5931\u8D25";return`\u603B\u503C ${e.result.total} (${e.compareUsed} ${e.dcUsed??"?"} => ${s})${o}`}function He(e,t,n=Date.now()){let o=y(),s=C(e,t.id);if(s)return s.source==="timeout_auto_fail"?{text:"\u5DF2\u8D85\u65F6\u5931\u8D25",tone:"danger",locked:!0}:s.success===!1?{text:"\u5DF2\u7ED3\u7B97(\u5931\u8D25)",tone:"danger",locked:!0}:{text:"\u5DF2\u7ED3\u7B97",tone:"success",locked:!0};if(!o.enableTimeLimit)return{text:"\u65F6\u9650\u5173\u95ED",tone:"neutral",locked:!1};A(e);let i=e.eventTimers[t.id];if(!i||i.deadlineAt==null)return{text:"\u4E0D\u9650\u65F6",tone:"neutral",locked:!1};let l=i.deadlineAt-n;return l<=0?{text:"\u5DF2\u8D85\u65F6",tone:"danger",locked:!0}:l<=1e4?{text:`\u5269\u4F59 ${Et(l)}`,tone:"warn",locked:!1}:{text:`\u5269\u4F59 ${Et(l)}`,tone:"neutral",locked:!1}}function Ut(e){switch(e){case"warn":return{border:"1px solid rgba(255,196,87,0.55)",background:"rgba(71,47,14,0.45)",color:"#ffd987"};case"danger":return{border:"1px solid rgba(255,120,120,0.55)",background:"rgba(80,20,20,0.45)",color:"#ffb6b6"};case"success":return{border:"1px solid rgba(136,255,173,0.55)",background:"rgba(18,54,36,0.45)",color:"#bfffd1"};default:return{border:"1px solid rgba(173,201,255,0.45)",background:"rgba(20,36,62,0.45)",color:"#d1e6ff"}}}function yo(e,t,n){let o=Array.from(document.querySelectorAll("button[data-dice-event-roll='1']"));for(let s of o){let i=s.getAttribute("data-round-id")||"",l=s.getAttribute("data-dice-event-id")||"";i!==e||l!==t||(s.disabled=n,s.style.display=n?"none":"inline-block",s.style.opacity=n?"0.5":"1",s.style.cursor=n?"not-allowed":"pointer",s.style.filter=n?"grayscale(0.35)":"")}}function N(){let e=Array.from(document.querySelectorAll("[data-dice-countdown='1']")),t=Array.from(document.querySelectorAll("button[data-dice-event-roll='1']"));if(e.length===0&&t.length===0)return;let o=w().pendingRound;if(!o){for(let i of t)i.disabled=!0,i.style.display="none",i.style.opacity="0.5",i.style.cursor="not-allowed",i.style.filter="grayscale(0.35)";return}A(o);let s=Date.now();for(let i of e){let l=i.getAttribute("data-round-id")||"",d=i.getAttribute("data-event-id")||"";if(!l||!d||l!==o.roundId)continue;let r=o.events.find(u=>u.id===d);if(!r)continue;let c=He(o,r,s),a=Ut(c.tone);i.textContent=`\u23F1 ${c.text}`,i.style.border=a.border,i.style.background=a.background,i.style.color=a.color,yo(o.roundId,r.id,c.locked)}}function $e(){try{let e=Array.from(document.querySelectorAll("pre"));for(let t of e){let n=(t.textContent||"").trim();!n||!(n.includes("dice_events")&&n.includes('"events"')&&n.includes('"type"'))||t.remove()}}catch(e){console.warn("[\u9AB0\u5B50\u63D2\u4EF6] \u9690\u85CF\u4E8B\u4EF6\u4EE3\u7801\u5757\u5931\u8D25",e)}}function ho(e){let t=[wt(e),Y(e)].filter((n,o,s)=>n&&s.indexOf(n)===o);for(let n of t){let{ranges:o}=Ot(n);if(o.length===0)continue;let s=Nt(n,o);return Dt(e,s),!0}return!1}function jt(){let e=H();if(!e?.chat||!Array.isArray(e.chat))return;let t=!1;for(let n of e.chat)Ht(n)&&ho(n)&&(t=!0);t&&kt(),$e()}function To(e,t){if(!t.enableOutcomeBranches||!t.showOutcomePreviewInListCard)return"";let n=e.outcomes?.success?.trim()||"\u672A\u8BBE\u7F6E",o=e.outcomes?.failure?.trim()||"\u672A\u8BBE\u7F6E",s=t.enableExplodeOutcomeBranch?e.outcomes?.explode?.trim()||"\u672A\u8BBE\u7F6E":"\u5DF2\u5173\u95ED";return`
    <div style="margin-top:8px; margin-bottom:12px; padding:12px; border:1px solid rgba(197,160,89,0.3); border-radius:6px; background:linear-gradient(135deg, rgba(30,30,30,0.6) 0%, rgba(15,15,15,0.8) 100%); font-size:12px; line-height:1.6; box-shadow:inset 0 1px 4px rgba(0,0,0,0.5);">
      <div style="margin-bottom:10px; font-weight:600; color:#d1b67f; font-size:11px; letter-spacing:1px; display:flex; align-items:center;">
        <span style="flex-grow:1; height:1px; background:linear-gradient(90deg, transparent, rgba(197,160,89,0.4)); margin-right:8px;"></span>
        \u2726 \u8D70\u5411\u9884\u89C8 \u2726
        <span style="margin-left:8px; flex-grow:1; height:1px; background:linear-gradient(270deg, transparent, rgba(197,160,89,0.4));"></span>
      </div>
      <div style="display:flex; margin-bottom:6px; align-items:flex-start;">
        <span style="display:inline-block; padding:0 6px; margin-right:10px; background:rgba(82,196,26,0.15); border:1px solid rgba(82,196,26,0.4); border-radius:4px; color:#73d13d; font-size:10px; font-family:monospace; line-height:1.6; white-space:nowrap; user-select:none; box-shadow:0 0 4px rgba(82,196,26,0.1);">SUCCESS</span>
        <span style="color:#e0e0e0; flex:1; word-break:break-word;">${g(n)}</span>
      </div>
      <div style="display:flex; margin-bottom:6px; align-items:flex-start;">
        <span style="display:inline-block; padding:0 6px; margin-right:10px; background:rgba(255,77,79,0.15); border:1px solid rgba(255,77,79,0.4); border-radius:4px; color:#ff7875; font-size:10px; font-family:monospace; line-height:1.6; white-space:nowrap; user-select:none; box-shadow:0 0 4px rgba(255,77,79,0.1);">FAILURE</span>
        <span style="color:#e0e0e0; flex:1; word-break:break-word;">${g(o)}</span>
      </div>
      <div style="display:flex; align-items:flex-start;">
        <span style="display:inline-block; padding:0 6px; margin-right:10px; background:rgba(250,173,20,0.15); border:1px solid rgba(250,173,20,0.4); border-radius:4px; color:#ffc53d; font-size:10px; font-family:monospace; line-height:1.6; white-space:nowrap; user-select:none; box-shadow:0 0 4px rgba(250,173,20,0.1);">EXPLODE</span>
        <span style="color:#e0e0e0; flex:1; word-break:break-word;">${g(s)}</span>
      </div>
    </div>
  `}function zt(e){return e==="explode"?"\u7206\u9AB0\u8D70\u5411":e==="success"?"\u6210\u529F\u8D70\u5411":e==="failure"?"\u5931\u8D25\u8D70\u5411":"\u5267\u60C5\u8D70\u5411"}function So(e){let t=y();A(e);let n=e.events.map(o=>{let s=o.compare??">=",i=C(e,o.id),l=He(e,o,Date.now()),d=Ut(l.tone),r=Ve(i?.source==="timeout_auto_fail"),c=i?Ge(r,g(Eo(i,o))):"",a=To(o,t),u=typeof o.deadlineAt=="number"&&Number.isFinite(o.deadlineAt)?String(o.deadlineAt):"",m=l.locked?"disabled":"",p=l.locked?"opacity:0.4;cursor:not-allowed;filter:grayscale(1);":"cursor:pointer;",v=!l.locked&&!i,x=t.enableTimeLimit?o.timeLimit?o.timeLimit:"none":"off",E=v?Fe({roundIdAttr:U(e.roundId),eventIdAttr:U(o.id),diceExprAttr:U(o.checkDice),buttonDisabledAttr:m,buttonStateStyle:p}):"";return qe({titleHtml:g(o.title),eventIdHtml:g(o.id),descHtml:g(o.desc),skillHtml:g(o.skill),checkDiceHtml:g(o.checkDice),compareHtml:g(s),dcText:String(o.dc),timeLimitHtml:g(x),roundIdAttr:U(e.roundId),eventIdAttr:U(o.id),deadlineAttr:U(u),runtimeTextHtml:g(l.text),runtimeBorder:d.border,runtimeBackground:d.background,runtimeColor:d.color,rolledBlockHtml:c,outcomePreviewHtml:a,commandTextHtml:`/eventroll roll ${g(o.id)}`,rollButtonHtml:E})}).join("");return Ye(g(e.roundId),n)}function Gt(e,t,n){if(n==null||!Number.isFinite(n))return null;switch(t){case">=":return e>=n;case">":return e>n;case"<=":return e<=n;case"<":return e<n;default:return null}}function Vt(e,t=!1){if(!e||!Array.isArray(e.rolls)||e.rolls.length===0)return"";let n="d"+Math.random().toString(36).substr(2,9),o="normal",s="",i="#ffdb78";if(e.count===1){let u=e.rolls[0],m=e.sides;u===m?(o="success",s="\u5927\u6210\u529F!",i="#52c41a"):u===1&&(o="fail",s="\u5927\u5931\u8D25!",i="#ff4d4f")}let l=e.rolls.length<=5,d=t?62:68,r=t?52:58,c=l?e.rolls.map(u=>Qe(u,e.sides,i,d)).join(" "):Qe(0,e.sides,i,d),a=fn("#ffdb78",r);return Ne({uniqueId:n,rollingVisualHtml:a,diceVisualsHtml:c,critType:o,critText:s,compactMode:t})}function Ft(e,t){let n=y(),o=oe(e,t,n),s=n.enableOutcomeBranches?zt(o.kind):"\u5267\u60C5\u8D70\u5411",i=n.enableOutcomeBranches?o.text:"\u8D70\u5411\u5206\u652F\u5DF2\u5173\u95ED\u3002",l=t.success===null?"PENDING":t.success?"\u5224\u5B9A\u6210\u529F":"\u5224\u5B9A\u5931\u8D25",d=t.success===null?"#ffdb78":t.success?"#52c41a":"#ff4d4f",r=t.source==="timeout_auto_fail"?"\u8D85\u65F6\u81EA\u52A8\u68C0\u5B9A":t.source==="ai_auto_roll"?"AI \u81EA\u52A8\u68C0\u5B9A":"\u4E3B\u52A8\u68C0\u5B9A",c=t.source==="timeout_auto_fail"?"":Vt(t.result,!0);return Xe({rollIdHtml:g(t.rollId),titleHtml:g(e.title),eventIdHtml:g(e.id),sourceHtml:g(r),skillHtml:g(e.skill),diceExprHtml:g(t.diceExpr),rollsSummaryHtml:Ke(g(t.result.rolls.join(", ")),g($t(t.result.modifier))),compareHtml:g(t.compareUsed),dcText:String(t.dcUsed??"N/A"),statusText:l,statusColor:d,totalText:String(t.result.total),timeLimitHtml:g(e.timeLimit??"NONE"),diceVisualBlockHtml:c,outcomeLabelHtml:g(s),outcomeTextHtml:g(i)})}function $o(e,t){let n=y(),o=oe(e,t,n),s=n.enableOutcomeBranches?zt(o.kind):"\u5267\u60C5\u8D70\u5411",i=n.enableOutcomeBranches?o.text:"\u8D70\u5411\u5206\u652F\u5DF2\u5173\u95ED\u3002",l=t.source==="timeout_auto_fail",d=l?"\u2726 \u4E8B\u4EF6\u5DF2\u8D85\u65F6 \u2726":"\u2726 \u68C0\u5B9A\u5DF2\u5B8C\u6210 \u2726",r=l?"\u7CFB\u7EDF\u5F3A\u5236\u7ED3\u7B97":t.source==="ai_auto_roll"?"AI \u81EA\u52A8\u68C0\u5B9A":"\u73A9\u5BB6\u4E3B\u52A8\u68C0\u5B9A",c=t.success===null?"\u672A\u51B3":t.success?"\u6210\u529F":"\u5931\u8D25",a=t.success===null?"#a3957a":t.success?"#52c41a":"#ff4d4f",u=l?"":Vt(t.result),m=!l&&t.result?We(g(t.result.rolls.join(", ")),g($t(t.result.modifier))):"",p=t.timeoutAt?Ze(g(new Date(t.timeoutAt).toISOString())):"";return Je({titleTextHtml:d,rollIdHtml:g(t.rollId),eventTitleHtml:g(e.title),eventIdHtml:g(e.id),sourceTextHtml:g(r),compareHtml:g(t.compareUsed),dcText:String(t.dcUsed??"N/A"),statusText:c,statusColor:a,diceVisualBlockHtml:u,distributionBlockHtml:m,outcomeLabelHtml:g(s),outcomeTextHtml:g(i),timeoutBlockHtml:p})}function qt(e,t,n){P();let o=String(e||"").trim();if(!o)return"\u274C \u8BF7\u63D0\u4F9B\u4E8B\u4EF6 ID\uFF0C\u4F8B\u5982\uFF1A/eventroll roll lockpick_gate";let i=w().pendingRound;if(!i)return"\u274C \u5F53\u524D\u6CA1\u6709\u53EF\u6295\u63B7\u7684\u4E8B\u4EF6\u3002";if(n&&i.roundId!==n)return"\u274C \u8BE5\u4E8B\u4EF6\u6240\u5C5E\u8F6E\u6B21\u5DF2\u7ED3\u675F\u3002";let l=i.events.find(h=>h.id===o);if(!l)return`\u274C \u627E\u4E0D\u5230\u4E8B\u4EF6 ID\uFF1A${o}`;A(i),Pt(i,l)&&R();let r=C(i,l.id);if(r){let h=$o(l,r),I=$(h);return N(),I??""}let c=(t||l.checkDice||"").trim();if(!c)return`\u274C \u4E8B\u4EF6 ${o} \u7F3A\u5C11\u53EF\u7528\u9AB0\u5F0F\u3002`;let a;try{a=_e(c)}catch(h){return`\u274C \u63B7\u9AB0\u5931\u8D25\uFF1A${h?.message??String(h)}`}Me(a);let u=X(l.compare)??">=",m=Number.isFinite(l.dc)?Number(l.dc):null,p=Gt(a.total,u,m),v={rollId:ne("eroll"),roundId:i.roundId,eventId:l.id,eventTitle:l.title,diceExpr:c,result:a,success:p,compareUsed:u,dcUsed:m,rolledAt:Date.now(),source:"manual_roll",timeoutAt:null};i.rolls.push(v),R(),N();let x=Ft(l,v);return $(x)??""}function Io(e){if(!y().enableAiRollMode)return[];A(e);let n=!1,o=null,s=[];for(let i of e.events){if((i.rollMode==="auto"?"auto":"manual")!=="auto"||C(e,i.id))continue;let r=String(i.checkDice||"").trim();if(!r)continue;let c;try{c=_e(r)}catch(v){console.warn(`[\u9AB0\u5B50\u63D2\u4EF6] AI \u81EA\u52A8\u6295\u9AB0\u5931\u8D25: event=${i.id}`,v);continue}let a=X(i.compare)??">=",u=Number.isFinite(i.dc)?Number(i.dc):null,m=Gt(c.total,a,u),p={rollId:ne("eroll"),roundId:e.roundId,eventId:i.id,eventTitle:i.title,diceExpr:r,result:c,success:m,compareUsed:a,dcUsed:u,rolledAt:Date.now(),source:"ai_auto_roll",timeoutAt:null};e.rolls.push(p),n=!0,o=c,s.push(Ft(i,p))}return n?(o?Me(o):R(),s):[]}function Ro(){let e=globalThis;e.__stRollEventButtonsBoundEvent||(document.addEventListener("click",t=>{let n=t.target;if(!n)return;let o=n.closest("button[data-dice-event-roll='1']");if(!o)return;t.preventDefault(),t.stopPropagation();let s=o.getAttribute("data-dice-event-id")||"",i=o.getAttribute("data-dice-expr")||"",l=o.getAttribute("data-round-id")||"",d=qt(s,i||void 0,l||void 0);d&&$(d)},!0),e.__stRollEventButtonsBoundEvent=!0)}function Ie(e=0){let t=y();if(!t.enabled)return;let n=H();if(!n?.chat||!Array.isArray(n.chat))return;let o=lo(n.chat);if(!o)return;let s=w(),i=ro(o.msg,o.index);if(s.lastProcessedAssistantMsgId===i)return;let l=[wt(o.msg),Y(o.msg)].filter((p,v,x)=>p&&x.indexOf(p)===v),d="",r=[],c=[];for(let p of l){let v=Ot(p);if(v.events.length>0||v.ranges.length>0){d=p,r=v.events,c=v.ranges;break}d||(d=p,r=v.events,c=v.ranges)}if(!d.trim()){if(e<4){setTimeout(()=>Ie(e+1),100+e*120);return}s.lastProcessedAssistantMsgId=i,R();return}let a=go(r,t.eventApplyScope),u=c;if(a.length===0&&u.length===0){if(e<4){setTimeout(()=>Ie(e+1),140+e*160);return}s.lastProcessedAssistantMsgId=i,R();return}s.lastProcessedAssistantMsgId=i;let m=Nt(d,u);if(Dt(o.msg,m),$e(),u.length>0&&kt(),a.length>0){let p=xo(a,i),v=Io(p),x=So(p);$(x);for(let E of v)$(E);P(),N()}else r.length>0&&t.eventApplyScope==="protagonist_only"&&console.info("[\u9AB0\u5B50\u63D2\u4EF6] \u4E8B\u4EF6\u5DF2\u6309\u201C\u4EC5\u4E3B\u89D2\u884C\u52A8\u4E8B\u4EF6\u201D\u8FC7\u6EE4\uFF0C\u672C\u6B21\u65E0\u53EF\u7528\u4E8B\u4EF6"),R();setTimeout(()=>{$e(),N()},50)}function _o(e="chat_reset"){let t=w();if(String(e||"").toLowerCase()!=="chat_reset"){delete t.lastProcessedAssistantMsgId,R(),console.info(`[\u9AB0\u5B50\u63D2\u4EF6] \u4FDD\u7559 Event \u8F6E\u6B21\u72B6\u6001\uFF0C\u4EC5\u91CD\u7F6E\u4F1A\u8BDD\u6E38\u6807 (${e})`);return}delete t.pendingRound,delete t.outboundSummary,delete t.summaryHistory,delete t.lastPromptUserMsgId,delete t.lastProcessedAssistantMsgId,R(),console.info(`[\u9AB0\u5B50\u63D2\u4EF6] \u5DF2\u6E05\u7406 Event \u8F6E\u6B21\u72B6\u6001 (${e})`)}function St(){return Ue()}function Mo(e){A(e);let t=[];t.push(`\u5F53\u524D\u8F6E\u6B21: ${e.roundId}`),t.push(`\u4E8B\u4EF6\u6570\u91CF: ${e.events.length}`);for(let n of e.events){let o=He(e,n);t.push(`- ${n.id}: ${n.title} | ${n.checkDice} | ${n.compare??">="} ${n.dc} | ${n.skill} | rollMode=${n.rollMode??"manual"} | timeLimit=${n.timeLimit??"none"} | \u72B6\u6001=${o.text}`)}return t.join(`
`)}function Ao(){let e=globalThis;e.__stRollEventCommandRegisteredEvent||!z||!G||!Z||!Q||(z.addCommandObject(G.fromProps({name:"eventroll",aliases:["eroll"],returns:"\u4E8B\u4EF6\u9AB0\u5B50\u547D\u4EE4\uFF1Alist/roll/help",namedArgumentList:[],unnamedArgumentList:[Z.fromProps({description:"\u5B50\u547D\u4EE4\uFF0C\u793A\u4F8B\uFF1Alist | roll lockpick_gate 1d20+3",typeList:Q.STRING,isRequired:!1})],helpString:St(),callback:(t,n)=>{let o=(n??"").toString().trim(),s=o?o.split(/\s+/):[],i=(s[0]||"help").toLowerCase();if(i==="help")return $(St())??"";if(i==="list"){P();let r=w().pendingRound;if(!r)return $("\u5F53\u524D\u6CA1\u6709\u53EF\u7528\u4E8B\u4EF6\u3002\u8BF7\u7B49\u5F85 AI \u8F93\u51FA\u4E8B\u4EF6 JSON\u3002")??"";let c=je(g(Mo(r)));return $(c)??""}if(i==="roll"){let d=s[1]||"",r=s.length>2?s.slice(2).join(" "):void 0,c=qt(d,r);return c?$(c)??"":""}return $("\u672A\u77E5\u5B50\u547D\u4EE4\u3002\u8BF7\u4F7F\u7528 /eventroll help \u67E5\u770B\u5E2E\u52A9\u3002")??""}})),e.__stRollEventCommandRegisteredEvent=!0)}function ko(){let e=globalThis;e.__stRollEventCountdownTicker||(e.__stRollEventCountdownTicker=setInterval(()=>{try{P(),N()}catch(t){console.warn("[\u9AB0\u5B50\u63D2\u4EF6] \u5012\u8BA1\u65F6\u5237\u65B0\u5F02\u5E38",t)}},1e3))}function Lo(){let e=globalThis;if(e.__stRollEventHooksRegisteredEvent)return;let t=H(),n=t?.eventSource??hn,o=t?.event_types??Tn??{};if(!n?.on)return;let s=Array.from(new Set([o.CHAT_COMPLETION_PROMPT_READY,"chat_completion_prompt_ready"].filter(r=>typeof r=="string"&&r.length>0)));console.info(`[\u9AB0\u5B50\u63D2\u4EF6] prompt \u6CE8\u5165\u76D1\u542C\u4E8B\u4EF6: ${s.length>0?s.join(", "):"(none)"}`);let i=typeof n.makeLast=="function"?n.makeLast.bind(n):n.on.bind(n),l=Array.from(new Set([o.GENERATION_ENDED,"generation_ended"].filter(r=>typeof r=="string"&&r.length>0))),d=Array.from(new Set([o.CHAT_CHANGED,o.CHAT_RESET,o.CHAT_STARTED,o.CHAT_NEW,o.CHAT_CREATED,"chat_changed","chat_reset","chat_started","chat_new","chat_created"].filter(r=>typeof r=="string"&&r.length>0)));for(let r of s)i(r,c=>{try{Ct(c)||console.info(`[\u9AB0\u5B50\u63D2\u4EF6] ${r} \u5DF2\u89E6\u53D1\uFF0C\u4F46 payload \u4E2D\u672A\u53D1\u73B0 chat/messages`),so(c,r)}catch(a){console.error("[\u9AB0\u5B50\u63D2\u4EF6] Prompt hook \u9519\u8BEF",a)}});for(let r of l)n.on(r,()=>{try{Ie()}catch(c){console.error("[\u9AB0\u5B50\u63D2\u4EF6] Generation hook \u9519\u8BEF",c)}});for(let r of d)n.on(r,()=>{try{_o(r),setTimeout(()=>{jt(),P(),N()},0)}catch(c){console.error("[\u9AB0\u5B50\u63D2\u4EF6] Reset hook \u9519\u8BEF",c)}});e.__stRollEventHooksRegisteredEvent=!0}function Yt(e=0){$n(),Lt(),Ro(),Ao(),wo(),Lo(),ko(),P(),N(),jt();let t=globalThis;if(!t.__stRollEventCommandRegisteredEvent||!t.__stRollBaseCommandRegisteredEvent||!t.__stRollDebugCommandRegisteredEvent||!t.__stRollEventHooksRegisteredEvent){e<80&&setTimeout(()=>Yt(e+1),500);return}console.info("[\u9AB0\u5B50\u63D2\u4EF6] Event \u521D\u59CB\u5316\u5B8C\u6210")}function wo(){let e=globalThis;e.__stRollDebugCommandRegisteredEvent||!z||!G||(z.addCommandObject(G.fromProps({name:"rollDebug",aliases:["ddebug"],returns:"\u663E\u793A diceRoller \u5143\u6570\u636E",namedArgumentList:[],unnamedArgumentList:[],callback:()=>{let t=ee(),n=w(),o=JSON.stringify({legacy:t,eventMeta:n},null,2),s=ze(g(o));return $(s),""}})),e.__stRollDebugCommandRegisteredEvent=!0)}(function(){let t=globalThis;t.__stDiceRollerEventLoaded||(t.__stDiceRollerEventLoaded=!0,Yt())})();})();
