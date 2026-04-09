// app-config.js
// Source unique de vérité pour les options, presets et structures V7

export const APP_STORAGE_KEY = "psychnote_v7_modular";

export const TYPE_OPTIONS = [
  "consultation",
  "urgences",
  "hospitalisation",
  "préadmission",
  "administratif",
  "mail"
];

export const SUBTYPE_OPTIONS = {
  consultation: [
    "première consultation",
    "suivi",
    "note courte",
    "courrier médecin traitant",
    "consultation de crise",
    "avis diagnostique"
  ],
  urgences: [
    "évaluation urgences",
    "décision / orientation"
  ],
  hospitalisation: [
    "admission semaine 1",
    "admission semaine 2",
    "évolution en cours",
    "sortie semaine 1",
    "sortie semaine 2",
    "synthèse d’hospitalisation"
  ],
  "préadmission": [
    "évaluation de préadmission",
    "conclusion d’indication"
  ],
  administratif: [
    "rapport mutuelle",
    "rapport assurance / autre",
    "attestation simple",
    "attestation de présence",
    "attestation de suivi",
    "certificat médical",
    "certificat incapacité",
    "certificat circonstancié simple"
  ],
  mail: [
    "réponse simple",
    "réponse patient",
    "réponse médecin / confrère",
    "transmission clinique brève",
    "relance",
    "confirmation de rendez-vous"
  ]
};

export const MODE_OPTIONS = ["rapide", "complet", "élaboré"];
export const OUTPUT_OPTIONS = ["texte", "questionnaire", "todo"];

export const APPEARANCE_OPTIONS = {
  themeModeChoices: ["clair", "sombre"],
  seasonChoices: ["printemps", "été", "automne", "hiver"],
  fontChoices: ["inter", "classic", "serif", "hand", "anime"],
  transparencyChoices: ["low", "medium", "high"],
  shadowChoices: ["off", "soft", "on"]
};

