'use strict';

let inputSearch = document.querySelector('.search__movie');
const btnSearch = document.querySelector('.btn__search');
const urlBase = 'https://api.tvmaze.com/search/shows?q=';
let showList = document.querySelector('.show__shows');
const aside = document.querySelector('aside');
const showFavList = document.querySelector('.section__fav--movies');
const defaultImg = 'https://fakeimg.pl/210x295/FFF/000/?text=No%20disponible';
const btnRemoveAll = document.querySelector('.btn__remove--all');

let shows = null;
let favourites = readLocalStorage();

// Conectar con la API 
function connectToApi() {
    showList.innerHTML = '';
    fetch(urlBase + inputSearch.value)
      .then (response => response.json())
      .then (data => {
        shows = data;
        paintResults(shows);
        paintFavourites(favourites);
      })
}

// Pintar los resultados de la búsqueda
function paintResults(arr) {
  for (let item of arr) {
    let showImage = item.show.image;
    const searchSection = document.querySelector('.search__shows');
    const resultsTitle = document.querySelector('h1');
    resultsTitle.classList.add('hidden');
    searchSection.classList.remove('full_screen');
    showList.classList.add('medium_screen');
    
    showList.innerHTML += `<li id='${item.show.id}' class='show__list--item'><h3 class='show__title'>${item.show.name}</h3><img src='${showImage === null ? `${defaultImg}` : `${showImage.medium}`}' alt='${item.show.name}'><div class="show__item--info overlay"> <span class="overlay__text">Mas información</span><span>Género: ${item.show.genres}</span><br><span>Idioma: ${item.show.language}</span><br><span>Sinopsis: ${item.show.summary === null || item.show.summary.length === 0 ? 'No disponible' : `${item.show.summary}`}</span><br></div></li>`;
  }
  addClickListeners();
}

// Listeners para la lista de resultados
function addClickListeners() {
  const showItem = document.querySelectorAll('.show__list--item');
  for (let show of showItem) {
    show.addEventListener('click', saveFavourites);
  }
}

// Relacionar id de favoritos con el array de objetos shows
function getShowObject(id) {
  return shows.find(show => show.show.id === parseInt(id));
}

// Guardar como favoritos
function saveFavourites(event) {
  const selectedShow = event.currentTarget;
  const id = event.currentTarget.id;
  const object = getShowObject(id); 
  const findShow = favourites.findIndex(shows => parseInt(shows.id) === parseInt(id)); // Situar el id en el index
  if (findShow === -1) {
    favourites.push(object.show); 
    selectedShow.classList.add('fav__show--style');
    selectedShow.classList.remove('show__list--item');
    paintFavourites(favourites);
    setLocalStorage(favourites);
    } else {
      favourites.splice(findShow, 1);
      selectedShow.classList.remove('fav__show--style');
      selectedShow.classList.add('show__list--item');
      setLocalStorage(favourites);
      paintFavourites(favourites);
    }
}

// Pintar favoritos
function paintFavourites(favourites) {
  showFavList.innerHTML = '';
  const sectionFav = document.querySelector('.section__fav--movies');
  for (let favourite of favourites) {
    aside.classList.remove('hidden');
    sectionFav.innerHTML += `<li id=${favourite.id} class="fav__list--item"><img src="${favourite.image === null ? `${defaultImg}` : `${favourite.image.medium}`}" alt="${favourite.name}"><h4 class="fav__item--title"><a href="${favourite.url}" title="Ver ficha." aria-label="Ver ficha." target="_blank">${favourite.name}</a></h4><button class="btn__remove--single" type="button">x</button></li>`;
    removeSingleFavouriteHandler();
  } 
}

function hideFavSection() {
  if (favourites === '') {
    aside.classList.add('hidden');
  }
}

// Funciones para eliminar favoritos
function removeAllFavourites() {
  localStorage.removeItem('favourites');
  showFavList.innerHTML = '';
  aside.classList.add('hidden');
  favourites = [];
}
btnRemoveAll.addEventListener('click', removeAllFavourites);

function removeSingleFavouriteHandler() {
  const btnRemoveSingle = document.querySelectorAll('.btn__remove--single');
  for (let btn of btnRemoveSingle){
    btn.addEventListener('click', removeSingleFavourite);
    hideFavSection();
  }
}

function removeSingleFavourite(event) {
  const id = event.currentTarget.parentElement.id;
  const findShow = favourites.findIndex(shows => parseInt(shows.id) === parseInt(id));
  favourites.splice(findShow, 1); 
  setLocalStorage(favourites);
  paintFavourites(favourites);
}

// Setear localStorage, recibe como parámetro el array de los ids favoritos
function setLocalStorage(favourites) {
  localStorage.setItem('favourites',JSON.stringify(favourites));
}

// Leer localStorage
function readLocalStorage() {
  let localFavourites = JSON.parse(localStorage.getItem('favourites'));

  if (localFavourites !== null) {
    return localFavourites;
  } else {
    return localFavourites = []; // Para evitar que dé error, devolver un array vacío donde poder almacenar los ids
  }
}

// Conectar la tecla 'Enter' con el botón de búsqueda 
function inputEnter(event) {
  if(event.keyCode === 13) {
    btnSearch.click();
  }
}
inputSearch.addEventListener('keyup', inputEnter);

btnSearch.addEventListener('click', connectToApi);
//# sourceMappingURL=main.js.map
