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
        let showImage = item.show.image.medium;

        if (showImage !== null) {
            showList.innerHTML += `<li id=${item.show.id} class="show__list--item"><img src="${item.show.image.medium}" alt="${item.show.name}"><h3 class="show__title">${item.show.name}</h3></li>`;
        } else {
            showList.innerHTML += `<li id=${item.show.id} class="show__list--item"><img src="https://via.placeholder.com/210x295/ffffff/666666/" alt="${item.show.name}"><h3 class="show__title">${item.show.name}</h3></li>`;
        }
    }
}

btnSearch.addEventListener('click', connectToApi);

// Function to connect 'Enter' key to search button. 
function inputEnter(event) {
    if(event.keyCode === 13) {
        btnSearch.click();
    }
}

inputSearch.addEventListener('keyup', inputEnter);

connectToApi();

//# sourceMappingURL=main.js.map
