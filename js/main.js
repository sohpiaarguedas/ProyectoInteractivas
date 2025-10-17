const app = Vue.createApp({
   /**
    * Reactive data properties
    * @memberof MainApp
    * @returns {Object}
    * @typedef {Object} AppData
    * @property {Object} users
    * 
    */
   data() {
      return {
         usersStorage: [],
         /** @type {Object} users object */
         users: {
            email: "",
            birthdate: "",
            username: "",
            password: ""
         }
      }
   },
   methods: {
   // Function that adds a user, called through Vue and specified with v-model
      addUser() {
      },
      // Function used to verify login, used from the login HTML
      login() {
      }
   },
   mounted(){

   }

})