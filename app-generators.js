// app-generators.js — V8
// Génération de texte + to do + alcool + sevrage + bootstrap global

import { DOCUMENT_KIND } from "./app-config.js";
import {
  state,
  addTask,
  toggleTaskDone,
  removeTask,
  setAlcoholUnits,
  setWithdrawalPlanText
} from "./app-state.js";

import {
  registerDocumentGeneratorCallbacks,
  regenerateCurrentDocument,
  refreshEditorTargetFromState
} from "./app-documents.js";

import {
  initializeUIModule
} from "./app-ui.js";

/* =========================================================
   HELPERS
========================================================= */

function $(id, doc = document) {
  return doc.getElementById(id);
}

function text(id, doc = document) {
  return ($(id, doc)?.value || "").trim();
}

function safeArray(value) {
  return Array.isArray(value) ? value.filter(Boolean) : [];
}

function hasText(value) {
  return !!(value || "").toString().trim();
}

function sentence(value) {
  const t = (value || "").toString().trim();
  if (!t) return "";
  return /[.!?]$/.test(t) ? t : `${t}.`;
}

function cap(value) {
  const t = (value || "").toString().trim();
  if (!t) return "";
  return t.charAt(0).toUpperCase() + t.slice(1);
}

function joinClinical(arr) {
  const list = safeArray(arr);
  if (!list.length) return "";
  if (list.length === 1) return list[0];
  if (list.length === 2) return `${list[0]} et ${list[1]}`;
  return `${list.slice(0, -1).join(", ")} et ${list[list.length - 1]}`;
}

function packGender() {
  const male = state.gender === "homme";
  const civility =
    state.civility === "monsieur" ? "Monsieur" :
    state.civility === "madame" ? "Madame" :
    male ? "Monsieur" : "Madame";

  return {
    male,
    civility,
    patient: male ? "le patient" : "la patiente",
    Patient: male ? "Le patient" : "La patiente",
    vu: male ? "vu" : "vue",
    orienté: male ? "orienté" : "orientée",
    suivi: male ? "suivi" : "suivie",
    présenté: male ? "présenté" : "présentée",
    admis: male ? "admis" : "admise"
  };
}

/* =========================================================
   DIAGNOSTIC / CONTEXTE / PLAN
========================================================= */

function currentDiagnosisText(doc = document) {
  const reasons = [];

  if (hasText(text("mainReason", doc))) {
    reasons.push(text("mainReason", doc));
  }

  const motives = safeArray(state.selected.mainFrequentMotive);
  if (motives.length) {
    reasons.push(joinClinical(motives));
  }

  const smartPresets = safeArray(state.selected.smartPreset);
  if (!reasons.length && smartPresets.length) {
    reasons.push(joinClinical(smartPresets));
  }

  return reasons.length ? reasons[0] : "une symptomatologie à préciser";
}

function mainContextText(doc = document) {
  const chunks = [];

  if (hasText(text("mainContext", doc))) {
    chunks.push(sentence(text("mainContext", doc)));
  }

  const symptoms = safeArray(state.selected.mainFrequentSymptom);
  if (symptoms.length) {
    chunks.push(`Le tableau est marqué par ${joinClinical(symptoms)}.`);
  }

  return chunks.join(" ");
}

function mainPlanText(doc = document) {
  const chunks = [];

  const plans = safeArray(state.selected.mainFrequentPlan);
  if (plans.length) {
    chunks.push(`Il est proposé ${joinClinical(plans)}.`);
  }

  if (hasText(text("mainPlan", doc))) {
    chunks.push(sentence(text("mainPlan", doc)));
  }

  return chunks.join(" ");
}

/* =========================================================
   EXAMEN CLINIQUE / MENTAL
========================================================= */

