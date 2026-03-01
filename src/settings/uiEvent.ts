import type {
  DicePluginSettingsEvent,
  SkillEditorRowDraftEvent,
  SkillPresetEvent,
  SkillPresetStoreEvent,
} from "../types/eventDomainEvent";
import type { SettingsCardTemplateIdsEvent } from "../templates/settingsCardTemplateTypes";

export interface SyncSettingsBadgeVersionDepsEvent {
  SETTINGS_BADGE_ID_Event: string;
  SETTINGS_BADGE_VERSION_Event: string;
}

export function syncSettingsBadgeVersionEvent(deps: SyncSettingsBadgeVersionDepsEvent): void {
  const badge = document.getElementById(deps.SETTINGS_BADGE_ID_Event);
  if (!badge) return;
  badge.textContent = deps.SETTINGS_BADGE_VERSION_Event;
}

export interface EnsureSettingsCardStylesDepsEvent {
  SETTINGS_STYLE_ID_Event: string;
  SETTINGS_CARD_ID_Event: string;
  buildSettingsCardStylesTemplateEvent: (cardId: string) => string;
}

export function ensureSettingsCardStylesEvent(deps: EnsureSettingsCardStylesDepsEvent): void {
  if (document.getElementById(deps.SETTINGS_STYLE_ID_Event)) return;

  const style = document.createElement("style");
  style.id = deps.SETTINGS_STYLE_ID_Event;
  style.textContent = deps.buildSettingsCardStylesTemplateEvent(deps.SETTINGS_CARD_ID_Event);
  document.head.appendChild(style);
}

export interface BuildSettingsCardTemplateIdsDepsEvent {
  SETTINGS_CARD_ID_Event: string;
  drawerToggleId: string;
  drawerContentId: string;
  drawerIconId: string;
  SETTINGS_BADGE_ID_Event: string;
  SETTINGS_BADGE_VERSION_Event: string;
  SETTINGS_AUTHOR_TEXT_Event: string;
  SETTINGS_EMAIL_TEXT_Event: string;
  SETTINGS_GITHUB_TEXT_Event: string;
  SETTINGS_GITHUB_URL_Event: string;
  SETTINGS_SEARCH_ID_Event: string;
  SETTINGS_TAB_MAIN_ID_Event: string;
  SETTINGS_TAB_SKILL_ID_Event: string;
  SETTINGS_TAB_RULE_ID_Event: string;
  SETTINGS_TAB_ABOUT_ID_Event: string;
  SETTINGS_PANEL_MAIN_ID_Event: string;
  SETTINGS_PANEL_SKILL_ID_Event: string;
  SETTINGS_PANEL_RULE_ID_Event: string;
  SETTINGS_PANEL_ABOUT_ID_Event: string;
  SETTINGS_ENABLED_ID_Event: string;
  SETTINGS_RULE_ID_Event: string;
  SETTINGS_AI_ROLL_MODE_ID_Event: string;
  SETTINGS_EXPLODING_ENABLED_ID_Event: string;
  SETTINGS_SUMMARY_DETAIL_ID_Event: string;
  SETTINGS_SUMMARY_ROUNDS_ID_Event: string;
  SETTINGS_SCOPE_ID_Event: string;
  SETTINGS_OUTCOME_BRANCHES_ID_Event: string;
  SETTINGS_EXPLODE_OUTCOME_ID_Event: string;
  SETTINGS_SUMMARY_OUTCOME_ID_Event: string;
  SETTINGS_LIST_OUTCOME_PREVIEW_ID_Event: string;
  SETTINGS_TIME_LIMIT_ENABLED_ID_Event: string;
  SETTINGS_TIME_LIMIT_MIN_ID_Event: string;
  SETTINGS_TIME_LIMIT_ROW_ID_Event: string;
  SETTINGS_SKILL_ENABLED_ID_Event: string;
  SETTINGS_SKILL_EDITOR_WRAP_ID_Event: string;
  SETTINGS_SKILL_ROWS_ID_Event: string;
  SETTINGS_SKILL_ADD_ID_Event: string;
  SETTINGS_SKILL_TEXT_ID_Event: string;
  SETTINGS_SKILL_IMPORT_TOGGLE_ID_Event: string;
  SETTINGS_SKILL_IMPORT_AREA_ID_Event: string;
  SETTINGS_SKILL_IMPORT_APPLY_ID_Event: string;
  SETTINGS_SKILL_EXPORT_ID_Event: string;
  SETTINGS_SKILL_SAVE_ID_Event: string;
  SETTINGS_SKILL_RESET_ID_Event: string;
  SETTINGS_SKILL_ERRORS_ID_Event: string;
  SETTINGS_SKILL_DIRTY_HINT_ID_Event: string;
  SETTINGS_SKILL_PRESET_LAYOUT_ID_Event: string;
  SETTINGS_SKILL_PRESET_SIDEBAR_ID_Event: string;
  SETTINGS_SKILL_PRESET_LIST_ID_Event: string;
  SETTINGS_SKILL_PRESET_CREATE_ID_Event: string;
  SETTINGS_SKILL_PRESET_DELETE_ID_Event: string;
  SETTINGS_SKILL_PRESET_NAME_ID_Event: string;
  SETTINGS_SKILL_PRESET_RENAME_ID_Event: string;
  SETTINGS_SKILL_PRESET_META_ID_Event: string;
  SETTINGS_SKILL_EDITOR_OPEN_ID_Event: string;
  SETTINGS_SKILL_MODAL_ID_Event: string;
  SETTINGS_SKILL_MODAL_CLOSE_ID_Event: string;
  SETTINGS_RULE_SAVE_ID_Event: string;
  SETTINGS_RULE_RESET_ID_Event: string;
  SETTINGS_RULE_TEXT_ID_Event: string;
}

