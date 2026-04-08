const STORAGE_KEY = "psychnote_expert_v1";

const state = {
  type: "consultation",
  subType: "Suivi",
  mode: "complet",
  mseMode: "complet",
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
    mail: ["Réponse simple", "Réponse patient", "Réponse médecin / confrère", "Réponse institution / service social", "Transmission clinique brève", "Relance", "Envoi de document", "Report / reprogrammation", "Confirmation de rendez-vous"]
  },
  mode: ["rapide", "complet"],
  output: ["texte", "questionnaire"],
  font: ["inter", "mono", "serif"],
  gender: ["femme", "homme"],
  civility: ["auto", "madame", "monsieur"],

  reasonChoices: [
    "anxiété",
    "humeur dépressive",
    "crise suicidaire",
    "idéations suicidaires",
    "insomnie",
    "demande de sevrage alcool",
    "consommations problématiques",
    "attaque de panique",
    "souffrance psychosociale",
    "évaluation diagnostique",
    "trouble du comportement",
    "décompensation anxieuse",
    "décompensation thymique",
    "conflit familial",
    "retentissement fonctionnel important"
  ],

  symptomChoices: [
    "ruminations",
    "anhédonie",
    "fatigabilité",
    "hypervigilance",
    "troubles du sommeil",
    "tension interne",
    "irritabilité",
    "aboulie",
    "repli",
    "hallucinations auditives rapportées",
    "angoisse",
    "sentiment d’épuisement",
    "baisse de l’élan",
    "culpabilité",
    "difficultés de concentration"
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

  mseContact: ["adéquat", "distant", "méfiant", "fuyant", "familier", "engageant", "pauvre"],
  mseMood: ["triste", "anxieuse", "irritable", "labilité émotionnelle", "stable", "abaissée", "dysphorique", "fragile"],
  mseAnxiety: ["diffuse", "ruminations", "attaque de panique", "tension interne", "angoisse majeure", "anticipatoire", "hypervigilance"],
  mseThought: ["organisée", "ralentie", "ruminative", "diffluente", "délirante", "cohérente", "sans désorganisation", "centrée sur les difficultés actuelles", "trauma"],
  mseBehavior: ["adapté", "agité", "ralenti", "évitant", "hostile", "impulsif", "contenu", "coopérant", "retrait"],
  mseSleep: ["insomnie", "réveils nocturnes", "hypersomnie", "sommeil non réparateur", "normal", "endormissement difficile", "cauchemars"],
  mseFood: ["normal", "diminution", "augmentation", "irrégulier", "appétit diminué", "appétit conservé"],

  riskIdeas: ["absence", "passives", "actives"],
  riskSeverity: ["faible", "modéré", "élevé"],
  riskProtection: ["famille", "enfants", "suivi médical", "demande d’aide", "projet futur", "foi", "animal de compagnie", "alliance thérapeutique"],

  alcType: ["bière", "vin", "alcool fort", "mixte", "apéritifs", "spiritueux"],
  alcPattern: ["quotidien", "binge", "épisodique", "fluctuant", "majoré le soir", "majoré le week-end", "avec consommation matinale"],
  alcFunction: ["anxiolytique", "aide au sommeil", "socialisation", "gestion émotion", "solitude", "ennui", "habitude", "impulsivité", "couper les pensées", "désinhibition", "automédication"],
  alcDependence: ["craving", "perte de contrôle", "tolérance", "consommation matinale", "symptômes de sevrage", "retentissement social", "retentissement professionnel", "tentatives d’arrêt infructueuses", "augmentation progressive des quantités"],
  alcWithdrawal: ["ambulatoire", "hospitalier", "DT", "convulsions", "échec de sevrage antérieur", "aucun antécédent de sevrage", "sevrage compliqué", "sevrage simple"],

  otherSubstanceChoices: ["cannabis", "cocaïne", "benzodiazépines", "opiacés", "amphétamines", "MDMA", "tabac", "kétamine", "médicaments détournés"],
  otherSubstanceFunctionChoices: ["anxiolytique", "stimulation", "désinhibition", "sommeil", "habitude", "gestion émotion", "socialisation", "automédication"],

  psyHousing: ["seul", "en couple", "chez les parents", "logement instable", "hébergé", "institution", "sans domicile fixe"],
  psyWork: ["travail", "chômage", "mutuelle", "études", "incapacité", "sans activité", "arrêt de travail"],
  psyNetwork: ["bon", "limité", "isolé", "soutien familial", "réseau conflictuel", "réseau ambulatoire présent"],
  psyStress: ["financier", "familial", "professionnel", "isolement", "rupture", "judiciaire", "logement", "précarité", "charge mentale"],

  todoTime: ["lundi matin", "lundi après-midi", "mardi matin", "mardi après-midi", "mercredi matin", "mercredi après-midi", "jeudi matin", "jeudi après-midi", "vendredi matin", "vendredi après-midi"],
  todoType: ["rapport", "mail", "appel", "consultation", "administratif", "organisation", "lecture", "facturation", "préparation réunion", "suivi patient", "clôture dossier", "préadmission sevrage"],
  todoPriority: ["haute", "moyenne", "basse"],

  todoSets: [
    "bloc rapports",
    "bloc mails et réponses",
    "bloc appels",
    "bloc consultations",
    "bloc administratif",
    "bloc organisation",
    "bloc lecture / préparation",
    "bloc facturation",
    "bloc clôture dossiers",
    "bloc préadmissions sevrage",
    "journée psychiatre mixte",
    "demi-journée légère",
    "demi-journée lourde"
  ],

  presets: [
    "Anxio-dépressif",
    "Crise suicidaire",
    "Sevrage alcool simple",
    "Sevrage alcool compliqué",
    "Insomnie / anxiété",
    "Trauma probable"
  ]
};

const TODO_SET_TEMPLATES = {
  "bloc rapports": ["Choisir les dossiers prioritaires", "Relire les notes cliniques", "Rédiger le rapport principal", "Vérifier traitement et plan", "Relire et corriger la version finale", "Envoyer / archiver"],
  "bloc mails et réponses": ["Trier les messages urgents", "Répondre aux patients", "Répondre aux confrères", "Répondre aux institutions", "Vérifier les pièces jointes", "Archiver les échanges traités"],
  "bloc appels": ["Lister les appels à faire", "Appeler les patients prioritaires", "Appeler le réseau / les confrères", "Noter les retours utiles", "Planifier les rappels nécessaires"],
  "bloc consultations": ["Préparer la liste des consultations", "Relire les antécédents rapides", "Faire les consultations", "Rédiger les notes de suivi", "Adapter les plans thérapeutiques"],
  "bloc administratif": ["Trier les documents en attente", "Rédiger attestations / certificats", "Compléter les formulaires", "Vérifier les envois", "Classer les documents"],
  "bloc organisation": ["Lister les urgences de la demi-journée", "Réorganiser l’agenda", "Déplacer les rendez-vous nécessaires", "Préparer les points à ne pas oublier", "Mettre à jour la to do"],
  "bloc lecture / préparation": ["Choisir le texte / article prioritaire", "Lire activement", "Extraire les points utiles", "Préparer le matériel de groupe / staff", "Noter les idées à réutiliser"],
  "bloc facturation": ["Ouvrir la liste des actes", "Encoder les facturations", "Vérifier les oublis", "Contrôler les dossiers incomplets"],
  "bloc clôture dossiers": ["Identifier les dossiers ouverts à clôturer", "Vérifier le dernier contact", "Compléter la note finale", "Archiver / fermer le dossier"],
  "bloc préadmissions sevrage": ["Relire les demandes de préadmission", "Vérifier les consommations", "Évaluer l’indication", "Rédiger la conclusion", "Transmettre la décision"],
  "journée psychiatre mixte": ["Répondre aux messages urgents", "Faire un rapport prioritaire", "Passer les appels essentiels", "Faire la consultation / préadmission prévue", "Traiter un bloc administratif", "Clôturer quelques dossiers"],
  "demi-journée légère": ["Trier les tâches", "Répondre à 3-5 mails", "Faire 1 appel", "Clôturer 1 petit dossier", "Préparer la suite"],
  "demi-journée lourde": ["Choisir 1 tâche majeure", "Faire le rapport prioritaire", "Traiter les mails urgents", "Passer les appels bloquants", "Faire le minimum administratif nécessaire"]
};

