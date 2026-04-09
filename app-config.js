const STORAGE_KEY = "psychnote_studio_v2";

const state = {
  type: "administratif",
  subType: "Rapport mutuelle",
  mode: "complet",
  output: "texte",
  font: "inter",
  gender: "femme",
  civility: "auto",
  selected: {},
  todoSet: "",
  withdrawalPlanText: ""
};

const OPTIONS = {
  type: ["consultation", "urgences", "hospitalisation", "préadmission", "administratif", "mail"],
  subTypes: {
    consultation: ["Première consultation", "Suivi", "Note courte", "Courrier médecin traitant", "Consultation de crise", "Avis diagnostique"],
    urgences: ["Évaluation urgences", "Décision / orientation"],
    hospitalisation: ["Admission", "Semaine 1", "Semaine 2", "Évolution intermédiaire", "Sortie", "Synthèse d’hospitalisation"],
    préadmission: ["Évaluation de préadmission", "Conclusion d’indication"],
    administratif: ["Rapport mutuelle", "Rapport assurance / autre", "Attestation simple", "Attestation de présence", "Attestation de suivi", "Certificat médical", "Certificat incapacité", "Certificat circonstancié simple"],
    mail: ["Réponse simple", "Réponse patient", "Réponse médecin / confrère", "Transmission clinique brève", "Relance", "Confirmation de rendez-vous"]
  },
  mode: ["rapide", "complet"],
  output: ["texte", "questionnaire"],
  font: ["inter", "mono", "serif"],
  gender: ["femme", "homme"],
  civility: ["auto", "madame", "monsieur"],

  mutDxChoices: [
    "trouble anxio-dépressif persistant",
    "trouble anxio-dépressif",
    "dépression chronique",
    "trouble dépressif caractérisé",
    "trouble anxieux généralisé",
    "symptomatologie anxio-dépressive",
    "trouble de l’adaptation avec humeur anxio-dépressive"
  ],
  mutInitialChoices: [
    "une anxiété envahissante",
    "une anhédonie marquée",
    "une perte d’élan vital",
    "des idées noires intermittentes",
    "des troubles du sommeil",
    "un isolement social important",
    "des ruminations anxieuses",
    "une fatigabilité importante",
    "des difficultés de concentration",
    "un ralentissement global"
  ],
  mutCurrentChoices: [
    "une symptomatologie anxieuse persistante",
    "une anhédonie encore marquée",
    "des ruminations envahissantes",
    "une fatigabilité importante",
    "des troubles du sommeil",
    "une baisse de l’élan",
    "des difficultés de concentration",
    "une fragilité clinique persistante",
    "une amélioration seulement partielle"
  ],
  mutWorkCompatChoices: [
    "compatible",
    "partiellement compatible",
    "non compatible"
  ],
  mutFunctionChoices: [
    "altération de la concentration",
    "altération de l’organisation",
    "fatigabilité importante",
    "difficulté à maintenir un rythme soutenu",
    "difficulté d’adaptation au cadre professionnel",
    "retentissement fonctionnel global"
  ],
  mutConclusionChoices: [
    "poursuite du traitement encouragée",
    "poursuite du suivi psychiatrique encouragée",
    "réévaluation ultérieure recommandée",
    "je reste à disposition pour de plus amples informations"
  ],

  planChoices: [
    "poursuite du suivi psychiatrique",
    "surveillance clinique",
    "évaluation addictologique",
    "travail psychoéducatif",
    "coordination avec le réseau",
    "contact familial si accord",
    "adaptation thérapeutique",
    "préparation de sortie",
    "plan de crise",
    "proposer hospitalisation",
    "mise en sécurité",
    "réévaluation rapide",
    "soutien ambulatoire",
    "orientation psychothérapie"
  ],

  mseModeChoices: ["rapide", "complet"],
  mseOrientationChoices: ["bien orienté dans le temps et l’espace", "partiellement désorienté", "désorienté"],
  mseContactChoices: ["contact adéquat", "contact distant", "contact méfiant", "contact fuyant", "contact engageant"],
  msePresentationChoices: ["présentation soignée", "présentation correcte", "présentation négligée"],
  mseCollaborationChoices: ["bonne collaboration", "collaboration partielle", "collaboration limitée"],
  msePsychomotorChoices: ["absence de ralentissement psychomoteur", "ralentissement psychomoteur", "agitation psychomotrice"],
  mseMoodChoices: ["humeur triste", "humeur anxieuse", "humeur abaissée", "humeur irritable", "humeur fragile", "humeur stable"],
  mseAnxietyChoices: ["anxiété diffuse", "ruminations anxieuses", "tension interne", "angoisse majeure", "hypervigilance"],
  mseThoughtChoices: ["discours cohérent", "pensée organisée", "ruminations", "pas d’élément délirant", "éléments délirants", "pas de désorganisation", "éléments traumatiques"],
  mseTraumaChoices: ["hypervigilance", "reviviscences", "évitement", "pas d’élément traumatique mis en avant"],
  riskIdeasChoices: ["absence", "passives", "actives"],
  riskAttemptChoices: ["pas d’antécédent de passage à l’acte", "antécédent(s) de passage à l’acte"],
  mseBehaviorChoices: ["comportement adapté", "attitude de retrait", "évitement", "agitation", "coopérant"],
  mseSleepChoices: ["sommeil conservé", "insomnie", "réveils nocturnes", "sommeil non réparateur", "endormissement difficile"],
  mseFoodChoices: ["alimentation conservée", "appétit diminué", "alimentation irrégulière"],

  careTypeChoices: [
    "suivi psychiatrique régulier",
    "psychothérapie",
    "prise en charge pluridisciplinaire",
    "centre de jour",
    "accompagnement ambulatoire"
  ],
  medicationPresenceChoices: [
    "sans traitement médicamenteux",
    "avec traitement médicamenteux en cours"
  ],
  medClassChoices: [
    "ISRS",
    "IRSNa",
    "antipsychotique",
    "benzodiazépine",
    "hypnotique",
    "autre"
  ],
  medMoleculeChoices: [
    "sertraline",
    "escitalopram",
    "fluoxétine",
    "venlafaxine",
    "duloxétine",
    "aripiprazole",
    "quétiapine",
    "olanzapine",
    "trazodone",
    "diazépam",
    "lorazépam"
  ],

  psyWorkChoices: [
    "travail",
    "arrêt de travail",
    "incapacité",
    "chômage",
    "sans activité",
    "études"
  ],
  psyIncomeChoices: [
    "salaire",
    "mutuelle",
    "chômage",
    "CPAS",
    "revenus à préciser"
  ],
  psyFamilyChoices: [
    "vit seul",
    "vit en couple",
    "soutien familial",
    "conflits familiaux",
    "enfants à charge",
    "réseau limité"
  ],
  psyHousingChoices: [
    "logement stable",
    "hébergé",
    "chez les parents",
    "logement instable",
    "institution"
  ],

  alcTypeChoices: ["bière", "vin", "alcool fort", "mixte"],
  alcPatternChoices: ["quotidien", "épisodique", "binge", "majoré le soir", "avec consommation matinale"],
  alcFunctionChoices: ["anxiolytique", "sommeil", "socialisation", "gestion émotion", "habitude", "solitude"],
  alcDependenceChoices: ["craving", "perte de contrôle", "tolérance", "symptômes de sevrage", "retentissement social", "retentissement professionnel"],
  alcWithdrawalChoices: ["ambulatoire", "hospitalier", "sevrage simple", "sevrage compliqué", "DT", "convulsions"],

  otherSubstanceChoices: ["cannabis", "cocaïne", "benzodiazépines", "opiacés", "tabac", "autres"],
  otherSubstanceFunctionChoices: ["anxiolytique", "stimulation", "sommeil", "gestion émotion", "habitude"],

  presets: [
    "Rapport mutuelle anxio-dépressif",
    "Rapport mutuelle dépression chronique",
    "Sevrage alcool simple",
    "Crise suicidaire"
  ]
};