export function buildSettingsCardTemplateIdsEvent(
  deps: BuildSettingsCardTemplateIdsDepsEvent
): SettingsCardTemplateIdsEvent {
  return {
    cardId: deps.SETTINGS_CARD_ID_Event,
    drawerToggleId: deps.drawerToggleId,
    drawerContentId: deps.drawerContentId,
    drawerIconId: deps.drawerIconId,
    badgeId: deps.SETTINGS_BADGE_ID_Event,
    badgeText: deps.SETTINGS_BADGE_VERSION_Event,
    authorText: deps.SETTINGS_AUTHOR_TEXT_Event,
    emailText: deps.SETTINGS_EMAIL_TEXT_Event,
    githubText: deps.SETTINGS_GITHUB_TEXT_Event,
    githubUrl: deps.SETTINGS_GITHUB_URL_Event,
    searchId: deps.SETTINGS_SEARCH_ID_Event,
    tabMainId: deps.SETTINGS_TAB_MAIN_ID_Event,
    tabSkillId: deps.SETTINGS_TAB_SKILL_ID_Event,
    tabRuleId: deps.SETTINGS_TAB_RULE_ID_Event,
    tabAboutId: deps.SETTINGS_TAB_ABOUT_ID_Event,
    panelMainId: deps.SETTINGS_PANEL_MAIN_ID_Event,
    panelSkillId: deps.SETTINGS_PANEL_SKILL_ID_Event,
    panelRuleId: deps.SETTINGS_PANEL_RULE_ID_Event,
    panelAboutId: deps.SETTINGS_PANEL_ABOUT_ID_Event,
    enabledId: deps.SETTINGS_ENABLED_ID_Event,
    ruleId: deps.SETTINGS_RULE_ID_Event,
    aiRollModeId: deps.SETTINGS_AI_ROLL_MODE_ID_Event,
    explodingEnabledId: deps.SETTINGS_EXPLODING_ENABLED_ID_Event,
    summaryDetailId: deps.SETTINGS_SUMMARY_DETAIL_ID_Event,
    summaryRoundsId: deps.SETTINGS_SUMMARY_ROUNDS_ID_Event,
    scopeId: deps.SETTINGS_SCOPE_ID_Event,
    outcomeBranchesId: deps.SETTINGS_OUTCOME_BRANCHES_ID_Event,
    explodeOutcomeId: deps.SETTINGS_EXPLODE_OUTCOME_ID_Event,
    includeOutcomeSummaryId: deps.SETTINGS_SUMMARY_OUTCOME_ID_Event,
    listOutcomePreviewId: deps.SETTINGS_LIST_OUTCOME_PREVIEW_ID_Event,
    timeLimitEnabledId: deps.SETTINGS_TIME_LIMIT_ENABLED_ID_Event,
    timeLimitMinId: deps.SETTINGS_TIME_LIMIT_MIN_ID_Event,
    timeLimitRowId: deps.SETTINGS_TIME_LIMIT_ROW_ID_Event,
    skillEnabledId: deps.SETTINGS_SKILL_ENABLED_ID_Event,
    skillEditorWrapId: deps.SETTINGS_SKILL_EDITOR_WRAP_ID_Event,
    skillRowsId: deps.SETTINGS_SKILL_ROWS_ID_Event,
    skillAddId: deps.SETTINGS_SKILL_ADD_ID_Event,
    skillTextId: deps.SETTINGS_SKILL_TEXT_ID_Event,
    skillImportToggleId: deps.SETTINGS_SKILL_IMPORT_TOGGLE_ID_Event,
    skillImportAreaId: deps.SETTINGS_SKILL_IMPORT_AREA_ID_Event,
    skillImportApplyId: deps.SETTINGS_SKILL_IMPORT_APPLY_ID_Event,
    skillExportId: deps.SETTINGS_SKILL_EXPORT_ID_Event,
    skillSaveId: deps.SETTINGS_SKILL_SAVE_ID_Event,
    skillResetId: deps.SETTINGS_SKILL_RESET_ID_Event,
    skillErrorsId: deps.SETTINGS_SKILL_ERRORS_ID_Event,
    skillDirtyHintId: deps.SETTINGS_SKILL_DIRTY_HINT_ID_Event,
    skillPresetLayoutId: deps.SETTINGS_SKILL_PRESET_LAYOUT_ID_Event,
    skillPresetSidebarId: deps.SETTINGS_SKILL_PRESET_SIDEBAR_ID_Event,
    skillPresetListId: deps.SETTINGS_SKILL_PRESET_LIST_ID_Event,
    skillPresetCreateId: deps.SETTINGS_SKILL_PRESET_CREATE_ID_Event,
    skillPresetDeleteId: deps.SETTINGS_SKILL_PRESET_DELETE_ID_Event,
    skillPresetNameId: deps.SETTINGS_SKILL_PRESET_NAME_ID_Event,
    skillPresetRenameId: deps.SETTINGS_SKILL_PRESET_RENAME_ID_Event,
    skillPresetMetaId: deps.SETTINGS_SKILL_PRESET_META_ID_Event,
    skillEditorOpenId: deps.SETTINGS_SKILL_EDITOR_OPEN_ID_Event,
    skillModalId: deps.SETTINGS_SKILL_MODAL_ID_Event,
    skillModalCloseId: deps.SETTINGS_SKILL_MODAL_CLOSE_ID_Event,
    ruleSaveId: deps.SETTINGS_RULE_SAVE_ID_Event,
    ruleResetId: deps.SETTINGS_RULE_RESET_ID_Event,
    ruleTextId: deps.SETTINGS_RULE_TEXT_ID_Event,
  };
}

export interface MountSettingsCardShellDepsEvent {
  SETTINGS_CARD_ID_Event: string;
  SETTINGS_SKILL_MODAL_ID_Event: string;
  buildSettingsCardHtmlTemplateEvent: (ids: SettingsCardTemplateIdsEvent) => string;
  buildSettingsCardTemplateIdsEvent: (
    drawerToggleId: string,
    drawerContentId: string,
    drawerIconId: string
  ) => SettingsCardTemplateIdsEvent;
  ensureSettingsCardStylesEvent: () => void;
  syncSettingsBadgeVersionEvent: () => void;
  syncSettingsUiEvent: () => void;
  onMountedEvent: (params: {
    drawerToggleId: string;
    drawerContentId: string;
  }) => void;
  retryLimitEvent?: number;
  retryDelayMsEvent?: number;
}

export function mountSettingsCardShellEvent(
  deps: MountSettingsCardShellDepsEvent,
  attempt = 0
): void {
  const retryLimit = Number.isFinite(deps.retryLimitEvent) ? Number(deps.retryLimitEvent) : 60;
  const retryDelayMs = Number.isFinite(deps.retryDelayMsEvent) ? Number(deps.retryDelayMsEvent) : 500;

  if (document.getElementById(deps.SETTINGS_CARD_ID_Event)) {
    deps.syncSettingsBadgeVersionEvent();
    deps.syncSettingsUiEvent();
    return;
  }

  const container = document.getElementById("extensions_settings");
  if (!container) {
    if (attempt < retryLimit) {
      setTimeout(() => mountSettingsCardShellEvent(deps, attempt + 1), retryDelayMs);
    }
    return;
  }

  deps.ensureSettingsCardStylesEvent();

  const root = document.createElement("div");
  root.id = deps.SETTINGS_CARD_ID_Event;
  const drawerToggleId = `${deps.SETTINGS_CARD_ID_Event}-toggle`;
  const drawerContentId = `${deps.SETTINGS_CARD_ID_Event}-content`;
  const drawerIconId = `${deps.SETTINGS_CARD_ID_Event}-icon`;
  const templateIds = deps.buildSettingsCardTemplateIdsEvent(
    drawerToggleId,
    drawerContentId,
    drawerIconId
  );
  root.innerHTML = deps.buildSettingsCardHtmlTemplateEvent(templateIds);

  const modalInPanel = root.querySelector(`#${deps.SETTINGS_SKILL_MODAL_ID_Event}`) as HTMLElement | null;
  if (modalInPanel) {
    root.appendChild(modalInPanel);
  }

  container.prepend(root);
  deps.syncSettingsBadgeVersionEvent();
  deps.onMountedEvent({ drawerToggleId, drawerContentId });
  deps.syncSettingsUiEvent();
}

let SKILL_EDITOR_BEFORE_UNLOAD_BOUND_Event = false;
let SKILL_EDITOR_MODAL_KEYDOWN_BOUND_Event = false;

export interface BindSettingsTabsAndModalDepsEvent {
  drawerToggleId: string;
  drawerContentId: string;
  SETTINGS_TAB_MAIN_ID_Event: string;
  SETTINGS_TAB_SKILL_ID_Event: string;
  SETTINGS_TAB_RULE_ID_Event: string;
  SETTINGS_TAB_ABOUT_ID_Event: string;
  SETTINGS_PANEL_MAIN_ID_Event: string;
  SETTINGS_PANEL_SKILL_ID_Event: string;
  SETTINGS_PANEL_RULE_ID_Event: string;
  SETTINGS_PANEL_ABOUT_ID_Event: string;
  SETTINGS_SKILL_MODAL_ID_Event: string;
  SETTINGS_SKILL_EDITOR_OPEN_ID_Event: string;
  SETTINGS_SKILL_MODAL_CLOSE_ID_Event: string;
  SETTINGS_SEARCH_ID_Event: string;
  confirmDiscardSkillDraftEvent: () => boolean;
  isElementVisibleEvent: (element: HTMLElement | null) => boolean;
  isSkillDraftDirtyEvent: () => boolean;
}

