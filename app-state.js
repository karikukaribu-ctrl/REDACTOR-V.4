// app-state.js — V8
// État global simplifié et cohérent avec la V8

import {
  APP_STORAGE_KEY,
  DEFAULT_STATE,
  DOCUMENT_KIND,
  PRESET_PATCHES,
  SERIALIZED_FIELD_IDS,
  SUBTYPE_OPTIONS,
  TYPE_OPTIONS,
  buildEmptySelectedState
} from "./app-config.js";

/* =========================================================
   HELPERS
========================================================= */

function deepClone(value) {
  if (typeof structuredClone === "function") {
    return structuredClone(value);
  }
  return JSON.parse(JSON.stringify(value));
}

function cleanText(value) {
  return (value || "").toString().trim();
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function makeId(prefix = "id") {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}

function nowIso() {
  return new Date().toISOString();
}

/* =========================================================
   DOCUMENTS
========================================================= */

export function createDocument({
  kind = DOCUMENT_KIND.MAIN,
  title = "document",
  type = "",
  subtype = "",
  mode = "complet",
  output = "texte",
  content = ""
} = {}) {
  return {
    id: makeId(kind === DOCUMENT_KIND.LETTER ? "letter" : "doc"),
    kind,
    title,
    type,
    subtype,
    mode,
    output,
    content,
    createdAt: nowIso(),
    updatedAt: nowIso()
  };
}

function touchDocument(doc) {
  if (!doc) return doc;
  doc.updatedAt = nowIso();
  return doc;
}

/* =========================================================
   INITIAL STATE
========================================================= */

export function createInitialState() {
  const base = deepClone(DEFAULT_STATE);
  base.selected = buildEmptySelectedState();
  base.mainDocs = [];
  base.letterDocs = [];
  base.activeMainDocId = null;
  base.activeLetterDocId = null;
  base.taskItems = [];
  base.recentDocuments = [];
  base.habitTrack = {};
  base.activeWindowId = null;
  return base;
}

export let state = createInitialState();

/* =========================================================
   CORE STATE
========================================================= */

export function replaceState(nextState) {
  state = nextState;
  return state;
}

export function resetState() {
  state = createInitialState();
  return state;
}

export function patchState(partial = {}) {
  state = {
    ...state,
    ...partial
  };
  return state;
}

export function setStateValue(key, value) {
  state[key] = value;
  return state;
}

/* =========================================================
   TYPE / SUBTYPE CONSISTENCY
========================================================= */

export function ensureValidTypeAndSubtype() {
  if (!TYPE_OPTIONS.includes(state.type)) {
    state.type = DEFAULT_STATE.type;
  }

  const subtypeList = SUBTYPE_OPTIONS[state.type] || [];
  if (!subtypeList.includes(state.subType)) {
    state.subType = subtypeList[0] || "";
  }

  return state;
}

/* =========================================================
   SELECTED TOKENS
========================================================= */

export function resetSelectedState() {
  state.selected = buildEmptySelectedState();
  return state.selected;
}

export function setSelectedValue(key, value) {
  if (!(key in state.selected)) return state.selected;
  state.selected[key] = value;
  return state.selected;
}

export function toggleSelectedValue(key, value, single = false) {
  if (!(key in state.selected)) return state.selected;

  if (single) {
    state.selected[key] = value;
    return state.selected;
  }

  const current = Array.isArray(state.selected[key]) ? [...state.selected[key]] : [];
  const index = current.indexOf(value);

  if (index >= 0) {
    current.splice(index, 1);
  } else {
    current.push(value);
  }

  state.selected[key] = current;
  return state.selected;
}

export function getSelectedValue(key) {
  return state.selected[key];
}

/* =========================================================
   DOCUMENT COLLECTION HELPERS
========================================================= */

export function getDocumentCollection(kind = DOCUMENT_KIND.MAIN) {
  return kind === DOCUMENT_KIND.LETTER ? state.letterDocs : state.mainDocs;
}

export function setDocumentCollection(kind = DOCUMENT_KIND.MAIN, docs = []) {
  if (kind === DOCUMENT_KIND.LETTER) {
    state.letterDocs = docs;
  } else {
    state.mainDocs = docs;
  }
  return docs;
}

export function getActiveDocumentId(kind = DOCUMENT_KIND.MAIN) {
  return kind === DOCUMENT_KIND.LETTER ? state.activeLetterDocId : state.activeMainDocId;
}

export function setActiveDocumentId(kind = DOCUMENT_KIND.MAIN, id = null) {
  if (kind === DOCUMENT_KIND.LETTER) {
    state.activeLetterDocId = id;
  } else {
    state.activeMainDocId = id;
  }
  return id;
}

export function getActiveDocument(kind = DOCUMENT_KIND.MAIN) {
  const collection = getDocumentCollection(kind);
  const activeId = getActiveDocumentId(kind);
  return collection.find(doc => doc.id === activeId) || null;
}

export function pushRecentDocument(doc) {
  if (!doc) return state.recentDocuments;

  state.recentDocuments = [
    {
      id: doc.id,
      kind: doc.kind,
      title: doc.title,
      updatedAt: doc.updatedAt || nowIso()
    },
    ...state.recentDocuments.filter(item => item.id !== doc.id)
  ].slice(0, 20);

  return state.recentDocuments;
}

export function ensureDocuments() {
  if (!state.mainDocs.length) {
    const doc = createDocument({
      kind: DOCUMENT_KIND.MAIN,
      title: state.subType || "document",
      type: state.type,
      subtype: state.subType,
      mode: state.mode,
      output: state.output,
      content: ""
    });
    state.mainDocs.push(doc);
    state.activeMainDocId = doc.id;
  }

  if (!state.letterDocs.length) {
    const letter = createDocument({
      kind: DOCUMENT_KIND.LETTER,
      title: "courrier",
      type: "mail",
      subtype: "réponse simple",
      mode: "rapide",
      output: "texte",
      content: ""
    });
    state.letterDocs.push(letter);
    state.activeLetterDocId = letter.id;
  }

  return state;
}

export function addDocument({
  kind = DOCUMENT_KIND.MAIN,
  title = "",
  type = "",
  subtype = "",
  mode = "",
  output = "",
  content = ""
} = {}) {
  const doc = createDocument({
    kind,
    title: title || (kind === DOCUMENT_KIND.LETTER ? "courrier" : state.subType || "document"),
    type: type || (kind === DOCUMENT_KIND.LETTER ? "mail" : state.type),
    subtype: subtype || (kind === DOCUMENT_KIND.LETTER ? "réponse simple" : state.subType),
    mode: mode || state.mode,
    output: output || (kind === DOCUMENT_KIND.LETTER ? "texte" : state.output),
    content
  });

  const collection = getDocumentCollection(kind);
  collection.push(doc);
  setActiveDocumentId(kind, doc.id);
  pushRecentDocument(doc);
  return doc;
}

export function duplicateDocument(kind = DOCUMENT_KIND.MAIN, id = null) {
  const doc = id
    ? getDocumentCollection(kind).find(d => d.id === id)
    : getActiveDocument(kind);

  if (!doc) return null;

  const copy = createDocument({
    kind,
    title: `${doc.title} copie`,
    type: doc.type,
    subtype: doc.subtype,
    mode: doc.mode,
    output: doc.output,
    content: doc.content
  });

  getDocumentCollection(kind).push(copy);
  setActiveDocumentId(kind, copy.id);
  pushRecentDocument(copy);
  return copy;
}

export function renameDocument(kind = DOCUMENT_KIND.MAIN, id, title) {
  const doc = getDocumentCollection(kind).find(d => d.id === id);
  if (!doc) return null;
  doc.title = cleanText(title) || doc.title;
  touchDocument(doc);
  pushRecentDocument(doc);
  return doc;
}

export function clearDocument(kind = DOCUMENT_KIND.MAIN, id = null) {
  const doc = id
    ? getDocumentCollection(kind).find(d => d.id === id)
    : getActiveDocument(kind);

  if (!doc) return null;

  doc.content = "";
  touchDocument(doc);
  pushRecentDocument(doc);
  return doc;
}

export function closeDocument(kind = DOCUMENT_KIND.MAIN, id = null) {
  const collection = getDocumentCollection(kind);
  const targetId = id || getActiveDocumentId(kind);
  const index = collection.findIndex(doc => doc.id === targetId);

  if (index < 0) return null;

  const [removed] = collection.splice(index, 1);

  if (!collection.length) {
    const fallback = addDocument({
      kind,
      title: kind === DOCUMENT_KIND.LETTER ? "courrier" : "document"
    });
    setActiveDocumentId(kind, fallback.id);
  } else {
    const next = collection[Math.max(0, index - 1)];
    setActiveDocumentId(kind, next.id);
  }

  return removed;
}

export function switchActiveDocument(kind = DOCUMENT_KIND.MAIN, id) {
  const exists = getDocumentCollection(kind).some(doc => doc.id === id);
  if (!exists) return null;
  setActiveDocumentId(kind, id);
  const doc = getActiveDocument(kind);
  pushRecentDocument(doc);
  return doc;
}

export function updateDocumentContent(kind = DOCUMENT_KIND.MAIN, content = "", id = null) {
  const doc = id
    ? getDocumentCollection(kind).find(d => d.id === id)
    : getActiveDocument(kind);

  if (!doc) return null;

  doc.content = content || "";
  touchDocument(doc);
  pushRecentDocument(doc);
  return doc;
}

export function appendDocumentContent(kind = DOCUMENT_KIND.MAIN, extraContent = "", id = null) {
  const doc = id
    ? getDocumentCollection(kind).find(d => d.id === id)
    : getActiveDocument(kind);

  if (!doc) return null;

  const safeExtra = cleanText(extraContent);
  if (!safeExtra) return doc;

  if (!cleanText(doc.content)) {
    doc.content = safeExtra;
  } else {
    doc.content = `${doc.content}\n\n${safeExtra}`;
  }

  touchDocument(doc);
  pushRecentDocument(doc);
  return doc;
}

export function syncDocumentMetaWithCurrent(kind = DOCUMENT_KIND.MAIN, id = null) {
  const doc = id
    ? getDocumentCollection(kind).find(d => d.id === id)
    : getActiveDocument(kind);

  if (!doc) return null;

  if (kind === DOCUMENT_KIND.MAIN) {
    doc.title = state.subType || doc.title;
    doc.type = state.type;
    doc.subtype = state.subType;
    doc.mode = state.mode;
    doc.output = state.output;
  }

  touchDocument(doc);
  pushRecentDocument(doc);
  return doc;
}

export function buildDefaultMainDocTitle() {
  return state.subType || "document";
}

export function buildDefaultLetterDocTitle() {
  return "courrier";
}

export function ensureMainAndLetterDocsExist() {
  ensureDocuments();
  return {
    main: getActiveDocument(DOCUMENT_KIND.MAIN),
    letter: getActiveDocument(DOCUMENT_KIND.LETTER)
  };
}

/* =========================================================
   WINDOW MANAGEMENT — UNE SEULE FENÊTRE ACTIVE
========================================================= */

export function isWindowOpen(windowId) {
  return state.activeWindowId === windowId;
}

export function openWindow(windowId) {
  state.activeWindowId = windowId;
  return state.activeWindowId;
}

export function closeWindow(windowId) {
  if (state.activeWindowId === windowId) {
    state.activeWindowId = null;
  }
  return state.activeWindowId;
}

export function toggleWindow(windowId) {
  if (state.activeWindowId === windowId) {
    state.activeWindowId = null;
  } else {
    state.activeWindowId = windowId;
  }
  return state.activeWindowId;
}

export function closeAllWindows() {
  state.activeWindowId = null;
  return state.activeWindowId;
}

/* =========================================================
   PANELS
========================================================= */

export function setLeftCollapsed(value) {
  state.leftCollapsed = !!value;
  return state.leftCollapsed;
}

export function setRightCollapsed(value) {
  state.rightCollapsed = !!value;
  return state.rightCollapsed;
}

export function toggleLeftCollapsed() {
  state.leftCollapsed = !state.leftCollapsed;
  return state.leftCollapsed;
}

export function toggleRightCollapsed() {
  state.rightCollapsed = !state.rightCollapsed;
  return state.rightCollapsed;
}

/* =========================================================
   TASKS / HABITS / ALCOHOL / WITHDRAWAL
========================================================= */

export function addTask(task) {
  const normalized = {
    id: makeId("task"),
    title: cleanText(task?.title || ""),
    type: Array.isArray(task?.type) ? task.type : [],
    priority: task?.priority || "",
    energy: task?.energy || "",
    block: task?.block || "",
    halfDay: Array.isArray(task?.halfDay) ? task.halfDay : [],
    set: Array.isArray(task?.set) ? task.set : [],
    duration: cleanText(task?.duration || ""),
    notes: cleanText(task?.notes || ""),
    done: !!task?.done
  };

  if (!normalized.title) return null;

  state.taskItems.push(normalized);
  return normalized;
}

export function toggleTaskDone(taskId) {
  const task = state.taskItems.find(t => t.id === taskId);
  if (!task) return null;
  task.done = !task.done;
  return task;
}

export function removeTask(taskId) {
  const index = state.taskItems.findIndex(t => t.id === taskId);
  if (index < 0) return null;
  return state.taskItems.splice(index, 1)[0];
}

export function clearAllTasks() {
  state.taskItems = [];
  return state.taskItems;
}

export function setHabitDay(habitName, dayIndex, value) {
  if (!state.habitTrack[habitName]) {
    state.habitTrack[habitName] = [false, false, false, false, false, false, false];
  }

  if (dayIndex >= 0 && dayIndex < 7) {
    state.habitTrack[habitName][dayIndex] = !!value;
  }

  return state.habitTrack[habitName];
}

export function toggleHabitDay(habitName, dayIndex) {
  if (!state.habitTrack[habitName]) {
    state.habitTrack[habitName] = [false, false, false, false, false, false, false];
  }

  if (dayIndex >= 0 && dayIndex < 7) {
    state.habitTrack[habitName][dayIndex] = !state.habitTrack[habitName][dayIndex];
  }

  return state.habitTrack[habitName];
}

export function setAlcoholUnits(value) {
  state.alcoholUnits = Number(value) || 0;
  return state.alcoholUnits;
}

export function setWithdrawalPlanText(value) {
  state.withdrawalPlanText = value || "";
  return state.withdrawalPlanText;
}

/* =========================================================
   PRESETS
========================================================= */

function applySelectedPatch(patchSelected = {}) {
  for (const [key, value] of Object.entries(patchSelected)) {
    if (!(key in state.selected)) continue;
    state.selected[key] = deepClone(value);
  }
}

function applyFieldPatch(patchFields = {}, doc = document) {
  for (const [fieldId, value] of Object.entries(patchFields)) {
    const el = doc.getElementById(fieldId);
    if (!el) continue;
    el.value = value;
  }
}

export function applyPreset(presetName, doc = document) {
  const patch = PRESET_PATCHES[presetName];
  if (!patch) return false;

  if (patch.state) {
    for (const [key, value] of Object.entries(patch.state)) {
      state[key] = deepClone(value);
    }
  }

  if (patch.selected) {
    applySelectedPatch(patch.selected);
  }

  if (patch.fields) {
    applyFieldPatch(patch.fields, doc);
  }

  ensureValidTypeAndSubtype();
  return true;
}

/* =========================================================
   DOM SERIALIZATION
========================================================= */

export function serializeFieldsFromDOM(doc = document) {
  const fields = {};
  for (const id of SERIALIZED_FIELD_IDS) {
    const el = doc.getElementById(id);
    if (!el) continue;
    fields[id] = el.value;
  }
  return fields;
}

export function hydrateFieldsToDOM(fields = {}, doc = document) {
  for (const id of SERIALIZED_FIELD_IDS) {
    const el = doc.getElementById(id);
    if (!el) continue;

    if (Object.prototype.hasOwnProperty.call(fields, id)) {
      el.value = fields[id];
    }
  }
}

export function clearSerializedFieldsInDOM(doc = document) {
  for (const id of SERIALIZED_FIELD_IDS) {
    const el = doc.getElementById(id);
    if (!el) continue;

    if (el.tagName === "SELECT") {
      el.selectedIndex = 0;
    } else {
      el.value = "";
    }
  }
}

/* =========================================================
   SAVE / LOAD
========================================================= */

export function buildPersistedState(doc = document) {
  return {
    ...deepClone(state),
    fields: serializeFieldsFromDOM(doc)
  };
}

export function saveStateToStorage(doc = document) {
  const payload = buildPersistedState(doc);
  localStorage.setItem(APP_STORAGE_KEY, JSON.stringify(payload));
  return payload;
}

export function loadStateFromStorage(doc = document) {
  const raw = localStorage.getItem(APP_STORAGE_KEY);
  if (!raw) return null;

  const parsed = JSON.parse(raw);
  const next = createInitialState();

  next.gender = parsed.gender ?? next.gender;
  next.civility = parsed.civility ?? next.civility;

  next.type = parsed.type ?? next.type;
  next.subType = parsed.subType ?? next.subType;
  next.mode = parsed.mode ?? next.mode;
  next.output = parsed.output ?? next.output;

  next.theme = parsed.theme ?? next.theme;
  next.season = parsed.season ?? next.season;
  next.font = parsed.font ?? next.font;
  next.transparency = parsed.transparency ?? next.transparency;
  next.shadowMode = parsed.shadowMode ?? next.shadowMode;

  next.leftCollapsed = parsed.leftCollapsed ?? next.leftCollapsed;
  next.rightCollapsed = parsed.rightCollapsed ?? next.rightCollapsed;
  next.rightView = parsed.rightView ?? next.rightView;

  next.selected = {
    ...buildEmptySelectedState(),
    ...(parsed.selected || {})
  };

  next.mainDocs = Array.isArray(parsed.mainDocs) ? parsed.mainDocs : [];
  next.letterDocs = Array.isArray(parsed.letterDocs) ? parsed.letterDocs : [];
  next.activeMainDocId = parsed.activeMainDocId ?? null;
  next.activeLetterDocId = parsed.activeLetterDocId ?? null;

  next.activeWindowId = parsed.activeWindowId ?? null;

  next.taskItems = Array.isArray(parsed.taskItems) ? parsed.taskItems : [];
  next.recentDocuments = Array.isArray(parsed.recentDocuments) ? parsed.recentDocuments : [];
  next.habitTrack = parsed.habitTrack || {};

  next.alcoholUnits = parsed.alcoholUnits ?? 0;
  next.withdrawalPlanText = parsed.withdrawalPlanText ?? "";

  replaceState(next);
  ensureValidTypeAndSubtype();
  ensureDocuments();
  hydrateFieldsToDOM(parsed.fields || {}, doc);

  return state;
}

/* =========================================================
   INIT
========================================================= */

export function initializeState(doc = document) {
  resetState();
  ensureValidTypeAndSubtype();
  ensureDocuments();
  hydrateFieldsToDOM({}, doc);
  return state;
}