function buildExamMental(doc = document) {
  const g = packGender();
  const level = state.selected.mseMode || "complet";

  const orientation = safeArray(state.selected.mseOrientation);
  const contact = safeArray(state.selected.mseContact);
  const presentation = safeArray(state.selected.msePresentation);
  const collaboration = safeArray(state.selected.mseCollaboration);
  const psychomotor = safeArray(state.selected.msePsychomotor);
  const mood = safeArray(state.selected.mseMood);
  const anxiety = safeArray(state.selected.mseAnxiety);
  const thought = safeArray(state.selected.mseThought);
  const trauma = safeArray(state.selected.mseTrauma);
  const behavior = safeArray(state.selected.mseBehavior);
  const sleep = safeArray(state.selected.mseSleep);
  const food = safeArray(state.selected.mseFood);

  const riskIdeas = state.selected.riskIdeas || state.selected.riskIdeasDetailed || "";
  const riskAttempts = safeArray(state.selected.riskAttempt);

  if (level === "rapide" || level === "court") {
    const bits = [];

    if (orientation.length) bits.push(joinClinical(orientation));
    else bits.push(`bien ${g.orienté} dans le temps et l’espace`);

    if (contact.length) bits.push(joinClinical(contact));
    if (mood.length) bits.push(joinClinical(mood));
    if (anxiety.length) bits.push(joinClinical(anxiety));
    if (thought.length) bits.push(joinClinical(thought));
    if (sleep.length) bits.push(joinClinical(sleep));
    if (food.length) bits.push(joinClinical(food));

    const free = text("mseFree", doc);
    if (free) bits.push(free);

    return `${g.Patient} ${bits.join(", ")}.`;
  }

  let txt = "";

  txt += `${g.Patient} `;
  txt += orientation.length ? `${joinClinical(orientation)}, ` : `bien ${g.orienté} dans le temps et l’espace, `;
  txt += contact.length ? `${joinClinical(contact)}, ` : `contact adéquat, `;
  txt += presentation.length ? `${joinClinical(presentation)}, ` : `présentation correcte, `;
  txt += collaboration.length ? `${joinClinical(collaboration)}. ` : `bonne collaboration. `;

  txt += psychomotor.length
    ? `${cap(joinClinical(psychomotor))}. `
    : "Absence de ralentissement psychomoteur. ";

  const axes = [];
  if (mood.length) axes.push(joinClinical(mood));
  if (anxiety.length) axes.push(joinClinical(anxiety));
  if (thought.length) axes.push(joinClinical(thought));
  if (trauma.length) axes.push(joinClinical(trauma));

  if (axes.length) {
    txt += `${cap(joinClinical(axes))}. `;
  }

  if (riskIdeas === "absence") txt += "Absence d’idées noires rapportée. ";
  if (riskIdeas === "passives") txt += "Présence d’idées noires passives. ";
  if (riskIdeas === "actives") txt += "Présence d’idées suicidaires actives. ";

  if (riskAttempts.length) {
    txt += `${cap(joinClinical(riskAttempts))}. `;
  }

  txt += behavior.length ? `${cap(joinClinical(behavior))}. ` : "Comportement adapté. ";
  txt += sleep.length ? `${cap(joinClinical(sleep))}. ` : "Sommeil conservé. ";
  txt += food.length ? `${cap(joinClinical(food))}. ` : "Alimentation conservée. ";

  const extras = [
    text("mseOrientationFree", doc),
    text("msePresentationFree", doc),
    text("mseCollaborationFree", doc),
    text("msePsychomotorFree", doc),
    text("mseDiscourseFree", doc),
    text("mseRealityFree", doc),
    text("msePerceptionFree", doc),
    text("mseAnhedoniaFree", doc),
    text("mseTraumaFree", doc),
    text("mseInsightFree", doc),
    text("mseFree", doc)
  ].filter(Boolean);

  if (extras.length) {
    txt += extras.map(sentence).join(" ");
  }

  return txt.trim();
}

/* =========================================================
   TRAITEMENT
========================================================= */

function buildTreatment(doc = document) {
  const chunks = [];

  const careType = safeArray(state.selected.careType);
  if (careType.length) {
    chunks.push(`prise en charge actuelle : ${joinClinical(careType)}`);
  }

  if (state.selected.medicationPresence) {
    chunks.push(state.selected.medicationPresence);
  }

  const medClass = safeArray(state.selected.medClass);
  if (medClass.length) {
    chunks.push(`classe thérapeutique : ${joinClinical(medClass)}`);
  }

  const medMolecule = safeArray(state.selected.medMolecule);
  const medDose = text("medDose", doc);
  const medTiming = safeArray(state.selected.medTiming);

  if (medMolecule.length) {
    let line = `molécule(s) : ${joinClinical(medMolecule)}`;
    if (medDose) line += ` (${medDose})`;
    if (medTiming.length) line += `, prise ${joinClinical(medTiming)}`;
    chunks.push(line);
  }

  const switchPreset = state.selected.switchPreset || "";
  if (switchPreset) {
    chunks.push(`switch thérapeutique : ${switchPreset}`);
  }

  if (hasText(text("treatment", doc))) {
    chunks.push(`traitement résumé : ${text("treatment", doc).replace(/\n/g, "; ")}`);
  }

  return chunks.length ? `${cap(chunks.join(". "))}.` : "";
}

/* =========================================================
   PSYCHOSOCIAL
========================================================= */

function buildPsychosocial(doc = document) {
  const chunks = [];

  const work = safeArray(state.selected.psyWork);
  const income = safeArray(state.selected.psyIncome);
  const family = safeArray(state.selected.psyFamily);
  const housing = safeArray(state.selected.psyHousing);
  const network = safeArray(state.selected.psyNetwork);
  const stress = safeArray(state.selected.psyStress);

  if (work.length) chunks.push(`activité : ${joinClinical(work)}`);
  if (income.length) chunks.push(`revenus : ${joinClinical(income)}`);
  if (family.length) chunks.push(`famille / entourage : ${joinClinical(family)}`);
  if (housing.length) chunks.push(`logement : ${joinClinical(housing)}`);
  if (network.length) chunks.push(`réseau : ${joinClinical(network)}`);
  if (stress.length) chunks.push(`facteurs de stress : ${joinClinical(stress)}`);

  if (hasText(text("psyChildren", doc))) chunks.push(`enfants : ${text("psyChildren", doc)}`);
  if (hasText(text("psyAcademic", doc))) chunks.push(`parcours académique / professionnel : ${text("psyAcademic", doc)}`);
  if (hasText(text("psyFamilyText", doc))) chunks.push(`famille : ${text("psyFamilyText", doc)}`);
  if (hasText(text("psyContextBrief", doc))) chunks.push(`contexte bref : ${text("psyContextBrief", doc)}`);
  if (hasText(text("psyFree", doc))) chunks.push(text("psyFree", doc));

  return chunks.length ? `${cap(chunks.join(", "))}.` : "";
}