export function bindSettingsTabsAndModalEvent(deps: BindSettingsTabsAndModalDepsEvent): void {
  const tabMain = document.getElementById(deps.SETTINGS_TAB_MAIN_ID_Event) as HTMLButtonElement | null;
  const tabSkill = document.getElementById(deps.SETTINGS_TAB_SKILL_ID_Event) as HTMLButtonElement | null;
  const tabRule = document.getElementById(deps.SETTINGS_TAB_RULE_ID_Event) as HTMLButtonElement | null;
  const tabAbout = document.getElementById(deps.SETTINGS_TAB_ABOUT_ID_Event) as HTMLButtonElement | null;
  const panelMain = document.getElementById(deps.SETTINGS_PANEL_MAIN_ID_Event) as HTMLElement | null;
  const panelSkill = document.getElementById(deps.SETTINGS_PANEL_SKILL_ID_Event) as HTMLElement | null;
  const panelRule = document.getElementById(deps.SETTINGS_PANEL_RULE_ID_Event) as HTMLElement | null;
  const panelAbout = document.getElementById(deps.SETTINGS_PANEL_ABOUT_ID_Event) as HTMLElement | null;
  const skillModal = document.getElementById(deps.SETTINGS_SKILL_MODAL_ID_Event) as HTMLDialogElement | null;
  const skillEditorOpenBtn = document.getElementById(
    deps.SETTINGS_SKILL_EDITOR_OPEN_ID_Event
  ) as HTMLButtonElement | null;
  const skillModalCloseBtn = document.getElementById(
    deps.SETTINGS_SKILL_MODAL_CLOSE_ID_Event
  ) as HTMLButtonElement | null;
  const searchInput = document.getElementById(deps.SETTINGS_SEARCH_ID_Event) as HTMLInputElement | null;

  const searchableMainItems = panelMain
    ? Array.from(panelMain.querySelectorAll<HTMLElement>(".st-roll-search-item"))
    : [];
  const searchableSkillItems = panelSkill
    ? Array.from(panelSkill.querySelectorAll<HTMLElement>(".st-roll-search-item"))
    : [];
  const searchableRuleItems = panelRule
    ? Array.from(panelRule.querySelectorAll<HTMLElement>(".st-roll-search-item"))
    : [];
  const searchableAboutItems = panelAbout
    ? Array.from(panelAbout.querySelectorAll<HTMLElement>(".st-roll-search-item"))
    : [];
  const searchableItems = [
    ...searchableMainItems,
    ...searchableSkillItems,
    ...searchableRuleItems,
    ...searchableAboutItems,
  ];

  let activeTab: "main" | "skill" | "rule" | "about" = "main";
  const closeSkillEditorModalEvent = () => {
    if (!skillModal) return;
    if (skillModal.open) {
      try {
        skillModal.close();
      } catch {
        // noop
      }
    }
    if (document.body.dataset.stRollSkillModalOpen === "1") {
      document.body.style.overflow = document.body.dataset.stRollSkillModalOverflow || "";
      delete document.body.dataset.stRollSkillModalOpen;
      delete document.body.dataset.stRollSkillModalOverflow;
    }
  };

  const openSkillEditorModalEvent = () => {
    if (!skillModal) return;
    if (!skillModal.open) {
      try {
        skillModal.showModal();
      } catch {
        skillModal.setAttribute("open", "");
      }
    }
    if (document.body.dataset.stRollSkillModalOpen !== "1") {
      document.body.dataset.stRollSkillModalOpen = "1";
      document.body.dataset.stRollSkillModalOverflow = document.body.style.overflow || "";
      document.body.style.overflow = "hidden";
    }
  };

  const activateTab = (tab: "main" | "skill" | "rule" | "about") => {
    activeTab = tab;
    const isMain = tab === "main";
    const isSkill = tab === "skill";
    const isRule = tab === "rule";
    const isAbout = tab === "about";
    tabMain?.classList.toggle("is-active", isMain);
    tabSkill?.classList.toggle("is-active", isSkill);
    tabRule?.classList.toggle("is-active", isRule);
    tabAbout?.classList.toggle("is-active", isAbout);
    if (panelMain) panelMain.hidden = !isMain;
    if (panelSkill) panelSkill.hidden = !isSkill;
    if (panelRule) panelRule.hidden = !isRule;
    if (panelAbout) panelAbout.hidden = !isAbout;
  };

  const tryActivateTab = (nextTab: "main" | "skill" | "rule" | "about"): boolean => {
    if (nextTab === activeTab) return true;
    if (activeTab === "skill" && nextTab !== "skill" && !deps.confirmDiscardSkillDraftEvent()) {
      return false;
    }
    if (nextTab !== "skill") {
      closeSkillEditorModalEvent();
    }
    activateTab(nextTab);
    return true;
  };

  const applySettingsSearchFilter = () => {
    const query = String(searchInput?.value ?? "").trim().toLowerCase();
    const tokens = query.split(/\s+/).filter(Boolean);

    for (const item of searchableItems) {
      const source = `${item.dataset.stRollSearch ?? ""} ${item.textContent ?? ""}`.toLowerCase();
      const matched = tokens.every((token) => source.includes(token));
      item.classList.toggle("is-hidden-by-search", !matched);
    }

    if (!tokens.length) return;

    const hasMainVisible = searchableMainItems.some(
      (item) => !item.classList.contains("is-hidden-by-search")
    );
    const hasSkillVisible = searchableSkillItems.some(
      (item) => !item.classList.contains("is-hidden-by-search")
    );
    const hasRuleVisible = searchableRuleItems.some(
      (item) => !item.classList.contains("is-hidden-by-search")
    );
    const hasAboutVisible = searchableAboutItems.some(
      (item) => !item.classList.contains("is-hidden-by-search")
    );

    const hasVisibleByTab: Record<"main" | "skill" | "rule" | "about", boolean> = {
      main: hasMainVisible,
      skill: hasSkillVisible,
      rule: hasRuleVisible,
      about: hasAboutVisible,
    };
    if (!hasVisibleByTab[activeTab]) {
      const fallbackOrder: Array<"main" | "skill" | "rule" | "about"> = [
        "main",
        "skill",
        "rule",
        "about",
      ];
      const nextTab = fallbackOrder.find((tab) => hasVisibleByTab[tab]);
      if (nextTab) tryActivateTab(nextTab);
    }
  };

  activateTab("main");
  tabMain?.addEventListener("click", () => {
    if (!tryActivateTab("main")) return;
    applySettingsSearchFilter();
  });
  tabSkill?.addEventListener("click", () => {
    if (!tryActivateTab("skill")) return;
    applySettingsSearchFilter();
  });
  tabRule?.addEventListener("click", () => {
    if (!tryActivateTab("rule")) return;
    applySettingsSearchFilter();
  });
  tabAbout?.addEventListener("click", () => {
    if (!tryActivateTab("about")) return;
    applySettingsSearchFilter();
  });
  searchInput?.addEventListener("input", applySettingsSearchFilter);
  applySettingsSearchFilter();

  skillEditorOpenBtn?.addEventListener("click", () => {
    if (!tryActivateTab("skill")) return;
    openSkillEditorModalEvent();
  });

  skillModalCloseBtn?.addEventListener("click", () => {
    closeSkillEditorModalEvent();
  });

  skillModal?.addEventListener("click", (event) => {
    const target = event.target as HTMLElement | null;
    if (event.target === skillModal || target?.dataset.skillModalRole === "backdrop") {
      closeSkillEditorModalEvent();
    }
  });

  skillModal?.addEventListener("cancel", (event) => {
    event.preventDefault();
    closeSkillEditorModalEvent();
  });

  if (!SKILL_EDITOR_MODAL_KEYDOWN_BOUND_Event) {
    window.addEventListener("keydown", (event) => {
      if (event.key !== "Escape") return;
      closeSkillEditorModalEvent();
    });
    SKILL_EDITOR_MODAL_KEYDOWN_BOUND_Event = true;
  }

  const drawerToggle = document.getElementById(deps.drawerToggleId) as HTMLElement | null;
  const drawerContent = document.getElementById(deps.drawerContentId) as HTMLElement | null;
  drawerToggle?.addEventListener(
    "click",
    (event) => {
      if (!deps.isElementVisibleEvent(drawerContent)) return;
      if (deps.confirmDiscardSkillDraftEvent()) {
        closeSkillEditorModalEvent();
        return;
      }
      event.preventDefault();
      event.stopPropagation();
      if (
        typeof (event as Event & { stopImmediatePropagation?: () => void }).stopImmediatePropagation ===
        "function"
      ) {
        (event as Event & { stopImmediatePropagation: () => void }).stopImmediatePropagation();
      }
    },
    true
  );

  if (!SKILL_EDITOR_BEFORE_UNLOAD_BOUND_Event) {
    window.addEventListener("beforeunload", (event) => {
      if (!deps.isSkillDraftDirtyEvent()) return;
      event.preventDefault();
      event.returnValue = "";
    });
    SKILL_EDITOR_BEFORE_UNLOAD_BOUND_Event = true;
  }
}

export interface BindBasicSettingsInputsDepsEvent {
  SETTINGS_ENABLED_ID_Event: string;
  SETTINGS_RULE_ID_Event: string;
  SETTINGS_AI_ROLL_MODE_ID_Event: string;
  SETTINGS_EXPLODING_ENABLED_ID_Event: string;
  SETTINGS_SUMMARY_DETAIL_ID_Event: string;
  SETTINGS_SUMMARY_ROUNDS_ID_Event: string;
  SETTINGS_SCOPE_ID_Event: string;
  SETTINGS_OUTCOME_BRANCHES_ID_Event: string;
  SETTINGS_EXPLODE_OUTCOME_ID_Event: string;
  SETTINGS_SUMMARY_OUTCOME_ID_Event: string;
  SETTINGS_LIST_OUTCOME_PREVIEW_ID_Event: string;
  SETTINGS_TIME_LIMIT_ENABLED_ID_Event: string;
  SETTINGS_TIME_LIMIT_MIN_ID_Event: string;
  SETTINGS_SKILL_ENABLED_ID_Event: string;
  SUMMARY_HISTORY_ROUNDS_MAX_Event: number;
  SUMMARY_HISTORY_ROUNDS_MIN_Event: number;
  DEFAULT_SUMMARY_HISTORY_ROUNDS_Event: number;
  updateSettingsEvent: (patch: {
    enabled?: boolean;
    autoSendRuleToAI?: boolean;
    enableAiRollMode?: boolean;
    enableExplodingDice?: boolean;
    summaryDetailMode?: "minimal" | "balanced" | "detailed";
    summaryHistoryRounds?: number;
    eventApplyScope?: "protagonist_only" | "all";
    enableOutcomeBranches?: boolean;
    enableExplodeOutcomeBranch?: boolean;
    includeOutcomeInSummary?: boolean;
    showOutcomePreviewInListCard?: boolean;
    enableTimeLimit?: boolean;
    minTimeLimitSeconds?: number;
    enableSkillSystem?: boolean;
  }) => void;
}

