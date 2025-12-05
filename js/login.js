/**
 * @fileoverview This file contains the Vue.js component for user login.
 * @module login
 */

/**
 * @class login
 * @description This component handles user authentication, allowing users to log in to the application.
 * It manages login data, communicates with the backend API, and handles successful login responses,
 * including token and user data storage, and redirection to the main menu.
 *
 * @property {Object} loginData - Reactive data object containing user login credentials.
 * @property {string} loginData.username - The username entered by the user.
 * @property {string} loginData.password - The password entered by the user.
 *
 * @method tryLogin - Attempts to log in the user by sending credentials to the API.
 * @async
 * @returns {void}
 * @throws {Error} If the login attempt fails due to network issues or incorrect credentials.
 */
app.component('login', {
    props: {},
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
            
            const config = {
                headers: {
                    'Accept': 'application/json', 
                    'Content-Type': 'application/json'
                }
            };

            const response = await axios.post(apiUrl, this.loginData, config);

            console.log('¡Login exitoso!', response.data);

            localStorage.setItem('token', response.data.access_token || response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));

            alert('¡Bienvenido! Redirigiendo al menú principal...');
            window.location.href = 'mainMenu.html';

        } catch (error) {
            console.error('Error en el login:', error);
            
            if (error.response && error.response.data) {
                alert('Error: ' + (error.response.data.message || 'Credenciales incorrectas'));
            } else {
                alert('Error de conexión con el servidor');
            }
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