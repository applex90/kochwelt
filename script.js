let saveNav = ""; //Save navpoint for mobile Nav-highlighting
let ingridientsMenu1 = [0.25, 0.5, 125, 0.5, 50, 0.25, 0, 0.25, 31.25, 0];
let ingridientsMenu2 = [330, 150, 25, 10, 1, 1, 20, 4, 1, 1, 150, 0, 0];
let ingridientsMenu3 = [0.25, 75, 50, 125, 31.25, 31.25, 1.25, 0.0625, 0.5, 0.5, 1.25, 0, 0.75, 0.25, 0, 31.25, 2, 0.25, 0, 0, 0, 0];
let ingridientsMenu4 = [25, 1.25, 1.5, 0.25, 0.25, 0.25, 62.5, 125, 12.5, 1.5, 1, 0];
let ingridientsArray = [ingridientsMenu1, ingridientsMenu2, ingridientsMenu3, ingridientsMenu4];


async function initRecipe(recipeId) {
  await includeHTML();
  let menu = ingridientsArray[recipeId - 1];
  calculateIngridientsOf(menu);
}


function calculateIngridientsOf(menu) {
  let portionsNr = document.getElementById('calc-factor').value; //get value to multiply
  let portions = portionsNr.replace(',', '.'); //replace "," with "."
  //check if portions is not NaN and greater than 0
  if (!isNaN(portions) && portions > 0) {
    calcAllIngridients(menu, portions);
  }
}


function calcAllIngridients(menu, portions) {


  for (let i = 0; i < menu.length; i++) {

    let initalAmountMenu = menu[i];

    if (menu[i] > 0) {
      let newAmount = portions * initalAmountMenu;
      ingridientItemAmountToDecimal = newAmount.toFixed(2);
      let result = ingridientItemAmountToDecimal.replace(".", ",");
      document.getElementById(`amount${i}`).innerHTML = result;

    }
  }
}


function init(navElement) {
  saveNav = navElement;
  includeHTML();
  //Highlight and create recipeOfDay if elements exists
  let awaitIncludeNav = setInterval(() => {
    if (navIncluded()) {
      highlightNav(navElement);
      clearInterval(awaitIncludeNav);
    }
    console.log("w");
  }, 20);

  if (navElement == "nav0") {
    let awaitIncludeRandomRecipe = setInterval(() => {
      if (randomRecipeIncluded()) {
        randomRecipe(navElement);
        clearInterval(awaitIncludeRandomRecipe);
      }
    }, 20);
  }
}


function navIncluded() {
  let nav = document.getElementById('nav');
  return nav;
}


function randomRecipeIncluded() {
  let recipeContent = document.getElementById('recipe-of-day-random-content');
  return recipeContent;
}


//Render include files
function includeHTML() {
  var z, i, elmnt, file, xhttp;
  /* Loop through a collection of all HTML elements: */
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("w3-include-html");
    if (file) {
      /* Make an HTTP request using the attribute value as the file name: */
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
          if (this.status == 200) { elmnt.innerHTML = this.responseText; }
          if (this.status == 404) { elmnt.innerHTML = "Page not found."; }
          /* Remove the attribute, and call this function once more: */
          elmnt.removeAttribute("w3-include-html");
          includeHTML();
        }
      }
      xhttp.open("GET", file, true);
      xhttp.send();
      /* Exit the function: */
      return;
    }
  }
}


function openMobileMenu() {
  document.getElementById('topnav').style.transform = "translateY(126px)";
  document.getElementById('mobileMenu-btn').innerHTML = "&#10006;"
  document.getElementById('mobileMenu-btn').onclick = closeMobileMenu;
  //Highlight mobileNav
  highlightNav("mobile" + saveNav);
}


function closeMobileMenu() {
  document.getElementById('topnav').style.transform = "translateY(-200px)";
  document.getElementById('mobileMenu-btn').innerHTML = "&#9776;"
  document.getElementById('mobileMenu-btn').onclick = openMobileMenu;
}