/* =========================================================
   ANTÉCÉDENTS
========================================================= */

function buildAntecedents(doc = document) {
  const chunks = [];

  if (hasText(text("pastPsychiatric", doc))) chunks.push(`ATCD psychiatriques personnels : ${text("pastPsychiatric", doc)}`);
  if (hasText(text("pastSomatic", doc))) chunks.push(`ATCD somatiques pertinents : ${text("pastSomatic", doc)}`);
  if (hasText(text("pastAddictology", doc))) chunks.push(`ATCD addictologiques : ${text("pastAddictology", doc)}`);
  if (hasText(text("pastFamilyPsychiatric", doc))) chunks.push(`ATCD familiaux psychiatriques : ${text("pastFamilyPsychiatric", doc)}`);

  return chunks.join("\n\n");
}

/* =========================================================
   RISQUE SUICIDAIRE
========================================================= */

function buildSuicideRisk(doc = document) {
  const chunks = [];

  const quick = safeArray(state.selected.riskQuick);
  const ideas = state.selected.riskIdeasDetailed || state.selected.riskIdeas || "";
  const severity = state.selected.riskSeverity || "";
  const protection = safeArray(state.selected.riskProtection);

  if (quick.length) chunks.push(`Éléments rapides de risque : ${joinClinical(quick)}.`);
  if (ideas) chunks.push(`Idées suicidaires : ${ideas}.`);
  if (severity) chunks.push(`Gravité estimée : ${severity}.`);
  if (protection.length) chunks.push(`Facteurs de protection : ${joinClinical(protection)}.`);
  if (hasText(text("riskScenario", doc))) chunks.push(`Scénario : ${sentence(text("riskScenario", doc))}`);
  if (hasText(text("riskAttemptsFree", doc))) chunks.push(`ATCD passage à l’acte : ${sentence(text("riskAttemptsFree", doc))}`);

  return chunks.join(" ");
}

/* =========================================================
   ALCOOL + CALCUL UNITÉS
========================================================= */

export function calculateAlcoholUnits(doc = document) {
  const volumeRaw = text("alcVolume", doc).replace(",", ".");
  const degreeRaw = text("alcDegrees", doc).replace(",", ".");

  const volume = Number(volumeRaw);
  const degree = Number(degreeRaw);

  if (!volume || !degree) {
    setAlcoholUnits(0);
    return 0;
  }

  const grams = volume * (degree / 100) * 0.8;
  const units = Math.round((grams / 10) * 10) / 10;

  setAlcoholUnits(units);
  return units;
}

function renderAlcoholUnits(doc = document) {
  const target = $("alcUnitsResult", doc);
  if (!target) return;
  target.textContent = `${state.alcoholUnits || 0} unité${state.alcoholUnits > 1 ? "s" : ""}`;
}

function buildConsumption(doc = document) {
  const blocks = [];

  const alcParts = [];
  if (safeArray(state.selected.alcType).length) alcParts.push(`types : ${joinClinical(state.selected.alcType)}`);
  if (safeArray(state.selected.alcPattern).length) alcParts.push(`pattern : ${joinClinical(state.selected.alcPattern)}`);
  if (safeArray(state.selected.alcFunction).length) alcParts.push(`fonctions : ${joinClinical(state.selected.alcFunction)}`);
  if (safeArray(state.selected.alcDependence).length) alcParts.push(`signes de dépendance / gravité : ${joinClinical(state.selected.alcDependence)}`);
  if (safeArray(state.selected.alcWithdrawal).length) alcParts.push(`antécédents / sevrage : ${joinClinical(state.selected.alcWithdrawal)}`);

  if (hasText(text("alcQty", doc))) alcParts.push(`quantité estimée : ${text("alcQty", doc)}`);
  if (hasText(text("alcLast", doc))) alcParts.push(`dernière prise : ${text("alcLast", doc)}`);
  if (hasText(text("alcStart", doc))) alcParts.push(`début de consommation : ${text("alcStart", doc)}`);
  if (hasText(text("alcCharacter", doc))) alcParts.push(`caractère de consommation : ${text("alcCharacter", doc)}`);
  if (state.alcoholUnits > 0) alcParts.push(`calcul estimatif : ${state.alcoholUnits} unité(s)`);
  if (hasText(text("alcFree", doc))) alcParts.push(text("alcFree", doc));

  if (alcParts.length) {
    blocks.push(`Alcool\n\n${cap(alcParts.join(", "))}.`);
  }

  const otherParts = [];
  if (safeArray(state.selected.otherSubstance).length) otherParts.push(`substances : ${joinClinical(state.selected.otherSubstance)}`);
  if (safeArray(state.selected.otherSubstanceFunction).length) otherParts.push(`fonctions possibles : ${joinClinical(state.selected.otherSubstanceFunction)}`);
  if (hasText(text("otherSubstances", doc))) otherParts.push(text("otherSubstances", doc));

  if (otherParts.length) {
    blocks.push(`Autres consommations\n\n${cap(otherParts.join(", "))}.`);
  }

  return blocks.join("\n\n");
}

/* =========================================================
   SEVRAGE
========================================================= */

