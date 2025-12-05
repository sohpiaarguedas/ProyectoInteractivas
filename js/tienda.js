/**
 * Store component.
 * @namespace StoreComponent
 */
app.component('tienda',{
    /**
     * Component props.
     * @memberof StoreComponent
     * @property {Array<Object>} frutos - The available fruits.
     * @property {number} dinero - The player's money.
     */
    props:{
        frutos: {
            type: Array,
            required: true
        },
        dinero:{
            type: Number,
            required: true
        },
        /*compra:{
            type: Object,
            default: null
        }
        */
    },
    /**
     * Component methods.
     * @memberof StoreComponent
     */
        methods:{

        /**
         * @memberof StoreComponent
         * @method comprar
         * @description Emits an event to the parent component to initiate the purchase of a fruit's seeds. This method passes the selected fruit object to the parent, which is responsible for handling the transaction logic, such as deducting the cost from the player's money.
         * @param {Object} fruto - The fruit object representing the seeds to be purchased.
         */
        comprar(fruto){
            this.$emit('comprar', fruto);
        }
        },

    /**
     * The HTML template for the component.
     * @memberof StoreComponent
     * @type {string}
     */
    template:  /*html */`
    <div class="store center column bg-store color-white bold">
        <button onclick="window.location.href='juego.html'">Atras</button>
        <h2 class="text-xl">Tienda</h2>
        <p class="text-l">Dinero: {{dinero}}$</p>
        <div class="shop-row shop-wrap center">
            <div v-for="fruto in frutos" :key="fruto.tipo" class="shopItem center column border space-margin">
                <p class="text-l"> Semillas {{fruto.tipo}} Precio: {{fruto.precio}}$</p>
                <img :src="fruto.semillaPaquete" alt="Imagen de semilla" class="semilla-img" />
                <button class="bg-btn color-white bold" @click="comprar(fruto)" >Comprar</button>
            </div>
        </div>
    </div>
    `
})