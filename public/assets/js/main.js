'use strict';

let inputSearch = document.querySelector('.search__movie');
const btnSearch = document.querySelector('.btn__search');
const urlBase = 'http://api.tvmaze.com/search/shows?q=';
let showList = document.querySelector('.show__shows');
const aside = document.querySelector('aside');
const showFavList = document.querySelector('.section__fav--movies');
const defaultImg = 'https://via.placeholder.com/210x295/cc8383/000';

let shows = null;
let favourites = [];

// Connect to API 
function connectToApi() {
    showList.innerHTML = '';
    fetch(urlBase + inputSearch.value)
      .then (response => response.json())
      .then (data => {
        shows = data;
        paintResults(shows);
      })
}

// Pinto los resultados de búsqueda
function paintResults(arr) {
  for (let item of arr) {
    let showImage = item.show.image;
    
    if (showImage !== null) {
        showList.innerHTML += `<li id='${item.show.id}' class='show__list--item'>
         <h3 class='show__title'>${item.show.name}</h3>
         <img src='${item.show.image.medium}' alt='${item.show.name}'>
         <span>Género: ${item.show.genres}</span>
         <a class='show__link" href='${item.show.url}' title='Ver ficha' target='_blank'><i class="fas fa-chevron-circle-right"></i> Ver ficha</a>
         </li>`;
    } else {
        showList.innerHTML +=
        `<li id='${item.show.id}' class='show__list--item'>
         <h3 class='show__title'>${item.show.name}</h3>
         <img src=${defaultImg} alt='${item.show.name}'>
         <span>Género: ${item.show.genres}</span>
         <a class='show__link" href='${item.show.url}' title='Ver ficha' target='_blank'><i class="fas fa-chevron-circle-right"></i> Ver ficha</a>
         </li>`; 
    }
  }
  addClickListeners();
}

// Listeners de la lista de resultados para guardar en favoritos
function addClickListeners() {
    const showItem = document.querySelectorAll('.show__list--item');
    for (let show of showItem) {
        show.addEventListener('click', saveFavourites);
    }
}

// Guardar favoritos

function saveFavourites(event) {
    const selectedShow = event.currentTarget;
    selectedShow.setAttribute('class', 'fav__show--style');
    const index = event.currentTarget.id;
    const object = getShowObject(index);
    if (favourites.includes(object.show) === false) {
        favourites.push(object.show);
        // paintFavourites(favourites);
    }
}

// Pintar los favoritos

// Relacionar id de favoritos con el array de objetos shows
function getShowObject(id) {
    return shows.find(show => show.show.id === parseInt(id));
  }

// Función para conectar la tecla 'Enter' con el botón de búsqueda 
function inputEnter(event) {
  if(event.keyCode === 13) {
    btnSearch.click();
  }
}
inputSearch.addEventListener('keyup', inputEnter);

btnSearch.addEventListener('click', connectToApi);
connectToApi();

//# sourceMappingURL=main.js.map
