(()=>{function Yn(e){return`
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
            <i class="fa-solid fa-gear"></i><span>\u4E3B\u8BBE\u7F6E</span>
          </button>
          <button id="${e.tabSkillId}" type="button" class="st-roll-tab">
            <i class="fa-solid fa-bolt"></i><span>\u6280\u80FD</span>
          </button>
          <button id="${e.tabRuleId}" type="button" class="st-roll-tab">
            <i class="fa-solid fa-scroll"></i><span>\u89C4\u5219</span>
          </button>
          <button id="${e.tabAboutId}" type="button" class="st-roll-tab">
            <i class="fa-solid fa-circle-info"></i><span>\u5173\u4E8E</span>
          </button>
        </div>

        <div id="${e.panelMainId}" class="st-roll-panel">
          <div class="st-roll-divider"><i class="fa-solid fa-power-off"></i><span>\u57FA\u7840\u5F00\u5173</span><div class="st-roll-divider-line"></div></div>

          <label class="st-roll-item st-roll-search-item" data-st-roll-search="enable event dice plugin">
            <div class="st-roll-item-main">
              <div class="st-roll-item-title">\u542F\u7528\u4E8B\u4EF6\u9AB0\u5B50\u7CFB\u7EDF</div>
              <div class="st-roll-item-desc">\u603B\u5F00\u5173\u3002\u5173\u95ED\u540E\u5C06\u4E0D\u518D\u89E3\u6790\u4E8B\u4EF6\uFF0C\u4E5F\u4E0D\u4F1A\u6267\u884C\u4E8B\u4EF6\u68C0\u5B9A\u3002</div>
            </div>
            <div class="st-roll-inline"><input id="${e.enabledId}" type="checkbox" /></div>
          </label>

          <div class="st-roll-item st-roll-search-item" data-st-roll-search="scope protagonist all">
            <div class="st-roll-item-main">
              <div class="st-roll-item-title">\u4E8B\u4EF6\u5E94\u7528\u8303\u56F4</div>
              <div class="st-roll-item-desc">\u9009\u62E9\u53EA\u5904\u7406\u4E3B\u89D2\u4E8B\u4EF6\uFF0C\u6216\u5904\u7406\u6240\u6709\u89D2\u8272\u4E8B\u4EF6\u3002</div>
            </div>
            <div class="st-roll-row">
              <select id="${e.scopeId}" class="st-roll-select">
                <option value="protagonist_only">\u4EC5\u4E3B\u89D2\u4E8B\u4EF6</option>
                <option value="all">\u5168\u90E8\u4E8B\u4EF6</option>
              </select>
            </div>
          </div>

          <div class="st-roll-divider"><i class="fa-solid fa-robot"></i><span>AI \u534F\u8BAE</span><div class="st-roll-divider-line"></div></div>

          <label class="st-roll-item st-roll-search-item" data-st-roll-search="auto send rule inject">
            <div class="st-roll-item-main">
              <div class="st-roll-item-title">\u9ED8\u8BA4\u53D1\u9001\u89C4\u5219\u7ED9 AI</div>
              <div class="st-roll-item-desc">\u4F60\u53D1\u9001\u6D88\u606F\u524D\uFF0C\u81EA\u52A8\u9644\u52A0\u89C4\u5219\u548C\u6458\u8981\uFF0C\u51CF\u5C11 AI \u8F93\u51FA\u683C\u5F0F\u9519\u8BEF\u3002</div>
            </div>
            <div class="st-roll-inline"><input id="${e.ruleId}" type="checkbox" /></div>
          </label>

          <label class="st-roll-item st-roll-search-item" data-st-roll-search="rollMode auto manual">
            <div class="st-roll-item-main">
              <div class="st-roll-item-title">\u5141\u8BB8 AI \u51B3\u5B9A\u81EA\u52A8/\u624B\u52A8\u63B7\u9AB0</div>
              <div class="st-roll-item-desc">\u5F00\u542F\u540E AI \u53EF\u628A\u4E8B\u4EF6\u8BBE\u4E3A\u81EA\u52A8\u63B7\u9AB0\uFF1B\u5173\u95ED\u540E\u90FD\u9700\u8981\u4F60\u624B\u52A8\u63B7\u9AB0\u3002</div>
            </div>
            <div class="st-roll-inline"><input id="${e.aiRollModeId}" type="checkbox" /></div>
          </label>

          <label class="st-roll-item st-roll-search-item" data-st-roll-search="ai round end round_control end_round">
            <div class="st-roll-item-main">
              <div class="st-roll-item-title">\u662F\u5426\u5F00\u542F\u6301\u7EED\u8F6E</div>
              <div class="st-roll-item-desc">\u5F00\u542F\uFF1A\u6CBF\u7528\u5F53\u524D\u8F6E\uFF0C\u7531 AI \u901A\u8FC7 round_control=end_round / end_round=true \u51B3\u5B9A\u4F55\u65F6\u7ED3\u675F\u3002\u5173\u95ED\uFF1A\u6309\u6BCF\u8F6E\u5904\u7406\uFF0C\u6BCF\u6B21\u65B0\u4E8B\u4EF6\u90FD\u4F1A\u5F00\u542F\u65B0\u8F6E\u3002</div>
            </div>
            <div class="st-roll-inline"><input id="${e.aiRoundControlId}" type="checkbox" /></div>
          </label>

          <label class="st-roll-item st-roll-search-item" data-st-roll-search="dynamic dc reason">
            <div class="st-roll-item-main">
              <div class="st-roll-item-title">\u542F\u7528\u52A8\u6001 DC \u89E3\u91CA</div>
              <div class="st-roll-item-desc">\u5728\u5361\u7247\u4E2D\u663E\u793A\u201C\u4E3A\u4EC0\u4E48\u8FD9\u6B21\u96BE\u5EA6\u66F4\u9AD8\u6216\u66F4\u4F4E\u201D\u3002</div>
            </div>
            <div class="st-roll-inline"><input id="${e.dynamicDcReasonId}" type="checkbox" /></div>
          </label>

          <label class="st-roll-item st-roll-search-item" data-st-roll-search="status debuff apply remove clear">
            <div class="st-roll-item-main">
              <div class="st-roll-item-title">\u542F\u7528\u72B6\u6001\u5F02\u5E38\u7CFB\u7EDF</div>
              <div class="st-roll-item-desc">\u4E8B\u4EF6\u53EF\u7ED9\u89D2\u8272\u52A0\u72B6\u6001\uFF08\u5982\u53D7\u4F24\u3001\u60CA\u5413\uFF09\uFF0C\u540E\u7EED\u68C0\u5B9A\u4F1A\u81EA\u52A8\u52A0\u51CF\u503C\u3002</div>
            </div>
            <div class="st-roll-inline"><input id="${e.statusSystemEnabledId}" type="checkbox" /></div>
          </label>

          <div class="st-roll-item st-roll-search-item" data-st-roll-search="status editor">
            <div class="st-roll-item-main">
              <div class="st-roll-item-title">\u72B6\u6001\u7F16\u8F91\u5668</div>
              <div class="st-roll-item-desc">\u624B\u52A8\u7BA1\u7406\u5F53\u524D\u4F1A\u8BDD\u7684\u72B6\u6001\u5217\u8868\uFF0C\u9002\u5408\u4E34\u65F6\u8C03\u6574\u5267\u60C5\u72B6\u6001\u3002</div>
            </div>
            <div class="st-roll-actions"><button id="${e.statusEditorOpenId}" type="button" class="st-roll-btn">\u6253\u5F00\u7F16\u8F91\u5668</button></div>
          </div>

          <div class="st-roll-divider"><i class="fa-solid fa-dice"></i><span>\u63B7\u9AB0\u89C4\u5219</span><div class="st-roll-divider-line"></div></div>

          <label class="st-roll-item st-roll-search-item" data-st-roll-search="explode">
            <div class="st-roll-item-main">
              <div class="st-roll-item-title">\u542F\u7528\u7206\u9AB0</div>
              <div class="st-roll-item-desc">\u5F00\u542F\u540E\u6EE1\u8DB3\u6761\u4EF6\u65F6\u53EF\u8FFD\u52A0\u63B7\u9AB0\uFF1B\u5173\u95ED\u540E\u4E0D\u8FFD\u52A0\u3002</div>
            </div>
            <div class="st-roll-inline"><input id="${e.explodingEnabledId}" type="checkbox" /></div>
          </label>

          <label class="st-roll-item st-roll-search-item" data-st-roll-search="advantage disadvantage">
            <div class="st-roll-item-main">
              <div class="st-roll-item-title">\u542F\u7528\u4F18\u52BF/\u52A3\u52BF</div>
              <div class="st-roll-item-desc">\u652F\u6301\u4F18\u52BF\u548C\u52A3\u52BF\u89C4\u5219\uFF0C\u4F1A\u81EA\u52A8\u53D6\u66F4\u9AD8\u6216\u66F4\u4F4E\u7ED3\u679C\u3002</div>
            </div>
            <div class="st-roll-inline"><input id="${e.advantageEnabledId}" type="checkbox" /></div>
          </label>

          <label class="st-roll-item st-roll-search-item" data-st-roll-search="dynamic result guidance">
            <div class="st-roll-item-main">
              <div class="st-roll-item-title">\u542F\u7528\u52A8\u6001\u7ED3\u679C\u5F15\u5BFC</div>
              <div class="st-roll-item-desc">\u63B7\u9AB0\u540E\u4F1A\u7ED9 AI \u4E00\u6761\u7B80\u77ED\u63D0\u793A\uFF0C\u5E2E\u52A9\u5B83\u66F4\u81EA\u7136\u5730\u8854\u63A5\u5267\u60C5\u3002</div>
            </div>
            <div class="st-roll-inline"><input id="${e.dynamicResultGuidanceId}" type="checkbox" /></div>
          </label>

          <div class="st-roll-item st-roll-search-item" data-st-roll-search="dice sides allowed">
            <div class="st-roll-item-main">
              <div class="st-roll-item-title">\u9650\u5236 AI \u53EF\u7528\u9AB0\u5B50\u9762\u6570</div>
              <div class="st-roll-item-desc">AI \u53EA\u80FD\u4F7F\u7528\u8FD9\u91CC\u586B\u5199\u7684\u9762\u6570\uFF0C\u4F8B\u5982\uFF1A4,6,8,10,12,20,100\u3002</div>
            </div>
            <div class="st-roll-row">
              <input id="${e.allowedDiceSidesId}" class="st-roll-input" type="text" placeholder="4,6,8,10,12,20,100" />
            </div>
          </div>

          <div class="st-roll-divider"><i class="fa-solid fa-route"></i><span>\u5267\u60C5\u5206\u652F</span><div class="st-roll-divider-line"></div></div>

          <label class="st-roll-item st-roll-search-item" data-st-roll-search="outcome branches">
            <div class="st-roll-item-main">
              <div class="st-roll-item-title">\u542F\u7528\u5267\u60C5\u8D70\u5411\u5206\u652F</div>
              <div class="st-roll-item-desc">\u53EF\u4E3A\u6210\u529F\u3001\u5931\u8D25\u3001\u7206\u9AB0\u5206\u522B\u8BBE\u7F6E\u4E0D\u540C\u540E\u679C\u3002</div>
            </div>
            <div class="st-roll-inline"><input id="${e.outcomeBranchesId}" type="checkbox" /></div>
          </label>

          <label class="st-roll-item st-roll-search-item" data-st-roll-search="explode outcome branch">
            <div class="st-roll-item-main">
              <div class="st-roll-item-title">\u542F\u7528\u7206\u9AB0\u7279\u6B8A\u5206\u652F</div>
              <div class="st-roll-item-desc">\u51FA\u73B0\u7206\u9AB0\u65F6\uFF0C\u4F18\u5148\u4F7F\u7528\u7206\u9AB0\u540E\u679C\u6587\u672C\u3002</div>
            </div>
            <div class="st-roll-inline"><input id="${e.explodeOutcomeId}" type="checkbox" /></div>
          </label>

          <label class="st-roll-item st-roll-search-item" data-st-roll-search="list outcome preview">
            <div class="st-roll-item-main">
              <div class="st-roll-item-title">\u5217\u8868\u5361\u9884\u89C8\u8D70\u5411</div>
              <div class="st-roll-item-desc">\u8FD8\u6CA1\u63B7\u9AB0\u65F6\uFF0C\u4E5F\u80FD\u5148\u770B\u5230\u53EF\u80FD\u51FA\u73B0\u7684\u4E09\u79CD\u7ED3\u679C\u3002</div>
            </div>
            <div class="st-roll-inline"><input id="${e.listOutcomePreviewId}" type="checkbox" /></div>
          </label>

          <div class="st-roll-divider"><i class="fa-solid fa-file-lines"></i><span>\u6458\u8981\u6CE8\u5165</span><div class="st-roll-divider-line"></div></div>

          <div class="st-roll-item st-roll-search-item" data-st-roll-search="summary detail mode">
            <div class="st-roll-item-main">
              <div class="st-roll-item-title">\u6458\u8981\u4FE1\u606F\u7B49\u7EA7</div>
              <div class="st-roll-item-desc">\u63A7\u5236\u53D1\u7ED9 AI \u7684\u5386\u53F2\u6458\u8981\u662F\u7B80\u7565\u3001\u5E73\u8861\u8FD8\u662F\u8BE6\u7EC6\u3002</div>
            </div>
            <div class="st-roll-row">
              <select id="${e.summaryDetailId}" class="st-roll-select">
                <option value="minimal">\u7B80\u7565</option>
                <option value="balanced">\u5E73\u8861</option>
                <option value="detailed">\u8BE6\u7EC6</option>
              </select>
            </div>
          </div>

          <div class="st-roll-item st-roll-search-item" data-st-roll-search="summary rounds history">
            <div class="st-roll-item-main">
              <div class="st-roll-item-title">\u5386\u53F2\u8F6E\u6B21\u6570</div>
              <div class="st-roll-item-desc">\u6BCF\u6B21\u9644\u5E26\u6700\u8FD1 N \u8F6E\u8BB0\u5F55\u3002\u6570\u5B57\u8D8A\u5927\uFF0CAI \u4E0A\u4E0B\u6587\u8D8A\u5B8C\u6574\u3002</div>
            </div>
            <div class="st-roll-row"><input id="${e.summaryRoundsId}" class="st-roll-input" type="number" min="1" max="10" step="1" /></div>
          </div>

          <label class="st-roll-item st-roll-search-item" data-st-roll-search="summary include outcome">
            <div class="st-roll-item-main">
              <div class="st-roll-item-title">\u6458\u8981\u5305\u542B\u8D70\u5411\u6587\u672C</div>
              <div class="st-roll-item-desc">\u628A\u672C\u8F6E\u547D\u4E2D\u7684\u540E\u679C\u6587\u672C\u4E5F\u5199\u8FDB\u6458\u8981\u3002</div>
            </div>
            <div class="st-roll-inline"><input id="${e.includeOutcomeSummaryId}" type="checkbox" /></div>
          </label>

          <div class="st-roll-divider"><i class="fa-solid fa-stopwatch"></i><span>\u65F6\u9650\u63A7\u5236</span><div class="st-roll-divider-line"></div></div>

          <label class="st-roll-item st-roll-search-item" data-st-roll-search="time limit timeout">
            <div class="st-roll-item-main">
              <div class="st-roll-item-title">\u542F\u7528\u4E8B\u4EF6\u65F6\u9650</div>
              <div class="st-roll-item-desc">\u4E8B\u4EF6\u4F1A\u5012\u8BA1\u65F6\uFF0C\u8D85\u65F6\u540E\u81EA\u52A8\u6309\u5931\u8D25\u7ED3\u7B97\u3002</div>
            </div>
            <div class="st-roll-inline"><input id="${e.timeLimitEnabledId}" type="checkbox" /></div>
          </label>

          <div id="${e.timeLimitRowId}" class="st-roll-item st-roll-search-item" data-st-roll-search="minimum time limit seconds">
            <div class="st-roll-item-main">
              <div class="st-roll-item-title">\u6700\u77ED\u65F6\u9650\uFF08\u79D2\uFF09</div>
              <div class="st-roll-item-desc">AI \u7ED9\u7684\u65F6\u9650\u592A\u77ED\u65F6\uFF0C\u4F1A\u81EA\u52A8\u63D0\u9AD8\u5230\u8FD9\u4E2A\u503C\u3002</div>
            </div>
            <div class="st-roll-row"><input id="${e.timeLimitMinId}" class="st-roll-input" type="number" min="1" step="1" /></div>
          </div>

          <div class="st-roll-tip st-roll-search-item" data-st-roll-search="prompt summary status block">
            \u53D1\u9001\u524D\u4F1A\u81EA\u52A8\u6CE8\u5165\u89C4\u5219\u3001\u6458\u8981\u548C\u72B6\u6001\u4FE1\u606F\uFF0C\u5E2E\u52A9 AI \u6301\u7EED\u7406\u89E3\u5F53\u524D\u8FDB\u5C55\u3002
          </div>
        </div>

        <div id="${e.panelSkillId}" class="st-roll-panel" hidden>
          <div class="st-roll-divider"><i class="fa-solid fa-bolt"></i><span>\u6280\u80FD\u7CFB\u7EDF</span><div class="st-roll-divider-line"></div></div>

          <label class="st-roll-item st-roll-search-item" data-st-roll-search="skill system enable">
            <div class="st-roll-item-main">
              <div class="st-roll-item-title">\u542F\u7528\u6280\u80FD\u7CFB\u7EDF</div>
              <div class="st-roll-item-desc">\u5173\u95ED\u540E\uFF0C\u6280\u80FD\u52A0\u503C\u4E0D\u518D\u53C2\u4E0E\u63B7\u9AB0\u8BA1\u7B97\u3002</div>
            </div>
            <div class="st-roll-inline"><input id="${e.skillEnabledId}" type="checkbox" /></div>
          </label>

          <div class="st-roll-item st-roll-search-item" data-st-roll-search="skill editor modal">
            <div class="st-roll-item-main">
              <div class="st-roll-item-title">\u6280\u80FD\u7F16\u8F91\u5668</div>
              <div class="st-roll-item-desc">\u5728\u8FD9\u91CC\u7EF4\u62A4\u6280\u80FD\u9884\u8BBE\u548C\u6BCF\u4E2A\u6280\u80FD\u7684\u52A0\u503C\u3002</div>
            </div>
            <div class="st-roll-actions">
              <button id="${e.skillEditorOpenId}" type="button" class="st-roll-btn">\u6253\u5F00\u7F16\u8F91\u5668</button>
            </div>
          </div>

          <dialog id="${e.skillModalId}" class="st-roll-skill-modal">
            <div class="st-roll-skill-modal-backdrop" data-skill-modal-role="backdrop"></div>
            <div class="st-roll-skill-modal-panel">
              <div class="st-roll-skill-modal-head">
                <div class="st-roll-skill-modal-title"><i class="fa-solid fa-bolt"></i><span>\u6280\u80FD\u9884\u8BBE\u7F16\u8F91\u5668</span></div>
                <button id="${e.skillModalCloseId}" type="button" class="st-roll-btn secondary st-roll-skill-modal-close">\u5173\u95ED</button>
              </div>

              <div class="st-roll-skill-modal-body">
                <div id="${e.skillPresetLayoutId}" class="st-roll-skill-layout">
                  <aside id="${e.skillPresetSidebarId}" class="st-roll-skill-presets">
                    <div class="st-roll-skill-presets-head">
                      <span class="st-roll-field-label">\u6280\u80FD\u9884\u8BBE</span>
                      <div class="st-roll-actions">
                        <button id="${e.skillPresetCreateId}" type="button" class="st-roll-btn">\u65B0\u5EFA\u9884\u8BBE</button>
                        <button id="${e.skillPresetDeleteId}" type="button" class="st-roll-btn secondary">\u5220\u9664\u9884\u8BBE</button>
                      </div>
                    </div>
                    <div id="${e.skillPresetMetaId}" class="st-roll-skill-preset-meta"></div>
                    <div id="${e.skillPresetListId}" class="st-roll-skill-preset-list"></div>
                  </aside>

                  <div id="${e.skillEditorWrapId}" class="st-roll-textarea-wrap">
                    <div class="st-roll-row st-roll-skill-rename-row">
                      <span class="st-roll-field-label">\u9884\u8BBE\u540D\u79F0</span>
                      <input id="${e.skillPresetNameId}" class="st-roll-input st-roll-skill-preset-name-input" type="text" placeholder="\u8F93\u5165\u9884\u8BBE\u540D\u79F0" />
                      <button id="${e.skillPresetRenameId}" type="button" class="st-roll-btn">\u4FDD\u5B58\u540D\u79F0</button>
                    </div>

                    <div class="st-roll-tip">\u6280\u80FD\u52A0\u503C\u8BF7\u586B\u5199\u6574\u6570\uFF1B\u540C\u540D\u6280\u80FD\u4F1A\u6309\u201C\u53BB\u7A7A\u683C + \u5FFD\u7565\u5927\u5C0F\u5199\u201D\u5224\u91CD\u3002</div>
                    <div id="${e.skillDirtyHintId}" class="st-roll-skill-dirty" hidden>\u6280\u80FD\u6539\u52A8\u5C1A\u672A\u4FDD\u5B58\uFF0C\u70B9\u51FB\u201C\u4FDD\u5B58\u6280\u80FD\u8868\u201D\u540E\u751F\u6548\u3002</div>
                    <div id="${e.skillErrorsId}" class="st-roll-skill-errors" hidden></div>

                    <div class="st-roll-skill-head">
                      <span class="st-roll-field-label">\u6280\u80FD\u8868\uFF08\u5F53\u524D\u9884\u8BBE\uFF09</span>
                      <div class="st-roll-actions">
                        <button id="${e.skillAddId}" type="button" class="st-roll-btn">\u65B0\u589E\u6280\u80FD</button>
                        <button id="${e.skillSaveId}" type="button" class="st-roll-btn">\u4FDD\u5B58\u6280\u80FD\u8868</button>
                        <button id="${e.skillResetId}" type="button" class="st-roll-btn secondary">\u91CD\u7F6E\u4E3A\u7A7A</button>
                        <button id="${e.skillImportToggleId}" type="button" class="st-roll-btn secondary">\u5BFC\u5165 JSON</button>
                        <button id="${e.skillExportId}" type="button" class="st-roll-btn secondary">\u5BFC\u51FA JSON</button>
                      </div>
                    </div>

                    <div class="st-roll-skill-cols"><span>\u6280\u80FD\u540D</span><span>\u52A0\u503C\uFF08\u6574\u6570\uFF09</span><span>\u64CD\u4F5C</span></div>
                    <div id="${e.skillRowsId}" class="st-roll-skill-rows"></div>

                    <div id="${e.skillImportAreaId}" class="st-roll-skill-import" hidden>
                      <div class="st-roll-row" style="margin-bottom:8px;">
                        <span class="st-roll-field-label">\u7C98\u8D34 JSON \u540E\u70B9\u51FB\u5E94\u7528</span>
                        <div class="st-roll-actions">
                          <button id="${e.skillImportApplyId}" type="button" class="st-roll-btn">\u5E94\u7528\u5BFC\u5165</button>
                        </div>
                      </div>
                      <textarea id="${e.skillTextId}" class="st-roll-textarea" rows="7" placeholder='{"\u5BDF\u89C9":10,"\u8BF4\u670D":8}'></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </dialog>
        </div>

        <div id="${e.panelRuleId}" class="st-roll-panel" hidden>
          <div class="st-roll-divider"><i class="fa-solid fa-scroll"></i><span>\u4E8B\u4EF6\u534F\u8BAE\u89C4\u5219</span><div class="st-roll-divider-line"></div></div>

          <div class="st-roll-textarea-wrap st-roll-search-item" data-st-roll-search="rule text save reset">
            <div class="st-roll-row" style="margin-bottom:8px;">
              <span class="st-roll-field-label">\u53D1\u9001\u7ED9 AI \u7684\u89C4\u5219\u6587\u672C</span>
              <div class="st-roll-actions">
                <button id="${e.ruleSaveId}" type="button" class="st-roll-btn">\u4FDD\u5B58\u89C4\u5219</button>
                <button id="${e.ruleResetId}" type="button" class="st-roll-btn secondary">\u6062\u590D\u9ED8\u8BA4</button>
              </div>
            </div>
            <textarea id="${e.ruleTextId}" class="st-roll-textarea" rows="12"></textarea>
          </div>
        </div>

        <div id="${e.panelAboutId}" class="st-roll-panel" hidden>
          <div class="st-roll-divider"><i class="fa-solid fa-circle-info"></i><span>\u5173\u4E8E\u63D2\u4EF6</span><div class="st-roll-divider-line"></div></div>

          <div class="st-roll-item st-roll-search-item" data-st-roll-search="about version author email github">
            <div class="st-roll-item-main">
              <div class="st-roll-item-title">SillyTavern-Roll Event</div>
              <div class="st-roll-item-desc st-roll-about-meta">
                <span class="st-roll-about-meta-item"><i class="fa-solid fa-tag"></i><span>\u7248\u672C\uFF1A${e.badgeText}</span></span>
                <span class="st-roll-about-meta-item"><i class="fa-solid fa-user"></i><span>\u4F5C\u8005\uFF1A${e.authorText}</span></span>
                <span class="st-roll-about-meta-item"><i class="fa-solid fa-envelope"></i><span>\u90AE\u7BB1\uFF1A<a href="mailto:${e.emailText}">${e.emailText}</a></span></span>
                <span class="st-roll-about-meta-item"><i class="fa-brands fa-github"></i><span>GitHub\uFF1A<a href="${e.githubUrl}" target="_blank" rel="noopener">${e.githubText}</a></span></span>
              </div>
            </div>
          </div>

          <div class="st-roll-item st-roll-search-item" data-st-roll-search="command eventroll roll list help">
            <div class="st-roll-item-main">
              <div class="st-roll-item-title">\u5E38\u7528\u547D\u4EE4</div>
              <div class="st-roll-item-desc">/roll 1d20 /eventroll list /eventroll roll &lt;id&gt;</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <dialog id="${e.statusModalId}" class="st-roll-status-modal">
      <div class="st-roll-status-modal-backdrop" data-status-modal-role="backdrop"></div>
      <div class="st-roll-status-modal-panel">
        <div class="st-roll-status-modal-head">
          <div class="st-roll-status-modal-title">
            <i class="fa-solid fa-heart-pulse"></i><span>\u72B6\u6001\u7F16\u8F91\u5668\uFF08\u5F53\u524D\u4F1A\u8BDD\uFF09</span>
          </div>
          <button id="${e.statusModalCloseId}" type="button" class="st-roll-btn secondary st-roll-status-modal-close">\u5173\u95ED</button>
        </div>
        <div class="st-roll-status-modal-body">
          <div class="st-roll-tip">\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A\uFF1B\u4FEE\u6B63\u503C\u5FC5\u987B\u662F\u6574\u6570\uFF1B\u8303\u56F4\u4E3A\u201C\u6309\u6280\u80FD\u201D\u65F6\uFF0C\u6280\u80FD\u5217\u8868\u4E0D\u80FD\u4E3A\u7A7A\uFF1B\u540C\u540D\u72B6\u6001\u4E0D\u80FD\u91CD\u590D\u3002</div>
          <div id="${e.statusDirtyHintId}" class="st-roll-status-dirty" hidden>\u72B6\u6001\u6539\u52A8\u5C1A\u672A\u4FDD\u5B58\uFF0C\u70B9\u51FB\u201C\u4FDD\u5B58\u72B6\u6001\u201D\u540E\u7ACB\u5373\u751F\u6548\u3002</div>
          <div id="${e.statusErrorsId}" class="st-roll-status-errors" hidden></div>
          <div class="st-roll-status-head">
            <span class="st-roll-field-label">Active_Statuses\uFF08\u4F1A\u8BDD\u7EA7\uFF09</span>
            <div class="st-roll-actions">
              <button id="${e.statusAddId}" type="button" class="st-roll-btn">\u65B0\u589E\u72B6\u6001</button>
              <button id="${e.statusSaveId}" type="button" class="st-roll-btn">\u4FDD\u5B58\u72B6\u6001</button>
              <button id="${e.statusResetId}" type="button" class="st-roll-btn secondary">\u91CD\u7F6E\u4E3A\u7A7A</button>
            </div>
          </div>
          <div class="st-roll-status-cols">
            <span>\u540D\u79F0</span><span>\u4FEE\u6B63</span><span>\u8303\u56F4</span><span>\u6280\u80FD\u5217\u8868\uFF08\u7528 | \u5206\u9694\uFF09</span><span>\u542F\u7528</span><span>\u64CD\u4F5C</span>
          </div>
          <div id="${e.statusRowsId}" class="st-roll-status-rows"></div>
        </div>
      </div>
    </dialog>
  `}function jn(e){return`
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

    #${e} .st-roll-skill-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      margin-top: 8px;
      margin-bottom: 8px;
      flex-wrap: wrap;
    }

    #${e} .st-roll-skill-cols {
      display: grid;
      grid-template-columns: minmax(160px, 1fr) 130px 76px;
      gap: 8px;
      font-size: 12px;
      font-weight: 700;
      opacity: 0.72;
      margin-bottom: 6px;
      padding: 0 2px;
    }

    #${e} .st-roll-skill-cols span:nth-child(2),
    #${e} .st-roll-skill-cols span:nth-child(3) {
      text-align: center;
    }

    #${e} .st-roll-skill-rows {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    #${e} .st-roll-skill-row {
      display: grid;
      grid-template-columns: minmax(160px, 1fr) 130px 76px;
      gap: 8px;
      align-items: center;
    }

    #${e} .st-roll-skill-name,
    #${e} .st-roll-skill-modifier {
      width: 100%;
    }

    #${e} .st-roll-skill-modifier {
      text-align: center;
    }

    #${e} .st-roll-skill-remove {
      padding-left: 0;
      padding-right: 0;
    }

    #${e} .st-roll-skill-empty {
      border: 1px dashed rgba(255, 255, 255, 0.22);
      border-radius: 8px;
      padding: 10px;
      text-align: center;
      font-size: 12px;
      opacity: 0.7;
      background: rgba(255, 255, 255, 0.03);
    }

    #${e} .st-roll-skill-errors {
      border: 1px solid rgba(255, 110, 110, 0.45);
      border-radius: 8px;
      padding: 8px 10px;
      background: rgba(120, 20, 20, 0.22);
      margin-top: 8px;
      margin-bottom: 8px;
    }

    #${e} .st-roll-skill-error-item {
      font-size: 12px;
      line-height: 1.45;
      color: #ffd2d2;
    }

    #${e} .st-roll-skill-dirty {
      margin-top: 8px;
      margin-bottom: 2px;
      font-size: 12px;
      line-height: 1.4;
      color: #ffe0a6;
    }

    #${e} .st-roll-skill-import {
      margin-top: 10px;
      padding-top: 10px;
      border-top: 1px dashed rgba(255, 255, 255, 0.22);
    }

    #${e} .st-roll-skill-modal {
      position: fixed;
      inset: 0;
      z-index: 32000;
      border: 0;
      padding: 0;
      margin: 0;
      width: 100vw;
      height: 100vh;
      max-width: none;
      max-height: none;
      background: transparent;
    }

    #${e} .st-roll-skill-modal:not([open]) {
      display: none !important;
    }

    #${e} .st-roll-skill-modal[open] {
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }

    #${e} .st-roll-skill-modal::backdrop {
      background: rgba(0, 0, 0, 0.72);
      backdrop-filter: blur(2px);
    }

    #${e} .st-roll-skill-modal-backdrop {
      position: absolute;
      inset: 0;
      background: transparent;
      backdrop-filter: none;
    }

    #${e} .st-roll-skill-modal-panel {
      position: relative;
      z-index: 1;
      display: flex;
      flex-direction: column;
      width: min(1460px, 96vw);
      height: min(96vh, 920px);
      margin: 0;
      border: 1px solid rgba(197, 160, 89, 0.38);
      border-radius: 14px;
      overflow: hidden;
      background:
        radial-gradient(110% 130% at 100% 0%, rgba(197, 160, 89, 0.14), transparent 56%),
        linear-gradient(160deg, rgba(23, 21, 24, 0.96), rgba(15, 14, 17, 0.96));
      box-shadow: 0 18px 54px rgba(0, 0, 0, 0.46);
    }

    #${e} .st-roll-skill-modal-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      padding: 12px 14px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(255, 255, 255, 0.04);
    }

    #${e} .st-roll-skill-modal-title {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-size: 14px;
      font-weight: 700;
    }

    #${e} .st-roll-skill-modal-close {
      min-width: 72px;
    }

    #${e} .st-roll-skill-modal-body {
      flex: 1;
      min-height: 0;
      overflow: auto;
      padding: 12px;
    }

    #${e} .st-roll-skill-layout {
      display: grid;
      grid-template-columns: minmax(220px, 280px) 1fr;
      gap: 10px;
      align-items: start;
    }

    #${e} .st-roll-skill-presets {
      border: 1px solid rgba(255, 255, 255, 0.18);
      border-radius: 10px;
      background: rgba(0, 0, 0, 0.16);
      padding: 10px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      min-height: 260px;
    }

    #${e} .st-roll-skill-presets-head {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    #${e} .st-roll-skill-preset-meta {
      min-height: 24px;
      font-size: 12px;
      line-height: 1.4;
      opacity: 0.78;
    }

    #${e} .st-roll-skill-preset-list {
      display: flex;
      flex-direction: column;
      gap: 6px;
      max-height: 360px;
      overflow: auto;
      padding-right: 2px;
    }

    #${e} .st-roll-skill-preset-item {
      width: 100%;
      border: 1px solid rgba(255, 255, 255, 0.16);
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.04);
      color: inherit;
      padding: 8px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 6px;
      cursor: pointer;
      font-size: 12px;
      line-height: 1.35;
      transition: border-color 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease;
    }

    #${e} .st-roll-skill-preset-item:hover {
      border-color: rgba(197, 160, 89, 0.58);
      background: rgba(197, 160, 89, 0.18);
    }

    #${e} .st-roll-skill-preset-item.is-active {
      border-color: rgba(197, 160, 89, 0.68);
      background: rgba(197, 160, 89, 0.24);
      box-shadow:
        0 0 0 1px rgba(197, 160, 89, 0.26),
        0 0 14px rgba(197, 160, 89, 0.18);
    }

    #${e} .st-roll-skill-preset-name {
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      text-align: left;
      font-weight: 700;
    }

    #${e} .st-roll-skill-preset-tags {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      flex-shrink: 0;
    }

    #${e} .st-roll-skill-preset-tag {
      display: inline-flex;
      align-items: center;
      height: 18px;
      padding: 0 6px;
      border-radius: 999px;
      font-size: 11px;
      opacity: 0.88;
      border: 1px solid rgba(255, 255, 255, 0.2);
      background: rgba(255, 255, 255, 0.08);
    }

    #${e} .st-roll-skill-preset-tag.active {
      border-color: rgba(197, 160, 89, 0.55);
      background: rgba(197, 160, 89, 0.24);
    }

    #${e} .st-roll-skill-preset-tag.locked {
      border-color: rgba(84, 196, 255, 0.45);
      background: rgba(84, 196, 255, 0.2);
    }

    #${e} .st-roll-skill-rename-row {
      justify-content: flex-start;
      gap: 8px;
      margin-bottom: 8px;
      flex-wrap: wrap;
    }

    #${e} .st-roll-skill-preset-name-input {
      width: min(280px, 100%);
    }

    #${e} .st-roll-skill-preset-empty {
      border: 1px dashed rgba(255, 255, 255, 0.2);
      border-radius: 8px;
      padding: 10px;
      text-align: center;
      font-size: 12px;
      opacity: 0.7;
      background: rgba(255, 255, 255, 0.03);
    }

    #${e} .st-roll-status-modal {
      position: fixed;
      inset: 0;
      z-index: 32000;
      border: 0;
      padding: 0;
      margin: 0;
      width: 100vw;
      height: 100vh;
      max-width: none;
      max-height: none;
      background: transparent;
    }

    #${e} .st-roll-status-modal:not([open]) {
      display: none !important;
    }

    #${e} .st-roll-status-modal[open] {
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }

    #${e} .st-roll-status-modal::backdrop {
      background: rgba(0, 0, 0, 0.72);
      backdrop-filter: blur(2px);
    }

    #${e} .st-roll-status-modal-backdrop {
      position: absolute;
      inset: 0;
      background: transparent;
    }

    #${e} .st-roll-status-modal-panel {
      position: relative;
      z-index: 1;
      display: flex;
      flex-direction: column;
      width: min(1220px, 96vw);
      height: min(92vh, 860px);
      margin: 0;
      border: 1px solid rgba(197, 160, 89, 0.38);
      border-radius: 14px;
      overflow: hidden;
      background:
        radial-gradient(110% 130% at 100% 0%, rgba(197, 160, 89, 0.14), transparent 56%),
        linear-gradient(160deg, rgba(23, 21, 24, 0.96), rgba(15, 14, 17, 0.96));
      box-shadow: 0 18px 54px rgba(0, 0, 0, 0.46);
    }

    #${e} .st-roll-status-modal-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      padding: 12px 14px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(255, 255, 255, 0.04);
    }

    #${e} .st-roll-status-modal-title {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-size: 14px;
      font-weight: 700;
    }

    #${e} .st-roll-status-modal-close {
      min-width: 72px;
    }

    #${e} .st-roll-status-modal-body {
      flex: 1;
      min-height: 0;
      overflow: auto;
      padding: 12px;
    }

    #${e} .st-roll-status-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      margin-top: 8px;
      margin-bottom: 8px;
      flex-wrap: wrap;
    }

    #${e} .st-roll-status-cols {
      display: grid;
      grid-template-columns: minmax(140px, 1fr) 110px 120px minmax(180px, 1fr) 90px 74px;
      gap: 8px;
      font-size: 12px;
      font-weight: 700;
      opacity: 0.72;
      margin-bottom: 6px;
      padding: 0 2px;
      align-items: center;
    }

    #${e} .st-roll-status-cols span:nth-child(2),
    #${e} .st-roll-status-cols span:nth-child(5),
    #${e} .st-roll-status-cols span:nth-child(6) {
      text-align: center;
    }

    #${e} .st-roll-status-rows {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    #${e} .st-roll-status-row {
      display: grid;
      grid-template-columns: minmax(140px, 1fr) 110px 120px minmax(180px, 1fr) 90px 74px;
      gap: 8px;
      align-items: center;
    }

    #${e} .st-roll-status-modifier {
      text-align: center;
    }

    #${e} .st-roll-status-enabled-wrap {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      font-size: 12px;
      opacity: 0.9;
      user-select: none;
    }

    #${e} .st-roll-status-remove {
      padding-left: 0;
      padding-right: 0;
    }

    #${e} .st-roll-status-empty {
      border: 1px dashed rgba(255, 255, 255, 0.22);
      border-radius: 8px;
      padding: 10px;
      text-align: center;
      font-size: 12px;
      opacity: 0.7;
      background: rgba(255, 255, 255, 0.03);
    }

    #${e} .st-roll-status-errors {
      border: 1px solid rgba(255, 110, 110, 0.45);
      border-radius: 8px;
      padding: 8px 10px;
      background: rgba(120, 20, 20, 0.22);
      margin-top: 8px;
      margin-bottom: 8px;
    }

    #${e} .st-roll-status-error-item {
      font-size: 12px;
      line-height: 1.45;
      color: #ffd2d2;
    }

    #${e} .st-roll-status-dirty {
      margin-top: 8px;
      margin-bottom: 2px;
      font-size: 12px;
      line-height: 1.4;
      color: #ffe0a6;
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

    @media (max-width: 680px) {
      #${e} .st-roll-skill-modal-panel {
        width: 100vw;
        height: 100vh;
        margin: 0;
        border-radius: 0;
      }

      #${e} .st-roll-skill-modal-head {
        padding: 10px 12px;
      }

      #${e} .st-roll-skill-modal-body {
        padding: 10px;
      }

      #${e} .st-roll-skill-layout {
        grid-template-columns: 1fr;
      }

      #${e} .st-roll-skill-presets {
        min-height: 0;
      }

      #${e} .st-roll-skill-head {
        flex-direction: column;
        align-items: stretch;
      }

      #${e} .st-roll-skill-cols {
        display: none;
      }

      #${e} .st-roll-skill-row {
        grid-template-columns: 1fr;
      }

      #${e} .st-roll-skill-modifier {
        text-align: left;
      }

      #${e} .st-roll-skill-remove {
        width: 100%;
      }

      #${e} .st-roll-status-modal-panel {
        width: 100vw;
        height: 100vh;
        margin: 0;
        border-radius: 0;
      }

      #${e} .st-roll-status-modal-head {
        padding: 10px 12px;
      }

      #${e} .st-roll-status-modal-body {
        padding: 10px;
      }

      #${e} .st-roll-status-head {
        flex-direction: column;
        align-items: stretch;
      }

      #${e} .st-roll-status-cols {
        display: none;
      }

      #${e} .st-roll-status-row {
        grid-template-columns: 1fr;
      }

      #${e} .st-roll-status-modifier {
        text-align: left;
      }

      #${e} .st-roll-status-enabled-wrap {
        justify-content: flex-start;
      }

      #${e} .st-roll-status-remove {
        width: 100%;
      }
    }
  `}var De={display_name:"\u9AB0\u5B50\u63D2\u4EF6",loading_order:10,requires:[],optional:[],js:"index.js",author:"Shion",version:"1.1.0",auto_update:!1};var ye="SillyTavern-Roll",He="st-roll-settings-Event-card",Xn="st-roll-settings-Event-style",Dt="st-roll-settings-Event-badge",yt="st-roll-settings-Event-enabled",Rt="st-roll-settings-Event-auto-rule",kt="st-roll-settings-Event-ai-roll-mode",At="st-roll-settings-Event-ai-round-control",ht="st-roll-settings-Event-exploding-enabled",Lt="st-roll-settings-Event-advantage-enabled",Mt="st-roll-settings-Event-dynamic-result-guidance",Nt="st-roll-settings-Event-dynamic-dc-reason",$t="st-roll-settings-Event-status-system-enabled",Ct="st-roll-settings-Event-status-editor-open",Ue="st-roll-settings-Event-status-modal",Wn="st-roll-settings-Event-status-modal-close",Ke="st-roll-settings-Event-status-rows",wt="st-roll-settings-Event-status-add",Pt="st-roll-settings-Event-status-save",Ot="st-roll-settings-Event-status-reset",Fe="st-roll-settings-Event-status-errors",ze="st-roll-settings-Event-status-dirty-hint",Bt="st-roll-settings-Event-allowed-dice-sides",Gt="st-roll-settings-Event-summary-detail",Ht="st-roll-settings-Event-summary-rounds",Ut="st-roll-settings-Event-apply-scope",Kt="st-roll-settings-Event-outcome-branches",Ft="st-roll-settings-Event-explode-outcome",zt="st-roll-settings-Event-summary-outcome",Vt="st-roll-settings-Event-list-outcome-preview",Yt="st-roll-settings-Event-time-limit-enabled",jt="st-roll-settings-Event-time-limit-min-seconds",qn="st-roll-settings-Event-time-limit-row",Xt="st-roll-settings-Event-skill-enabled",Do="st-roll-settings-Event-skill-editor-wrap",Re="st-roll-settings-Event-skill-rows",Jn="st-roll-settings-Event-skill-add",Zn="st-roll-settings-Event-skill-text",Qn="st-roll-settings-Event-skill-import-toggle",ei="st-roll-settings-Event-skill-import-area",ti="st-roll-settings-Event-skill-import-apply",ni="st-roll-settings-Event-skill-export",ii="st-roll-settings-Event-skill-save",ri="st-roll-settings-Event-skill-reset",Wt="st-roll-settings-Event-skill-errors",qt="st-roll-settings-Event-skill-dirty-hint",yo="st-roll-settings-Event-skill-preset-layout",Ro="st-roll-settings-Event-skill-preset-sidebar",Ve="st-roll-settings-Event-skill-preset-list",si="st-roll-settings-Event-skill-preset-create",Ye="st-roll-settings-Event-skill-preset-delete",je="st-roll-settings-Event-skill-preset-name",oi="st-roll-settings-Event-skill-preset-rename",Jt="st-roll-settings-Event-skill-preset-meta",li="st-roll-settings-Event-skill-editor-open",Xe="st-roll-settings-Event-skill-modal",ai="st-roll-settings-Event-skill-modal-close",Zt="st-roll-settings-Event-rule-text",di="st-roll-settings-Event-rule-save",ci="st-roll-settings-Event-rule-reset",ui="st-roll-settings-Event-search",Ei="st-roll-settings-Event-tab-main",vi="st-roll-settings-Event-tab-skill",mi="st-roll-settings-Event-tab-rule",gi="st-roll-settings-Event-tab-about",Si="st-roll-settings-Event-panel-main",pi="st-roll-settings-Event-panel-skill",Ti="st-roll-settings-Event-panel-rule",fi="st-roll-settings-Event-panel-about",j=De,Qt=typeof De.version=="string"&&De.version.trim().length>0?De.version.trim():"unknown",ko=typeof j.author=="string"&&j.author.trim().length>0?j.author.trim():"Shion",Ao=typeof j.email=="string"&&j.email.trim().length>0?j.email.trim():"348591466@qq.com",_i=typeof j.homepage=="string"&&/^https?:\/\//i.test(j.homepage.trim())?j.homepage.trim():"https://github.com/ShionCox/SillyTavern-Roll",ho=_i.replace(/^https?:\/\//i,""),bi={SETTINGS_CARD_ID_Event:He,SETTINGS_BADGE_ID_Event:Dt,SETTINGS_BADGE_VERSION_Event:Qt,SETTINGS_AUTHOR_TEXT_Event:ko,SETTINGS_EMAIL_TEXT_Event:Ao,SETTINGS_GITHUB_TEXT_Event:ho,SETTINGS_GITHUB_URL_Event:_i,SETTINGS_SEARCH_ID_Event:ui,SETTINGS_TAB_MAIN_ID_Event:Ei,SETTINGS_TAB_SKILL_ID_Event:vi,SETTINGS_TAB_RULE_ID_Event:mi,SETTINGS_TAB_ABOUT_ID_Event:gi,SETTINGS_PANEL_MAIN_ID_Event:Si,SETTINGS_PANEL_SKILL_ID_Event:pi,SETTINGS_PANEL_RULE_ID_Event:Ti,SETTINGS_PANEL_ABOUT_ID_Event:fi,SETTINGS_ENABLED_ID_Event:yt,SETTINGS_RULE_ID_Event:Rt,SETTINGS_AI_ROLL_MODE_ID_Event:kt,SETTINGS_AI_ROUND_CONTROL_ID_Event:At,SETTINGS_EXPLODING_ENABLED_ID_Event:ht,SETTINGS_ADVANTAGE_ENABLED_ID_Event:Lt,SETTINGS_DYNAMIC_RESULT_GUIDANCE_ID_Event:Mt,SETTINGS_DYNAMIC_DC_REASON_ID_Event:Nt,SETTINGS_STATUS_SYSTEM_ENABLED_ID_Event:$t,SETTINGS_STATUS_EDITOR_OPEN_ID_Event:Ct,SETTINGS_STATUS_MODAL_ID_Event:Ue,SETTINGS_STATUS_MODAL_CLOSE_ID_Event:Wn,SETTINGS_STATUS_ROWS_ID_Event:Ke,SETTINGS_STATUS_ADD_ID_Event:wt,SETTINGS_STATUS_SAVE_ID_Event:Pt,SETTINGS_STATUS_RESET_ID_Event:Ot,SETTINGS_STATUS_ERRORS_ID_Event:Fe,SETTINGS_STATUS_DIRTY_HINT_ID_Event:ze,SETTINGS_ALLOWED_DICE_SIDES_ID_Event:Bt,SETTINGS_SUMMARY_DETAIL_ID_Event:Gt,SETTINGS_SUMMARY_ROUNDS_ID_Event:Ht,SETTINGS_SCOPE_ID_Event:Ut,SETTINGS_OUTCOME_BRANCHES_ID_Event:Kt,SETTINGS_EXPLODE_OUTCOME_ID_Event:Ft,SETTINGS_SUMMARY_OUTCOME_ID_Event:zt,SETTINGS_LIST_OUTCOME_PREVIEW_ID_Event:Vt,SETTINGS_TIME_LIMIT_ENABLED_ID_Event:Yt,SETTINGS_TIME_LIMIT_MIN_ID_Event:jt,SETTINGS_TIME_LIMIT_ROW_ID_Event:qn,SETTINGS_SKILL_ENABLED_ID_Event:Xt,SETTINGS_SKILL_EDITOR_WRAP_ID_Event:Do,SETTINGS_SKILL_ROWS_ID_Event:Re,SETTINGS_SKILL_ADD_ID_Event:Jn,SETTINGS_SKILL_TEXT_ID_Event:Zn,SETTINGS_SKILL_IMPORT_TOGGLE_ID_Event:Qn,SETTINGS_SKILL_IMPORT_AREA_ID_Event:ei,SETTINGS_SKILL_IMPORT_APPLY_ID_Event:ti,SETTINGS_SKILL_EXPORT_ID_Event:ni,SETTINGS_SKILL_SAVE_ID_Event:ii,SETTINGS_SKILL_RESET_ID_Event:ri,SETTINGS_SKILL_ERRORS_ID_Event:Wt,SETTINGS_SKILL_DIRTY_HINT_ID_Event:qt,SETTINGS_SKILL_PRESET_LAYOUT_ID_Event:yo,SETTINGS_SKILL_PRESET_SIDEBAR_ID_Event:Ro,SETTINGS_SKILL_PRESET_LIST_ID_Event:Ve,SETTINGS_SKILL_PRESET_CREATE_ID_Event:si,SETTINGS_SKILL_PRESET_DELETE_ID_Event:Ye,SETTINGS_SKILL_PRESET_NAME_ID_Event:je,SETTINGS_SKILL_PRESET_RENAME_ID_Event:oi,SETTINGS_SKILL_PRESET_META_ID_Event:Jt,SETTINGS_SKILL_EDITOR_OPEN_ID_Event:li,SETTINGS_SKILL_MODAL_ID_Event:Xe,SETTINGS_SKILL_MODAL_CLOSE_ID_Event:ai,SETTINGS_RULE_SAVE_ID_Event:di,SETTINGS_RULE_RESET_ID_Event:ci,SETTINGS_RULE_TEXT_ID_Event:Zt},Ii={SETTINGS_TAB_MAIN_ID_Event:Ei,SETTINGS_TAB_SKILL_ID_Event:vi,SETTINGS_TAB_RULE_ID_Event:mi,SETTINGS_TAB_ABOUT_ID_Event:gi,SETTINGS_PANEL_MAIN_ID_Event:Si,SETTINGS_PANEL_SKILL_ID_Event:pi,SETTINGS_PANEL_RULE_ID_Event:Ti,SETTINGS_PANEL_ABOUT_ID_Event:fi,SETTINGS_SKILL_MODAL_ID_Event:Xe,SETTINGS_SKILL_EDITOR_OPEN_ID_Event:li,SETTINGS_SKILL_MODAL_CLOSE_ID_Event:ai,SETTINGS_STATUS_MODAL_ID_Event:Ue,SETTINGS_STATUS_EDITOR_OPEN_ID_Event:Ct,SETTINGS_STATUS_MODAL_CLOSE_ID_Event:Wn,SETTINGS_SEARCH_ID_Event:ui},xi={SETTINGS_ENABLED_ID_Event:yt,SETTINGS_RULE_ID_Event:Rt,SETTINGS_AI_ROLL_MODE_ID_Event:kt,SETTINGS_AI_ROUND_CONTROL_ID_Event:At,SETTINGS_EXPLODING_ENABLED_ID_Event:ht,SETTINGS_ADVANTAGE_ENABLED_ID_Event:Lt,SETTINGS_DYNAMIC_RESULT_GUIDANCE_ID_Event:Mt,SETTINGS_DYNAMIC_DC_REASON_ID_Event:Nt,SETTINGS_STATUS_SYSTEM_ENABLED_ID_Event:$t,SETTINGS_ALLOWED_DICE_SIDES_ID_Event:Bt,SETTINGS_SUMMARY_DETAIL_ID_Event:Gt,SETTINGS_SUMMARY_ROUNDS_ID_Event:Ht,SETTINGS_SCOPE_ID_Event:Ut,SETTINGS_OUTCOME_BRANCHES_ID_Event:Kt,SETTINGS_EXPLODE_OUTCOME_ID_Event:Ft,SETTINGS_SUMMARY_OUTCOME_ID_Event:zt,SETTINGS_LIST_OUTCOME_PREVIEW_ID_Event:Vt,SETTINGS_TIME_LIMIT_ENABLED_ID_Event:Yt,SETTINGS_TIME_LIMIT_MIN_ID_Event:jt,SETTINGS_SKILL_ENABLED_ID_Event:Xt},Di={SETTINGS_SKILL_PRESET_LIST_ID_Event:Ve,SETTINGS_SKILL_PRESET_CREATE_ID_Event:si,SETTINGS_SKILL_PRESET_DELETE_ID_Event:Ye,SETTINGS_SKILL_PRESET_NAME_ID_Event:je,SETTINGS_SKILL_PRESET_RENAME_ID_Event:oi},yi={SETTINGS_SKILL_ROWS_ID_Event:Re,SETTINGS_SKILL_ADD_ID_Event:Jn},Ri={SETTINGS_SKILL_IMPORT_TOGGLE_ID_Event:Qn,SETTINGS_SKILL_IMPORT_AREA_ID_Event:ei,SETTINGS_SKILL_TEXT_ID_Event:Zn,SETTINGS_SKILL_IMPORT_APPLY_ID_Event:ti,SETTINGS_SKILL_EXPORT_ID_Event:ni,SETTINGS_SKILL_SAVE_ID_Event:ii,SETTINGS_SKILL_RESET_ID_Event:ri},ki={SETTINGS_RULE_TEXT_ID_Event:Zt,SETTINGS_RULE_SAVE_ID_Event:di,SETTINGS_RULE_RESET_ID_Event:ci},Ai={SETTINGS_ENABLED_ID_Event:yt,SETTINGS_RULE_ID_Event:Rt,SETTINGS_AI_ROLL_MODE_ID_Event:kt,SETTINGS_AI_ROUND_CONTROL_ID_Event:At,SETTINGS_EXPLODING_ENABLED_ID_Event:ht,SETTINGS_ADVANTAGE_ENABLED_ID_Event:Lt,SETTINGS_DYNAMIC_RESULT_GUIDANCE_ID_Event:Mt,SETTINGS_DYNAMIC_DC_REASON_ID_Event:Nt,SETTINGS_STATUS_SYSTEM_ENABLED_ID_Event:$t,SETTINGS_ALLOWED_DICE_SIDES_ID_Event:Bt,SETTINGS_SUMMARY_DETAIL_ID_Event:Gt,SETTINGS_SUMMARY_ROUNDS_ID_Event:Ht,SETTINGS_SCOPE_ID_Event:Ut,SETTINGS_OUTCOME_BRANCHES_ID_Event:Kt,SETTINGS_EXPLODE_OUTCOME_ID_Event:Ft,SETTINGS_SUMMARY_OUTCOME_ID_Event:zt,SETTINGS_LIST_OUTCOME_PREVIEW_ID_Event:Vt,SETTINGS_TIME_LIMIT_ENABLED_ID_Event:Yt,SETTINGS_TIME_LIMIT_MIN_ID_Event:jt,SETTINGS_TIME_LIMIT_ROW_ID_Event:qn,SETTINGS_SKILL_ENABLED_ID_Event:Xt,SETTINGS_STATUS_EDITOR_OPEN_ID_Event:Ct,SETTINGS_STATUS_ROWS_ID_Event:Ke,SETTINGS_STATUS_ERRORS_ID_Event:Fe,SETTINGS_STATUS_DIRTY_HINT_ID_Event:ze,SETTINGS_RULE_TEXT_ID_Event:Zt,SETTINGS_SKILL_ROWS_ID_Event:Re},hi="<dice_rules>",Li="</dice_rules>",en="<dice_round_summary>",tn="</dice_round_summary>",Mi="<dice_result_guidance>",Ni="</dice_result_guidance>",$i="<dice_runtime_policy>",Ci="</dice_runtime_policy>",wi="<dice_active_statuses>",Pi="</dice_active_statuses>",Oi=20,Bi=60,pe=1,Te=10,Gi=20,Hi=400,ke=1,ne="skill_preset_default_general_trpg",nn="\u901A\u7528\u53D9\u4E8BTRPG\uFF08\u9ED8\u8BA4\uFF09",rn="\u8FC1\u79FB\u6280\u80FD\u9884\u8BBE",Ae="\u65B0\u9884\u8BBE",Lo={\u5BDF\u89C9:10,\u8BF4\u670D:8,\u6F5C\u884C:6,\u8C03\u67E5:9,\u4EA4\u6D89:7,\u610F\u5FD7:8,\u53CD\u5E94:6,\u4F53\u80FD:7,\u533B\u7597:5,\u77E5\u8BC6:8},Ui=JSON.stringify(Lo,null,2),sn=/^P(?=\d|T\d)(\d+Y)?(\d+M)?(\d+W)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+S)?)?$/i,ie=`\u3010\u4E8B\u4EF6\u9AB0\u5B50\u534F\u8BAE\u3011
1. \u89E6\u53D1\u5224\u5B9A\u65F6\uFF0C\u4EC5\u5728\u56DE\u590D\u672B\u5C3E\u8F93\u51FA \`\`\`rolljson \u4EE3\u7801\u5757\uFF08\u4E25\u7981 \`\`\`json\uFF09\u3002
2. \u53D9\u4E8B\u52FF\u542B\u5224\u5B9A\u7ED3\u679C\uFF1B\u987B\u4E25\u683C\u7ED3\u5408\u4EE5\u4E0B\u4E0A\u4E0B\u6587\u4FDD\u8BC1\u5267\u60C5\u4E00\u81F4\uFF1A
   - <dice_runtime_policy>\uFF1A\u9075\u5FAA\u5168\u5C40\u89C4\u5219\uFF08\u9762\u6570\u3001\u6280\u80FD\u8868\u3001\u65F6\u95F4\u4E0B\u9650\u53CA round_mode / ai_round_control_enabled \u7B49\uFF09\u3002
   - <dice_round_summary>\uFF1A\u627F\u63A5\u5386\u53F2\u8F6E\u6B21\u7ED3\u679C\uFF0C\u4FDD\u6301\u5267\u60C5\u8FDE\u8D2F\u3002
   - <dice_result_guidance>\uFF1A\u6267\u884C\u53D9\u4E8B\u6307\u4EE4\uFF08\u5982\u5927\u6210\u529F\u8868\u73B0\u3001\u989D\u5916\u6536\u76CA\uFF09\u3002
   - <dice_active_statuses>\uFF1A\u4F53\u73B0\u5F53\u524D\u72B6\u6001\u4FEE\u9970\u5BF9\u5267\u60C5\u7684\u5B9E\u8D28\u5F71\u54CD\u3002
3. rolljson \u7ED3\u6784\u4E25\u683C\u5982\u4E0B\uFF1A
{
  "type": "dice_events",
  "version": "1",
  "events": [{
    // --- \u5FC5\u586B ---
    "id": "str",
    "title": "str",
    "checkDice": "str", // NdM[!][khX|klX][+/-B]\u3002\u9762\u6570\u9650policy\u5141\u8BB8\u503C\u3002kh/kl\u8986\u76D6advantage\u4E14\u7981\u4E0E!\u540C\u7528\u3002
    "dc": num,
    "skill": "str", // \u9650policy\u6280\u80FD\u8868
    "desc": "str",
    // --- \u53EF\u9009 ---
    "compare": "str", // >=, >, <=, < (\u9ED8\u8BA4>=)
    "scope": "str", // protagonist, character, all
    "rollMode": "str", // auto(\u7CFB\u7EDF\u81EA\u52A8/\u5206\u652F), manual(\u9ED8\u8BA4)
    "advantageState": "str", // normal, advantage, disadvantage
    "dc_reason": "str", // \u96BE\u5EA6\u6765\u6E90
    "timeLimit": "str", // ISO 8601 (\u4F8B:PT30S\uFF0C\u987B\u7B26policy\u6700\u4F4E\u9650\u5236)
    "target": { "type": "self|scene|supporting|object|other", "name": "str(\u53EF\u9009)" },
    "outcomes": { 
      "success": "str", // \u6210\u529F\u8D70\u5411
      "failure": "str", // \u5931\u8D25/\u8D85\u65F6\u8D70\u5411
      "explode": "str"  // \u7206\u9AB0\u8D70\u5411(\u4F18\u5148)
      // \u3010\u72B6\u6001\u6807\u7B7E\u3011\u4EC5\u9650\u5199\u5728outcomes\u6587\u672C\u5185\uFF1A
      // [APPLY_STATUS:\u540D,\u503C,skills=A|B] \u6216 scope=all (\u7F3A\u7B2C3\u53C2\u6570\u9ED8\u8BA4\u5F53\u524Dskill)
      // [REMOVE_STATUS:\u540D] \u6216 [CLEAR_STATUS]
    }
  }],
  // --- \u9876\u5C42\u53EF\u9009 (\u4EC5\u5F53 policy \u4E2D round_mode=continuous \u4E14 ai_round_control_enabled=1 \u65F6\u53EF\u7528) ---
  "round_control": "str", // continue / end_round
  "end_round": bool       // \u517C\u5BB9\u5199\u6CD5 (true \u7B49\u4EF7\u4E8E round_control=end_round)
}`,ue={enabled:!0,autoSendRuleToAI:!0,enableAiRollMode:!0,enableAiRoundControl:!1,enableExplodingDice:!0,enableAdvantageSystem:!0,enableDynamicResultGuidance:!1,enableDynamicDcReason:!0,enableStatusSystem:!0,aiAllowedDiceSidesText:"4,6,8,10,12,20,100",summaryDetailMode:"minimal",summaryHistoryRounds:3,eventApplyScope:"protagonist_only",enableOutcomeBranches:!0,enableExplodeOutcomeBranch:!0,includeOutcomeInSummary:!0,showOutcomePreviewInListCard:!0,enableTimeLimit:!0,minTimeLimitSeconds:10,enableSkillSystem:!0,skillTableText:"{}",skillPresetStoreText:"",ruleText:ie};var Mo=SillyTavern.getContext(),{chatMetadata:We,saveMetadata:Ki,registerMacro:Fi,SlashCommandParser:he,SlashCommand:Le,SlashCommandArgument:qe,SlashCommandNamedArgument:_a,ARGUMENT_TYPE:Je,sendSystemMessage:on,extensionSettings:zi,saveSettingsDebounced:Vi,eventSource:Yi,event_types:ji}=Mo;function F(){try{return SillyTavern.getContext()}catch{return null}}function O(e){if(typeof on=="function")try{on("generic",e,{uses_system_ui:!0,isSmallSys:!0});return}catch(t){console.error("[\u9AB0\u5B50\u63D2\u4EF6] \u53D1\u9001\u5230\u804A\u5929\u6846\u5931\u8D25:",t)}return e}function B(e){return e===0?"0":e>0?`+${e}`:`${e}`}function fe(e,t,n){return`${B(e)} + skill ${B(t)} = ${B(n)}`}function U(e){return`${e}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,9)}`}function Ze(e){let t=0;for(let n=0;n<e.length;n++)t=(t<<5)-t+e.charCodeAt(n),t|=0;return Math.abs(t).toString(36)}function z(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\"/g,"&quot;").replace(/'/g,"&#39;")}function Me(e){return z(e).replace(/`/g,"&#96;")}function re(e){return e.replace(/\n{3,}/g,`

`).trim()}var No={},$o={...ue},Wi=()=>{};function qi(e){Wi=e}function Ne(){return We.diceRoller||(We.diceRoller={}),We.diceRoller}function tt(e){let t=Ne();t.last=e,t.lastTotal=e.total,Ki()}function Co(){let e=F();return e?((!e.chatMetadata||typeof e.chatMetadata!="object")&&(e.chatMetadata={}),e.chatMetadata):No}function A(){let e=Co();(!e.diceRollerEvent||typeof e.diceRollerEvent!="object")&&(e.diceRollerEvent={});let t=e.diceRollerEvent;return Array.isArray(t.activeStatuses)||(t.activeStatuses=[]),t}function W(){let e=F();if(typeof e?.saveMetadata=="function")try{e.saveMetadata()}catch(t){console.warn("[\u9AB0\u5B50\u63D2\u4EF6] \u4FDD\u5B58 Event \u5143\u6570\u636E\u5931\u8D25",t)}}function wo(){let e=F(),t=e?.saveSettingsDebounced??Vi;if(typeof t=="function")try{t.call(e)}catch(n){console.warn("[\u9AB0\u5B50\u63D2\u4EF6] \u4FDD\u5B58\u6269\u5C55\u8BBE\u7F6E\u5931\u8D25",n)}}function ln(){let e=F(),t=e?.saveChat??e?.saveChatConditional??e?.saveChatDebounced;if(typeof t=="function")try{Promise.resolve(t.call(e)).catch(n=>{console.warn("[\u9AB0\u5B50\u63D2\u4EF6] \u4FDD\u5B58\u804A\u5929\u5931\u8D25",n)})}catch(n){console.warn("[\u9AB0\u5B50\u63D2\u4EF6] \u4FDD\u5B58\u804A\u5929\u5931\u8D25",n)}}function y(){let t=F()?.extensionSettings??zi;if(!t||typeof t!="object")return $o;(!t[ye]||typeof t[ye]!="object")&&(t[ye]={...ue});let n=t[ye];n.enabled=n.enabled!==!1,n.autoSendRuleToAI=n.autoSendRuleToAI!==!1,n.enableAiRollMode=n.enableAiRollMode!==!1,n.enableAiRoundControl=n.enableAiRoundControl===!0,n.enableExplodingDice=n.enableExplodingDice!==!1,n.enableAdvantageSystem=n.enableAdvantageSystem!==!1,n.enableDynamicResultGuidance=n.enableDynamicResultGuidance===!0,n.enableDynamicDcReason=n.enableDynamicDcReason!==!1,n.enableStatusSystem=n.enableStatusSystem!==!1,n.aiAllowedDiceSidesText=typeof n.aiAllowedDiceSidesText=="string"?String(n.aiAllowedDiceSidesText).trim():ue.aiAllowedDiceSidesText,n.enableOutcomeBranches=n.enableOutcomeBranches!==!1,n.enableExplodeOutcomeBranch=n.enableExplodeOutcomeBranch!==!1,n.includeOutcomeInSummary=n.includeOutcomeInSummary!==!1,n.showOutcomePreviewInListCard=n.showOutcomePreviewInListCard!==!1;let i=String(n.summaryDetailMode||"").toLowerCase();n.summaryDetailMode=i==="balanced"||i==="detailed"?i:"minimal";let r=Number(n.summaryHistoryRounds),o=Number.isFinite(r)?Math.floor(r):ue.summaryHistoryRounds;n.summaryHistoryRounds=Math.min(Te,Math.max(pe,o)),n.eventApplyScope=n.eventApplyScope==="all"?"all":"protagonist_only",n.enableTimeLimit=n.enableTimeLimit!==!1;let s=Number(n.minTimeLimitSeconds),l=Number.isFinite(s)?Math.floor(s):10;n.minTimeLimitSeconds=Math.max(1,l),n.enableSkillSystem=n.enableSkillSystem!==!1,n.skillTableText=typeof n.skillTableText=="string"&&n.skillTableText.trim().length>0?n.skillTableText:"{}",n.skillPresetStoreText=un(typeof n.skillPresetStoreText=="string"?String(n.skillPresetStoreText):"",n.skillTableText);let a=En(n.skillPresetStoreText);return a&&(n.skillTableText=Qi(a,n.skillTableText),n.skillPresetStoreText=JSON.stringify(a,null,2)),n.ruleText=typeof n.ruleText=="string"&&n.ruleText.trim().length>0?n.ruleText:ie,n}function an(e=A()){return Array.isArray(e.activeStatuses)||(e.activeStatuses=[]),e.activeStatuses}function Ji(e){let t=A();t.activeStatuses=Array.isArray(e)?e:[],W()}function nt(e){let t=y();Object.assign(t,e),wo(),Wi()}function Ee(e){return String(e??"").trim().toLowerCase()}function dn(e,t){return{rowId:U("skill_row"),skillName:e,modifierText:t}}function Zi(e){let t=se(e);if(t==null)return 0;try{let n=JSON.parse(t);return!n||typeof n!="object"||Array.isArray(n)?0:Object.keys(n).length}catch{return 0}}function Qe(e=Date.now()){return{id:ne,name:nn,locked:!0,skillTableText:Ui,createdAt:e,updatedAt:e}}function it(e=Date.now()){let t=Qe(e);return{version:ke,activePresetId:t.id,presets:[t]}}function cn(e,t,n=""){let i=String(t??"").trim()||Ae,r=new Set(e.presets.filter(l=>l.id!==n).map(l=>Ee(l.name))),o=i,s=2;for(;r.has(Ee(o));)o=`${i} ${s}`,s+=1;return o}function un(e,t){let n=Date.now(),i=se(t)??"{}",r=i!=="{}",o=String(e??"").trim(),s=null;if(o)try{s=JSON.parse(o)}catch{s=null}let l=[],a=new Set,d=new Set,c=(g,m,S,f=!1)=>{let b=String(g?.id??"").trim()||U("skill_preset"),I=b;for(;a.has(I);)I=`${b}_${Math.random().toString(36).slice(2,7)}`;a.add(I);let p=String(g?.name??"").trim()||S,x=p,R=2;for(;d.has(Ee(x));)x=`${p} ${R}`,R+=1;d.add(Ee(x));let k=se(String(g?.skillTableText??"{}"))??"{}",h=Number(g?.createdAt),M=Number.isFinite(h)?h:n,$=Number(g?.updatedAt),ge=Number.isFinite($)?$:M;l.push({id:I,name:x,locked:!!(g?.locked||f),skillTableText:k,createdAt:M,updatedAt:ge})};s&&typeof s=="object"&&!Array.isArray(s)&&Array.isArray(s.presets)&&s.presets.forEach((g,m)=>{c(g,m,`${Ae} ${m+1}`)});let u=l.find(g=>g.id===ne)??null;if(u?(u.name=nn,u.locked=!0):(u=Qe(n),l.unshift(u),a.add(u.id),d.add(Ee(u.name))),!o&&r){let g={id:U("skill_preset_migration"),name:cn({version:ke,activePresetId:"",presets:l},rn),locked:!1,skillTableText:i,createdAt:n,updatedAt:n};l.push(g)}l.length||l.push(Qe(n));let E=String(s?.activePresetId??"").trim();return(!E||!l.some(g=>g.id===E))&&(!o&&r?E=l.find(m=>m.name.includes(rn))?.id??ne:E=ne),JSON.stringify({version:ke,activePresetId:E,presets:l},null,2)}function En(e){let t=String(e??"").trim();if(!t)return null;try{let n=JSON.parse(t);if(!n||typeof n!="object"||Array.isArray(n)||Number(n.version)!==ke||!Array.isArray(n.presets))return null;let i=String(n.activePresetId??"").trim(),r=n.presets;return!i||!r.length?null:n}catch{return null}}function rt(e=y()){let t=String(e.skillPresetStoreText??""),n=un(t,e.skillTableText),i=En(n);return i||it()}function et(e,t){let n=String(t??"").trim();return n?e.presets.find(i=>i.id===n)??null:null}function $e(e){let t=et(e,e.activePresetId);if(t)return t;let n=et(e,ne);return n||(e.presets[0]??Qe())}function Qi(e,t="{}"){let n=$e(e),i=se(n.skillTableText)??se(t)??"{}";return n.skillTableText=i,i}function vn(e){let t=y(),n=un(JSON.stringify(e),t.skillTableText),i=En(n)??it(),r=Qi(i,t.skillTableText);nt({skillPresetStoreText:JSON.stringify(i,null,2),skillTableText:r})}function mn(e){return JSON.stringify(e.map(t=>({skillName:String(t.skillName??""),modifierText:String(t.modifierText??"")})))}function Po(e){return typeof e=="string"?e.trim():""}function gn(e){return Po(e).toLowerCase()}function er(e){if(!e||typeof e!="object"||Array.isArray(e))return null;let t={};for(let[n,i]of Object.entries(e)){let r=gn(n);if(!r)continue;let o=Number(i);Number.isFinite(o)&&(t[r]=o)}return t}function se(e){let t=String(e??"").trim();if(!t)return"{}";try{let n=JSON.parse(t),i=er(n);return i==null?null:JSON.stringify(i,null,2)}catch{return null}}var Xi="",X={};function Oo(e){let t=String(e.skillTableText??"").trim();if(t===Xi)return X;if(Xi=t,!t)return X={},X;try{let n=JSON.parse(t),i=er(n);return i==null?(console.warn("[\u9AB0\u5B50\u63D2\u4EF6] skillTableText \u4E0D\u662F JSON \u5BF9\u8C61\uFF0C\u5DF2\u6309\u7A7A\u8868\u5904\u7406"),X={},X):(X=i,X)}catch(n){return console.warn("[\u9AB0\u5B50\u63D2\u4EF6] skillTableText \u89E3\u6790\u5931\u8D25\uFF0C\u5DF2\u6309\u7A7A\u8868\u5904\u7406",n),X={},X}}function ve(e,t=y()){if(!t.enableSkillSystem)return 0;let n=gn(e);if(!n)return 0;let i=Oo(t),r=Number(i[n]??0);return Number.isFinite(r)?r:0}function Sn(e){let t=String(e??"").trim();if(!t)return[];try{let n=JSON.parse(t);return!n||typeof n!="object"||Array.isArray(n)?[]:Object.entries(n).map(([i,r])=>dn(String(i??""),String(r??"")))}catch{return[]}}function pn(e){let t=[],n={},i=new Map,r=/^[+-]?\d+$/;return e.forEach((o,s)=>{let l=s+1,a=String(o.skillName??""),d=String(o.modifierText??""),c=a.trim(),u=gn(c),E=!1;c||(t.push(`\u7B2C ${l} \u884C\uFF1A\u6280\u80FD\u540D\u4E0D\u80FD\u4E3A\u7A7A`),E=!0);let v=0,g=d.trim();if(g?r.test(g)?(v=Number(g),Number.isFinite(v)||(t.push(`\u7B2C ${l} \u884C\uFF1A\u52A0\u503C\u5FC5\u987B\u662F\u6709\u9650\u6574\u6570`),E=!0)):(t.push(`\u7B2C ${l} \u884C\uFF1A\u52A0\u503C\u5FC5\u987B\u662F\u6574\u6570`),E=!0):(t.push(`\u7B2C ${l} \u884C\uFF1A\u52A0\u503C\u4E0D\u80FD\u4E3A\u7A7A`),E=!0),u){let m=i.get(u);m!=null?(t.push(`\u7B2C ${l} \u884C\uFF1A\u6280\u80FD\u540D\u4E0E\u7B2C ${m+1} \u884C\u91CD\u590D`),E=!0):i.set(u,s)}!E&&u&&(n[u]=v)}),{errors:t,table:n}}function tr(e){let t=pn(e);return t.errors.length>0?null:JSON.stringify(t.table,null,2)}var nr=1e3,ir=1e3,rr=1e4;function Bo(e){let t=String(e||"").trim();if(!t)return null;let n=t.match(/\[DICE_ALLOWED_SIDES\]([\s\S]*?)\[\/DICE_ALLOWED_SIDES\]/i),r=(n?n[1]:t).match(/allowed_sides\s*=\s*([^\n\r]+)/i);if(!r)return null;let o=r[1].split(/[,\s]+/).map(s=>Number(String(s||"").trim())).filter(s=>Number.isFinite(s)&&Number.isInteger(s)&&s>0);return o.length===0?null:new Set(o)}function Go(e,t){let n=G(e),i=Bo(t);if(!(!i||i.size===0)&&!i.has(n.sides))throw new Error(`\u5F53\u524D\u89C4\u5219\u4E0D\u5141\u8BB8 d${n.sides}\uFF0Callowed_sides=${Array.from(i).sort((r,o)=>r-o).join(",")}`)}function G(e){let t=String(e||"").replace(/\s+/g,""),n=/^(\d*)d(\d+)(!)?(?:(kh|kl)(\d+))?([+\-]\d+)?$/i,i=t.match(n);if(!i)throw new Error(`\u65E0\u6548\u7684\u9AB0\u5B50\u8868\u8FBE\u5F0F\uFF1A${e}\uFF0C\u793A\u4F8B\uFF1A1d20\u30013d6+2\u30012d20kh1`);let r=Number(i[1]||1),o=Number(i[2]),s=!!i[3],l=String(i[4]||"").toLowerCase(),a=l==="kh"||l==="kl"?l:void 0,d=a?Number(i[5]||0):void 0,c=Number(i[6]||0);if(!Number.isFinite(r)||!Number.isInteger(r)||r<=0)throw new Error(`\u9AB0\u5B50\u6570\u91CF\u65E0\u6548\uFF1A${r}`);if(!Number.isFinite(o)||!Number.isInteger(o)||o<=0)throw new Error(`\u9AB0\u5B50\u9762\u6570\u65E0\u6548\uFF1A${o}`);if(r>nr)throw new Error(`\u9AB0\u5B50\u6570\u91CF\u8FC7\u5927\uFF08${r}\uFF09\uFF0C\u4E0A\u9650 ${nr}`);if(o>ir)throw new Error(`\u9AB0\u5B50\u9762\u6570\u8FC7\u5927\uFF08${o}\uFF09\uFF0C\u4E0A\u9650 ${ir}`);if(a){if(!Number.isFinite(d)||!Number.isInteger(d)||d<=0)throw new Error(`kh/kl \u53C2\u6570\u65E0\u6548\uFF1A${e}`);if(d>r)throw new Error(`kh/kl \u4FDD\u7559\u6570\u91CF\u4E0D\u80FD\u5927\u4E8E\u9AB0\u5B50\u6570\u91CF\uFF1A${e}`)}if(s&&a)throw new Error("\u5F53\u524D\u7248\u672C\u4E0D\u652F\u6301 ! \u4E0E kh/kl \u540C\u65F6\u4F7F\u7528");return{count:r,sides:o,modifier:c,explode:s,keepMode:a,keepCount:d}}function sr(e){let t=Math.floor(e);if(typeof crypto<"u"&&typeof crypto.getRandomValues=="function"){let n=new Uint32Array(1),i=Math.floor(4294967295/t)*t,r;do crypto.getRandomValues(n),r=n[0];while(r>=i);return r%t+1}return Math.floor(Math.random()*t)+1}function Ho(e,t,n){let i=sr(e);if(n.push(i),!!t)for(;i===e;){if(n.length>=rr)throw new Error(`\u7206\u9AB0\u6B21\u6570\u8D85\u8FC7\u5B89\u5168\u4E0A\u9650 ${rr}\uFF0C\u8BF7\u8C03\u6574\u8868\u8FBE\u5F0F`);i=sr(e),n.push(i)}}function Ce(e){let{count:t,sides:n,modifier:i,explode:r,keepMode:o,keepCount:s}=G(e),l=y(),a=r&&l.enableExplodingDice,d=[];for(let f=0;f<t;f++)Ho(n,a,d);let c,u,E="none";if(o&&s&&s<d.length){let f=d.map((b,I)=>({value:b,index:I}));f.sort((b,I)=>b.value===I.value?b.index-I.index:o==="kh"?I.value-b.value:b.value-I.value);let _=new Set(f.slice(0,s).map(b=>b.index));c=d.filter((b,I)=>_.has(I)),u=d.filter((b,I)=>!_.has(I)),E=o==="kh"?"keep_highest":"keep_lowest"}else o&&s&&(c=[...d],u=[],E=o==="kh"?"keep_highest":"keep_lowest");let g=(Array.isArray(c)?c:d).reduce((f,_)=>f+_,0),m=g+i,S=a&&d.length>t;return{expr:e,count:t,sides:n,modifier:i,rolls:d,rawTotal:g,total:m,keepMode:o,keepCount:s,keptRolls:c,droppedRolls:u,selectionMode:E,exploding:a,explosionTriggered:S}}function st(e,t={}){t.rule&&Go(e,t.rule);let n=Ce(e);if(t.adv){let i=Ce(e),r=Ce(e);n=i.total>=r.total?i:r}if(t.dis){let i=Ce(e),r=Ce(e);n=i.total<=r.total?i:r}return n}function or(e,t,n){if(n==null||!Number.isFinite(n))return null;switch(t){case">=":return e>=n;case">":return e>n;case"<=":return e<=n;case"<":return e<n;default:return null}}function cr(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function ot(e){return cr(e).replace(/`/g,"&#96;")}function ur(e){let t=document.getElementById(e.SETTINGS_BADGE_ID_Event);t&&(t.textContent=e.SETTINGS_BADGE_VERSION_Event)}function Er(e){if(document.getElementById(e.SETTINGS_STYLE_ID_Event))return;let t=document.createElement("style");t.id=e.SETTINGS_STYLE_ID_Event,t.textContent=e.buildSettingsCardStylesTemplateEvent(e.SETTINGS_CARD_ID_Event),document.head.appendChild(t)}function vr(e){return{cardId:e.SETTINGS_CARD_ID_Event,drawerToggleId:e.drawerToggleId,drawerContentId:e.drawerContentId,drawerIconId:e.drawerIconId,badgeId:e.SETTINGS_BADGE_ID_Event,badgeText:e.SETTINGS_BADGE_VERSION_Event,authorText:e.SETTINGS_AUTHOR_TEXT_Event,emailText:e.SETTINGS_EMAIL_TEXT_Event,githubText:e.SETTINGS_GITHUB_TEXT_Event,githubUrl:e.SETTINGS_GITHUB_URL_Event,searchId:e.SETTINGS_SEARCH_ID_Event,tabMainId:e.SETTINGS_TAB_MAIN_ID_Event,tabSkillId:e.SETTINGS_TAB_SKILL_ID_Event,tabRuleId:e.SETTINGS_TAB_RULE_ID_Event,tabAboutId:e.SETTINGS_TAB_ABOUT_ID_Event,panelMainId:e.SETTINGS_PANEL_MAIN_ID_Event,panelSkillId:e.SETTINGS_PANEL_SKILL_ID_Event,panelRuleId:e.SETTINGS_PANEL_RULE_ID_Event,panelAboutId:e.SETTINGS_PANEL_ABOUT_ID_Event,enabledId:e.SETTINGS_ENABLED_ID_Event,ruleId:e.SETTINGS_RULE_ID_Event,aiRollModeId:e.SETTINGS_AI_ROLL_MODE_ID_Event,aiRoundControlId:e.SETTINGS_AI_ROUND_CONTROL_ID_Event,explodingEnabledId:e.SETTINGS_EXPLODING_ENABLED_ID_Event,advantageEnabledId:e.SETTINGS_ADVANTAGE_ENABLED_ID_Event,dynamicResultGuidanceId:e.SETTINGS_DYNAMIC_RESULT_GUIDANCE_ID_Event,dynamicDcReasonId:e.SETTINGS_DYNAMIC_DC_REASON_ID_Event,statusSystemEnabledId:e.SETTINGS_STATUS_SYSTEM_ENABLED_ID_Event,statusEditorOpenId:e.SETTINGS_STATUS_EDITOR_OPEN_ID_Event,statusModalId:e.SETTINGS_STATUS_MODAL_ID_Event,statusModalCloseId:e.SETTINGS_STATUS_MODAL_CLOSE_ID_Event,statusRowsId:e.SETTINGS_STATUS_ROWS_ID_Event,statusAddId:e.SETTINGS_STATUS_ADD_ID_Event,statusSaveId:e.SETTINGS_STATUS_SAVE_ID_Event,statusResetId:e.SETTINGS_STATUS_RESET_ID_Event,statusErrorsId:e.SETTINGS_STATUS_ERRORS_ID_Event,statusDirtyHintId:e.SETTINGS_STATUS_DIRTY_HINT_ID_Event,allowedDiceSidesId:e.SETTINGS_ALLOWED_DICE_SIDES_ID_Event,summaryDetailId:e.SETTINGS_SUMMARY_DETAIL_ID_Event,summaryRoundsId:e.SETTINGS_SUMMARY_ROUNDS_ID_Event,scopeId:e.SETTINGS_SCOPE_ID_Event,outcomeBranchesId:e.SETTINGS_OUTCOME_BRANCHES_ID_Event,explodeOutcomeId:e.SETTINGS_EXPLODE_OUTCOME_ID_Event,includeOutcomeSummaryId:e.SETTINGS_SUMMARY_OUTCOME_ID_Event,listOutcomePreviewId:e.SETTINGS_LIST_OUTCOME_PREVIEW_ID_Event,timeLimitEnabledId:e.SETTINGS_TIME_LIMIT_ENABLED_ID_Event,timeLimitMinId:e.SETTINGS_TIME_LIMIT_MIN_ID_Event,timeLimitRowId:e.SETTINGS_TIME_LIMIT_ROW_ID_Event,skillEnabledId:e.SETTINGS_SKILL_ENABLED_ID_Event,skillEditorWrapId:e.SETTINGS_SKILL_EDITOR_WRAP_ID_Event,skillRowsId:e.SETTINGS_SKILL_ROWS_ID_Event,skillAddId:e.SETTINGS_SKILL_ADD_ID_Event,skillTextId:e.SETTINGS_SKILL_TEXT_ID_Event,skillImportToggleId:e.SETTINGS_SKILL_IMPORT_TOGGLE_ID_Event,skillImportAreaId:e.SETTINGS_SKILL_IMPORT_AREA_ID_Event,skillImportApplyId:e.SETTINGS_SKILL_IMPORT_APPLY_ID_Event,skillExportId:e.SETTINGS_SKILL_EXPORT_ID_Event,skillSaveId:e.SETTINGS_SKILL_SAVE_ID_Event,skillResetId:e.SETTINGS_SKILL_RESET_ID_Event,skillErrorsId:e.SETTINGS_SKILL_ERRORS_ID_Event,skillDirtyHintId:e.SETTINGS_SKILL_DIRTY_HINT_ID_Event,skillPresetLayoutId:e.SETTINGS_SKILL_PRESET_LAYOUT_ID_Event,skillPresetSidebarId:e.SETTINGS_SKILL_PRESET_SIDEBAR_ID_Event,skillPresetListId:e.SETTINGS_SKILL_PRESET_LIST_ID_Event,skillPresetCreateId:e.SETTINGS_SKILL_PRESET_CREATE_ID_Event,skillPresetDeleteId:e.SETTINGS_SKILL_PRESET_DELETE_ID_Event,skillPresetNameId:e.SETTINGS_SKILL_PRESET_NAME_ID_Event,skillPresetRenameId:e.SETTINGS_SKILL_PRESET_RENAME_ID_Event,skillPresetMetaId:e.SETTINGS_SKILL_PRESET_META_ID_Event,skillEditorOpenId:e.SETTINGS_SKILL_EDITOR_OPEN_ID_Event,skillModalId:e.SETTINGS_SKILL_MODAL_ID_Event,skillModalCloseId:e.SETTINGS_SKILL_MODAL_CLOSE_ID_Event,ruleSaveId:e.SETTINGS_RULE_SAVE_ID_Event,ruleResetId:e.SETTINGS_RULE_RESET_ID_Event,ruleTextId:e.SETTINGS_RULE_TEXT_ID_Event}}function Tn(e,t=0){let n=Number.isFinite(e.retryLimitEvent)?Number(e.retryLimitEvent):60,i=Number.isFinite(e.retryDelayMsEvent)?Number(e.retryDelayMsEvent):500;if(document.getElementById(e.SETTINGS_CARD_ID_Event)){e.syncSettingsBadgeVersionEvent(),e.syncSettingsUiEvent();return}let r=document.getElementById("extensions_settings");if(!r){t<n&&setTimeout(()=>Tn(e,t+1),i);return}e.ensureSettingsCardStylesEvent();let o=document.createElement("div");o.id=e.SETTINGS_CARD_ID_Event;let s=`${e.SETTINGS_CARD_ID_Event}-toggle`,l=`${e.SETTINGS_CARD_ID_Event}-content`,a=`${e.SETTINGS_CARD_ID_Event}-icon`,d=e.buildSettingsCardTemplateIdsEvent(s,l,a);o.innerHTML=e.buildSettingsCardHtmlTemplateEvent(d);let c=o.querySelector(`#${e.SETTINGS_SKILL_MODAL_ID_Event}`);c&&o.appendChild(c);let u=o.querySelector(`#${e.SETTINGS_STATUS_MODAL_ID_Event}`);u&&o.appendChild(u),r.prepend(o),e.syncSettingsBadgeVersionEvent(),e.onMountedEvent({drawerToggleId:s,drawerContentId:l}),e.syncSettingsUiEvent()}var lr=!1,ar=!1;function Uo(e){let t=document.getElementById(e.SETTINGS_TAB_MAIN_ID_Event),n=document.getElementById(e.SETTINGS_TAB_SKILL_ID_Event),i=document.getElementById(e.SETTINGS_TAB_RULE_ID_Event),r=document.getElementById(e.SETTINGS_TAB_ABOUT_ID_Event),o=document.getElementById(e.SETTINGS_PANEL_MAIN_ID_Event),s=document.getElementById(e.SETTINGS_PANEL_SKILL_ID_Event),l=document.getElementById(e.SETTINGS_PANEL_RULE_ID_Event),a=document.getElementById(e.SETTINGS_PANEL_ABOUT_ID_Event),d=document.getElementById(e.SETTINGS_SKILL_MODAL_ID_Event),c=document.getElementById(e.SETTINGS_SKILL_EDITOR_OPEN_ID_Event),u=document.getElementById(e.SETTINGS_SKILL_MODAL_CLOSE_ID_Event),E=document.getElementById(e.SETTINGS_STATUS_MODAL_ID_Event),v=document.getElementById(e.SETTINGS_STATUS_EDITOR_OPEN_ID_Event),g=document.getElementById(e.SETTINGS_STATUS_MODAL_CLOSE_ID_Event),m=document.getElementById(e.SETTINGS_SEARCH_ID_Event),S=o?Array.from(o.querySelectorAll(".st-roll-search-item")):[],f=s?Array.from(s.querySelectorAll(".st-roll-search-item")):[],_=l?Array.from(l.querySelectorAll(".st-roll-search-item")):[],b=a?Array.from(a.querySelectorAll(".st-roll-search-item")):[],I=[...S,...f,..._,...b],T="main",p=()=>{if(d){if(d.open)try{d.close()}catch{}document.body.dataset.stRollSkillModalOpen==="1"&&(document.body.style.overflow=document.body.dataset.stRollSkillModalOverflow||"",delete document.body.dataset.stRollSkillModalOpen,delete document.body.dataset.stRollSkillModalOverflow)}},x=()=>{if(d){if(!d.open)try{d.showModal()}catch{d.setAttribute("open","")}document.body.dataset.stRollSkillModalOpen!=="1"&&(document.body.dataset.stRollSkillModalOpen="1",document.body.dataset.stRollSkillModalOverflow=document.body.style.overflow||"",document.body.style.overflow="hidden")}},R=()=>{if(E){if(E.open)try{E.close()}catch{}document.body.dataset.stRollStatusModalOpen==="1"&&(document.body.style.overflow=document.body.dataset.stRollStatusModalOverflow||"",delete document.body.dataset.stRollStatusModalOpen,delete document.body.dataset.stRollStatusModalOverflow)}},k=()=>{if(E){if(!E.open)try{E.showModal()}catch{E.setAttribute("open","")}document.body.dataset.stRollStatusModalOpen!=="1"&&(document.body.dataset.stRollStatusModalOpen="1",document.body.dataset.stRollStatusModalOverflow=document.body.style.overflow||"",document.body.style.overflow="hidden")}},h=D=>{T=D;let H=D==="main",Se=D==="skill",de=D==="rule",w=D==="about";t?.classList.toggle("is-active",H),n?.classList.toggle("is-active",Se),i?.classList.toggle("is-active",de),r?.classList.toggle("is-active",w),o&&(o.hidden=!H),s&&(s.hidden=!Se),l&&(l.hidden=!de),a&&(a.hidden=!w)},M=D=>D===T?!0:T==="skill"&&D!=="skill"&&!e.confirmDiscardSkillDraftEvent()?!1:(D!=="skill"&&p(),R(),h(D),!0),$=()=>{let H=String(m?.value??"").trim().toLowerCase().split(/\s+/).filter(Boolean);for(let P of I){let Ge=`${P.dataset.stRollSearch??""} ${P.textContent??""}`.toLowerCase(),xt=H.every(Io=>Ge.includes(Io));P.classList.toggle("is-hidden-by-search",!xt)}if(!H.length)return;let Se=S.some(P=>!P.classList.contains("is-hidden-by-search")),de=f.some(P=>!P.classList.contains("is-hidden-by-search")),w=_.some(P=>!P.classList.contains("is-hidden-by-search")),ce=b.some(P=>!P.classList.contains("is-hidden-by-search")),It={main:Se,skill:de,rule:w,about:ce};if(!It[T]){let Ge=["main","skill","rule","about"].find(xt=>It[xt]);Ge&&M(Ge)}};h("main"),t?.addEventListener("click",()=>{M("main")&&$()}),n?.addEventListener("click",()=>{M("skill")&&$()}),i?.addEventListener("click",()=>{M("rule")&&$()}),r?.addEventListener("click",()=>{M("about")&&$()}),m?.addEventListener("input",$),$(),c?.addEventListener("click",()=>{M("skill")&&x()}),u?.addEventListener("click",()=>{p()}),d?.addEventListener("click",D=>{let H=D.target;(D.target===d||H?.dataset.skillModalRole==="backdrop")&&p()}),d?.addEventListener("cancel",D=>{D.preventDefault(),p()}),v?.addEventListener("click",()=>{M("main")&&k()}),g?.addEventListener("click",()=>{R()}),E?.addEventListener("click",D=>{let H=D.target;(D.target===E||H?.dataset.statusModalRole==="backdrop")&&R()}),E?.addEventListener("cancel",D=>{D.preventDefault(),R()}),ar||(window.addEventListener("keydown",D=>{D.key==="Escape"&&(p(),R())}),ar=!0);let ge=document.getElementById(e.drawerToggleId),ae=document.getElementById(e.drawerContentId);ge?.addEventListener("click",D=>{if(e.isElementVisibleEvent(ae)){if(e.confirmDiscardSkillDraftEvent()){p(),R();return}D.preventDefault(),D.stopPropagation(),typeof D.stopImmediatePropagation=="function"&&D.stopImmediatePropagation()}},!0),lr||(window.addEventListener("beforeunload",D=>{e.isSkillDraftDirtyEvent()&&(D.preventDefault(),D.returnValue="")}),lr=!0)}function Ko(e){let t=document.getElementById(e.SETTINGS_ENABLED_ID_Event),n=document.getElementById(e.SETTINGS_RULE_ID_Event),i=document.getElementById(e.SETTINGS_AI_ROLL_MODE_ID_Event),r=document.getElementById(e.SETTINGS_AI_ROUND_CONTROL_ID_Event),o=document.getElementById(e.SETTINGS_EXPLODING_ENABLED_ID_Event),s=document.getElementById(e.SETTINGS_ADVANTAGE_ENABLED_ID_Event),l=document.getElementById(e.SETTINGS_DYNAMIC_RESULT_GUIDANCE_ID_Event),a=document.getElementById(e.SETTINGS_DYNAMIC_DC_REASON_ID_Event),d=document.getElementById(e.SETTINGS_STATUS_SYSTEM_ENABLED_ID_Event),c=document.getElementById(e.SETTINGS_ALLOWED_DICE_SIDES_ID_Event),u=document.getElementById(e.SETTINGS_SUMMARY_DETAIL_ID_Event),E=document.getElementById(e.SETTINGS_SUMMARY_ROUNDS_ID_Event),v=document.getElementById(e.SETTINGS_SCOPE_ID_Event),g=document.getElementById(e.SETTINGS_OUTCOME_BRANCHES_ID_Event),m=document.getElementById(e.SETTINGS_EXPLODE_OUTCOME_ID_Event),S=document.getElementById(e.SETTINGS_SUMMARY_OUTCOME_ID_Event),f=document.getElementById(e.SETTINGS_LIST_OUTCOME_PREVIEW_ID_Event),_=document.getElementById(e.SETTINGS_TIME_LIMIT_ENABLED_ID_Event),b=document.getElementById(e.SETTINGS_TIME_LIMIT_MIN_ID_Event),I=document.getElementById(e.SETTINGS_SKILL_ENABLED_ID_Event);t?.addEventListener("input",T=>{let p=!!T.target.checked;e.updateSettingsEvent({enabled:p})}),n?.addEventListener("input",T=>{let p=!!T.target.checked;e.updateSettingsEvent({autoSendRuleToAI:p})}),i?.addEventListener("input",T=>{let p=!!T.target.checked;e.updateSettingsEvent({enableAiRollMode:p})}),r?.addEventListener("input",T=>{let p=!!T.target.checked;e.updateSettingsEvent({enableAiRoundControl:p})}),o?.addEventListener("input",T=>{let p=!!T.target.checked;e.updateSettingsEvent({enableExplodingDice:p})}),s?.addEventListener("input",T=>{let p=!!T.target.checked;e.updateSettingsEvent({enableAdvantageSystem:p})}),l?.addEventListener("input",T=>{let p=!!T.target.checked;e.updateSettingsEvent({enableDynamicResultGuidance:p})}),a?.addEventListener("input",T=>{let p=!!T.target.checked;e.updateSettingsEvent({enableDynamicDcReason:p})}),d?.addEventListener("input",T=>{let p=!!T.target.checked;e.updateSettingsEvent({enableStatusSystem:p})}),c?.addEventListener("change",T=>{let p=String(T.target.value||"").trim();e.updateSettingsEvent({aiAllowedDiceSidesText:p})}),u?.addEventListener("change",T=>{let p=String(T.target.value||""),x=p==="balanced"||p==="detailed"?p:"minimal";e.updateSettingsEvent({summaryDetailMode:x})}),E?.addEventListener("change",T=>{let p=Number(T.target.value),x=Number.isFinite(p)?Math.min(e.SUMMARY_HISTORY_ROUNDS_MAX_Event,Math.max(e.SUMMARY_HISTORY_ROUNDS_MIN_Event,Math.floor(p))):e.DEFAULT_SUMMARY_HISTORY_ROUNDS_Event;e.updateSettingsEvent({summaryHistoryRounds:x})}),v?.addEventListener("change",T=>{let p=String(T.target.value||"");e.updateSettingsEvent({eventApplyScope:p==="all"?"all":"protagonist_only"})}),g?.addEventListener("input",T=>{let p=!!T.target.checked;e.updateSettingsEvent({enableOutcomeBranches:p})}),m?.addEventListener("input",T=>{let p=!!T.target.checked;e.updateSettingsEvent({enableExplodeOutcomeBranch:p})}),S?.addEventListener("input",T=>{let p=!!T.target.checked;e.updateSettingsEvent({includeOutcomeInSummary:p})}),f?.addEventListener("input",T=>{let p=!!T.target.checked;e.updateSettingsEvent({showOutcomePreviewInListCard:p})}),_?.addEventListener("input",T=>{let p=!!T.target.checked;e.updateSettingsEvent({enableTimeLimit:p})}),b?.addEventListener("change",T=>{let p=Number(T.target.value),x=Number.isFinite(p)?Math.max(1,Math.floor(p)):10;e.updateSettingsEvent({minTimeLimitSeconds:x})}),I?.addEventListener("input",T=>{let p=!!T.target.checked;e.updateSettingsEvent({enableSkillSystem:p})})}function Fo(e){let t=document.getElementById(e.SETTINGS_SKILL_PRESET_LIST_ID_Event),n=document.getElementById(e.SETTINGS_SKILL_PRESET_CREATE_ID_Event),i=document.getElementById(e.SETTINGS_SKILL_PRESET_DELETE_ID_Event),r=document.getElementById(e.SETTINGS_SKILL_PRESET_NAME_ID_Event),o=document.getElementById(e.SETTINGS_SKILL_PRESET_RENAME_ID_Event);t?.addEventListener("click",l=>{let d=l.target?.closest("button[data-skill-preset-id]");if(!d)return;let c=String(d.dataset.skillPresetId??"");if(!c||c===e.getSkillEditorActivePresetIdEvent()||!e.confirmDiscardSkillDraftEvent())return;let u=e.getSettingsEvent(),E=e.getSkillPresetStoreEvent(u),v=e.getSkillPresetByIdEvent(E,c);v&&(E.activePresetId=v.id,e.saveSkillPresetStoreEvent(E))}),n?.addEventListener("click",()=>{if(!e.confirmDiscardSkillDraftEvent())return;let l=e.getSettingsEvent(),a=e.getSkillPresetStoreEvent(l),d=e.getActiveSkillPresetEvent(a),c=Date.now(),u=e.getUniqueSkillPresetNameEvent(a,e.SKILL_PRESET_NEW_NAME_BASE_Event),E={id:e.createIdEvent("skill_preset"),name:u,locked:!1,skillTableText:d.skillTableText,createdAt:c,updatedAt:c};a.presets.push(E),a.activePresetId=E.id,e.saveSkillPresetStoreEvent(a)}),i?.addEventListener("click",()=>{let l=e.getSettingsEvent(),a=e.getSkillPresetStoreEvent(l),d=e.getActiveSkillPresetEvent(a);if(d.locked){e.pushToChat("\u26A0\uFE0F \u9ED8\u8BA4\u9884\u8BBE\u4E0D\u53EF\u5220\u9664\u3002");return}if(!e.confirmDiscardSkillDraftEvent()||!window.confirm(`\u786E\u8BA4\u5220\u9664\u9884\u8BBE\u300C${d.name}\u300D\u5417\uFF1F`))return;a.presets=a.presets.filter(E=>E.id!==d.id);let u=e.getSkillPresetByIdEvent(a,e.SKILL_PRESET_DEFAULT_ID_Event)??a.presets[0]??null;u?a.activePresetId=u.id:(a.presets=e.buildDefaultSkillPresetStoreEvent().presets,a.activePresetId=e.SKILL_PRESET_DEFAULT_ID_Event),e.saveSkillPresetStoreEvent(a)});let s=()=>{let l=String(r?.value??"").trim();if(!l){e.renderSkillValidationErrorsEvent(["\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A\u3002"]);return}let a=e.getSettingsEvent(),d=e.getSkillPresetStoreEvent(a),c=e.getActiveSkillPresetEvent(d);if(d.presets.some(E=>E.id!==c.id&&e.normalizeSkillPresetNameKeyEvent(E.name)===e.normalizeSkillPresetNameKeyEvent(l))){e.renderSkillValidationErrorsEvent(["\u9884\u8BBE\u540D\u79F0\u91CD\u590D\uFF0C\u8BF7\u4F7F\u7528\u5176\u4ED6\u540D\u79F0\u3002"]);return}c.name=l,c.updatedAt=Date.now(),e.saveSkillPresetStoreEvent(d),e.renderSkillValidationErrorsEvent([])};o?.addEventListener("click",s),r?.addEventListener("keydown",l=>{l.key==="Enter"&&(l.preventDefault(),s())})}function zo(e){let t=document.getElementById(e.SETTINGS_RULE_TEXT_ID_Event),n=document.getElementById(e.SETTINGS_RULE_SAVE_ID_Event),i=document.getElementById(e.SETTINGS_RULE_RESET_ID_Event);n?.addEventListener("click",()=>{let r=String(t?.value??""),o=r.trim().length>0?r:e.DEFAULT_RULE_TEXT_Event;e.updateSettingsEvent({ruleText:o})}),i?.addEventListener("click",()=>{t&&(t.value=e.DEFAULT_RULE_TEXT_Event),e.updateSettingsEvent({ruleText:e.DEFAULT_RULE_TEXT_Event})})}var N=[],lt="",ct=!1,ut="";function dr(e){return String(e??"").trim().toLowerCase()}function Vo(e){return String(e??"").trim().toLowerCase()}function Yo(e){let t=String(e??"").trim();if(!t)return[];let n=t.split("|").map(i=>Vo(i)).filter(Boolean);return Array.from(new Set(n))}function mr(e="",t="",n="skills",i="",r=!0){return{rowId:`status_row_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,8)}`,name:e,modifierText:t,scope:n,skillsText:i,enabled:r}}function at(e){return JSON.stringify(e.map(t=>({name:String(t.name??""),modifierText:String(t.modifierText??""),scope:t.scope==="all"?"all":"skills",skillsText:String(t.skillsText??""),enabled:t.enabled!==!1})))}function q(e,t){let n=document.getElementById(e);if(n){if(!t.length){n.hidden=!0,n.innerHTML="";return}n.hidden=!1,n.innerHTML=t.map(i=>`<div class="st-roll-status-error-item">${cr(i)}</div>`).join("")}}function dt(e,t){ct=!!e;let n=document.getElementById(t);n&&(n.hidden=!ct)}function _e(e){let t=document.getElementById(e);if(t){if(!N.length){t.innerHTML='<div class="st-roll-status-empty">\u6682\u65E0\u72B6\u6001\uFF0C\u70B9\u51FB\u201C\u65B0\u589E\u72B6\u6001\u201D\u5F00\u59CB\u914D\u7F6E\u3002</div>';return}t.innerHTML=N.map(n=>{let i=ot(String(n.rowId??"")),r=ot(String(n.name??"")),o=ot(String(n.modifierText??"")),s=n.scope==="all"?"all":"skills",l=ot(String(n.skillsText??"")),a=n.enabled!==!1;return`
        <div class="st-roll-status-row" data-row-id="${i}">
          <input class="st-roll-input st-roll-status-name" type="text" data-status-row-id="${i}" data-status-field="name" value="${r}" placeholder="\u72B6\u6001\u540D\u79F0" />
          <input class="st-roll-input st-roll-status-modifier" type="text" inputmode="numeric" data-status-row-id="${i}" data-status-field="modifier" value="${o}" placeholder="\u4F8B\u5982 -2" />
          <select class="st-roll-select st-roll-status-scope" data-status-row-id="${i}" data-status-field="scope">
            <option value="skills" ${s==="skills"?"selected":""}>\u6309\u6280\u80FD</option>
            <option value="all" ${s==="all"?"selected":""}>\u5168\u5C40</option>
          </select>
          <input class="st-roll-input st-roll-status-skills" type="text" data-status-row-id="${i}" data-status-field="skills" value="${l}" placeholder="${s==="all"?"\u8303\u56F4\u4E3A\u5168\u5C40\u65F6\u4F1A\u5FFD\u7565\u6B64\u9879":"\u4F8B\u5982: \u654F\u6377|\u6F5C\u884C"}" ${s==="all"?"disabled":""} />
          <label class="st-roll-status-enabled-wrap">
            <input type="checkbox" data-status-row-id="${i}" data-status-field="enabled" ${a?"checked":""} />
            <span>\u542F\u7528</span>
          </label>
          <button type="button" class="st-roll-btn secondary st-roll-status-remove" data-status-remove-id="${i}">\u5220\u9664</button>
        </div>
      `}).join("")}}function gr(e){return(Array.isArray(e)?e:[]).map(t=>mr(String(t.name??""),String(t.modifier??0),t.scope==="all"?"all":"skills",t.scope==="all"?"":(Array.isArray(t.skills)?t.skills:[]).join("|"),t.enabled!==!1))}function jo(e,t){let n=[],i=[],r=new Map,o=new Map;for(let a of t||[]){let d=dr(a.name);d&&o.set(d,a)}let s=/^[+-]?\d+$/,l=Date.now();return e.forEach((a,d)=>{let c=d+1,u=String(a.name??"").trim(),E=dr(u),v=String(a.modifierText??"").trim(),g=a.scope==="all"?"all":"skills",m=g==="all"?[]:Yo(String(a.skillsText??"")),S=!1;if(u||(n.push(`\u7B2C ${c} \u884C\uFF1A\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A`),S=!0),E){let b=r.get(E);b!=null?(n.push(`\u7B2C ${c} \u884C\uFF1A\u540D\u79F0\u4E0E\u7B2C ${b+1} \u884C\u91CD\u590D`),S=!0):r.set(E,d)}if(v?s.test(v)||(n.push(`\u7B2C ${c} \u884C\uFF1A\u4FEE\u6B63\u503C\u5FC5\u987B\u4E3A\u6574\u6570`),S=!0):(n.push(`\u7B2C ${c} \u884C\uFF1A\u4FEE\u6B63\u503C\u4E0D\u80FD\u4E3A\u7A7A`),S=!0),g==="skills"&&m.length<=0&&(n.push(`\u7B2C ${c} \u884C\uFF1A\u8303\u56F4\u4E3A\u201C\u6309\u6280\u80FD\u201D\u65F6\uFF0C\u6280\u80FD\u5217\u8868\u4E0D\u80FD\u4E3A\u7A7A`),S=!0),S)return;let f=Number(v),_=o.get(E);i.push({name:u,modifier:f,scope:g,skills:m,enabled:a.enabled!==!1,createdAt:_?.createdAt??l,updatedAt:l,source:"manual_editor"})}),{errors:n,statuses:i}}function Sr(e,t,n,i=!1){let r=document.getElementById(t),o=JSON.stringify((Array.isArray(e)?e:[]).map(s=>({name:s.name,modifier:s.modifier,scope:s.scope,skills:s.scope==="all"?[]:s.skills,enabled:s.enabled!==!1})));!i&&ct&&r?.hasChildNodes()||!i&&o===ut&&r?.hasChildNodes()||(N=gr(e),lt=at(N),ut=o,dt(!1,n),_e(t))}function Xo(e){let t=document.getElementById(e.SETTINGS_STATUS_ROWS_ID_Event),n=document.getElementById(e.SETTINGS_STATUS_ADD_ID_Event),i=document.getElementById(e.SETTINGS_STATUS_SAVE_ID_Event),r=document.getElementById(e.SETTINGS_STATUS_RESET_ID_Event),o=()=>{let s=at(N);dt(s!==lt,e.SETTINGS_STATUS_DIRTY_HINT_ID_Event)};Sr(e.getActiveStatusesEvent(),e.SETTINGS_STATUS_ROWS_ID_Event,e.SETTINGS_STATUS_DIRTY_HINT_ID_Event,!0),q(e.SETTINGS_STATUS_ERRORS_ID_Event,[]),t?.addEventListener("input",s=>{let l=s.target;if(!l)return;let a=String(l.dataset.statusRowId??""),d=String(l.dataset.statusField??"");if(!a||!d)return;let c=N.find(u=>u.rowId===a);c&&(d==="name"&&(c.name=l.value),d==="modifier"&&(c.modifierText=l.value),d==="skills"&&(c.skillsText=l.value),d==="scope"&&(c.scope=l.value==="all"?"all":"skills",c.scope==="all"&&(c.skillsText=""),_e(e.SETTINGS_STATUS_ROWS_ID_Event)),d==="enabled"&&(c.enabled=l.checked),o(),q(e.SETTINGS_STATUS_ERRORS_ID_Event,[]))}),t?.addEventListener("change",s=>{let l=s.target;if(!l)return;let a=String(l.dataset.statusRowId??""),d=String(l.dataset.statusField??"");if(!a||d!=="enabled")return;let c=N.find(u=>u.rowId===a);c&&(c.enabled=l.checked,o(),q(e.SETTINGS_STATUS_ERRORS_ID_Event,[]))}),t?.addEventListener("click",s=>{let a=s.target?.closest("button[data-status-remove-id]");if(!a)return;let d=String(a.dataset.statusRemoveId??"");d&&(N=N.filter(c=>c.rowId!==d),_e(e.SETTINGS_STATUS_ROWS_ID_Event),o(),q(e.SETTINGS_STATUS_ERRORS_ID_Event,[]))}),n?.addEventListener("click",()=>{N=[...N,mr()],_e(e.SETTINGS_STATUS_ROWS_ID_Event),o(),q(e.SETTINGS_STATUS_ERRORS_ID_Event,[])}),i?.addEventListener("click",()=>{let s=e.getActiveStatusesEvent(),l=jo(N,s);if(l.errors.length>0){q(e.SETTINGS_STATUS_ERRORS_ID_Event,l.errors);return}e.setActiveStatusesEvent(l.statuses),N=gr(l.statuses),lt=at(N),ut=JSON.stringify(l.statuses.map(a=>({name:a.name,modifier:a.modifier,scope:a.scope,skills:a.scope==="all"?[]:a.skills,enabled:a.enabled!==!1}))),dt(!1,e.SETTINGS_STATUS_DIRTY_HINT_ID_Event),_e(e.SETTINGS_STATUS_ROWS_ID_Event),q(e.SETTINGS_STATUS_ERRORS_ID_Event,[]),e.syncSettingsUiEvent?.(),e.pushToChat?.("\u72B6\u6001\u7F16\u8F91\u5668\uFF1A\u5DF2\u4FDD\u5B58\u5E76\u751F\u6548\u3002")}),r?.addEventListener("click",()=>{N=[],e.setActiveStatusesEvent([]),lt=at(N),ut="[]",dt(!1,e.SETTINGS_STATUS_DIRTY_HINT_ID_Event),_e(e.SETTINGS_STATUS_ROWS_ID_Event),q(e.SETTINGS_STATUS_ERRORS_ID_Event,[]),e.syncSettingsUiEvent?.(),e.pushToChat?.("\u72B6\u6001\u7F16\u8F91\u5668\uFF1A\u5DF2\u91CD\u7F6E\u4E3A\u7A7A\u3002")})}function pr(e){Uo({drawerToggleId:e.drawerToggleId,drawerContentId:e.drawerContentId,...e.tabsAndModalDepsEvent}),Ko(e.basicSettingsInputsDepsEvent),Fo(e.skillPresetActionsDepsEvent),Wo(e.skillRowsEditingActionsDepsEvent),qo(e.skillImportExportActionsDepsEvent),Xo(e.statusEditorActionsDepsEvent),zo(e.ruleTextActionsDepsEvent)}function Tr(e){return{getRows:e.getRowsEvent,setRows:e.setRowsEvent,getSnapshot:e.getSnapshotEvent,setSnapshot:e.setSnapshotEvent}}function Wo(e){let t=document.getElementById(e.SETTINGS_SKILL_ROWS_ID_Event),n=document.getElementById(e.SETTINGS_SKILL_ADD_ID_Event);t?.addEventListener("input",i=>{let r=i.target;if(!r)return;let o=String(r.dataset.skillRowId??""),s=String(r.dataset.skillField??"");if(!o||!s)return;let a=e.skillDraftAccessorEvent.getRows().find(d=>d.rowId===o);a&&(s==="name"?a.skillName=r.value:s==="modifier"&&(a.modifierText=r.value),e.refreshSkillDraftDirtyStateEvent(),e.renderSkillValidationErrorsEvent([]))}),t?.addEventListener("click",i=>{let o=i.target?.closest("button[data-skill-remove-id]");if(!o)return;let s=String(o.dataset.skillRemoveId??"");if(!s)return;let l=e.skillDraftAccessorEvent.getRows().filter(a=>a.rowId!==s);e.skillDraftAccessorEvent.setRows(l),e.renderSkillRowsEvent(),e.refreshSkillDraftDirtyStateEvent(),e.renderSkillValidationErrorsEvent([])}),n?.addEventListener("click",()=>{let i=[...e.skillDraftAccessorEvent.getRows(),e.createSkillEditorRowDraftEvent("","")];e.skillDraftAccessorEvent.setRows(i),e.renderSkillRowsEvent(),e.refreshSkillDraftDirtyStateEvent(),e.renderSkillValidationErrorsEvent([])})}function qo(e){let t=document.getElementById(e.SETTINGS_SKILL_IMPORT_TOGGLE_ID_Event),n=document.getElementById(e.SETTINGS_SKILL_IMPORT_AREA_ID_Event),i=document.getElementById(e.SETTINGS_SKILL_TEXT_ID_Event),r=document.getElementById(e.SETTINGS_SKILL_IMPORT_APPLY_ID_Event),o=document.getElementById(e.SETTINGS_SKILL_EXPORT_ID_Event),s=document.getElementById(e.SETTINGS_SKILL_SAVE_ID_Event),l=document.getElementById(e.SETTINGS_SKILL_RESET_ID_Event);t?.addEventListener("click",()=>{if(!n)return;let a=n.hidden;if(n.hidden=!a,t.textContent=a?"\u6536\u8D77\u5BFC\u5165":"\u5BFC\u5165 JSON",!a||!i)return;let d=e.serializeSkillRowsToSkillTableTextEvent(e.skillDraftAccessorEvent.getRows());i.value=d??e.getActiveSkillPresetEvent(e.getSkillPresetStoreEvent(e.getSettingsEvent())).skillTableText}),r?.addEventListener("click",()=>{let a=String(i?.value??"");if(e.normalizeSkillTableTextForSettingsEvent(a)==null){e.renderSkillValidationErrorsEvent(['\u5BFC\u5165\u5931\u8D25\uFF1A\u5FC5\u987B\u662F JSON \u5BF9\u8C61\uFF08\u4F8B\u5982 {"\u5BDF\u89C9":15,"\u8BF4\u670D":8}\uFF09\u3002']);return}let d=e.deserializeSkillTableTextToRowsEvent(a),c=e.validateSkillRowsEvent(d);if(c.errors.length>0){e.renderSkillValidationErrorsEvent(c.errors);return}e.skillDraftAccessorEvent.setRows(d),e.renderSkillRowsEvent(),e.refreshSkillDraftDirtyStateEvent(),e.renderSkillValidationErrorsEvent([])}),o?.addEventListener("click",()=>{let a=e.validateSkillRowsEvent(e.skillDraftAccessorEvent.getRows()),d=e.getSettingsEvent(),c=e.getActiveSkillPresetEvent(e.getSkillPresetStoreEvent(d)),u=a.errors.length?c.skillTableText:JSON.stringify(a.table,null,2);a.errors.length>0?e.renderSkillValidationErrorsEvent(["\u5F53\u524D\u8349\u7A3F\u6709\u6821\u9A8C\u9519\u8BEF\uFF0C\u5DF2\u5BFC\u51FA\u5DF2\u4FDD\u5B58\u7684\u6280\u80FD\u8868\u3002"]):e.renderSkillValidationErrorsEvent([]),e.copyTextToClipboardEvent(u).then(E=>{if(E){e.pushToChat("\u2705 \u6280\u80FD\u8868 JSON \u5DF2\u590D\u5236\u5230\u526A\u8D34\u677F\u3002");return}n&&(n.hidden=!1),t&&(t.textContent="\u6536\u8D77\u5BFC\u5165"),i&&(i.value=u),e.pushToChat("\u26A0\uFE0F \u526A\u8D34\u677F\u4E0D\u53EF\u7528\uFF0C\u8BF7\u5728\u5BFC\u5165\u6846\u4E2D\u624B\u52A8\u590D\u5236 JSON\u3002")})}),s?.addEventListener("click",()=>{let a=e.validateSkillRowsEvent(e.skillDraftAccessorEvent.getRows());if(a.errors.length>0){e.renderSkillValidationErrorsEvent(a.errors),e.pushToChat("\u274C \u6280\u80FD\u8868\u4FDD\u5B58\u5931\u8D25\uFF0C\u8BF7\u5148\u4FEE\u6B63\u6821\u9A8C\u9519\u8BEF\u3002");return}let d=JSON.stringify(a.table,null,2),c=e.deserializeSkillTableTextToRowsEvent(d);e.skillDraftAccessorEvent.setRows(c),e.skillDraftAccessorEvent.setSnapshot(e.buildSkillDraftSnapshotEvent(c));let u=e.getSettingsEvent(),E=e.getSkillPresetStoreEvent(u),v=e.getActiveSkillPresetEvent(E);v.skillTableText=d,v.updatedAt=Date.now(),e.renderSkillRowsEvent(),e.setSkillDraftDirtyEvent(!1),e.renderSkillValidationErrorsEvent([]),e.saveSkillPresetStoreEvent(E),i&&(i.value=d)}),l?.addEventListener("click",()=>{e.skillDraftAccessorEvent.setRows([]),e.renderSkillRowsEvent(),e.refreshSkillDraftDirtyStateEvent(),e.renderSkillValidationErrorsEvent([])})}function fr(e){return e.isSkillDraftDirtyEvent()?window.confirm("\u6280\u80FD\u6539\u52A8\u672A\u4FDD\u5B58\uFF0C\u662F\u5426\u4E22\u5F03\u5E76\u7EE7\u7EED\uFF1F")?(e.hydrateSkillDraftFromSettingsEvent(!0),!0):!1:!0}function _r(e){if(!e||e.hidden)return!1;let t=window.getComputedStyle(e);return t.display!=="none"&&t.visibility!=="hidden"}function br(e){return!navigator.clipboard||typeof navigator.clipboard.writeText!="function"?Promise.resolve(!1):navigator.clipboard.writeText(e).then(()=>!0).catch(()=>!1)}function Ir(e,t){let n=document.getElementById(t.SETTINGS_SKILL_ERRORS_ID_Event);if(n){if(!e.length){n.hidden=!0,n.innerHTML="";return}n.hidden=!1,n.innerHTML=e.map(i=>`<div class="st-roll-skill-error-item">${t.escapeHtmlEvent(i)}</div>`).join("")}}function xr(e,t){let n=document.getElementById(t.SETTINGS_SKILL_PRESET_LIST_ID_Event);if(n){if(!e.presets.length){n.innerHTML='<div class="st-roll-skill-preset-empty">\u6682\u65E0\u9884\u8BBE</div>';return}n.innerHTML=e.presets.map(i=>{let r=i.id===e.activePresetId,o=t.countSkillEntriesFromSkillTableTextEvent(i.skillTableText),s=t.escapeAttrEvent(i.id),l=t.escapeHtmlEvent(i.name);return`
        <button type="button" class="st-roll-skill-preset-item ${r?"is-active":""}" data-skill-preset-id="${s}">
          <span class="st-roll-skill-preset-name">${l}</span>
          <span class="st-roll-skill-preset-tags">
            <span class="st-roll-skill-preset-tag">${o}</span>
            ${r?'<span class="st-roll-skill-preset-tag active">\u751F\u6548\u4E2D</span>':""}
            ${i.locked?'<span class="st-roll-skill-preset-tag locked">\u9ED8\u8BA4</span>':""}
          </span>
        </button>
      `}).join("")}}function Dr(e,t){let n=t.getActiveSkillPresetEvent(e),i=document.getElementById(t.SETTINGS_SKILL_PRESET_META_ID_Event);if(i){let s=t.countSkillEntriesFromSkillTableTextEvent(n.skillTableText);i.textContent=`\u5F53\u524D\u9884\u8BBE\uFF1A${n.name}\uFF08\u6280\u80FD ${s} \u9879\uFF09`}let r=document.getElementById(t.SETTINGS_SKILL_PRESET_NAME_ID_Event);r&&r.value!==n.name&&(r.value=n.name);let o=document.getElementById(t.SETTINGS_SKILL_PRESET_DELETE_ID_Event);o&&(o.disabled=n.locked,o.style.opacity=n.locked?"0.5":"1",o.title=n.locked?"\u9ED8\u8BA4\u9884\u8BBE\u4E0D\u53EF\u5220\u9664":"")}function yr(e,t){let n=document.getElementById(t.SETTINGS_SKILL_ROWS_ID_Event);if(n){if(!e.length){n.innerHTML='<div class="st-roll-skill-empty">\u6682\u65E0\u6280\u80FD\uFF0C\u70B9\u51FB\u201C\u65B0\u589E\u6280\u80FD\u201D\u5F00\u59CB\u914D\u7F6E\u3002</div>';return}n.innerHTML=e.map(i=>{let r=t.escapeAttrEvent(String(i.rowId??"")),o=t.escapeAttrEvent(String(i.skillName??"")),s=t.escapeAttrEvent(String(i.modifierText??""));return`
      <div class="st-roll-skill-row" data-row-id="${r}">
        <input
          class="st-roll-input st-roll-skill-name"
          type="text"
          placeholder="\u4F8B\u5982\uFF1A\u5BDF\u89C9"
          data-skill-row-id="${r}"
          data-skill-field="name"
          value="${o}"
        />
        <input
          class="st-roll-input st-roll-skill-modifier"
          type="text"
          inputmode="numeric"
          placeholder="\u4F8B\u5982\uFF1A15"
          data-skill-row-id="${r}"
          data-skill-field="modifier"
          value="${s}"
        />
        <button type="button" class="st-roll-btn secondary st-roll-skill-remove" data-skill-remove-id="${r}">
          \u5220\u9664
        </button>
      </div>
    `}).join("")}}function Rr(e){let t=e.getSettingsEvent(),n=document.getElementById(e.SETTINGS_ENABLED_ID_Event),i=document.getElementById(e.SETTINGS_RULE_ID_Event),r=document.getElementById(e.SETTINGS_AI_ROLL_MODE_ID_Event),o=document.getElementById(e.SETTINGS_AI_ROUND_CONTROL_ID_Event),s=document.getElementById(e.SETTINGS_EXPLODING_ENABLED_ID_Event),l=document.getElementById(e.SETTINGS_ADVANTAGE_ENABLED_ID_Event),a=document.getElementById(e.SETTINGS_DYNAMIC_RESULT_GUIDANCE_ID_Event),d=document.getElementById(e.SETTINGS_DYNAMIC_DC_REASON_ID_Event),c=document.getElementById(e.SETTINGS_STATUS_SYSTEM_ENABLED_ID_Event),u=document.getElementById(e.SETTINGS_ALLOWED_DICE_SIDES_ID_Event),E=document.getElementById(e.SETTINGS_SUMMARY_DETAIL_ID_Event),v=document.getElementById(e.SETTINGS_SUMMARY_ROUNDS_ID_Event),g=document.getElementById(e.SETTINGS_SCOPE_ID_Event),m=document.getElementById(e.SETTINGS_OUTCOME_BRANCHES_ID_Event),S=document.getElementById(e.SETTINGS_EXPLODE_OUTCOME_ID_Event),f=document.getElementById(e.SETTINGS_SUMMARY_OUTCOME_ID_Event),_=document.getElementById(e.SETTINGS_LIST_OUTCOME_PREVIEW_ID_Event),b=document.getElementById(e.SETTINGS_TIME_LIMIT_ENABLED_ID_Event),I=document.getElementById(e.SETTINGS_TIME_LIMIT_MIN_ID_Event),T=document.getElementById(e.SETTINGS_TIME_LIMIT_ROW_ID_Event),p=document.getElementById(e.SETTINGS_SKILL_ENABLED_ID_Event),x=document.getElementById(e.SETTINGS_STATUS_EDITOR_OPEN_ID_Event),R=document.getElementById(e.SETTINGS_RULE_TEXT_ID_Event);n&&(n.checked=!!t.enabled),i&&(i.checked=!!t.autoSendRuleToAI),r&&(r.checked=!!t.enableAiRollMode),o&&(o.checked=!!t.enableAiRoundControl),s&&(s.checked=!!t.enableExplodingDice),l&&(l.checked=!!t.enableAdvantageSystem),a&&(a.checked=!!t.enableDynamicResultGuidance),d&&(d.checked=!!t.enableDynamicDcReason),c&&(c.checked=!!t.enableStatusSystem),u&&(u.value=String(t.aiAllowedDiceSidesText||"")),E&&(E.value=t.summaryDetailMode),v&&(v.value=String(t.summaryHistoryRounds)),g&&(g.value=t.eventApplyScope),m&&(m.checked=!!t.enableOutcomeBranches),S&&(S.checked=!!t.enableExplodeOutcomeBranch),f&&(f.checked=!!t.includeOutcomeInSummary),_&&(_.checked=!!t.showOutcomePreviewInListCard),S&&(S.disabled=!t.enableOutcomeBranches,S.style.opacity=t.enableOutcomeBranches?"1":"0.5"),f&&(f.disabled=!t.enableOutcomeBranches,f.style.opacity=t.enableOutcomeBranches?"1":"0.5"),_&&(_.disabled=!t.enableOutcomeBranches,_.style.opacity=t.enableOutcomeBranches?"1":"0.5"),b&&(b.checked=!!t.enableTimeLimit),I&&(I.value=String(t.minTimeLimitSeconds),I.disabled=!t.enableTimeLimit,I.style.opacity=t.enableTimeLimit?"1":"0.5"),T?.classList.toggle("is-disabled",!t.enableTimeLimit),p&&(p.checked=!!t.enableSkillSystem),x&&(x.disabled=!t.enableStatusSystem,x.style.opacity=t.enableStatusSystem?"1":"0.5");let k=document.getElementById(e.SETTINGS_STATUS_ROWS_ID_Event);if(k&&(!ct||!k.hasChildNodes())&&(Sr(e.getActiveStatusesEvent(),e.SETTINGS_STATUS_ROWS_ID_Event,e.SETTINGS_STATUS_DIRTY_HINT_ID_Event),q(e.SETTINGS_STATUS_ERRORS_ID_Event,[])),!e.isSkillDraftDirtyEvent()){let h=String(t.skillTableText??"{}"),M=String(t.skillPresetStoreText??""),$=document.getElementById(e.SETTINGS_SKILL_ROWS_ID_Event);(h!==e.getSkillEditorLastSettingsTextEvent()||M!==e.getSkillEditorLastPresetStoreTextEvent()||!$||!$.hasChildNodes())&&e.hydrateSkillDraftFromSettingsEvent()}if(R){let h=t.ruleText||e.DEFAULT_RULE_TEXT_Event;R.value!==h&&(R.value=h)}}function kr(e){let t=[],n="[]",i="",r="",o="",s=!1,l="";function a(m){s=!!m;let S=document.getElementById(e.SETTINGS_SKILL_DIRTY_HINT_ID_Event);S&&(S.hidden=!s)}function d(){return s}function c(){let m=e.buildSkillDraftSnapshotEvent(t);a(m!==n)}function u(m){Ir(m,{SETTINGS_SKILL_ERRORS_ID_Event:e.SETTINGS_SKILL_ERRORS_ID_Event,escapeHtmlEvent:e.escapeHtmlEvent})}function E(){yr(t,{SETTINGS_SKILL_ROWS_ID_Event:e.SETTINGS_SKILL_ROWS_ID_Event,escapeAttrEvent:e.escapeAttrEvent})}function v(m=!1){if(!m&&d())return;let S=e.getSettingsEvent(),f=e.getSkillPresetStoreEvent(S),_=JSON.stringify(f,null,2),b=e.getActiveSkillPresetEvent(f),I=e.normalizeSkillTableTextForSettingsEvent(b.skillTableText),T=I??"{}";I==null?(t=[],l!==b.skillTableText&&(l=b.skillTableText,console.warn("[\u9AB0\u5B50\u63D2\u4EF6] \u6280\u80FD\u9884\u8BBE\u914D\u7F6E\u65E0\u6548\uFF0C\u5DF2\u6309\u7A7A\u8868\u8F7D\u5165"),e.pushToChatEvent("\u6280\u80FD\u9884\u8BBE\u914D\u7F6E\u683C\u5F0F\u65E0\u6548\uFF0C\u5DF2\u6309\u7A7A\u8868\u8F7D\u5165\u3002"))):(l="",t=e.deserializeSkillTableTextToRowsEvent(T)),o=b.id,n=e.buildSkillDraftSnapshotEvent(t),i=T,r=_,a(!1),u([]),xr(f,{SETTINGS_SKILL_PRESET_LIST_ID_Event:e.SETTINGS_SKILL_PRESET_LIST_ID_Event,countSkillEntriesFromSkillTableTextEvent:e.countSkillEntriesFromSkillTableTextEvent,escapeAttrEvent:e.escapeAttrEvent,escapeHtmlEvent:e.escapeHtmlEvent}),Dr(f,{SETTINGS_SKILL_PRESET_META_ID_Event:e.SETTINGS_SKILL_PRESET_META_ID_Event,SETTINGS_SKILL_PRESET_NAME_ID_Event:e.SETTINGS_SKILL_PRESET_NAME_ID_Event,SETTINGS_SKILL_PRESET_DELETE_ID_Event:e.SETTINGS_SKILL_PRESET_DELETE_ID_Event,countSkillEntriesFromSkillTableTextEvent:e.countSkillEntriesFromSkillTableTextEvent,getActiveSkillPresetEvent:e.getActiveSkillPresetEvent}),E()}function g(){return fr({isSkillDraftDirtyEvent:d,hydrateSkillDraftFromSettingsEvent:v})}return{setSkillDraftDirtyEvent:a,isSkillDraftDirtyEvent:d,refreshSkillDraftDirtyStateEvent:c,renderSkillRowsEvent:E,renderSkillValidationErrorsEvent:u,hydrateSkillDraftFromSettingsEvent:v,confirmDiscardSkillDraftEvent:g,getSkillRowsDraftEvent:()=>t,setSkillRowsDraftEvent:m=>{t=m},getSkillEditorActivePresetIdEvent:()=>o,setSkillEditorLastSavedSnapshotEvent:m=>{n=m},getSkillEditorLastSavedSnapshotEvent:()=>n,getSkillEditorLastSettingsTextEvent:()=>i,getSkillEditorLastPresetStoreTextEvent:()=>r}}function Ar(){return`
      <div>
        \u901A\u7528\u63B7\u9AB0\u547D\u4EE4\uFF0C\u652F\u6301 <code>NdM[!][khX|klX][+/-B]</code>\uFF1A
      </div>
      <ul>
        <li><code>/roll</code>\uFF08\u7B49\u540C\u4E8E <code>/roll 1d20</code>\uFF09</li>
        <li><code>/roll 1d20</code></li>
        <li><code>/roll 3d6+2</code></li>
        <li><code>/roll 2d10-1</code></li>
        <li><code>/roll 1d6!+2</code>\uFF08<code>!</code> \u8868\u793A\u7206\u9AB0\uFF09</li>
        <li><code>/roll 2d20kh1</code>\uFF08\u4FDD\u7559\u6700\u9AD8 1 \u4E2A\uFF09</li>
        <li><code>/roll 2d20kl1</code>\uFF08\u4FDD\u7559\u6700\u4F4E 1 \u4E2A\uFF09</li>
      </ul>
      <div>
        \u7ED3\u679C\u4F1A\u4FDD\u5B58\u5230 <code>chatMetadata.lastRoll</code>\uFF0C\u53EF\u901A\u8FC7
        <code>{{lastRoll}}</code> / <code>{{lastRollTotal}}</code> \u8BFB\u53D6\u3002
      </div>
    `}function hr(){return`
  <div>
    <div><strong>/eventroll \u547D\u4EE4\u5E2E\u52A9</strong></div>
    <ul>
      <li><code>/eventroll list</code>\uFF1A\u5217\u51FA\u5F53\u524D\u8F6E\u6B21\u4E8B\u4EF6</li>
      <li><code>/eventroll roll &lt;eventId&gt;</code>\uFF1A\u63B7\u6307\u5B9A\u4E8B\u4EF6</li>
      <li><code>/eventroll roll &lt;eventId&gt; &lt;diceExpr&gt;</code>\uFF1A\u7528\u81EA\u5B9A\u4E49\u9AB0\u5F0F\u8986\u76D6\u9ED8\u8BA4\u9AB0\u5F0F</li>
      <li><code>/eventroll help</code>\uFF1A\u663E\u793A\u5E2E\u52A9</li>
    </ul>
    <div>
      <strong>rolljson \u7ED3\u679C\u5206\u652F\uFF08outcomes\uFF09</strong>\uFF1A
      <code>events[i].outcomes.success</code> / <code>failure</code> / <code>explode</code>.
      \u5F53 <code>checkDice</code> \u542B <code>!</code> \u4E14\u89E6\u53D1\u7206\u9AB0\u65F6\uFF0C\u4F18\u5148\u4F7F\u7528 <code>explode</code>\u3002
    </div>
    <div>
      <strong>\u4F18\u52BF / \u52A3\u52BF</strong>\uFF1A
      \u4F60\u53EF\u4EE5\u628A <code>events[i].advantageState</code> \u8BBE\u4E3A
      <code>normal</code> / <code>advantage</code> / <code>disadvantage</code>,
      \u4E5F\u53EF\u4EE5\u76F4\u63A5\u5728 <code>checkDice</code> \u91CC\u5199\u4FDD\u7559\u8BED\u6CD5\uFF0C\u4F8B\u5982
      <code>2d20kh1</code> / <code>2d20kl1</code>.
      \u8868\u8FBE\u5F0F\u91CC\u7684\u4FDD\u7559\u8BED\u6CD5\u4F18\u5148\u7EA7\u9AD8\u4E8E <code>advantageState</code>\u3002
    </div>
    <div>
      <strong>\u4E8B\u4EF6\u76EE\u6807</strong>\uFF1A
      \u53EF\u9009 <code>events[i].target = { type, name? }</code>\uFF0C\u5176\u4E2D
      <code>type</code> \u53EF\u4E3A <code>self</code>/<code>scene</code>/<code>supporting</code>/<code>object</code>/<code>other</code>\u3002
    </div>
  </div>`}function Lr(e){return`<pre>${e}</pre>`}function Mr(e){return`\u9AB0\u5B50\u8C03\u8BD5\u6A21\u5F0F
<pre>${e}</pre>`}function Nr(e){let{registerMacro:t,SlashCommandParser:n,SlashCommand:i,SlashCommandArgument:r,ARGUMENT_TYPE:o,getDiceMeta:s,rollExpression:l,saveLastRoll:a,buildResultMessage:d,pushToChat:c}=e,u=globalThis;u.__stRollBaseMacrosRegisteredEvent||(t("lastRollTotal",()=>{let E=s();return E.lastTotal==null?"\u5C1A\u672A\u63B7\u9AB0\uFF0C\u8BF7\u5148\u4F7F\u7528 /roll":String(E.lastTotal)}),t("lastRoll",()=>{let E=s();return E.last?JSON.stringify(E.last,null,2):"\u5C1A\u672A\u63B7\u9AB0\uFF0C\u8BF7\u5148\u4F7F\u7528 /roll"}),u.__stRollBaseMacrosRegisteredEvent=!0),!u.__stRollBaseCommandRegisteredEvent&&(!n||!i||!r||!o||(n.addCommandObject(i.fromProps({name:"roll",aliases:["dice"],returns:"\u901A\u7528\u9AB0\u5B50\uFF1A\u652F\u6301 NdM+X\uFF0C\u4F8B\u5982 3d6+2\u30011d20",namedArgumentList:[],unnamedArgumentList:[r.fromProps({description:"\u9AB0\u5B50\u8868\u8FBE\u5F0F\uFF08\u5982 1d20\u30013d6+2\uFF09\u3002\u7559\u7A7A\u7B49\u4E8E 1d20\u3002",typeList:o.STRING,isRequired:!1})],helpString:Ar(),callback:(E,v)=>{try{let m=(v??"").toString().trim()||"1d20",S=l(m);a(S);let f=d(S);return c(f)??""}catch(g){let m=`\u63B7\u9AB0\u51FA\u9519\uFF1A${g?.message??String(g)}`;return c(m)??""}}})),u.__stRollBaseCommandRegisteredEvent=!0))}function $r(e){return e===0?"0":e>0?`+${e}`:`${e}`}function fn(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/`/g,"&#96;")}function Jo(e){let t=[],n=Array.isArray(e.rolls)&&e.rolls.length>0?`[${e.rolls.join(", ")}]`:"[]",i=Number.isFinite(Number(e.rawTotal))?Number(e.rawTotal):0,r=Number.isFinite(Number(e.modifier))?Number(e.modifier):0,o=Number.isFinite(Number(e.total))?Number(e.total):i+r;return t.push(`\u9AB0\u9762 ${n}`),t.push(`\u539F\u59CB\u503C ${i}`),t.push(`\u4FEE\u6B63\u503C ${$r(r)}`),t.push(`\u603B\u8BA1 ${o}`),e.exploding&&t.push(e.explosionTriggered?"\u7206\u9AB0\u5DF2\u89E6\u53D1":"\u7206\u9AB0\u5DF2\u542F\u7528"),t.join(" | ")}function we(e,t,n,i=56){if(t===6){let a=({1:[[24,24]],2:[[14,14],[34,34]],3:[[14,14],[24,24],[34,34]],4:[[14,14],[14,34],[34,14],[34,34]],5:[[14,14],[14,34],[24,24],[34,14],[34,34]],6:[[14,14],[14,24],[14,34],[34,14],[34,24],[34,34]]}[e]||[]).map(([d,c])=>`<circle cx="${d}" cy="${c}" r="4" fill="${n}" />`).join("");return`
      <svg width="${i}" height="${i}" viewBox="0 0 48 48" style="display:inline-block; vertical-align: middle;">
          <rect x="4" y="4" width="40" height="40" rx="8" ry="8" fill="none" stroke="${n}" stroke-width="3" />
          ${a}
      </svg>`}return`
      <svg width="${i}" height="${i}" viewBox="0 0 48 48" style="display:inline-block; vertical-align: middle;">
          <path d="M24 4 L43 14 L43 34 L24 44 L5 34 L5 14 Z" fill="none" stroke="${n}" stroke-width="3" />
          <path d="M24 4 L24 24 M24 24 L43 34 M24 24 L5 34" stroke="${n}" stroke-width="1.5" opacity="0.6"/>
          <text x="24" y="33" font-size="18" text-anchor="middle" fill="${n}" font-weight="bold" style="font-family: sans-serif;">${e}</text>
      </svg>`}function Et(e,t=52){let n=Math.round(t/2),i=Math.max(20,Math.round(t*.42));return`
    <div class="cube-scene" style="perspective: 600px; width: ${t}px; height: ${t}px;">
      <div class="cube" style="
        width: 100%; height: 100%; position: relative; transform-style: preserve-3d;
      ">
        <div class="cube-face front"  style="position: absolute; width: ${t}px; height: ${t}px; border: 2px solid ${e}; background: rgba(43, 29, 29, 0.8); color: ${e}; line-height: ${t}px; text-align: center; font-weight: bold; font-size: ${i}px; transform: rotateY(  0deg) translateZ(${n}px);">?</div>
        <div class="cube-face back"   style="position: absolute; width: ${t}px; height: ${t}px; border: 2px solid ${e}; background: rgba(43, 29, 29, 0.8); color: ${e}; line-height: ${t}px; text-align: center; font-weight: bold; font-size: ${i}px; transform: rotateY(180deg) translateZ(${n}px);">?</div>
        <div class="cube-face right"  style="position: absolute; width: ${t}px; height: ${t}px; border: 2px solid ${e}; background: rgba(43, 29, 29, 0.8); color: ${e}; line-height: ${t}px; text-align: center; font-weight: bold; font-size: ${i}px; transform: rotateY( 90deg) translateZ(${n}px);">?</div>
        <div class="cube-face left"   style="position: absolute; width: ${t}px; height: ${t}px; border: 2px solid ${e}; background: rgba(43, 29, 29, 0.8); color: ${e}; line-height: ${t}px; text-align: center; font-weight: bold; font-size: ${i}px; transform: rotateY(-90deg) translateZ(${n}px);">?</div>
        <div class="cube-face top"    style="position: absolute; width: ${t}px; height: ${t}px; border: 2px solid ${e}; background: rgba(43, 29, 29, 0.8); color: ${e}; line-height: ${t}px; text-align: center; font-weight: bold; font-size: ${i}px; transform: rotateX( 90deg) translateZ(${n}px);">?</div>
        <div class="cube-face bottom" style="position: absolute; width: ${t}px; height: ${t}px; border: 2px solid ${e}; background: rgba(43, 29, 29, 0.8); color: ${e}; line-height: ${t}px; text-align: center; font-weight: bold; font-size: ${i}px; transform: rotateX(-90deg) translateZ(${n}px);">?</div>
      </div>
    </div>
  `}function _n(e){let t=$r(e.modifier),n=e.rolls.join(", "),i=e.modifier!==0,r="d"+Math.random().toString(36).substr(2,9),o={border:"#c5a059",bg:"linear-gradient(135deg, #2b1d1d 0%, #1a1010 100%)",headerBg:"rgba(0, 0, 0, 0.4)",textMain:"#e8dcb5",textHighlight:"#ffdb78",critSuccess:"#4caf50",critFail:"#f44336"},s="normal",l="",a=o.textHighlight,d="0 2px 4px rgba(0,0,0,0.5)",c=o.bg,u=o.border;if(e.count===1){let _=e.rolls[0],b=e.sides;_===b?(s="success",l="\u5927\u6210\u529F\uFF01",a=o.critSuccess,d="0 0 15px rgba(76, 175, 80, 0.8)",c="linear-gradient(135deg, #1b3320 0%, #0d1a10 100%)",u=o.critSuccess):_===1&&(s="fail",l="\u5927\u5931\u8D25\uFF01",a=o.critFail,d="0 0 15px rgba(244, 67, 54, 0.8)",c="linear-gradient(135deg, #331b1b 0%, #1a0d0d 100%)",u=o.critFail)}let E=e.rolls.length<=5,v=Jo(e),g=E?e.rolls.map((_,b)=>{let I=we(_,e.sides,a),T=`${v} | \u7B2C${b+1}\u9897: ${_}`;return`<span style="display:inline-flex;cursor:help;" title="${fn(T)}">${I}</span>`}).join(" "):`<span style="display:inline-flex;cursor:help;" title="${fn(v)}">${we(0,e.sides,a)}</span>`,m=Et(o.textHighlight),S=[];e.rolls.length&&S.push(`\u9AB0\u9762: [${n}]`),i&&S.push(`\u4FEE\u6B63\u503C: ${t}`),e.exploding&&S.push(e.explosionTriggered?"\u7206\u9AB0\u5DF2\u89E6\u53D1":"\u7206\u9AB0\u5DF2\u542F\u7528");let f=S.join(" | ");return`
  <style>
    @keyframes spin-3d-${r} {
      0% { transform: rotateX(0deg) rotateY(0deg); }
      100% { transform: rotateX(360deg) rotateY(360deg); }
    }
    @keyframes fade-out-${r} {
      0% { opacity: 1; }
      90% { opacity: 0; }
      100% { opacity: 0; display: none; }
    }
    @keyframes fade-in-${r} {
      0% { opacity: 0; transform: scale(0.8); }
      100% { opacity: 1; transform: scale(1); }
    }
    @keyframes pulse-crit-${r} {
      0% { transform: scale(1); }
      50% { transform: scale(1.1); }
      100% { transform: scale(1); }
    }
    @keyframes shake-crit-${r} {
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
    
    .dice-wrapper-${r} {
      position: relative;
      min-height: 100px;
      padding: 16px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    
    .dice-rolling-${r} {
      position: absolute;
      top: 50%; left: 50%;
      transform: translate(-50%, -50%);
      animation: fade-out-${r} 0.2s forwards 1.2s;
      z-index: 10;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    
    .dice-rolling-${r} .cube {
      animation: spin-3d-${r} 1.5s linear infinite;
    }

    .dice-result-${r} {
      opacity: 0;
      animation: fade-in-${r} 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards 1.3s;
      text-align: center;
      width: 100%;
    }

    .crit-success-${r} {
      animation: pulse-crit-${r} 1s infinite;
      color: ${o.critSuccess};
      font-weight: bold;
      margin-bottom: 8px;
      text-shadow: 0 0 10px rgba(76, 175, 80, 0.5);
    }

    .crit-fail-${r} {
      animation: shake-crit-${r} 0.5s;
      color: ${o.critFail};
      font-weight: bold;
      margin-bottom: 8px;
      text-shadow: 0 0 10px rgba(244, 67, 54, 0.5);
    }

    .explosion-note-${r} {
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
    background: ${c};
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5), inset 0 0 30px rgba(0,0,0,0.6);
    font-family: 'Georgia', 'Times New Roman', serif;
    overflow: hidden;
    margin: 8px 0;
    width: 100%;
    box-sizing: border-box;
    color: ${o.textMain};
    position: relative;
  ">
    <div style="position: absolute; top: 0; left: 0; width: 6px; height: 6px; border-top: 2px solid ${o.border}; border-left: 2px solid ${o.border};"></div>
    <div style="position: absolute; top: 0; right: 0; width: 6px; height: 6px; border-top: 2px solid ${o.border}; border-right: 2px solid ${o.border};"></div>
    <div style="position: absolute; bottom: 0; left: 0; width: 6px; height: 6px; border-bottom: 2px solid ${o.border}; border-left: 2px solid ${o.border};"></div>
    <div style="position: absolute; bottom: 0; right: 0; width: 6px; height: 6px; border-bottom: 2px solid ${o.border}; border-right: 2px solid ${o.border};"></div>

    <div style="
        background-color: ${o.headerBg};
        padding: 8px 12px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid rgba(197, 160, 89, 0.3);
        font-size: 0.9em;
        letter-spacing: 1px;
        text-transform: uppercase;
    ">
        <span style="display: flex; align-items: center; gap: 8px; color: ${o.textHighlight};">
            <span style="font-weight: bold;">\u9AB0\u5B50\u7CFB\u7EDF</span>
        </span>
        <span style="
            font-family: monospace;
            color: ${o.textMain};
            background: rgba(0,0,0,0.3);
            padding: 2px 8px;
            border: 1px solid rgba(197, 160, 89, 0.2);
            border-radius: 2px;
            font-size: 0.9em;
        ">${e.expr}</span>
    </div>

    <div class="dice-wrapper-${r}">
        <div class="dice-rolling-${r}">
            ${m}
        </div>

        <div class="dice-result-${r}">
            ${l?`<div class="${s==="success"?`crit-success-${r}`:`crit-fail-${r}`}">${l}</div>`:""}
          ${e.exploding?`<div class="explosion-note-${r}">${e.explosionTriggered?"\u8FDE\u9501\u7206\u9AB0\uFF01":"\u7206\u9AB0\u5DF2\u5F00\u542F"}</div>`:""}
            
            <div style="margin-bottom: 12px; display: flex; justify-content: center; gap: 8px; flex-wrap: wrap;" title="${fn(v)}">
                ${g}
            </div>

            <div style="
                font-size: 2.5em;
                font-weight: bold;
                color: ${a};
                text-shadow: ${d};
                line-height: 1;
            ">
                ${e.total}
            </div>
            
            <div style="
                font-size: 0.9em;
                color: ${o.textMain};
                margin-top: 8px;
                opacity: 0.8;
            ">
              ${f}
            </div>
        </div>

    </div>
  </div>
  `}function bn(e){let t=e.compactMode===!0,n=t?"92px":"108px",i=t?"8px 0":"14px 0",r=t?"0":"12px",o=t?"auto":"100%";return`
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
        padding: ${i};
        margin-top: ${r};
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
        width: ${o};
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
    `}var C=kr({SETTINGS_SKILL_DIRTY_HINT_ID_Event:qt,SETTINGS_SKILL_ERRORS_ID_Event:Wt,SETTINGS_SKILL_ROWS_ID_Event:Re,SETTINGS_SKILL_PRESET_LIST_ID_Event:Ve,SETTINGS_SKILL_PRESET_META_ID_Event:Jt,SETTINGS_SKILL_PRESET_NAME_ID_Event:je,SETTINGS_SKILL_PRESET_DELETE_ID_Event:Ye,getSettingsEvent:y,getSkillPresetStoreEvent:rt,getActiveSkillPresetEvent:$e,normalizeSkillTableTextForSettingsEvent:se,deserializeSkillTableTextToRowsEvent:Sn,buildSkillDraftSnapshotEvent:mn,countSkillEntriesFromSkillTableTextEvent:Zi,pushToChatEvent:O,escapeHtmlEvent:z,escapeAttrEvent:Me});function Zo(e,t,n){return vr({...bi,drawerToggleId:e,drawerContentId:t,drawerIconId:n})}var Br=C.isSkillDraftDirtyEvent,Cr=C.refreshSkillDraftDirtyStateEvent,wr=C.renderSkillRowsEvent,In=C.renderSkillValidationErrorsEvent,Qo=C.hydrateSkillDraftFromSettingsEvent,Pr=C.confirmDiscardSkillDraftEvent,Or=Tr({getRowsEvent:C.getSkillRowsDraftEvent,setRowsEvent:C.setSkillRowsDraftEvent,getSnapshotEvent:C.getSkillEditorLastSavedSnapshotEvent,setSnapshotEvent:C.setSkillEditorLastSavedSnapshotEvent});function el(e,t){pr({drawerToggleId:e,drawerContentId:t,tabsAndModalDepsEvent:{...Ii,confirmDiscardSkillDraftEvent:Pr,isElementVisibleEvent:_r,isSkillDraftDirtyEvent:Br},basicSettingsInputsDepsEvent:{...xi,SUMMARY_HISTORY_ROUNDS_MAX_Event:Te,SUMMARY_HISTORY_ROUNDS_MIN_Event:pe,DEFAULT_SUMMARY_HISTORY_ROUNDS_Event:ue.summaryHistoryRounds,updateSettingsEvent:nt},skillPresetActionsDepsEvent:{...Di,SKILL_PRESET_DEFAULT_ID_Event:ne,SKILL_PRESET_NEW_NAME_BASE_Event:Ae,getSkillEditorActivePresetIdEvent:C.getSkillEditorActivePresetIdEvent,confirmDiscardSkillDraftEvent:Pr,getSettingsEvent:y,getSkillPresetStoreEvent:rt,getSkillPresetByIdEvent:et,saveSkillPresetStoreEvent:vn,getActiveSkillPresetEvent:$e,getUniqueSkillPresetNameEvent:cn,createIdEvent:U,buildDefaultSkillPresetStoreEvent:()=>it(),normalizeSkillPresetNameKeyEvent:Ee,renderSkillValidationErrorsEvent:In,pushToChat:O},skillRowsEditingActionsDepsEvent:{...yi,skillDraftAccessorEvent:Or,createSkillEditorRowDraftEvent:dn,renderSkillRowsEvent:wr,refreshSkillDraftDirtyStateEvent:Cr,renderSkillValidationErrorsEvent:In},skillImportExportActionsDepsEvent:{...Ri,skillDraftAccessorEvent:Or,serializeSkillRowsToSkillTableTextEvent:tr,getSettingsEvent:y,getSkillPresetStoreEvent:rt,getActiveSkillPresetEvent:$e,normalizeSkillTableTextForSettingsEvent:se,deserializeSkillTableTextToRowsEvent:Sn,validateSkillRowsEvent:pn,renderSkillRowsEvent:wr,refreshSkillDraftDirtyStateEvent:Cr,renderSkillValidationErrorsEvent:In,copyTextToClipboardEvent:br,pushToChat:O,buildSkillDraftSnapshotEvent:mn,setSkillDraftDirtyEvent:C.setSkillDraftDirtyEvent,saveSkillPresetStoreEvent:vn},statusEditorActionsDepsEvent:{SETTINGS_STATUS_ROWS_ID_Event:Ke,SETTINGS_STATUS_ADD_ID_Event:wt,SETTINGS_STATUS_SAVE_ID_Event:Pt,SETTINGS_STATUS_RESET_ID_Event:Ot,SETTINGS_STATUS_ERRORS_ID_Event:Fe,SETTINGS_STATUS_DIRTY_HINT_ID_Event:ze,getActiveStatusesEvent:()=>an(A()),setActiveStatusesEvent:Ji,syncSettingsUiEvent:xn,pushToChat:O},ruleTextActionsDepsEvent:{...ki,DEFAULT_RULE_TEXT_Event:ie,updateSettingsEvent:nt}})}function xn(){Rr({getSettingsEvent:y,...Ai,isSkillDraftDirtyEvent:Br,hydrateSkillDraftFromSettingsEvent:Qo,getActiveStatusesEvent:()=>an(A()),DEFAULT_RULE_TEXT_Event:ie,getSkillEditorLastSettingsTextEvent:C.getSkillEditorLastSettingsTextEvent,getSkillEditorLastPresetStoreTextEvent:C.getSkillEditorLastPresetStoreTextEvent})}function Gr(e=0){Tn({SETTINGS_CARD_ID_Event:He,SETTINGS_SKILL_MODAL_ID_Event:Xe,SETTINGS_STATUS_MODAL_ID_Event:Ue,buildSettingsCardHtmlTemplateEvent:Yn,buildSettingsCardTemplateIdsEvent:Zo,ensureSettingsCardStylesEvent:()=>{Er({SETTINGS_STYLE_ID_Event:Xn,SETTINGS_CARD_ID_Event:He,buildSettingsCardStylesTemplateEvent:jn})},syncSettingsBadgeVersionEvent:()=>{ur({SETTINGS_BADGE_ID_Event:Dt,SETTINGS_BADGE_VERSION_Event:Qt})},syncSettingsUiEvent:xn,onMountedEvent:({drawerToggleId:t,drawerContentId:n})=>el(t,n)},e)}function Hr(){Nr({registerMacro:Fi,SlashCommandParser:he,SlashCommand:Le,SlashCommandArgument:qe,ARGUMENT_TYPE:Je,getDiceMeta:Ne,rollExpression:st,saveLastRoll:tt,buildResultMessage:_n,pushToChat:O})}function Ur(){qi(()=>{xn()})}function be(e){return e==null||e===""?">=":e===">="||e===">"||e==="<="||e==="<"?e:null}function L(e){return typeof e=="string"?e.trim():""}function Dn(e,t,n,i){let r=L(e);if(!r)return;if(r.length<=i)return r;let o=r.slice(0,i);return console.warn(`[\u9AB0\u5B50\u63D2\u4EF6] outcomes.${t} \u8FC7\u957F\uFF0C\u5DF2\u622A\u65AD: event=${n} len=${r.length}`),`${o}\uFF08\u5DF2\u622A\u65AD\uFF09`}function tl(e,t,n){let i=L(e);if(!i)return;if(i.length<=n)return i;let r=i.slice(0,n);return console.warn(`[\u9AB0\u5B50\u63D2\u4EF6] dc_reason \u8FC7\u957F\uFF0C\u5DF2\u622A\u65AD: event=${t} len=${i.length}`),`${r}\uFF08\u5DF2\u622A\u65AD\uFF09`}function nl(e,t,n){if(!e||typeof e!="object")return;let i=Dn(e.success,"success",t,n),r=Dn(e.failure,"failure",t,n),o=Dn(e.explode,"explode",t,n);if(!(!i&&!r&&!o))return{success:i,failure:r,explode:o}}function yn(e,t){let n=L(e);if(!n)return null;if(!t.test(n))return console.warn("[\u9AB0\u5B50\u63D2\u4EF6] \u975E\u6CD5 timeLimit\uFF0C\u6309\u4E0D\u9650\u65F6\u5904\u7406:",n),null;let i=n.match(/^P(?:(\d+)W)?(?:(\d+)D)?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?)?$/i);if(!i)return console.warn("[\u9AB0\u5B50\u63D2\u4EF6] \u4E0D\u652F\u6301\u7684 timeLimit \u7EC4\u5408\uFF0C\u6309\u4E0D\u9650\u65F6\u5904\u7406:",n),null;let r=Number(i[1]||0),o=Number(i[2]||0),s=Number(i[3]||0),l=Number(i[4]||0),a=Number(i[5]||0),c=((((r*7+o)*24+s)*60+l)*60+a)*1e3;return!Number.isFinite(c)||c<0?(console.warn("[\u9AB0\u5B50\u63D2\u4EF6] timeLimit \u89E3\u6790\u5931\u8D25\uFF0C\u6309\u4E0D\u9650\u65F6\u5904\u7406:",n),null):c}function vt(e,t){if(!t.enableTimeLimit||e==null)return null;let n=Math.max(1,Math.floor(Number(t.minTimeLimitSeconds)||1)),i=n*1e3;return e<i?(console.info(`[\u9AB0\u5B50\u63D2\u4EF6] timeLimit \u4F4E\u4E8E\u6700\u77ED\u65F6\u9650\uFF0C\u63D0\u5347\u5230 ${n}s\uFF08\u539F\u59CB ${e}ms\uFF09`),i):e}function il(e){let t=L(e).toLowerCase();if(t){if(t==="protagonist"||t==="player"||t==="user"||t==="mc"||t==="main_character")return"protagonist";if(t==="all"||t==="any"||t==="both")return"all";if(t==="character"||t==="assistant"||t==="npc"||t==="self")return"character"}}function rl(e){let t=L(e).toLowerCase();if(t){if(t==="auto"||t==="automatic"||t==="system"||t==="ai")return"auto";if(t==="manual"||t==="user"||t==="player")return"manual"}}function sl(e){let t=L(e).toLowerCase();if(t){if(t==="advantage"||t==="adv"||t==="up"||t==="high"||t==="benefit")return"advantage";if(t==="disadvantage"||t==="dis"||t==="down"||t==="low"||t==="penalty")return"disadvantage";if(t==="normal"||t==="none"||t==="neutral"||t==="off")return"normal"}}function ol(e){let t=L(e).toLowerCase();if(t){if(t==="self"||t==="protagonist"||t==="player"||t==="mc"||t==="main_character")return"self";if(t==="scene"||t==="situation"||t==="environment"||t==="context")return"scene";if(t==="supporting"||t==="character"||t==="npc"||t==="assistant")return"supporting";if(t==="object"||t==="item"||t==="thing"||t==="prop")return"object";if(t==="other"||t==="misc")return"other"}}function ll(e,t){let n=L(t);return e==="self"?"\u4E3B\u89D2\u81EA\u5DF1":e==="scene"?"\u573A\u666F":e==="supporting"?n?`\u914D\u89D2 ${n}`:"\u914D\u89D2":e==="object"?n?`\u7269\u4EF6 ${n}`:"\u7269\u4EF6":n?`\u5176\u4ED6\u5BF9\u8C61 ${n}`:"\u5176\u4ED6\u5BF9\u8C61"}function mt(e,t){let n=e&&typeof e=="object"&&!Array.isArray(e)?e:{},i=ol(n.type??n.targetType??n.kind??e),r=L(n.name??n.targetName??n.label??n.value);i||(t==="protagonist"?i="self":t==="character"?i="supporting":i="scene");let o=r||void 0;return{targetType:i,targetName:o,targetLabel:ll(i,o)}}function al(e){if(e.targetType==="self")return!0;if(e.targetType==="supporting"||e.targetType==="object")return!1;if(e.scope==="protagonist"||e.scope==="all")return!0;if(e.scope==="character")return!1;let t=`${e.title}
${e.desc}
${e.skill}
${e.targetLabel}`;return/(\byou\b|\byour\b|\bplayer\b|\bprotagonist\b|主角|玩家|你)/i.test(t)}function Rn(e,t){return t==="all"?e:e.filter(al)}function Vr(e){let t=L(e);if(!t)return null;let n=t.split(/[,\s]+/).map(i=>Number(i.trim())).filter(i=>Number.isFinite(i)&&i>0&&Number.isInteger(i));return n.length===0?null:new Set(n)}function dl(e,t){let n=Vr(t.aiAllowedDiceSidesText);if(!n||n.size===0)return!0;try{let i=G(e);return n.has(i.sides)}catch{return!1}}function cl(e,t){let n=Vr(t.aiAllowedDiceSidesText),i=n?Array.from(n).sort((d,c)=>d-c):[];if(i.length===0)return{nextExpr:e,changed:!1,allowedSidesText:""};let r=G(e);if(n.has(r.sides))return{nextExpr:e,changed:!1,allowedSidesText:i.join(",")};let o=i[0],s=r.modifier===0?"":r.modifier>0?`+${r.modifier}`:String(r.modifier),l=r.keepMode&&r.keepCount?`${r.keepMode}${r.keepCount}`:"";return{nextExpr:`${r.count}d${o}${r.explode?"!":""}${l}${s}`,changed:!0,allowedSidesText:i.join(",")}}function ul(e,t){if(!e||typeof e!="object")return null;let n=L(e.id),i=L(e.title),r=L(e.checkDice),o=L(e.skill),s=L(e.timeLimit),l=L(e.desc),a=be(e.compare),d=il(e.scope??e.eventScope??e.applyTo),c=mt(e.target??{type:e.targetType,name:e.targetName??e.targetLabel},d),u=rl(e.rollMode),E=sl(e.advantageState??e.advantage??e.advState),v=Number(e.dc),g=tl(e.dc_reason??e.dcReason,n||"unknown_event",t.OUTCOME_TEXT_MAX_LEN_Event),m={success:e.successOutcome,failure:e.failureOutcome,explode:e.explodeOutcome},S=e.outcomes&&typeof e.outcomes=="object"?{...m,...e.outcomes}:m,f=nl(S,n||"unknown_event",t.OUTCOME_TEXT_MAX_LEN_Event),_=yn(s,t.ISO_8601_DURATION_REGEX_Event),b=t.getSettingsEvent(),I=vt(_,b),T=s&&_!=null?s:void 0;if(!n||!i||!r||!o||!l||a==null||!Number.isFinite(v))return null;try{G(r)}catch{return null}if(!dl(r,b)){let p=cl(r,b);if(p.changed)console.warn(`[\u9AB0\u5B50\u63D2\u4EF6] \u4E8B\u4EF6\u9AB0\u5F0F\u4E0D\u5728\u5141\u8BB8\u9762\u6570\u5217\u8868\u4E2D\uFF0C\u81EA\u52A8\u4FEE\u6B63: event=${n} from=${r} to=${p.nextExpr} allowed=${p.allowedSidesText||"(\u672A\u914D\u7F6E)"}`),r=p.nextExpr;else{let x=L(b.aiAllowedDiceSidesText);return console.warn(`[\u9AB0\u5B50\u63D2\u4EF6] \u4E8B\u4EF6\u9AB0\u5F0F\u4E0D\u5728\u5141\u8BB8\u9762\u6570\u5217\u8868\u4E2D\uFF0C\u5DF2\u5FFD\u7565: event=${n} checkDice=${r} allowed=${x||"(\u672A\u914D\u7F6E)"}`),null}}return{id:n,title:i,checkDice:r,dc:v,compare:a,scope:d,rollMode:u,advantageState:E,skill:o,targetType:c.targetType,targetName:c.targetName,targetLabel:c.targetLabel,timeLimitMs:I,timeLimit:T,desc:l,dcReason:g,outcomes:f}}function El(e){if(!e||typeof e!="object")return!1;let t=e;if((t.end_round??t.endRound)===!0)return!0;let i=L(t.round_control??t.roundControl??t.round_action??t.roundAction).toLowerCase();return i?i==="end_round"||i==="end"||i==="close"||i==="new_round":!1}function Kr(e,t){if(!e||typeof e!="object"||e.type!=="dice_events"||String(e.version)!=="1"||!Array.isArray(e.events))return null;let n=El(e),i=[];for(let r of e.events){let o=ul(r,t);if(!o){console.warn("[\u9AB0\u5B50\u63D2\u4EF6] \u4E22\u5F03\u975E\u6CD5\u4E8B\u4EF6\u5B57\u6BB5",r);continue}i.push(o)}return i.length===0&&!n?null:{events:i,shouldEndRound:n}}function Fr(e){let t=String(e||"").replace(/[\u200B-\u200D\u2060]/g,"").replace(/\uFEFF/g,"").trim();if(!t)return null;let n=[],i=c=>{let u=c.trim();u&&(n.includes(u)||n.push(u))},r=c=>c.replace(/[“”]/g,'"').replace(/[‘’]/g,"'").replace(/：/g,":").replace(/，/g,",").replace(/\u00A0/g," "),o=c=>c.replace(/,\s*([}\]])/g,"$1"),s=c=>c.replace(/^\s*```[a-zA-Z0-9_-]*\s*[\r\n]+/,"").replace(/[\r\n]+\s*```\s*$/,"").trim(),l=c=>c.replace(/^\s*(?:rolljson|json)\s*[\r\n]+/i,"").trim(),a=c=>{let u=c.indexOf("{");if(u<0)return null;let E=0,v=!1,g=!1;for(let m=u;m<c.length;m++){let S=c[m];if(v){if(g){g=!1;continue}if(S==="\\"){g=!0;continue}S==='"'&&(v=!1);continue}if(S==='"'){v=!0;continue}if(S==="{"){E+=1;continue}if(S==="}"&&(E-=1,E===0))return c.slice(u,m+1)}return null},d=[t,s(t),l(t),l(s(t))];for(let c of d){if(!c)continue;i(c),i(r(c)),i(o(c)),i(o(r(c)));let u=a(c);u&&(i(u),i(r(u)),i(o(u)),i(o(r(u))))}for(let c of n)try{return JSON.parse(c)}catch{}return null}function zr(e){try{let t=document.createElement("textarea");return t.innerHTML=e,t.value}catch{return e.replace(/&quot;/g,'"').replace(/&#34;/g,'"').replace(/&apos;/g,"'").replace(/&#39;/g,"'").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&amp;/g,"&")}}function Yr(e,t){let n=/```(?:rolljson|json)?\s*([\s\S]*?)```/gi,i=[],r=[],o=!1,s;for(;(s=n.exec(e))!==null;){let a=zr(s[1]??"").trim();if(!a)continue;let d=/"type"\s*:\s*"dice_events"/i.test(a);d&&i.push({start:s.index,end:s.index+s[0].length});let c;try{if(c=Fr(a),!c)throw new Error("\u65E0\u6CD5\u4FEE\u590D\u4E3A\u5408\u6CD5 JSON")}catch(E){d&&console.warn("[\u9AB0\u5B50\u63D2\u4EF6] \u4E8B\u4EF6 JSON \u89E3\u6790\u5931\u8D25\uFF0C\u5DF2\u9690\u85CF\u4EE3\u7801\u5757",E);continue}let u=Kr(c,t);u&&(r.push(...u.events),u.shouldEndRound&&(o=!0))}let l=/<pre\b[\s\S]*?<\/pre>/gi;for(;(s=l.exec(e))!==null;){let a=s[0],d=a.match(/<code\b[^>]*>([\s\S]*?)<\/code>/i),c=(d?d[1]:a).replace(/<[^>]+>/g,""),u=zr(c).trim();if(!u)continue;let E=/"type"\s*:\s*"dice_events"/i.test(u);E&&i.push({start:s.index,end:s.index+a.length});let v;try{if(v=Fr(u),!v)throw new Error("\u65E0\u6CD5\u4FEE\u590D\u4E3A\u5408\u6CD5 JSON")}catch(m){E&&console.warn("[\u9AB0\u5B50\u63D2\u4EF6] HTML \u4E8B\u4EF6 JSON \u89E3\u6790\u5931\u8D25\uFF0C\u5DF2\u9690\u85CF\u4EE3\u7801\u5757",m);continue}let g=Kr(v,t);g&&(r.push(...g.events),g.shouldEndRound&&(o=!0))}return{events:r,ranges:i,shouldEndRound:o}}function jr(e,t,n){if(t.length===0)return e;let i=[...t].sort((s,l)=>s.start-l.start),r=0,o="";for(let s of i)s.start>r&&(o+=e.slice(r,s.start)),r=Math.max(r,s.end);return r<e.length&&(o+=e.slice(r)),n(o)}var Xr=/\[(APPLY_STATUS|REMOVE_STATUS|CLEAR_STATUS)\s*:(.*?)\]|\[(CLEAR_STATUS)\]/gi;function J(e){return typeof e=="string"?e.trim():""}function Pe(e){return J(e).toLowerCase()}function gt(e){return J(e).toLowerCase()}function vl(e){let t=J(e);if(!t)return[];let n=t.split("|").map(i=>gt(i)).filter(Boolean);return Array.from(new Set(n))}function Z(e){let t=String(e||"").replace(Xr,"").replace(/[ \t]{2,}/g," ");return re(t)}function ml(e,t){let n=[],i=String(e||""),r=gt(t),o=new RegExp(Xr.source,"gi"),s;for(;(s=o.exec(i))!==null;){let l=String(s[1]||s[3]||"").trim().toUpperCase(),a=J(s[2]||"");if(l==="CLEAR_STATUS"){n.push({kind:"clear"});continue}if(l==="REMOVE_STATUS"){let m=J(a);if(!m)continue;n.push({kind:"remove",name:m});continue}if(l!=="APPLY_STATUS")continue;let d=a.split(",").map(m=>J(m)),c=d[0]||"",u=Number(d[1]);if(!c||!Number.isFinite(u))continue;let E=d.slice(2).join(","),v="skills",g=[];if(/scope\s*=\s*all/i.test(E))v="all";else{let m=E.match(/skills\s*=\s*([^,\]]+)/i);m&&(g=vl(m[1]||"")),g.length<=0&&r&&(g=[r])}n.push({kind:"apply",name:c,modifier:u,scope:v,skills:g})}return n}function Wr(e,t){let n=ml(e,t);return{cleanedText:Z(e),commands:n}}function gl(e,t=Date.now()){if(!e||typeof e!="object")return null;let n=J(e.name),i=Number(e.modifier),o=J(e.scope).toLowerCase()==="all"?"all":"skills",s=e.enabled!==!1,l=Array.isArray(e.skills)?e.skills:[],a=Array.from(new Set(l.map(m=>gt(m)).filter(m=>!!m))),d=Number(e.createdAt),c=Number(e.updatedAt),u=Number.isFinite(d)?d:t,E=Number.isFinite(c)?c:u,v=J(e.source),g=v==="manual_editor"||v==="ai_tag"?v:void 0;return!n||!Number.isFinite(i)||o==="skills"&&a.length<=0?null:{name:n,modifier:i,scope:o,skills:a,enabled:s,createdAt:u,updatedAt:E,source:g}}function kn(e){if(!Array.isArray(e))return[];let t=[],n=new Map;for(let i of e){let r=gl(i);if(!r)continue;let o=Pe(r.name),s=n.get(o);if(s==null){n.set(o,t.length),t.push(r);continue}t[s]=r}return t}function Q(e){return Array.isArray(e.activeStatuses)||(e.activeStatuses=[]),e.activeStatuses=kn(e.activeStatuses),e.activeStatuses}function qr(e,t,n,i=Date.now()){if(!Array.isArray(t)||t.length<=0)return!1;let r=Q(e),o=!1;for(let s of t){if(s.kind==="clear"){r.length>0&&(r.splice(0,r.length),o=!0);continue}if(s.kind==="remove"){let l=Pe(s.name),a=r.findIndex(d=>Pe(d.name)===l);a>=0&&(r.splice(a,1),o=!0);continue}if(s.kind==="apply"){let l=Pe(s.name),a=r.findIndex(u=>Pe(u.name)===l),d=a>=0?r[a]:null,c={name:s.name,modifier:s.modifier,scope:s.scope,skills:s.scope==="all"?[]:Array.from(new Set(s.skills)),enabled:!0,createdAt:d?.createdAt??i,updatedAt:i,source:n};a>=0?r[a]=c:r.push(c),o=!0}}return o}function Ie(e,t){let n=kn(e),i=gt(t),r=0,o=[];for(let s of n){if(!s.enabled)continue;let l=Number(s.modifier);if(Number.isFinite(l)){if(s.scope==="all"){r+=l,o.push({name:s.name,modifier:l});continue}i&&s.skills.includes(i)&&(r+=l,o.push({name:s.name,modifier:l}))}}return{modifier:r,matched:o}}function Jr(e,t,n){let i=kn(e),r=[];if(r.push(t),i.length<=0)return r.push("none"),r.push(n),re(r.join(`
`));r.push(`count=${i.length}`);for(let o of i){let s=o.scope,l=s==="all"?"-":o.skills.join("|");r.push(`- name="${o.name}" mod=${o.modifier>=0?`+${o.modifier}`:o.modifier} scope=${s} skills=${l} enabled=${o.enabled?1:0}`)}return r.push(n),re(r.join(`
`))}function Zr(e,t,n=Date.now()){t.ensureRoundEventTimersSyncedEvent(e);let i=t.getSettingsEvent(),r=[],o=0;for(let s of e.events){let l=t.getLatestRollRecordForEvent(e,s.id),a=l?l.source==="timeout_auto_fail"?"timeout":"done":"pending",d=l&&Number.isFinite(Number(l.result.total))?Number(l.result.total):null,c=l?l.success:null,u=t.resolveTriggeredOutcomeEvent(s,l,i);l&&o++,r.push({id:s.id,title:s.title,desc:s.desc,targetLabel:s.targetLabel,skill:s.skill,checkDice:s.checkDice,compare:t.normalizeCompareOperatorEvent(s.compare)??">=",dc:Number.isFinite(s.dc)?Number(s.dc):0,dcReason:String(s.dcReason||""),rollMode:s.rollMode==="auto"?"auto":"manual",advantageState:Sl(l?.advantageStateApplied??s.advantageState),timeLimit:s.timeLimit??"none",status:a,resultSource:l?.source??null,total:d,skillModifierApplied:Number(l?.skillModifierApplied??0),statusModifierApplied:Number(l?.statusModifierApplied??0),baseModifierUsed:Number(l?.baseModifierUsed??0),finalModifierUsed:Number(l?.finalModifierUsed??0),success:c,marginToDc:typeof l?.marginToDc=="number"&&Number.isFinite(l.marginToDc)?Number(l.marginToDc):null,resultGrade:l?.resultGrade??null,outcomeKind:u.kind,outcomeText:Z(u.text),explosionTriggered:u.explosionTriggered})}return{roundId:e.roundId,openedAt:e.openedAt,closedAt:n,eventsCount:e.events.length,rolledCount:o,events:r}}function Qr(e){return Array.isArray(e.summaryHistory)||(e.summaryHistory=[]),e.summaryHistory}function es(e,t){e.length<=t||e.splice(0,e.length-t)}function Sl(e){return e==="advantage"||e==="disadvantage"||e==="normal"?e:"normal"}function pl(e){let t=String(e??"").replace(/\s+/g," ").trim();return t.length>0?t:"\uFF08\u7A7A\uFF09"}function oe(e,t){let n=pl(e);return n.length<=t?n:`${n.slice(0,Math.max(1,t))}\uFF08\u5DF2\u622A\u65AD\uFF09`}function Tl(e){return e==="minimal"?60:e==="balanced"?90:140}function fl(e){return e==="manual_roll"?"\u624B\u52A8\u68C0\u5B9A":e==="ai_auto_roll"?"AI\u81EA\u52A8\u68C0\u5B9A":e==="timeout_auto_fail"?"\u8D85\u65F6\u5224\u5B9A":"\u672A\u77E5"}function _l(e){if(e.status==="pending")return"\u5F85\u5224\u5B9A\uFF08\u5C1A\u672A\u63B7\u9AB0\uFF09";if(e.status==="timeout"||e.resultSource==="timeout_auto_fail")return"\u8D85\u65F6\u672A\u64CD\u4F5C\uFF0C\u7CFB\u7EDF\u5224\u5B9A\u5931\u8D25";let t=e.total==null?"-":String(e.total);return e.success===!0?e.resultSource==="ai_auto_roll"?`AI\u81EA\u52A8\u68C0\u5B9A\u6210\u529F\uFF08\u603B\u503C ${t}\uFF09`:`\u6210\u529F\uFF08\u603B\u503C ${t}\uFF09`:e.success===!1?e.resultSource==="ai_auto_roll"?`AI\u81EA\u52A8\u68C0\u5B9A\u5931\u8D25\uFF08\u603B\u503C ${t}\uFF09`:`\u5931\u8D25\uFF08\u603B\u503C ${t}\uFF09`:`\u5DF2\u5B8C\u6210\uFF08\u603B\u503C ${t}\uFF09`}function bl(e){let t=oe(e.outcomeText||"",120);return e.outcomeKind==="explode"?`\u7206\u9AB0\u8D70\u5411\uFF1A${t}`:e.outcomeKind==="success"?`\u6210\u529F\u8D70\u5411\uFF1A${t}`:e.outcomeKind==="failure"?`\u5931\u8D25\u8D70\u5411\uFF1A${t}`:`\u8D70\u5411\uFF1A${t}`}function Il(e,t,n){let i=oe(e.title,48),r=oe(e.desc,Tl(t)),o=oe(e.targetLabel||"\u672A\u6307\u5B9A",20),s=_l(e),l=n?bl(e):"",a=Number.isFinite(Number(e.baseModifierUsed))?Number(e.baseModifierUsed):0,d=Number.isFinite(Number(e.skillModifierApplied))?Number(e.skillModifierApplied):0,c=Number.isFinite(Number(e.statusModifierApplied))?Number(e.statusModifierApplied):0,u=Number.isFinite(Number(e.finalModifierUsed))?Number(e.finalModifierUsed):a+d+c,E=`\u4FEE\u6B63 ${B(a)} + \u6280\u80FD ${B(d)} + \u72B6\u6001 ${B(c)} = ${B(u)}`;if(t==="minimal")return n?`- \u6807\u9898\uFF1A${i}\uFF5C\u5BF9\u8C61\uFF1A${o}\uFF5C\u63CF\u8FF0\uFF1A${r}\uFF5C\u7ED3\u679C\uFF1A${s}\uFF5C${l}`:`- \u6807\u9898\uFF1A${i}\uFF5C\u5BF9\u8C61\uFF1A${o}\uFF5C\u63CF\u8FF0\uFF1A${r}\uFF5C\u7ED3\u679C\uFF1A${s}`;let v=oe(e.skill,20),g=oe(e.checkDice,24),m=e.dcReason?`\uFF08DC\u539F\u56E0\uFF1A${oe(e.dcReason,36)}\uFF09`:"",S=`${v} ${g}\uFF0C\u6761\u4EF6 ${e.compare} ${e.dc}${m}`,f=e.advantageState==="normal"?"":`\uFF5C\u9AB0\u6001=${e.advantageState}`,_=e.resultGrade?`\uFF5C\u5206\u7EA7=${e.resultGrade}`:"";if(t==="balanced")return n?`- \u6807\u9898\uFF1A${i}\uFF5C\u5BF9\u8C61\uFF1A${o}\uFF5C\u63CF\u8FF0\uFF1A${r}\uFF5C\u68C0\u5B9A\uFF1A${S}${f}\uFF5C${E}\uFF5C\u7ED3\u679C\uFF1A${s}${_}\uFF5C${l}`:`- \u6807\u9898\uFF1A${i}\uFF5C\u5BF9\u8C61\uFF1A${o}\uFF5C\u63CF\u8FF0\uFF1A${r}\uFF5C\u68C0\u5B9A\uFF1A${S}${f}\uFF5C${E}\uFF5C\u7ED3\u679C\uFF1A${s}${_}`;let b=fl(e.resultSource),I=oe(e.timeLimit||"none",26);return n?`- \u6807\u9898\uFF1A${i}\uFF5C\u5BF9\u8C61\uFF1A${o}\uFF5C\u63CF\u8FF0\uFF1A${r}\uFF5C\u68C0\u5B9A\uFF1A${S}${f}\uFF5C${E}\uFF5C\u6765\u6E90\uFF1A${b}\uFF5C\u6A21\u5F0F\uFF1A${e.rollMode}\uFF5C\u65F6\u9650\uFF1A${I}\uFF5C\u7ED3\u679C\uFF1A${s}${_}\uFF5C${l}`:`- \u6807\u9898\uFF1A${i}\uFF5C\u5BF9\u8C61\uFF1A${o}\uFF5C\u63CF\u8FF0\uFF1A${r}\uFF5C\u68C0\u5B9A\uFF1A${S}${f}\uFF5C${E}\uFF5C\u6765\u6E90\uFF1A${b}\uFF5C\u6A21\u5F0F\uFF1A${e.rollMode}\uFF5C\u65F6\u9650\uFF1A${I}\uFF5C\u7ED3\u679C\uFF1A${s}${_}`}function ts(e,t,n,i,r){if(!Array.isArray(e)||e.length===0)return"";let o=Math.min(r.SUMMARY_HISTORY_ROUNDS_MAX_Event,Math.max(r.SUMMARY_HISTORY_ROUNDS_MIN_Event,Math.floor(Number(n)||1))),s=e.slice(-o);if(s.length===0)return"";let l=[];l.push(r.DICE_SUMMARY_BLOCK_START_Event),l.push(`v=5 fmt=nl detail=${t} window_rounds=${o} included_rounds=${s.length} include_outcome=${i?"1":"0"}`);let a=0,d=!1;for(let c=0;c<s.length;c++){let u=s[c],E=Math.max(0,u.eventsCount-u.rolledCount);l.push(`\u3010\u7B2C ${c+1} \u8F6E / roundId=${u.roundId} / \u5173\u95ED\u65F6\u95F4=${new Date(u.closedAt).toISOString()}\u3011`),l.push(`\u672C\u8F6E\u4E8B\u4EF6\u6570=${u.eventsCount}\uFF0C\u5DF2\u7ED3\u7B97=${u.rolledCount}\uFF0C\u672A\u7ED3\u7B97=${E}`);let v=u.events.slice(0,r.SUMMARY_MAX_EVENTS_Event);for(let g of v){if(a>=r.SUMMARY_MAX_TOTAL_EVENT_LINES_Event){d=!0;break}l.push(Il(g,t,i)),a++}if(u.events.length>r.SUMMARY_MAX_EVENTS_Event&&l.push(`\u6CE8\uFF1A\u672C\u8F6E\u8FD8\u6709 ${u.events.length-r.SUMMARY_MAX_EVENTS_Event} \u4E2A\u4E8B\u4EF6\u672A\u5C55\u5F00\u3002`),d)break}return d&&l.push("\u6CE8\uFF1A\u540E\u7EED\u4E8B\u4EF6\u56E0\u957F\u5EA6\u9650\u5236\u672A\u5C55\u5F00\u3002"),l.push(r.DICE_SUMMARY_BLOCK_END_Event),l.join(`
`)}var ee="normal";function ns(e){return e==="advantage"||e==="disadvantage"||e==="normal"?e:ee}function xl(e){return Array.isArray(e.keptRolls)&&e.keptRolls.length>0?e.keptRolls:Array.isArray(e.rolls)?e.rolls:[]}function Dl(e){return e.keepMode==="kh"?"advantage":e.keepMode==="kl"?"disadvantage":ee}function is(e,t,n,i){let r;try{r=i(e)}catch(a){return{adv:!1,dis:!1,advantageStateApplied:ee,errorText:a?.message??String(a)}}let o=Dl(r),s=ns(t.advantageState),l=r.keepMode==="kh"||r.keepMode==="kl";return n.enableAdvantageSystem?l?{adv:!1,dis:!1,advantageStateApplied:o}:s==="advantage"?{adv:!0,dis:!1,advantageStateApplied:"advantage"}:s==="disadvantage"?{adv:!1,dis:!0,advantageStateApplied:"disadvantage"}:{adv:!1,dis:!1,advantageStateApplied:ee}:l?{adv:!1,dis:!1,advantageStateApplied:ee,errorText:`\u4F18\u52BF/\u52A3\u52BF\u7CFB\u7EDF\u5DF2\u5173\u95ED\uFF0C\u5F53\u524D\u8868\u8FBE\u5F0F\u5305\u542B kh/kl\uFF1A${e}`}:s!==ee?{adv:!1,dis:!1,advantageStateApplied:ee,errorText:`\u4F18\u52BF/\u52A3\u52BF\u7CFB\u7EDF\u5DF2\u5173\u95ED\uFF0C\u4E8B\u4EF6\u8BBE\u7F6E\u4E86 advantageState=${s}`}:{adv:!1,dis:!1,advantageStateApplied:ee}}function yl(e,t,n){if(n==null||!Number.isFinite(n)||!Number.isFinite(e))return null;switch(t){case">=":return e-n;case">":return e-(n+1);case"<=":return n-e;case"<":return n-1-e;default:return null}}function Rl(e){let t=xl(e);if(t.length!==1)return{isCandidate:!1};let n=Number(t[0]),i=Number(e.sides);return!Number.isFinite(n)||!Number.isFinite(i)||i<=0?{isCandidate:!1}:{isCandidate:n===1||n===i}}function An(e,t,n,i,r){let o=yl(Number(e.total),n,i);return r==="timeout_auto_fail"?{resultGrade:"failure",marginToDc:o}:t!==!0&&t!==!1?{resultGrade:"failure",marginToDc:o}:Rl(e).isCandidate?t?{resultGrade:"critical_success",marginToDc:o}:{resultGrade:"critical_failure",marginToDc:o}:t?o!=null&&o>=1&&o<=2?{resultGrade:"partial_success",marginToDc:o}:{resultGrade:"success",marginToDc:o}:{resultGrade:"failure",marginToDc:o}}function kl(e){return Array.isArray(e.pendingResultGuidanceQueue)||(e.pendingResultGuidanceQueue=[]),e.pendingResultGuidanceQueue}function St(e,t,n){if(!n.resultGrade)return;let i=kl(e);i.some(r=>r.rollId===n.rollId)||i.push({rollId:n.rollId,roundId:n.roundId,eventId:t.id,eventTitle:t.title,targetLabel:n.targetLabelUsed||t.targetLabel,resultGrade:n.resultGrade,marginToDc:n.marginToDc??null,total:Number(n.result.total)||0,dcUsed:n.dcUsed??null,compareUsed:n.compareUsed,advantageStateApplied:n.advantageStateApplied,source:n.source,rolledAt:n.rolledAt})}function rs(e,t){let n=0,i=0,r=0;try{let o=t.parseDiceExpression(e.checkDice);n=o.count,i=o.sides,r=o.modifier}catch{}return{expr:e.checkDice||"timeout",count:n,sides:i,modifier:r,rolls:[],rawTotal:0,total:0,selectionMode:"none"}}function hn(e,t){let n=Number.isFinite(Number(e.modifier))?Number(e.modifier):0,i=Number.isFinite(Number(t))?Number(t):0,r=n+i;return i===0?{result:e,baseModifierUsed:n,finalModifierUsed:r}:{result:{...e,modifier:r,total:Number(e.rawTotal)+r},baseModifierUsed:n,finalModifierUsed:r}}function Ln(e,t){let n=Number.isFinite(Number(e.modifier))?Number(e.modifier):0,i=Number.isFinite(Number(t))?Number(t):0,r=n+i;return i===0?{result:e,finalModifierUsed:r}:{result:{...e,modifier:r,total:Number(e.rawTotal)+r},finalModifierUsed:r}}function Mn(e,t,n){if(!n.enableStatusSystem)return{modifier:0,matched:[]};let i=Q(t);return Ie(i,e)}function Al(e,t,n){if(!n.enableOutcomeBranches)return"";let i=e.outcomes,r=!!t?.result?.explosionTriggered;return n.enableExplodeOutcomeBranch&&r&&i?.explode&&i.explode.trim()?i.explode.trim():t?.success===!0?i?.success?.trim()||"\u5224\u5B9A\u6210\u529F\uFF0C\u5267\u60C5\u5411\u6709\u5229\u65B9\u5411\u63A8\u8FDB\u3002":t?.success===!1||t?.source==="timeout_auto_fail"?i?.failure?.trim()||"\u5224\u5B9A\u5931\u8D25\uFF0C\u5267\u60C5\u5411\u4E0D\u5229\u65B9\u5411\u63A8\u8FDB\u3002":"\u5C1A\u672A\u7ED3\u7B97\u3002"}function pt(e,t,n,i){if(!i.enableStatusSystem)return!1;let r=Al(t,n,i);if(!r)return!1;let o=Wr(r,t.skill||"");return qr(e,o.commands,"ai_tag")}function ss(e){return(!e.eventTimers||typeof e.eventTimers!="object")&&(e.eventTimers={}),e.eventTimers}function V(e,t){for(let n=e.rolls.length-1;n>=0;n--)if(e.rolls[n]?.eventId===t)return e.rolls[n];return null}function Nn(e,t){let n=t.getSettingsEvent(),i=ss(e),r=Date.now(),o=new Set;for(let s of e.events){if(o.add(s.id),!s.targetType||!s.targetLabel){let u=t.resolveEventTargetEvent({type:s.targetType,name:s.targetName},s.scope);s.targetType=u.targetType,s.targetName=u.targetName,s.targetLabel=u.targetLabel}let l=typeof s.timeLimitMs=="number"&&Number.isFinite(s.timeLimitMs)?Math.max(0,s.timeLimitMs):t.parseIsoDurationToMsEvent(s.timeLimit||""),a=t.applyTimeLimitPolicyMsEvent(l,n);s.timeLimitMs=a;let d=i[s.id],c=V(e,s.id);if(!d){let u=typeof s.offeredAt=="number"&&Number.isFinite(s.offeredAt)?s.offeredAt:r,E=a==null?null:u+a;d={offeredAt:u,deadlineAt:E},i[s.id]=d}c?c.source==="timeout_auto_fail"&&(d.expiredAt=c.timeoutAt??c.rolledAt):(d.deadlineAt=a==null?null:d.offeredAt+a,d.deadlineAt==null&&delete d.expiredAt),s.offeredAt=d.offeredAt,s.deadlineAt=d.deadlineAt}for(let s of Object.keys(i))o.has(s)||delete i[s]}function hl(e,t){let n=e.pendingRound?.status,i=t.now?t.now():Date.now();return(!e.pendingRound||n!=="open")&&(e.pendingRound={roundId:t.createIdEvent("round"),status:"open",events:[],rolls:[],eventTimers:{},sourceAssistantMsgIds:[],openedAt:i}),(!e.pendingRound.eventTimers||typeof e.pendingRound.eventTimers!="object")&&(e.pendingRound.eventTimers={}),e.pendingRound}function os(e,t,n){let i=n.getSettingsEvent(),r=n.getDiceMetaEvent(),o=hl(r,{createIdEvent:n.createIdEvent}),s=Date.now(),l=ss(o),a=new Map;for(let d of o.events)a.set(d.id,{...d});for(let d of e){let c={...d},u=a.get(c.id),E=V(o,c.id),v={...u||{},...c};if(E){let m=l[v.id];m?(v.offeredAt=m.offeredAt,v.deadlineAt=m.deadlineAt):u&&(v.offeredAt=u.offeredAt,v.deadlineAt=u.deadlineAt??null)}else{let m=typeof v.timeLimitMs=="number"&&Number.isFinite(v.timeLimitMs)?Math.max(0,v.timeLimitMs):n.parseIsoDurationToMsEvent(v.timeLimit||""),S=n.applyTimeLimitPolicyMsEvent(m,i);v.timeLimitMs=S,v.offeredAt=s,v.deadlineAt=S==null?null:s+S,l[v.id]={offeredAt:v.offeredAt,deadlineAt:v.deadlineAt}}let g=n.resolveEventTargetEvent({type:v.targetType,name:v.targetName},v.scope);v.targetType=g.targetType,v.targetName=g.targetName,v.targetLabel=g.targetLabel,a.set(v.id,v)}return o.events=Array.from(a.values()),Nn(o,{getSettingsEvent:n.getSettingsEvent,resolveEventTargetEvent:n.resolveEventTargetEvent,parseIsoDurationToMsEvent:n.parseIsoDurationToMsEvent,applyTimeLimitPolicyMsEvent:n.applyTimeLimitPolicyMsEvent}),o.sourceAssistantMsgIds.includes(t)||o.sourceAssistantMsgIds.push(t),n.saveMetadataSafeEvent(),o}function xe(e,t,n){if(!n.enableOutcomeBranches)return{kind:"none",text:"\u8D70\u5411\u5206\u652F\u5DF2\u5173\u95ED\u3002",explosionTriggered:!1};let i=e.outcomes,r=!!t?.result?.explosionTriggered;return n.enableExplodeOutcomeBranch&&r&&i?.explode&&i.explode.trim()?{kind:"explode",text:i.explode.trim(),explosionTriggered:!0}:t?.success===!0?{kind:"success",text:i?.success?.trim()||"\u5224\u5B9A\u6210\u529F\uFF0C\u5267\u60C5\u5411\u6709\u5229\u65B9\u5411\u63A8\u8FDB\u3002",explosionTriggered:r}:t?.success===!1||t?.source==="timeout_auto_fail"?{kind:"failure",text:i?.failure?.trim()||"\u5224\u5B9A\u5931\u8D25\uFF0C\u5267\u60C5\u5411\u4E0D\u5229\u65B9\u5411\u63A8\u8FDB\u3002",explosionTriggered:r}:{kind:"none",text:"\u5C1A\u672A\u7ED3\u7B97\u3002",explosionTriggered:r}}function ls(e,t,n,i){let r=i.getSettingsEvent(),o=i.getDiceMetaEvent(),s=i.normalizeCompareOperatorEvent(t.compare)??">=",l=Number.isFinite(t.dc)?Number(t.dc):null,a=i.createSyntheticTimeoutDiceResultEvent(t),d=i.resolveSkillModifierBySkillNameEvent(t.skill,r),c=hn(a,d);a=c.result;let u=Mn(t.skill,o,r),E=Ln(a,u.modifier);a=E.result;let v=An(a,!1,s,l,"timeout_auto_fail");return{rollId:i.createIdEvent("eroll"),roundId:e.roundId,eventId:t.id,eventTitle:t.title,diceExpr:t.checkDice,result:a,success:!1,compareUsed:s,dcUsed:l,advantageStateApplied:ns(t.advantageState),resultGrade:v.resultGrade,marginToDc:v.marginToDc,skillModifierApplied:d,statusModifierApplied:u.modifier,statusModifiersApplied:u.matched,baseModifierUsed:c.baseModifierUsed,finalModifierUsed:E.finalModifierUsed,targetLabelUsed:t.targetLabel,rolledAt:n,source:"timeout_auto_fail",timeoutAt:n}}function as(e,t,n,i=Date.now()){if(!n.getSettingsEvent().enableTimeLimit||n.getLatestRollRecordForEvent(e,t.id))return null;n.ensureRoundEventTimersSyncedEvent(e);let s=e.eventTimers[t.id];if(!s||s.deadlineAt==null||i<=s.deadlineAt)return null;let l=n.createTimeoutFailureRecordEvent(e,t,i);return e.rolls.push(l),s.expiredAt=i,l}function ds(e){let t=e.getSettingsEvent();if(!t.enabled||!t.enableTimeLimit)return!1;let n=e.getDiceMetaEvent(),i=n.pendingRound;if(!i||i.status!=="open")return!1;e.ensureRoundEventTimersSyncedEvent(i);let r=Date.now(),o=!1;for(let s of i.events){let l=e.recordTimeoutFailureIfNeededEvent(i,s,r);l&&(o=!0,t.enableDynamicResultGuidance&&St(n,s,l),pt(n,s,l,t)&&(o=!0))}return o&&e.saveMetadataSafeEvent(),o}function cs(e,t,n,i){i.sweepTimeoutFailuresEvent();let r=String(e||"").trim();if(!r)return"\u274C \u8BF7\u63D0\u4F9B\u4E8B\u4EF6 ID\uFF0C\u4F8B\u5982\uFF1A/eventroll roll lockpick_gate";let o=i.getDiceMetaEvent(),s=o.pendingRound;if(!s)return"\u274C \u5F53\u524D\u6CA1\u6709\u53EF\u6295\u63B7\u7684\u4E8B\u4EF6\u3002";if(s.status!=="open")return"\u274C \u5F53\u524D\u8F6E\u6B21\u5DF2\u7ED3\u675F\uFF0C\u8BF7\u7B49\u5F85 AI \u751F\u6210\u65B0\u8F6E\u6B21\u4E8B\u4EF6\u3002";if(n&&s.roundId!==n)return"\u274C \u8BE5\u4E8B\u4EF6\u6240\u5C5E\u8F6E\u6B21\u5DF2\u7ED3\u675F\u3002";let l=s.events.find(k=>k.id===r);if(!l)return`\u274C \u627E\u4E0D\u5230\u4E8B\u4EF6 ID\uFF1A${r}`;let a=i.getSettingsEvent();i.ensureRoundEventTimersSyncedEvent(s);let d=i.recordTimeoutFailureIfNeededEvent(s,l);d&&(a.enableDynamicResultGuidance&&St(o,l,d),pt(o,l,d,a),i.saveMetadataSafeEvent());let c=i.getLatestRollRecordForEvent(s,l.id);if(c){let k=i.buildEventAlreadyRolledCardEvent(l,c),h=i.pushToChat(k);return i.refreshCountdownDomEvent(),typeof h=="string"?h:""}let u=(t||l.checkDice||"").trim();if(!u)return`\u274C \u4E8B\u4EF6 ${r} \u7F3A\u5C11\u53EF\u7528\u9AB0\u5F0F\u3002`;let E=is(u,l,a,i.parseDiceExpression);if(E.errorText)return`\u274C \u63B7\u9AB0\u5931\u8D25\uFF1A${E.errorText}`;let v;try{v=i.rollExpression(u,{rule:a.ruleText,adv:E.adv,dis:E.dis})}catch(k){return`\u274C \u63B7\u9AB0\u5931\u8D25\uFF1A${k?.message??String(k)}`}let g=i.resolveSkillModifierBySkillNameEvent(l.skill,a),m=i.applySkillModifierToDiceResultEvent(v,g);v=m.result;let S=Mn(l.skill,o,a),f=Ln(v,S.modifier);v=f.result,i.saveLastRoll(v);let _=i.normalizeCompareOperatorEvent(l.compare)??">=",b=Number.isFinite(l.dc)?Number(l.dc):null,I=i.evaluateSuccessEvent(v.total,_,b),T=An(v,I,_,b,"manual_roll"),p={rollId:i.createIdEvent("eroll"),roundId:s.roundId,eventId:l.id,eventTitle:l.title,diceExpr:u,result:v,success:I,compareUsed:_,dcUsed:b,advantageStateApplied:E.advantageStateApplied,resultGrade:T.resultGrade,marginToDc:T.marginToDc,skillModifierApplied:g,statusModifierApplied:S.modifier,statusModifiersApplied:S.matched,baseModifierUsed:m.baseModifierUsed,finalModifierUsed:f.finalModifierUsed,targetLabelUsed:l.targetLabel,rolledAt:Date.now(),source:"manual_roll",timeoutAt:null};s.rolls.push(p),a.enableDynamicResultGuidance&&St(o,l,p),pt(o,l,p,a),i.saveMetadataSafeEvent(),i.refreshCountdownDomEvent();let x=i.buildEventRollResultCardEvent(l,p),R=i.pushToChat(x);return typeof R=="string"?R:""}function us(e,t){let n=t.getSettingsEvent();if(!n.enableAiRollMode)return[];t.ensureRoundEventTimersSyncedEvent(e);let i=t.getDiceMetaEvent(),r=!1,o=null,s=[];for(let l of e.events){if((l.rollMode==="auto"?"auto":"manual")!=="auto"||t.getLatestRollRecordForEvent(e,l.id))continue;let c=String(l.checkDice||"").trim();if(!c)continue;let u=is(c,l,n,t.parseDiceExpression);if(u.errorText){console.warn(`[\u9AB0\u5B50\u63D2\u4EF6] AI \u81EA\u52A8\u63B7\u9AB0\u88AB\u8DF3\u8FC7: event=${l.id} reason=${u.errorText}`);continue}let E;try{E=t.rollExpression(c,{rule:n.ruleText,adv:u.adv,dis:u.dis})}catch(p){console.warn(`[\u9AB0\u5B50\u63D2\u4EF6] AI \u81EA\u52A8\u63B7\u9AB0\u5931\u8D25: event=${l.id}`,p);continue}let v=t.resolveSkillModifierBySkillNameEvent(l.skill,n),g=t.applySkillModifierToDiceResultEvent(E,v);E=g.result;let m=Mn(l.skill,i,n),S=Ln(E,m.modifier);E=S.result;let f=t.normalizeCompareOperatorEvent(l.compare)??">=",_=Number.isFinite(l.dc)?Number(l.dc):null,b=t.evaluateSuccessEvent(E.total,f,_),I=An(E,b,f,_,"ai_auto_roll"),T={rollId:t.createIdEvent("eroll"),roundId:e.roundId,eventId:l.id,eventTitle:l.title,diceExpr:c,result:E,success:b,compareUsed:f,dcUsed:_,advantageStateApplied:u.advantageStateApplied,resultGrade:I.resultGrade,marginToDc:I.marginToDc,skillModifierApplied:v,statusModifierApplied:m.modifier,statusModifiersApplied:m.matched,baseModifierUsed:g.baseModifierUsed,finalModifierUsed:S.finalModifierUsed,targetLabelUsed:l.targetLabel,rolledAt:Date.now(),source:"ai_auto_roll",timeoutAt:null};e.rolls.push(T),n.enableDynamicResultGuidance&&St(i,l,T),pt(i,l,T,n),r=!0,o=E,s.push(t.buildEventRollResultCardEvent(l,T))}return r?(o&&t.saveLastRoll(o),t.saveMetadataSafeEvent(),s):[]}function Es(e,t,n){let i=n.getSettingsEvent(),r=Number.isFinite(Number(e.baseModifierUsed))?Number(e.baseModifierUsed):Number(e.result.modifier)||0,o=Number.isFinite(Number(e.skillModifierApplied))?Number(e.skillModifierApplied):0,s=Number.isFinite(Number(e.statusModifierApplied))?Number(e.statusModifierApplied):0,l=Number.isFinite(Number(e.finalModifierUsed))?Number(e.finalModifierUsed):r+o+s,a="";if(i.enableOutcomeBranches){let S=t?n.resolveTriggeredOutcomeEvent(t,e,i):e.result.explosionTriggered&&i.enableExplodeOutcomeBranch?{kind:"explode"}:e.success===!0?{kind:"success"}:e.success===!1?{kind:"failure"}:{kind:"none"};S.kind!=="none"&&(a=` | \u8D70\u5411:${S.kind}`)}let d=e.targetLabelUsed||t?.targetLabel||"",c=d?` | \u5BF9\u8C61:${d}`:"",u=i.enableSkillSystem?` | \u4FEE\u6B63:${n.formatEventModifierBreakdownEvent(r,o,l)}`:"",E=s!==0?` | \u72B6\u6001:${s>0?`+${s}`:s}${Array.isArray(e.statusModifiersApplied)&&e.statusModifiersApplied.length>0?`(${e.statusModifiersApplied.map(S=>`${S.name}${S.modifier>0?`+${S.modifier}`:S.modifier}`).join(",")})`:""}`:"",v=e.advantageStateApplied&&e.advantageStateApplied!==ee?` | \u9AB0\u6001:${e.advantageStateApplied}`:"",g=e.resultGrade?` | \u5206\u7EA7:${e.resultGrade}`:"";if(e.source==="timeout_auto_fail")return`\u8D85\u65F6\u81EA\u52A8\u5224\u5B9A\u5931\u8D25${c}${u}${E}${v}${g}${a}`;if(e.source==="ai_auto_roll"){let S=e.success===null?"\u672A\u5224\u5B9A":e.success?"\u6210\u529F":"\u5931\u8D25";return`AI\u81EA\u52A8\u68C0\u5B9A\uFF0C\u603B\u503C ${e.result.total} (${e.compareUsed} ${e.dcUsed??"?"} => ${S})${c}${u}${E}${v}${g}${a}`}let m=e.success===null?"\u672A\u5224\u5B9A":e.success?"\u6210\u529F":"\u5931\u8D25";return`\u603B\u503C ${e.result.total} (${e.compareUsed} ${e.dcUsed??"?"} => ${m})${c}${u}${E}${v}${g}${a}`}var Ss="<dice_rules>",ps="</dice_rules>",Ts="<dice_round_summary>",fs="</dice_round_summary>",_s="<dice_result_guidance>",bs="</dice_result_guidance>",Is="<dice_runtime_policy>",xs="</dice_runtime_policy>",Ds="<dice_active_statuses>",ys="</dice_active_statuses>";function Oe(e){return String(e??"")}function $n(e){return String(e??"").replace(/\s+/g," ").trim()}function vs(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function K(e){return re(String(e||""))}function Ll(e){let t=e?.ruleStart||Ss,n=e?.ruleEnd||ps,i=e?.runtimePolicyStart||Is,r=e?.runtimePolicyEnd||xs,o=e?.summaryStart||Ts,s=e?.summaryEnd||fs,l=e?.guidanceStart||_s,a=e?.guidanceEnd||bs,d=e?.statusesStart||Ds,c=e?.statusesEnd||ys;return[{start:t,end:n},{start:i,end:r},{start:o,end:s},{start:l,end:a},{start:d,end:c}]}function Cn(e){return!e||typeof e!="object"?"":String(e.role??"").trim().toLowerCase()}function Ml(e){let t=[];for(let n of e){if(typeof n=="string"){t.push(n);continue}if(!n||typeof n!="object")continue;let i=n.text??n.content??"";typeof i=="string"&&i&&t.push(i)}return t.join(`
`)}function Nl(e){if(!e||typeof e!="object")return"";let t=e.create_date??e.create_time??e.timestamp??"";return String(t??"").trim()}function $l(e){if(!e||typeof e!="object")return"";let t=e.id??e.cid??e.uid;return t==null?"":String(t)}function ms(e){return Array.isArray(e)}function Cl(e){switch(e){case"critical_success":return"\u5927\u6210\u529F";case"partial_success":return"\u52C9\u5F3A\u6210\u529F";case"success":return"\u6210\u529F";case"failure":return"\u5931\u8D25";case"critical_failure":return"\u5927\u5931\u8D25";default:return"\u7ED3\u679C"}}function wl(e){let t=e.eventTitle||e.eventId;switch(e.resultGrade){case"critical_success":return`\u73A9\u5BB6\u5728\u300C${t}\u300D\u4E2D\u63B7\u51FA\u5927\u6210\u529F\uFF0C\u8BF7\u7528\u82F1\u96C4\u5316\u3001\u620F\u5267\u6027\u7684\u53E3\u543B\u63CF\u8FF0\u5176\u5B8C\u7F8E\u5B8C\u6210\u52A8\u4F5C\uFF0C\u5E76\u7ED9\u51FA\u989D\u5916\u6536\u76CA\u3002`;case"partial_success":return`\u73A9\u5BB6\u5728\u300C${t}\u300D\u4E2D\u52C9\u5F3A\u6210\u529F\uFF0C\u8BF7\u63CF\u8FF0\u201C\u6210\u529F\u4F46\u6709\u4EE3\u4EF7\u201D\uFF0C\u4EE3\u4EF7\u53EF\u5305\u542B\u53D7\u4F24\u3001\u66B4\u9732\u3001\u8D44\u6E90\u635F\u5931\u6216\u5F15\u6765\u5A01\u80C1\u3002`;case"success":return`\u73A9\u5BB6\u5728\u300C${t}\u300D\u4E2D\u6210\u529F\uFF0C\u8BF7\u7ED9\u51FA\u7A33\u5B9A\u63A8\u8FDB\u7684\u53D9\u4E8B\u7ED3\u679C\uFF0C\u907F\u514D\u989D\u5916\u60E9\u7F5A\u3002`;case"failure":return`\u73A9\u5BB6\u5728\u300C${t}\u300D\u4E2D\u5931\u8D25\uFF0C\u8BF7\u63CF\u8FF0\u53D7\u963B\u4F46\u5267\u60C5\u7EE7\u7EED\u63A8\u8FDB\uFF0C\u53EF\u5F15\u5165\u65B0\u7684\u56F0\u96BE\u6216\u66FF\u4EE3\u8DEF\u5F84\u3002`;case"critical_failure":return`\u73A9\u5BB6\u5728\u300C${t}\u300D\u4E2D\u5927\u5931\u8D25\uFF0C\u8BF7\u63CF\u8FF0\u663E\u8457\u4E14\u53EF\u611F\u77E5\u7684\u4E25\u91CD\u540E\u679C\uFF0C\u540C\u65F6\u4FDD\u6301\u540E\u7EED\u53EF\u884C\u52A8\u6027\u3002`;default:return`\u73A9\u5BB6\u5728\u300C${t}\u300D\u4E2D\u5B8C\u6210\u68C0\u5B9A\uFF0C\u8BF7\u6839\u636E\u7ED3\u679C\u63A8\u8FDB\u53D9\u4E8B\u3002`}}function Pl(e,t,n){if(!Array.isArray(e)||e.length===0)return"";let i=[];i.push(t),i.push(`v=1 count=${e.length}`);for(let r of e){let o=Cl(r.resultGrade),s=`${r.compareUsed} ${r.dcUsed==null?"N/A":r.dcUsed}`,l=r.marginToDc==null?"N/A":String(r.marginToDc),a=r.advantageStateApplied||"normal";i.push(`- [${o}] event="${$n(r.eventTitle)}" target="${$n(r.targetLabel)}" total=${r.total} check=${s} margin=${l} advantage=${a}`),i.push(`  instruction: ${wl(r)}`)}return i.push(n),K(i.join(`
`))}function le(e){return!e||typeof e!="object"?"":typeof e.content=="string"?e.content:Array.isArray(e.content)?Ml(e.content):e.content&&typeof e.content=="object"&&typeof e.content.text=="string"?String(e.content.text):typeof e.mes=="string"?e.mes:typeof e.text=="string"?e.text:""}function wn(e){if(!e||typeof e!="object")return"";let t=Number(e.swipe_id??e.swipeId),n=e.swipes;if(Array.isArray(n)&&Number.isFinite(t)&&t>=0&&t<n.length){let i=String(n[t]??"");if(i.trim())return i}return typeof e.mes=="string"&&e.mes.trim()?e.mes:le(e)}function Be(e,t){if(!e||typeof e!="object")return;let n=Oe(t),i=Object.prototype.hasOwnProperty.call(e,"content"),r=Object.prototype.hasOwnProperty.call(e,"mes");i&&(e.content=n),r&&(e.mes=n),!i&&!r&&(e.content=n)}function Rs(e){return!e||typeof e!="object"?!1:e.is_user===!0?!0:Cn(e)==="user"}function ks(e){return!e||typeof e!="object"?!1:e.is_system===!0?!0:Cn(e)==="system"}function Pn(e){if(!e||typeof e!="object"||Rs(e)||ks(e))return!1;let t=Cn(e);return t?t==="assistant":!0}function Ol(e){if(!Array.isArray(e))return-1;for(let t=e.length-1;t>=0;t--)if(ks(e[t]))return t;return-1}function Bl(e){if(!Array.isArray(e))return-1;for(let t=e.length-1;t>=0;t--)if(Rs(e[t]))return t;return-1}function Gl(e,t,n){let i=String(e??""),r=Ze(i),o=$l(t);if(o)return`prompt_user:${o}:${r}`;let s=Nl(t);return s?`prompt_user_ts:${s}:${r}`:`prompt_user_idx:${n}:${r}`}function gs(e,t){let n=Oe(e);for(let i of Ll(t)){let r=new RegExp(`${vs(i.start)}[\\s\\S]*?${vs(i.end)}`,"gi");n=n.replace(r,`
`)}return K(n)}function Hl(e,t,n){let i=Oe(e).trim();return i?i.includes(t)&&i.includes(n)?K(i):K(`${t}
${i}
${n}`):""}function Ul(e){let t=String(e||"").split(/[,\s]+/).map(n=>Number(String(n||"").trim())).filter(n=>Number.isFinite(n)&&Number.isInteger(n)&&n>0);return t.length<=0?"none":Array.from(new Set(t)).sort((n,i)=>n-i).join(",")}function Kl(e,t=20){try{let n=JSON.parse(String(e||"{}"));if(!n||typeof n!="object"||Array.isArray(n))return{count:0,preview:"empty"};let i=Object.entries(n).filter(([o,s])=>String(o||"").trim().length>0&&Number.isFinite(Number(s))).map(([o,s])=>[String(o).trim(),Number(s)]);if(i.length<=0)return{count:0,preview:"empty"};let r=i.slice(0,Math.max(1,t)).map(([o,s])=>`${$n(o)}:${s}`).join(",");return{count:i.length,preview:r||"empty"}}catch{return{count:0,preview:"invalid_json"}}}function Fl(e,t,n){let i=Ul(e.aiAllowedDiceSidesText),r=Kl(e.skillTableText),o=[];return o.push(t),o.push("v=1"),o.push(`apply_scope=${e.eventApplyScope}`),o.push(`round_mode=${e.enableAiRoundControl?"continuous":"per_round"}`),o.push(`roll_mode_allowed=${e.enableAiRollMode?"auto|manual":"manual_only"}`),o.push(`ai_round_control_enabled=${e.enableAiRoundControl?1:0}`),o.push(`round_control_allowed=${e.enableAiRoundControl?"continue|end_round":"disabled"}`),o.push(`explode_enabled=${e.enableExplodingDice?1:0}`),o.push(`advantage_enabled=${e.enableAdvantageSystem?1:0}`),o.push(`dynamic_dc_reason_enabled=${e.enableDynamicDcReason?1:0}`),o.push(`status_system_enabled=${e.enableStatusSystem?1:0}`),o.push(`status_tags_allowed=${e.enableStatusSystem?1:0}`),o.push(`outcome_branches_enabled=${e.enableOutcomeBranches?1:0}`),o.push(`explode_outcome_enabled=${e.enableExplodeOutcomeBranch?1:0}`),o.push(`time_limit_enabled=${e.enableTimeLimit?1:0}`),o.push(`min_time_limit_seconds=${Math.max(1,Math.floor(Number(e.minTimeLimitSeconds)||1))}`),o.push(`allowed_sides=${i}`),o.push(`skill_system_enabled=${e.enableSkillSystem?1:0}`),o.push(`skill_table_count=${r.count}`),o.push(`skill_table_preview=${r.preview}`),o.push(`summary_detail=${e.summaryDetailMode}`),o.push(`summary_rounds=${e.summaryHistoryRounds}`),o.push(`summary_include_outcome=${e.includeOutcomeInSummary?1:0}`),o.push(`list_outcome_preview=${e.showOutcomePreviewInListCard?1:0}`),o.push(n),K(o.join(`
`))}function zl(e,t){let n=K(e),i=t.map(r=>K(r)).filter(r=>r.length>0);return i.length?n?`${n}

${i.join(`

`)}`:i.join(`

`):n}function Vl(e,t,n,i,r,o){if(!t.enableDynamicResultGuidance)return e.outboundResultGuidance?(delete e.outboundResultGuidance,{text:"",changedMeta:!0}):{text:"",changedMeta:!1};if(i&&e.outboundResultGuidance&&e.outboundResultGuidance.userMsgId===n)return{text:K(e.outboundResultGuidance.guidanceText),changedMeta:!1};let s=Array.isArray(e.pendingResultGuidanceQueue)?e.pendingResultGuidanceQueue:[];if(s.length<=0)return e.outboundResultGuidance?(delete e.outboundResultGuidance,{text:"",changedMeta:!0}):{text:"",changedMeta:!1};let l=s.splice(0,s.length),a=Pl(l,r,o),d=l[l.length-1]?.rollId||l[0]?.rollId||"";return e.outboundResultGuidance={userMsgId:n,rollId:d,guidanceText:a},{text:a,changedMeta:!0}}function Yl(e,t){let n=e.findIndex(i=>i.roundId===t.roundId);return n>=0?(e[n]=t,!0):(e.push(t),!0)}function On(e){if(ms(e))return e;if(!e||typeof e!="object")return null;let t=[e.chat,e.messages,e.message_list,e.prompt?.chat,e.prompt?.messages,e.data?.chat,e.data?.messages,e.chatCompletion?.messages];for(let n of t)if(ms(n))return n;return null}function As(e,t,n="unknown"){let i=t.getSettingsEvent();if(!i.enabled)return;t.sweepTimeoutFailuresEvent();let r=On(e);if(!r||r.length===0)return;let o=Bl(r);if(o<0)return;let s=r[o];if(!s)return;let l=Ol(r),a=l>=0?r[l]:s;if(!a)return;let d=l>=0?"system":"user_fallback",c=t.DICE_RULE_BLOCK_START_Event||Ss,u=t.DICE_RULE_BLOCK_END_Event||ps,E=t.DICE_RUNTIME_POLICY_BLOCK_START_Event||Is,v=t.DICE_RUNTIME_POLICY_BLOCK_END_Event||xs,g=t.DICE_SUMMARY_BLOCK_START_Event||Ts,m=t.DICE_SUMMARY_BLOCK_END_Event||fs,S=t.DICE_RESULT_GUIDANCE_BLOCK_START_Event||_s,f=t.DICE_RESULT_GUIDANCE_BLOCK_END_Event||bs,_=t.DICE_ACTIVE_STATUSES_BLOCK_START_Event||Ds,b=t.DICE_ACTIVE_STATUSES_BLOCK_END_Event||ys,I={ruleStart:c,ruleEnd:u,runtimePolicyStart:E,runtimePolicyEnd:v,summaryStart:g,summaryEnd:m,guidanceStart:S,guidanceEnd:f,statusesStart:_,statusesEnd:b},T=gs(le(s),I),p=Gl(T,s,o);a!==s&&le(s)!==T&&Be(s,T);let x=t.getDiceMetaEvent(),R=x.lastPromptUserMsgId===p,k=!1;if(R||(x.lastPromptUserMsgId=p,k=!0),!R&&x.pendingRound&&Array.isArray(x.pendingRound.events)&&x.pendingRound.events.length>0){let w=t.ensureSummaryHistoryEvent(x),ce=t.createRoundSummarySnapshotEvent(x.pendingRound,Date.now());Yl(w,ce)&&(t.trimSummaryHistoryEvent(w),k=!0)}!R&&!i.enableAiRoundControl&&x.pendingRound?.status==="open"&&(x.pendingRound.status="closed",k=!0,console.info("[\u9AB0\u5B50\u63D2\u4EF6] \u5DF2\u6309\u201C\u6BCF\u8F6E\u6A21\u5F0F\u201D\u5728\u7528\u6237\u53D1\u8A00\u540E\u7ED3\u675F\u5F53\u524D\u8F6E\u6B21"));let h=le(a),M=gs(h,I),$="",ge="";if(i.autoSendRuleToAI){let w=Oe(i.ruleText||"").trim(),ce=Oe(t.DEFAULT_RULE_TEXT_Event||"").trim();$=Hl(w||ce,c,u),ge=Fl(i,E,v)}let ae="";if(R&&x.outboundSummary&&x.outboundSummary.userMsgId===p)ae=K(x.outboundSummary.summaryText);else{let w=t.ensureSummaryHistoryEvent(x),ce=t.buildSummaryBlockFromHistoryEvent(w,i.summaryDetailMode,i.summaryHistoryRounds,i.includeOutcomeInSummary);ae=K(ce),ae?x.outboundSummary={userMsgId:p,roundId:x.pendingRound?.roundId||"",summaryText:ae}:x.outboundSummary&&delete x.outboundSummary,k=!0}let D=Vl(x,i,p,R,S,f),H=K(D.text);D.changedMeta&&(k=!0);let Se=i.enableStatusSystem?Jr(Q(x),_,b):"",de=zl(M,[$,ge,ae,H,Se]);de!==h&&Be(a,de),k&&t.saveMetadataSafeEvent(),console.info(`[\u9AB0\u5B50\u63D2\u4EF6] Prompt managed blocks updated via ${n} (target=${d})`)}function hs(e){return yn(e,sn)}function Y(e){Nn(e,{getSettingsEvent:y,resolveEventTargetEvent:mt,parseIsoDurationToMsEvent:hs,applyTimeLimitPolicyMsEvent:vt})}function Bn(e){return Yr(e,{getSettingsEvent:y,OUTCOME_TEXT_MAX_LEN_Event:Hi,ISO_8601_DURATION_REGEX_Event:sn})}function Gn(e,t){return jr(e,t,re)}function jl(e){return rs(e,{parseDiceExpression:G})}function Xl(e,t,n){return ls(e,t,n,{getSettingsEvent:y,getDiceMetaEvent:A,normalizeCompareOperatorEvent:be,createSyntheticTimeoutDiceResultEvent:jl,resolveSkillModifierBySkillNameEvent:ve,createIdEvent:U})}function Hn(e,t,n=Date.now()){return as(e,t,{getSettingsEvent:y,getLatestRollRecordForEvent:V,ensureRoundEventTimersSyncedEvent:Y,createTimeoutFailureRecordEvent:Xl},n)}function te(){return ds({getSettingsEvent:y,getDiceMetaEvent:A,ensureRoundEventTimersSyncedEvent:Y,recordTimeoutFailureIfNeededEvent:Hn,saveMetadataSafeEvent:W})}function Ls(e,t){return os(e,t,{getSettingsEvent:y,getDiceMetaEvent:A,createIdEvent:U,parseIsoDurationToMsEvent:hs,applyTimeLimitPolicyMsEvent:vt,resolveEventTargetEvent:mt,saveMetadataSafeEvent:W})}function Ms(e,t){return Es(e,t,{getSettingsEvent:y,resolveTriggeredOutcomeEvent:xe,formatEventModifierBreakdownEvent:fe})}function Wl(e,t=Date.now()){return Zr(e,{ensureRoundEventTimersSyncedEvent:Y,getSettingsEvent:y,getLatestRollRecordForEvent:V,resolveTriggeredOutcomeEvent:xe,normalizeCompareOperatorEvent:be},t)}function ql(e,t,n,i){return ts(e,t,n,i,{SUMMARY_HISTORY_ROUNDS_MAX_Event:Te,SUMMARY_HISTORY_ROUNDS_MIN_Event:pe,SUMMARY_MAX_EVENTS_Event:Oi,SUMMARY_MAX_TOTAL_EVENT_LINES_Event:Bi,DICE_SUMMARY_BLOCK_START_Event:en,DICE_SUMMARY_BLOCK_END_Event:tn})}function Jl(e){es(e,Gi)}function Ns(e,t="unknown"){As(e,{getSettingsEvent:y,DEFAULT_RULE_TEXT_Event:ie,DICE_RULE_BLOCK_START_Event:hi,DICE_RULE_BLOCK_END_Event:Li,DICE_SUMMARY_BLOCK_START_Event:en,DICE_SUMMARY_BLOCK_END_Event:tn,DICE_RESULT_GUIDANCE_BLOCK_START_Event:Mi,DICE_RESULT_GUIDANCE_BLOCK_END_Event:Ni,DICE_RUNTIME_POLICY_BLOCK_START_Event:$i,DICE_RUNTIME_POLICY_BLOCK_END_Event:Ci,DICE_ACTIVE_STATUSES_BLOCK_START_Event:wi,DICE_ACTIVE_STATUSES_BLOCK_END_Event:Pi,sweepTimeoutFailuresEvent:te,getDiceMetaEvent:A,ensureSummaryHistoryEvent:Qr,createRoundSummarySnapshotEvent:Wl,trimSummaryHistoryEvent:Jl,buildSummaryBlockFromHistoryEvent:ql,saveMetadataSafeEvent:W},t)}function $s(e,t){return`<div style="margin-top:10px;padding:8px;border:1px solid rgba(82, 196, 26, 0.3);background:rgba(20, 35, 20, 0.6);font-size:12px;color:#a0d9a0;text-align:center;letter-spacing:0.5px;">
            ${e} \u5DF2\u7ED3\u7B97\uFF1A${t}
          </div>`}function Cs(e){return e?"<span style='color:#ff4d4f;font-weight:bold;'>[\u8D85\u65F6]</span>":"<span style='color:#52c41a;font-weight:bold;'>[\u5DF2\u63B7]</span>"}function ws(e){return`<button type="button" data-dice-event-roll="1" data-round-id="${e.roundIdAttr}" data-dice-event-id="${e.eventIdAttr}" data-dice-expr="${e.diceExprAttr}" ${e.buttonDisabledAttr} style="border:1px solid #c5a059;background:linear-gradient(135deg,#3a2515,#1a100a);color:#ffdfa3;padding:6px 16px;font-family:'Georgia', serif;font-weight:bold;font-size:12px;letter-spacing:1px;text-transform:uppercase;transition:all 0.2s;box-shadow:0 2px 4px rgba(0,0,0,0.5);${e.buttonStateStyle}">
            \u6267\u884C\u68C0\u5B9A
          </button>`}function Ps(e){let t=e.modifierTextHtml?`<span style="font-size:11px;padding:3px 8px;border:1px solid rgba(150,150,150,0.2);background:rgba(255,255,255,0.05);color:#d1c5a5;text-transform:uppercase;">\u4FEE\u6B63 <span style="color:#ffd987;">${e.modifierTextHtml}</span></span>`:"",n=e.dcReasonHtml?`<div style="margin-top:8px;margin-bottom:8px;font-size:12px;line-height:1.5;color:#c8d6a1;border:1px dashed rgba(160,197,110,0.35);background:rgba(34,44,22,0.38);padding:8px 10px;">DC \u539F\u56E0\uFF1A${e.dcReasonHtml}</div>`:"";return`
      <li style="position:relative;list-style:none;margin-bottom:16px;border:1px solid rgba(197,160,89,0.3);border-left:3px solid #c5a059;padding:14px;background:linear-gradient(135deg, rgba(30,20,18,0.8), rgba(15,10,10,0.9));box-shadow: 0 4px 6px rgba(0,0,0,0.3);">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:10px;">
          <div style="font-weight:bold;color:#ffdfa3;font-size:15px;font-family:'Georgia', serif;letter-spacing:1px;">
            \u25CF ${e.titleHtml}
          </div>
          <div style="font-size:11px;font-family:monospace;color:#8c7b60;background:rgba(0,0,0,0.5);border:1px solid rgba(197,160,89,0.2);padding:2px 6px;">
            ID: ${e.eventIdHtml}
          </div>
        </div>

        <div style="font-size:13px;line-height:1.6;color:#d1c5a5;opacity:0.9;margin-bottom:12px;">
          ${e.descHtml}
        </div>

        ${e.outcomePreviewHtml}

        <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:12px;justify-content:center;text-align:center;">
          <span style="font-size:11px;padding:3px 8px;border:1px solid rgba(150,150,150,0.2);background:rgba(255,255,255,0.05);color:#d1c5a5;text-transform:uppercase;">\u5BF9\u8C61 <span style="color:#9ad1ff;">${e.targetHtml}</span></span>
          <span style="font-size:11px;padding:3px 8px;border:1px solid rgba(150,150,150,0.2);background:rgba(255,255,255,0.05);color:#d1c5a5;text-transform:uppercase;">\u6280\u80FD <span style="color:#fff;cursor:help;" title="${e.skillTitleAttr}">${e.skillHtml}</span></span>
          <span style="font-size:11px;padding:3px 8px;border:1px solid rgba(150,150,150,0.2);background:rgba(255,255,255,0.05);color:#d1c5a5;text-transform:uppercase;">\u9AB0\u6001 <span style="color:#ffd987;">${e.advantageStateHtml}</span></span>
          <span style="font-size:11px;padding:3px 8px;border:1px solid rgba(150,150,150,0.2);background:rgba(255,255,255,0.05);color:#d1c5a5;text-transform:uppercase;">\u9AB0\u5F0F <span style="color:#ffdfa3;">${e.checkDiceHtml}</span></span>
          <span style="font-size:11px;padding:3px 8px;border:1px solid rgba(150,150,150,0.2);background:rgba(255,255,255,0.05);color:#d1c5a5;text-transform:uppercase;">\u6761\u4EF6 <span style="color:#ffbbbb;">${e.compareHtml} ${e.dcText}</span></span>
          <span style="font-size:11px;padding:3px 8px;border:1px solid rgba(150,150,150,0.2);background:rgba(255,255,255,0.05);color:#d1c5a5;text-transform:uppercase;">\u65F6\u9650 <span style="color:#a0d9a0;">${e.timeLimitHtml}</span></span>
          ${t}
        </div>
        ${n}

        <div data-dice-countdown="1" data-round-id="${e.roundIdAttr}" data-event-id="${e.eventIdAttr}" data-deadline-at="${e.deadlineAttr}" style="display:inline-block;padding:4px 10px;font-size:11px;font-family:monospace;border:${e.runtimeBorder};background:${e.runtimeBackground};color:${e.runtimeColor};letter-spacing:1px;margin-bottom:4px;">
          \u72B6\u6001\uFF1A${e.runtimeTextHtml}
        </div>

        ${e.rolledBlockHtml}

        <div style="margin-top:14px;display:flex;align-items:center;justify-content:space-between;border-top:1px dashed rgba(197,160,89,0.2);padding-top:12px;">
          <code style="font-size:11px;color:#8c7b60;background:none;padding:0;">${e.commandTextHtml}</code>
          ${e.rollButtonHtml}
        </div>
      </li>`}function Os(e,t){return`
  <div style="border:1px solid #8c7b60;background:linear-gradient(145deg,#1c1412 0%,#0d0806 100%);padding:16px;color:#d1c5a5;box-shadow:0 8px 24px rgba(0,0,0,0.4), inset 0 0 30px rgba(0,0,0,0.6);font-family:sans-serif;">
    <div style="display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:16px;border-bottom:1px solid #4a3b2c;padding-bottom:10px;">
      <strong style="color:#e8dcb5;font-size:16px;font-family:'Georgia', serif;letter-spacing:2px;">\u25CF \u5F53\u524D\u4E8B\u4EF6 \u25CF</strong>
      <span style="font-size:11px;color:#6b5a45;font-family:monospace;">\u8F6E\u6B21 ID: ${e}</span>
    </div>
    <ul style="padding:0;margin:0;">${t}</ul>
  </div>`}function Bs(e){let t=e.modifierBreakdownHtml?`<div style="color:#8c7b60;text-align:right;">\u4FEE\u6B63</div>
       <div style="font-family:monospace;color:#ffd987;">${e.modifierBreakdownHtml}</div>`:"";return`
  <div style="border:1px solid #8c7b60;background:linear-gradient(145deg,#1c1412 0%,#0d0806 100%);padding:16px;color:#d1c5a5;box-shadow:0 8px 24px rgba(0,0,0,0.4), inset 0 0 30px rgba(0,0,0,0.6);">
    <div style="display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:14px;border-bottom:1px solid #4a3b2c;padding-bottom:10px;">
      <strong style="color:#e8dcb5;font-size:15px;font-family:'Georgia', serif;letter-spacing:1px;">\u25CF \u68C0\u5B9A\u7ED3\u679C \u25CF</strong>
      <span style="font-size:11px;color:#6b5a45;font-family:monospace;">${e.rollIdHtml}</span>
    </div>

    <div style="margin-bottom:12px;font-weight:bold;font-size:16px;color:#ffdfa3;font-family:'Georgia', serif;">
      ${e.titleHtml}
    </div>

    <div style="display:grid;grid-template-columns:auto 1fr;gap:6px 12px;font-size:12px;line-height:1.4;opacity:0.9;background:rgba(0,0,0,0.3);padding:10px;border:1px solid rgba(197,160,89,0.15);">
      <div style="color:#8c7b60;text-align:right;">\u4E8B\u4EF6 ID</div>
      <div style="font-family:monospace;">${e.eventIdHtml}</div>

      <div style="color:#8c7b60;text-align:right;">\u6765\u6E90</div>
      <div>${e.sourceHtml}</div>

      <div style="color:#8c7b60;text-align:right;">\u5BF9\u8C61</div>
      <div style="color:#9ad1ff;">${e.targetHtml}</div>

      <div style="color:#8c7b60;text-align:right;">\u6280\u80FD</div>
      <div style="color:#fff;"><span style="cursor:help;" title="${e.skillTitleAttr}">${e.skillHtml}</span></div>

      <div style="color:#8c7b60;text-align:right;">\u9AB0\u6001</div>
      <div style="color:#ffd987;">${e.advantageStateHtml}</div>

      <div style="color:#8c7b60;text-align:right;">\u9AB0\u5F0F</div>
      <div style="font-family:monospace;color:#ffdfa3;">${e.diceExprHtml}${e.diceModifierHintHtml?`<span style="margin-left:8px;color:#ffd987;">${e.diceModifierHintHtml}</span>`:""}</div>

      <div style="color:#8c7b60;text-align:right;">\u63B7\u9AB0\u7ED3\u679C</div>
      <div style="font-family:monospace;">${e.rollsSummaryHtml}</div>

      ${t}
    </div>

    <div style="margin-top:16px;display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:12px;background:linear-gradient(90deg, rgba(0,0,0,0.4), rgba(0,0,0,0.1));padding:12px;border-left:3px solid ${e.statusColor};">
      <div style="justify-self:start;">
        <div style="font-size:11px;color:#8c7b60;letter-spacing:1px;text-transform:uppercase;margin-bottom:4px;">\u7ED3\u679C</div>
      </div>
      <div style="justify-self:center;display:flex;align-items:center;justify-content:center;">
        ${e.diceVisualBlockHtml}
      </div>
      <div style="justify-self:end;text-align:right;">
        <div style="font-size:11px;color:#8c7b60;letter-spacing:1px;text-transform:uppercase;margin-bottom:4px;">\u7CFB\u7EDF\u5224\u5B9A</div>
        <div style="font-size:13px;font-family:monospace;margin-bottom:2px;">\u6761\u4EF6: ${e.compareHtml} ${e.dcText}</div>
        ${e.dcReasonHtml?`<div style="font-size:12px;color:#c8d6a1;line-height:1.45;">DC \u539F\u56E0: ${e.dcReasonHtml}</div>`:""}
        <div style="font-weight:bold;font-size:16px;color:${e.statusColor};letter-spacing:1px;">[ ${e.statusText} ]</div>
      </div>
    </div>

    <div style="margin-top:10px;padding:10px;border:1px solid rgba(197,160,89,0.2);background:rgba(0,0,0,0.25);">
      <div style="font-size:11px;color:#8c7b60;letter-spacing:1px;text-transform:uppercase;margin-bottom:6px;">${e.outcomeLabelHtml}</div>
      <div style="font-size:13px;line-height:1.6;color:#e8dcb5;">${e.outcomeTextHtml}</div>
    </div>
    ${e.statusImpactHtml?`<div style="margin-top:8px;padding:8px;border:1px dashed rgba(155,200,255,0.36);background:rgba(20,28,40,0.32);font-size:12px;line-height:1.5;color:#b8d8ff;">${e.statusImpactHtml}</div>`:""}

    <div style="margin-top:12px;font-size:11px;color:#6b5a45;text-align:right;font-family:monospace;">
      \u65F6\u95F4\u9650\u5236: ${e.timeLimitHtml}
    </div>
  </div>`}function Gs(e,t){return`[${e}] <span style="color:#8c7b60;">|</span> \u4FEE\u6B63 ${t}`}function Hs(e){let t=e.modifierBreakdownHtml?`<div><span style="color:#8c7b60;">\u4FEE\u6B63:</span> <code style="font-size:11px;color:#ffdfa3;">${e.modifierBreakdownHtml}</code></div>`:"";return`
  <div style="border:1px solid #5a4b3c;background:linear-gradient(135deg,#241c18 0%,#171210 100%);padding:14px;color:#b3a58b;box-shadow:inset 0 0 20px rgba(0,0,0,0.5);">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;border-bottom:1px dashed #4a3b2c;padding-bottom:8px;">
      <strong style="color:#d1c5a5;font-size:14px;letter-spacing:1px;">${e.titleTextHtml}</strong>
      <span style="font-size:11px;opacity:0.6;font-family:monospace;">${e.rollIdHtml}</span>
    </div>

    <div style="font-size:13px;line-height:1.6;display:flex;flex-direction:column;gap:4px;">
      <div><span style="color:#8c7b60;">\u4E8B\u4EF6:</span> <strong style="color:#d1c5a5;">${e.eventTitleHtml}</strong> <code style="font-size:11px;color:#6b5a45;">(${e.eventIdHtml})</code></div>
      <div><span style="color:#8c7b60;">\u6765\u6E90:</span> ${e.sourceTextHtml}</div>
      <div><span style="color:#8c7b60;">\u5BF9\u8C61:</span> ${e.targetHtml}</div>
      <div><span style="color:#8c7b60;">\u9AB0\u6001:</span> ${e.advantageStateHtml}</div>
      ${t}

      <div style="display:flex;align-items:center;gap:8px;margin-top:4px;padding-top:4px;border-top:1px solid rgba(0,0,0,0.3);">
        <span style="color:#8c7b60;">\u6761\u4EF6:</span>
        <span style="font-size:12px;color:#d1c5a5;font-family:monospace;">${e.compareHtml} ${e.dcText}</span>
        <span style="margin-left:auto;color:${e.statusColor};font-weight:bold;border:1px solid ${e.statusColor};padding:2px 6px;font-size:11px;border-radius:2px;">
          ${e.statusText}
        </span>
      </div>
      ${e.dcReasonHtml?`<div style="font-size:12px;color:#c8d6a1;line-height:1.5;">DC \u539F\u56E0: ${e.dcReasonHtml}</div>`:""}

      ${e.diceVisualBlockHtml}
      ${e.distributionBlockHtml}
      <div style="margin-top:8px;padding:8px;border:1px solid rgba(140,123,96,0.3);background:rgba(0,0,0,0.25);">
        <div style="font-size:11px;color:#8c7b60;letter-spacing:1px;text-transform:uppercase;margin-bottom:4px;">${e.outcomeLabelHtml}</div>
        <div style="font-size:12px;line-height:1.6;color:#d1c5a5;">${e.outcomeTextHtml}</div>
      </div>
      ${e.statusImpactHtml?`<div style="margin-top:6px;padding:8px;border:1px dashed rgba(155,200,255,0.36);background:rgba(20,28,40,0.32);font-size:12px;line-height:1.5;color:#b8d8ff;">${e.statusImpactHtml}</div>`:""}
      ${e.timeoutBlockHtml}
    </div>
  </div>`}function Us(e,t){return`
      <div style="font-size:11px;color:#6b5a45;margin-top:6px;text-align:center;background:rgba(0,0,0,0.3);padding:4px;border-radius:4px;">
        <span style="color:#8c7b60;">\u63B7\u9AB0:</span> [${e}] <span style="color:#8c7b60;margin:0 4px;">|</span> <span style="color:#8c7b60;">\u4FEE\u6B63</span> ${t}
      </div>
      `}function Ks(e){return`<div style="font-size:11px;color:#8c7b60;margin-top:6px;font-family:monospace;text-align:right;">\u8D85\u65F6\u7ED3\u7B97\u65F6\u95F4\uFF1A${e}</div>`}function Fs(e){let t=Math.max(0,Math.ceil(e/1e3)),n=Math.floor(t/3600),i=Math.floor(t%3600/60),r=t%60;return n>0?`${String(n).padStart(2,"0")}:${String(i).padStart(2,"0")}:${String(r).padStart(2,"0")}`:`${String(i).padStart(2,"0")}:${String(r).padStart(2,"0")}`}function Vs(e,t,n,i=Date.now()){let r=n.getSettingsEvent(),o=n.getLatestRollRecordForEvent(e,t.id);if(o)return o.source==="timeout_auto_fail"?{text:"\u5DF2\u8D85\u65F6\u5931\u8D25",tone:"danger",locked:!0}:o.success===!1?{text:"\u5DF2\u7ED3\u7B97(\u5931\u8D25)",tone:"danger",locked:!0}:{text:"\u5DF2\u7ED3\u7B97",tone:"success",locked:!0};if(!r.enableTimeLimit)return{text:"\u65F6\u9650\u5173\u95ED",tone:"neutral",locked:!1};n.ensureRoundEventTimersSyncedEvent(e);let s=e.eventTimers[t.id];if(!s||s.deadlineAt==null)return{text:"\u4E0D\u9650\u65F6",tone:"neutral",locked:!1};let l=s.deadlineAt-i;return l<=0?{text:"\u5DF2\u8D85\u65F6",tone:"danger",locked:!0}:l<=1e4?{text:`\u5269\u4F59 ${Fs(l)}`,tone:"warn",locked:!1}:{text:`\u5269\u4F59 ${Fs(l)}`,tone:"neutral",locked:!1}}function Un(e){switch(e){case"warn":return{border:"1px solid rgba(255,196,87,0.55)",background:"rgba(71,47,14,0.45)",color:"#ffd987"};case"danger":return{border:"1px solid rgba(255,120,120,0.55)",background:"rgba(80,20,20,0.45)",color:"#ffb6b6"};case"success":return{border:"1px solid rgba(136,255,173,0.55)",background:"rgba(18,54,36,0.45)",color:"#bfffd1"};default:return{border:"1px solid rgba(173,201,255,0.45)",background:"rgba(20,36,62,0.45)",color:"#d1e6ff"}}}function Zl(e,t,n){let i=Array.from(document.querySelectorAll("button[data-dice-event-roll='1']"));for(let r of i){let o=r.getAttribute("data-round-id")||"",s=r.getAttribute("data-dice-event-id")||"";o!==e||s!==t||(r.disabled=n,r.style.display=n?"none":"inline-block",r.style.opacity=n?"0.5":"1",r.style.cursor=n?"not-allowed":"pointer",r.style.filter=n?"grayscale(0.35)":"")}}function Ys(e){let t=Array.from(document.querySelectorAll("[data-dice-countdown='1']")),n=Array.from(document.querySelectorAll("button[data-dice-event-roll='1']"));if(t.length===0&&n.length===0)return;let r=e.getDiceMetaEvent().pendingRound;if(!r||r.status!=="open"){for(let s of n)s.disabled=!0,s.style.display="none",s.style.opacity="0.5",s.style.cursor="not-allowed",s.style.filter="grayscale(0.35)";return}e.ensureRoundEventTimersSyncedEvent(r);let o=Date.now();for(let s of t){let l=s.getAttribute("data-round-id")||"",a=s.getAttribute("data-event-id")||"";if(!l||!a||l!==r.roundId)continue;let d=r.events.find(E=>E.id===a);if(!d)continue;let c=e.getEventRuntimeViewStateEvent(r,d,o),u=e.getRuntimeToneStyleEvent(c.tone);s.textContent=`\u23F1 ${c.text}`,s.style.border=u.border,s.style.background=u.background,s.style.color=u.color,Zl(r.roundId,d.id,c.locked)}}function Kn(){try{let e=Array.from(document.querySelectorAll("pre"));for(let t of e){let n=(t.textContent||"").trim();!n||!(n.includes("dice_events")&&n.includes('"events"')&&n.includes('"type"'))||t.remove()}}catch(e){console.warn("[\u9AB0\u5B50\u63D2\u4EF6] \u9690\u85CF\u4E8B\u4EF6\u4EE3\u7801\u5757\u5931\u8D25",e)}}function Ql(e,t,n){if(!t.enableOutcomeBranches||!t.showOutcomePreviewInListCard)return"";let i=e.outcomes;if(!i||!!!(i.success?.trim()||i.failure?.trim()||i.explode?.trim()))return"";let o=Z(e.outcomes?.success?.trim()||"")||"\u672A\u8BBE\u7F6E",s=Z(e.outcomes?.failure?.trim()||"")||"\u672A\u8BBE\u7F6E",l=t.enableExplodeOutcomeBranch?Z(e.outcomes?.explode?.trim()||"")||"\u672A\u8BBE\u7F6E":"\u5DF2\u5173\u95ED";return`
    <div style="margin-top:8px; margin-bottom:12px; padding:12px; border:1px solid rgba(197,160,89,0.3); border-radius:6px; background:linear-gradient(135deg, rgba(30,30,30,0.6) 0%, rgba(15,15,15,0.8) 100%); font-size:12px; line-height:1.6; box-shadow:inset 0 1px 4px rgba(0,0,0,0.5);">
      <div style="margin-bottom:10px; font-weight:600; color:#d1b67f; font-size:11px; letter-spacing:1px; display:flex; align-items:center;">
        <span style="flex-grow:1; height:1px; background:linear-gradient(90deg, transparent, rgba(197,160,89,0.4)); margin-right:8px;"></span>
        \u8D70\u5411\u9884\u89C8
        <span style="margin-left:8px; flex-grow:1; height:1px; background:linear-gradient(270deg, transparent, rgba(197,160,89,0.4));"></span>
      </div>
      <div style="display:flex; margin-bottom:6px; align-items:flex-start;">
        <span style="display:inline-block; padding:0 6px; margin-right:10px; background:rgba(82,196,26,0.15); border:1px solid rgba(82,196,26,0.4); border-radius:4px; color:#73d13d; font-size:10px; font-family:monospace; line-height:1.6; white-space:nowrap; user-select:none; box-shadow:0 0 4px rgba(82,196,26,0.1);">\u6210\u529F</span>
        <span style="color:#e0e0e0; flex:1; word-break:break-word;">${n(o)}</span>
      </div>
      <div style="display:flex; margin-bottom:6px; align-items:flex-start;">
        <span style="display:inline-block; padding:0 6px; margin-right:10px; background:rgba(255,77,79,0.15); border:1px solid rgba(255,77,79,0.4); border-radius:4px; color:#ff7875; font-size:10px; font-family:monospace; line-height:1.6; white-space:nowrap; user-select:none; box-shadow:0 0 4px rgba(255,77,79,0.1);">\u5931\u8D25</span>
        <span style="color:#e0e0e0; flex:1; word-break:break-word;">${n(s)}</span>
      </div>
      <div style="display:flex; align-items:flex-start;">
        <span style="display:inline-block; padding:0 6px; margin-right:10px; background:rgba(250,173,20,0.15); border:1px solid rgba(250,173,20,0.4); border-radius:4px; color:#ffc53d; font-size:10px; font-family:monospace; line-height:1.6; white-space:nowrap; user-select:none; box-shadow:0 0 4px rgba(250,173,20,0.1);">\u7206\u9AB0</span>
        <span style="color:#e0e0e0; flex:1; word-break:break-word;">${n(l)}</span>
      </div>
    </div>
  `}function js(e){return e==="explode"?"\u7206\u9AB0\u8D70\u5411":e==="success"?"\u6210\u529F\u8D70\u5411":e==="failure"?"\u5931\u8D25\u8D70\u5411":"\u5267\u60C5\u8D70\u5411"}function Fn(e){return e==="advantage"?"\u4F18\u52BF":e==="disadvantage"?"\u52A3\u52BF":"\u6B63\u5E38"}function Xs(e,t){let n=t.getSettingsEvent(),i=t.getDiceMetaEvent(),r=Q(i);t.ensureRoundEventTimersSyncedEvent(e);let o=e.events.map(s=>{let l=s.compare??">=",a=t.getLatestRollRecordForEvent(e,s.id),d=t.getEventRuntimeViewStateEvent(e,s,Date.now()),c=t.getRuntimeToneStyleEvent(d.tone),u=t.buildEventRolledPrefixTemplateEvent(a?.source==="timeout_auto_fail"),E=a?t.buildEventRolledBlockTemplateEvent(u,t.escapeHtmlEvent(t.formatRollRecordSummaryEvent(a,s))):"",v=Ql(s,n,t.escapeHtmlEvent),g=typeof s.deadlineAt=="number"&&Number.isFinite(s.deadlineAt)?String(s.deadlineAt):"",m=d.locked?"disabled":"",S=d.locked?"opacity:0.4;cursor:not-allowed;filter:grayscale(1);":"cursor:pointer;",f=!d.locked&&!a,_=n.enableTimeLimit?s.timeLimit?s.timeLimit:"\u65E0":"\u5173\u95ED",b=0;try{b=t.parseDiceExpression(s.checkDice).modifier}catch{b=0}let I=t.resolveSkillModifierBySkillNameEvent(s.skill,n),T=n.enableStatusSystem?Ie(r,s.skill):{modifier:0,matched:[]},p=b+I+T.modifier,x=n.enableSkillSystem||T.modifier!==0?`${t.formatModifier(b)} + \u6280\u80FD ${t.formatModifier(I)} + \u72B6\u6001 ${t.formatModifier(T.modifier)} = ${t.formatModifier(p)}`:"",R=n.enableSkillSystem?`\u6280\u80FD\u4FEE\u6B63\uFF1A${t.formatModifier(I)}${T.modifier!==0?`\uFF1B\u72B6\u6001 ${t.formatModifier(T.modifier)}${T.matched.length>0?`\uFF08${T.matched.map(M=>`${M.name}${t.formatModifier(M.modifier)}`).join("\uFF0C")}\uFF09`:""}`:""}${x?`\uFF08${x}\uFF09`:""}`:"\u6280\u80FD\u7CFB\u7EDF\u5DF2\u5173\u95ED",k=Fn(a?.advantageStateApplied??s.advantageState),h=f?t.buildEventRollButtonTemplateEvent({roundIdAttr:t.escapeAttrEvent(e.roundId),eventIdAttr:t.escapeAttrEvent(s.id),diceExprAttr:t.escapeAttrEvent(s.checkDice),buttonDisabledAttr:m,buttonStateStyle:S}):"";return t.buildEventListItemTemplateEvent({titleHtml:t.escapeHtmlEvent(s.title),eventIdHtml:t.escapeHtmlEvent(s.id),descHtml:t.escapeHtmlEvent(s.desc),targetHtml:t.escapeHtmlEvent(s.targetLabel),skillHtml:t.escapeHtmlEvent(s.skill),skillTitleAttr:t.escapeAttrEvent(R),advantageStateHtml:t.escapeHtmlEvent(k),modifierTextHtml:t.escapeHtmlEvent(x),checkDiceHtml:t.escapeHtmlEvent(s.checkDice),compareHtml:t.escapeHtmlEvent(l),dcText:String(s.dc),dcReasonHtml:n.enableDynamicDcReason&&s.dcReason?t.escapeHtmlEvent(s.dcReason):"",timeLimitHtml:t.escapeHtmlEvent(_),roundIdAttr:t.escapeAttrEvent(e.roundId),eventIdAttr:t.escapeAttrEvent(s.id),deadlineAttr:t.escapeAttrEvent(g),runtimeTextHtml:t.escapeHtmlEvent(d.text),runtimeBorder:c.border,runtimeBackground:c.background,runtimeColor:c.color,rolledBlockHtml:E,outcomePreviewHtml:v,commandTextHtml:`/eventroll roll ${t.escapeHtmlEvent(s.id)}`,rollButtonHtml:h})}).join("");return t.buildEventListCardTemplateEvent(t.escapeHtmlEvent(e.roundId),o)}function zs(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/`/g,"&#96;")}function Tt(e){return e>0?`+${e}`:String(e)}function Ws(e,t,n,i){let r=Array.isArray(e.rolls)&&e.rolls.length>0?`[${e.rolls.join(", ")}]`:"[]",o=Number.isFinite(Number(e.rawTotal))?Number(e.rawTotal):0,s=Number.isFinite(Number(e.total))?Number(e.total):o,l=Number.isFinite(Number(n)),a=Number.isFinite(Number(t))?Number(t):Number(e.modifier)||0,d=l?Number(n):0,c=Number.isFinite(Number(i))?Number(i):l?a+d:Number(e.modifier)||0,u=[];return u.push(`\u9AB0\u9762 ${r}`),u.push(`\u539F\u59CB\u503C ${o}`),l?(u.push(`\u57FA\u7840\u4FEE\u6B63 ${Tt(a)}`),u.push(`\u6280\u80FD\u4FEE\u6B63 ${Tt(d)}`),u.push(`\u6700\u7EC8\u4FEE\u6B63 ${Tt(c)}`)):u.push(`\u4FEE\u6B63 ${Tt(Number(e.modifier)||0)}`),u.push(`\u603B\u8BA1 ${s}`),e.exploding&&u.push(e.explosionTriggered?"\u7206\u9AB0\u5DF2\u89E6\u53D1":"\u7206\u9AB0\u5DF2\u542F\u7528"),u.join(" | ")}function ea(e,t,n){let i=Math.max(40,Math.floor(n)),r=Math.max(14,Math.round(i*.34));return`
    <svg width="${i}" height="${i}" viewBox="0 0 48 48" style="display:inline-block; vertical-align: middle;">
      <rect x="4" y="4" width="40" height="40" rx="8" ry="8" fill="none" stroke="${t}" stroke-width="3" />
      <text x="24" y="31" font-size="${r}" text-anchor="middle" fill="${t}" font-weight="bold" style="font-family: monospace;">${e}</text>
    </svg>
  `}function qs(e,t,n=!1,i=""){if(!e||!Array.isArray(e.rolls)||e.rolls.length===0)return"";let r="d"+Math.random().toString(36).substr(2,9),o="normal",s="",l="#ffdb78";if(e.count===1){let S=e.rolls[0],f=e.sides;S===f?(o="success",s="\u5927\u6210\u529F\uFF01",l="#52c41a"):S===1&&(o="fail",s="\u5927\u5931\u8D25\uFF01",l="#ff4d4f")}let a=n?62:68,d=n?52:58,c=String(i||"").trim(),u=Number.isFinite(Number(e.total))?Number(e.total):0,E=ea(u,l,a),v=c?`<span style="display:inline-flex;cursor:help;" title="${zs(`${c} | \u603B\u8BA1: ${u}`)}">${E}</span>`:E,g=t.getRollingSvg("#ffdb78",d),m=t.buildAlreadyRolledDiceVisualTemplateEvent({uniqueId:r,rollingVisualHtml:g,diceVisualsHtml:v,critType:o,critText:s,compactMode:n});return c?`<div style="display:inline-flex;align-items:center;justify-content:center;cursor:help;" title="${zs(c)}">${m}</div>`:m}function Js(e,t,n){let i=n.getSettingsEvent(),r=n.resolveTriggeredOutcomeEvent(e,t,i),o=i.enableOutcomeBranches?js(r.kind):"\u5267\u60C5\u8D70\u5411",s=i.enableOutcomeBranches?r.text:"\u8D70\u5411\u5206\u652F\u5DF2\u5173\u95ED\u3002",l=Z(s),a=t.success===null?"\u5F85\u5B9A":t.success?"\u5224\u5B9A\u6210\u529F":"\u5224\u5B9A\u5931\u8D25",d=t.success===null?"#ffdb78":t.success?"#52c41a":"#ff4d4f",c=t.source==="timeout_auto_fail"?"\u8D85\u65F6\u81EA\u52A8\u68C0\u5B9A":t.source==="ai_auto_roll"?"AI \u81EA\u52A8\u68C0\u5B9A":"\u4E3B\u52A8\u68C0\u5B9A",u=Number.isFinite(Number(t.baseModifierUsed))?Number(t.baseModifierUsed):Number(t.result.modifier)||0,E=Number.isFinite(Number(t.skillModifierApplied))?Number(t.skillModifierApplied):0,v=Number.isFinite(Number(t.statusModifierApplied))?Number(t.statusModifierApplied):0,g=Number.isFinite(Number(t.finalModifierUsed))?Number(t.finalModifierUsed):u+E+v,m=Ws(t.result,u,E,g),S=t.source==="timeout_auto_fail"?"":qs(t.result,{getDiceSvg:n.getDiceSvg,getRollingSvg:n.getRollingSvg,buildAlreadyRolledDiceVisualTemplateEvent:n.buildAlreadyRolledDiceVisualTemplateEvent},!0,m),f=i.enableSkillSystem||v!==0?`${n.formatModifier(u)} + \u6280\u80FD ${n.formatModifier(E)} + \u72B6\u6001 ${n.formatModifier(v)} = ${n.formatModifier(g)}`:"",_=i.enableSkillSystem?`\u6280\u80FD\u4FEE\u6B63\uFF1A${n.formatModifier(E)}\uFF1B\u72B6\u6001 ${n.formatModifier(v)}${f?`\uFF08${f}\uFF09`:""}`:"\u6280\u80FD\u7CFB\u7EDF\u5DF2\u5173\u95ED",b=i.enableSkillSystem&&(E!==0||v!==0)?`\u6280\u80FD${n.formatModifier(E)} / \u72B6\u6001${n.formatModifier(v)}`:"",I=v!==0?`\u53D7\u72B6\u6001\u5F71\u54CD ${n.formatModifier(v)}${Array.isArray(t.statusModifiersApplied)&&t.statusModifiersApplied.length>0?`\uFF08${t.statusModifiersApplied.map(T=>`${T.name}${n.formatModifier(T.modifier)}`).join("\uFF0C")}\uFF09`:""}`:"";return n.buildEventRollResultCardTemplateEvent({rollIdHtml:n.escapeHtmlEvent(t.rollId),titleHtml:n.escapeHtmlEvent(e.title),eventIdHtml:n.escapeHtmlEvent(e.id),sourceHtml:n.escapeHtmlEvent(c),targetHtml:n.escapeHtmlEvent(t.targetLabelUsed||e.targetLabel),skillHtml:n.escapeHtmlEvent(e.skill),skillTitleAttr:n.escapeAttrEvent(_),advantageStateHtml:n.escapeHtmlEvent(Fn(t.advantageStateApplied??e.advantageState)),diceExprHtml:n.escapeHtmlEvent(t.diceExpr),diceModifierHintHtml:n.escapeHtmlEvent(b),rollsSummaryHtml:n.buildRollsSummaryTemplateEvent(n.escapeHtmlEvent(t.result.rolls.join(", ")),n.escapeHtmlEvent(n.formatModifier(t.result.modifier))),modifierBreakdownHtml:n.escapeHtmlEvent(f),compareHtml:n.escapeHtmlEvent(t.compareUsed),dcText:String(t.dcUsed??"\u672A\u8BBE\u7F6E"),dcReasonHtml:i.enableDynamicDcReason&&e.dcReason?n.escapeHtmlEvent(e.dcReason):"",statusText:a,statusColor:d,totalText:String(t.result.total),timeLimitHtml:n.escapeHtmlEvent(e.timeLimit??"\u65E0"),diceVisualBlockHtml:S,outcomeLabelHtml:n.escapeHtmlEvent(o),outcomeTextHtml:n.escapeHtmlEvent(l),statusImpactHtml:n.escapeHtmlEvent(I)})}function Zs(e,t,n){let i=n.getSettingsEvent(),r=n.resolveTriggeredOutcomeEvent(e,t,i),o=i.enableOutcomeBranches?js(r.kind):"\u5267\u60C5\u8D70\u5411",s=i.enableOutcomeBranches?r.text:"\u8D70\u5411\u5206\u652F\u5DF2\u5173\u95ED\u3002",l=Z(s),a=t.source==="timeout_auto_fail",d=a?"[\u8D85\u65F6] \u4E8B\u4EF6\u5DF2\u7ED3\u675F":"[\u5B8C\u6210] \u68C0\u5B9A\u5DF2\u7ED3\u7B97",c=a?"\u7CFB\u7EDF\u5F3A\u5236\u7ED3\u7B97":t.source==="ai_auto_roll"?"AI \u81EA\u52A8\u68C0\u5B9A":"\u73A9\u5BB6\u4E3B\u52A8\u68C0\u5B9A",u=t.success===null?"\u672A\u51B3":t.success?"\u6210\u529F":"\u5931\u8D25",E=t.success===null?"#a3957a":t.success?"#52c41a":"#ff4d4f",v=Number.isFinite(Number(t.baseModifierUsed))?Number(t.baseModifierUsed):Number(t.result.modifier)||0,g=Number.isFinite(Number(t.skillModifierApplied))?Number(t.skillModifierApplied):0,m=Number.isFinite(Number(t.statusModifierApplied))?Number(t.statusModifierApplied):0,S=Number.isFinite(Number(t.finalModifierUsed))?Number(t.finalModifierUsed):v+g+m,f=Ws(t.result,v,g,S),_=a?"":qs(t.result,{getDiceSvg:n.getDiceSvg,getRollingSvg:n.getRollingSvg,buildAlreadyRolledDiceVisualTemplateEvent:n.buildAlreadyRolledDiceVisualTemplateEvent},!1,f),b=i.enableSkillSystem||m!==0?`${n.formatModifier(v)} + \u6280\u80FD ${n.formatModifier(g)} + \u72B6\u6001 ${n.formatModifier(m)} = ${n.formatModifier(S)}`:"",I=m!==0?`\u53D7\u72B6\u6001\u5F71\u54CD ${n.formatModifier(m)}${Array.isArray(t.statusModifiersApplied)&&t.statusModifiersApplied.length>0?`\uFF08${t.statusModifiersApplied.map(x=>`${x.name}${n.formatModifier(x.modifier)}`).join("\uFF0C")}\uFF09`:""}`:"",T=!a&&t.result?n.buildEventDistributionBlockTemplateEvent(n.escapeHtmlEvent(t.result.rolls.join(", ")),n.escapeHtmlEvent(n.formatModifier(t.result.modifier))):"",p=t.timeoutAt?n.buildEventTimeoutAtBlockTemplateEvent(n.escapeHtmlEvent(new Date(t.timeoutAt).toISOString())):"";return n.buildEventAlreadyRolledCardTemplateEvent({titleTextHtml:d,rollIdHtml:n.escapeHtmlEvent(t.rollId),eventTitleHtml:n.escapeHtmlEvent(e.title),eventIdHtml:n.escapeHtmlEvent(e.id),sourceTextHtml:n.escapeHtmlEvent(c),targetHtml:n.escapeHtmlEvent(t.targetLabelUsed||e.targetLabel),advantageStateHtml:n.escapeHtmlEvent(Fn(t.advantageStateApplied??e.advantageState)),modifierBreakdownHtml:n.escapeHtmlEvent(b),compareHtml:n.escapeHtmlEvent(t.compareUsed),dcText:String(t.dcUsed??"\u672A\u8BBE\u7F6E"),dcReasonHtml:i.enableDynamicDcReason&&e.dcReason?n.escapeHtmlEvent(e.dcReason):"",statusText:u,statusColor:E,diceVisualBlockHtml:_,distributionBlockHtml:T,outcomeLabelHtml:n.escapeHtmlEvent(o),outcomeTextHtml:n.escapeHtmlEvent(l),statusImpactHtml:n.escapeHtmlEvent(I),timeoutBlockHtml:p})}var ta={getSettingsEvent:y,getDiceMetaEvent:A,ensureRoundEventTimersSyncedEvent:Y,getLatestRollRecordForEvent:V,getEventRuntimeViewStateEvent:ft,getRuntimeToneStyleEvent:Un,buildEventRolledPrefixTemplateEvent:Cs,buildEventRolledBlockTemplateEvent:$s,formatRollRecordSummaryEvent:Ms,parseDiceExpression:G,resolveSkillModifierBySkillNameEvent:ve,formatEventModifierBreakdownEvent:fe,formatModifier:B,buildEventRollButtonTemplateEvent:ws,buildEventListItemTemplateEvent:Ps,buildEventListCardTemplateEvent:Os,escapeHtmlEvent:z,escapeAttrEvent:Me};function ft(e,t,n=Date.now()){return Vs(e,t,{getSettingsEvent:y,getLatestRollRecordForEvent:V,ensureRoundEventTimersSyncedEvent:Y},n)}function Qs(e){return Xs(e,{...ta})}function eo(e,t){return Js(e,t,{getSettingsEvent:y,resolveTriggeredOutcomeEvent:xe,formatEventModifierBreakdownEvent:fe,buildRollsSummaryTemplateEvent:Gs,formatModifier:B,buildEventRollResultCardTemplateEvent:Bs,escapeHtmlEvent:z,escapeAttrEvent:Me,getDiceSvg:we,getRollingSvg:Et,buildAlreadyRolledDiceVisualTemplateEvent:bn})}function to(e,t){return Zs(e,t,{getSettingsEvent:y,resolveTriggeredOutcomeEvent:xe,formatEventModifierBreakdownEvent:fe,buildEventDistributionBlockTemplateEvent:Us,buildEventTimeoutAtBlockTemplateEvent:Ks,buildEventAlreadyRolledCardTemplateEvent:Hs,escapeHtmlEvent:z,formatModifier:B,getDiceSvg:we,getRollingSvg:Et,buildAlreadyRolledDiceVisualTemplateEvent:bn})}function me(){Ys({getDiceMetaEvent:A,ensureRoundEventTimersSyncedEvent:Y,getEventRuntimeViewStateEvent:ft,getRuntimeToneStyleEvent:Un})}function _t(e=0,t){let n=t.getSettingsEvent();if(!n.enabled)return;let i=t.getLiveContextEvent();if(!i?.chat||!Array.isArray(i.chat))return;let r=t.findLatestAssistantEvent(i.chat);if(!r)return;let o=t.getDiceMetaEvent(),s=t.buildAssistantMessageIdEvent(r.msg,r.index);if(o.lastProcessedAssistantMsgId===s)return;let l=[t.getPreferredAssistantSourceTextEvent(r.msg),t.getMessageTextEvent(r.msg)].filter((f,_,b)=>f&&b.indexOf(f)===_),a="",d=[],c=[],u=!1;for(let f of l){let _=t.parseEventEnvelopesEvent(f);if(_.events.length>0||_.ranges.length>0){a=f,d=_.events,c=_.ranges,u=_.shouldEndRound;break}a||(a=f,d=_.events,c=_.ranges,u=_.shouldEndRound)}if(!a.trim()){if(e<4){setTimeout(()=>_t(e+1,t),100+e*120);return}o.lastProcessedAssistantMsgId=s,t.saveMetadataSafeEvent();return}let E=t.filterEventsByApplyScopeEvent(d,n.eventApplyScope),v=c;if(E.length===0&&v.length===0){if(e<4){setTimeout(()=>_t(e+1,t),140+e*160);return}o.lastProcessedAssistantMsgId=s,t.saveMetadataSafeEvent();return}o.lastProcessedAssistantMsgId=s;let g=t.removeRangesEvent(a,v);t.setMessageTextEvent(r.msg,g),t.hideEventCodeBlocksInDomEvent(),v.length>0&&t.persistChatSafeEvent();let m=!1,S=o.pendingRound;if(S?.status==="open"&&n.enableAiRoundControl&&u&&(S.status="closed",m=!0,console.info("[\u9AB0\u5B50\u63D2\u4EF6] AI \u6307\u4EE4\u7ED3\u675F\u5F53\u524D\u8F6E\u6B21\uFF08round_control=end_round\uFF09")),E.length>0){let f=t.mergeEventsIntoPendingRoundEvent(E,s),_=t.autoRollEventsByAiModeEvent(f),b=t.buildEventListCardEvent(f);t.pushToChat(b);for(let I of _)t.pushToChat(I);t.sweepTimeoutFailuresEvent(),t.refreshCountdownDomEvent()}else d.length>0&&n.eventApplyScope==="protagonist_only"&&console.info("[\u9AB0\u5B50\u63D2\u4EF6] \u4E8B\u4EF6\u5DF2\u6309\u201C\u4EC5\u4E3B\u89D2\u884C\u52A8\u4E8B\u4EF6\u201D\u8FC7\u6EE4\uFF0C\u672C\u6B21\u65E0\u53EF\u7528\u4E8B\u4EF6"),m&&console.info("[\u9AB0\u5B50\u63D2\u4EF6] \u5F53\u524D\u8F6E\u6B21\u5DF2\u7ED3\u675F\uFF0C\u7B49\u5F85\u4E0B\u4E00\u8F6E\u4E8B\u4EF6"),t.saveMetadataSafeEvent();setTimeout(()=>{t.hideEventCodeBlocksInDomEvent(),t.refreshCountdownDomEvent()},50)}function no(e,t){for(let n=e.length-1;n>=0;n--)if(t.isAssistantMessageEvent(e[n]))return{msg:e[n],index:n};return null}function io(e,t,n){let i=e.id??e.cid??e.uid,r=n.simpleHashEvent(n.getMessageTextEvent(e));return i!=null?`assistant:${String(i)}:${r}`:`assistant_idx:${t}:${r}`}function ro(e,t){let n=[t.getPreferredAssistantSourceTextEvent(e),t.getMessageTextEvent(e)].filter((i,r,o)=>i&&o.indexOf(i)===r);for(let i of n){let{ranges:r}=t.parseEventEnvelopesEvent(i);if(r.length===0)continue;let o=t.removeRangesEvent(i,r);return t.setMessageTextEvent(e,o),!0}return!1}function so(e){let t=e.getLiveContextEvent();if(!t?.chat||!Array.isArray(t.chat))return;let n=!1;for(let i of t.chat)e.isAssistantMessageEvent(i)&&e.sanitizeAssistantMessageEventBlocksEvent(i)&&(n=!0);n&&e.persistChatSafeEvent(),e.hideEventCodeBlocksInDomEvent()}function oo(e="chat_reset",t){let n=t.getDiceMetaEvent();if(String(e||"").toLowerCase()!=="chat_reset"){delete n.lastProcessedAssistantMsgId,t.saveMetadataSafeEvent(),console.info(`[\u9AB0\u5B50\u63D2\u4EF6] \u4FDD\u7559 Event \u8F6E\u6B21\u72B6\u6001\uFF0C\u4EC5\u91CD\u7F6E\u4F1A\u8BDD\u6E38\u6807 (${e})`);return}delete n.pendingRound,delete n.outboundSummary,delete n.pendingResultGuidanceQueue,delete n.outboundResultGuidance,delete n.summaryHistory,delete n.lastPromptUserMsgId,delete n.lastProcessedAssistantMsgId,t.saveMetadataSafeEvent(),console.info(`[\u9AB0\u5B50\u63D2\u4EF6] \u5DF2\u6E05\u7406 Event \u8F6E\u6B21\u72B6\u6001 (${e})`)}function lo(e){let t=globalThis;t.__stRollEventButtonsBoundEvent||(document.addEventListener("click",n=>{let i=n.target;if(!i)return;let r=i.closest("button[data-dice-event-roll='1']");if(!r)return;n.preventDefault(),n.stopPropagation();let o=r.getAttribute("data-dice-event-id")||"",s=r.getAttribute("data-dice-expr")||"",l=r.getAttribute("data-round-id")||"",a=e.performEventRollByIdEvent(o,s||void 0,l||void 0);a&&e.pushToChat(a)},!0),t.__stRollEventButtonsBoundEvent=!0)}function ao(e){let t=globalThis;t.__stRollEventCountdownTicker||(t.__stRollEventCountdownTicker=setInterval(()=>{try{e.sweepTimeoutFailuresEvent(),e.refreshCountdownDomEvent()}catch(n){console.warn("[\u9AB0\u5B50\u63D2\u4EF6] \u5012\u8BA1\u65F6\u5237\u65B0\u5F02\u5E38",n)}},1e3))}function co(e){let t=globalThis;if(t.__stRollEventHooksRegisteredEvent)return;let n=e.getLiveContextEvent(),i=n?.eventSource??e.eventSource,r=n?.event_types??e.event_types??{};if(!i?.on)return;let o=Array.from(new Set([r.CHAT_COMPLETION_PROMPT_READY,"chat_completion_prompt_ready"].filter(d=>typeof d=="string"&&d.length>0)));console.info(`[\u9AB0\u5B50\u63D2\u4EF6] prompt \u6CE8\u5165\u76D1\u542C\u4E8B\u4EF6: ${o.length>0?o.join(", "):"(none)"}`);let s=typeof i.makeLast=="function"?i.makeLast.bind(i):i.on.bind(i),l=Array.from(new Set([r.GENERATION_ENDED,"generation_ended"].filter(d=>typeof d=="string"&&d.length>0))),a=Array.from(new Set([r.CHAT_CHANGED,r.CHAT_RESET,r.CHAT_STARTED,r.CHAT_NEW,r.CHAT_CREATED,"chat_changed","chat_reset","chat_started","chat_new","chat_created"].filter(d=>typeof d=="string"&&d.length>0)));for(let d of o)s(d,c=>{try{e.extractPromptChatFromPayloadEvent(c)||console.info(`[\u9AB0\u5B50\u63D2\u4EF6] ${d} \u5DF2\u89E6\u53D1\uFF0C\u4F46 payload \u4E2D\u672A\u53D1\u73B0 chat/messages`),e.handlePromptReadyEvent(c,d)}catch(u){console.error("[\u9AB0\u5B50\u63D2\u4EF6] Prompt hook \u9519\u8BEF",u)}});for(let d of l)i.on(d,()=>{try{e.handleGenerationEndedEvent()}catch(c){console.error("[\u9AB0\u5B50\u63D2\u4EF6] Generation hook \u9519\u8BEF",c)}});for(let d of a)i.on(d,()=>{try{e.clearDiceMetaEventState(d),setTimeout(()=>{e.sanitizeCurrentChatEventBlocksEvent(),e.sweepTimeoutFailuresEvent(),e.refreshCountdownDomEvent()},0)}catch(c){console.error("[\u9AB0\u5B50\u63D2\u4EF6] Reset hook \u9519\u8BEF",c)}});t.__stRollEventHooksRegisteredEvent=!0}function uo(){return hr()}function bt(e){return e>0?`+${e}`:String(e)}function na(e){return e==="advantage"?"\u4F18\u52BF":e==="disadvantage"?"\u52A3\u52BF":"\u6B63\u5E38"}function ia(e){return e==="auto"?"\u81EA\u52A8":"\u624B\u52A8"}function ra(e){let t=e.scope==="all"?"-":e.skills.join("|"),n=e.scope==="all"?"\u5168\u5C40":"\u6309\u6280\u80FD",i=e.enabled?"\u542F\u7528":"\u505C\u7528";return`- ${e.name} | ${bt(e.modifier)} | \u8303\u56F4=${n} | \u6280\u80FD=${t} | ${i}`}function sa(e,t,n){if(!e.enableStatusSystem)return"\u72B6\u6001=\u5173\u95ED";let i=Ie(t,n);if(i.modifier===0)return"\u72B6\u6001=+0";let r=i.matched.length>0?`\uFF08${i.matched.map(o=>`${o.name}${bt(o.modifier)}`).join("\uFF0C")}\uFF09`:"";return`\u72B6\u6001=${bt(i.modifier)}${r}`}function oa(e,t){let n=t.getSettingsEvent(),i=t.getDiceMetaEvent(),r=Q(i);t.ensureRoundEventTimersSyncedEvent(e);let o=[];if(o.push(`\u5F53\u524D\u8F6E\u6B21: ${e.roundId}`),o.push(`\u4E8B\u4EF6\u6570\u91CF: ${e.events.length}`),o.push(`\u72B6\u6001\u7CFB\u7EDF: ${n.enableStatusSystem?"\u5F00\u542F":"\u5173\u95ED"}`),n.enableStatusSystem)if(r.length<=0)o.push("Active_Statuses:"),o.push("- \u65E0");else{o.push("Active_Statuses:");for(let s of r)o.push(ra(s))}for(let s of e.events){let l=t.getEventRuntimeViewStateEvent(e,s),a=t.resolveSkillModifierBySkillNameEvent(s.skill,n),d=sa(n,r,s.skill),c=n.enableDynamicDcReason&&s.dcReason?` | DC\u539F\u56E0=${s.dcReason}`:"";o.push(`- ${s.id}: ${s.title} | \u5BF9\u8C61=${s.targetLabel} | \u9AB0\u5F0F=${s.checkDice} | \u6761\u4EF6=${s.compare??">="} ${s.dc}${c} | \u6280\u80FD=${s.skill} | \u6280\u80FD\u4FEE\u6B63=${bt(a)} | \u6A21\u5F0F=${ia(s.rollMode)} | \u9AB0\u6001=${na(s.advantageState)} | \u65F6\u9650=${s.timeLimit??"\u65E0"} | ${d} | \u72B6\u6001=${l.text}`)}return o.join(`
`)}function Eo(e){let{SlashCommandParser:t,SlashCommand:n,SlashCommandArgument:i,ARGUMENT_TYPE:r,pushToChat:o,sweepTimeoutFailuresEvent:s,getDiceMetaEvent:l,getSettingsEvent:a,ensureRoundEventTimersSyncedEvent:d,getEventRuntimeViewStateEvent:c,resolveSkillModifierBySkillNameEvent:u,performEventRollByIdEvent:E,escapeHtmlEvent:v}=e,g=globalThis;g.__stRollEventCommandRegisteredEvent||!t||!n||!i||!r||(t.addCommandObject(n.fromProps({name:"eventroll",aliases:["eroll"],returns:"\u4E8B\u4EF6\u9AB0\u5B50\u547D\u4EE4\uFF1Alist / roll / help",namedArgumentList:[],unnamedArgumentList:[i.fromProps({description:"\u5B50\u547D\u4EE4\uFF0C\u4F8B\u5982\uFF1Alist | roll lockpick_gate 1d20+3",typeList:r.STRING,isRequired:!1})],helpString:uo(),callback:(m,S)=>{let f=(S??"").toString().trim(),_=f?f.split(/\s+/):[],b=(_[0]||"help").toLowerCase();if(b==="help")return o(uo())??"";if(b==="list"){s();let p=l().pendingRound;if(!p||p.status!=="open")return o("\u5F53\u524D\u6CA1\u6709\u53EF\u7528\u4E8B\u4EF6\uFF0C\u8BF7\u5148\u7B49\u5F85 AI \u8F93\u51FA\u4E8B\u4EF6 JSON\u3002")??"";let x=Lr(v(oa(p,{getSettingsEvent:a,getDiceMetaEvent:l,ensureRoundEventTimersSyncedEvent:d,getEventRuntimeViewStateEvent:c,resolveSkillModifierBySkillNameEvent:u})));return o(x)??""}if(b==="roll"){let T=_[1]||"",p=_.length>2?_.slice(2).join(" "):void 0,x=E(T,p);return x?o(x)??"":""}return o("\u672A\u77E5\u5B50\u547D\u4EE4\uFF0C\u8BF7\u4F7F\u7528 /eventroll help \u67E5\u770B\u5E2E\u52A9\u3002")??""}})),g.__stRollEventCommandRegisteredEvent=!0)}function vo(e){let{SlashCommandParser:t,SlashCommand:n,getDiceMeta:i,getDiceMetaEvent:r,escapeHtmlEvent:o,pushToChat:s}=e,l=globalThis;l.__stRollDebugCommandRegisteredEvent||!t||!n||(t.addCommandObject(n.fromProps({name:"rollDebug",aliases:["ddebug"],returns:"\u663E\u793A diceRoller \u5143\u6570\u636E",namedArgumentList:[],unnamedArgumentList:[],callback:()=>{let a=i(),d=r(),c=JSON.stringify({legacy:a,eventMeta:d},null,2),u=Mr(o(c));return s(u),""}})),l.__stRollDebugCommandRegisteredEvent=!0)}function la(e){return no(e,{isAssistantMessageEvent:Pn})}function aa(e,t){return io(e,t,{simpleHashEvent:Ze,getMessageTextEvent:le})}function da(e){return ro(e,{getPreferredAssistantSourceTextEvent:wn,getMessageTextEvent:le,parseEventEnvelopesEvent:Bn,removeRangesEvent:Gn,setMessageTextEvent:Be})}function zn(){so({getLiveContextEvent:F,isAssistantMessageEvent:Pn,sanitizeAssistantMessageEventBlocksEvent:da,persistChatSafeEvent:ln,hideEventCodeBlocksInDomEvent:Kn})}var mo={getSettingsEvent:y,ensureRoundEventTimersSyncedEvent:Y,getLatestRollRecordForEvent:V,rollExpression:st,parseDiceExpression:G,resolveSkillModifierBySkillNameEvent:ve,applySkillModifierToDiceResultEvent:hn,normalizeCompareOperatorEvent:be,evaluateSuccessEvent:or,createIdEvent:U,buildEventRollResultCardEvent:eo,saveLastRoll:tt,saveMetadataSafeEvent:W};function go(e,t,n){return cs(e,t,n,{...mo,sweepTimeoutFailuresEvent:te,getDiceMetaEvent:A,recordTimeoutFailureIfNeededEvent:Hn,buildEventAlreadyRolledCardEvent:to,pushToChat:O,refreshCountdownDomEvent:me})}function ca(e){return us(e,{...mo,getDiceMetaEvent:A})}function ua(e=0){_t(e,{getSettingsEvent:y,getLiveContextEvent:F,findLatestAssistantEvent:la,getDiceMetaEvent:A,buildAssistantMessageIdEvent:aa,getPreferredAssistantSourceTextEvent:wn,getMessageTextEvent:le,parseEventEnvelopesEvent:Bn,filterEventsByApplyScopeEvent:Rn,removeRangesEvent:Gn,setMessageTextEvent:Be,hideEventCodeBlocksInDomEvent:Kn,persistChatSafeEvent:ln,mergeEventsIntoPendingRoundEvent:Ls,autoRollEventsByAiModeEvent:ca,buildEventListCardEvent:Qs,pushToChat:O,sweepTimeoutFailuresEvent:te,refreshCountdownDomEvent:me,saveMetadataSafeEvent:W})}function Ea(e="chat_reset"){oo(e,{getDiceMetaEvent:A,saveMetadataSafeEvent:W})}function So(){lo({performEventRollByIdEvent:go,pushToChat:O})}function po(){Eo({SlashCommandParser:he,SlashCommand:Le,SlashCommandArgument:qe,ARGUMENT_TYPE:Je,pushToChat:O,sweepTimeoutFailuresEvent:te,getDiceMetaEvent:A,getSettingsEvent:y,ensureRoundEventTimersSyncedEvent:Y,getEventRuntimeViewStateEvent:ft,resolveSkillModifierBySkillNameEvent:ve,performEventRollByIdEvent:go,escapeHtmlEvent:z})}function To(){ao({sweepTimeoutFailuresEvent:te,refreshCountdownDomEvent:me})}function fo(){co({getLiveContextEvent:F,eventSource:Yi,event_types:ji,extractPromptChatFromPayloadEvent:On,handlePromptReadyEvent:Ns,handleGenerationEndedEvent:ua,clearDiceMetaEventState:Ea,sanitizeCurrentChatEventBlocksEvent:zn,sweepTimeoutFailuresEvent:te,refreshCountdownDomEvent:me})}function _o(){vo({SlashCommandParser:he,SlashCommand:Le,getDiceMeta:Ne,getDiceMetaEvent:A,escapeHtmlEvent:z,pushToChat:O})}Ur();var va=80,ma=500;function Vn(e=0){Hr(),Gr(),So(),po(),_o(),fo(),To(),te(),me(),zn();let t=globalThis;if(!t.__stRollEventCommandRegisteredEvent||!t.__stRollBaseCommandRegisteredEvent||!t.__stRollDebugCommandRegisteredEvent||!t.__stRollEventHooksRegisteredEvent){e<va&&setTimeout(()=>Vn(e+1),ma);return}console.info("[\u9AB0\u5B50\u63D2\u4EF6] Event \u521D\u59CB\u5316\u5B8C\u6210")}function bo(){let e=globalThis;e.__stDiceRollerEventLoaded||(e.__stDiceRollerEventLoaded=!0,Vn())}bo();})();
