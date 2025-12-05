/**
 * Vue application instance.
 * @namespace MainApp
 */
const app = Vue.createApp({
  /**
   * Reactive data properties for the main application.
   * @memberof MainApp
   * @returns {Object} The data object for the Vue instance.
   */
  data() {
    return {
      /**
       * User storage array.
       * @type {Array<Object>}
       */
      usersStorage: [],
      /**
       * User object with email, birthdate, username, and password.
       * @type {Object}
       */
      users: {
        email: "",
        birthdate: "",
        username: "",
        password: "",
      },
      /**
       * Path to the grass image.
       * @type {string}
       */
      pasto: "./img/pasto.png",
      /**
       * Path to the soil image.
       * @type {string}
       */
      tierra: "./img/tierra.png",
      /**
       * Number of columns in the grid.
       * @type {number}
       */
      columns: 5,
      /**
       * Number of cells in each column.
       * @type {number}
       */
      cells: 10,
      /**
       * The currently selected item.
       * @type {Object|null}
       */
      seleccionado: null,
      /**
       * The grid of sprites representing the farm.
       * @type {Array<Object>}
       */
      sprites: [],
      /**
       * The player's current money.
       * @type {number}
       */
      dinero: 1000,
      /**
       * The item being purchased.
       * @type {Object|null}
       */
      compra: null,
      /**
       * Array of available fruits with their properties.
       * @type {Array<Object>}
       */
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

  computed: {},
  /**
   * Methods for the main application.
   * @memberof MainApp
   */
  methods: {
    /**
     * @memberof MainApp
     * @method addUser
     * @description Placeholder for the user registration functionality. This method is intended to handle the logic for adding a new user to the system. It is connected to the frontend through Vue's v-model directive but currently lacks an implementation.
     */
    addUser() {},
    /**
     * @memberof MainApp
     * @method login
     * @description Placeholder for the user login functionality. This method is designed to verify user credentials against stored data. It is intended to be used from the login HTML page but is not yet implemented.
     */
    login() {},
    /**
     * @memberof MainApp
     * @method gotogame
     * @description Navigates the user to the main game page. This method changes the window's location to 'juego.html', effectively redirecting the user to the game interface.
     */
    gotogame() {
      window.location.href = "juego.html";
    },

    /**
     * @memberof MainApp
     * @method arar
     * @description Tills a selected plot of land. This method checks if the selected cell is grass and changes it to tillable soil. The state change is then persisted by calling the `actualizar` method.
     * @param {number} indexColumn - The column index of the grid cell.
     * @param {number} indexCell - The row index of the grid cell.
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
     * @method sembrar
     * @description Plants a selected seed in a tilled plot of land. This method verifies that the cell is tilled soil and that a seed has been selected. It then updates the cell's image to represent the planted seed and persists this change through the `actualizar` and `sembrarSemillaFetch` methods.
     * @param {number} indexColumn - The column index of the grid cell.
     * @param {number} indexCell - The row index of the grid cell.
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
     * @method regar
     * @description Waters all planted seeds on the farm. This method iterates through all the cells of the grid, and for each cell that contains a planted seed, it changes its state to 'growing' and updates its image to a watered seed. It then schedules the harvest by calling the `cosechar` method. Finally, it resets the player's selection.
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
     * @method seleccionarFruto
     * @description Sets the currently selected fruit for planting. This method updates the `seleccionado` data property with the fruit object chosen by the user from the interface.
     * @param {Object} fruto - The fruit object to be selected.
     */
    seleccionarFruto(fruto) {
      this.seleccionado = fruto;
    },

    /**
     * @memberof MainApp
     * @method acciones
     * @description Determines and executes the primary action on a grid cell based on the current game state. If the 'regar' action is active, it waters the plot. If a seed is selected, it plants it. Otherwise, it tills the land.
     * @param {number} indexColumn - The column index of the grid cell.
     * @param {number} indexCell - The row index of the grid cell.
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
     * @method comprar
     * @description Handles the purchase of a fruit's seeds. This method checks if the player has enough money, and if so, deducts the price from their total and initiates the purchase process on the backend via `comprarSemillaFetch`.
     * @param {Object} fruto - The fruit object whose seeds are to be purchased.
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
     * @method cosechar
     * @description Manages the growth and harvesting process for a plant. This method schedules two timed events: the first to transition the plant to a 'growing' state, and the second to transition it to a 'harvested' state. Each state change is persisted to the backend.
     * @param {number} indexColumn - The column index of the grid cell.
     * @param {number} indexCell - The row index of the grid cell.
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
        this.sprites[indexColumn].espacio[indexCell].image =fruto.creciendo;
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
        });
      }, 20000);
    },

    /**
     * @memberof MainApp
     * @method actualizar
     * @description Sends an update to the server to persist changes to a plot of land. This asynchronous method makes a POST request to the backend API with the new properties of the cell.
     * @param {Object} datos - An object containing the cell's updated data.
     * @param {number} datos.columna - The column index of the cell.
     * @param {number} datos.fila - The row index of the cell.
     * @param {string} datos.propiedad - The new value for the 'image' property of the cell.
     * @param {string} datos.semilla - The type of seed planted.
     * @param {string} datos.estado - The current state of the plot.
     */
    async actualizar(datos) {
      try {
        const respuesta = await fetch(
          "http://127.0.0.1:8000/api/parcela/update",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
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
      } catch (error) {}
    },
    /**
     * @memberof MainApp
     * @method guardando
     * @description Saves the initial state of the entire game map to the server. This method is typically called only once when the game is first initialized. It sends the complete grid layout to the backend to be stored.
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
              "Content-Type": "application/json",
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
     * @method generarTerreno
     * @description Creates the initial game grid or populates it with data from the server. If no data is provided, it generates a new grid of default grass plots. If data is provided, it populates the grid with the states of each plot as received from the backend.
     * @param {Array<Object>|null} data - An array of plot data objects from the server, or null to generate a new map.
     * @returns {Array<Object>} The initialized or updated grid of sprites.
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
          floor[colIndex].espacio[rowIndex].image = parcela.propiedades;
          floor[colIndex].espacio[rowIndex].tipo = parcela.semilla;
          floor[colIndex].espacio[rowIndex].estado = parcela.estado;
          console.log(
            "Imagen actualizada:",
            floor[colIndex].espacio[rowIndex].image
          );
        });
      }
      this.sprites = floor;
      console.log(this.sprites);

      //this.guardando();
      return this.sprites;
    },
    /**
     * @memberof MainApp
     * @method cargarDatos
     * @description Loads the initial game data from the server. This method fetches the state of all farm plots. If no data is returned (i.e., it's a new game), it initializes a new map and saves it to the server. Otherwise, it populates the game grid with the fetched data.
     */
    async cargarDatos() {
      try {
        const respuesta = await fetch(
          "http://127.0.0.1:8000/api/parcela/index",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!respuesta.ok) {
          throw new Error(`Error al guardar los datos: ${respuesta.status}`);
        }
        const data = await respuesta.json();
        const parcelas = data.data;
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
     * @method guardarCosecha
     * @description Sends data to the server to record a harvested crop. This method makes a POST request to the backend API, providing the coordinates and updated properties of the harvested plot.
     * @param {Object} datos - An object containing the harvest data.
     * @param {number} datos.columna - The column index of the harvested plot.
     * @param {number} datos.fila - The row index of the harvested plot.
     * @param {string} datos.propiedad - The final state or image of the harvested plot.
     */
     async guardarCosecha(datos) {
      try {
        await fetch("http://127.0.0.1:8000/api/parcela/cosechar", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            indicecolumna: datos.columna,
            indicefila: datos.fila,
            propiedades: datos.propiedad,
            
          }),
        });

        console.log("Cosecha guardada");
      } catch (error) {
        console.log("Error guardando cosecha:", error);
      }
    },

    /**
     * @memberof MainApp
     * @method comprarSemillaFetch
     * @description Communicates with the server to process the purchase of a seed. It sends a POST request with the type of seed being bought and alerts the user upon a successful transaction.
     * @param {string} tipo - The type of seed to be purchased.
     */
    async comprarSemillaFetch(tipo) {
    try {
        const respuesta = await fetch("http://localhost:8000/api/inventario/comprar", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
             tipo: tipo })
        });

        const data = await respuesta.json();

        alert("Compraste una semilla de: " + tipo);
    } catch (error) {
        console.error("Error al comprar semilla:", error);
    }
},

/**
 * @memberof MainApp
 * @method sembrarSemillaFetch
 * @description Sends a request to the server to record the action of planting a seed in a specific plot. It makes a POST request with the plot coordinates and the type of seed.
 * @param {number} indiceFila - The row index of the plot.
 * @param {number} indiceColumna - The column index of the plot.
 * @param {string} tipo - The type of seed being planted.
 */
  async sembrarSemillaFetch(indiceFila, indiceColumna, tipo) {
    try {
        const respuesta = await fetch("http://localhost:8000/api/parcela/store", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                indicefila: indiceFila,
                indicecolumna: indiceColumna,
                tipo: tipo
            })
        });

        const data = await respuesta.json();
        console.log("Respuesta sembrar:", data);

        if (respuesta.ok) {
            alert(`Sembraste una semilla de ${tipo}`);
        } else {
            alert("Error");
        }

    } catch (error) {
        console.error("Error al sembrar semilla:", error);
    }
}


  },
  /**
   * @memberof MainApp
   * @method mounted
   * @description A Vue lifecycle hook that is called after the instance has been mounted. It triggers the initial data load for the game by calling the `cargarDatos` method.
   */
  mounted() {
    this.cargarDatos();
  },
});
