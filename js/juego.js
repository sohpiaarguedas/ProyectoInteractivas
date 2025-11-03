/**
*@component
*@example
*
*
*<juego 
*
* :pasto: "./img/pasto.png",
*      :tierra: "./img/tierra.png",
 *     :columns: 10,
*    :cells: 10,
*     :seleccionado: null,
*     :sprites: [],
*     :frutos: [
*        {
*          tipo: "tomate",
*          semilla: "./img/semillaPlantada.png",
*          creciendo: "./img/tomateCrecimiento",
*          cosecha: "tomate",
*        },
*        {
*          tipo: "pepino",
*          semilla: "./img/semillaPlantada.png",
*          creciendo: "./img/pepinoCrecimiento",
*          cosecha: "pepino",
*        },
*      ]
>

</juego>

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

  template: /*html */` 
   <div class="cielo" :style="{backgroundColor:'skyblue'}">
        <div class="espacio">

          <div class="tipos">
            <button v-for="fruto in frutos" v-on:click="seleccionarFruto(fruto)">
              {{ fruto.tipo }}
            </button>
            <button v-on:click="regar()">Regar </button>
           
   
          </div>
        
          <div class="row" 
         v-for="(columnaSprite, indiceColumna) in sprites" :key="indiceColumna">
        <div class="cell" v-for="(celdaSprite, indiceCelda) in columnaSprite.espacio" :key="indiceCelda">
 
    <img class="sprites" :src="celdaSprite.image"  v-on:click="acciones(indiceColumna, indiceCelda)">
  </div>
</div>

        </div>
      </div>

`

})