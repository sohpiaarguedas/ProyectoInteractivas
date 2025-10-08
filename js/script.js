const app = Vue.createApp({
   data() {
      return {
         usersStorage: [],
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
         // Conditional to check if usersStorage exists in localStorage
         if (localStorage.getItem("usersStorage")) {
            // Adds to userStorage in this instance what is in usersStorage, because when calling the method repeatedly,
            // a new instance is created and the previously saved data is deleted
            this.usersStorage = JSON.parse(localStorage.getItem("usersStorage"));
         } else {
            // If userStorage does not exist in localStorage, userStorage is initialized in this instance to avoid potential problems
            this.usersStorage = [];
         }
         // A boolean variable is created to be used for verification
         let alreadyExists = false;
         // A for loop that iterates through the length of the userStorage array in this instance
         for (let i = 0; i < this.usersStorage.length; i++) {
            // Conditional to check if the email at position i is equal to the email sent by v-model in the HTML form
            if (this.usersStorage[i].email == this.users.email) {
               // If it already exists and enters here, the boolean variable becomes true
               alreadyExists = true;
            }
            // Conditional to check if the username at position i is equal to the username sent by v-model in the HTML form
            if (this.usersStorage[i].username == this.users.username) {
               // If it already exists and enters here, the boolean variable becomes true
               alreadyExists = true;
            }
         }
         // Conditional that uses the boolean to verify if the username or email exists
         if (alreadyExists) {
            // If it exists, it alerts that one of the two is already in use
            alert("Email or username is already in use")
         } else {
            // If it is false and enters here, a push is done to add in a new position of the array, what comes from the form through the submit of Vue.js
            this.usersStorage.push(this.users);
            // Here, what is currently in userStorage is put into localStorage
            localStorage.setItem("usersStorage", JSON.stringify(this.usersStorage));
            // Alert to notify that the user was created
            alert("User created")
         }


      },
      // Function used to verify login, used from the login HTML
      login() {
         // Conditional to see if usersStorage already exists in localStorage
         if (localStorage.getItem("usersStorage")) {
            // Adds what is in userStorage in localStorage to the userStorage array in this instance
            this.usersStorage = JSON.parse(localStorage.getItem("usersStorage"));
         } else {
            // If nothing exists, the array is initialized to avoid problems
            this.usersStorage = [];
         }
         // For loop that iterates through the userStorage array in the current instance
         for (let i = 0; i < this.usersStorage.length; i++) {
            // Conditional that verifies if the username in the current index within userStorage is equal to the one sent in the form through Vue.js
            if (this.usersStorage[i].username == this.users.username) {
               // Conditional that verifies if the password in the current index within userStorage is equal to the one sent in the form through Vue.js
               if (this.usersStorage[i].password == this.users.password) {
                  // Alert to notify that the login was successful
                  alert("Login successful")
                  // Returns true if the entered username and password are equal to those stored in localStorage
                  return true;
               } else {
                  // Alert to notify that the password is incorrect
                  alert("Incorrect password")
                  // Returns false if the password is different from the one stored in localStorage
                  return false;
               }
            }
         }
         // Alert to notify that the user was not found
         alert("User not found")
      }
   }

})