function distributeDailyTotal(total, step) {
  const slots = ["8h", "12h", "18h", "22h"];
  const values = { "8h": 0, "12h": 0, "18h": 0, "22h": 0 };

  const terminalThreshold = step * 4;

  if (total <= terminalThreshold) {
    const activeCount = Math.round(total / step);
    const keepOrder = ["8h", "22h", "12h", "18h"];
    for (let i = 0; i < activeCount; i += 1) {
      values[keepOrder[i]] = step;
    }
    return values;
  }

  let remaining = total;
  while (remaining >= step) {
    for (const slot of slots) {
      if (remaining >= step) {
        values[slot] += step;
        remaining -= step;
      }
    }
  }

  return values;
}

function buildValiumSchedule(startDose, days, startDate) {
  const rows = [];
  const totals = [];

  if (days >= 1) totals.push(startDose);
  if (days >= 2) totals.push(startDose);

  let current = startDose;

  while (totals.length < days) {
    if (current === 30) {
      current = 20;
    } else {
      current = Math.max(0, current - 5);
    }
    totals.push(current);
  }

  let previousMap = null;

  totals.forEach((total, index) => {
    const date = new Date(startDate);
    date.setDate(date.getDate() + index);

    const map = distributeDailyTotal(total, 5);
    const row = {
      dayLabel: date.toLocaleDateString("fr-BE", { weekday: "long" }),
      dateLabel: date.toLocaleDateString("fr-BE"),
      slots: {},
      total
    };

    ["8h", "12h", "18h", "22h"].forEach(slot => {
      let display = map[slot] ? `${map[slot]} mg` : "-";
      if (previousMap && previousMap[slot] > map[slot]) {
        display = `⟦${display}⟧`;
      }
      row.slots[slot] = display;
    });

    previousMap = map;
    rows.push(row);
  });

  return rows;
}

function buildTemestaSchedule(startDose, days, startDate) {
  const rows = [];
  const totals = [];
  const step = 1.25;

  if (days >= 1) totals.push(startDose);
  if (days >= 2) totals.push(startDose);

  let current = startDose;

  while (totals.length < days) {
    current = Math.max(0, Math.round((current - step) * 100) / 100);
    totals.push(current);
  }

  let previousMap = null;

  totals.forEach((total, index) => {
    const date = new Date(startDate);
    date.setDate(date.getDate() + index);

    const map = distributeDailyTotal(total, step);
    const row = {
      dayLabel: date.toLocaleDateString("fr-BE", { weekday: "long" }),
      dateLabel: date.toLocaleDateString("fr-BE"),
      slots: {},
      total
    };

    ["8h", "12h", "18h", "22h"].forEach(slot => {
      let display = map[slot]
        ? `${map[slot].toFixed(2).replace(".00", "").replace(".50", ".5").replace(".25", ".25")} mg`
        : "-";
      if (previousMap && previousMap[slot] > map[slot]) {
        display = `⟦${display}⟧`;
      }
      row.slots[slot] = display;
    });

    previousMap = map;
    rows.push(row);
  });

  return rows;
}

function formatWithdrawalRows(rows, drugLabel) {
  const lines = [];
  lines.push(`${drugLabel} — schéma de sevrage`);
  lines.push("");

  rows.forEach(row => {
    lines.push(
      `${cap(row.dayLabel)} ${row.dateLabel} | 8h ${row.slots["8h"]} | 12h ${row.slots["12h"]} | 18h ${row.slots["18h"]} | 22h ${row.slots["22h"]} | total ${row.total} mg`
    );
  });

  return lines.join("\n");
}

export function buildWithdrawalPlan(doc = document) {
  const drug = text("withdrawDrug", doc) || "Valium";
  const days = Number(text("withdrawDays", doc));
  const dose = Number(text("withdrawDose", doc));
  const startDate = text("withdrawStartDate", doc) || new Date().toISOString().slice(0, 10);

  if (!days || !dose) return "";

  const rows = drug === "Valium"
    ? buildValiumSchedule(dose, days, startDate)
    : buildTemestaSchedule(dose, days, startDate);

  const result = formatWithdrawalRows(rows, drug);
  setWithdrawalPlanText(result);
  return result;
}

function renderWithdrawalPlan(doc = document) {
  const area = $("withdrawOutput", doc);
  if (!area) return;
  area.value = state.withdrawalPlanText || "";
}

/* =========================================================
   TO DO
========================================================= */

function parseInboxTasks(doc = document) {
  const rawInbox = text("taskInbox", doc);
  const extraNotes = text("taskNotesFree", doc);
  const duration = text("taskDurationEstimate", doc);

  const lines = rawInbox
    .split("\n")
    .map(line => line.trim())
    .filter(Boolean);

  lines.forEach(title => {
    addTask({
      title,
      type: safeArray(state.selected.taskType),
      priority: state.selected.taskPriority || "",
      energy: state.selected.taskEnergy || "",
      block: state.selected.timeBlock || "",
      halfDay: safeArray(state.selected.halfDay),
      set: safeArray(state.selected.todoSet),
      duration,
      notes: extraNotes
    });
  });

  const inbox = $("taskInbox", doc);
  if (inbox) inbox.value = "";
}