export const RIGHT_VIEW_OPTIONS = ["todo", "history", "patients", "week"];
export const WINDOW_NAMES = [
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

export const DOCUMENT_KIND = {
  MAIN: "main",
  LETTER: "letter"
};

export const MAIN_FREQUENT_MOTIVES = [
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
];

export const MAIN_FREQUENT_SYMPTOMS = [
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
];

export const MAIN_FREQUENT_PLANS = [
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
];

export const ALCOHOL_FUNCTION_QUICK = [
  "anxiolytique",
  "sommeil",
  "socialisation",
  "gestion émotion",
  "solitude",
  "ennui",
  "habitude",
  "impulsivité",
  "couper les pensées"
];

export const SMART_PRESET_OPTIONS = [
  "anxio-dépressif",
  "crise suicidaire",
  "sevrage alcool simple",
  "sevrage alcool compliqué",
  "insomnie / anxiété",
  "trauma probable"
];

export const DOC_VERSION_OPTIONS = ["rapide", "complet", "élargi"];
export const STRUCTURE_PRESET_OPTIONS = [
  "intro + clinique + plan",
  "motif + contexte + examen + plan",
  "évolution + examen + traitement + projection",
  "mutuelle structurée",
  "mail bref structuré",
  "admission complète sevrage"
];

export const WRITING_BLOCK_OPTIONS = [
  "évolution générale",
  "motif / demande",
  "contexte / histoire",
  "examen clinique / mental",
  "consommations",
  "psychosocial",
  "antécédents",
  "traitement",
  "retentissement fonctionnel",
  "projection / suite",
  "conclusion"
];

export const WRITING_PHRASE_OPTIONS = [
  "Je vois en consultation de psychiatrie…",
  "Au début de la prise en charge…",
  "Actuellement, il persiste…",
  "Sur le plan clinique…",
  "Le retentissement fonctionnel est marqué par…",
  "La poursuite du traitement est encouragée…",
  "Je reste à disposition pour de plus amples informations…"
];

export const HOSPITAL_WEEK1_OPTIONS = [
  "motivation",
  "orientation / contexte",
  "type de consommation",
  "histoire de la consommation",
  "fonction de la consommation",
  "autres consommations",
  "ATCD psychiatriques",
  "ATCD de sevrage",
  "suivi en cours",
  "examen mental complet"
];

export const HOSPITAL_WEEK2_OPTIONS = [
  "retour sur la semaine intermédiaire",
  "abstinence ou reconsommation",
  "date et contexte de reconsommation",
  "analyse par le patient",
  "examen clinique bref",
  "suivi envisagé",
  "appréciation générale"
];

export const HOSPITAL_EVOLUTION_OPTIONS = [
  "évolution clinique",
  "tolérance du sevrage",
  "qualité des entretiens",
  "axe d’élaboration",
  "craving ou non",
  "prise de conscience",
  "ajustements thérapeutiques",
  "réflexion sur le suivi",
  "sortie semaine 1",
  "sortie semaine 2"
];

export const ADMINISTRATIVE_QUICK_OPTIONS = [
  "rapport mutuelle",
  "rapport assurance",
  "attestation simple",
  "attestation de présence",
  "attestation de suivi",
  "certificat médical",
  "certificat incapacité"
];

export const LETTER_QUICK_OPTIONS = [
  "courrier médecin traitant",
  "courrier confrère",
  "réponse patient",
  "transmission clinique",
  "confirmation de rendez-vous",
  "relance",
  "report"
];

export const TONE_QUICK_OPTIONS = [
  "sobre",
  "professionnel",
  "direct",
  "chaleureux"
];

export const PLANNING_VISUAL_OPTIONS = ["liste", "ligne du temps", "tableau de bord"];
export const DAY_TEMPLATE_OPTIONS = [
  "lundi matin 74",
  "lundi après-midi consultations",
  "mardi matin entretiens 74",
  "mardi après-midi préadmissions",
  "journée mixte",
  "demi-journée légère",
  "demi-journée lourde"
];

export const TIME_BLOCK_OPTIONS = [
  "matin",
  "après-midi",
  "demi-journée complète",
  "bloc administratif",
  "bloc rapports",
  "bloc mails"
];

export const HALF_DAY_OPTIONS = [
  "lundi matin",
  "lundi après-midi",
  "mardi matin",
  "mardi après-midi",
  "mercredi matin",
  "mercredi après-midi",
  "jeudi matin",
  "jeudi après-midi",
  "vendredi matin",
  "vendredi après-midi"
];

export const TASK_TYPE_OPTIONS = [
  "rapport",
  "mail",
  "appel",
  "consultation",
  "administratif",
  "organisation",
  "lecture",
  "facturation",
  "préparation réunion",
  "suivi patient",
  "clôture dossier",
  "préadmission sevrage"
];

export const TASK_PRIORITY_OPTIONS = ["haute", "moyenne", "basse"];
export const TASK_ENERGY_OPTIONS = ["très simple", "simple", "moyen", "lourd"];
export const TODO_SET_OPTIONS = [
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
];

export const DAILY_GOAL_OPTIONS = ["non commencé", "en cours", "objectif atteint"];
export const HISTORY_VIEW_OPTIONS = ["semaine passée", "semaine à venir", "mois", "historique libre"];
export const PATIENT_CHECKLIST_OPTIONS = [
  "patient vu",
  "note faite",
  "traitement adapté",
  "communication réseau",
  "contact assistante sociale",
  "courrier envoyé",
  "dossier fermé"
];

export const HABIT_OPTIONS = [
  "sport",
  "batterie",
  "guitare",
  "lecture",
  "2L eau",
  "marche",
  "coucher tôt",
  "article",
  "prière"
];

export const GENDER_OPTIONS = ["femme", "homme"];
export const CIVILITY_OPTIONS = ["auto", "madame", "monsieur"];

export const MSE_MODE_OPTIONS = ["rapide", "court", "long", "élaboré"];
export const MSE_PRESET_OPTIONS = [
  "anxieux",
  "anxio-dépressif",
  "dépressif",
  "sevrage alcool",
  "labilité émotionnelle",
  "maniaque",
  "psychotique",
  "fragilité borderline",
  "trauma / hypervigilance"
];

export const MSE_QUICK_OPTIONS = [
  "bien orienté",
  "contact adéquat",
  "discours cohérent",
  "pensée organisée",
  "sans psychose manifeste",
  "sans ralentissement psychomoteur",
  "pas d’élément maniaque franc"
];

export const MSE_ORIENTATION_OPTIONS = [
  "bien orienté dans le temps et l’espace",
  "partiellement désorienté",
  "désorienté"
];

export const MSE_CONTACT_OPTIONS = [
  "contact adéquat",
  "contact distant",
  "contact méfiant",
  "contact fuyant",
  "contact familier",
  "contact engageant",
  "contact pauvre"
];

export const MSE_PRESENTATION_OPTIONS = [
  "présentation soignée",
  "présentation correcte",
  "présentation négligée"
];

export const MSE_COLLABORATION_OPTIONS = [
  "bonne collaboration",
  "collaboration partielle",
  "collaboration limitée"
];

export const MSE_PSYCHOMOTOR_OPTIONS = [
  "absence de ralentissement psychomoteur",
  "ralentissement psychomoteur",
  "agitation psychomotrice"
];

export const MSE_MOOD_OPTIONS = [
  "humeur triste",
  "humeur anxieuse",
  "humeur irritable",
  "labilité émotionnelle",
  "humeur stable",
  "humeur abaissée",
  "humeur dysphorique",
  "humeur fragile"
];

export const MSE_ANXIETY_OPTIONS = [
  "anxiété diffuse",
  "ruminations",
  "attaque de panique",
  "tension interne",
  "angoisse majeure",
  "anxiété anticipatoire",
  "hypervigilance"
];

export const MSE_THOUGHT_OPTIONS = [
  "pensée organisée",
  "pensée ralentie",
  "pensée ruminative",
  "pensée diffluente",
  "pensée délirante",
  "discours cohérent",
  "sans désorganisation",
  "centrée sur les difficultés actuelles"
];

export const MSE_TRAUMA_OPTIONS = [
  "hypervigilance",
  "reviviscences",
  "évitement",
  "pas d’élément traumatique mis en avant"
];

export const RISK_IDEA_OPTIONS = ["absence", "passives", "actives"];
export const RISK_ATTEMPT_OPTIONS = [
  "pas d’antécédent de passage à l’acte",
  "antécédent(s) de passage à l’acte"
];

export const MSE_BEHAVIOR_OPTIONS = [
  "comportement adapté",
  "attitude agitée",
  "attitude ralentie",
  "attitude évitante",
  "attitude hostile",
  "attitude impulsive",
  "contenu",
  "coopérant"
];

export const MSE_SLEEP_OPTIONS = [
  "insomnie",
  "réveils nocturnes",
  "hypersomnie",
  "sommeil non réparateur",
  "sommeil normal",
  "endormissement difficile",
  "cauchemars"
];

export const MSE_FOOD_OPTIONS = [
  "alimentation normale",
  "diminution de l’appétit",
  "augmentation de l’appétit",
  "alimentation irrégulière",
  "appétit diminué",
  "appétit conservé"
];

export const CARE_TYPE_OPTIONS = [
  "suivi psychiatrique régulier",
  "psychothérapie",
  "prise en charge pluridisciplinaire",
  "centre de jour",
  "accompagnement ambulatoire",
  "coordination avec le réseau"
];

export const MEDICATION_PRESENCE_OPTIONS = [
  "sans traitement médicamenteux",
  "avec traitement médicamenteux en cours",
  "adaptation thérapeutique en cours",
  "traitement proposé",
  "switch en cours"
];

export const MED_CLASS_OPTIONS = [
  "ISRS",
  "IRSNa",
  "mirtazapine / autres antidépresseurs",
  "trazodone",
  "antipsychotique atypique",
  "antipsychotique typique",
  "benzodiazépine",
  "hypnotique",
  "thymorégulateur"
];

export const MED_MOLECULE_OPTIONS = [
  "sertraline",
  "escitalopram",
  "fluoxétine",
  "venlafaxine",
  "duloxétine",
  "mirtazapine",
  "trazodone",
  "aripiprazole",
  "quétiapine",
  "olanzapine",
  "rispéridone",
  "halopéridol",
  "lorazépam",
  "diazépam",
  "lormétazépam"
];

export const MED_TIMING_OPTIONS = [
  "matin",
  "midi",
  "18h",
  "soir",
  "22h",
  "si besoin",
  "ponctuel",
  "continu"
];

export const SWITCH_PRESET_OPTIONS = [
  "sertraline → fluoxétine",
  "sertraline → escitalopram",
  "venlafaxine → fluoxétine",
  "venlafaxine → escitalopram",
  "mirtazapine → ISRS",
  "switch libre"
];

export const PSY_WORK_OPTIONS = [
  "travail",
  "chômage",
  "mutuelle",
  "études",
  "incapacité",
  "sans activité",
  "arrêt de travail"
];

export const PSY_INCOME_OPTIONS = [
  "salaire",
  "mutuelle",
  "chômage",
  "CPAS",
  "revenus à préciser"
];

export const PSY_FAMILY_OPTIONS = [
  "vit seul",
  "vit en couple",
  "soutien familial",
  "conflits familiaux",
  "enfants à charge",
  "réseau limité"
];

export const PSY_HOUSING_OPTIONS = [
  "seul",
  "en couple",
  "chez les parents",
  "logement instable",
  "hébergé",
  "institution",
  "sans domicile fixe"
];

export const PSY_NETWORK_OPTIONS = [
  "bon",
  "limité",
  "isolé",
  "soutien familial",
  "réseau conflictuel",
  "réseau ambulatoire présent"
];

export const PSY_STRESS_OPTIONS = [
  "financier",
  "familial",
  "professionnel",
  "isolement",
  "rupture",
  "judiciaire",
  "logement",
  "précarité",
  "charge mentale"
];

export const RISK_QUICK_OPTIONS = [
  "idées noires",
  "scénario",
  "intentionnalité",
  "moyens disponibles",
  "ATCD passage à l’acte",
  "facteurs de protection",
  "impulsivité",
  "ambivalence"
];

export const RISK_IDEA_DETAILED_OPTIONS = ["absence", "passives", "actives"];
export const RISK_SEVERITY_OPTIONS = ["faible", "modéré", "élevé"];
export const RISK_PROTECTION_OPTIONS = [
  "famille",
  "enfants",
  "suivi médical",
  "demande d’aide",
  "projet futur",
  "foi",
  "animal de compagnie",
  "alliance thérapeutique"
];

export const ALCOHOL_TYPE_OPTIONS = [
  "bière",
  "vin",
  "alcool fort",
  "mixte",
  "apéritifs",
  "spiritueux"
];

export const ALCOHOL_PATTERN_OPTIONS = [
  "quotidien",
  "binge",
  "épisodique",
  "fluctuant",
  "majoré le soir",
  "majoré le week-end",
  "avec consommation matinale"
];

export const ALCOHOL_FUNCTION_OPTIONS = [
  "anxiolytique",
  "aide au sommeil",
  "socialisation",
  "gestion émotion",
  "solitude",
  "ennui",
  "habitude",
  "impulsivité",
  "couper les pensées",
  "désinhibition",
  "automédication"
];

export const ALCOHOL_DEPENDENCE_OPTIONS = [
  "craving",
  "perte de contrôle",
  "tolérance",
  "consommation matinale",
  "symptômes de sevrage",
  "retentissement social",
  "retentissement professionnel",
  "tentatives d’arrêt infructueuses",
  "augmentation progressive des quantités"
];

export const ALCOHOL_WITHDRAWAL_OPTIONS = [
  "ambulatoire",
  "hospitalier",
  "DT",
  "convulsions",
  "échec de sevrage antérieur",
  "aucun antécédent de sevrage",
  "sevrage compliqué",
  "sevrage simple"
];

export const OTHER_SUBSTANCE_OPTIONS = [
  "cannabis",
  "cocaïne",
  "benzodiazépines",
  "opiacés",
  "amphétamines",
  "MDMA",
  "tabac",
  "kétamine",
  "médicaments détournés"
];

export const OTHER_SUBSTANCE_FUNCTION_OPTIONS = [
  "anxiolytique",
  "stimulation",
  "désinhibition",
  "sommeil",
  "habitude",
  "gestion émotion",
  "socialisation",
  "automédication"
];

export const WITHDRAW_ORDER_OPTIONS = [
  "18h → midi → soir → matin",
  "18h → midi → matin → soir",
  "ordre standard"
];

export const MAIL_FREQUENT_TYPE_OPTIONS = [
  "réponse courte",
  "transmission clinique",
  "report de rendez-vous",
  "confirmation",
  "envoi de document",
  "relance",
  "réponse à absence",
  "demande d’informations"
];

export const TODO_VIEW_OPTIONS = [
  "panneau réel",
  "liste simple",
  "par demi-journée",
  "par bloc"
];

/**
 * Définition centrale des groupes de sélection.
 * - id = id HTML du conteneur
 * - key = clé dans state.selected
 * - single = vrai si choix unique
 * - direct = clé d’état directe si on ne veut pas passer par selected
 */
export const TOKEN_GROUPS = [
  { id: "docVersionChoices", key: "docVersion", single: true, options: DOC_VERSION_OPTIONS },

  { id: "structurePresetChoices", key: "structurePreset", single: false, options: STRUCTURE_PRESET_OPTIONS },
  { id: "writingBlockChoices", key: "writingBlock", single: false, options: WRITING_BLOCK_OPTIONS },
  { id: "writingPhraseChoices", key: "writingPhrase", single: false, options: WRITING_PHRASE_OPTIONS },

  { id: "hospitalWeek1Choices", key: "hospitalWeek1", single: false, options: HOSPITAL_WEEK1_OPTIONS },
  { id: "hospitalWeek2Choices", key: "hospitalWeek2", single: false, options: HOSPITAL_WEEK2_OPTIONS },
  { id: "hospitalEvolutionChoices", key: "hospitalEvolution", single: false, options: HOSPITAL_EVOLUTION_OPTIONS },

  { id: "administrativeQuickChoices", key: "administrativeQuick", single: false, options: ADMINISTRATIVE_QUICK_OPTIONS },
  { id: "letterQuickChoices", key: "letterQuick", single: false, options: LETTER_QUICK_OPTIONS },
  { id: "toneQuickChoices", key: "toneQuick", single: false, options: TONE_QUICK_OPTIONS },
  { id: "smartPresetChoices", key: "smartPreset", single: false, options: SMART_PRESET_OPTIONS },

  { id: "planningVisualChoices", key: "planningVisual", single: true, options: PLANNING_VISUAL_OPTIONS },
  { id: "dayTemplateChoices", key: "dayTemplate", single: true, options: DAY_TEMPLATE_OPTIONS },
  { id: "timeBlockChoices", key: "timeBlock", single: true, options: TIME_BLOCK_OPTIONS },
  { id: "halfDayChoices", key: "halfDay", single: false, options: HALF_DAY_OPTIONS },

  { id: "taskTypeChoices", key: "taskType", single: false, options: TASK_TYPE_OPTIONS },
  { id: "taskPriorityChoices", key: "taskPriority", single: true, options: TASK_PRIORITY_OPTIONS },
  { id: "taskEnergyChoices", key: "taskEnergy", single: true, options: TASK_ENERGY_OPTIONS },
  { id: "todoSetChoices", key: "todoSet", single: false, options: TODO_SET_OPTIONS },
  { id: "dailyGoalChoices", key: "dailyGoalStatus", single: true, options: DAILY_GOAL_OPTIONS },
  { id: "historyViewChoices", key: "historyView", single: true, options: HISTORY_VIEW_OPTIONS },
  { id: "patientChecklistChoices", key: "patientChecklist", single: false, options: PATIENT_CHECKLIST_OPTIONS },
  { id: "habitChoices", key: "habitChoices", single: false, options: HABIT_OPTIONS },

  { id: "genderChoices", key: "gender", single: true, direct: "gender", options: GENDER_OPTIONS },
  { id: "civilityChoices", key: "civility", single: true, direct: "civility", options: CIVILITY_OPTIONS },

  { id: "themeModeChoices", key: "theme", single: true, direct: "theme", options: APPEARANCE_OPTIONS.themeModeChoices },
  { id: "seasonChoices", key: "season", single: true, direct: "season", options: APPEARANCE_OPTIONS.seasonChoices },
  { id: "fontChoices", key: "font", single: true, direct: "font", options: APPEARANCE_OPTIONS.fontChoices },
  { id: "transparencyChoices", key: "transparency", single: true, direct: "transparency", options: APPEARANCE_OPTIONS.transparencyChoices },
  { id: "shadowChoices", key: "shadowMode", single: true, direct: "shadowMode", options: APPEARANCE_OPTIONS.shadowChoices },

  { id: "mainFrequentMotiveChoices", key: "mainFrequentMotive", single: false, options: MAIN_FREQUENT_MOTIVES },
  { id: "mainFrequentSymptomChoices", key: "mainFrequentSymptom", single: false, options: MAIN_FREQUENT_SYMPTOMS },
  { id: "mainFrequentPlanChoices", key: "mainFrequentPlan", single: false, options: MAIN_FREQUENT_PLANS },
  { id: "alcoholFunctionQuickChoices", key: "alcoholFunctionQuick", single: false, options: ALCOHOL_FUNCTION_QUICK },

  { id: "mseModeChoices", key: "mseMode", single: true, options: MSE_MODE_OPTIONS },
  { id: "msePresetChoices", key: "msePreset", single: true, options: MSE_PRESET_OPTIONS },
  { id: "mseQuickChoices", key: "mseQuick", single: false, options: MSE_QUICK_OPTIONS },

  { id: "mseOrientationChoices", key: "mseOrientation", single: false, options: MSE_ORIENTATION_OPTIONS },
  { id: "mseContactChoices", key: "mseContact", single: false, options: MSE_CONTACT_OPTIONS },
  { id: "msePresentationChoices", key: "msePresentation", single: false, options: MSE_PRESENTATION_OPTIONS },
  { id: "mseCollaborationChoices", key: "mseCollaboration", single: false, options: MSE_COLLABORATION_OPTIONS },
  { id: "msePsychomotorChoices", key: "msePsychomotor", single: false, options: MSE_PSYCHOMOTOR_OPTIONS },
  { id: "mseMoodChoices", key: "mseMood", single: false, options: MSE_MOOD_OPTIONS },
  { id: "mseAnxietyChoices", key: "mseAnxiety", single: false, options: MSE_ANXIETY_OPTIONS },
  { id: "mseThoughtChoices", key: "mseThought", single: false, options: MSE_THOUGHT_OPTIONS },
  { id: "mseTraumaChoices", key: "mseTrauma", single: false, options: MSE_TRAUMA_OPTIONS },
  { id: "riskIdeasChoices", key: "riskIdeas", single: true, options: RISK_IDEA_OPTIONS },
  { id: "riskAttemptChoices", key: "riskAttempt", single: false, options: RISK_ATTEMPT_OPTIONS },
  { id: "mseBehaviorChoices", key: "mseBehavior", single: false, options: MSE_BEHAVIOR_OPTIONS },
  { id: "mseSleepChoices", key: "mseSleep", single: false, options: MSE_SLEEP_OPTIONS },
  { id: "mseFoodChoices", key: "mseFood", single: false, options: MSE_FOOD_OPTIONS },

  { id: "careTypeChoices", key: "careType", single: false, options: CARE_TYPE_OPTIONS },
  { id: "medicationPresenceChoices", key: "medicationPresence", single: true, options: MEDICATION_PRESENCE_OPTIONS },
  { id: "medClassChoices", key: "medClass", single: false, options: MED_CLASS_OPTIONS },
  { id: "medMoleculeChoices", key: "medMolecule", single: false, options: MED_MOLECULE_OPTIONS },
  { id: "medTimingChoices", key: "medTiming", single: false, options: MED_TIMING_OPTIONS },
  { id: "switchPresetChoices", key: "switchPreset", single: true, options: SWITCH_PRESET_OPTIONS },

  { id: "psyWorkChoices", key: "psyWork", single: false, options: PSY_WORK_OPTIONS },
  { id: "psyIncomeChoices", key: "psyIncome", single: false, options: PSY_INCOME_OPTIONS },
  { id: "psyFamilyChoices", key: "psyFamily", single: false, options: PSY_FAMILY_OPTIONS },
  { id: "psyHousingChoices", key: "psyHousing", single: false, options: PSY_HOUSING_OPTIONS },
  { id: "psyNetworkChoices", key: "psyNetwork", single: false, options: PSY_NETWORK_OPTIONS },
  { id: "psyStressChoices", key: "psyStress", single: false, options: PSY_STRESS_OPTIONS },

  { id: "riskQuickChoices", key: "riskQuick", single: false, options: RISK_QUICK_OPTIONS },
  { id: "riskIdeasDetailedChoices", key: "riskIdeasDetailed", single: true, options: RISK_IDEA_DETAILED_OPTIONS },
  { id: "riskSeverityChoices", key: "riskSeverity", single: true, options: RISK_SEVERITY_OPTIONS },
  { id: "riskProtectionChoices", key: "riskProtection", single: false, options: RISK_PROTECTION_OPTIONS },

  { id: "alcTypeChoices", key: "alcType", single: false, options: ALCOHOL_TYPE_OPTIONS },
  { id: "alcPatternChoices", key: "alcPattern", single: false, options: ALCOHOL_PATTERN_OPTIONS },
  { id: "alcFunctionChoices", key: "alcFunction", single: false, options: ALCOHOL_FUNCTION_OPTIONS },
  { id: "alcDependenceChoices", key: "alcDependence", single: false, options: ALCOHOL_DEPENDENCE_OPTIONS },
  { id: "alcWithdrawalChoices", key: "alcWithdrawal", single: false, options: ALCOHOL_WITHDRAWAL_OPTIONS },

  { id: "otherSubstanceChoices", key: "otherSubstance", single: false, options: OTHER_SUBSTANCE_OPTIONS },
  { id: "otherSubstanceFunctionChoices", key: "otherSubstanceFunction", single: false, options: OTHER_SUBSTANCE_FUNCTION_OPTIONS },

  { id: "withdrawOrderChoices", key: "withdrawOrder", single: true, options: WITHDRAW_ORDER_OPTIONS },

  { id: "mailFrequentTypeChoices", key: "mailFrequentType", single: false, options: MAIL_FREQUENT_TYPE_OPTIONS },
  { id: "todoViewChoices", key: "todoView", single: true, options: TODO_VIEW_OPTIONS }
];

/**
 * HTML IDs de champs libres / inputs à sérialiser.
 * On garde ici tout ce qui sera relu par l’état et les générateurs.
 */
export const SERIALIZED_FIELD_IDS = [
  "docDate",
  "mainReason",
  "mainContext",
  "mainPlan",

  "taskInbox",
  "taskDurationEstimate",
  "taskNotesFree",
  "dailyClosingGoal",
  "dailyReportGoal",
  "dailyGoalNotes",
  "historyNotes",
  "patientListInput",
  "patientBlockNotes",
  "weekLabel",
  "dayLabel",
  "planningNotes",
  "habitNotes",

  "mseOrientationFree",
  "msePresentationFree",
  "mseCollaborationFree",
  "msePsychomotorFree",
  "mseDiscourseFree",
  "mseRealityFree",
  "msePerceptionFree",
  "mseAnhedoniaFree",
  "mseTraumaFree",
  "mseInsightFree",
  "mseFree",

  "medDose",
  "treatment",

  "psyChildren",
  "psyAcademic",
  "psyFamilyText",
  "psyContextBrief",
  "psyFree",

  "pastPsychiatric",
  "pastSomatic",
  "pastAddictology",
  "pastFamilyPsychiatric",

  "riskScenario",
  "riskAttemptsFree",

  "alcQty",
  "alcLast",
  "alcStart",
  "alcCharacter",
  "alcVolume",
  "alcDegrees",
  "alcFree",
  "otherSubstances",

  "withdrawDrug",
  "withdrawPattern",
  "withdrawDose",
  "withdrawDays",
  "withdrawStartDate",
  "withdrawOutput",

  "letterRecipient",
  "letterSubject",
  "mailFormality",
  "mailContext",
  "mailActionGoal",
  "mailMainContent"
];

/**
 * Presets :
 * on applique ensuite ces patches dans le state et/ou dans les champs.
 */
export const PRESET_PATCHES = {
  "rapport mutuelle anxio-dépressif": {
    state: {
      type: "administratif",
      subType: "rapport mutuelle",
      gender: "femme"
    },
    selected: {
      mseMode: "long",
      msePreset: "anxio-dépressif",
      mseOrientation: ["bien orienté dans le temps et l’espace"],
      mseContact: ["contact adéquat"],
      msePresentation: ["présentation correcte"],
      mseCollaboration: ["bonne collaboration"],
      msePsychomotor: ["absence de ralentissement psychomoteur"],
      mseMood: ["humeur triste", "humeur fragile"],
      mseAnxiety: ["anxiété diffuse", "ruminations"],
      mseThought: ["discours cohérent", "pensée organisée", "centrée sur les difficultés actuelles"],
      mseBehavior: ["comportement adapté"],
      mseSleep: ["insomnie", "sommeil non réparateur"],
      mseFood: ["appétit conservé"],
      careType: ["suivi psychiatrique régulier", "psychothérapie"],
      medicationPresence: "avec traitement médicamenteux en cours",
      mainFrequentMotive: ["anxiété", "humeur dépressive", "retentissement fonctionnel important"],
      mainFrequentSymptom: ["ruminations", "anhédonie", "fatigabilité", "troubles du sommeil"],
      mainFrequentPlan: ["poursuite du suivi psychiatrique", "adaptation thérapeutique", "soutien ambulatoire"]
    },
    fields: {
      mainReason: "Suivi dans un contexte de symptomatologie anxio-dépressive persistante.",
      mainContext: "Le tableau s’inscrit dans une évolution prolongée avec retentissement fonctionnel important.",
      mainPlan: "Poursuite du suivi, réévaluation clinique régulière et adaptation thérapeutique selon l’évolution."
    }
  },

  "rapport mutuelle dépression chronique": {
    state: {
      type: "administratif",
      subType: "rapport mutuelle"
    },
    selected: {
      mseMood: ["humeur triste", "humeur abaissée"],
      mseAnxiety: ["ruminations"],
      mseSleep: ["insomnie"],
      mainFrequentSymptom: ["anhédonie", "baisse de l’élan", "fatigabilité", "difficultés de concentration"]
    },
    fields: {
      mainReason: "Suivi dans un contexte de dépression chronique.",
      mainContext: "Persistance de symptômes dépressifs avec amélioration partielle seulement."
    }
  },

  "consultation suivi anxio-dépressif": {
    state: {
      type: "consultation",
      subType: "suivi"
    },
    selected: {
      msePreset: "anxio-dépressif",
      mseMood: ["humeur triste"],
      mseAnxiety: ["anxiété diffuse", "ruminations"],
      mseSleep: ["insomnie"],
      careType: ["suivi psychiatrique régulier"]
    }
  },

  "urgences crise suicidaire": {
    state: {
      type: "urgences",
      subType: "évaluation urgences"
    },
    selected: {
      riskIdeas: "actives",
      riskIdeasDetailed: "actives",
      riskSeverity: "élevé",
      mseMood: ["humeur triste"],
      mseAnxiety: ["angoisse majeure"],
      riskQuick: ["idées noires", "intentionnalité", "moyens disponibles"]
    }
  },

  "préadmission sevrage alcool": {
    state: {
      type: "préadmission",
      subType: "évaluation de préadmission"
    },
    selected: {
      alcType: ["mixte"],
      alcPattern: ["quotidien"],
      alcWithdrawal: ["hospitalier", "sevrage simple"]
    },
    fields: {
      alcQty: "8 unités / jour"
    }
  },

  "hospitalisation semaine 1": {
    state: {
      type: "hospitalisation",
      subType: "admission semaine 1"
    },
    selected: {
      hospitalWeek1: ["motivation", "type de consommation", "histoire de la consommation", "fonction de la consommation", "ATCD psychiatriques", "ATCD de sevrage", "suivi en cours", "examen mental complet"],
      alcType: ["mixte"],
      alcPattern: ["quotidien"],
      msePreset: "sevrage alcool",
      mseMood: ["humeur fragile"],
      mseAnxiety: ["anxiété diffuse"],
      mseSleep: ["insomnie"]
    }
  },

  "attestation de présence": {
    state: {
      type: "administratif",
      subType: "attestation de présence"
    }
  },

  "mail réponse simple": {
    state: {
      type: "mail",
      subType: "réponse simple"
    },
    selected: {
      mailFrequentType: ["réponse courte"]
    }
  },

  "anxio-dépressif": {
    selected: {
      msePreset: "anxio-dépressif",
      mseMood: ["humeur triste", "humeur fragile"],
      mseAnxiety: ["anxiété diffuse", "ruminations"],
      mseSleep: ["insomnie"]
    }
  },

  "crise suicidaire": {
    selected: {
      riskIdeas: "actives",
      riskIdeasDetailed: "actives",
      riskSeverity: "élevé",
      riskQuick: ["idées noires", "scénario", "intentionnalité"]
    }
  },

  "sevrage alcool simple": {
    selected: {
      alcPattern: ["quotidien"],
      alcWithdrawal: ["sevrage simple"]
    }
  },

  "sevrage alcool compliqué": {
    selected: {
      alcPattern: ["quotidien", "avec consommation matinale"],
      alcWithdrawal: ["sevrage compliqué", "DT", "convulsions"]
    }
  },

  "insomnie / anxiété": {
    selected: {
      mseAnxiety: ["anxiété diffuse", "tension interne"],
      mseSleep: ["insomnie", "endormissement difficile"]
    }
  },

  "trauma probable": {
    selected: {
      mseTrauma: ["hypervigilance", "reviviscences", "évitement"]
    }
  }
};

/**
 * État par défaut.
 * Les tableaux selected seront remplis automatiquement dans app-state.js
 */
export const DEFAULT_STATE = {
  gender: "femme",
  civility: "auto",

  type: "hospitalisation",
  subType: "admission semaine 1",
  mode: "complet",
  output: "texte",

  theme: "clair",
  season: "printemps",
  font: "inter",
  transparency: "medium",
  shadowMode: "on",

  leftPanelWidth: 360,
  rightPanelWidth: 360,

  leftCollapsed: false,
  rightCollapsed: false,

  rightView: "todo",

  selected: {},
  mainDocs: [],
  letterDocs: [],
  activeMainDocId: null,
  activeLetterDocId: null,

  openedWindows: [],
  taskItems: [],
  recentDocuments: [],
  habitTrack: {},

  alcoholUnits: 0,
  withdrawalPlanText: ""
};

/**
 * Génère la structure vide de selected à partir de TOKEN_GROUPS
 */
export function buildEmptySelectedState() {
  const selected = {};
  for (const group of TOKEN_GROUPS) {
    if (group.direct) continue;
    selected[group.key] = group.single ? "" : [];
  }
  return selected;
}

/**
 * Petits helpers de contexte rédactionnel à utiliser côté UI
 */
export const CONTEXTUAL_LEFT_PANEL = {
  consultation: {
    structures: ["motif + contexte + examen + plan", "intro + clinique + plan"],
    blocks: ["motif / demande", "contexte / histoire", "examen clinique / mental", "traitement", "plan"],
    phrases: ["Je vois en consultation de psychiatrie…", "Sur le plan clinique…", "Plan…"]
  },
  urgences: {
    structures: ["motif + examen + risque + décision", "intro + clinique + orientation"],
    blocks: ["motif / demande", "examen clinique / mental", "risque suicidaire", "conclusion"],
    phrases: ["Est vu aux urgences pour…", "Risque suicidaire…", "Décision / orientation…"]
  },
  hospitalisation: {
    structures: ["admission complète sevrage", "évolution + examen + traitement + projection"],
    blocks: ["consommations", "antécédents", "examen clinique / mental", "traitement", "projection / suite"],
    phrases: ["Évolution générale…", "Dynamique thérapeutique…", "Projection / suite…"]
  },
  "préadmission": {
    structures: ["motif + consommation + examen + indication"],
    blocks: ["motif / demande", "consommations", "psychosocial", "conclusion"],
    phrases: ["Évaluation de préadmission…", "Indication…"]
  },
  administratif: {
    structures: ["mutuelle structurée", "intro + clinique + conclusion"],
    blocks: ["retentissement fonctionnel", "psychosocial", "traitement", "conclusion"],
    phrases: ["Au début de la prise en charge…", "Actuellement, il persiste…", "Je reste à disposition…"]
  },
  mail: {
    structures: ["mail bref structuré", "objet + contexte + action"],
    blocks: ["motif / demande", "conclusion"],
    phrases: ["Bonjour,…", "Je reviens vers vous concernant…", "Bien à vous."]
  }
};