export function bindBasicSettingsInputsEvent(deps: BindBasicSettingsInputsDepsEvent): void {
  const enabledInput = document.getElementById(deps.SETTINGS_ENABLED_ID_Event) as HTMLInputElement | null;
  const ruleInput = document.getElementById(deps.SETTINGS_RULE_ID_Event) as HTMLInputElement | null;
  const aiRollModeInput = document.getElementById(
    deps.SETTINGS_AI_ROLL_MODE_ID_Event
  ) as HTMLInputElement | null;
  const explodingEnabledInput = document.getElementById(
    deps.SETTINGS_EXPLODING_ENABLED_ID_Event
  ) as HTMLInputElement | null;
  const summaryDetailInput = document.getElementById(
    deps.SETTINGS_SUMMARY_DETAIL_ID_Event
  ) as HTMLSelectElement | null;
  const summaryRoundsInput = document.getElementById(
    deps.SETTINGS_SUMMARY_ROUNDS_ID_Event
  ) as HTMLInputElement | null;
  const scopeInput = document.getElementById(deps.SETTINGS_SCOPE_ID_Event) as HTMLSelectElement | null;
  const outcomeBranchesInput = document.getElementById(
    deps.SETTINGS_OUTCOME_BRANCHES_ID_Event
  ) as HTMLInputElement | null;
  const explodeOutcomeInput = document.getElementById(
    deps.SETTINGS_EXPLODE_OUTCOME_ID_Event
  ) as HTMLInputElement | null;
  const includeOutcomeSummaryInput = document.getElementById(
    deps.SETTINGS_SUMMARY_OUTCOME_ID_Event
  ) as HTMLInputElement | null;
  const listOutcomePreviewInput = document.getElementById(
    deps.SETTINGS_LIST_OUTCOME_PREVIEW_ID_Event
  ) as HTMLInputElement | null;
  const timeLimitEnabledInput = document.getElementById(
    deps.SETTINGS_TIME_LIMIT_ENABLED_ID_Event
  ) as HTMLInputElement | null;
  const minTimeLimitInput = document.getElementById(
    deps.SETTINGS_TIME_LIMIT_MIN_ID_Event
  ) as HTMLInputElement | null;
  const skillEnabledInput = document.getElementById(
    deps.SETTINGS_SKILL_ENABLED_ID_Event
  ) as HTMLInputElement | null;

  enabledInput?.addEventListener("input", (event) => {
    const value = Boolean((event.target as HTMLInputElement).checked);
    deps.updateSettingsEvent({ enabled: value });
  });

  ruleInput?.addEventListener("input", (event) => {
    const value = Boolean((event.target as HTMLInputElement).checked);
    deps.updateSettingsEvent({ autoSendRuleToAI: value });
  });

  aiRollModeInput?.addEventListener("input", (event) => {
    const value = Boolean((event.target as HTMLInputElement).checked);
    deps.updateSettingsEvent({ enableAiRollMode: value });
  });

  explodingEnabledInput?.addEventListener("input", (event) => {
    const value = Boolean((event.target as HTMLInputElement).checked);
    deps.updateSettingsEvent({ enableExplodingDice: value });
  });

  summaryDetailInput?.addEventListener("change", (event) => {
    const raw = String((event.target as HTMLSelectElement).value || "");
    const value: "minimal" | "balanced" | "detailed" =
      raw === "balanced" || raw === "detailed" ? (raw as "balanced" | "detailed") : "minimal";
    deps.updateSettingsEvent({ summaryDetailMode: value });
  });

  summaryRoundsInput?.addEventListener("change", (event) => {
    const raw = Number((event.target as HTMLInputElement).value);
    const value = Number.isFinite(raw)
      ? Math.min(
          deps.SUMMARY_HISTORY_ROUNDS_MAX_Event,
          Math.max(deps.SUMMARY_HISTORY_ROUNDS_MIN_Event, Math.floor(raw))
        )
      : deps.DEFAULT_SUMMARY_HISTORY_ROUNDS_Event;
    deps.updateSettingsEvent({ summaryHistoryRounds: value });
  });

  scopeInput?.addEventListener("change", (event) => {
    const value = String((event.target as HTMLSelectElement).value || "");
    deps.updateSettingsEvent({
      eventApplyScope: value === "all" ? "all" : "protagonist_only",
    });
  });

  outcomeBranchesInput?.addEventListener("input", (event) => {
    const value = Boolean((event.target as HTMLInputElement).checked);
    deps.updateSettingsEvent({ enableOutcomeBranches: value });
  });

  explodeOutcomeInput?.addEventListener("input", (event) => {
    const value = Boolean((event.target as HTMLInputElement).checked);
    deps.updateSettingsEvent({ enableExplodeOutcomeBranch: value });
  });

  includeOutcomeSummaryInput?.addEventListener("input", (event) => {
    const value = Boolean((event.target as HTMLInputElement).checked);
    deps.updateSettingsEvent({ includeOutcomeInSummary: value });
  });

  listOutcomePreviewInput?.addEventListener("input", (event) => {
    const value = Boolean((event.target as HTMLInputElement).checked);
    deps.updateSettingsEvent({ showOutcomePreviewInListCard: value });
  });

  timeLimitEnabledInput?.addEventListener("input", (event) => {
    const value = Boolean((event.target as HTMLInputElement).checked);
    deps.updateSettingsEvent({ enableTimeLimit: value });
  });

  minTimeLimitInput?.addEventListener("change", (event) => {
    const raw = Number((event.target as HTMLInputElement).value);
    const value = Number.isFinite(raw) ? Math.max(1, Math.floor(raw)) : 10;
    deps.updateSettingsEvent({ minTimeLimitSeconds: value });
  });

  skillEnabledInput?.addEventListener("input", (event) => {
    const value = Boolean((event.target as HTMLInputElement).checked);
    deps.updateSettingsEvent({ enableSkillSystem: value });
  });
}

export interface BindSkillPresetActionsDepsEvent {
  SETTINGS_SKILL_PRESET_LIST_ID_Event: string;
  SETTINGS_SKILL_PRESET_CREATE_ID_Event: string;
  SETTINGS_SKILL_PRESET_DELETE_ID_Event: string;
  SETTINGS_SKILL_PRESET_NAME_ID_Event: string;
  SETTINGS_SKILL_PRESET_RENAME_ID_Event: string;
  SKILL_PRESET_NEW_NAME_BASE_Event: string;
  SKILL_PRESET_DEFAULT_ID_Event: string;
  getSkillEditorActivePresetIdEvent: () => string;
  confirmDiscardSkillDraftEvent: () => boolean;
  getSettingsEvent: () => DicePluginSettingsEvent;
  getSkillPresetStoreEvent: (settings: DicePluginSettingsEvent) => SkillPresetStoreEvent;
  getSkillPresetByIdEvent: (store: SkillPresetStoreEvent, presetId: string) => SkillPresetEvent | null;
  saveSkillPresetStoreEvent: (store: SkillPresetStoreEvent) => void;
  getActiveSkillPresetEvent: (store: SkillPresetStoreEvent) => SkillPresetEvent;
  getUniqueSkillPresetNameEvent: (
    store: SkillPresetStoreEvent,
    baseName: string,
    excludeId?: string
  ) => string;
  createIdEvent: (prefix: string) => string;
  buildDefaultSkillPresetStoreEvent: () => SkillPresetStoreEvent;
  normalizeSkillPresetNameKeyEvent: (raw: string) => string;
  renderSkillValidationErrorsEvent: (errors: string[]) => void;
  pushToChat: (message: string) => void;
}

