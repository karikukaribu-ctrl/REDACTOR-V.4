// =========================
// REDACTOR — SCRIPT V13
// Compatible avec le HTML V12 fourni juste avant
// =========================

const state = {
  type: "consultation",
  mode: "complet",
  mseMode: "complet",
  gender: "femme",

  symptoms: new Set(),
  plans: new Set(),

  alcohol: {
    enabled: false,
    type: "",
    quantity: "",
    lastUse: "",
    started: "",
    function: "",
    social: "",
    other: "",
    withdrawalHistory: "",
    withdrawalPlanned: "",
    detoxDrug: "Valium",
    detoxStartDate: "",
    detoxStartDose: "",
    detoxDays: ""
  },

  mse: {
    orientation: "",
    contact: "",
    presentation: "",
    collaboration: "",
    psychomotor: "",
    mood: "",
    anxiety: "",
    thought: "",
    reality: "",
    trauma: "",
    suicidal: "",
    attemptHistory: "",
    behavior: "",
    sleep: "",
    appetite: ""
  },

  todo: {
    blocks: [],
    notes: ""
  }
};

const OPTIONS = {
  types: [
    { value: "consultation", label: "consultation" },
    { value: "urgence", label: "urgence" },
    { value: "hospitalisation", label: "hospitalisation" },
    { value: "preadmission", label: "préadmission" },
    { value: "mail", label: "mail" },
    { value: "attestation", label: "attestation" }
  ],

  modes: [
    { value: "rapide", label: "rapide" },
    { value: "complet", label: "complet" }
  ],

  mseModes: [
    { value: "rapide", label: "rapide" },
    { value: "complet", label: "complet" }
  ],

  symptoms: [
    "anxiété",
    "ruminations",
    "anhédonie",
    "aboulie",
    "fatigue",
    "insomnie",
    "hypervigilance",
    "irritabilité",
    "ralentissement",
    "repli",
    "idées noires",
    "tension interne"
  ],

  plans: [
    "poursuite du suivi",
    "adaptation thérapeutique",
    "hospitalisation à discuter",
    "réévaluation rapide",
    "soutien ambulatoire",
    "coordination réseau",
    "travail psychoéducatif",
    "plan de crise"
  ],

  todoPresets: {
    "matin standard": [
      "Relire les dossiers prioritaires",
      "Faire les consultations prévues",
      "Rédiger les notes immédiatement après",
      "Répondre aux messages urgents"
    ],
    "après-midi administratif": [
      "Rédiger les rapports prioritaires",
      "Faire les attestations / certificats",
      "Passer les appels nécessaires",
      "Clôturer quelques dossiers"
    ],
    "préadmissions sevrage": [
      "Relire les demandes",
      "Évaluer les consommations",
      "Rédiger les conclusions",
      "Transmettre les décisions"
    ]
  }
};

// =========================
// HELPERS
// =========================

function $(id) {
  return document.getElementById(id);
}

