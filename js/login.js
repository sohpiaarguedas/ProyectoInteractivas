app.component('login', {
    /** 
    * Component props - Data received from parent component
    * @typedef {Object} signUp
    * @property {users} users - Users Object 
    */
    props: {
    },
    data() {
        return {
            loginData: {
                username: '',
                password: ''
            }
        }
    },
    computed: {

    },
    methods: {
        async tryLogin() {
            try {

                const apiUrl = 'http://localhost:8000/api/login';
                const response = await axios.post(apiUrl, this.loginData);


                
                console.log('¡Login exitoso!', response.data);


                localStorage.setItem('token', response.data.access_token);

                localStorage.setItem('user', JSON.stringify(response.data.user));


                alert('¡Bienvenido! Redirigiendo al menú principal...');
                window.location.href = 'mainMenu.html'; 

            } catch (error) {

                console.error('Error en el login:', error.response.data);
                alert('Error: ' + error.response.data.message);
            }
        }
    },
    template: /*html*/ `
     

    <div class="center ">
                <h1 class="text-xl">Login</h1>
                <form class="space-margin add" @submit.prevent="tryLogin">

            <label class="row text-l" for="">Username</label>
            <input class="space-margin color-white" type="text" v-model="loginData.username" required>
            
            <label class="row text-l" for="">Password</label>
            <input class="space-margin color-white" type="password" v-model="loginData.password" required>
            
            <button type="submit" class="bg-btn color-white bold space-margin">Login</button>
        </form>
            </div>
            <div class="text-center space-margin center">
                <p class="text-xl ">Don't have an account yet? </p>
                <p class="text-l"><a href="signUp.html" class="bg-btn no-decoration color-white bold  ">Sign up</a></p>
           

            </div>
    `
})