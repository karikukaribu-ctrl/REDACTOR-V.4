// app-ui.js
// Interface V7 : menus, volets, fenêtres flottantes, apparence, tokens, interactions

import {
  TYPE_OPTIONS,
  SUBTYPE_OPTIONS,
  MODE_OPTIONS,
  OUTPUT_OPTIONS,
  APPEARANCE_OPTIONS,
  TOKEN_GROUPS,
  CONTEXTUAL_LEFT_PANEL,
  PRESET_PATCHES,
  SMART_PRESET_OPTIONS,
  WINDOW_NAMES,
  DOCUMENT_KIND
} from "./app-config.js";

import {
  state,
  ensureValidTypeAndSubtype,
  setStateValue,
  toggleSelectedValue,
  setSelectedValue,
  applyPreset,
  saveStateToStorage,
  loadStateFromStorage,
  initializeState,
  clearSerializedFieldsInDOM,
  setLeftPanelWidth,
  setRightPanelWidth,
  toggleLeftCollapsed,
  toggleRightCollapsed,
  setLeftCollapsed,
  setRightCollapsed,
  openWindow,
  closeWindow,
  toggleWindow,
  isWindowOpen,
  closeAllWindows
} from "./app-state.js";

import {
  initializeDocumentsModule,
  refreshEditorTargetFromState,
  regenerateCurrentDocument,
  appendUpdateToCurrentDocument,
  createNewLetterDocument,
  saveActiveEditorToState,
  renderAllDocumentTabs,
  renderRecentDocuments
} from "./app-documents.js";

/* =========================================================
   INTERNALS
========================================================= */

let uiInitialized = false;
let regenerateTimer = null;
let leftResizeActive = false;
let rightResizeActive = false;

function $(id, doc = document) {
  return doc.getElementById(id);
}

function cleanText(value) {
  return (value || "").toString().trim();
}

function debounceRegenerate(doc = document, delay = 220) {
  window.clearTimeout(regenerateTimer);
  regenerateTimer = window.setTimeout(async () => {
    await regenerateCurrentDocument(doc);
  }, delay);
}

function seasonClassName(season) {
  switch (season) {
    case "printemps": return "season-spring";
    case "été": return "season-summer";
    case "automne": return "season-autumn";
    case "hiver": return "season-winter";
    default: return "season-spring";
  }
}

function themeClassName(theme) {
  return theme === "sombre" ? "theme-dark" : "theme-light";
}

function fontClassName(font) {
  switch (font) {
    case "classic": return "font-classic";
    case "serif": return "font-serif";
    case "hand": return "font-hand";
    case "anime": return "font-anime";
    case "inter":
    default:
      return "font-inter";
  }
}

function transparencyClassName(level) {
  switch (level) {
    case "low": return "transparency-low";
    case "high": return "transparency-high";
    case "medium":
    default:
      return "transparency-medium";
  }
}

