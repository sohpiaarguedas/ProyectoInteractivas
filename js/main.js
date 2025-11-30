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
      dinero: 1000,
      compra: null,
      frutos: [
        {
          tipo: "tomate",
          semillaPaquete: "./img/Semillas_paquete_tomate.png",
          semilla: "./img/semillaPlantada.png",
          semillaMojada: "./img/semillaMojada.png",
          creciendo: "./img/tomateCrecimiento",
          cosecha: "tomate",
          precio: 100
        },
        {
          tipo: "pepino",
          semillaPaquete: "./img/Semillas_paquete_pepino.png",
          semilla: "./img/semillaPlantada.png",
          semillaMojada: "./img/semillaMojada.png",
          creciendo: "./img/pepinoCrecimiento",
          cosecha: "pepino",
          precio: 200
        },

        {
          tipo: "zanahoria",
          semillaPaquete: "./img/Semillas_paquete_zanahoria.png",
          semilla: "./img/semillaPlantada.png",
          semillaMojada: "./img/semillaMojada.png",
          creciendo: "./img/zanahoriaCrecimiento.png",
          cosecha: "zanahoria",
          precio: 300
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
        this.actualizar({
          columna: indexColumn,
          fila: indexCell,
          propiedad: this.tierra
        });
      }
    },

    sembrar(indexColumn, indexCell) {
      let parcela = this.sprites[indexColumn].espacio[indexCell];

      if (parcela.image == this.tierra && this.seleccionado) {
        parcela.image = this.seleccionado.semilla;
        this.actualizar({
          columna: indexColumn,
          fila: indexCell,
          propiedad: this.seleccionado.semilla,
          semilla: this.seleccionado.tipo
        });
      }
    },

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
        this.actualizar({
          columna: i,
          fila: j,
          propiedad: this.seleccionado.semillaMojada,
          semilla: this.seleccionado.tipo
        });
      }
    }
  }

  this.seleccionado = null;
},

    seleccionarFruto(fruto) {
      this.seleccionado = fruto;
    },

    acciones(indexColumn, indexCell) {
      if (this.accion == "regar") {
        console.log("Entra a acciones");
        this.regar(indexColumn, indexCell);
      } if (this.seleccionado) {
        this.sembrar(indexColumn, indexCell);
      } else {
        this.arar(indexColumn, indexCell);
      }
    },

    comprar(fruto){
        if(this.dinero < fruto.precio){
            alert("No tienes suficiente dinero para comprar este producto");
        }else{
            this.compra= fruto;
            this.dinero= this.dinero - this.compra.precio;
            
        }
        
    },
    async actualizar(datos) {
      try {
        const respuesta = await fetch("http://127.0.0.1:8000/api/parcela/update", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            indicecolumna: datos.columna,
            indicefila: datos.fila,
            propiedades: datos.propiedad,
            semilla: datos.semilla

          })
        })
      }
      catch (error) {

      };
    },
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
    async cargarDatos() {
      try {
        const respuesta = await fetch("http://127.0.0.1:8000/api/parcela/index", {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          },
        });


        if (!respuesta.ok) {
          throw new Error(`Error al guardar los datos: ${respuesta.status}`)
        }
        const data = await respuesta.json();
        const parcelas = data.data
        console.log("Respuesta: ", data);


        if (parcelas.length === 0) {
          this.generarTerreno(null);
          this.guardando();
          console.log("Estado: Mapa inicializado y guardado en la BD.");
        } else {

          this.generarTerreno(parcelas);
          console.log("Estado: Mapa cargado desde la BD.");
        }
      }

      catch (error) {
        console.log("Respuesta: ", error);
      }
    }
  },
  mounted() {
    this.cargarDatos();
  },
});