const VAR = {
  intro: [
    "Je vois en consultation de psychiatrie {patient} pour {motif}.",
    "{patient} est vu en consultation dans un contexte de {motif}.",
    "Consultation psychiatrique concernant {patient}, adressé pour {motif}."
  ],
  evolution: [
    "Le tableau clinique reste fluctuant, avec une évolution globalement fragile.",
    "L’évolution apparaît partielle, avec persistance de symptômes significatifs.",
    "Le tableau reste instable, avec amélioration limitée à ce stade."
  ],
  anxio: [
    "anxiété diffuse avec ruminations envahissantes",
    "tension interne persistante avec pensées intrusives",
    "état anxieux généralisé avec anticipation négative"
  ],
  depression: [
    "anhédonie marquée avec perte d’élan vital",
    "baisse de l’énergie et désinvestissement global",
    "ralentissement psychique avec diminution de l’initiative"
  ],
  sommeil: [
    "sommeil perturbé avec réveils nocturnes",
    "insomnie avec sommeil non réparateur",
    "altération du rythme veille-sommeil"
  ],
  conclusion: [
    "Poursuite du suivi recommandée avec réévaluation clinique.",
    "Maintien du cadre thérapeutique avec ajustement si nécessaire.",
    "Un suivi rapproché reste indiqué au vu de la fragilité clinique."
  ]
};

const MULTI_GROUPS = new Set([
  "reasonChoices","symptomChoices","planChoices",
  "mseContact","mseMood","mseAnxiety","mseThought","mseBehavior","mseSleep","mseFood",
  "riskProtection",
  "alcType","alcPattern","alcFunction","alcDependence","alcWithdrawal",
  "otherSubstanceChoices","otherSubstanceFunctionChoices",
  "psyHousing","psyWork","psyNetwork","psyStress",
  "todoTime","todoType","todoPriority"
]);

for (const key of MULTI_GROUPS) state.selected[key] = [];
state.selected.riskIdeas = "";
state.selected.riskSeverity = "";

const $ = (id) => document.getElementById(id);

function titleCase(s){
  if(!s) return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function cleanText(s){
  return (s || "").replace(/\s+/g, " ").trim();
}

function sentence(s){
  const x = cleanText(s);
  if(!x) return "";
  return /[.!?]$/.test(x) ? x : x + ".";
}

function cap(s){
  const x = cleanText(s);
  return x ? x.charAt(0).toUpperCase() + x.slice(1) : "";
}

function pick(arr){
  return arr[Math.floor(Math.random() * arr.length)];
}

function joinClinical(arr){
  const items = (arr || []).filter(Boolean);
  if(!items.length) return "";
  if(items.length === 1) return items[0];
  if(items.length === 2) return `${items[0]} et ${items[1]}`;
  return `${items.slice(0, -1).join(", ")} et ${items[items.length - 1]}`;
}

function linesToBullets(text){
  return cleanText(text)
    ? text.split("\n").map(x => x.trim()).filter(Boolean).map(x => `- ${x}`).join("\n")
    : "";
}

function setToday(){
  const d = new Date();
  const p = (n) => String(n).padStart(2, "0");
  $("docDate").value = `${d.getFullYear()}-${p(d.getMonth()+1)}-${p(d.getDate())}`;
  $("withdrawStartDate").value = `${d.getFullYear()}-${p(d.getMonth()+1)}-${p(d.getDate())}`;
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
    vu: isMale ? "vu" : "vue",
    hospitalisé: isMale ? "hospitalisé" : "hospitalisée",
    orienté: isMale ? "orienté" : "orientée",
    présenté: isMale ? "présenté" : "présentée",
    suivi: isMale ? "suivi" : "suivie"
  };
}

function getPatientLabel(){
  const g = genderPack();
  const name = cleanText($("patientName").value);
  return name ? `${g.civ} ${name}` : g.civ;
}

function positionMenu(el, btn){
  const rect = btn.getBoundingClientRect();
  el.style.left = `${Math.max(12, rect.left)}px`;
}

function renderSingleMenu(containerId, options, current, group){
  const el = $(containerId);
  el.innerHTML = options.map(opt => `
    <button class="menu-item ${current === opt ? "active" : ""}" type="button" data-menu-group="${group}" data-value="${opt}">
      ${titleCase(opt)}
    </button>
  `).join("");
}

function renderPills(containerId, options, group, single=false){
  const el = $(containerId);
  if(!el) return;
  el.innerHTML = options.map(opt => {
    const active = single ? state.selected[group] === opt : (state.selected[group] || []).includes(opt);
    return `<button class="pill ${active ? "active" : ""}" type="button" data-pill-group="${group}" data-value="${opt}" data-single="${single ? "1" : "0"}">${opt}</button>`;
  }).join("");
}

