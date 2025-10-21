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
        password: "",
      },

      pasto: "./img/pasto.png",
      tierra: "./img/tierra.png",
      columns: 10,
      cells: 10,
      seleccionado: null,
      sprites: [],
      frutos: [
        {
          tipo: "tomate",
          semilla: "./img/semillaPlantada.png",
          creciendo: "./img/tomateCrecimiento",
          cosecha: "tomate",
        },
        {
          tipo: "pepino",
          semilla: "./img/semillaPlantada.png",
          creciendo: "./img/pepinoCrecimiento",
          cosecha: "pepino",
        },
      ],
    };
  },

  computed:{
    
  },
  methods: {
    // Function that adds a user, called through Vue and specified with v-model
    addUser() {},
    // Function used to verify login, used from the login HTML
    login() {},

    
 arar(indexColumn, indexCell) {
      if (this.sprites[indexColumn].espacio[indexCell].image == this.pasto) {
        this.sprites[indexColumn].espacio[indexCell].image = this.tierra;
      }
     
    },

    sembrar(indexColumn, indexCell) {
      let parcela = this.sprites[indexColumn].espacio[indexCell];

      if (parcela.image == this.tierra && this.seleccionado) {
        parcela.image = this.seleccionado.semilla;
        this.seleccionado = null;
      }
    },

    seleccionarFruto(fruto) {
      this.seleccionado = fruto;
    },

    acciones(indexColumn, indexCell) {
      if (this.seleccionado) {
        this.sembrar(indexColumn, indexCell);
      } else {
        this.arar(indexColumn, indexCell);
      }
    },


  },
  mounted() {
  },
});
