// app-ui.js — V8
// Interface simplifiée, cohérente avec le HTML V8

import {
  TYPE_OPTIONS,
  SUBTYPE_OPTIONS,
  MODE_OPTIONS,
  OUTPUT_OPTIONS,
  TOKEN_GROUPS,
  DOC_TEMPLATE_OPTIONS,
  SMART_PRESET_OPTIONS,
  CONTEXTUAL_LEFT_PANEL
} from "./app-config.js";

import {
  state,
  ensureValidTypeAndSubtype,
  setStateValue,
  setSelectedValue,
  toggleSelectedValue,
  applyPreset,
  saveStateToStorage,
  loadStateFromStorage,
  initializeState,
  clearSerializedFieldsInDOM,
  toggleLeftCollapsed,
  toggleRightCollapsed,
  setLeftCollapsed,
  setRightCollapsed,
  toggleWindow,
  openWindow,
  closeWindow,
  closeAllWindows,
  isWindowOpen,
  toggleHabitDay
} from "./app-state.js";

import {
  initializeDocumentsModule,
  refreshEditorTargetFromState,
  regenerateCurrentDocument,
  renderAllDocumentTabs,
  renderRecentDocuments,
  saveActiveEditorToState
} from "./app-documents.js";

/* =========================================================
   INTERNALS
========================================================= */

let uiInitialized = false;
let regenerateTimer = null;

function $(id, doc = document) {
  return doc.getElementById(id);
}

function debounceRegenerate(doc = document, delay = 220) {
  window.clearTimeout(regenerateTimer);
  regenerateTimer = window.setTimeout(async () => {
    await regenerateCurrentDocument(doc);
  }, delay);
}

function cleanText(value) {
  return (value || "").toString().trim();
}

function seasonClassName(season) {
  switch (season) {
    case "été": return "season-summer";
    case "automne": return "season-autumn";
    case "hiver": return "season-winter";
    case "printemps":
    default:
      return "season-spring";
  }
}

function themeClassName(theme) {
  return theme === "sombre" ? "theme-dark" : "theme-light";
}

function fontClassName(font) {
  switch (font) {
    case "inter": return "font-inter";
    case "serif": return "font-serif";
    case "hand": return "font-hand";
    case "anime": return "font-anime";
    case "classic":
    default:
      return "font-classic";
  }
}

function transparencyClassName(level) {
  switch (level) {
    case "medium": return "transparency-medium";
    case "high": return "transparency-high";
    case "low":
    default:
      return "transparency-low";
  }
}

function shadowClassName(mode) {
  switch (mode) {
    case "off": return "shadows-off";
    case "on": return "shadows-on";
    case "soft":
    default:
      return "shadows-soft";
  }
}

/* =========================================================
   VISUAL STATE
========================================================= */

export function applyVisualState(doc = document) {
  const body = doc.body;

  body.classList.remove(
    "theme-light", "theme-dark",
    "season-spring", "season-summer", "season-autumn", "season-winter",
    "font-classic", "font-inter", "font-serif", "font-hand", "font-anime",
    "transparency-low", "transparency-medium", "transparency-high",
    "shadows-off", "shadows-soft", "shadows-on",
    "left-collapsed", "right-collapsed"
  );

  body.classList.add(
    themeClassName(state.theme),
    seasonClassName(state.season),
    fontClassName(state.font),
    transparencyClassName(state.transparency),
    shadowClassName(state.shadowMode)
  );

  if (state.leftCollapsed) body.classList.add("left-collapsed");
  if (state.rightCollapsed) body.classList.add("right-collapsed");
}

/* =========================================================
   TOP DISPLAYS
========================================================= */

export function renderTopDisplays(doc = document) {
  const pairs = [
    ["typeDisplay", state.type],
    ["subTypeDisplay", state.subType],
    ["modeDisplay", state.mode],
    ["outputDisplay", state.output],
    ["metaType", state.type],
    ["metaSubType", state.subType],
    ["metaMode", state.mode],
    ["metaOutput", state.output]
  ];

  pairs.forEach(([id, value]) => {
    const el = $(id, doc);
    if (el) el.textContent = value;
  });
}

/* =========================================================
   MENUS
========================================================= */

function renderMenu(containerId, options, currentValue, onSelect, doc = document) {
  const menu = $(containerId, doc);
  if (!menu) return;

  menu.innerHTML = "";

  options.forEach(option => {
    const btn = doc.createElement("button");
    btn.type = "button";
    btn.className = `menu-item${option === currentValue ? " active" : ""}`;
    btn.textContent = option;

    btn.addEventListener("click", async () => {
      onSelect(option);
      closeMenus(doc);
      renderAllUI(doc);
      await regenerateCurrentDocument(doc);
    });

    menu.appendChild(btn);
  });
}

