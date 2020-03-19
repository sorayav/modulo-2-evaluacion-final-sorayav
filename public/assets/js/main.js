'use strict';

console.log('>> Ready :)');

let inputSearch = document.querySelector('.search__movie');
const btnSearch = document.querySelector('.btn__search');
const urlBase = 'http://api.tvmaze.com/search/shows?q=';
const showList = document.querySelector('.show__shows');
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
        showList.innerHTML += `<li id=${item.show.id} class="show__list--item"><img src="${item.show.image.medium}"><h3 class="show__title">${item.show.name}</h3></li>`;
    }
}

// function addToFavListeners() {
//     showList = document.querySelectorAll('.show__list--item');
//     for (let element of showList) {
//         element.addEventListener('click', saveAsFav);
//     }
// }

btnSearch.addEventListener('click', connectToApi);

connectToApi();

//# sourceMappingURL=main.js.map