function renderTodoPanel(doc = document) {
  const container = $("todoPanelList", doc);
  if (!container) return;

  container.innerHTML = "";

  if (!state.taskItems.length) {
    const empty = doc.createElement("div");
    empty.className = "stack-item";
    empty.textContent = "Aucune tâche pour le moment.";
    container.appendChild(empty);
    return;
  }

  state.taskItems.forEach(task => {
    const row = doc.createElement("div");
    row.className = "stack-item";

    const header = doc.createElement("div");
    header.style.display = "flex";
    header.style.justifyContent = "space-between";
    header.style.alignItems = "center";
    header.style.gap = "8px";

    const title = doc.createElement("div");
    title.textContent = task.title + (task.done ? " — fait" : "");
    title.style.textDecoration = task.done ? "line-through" : "none";

    const actions = doc.createElement("div");
    actions.style.display = "flex";
    actions.style.gap = "6px";

    const toggleBtn = doc.createElement("button");
    toggleBtn.type = "button";
    toggleBtn.className = "mini-btn";
    toggleBtn.textContent = task.done ? "Rouvrir" : "Fait";
    toggleBtn.addEventListener("click", () => {
      toggleTaskDone(task.id);
      renderTodoPanel(doc);
    });

    const deleteBtn = doc.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.className = "mini-btn";
    deleteBtn.textContent = "Suppr.";
    deleteBtn.addEventListener("click", () => {
      removeTask(task.id);
      renderTodoPanel(doc);
    });

    actions.appendChild(toggleBtn);
    actions.appendChild(deleteBtn);

    header.appendChild(title);
    header.appendChild(actions);
    row.appendChild(header);

    const meta = [];
    if (task.priority) meta.push(`priorité ${task.priority}`);
    if (task.energy) meta.push(`énergie ${task.energy}`);
    if (task.duration) meta.push(`durée ${task.duration}`);
    if (Array.isArray(task.halfDay) && task.halfDay.length) meta.push(`demi-journée ${task.halfDay.join(", ")}`);
    if (Array.isArray(task.set) && task.set.length) meta.push(`set ${task.set.join(", ")}`);

    if (meta.length) {
      const metaEl = doc.createElement("div");
      metaEl.style.marginTop = "6px";
      metaEl.style.color = "var(--text-faint)";
      metaEl.style.fontSize = "12px";
      metaEl.textContent = meta.join(" • ");
      row.appendChild(metaEl);
    }

    container.appendChild(row);
  });
}

function buildTodoText(doc = document) {
  const lines = [];
  const title =
    state.selected.todoView === "par demi-journée" ? "TO DO — DEMI-JOURNÉE" :
    state.selected.todoView === "par bloc" ? "TO DO — BLOC" :
    state.selected.todoView === "liste simple" ? "TO DO — LISTE" :
    "TO DO — PANNEAU";

  lines.push(title);
  lines.push("");

  if (state.taskItems.length) {
    lines.push("TÂCHES");
    state.taskItems.forEach(task => {
      lines.push(`- ${task.title}${task.done ? " (fait)" : ""}`);
    });
    lines.push("");
  }

  const patients = text("patientListInput", doc).split("\n").map(x => x.trim()).filter(Boolean);
  if (patients.length) {
    lines.push("PATIENTS");
    patients.forEach(p => lines.push(`- ${p}`));
    lines.push("");
  }

  if (hasText(text("dailyClosingGoal", doc))) {
    lines.push("OBJECTIF DOSSIERS");
    lines.push(`- ${text("dailyClosingGoal", doc)} dossiers à fermer`);
    lines.push("");
  }

  if (hasText(text("dailyReportGoal", doc))) {
    lines.push("OBJECTIF RAPPORTS");
    lines.push(`- ${text("dailyReportGoal", doc)} rapports à produire`);
    lines.push("");
  }

  return lines.join("\n");
}

/* =========================================================
   QUESTIONNAIRES
========================================================= */

function buildQuestionnaireForMutuelle() {
  return `DIAGNOSTIC PRINCIPAL
................................................................
................................................................
................................................................

CONTEXTE / ÉVOLUTION
................................................................
................................................................
................................................................

EXAMEN CLINIQUE / MENTAL
Orientation :
................................................................
Contact :
................................................................
Présentation / collaboration :
................................................................
Psychomotricité :
................................................................
Humeur / anxiété / pensée :
................................................................
Idées noires :
................................................................
Sommeil / alimentation :
................................................................

PSYCHOSOCIAL
Travail / revenus :
................................................................
Famille / enfants :
................................................................
Logement :
................................................................

TRAITEMENT
................................................................
................................................................
................................................................

RETENTISSEMENT FONCTIONNEL
................................................................
................................................................
................................................................

CONCLUSION
................................................................
................................................................
................................................................`;
}

function buildQuestionnaireGeneric() {
  return `MOTIF / DEMANDE
................................................................
................................................................
................................................................

CONTEXTE / HISTOIRE
................................................................
................................................................
................................................................

EXAMEN CLINIQUE / MENTAL
................................................................
................................................................
................................................................

CONSOMMATIONS / PSYCHOSOCIAL / TRAITEMENT
................................................................
................................................................
................................................................

PLAN / RECOMMANDATIONS
................................................................
................................................................
................................................................`;
}

/* =========================================================
   TYPES DE TEXTE
========================================================= */

