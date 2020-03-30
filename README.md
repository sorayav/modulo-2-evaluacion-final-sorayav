
# Evaluación final módulo 2 - Soraya Valle

 El ejercicio consiste en desarrollar una aplicación web de búsqueda de series de TV, que nos permite marcar y desmarcar las series como favoritas y guardarlas en local storage.

Está realizada con JavaScript, junto a una parte de maquetación con HTML y Sass.
Para probar la demo, se puede acceder a través del [enlace de Github pages](http://beta.adalab.es/modulo-2-evaluacion-final-sorayav), o clonar el repositorio y arrancarlo con `npm install` y `npm start` (o `gulp`).

## 1. Estructura:

La aplicación de búsqueda de series consta de tres partes:

1. **Un campo de texto** y un botón para buscar series por su título.

2. **Un listado de resultados de búsqueda** donde aparece el cartel de la serie y el título. Además, en la parte inferior de la tarjeta de cada serie se encuentra una sección que se activa con el hover y desplega más información sobre cada serie (género, idioma y sinopsis).

3. **Una sección que recoge las series marcadas como favoritas** y que está oculta por defecto hasta que se selecciona el primer favorito. Desde esta sección se puede acceder a la ficha completa de cada serie clicando sobre el título.

## 2. Búsqueda:
- Al hacer clic sobre el botón de *Buscar*, la aplicación se conecta al API abierto de TVMaze para búsqueda de series.
- Para construir la URL de búsqueda, se recoge el texto que ha introducido la usuaria en el campo de búsqueda.  
- Por cada show contenido en el resultado de la búsqueda, se pinta una tarjeta donde se muestra una imagen de la serie y el título.  Además, en la parte inferior de la tarjeta de cada serie se encuentra una sección que se activa con el hover y desplega más información sobre cada serie (género, idioma y sinopsis).
- Algunas de las series que devuelve el API no tienen imagen. En ese caso se muestra una imagen de relleno.

## 3. Favoritos

Una vez aparecen los resultados de búsqueda, la usuaria puede indicar cuáles son sus series favoritas. Para ello, al hacer clic sobre una serie pasa lo siguiente:

- El color de fondo y el de la fuente cambian, indicando que es una serie favorita.  
- En la parte izquierda de la pantalla se muestra un listado de favoritos con las series marcadas como tal. Las series favoritas siguen apareciendo a la izquierda aunque la usuaria realice otra búsqueda.

## 4. Almacenamiento local

El listado de favoritos se almacena en el localStorage; de esta forma, al recargar la página, el listado de favoritos se mantiene.

## 5. BONUS: Borrar favoritos

Los favoritos se pueden eliminar de forma individual, haciendo clic sobre la tarjeta del resultado de búsqueda o sobre la "X" en cada serie de la sección de favoritos; y de forma total, pulsando sobre "Eliminar todas". Esta función limpiará la lista tanto en el DOM como en localStorage y ocultará la sección de favoritos.

## Screenshots

![App frontpage](https://github.com/sorayav/modulo-2-evaluacion-final-sorayav/blob/master/docs/assets/images/aplicacion_series_sorayav.png)
![App functionality](https://github.com/sorayav/modulo-2-evaluacion-final-sorayav/blob/master/docs/assets/images/aplicacion_series_sorayav2%20copia.png)
