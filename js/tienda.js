/**
 * @fileoverview This file contains the Vue.js component for the in-game shop.
 * @module tienda
 */

/**
 * @class tienda
 * @description This component displays the in-game shop where players can purchase seeds.
 * It shows available fruits/seeds, their prices, and the player's current money.
 * It emits a 'comprar' event when a player attempts to buy a seed.
 *
 * @property {Array<Object>} frutos - An array of fruit/seed objects available for purchase.
 * @property {string} frutos[].tipo - The type of the fruit (e.g., "tomate", "remolacha").
 * @property {string} frutos[].semillaPaquete - Image path for the seed package.
 * @property {number} frutos[].precio - The price of the fruit/seed.
 * @property {number} dinero - The player's current in-game money.
 *
 * @fires tienda#comprar - Emits a 'comprar' event with the selected fruit object when a purchase is initiated.
 */
app.component('tienda',{
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
        methods:{

        comprar(fruto){
            this.$emit('comprar', fruto);
        }
        },

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