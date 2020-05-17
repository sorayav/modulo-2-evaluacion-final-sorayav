"use strict";let inputSearch=document.querySelector(".search__movie");const btnSearch=document.querySelector(".btn__search"),urlBase="https://api.tvmaze.com/search/shows?q=";let showList=document.querySelector(".show__shows");const aside=document.querySelector("aside"),showFavList=document.querySelector(".section__fav--movies"),defaultImg="https://fakeimg.pl/210x295/FFF/000/?text=No%20disponible",btnRemoveAll=document.querySelector(".btn__remove--all");let shows=null,favourites=readLocalStorage();function connectToApi(){showList.innerHTML="",fetch(urlBase+inputSearch.value).then(e=>e.json()).then(e=>{shows=e,paintResults(shows),paintFavourites(favourites)})}function paintResults(e){for(let t of e){let e=t.show.image;const s=document.querySelector(".search__shows");document.querySelector("h1").classList.add("hidden"),s.classList.remove("full_screen"),showList.classList.add("medium_screen"),showList.innerHTML+=`<li id='${t.show.id}' class='show__list--item'><h3 class='show__title'>${t.show.name}</h3><img src='${null===e?`${defaultImg}`:`${e.medium}`}' alt='${t.show.name}'><div class="show__item--info overlay"> <span class="overlay__text">Mas información</span><span>Género: ${t.show.genres}</span><br><span>Idioma: ${t.show.language}</span><br><span>Sinopsis: ${null===t.show.summary||0===t.show.summary.length?"No disponible":`${t.show.summary}`}</span><br></div></li>`}addClickListeners()}function addClickListeners(){const e=document.querySelectorAll(".show__list--item");for(let t of e)t.addEventListener("click",saveFavourites)}function getShowObject(e){return shows.find(t=>t.show.id===parseInt(e))}function saveFavourites(e){const t=e.currentTarget,s=e.currentTarget.id,o=getShowObject(s),i=favourites.findIndex(e=>parseInt(e.id)===parseInt(s));-1===i?(favourites.push(o.show),t.classList.add("fav__show--style"),t.classList.remove("show__list--item"),paintFavourites(favourites),setLocalStorage(favourites)):(favourites.splice(i,1),t.classList.remove("fav__show--style"),t.classList.add("show__list--item"),setLocalStorage(favourites),paintFavourites(favourites))}function paintFavourites(e){showFavList.innerHTML="";const t=document.querySelector(".section__fav--movies");for(let s of e)aside.classList.remove("hidden"),t.innerHTML+=`<li id=${s.id} class="fav__list--item"><img src="${null===s.image?`${defaultImg}`:`${s.image.medium}`}" alt="${s.name}"><h4 class="fav__item--title"><a href="${s.url}" title="Ver ficha." aria-label="Ver ficha." target="_blank">${s.name}</a></h4><button class="btn__remove--single" type="button">x</button></li>`,removeSingleFavouriteHandler()}function hideFavSection(){""===favourites&&aside.classList.add("hidden")}function removeAllFavourites(){localStorage.removeItem("favourites"),showFavList.innerHTML="",aside.classList.add("hidden"),favourites=[]}function removeSingleFavouriteHandler(){const e=document.querySelectorAll(".btn__remove--single");for(let t of e)t.addEventListener("click",removeSingleFavourite),hideFavSection()}function removeSingleFavourite(e){const t=e.currentTarget.parentElement.id,s=favourites.findIndex(e=>parseInt(e.id)===parseInt(t));favourites.splice(s,1),setLocalStorage(favourites),paintFavourites(favourites)}function setLocalStorage(e){localStorage.setItem("favourites",JSON.stringify(e))}function readLocalStorage(){let e=JSON.parse(localStorage.getItem("favourites"));return null!==e?e:[]}function inputEnter(e){13===e.keyCode&&btnSearch.click()}btnRemoveAll.addEventListener("click",removeAllFavourites),inputSearch.addEventListener("keyup",inputEnter),btnSearch.addEventListener("click",connectToApi);