function positionMenu(menuId, anchorEl, doc = document) {
  const menu = $(menuId, doc);
  if (!menu || !anchorEl) return;

  const rect = anchorEl.getBoundingClientRect();
  menu.style.left = `${Math.max(8, rect.left)}px`;
  menu.style.top = `${rect.bottom + 4}px`;
}

export function closeMenus(doc = document) {
  ["menuType", "menuSubType", "menuMode", "menuOutput", "menuTheme", "menuFont"].forEach(id => {
    const el = $(id, doc);
    if (el) el.classList.add("hidden");
  });
}

export function renderMenus(doc = document) {
  renderMenu("menuType", TYPE_OPTIONS, state.type, value => {
    state.type = value;
    ensureValidTypeAndSubtype();
  }, doc);

  renderMenu("menuSubType", SUBTYPE_OPTIONS[state.type] || [], state.subType, value => {
    state.subType = value;
  }, doc);

  renderMenu("menuMode", MODE_OPTIONS, state.mode, value => {
    state.mode = value;
  }, doc);

  renderMenu("menuOutput", OUTPUT_OPTIONS, state.output, value => {
    state.output = value;
  }, doc);
}

export function bindMenus(doc = document) {
  doc.querySelectorAll("[data-menu]").forEach(button => {
    button.addEventListener("click", event => {
      event.stopPropagation();
      const menuId = button.dataset.menu;
      const menu = $(menuId, doc);
      if (!menu) return;

      const willOpen = menu.classList.contains("hidden");
      closeMenus(doc);

      if (willOpen) {
        positionMenu(menuId, button, doc);
        menu.classList.remove("hidden");
      }
    });
  });

  doc.addEventListener("click", event => {
    if (!event.target.closest(".menu") && !event.target.closest("[data-menu]")) {
      closeMenus(doc);
    }
  });
}

/* =========================================================
   TOKEN RENDERING
========================================================= */

function getTokenValueState(group) {
  if (group.direct) return state[group.direct];
  return state.selected[group.key];
}

function renderTokenButton({ container, option, isActive, onClick, doc = document }) {
  const btn = doc.createElement("button");
  btn.type = "button";
  btn.className = `token${isActive ? " active" : ""}`;
  btn.textContent = option;
  btn.addEventListener("click", onClick);
  container.appendChild(btn);
}

function getContextualOptionsForGroup(group) {
  const contextual = CONTEXTUAL_LEFT_PANEL[state.type] || {};
  if (group.id === "structurePresetChoices") return contextual.structures || [];
  if (group.id === "writingBlockChoices") return contextual.blocks || [];
  if (group.id === "writingPhraseChoices") return contextual.phrases || [];
  return group.options || [];
}

function renderStandardTokenGroup(group, doc = document) {
  const container = $(group.id, doc);
  if (!container) return;

  container.innerHTML = "";
  const currentValue = getTokenValueState(group);
  const options = getContextualOptionsForGroup(group);

  options.forEach(option => {
    const isActive = group.single
      ? currentValue === option
      : Array.isArray(currentValue) && currentValue.includes(option);

    renderTokenButton({
      container,
      option,
      isActive,
      doc,
      onClick: async () => {
        if (group.direct) {
          setStateValue(group.direct, option);

          if (["theme", "season", "font", "transparency", "shadowMode"].includes(group.direct)) {
            applyVisualState(doc);
            renderAllUI(doc);
            return;
          }
        } else {
          if (group.single) {
            setSelectedValue(group.key, option);
          } else {
            toggleSelectedValue(group.key, option, false);
          }
        }

        if (group.key === "habitChoices") {
          renderHabitGrid(doc);
        }

        renderAllUI(doc);
        await regenerateCurrentDocument(doc);
      }
    });
  });
}

function renderSubTypeQuickChoices(doc = document) {
  const container = $("docSubTypeQuickChoices", doc);
  if (!container) return;

  container.innerHTML = "";

  (SUBTYPE_OPTIONS[state.type] || []).forEach(subtype => {
    renderTokenButton({
      container,
      option: subtype,
      isActive: state.subType === subtype,
      doc,
      onClick: async () => {
        state.subType = subtype;
        renderAllUI(doc);
        await regenerateCurrentDocument(doc);
      }
    });
  });
}

function renderPresetSet(containerId, presetNames, doc = document) {
  const container = $(containerId, doc);
  if (!container) return;

  container.innerHTML = "";

  presetNames.forEach(name => {
    renderTokenButton({
      container,
      option: name,
      isActive: false,
      doc,
      onClick: async () => {
        applyPreset(name, doc);
        renderAllUI(doc);
        await regenerateCurrentDocument(doc);
      }
    });
  });
}