function renderUI(){
  $("modeDisplay").textContent = titleCase(state.mode);
  $("typeDisplay").textContent = titleCase(state.type);
  $("subTypeDisplay").textContent = state.subType;
  $("outputDisplay").textContent = state.output === "texte" ? "Texte" : "Questionnaire";
  $("fontDisplay").textContent = titleCase(state.font);

  $("metricType").textContent = titleCase(state.type);
  $("metricMode").textContent = titleCase(state.mode);
  $("metricOutput").textContent = state.output === "texte" ? "Texte" : "Questionnaire";

  renderSingleMenu("menuMode", OPTIONS.mode, state.mode, "mode");
  renderSingleMenu("menuType", OPTIONS.type, state.type, "type");
  renderSingleMenu("menuSubType", OPTIONS.subTypes[state.type], state.subType, "subType");
  renderSingleMenu("menuOutput", OPTIONS.output, state.output, "output");
  renderSingleMenu("menuFont", OPTIONS.font, state.font, "font");

  renderPills("genderChoices", OPTIONS.gender, "gender", true);
  renderPills("civilityChoices", OPTIONS.civility, "civility", true);
  renderPills("reasonChoices", OPTIONS.reasonChoices, "reasonChoices");
  renderPills("symptomChoices", OPTIONS.symptomChoices, "symptomChoices");
  renderPills("planChoices", OPTIONS.planChoices, "planChoices");

  renderPills("mseContactChoices", OPTIONS.mseContact, "mseContact");
  renderPills("mseMoodChoices", OPTIONS.mseMood, "mseMood");
  renderPills("mseAnxietyChoices", OPTIONS.mseAnxiety, "mseAnxiety");
  renderPills("mseThoughtChoices", OPTIONS.mseThought, "mseThought");
  renderPills("mseBehaviorChoices", OPTIONS.mseBehavior, "mseBehavior");
  renderPills("mseSleepChoices", OPTIONS.mseSleep, "mseSleep");
  renderPills("mseFoodChoices", OPTIONS.mseFood, "mseFood");

  renderPills("riskIdeasChoices", OPTIONS.riskIdeas, "riskIdeas", true);
  renderPills("riskSeverityChoices", OPTIONS.riskSeverity, "riskSeverity", true);
  renderPills("riskProtectionChoices", OPTIONS.riskProtection, "riskProtection");

  renderPills("alcTypeChoices", OPTIONS.alcType, "alcType");
  renderPills("alcPatternChoices", OPTIONS.alcPattern, "alcPattern");
  renderPills("alcFunctionChoices", OPTIONS.alcFunction, "alcFunction");
  renderPills("alcDependenceChoices", OPTIONS.alcDependence, "alcDependence");
  renderPills("alcWithdrawalChoices", OPTIONS.alcWithdrawal, "alcWithdrawal");

  renderPills("otherSubstanceChoices", OPTIONS.otherSubstanceChoices, "otherSubstanceChoices");
  renderPills("otherSubstanceFunctionChoices", OPTIONS.otherSubstanceFunctionChoices, "otherSubstanceFunctionChoices");

  renderPills("psyHousingChoices", OPTIONS.psyHousing, "psyHousing");
  renderPills("psyWorkChoices", OPTIONS.psyWork, "psyWork");
  renderPills("psyNetworkChoices", OPTIONS.psyNetwork, "psyNetwork");
  renderPills("psyStressChoices", OPTIONS.psyStress, "psyStress");

  renderPills("todoTimeChoices", OPTIONS.todoTime, "todoTime");
  renderPills("todoTypeChoices", OPTIONS.todoType, "todoType");
  renderPills("todoPriorityChoices", OPTIONS.todoPriority, "todoPriority");

  $("todoSetSelect").innerHTML = `<option value="">—</option>` + OPTIONS.todoSets.map(x => `<option value="${x}">${x}</option>`).join("");
  $("todoSetSelect").value = state.todoSet;

  applyFont();
  computeWarnings();
}

function toggleSidebar(){
  $("sidebar").classList.toggle("closed");
  $("main").classList.toggle("sidebar-collapsed");
}

function applyFont(){
  document.body.classList.remove("font-inter", "font-mono", "font-serif");
  document.body.classList.add(`font-${state.font}`);
}

function closeMenus(){
  document.querySelectorAll(".menu-dropdown").forEach(m => m.classList.add("hidden"));
}

function toggleMenuById(id, btn){
  const el = $(id);
  const open = !el.classList.contains("hidden");
  closeMenus();
  if(!open){
    positionMenu(el, btn);
    el.classList.remove("hidden");
  }
}

function switchTab(name){
  document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
  document.querySelectorAll(".tab-panel").forEach(p => p.classList.remove("active"));

  document.querySelector(`.tab[data-tab="${name}"]`).classList.add("active");
  $(`tab-${name}`).classList.add("active");
}

function updateStateFromSingle(group, value){
  state[group] = value;
  if(group === "type"){
    state.subType = OPTIONS.subTypes[state.type][0];
  }
  renderUI();
  regenerateLive();
}

function updateStateFromPill(group, value, single){
  if(single){
    state.selected[group] = value;
    if(group === "gender") state.gender = value;
    if(group === "civility") state.civility = value;
  } else {
    const arr = state.selected[group] || [];
    const i = arr.indexOf(value);
    if(i >= 0) arr.splice(i, 1);
    else arr.push(value);
    state.selected[group] = arr;
  }
  renderUI();
  regenerateLive();
}

function inferClinicalState(){
  const profile = {
    axis: [],
    flags: [],
    severity: "modérée"
  };

  if(state.selected.symptomChoices.includes("anhédonie") || state.selected.mseMood.includes("triste")){
    profile.axis.push("dépressif");
  }

  if(state.selected.mseAnxiety.length || state.selected.symptomChoices.includes("ruminations")){
    profile.axis.push("anxieux");
  }

  if(cleanText($("alcQty").value) || state.selected.alcDependence.length || state.selected.alcType.length){
    profile.axis.push("addictif");
  }

  if(state.selected.riskIdeas === "actives"){
    profile.flags.push("suicidaire");
    profile.severity = "élevée";
  }

  if(state.selected.riskIdeas === "passives" && profile.severity !== "élevée"){
    profile.severity = "modérée";
  }

  return profile;
}

function inferDSM(){
  const s = state.selected;
  const dx = [];
  let confidence = "modérée";

  const hasDepressiveCluster =
    (s.symptomChoices.includes("anhédonie") || $("mseNegative").value.toLowerCase().includes("anhédonie")) &&
    (s.mseMood.includes("triste") || s.mseMood.includes("abaissée") || s.symptomChoices.includes("fatigabilité")) &&
    (s.mseSleep.length || s.mseFood.length);

  const hasAnxietyCluster =
    s.mseAnxiety.length &&
    (s.mseThought.includes("ruminative") || s.symptomChoices.includes("ruminations"));

  const hasAlcoholUse =
    !!cleanText($("alcQty").value) ||
    s.alcDependence.length > 0 ||
    s.alcType.length > 0;

  if(hasDepressiveCluster){
    dx.push("Trouble dépressif caractérisé (épisode actuel probable)");
  }

  if(hasAnxietyCluster){
    dx.push("Trouble anxieux généralisé (probable)");
  }

  if(hasAlcoholUse){
    dx.push("Trouble lié à l’usage d’alcool (sévérité à préciser)");
  }

  if(state.selected.riskIdeas === "actives"){
    confidence = "élevée";
  }

  if(!dx.length){
    dx.push("Symptomatologie non spécifique – à préciser (trouble de l’adaptation vs anxio-dépressif)");
  }

  return { list: dx, confidence };
}

function buildDSMParagraph(dsm){
  return `Hypothèse diagnostique (DSM-5, à confirmer) : ${dsm.list.join(" ; ")}. Niveau de confiance : ${dsm.confidence}.`;
}

