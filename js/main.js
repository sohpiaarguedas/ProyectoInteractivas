/**
 * @fileoverview This file initializes the main Vue.js application.
 * @module main
 */

/**
 * @namespace MainApp
 * @description The main Vue.js application instance for the game.
 * It manages global state, user data, game board, and interactions with the backend API.
 */
const app = Vue.createApp({
  /**
   * Reactive data properties
   * @memberof MainApp
   * @returns {Object} AppData - The reactive data object for the application.
   * @property {string|null} token - The authentication token stored in local storage.
   * @property {Object|null} user - The user object parsed from local storage.
   * @property {Array<Object>} usersStorage - An array to store multiple user objects (currently unused).
   * @property {Object} users - An object containing user registration data.
   * @property {string} users.email - The user's email for registration.
   * @property {string} users.birthdate - The user's birthdate for registration.
   * @property {string} users.username - The user's username for registration and login.
   * @property {string} users.password - The user's password for registration and login.
   * @property {string} pasto - The image path for grass terrain.
   * @property {string} tierra - The image path for tilled land.
   * @property {number} columns - The number of columns on the game board.
   * @property {number} cells - The number of cells per column on the game board.
   * @property {Object|null} seleccionado - The currently selected fruit/seed to plant.
   * @property {Array<Object>} sprites - The 2D array representing the game board's visual state.
   * @property {number} dinero - The player's current money.
   * @property {Object|null} compra - The currently selected item for purchase.
   * @property {Array<Object>} frutos - An array of available fruits/crops with their properties.
   * @property {string} frutos[].tipo - The type of the fruit (e.g., "tomate", "remolacha").
   * @property {string} frutos[].semillaPaquete - Image path for the seed package.
   * @property {string} frutos[].semilla - Image path for the planted seed.
   * @property {string} frutos[].semillaMojada - Image path for the watered seed.
   * @property {string} frutos[].creciendo - Image path for the growing crop.
   * @property {string} frutos[].cosecha - Image path for the harvested crop.
   * @property {number} frutos[].precio - The price of the fruit/seed.
   *
   */
  data() {
    return {
      token: localStorage.getItem("token"),
      user: JSON.parse(localStorage.getItem("user")),
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
      dinero: 1000,
      compra: null,
      frutos: [
        {
          tipo: "tomate",
          semillaPaquete: "./img/Semillas_paquete_tomate.png",
          semilla: "./img/semillaPlantada.png",
          semillaMojada: "./img/semillaMojada.png",
          creciendo: "./img/tomateCrecimiento.png",
          cosecha: "./img/tomateCosecha.png",
          precio: 100,
        },
        {
          tipo: "remolacha",
          semillaPaquete: "./img/Semillas_paquete_remolacha.png",
          semilla: "./img/semillaPlantada.png",
          semillaMojada: "./img/semillaMojada.png",
          creciendo: "./img/remolachaCrecimiento.png",
          cosecha: "./img/remolachaCosecha.png",
          precio: 200,
        },

        {
          tipo: "zanahoria",
          semillaPaquete: "./img/Semillas_paquete_zanahoria.png",
          semilla: "./img/semillaPlantada.png",
          semillaMojada: "./img/semillaMojada.png",
          creciendo: "./img/zanahoriaCrecimiento.png",
          cosecha: "./img/zanahoriaCosecha.png",
          precio: 300,
        },
      ],
    };
  },

  computed: {
    /**
     * @memberof MainApp
     * @description Computed properties for the main application instance.
     * @namespace MainAppComputed
     */
  },
  methods: {
    /**
     * @memberof MainApp
     * @description Adds a new user. This function is currently a placeholder and does not perform any action.
     * @returns {void}
     */
    addUser() { },
    /**
     * @memberof MainApp
     * @description Handles user login. This function is currently a placeholder and does not perform any action.
     * @returns {void}
     */
    login() { },
    /**
     * @memberof MainApp
     * @description Redirects the user to the game page.
     * @returns {void}
     */
    gotogame() {
      window.location.href = "juego.html";
    },

    /**
     * @memberof MainApp
     * @description Plows a specified cell on the game board, changing its image from grass to tilled land.
     * @param {number} indexColumn - The index of the column where the cell is located.
     * @param {number} indexCell - The index of the cell within the specified column.
     * @returns {void}
     */
    arar(indexColumn, indexCell) {
      if (this.sprites[indexColumn].espacio[indexCell].image == this.pasto) {
        this.sprites[indexColumn].espacio[indexCell].image = this.tierra;
        this.actualizar({
          columna: indexColumn,
          fila: indexCell,
          propiedad: this.tierra,
        });
      }
    },

    /**
     * @memberof MainApp
     * @description Plants a selected seed on a specified tilled land cell.
     * @param {number} indexColumn - The index of the column where the seed is to be planted.
     * @param {number} indexCell - The index of the cell within the specified column where the seed is to be planted.
     * @returns {void}
     */
    sembrar(indexColumn, indexCell) {
      let parcela = this.sprites[indexColumn].espacio[indexCell];

      if (parcela.image == this.tierra && this.seleccionado) {
        parcela.image = this.seleccionado.semilla;
        parcela.tipo = this.seleccionado.tipo;
        this.actualizar({
          columna: indexColumn,
          fila: indexCell,
          propiedad: this.seleccionado.semilla,
          semilla: this.seleccionado.tipo,
          estado: "sembrado"
        });
        this.sembrarSemillaFetch(indexColumn, indexCell, this.seleccionado.tipo);
      }
    },

    /**
     * @memberof MainApp
     * @description Waters all planted seeds on the game board that match the currently selected fruit.
     * Changes the image of watered seeds and initiates the harvesting process.
     * @returns {void}
     */
    regar() {
      console.log("regando");

      if (!this.seleccionado) {
        return;
      }

      for (let i = 0; i < this.sprites.length; i++) {
        let columna = this.sprites[i];
        for (let j = 0; j < columna.espacio.length; j++) {
          let parcela = columna.espacio[j];

          if (parcela.image == this.seleccionado.semilla) {
            parcela.image = this.seleccionado.semillaMojada;
            parcela.estado = "creciendo";
            this.cosechar(i, j);
          }
        }
      }

      this.seleccionado = null;
    },
    /**
     * @memberof MainApp
     * @description Sets the currently selected fruit/seed to be planted.
     * @param {Object} fruto - The fruit object that is selected.
     * @returns {void}
     */
    seleccionarFruto(fruto) {
      this.seleccionado = fruto;
    },

    /**
     * @memberof MainApp
     * @description Handles various actions on a specific game board cell based on current selection or action state.
     * If 'regar' action is active, it waters the cell. If a fruit is selected, it attempts to plant it.
     * Otherwise, it plows the cell.
     * @param {number} indexColumn - The index of the column of the cell.
     * @param {number} indexCell - The index of the cell within the column.
     * @returns {void}
     */
    acciones(indexColumn, indexCell) {
      if (this.accion == "regar") {
        console.log("Entra a acciones");
        this.regar(indexColumn, indexCell);
      }
      if (this.seleccionado) {
        this.sembrar(indexColumn, indexCell);
      } else {
        this.arar(indexColumn, indexCell);
      }
    },

    /**
     * @memberof MainApp
     * @description Handles the purchase of a fruit/seed. Checks if the player has enough money,
     * updates the player's balance, sets the purchased item, and calls the backend API to record the purchase.
     * @param {Object} fruto - The fruit object to be purchased.
     * @returns {void}
     */
    comprar(fruto) {
      if (this.dinero < fruto.precio) {
        alert("No tienes suficiente dinero para comprar este producto");
      } else {
        this.compra = fruto;
        this.dinero = this.dinero - this.compra.precio;

        this.comprarSemillaFetch(fruto.tipo);
      }
    },

    /**
     * @memberof MainApp
     * @description Simulates the growth and harvesting of a crop on a specific cell.
     * Updates the sprite image to reflect "growing" and then "harvested" states after set delays,
     * and calls `guardarCosecha` to persist the harvest status.
     * @param {number} indexColumn - The index of the column where the crop is located.
     * @param {number} indexCell - The index of the cell within the specified column.
     * @returns {void}
     */
    cosechar(indexColumn, indexCell) {
      let parcela = this.sprites[indexColumn].espacio[indexCell];

      let fruto = null;

      for (let i = 0; i < this.frutos.length; i++) {
        if (this.frutos[i].tipo === parcela.tipo) {
          fruto = this.frutos[i];
        }
      }

      setTimeout(() => {
        this.sprites[indexColumn].espacio[indexCell].image = fruto.creciendo;
        this.sprites[indexColumn].espacio[indexCell].estado = "creciendo";
        parcela.image = fruto.creciendo;
        parcela.estado = "creciendo";

        this.actualizar({
          columna: indexColumn,
          fila: indexCell,
          propiedad: fruto.creciendo,
          semilla: parcela.tipo,
          estado: parcela.estado,
        });
      }, 10000);

      setTimeout(() => {
        this.sprites[indexColumn].espacio[indexCell].image = fruto.cosecha;
        this.sprites[indexColumn].espacio[indexCell].estado = "cosechado";
        parcela.image = fruto.cosecha;
        parcela.estado = "cosechado";

        this.guardarCosecha({
          columna: indexColumn,
          fila: indexCell,
          propiedad: fruto.cosecha,
          estado: parcela.estado,
          semilla: parcela.tipo,
        });
      }, 20000);
    },

    /**
     * @memberof MainApp
     * @description Asynchronously updates the properties of a parcel on the backend.
     * @async
     * @param {Object} datos - An object containing the data to update the parcel.
     * @param {number} datos.columna - The column index of the parcel.
     * @param {number} datos.fila - The row index of the parcel.
     * @param {string} datos.propiedad - The new property (e.g., image path) of the parcel.
     * @param {string} datos.semilla - The type of seed planted in the parcel.
     * @param {string} datos.estado - The current state of the parcel (e.g., "sembrado", "creciendo").
     * @returns {Promise<void>}
     */
    async actualizar(datos) {
      try {
        const respuesta = await fetch(
          "http://127.0.0.1:8000/api/parcela/update",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json","Accept": "application/json", "Authorization": `Bearer ${this.token}`
            },
            body: JSON.stringify({
              indicecolumna: datos.columna,
              indicefila: datos.fila,
              propiedades: datos.propiedad,
              semilla: datos.semilla,
              estado: datos.estado,
            }),
          }
        );
      } catch (error) { }
    },
    /**
     * @memberof MainApp
     * @description Asynchronously saves the complete state of the game board to the backend.
     * This is typically used for initial setup or mass saving of parcel data.
     * @async
     * @returns {Promise<void>}
     * @throws {Error} If there is an error during the saving process.
     */
    async guardando() {
      const mapaCompleto = [];
      for (let i = 0; i < this.sprites.length; i++) {
        const columna = this.sprites[i];
        for (let j = 0; j < columna.espacio.length; j++) {
          mapaCompleto.push({
            indicecolumna: i,
            indicefila: j,
            propiedades: columna.espacio[j].image,
            semilla: null,
            estado: null,
          });
        }
      }

      try {
        const respuesta = await fetch(
          "http://127.0.0.1:8000/api/parcela/store-firstime",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json","Accept": "application/json", "Authorization": `Bearer ${this.token}`
            },
            body: JSON.stringify(mapaCompleto),
          }
        );
        if (!respuesta.ok) {
          throw new Error(`Error al guardar el mapa: ${respuesta.status}`);
        }
        const data = await respuesta.json();
        console.log("Respuesta del guardado masivo: ", data);
      } catch (error) {
        console.log("Error en guardado masivo: ", error);
      }
    },
    /**
     * @memberof MainApp
     * @description Generates the initial game board terrain, filling it with grass sprites.
     * If `data` is provided, it updates the terrain with existing parcel information from the database.
     * @param {Array<Object>|null} data - An optional array of parcel data to pre-populate the terrain.
     * @returns {Array<Array<Object>>} The generated 2D array representing the game board sprites.
     */
    generarTerreno(data) {
      let floor = [];
      for (let i = 0; i < this.columns; i++) {
        let column = { index: i, espacio: [] };
        for (let j = 0; j < this.cells; j++) {
          column.espacio.push({ index: j, image: this.pasto, estado: null });
        }

        floor.push(column);
      }
      if (data) {
        data.forEach((parcela) => {
          const colIndex = parcela.indicecolumna;
          const rowIndex = parcela.indicefila;
          if (floor[colIndex] && floor[colIndex].espacio && floor[colIndex].espacio[rowIndex]) {


            floor[colIndex].espacio[rowIndex].image = parcela.propiedades;
            floor[colIndex].espacio[rowIndex].tipo = parcela.semilla;
            floor[colIndex].espacio[rowIndex].estado = parcela.estado;
          } else {

            console.log("Parcela ignorada por coordenadas inválidas:", parcela);
          }
        });
      }
      this.sprites = floor;
      console.log(this.sprites);

      //this.guardando();
      return this.sprites;
    },
    /**
     * @memberof MainApp
     * @description Asynchronously loads game board data from the backend API.
     * If no data is found, it initializes a new terrain and saves it to the database.
     * Otherwise, it populates the terrain with the fetched data.
     * @async
     * @returns {Promise<void>}
     * @throws {Error} If there is an error during data fetching.
     */
    async cargarDatos() {
      try {
        const respuesta = await fetch(
          "http://127.0.0.1:8000/api/parcela/index",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json","Accept": "application/json", "Authorization": `Bearer ${this.token}`
            },
          }
        );

        if (!respuesta.ok) {
          throw new Error(`Error al guardar los datos: ${respuesta.status}`);
        }
        const data = await respuesta.json();
        const parcelas = data.data || [];
        console.log("Respuesta: ", data);

        if (parcelas.length === 0) {
          this.generarTerreno(null);
          this.guardando();
          console.log("Estado: Mapa inicializado y guardado en la BD.");
        } else {
          this.generarTerreno(parcelas);
          console.log("Estado: Mapa cargado desde la BD.");
        }
      } catch (error) {
        console.log("Respuesta: ", error);
      }
    },

    /**
     * @memberof MainApp
     * @description Asynchronously saves the harvested crop's status to the backend and updates inventory.
     * @async
     * @param {Object} datos - An object containing the harvested parcel's data.
     * @param {number} datos.columna - The column index of the parcel.
     * @param {number} datos.fila - The row index of the parcel.
     * @param {string} datos.propiedad - The image path of the harvested crop.
     * @param {string} datos.estado - The state of the parcel after harvest (i.e., "cosechado").
     * @param {string} datos.semilla - The type of fruit that was harvested.
     * @returns {Promise<void>}
     * @throws {Error} If there is an error during the saving or inventory update process.
     */
    async guardarCosecha(datos) {
      try {
        await fetch("http://localhost:8000/api/parcela/cosechar", {
          method: "POST",
          headers: { "Content-Type": "application/json","Accept": "application/json", "Authorization": `Bearer ${this.token}` },
          body: JSON.stringify({
            indicecolumna: datos.columna,
            indicefila: datos.fila,
            propiedades: datos.propiedad,
            estado: 'cosechado'
          }),
        });
        const tipoFruto = datos.semilla;

        if (tipoFruto) {
          const respuestaInventario = await fetch("http://localhost:8000/api/inventario/cosechar", {
            method: "POST",
            headers: { "Content-Type": "application/json","Accept": "application/json", "Authorization": `Bearer ${this.token}` },
            body: JSON.stringify({
              tipo: tipoFruto
            })
          });
          console.log("¡Fruto guardado en inventario!");
        }

      } catch (error) {
        console.log("Error en el proceso de cosecha:", error);
      }
    },

    /**
     * @memberof MainApp
     * @description Asynchronously handles the purchase of a seed by interacting with the backend inventory API.
     * Displays an alert upon successful purchase.
     * @async
     * @param {string} tipo - The type of seed to be purchased.
     * @returns {Promise<void>}
     * @throws {Error} If there is an error during the seed purchase process.
     */
    async comprarSemillaFetch(tipo) {
      try {
        const respuesta = await fetch("http://localhost:8000/api/inventario/comprar", {
          method: "POST",
          headers: { "Content-Type": "application/json","Accept": "application/json", "Authorization": `Bearer ${this.token}` },
          body: JSON.stringify({
            tipo: tipo
          })
        });



        alert("Compraste una semilla de: " + tipo);
      } catch (error) {
        console.error("Error al comprar semilla:", error);
      }
    },

    /**
     * @memberof MainApp
     * @description Asynchronously saves the information about a newly planted seed to the backend API.
     * @async
     * @param {number} indiceFila - The row index where the seed was planted.
     * @param {number} indiceColumna - The column index where the seed was planted.
     * @param {string} tipo - The type of seed that was planted.
     * @returns {Promise<void>}
     * @throws {Error} If there is an error during the seed planting process.
     */
    async sembrarSemillaFetch(indiceFila, indiceColumna, tipo) {
      try {
        const respuesta = await fetch("http://localhost:8000/api/parcela/store", {
          method: "POST",
          headers: { "Content-Type": "application/json","Accept": "application/json", "Authorization": `Bearer ${this.token}` },
          body: JSON.stringify({
            indicefila: indiceFila,
            indicecolumna: indiceColumna,
            tipo: tipo
          })
        });

        const data = await respuesta.json();
        console.log("Respuesta sembrar:", data);
      } catch (error) {
        console.error("Error al sembrar semilla:", error);
      }
    }


  },
  /**
   * @memberof MainApp
   * @description Lifecycle hook that is called after the instance has been mounted.
   * It triggers the asynchronous loading of game data.
   * @returns {void}
   */
  mounted() {
    this.cargarDatos();
  },
});