function buildConsultation(doc = document) {
  const g = packGender();
  const sections = [];

  sections.push(`Je vois en consultation de psychiatrie ${g.civility} pour ${currentDiagnosisText(doc)}.`);

  const context = mainContextText(doc);
  if (context) sections.push(context);

  sections.push(`Examen clinique / mental

${buildExamMental(doc)}`);

  const psycho = buildPsychosocial(doc);
  if (psycho) sections.push(`Psychosocial

${psycho}`);

  const cons = buildConsumption(doc);
  if (cons) sections.push(`Consommations

${cons}`);

  const treatment = buildTreatment(doc);
  if (treatment) sections.push(`Traitement

${treatment}`);

  const atcd = buildAntecedents(doc);
  if (atcd) sections.push(`Antécédents

${atcd}`);

  const plan = mainPlanText(doc) || "Poursuite du suivi et réévaluation clinique selon l’évolution.";
  sections.push(`Plan

${plan}`);

  return sections.join("\n\n");
}

function buildUrgences(doc = document) {
  const g = packGender();
  const sections = [];

  sections.push(`${g.civility} est ${g.vu} aux urgences pour ${currentDiagnosisText(doc)}.`);

  const context = mainContextText(doc);
  if (context) sections.push(context);

  sections.push(`Examen clinique / mental

${buildExamMental(doc)}`);

  const risk = buildSuicideRisk(doc);
  if (risk) sections.push(`Risque suicidaire

${risk}`);

  const plan = mainPlanText(doc) || "Réévaluation clinique et décision d’orientation selon le contexte.";
  sections.push(`Décision / orientation

${plan}`);

  return sections.join("\n\n");
}

function buildHospitalAdmissionWeek1(doc = document) {
  const g = packGender();
  const sections = [];

  sections.push(`Motif et contexte

${g.civility} est ${g.admis} en hospitalisation dans le cadre d’une demande de sevrage alcoolique. ${sentence(text("mainReason", doc) || "Le patient se montre demandeur d’une prise en charge structurée.")}`);

  const cons = buildConsumption(doc);
  if (cons) sections.push(`Consommations

${cons}`);

  const atcd = buildAntecedents(doc);
  if (atcd) sections.push(`Antécédents

${atcd}`);

  const psycho = buildPsychosocial(doc);
  if (psycho) sections.push(`Psychosocial

${psycho}`);

  sections.push(`Examen clinique / mental

${buildExamMental(doc)}`);

  const treatment = buildTreatment(doc);
  if (treatment) sections.push(`Traitement

${treatment}`);

  const plan = mainPlanText(doc) || "Poursuite de la prise en charge en milieu hospitalier avec observation clinique, soutien motivationnel et préparation d’une éventuelle continuité de suivi.";
  sections.push(`Plan / appréciation

${plan}`);

  return sections.join("\n\n");
}

function buildHospitalAdmissionWeek2(doc = document) {
  const sections = [];

  sections.push(`Retour de semaine intermédiaire

${sentence(text("mainContext", doc) || "Le patient revient d’une semaine intermédiaire et en propose une élaboration clinique.")}`);

  const cons = buildConsumption(doc);
  if (cons) sections.push(`Éléments de consommation durant l’intervalle

${cons}`);

  sections.push(`Examen clinique bref

${buildExamMental(doc)}`);

  const treatment = buildTreatment(doc);
  if (treatment) sections.push(`Traitement / suite

${treatment}`);

  sections.push(`Appréciation

${sentence(text("mainPlan", doc) || "L’évaluation clinique globale reste compatible avec la poursuite de la prise en charge, avec discussion autour du suivi souhaité par le patient.")}`);

  return sections.join("\n\n");
}

function buildHospitalEvolution(doc = document) {
  const sections = [];

  sections.push(`Évolution générale

${sentence(text("mainContext", doc) || "L’évolution clinique est à réévaluer en fonction des entretiens, de la tolérance du sevrage et de l’élaboration en cours.")}`);

  sections.push(`Examen mental

${buildExamMental(doc)}`);

  const treatment = buildTreatment(doc);
  if (treatment) sections.push(`Traitement

${treatment}`);

  sections.push(`Travail psychothérapeutique / élaboration

${sentence(text("mainPlan", doc) || "Les entretiens portent sur la compréhension du fonctionnement, les consommations, les facteurs déclenchants et le suivi envisagé.")}`);

  return sections.join("\n\n");
}

function buildHospitalDischargeWeek1(doc = document) {
  const sections = [];

  sections.push(`Évolution générale

${sentence(text("mainContext", doc) || "Le sevrage a été globalement bien toléré et la prise en charge a permis une première étape de mise à distance.")}`);

  sections.push(`Examen mental de sortie

${buildExamMental(doc)}`);

  const treatment = buildTreatment(doc);
  if (treatment) sections.push(`Traitement

${treatment}`);

  sections.push(`Projection semaine intermédiaire

${sentence(text("mainPlan", doc) || "Le patient se projette dans la semaine intermédiaire avec des recommandations de prudence, de maintien de l’abstinence et de poursuite du travail d’introspection.")}`);

  return sections.join("\n\n");
}

