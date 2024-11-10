document.addEventListener("DOMContentLoaded", () => {

    let selectedGameConfig = {
      tipoJuego: null,
      Tematica: null,
      dificultad: null,
      modo:null      
    };
 
    mostrarConfiguracion();
       
  
    function mostrarConfiguracion() {
      
  
      // Fetch game types from PHP backend
      fetch("procesos/juegos/tipoJuegos/juegos.php")
        .then((response) => response.json())
        .then((datos) => {
          let gameContent = `
            <h1 class="textoEleccion">¿Qué quieres jugar?</h1>
            <div class="tarjetas-container">
          `;
  
          datos.forEach((juego) => {
            if (juego.imagen) {
              gameContent += `
                <div class="option juegoUno" data-bs-toggle="modal" data-bs-target="#${juego.nombre_tipo_juego}">
                    <input type="radio" name="tipoJuego" id="${juego.nombre_tipo_juego}" value="${juego.id_tipo_juego}">
                    <label class="tarjetaOpcion" for="${juego.nombre_tipo_juego}">
                        <img src="${juego.imagen}" alt="${juego.nombre_tipo_juego}">
                    </label>
                    <div class="romboide">
                        <h6>${juego.nombre_tipo_juego}</h6>
                    </div>
                </div>
              `;
            }
          });
  
          gameContent += `
            </div>
            <div id="res"></div>
          `;
  
          document.getElementById("juegoSala").innerHTML = gameContent;
  
          document.querySelectorAll('input[name="tipoJuego"]').forEach((juego) => {
            juego.addEventListener("change", function() {
              selectedGameConfig.tipoJuego = this.value;
              if (this.value === "1") {
                console.log("Juego de cartas seleccionado:", this.value);
                seleccionarTematicaCartas();
              } else if (this.value === "2") {
                console.log("Juego de secuencia seleccionado:", this.value);
                seleccionarTematicaSecuencia();
              }
            });
          });
        })
        .catch((error) => console.error("Error al cargar los juegos:", error));
  
      
    }
  
    // Keep the original functions for game type selection
    function seleccionarTematicaCartas() {
      fetch("procesos/juegos/tematicasJuegos/tematicaEspacial/espacial.php")
        .then((response) => response.json())
        .then((datos) => {
          mostrarOpcionesCartas(datos);
        })
        .catch((error) => console.error("Error al cargar las temáticas:", error));
    }
  
    function mostrarOpcionesCartas(opciones) {
      document.getElementById("res").innerHTML = "";
      let resultadoTematicas = `
        <h1 class="textoEleccion">Selecciona la temática</h1>
        <div class="tarjetas-container">
      `;
  
      opciones.forEach((opcion) => {
        resultadoTematicas += `
          <div class="option  ${opcion.nombre_tematica} ">
            <input type="radio" name="tipoJuegoEspacial" id="${opcion.nombre_tematica}" value="${opcion.id_tematica}">
            <label class="tarjetaOpcion" for="${opcion.nombre_tematica}">
              <img src="${opcion.imagen}" alt="">
            </label>
            <div class="romboide">
              <h6>${opcion.nombre_tematica}</h6>
            </div>
          </div>
        `;
      });
  
      resultadoTematicas += `
        </div>
        <img src="img/iconos/play.png" alt="" class="play zoom" id="procesarJuegoCartas">
      `;
  
      document.getElementById("res").innerHTML = resultadoTematicas;
      console.log('Temáticas:', opciones);
              
  
      document.querySelectorAll('input[name="tipoJuegoEspacial"]').forEach((juego) => {
        juego.addEventListener("change", function() {
          let tematicaSeleccionada = this.value;
          if (tematicaSeleccionada === "1") {
            console.log(tematicaSeleccionada)
            // seleccionarTematicaCartas();
          } else if (tematicaSeleccionada === "2") {
            console.log(tematicaSeleccionada)
            // seleccionarTematicaSecuencia();
          }
        });
      });
  
      document.querySelector(".play").style.width = "20vh";
      document
        .getElementById("procesarJuegoCartas")
        .addEventListener("click", procesarEleccionCartas);
    }
  
    function procesarEleccionCartas() {
      const tematicaSeleccionada = document.querySelector('input[name="tipoJuegoEspacial"]:checked');
      
      if (tematicaSeleccionada) {
        selectedGameConfig.Tematica = tematicaSeleccionada.value;
        selectedGameConfig.dificultad = null; // Las cartas no tienen dificultad
        
        console.log("Configuración final del juego:", selectedGameConfig);
        return configuracionJuego(
          selectedGameConfig.tipoJuego,
          selectedGameConfig.Tematica,
          selectedGameConfig.dificultad
        );
      } else {
        alert("Por favor selecciona una temática");
      }
    }
  
  
  
  
    function seleccionarTematicaSecuencia() {
      document.getElementById("res").innerHTML = " ";
  
      fetch('procesos/juegos/tematicasJuegos/tematicaOrdenar/Ordenar.php')
          .then(response => response.json())
          .then(data => {
              if (data.error) {
                  console.error('Error:', data.error);
                  return;
              }
  
              let contenidoHTML = `
                  <div class="col row">
                      <div class="col">
                          <h1 class="textoEleccion">Elige la temática</h1>
              `;
              
              // Procesar temáticas en grupos de 2
              for (let i = 0; i < data.tematicas.length; i += 2) {
                  contenidoHTML += '<div class="tarjetas-container bloque-tematicas">';
                  
                  // Agregar primera temática del par
                  contenidoHTML += `
                      <div class="option ${data.tematicas[i].nombre_tematica}">
                          <input type="radio" 
                                 name="tematica" 
                                 id="tematica_${data.tematicas[i].id_tematica}" 
                                 value="${data.tematicas[i].id_tematica}">
                          <label class="tarjetaOpcion" for="tematica_${data.tematicas[i].id_tematica}">
                              <img src="${data.tematicas[i].imagen}" alt="${data.tematicas[i].nombre_tematica}">
                          </label>
                          <div class="romboide">
                              <h6>${data.tematicas[i].nombre_tematica}</h6>
                          </div>
                      </div>
                  `;
  
                  // Agregar segunda temática si existe
                  if (i + 1 < data.tematicas.length) {
                      contenidoHTML += `
                          <div class="option ${data.tematicas[i +1].nombre_tematica}">
                              <input type="radio" 
                                     name="tematica" 
                                     id="tematica_${data.tematicas[i + 1].id_tematica}" 
                                     value="${data.tematicas[i + 1].id_tematica}">
                              <label class="tarjetaOpcion" for="tematica_${data.tematicas[i + 1].id_tematica}">
                                  <img src="${data.tematicas[i + 1].imagen}" alt="${data.tematicas[i + 1].nombre_tematica}">
                              </label>
                              <div class="romboide">
                                  <h6>${data.tematicas[i + 1].nombre_tematica}</h6>
                              </div>
                          </div>
                      `;
                  }
                  
                  contenidoHTML += '</div>';
              }
  
              contenidoHTML += `
                      </div>
                      <div class="col">
                          <h1 class="textoEleccion">Elige la dificultad</h1>
              `;
  
              // Procesar dificultades en grupos de 2
              for (let i = 0; i < data.dificultades.length; i += 2) {
                  contenidoHTML += '<div class="tarjetas-container bloque-dificultades">';
                  
                  // Agregar primera dificultad del par
                  contenidoHTML += `
                      <div class="option ${data.dificultades[i].nombre_dificultad}">
                          <input type="radio" 
                                 name="dificultad" 
                                 id="dificultad_${data.dificultades[i].id_dificultad}" 
                                 value="${data.dificultades[i].id_dificultad}">
                          <label class="tarjetaOpcion" for="dificultad_${data.dificultades[i].id_dificultad}">
                              <img src="${data.dificultades[i].imagen}" alt="${data.dificultades[i].nombre_dificultad}">
                          </label>
                          <div class="romboide">
                              <h6>${data.dificultades[i].nombre_dificultad}</h6>
                          </div>
                      </div>
                  `;
  
                  // Agregar segunda dificultad si existe
                  if (i + 1 < data.dificultades.length) {
                      contenidoHTML += `
                          <div class="option ${data.dificultades[i + 1].nombre_dificultad}">
                              <input type="radio" 
                                     name="dificultad" 
                                     id="dificultad_${data.dificultades[i + 1].id_dificultad}" 
                                     value="${data.dificultades[i + 1].id_dificultad}">
                              <label class="tarjetaOpcion" for="dificultad_${data.dificultades[i + 1].id_dificultad}">
                                  <img src="${data.dificultades[i + 1].imagen}" alt="${data.dificultades[i + 1].nombre_dificultad}">
                              </label>
                              <div class="romboide">
                                  <h6>${data.dificultades[i + 1].nombre_dificultad}</h6>
                              </div>
                          </div>
                      `;
                  }
                  
                  contenidoHTML += '</div>';
              }
  
              contenidoHTML += `
                      </div>
                  </div>
                  <img src="img/iconos/play.png" alt="" class="play zoom" id="procesarJuegoSecuencia">
  
                  
              `;
  
              // Insertar el contenido en el DOM
              document.getElementById('res').innerHTML = contenidoHTML;
  
  
              document.querySelectorAll('input[name="tematica"]').forEach((juego) => {
                juego.addEventListener("change", function() {
                  let tematicaSeleccionada = this.value;
                  if (tematicaSeleccionada === "3") {
                    console.log(tematicaSeleccionada)
                    // seleccionarTematicaCartas();
                  }else if(tematicaSeleccionada === "4"){
                    console.log(tematicaSeleccionada)
                    // seleccionarTematicaSecuencia();
                  }else if(tematicaSeleccionada === "5"){
                    console.log(tematicaSeleccionada)
                  }else if(tematicaSeleccionada === "6"){
                    console.log(tematicaSeleccionada) 
                  }
                });
              });
  
              document.querySelectorAll('input[name="dificultad"]').forEach((juego) => {
                juego.addEventListener("change", function() {
                  let dificultadSeleccionada = this.value;
                  if (dificultadSeleccionada === "1") {
                    console.log(dificultadSeleccionada)
                    // seleccionarTematicaCartas();
                  } else if (dificultadSeleccionada === "2") {
                    console.log(dificultadSeleccionada)
                    // seleccionarTematicaSecuencia();
                  }else if(dificultadSeleccionada == "3"){
                    console.log(dificultadSeleccionada)
                  }
                });
              });
  
              console.log('Temáticas:', data.tematicas);
              console.log('Dificultades:', data.dificultades);
  
  
              // Aplicar estilos y evento al botón de play
              document.querySelector(".play").style.width = "20vh";
              document
                  .getElementById("procesarJuegoSecuencia")
                  .addEventListener("click", procesarEleccionSecuencia);
  
              // Log para debug
              console.log('Datos recibidos:', data);
          })
          .catch(error => {
              console.error('Error en la petición:', error);
          });
  }
  
  
  
  function procesarEleccionSecuencia() {
    const tematicaSeleccionada = document.querySelector('input[name="tematica"]:checked');
    const dificultadSeleccionada = document.querySelector('input[name="dificultad"]:checked');
    
    if (tematicaSeleccionada && dificultadSeleccionada) {
      selectedGameConfig.Tematica = tematicaSeleccionada.value;
      selectedGameConfig.dificultad = dificultadSeleccionada.value;
      
     
      return configuracionJuego(
        selectedGameConfig.tipoJuego,
        selectedGameConfig.Tematica,
        selectedGameConfig.dificultad
      );
    } else {
      alert("Por favor selecciona tanto la temática como la dificultad");
    }
  }
  
  
  
  function configuracionJuego(juegoSeleccionado, tematica, dificultad) { 
    const config = {
      "idJuego": juegoSeleccionado,
      "idTematica": tematica,
      "idDificultad": dificultad,
      "idModo":2
    };
    
    console.log("Configuración final:", config);
  
    // Enviar la configuración al archivo PHP
    fetch('procesos/configuracion/recibirConfiguracion.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(config)
    })
    .then(response => response.json())  
    .then(data => {
      console.log("Respuesta del servidor:", data);
      hola();
  
    })
    .catch(error => {
      console.error("Error al enviar configuración:", error);
    });
  
    return config;
  }
  
  function hola(){

    const capacidadSala = document.getElementById('capacidadSala').value;
    const nombreSala = document.getElementById('nombreSala').value;
    

    let guardarNumero = [];
    let numeroAleatorio;
      for(let iteracion = 0; iteracion < 6; iteracion++) {
          numeroAleatorio = Math.floor(Math.random() * 10);
          guardarNumero.push(numeroAleatorio);
      }
    let numeroSinComas = guardarNumero.join("");
    console.log(numeroSinComas)



    let capacSala ={
      "capacidad":capacidadSala,
      "nombreSala": nombreSala,
      "codigoSala":numeroSinComas
    }

    console.log(capacSala)


    fetch('procesos/configuracionSala/recibirConfiguracionSala.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(capacSala)
    })
    .then(response => response.json())  
    .then(data => {
      console.log("Respuesta del servidor:", data);
      
  
    }) 
    .catch(error => {
      console.error("Error al enviar configuración:", error);
    });
  
  }
  
  
  }); 