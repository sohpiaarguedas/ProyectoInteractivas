/**
 * Main menu component.
 * @namespace MainMenuComponent
 */
app.component('mainMenu',{
    /** 
    * Component props - Data received from parent component
    * @memberof MainMenuComponent
    * @property {Object} users - Users Object 
    */
    props:{
        users:{
            type:Object,
            required:true
        }

    },
    computed:{

    },
    methods:{

    },
    /**
     * The HTML template for the component.
     * @memberof MainMenuComponent
     * @type {string}
     */
    template: /*html*/ `
    <div class="center column">
        <h1 class="text-xl">Dealing with farming</h1>
        <button class="bg-btn color-white bold space-margin" onclick="window.location.href='juego.html'">Jugar</button>
        <button class="bg-btn color-white bold space-margin" onclick="window.location.href='instrucciones.html'">Instrucciones</button>
    </div>
    `
})