/**
 * @fileoverview This file contains the Vue.js component for the main menu.
 * @module mainMenu
 */

/**
 * @class mainMenu
 * @description This component serves as the main menu of the application, providing navigation to different sections.
 * Currently, its template appears to contain a "Sign up" form, which might be a placeholder or an error in content.
 *
 * @property {Object} users - An object containing user data, possibly for display or interaction within the menu.
 * @property {string} users.email - The user's email.
 * @property {string} users.birthdate - The user's birthdate.
 * @property {string} users.username - The user's username.
 * @property {string} users.password - The user's password.
 */
app.component('mainMenu',{
    props:{
        users:{
            type:Object,
            required:true
        }

    },
    /**
     * @memberof mainMenu
     * @description Computed properties for the mainMenu component.
     * @namespace mainMenuComputed
     */
    computed:{

    },
    /**
     * @memberof mainMenu
     * @description Methods for the mainMenu component.
     * @namespace mainMenuMethods
     */
    methods:{

    },
    template: /*html*/ `
    <div class="center">
        <h1>Sign up</h1>
        <form action="">
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
})