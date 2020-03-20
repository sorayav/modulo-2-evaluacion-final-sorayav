'use strict';

let inputSearch = document.querySelector('.search__movie');
const btnSearch = document.querySelector('.btn__search');
const urlBase = 'http://api.tvmaze.com/search/shows?q=';
let showList = document.querySelector('.show__shows');
const showFavList = document.querySelector('.section__fav--movies');

let shows = null;
let favShows;

function connectToApi() {
    fetch(urlBase + inputSearch.value)
    .then (response => response.json())
    .then (data => {
        shows = data;
        console.log(shows);
        renderShows(shows);
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


function saveAsFav(event) {
    const index = event.currentTarget.id;
    if (favShows.indexOf(index) === -1) {
        favShows.push(index);
        alert('guardada');
    }
}

function addToFavListeners() {
    const showListEl = document.querySelectorAll('.show__list--item');
    for (let element of showListEl) {
        element.addEventListener('click', saveAsFav);
    }
}

function getShow(id) {
    for (let show of shows) {
        if (show.show.id === id) {
            return show;
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
