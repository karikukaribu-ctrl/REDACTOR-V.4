// app-documents.js — V8
// Gestion simple et fiable des onglets documents / courriers

import { DOCUMENT_KIND } from "./app-config.js";
import {
  state,
  ensureMainAndLetterDocsExist,
  getActiveDocument,
  getActiveDocumentId,
  getDocumentCollection,
  addDocument,
  duplicateDocument,
  renameDocument,
  clearDocument,
  closeDocument,
  switchActiveDocument,
  updateDocumentContent,
  appendDocumentContent,
  syncDocumentMetaWithCurrent,
  pushRecentDocument
} from "./app-state.js";

/* =========================================================
   CALLBACKS DE GÉNÉRATION
========================================================= */

const generatorCallbacks = {
  regenerateCurrent: null,
  appendCurrent: null
};

export function registerDocumentGeneratorCallbacks(callbacks = {}) {
  generatorCallbacks.regenerateCurrent =
    typeof callbacks.regenerateCurrent === "function"
      ? callbacks.regenerateCurrent
      : null;

  generatorCallbacks.appendCurrent =
    typeof callbacks.appendCurrent === "function"
      ? callbacks.appendCurrent
      : null;
}

/* =========================================================
   HELPERS
========================================================= */

function $(id, doc = document) {
  return doc.getElementById(id);
}

function cleanText(value) {
  return (value || "").toString().trim();
}

function getOutputElement(doc = document) {
  return $("output", doc);
}

function isMailContext() {
  return state.type === "mail";
}

function getEditorKind() {
  return isMailContext() ? DOCUMENT_KIND.LETTER : DOCUMENT_KIND.MAIN;
}

function getTabsContainer(kind, doc = document) {
  return kind === DOCUMENT_KIND.LETTER
    ? $("letterTabs", doc)
    : $("documentTabs", doc);
}

function getRecentDocumentsContainer(doc = document) {
  return $("recentDocumentsList", doc);
}

function buildDefaultTitleForKind(kind = DOCUMENT_KIND.MAIN, doc = document) {
  if (kind === DOCUMENT_KIND.LETTER) {
    const subject = cleanText($("letterSubject", doc)?.value);
    return subject || state.subType || "courrier";
  }
  return state.subType || state.type || "document";
}

/* =========================================================
   ÉDITEUR CENTRAL
========================================================= */

export function readEditorContentFromDOM(doc = document) {
  return getOutputElement(doc)?.value ?? "";
}

export function writeEditorContentToDOM(content = "", doc = document) {
  const output = getOutputElement(doc);
  if (!output) return;
  output.value = content || "";
}

export function getActiveEditorDocument() {
  ensureMainAndLetterDocsExist();
  return getActiveDocument(getEditorKind());
}

export function saveActiveEditorToState(doc = document) {
  const editorDoc = getActiveEditorDocument();
  if (!editorDoc) return null;

  const content = readEditorContentFromDOM(doc);
  updateDocumentContent(editorDoc.kind, content, editorDoc.id);
  pushRecentDocument(editorDoc);
  return editorDoc;
}

export function loadActiveEditorFromState(doc = document) {
  ensureMainAndLetterDocsExist();
  const editorDoc = getActiveEditorDocument();
  if (!editorDoc) return null;

  writeEditorContentToDOM(editorDoc.content || "", doc);
  pushRecentDocument(editorDoc);
  return editorDoc;
}

export function refreshEditorTargetFromState(doc = document) {
  ensureMainAndLetterDocsExist();
  loadActiveEditorFromState(doc);
  renderAllDocumentTabs(doc);
  renderRecentDocuments(doc);
}

/* =========================================================
   CRÉATION D’ONGLETS
========================================================= */

