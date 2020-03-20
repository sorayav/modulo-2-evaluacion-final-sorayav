'use strict';

let inputSearch = document.querySelector('.search__movie');
const btnSearch = document.querySelector('.btn__search');
const aside = document.querySelector('aside');
const urlBase = 'http://api.tvmaze.com/search/shows?q=';
let showList = document.querySelector('.show__shows');
const showFavList = document.querySelector('.section__fav--movies');

let shows = null;
let favShows = [];

function connectToApi() {
    fetch(urlBase + inputSearch.value)
    .then (response => response.json())
    .then (data => {
        shows = data;
        console.log(shows);
        renderShows(shows);
        renderFavs(favShows);
    })
}

function renderShows(arr) {
    for (let item of arr) {
    let showImage = item.show.image;

        if (showImage !== null) {
            showList.innerHTML += `<li id=${item.show.id} class="show__list--item">
            <h3 class="show__title">${item.show.name}</h3>
            <img src="${item.show.image.medium}" alt="${item.show.name}">
            <div class="show__item--info">
            <span>Género: ${item.show.genres}</span>
            <a class="show__link" href=${item.show.url} title="Ver ficha" target="_blank"><i class="fas fa-chevron-circle-right"></i> Ver ficha</a>
            </div>
            </li>`;            
        } else { 
            showList.innerHTML += `<li id=${item.show.id} class="show__list--item">
            <h3 class="show__title">${item.show.name}</h3>
            <img src="https://via.placeholder.com/210x295/cc8383/000" alt="${item.show.name}">
            <div class="show__item--info">
            <span>Género: ${item.show.genres}</span>
            <a class="show__link" href=${item.show.url} title="Ver ficha" target="_blank"><i class="fas fa-chevron-circle-right"></i> Ver ficha</a>
            </div>
            </li>`;
        }
        addToFavListeners();
    }   
}

function addToFavListeners() {
    const showListElement = document.querySelectorAll('.show__list--item');
    for (let element of showListElement) {
        element.addEventListener('click', saveAsFav);
    }
}

function saveAsFav(event) {
    const index = parseInt(event.currentTarget.id);
    if (favShows.indexOf(index) === -1) {
    favShows.push(index);
    console.log('Guardada');
    renderFavs(favShows);
    } else {
        console.log('Ya está en favoritos');
    }
}

// Relacionar el array de ids de favoritos con el objeto al que hace referencia en el array de objetos 'shows'.
function getShow(id) {
    for (let show of shows) {
        if (show.show.id === id) {
            return show;
        }
    }
}

// function getShow(id) {
//     return shows.find(show => show.show.id === id)
// }


function renderFavs(arrFav) {
    const sectionFav = document.querySelector('.section__fav--movies');
    sectionFav.innerHTML = '';
    // Recorro el array de favoritos
    for (let favourite of arrFav) {
        const object = getShow(favourite);
        if (favourite === object.show.id) {
            let showImage = object.show.image;
            aside.classList.remove('hidden');
                if (showImage !== null) {
                    sectionFav.innerHTML += `<li id=${object.show.id} class="fav__list--item"><img src="${object.show.image.medium}" alt="${object.show.name}"> <h4>${object.show.name}</h4></li>`;
                    // const favLiElement = document.querySelector('.fav__list--item');
                    // favLiElement.classList.add('fav__show--style');
                    
                } else {
                    sectionFav.innerHTML += `<li id=${object.show.id} class="fav__list--item"><img src="https://via.placeholder.com/210x295/cc8383/000" alt="${object.show.name}"><h4>${object.show.name}</h4></li>`; 
                }
            }
        }
}

// Function to connect 'Enter' key to search button. 
function inputEnter(event) {
    if(event.keyCode === 13) {
        btnSearch.click();
    }
}
inputSearch.addEventListener('keyup', inputEnter);

btnSearch.addEventListener('click', connectToApi);
connectToApi();

//# sourceMappingURL=main.js.map
