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

         /** @type {Object|null} sprites */
        seleccionado: {
            type: Object,
            default: null
        },

         /** @type {Array<Object>} frutos */
        frutos: {
            type: Array,
            required: true
        }

 },

      /**
     * Computed properties 
     * @namespace juegoComputed
     */
    
 
  computed: {
    floorGen() {
      let floor = [];
      for (let i = 0; i < this.columns; i++) {
        let column = { index: i, espacio: [] };
        for (let j = 0; j < this.cells; j++) {
          column.espacio.push({ index: j, image: this.pasto });
        }
        floor.push(column);
      }
      this.sprites = floor;
      return this.sprites;
    },
  },
  methods: {
/*En proceso */
   
    arar(indexColumn, indexCell){
        this.$emit('arar', indexColumn, indexCell);
    },
    sembrar(indexColumn, indexCell){
        this.$emit('sembrar', indexColumn, indexCell);
    },

     seleccionarFruto(fruto) {
      this.$emit('seleccionarFruto', fruto);
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
   
          </div>
        
          <div class="row" v-for="column in floorGen" :key="column.index">
            <div class="row" v-for="cell in column.espacio" :key="cell.index">
             <img class="sprites" v-bind:src="cell.image" v-on:click="acciones(column.index, cell.index)">


            </div>
          </div>

        </div>
      </div>

`

})