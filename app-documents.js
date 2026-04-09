// app-documents.js
// Gestion documentaire V7 : onglets principaux + onglets courriers + synchronisation éditeur

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
   INTERNAL CALLBACKS
   Ces callbacks seront fournis plus tard par app-generators.js
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

function getDocumentTabsContainer(doc = document) {
  return $("documentTabs", doc);
}

function getLetterTabsContainer(doc = document) {
  return $("letterTabs", doc);
}

function getRecentDocumentsContainer(doc = document) {
  return $("recentDocumentsList", doc);
}

function isMailContext() {
  return state.type === "mail";
}

function getEditorKind() {
  return isMailContext() ? DOCUMENT_KIND.LETTER : DOCUMENT_KIND.MAIN;
}

function buildDefaultTitleForKind(kind = DOCUMENT_KIND.MAIN, doc = document) {
  if (kind === DOCUMENT_KIND.LETTER) {
    const subject = cleanText($("letterSubject", doc)?.value);
    return subject || state.subType || "courrier";
  }
  return state.subType || state.type || "document";
}

function getActiveEditorDocument() {
  return getActiveDocument(getEditorKind());
}

function getCollectionLabel(kind) {
  return kind === DOCUMENT_KIND.LETTER ? "courrier" : "document";
}

/* =========================================================
   EDITOR SYNC
========================================================= */

export function readEditorContentFromDOM(doc = document) {
  return getOutputElement(doc)?.value ?? "";
}

export function writeEditorContentToDOM(content = "", doc = document) {
  const output = getOutputElement(doc);
  if (!output) return;
  output.value = content || "";
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

export function setGeneratedContentForActiveEditor(content = "", options = {}, doc = document) {
  const {
    append = false,
    syncMeta = true
  } = options;

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
  renderRecent
