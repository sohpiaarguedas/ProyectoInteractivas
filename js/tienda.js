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