function suggestMedication(profile){
  const recos = [];

  if(profile.axis.includes("dépressif")){
    recos.push("ISRS en première intention (ex : sertraline 50 mg, titration progressive)");
  }

  if(profile.axis.includes("anxieux")){
    recos.push("Approche non pharmacologique + ISRS si persistance des symptômes anxieux");
  }

  if(state.selected.mseSleep.length){
    recos.push("Trazodone faible dose ou mesures d’hygiène du sommeil selon le contexte");
  }

  if(profile.axis.includes("addictif")){
    recos.push("Sevrage encadré + discussion naltrexone / acamprosate selon le contexte addictologique");
  }

  if(profile.flags.includes("suicidaire")){
    recos.push("Éviter les prescriptions isolées de benzodiazépines et privilégier une surveillance rapprochée");
  }

  if(!recos.length){
    recos.push("Pas d’indication médicamenteuse immédiate – surveillance clinique");
  }

  return recos;
}

function buildMedicationParagraph(recos){
  let txt = "Proposition thérapeutique médicamenteuse :\n";
  recos.forEach(r => { txt += `- ${r}\n`; });
  return txt.trim();
}

function getReasonText(){
  const free = cleanText($("reasonFree").value);
  const selected = state.selected.reasonChoices;
  if(free && selected.length) return `${free} (${selected.join(", ")})`;
  if(free) return free;
  if(selected.length) return selected.join(", ");
  return "motif à préciser";
}

function buildConsumptionParagraph(){
  const g = genderPack();

  const qty = cleanText($("alcQty").value);
  const last = cleanText($("alcLast").value);
  const start = cleanText($("alcStart").value);
  const character = cleanText($("alcCharacter").value);
  const free = cleanText($("alcFree").value);

  const types = state.selected.alcType;
  const patterns = state.selected.alcPattern;
  const functions = state.selected.alcFunction;
  const dependence = state.selected.alcDependence;
  const withdrawal = state.selected.alcWithdrawal;

  const otherSubs = state.selected.otherSubstanceChoices;
  const otherSubsFunctions = state.selected.otherSubstanceFunctionChoices;
  const otherSubsFree = cleanText($("otherSubstances").value);

  const hasAlcohol = qty || last || start || character || free || types.length || patterns.length || functions.length || dependence.length || withdrawal.length;
  const hasOthers = otherSubs.length || otherSubsFunctions.length || otherSubsFree;

  if(!hasAlcohol && !hasOthers) return "";

  const blocks = [];

  if(hasAlcohol){
    let txt = "Consommation d’alcool";
    const d = [];
    if(types.length) d.push(`de type ${joinClinical(types)}`);
    if(qty) d.push(`estimée à ${qty}`);
    if(patterns.length) d.push(`selon un mode ${joinClinical(patterns)}`);
    if(character) d.push(`à caractère ${character}`);
    if(d.length) txt += " " + d.join(", ");
    txt += ". ";

    const temp = [];
    if(last) temp.push(`dernière consommation rapportée ${last}`);
    if(start) temp.push(`début de consommation ${start}`);
    if(temp.length) txt += sentence(cap(joinClinical(temp))) + " ";

    if(functions.length) txt += `${g.Patient} décrit une consommation à visée ${joinClinical(functions)}. `;
    if(dependence.length) txt += `Présence d’éléments évocateurs de dépendance avec ${joinClinical(dependence)}. `;
    if(withdrawal.length) txt += `Antécédents ou projet de sevrage : ${joinClinical(withdrawal)}. `;
    if(free) txt += sentence(free) + " ";

    blocks.push(txt.trim());
  }

  if(hasOthers){
    let txt = "";
    if(otherSubs.length) txt += `Autres consommations rapportées : ${joinClinical(otherSubs)}. `;
    if(otherSubsFunctions.length) txt += `Fonctions possibles associées : ${joinClinical(otherSubsFunctions)}. `;
    if(otherSubsFree) txt += sentence(otherSubsFree);
    blocks.push(txt.trim());
  }

  if(state.withdrawalPlanText){
    blocks.push("Schéma de sevrage proposé :\n" + state.withdrawalPlanText);
  }

  return blocks.join("\n\n");
}

function buildMSEExpert(){
  const g = genderPack();
  const s = state.selected;

  let txt = "";

  txt += `${cleanText($("mseOrientation").value) || `${g.Patient} bien ${g.orienté} dans le temps et l’espace`}, `;

  txt += s.mseContact.includes("fuyant")
    ? "contact réservé avec tendance à l’évitement du regard, "
    : s.mseContact.length
      ? `contact ${joinClinical(s.mseContact)}, `
      : "contact adéquat et engageant, ";

  txt += cleanText($("msePresentation").value)
    ? `présentation ${cleanText($("msePresentation").value)}, `
    : "présentation soignée et adaptée, ";

  txt += cleanText($("mseCollaboration").value)
    ? `avec une collaboration ${cleanText($("mseCollaboration").value)}. `
    : "bonne collaboration. ";

  if(cleanText($("msePsychomotor").value)){
    txt += `${sentence(cleanText($("msePsychomotor").value))} `;
  } else if(cleanText($("mseNegative").value).toLowerCase().includes("ralentissement")){
    txt += "Ralentissement psychomoteur marqué. ";
  } else {
    txt += "Absence de ralentissement psychomoteur notable. ";
  }

  const core = [];

  if(s.mseMood.includes("triste") || s.mseMood.includes("abaissée")){
    core.push("humeur abaissée");
  }

  if(s.symptomChoices.includes("anhédonie") || cleanText($("mseNegative").value).toLowerCase().includes("anhédonie")){
    core.push(pick(VAR.depression));
  }

  if(s.mseAnxiety.length){
    core.push(pick(VAR.anxio));
  }

  if(s.mseThought.includes("ruminative") || s.symptomChoices.includes("ruminations")){
    core.push("ruminations envahissantes");
  }

  if(s.mseThought.includes("trauma") || cleanText($("mseTrauma").value)){
    core.push(cleanText($("mseTrauma").value) || "réactivation d’éléments traumatiques");
  }

  if(core.length){
    txt += `${cap(joinClinical(core))}. `;
  }

  if(cleanText($("mseSpeech").value)){
    txt += `Discours ${cleanText($("mseSpeech").value)}. `;
  } else {
    txt += "Discours cohérent, sans désorganisation ni altération du cours de la pensée. ";
  }

  if(cleanText($("mseReality").value)){
    txt += `${sentence(cleanText($("mseReality").value))} `;
  } else if(s.mseThought.includes("délirante")){
    txt += "Présence d’éléments délirants. ";
  } else {
    txt += "Absence d’éléments délirants ou d’altération du rapport à la réalité. ";
  }

  if(state.type !== "consultation"){
    if(s.riskIdeas === "actives"){
      txt += "Présence d’idées suicidaires actives avec scénario. ";
    } else if(s.riskIdeas === "passives"){
      txt += "Idées noires passives sans scénario structuré. ";
    } else {
      txt += "Absence d’idéation suicidaire. ";
    }

    if(cleanText($("riskAttempts").value)){
      txt += `Antécédents de passage à l’acte : ${cleanText($("riskAttempts").value)}. `;
    }
  }

  txt += s.mseBehavior.includes("retrait")
    ? "Attitude de retrait avec diminution des interactions. "
    : s.mseBehavior.length
      ? `Comportement ${joinClinical(s.mseBehavior)}. `
      : "Comportement adapté au cadre. ";

  if(s.mseSleep.includes("insomnie") || s.mseSleep.includes("réveils nocturnes") || s.mseSleep.includes("sommeil non réparateur") || s.mseSleep.includes("endormissement difficile")){
    txt += `${pick(VAR.sommeil)}. `;
  } else if(s.mseSleep.length){
    txt += `Sommeil ${joinClinical(s.mseSleep)}. `;
  } else {
    txt += "Sommeil globalement conservé. ";
  }

  txt += s.mseFood.includes("diminution") || s.mseFood.includes("appétit diminué")
    ? "Appétit diminué."
    : s.mseFood.length
      ? `Alimentation ${joinClinical(s.mseFood)}.`
      : "Alimentation conservée.";

  return txt.trim();
}

