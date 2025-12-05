/**
 * @fileoverview This file contains the Vue.js component for the instructions page.
 * @module instrucciones
 */

/**
 * @class instrucciones
 * @description This component displays the instructions on how to play the game. 
 * It provides a detailed guide on planting, watering, harvesting, and selling crops, 
 * as well as completing missions for rewards.
 *
 * @property {string} template - The HTML template for the instructions component.
 */
app.component('instrucciones',{
    template:  /*html */`
    <div class="center column color-white bold text-overflow">
        <h2 class="text-xl">Instrucciones</h2>
        <p class="text-l">Para comenzar a jugar tendrás que tocar o hacer click sobre el botón “tienda” para poder comprar las primeras semillas, luego puedes tocar o clickear sobre el pasto para convertirlo en tierra apta para plantar, selecciona el cultivo que quieres y colócalo sobre la tierra arada, para regarlos es con el botón “regar” y esperar a que crezcan para poder cosecharlos, estos cultivos puedes venderlos para sacar beneficios, pero ten cuidado que también los vas a necesitar para completar las misiones que te recompensará con dinero.</p>
        <button class="bg-btn color-white bold space-margin" onclick="window.location.href='mainMenu.html'">Atras</button>
    </div>
    `
});