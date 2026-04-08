// ================= STATE =================
const state = {
  type: "consultation",
  symptoms: new Set(),
  plans: new Set(),
  alcohol: false
};

// ================= UTILS =================
function $(id){ return document.getElementById(id); }

function v(arr){
  return arr[Math.floor(Math.random()*arr.length)];
}

function join(arr){
  return arr.join(", ");
}

// ================= RENDER =================

function render(){

  renderChoices("typeChoices", ["consultation","urgence","hospitalisation"], "type", true);

  renderChoices("symptomChoices",
    ["anxiété","ruminations","anhédonie","insomnie","idées noires"],
    "symptoms"
  );

  renderChoices("planChoices",
    ["suivi","hospitalisation","réévaluation"],
    "plans"
  );

}

// ================= CHOICES =================

function renderChoices(container, items, key, single=false){

  $(container).innerHTML = items.map(item => {

    let active = single
      ? state[key] === item
      : state[key].has(item);

    return `
      <button class="${active?"active":""}"
        onclick="select('${key}','${item}',${single})">
        ${item}
      </button>
    `;
  }).join("");

}

function select(key,value,single){

  if(single){
    state[key]=value;
  }else{
    if(state[key].has(value)) state[key].delete(value);
    else state[key].add(value);
  }

  render();
  liveUpdate();
}

// ================= TEXT =================

function buildText(){

  let txt = "";

  txt += `Évolution générale : `;

  txt += v([
    "Tableau fluctuant.",
    "Évolution partielle.",
    "Amélioration progressive."
  ]);

  if(state.symptoms.size){
    txt += " Présence de " + join(Array.from(state.symptoms));
  }

  txt += "\n\nExamen mental : ";

  txt += "Patient orienté, contact bon.";

  if(state.symptoms.has("anxiété"))
    txt += " Anxiété présente.";

  if(state.symptoms.has("idées noires"))
    txt += " Idées noires sans passage à l’acte.";

  txt += "\n\nProjection : ";

  if(state.plans.size){
    txt += join(Array.from(state.plans));
  }

  return txt;
}

// ================= UPDATE =================

function liveUpdate(){
  $("output").value = buildText();
}

// ================= UI =================

function toggleSidebar(){
  $("sidebar").classList.toggle("hidden");
}

function openAlcohol(){
  state.alcohol = true;
  state.symptoms.add("anxiété");
  state.symptoms.add("insomnie");
  liveUpdate();
}

// ================= INIT =================

render();
liveUpdate();
