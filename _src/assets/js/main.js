'use strict';

let inputSearch = document.querySelector('.search__movie');
const btnSearch = document.querySelector('.btn__search');
const urlBase = 'http://api.tvmaze.com/search/shows?q=';
let showList = document.querySelector('.show__shows');
const aside = document.querySelector('aside');
const showFavList = document.querySelector('.section__fav--movies');
const defaultImg = 'https://via.placeholder.com/210x295/cc8383/000';

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
    
    if (showImage !== null) {
        showList.innerHTML += `<li id='${item.show.id}' class='show__list--item'>
         <h3 class='show__title'>${item.show.name}</h3>
         <img src='${item.show.image.medium}' alt='${item.show.name}'>
         <div class="show__item--info">
         <span>Género: ${item.show.genres}</span>
         <a class='show__link" href='${item.show.url}' title='Ver ficha' target='_blank'><i class="fas fa-chevron-circle-right"></i> Ver ficha</a>
         </div>
         </li>`;
    } else {
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
  const selectedShow = event.currentTarget; // Revisar
  const index = event.currentTarget.id; // Revisar con parent
  const object = getShowObject(index); // Revisar poner el object en la función de pintar
  if (favourites.includes(object.show) !== true) {
    favourites.push(object.show); 
    selectedShow.classList.toggle('fav__show--style'); // Revisar
    selectedShow.classList.toggle('show__list--item');
    paintFavourites(favourites);
    setLocalStorage(favourites);
    } 
    else {
      favourites.splice(object.show, 1); // Revisar
      selectedShow.classList.toggle('fav__show--style');
      selectedShow.classList.toggle('show__list--item');
      setLocalStorage(favourites);
    //   paintFavourites(favourites);
    }
}

// function saveFavourites(event) {
//     const selectedShow = event.currentTarget;
//     selectedShow.setAttribute('class', 'fav__show--style');
//     const index = event.currentTarget.id;
//     const object = getShowObject(index);
//     if (favourites.indexOf(index) === -1) {
//       favourites.push(object.show);
//       paintFavourites(favourites);
//       setLocalStorage(favourites);
//       }
//   } else if (event) {
//       event.preventDefault();
//   }


// Pintar los favoritos
function paintFavourites(favourites) {
  showFavList.innerHTML = '';
  const sectionFav = document.querySelector('.section__fav--movies');
  for (let favourite of favourites) {
    if (favourite) {
      aside.classList.remove('hidden');
      if (favourite.image !== null) {
        sectionFav.innerHTML += `<li id=${favourite.id} class="fav__list--item"><img src="${favourite.image.medium}" alt="${favourite.name}"> <h4>${favourite.name}</h4>
        <button class="btn__remove--fav type="button>x</button></li>`;
      } else {
        sectionFav.innerHTML += `<li id=${favourite.id} class="fav__list--item"><img src="${defaultImg}" alt="${favourite.name}"><h4>${favourite.name}</h4>
        <button class="btn__remove--fav type="button>x</button></li>`;
      }
    } 
  }
}

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
  let favourites = JSON.parse(localStorage.getItem('favourites'));

  if (favourites !== null) {
    return favourites;
  } else {
    return favourites = []; // Para evitar que dé error, devolver un array vacío donde poder almacenar los ids
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