function buildPsychosocialParagraph(){
  const parts = [];
  if(state.selected.psyHousing.length) parts.push(`logement : ${joinClinical(state.selected.psyHousing)}`);
  if(state.selected.psyWork.length) parts.push(`situation socio-professionnelle : ${joinClinical(state.selected.psyWork)}`);
  if(state.selected.psyNetwork.length) parts.push(`réseau : ${joinClinical(state.selected.psyNetwork)}`);
  if(state.selected.psyStress.length) parts.push(`facteurs de stress : ${joinClinical(state.selected.psyStress)}`);
  if(cleanText($("psFamily").value)) parts.push(`famille : ${cleanText($("psFamily").value)}`);

  let txt = parts.length ? sentence(cap(parts.join(", "))) : "Éléments psychosociaux à préciser.";
  if(cleanText($("psFree").value)) txt += " " + sentence($("psFree").value);
  return txt;
}

function buildAdministrativeText(){
  const g = genderPack();
  const patient = getPatientLabel();
  const motif = getReasonText();
  const context = cleanText($("contextFree").value);
  const plan = cleanText($("planFree").value);

  switch(state.subType){
    case "Attestation de présence":
      return `Je soussigné certifie que ${patient} s’est ${g.présenté} en consultation le ${$("docDate").value || "____"}.\n\nAttestation délivrée pour faire valoir ce que de droit.`;
    case "Attestation simple":
      return `Je soussigné certifie que ${patient} est actuellement ${g.suivi} en psychiatrie.\n\nCette attestation est délivrée à la demande de l’intéressé${g.isMale ? "" : "e"} pour faire valoir ce que de droit.`;
    case "Attestation de suivi":
      return `Je soussigné certifie que ${patient} bénéficie d’un suivi psychiatrique régulier.\n\nCette attestation est délivrée à la demande de l’intéressé${g.isMale ? "" : "e"} pour faire valoir ce que de droit.`;
    default:
      if(state.subType.includes("Certificat")){
        return `Je soussigné certifie avoir examiné ${patient}.\n\nÉTAT CLINIQUE\n\n${sentence(context || `L’examen clinique met en évidence une symptomatologie en lien avec ${motif}.`)}\n\nRETENTISSEMENT\n\n${sentence(plan || "Le retentissement fonctionnel est à considérer au regard du contexte clinique.")}\n\nCertificat établi à la demande de l’intéressé${g.isMale ? "" : "e"}.`;
      }
      return `CONTEXTE\n\n${sentence(context || `${patient} est vu dans le cadre de ${motif}.`)}\n\nÉTAT CLINIQUE\n\n${buildMSEExpert()}\n\nRETENTISSEMENT / PLAN\n\n${sentence(plan || "Évolution à réévaluer.")}`;
  }
}

function buildMailText(){
  const to = "Madame, Monsieur";
  const motif = getReasonText();
  const body = cleanText($("planFree").value) || `Je reviens vers vous concernant ${motif}.`;
  return `Objet : ${state.subType}\n\nBonjour,\n\n${to},\n\n${sentence(body)}\n\nBien à vous.`;
}

function buildHospitalDynamicParagraph(){
  return state.mode === "rapide"
    ? "Bonne inscription dans le cadre de soins, avec participation aux entretiens."
    : "Le patient s’inscrit dans une démarche de réflexion autour de son fonctionnement et des facteurs ayant contribué à la consommation. Un travail d’élaboration a pu être initié, avec une implication satisfaisante dans les entretiens. Le cadre proposé apparaît contenant et favorise une mise à distance progressive des conduites problématiques.";
}

function buildTreatmentText(){
  const raw = $("treatment").value;
  if(!cleanText(raw)) return "Traitement à préciser.";
  return raw.includes("\n") ? linesToBullets(raw) : raw;
}

function buildHospitalEvolutionParagraph(){
  const residuals = [];
  if(state.selected.mseAnxiety.length) residuals.push(`anxiété ${joinClinical(state.selected.mseAnxiety)}`);
  if(state.selected.mseSleep.length) residuals.push(`troubles du sommeil à type de ${joinClinical(state.selected.mseSleep)}`);
  if(state.selected.mseMood.length) residuals.push(`fragilité thymique avec humeur ${joinClinical(state.selected.mseMood)}`);

  const qty = cleanText($("alcQty").value);
  const withdrawal = state.selected.alcWithdrawal;
  const dependence = state.selected.alcDependence;
  const contextFree = cleanText($("contextFree").value);

  if(state.subType === "Semaine 1"){
    let txt = "Évolution globalement favorable au terme de cette première semaine de prise en charge. ";
    if(qty || withdrawal.length){
      txt += "Le sevrage alcoolique a été globalement bien toléré dans l’ensemble";
      if(withdrawal.length) txt += `, dans un contexte de ${joinClinical(withdrawal)}`;
      txt += ", sans complication aiguë rapportée. ";
    }
    if(residuals.length) txt += `Persistance de manifestations résiduelles modérées, principalement à type de ${joinClinical(residuals)}. `;
    if(dependence.length) txt += `Le contexte addictologique reste marqué par ${joinClinical(dependence)}. `;
    if(contextFree) txt += sentence(contextFree) + " ";
    return txt.trim();
  }

  if(state.subType === "Semaine 2"){
    let txt = "Évolution globalement favorable avec poursuite du travail de consolidation. ";
    if(residuals.length) txt += `Persistances symptomatiques encore présentes, surtout sous la forme de ${joinClinical(residuals)}, mais dans une intensité moindre. `;
    txt += "Le travail porte davantage sur l’autonomie, le maintien des acquis et la préparation de la suite de la prise en charge. ";
    if(contextFree) txt += sentence(contextFree);
    return txt.trim();
  }

  if(state.subType === "Admission"){
    return sentence(contextFree || "Hospitalisation motivée par une demande de sevrage, dans un contexte nécessitant une prise en charge encadrée et une évaluation clinique plus approfondie.");
  }

  return sentence(contextFree || "Évolution clinique à préciser.");
}