export function renderTokenGroups(doc = document) {
  TOKEN_GROUPS.forEach(group => {
    renderStandardTokenGroup(group, doc);
  });

  renderSubTypeQuickChoices(doc);
  renderPresetSet("docTemplateChoices", DOC_TEMPLATE_OPTIONS, doc);
  renderPresetSet("smartPresetChoices", SMART_PRESET_OPTIONS, doc);
  renderPresetSet("presetWrap", [...DOC_TEMPLATE_OPTIONS, ...SMART_PRESET_OPTIONS], doc);
}

/* =========================================================
   RIGHT VIEW
========================================================= */

export function renderRightViews(doc = document) {
  doc.querySelectorAll("[data-right-view]").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.rightView === state.rightView);
  });

  doc.querySelectorAll(".right-view").forEach(panel => {
    panel.classList.remove("active");
  });

  const active = $(`rightView-${state.rightView}`, doc);
  if (active) active.classList.add("active");
}

export function bindRightViews(doc = document) {
  doc.querySelectorAll("[data-right-view]").forEach(btn => {
    btn.addEventListener("click", () => {
      state.rightView = btn.dataset.rightView;
      renderRightViews(doc);
    });
  });
}

/* =========================================================
   HABITS
========================================================= */

export function renderHabitGrid(doc = document) {
  const grid = $("habitGrid", doc);
  if (!grid) return;

  grid.innerHTML = "";

  const habits = state.selected.habitChoices || [];
  if (!habits.length) return;

  habits.forEach(habit => {
    if (!state.habitTrack[habit]) {
      state.habitTrack[habit] = [false, false, false, false, false, false, false];
    }

    for (let day = 0; day < 7; day += 1) {
      const cell = doc.createElement("div");
      cell.className = "habit-cell";
      cell.title = `${habit} — jour ${day + 1}`;

      if (state.habitTrack[habit][day]) {
        cell.style.background = "#d9d6cf";
      }

      cell.addEventListener("click", () => {
        toggleHabitDay(habit, day);
        renderHabitGrid(doc);
      });

      grid.appendChild(cell);
    }
  });
}

/* =========================================================
   WINDOWS
========================================================= */

const OPEN_WINDOW_BUTTON_MAP = {
  openMainEncodingWindow: "mainEncodingWindow",
  openExamWindow: "examWindow",
  openTreatmentWindow: "treatmentWindow",
  openPsychosocialWindow: "psychosocialWindow",
  openAntecedentsWindow: "antecedentsWindow",
  openRiskWindow: "riskWindow",
  openConsumptionWindow: "consumptionWindow",
  openWithdrawalWindow: "withdrawalWindow",
  openMailResponseWindow: "mailResponseWindow",
  openTodoWindow: "todoWindow",
  openPresetsWindow: "presetsWindow",
  openAppearancePanel: "appearanceWindow"
};

export function renderOpenWindows(doc = document) {
  const overlay = $("modalOverlay", doc);

  const allWindowIds = [
    "mainEncodingWindow",
    "examWindow",
    "treatmentWindow",
    "psychosocialWindow",
    "antecedentsWindow",
    "riskWindow",
    "consumptionWindow",
    "withdrawalWindow",
    "mailResponseWindow",
    "todoWindow",
    "presetsWindow",
    "appearanceWindow"
  ];

  allWindowIds.forEach(windowId => {
    const el = $(windowId, doc);
    if (!el) return;
    el.classList.toggle("hidden", !isWindowOpen(windowId));
  });

  if (overlay) {
    overlay.classList.toggle("hidden", !state.activeWindowId);
  }
}

export function bindWindowButtons(doc = document) {
  Object.entries(OPEN_WINDOW_BUTTON_MAP).forEach(([buttonId, windowId]) => {
    const btn = $(buttonId, doc);
    if (!btn) return;

    btn.addEventListener("click", () => {
      toggleWindow(windowId);
      renderOpenWindows(doc);
    });
  });

  doc.querySelectorAll("[data-close-window]").forEach(btn => {
    btn.addEventListener("click", () => {
      closeWindow(btn.dataset.closeWindow);
      renderOpenWindows(doc);
    });
  });

  $("modalOverlay", doc)?.addEventListener("click", () => {
    closeAllWindows();
    renderOpenWindows(doc);
  });
}

/* =========================================================
   PANELS
========================================================= */

export function renderPanelState(doc = document) {
  applyVisualState(doc);

  const left = $("leftPanel", doc);
  const right = $("rightPanel", doc);

  if (left) left.classList.toggle("collapsed", !!state.leftCollapsed);
  if (right) right.classList.toggle("collapsed", !!state.rightCollapsed);
}

