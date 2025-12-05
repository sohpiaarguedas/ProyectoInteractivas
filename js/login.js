/**
 * Login component.
 * @namespace LoginComponent
 */
app.component('login', {
    /** 
    * Component props - Data received from parent component
    * @memberof LoginComponent
    * @property {Object} users - Users Object 
    */
    props: {
    },
    /**
     * Component data.
     * @memberof LoginComponent
     * @returns {Object} The component's data.
     */
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
    /**
     * Component methods.
     * @memberof LoginComponent
     */
    methods: {
        /**
         * @memberof LoginComponent
         * @method tryLogin
         * @description Handles the user login process. This asynchronous method sends the user's credentials to the backend API. Upon successful authentication, it stores the access token and user data in local storage, then redirects the user to the main menu. If authentication fails, it logs the error and displays an alert to the user.
         */
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
    /**
     * The HTML template for the component.
     * @memberof LoginComponent
     * @type {string}
     */
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