'use strict';

let inputSearch = document.querySelector('.search__movie');
const btnSearch = document.querySelector('.btn__search');
const urlBase = 'http://api.tvmaze.com/search/shows?q=';
let showList = document.querySelector('.show__shows');
const aside = document.querySelector('aside');
const showFavList = document.querySelector('.section__fav--movies');
const defaultImg = 'https://via.placeholder.com/210x295/cc8383/000';
const btnRemoveAll = document.querySelector('.btn__remove--all');

let shows = null;
let favourites = readLocalStorage();

// Connect to API 
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

// Pintar los resultados de búsqueda
function paintResults(arr) {
  for (let item of arr) {
    let showImage = item.show.image;
    const searchSection = document.querySelector('.search__shows');
    
    if (showImage !== null) {
        searchSection.classList.remove('full_screen');
        showList.classList.add('medium_screen');
        showList.innerHTML += `<li id='${item.show.id}' class='show__list--item'>
         <h3 class='show__title'>${item.show.name}</h3>
         <img src='${item.show.image.medium}' alt='${item.show.name}'>
         <div class="show__item--info">
         <span>Género: ${item.show.genres}</span>
         <a class='show__link" href='${item.show.url}' title='Ver ficha' target='_blank'><i class="fas fa-chevron-circle-right"></i> Ver ficha</a>
         </div>
         </li>`;
    } else {
      searchSection.classList.remove('full_screen');
        showList.innerHTML +=
        `<li id='${item.show.id}' class='show__list--item'>
         <h3 class='show__title'>${item.show.name}</h3>
         <img src=${defaultImg} alt='${item.show.name}'>
         <div class="show__item--info">
         <span>Género: ${item.show.genres}</span>
         <a class='show__link" href='${item.show.url}' title='Ver ficha' target='_blank'><i class="fas fa-chevron-circle-right"></i> Ver ficha</a>
         </div>
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
  const id = event.currentTarget.id;
  const object = getShowObject(id); 
  const findShow = favourites.findIndex(shows => parseInt(shows.id) === parseInt(id)); // Situar el id en el index, hay que parsear ambos o no funciona 
  if (findShow === -1) {
    favourites.push(object.show); 
    selectedShow.classList.toggle('fav__show--style'); // Cambiar
    selectedShow.classList.toggle('show__list--item');
    paintFavourites(favourites);
    setLocalStorage(favourites);

    } 
    else {
      favourites.splice(findShow, 1); 
      selectedShow.classList.toggle('fav__show--style');
      selectedShow.classList.toggle('show__list--item');
      setLocalStorage(favourites);
      paintFavourites(favourites);
    }
}

// Pintar los favoritos
function paintFavourites(favourites) {
  showFavList.innerHTML = '';
  const sectionFav = document.querySelector('.section__fav--movies');
  for (let favourite of favourites) {
      if (favourite.image !== null) {
        aside.classList.remove('hidden');
        sectionFav.innerHTML += `<li id=${favourite.id} class="fav__list--item"><img src="${favourite.image.medium}" alt="${favourite.name}"> <h4>${favourite.name}</h4>
        <button class="btn__remove--single" type="button>x</button></li>`;
      } else {
        sectionFav.innerHTML += `<li id=${favourite.id} class="fav__list--item"><img src="${defaultImg}" alt="${favourite.name}"><h4>${favourite.name}</h4>
        <button class="btn__remove--single" type="button>x</button></li>`;
    }
  } 
}

function removeFavourites() {
  localStorage.removeItem('favourites');
  showFavList.innerHTML = '';
}
btnRemoveAll.addEventListener('click', removeFavourites);


// Relacionar id de favoritos con el array de objetos shows
function getShowObject(id) {
  return shows.find(show => show.show.id === parseInt(id));
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
// paintFavourites(favourites);
connectToApi();
//# sourceMappingURL=main.js.map