function buildHospitalDischargeWeek2(doc = document) {
  const sections = [];

  sections.push(`Clôture de prise en charge

${sentence(text("mainContext", doc) || "La prise en charge hospitalière s’achève avec élaboration autour des éléments cliniques, addictologiques et des relais utiles.")}`);

  sections.push(`Examen mental de sortie

${buildExamMental(doc)}`);

  const treatment = buildTreatment(doc);
  if (treatment) sections.push(`Traitement de sortie

${treatment}`);

  const psycho = buildPsychosocial(doc);
  if (psycho) sections.push(`Relais et psychosocial

${psycho}`);

  sections.push(`Suivi proposé

${sentence(text("mainPlan", doc) || "Un suivi ambulatoire, psychiatrique et/ou psychothérapeutique, est discuté et encouragé selon l’accord du patient.")}`);

  return sections.join("\n\n");
}

function buildHospitalisation(doc = document) {
  switch (state.subType) {
    case "admission semaine 1":
      return buildHospitalAdmissionWeek1(doc);
    case "admission semaine 2":
      return buildHospitalAdmissionWeek2(doc);
    case "évolution en cours":
      return buildHospitalEvolution(doc);
    case "sortie semaine 1":
      return buildHospitalDischargeWeek1(doc);
    case "sortie semaine 2":
      return buildHospitalDischargeWeek2(doc);
    case "synthèse d’hospitalisation":
      return `${buildHospitalEvolution(doc)}\n\n${buildHospitalDischargeWeek2(doc)}`;
    default:
      return buildHospitalEvolution(doc);
  }
}

function buildPreadmission(doc = document) {
  const sections = [];

  sections.push(`Évaluation de préadmission

${sentence(text("mainReason", doc) || "Demande d’évaluation dans le cadre d’une éventuelle admission.")}`);

  const cons = buildConsumption(doc);
  if (cons) sections.push(`Consommations

${cons}`);

  const atcd = buildAntecedents(doc);
  if (atcd) sections.push(`Antécédents

${atcd}`);

  sections.push(`Examen clinique / mental

${buildExamMental(doc)}`);

  const psycho = buildPsychosocial(doc);
  if (psycho) sections.push(`Psychosocial

${psycho}`);

  sections.push(`Indication

${sentence(text("mainPlan", doc) || "L’indication d’admission reste à discuter au regard du contexte clinique et des besoins du patient.")}`);

  return sections.join("\n\n");
}

function buildMutuelle(doc = document) {
  const g = packGender();
  const sections = [];

  sections.push(`Je vois en consultation de psychiatrie ${g.civility} pour ${currentDiagnosisText(doc)}.`);

  const context = mainContextText(doc);
  if (context) {
    sections.push(`Au début de la prise en charge / contexte clinique

${context}`);
  }

  sections.push(`Sur le plan clinique

${buildExamMental(doc)}`);

  const psycho = buildPsychosocial(doc);
  if (psycho) sections.push(`Sur le plan psychosocial

${psycho}`);

  const treatment = buildTreatment(doc);
  if (treatment) sections.push(`Sur le plan thérapeutique

${treatment}`);

  const functionText = text("mainPlan", doc) || "Le retentissement fonctionnel est marqué par une altération des capacités d’adaptation, de concentration et d’organisation.";
  sections.push(`Retentissement fonctionnel

${sentence(functionText)}`);

  sections.push(`Conclusion

La poursuite du traitement et du suivi reste encouragée. Je reste à disposition pour de plus amples informations.`);

  return sections.join("\n\n");
}

function buildAdministrative(doc = document) {
  const g = packGender();

  if (state.subType === "rapport mutuelle") {
    return buildMutuelle(doc);
  }

  if (state.subType === "attestation de présence") {
    return `Je soussigné certifie que ${g.civility} s’est ${g.présenté} en consultation le ____.\n\nAttestation délivrée pour faire valoir ce que de droit.`;
  }

  if (state.subType === "attestation simple") {
    return `Je soussigné certifie que ${g.civility} est actuellement ${g.suivi} en psychiatrie.\n\nCette attestation est délivrée à la demande de l’intéressé${g.male ? "" : "e"} pour faire valoir ce que de droit.`;
  }

  if (state.subType === "attestation de suivi") {
    return `Je soussigné certifie que ${g.civility} bénéficie d’un suivi psychiatrique régulier.\n\nCette attestation est délivrée pour faire valoir ce que de droit.`;
  }

  return `Je soussigné certifie avoir examiné ${g.civility}.\n\nÉtat clinique\n\n${buildExamMental(doc)}\n\nCe document est établi à la demande de l’intéressé${g.male ? "" : "e"}.`;
}

function buildMail(doc = document) {
  const subtype = state.subType || "réponse simple";
  const recipient = text("letterRecipient", doc);
  const subject = text("letterSubject", doc) || subtype;
  const formality = text("mailFormality", doc) || "Bonjour,";
  const context = text("mailContext", doc);
  const goal = text("mailActionGoal", doc);
  const content = text("mailMainContent", doc);

  const lines = [];
  lines.push(`Objet : ${subject}`);
  lines.push("");
  lines.push(formality);
  lines.push("");

  if (recipient) {
    lines.push(`À l’attention de ${recipient},`);
    lines.push("");
  }

  if (context) lines.push(sentence(context));
  if (goal) lines.push(sentence(goal));
  if (content) lines.push(sentence(content));

  if (!context && !goal && !content) {
    lines.push(`Je reviens vers vous concernant ${subtype}.`);
  }

  lines.push("");
  lines.push("Bien à vous.");

  return lines.join("\n");
}

/* =========================================================
   QUESTIONNAIRES
========================================================= */