export function createNewMainDocument({ blank = false, fromCurrent = false } = {}, doc = document) {
  saveActiveEditorToState(doc);

  const content = blank
    ? ""
    : fromCurrent
      ? readEditorContentFromDOM(doc)
      : "";

  const newDoc = addDocument({
    kind: DOCUMENT_KIND.MAIN,
    title: buildDefaultTitleForKind(DOCUMENT_KIND.MAIN, doc),
    type: state.type,
    subtype: state.subType,
    mode: state.mode,
    output: state.output,
    content
  });

  renderAllDocumentTabs(doc);
  if (!isMailContext()) loadActiveEditorFromState(doc);
  renderRecentDocuments(doc);
  return newDoc;
}

export function createNewLetterDocument({ blank = false, fromCurrent = false } = {}, doc = document) {
  saveActiveEditorToState(doc);

  const content = blank
    ? ""
    : fromCurrent
      ? readEditorContentFromDOM(doc)
      : "";

  const newLetter = addDocument({
    kind: DOCUMENT_KIND.LETTER,
    title: buildDefaultTitleForKind(DOCUMENT_KIND.LETTER, doc),
    type: "mail",
    subtype: state.subType || "réponse simple",
    mode: state.mode,
    output: "texte",
    content
  });

  renderAllDocumentTabs(doc);
  if (isMailContext()) loadActiveEditorFromState(doc);
  renderRecentDocuments(doc);
  return newLetter;
}

/* =========================================================
   ACTIONS SUR ONGLETS
========================================================= */

export function duplicateActiveMainDocument(doc = document) {
  saveActiveEditorToState(doc);
  const copy = duplicateDocument(DOCUMENT_KIND.MAIN);
  renderAllDocumentTabs(doc);
  if (!isMailContext()) loadActiveEditorFromState(doc);
  renderRecentDocuments(doc);
  return copy;
}

export function duplicateActiveLetterDocument(doc = document) {
  saveActiveEditorToState(doc);
  const copy = duplicateDocument(DOCUMENT_KIND.LETTER);
  renderAllDocumentTabs(doc);
  if (isMailContext()) loadActiveEditorFromState(doc);
  renderRecentDocuments(doc);
  return copy;
}

export function renameActiveMainDocument(doc = document) {
  const current = getActiveDocument(DOCUMENT_KIND.MAIN);
  if (!current) return null;

  const nextTitle = window.prompt("Nouveau nom du document", current.title || "document");
  if (nextTitle === null) return null;

  const renamed = renameDocument(DOCUMENT_KIND.MAIN, current.id, nextTitle);
  renderAllDocumentTabs(doc);
  renderRecentDocuments(doc);
  return renamed;
}

export function renameActiveLetterDocument(doc = document) {
  const current = getActiveDocument(DOCUMENT_KIND.LETTER);
  if (!current) return null;

  const nextTitle = window.prompt("Nouveau nom du courrier", current.title || "courrier");
  if (nextTitle === null) return null;

  const renamed = renameDocument(DOCUMENT_KIND.LETTER, current.id, nextTitle);
  renderAllDocumentTabs(doc);
  renderRecentDocuments(doc);
  return renamed;
}

export function clearActiveMainDocument(doc = document) {
  const cleared = clearDocument(DOCUMENT_KIND.MAIN);
  renderAllDocumentTabs(doc);
  if (!isMailContext()) loadActiveEditorFromState(doc);
  renderRecentDocuments(doc);
  return cleared;
}

export function clearActiveLetterDocument(doc = document) {
  const cleared = clearDocument(DOCUMENT_KIND.LETTER);
  renderAllDocumentTabs(doc);
  if (isMailContext()) loadActiveEditorFromState(doc);
  renderRecentDocuments(doc);
  return cleared;
}

export function closeActiveMainDocument(doc = document) {
  const removed = closeDocument(DOCUMENT_KIND.MAIN);
  renderAllDocumentTabs(doc);
  if (!isMailContext()) loadActiveEditorFromState(doc);
  renderRecentDocuments(doc);
  return removed;
}