function buildPlan(profile){
  const plan = [];
  if(profile.axis.includes("dépressif")) plan.push("poursuite ou adaptation du traitement antidépresseur");
  if(profile.axis.includes("anxieux")) plan.push("travail de régulation anxieuse");
  if(profile.axis.includes("addictif")) plan.push("prise en charge addictologique structurée");
  if(profile.flags.includes("suicidaire")) plan.push("surveillance rapprochée et évaluation du risque suicidaire");
  return cap(joinClinical(plan)) + ".";
}

function generateQuestionnaire(){
  const type = state.type;
  if(type === "hospitalisation" && state.subType === "Semaine 1"){
    return `ÉVOLUTION GÉNÉRALE
................................................................
Tolérance du sevrage :
................................................................
Symptômes résiduels :
................................................................

EXAMEN MENTAL
Orientation :
................................................................
Contact / présentation / collaboration :
................................................................
Psychomotricité :
................................................................
Discours / pensée / rapport à la réalité :
................................................................
Humeur / affect / anxiété :
................................................................
Comportement :
................................................................
Sommeil :
................................................................
Alimentation :
................................................................

DYNAMIQUE THÉRAPEUTIQUE
................................................................
................................................................
................................................................

TRAITEMENT
................................................................
................................................................
................................................................

PROJECTION / SUITE
................................................................
................................................................
................................................................`;
  }

  if(type === "consultation"){
    return `MOTIF ET CONTEXTE
................................................................
................................................................
................................................................

CLINIQUE
................................................................
................................................................
................................................................

EXAMEN MENTAL
Orientation :
................................................................
Contact :
................................................................
Humeur :
................................................................
Anxiété :
................................................................
Pensée :
................................................................
Sommeil / alimentation :
................................................................

CONSOMMATIONS
Type :
................................................................
Quantité / pattern :
................................................................
Fonction :
................................................................
Éléments de dépendance :
................................................................

PSYCHOSOCIAL
................................................................
................................................................
................................................................

PLAN
................................................................
................................................................
................................................................`;
  }

  if(type === "urgences"){
    return `MOTIF
................................................................
................................................................
................................................................

CONTEXTE / CIRCONSTANCES
................................................................
................................................................
................................................................

CLINIQUE
................................................................
................................................................
................................................................

EXAMEN MENTAL
Orientation :
................................................................
Contact / comportement :
................................................................
Humeur / anxiété :
................................................................
Pensée / réalité :
................................................................

RISQUE SUICIDAIRE
Idées :
................................................................
Gravité :
................................................................
Facteurs de protection :
................................................................

DÉCISION / ORIENTATION
................................................................
................................................................
................................................................`;
  }

  if(type === "préadmission"){
    return `DEMANDE DE SEVRAGE
................................................................
................................................................
................................................................

CONSOMMATIONS
Type :
................................................................
Quantité :
................................................................
Dernière prise :
................................................................
Début :
................................................................
Fonctions :
................................................................
ATCD de sevrage :
................................................................

EXAMEN MENTAL
................................................................
................................................................
................................................................

PSYCHOSOCIAL
................................................................
................................................................
................................................................

INDICATION
................................................................
................................................................
................................................................`;
  }

  if(type === "mail"){
    return `DESTINATAIRE
................................................................
OBJET
................................................................
CONTEXTE
................................................................
MESSAGE PRINCIPAL
................................................................
ACTION DEMANDÉE
................................................................`;
  }

  return `OBJET DU DOCUMENT
................................................................
CONTEXTE
................................................................
CLINIQUE / RETENTISSEMENT
................................................................
PLAN / FINALITÉ
................................................................`;
}

function generateTodoText(){
  const times = state.selected.todoTime || [];
  const types = state.selected.todoType || [];
  const priorities = state.selected.todoPriority || [];
  const estimate = cleanText($("todoEstimate").value);
  const notes = cleanText($("todoNotes").value);
  const setName = state.todoSet;

  const sections = [];

  if(setName){
    sections.push(`SET SÉLECTIONNÉ : ${setName.toUpperCase()}`);
    const template = TODO_SET_TEMPLATES[setName] || [];
    if(template.length){
      sections.push(template.map(item => `- ${item}`).join("\n"));
    }
  }

  if(times.length){
    let block = "DEMI-JOURNÉES\n";
    for(const time of times){
      block += `\n${time.toUpperCase()}\n`;
      if(types.length){
        for(const item of types){
          block += `- ${item}`;
          if(priorities.length) block += ` — priorité ${joinClinical(priorities)}`;
          if(estimate) block += ` — ${estimate}`;
          block += `\n`;
        }
      } else {
        block += "- tâches à préciser\n";
      }
    }
    sections.push(block.trim());
  } else if(types.length){
    let block = "TÂCHES\n";
    for(const item of types){
      block += `- ${item}`;
      if(priorities.length) block += ` — priorité ${joinClinical(priorities)}`;
      if(estimate) block += ` — ${estimate}`;
      block += `\n`;
    }
    sections.push(block.trim());
  }

  if(notes){
    sections.push(`NOTES LIBRES\n${notes}`);
  }

  return sections.length ? `TO DO LIST\n\n${sections.join("\n\n")}` : "TO DO LIST\n\nAucune tâche renseignée.";
}

function buildWithdrawalPlanText(){
  const drug = $("withdrawDrug").value;
  const pattern = $("withdrawPattern").value;
  const dose = Number($("withdrawDose").value);
  const days = Number($("withdrawDays").value);
  const startDate = $("withdrawStartDate").value;

  if(!dose || !days || days < 2){
    return "";
  }

  let factor = 1;
  if(pattern === "rapide") factor = 1.25;
  if(pattern === "lent") factor = 0.75;

  let decrement = Math.max(1, Math.round((dose / days) * factor));
  let current = dose;
  const rows = [];

  let baseDate = startDate ? new Date(startDate) : new Date();

  for(let i=0; i<days; i++){
    const d = new Date(baseDate);
    d.setDate(baseDate.getDate() + i);
    const label = d.toLocaleDateString("fr-BE");
    rows.push(`${label} — ${drug} ${current} mg`);
    current = Math.max(0, current - decrement);
  }

  rows.push("Arrêt");
  return rows.join("\n");
}

function inferLiveOutput(){
  if(state.output === "questionnaire") return generateQuestionnaire();
  return generateText();
}

