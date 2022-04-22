// light and dark mode toggle
const mode = document.getElementById('mode');
mode.onclick = function(){
  document.body.classList.toggle('dark-mode');
  if (document.body.classList.contains('dark-mode')){
    mode.name = "sunny-outline"
  } else {
    mode.name = "moon-outline"
  }
}
// responsive hamburger menu
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.bar');

hamburger.addEventListener('click', ()=>{
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});
// Meals that includes ingredients
let mealResults = document.querySelector('.meal-results');
mealResults.addEventListener('click', getMealList);
document.getElementById('btnClick').onclick = function(){myFunction()};
function myFunction(){
  // e.preventDefault();
  let searchInput = document.getElementById('search').value;
  let notFound = document.querySelector('.not-found');
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput}`)
  .then(res => res.json())
  .then(data => {
    // let mealResults = document.querySelector('.meal-results');
    if(data.meals){
      mealResults.innerHTML = '';
      data.meals.forEach(meal => {
        mealResults.innerHTML += `
        <div class="col-lg-4 col-md-6 col-12 result">
          <div class="card" style="width: 20rem;" data-id ="${meal.idMeal}")>
            <img src="${meal.strMealThumb}" class="card-img-top" alt="food img">
            <div class="card-body">
              <h5 class="card-title">${meal.strMeal}</h5>
              <a href="#" class="btn" id="get-recipe">Open Recipe</a>
            </div>
          </div>
       </div>`;
      });
    } else {
      notFound.style = 'display:block;'
    }

  })
  mealResults.children.remove;
  notFound.style.display = 'none';
}

function getMealList (e){
  e.preventDefault();
  if(e.target.classList.contains('btn')){
    let item = e.target.parentElement.parentElement;
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${item.dataset.id}`)
    .then(response => response.json())
    .then(data => {
      mealRecipeModal(data.meals)
    })
  }
}

let details = document.querySelector('.details');
details.innerHTML = '';

function mealRecipeModal(meal){
  meal = meal[0];
  details.style.display = 'block';
  details.innerHTML += `
  <ion-icon name="close-outline" id="close-btn" class="fs-1 ex"></ion-icon>
  <h2 class="text-center" >${meal.strMeal}</h2>
  <p class="text-center category" >${meal.strCategory}</p>
  <div class="instructions text-center">
    <h4>Instruction:</h4>
  <p>${meal.strInstructions}</p>
  <p></p>
  </div>
  <div class="recipe-link text-center">
    <a href="${meal.strYoutube}" target="_blank">Watch Video</a>
  </div>
  `
  mealResults.style = 'display: none;'

  let closeBtn = document.getElementById('close-btn')
  closeBtn.addEventListener('click', () =>{
    mealResults.style = 'display: flex;'
    details.style = 'display:none;';
    details.innerHTML = '';
  })
};