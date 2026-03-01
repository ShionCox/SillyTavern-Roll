import type { SettingsCardTemplateIdsEvent } from "./settingsCardTemplateTypes";

export function buildSettingsCardHtmlTemplateEvent(
  ids: SettingsCardTemplateIdsEvent
): string {
  return `
    <div class="inline-drawer st-roll-shell">
      <div class="inline-drawer-toggle inline-drawer-header st-roll-head" id="${ids.drawerToggleId}">
        <div class="st-roll-head-title">
          <span>骰子助手</span>
          <span id="${ids.badgeId}" class="st-roll-head-badge">${ids.badgeText}</span>
        </div>
        <div id="${ids.drawerIconId}" class="inline-drawer-icon fa-solid fa-circle-chevron-down down interactable" tabindex="0" role="button"></div>
      </div>

      <div class="inline-drawer-content st-roll-content" id="${ids.drawerContentId}" style="display:none;">
        <div class="st-roll-filters flex-container">
          <input id="${ids.searchId}" class="text_pole flex1 st-roll-search" placeholder="搜索设置" type="search" />
        </div>

        <div class="st-roll-tabs">
          <button id="${ids.tabMainId}" type="button" class="st-roll-tab is-active">
            <i class="fa-solid fa-gear"></i>
            <span>主设置</span>
          </button>
          <button id="${ids.tabSkillId}" type="button" class="st-roll-tab">
            <i class="fa-solid fa-bolt"></i>
            <span>技能</span>
          </button>
          <button id="${ids.tabRuleId}" type="button" class="st-roll-tab">
            <i class="fa-solid fa-scroll"></i>
            <span>规则编辑</span>
          </button>
          <button id="${ids.tabAboutId}" type="button" class="st-roll-tab">
            <i class="fa-solid fa-circle-info"></i>
            <span>关于</span>
          </button>
        </div>

        <div id="${ids.panelMainId}" class="st-roll-panel">
          <div class="st-roll-divider">
            <i class="fa-solid fa-power-off"></i>
            <span>基础开关</span>
            <div class="st-roll-divider-line"></div>
          </div>

          <label class="st-roll-item st-roll-search-item" data-st-roll-search="enable event dice plugin switch">
            <div class="st-roll-item-main">
              <div class="st-roll-item-title">启用事件骰子系统</div>
              <div class="st-roll-item-desc">总开关，控制事件解析、掷骰处理与结果回填。</div>
            </div>
            <div class="st-roll-inline">
              <input id="${ids.enabledId}" type="checkbox" />
            </div>
          </label>

          <div class="st-roll-item st-roll-search-item" data-st-roll-search="scope protagonist all apply">
            <div class="st-roll-item-main">
              <div class="st-roll-item-title">事件应用范围</div>
              <div class="st-roll-item-desc">限制只处理主角行动事件，或处理全部事件。</div>
            </div>
            <div class="st-roll-row">
              <select id="${ids.scopeId}" class="st-roll-select">
                <option value="protagonist_only">仅主角行动事件</option>
                <option value="all">全部事件</option>
              </select>
            </div>
          </div>

          <div class="st-roll-divider">
            <i class="fa-solid fa-robot"></i>
            <span>AI 与协议</span>
            <div class="st-roll-divider-line"></div>
          </div>

          <label class="st-roll-item st-roll-search-item" data-st-roll-search="auto rule inject protocol ai">
            <div class="st-roll-item-main">
              <div class="st-roll-item-title">默认发送规则给 AI</div>
              <div class="st-roll-item-desc">在生成前注入协议，提升事件 JSON 可解析性。</div>
            </div>
            <div class="st-roll-inline">
              <input id="${ids.ruleId}" type="checkbox" />
            </div>
          </label>

          <label class="st-roll-item st-roll-search-item" data-st-roll-search="rollMode auto manual ai automatic">
            <div class="st-roll-item-main">
              <div class="st-roll-item-title">允许 AI 决定自动/手动掷骰</div>
              <div class="st-roll-item-desc">开启后可通过 event.rollMode 控制 auto/manual；关闭后统一手动。</div>
            </div>
            <div class="st-roll-inline">
              <input id="${ids.aiRollModeId}" type="checkbox" />
            </div>
          </label>

          <div class="st-roll-divider">
            <i class="fa-solid fa-dice"></i>
            <span>掷骰规则</span>
            <div class="st-roll-divider-line"></div>
          </div>

          <label class="st-roll-item st-roll-search-item" data-st-roll-search="explode exploding dice bang !">
            <div class="st-roll-item-main">
              <div class="st-roll-item-title">启用爆骰功能</div>
              <div class="st-roll-item-desc">关闭后，即使骰式包含 <code>!</code> 也不会触发连锁爆骰。</div>
            </div>
            <div class="st-roll-inline">
              <input id="${ids.explodingEnabledId}" type="checkbox" />
            </div>
          </label>

          <div class="st-roll-divider">
            <i class="fa-solid fa-route"></i>
            <span>剧情分支</span>
            <div class="st-roll-divider-line"></div>
          </div>

          <label class="st-roll-item st-roll-search-item" data-st-roll-search="outcome branch success failure">
            <div class="st-roll-item-main">
              <div class="st-roll-item-title">启用剧情走向分支</div>
              <div class="st-roll-item-desc">支持 success/failure 走向文案，并在结果卡显示命中分支。</div>
            </div>
            <div class="st-roll-inline">
              <input id="${ids.outcomeBranchesId}" type="checkbox" />
            </div>
          </label>

          <label class="st-roll-item st-roll-search-item" data-st-roll-search="explode outcome critical special branch">
            <div class="st-roll-item-main">
              <div class="st-roll-item-title">启用爆骰特殊走向</div>
              <div class="st-roll-item-desc">触发爆骰时，允许 outcomes.explode 优先覆盖普通成功/失败走向。</div>
            </div>
            <div class="st-roll-inline">
              <input id="${ids.explodeOutcomeId}" type="checkbox" />
            </div>
          </label>

          <label class="st-roll-item st-roll-search-item" data-st-roll-search="list card outcome preview">
            <div class="st-roll-item-main">
              <div class="st-roll-item-title">列表卡预览走向</div>
              <div class="st-roll-item-desc">未掷骰时显示 success/failure/explode 三项预览文本。</div>
            </div>
            <div class="st-roll-inline">
              <input id="${ids.listOutcomePreviewId}" type="checkbox" />
            </div>
          </label>

          <div class="st-roll-divider">
            <i class="fa-solid fa-file-lines"></i>
            <span>摘要注入</span>
            <div class="st-roll-divider-line"></div>
          </div>

          <div class="st-roll-item st-roll-search-item" data-st-roll-search="summary detail minimal balanced detailed context">
            <div class="st-roll-item-main">
              <div class="st-roll-item-title">摘要信息等级</div>
              <div class="st-roll-item-desc">控制发送给 AI 的 DICE_ROUND_SUMMARY 细节程度。</div>
            </div>
            <div class="st-roll-row">
              <select id="${ids.summaryDetailId}" class="st-roll-select">
                <option value="minimal">minimal / 标题 + 描述 + 结果</option>
                <option value="balanced">balanced / + 检定信息</option>
                <option value="detailed">detailed / + 来源 + 模式 + 时限</option>
              </select>
            </div>
          </div>

          <div class="st-roll-item st-roll-search-item" data-st-roll-search="summary history rounds window">
            <div class="st-roll-item-main">
              <div class="st-roll-item-title">历史轮次数</div>
              <div class="st-roll-item-desc">每次发送时附带最近 N 轮 summary（按事件轮次）。</div>
            </div>
            <div class="st-roll-row">
              <input id="${ids.summaryRoundsId}" class="st-roll-input" type="number" min="1" max="10" step="1" />
            </div>
          </div>

          <label class="st-roll-item st-roll-search-item" data-st-roll-search="summary outcome history branch">
            <div class="st-roll-item-main">
              <div class="st-roll-item-title">摘要包含走向文本</div>
              <div class="st-roll-item-desc">在摘要中附加本次命中的剧情走向。</div>
            </div>
            <div class="st-roll-inline">
              <input id="${ids.includeOutcomeSummaryId}" type="checkbox" />
            </div>
          </label>

          <div class="st-roll-divider">
            <i class="fa-solid fa-stopwatch"></i>
            <span>时限控制</span>
            <div class="st-roll-divider-line"></div>
          </div>

          <label class="st-roll-item st-roll-search-item" data-st-roll-search="time limit timeout">
            <div class="st-roll-item-main">
              <div class="st-roll-item-title">启用事件时限</div>
              <div class="st-roll-item-desc">事件声明 timeLimit 时，启用倒计时与超时失败。</div>
            </div>
            <div class="st-roll-inline">
              <input id="${ids.timeLimitEnabledId}" type="checkbox" />
            </div>
          </label>

          <div id="${ids.timeLimitRowId}" class="st-roll-item st-roll-search-item" data-st-roll-search="minimum seconds timeout">
            <div class="st-roll-item-main">
              <div class="st-roll-item-title">最短时限（秒）</div>
              <div class="st-roll-item-desc">低于该值的 timeLimit 会自动提升，避免无效判定。</div>
            </div>
            <div class="st-roll-row">
              <input id="${ids.timeLimitMinId}" class="st-roll-input" type="number" min="1" step="1" />
            </div>
          </div>

          <div class="st-roll-tip st-roll-search-item" data-st-roll-search="event protocol prompt summary context">
            发送前会自动注入规则与摘要，帮助 AI 在多轮中保持事件状态一致。
          </div>
        </div>

        <div id="${ids.panelSkillId}" class="st-roll-panel" hidden>
          <div class="st-roll-divider">
            <i class="fa-solid fa-bolt"></i>
            <span>技能系统</span>
            <div class="st-roll-divider-line"></div>
          </div>

          <label class="st-roll-item st-roll-search-item" data-st-roll-search="skill system enable toggle">
            <div class="st-roll-item-main">
              <div class="st-roll-item-title">启用技能系统</div>
              <div class="st-roll-item-desc">关闭后：技能不参与检定、不注入规则、卡片不显示技能修正。</div>
            </div>
            <div class="st-roll-inline">
              <input id="${ids.skillEnabledId}" type="checkbox" />
            </div>
          </label>

          <div class="st-roll-item st-roll-search-item" data-st-roll-search="skill full screen modal editor">
            <div class="st-roll-item-main">
              <div class="st-roll-item-title">全屏技能编辑器</div>
              <div class="st-roll-item-desc">点击打开全屏弹窗进行预设和技能编辑，避免设置页内容被遮挡。</div>
            </div>
            <div class="st-roll-actions">
              <button id="${ids.skillEditorOpenId}" type="button" class="st-roll-btn">打开编辑器</button>
            </div>
          </div>

          <dialog id="${ids.skillModalId}" class="st-roll-skill-modal">
            <div class="st-roll-skill-modal-backdrop" data-skill-modal-role="backdrop"></div>
            <div class="st-roll-skill-modal-panel">
              <div class="st-roll-skill-modal-head">
                <div class="st-roll-skill-modal-title">
                  <i class="fa-solid fa-bolt"></i>
                  <span>技能预设编辑器</span>
                </div>
                <button id="${ids.skillModalCloseId}" type="button" class="st-roll-btn secondary st-roll-skill-modal-close">关闭</button>
              </div>

              <div class="st-roll-skill-modal-body">
                <div id="${ids.skillPresetLayoutId}" class="st-roll-skill-layout">
                  <aside id="${ids.skillPresetSidebarId}" class="st-roll-skill-presets">
                    <div class="st-roll-skill-presets-head">
                      <span class="st-roll-field-label">技能预设</span>
                      <div class="st-roll-actions">
                        <button id="${ids.skillPresetCreateId}" type="button" class="st-roll-btn">新建预设</button>
                        <button id="${ids.skillPresetDeleteId}" type="button" class="st-roll-btn secondary">删除预设</button>
                      </div>
                    </div>
                    <div id="${ids.skillPresetMetaId}" class="st-roll-skill-preset-meta"></div>
                    <div id="${ids.skillPresetListId}" class="st-roll-skill-preset-list"></div>
                  </aside>

                  <div id="${ids.skillEditorWrapId}" class="st-roll-textarea-wrap">
                    <div class="st-roll-row st-roll-skill-rename-row">
                      <span class="st-roll-field-label">预设名称</span>
                      <input id="${ids.skillPresetNameId}" class="st-roll-input st-roll-skill-preset-name-input" type="text" placeholder="输入预设名称" />
                      <button id="${ids.skillPresetRenameId}" type="button" class="st-roll-btn">保存名称</button>
                    </div>

                    <div class="st-roll-tip">技能加值必须是整数（可正可负）；技能名按去首尾空格并忽略大小写判重。</div>
                    <div id="${ids.skillDirtyHintId}" class="st-roll-skill-dirty" hidden>技能改动未保存，点击“保存技能表”后生效。</div>
                    <div id="${ids.skillErrorsId}" class="st-roll-skill-errors" hidden></div>

                    <div class="st-roll-skill-head">
                      <span class="st-roll-field-label">技能表（当前预设）</span>
                      <div class="st-roll-actions">
                        <button id="${ids.skillAddId}" type="button" class="st-roll-btn">新增技能</button>
                        <button id="${ids.skillSaveId}" type="button" class="st-roll-btn">保存技能表</button>
                        <button id="${ids.skillResetId}" type="button" class="st-roll-btn secondary">重置为空</button>
                        <button id="${ids.skillImportToggleId}" type="button" class="st-roll-btn secondary">导入 JSON</button>
                        <button id="${ids.skillExportId}" type="button" class="st-roll-btn secondary">导出 JSON</button>
                      </div>
                    </div>

                    <div class="st-roll-skill-cols">
                      <span>技能名</span>
                      <span>加值（整数）</span>
                      <span>操作</span>
                    </div>
                    <div id="${ids.skillRowsId}" class="st-roll-skill-rows"></div>

                    <div id="${ids.skillImportAreaId}" class="st-roll-skill-import" hidden>
                      <div class="st-roll-row" style="margin-bottom:8px;">
                        <span class="st-roll-field-label">粘贴 JSON 对象后应用导入</span>
                        <div class="st-roll-actions">
                          <button id="${ids.skillImportApplyId}" type="button" class="st-roll-btn">应用导入</button>
                        </div>
                      </div>
                      <textarea id="${ids.skillTextId}" class="st-roll-textarea" rows="7" placeholder='例如：{"察觉":10,"说服":8}'></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </dialog>
        </div>

        <div id="${ids.panelRuleId}" class="st-roll-panel" hidden>
          <div class="st-roll-divider">
            <i class="fa-solid fa-scroll"></i>
            <span>事件协议规则</span>
            <div class="st-roll-divider-line"></div>
          </div>

          <div class="st-roll-textarea-wrap st-roll-search-item" data-st-roll-search="rule text save reset">
            <div class="st-roll-row" style="margin-bottom:8px;">
              <span class="st-roll-field-label">可手动编辑发送给 AI 的规则文本</span>
              <div class="st-roll-actions">
                <button id="${ids.ruleSaveId}" type="button" class="st-roll-btn">保存规则</button>
                <button id="${ids.ruleResetId}" type="button" class="st-roll-btn secondary">恢复默认</button>
              </div>
            </div>
            <textarea id="${ids.ruleTextId}" class="st-roll-textarea" rows="12"></textarea>
          </div>

          <div class="st-roll-tip st-roll-search-item" data-st-roll-search="rolljson fields">
            建议保留字段约束（id/title/checkDice/dc/skill/desc）和 rolljson 代码块规范，避免事件提取失败。
          </div>
        </div>

        <div id="${ids.panelAboutId}" class="st-roll-panel" hidden>
          <div class="st-roll-divider">
            <i class="fa-solid fa-circle-info"></i>
            <span>关于插件</span>
            <div class="st-roll-divider-line"></div>
          </div>

          <div class="st-roll-item st-roll-search-item" data-st-roll-search="about version author email github">
            <div class="st-roll-item-main">
              <div class="st-roll-item-title">骰子插件 Event</div>
              <div class="st-roll-item-desc st-roll-about-meta">
                <span class="st-roll-about-meta-item">
                  <i class="fa-solid fa-tag"></i>
                  <span>版本：${ids.badgeText}</span>
                </span>
                <span class="st-roll-about-meta-item">
                  <i class="fa-solid fa-user"></i>
                  <span>作者：${ids.authorText}</span>
                </span>
                <span class="st-roll-about-meta-item">
                  <i class="fa-solid fa-envelope"></i>
                  <span>邮箱：<a href="mailto:${ids.emailText}">${ids.emailText}</a></span>
                </span>
                <span class="st-roll-about-meta-item">
                  <i class="fa-brands fa-github"></i>
                  <span>GitHub：<a href="${ids.githubUrl}" target="_blank" rel="noopener">${ids.githubText}</a></span>
                </span>
              </div>
            </div>
          </div>

          <div class="st-roll-item st-roll-search-item" data-st-roll-search="command roll eventroll help">
            <div class="st-roll-item-main">
              <div class="st-roll-item-title">常用命令</div>
              <div class="st-roll-item-desc">/roll 1d20 /eventroll list /eventroll roll &lt;id&gt;</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}
