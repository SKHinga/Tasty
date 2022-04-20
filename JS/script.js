const mode = document.getElementById('mode');
mode.onclick = function(){
  document.body.classList.toggle('dark-mode');
  if (document.body.classList.contains('dark-mode')){
    mode.name = "sunny-outline"
  } else {
    mode.name = "moon-outline"
  }
}

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.bar');

hamburger.addEventListener('click', ()=>{
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});




// fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=pasta`)
//   .then(res => res.json())
//   .then(data => console.log(data))