const MULTI = new Set([
  "mutDxChoices","mutInitialChoices","mutCurrentChoices","mutFunctionChoices","mutConclusionChoices",
  "planChoices",
  "mseOrientationChoices","mseContactChoices","msePresentationChoices","mseCollaborationChoices","msePsychomotorChoices","mseMoodChoices","mseAnxietyChoices","mseThoughtChoices","mseTraumaChoices","riskAttemptChoices","mseBehaviorChoices","mseSleepChoices","mseFoodChoices",
  "careTypeChoices","medicationPresenceChoices","medClassChoices","medMoleculeChoices",
  "psyWorkChoices","psyIncomeChoices","psyFamilyChoices","psyHousingChoices",
  "alcTypeChoices","alcPatternChoices","alcFunctionChoices","alcDependenceChoices","alcWithdrawalChoices",
  "otherSubstanceChoices","otherSubstanceFunctionChoices",
  "planChoices"
]);

for(const key of MULTI){
  state.selected[key] = [];
}
state.selected.mutWorkCompatChoices = "";
state.selected.mseModeChoices = "complet";
state.selected.riskIdeasChoices = "";
state.selected.gender = state.gender;
state.selected.civility = state.civility;

const $ = (id) => document.getElementById(id);

function cleanText(s){
  return (s || "").replace(/\s+/g, " ").trim();
}