export function bindSkillPresetActionsEvent(deps: BindSkillPresetActionsDepsEvent): void {
  const skillPresetListWrap = document.getElementById(
    deps.SETTINGS_SKILL_PRESET_LIST_ID_Event
  ) as HTMLElement | null;
  const skillPresetCreateBtn = document.getElementById(
    deps.SETTINGS_SKILL_PRESET_CREATE_ID_Event
  ) as HTMLButtonElement | null;
  const skillPresetDeleteBtn = document.getElementById(
    deps.SETTINGS_SKILL_PRESET_DELETE_ID_Event
  ) as HTMLButtonElement | null;
  const skillPresetNameInput = document.getElementById(
    deps.SETTINGS_SKILL_PRESET_NAME_ID_Event
  ) as HTMLInputElement | null;
  const skillPresetRenameBtn = document.getElementById(
    deps.SETTINGS_SKILL_PRESET_RENAME_ID_Event
  ) as HTMLButtonElement | null;

  skillPresetListWrap?.addEventListener("click", (event) => {
    const target = event.target as HTMLElement | null;
    const presetBtn = target?.closest<HTMLButtonElement>("button[data-skill-preset-id]");
    if (!presetBtn) return;
    const nextPresetId = String(presetBtn.dataset.skillPresetId ?? "");
    if (!nextPresetId || nextPresetId === deps.getSkillEditorActivePresetIdEvent()) return;
    if (!deps.confirmDiscardSkillDraftEvent()) return;
    const settings = deps.getSettingsEvent();
    const store = deps.getSkillPresetStoreEvent(settings);
    const preset = deps.getSkillPresetByIdEvent(store, nextPresetId);
    if (!preset) return;
    store.activePresetId = preset.id;
    deps.saveSkillPresetStoreEvent(store);
  });

  skillPresetCreateBtn?.addEventListener("click", () => {
    if (!deps.confirmDiscardSkillDraftEvent()) return;
    const settings = deps.getSettingsEvent();
    const store = deps.getSkillPresetStoreEvent(settings);
    const activePreset = deps.getActiveSkillPresetEvent(store);
    const now = Date.now();
    const name = deps.getUniqueSkillPresetNameEvent(store, deps.SKILL_PRESET_NEW_NAME_BASE_Event);
    const newPreset: SkillPresetEvent = {
      id: deps.createIdEvent("skill_preset"),
      name,
      locked: false,
      skillTableText: activePreset.skillTableText,
      createdAt: now,
      updatedAt: now,
    };
    store.presets.push(newPreset);
    store.activePresetId = newPreset.id;
    deps.saveSkillPresetStoreEvent(store);
  });

  skillPresetDeleteBtn?.addEventListener("click", () => {
    const settings = deps.getSettingsEvent();
    const store = deps.getSkillPresetStoreEvent(settings);
    const activePreset = deps.getActiveSkillPresetEvent(store);
    if (activePreset.locked) {
      deps.pushToChat("⚠️ 默认预设不可删除。");
      return;
    }
    if (!deps.confirmDiscardSkillDraftEvent()) return;
    const confirmed = window.confirm(`确认删除预设「${activePreset.name}」吗？`);
    if (!confirmed) return;
    store.presets = store.presets.filter((preset) => preset.id !== activePreset.id);
    const fallbackPreset =
      deps.getSkillPresetByIdEvent(store, deps.SKILL_PRESET_DEFAULT_ID_Event) ??
      store.presets[0] ??
      null;
    if (!fallbackPreset) {
      store.presets = deps.buildDefaultSkillPresetStoreEvent().presets;
      store.activePresetId = deps.SKILL_PRESET_DEFAULT_ID_Event;
    } else {
      store.activePresetId = fallbackPreset.id;
    }
    deps.saveSkillPresetStoreEvent(store);
  });

  const handlePresetRename = () => {
    const nextName = String(skillPresetNameInput?.value ?? "").trim();
    if (!nextName) {
      deps.renderSkillValidationErrorsEvent(["预设名称不能为空。"]);
      return;
    }
    const settings = deps.getSettingsEvent();
    const store = deps.getSkillPresetStoreEvent(settings);
    const activePreset = deps.getActiveSkillPresetEvent(store);
    const duplicated = store.presets.some(
      (preset) =>
        preset.id !== activePreset.id &&
        deps.normalizeSkillPresetNameKeyEvent(preset.name) ===
          deps.normalizeSkillPresetNameKeyEvent(nextName)
    );
    if (duplicated) {
      deps.renderSkillValidationErrorsEvent(["预设名称重复，请使用其他名称。"]);
      return;
    }
    activePreset.name = nextName;
    activePreset.updatedAt = Date.now();
    deps.saveSkillPresetStoreEvent(store);
    deps.renderSkillValidationErrorsEvent([]);
  };

  skillPresetRenameBtn?.addEventListener("click", handlePresetRename);
  skillPresetNameInput?.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;
    event.preventDefault();
    handlePresetRename();
  });
}

export interface BindRuleTextActionsDepsEvent {
  SETTINGS_RULE_TEXT_ID_Event: string;
  SETTINGS_RULE_SAVE_ID_Event: string;
  SETTINGS_RULE_RESET_ID_Event: string;
  DEFAULT_RULE_TEXT_Event: string;
  updateSettingsEvent: (patch: { ruleText?: string }) => void;
}

export function bindRuleTextActionsEvent(deps: BindRuleTextActionsDepsEvent): void {
  const ruleTextInput = document.getElementById(
    deps.SETTINGS_RULE_TEXT_ID_Event
  ) as HTMLTextAreaElement | null;
  const ruleSaveBtn = document.getElementById(
    deps.SETTINGS_RULE_SAVE_ID_Event
  ) as HTMLButtonElement | null;
  const ruleResetBtn = document.getElementById(
    deps.SETTINGS_RULE_RESET_ID_Event
  ) as HTMLButtonElement | null;

  ruleSaveBtn?.addEventListener("click", () => {
    const value = String(ruleTextInput?.value ?? "");
    const nextValue = value.trim().length > 0 ? value : deps.DEFAULT_RULE_TEXT_Event;
    deps.updateSettingsEvent({ ruleText: nextValue });
  });

  ruleResetBtn?.addEventListener("click", () => {
    if (ruleTextInput) {
      ruleTextInput.value = deps.DEFAULT_RULE_TEXT_Event;
    }
    deps.updateSettingsEvent({ ruleText: deps.DEFAULT_RULE_TEXT_Event });
  });
}

export interface BindMountedSettingsCardDepsEvent {
  drawerToggleId: string;
  drawerContentId: string;
  tabsAndModalDepsEvent: Omit<
    BindSettingsTabsAndModalDepsEvent,
    "drawerToggleId" | "drawerContentId"
  >;
  basicSettingsInputsDepsEvent: BindBasicSettingsInputsDepsEvent;
  skillPresetActionsDepsEvent: BindSkillPresetActionsDepsEvent;
  skillRowsEditingActionsDepsEvent: BindSkillRowsEditingActionsDepsEvent;
  skillImportExportActionsDepsEvent: BindSkillImportExportActionsDepsEvent;
  ruleTextActionsDepsEvent: BindRuleTextActionsDepsEvent;
}

export function bindMountedSettingsCardEvent(deps: BindMountedSettingsCardDepsEvent): void {
  bindSettingsTabsAndModalEvent({
    drawerToggleId: deps.drawerToggleId,
    drawerContentId: deps.drawerContentId,
    ...deps.tabsAndModalDepsEvent,
  });
  bindBasicSettingsInputsEvent(deps.basicSettingsInputsDepsEvent);
  bindSkillPresetActionsEvent(deps.skillPresetActionsDepsEvent);
  bindSkillRowsEditingActionsEvent(deps.skillRowsEditingActionsDepsEvent);
  bindSkillImportExportActionsEvent(deps.skillImportExportActionsDepsEvent);
  bindRuleTextActionsEvent(deps.ruleTextActionsDepsEvent);
}

export interface BindSkillRowsEditingActionsDepsEvent {
  SETTINGS_SKILL_ROWS_ID_Event: string;
  SETTINGS_SKILL_ADD_ID_Event: string;
  getSkillRowsDraftEvent: () => SkillEditorRowDraftEvent[];
  setSkillRowsDraftEvent: (rows: SkillEditorRowDraftEvent[]) => void;
  createSkillEditorRowDraftEvent: (skillName: string, modifierText: string) => SkillEditorRowDraftEvent;
  renderSkillRowsEvent: () => void;
  refreshSkillDraftDirtyStateEvent: () => void;
  renderSkillValidationErrorsEvent: (errors: string[]) => void;
}