function escapeHtml(str = "") {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function joinNatural(items) {
  const arr = items.filter(Boolean);
  if (!arr.length) return "";
  if (arr.length === 1) return arr[0];
  if (arr.length === 2) return `${arr[0]} et ${arr[1]}`;
  return `${arr.slice(0, -1).join(", ")} et ${arr[arr.length - 1]}`;
}

function sentence(s) {
  const t = String(s || "").trim();
  if (!t) return "";
  return /[.!?]$/.test(t) ? t : `${t}.`;
}

function capitalize(s) {
  const t = String(s || "").trim();
  return t ? t.charAt(0).toUpperCase() + t.slice(1) : "";
}

function gp() {
  const f = state.gender === "femme";
  return {
    patient: f ? "patiente" : "patient",
    Patient: f ? "Patiente" : "Patient",
    vu: f ? "vue" : "vu",
    orienté: f ? "orientée" : "orienté",
    hospitalisé: f ? "hospitalisée" : "hospitalisé",
    calme: f ? "calme et collaborante" : "calme et collaborant"
  };
}

function activeClass(condition) {
  return condition ? "active" : "";
}

// =========================
// SIDEBAR / UI
// =========================

function toggleSidebar() {
  $("sidebar").classList.toggle("hidden");
  document.body.classList.toggle("sidebar-collapsed");
}

function renderChoiceGroup(containerId, items, activeValueOrSet, clickHandlerName) {
  const container = $(containerId);
  if (!container) return;

  container.innerHTML = items
    .map((item) => {
      const value = typeof item === "string" ? item : item.value;
      const label = typeof item === "string" ? item : item.label;
      const isActive =
        activeValueOrSet instanceof Set
          ? activeValueOrSet.has(value)
          : activeValueOrSet === value;

      return `
        <button
          class="chip ${activeClass(isActive)}"
          type="button"
          onclick="${clickHandlerName}('${escapeHtml(value).replaceAll("'", "\\'")}')"
        >${escapeHtml(label)}</button>
      `;
    })
    .join("");
}

function renderAllChoices() {
  renderChoiceGroup("typeChoices", OPTIONS.types, state.type, "setType");
  renderChoiceGroup("modeChoices", OPTIONS.modes, state.mode, "setMode");
  renderChoiceGroup("mseChoices", OPTIONS.mseModes, state.mseMode, "setMseMode");
  renderChoiceGroup("symptomChoices", OPTIONS.symptoms, state.symptoms, "toggleSymptom");
  renderChoiceGroup("planChoices", OPTIONS.plans, state.plans, "togglePlan");
}

function setType(value) {
  state.type = value;
  renderAllChoices();
  liveRefresh();
}

function setMode(value) {
  state.mode = value;
  renderAllChoices();
  liveRefresh();
}

function setMseMode(value) {
  state.mseMode = value;
  renderAllChoices();
  liveRefresh();
}

function setGender(value) {
  state.gender = value;
  liveRefresh();
}

function toggleSymptom(value) {
  if (state.symptoms.has(value)) state.symptoms.delete(value);
  else state.symptoms.add(value);

  // auto-cohérences utiles
  if (value === "anhédonie" && !state.mse.mood) {
    state.mse.mood = "humeur abaissée";
  }
  if (value === "insomnie" && !state.mse.sleep) {
    state.mse.sleep = "sommeil perturbé";
  }
  if (value === "anxiété" && !state.mse.anxiety) {
    state.mse.anxiety = "anxiété diffuse";
  }
  if (value === "ruminations" && !state.mse.anxiety) {
    state.mse.anxiety = "anxiété avec ruminations";
  }
  if (value === "idées noires" && !state.mse.suicidal) {
    state.mse.suicidal = "présence d’idées noires";
  }

  renderAllChoices();
  liveRefresh();
}

function togglePlan(value) {
  if (state.plans.has(value)) state.plans.delete(value);
  else state.plans.add(value);

  renderAllChoices();
  liveRefresh();
}

// =========================
// MODALS
// =========================

function ensureModals() {
  if ($("dynamic-modals")) return;

  const wrapper = document.createElement("div");
  wrapper.id = "dynamic-modals";
  wrapper.innerHTML = `
    <div id="alcool" class="modal hidden">
      <div class="modal-box">
        <h3>Consommation alcool</h3>
        <input id="modal_alcohol_type" placeholder="Type d’alcool">
        <input id="modal_alcohol_quantity" placeholder="Quantité / jour">
        <input id="modal_alcohol_lastUse" placeholder="Date dernière consommation">
        <input id="modal_alcohol_started" placeholder="Début de consommation">
        <input id="modal_alcohol_function" placeholder="Fonction selon le patient">
        <input id="modal_alcohol_social" placeholder="Sociale / non sociale / mixte">
        <input id="modal_alcohol_withdrawalHistory" placeholder="ATCD de sevrage">
        <input id="modal_alcohol_withdrawalPlanned" placeholder="Type de sevrage envisagé">

        <h3 style="margin-top:14px;">Schéma de sevrage</h3>
        <select id="modal_detox_drug">
          <option>Valium</option>
          <option>Temesta</option>
        </select>
        <input id="modal_detox_startDate" placeholder="Date de départ">
        <input id="modal_detox_startDose" placeholder="Dose de départ">
        <input id="modal_detox_days" placeholder="Nombre de jours">

        <textarea id="modal_alcohol_other" placeholder="Autres détails"></textarea>

        <div class="modal-actions">
          <button type="button" onclick="closeModal('alcool')">annuler</button>
          <button type="button" onclick="saveAlcoholModal()">valider</button>
        </div>
      </div>
    </div>

    <div id="mse" class="modal hidden">
      <div class="modal-box">
        <h3>Examen mental détaillé</h3>
        <input id="modal_mse_orientation" placeholder="Orientation">
        <input id="modal_mse_contact" placeholder="Contact">
        <input id="modal_mse_presentation" placeholder="Présentation">
        <input id="modal_mse_collaboration" placeholder="Collaboration">
        <input id="modal_mse_psychomotor" placeholder="Psychomotricité">
        <input id="modal_mse_mood" placeholder="Humeur">
        <input id="modal_mse_anxiety" placeholder="Anxiété">
        <input id="modal_mse_thought" placeholder="Pensée / discours">
        <input id="modal_mse_reality" placeholder="Rapport à la réalité / délire">
        <input id="modal_mse_trauma" placeholder="Éléments traumatiques">
        <input id="modal_mse_suicidal" placeholder="Idées noires">
        <input id="modal_mse_attemptHistory" placeholder="ATCD de passage à l’acte">
        <input id="modal_mse_behavior" placeholder="Comportement">
        <input id="modal_mse_sleep" placeholder="Sommeil">
        <input id="modal_mse_appetite" placeholder="Alimentation / appétit">

        <div class="modal-actions">
          <button type="button" onclick="closeModal('mse')">annuler</button>
          <button type="button" onclick="saveMseModal()">valider</button>
        </div>
      </div>
    </div>

    <div id="todo" class="modal hidden">
      <div class="modal-box">
        <h3>To do list</h3>
        <select id="modal_todo_preset">
          <option value="">preset…</option>
          ${Object.keys(OPTIONS.todoPresets).map(x => `<option value="${escapeHtml(x)}">${escapeHtml(x)}</option>`).join("")}
        </select>
        <textarea id="modal_todo_notes" placeholder="Une ligne par tâche"></textarea>

        <div class="modal-actions">
          <button type="button" onclick="closeModal('todo')">annuler</button>
          <button type="button" onclick="saveTodoModal()">valider</button>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(wrapper);

  $("modal_todo_preset").addEventListener("change", (e) => {
    const preset = e.target.value;
    if (!preset) return;
    $("modal_todo_notes").value = OPTIONS.todoPresets[preset].join("\n");
  });
}

function openModal(id) {
  ensureModals();
  populateModalValues(id);
  $(id).classList.remove("hidden");
}

function closeModal(id) {
  const el = $(id);
  if (el) el.classList.add("hidden");
}

function populateModalValues(id) {
