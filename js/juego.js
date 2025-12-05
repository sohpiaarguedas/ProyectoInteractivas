/**
 * @fileoverview This file contains the Vue.js component for the game board.
 * @module juego
 */

/**
 * @class juego
 * @description This component represents the main game board where players can interact with crops.
 * It allows players to plow land, plant seeds, water crops, and trigger various actions.
 *
 * @property {string} pasto - The image URL for the grass sprite.
 * @property {string} tierra - The image URL for the tilled land sprite.
 * @property {number} columns - The number of columns in the game board grid.
 * @property {number} cells - The number of cells per column in the game board grid.
 * @property {Object|null} seleccionado - The currently selected fruit/crop for planting.
 * @property {Array<Object>} frutos - An array of available fruits/crops with their types, seed images, growth images, and harvest names.
 * @property {Array<Array<Object>>} sprites - A 2D array representing the game board, where each object contains sprite information for a cell.
 *
 * @fires juego#arar - Emits an 'arar' event when a cell is plowed.
 * @fires juego#sembrar - Emits a 'sembrar' event when a seed is planted on a cell.
 * @fires juego#regar - Emits a 'regar' event when crops are watered.
 * @fires juego#seleccionar-fruto - Emits a 'seleccionar-fruto' event when a fruit is selected for planting.
 * @fires juego#acciones - Emits an 'acciones' event when an action is performed on a cell.
 *
 */
app.component('juego',{

     /**
     * Component props 
     * @typedef {Object} escenario
     * @property {string} pasto
     * @property {string} tierra
     * @property {number} columns
     * @property {number} cells
     * @property {Object|null}seleccionado
     * @property {Objet[]} sprites
     * @property {Object[]} frutos
     * 
     */

     props:{
       

         /** @type {string} pasto */
        pasto: {
            type: String,
            required: true
        },
         /** @type {string} tierra */
        tierra: {
            type: String,
            required: true
        },
         /** @type {number} columns */
        columns: {
            type: Number,
            required: true
        },
         /** @type {number} cells */
        cells: {
            type: Number,
            required: true
        },

         /** @type {Object|null} seleccionado */
        seleccionado: {
            type: Object,
            default: null
        },

         /** @type {Array<Object>} frutos */
        frutos: {
            type: Array,
            required: true
        },
        
         /** @type {Array<Object>} sprites */
        sprites:{
          type:Array,
          required:true
        }

 },

      /**
     * Computed properties 
     * @namespace juegoComputed
     */
    
 
  computed: {
  
  },
  methods: {
/*En proceso */
   
    arar(indexColumn, indexCell){
        this.$emit('arar', indexColumn, indexCell);
    },
    sembrar(indexColumn, indexCell){
        this.$emit('sembrar', indexColumn, indexCell);
    },

    regar(indexColumn, indexCell){
      this.$emit('regar', indexColumn, indexCell);
    },

     seleccionarFruto(fruto) {
      this.$emit('seleccionar-fruto', fruto);
    },

    acciones(indexColumn, indexCell) {
    this.$emit('acciones', indexColumn, indexCell);
    },
    
  },

  template: /*html */ ` 
   <div class="cielo espacio bg-celeste">
        
        <div class=" space-padding">
       
          
          <div class="tipos space-padding row space-margin">
            <button class="" v-for="fruto in frutos" v-on:click="seleccionarFruto(fruto)">
              {{ fruto.tipo }}
            </button>
            <button class=""  v-on:click="regar()">Regar </button>
            <button class="" onclick="window.location.href='tienda.html'">Tienda</button>
   
          </div>
      
          <div class="cerca-barra"></div>

          <div class="pasto">


          <div class="row" 
         v-for="(columnaSprite, indiceColumna) in sprites" :key="indiceColumna">
        <div class="cell" v-for="(celdaSprite, indiceCelda) in columnaSprite.espacio" :key="indiceCelda">
 
    <img class="sprites" :src="celdaSprite.image"  v-on:click="acciones(indiceColumna, indiceCelda)">
  </div>
</div>

        </div>
         </div>
      </div>

`

})