export function bindSkillRowsEditingActionsEvent(deps: BindSkillRowsEditingActionsDepsEvent): void {
  const skillRowsWrap = document.getElementById(deps.SETTINGS_SKILL_ROWS_ID_Event) as HTMLElement | null;
  const skillAddBtn = document.getElementById(deps.SETTINGS_SKILL_ADD_ID_Event) as HTMLButtonElement | null;

  skillRowsWrap?.addEventListener("input", (event) => {
    const target = event.target as HTMLInputElement | null;
    if (!target) return;
    const rowId = String(target.dataset.skillRowId ?? "");
    const field = String(target.dataset.skillField ?? "");
    if (!rowId || !field) return;
    const rows = deps.getSkillRowsDraftEvent();
    const row = rows.find((item) => item.rowId === rowId);
    if (!row) return;
    if (field === "name") {
      row.skillName = target.value;
    } else if (field === "modifier") {
      row.modifierText = target.value;
    }
    deps.refreshSkillDraftDirtyStateEvent();
    deps.renderSkillValidationErrorsEvent([]);
  });

  skillRowsWrap?.addEventListener("click", (event) => {
    const target = event.target as HTMLElement | null;
    const removeBtn = target?.closest<HTMLButtonElement>("button[data-skill-remove-id]");
    if (!removeBtn) return;
    const rowId = String(removeBtn.dataset.skillRemoveId ?? "");
    if (!rowId) return;
    const rows = deps.getSkillRowsDraftEvent().filter((row) => row.rowId !== rowId);
    deps.setSkillRowsDraftEvent(rows);
    deps.renderSkillRowsEvent();
    deps.refreshSkillDraftDirtyStateEvent();
    deps.renderSkillValidationErrorsEvent([]);
  });

  skillAddBtn?.addEventListener("click", () => {
    const rows = [
      ...deps.getSkillRowsDraftEvent(),
      deps.createSkillEditorRowDraftEvent("", ""),
    ];
    deps.setSkillRowsDraftEvent(rows);
    deps.renderSkillRowsEvent();
    deps.refreshSkillDraftDirtyStateEvent();
    deps.renderSkillValidationErrorsEvent([]);
  });
}

export interface BindSkillImportExportActionsDepsEvent {
  SETTINGS_SKILL_IMPORT_TOGGLE_ID_Event: string;
  SETTINGS_SKILL_IMPORT_AREA_ID_Event: string;
  SETTINGS_SKILL_TEXT_ID_Event: string;
  SETTINGS_SKILL_IMPORT_APPLY_ID_Event: string;
  SETTINGS_SKILL_EXPORT_ID_Event: string;
  SETTINGS_SKILL_SAVE_ID_Event: string;
  SETTINGS_SKILL_RESET_ID_Event: string;
  getSkillRowsDraftEvent: () => SkillEditorRowDraftEvent[];
  setSkillRowsDraftEvent: (rows: SkillEditorRowDraftEvent[]) => void;
  serializeSkillRowsToSkillTableTextEvent: (rows: SkillEditorRowDraftEvent[]) => string | null;
  getSettingsEvent: () => DicePluginSettingsEvent;
  getSkillPresetStoreEvent: (settings: DicePluginSettingsEvent) => SkillPresetStoreEvent;
  getActiveSkillPresetEvent: (store: SkillPresetStoreEvent) => SkillPresetEvent;
  normalizeSkillTableTextForSettingsEvent: (raw: string) => string | null;
  deserializeSkillTableTextToRowsEvent: (skillTableText: string) => SkillEditorRowDraftEvent[];
  validateSkillRowsEvent: (rows: SkillEditorRowDraftEvent[]) => {
    errors: string[];
    table: Record<string, number>;
  };
  renderSkillRowsEvent: () => void;
  refreshSkillDraftDirtyStateEvent: () => void;
  renderSkillValidationErrorsEvent: (errors: string[]) => void;
  copyTextToClipboardEvent: (text: string) => Promise<boolean>;
  pushToChat: (message: string) => void;
  setSkillEditorLastSavedSnapshotEvent: (snapshot: string) => void;
  buildSkillDraftSnapshotEvent: (rows: SkillEditorRowDraftEvent[]) => string;
  setSkillDraftDirtyEvent: (flag: boolean) => void;
  saveSkillPresetStoreEvent: (store: SkillPresetStoreEvent) => void;
}

export function bindSkillImportExportActionsEvent(
  deps: BindSkillImportExportActionsDepsEvent
): void {
  const skillImportToggleBtn = document.getElementById(
    deps.SETTINGS_SKILL_IMPORT_TOGGLE_ID_Event
  ) as HTMLButtonElement | null;
  const skillImportArea = document.getElementById(
    deps.SETTINGS_SKILL_IMPORT_AREA_ID_Event
  ) as HTMLElement | null;
  const skillTextInput = document.getElementById(
    deps.SETTINGS_SKILL_TEXT_ID_Event
  ) as HTMLTextAreaElement | null;
  const skillImportApplyBtn = document.getElementById(
    deps.SETTINGS_SKILL_IMPORT_APPLY_ID_Event
  ) as HTMLButtonElement | null;
  const skillExportBtn = document.getElementById(
    deps.SETTINGS_SKILL_EXPORT_ID_Event
  ) as HTMLButtonElement | null;
  const skillSaveBtn = document.getElementById(
    deps.SETTINGS_SKILL_SAVE_ID_Event
  ) as HTMLButtonElement | null;
  const skillResetBtn = document.getElementById(
    deps.SETTINGS_SKILL_RESET_ID_Event
  ) as HTMLButtonElement | null;

  skillImportToggleBtn?.addEventListener("click", () => {
    if (!skillImportArea) return;
    const willOpen = skillImportArea.hidden;
    skillImportArea.hidden = !willOpen;
    skillImportToggleBtn.textContent = willOpen ? "收起导入" : "导入 JSON";
    if (!willOpen || !skillTextInput) return;
    const serialized = deps.serializeSkillRowsToSkillTableTextEvent(deps.getSkillRowsDraftEvent());
    skillTextInput.value =
      serialized ??
      deps.getActiveSkillPresetEvent(deps.getSkillPresetStoreEvent(deps.getSettingsEvent())).skillTableText;
  });

  skillImportApplyBtn?.addEventListener("click", () => {
    const raw = String(skillTextInput?.value ?? "");
    if (deps.normalizeSkillTableTextForSettingsEvent(raw) == null) {
      deps.renderSkillValidationErrorsEvent([
        "导入失败：必须是 JSON 对象（例如 {\"察觉\":15,\"说服\":8}）。",
      ]);
      return;
    }
    const importedRows = deps.deserializeSkillTableTextToRowsEvent(raw);
    const validation = deps.validateSkillRowsEvent(importedRows);
    if (validation.errors.length > 0) {
      deps.renderSkillValidationErrorsEvent(validation.errors);
      return;
    }
    deps.setSkillRowsDraftEvent(importedRows);
    deps.renderSkillRowsEvent();
    deps.refreshSkillDraftDirtyStateEvent();
    deps.renderSkillValidationErrorsEvent([]);
  });

  skillExportBtn?.addEventListener("click", () => {
    const validation = deps.validateSkillRowsEvent(deps.getSkillRowsDraftEvent());
    const settings = deps.getSettingsEvent();
    const activePreset = deps.getActiveSkillPresetEvent(deps.getSkillPresetStoreEvent(settings));
    const exportText = validation.errors.length
      ? activePreset.skillTableText
      : JSON.stringify(validation.table, null, 2);
    if (validation.errors.length > 0) {
      deps.renderSkillValidationErrorsEvent([
        "当前草稿有校验错误，已导出已保存的技能表。",
      ]);
    } else {
      deps.renderSkillValidationErrorsEvent([]);
    }
    deps.copyTextToClipboardEvent(exportText).then((ok) => {
      if (ok) {
        deps.pushToChat("✅ 技能表 JSON 已复制到剪贴板。");
        return;
      }
      if (skillImportArea) {
        skillImportArea.hidden = false;
      }
      if (skillImportToggleBtn) {
        skillImportToggleBtn.textContent = "收起导入";
      }
      if (skillTextInput) {
        skillTextInput.value = exportText;
      }
      deps.pushToChat("⚠️ 剪贴板不可用，请在导入框中手动复制 JSON。");
    });
  });

  skillSaveBtn?.addEventListener("click", () => {
    const validation = deps.validateSkillRowsEvent(deps.getSkillRowsDraftEvent());
    if (validation.errors.length > 0) {
      deps.renderSkillValidationErrorsEvent(validation.errors);
      deps.pushToChat("❌ 技能表保存失败，请先修正校验错误。");
      return;
    }
    const normalized = JSON.stringify(validation.table, null, 2);
    const normalizedRows = deps.deserializeSkillTableTextToRowsEvent(normalized);
    deps.setSkillRowsDraftEvent(normalizedRows);
    deps.setSkillEditorLastSavedSnapshotEvent(deps.buildSkillDraftSnapshotEvent(normalizedRows));
    const settings = deps.getSettingsEvent();
    const store = deps.getSkillPresetStoreEvent(settings);
    const activePreset = deps.getActiveSkillPresetEvent(store);
    activePreset.skillTableText = normalized;
    activePreset.updatedAt = Date.now();
    deps.renderSkillRowsEvent();
    deps.setSkillDraftDirtyEvent(false);
    deps.renderSkillValidationErrorsEvent([]);
    deps.saveSkillPresetStoreEvent(store);
    if (skillTextInput) {
      skillTextInput.value = normalized;
    }
  });

  skillResetBtn?.addEventListener("click", () => {
    deps.setSkillRowsDraftEvent([]);
    deps.renderSkillRowsEvent();
    deps.refreshSkillDraftDirtyStateEvent();
    deps.renderSkillValidationErrorsEvent([]);
  });
}