export function closeActiveLetterDocument(doc = document) {
  const removed = closeDocument(DOCUMENT_KIND.LETTER);
  renderAllDocumentTabs(doc);
  if (isMailContext()) loadActiveEditorFromState(doc);
  renderRecentDocuments(doc);
  return removed;
}

/* =========================================================
   CHANGEMENT D’ONGLET
========================================================= */

export function switchToMainDocument(docId, doc = document) {
  saveActiveEditorToState(doc);
  const next = switchActiveDocument(DOCUMENT_KIND.MAIN, docId);
  renderAllDocumentTabs(doc);
  if (!isMailContext()) loadActiveEditorFromState(doc);
  renderRecentDocuments(doc);
  return next;
}

export function switchToLetterDocument(docId, doc = document) {
  saveActiveEditorToState(doc);
  const next = switchActiveDocument(DOCUMENT_KIND.LETTER, docId);
  renderAllDocumentTabs(doc);
  if (isMailContext()) loadActiveEditorFromState(doc);
  renderRecentDocuments(doc);
  return next;
}

/* =========================================================
   RENDU DES ONGLETS
========================================================= */

function buildTabButton(docItem, isActive, onClick, doc = document) {
  const btn = doc.createElement("button");
  btn.type = "button";
  btn.className = `document-tab${isActive ? " active" : ""}`;
  btn.innerHTML = `<span class="document-tab-title">${docItem.title || "document"}</span>`;
  btn.addEventListener("click", onClick);
  return btn;
}

export function renderMainDocumentTabs(doc = document) {
  ensureMainAndLetterDocsExist();

  const container = getTabsContainer(DOCUMENT_KIND.MAIN, doc);
  if (!container) return;

  container.innerHTML = "";
  const docs = getDocumentCollection(DOCUMENT_KIND.MAIN);
  const activeId = getActiveDocumentId(DOCUMENT_KIND.MAIN);

  docs.forEach(docItem => {
    const btn = buildTabButton(
      docItem,
      docItem.id === activeId,
      () => switchToMainDocument(docItem.id, doc),
      doc
    );
    container.appendChild(btn);
  });
}

export function renderLetterTabs(doc = document) {
  ensureMainAndLetterDocsExist();

  const container = getTabsContainer(DOCUMENT_KIND.LETTER, doc);
  if (!container) return;

  container.innerHTML = "";
  const docs = getDocumentCollection(DOCUMENT_KIND.LETTER);
  const activeId = getActiveDocumentId(DOCUMENT_KIND.LETTER);

  docs.forEach(docItem => {
    const btn = buildTabButton(
      docItem,
      docItem.id === activeId,
      () => switchToLetterDocument(docItem.id, doc),
      doc
    );
    container.appendChild(btn);
  });
}

export function renderAllDocumentTabs(doc = document) {
  renderMainDocumentTabs(doc);
  renderLetterTabs(doc);
}

/* =========================================================
   DOCUMENTS RÉCENTS
========================================================= */

export function renderRecentDocuments(doc = document) {
  const container = getRecentDocumentsContainer(doc);
  if (!container) return;

  container.innerHTML = "";

  const items = state.recentDocuments || [];
  if (!items.length) {
    const empty = doc.createElement("div");
    empty.className = "stack-item";
    empty.textContent = "Aucun document récent.";
    container.appendChild(empty);
    return;
  }

  items.forEach(item => {
    const row = doc.createElement("div");
    row.className = "stack-item";
    row.textContent = `${item.kind === DOCUMENT_KIND.LETTER ? "Courrier" : "Document"} — ${item.title}`;
    row.addEventListener("click", () => {
      if (item.kind === DOCUMENT_KIND.LETTER) {
        switchToLetterDocument(item.id, doc);
      } else {
        switchToMainDocument(item.id, doc);
      }
    });
    container.appendChild(row);
  });
}

/* =========================================================
   PONT AVEC LE MOTEUR DE GÉNÉRATION
========================================================= */