function shadowClassName(mode) {
  switch (mode) {
    case "off": return "shadows-off";
    case "soft": return "shadows-soft";
    case "on":
    default:
      return "shadows-on";
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
    "font-inter", "font-classic", "font-serif", "font-hand", "font-anime",
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

  doc.documentElement.style.setProperty("--left-panel-w", `${state.leftPanelWidth}px`);
  doc.documentElement.style.setProperty("--right-panel-w", `${state.rightPanelWidth}px`);
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

  for (const [id, value] of pairs) {
    const el = $(id, doc);
    if (el) el.textContent = value;
  }
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
  menu.style.left = `${Math.max(12, rect.left)}px`;
  menu.style.top = `${rect.bottom + 6}px`;
}

export function closeMenus(doc = document) {
  ["menuType", "menuSubType", "menuMode", "menuOutput", "menuTheme", "menuFont"].forEach(id => {
    const el = $(id, doc);
    if (el) el.classList.add("hidden");
  });
}

export function renderMenus(doc = document) {
  renderMenu("menuType", TYPE_OPTIONS, state.type, (value) => {
    state.type = value;
    ensureValidTypeAndSubtype();
  }, doc);

  renderMenu("menuSubType", SUBTYPE_OPTIONS[state.type] || [], state.subType, (value) => {
    state.subType = value;
  }, doc);

  renderMenu("menuMode", MODE_OPTIONS, state.mode, (value) => {
    state.mode = value;
  }, doc);

  renderMenu("menuOutput", OUTPUT_OPTIONS, state.output, (value) => {
    state.output = value;
  }, doc);
}

export function bindMenus(doc = document) {
  doc.querySelectorAll("[data-menu]").forEach(button => {
    button.addEventListener("click", (event) => {
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

  doc.addEventListener("click", (event) => {
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

function renderTokenButton({
  container,
  option,
  isActive,
  onClick,
  doc = document
}) {
  const btn = doc.createElement("button");
  btn.type = "button";
  btn.className = `token${isActive ? " active" : ""}`;
  btn.textContent = option;
  btn.addEventListener("click", onClick);
  container.appendChild(btn);
}

function getContextualOptionsForGroup(group) {
  const contextual = CONTEXTUAL_LEFT_PANEL[state.type] || {};
  if (group.id === "structurePresetChoices") return contextual.structures || group.options;
  if (group.id === "writingBlockChoices") return contextual.blocks || group.options;
  if (group.id === "writingPhraseChoices") return contextual.phrases || group.options;
  return group.options;
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
          if (group.direct === "theme" || group.direct === "season" || group.direct === "font" || group.direct === "transparency" || group.direct === "shadowMode") {
            applyVisualState(doc);
            renderAllUI(doc);
            return;
          }

          if (group.direct === "gender" || group.direct === "civility") {
            renderAllUI(doc);
            await regenerateCurrentDocument(doc);
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

function renderQuickTypeChoices(doc = document) {
  const typeContainer = $("docTypeQuickChoices", doc);
  if (typeContainer) {
    typeContainer.innerHTML = "";
    TYPE_OPTIONS.forEach(type => {
      renderTokenButton({
        container: typeContainer,
        option: type,
        isActive: state.type === type,
        doc,
        onClick: async () => {
          state.type = type;
          ensureValidTypeAndSubtype();
          renderAllUI(doc);
          await regenerateCurrentDocument(doc);
        }
      });
    });
  }

  const subtypeContainer = $("docSubTypeQuickChoices", doc);
  if (subtypeContainer) {
    subtypeContainer.innerHTML = "";
    (SUBTYPE_OPTIONS[state.type] || []).forEach(subtype => {
      renderTokenButton({
        container: subtypeContainer,
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
}

function renderPresetButtonSet(containerId, names, doc = document) {
  const container = $(containerId, doc);
  if (!container) return;
  container.innerHTML = "";

  names.forEach(name => {
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
    // Ces conteneurs sont gérés séparément comme presets applicatifs
    if (group.id === "smartPresetChoices") return;
    renderStandardTokenGroup(group, doc);
  });

  renderQuickTypeChoices(doc);
  renderPresetButtonSet("docTemplateChoices", Object.keys(PRESET_PATCHES), doc);
  renderPresetButtonSet("presetWrap", Object.keys(PRESET_PATCHES), doc);
  renderPresetButtonSet("smartPresetChoices", SMART_PRESET_OPTIONS, doc);
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
  if (!habits.length) {
    for (let i = 0; i < 7; i += 1) {
      const cell = doc.createElement("div");
      cell.className = "habit-cell";
      grid.appendChild(cell);
    }
    return;
  }

  habits.forEach(habit => {
    if (!state.habitTrack[habit]) {
      state.habitTrack[habit] = [false, false, false, false, false, false, false];
    }

    for (let day = 0; day < 7; day += 1) {
      const cell = doc.createElement("div");
      cell.className = "habit-cell";
      cell.title = `${habit} — jour ${day + 1}`;
      if (state.habitTrack[habit][day]) {
        cell.style.outline = "2px solid var(--accent)";
        cell.style.opacity = "1";
      } else {
        cell.style.opacity = "0.5";
      }

      cell.addEventListener("click", () => {
        state.habitTrack[habit][day] = !state.habitTrack[habit][day];
        renderHabitGrid(doc);
      });

      grid.appendChild(cell);
    }
  });
}

/* =========================================================
   FLOATING WINDOWS
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
  openAppearanceWindow: "appearanceWindow",
  openAppearancePanel: "appearanceWindow"
};

export function renderOpenWindows(doc = document) {
  WINDOW_NAMES.forEach((windowId, index) => {
    const el = $(windowId, doc);
    if (!el) return;

    const opened = isWindowOpen(windowId);
    el.classList.toggle("hidden", !opened);

    if (opened) {
      const visibleIndex = state.openedWindows.indexOf(windowId);
      const offset = visibleIndex >= 0 ? visibleIndex : index;
      el.style.top = `${88 + offset * 18}px`;
      el.style.left = `calc(50% + ${offset * 14}px)`;
      el.style.zIndex = `${1400 + offset}`;
    }
  });
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
}

/* =========================================================
   PANELS + RESIZERS
========================================================= */

export function renderPanelState(doc = document) {
  applyVisualState(doc);

  const left = $("leftPanel", doc);
  const right = $("rightPanel", doc);

  if (left) left.classList.toggle("collapsed", !!state.leftCollapsed);
  if (right) right.classList.toggle("collapsed", !!state.rightCollapsed);
}

function startLeftResize(event) {
  leftResizeActive = true;
  event.preventDefault();
}

function startRightResize(event) {
  rightResizeActive = true;
  event.preventDefault();
}

function stopResize() {
  leftResizeActive = false;
  rightResizeActive = false;
}

function handleResizeMove(event, doc = document) {
  if (leftResizeActive) {
    setLeftPanelWidth(event.clientX);
    setLeftCollapsed(false);
    renderPanelState(doc);
  }

  if (rightResizeActive) {
    const width = window.innerWidth - event.clientX;
    setRightPanelWidth(width);
    setRightCollapsed(false);
    renderPanelState(doc);
  }
}

export function bindPanelControls(doc = document) {
  $("toggleLeftPanel", doc)?.addEventListener("click", () => {
    toggleLeftCollapsed();
    renderPanelState(doc);
  });

  $("toggleRightPanel", doc)?.addEventListener("click", () => {
    toggleRightCollapsed();
    renderPanelState(doc);
  });

  $("collapseLeftPanel", doc)?.addEventListener("click", () => {
    toggleLeftCollapsed();
    renderPanelState(doc);
  });

  $("collapseRightPanel", doc)?.addEventListener("click", () => {
    toggleRightCollapsed();
    renderPanelState(doc);
  });

  $("leftPanelResizer", doc)?.addEventListener("mousedown", startLeftResize);
  $("rightPanelResizer", doc)?.addEventListener("mousedown", startRightResize);

  doc.addEventListener("mousemove", (event) => handleResizeMove(event, doc));
  doc.addEventListener("mouseup", stopResize);
  doc.addEventListener("mouseleave", stopResize);
}

/* =========================================================
   SAVE / LOAD / RESET
========================================================= */

export function bindPersistenceButtons(doc = document) {
  $("btnSave", doc)?.addEventListener("click", () => {
    saveActiveEditorToState(doc);
    saveStateToStorage(doc);
  });

  $("btnLoad", doc)?.addEventListener("click", () => {
    loadStateFromStorage(doc);
    renderAllUI(doc);
    refreshEditorTargetFromState(doc);
  });

  $("btnReset", doc)?.addEventListener("click", async () => {
    localStorage.removeItem("psychnote_v7_modular");
    initializeState(doc);
    clearSerializedFieldsInDOM(doc);
    renderAllUI(doc);
    refreshEditorTargetFromState(doc);
    await regenerateCurrentDocument(doc);
  });

  $("btnDemo", doc)?.addEventListener("click", async () => {
    applyPreset("rapport mutuelle anxio-dépressif", doc);
    renderAllUI(doc);
    await regenerateCurrentDocument(doc);
  });
}

/* =========================================================
   TOPBAR ACTIONS
========================================================= */

export function bindTopbarActions(doc = document) {
  $("btnText", doc)?.addEventListener("click", async () => {
    state.output = "texte";
    renderAllUI(doc);
    await regenerateCurrentDocument(doc);
  });

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

  $("btnCopy", doc)?.addEventListener("click", async () => {
    const output = $("output", doc);
    if (!output) return;
    await navigator.clipboard.writeText(output.value || "");
  });

  $("btnPrint", doc)?.addEventListener("click", () => {
    window.print();
  });

  $("btnOpenRightDockTodo", doc)?.addEventListener("click", () => {
    setRightCollapsed(false);
    state.rightView = "todo";
    renderPanelState(doc);
    renderRightViews(doc);
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
   DOCUMENT / MAIL HELPERS
========================================================= */

export function bindMailHelpers(doc = document) {
  $("btnNewLetterTab", doc)?.addEventListener("click", () => {
    createNewLetterDocument({ blank: true }, doc);
  });
}

/* =========================================================
   MAIN RENDER
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
}

/* =========================================================
   INIT
========================================================= */

export function initializeUIModule(doc = document) {
  if (uiInitialized) return;
  uiInitialized = true;

  initializeDocumentsModule(doc);

  bindMenus(doc);
  bindRightViews(doc);
  bindWindowButtons(doc);
  bindPanelControls(doc);
  bindPersistenceButtons(doc);
  bindTopbarActions(doc);
  bindFieldListeners(doc);
  bindMailHelpers(doc);

  renderAllUI(doc);
      }