function generateText(){
  if(state.type === "mail") return buildMailText();
  if(state.type === "administratif") return buildAdministrativeText();

  const patient = getPatientLabel();
  const motif = getReasonText();
  const profile = inferClinicalState();
  const dsm = inferDSM();
  const meds = suggestMedication(profile);

  if(state.type === "hospitalisation"){
    if(state.subType === "Semaine 1"){
      return `ÉVOLUTION GÉNÉRALE

${buildHospitalEvolutionParagraph()}

EXAMEN MENTAL

${buildMSEExpert()}

DYNAMIQUE THÉRAPEUTIQUE

${buildHospitalDynamicParagraph()}

TRAITEMENT

${buildTreatmentText()}

CONSOMMATION

${buildConsumptionParagraph() || "Aucune consommation problématique actuellement détaillée."}

HYPOTHÈSE DIAGNOSTIQUE

${buildDSMParagraph(dsm)}

PROPOSITION THÉRAPEUTIQUE MÉDICAMENTEUSE

${buildMedicationParagraph(meds)}

PROJECTION / SUITE

${sentence(cleanText($("planFree").value) || "La suite de la prise en charge est envisagée comme une étape de consolidation, avec maintien des objectifs d’abstinence, poursuite du travail engagé et préparation à la continuité du suivi ambulatoire.")}`;
    }

    if(state.subType === "Semaine 2"){
      return `ÉVOLUTION

${buildHospitalEvolutionParagraph()}

EXAMEN MENTAL

${buildMSEExpert()}

AUTONOMIE / CONSOLIDATION

${sentence(cleanText($("planFree").value) || "Travail autour de l’autonomie, de la consolidation et des repères au quotidien.")}

HYPOTHÈSE DIAGNOSTIQUE

${buildDSMParagraph(dsm)}

PROPOSITION THÉRAPEUTIQUE MÉDICAMENTEUSE

${buildMedicationParagraph(meds)}

PRÉPARATION DE LA SUITE

${sentence("Préparation de la sortie et du suivi ambulatoire.")}`;
    }

    return `MOTIF ET CONTEXTE

${patient} est ${genderPack().hospitalisé} dans le cadre d’un sevrage pour ${motif}.

CONSOMMATIONS

${buildConsumptionParagraph() || "Aucune consommation problématique actuellement détaillée."}

EXAMEN MENTAL

${buildMSEExpert()}

PSYCHOSOCIAL

${buildPsychosocialParagraph()}

HYPOTHÈSE DIAGNOSTIQUE

${buildDSMParagraph(dsm)}

PROPOSITION THÉRAPEUTIQUE MÉDICAMENTEUSE

${buildMedicationParagraph(meds)}

PLAN

${sentence(cleanText($("planFree").value) || buildPlan(profile))}`;
  }

  if(state.type === "urgences"){
    return `MOTIF ET CONTEXTE

${patient} est ${genderPack().vu} aux urgences pour ${motif}.

CLINIQUE

${sentence(cleanText($("contextFree").value) || "Éléments cliniques à préciser.")}

EXAMEN MENTAL

${buildMSEExpert()}

RISQUE

${state.selected.riskIdeas === "absence" && !cleanText($("riskAttempts").value) && !cleanText($("riskScenario").value)
  ? "Absence d’élément suicidaire préoccupant rapporté à ce stade."
  : `Idées : ${state.selected.riskIdeas || "à préciser"}. Gravité : ${state.selected.riskSeverity || "à préciser"}. ${cleanText($("riskScenario").value) ? `Scénario : ${cleanText($("riskScenario").value)}. ` : ""}${cleanText($("riskAttempts").value) ? `ATCD : ${cleanText($("riskAttempts").value)}. ` : ""}${state.selected.riskProtection.length ? `Facteurs de protection : ${joinClinical(state.selected.riskProtection)}.` : ""}`}

HYPOTHÈSE DIAGNOSTIQUE

${buildDSMParagraph(dsm)}

PROPOSITION THÉRAPEUTIQUE MÉDICAMENTEUSE

${buildMedicationParagraph(meds)}

DÉCISION / ORIENTATION

${sentence(cleanText($("planFree").value) || buildPlan(profile))}`;
  }

  if(state.type === "préadmission"){
    return `DEMANDE ET CONTEXTE

${patient} est ${genderPack().vu} en préadmission dans le cadre d’une demande de sevrage pour ${motif}.

CONSOMMATIONS

${buildConsumptionParagraph() || "Aucune consommation problématique actuellement détaillée."}

EXAMEN MENTAL

${buildMSEExpert()}

PSYCHOSOCIAL

${buildPsychosocialParagraph()}

HYPOTHÈSE DIAGNOSTIQUE

${buildDSMParagraph(dsm)}

PROPOSITION THÉRAPEUTIQUE MÉDICAMENTEUSE

${buildMedicationParagraph(meds)}

INDICATION

${sentence(cleanText($("planFree").value) || "Indication à discuter au regard des éléments cliniques et addictologiques.")}`;
  }

  return `${pick(VAR.intro).replace("{patient}", patient).replace("{motif}", motif)}

ÉVOLUTION GÉNÉRALE

${pick(VAR.evolution)}

CONTEXTE / HISTOIRE

${sentence(cleanText($("contextFree").value) || "Éléments contextuels à préciser.")}

EXAMEN MENTAL

${buildMSEExpert()}

CONSOMMATION

${buildConsumptionParagraph() || "Aucune consommation problématique actuellement détaillée."}

PSYCHOSOCIAL

${buildPsychosocialParagraph()}

HYPOTHÈSE DIAGNOSTIQUE

${buildDSMParagraph(dsm)}

PROPOSITION THÉRAPEUTIQUE MÉDICAMENTEUSE

${buildMedicationParagraph(meds)}

PLAN

${sentence(cleanText($("planFree").value) || buildPlan(profile) || pick(VAR.conclusion))}`;
}

function computeWarnings(){
  const warnings = [];
  if((state.type === "hospitalisation" || state.type === "préadmission") && !cleanText($("alcQty").value) && !state.selected.alcType.length){
    warnings.push("Contexte sevrage sans quantité ou type d’alcool renseignés.");
  }
  if(state.selected.riskIdeas === "actives" && !cleanText($("riskScenario").value)){
    warnings.push("Idées suicidaires actives sans scénario précisé.");
  }
  if(state.type === "administratif" && state.subType.includes("incapacité") && !cleanText($("planFree").value)){
    warnings.push("Certificat d’incapacité sans retentissement explicité.");
  }

  $("warnings").innerHTML = warnings.length
    ? warnings.map(w => `<div class="danger">• ${w}</div>`).join("")
    : "Aucune alerte.";
}

function regenerateLive(){
  $("output").value = inferLiveOutput();
}

function saveState(){
  const fields = {};
  document.querySelectorAll("input, textarea, select").forEach(el => fields[el.id] = el.value);
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ state, fields }));
}

function loadState(){
  const raw = localStorage.getItem(STORAGE_KEY);
  if(!raw) return;
  try{
    const parsed = JSON.parse(raw);
    Object.assign(state, parsed.state || {});
    Object.entries(parsed.fields || {}).forEach(([id, value]) => {
      if($(id)) $(id).value = value;
    });
    renderUI();
    regenerateLive();
  }catch(err){
    console.error(err);
  }
}

function clearAll(){
  state.type = "consultation";
  state.subType = "Suivi";
  state.mode = "complet";
  state.output = "texte";
  state.font = "inter";
  state.gender = "femme";
  state.civility = "auto";
  state.todoSet = "";
  state.withdrawalPlanText = "";
  Object.keys(state.selected).forEach(k => {
    if(Array.isArray(state.selected[k])) state.selected[k] = [];
    else state.selected[k] = "";
  });

  document.querySelectorAll("input, textarea").forEach(el => el.value = "");
  document.querySelectorAll("select").forEach(el => el.selectedIndex = 0);
  setToday();
  renderUI();
  regenerateLive();
}

