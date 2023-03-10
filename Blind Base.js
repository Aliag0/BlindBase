function Score(id, T) {    // inscrit le score dans la case demandé
      let element = document.getElementById(id);
      let total = document.getElementById(T);
      let content = element.innerHTML;
      element.innerHTML = (parseInt(content) + 1).toString();
      new_total = total.innerHTML;
      total.innerHTML = (parseInt(new_total) + 1).toString(); }

function checkBox() {   // changer les themes de la page
      if (document.getElementById("checkbox").checked) {
            document.body.style.backgroundColor = 'rgba(35, 35, 45, 0.9)';
            document.querySelector('.navbar').style.backgroundColor = 'rgb(30, 30, 30)';
            document.querySelector('.navbar__links').style.backgroundColor = 'rgba(35, 35, 35, 0.7)';
            document.getElementById('text_color').style.color = 'white';
            document.querySelector('.score').style.backgroundColor = 'rgb(175, 175, 175)'; }
      else {
            document.body.style.backgroundColor = 'white';
            document.querySelector('.navbar').style.backgroundColor = 'white';
            document.querySelector('.navbar__links').style.backgroundColor = 'rgba(112, 112, 112, 0.7)';
            document.getElementById('text_color').style.color = 'black';
            document.querySelector('.score').style.backgroundColor = 'white'; }}

function sliderJs(id, num_value, num_base) {  // change valeur du volume des bases
      let slider = document.getElementById(id);
      let valueX = document.querySelector(num_value);
      valueX.innerHTML = slider.value;
      fetch(`/api/${valueX.innerHTML}/${num_base}`); }

const BASE_ETEINTE = 0;
const BASE_ALLUME = 2;

for (let i = 0; i < 4; i++) {
      const e = document.getElementById(`button${i}`);
      e.status = BASE_ETEINTE;
      e.onclick = baseClick; }

function baseClick(event) {
      const element = event.srcElement;
      let otherBases = [];
      let etatBases = [];
      for (let i = 0; i < 4; i++) {
            let e = document.getElementById(`button${i}`);
            var t = document.querySelector(`.on_off${i}`);
            etatBases.push(t);
            if (e != element)
                  otherBases.push(e); }
      if (element.status == BASE_ETEINTE) {
            fetch(`/api/play/${element.value - 1}`, { method: 'POST' });
            element.style.backgroundColor = 'green';
            element.status = BASE_ALLUME; }
      else if (element.status == BASE_ALLUME) {
            fetch(`/api/stop/${element.value - 1}`, { method: 'POST' });
            element.style.backgroundColor = 'white';
            element.status = BASE_ETEINTE; 
      }
      if (etatBases[element.value - 1].innerHTML == "ON") {
            etatBases[element.value - 1].innerHTML = "OFF"; }}

async function reponseFetch() {
      let reponse = Boolean();
      try {
            fetch(`/api/play/${i}`, { method: 'POST' }); }
      catch (e){
            if (e instanceof TypeError) {
                  reponse = Boolean(fetch(`/api/play/${i}`, { method: 'POST' })); }}
      return reponse; }

function toggleMenu() {      // pour afficher le menu avec les detailles des 4 bases
      const FELCHE_OFF = 0;
      const FELCHE_ON = 1;
      let flA = FELCHE_OFF;
      let otherFleches = []
      const navbar = document.querySelector('.navbar');
      const burger = document.querySelector('.burger');
      for (let i = 0; i < 4; i++){
            let f = document.getElementById(`Fleche${i}`);
            f.status = FELCHE_OFF;
            otherFleches.push(f); }
      const flecheAll = document.getElementById('all');
      burger.addEventListener('click', () => {
            navbar.classList.toggle('show-nav');
            if (flA == FELCHE_ON) {
                  navbar.classList.toggle('show-fleche_all');
                  flA = FELCHE_OFF; }
            for (let i = 0; i < 4; i++) {
                  if (otherFleches[i].status == FELCHE_ON) {
                        navbar.classList.toggle(`show-fleche${i}`);
                        otherFleches[i].status = FELCHE_OFF; }}});
      flecheAll.addEventListener('click', () => {
            if (flA == FELCHE_OFF) {
                  navbar.classList.toggle('show-fleche_all');
                  flA = FELCHE_ON;
                  for (let i = 0; i < 4; i++) {
                        if (otherFleches[i].status == FELCHE_OFF) {
                              navbar.classList.toggle(`show-fleche${i}`);
                              otherFleches[i].status = FELCHE_ON; }}}
            else if (flA == FELCHE_ON) {
                  navbar.classList.toggle('show-fleche_all');
                  flA = FELCHE_OFF;
                  for (let i = 0; i < 4; i++) {
                        if (otherFleches[i].status == FELCHE_ON) {
                              navbar.classList.toggle(`show-fleche${i}`);
                              otherFleches[i].status = FELCHE_OFF; }}}});
      for (let i = 0; i < 4; i++) {
            otherFleches[i].addEventListener('click', () => {
                  if (otherFleches[i].status == FELCHE_OFF) {
                        navbar.classList.toggle(`show-fleche${i}`);
                        otherFleches[i].status = FELCHE_ON; }
                  else if (otherFleches[i].status == FELCHE_ON) {
                        navbar.classList.toggle(`show-fleche${i}`);
                        otherFleches[i].status = FELCHE_OFF; }})}}
toggleMenu();