function buildQuestionnaire(doc = document) {
  if (state.type === "administratif" && state.subType === "rapport mutuelle") {
    return buildQuestionnaireForMutuelle();
  }
  return buildQuestionnaireGeneric(doc);
}

/* =========================================================
   GÉNÉRATEUR CENTRAL
========================================================= */

function generateMainContent(doc = document) {
  if (state.output === "questionnaire") {
    return buildQuestionnaire(doc);
  }

  if (state.output === "todo") {
    return buildTodoText(doc);
  }

  switch (state.type) {
    case "consultation":
      return buildConsultation(doc);
    case "urgences":
      return buildUrgences(doc);
    case "hospitalisation":
      return buildHospitalisation(doc);
    case "préadmission":
      return buildPreadmission(doc);
    case "administratif":
      return buildAdministrative(doc);
    case "mail":
      return buildMail(doc);
    default:
      return buildConsultation(doc);
  }
}

function generateLetterContent(doc = document) {
  return buildMail(doc);
}

function generateAdaptationAppendix(doc = document) {
  const sections = [];

  const context = text("mainContext", doc);
  if (context) sections.push(`Contexte actualisé : ${sentence(context)}`);

  const exam = buildExamMental(doc);
  if (exam) sections.push(`Examen clinique actualisé : ${exam}`);

  const treatment = buildTreatment(doc);
  if (treatment) sections.push(`Traitement / adaptation : ${treatment}`);

  const plan = text("mainPlan", doc);
  if (plan) sections.push(`Plan / recommandations : ${sentence(plan)}`);

  if (!sections.length) {
    sections.push("Mise à jour clinique sans élément complémentaire significatif à ce stade.");
  }

  return `Adaptation / mise à jour\n\n${sections.join("\n\n")}`;
}

/* =========================================================
   CALLBACKS DOCUMENTAIRES
========================================================= */

async function handleRegenerateCurrent({ kind }) {
  if (kind === DOCUMENT_KIND.LETTER) {
    return generateLetterContent(document);
  }
  return generateMainContent(document);
}

async function handleAppendCurrent() {
  return generateAdaptationAppendix(document);
}

/* =========================================================
   BINDINGS GÉNÉRATION
========================================================= */

function bindAlcoholCalculator(doc = document) {
  $("btnCalcAlcoholUnits", doc)?.addEventListener("click", async () => {
    calculateAlcoholUnits(doc);
    renderAlcoholUnits(doc);
    await regenerateCurrentDocument(doc);
  });
}

function bindWithdrawal(doc = document) {
  $("btnBuildWithdrawal", doc)?.addEventListener("click", async () => {
    buildWithdrawalPlan(doc);
    renderWithdrawalPlan(doc);
    await regenerateCurrentDocument(doc);
  });

  $("btnPrintWithdrawal", doc)?.addEventListener("click", () => {
    const content = text("withdrawOutput", doc) || state.withdrawalPlanText || "";
    if (!content) return;

    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    printWindow.document.write(`
      <html>
      <head><title>Schéma de sevrage</title></head>
      <body style="font-family: Arial, sans-serif; white-space: pre-wrap; padding: 24px;">
${content.replace(/</g, "&lt;")}
      </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  });
}

function bindTodo(doc = document) {
  $("btnDistributeTasks", doc)?.addEventListener("click", async () => {
    parseInboxTasks(doc);
    renderTodoPanel(doc);
    await regenerateCurrentDocument(doc);
  });

  $("btnSpinRoulette", doc)?.addEventListener("click", () => {
    const active = state.taskItems.filter(t => !t.done);
    if (!active.length) {
      alert("Aucune tâche disponible.");
      return;
    }
    const pick = active[Math.floor(Math.random() * active.length)];
    alert(`👉 Fais ça maintenant :\n\n${pick.title}`);
  });

  $("btnOneMicroTask", doc)?.addEventListener("click", () => {
    const pool = state.taskItems.filter(t => !t.done).filter(t =>
      ["mail", "appel", "administratif"].some(x => (t.type || []).includes(x))
    );

    const source = pool.length ? pool : state.taskItems.filter(t => !t.done);
    if (!source.length) {
      alert("Aucune tâche disponible.");
      return;
    }

    const pick = source[Math.floor(Math.random() * source.length)];
    alert(`👉 Micro-action :\n\n${pick.title}`);
  });
}

/* =========================================================
   INIT
========================================================= */

export function initializeGeneratorModule(doc = document) {
  registerDocumentGeneratorCallbacks({
    regenerateCurrent: handleRegenerateCurrent,
    appendCurrent: handleAppendCurrent
  });

  bindAlcoholCalculator(doc);
  bindWithdrawal(doc);
  bindTodo(doc);

  renderAlcoholUnits(doc);
  renderWithdrawalPlan(doc);
  renderTodoPanel(doc);
}

function bootstrap(doc = document) {
  initializeUIModule(doc);
  initializeGeneratorModule(doc);

  window.setTimeout(async () => {
    await regenerateCurrentDocument(doc);
    renderAlcoholUnits(doc);
    renderWithdrawalPlan(doc);
    renderTodoPanel(doc);
    refreshEditorTargetFromState(doc);
  }, 40);
}

document.addEventListener("DOMContentLoaded", () => {
  bootstrap(document);
});