function fillDemo(){
  clearAll();
  state.type = "hospitalisation";
  state.subType = "Semaine 1";
  state.gender = "homme";
  state.selected.reasonChoices = ["demande de sevrage alcool"];
  state.selected.symptomChoices = ["anhédonie", "ruminations", "fatigabilité"];
  state.selected.mseMood = ["abaissée"];
  state.selected.mseAnxiety = ["diffuse", "ruminations"];
  state.selected.mseSleep = ["insomnie"];
  state.selected.alcType = ["mixte"];
  state.selected.alcPattern = ["quotidien"];
  state.selected.alcDependence = ["craving", "perte de contrôle", "tolérance"];
  state.selected.alcWithdrawal = ["hospitalier", "sevrage simple"];
  state.selected.psyHousing = ["seul"];
  state.selected.psyWork = ["incapacité"];
  $("patientName").value = "X";
  $("patientAge").value = "42";
  $("reasonFree").value = "trouble anxio-dépressif sur fond de consommation alcoolique";
  $("alcQty").value = "8 unités/jour";
  $("alcLast").value = "hier soir";
  $("contextFree").value = "Le sevrage alcoolique a été globalement bien toléré, sans complication aiguë rapportée.";
  $("treatment").value = "Sertraline 50 mg\nTrazodone 100 mg au coucher\nDiazépam selon schéma dégressif";
  $("planFree").value = "Poursuite du travail engagé, consolidation et préparation de la continuité du suivi ambulatoire.";
  renderUI();
  regenerateLive();
}

function copyOutput(){
  navigator.clipboard.writeText($("output").value || "");
}

function printOutput(){
  window.print();
}

function buildWithdrawal(){
  const txt = buildWithdrawalPlanText();
  state.withdrawalPlanText = txt;
  $("withdrawOutput").value = txt;
  regenerateLive();
}

function handleInputChange(){
  regenerateLive();
  computeWarnings();
}

function initEvents(){
  $("sidebarToggleBtn").addEventListener("click", toggleSidebar);
  $("btnText").addEventListener("click", () => {
    state.output = "texte";
    renderUI();
    regenerateLive();
  });
  $("btnQuestionnaire").addEventListener("click", () => {
    state.output = "questionnaire";
    renderUI();
    regenerateLive();
  });
  $("btnTodo").addEventListener("click", () => {
    $("output").value = generateTodoText();
  });
  $("btnCopy").addEventListener("click", copyOutput);
  $("btnPrint").addEventListener("click", printOutput);
  $("btnSave").addEventListener("click", saveState);
  $("btnLoad").addEventListener("click", loadState);
  $("btnReset").addEventListener("click", clearAll);
  $("btnDemo").addEventListener("click", fillDemo);
  $("btnBuildWithdrawal").addEventListener("click", buildWithdrawal);

  document.querySelectorAll(".tab").forEach(tab => {
    tab.addEventListener("click", () => switchTab(tab.dataset.tab));
  });

  document.addEventListener("click", (e) => {
    const menuBtn = e.target.closest("[data-menu-target]");
    if(menuBtn){
      toggleMenuById(menuBtn.dataset.menuTarget, menuBtn);
      return;
    }

    const menuItem = e.target.closest("[data-menu-group]");
    if(menuItem){
      updateStateFromSingle(menuItem.dataset.menuGroup, menuItem.dataset.value);
      closeMenus();
      return;
    }

    const pill = e.target.closest("[data-pill-group]");
    if(pill){
      const group = pill.dataset.pillGroup;
      const value = pill.dataset.value;
      const single = pill.dataset.single === "1";
      updateStateFromPill(group, value, single);
      return;
    }

    const addTreatment = e.target.closest("[data-treatment]");
    if(addTreatment){
      const current = cleanText($("treatment").value);
      const next = addTreatment.dataset.treatment;
      $("treatment").value = current ? `${current}\n${next}` : next;
      regenerateLive();
      return;
    }

    if(!e.target.closest(".menu-dropdown") && !e.target.closest("[data-menu-target]")){
      closeMenus();
    }
  });

  $("todoSetSelect").addEventListener("change", () => {
    state.todoSet = $("todoSetSelect").value;
    if(state.todoSet){
      $("todoNotes").value = TODO_SET_TEMPLATES[state.todoSet].join("\n");
    }
  });

  document.querySelectorAll("input, textarea, select").forEach(el => {
    el.addEventListener("input", handleInputChange);
    el.addEventListener("change", handleInputChange);
  });
}

function initPresets(){
  $("presetWrap").innerHTML = OPTIONS.presets.map(p => `<button class="pill add-pill" type="button" data-preset="${p}">${p}</button>`).join("");

  $("presetWrap").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-preset]");
    if(!btn) return;
    const p = btn.dataset.preset;

    if(p === "Anxio-dépressif"){
      state.selected.reasonChoices = ["anxiété", "humeur dépressive"];
      state.selected.symptomChoices = ["ruminations", "anhédonie", "fatigabilité", "troubles du sommeil"];
      state.selected.mseMood = ["triste", "abaissée"];
      state.selected.mseAnxiety = ["diffuse", "ruminations"];
      state.selected.mseSleep = ["insomnie"];
    }

    if(p === "Crise suicidaire"){
      state.type = "urgences";
      state.subType = "Évaluation urgences";
      state.selected.reasonChoices = ["crise suicidaire", "idéations suicidaires"];
      state.selected.riskIdeas = "actives";
      state.selected.riskSeverity = "élevé";
    }

    if(p === "Sevrage alcool simple"){
      state.type = "hospitalisation";
      state.subType = "Admission";
      state.selected.reasonChoices = ["demande de sevrage alcool"];
      state.selected.alcType = ["mixte"];
      state.selected.alcPattern = ["quotidien"];
      state.selected.alcWithdrawal = ["hospitalier", "sevrage simple"];
      $("alcQty").value = "8 unités/jour";
    }

    if(p === "Sevrage alcool compliqué"){
      state.type = "préadmission";
      state.subType = "Évaluation de préadmission";
      state.selected.reasonChoices = ["demande de sevrage alcool"];
      state.selected.alcType = ["mixte"];
      state.selected.alcPattern = ["quotidien", "avec consommation matinale"];
      state.selected.alcWithdrawal = ["DT", "convulsions", "hospitalier", "sevrage compliqué"];
      state.selected.alcDependence = ["craving", "perte de contrôle", "tolérance", "symptômes de sevrage"];
      $("alcQty").value = "15 unités/jour";
    }

    if(p === "Insomnie / anxiété"){
      state.selected.reasonChoices = ["anxiété", "insomnie"];
      state.selected.mseAnxiety = ["diffuse"];
      state.selected.mseSleep = ["insomnie", "endormissement difficile"];
    }

    if(p === "Trauma probable"){
      state.selected.reasonChoices = ["évaluation diagnostique"];
      state.selected.symptomChoices = ["hypervigilance"];
      $("mseTrauma").value = "reviviscences, hypervigilance, évitement";
    }

    renderUI();
    regenerateLive();
  });
}

function init(){
  setToday();
  renderUI();
  initPresets();
  initEvents();
  regenerateLive();
}

init();