function sentence(s){
  const t = cleanText(s);
  if(!t) return "";
  return /[.!?]$/.test(t) ? t : t + ".";
}

function titleCase(s){
  if(!s) return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function cap(s){
  const t = cleanText(s);
  return t ? t.charAt(0).toUpperCase() + t.slice(1) : "";
}

function joinClinical(arr){
  const items = (arr || []).filter(Boolean);
  if(!items.length) return "";
  if(items.length === 1) return items[0];
  if(items.length === 2) return `${items[0]} et ${items[1]}`;
  return `${items.slice(0, -1).join(", ")} et ${items[items.length - 1]}`;
}

function pick(arr){
  return arr[Math.floor(Math.random() * arr.length)];
}

function genderPack(){
  const isMale = state.gender === "homme";
  const civ = state.civility === "auto"
    ? (isMale ? "Monsieur" : "Madame")
    : (state.civility === "monsieur" ? "Monsieur" : "Madame");

  return {
    isMale,
    civ,
    patient: isMale ? "patient" : "patiente",
    Patient: isMale ? "Patient" : "Patiente",
    orienté: isMale ? "orienté" : "orientée",
    suivi: isMale ? "suivi" : "suivie",
    présenté: isMale ? "présenté" : "présentée"
  };
}

function getPatientLabel(){
  const g = genderPack();
  const name = cleanText($("patientName").value);
  return name ? `${g.civ} ${name}` : g.civ;
}

function setToday(){
  const d = new Date();
  const p = n => String(n).padStart(2, "0");
  const val = `${d.getFullYear()}-${p(d.getMonth()+1)}-${p(d.getDate())}`;
  $("docDate").value = val;
  $("withdrawStartDate").value = val;
}

function renderMenu(id, options, current, targetKey){
  $(id).innerHTML = options.map(opt => `
    <button class="menu-item ${current === opt ? "active" : ""}" type="button" data-menu-key="${targetKey}" data-value="${opt}">
      ${titleCase(opt)}
    </button>
  `).join("");
}

function renderTokens(id, options, key, single=false){
  const el = $(id);
  if(!el) return;

  const current = state.selected[key];

  el.innerHTML = options.map(opt => {
    const active = single
      ? current === opt
      : (current || []).includes(opt);

    return `<button class="token ${active ? "active" : ""}" type="button" data-token-key="${key}" data-value="${opt}" data-single="${single ? "1" : "0"}">${opt}</button>`;
  }).join("");
}

function renderUI(){
  $("typeDisplay").textContent = state.type;
  $("subTypeDisplay").textContent = state.subType;
  $("modeDisplay").textContent = state.mode;
  $("outputDisplay").textContent = state.output;
  $("fontDisplay").textContent = state.font;

  $("metaType").textContent = state.type;
  $("metaSubType").textContent = state.subType;
  $("metaMode").textContent = state.mode;

  renderMenu("menuType", OPTIONS.type, state.type, "type");
  renderMenu("menuSubType", OPTIONS.subTypes[state.type], state.subType, "subType");
  renderMenu("menuMode", OPTIONS.mode, state.mode, "mode");
  renderMenu("menuOutput", OPTIONS.output, state.output, "output");
  renderMenu("menuFont", OPTIONS.font, state.font, "font");

  renderTokens("genderChoices", OPTIONS.gender, "gender", true);
  renderTokens("civilityChoices", OPTIONS.civility, "civility", true);

  renderTokens("mutDxChoices", OPTIONS.mutDxChoices, "mutDxChoices");
  renderTokens("mutInitialChoices", OPTIONS.mutInitialChoices, "mutInitialChoices");
  renderTokens("mutCurrentChoices", OPTIONS.mutCurrentChoices, "mutCurrentChoices");
  renderTokens("mutWorkCompatChoices", OPTIONS.mutWorkCompatChoices, "mutWorkCompatChoices", true);
  renderTokens("mutFunctionChoices", OPTIONS.mutFunctionChoices, "mutFunctionChoices");
  renderTokens("mutConclusionChoices", OPTIONS.mutConclusionChoices, "mutConclusionChoices");

  renderTokens("planChoices", OPTIONS.planChoices, "planChoices");

  renderTokens("mseModeChoices", OPTIONS.mseModeChoices, "mseModeChoices", true);
  renderTokens("mseOrientationChoices", OPTIONS.mseOrientationChoices, "mseOrientationChoices");
  renderTokens("mseContactChoices", OPTIONS.mseContactChoices, "mseContactChoices");
  renderTokens("msePresentationChoices", OPTIONS.msePresentationChoices, "msePresentationChoices");
  renderTokens("mseCollaborationChoices", OPTIONS.mseCollaborationChoices, "mseCollaborationChoices");
  renderTokens("msePsychomotorChoices", OPTIONS.msePsychomotorChoices, "msePsychomotorChoices");
  renderTokens("mseMoodChoices", OPTIONS.mseMoodChoices, "mseMoodChoices");
  renderTokens("mseAnxietyChoices", OPTIONS.mseAnxietyChoices, "mseAnxietyChoices");
  renderTokens("mseThoughtChoices", OPTIONS.mseThoughtChoices, "mseThoughtChoices");
  renderTokens("mseTraumaChoices", OPTIONS.mseTraumaChoices, "mseTraumaChoices");
  renderTokens("riskIdeasChoices", OPTIONS.riskIdeasChoices, "riskIdeasChoices", true);
  renderTokens("riskAttemptChoices", OPTIONS.riskAttemptChoices, "riskAttemptChoices");
  renderTokens("mseBehaviorChoices", OPTIONS.mseBehaviorChoices, "mseBehaviorChoices");
  renderTokens("mseSleepChoices", OPTIONS.mseSleepChoices, "mseSleepChoices");
  renderTokens("mseFoodChoices", OPTIONS.mseFoodChoices, "mseFoodChoices");

  renderTokens("careTypeChoices", OPTIONS.careTypeChoices, "careTypeChoices");
  renderTokens("medicationPresenceChoices", OPTIONS.medicationPresenceChoices, "medicationPresenceChoices");
  renderTokens("medClassChoices", OPTIONS.medClassChoices, "medClassChoices");
  renderTokens("medMoleculeChoices", OPTIONS.medMoleculeChoices, "medMoleculeChoices");

  renderTokens("psyWorkChoices", OPTIONS.psyWorkChoices, "psyWorkChoices");
  renderTokens("psyIncomeChoices", OPTIONS.psyIncomeChoices, "psyIncomeChoices");
  renderTokens("psyFamilyChoices", OPTIONS.psyFamilyChoices, "psyFamilyChoices");
  renderTokens("psyHousingChoices", OPTIONS.psyHousingChoices, "psyHousingChoices");

  renderTokens("alcTypeChoices", OPTIONS.alcTypeChoices, "alcTypeChoices");
  renderTokens("alcPatternChoices", OPTIONS.alcPatternChoices, "alcPatternChoices");
  renderTokens("alcFunctionChoices", OPTIONS.alcFunctionChoices, "alcFunctionChoices");
  renderTokens("alcDependenceChoices", OPTIONS.alcDependenceChoices, "alcDependenceChoices");
  renderTokens("alcWithdrawalChoices", OPTIONS.alcWithdrawalChoices, "alcWithdrawalChoices");

  renderTokens("otherSubstanceChoices", OPTIONS.otherSubstanceChoices, "otherSubstanceChoices");
  renderTokens("otherSubstanceFunctionChoices", OPTIONS.otherSubstanceFunctionChoices, "otherSubstanceFunctionChoices");

  $("presetWrap").innerHTML = OPTIONS.presets.map(p => `<button class="token" type="button" data-preset="${p}">${p}</button>`).join("");

  applyFont();
  computeWarnings();
}

function applyFont(){
  document.body.classList.remove("font-inter", "font-mono", "font-serif");
  document.body.classList.add(`font-${state.font}`);
}

function closeMenus(){
  document.querySelectorAll(".menu").forEach(m => m.classList.add("hidden"));
}

function positionMenu(menu, button){
  const rect = button.getBoundingClientRect();
  menu.style.left = `${Math.max(10, rect.left)}px`;
}

function toggleMenu(menuId, button){
  const menu = $(menuId);
  const opening = menu.classList.contains("hidden");
  closeMenus();
  if(opening){
    positionMenu(menu, button);
    menu.classList.remove("hidden");
  }
}

function updateTokenState(key, value, single){
  if(single){
    state.selected[key] = value;
    if(key === "gender") state.gender = value;
    if(key === "civility") state.civility = value;
  } else {
    const arr = state.selected[key] || [];
    const i = arr.indexOf(value);
    if(i >= 0) arr.splice(i, 1);
    else arr.push(value);
    state.selected[key] = arr;
  }
  renderUI();
  regenerate();
}

function updateMenuState(key, value){
  state[key] = value;
  if(key === "type"){
    state.subType = OPTIONS.subTypes[state.type][0];
  }
  renderUI();
  regenerate();
}

function inferDSM(){
  const dx = [];
  const hasDep = state.selected.mutDxChoices.some(x =>
    x.includes("dépress") || x.includes("anxio-dépress")
  ) || cleanText($("mutDxFree").value).toLowerCase().includes("dépress");

  const hasAnx = state.selected.mutDxChoices.some(x =>
    x.includes("anxieux") || x.includes("anxio")
  );

  const hasAlcohol = cleanText($("alcQty").value) || state.selected.alcDependenceChoices.length;

  if(hasDep && hasAnx){
    dx.push("Symptomatologie anxio-dépressive persistante");
  } else if(hasDep){
    dx.push("Trouble dépressif caractérisé / dépression chronique probable");
  } else if(hasAnx){
    dx.push("Trouble anxieux probable");
  }

  if(hasAlcohol){
    dx.push("Trouble lié à l’usage d’alcool à considérer");
  }

  if(!dx.length){
    dx.push("Éléments cliniques à préciser");
  }

  return dx.join(" ; ");
}

function suggestMedication(){
  const recos = [];
  const medPresent = state.selected.medicationPresenceChoices.includes("avec traitement médicamenteux en cours");
  const dx = [...state.selected.mutDxChoices, cleanText($("mutDxFree").value)].join(" ").toLowerCase();

  if(dx.includes("dépress") || dx.includes("anxio-dépress")){
    recos.push("ISRS en première intention selon tolérance et antécédents");
  }

  if(dx.includes("anxieux")){
    recos.push("approche non pharmacologique et/ou antidépresseur si persistance");
  }

  if(state.selected.mseSleepChoices.some(x => x.includes("insomnie") || x.includes("sommeil non réparateur"))){
    recos.push("molécule à visée hypnotique possible selon le contexte");
  }

  if(cleanText($("alcQty").value)){
    recos.push("prudence avec les benzodiazépines hors cadre de sevrage structuré");
  }

  if(medPresent && !recos.length){
    recos.push("traitement en cours à poursuivre et réévaluer cliniquement");
  }

  return recos;
}

function buildPsychosocialText(){
  const chunks = [];

  if(state.selected.psyWorkChoices.length) chunks.push(`situation professionnelle : ${joinClinical(state.selected.psyWorkChoices)}`);
  if(state.selected.psyIncomeChoices.length) chunks.push(`revenus : ${joinClinical(state.selected.psyIncomeChoices)}`);
  if(state.selected.psyFamilyChoices.length) chunks.push(`situation familiale : ${joinClinical(state.selected.psyFamilyChoices)}`);
  if(cleanText($("psyChildren").value)) chunks.push(`enfants : ${cleanText($("psyChildren").value)}`);
  if(state.selected.psyHousingChoices.length) chunks.push(`logement : ${joinClinical(state.selected.psyHousingChoices)}`);
  if(cleanText($("psyFree").value)) chunks.push(cleanText($("psyFree").value));

  return chunks.length ? cap(chunks.join(", ")) + "." : "";
}

function buildMSEText(){
  const g = genderPack();
  const s = state.selected;
  const longMode = s.mseModeChoices !== "rapide";

  if(!longMode){
    const bits = [];
    if(s.mseOrientationChoices.length) bits.push(joinClinical(s.mseOrientationChoices));
    if(s.mseContactChoices.length) bits.push(joinClinical(s.mseContactChoices));
    if(s.mseMoodChoices.length) bits.push(joinClinical(s.mseMoodChoices));
    if(s.mseAnxietyChoices.length) bits.push(joinClinical(s.mseAnxietyChoices));
    if(s.mseThoughtChoices.length) bits.push(joinClinical(s.mseThoughtChoices));
    if(s.mseSleepChoices.length) bits.push(joinClinical(s.mseSleepChoices));
    if(s.mseFoodChoices.length) bits.push(joinClinical(s.mseFoodChoices));
    return bits.length ? cap(bits.join(", ")) + "." : `${g.Patient} bien ${g.orienté} dans le temps et l’espace, contact adéquat.`;
  }

  let txt = "";

  txt += s.mseOrientationChoices.length
    ? `${cap(joinClinical(s.mseOrientationChoices))}, `
    : `${g.Patient} bien ${g.orienté} dans le temps et l’espace, `;

  txt += s.mseContactChoices.length
    ? `${joinClinical(s.mseContactChoices)}, `
    : "contact adéquat, ";

  txt += s.msePresentationChoices.length
    ? `${joinClinical(s.msePresentationChoices)}, `
    : "présentation correcte, ";

  txt += s.mseCollaborationChoices.length
    ? `${joinClinical(s.mseCollaborationChoices)}. `
    : "bonne collaboration. ";

  txt += s.msePsychomotorChoices.length
    ? `${cap(joinClinical(s.msePsychomotorChoices))}. `
    : "Absence de ralentissement psychomoteur. ";

  const middle = [];
  if(s.mseMoodChoices.length) middle.push(joinClinical(s.mseMoodChoices));
  if(s.mseAnxietyChoices.length) middle.push(joinClinical(s.mseAnxietyChoices));
  if(s.mseThoughtChoices.length) middle.push(joinClinical(s.mseThoughtChoices));
  if(s.mseTraumaChoices.length) middle.push(joinClinical(s.mseTraumaChoices));
  if(middle.length) txt += `${cap(joinClinical(middle))}. `;

  if(state.selected.riskIdeasChoices){
    if(state.selected.riskIdeasChoices === "absence"){
      txt += "Absence d’idées noires rapportée. ";
    } else if(state.selected.riskIdeasChoices === "passives"){
      txt += "Présence d’idées noires passives. ";
    } else {
      txt += "Présence d’idées suicidaires actives. ";
    }
  }

  if(s.riskAttemptChoices.length){
    txt += `${cap(joinClinical(s.riskAttemptChoices))}. `;
  }

  txt += s.mseBehaviorChoices.length
    ? `${cap(joinClinical(s.mseBehaviorChoices))}. `
    : "Comportement adapté. ";

  txt += s.mseSleepChoices.length
    ? `${cap(joinClinical(s.mseSleepChoices))}. `
    : "Sommeil conservé. ";

  txt += s.mseFoodChoices.length
    ? `${cap(joinClinical(s.mseFoodChoices))}. `
    : "Alimentation conservée. ";

  if(cleanText($("mseFree").value)){
    txt += sentence($("mseFree").value);
  }

  return txt.trim();
}

function buildTreatmentText(){
  const care = state.selected.careTypeChoices;
  const medPresence = state.selected.medicationPresenceChoices;
  const medClass = state.selected.medClassChoices;
  const medMolecules = state.selected.medMoleculeChoices;
  const medDose = cleanText($("medDose").value);
  const raw = cleanText($("treatment").value);

  const chunks = [];

  if(care.length){
    chunks.push(`prise en charge actuelle : ${joinClinical(care)}`);
  }

  if(medPresence.length){
    chunks.push(joinClinical(medPresence));
  }

  if(medClass.length){
    chunks.push(`classe thérapeutique : ${joinClinical(medClass)}`);
  }

  if(medMolecules.length){
    let molTxt = `molécule(s) : ${joinClinical(medMolecules)}`;
    if(medDose) molTxt += ` (${medDose})`;
    chunks.push(molTxt);
  }

  if(raw){
    chunks.push(`traitement résumé : ${raw.replace(/\n/g, "; ")}`);
  }

  return chunks.length ? cap(chunks.join(". ")) + "." : "";
}

function buildConsumptionText(){
  const blocks = [];

  const alcoholParts = [];
  if(state.selected.alcTypeChoices.length) alcoholParts.push(`type ${joinClinical(state.selected.alcTypeChoices)}`);
  if(cleanText($("alcQty").value)) alcoholParts.push(`quantité ${cleanText($("alcQty").value)}`);
  if(state.selected.alcPatternChoices.length) alcoholParts.push(`pattern ${joinClinical(state.selected.alcPatternChoices)}`);
  if(cleanText($("alcLast").value)) alcoholParts.push(`dernière prise ${cleanText($("alcLast").value)}`);
  if(cleanText($("alcStart").value)) alcoholParts.push(`début ${cleanText($("alcStart").value)}`);
  if(cleanText($("alcCharacter").value)) alcoholParts.push(`caractère ${cleanText($("alcCharacter").value)}`);
  if(state.selected.alcFunctionChoices.length) alcoholParts.push(`fonction ${joinClinical(state.selected.alcFunctionChoices)}`);
  if(state.selected.alcDependenceChoices.length) alcoholParts.push(`éléments de dépendance : ${joinClinical(state.selected.alcDependenceChoices)}`);
  if(state.selected.alcWithdrawalChoices.length) alcoholParts.push(`sevrage / ATCD : ${joinClinical(state.selected.alcWithdrawalChoices)}`);
  if(cleanText($("alcFree").value)) alcoholParts.push(cleanText($("alcFree").value));

  if(alcoholParts.length){
    blocks.push("Alcool : " + sentence(alcoholParts.join(", ")));
  }

  const otherParts = [];
  if(state.selected.otherSubstanceChoices.length) otherParts.push(`substances : ${joinClinical(state.selected.otherSubstanceChoices)}`);
  if(state.selected.otherSubstanceFunctionChoices.length) otherParts.push(`fonction : ${joinClinical(state.selected.otherSubstanceFunctionChoices)}`);
  if(cleanText($("otherSubstances").value)) otherParts.push(cleanText($("otherSubstances").value));
  if(otherParts.length){
    blocks.push("Autres consommations : " + sentence(otherParts.join(", ")));
  }

  if(state.withdrawalPlanText){
    blocks.push("Schéma de sevrage :\n" + state.withdrawalPlanText);
                       }