export interface ConfirmDiscardSkillDraftDepsEvent {
  isSkillDraftDirtyEvent: () => boolean;
  hydrateSkillDraftFromSettingsEvent: (resetDirty?: boolean) => void;
}

export function confirmDiscardSkillDraftEvent(
  deps: ConfirmDiscardSkillDraftDepsEvent
): boolean {
  if (!deps.isSkillDraftDirtyEvent()) return true;
  const confirmed = window.confirm("技能改动未保存，是否丢弃并继续？");
  if (!confirmed) return false;
  deps.hydrateSkillDraftFromSettingsEvent(true);
  return true;
}

export function isElementVisibleEvent(element: HTMLElement | null): boolean {
  if (!element || element.hidden) return false;
  const style = window.getComputedStyle(element);
  return style.display !== "none" && style.visibility !== "hidden";
}

export function copyTextToClipboardEvent(text: string): Promise<boolean> {
  if (!navigator.clipboard || typeof navigator.clipboard.writeText !== "function") {
    return Promise.resolve(false);
  }
  return navigator.clipboard
    .writeText(text)
    .then(() => true)
    .catch(() => false);
}

export interface RenderSkillValidationErrorsDepsEvent {
  SETTINGS_SKILL_ERRORS_ID_Event: string;
  escapeHtmlEvent: (input: string) => string;
}

export function renderSkillValidationErrorsEvent(
  errors: string[],
  deps: RenderSkillValidationErrorsDepsEvent
): void {
  const errorWrap = document.getElementById(deps.SETTINGS_SKILL_ERRORS_ID_Event) as HTMLElement | null;
  if (!errorWrap) return;
  if (!errors.length) {
    errorWrap.hidden = true;
    errorWrap.innerHTML = "";
    return;
  }
  errorWrap.hidden = false;
  errorWrap.innerHTML = errors
    .map((item) => `<div class="st-roll-skill-error-item">${deps.escapeHtmlEvent(item)}</div>`)
    .join("");
}

export interface RenderSkillPresetListDepsEvent {
  SETTINGS_SKILL_PRESET_LIST_ID_Event: string;
  countSkillEntriesFromSkillTableTextEvent: (skillTableText: string) => number;
  escapeAttrEvent: (input: string) => string;
  escapeHtmlEvent: (input: string) => string;
}

export function renderSkillPresetListEvent(
  store: SkillPresetStoreEvent,
  deps: RenderSkillPresetListDepsEvent
): void {
  const listWrap = document.getElementById(deps.SETTINGS_SKILL_PRESET_LIST_ID_Event) as HTMLElement | null;
  if (!listWrap) return;
  if (!store.presets.length) {
    listWrap.innerHTML = `<div class="st-roll-skill-preset-empty">暂无预设</div>`;
    return;
  }
  listWrap.innerHTML = store.presets
    .map((preset) => {
      const isActive = preset.id === store.activePresetId;
      const skillCount = deps.countSkillEntriesFromSkillTableTextEvent(preset.skillTableText);
      const presetId = deps.escapeAttrEvent(preset.id);
      const presetName = deps.escapeHtmlEvent(preset.name);
      return `
        <button type="button" class="st-roll-skill-preset-item ${isActive ? "is-active" : ""}" data-skill-preset-id="${presetId}">
          <span class="st-roll-skill-preset-name">${presetName}</span>
          <span class="st-roll-skill-preset-tags">
            <span class="st-roll-skill-preset-tag">${skillCount}</span>
            ${isActive ? `<span class="st-roll-skill-preset-tag active">生效中</span>` : ""}
            ${preset.locked ? `<span class="st-roll-skill-preset-tag locked">默认</span>` : ""}
          </span>
        </button>
      `;
    })
    .join("");
}

export interface RenderSkillPresetMetaDepsEvent {
  SETTINGS_SKILL_PRESET_META_ID_Event: string;
  SETTINGS_SKILL_PRESET_NAME_ID_Event: string;
  SETTINGS_SKILL_PRESET_DELETE_ID_Event: string;
  countSkillEntriesFromSkillTableTextEvent: (skillTableText: string) => number;
  getActiveSkillPresetEvent: (store: SkillPresetStoreEvent) => SkillPresetEvent;
}

export function renderSkillPresetMetaEvent(
  store: SkillPresetStoreEvent,
  deps: RenderSkillPresetMetaDepsEvent
): void {
  const activePreset = deps.getActiveSkillPresetEvent(store);
  const meta = document.getElementById(deps.SETTINGS_SKILL_PRESET_META_ID_Event) as HTMLElement | null;
  if (meta) {
    const count = deps.countSkillEntriesFromSkillTableTextEvent(activePreset.skillTableText);
    meta.textContent = `当前预设：${activePreset.name}（技能 ${count} 项）`;
  }
  const nameInput = document.getElementById(
    deps.SETTINGS_SKILL_PRESET_NAME_ID_Event
  ) as HTMLInputElement | null;
  if (nameInput && nameInput.value !== activePreset.name) {
    nameInput.value = activePreset.name;
  }
  const deleteBtn = document.getElementById(
    deps.SETTINGS_SKILL_PRESET_DELETE_ID_Event
  ) as HTMLButtonElement | null;
  if (deleteBtn) {
    deleteBtn.disabled = activePreset.locked;
    deleteBtn.style.opacity = activePreset.locked ? "0.5" : "1";
    deleteBtn.title = activePreset.locked ? "默认预设不可删除" : "";
  }
}

export interface RenderSkillRowsDepsEvent {
  SETTINGS_SKILL_ROWS_ID_Event: string;
  escapeAttrEvent: (input: string) => string;
}

export function renderSkillRowsEvent(
  rows: SkillEditorRowDraftEvent[],
  deps: RenderSkillRowsDepsEvent
): void {
  const rowsWrap = document.getElementById(deps.SETTINGS_SKILL_ROWS_ID_Event) as HTMLElement | null;
  if (!rowsWrap) return;
  if (!rows.length) {
    rowsWrap.innerHTML = `<div class="st-roll-skill-empty">暂无技能，点击“新增技能”开始配置。</div>`;
    return;
  }
  rowsWrap.innerHTML = rows
    .map((row) => {
      const rowId = deps.escapeAttrEvent(String(row.rowId ?? ""));
      const skillName = deps.escapeAttrEvent(String(row.skillName ?? ""));
      const modifierText = deps.escapeAttrEvent(String(row.modifierText ?? ""));
      return `
      <div class="st-roll-skill-row" data-row-id="${rowId}">
        <input
          class="st-roll-input st-roll-skill-name"
          type="text"
          placeholder="例如：察觉"
          data-skill-row-id="${rowId}"
          data-skill-field="name"
          value="${skillName}"
        />
        <input
          class="st-roll-input st-roll-skill-modifier"
          type="text"
          inputmode="numeric"
          placeholder="例如：15"
          data-skill-row-id="${rowId}"
          data-skill-field="modifier"
          value="${modifierText}"
        />
        <button type="button" class="st-roll-btn secondary st-roll-skill-remove" data-skill-remove-id="${rowId}">
          删除
        </button>
      </div>
    `;
    })
    .join("");
}

