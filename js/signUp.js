

app.component('sign-up',{
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
        <h1>Sign up</h1>
        <form v-on:submit="addUser">
            <label class="row text-l" for="">Email</label>
            <input class="space-margin color-white" type="text" v-model="users.email">
            <label class="row text-l" for="">Birthdate</label>
            <input class="space-margin color-white"  type="text" v-model="users.birthdate">
            <label class="row text-l" for="">Username</label>
            <input class="space-margin color-white" type="text" v-model="users.username">
            <label class="row text-l" for="">Password</label>
            <input class="space-margin color-white" type="password" v-model="users.password">
            <button class="bg-btn color-white bold space-margin" type="submit">Sign up</button>
        </form>
        <p class="text-xl "> Already have an account?</p>
        <p class="text-l"><a href="login.html" class="bg-btn no-decoration color-white bold space-margin">login</a></p>
    </div>
    `
});