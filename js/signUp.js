app.component('sign-up', {
    props: {


    },
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
    computed: {

    },
    methods: {
        async addUser() {
            if (this.registerData.password !== this.registerData.password_confirmation) {
                alert('Las contraseñas no coinciden');
                return;
            }

            const dataToSend = this.registerData;

            try {
                const apiUrl = 'http://localhost:8000/api/register';
                const response = await axios.post(apiUrl, dataToSend);
                console.log('usuario registrado: ', response.data);

            } catch (error) {
                console.log(error.response.data);
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