export interface SyncSettingsUiDepsEvent {
  getSettingsEvent: () => {
    enabled: boolean;
    autoSendRuleToAI: boolean;
    enableAiRollMode: boolean;
    enableExplodingDice: boolean;
    summaryDetailMode: string;
    summaryHistoryRounds: number;
    eventApplyScope: string;
    enableOutcomeBranches: boolean;
    enableExplodeOutcomeBranch: boolean;
    includeOutcomeInSummary: boolean;
    showOutcomePreviewInListCard: boolean;
    enableTimeLimit: boolean;
    minTimeLimitSeconds: number;
    enableSkillSystem: boolean;
    skillTableText: string;
    skillPresetStoreText: string;
    ruleText: string;
  };
  SETTINGS_ENABLED_ID_Event: string;
  SETTINGS_RULE_ID_Event: string;
  SETTINGS_AI_ROLL_MODE_ID_Event: string;
  SETTINGS_EXPLODING_ENABLED_ID_Event: string;
  SETTINGS_SUMMARY_DETAIL_ID_Event: string;
  SETTINGS_SUMMARY_ROUNDS_ID_Event: string;
  SETTINGS_SCOPE_ID_Event: string;
  SETTINGS_OUTCOME_BRANCHES_ID_Event: string;
  SETTINGS_EXPLODE_OUTCOME_ID_Event: string;
  SETTINGS_SUMMARY_OUTCOME_ID_Event: string;
  SETTINGS_LIST_OUTCOME_PREVIEW_ID_Event: string;
  SETTINGS_TIME_LIMIT_ENABLED_ID_Event: string;
  SETTINGS_TIME_LIMIT_MIN_ID_Event: string;
  SETTINGS_TIME_LIMIT_ROW_ID_Event: string;
  SETTINGS_SKILL_ENABLED_ID_Event: string;
  SETTINGS_RULE_TEXT_ID_Event: string;
  SETTINGS_SKILL_ROWS_ID_Event: string;
  isSkillDraftDirtyEvent: () => boolean;
  hydrateSkillDraftFromSettingsEvent: () => void;
  DEFAULT_RULE_TEXT_Event: string;
  getSkillEditorLastSettingsTextEvent: () => string;
  getSkillEditorLastPresetStoreTextEvent: () => string;
}

export function syncSettingsUiEvent(deps: SyncSettingsUiDepsEvent): void {
  const settings = deps.getSettingsEvent();
  const enabledInput = document.getElementById(deps.SETTINGS_ENABLED_ID_Event) as HTMLInputElement | null;
  const ruleInput = document.getElementById(deps.SETTINGS_RULE_ID_Event) as HTMLInputElement | null;
  const aiRollModeInput = document.getElementById(
    deps.SETTINGS_AI_ROLL_MODE_ID_Event
  ) as HTMLInputElement | null;
  const explodingEnabledInput = document.getElementById(
    deps.SETTINGS_EXPLODING_ENABLED_ID_Event
  ) as HTMLInputElement | null;
  const summaryDetailInput = document.getElementById(
    deps.SETTINGS_SUMMARY_DETAIL_ID_Event
  ) as HTMLSelectElement | null;
  const summaryRoundsInput = document.getElementById(
    deps.SETTINGS_SUMMARY_ROUNDS_ID_Event
  ) as HTMLInputElement | null;
  const scopeInput = document.getElementById(deps.SETTINGS_SCOPE_ID_Event) as HTMLSelectElement | null;
  const outcomeBranchesInput = document.getElementById(
    deps.SETTINGS_OUTCOME_BRANCHES_ID_Event
  ) as HTMLInputElement | null;
  const explodeOutcomeInput = document.getElementById(
    deps.SETTINGS_EXPLODE_OUTCOME_ID_Event
  ) as HTMLInputElement | null;
  const includeOutcomeSummaryInput = document.getElementById(
    deps.SETTINGS_SUMMARY_OUTCOME_ID_Event
  ) as HTMLInputElement | null;
  const listOutcomePreviewInput = document.getElementById(
    deps.SETTINGS_LIST_OUTCOME_PREVIEW_ID_Event
  ) as HTMLInputElement | null;
  const timeLimitEnabledInput = document.getElementById(
    deps.SETTINGS_TIME_LIMIT_ENABLED_ID_Event
  ) as HTMLInputElement | null;
  const minTimeLimitInput = document.getElementById(
    deps.SETTINGS_TIME_LIMIT_MIN_ID_Event
  ) as HTMLInputElement | null;
  const minTimeLimitRow = document.getElementById(deps.SETTINGS_TIME_LIMIT_ROW_ID_Event) as HTMLElement | null;
  const skillEnabledInput = document.getElementById(
    deps.SETTINGS_SKILL_ENABLED_ID_Event
  ) as HTMLInputElement | null;
  const ruleTextInput = document.getElementById(
    deps.SETTINGS_RULE_TEXT_ID_Event
  ) as HTMLTextAreaElement | null;

  if (enabledInput) enabledInput.checked = Boolean(settings.enabled);
  if (ruleInput) ruleInput.checked = Boolean(settings.autoSendRuleToAI);
  if (aiRollModeInput) aiRollModeInput.checked = Boolean(settings.enableAiRollMode);
  if (explodingEnabledInput) explodingEnabledInput.checked = Boolean(settings.enableExplodingDice);
  if (summaryDetailInput) summaryDetailInput.value = settings.summaryDetailMode;
  if (summaryRoundsInput) summaryRoundsInput.value = String(settings.summaryHistoryRounds);
  if (scopeInput) scopeInput.value = settings.eventApplyScope;
  if (outcomeBranchesInput) outcomeBranchesInput.checked = Boolean(settings.enableOutcomeBranches);
  if (explodeOutcomeInput) explodeOutcomeInput.checked = Boolean(settings.enableExplodeOutcomeBranch);
  if (includeOutcomeSummaryInput) {
    includeOutcomeSummaryInput.checked = Boolean(settings.includeOutcomeInSummary);
  }
  if (listOutcomePreviewInput) {
    listOutcomePreviewInput.checked = Boolean(settings.showOutcomePreviewInListCard);
  }
  if (explodeOutcomeInput) {
    explodeOutcomeInput.disabled = !settings.enableOutcomeBranches;
    explodeOutcomeInput.style.opacity = settings.enableOutcomeBranches ? "1" : "0.5";
  }
  if (includeOutcomeSummaryInput) {
    includeOutcomeSummaryInput.disabled = !settings.enableOutcomeBranches;
    includeOutcomeSummaryInput.style.opacity = settings.enableOutcomeBranches ? "1" : "0.5";
  }
  if (listOutcomePreviewInput) {
    listOutcomePreviewInput.disabled = !settings.enableOutcomeBranches;
    listOutcomePreviewInput.style.opacity = settings.enableOutcomeBranches ? "1" : "0.5";
  }
  if (timeLimitEnabledInput) timeLimitEnabledInput.checked = Boolean(settings.enableTimeLimit);
  if (minTimeLimitInput) {
    minTimeLimitInput.value = String(settings.minTimeLimitSeconds);
    minTimeLimitInput.disabled = !settings.enableTimeLimit;
    minTimeLimitInput.style.opacity = settings.enableTimeLimit ? "1" : "0.5";
  }
  minTimeLimitRow?.classList.toggle("is-disabled", !settings.enableTimeLimit);
  if (skillEnabledInput) {
    skillEnabledInput.checked = Boolean(settings.enableSkillSystem);
  }
  if (!deps.isSkillDraftDirtyEvent()) {
    const currentSettingsText = String(settings.skillTableText ?? "{}");
    const currentPresetStoreText = String(settings.skillPresetStoreText ?? "");
    const skillRowsWrap = document.getElementById(deps.SETTINGS_SKILL_ROWS_ID_Event) as HTMLElement | null;
    if (
      currentSettingsText !== deps.getSkillEditorLastSettingsTextEvent() ||
      currentPresetStoreText !== deps.getSkillEditorLastPresetStoreTextEvent() ||
      !skillRowsWrap ||
      !skillRowsWrap.hasChildNodes()
    ) {
      deps.hydrateSkillDraftFromSettingsEvent();
    }
  }
  if (ruleTextInput) {
    const nextText = settings.ruleText || deps.DEFAULT_RULE_TEXT_Event;
    if (ruleTextInput.value !== nextText) {
      ruleTextInput.value = nextText;
    }
  }
}