function highlightNav(navElement) {
  document.getElementById(navElement).classList.add('active');
}


function randomRecipe(navElement) {
  //Array of week Sunday = 0 to Saturday = 6
  let recipesOfWeek = ["recipe1", "recipe2", "recipe3", "recipe4", "recipe1", "recipe2", "recipe3"];
  let date = new Date();
  let day = date.getDay();
  let arraySelector = day;

  chooseRecipe(navElement, arraySelector, recipesOfWeek);
}


function chooseRecipe(navElement, arraySelector, recipesOfWeek) {
  let recipeSuggestion = document.getElementById('recipe-of-day-random-content');

  if (navElement == "nav0") {
    switch (arraySelector) {
      case 0:
      case 4:
        recipeSuggestion.innerHTML = previewRecipe1();
        break;
      case 1:
      case 5:
        recipeSuggestion.innerHTML = previewRecipe2();
        break;
      case 2:
      case 6:
        recipeSuggestion.innerHTML = previewRecipe3();
        break;
      case 3:
        recipeSuggestion.innerHTML = previewRecipe4();
    }
  } else if (navElement == "nav1") {
    document.getElementById('recipe-include').innerHTML = `
    <div w3-include-html="./${recipesOfWeek[arraySelector]}.html"></div>
    `;
    init('nav1');
    renderIngrientsCalc(arraySelector, recipesOfWeek);
  }

}


function previewRecipe1() {
  return `
  <img src="./img/salad.jpg" class="middle-img">
  <div class="recipe-of-day-info">
      <h2>Griechischer Bauernsalat</h2>
      <span>Zaubern Sie eine Vorspeise der griechischen Küche.<br>In ca. 15 Minuten entsteht ein leckerer Bauernsalat.</span>
      <a href="dayrecipe.html"><button class="button-open">Rezept öffnen</button></a>
  </div>
`;
}


function previewRecipe2() {
  return `
  <img src="./img/croissant.jpg" class="middle-img">
  <div class="recipe-of-day-info">
      <h2>Butter - Croissants</h2>
      <span>Schmackhafte Croissants können auch zu Hause sehr einfach gebacken werden.<br>
      Probieren Sie doch mal die Zubereitung leckerer Butter - Croissants aus.</span>
      <a href="dayrecipe.html"><button class="button-open">Rezept öffnen</button></a>
  </div>
`;
}


function previewRecipe3() {
  return `
  <img src="./img/lasagne.jpg" class="middle-img">
  <div class="recipe-of-day-info">
    <h2>Lasagne</h2>
    <span>Unser Rezept für eine klassische italienische Lasagne zeigt dir alles um sie ganz einfach selbst zuzubereiten.</span>
    <a href="dayrecipe.html"><button class="button-open">Rezept öffnen</button></a>
  </div>
`;
}


function previewRecipe4() {
  return `
  <img src="./img/kaiserschmarrn.jpg" class="middle-img">
  <div class="recipe-of-day-info">
    <h2>Kaiserschmarrn - Tiroler Landgasthofrezept</h2>
    <span>Dieses traditionelle Rezept stammt aus einem Tiroler Landgasthof und wird dort seit vielen Generationen so zubereitet.<br>
    Es enthält einige schöne Geheimnisse aus Omas Trickkiste, die nicht immer preisgegeben werden.</span>
    <a href="dayrecipe.html"><button class="button-open">Rezept öffnen</button></a>
  </div>
`;
}


function renderIngrientsCalc(arraySelector, recipesOfWeek) {
  let calcInterval = setInterval(() => {
    if (document.getElementById('calc-factor')) {
      initRecipe(recipesOfWeek[arraySelector].charAt(recipesOfWeek.length-1));
      clearInterval(calcInterval);
    }
  }, 10);
}