export function bindPanelControls(doc = document) {
  $("toggleLeftPanel", doc)?.addEventListener("click", () => {
    toggleLeftCollapsed();
    renderPanelState(doc);
  });

  $("collapseLeftPanel", doc)?.addEventListener("click", () => {
    toggleLeftCollapsed();
    renderPanelState(doc);
  });

  $("toggleRightPanel", doc)?.addEventListener("click", () => {
    toggleRightCollapsed();
    renderPanelState(doc);
  });

  $("collapseRightPanel", doc)?.addEventListener("click", () => {
    toggleRightCollapsed();
    renderPanelState(doc);
  });
}

/* =========================================================
   PERSISTENCE
========================================================= */

export function bindPersistenceIfPresent(doc = document) {
  const saveBtn = $("btnSave", doc);
  const loadBtn = $("btnLoad", doc);
  const resetBtn = $("btnReset", doc);

  saveBtn?.addEventListener("click", () => {
    saveActiveEditorToState(doc);
    saveStateToStorage(doc);
  });

  loadBtn?.addEventListener("click", async () => {
    loadStateFromStorage(doc);
    renderAllUI(doc);
    refreshEditorTargetFromState(doc);
    await regenerateCurrentDocument(doc);
  });

  resetBtn?.addEventListener("click", async () => {
    localStorage.removeItem("psychnote_v8");
    initializeState(doc);
    clearSerializedFieldsInDOM(doc);
    renderAllUI(doc);
    refreshEditorTargetFromState(doc);
    await regenerateCurrentDocument(doc);
  });
}

/* =========================================================
   TOPBAR + ACTION STRIP
========================================================= */

export function bindTopbarAndActions(doc = document) {
  $("btnQuestionnaire", doc)?.addEventListener("click", async () => {
    state.output = "questionnaire";
    renderAllUI(doc);
    await regenerateCurrentDocument(doc);
  });

  $("btnTodoText", doc)?.addEventListener("click", async () => {
    state.output = "todo";
    renderAllUI(doc);
    await regenerateCurrentDocument(doc);
  });

  $("btnRegenerateCurrentTab", doc)?.addEventListener("click", async () => {
    if (state.output !== "texte") {
      state.output = "texte";
      renderAllUI(doc);
    }
    await regenerateCurrentDocument(doc);
  });

  $("btnCopy", doc)?.addEventListener("click", async () => {
    const output = $("output", doc);
    if (!output) return;
    await navigator.clipboard.writeText(output.value || "");
  });

  $("btnPrint", doc)?.addEventListener("click", () => {
    window.print();
  });
}

/* =========================================================
   FIELD LISTENERS
========================================================= */

export function bindFieldListeners(doc = document) {
  doc.querySelectorAll("input, textarea, select").forEach(el => {
    if (el.id === "output") return;

    el.addEventListener("input", () => debounceRegenerate(doc));
    el.addEventListener("change", () => debounceRegenerate(doc));
  });
}

/* =========================================================
   WARNINGS
========================================================= */

export function renderWarnings(doc = document) {
  const target = $("warnings", doc);
  if (!target) return;

  const warnings = [];

  if (state.type === "administratif" && state.subType === "rapport mutuelle" && !cleanText($("mainReason", doc)?.value)) {
    warnings.push("Rapport mutuelle sans motif / diagnostic principal.");
  }

  if (cleanText($("alcQty", doc)?.value) && !state.selected.alcType?.length) {
    warnings.push("Quantité d’alcool renseignée sans type d’alcool sélectionné.");
  }

  if (state.type === "mail" && !cleanText($("letterSubject", doc)?.value)) {
    warnings.push("Mail sans objet.");
  }

  if (!warnings.length) {
    target.textContent = "Aucune alerte.";
    return;
  }

  target.innerHTML = warnings.map(w => `<div class="warn">• ${w}</div>`).join("");
}

/* =========================================================
   RENDER GLOBAL
========================================================= */

export function renderAllUI(doc = document) {
  ensureValidTypeAndSubtype();
  applyVisualState(doc);
  renderTopDisplays(doc);
  renderMenus(doc);
  renderTokenGroups(doc);
  renderRightViews(doc);
  renderOpenWindows(doc);
  renderPanelState(doc);
  renderAllDocumentTabs(doc);
  renderRecentDocuments(doc);
  renderHabitGrid(doc);
  renderWarnings(doc);
}

/* =========================================================
   INIT
========================================================= */

export function initializeUIModule(doc = document) {
  if (uiInitialized) return;
  uiInitialized = true;

  const loaded = loadStateFromStorage(doc);
  if (!loaded) {
    initializeState(doc);
  }

  initializeDocumentsModule(doc);

  bindMenus(doc);
  bindRightViews(doc);
  bindWindowButtons(doc);
  bindPanelControls(doc);
  bindPersistenceIfPresent(doc);
  bindTopbarAndActions(doc);
  bindFieldListeners(doc);

  renderAllUI(doc);
}