export function setGeneratedContentForActiveEditor(content = "", options = {}, doc = document) {
  const { append = false, syncMeta = true } = options;

  ensureMainAndLetterDocsExist();
  const kind = getEditorKind();
  const activeDoc = getActiveDocument(kind);
  if (!activeDoc) return null;

  if (syncMeta && kind === DOCUMENT_KIND.MAIN) {
    syncDocumentMetaWithCurrent(kind, activeDoc.id);
  }

  if (append) {
    appendDocumentContent(kind, content, activeDoc.id);
  } else {
    updateDocumentContent(kind, content, activeDoc.id);
  }

  const updatedDoc = getActiveDocument(kind);
  if (updatedDoc) {
    writeEditorContentToDOM(updatedDoc.content || "", doc);
    pushRecentDocument(updatedDoc);
  }

  renderAllDocumentTabs(doc);
  renderRecentDocuments(doc);

  return updatedDoc;
}

export async function regenerateCurrentDocument(doc = document) {
  if (typeof generatorCallbacks.regenerateCurrent !== "function") return null;

  saveActiveEditorToState(doc);

  const content = await generatorCallbacks.regenerateCurrent({
    kind: getEditorKind(),
    state
  });

  if (typeof content !== "string") return null;
  return setGeneratedContentForActiveEditor(content, { append: false, syncMeta: true }, doc);
}

export async function appendUpdateToCurrentDocument(doc = document) {
  if (typeof generatorCallbacks.appendCurrent !== "function") return null;

  saveActiveEditorToState(doc);

  const content = await generatorCallbacks.appendCurrent({
    kind: getEditorKind(),
    state
  });

  if (typeof content !== "string") return null;
  return setGeneratedContentForActiveEditor(content, { append: true, syncMeta: false }, doc);
}

/* =========================================================
   BOUTONS DE LA PAGE
========================================================= */

export function bindDocumentButtons(doc = document) {
  $("btnNewDocumentTab", doc)?.addEventListener("click", () => {
    createNewMainDocument({ blank: true }, doc);
  });

  $("btnDuplicateDocumentTab", doc)?.addEventListener("click", () => {
    duplicateActiveMainDocument(doc);
  });

  $("btnRenameCurrentDocumentTab", doc)?.addEventListener("click", () => {
    renameActiveMainDocument(doc);
  });

  $("btnClearCurrentDocumentTab", doc)?.addEventListener("click", () => {
    clearActiveMainDocument(doc);
  });

  $("btnCloseCurrentDocumentTab", doc)?.addEventListener("click", () => {
    closeActiveMainDocument(doc);
  });

  $("btnNewBlankDocument", doc)?.addEventListener("click", () => {
    createNewMainDocument({ blank: true }, doc);
  });

  $("btnNewFromCurrent", doc)?.addEventListener("click", () => {
    createNewMainDocument({ fromCurrent: true }, doc);
  });

  $("btnNewLetterTab", doc)?.addEventListener("click", () => {
    createNewLetterDocument({ blank: true }, doc);
  });

  $("btnDuplicateLetterTab", doc)?.addEventListener("click", () => {
    duplicateActiveLetterDocument(doc);
  });

  $("btnCloseLetterTab", doc)?.addEventListener("click", () => {
    closeActiveLetterDocument(doc);
  });

  $("btnRegenerateCurrentTab", doc)?.addEventListener("click", async () => {
    await regenerateCurrentDocument(doc);
  });

  $("btnAppendUpdateToCurrentTab", doc)?.addEventListener("click", async () => {
    await appendUpdateToCurrentDocument(doc);
  });

  const output = getOutputElement(doc);
  if (output) {
    output.addEventListener("input", () => {
      saveActiveEditorToState(doc);
      renderRecentDocuments(doc);
    });
  }
}

/* =========================================================
   INIT
========================================================= */

export function initializeDocumentsModule(doc = document) {
  ensureMainAndLetterDocsExist();
  renderAllDocumentTabs(doc);
  renderRecentDocuments(doc);
  loadActiveEditorFromState(doc);
  bindDocumentButtons(doc);
    }
