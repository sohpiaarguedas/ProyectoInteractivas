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
      columns: 5,
      cells: 10,
      seleccionado: null,
      sprites: [],
      frutos: [
        {
          tipo: "tomate",
          semilla: "./img/semillaPlantada.png",
          semillaMojada: "./img/semillaMojada.png",
          creciendo: "./img/tomateCrecimiento",
          cosecha: "tomate",
        },
        {
          tipo: "pepino",
          semilla: "./img/semillaPlantada.png",
          semillaMojada: "./img/semillaMojada.png",
          creciendo: "./img/pepinoCrecimiento",
          cosecha: "pepino",
        },

        {
          tipo: "zanahoria",
          semilla: "./img/semillaPlantada.png",
          semillaMojada: "./img/semillaMojada.png",
          creciendo: "./img/zanahoriaCrecimiento.png",
          cosecha: "zanahoria",
        },
      ],
    };
  },

  computed: {},
  methods: {
    // Function that adds a user, called through Vue and specified with v-model
    addUser() {},
    // Function used to verify login, used from the login HTML
    login() {},
    gotogame() {
      window.location.href = "juego.html";
    },

    arar(indexColumn, indexCell) {
      if (this.sprites[indexColumn].espacio[indexCell].image == this.pasto) {
        this.sprites[indexColumn].espacio[indexCell].image = this.tierra;
      }
    },

    sembrar(indexColumn, indexCell) {
      let parcela = this.sprites[indexColumn].espacio[indexCell];

      if (parcela.image == this.tierra && this.seleccionado) {
        parcela.image = this.seleccionado.semilla;
      }
    },

    regar() {
      console.log("regando");

      for (let i = 0; i < this.sprites.length; i++) {
        let columna = this.sprites[i];
        for (let j = 0; j < columna.espacio.length; j++) {
          let parcela = columna.espacio[j];

          if (parcela.image == this.seleccionado.semilla) {
            parcela.image = this.seleccionado.semillaMojada;
          }
        }
      }

      this.seleccionado = null;
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
    let floor = [];
    for (let i = 0; i < this.columns; i++) {
      let column = { index: i, espacio: [] };
      for (let j = 0; j < this.cells; j++) {
        column.espacio.push({ index: j, image: this.pasto });
      }
      floor.push(column);
    }
    this.sprites = floor;
    return this.sprites;
  },
});
