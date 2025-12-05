/**
 * @fileoverview This file contains the Vue.js component for user registration.
 * @module signUp
 */

/**
 * @class signUp
 * @description This component handles user registration, allowing new users to create an account.
 * It manages registration data, performs password validation, communicates with the backend API,
 * and handles successful registration responses, including token and user data storage, and redirection.
 *
 * @property {Object} registerData - Reactive data object containing user registration credentials.
 * @property {string} registerData.email - The user's email for registration.
 * @property {string} registerData.birthdate - The user's birthdate for registration.
 * @property {string} registerData.username - The chosen username for the new account.
 * @property {string} registerData.password - The chosen password for the new account.
 * @property {string} registerData.password_confirmation - The password confirmation for validation.
 *
 * @method addUser - Attempts to register a new user by sending credentials to the API.
 * @async
 * @returns {void}
 * @throws {Error} If the registration attempt fails due to network issues, validation errors, or other server-side problems.
 */
app.component('sign-up', {
    data() {
        return {
            registerData: {
                email: '',
                birthdate: '',
                username: '',
                password: '',
                password_confirmation: '' 
            }
        }
    },
    methods: {
        async addUser() {
            if (this.registerData.password !== this.registerData.password_confirmation) {
                alert('Las contraseñas no coinciden');
                return;
            }

            try {
                const apiUrl = 'http://localhost:8000/api/register';
                
                const config = {
                    headers: {
                        'Accept': 'application/json', 
                        'Content-Type': 'application/json'
                    }
                };

                const response = await axios.post(apiUrl, this.registerData, config);
                console.log('Registro exitoso:', response.data);

                if (response.data.access_token || response.data.token) {
                    localStorage.setItem('token', response.data.access_token || response.data.token);
                    localStorage.setItem('user', JSON.stringify(response.data.user));
                    
                    alert('¡Cuenta creada! Entrando al juego...');
                    window.location.href = 'mainMenu.html';
                } 
                else {
                    alert('Usuario registrado con éxito. Por favor inicia sesión.');
                    window.location.href = 'login.html';
                }

            } catch (error) {
                console.error('Error en registro:', error);

                if (error.response && error.response.status === 422) {
                    const errores = error.response.data.errors;
                    let mensaje = 'Error de validación:\n';
                    
                    for (const campo in errores) {
                        mensaje += `- ${errores[campo][0]}\n`;
                    }
                    alert(mensaje);
                } else {
                    alert('Ocurrió un error al registrarse. Revisa la consola.');
                }
            }
        }
    },
    template: /*html*/ `
    <div class="center">
        <h1>Sign up</h1>
        <form @submit.prevent="addUser">

            <label class="row text-l" for="">Email</label>
            <input class="space-margin color-white" type="email" v-model="registerData.email" required>
            
            <label class="row text-l" for="">Birthdate</label>
            <input class="space-margin color-white" type="date" v-model="registerData.birthdate" required>
            
            <label class="row text-l" for="">Username</label>
            <input class="space-margin color-white" type="text" v-model="registerData.username" required>
            
            <label class="row text-l" for="">Password</label>
            <input class="space-margin color-white" type="password" v-model="registerData.password" required>

            <label class="row text-l" for="">Confirm Password</label>
            <input class="space-margin color-white" type="password" v-model="registerData.password_confirmation" required>
            
            <button class="bg-btn color-white bold space-margin" type="submit">Sign up</button>
        </form>
        <p class="text-xl "> Already have an account?</p>
        <p class="text-l"><a href="login.html" class="bg-btn no-decoration color-white bold space-margin">login</a></p>
    </div>
    `
});