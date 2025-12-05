/**
 * Game component.
 * @namespace GameComponent
 * 
 * @example
 * <juego
 *   :pasto="'./img/pasto.png'"
 *   :tierra="'./img/tierra.png'"
 *   :columns="10"
 *   :cells="10"
 *   :seleccionado="null"
 *   :sprites="[]"
 *   :frutos="[
 *     {
 *       tipo: 'tomate',
 *       semilla: './img/semillaPlantada.png',
 *       creciendo: './img/tomateCrecimiento',
 *       cosecha: 'tomate',
 *     },
 *     {
 *       tipo: 'pepino',
 *       semilla: './img/semillaPlantada.png',
 *       creciendo: './img/pepinoCrecimiento',
 *       cosecha: 'pepino',
 *     },
 *   ]"
 * ></juego>
 */
app.component('juego',{
    /**
     * Component props.
     * @memberof GameComponent
     * @property {string} pasto - Path to the grass image.
     * @property {string} tierra - Path to the soil image.
     * @property {number} columns - Number of columns in the grid.
     * @property {number} cells - Number of cells per column.
     * @property {Object|null} seleccionado - The selected fruit.
     * @property {Array<Object>} sprites - The game board sprites.
     * @property {Array<Object>} frutos - The available fruits.
     */
     props:{
        /** @type {string} */
        pasto: {
            type: String,
            required: true
        },
        /** @type {string} */
        tierra: {
            type: String,
            required: true
        },
        /** @type {number} */
        columns: {
            type: Number,
            required: true
        },
        /** @type {number} */
        cells: {
            type: Number,
            required: true
        },
        /** @type {Object|null} */
        seleccionado: {
            type: Object,
            default: null
        },
        /** @type {Array<Object>} */
        frutos: {
            type: Array,
            required: true
        },
        /** @type {Array<Object>} */
        sprites:{
          type:Array,
          required:true
        }
    },

    /**
     * Component methods.
     * @memberof GameComponent
     */
    methods: {
        /**
         * @memberof GameComponent
         * @method arar
         * @description Emits an event to the parent component to till a specific plot of land. This method facilitates communication from the child component to the parent, signaling a user's intent to till the soil at the given coordinates.
         * @param {number} indexColumn - The column index of the plot to till.
         * @param {number} indexCell - The row index of the plot to till.
         */
        arar(indexColumn, indexCell){
            this.$emit('arar', indexColumn, indexCell);
        },
        /**
         * @memberof GameComponent
         * @method sembrar
         * @description Emits an event to the parent component to plant a seed in a specific plot. This allows the parent component to handle the logic of planting, such as updating the plot's state and appearance.
         * @param {number} indexColumn - The column index of the plot where the seed should be planted.
         * @param {number} indexCell - The row index of the plot where the seed should be planted.
         */
        sembrar(indexColumn, indexCell){
            this.$emit('sembrar', indexColumn, indexCell);
        },
        /**
         * @memberof GameComponent
         * @method regar
         * @description Emits an event to the parent component to water a specific plot of land. This delegates the watering action to the parent, which will manage the subsequent changes in the plant's growth state.
         * @param {number} indexColumn - The column index of the plot to water.
         * @param {number} indexCell - The row index of the plot to water.
         */
        regar(indexColumn, indexCell){
          this.$emit('regar', indexColumn, indexCell);
        },
        /**
         * @memberof GameComponent
         * @method seleccionarFruto
         * @description Emits an event to the parent component when a user selects a fruit to plant. This passes the chosen fruit object to the parent, allowing it to update the game's state accordingly.
         * @param {Object} fruto - The fruit object that has been selected by the user.
         */
         seleccionarFruto(fruto) {
          this.$emit('seleccionar-fruto', fruto);
        },
        /**
         * @memberof GameComponent
         * @method acciones
         * @description Emits a general-purpose 'acciones' event to the parent component, indicating that a user has interacted with a plot of land. The parent component is responsible for determining the appropriate action based on the game's current state (e.g., tilling, planting, watering).
         * @param {number} indexColumn - The column index of the interacted plot.
         * @param {number} indexCell - The row index of the interacted plot.
         */
        acciones(indexColumn, indexCell) {
        this.$emit('acciones', indexColumn, indexCell);
        },
    },

    /**
     * The HTML template for the component.
     * @memberof GameComponent
     * @type {string}
     */
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