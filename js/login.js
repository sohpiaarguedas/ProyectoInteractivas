app.component('login',{
    /** 
    * Component props - Data received from parent component
    * @typedef {Object} signUp
    * @property {users} users - Users Object 
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
    template: /*html*/ `
    <div class="center">
                <h1 class="text-xl">Login</h1>
                <form class="space-margin add" v-on:submit="login"  >

                    <label class="row text-l" for="">Username</label>
                    <input class="space-margin color-white" type="text" v-model="users.username">
                    <label class="row text-l" for="">Password</label>
                    <input class="space-margin color-white" type="password" v-model="users.password">
                    <button class="bg-btn color-white bold space-margin" type="submit"> </button>
                </form>
            </div>
            <div class="text-center space-margin center">
                <p class="text-xl ">Don't have an account yet? </p>
                <p class="text-l"><a href="signUp.html" class="bg-btn no-decoration color-white bold  ">Sign up</a></p>
            </div>
    `
})