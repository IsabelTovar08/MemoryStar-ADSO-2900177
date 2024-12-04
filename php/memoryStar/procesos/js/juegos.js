document.addEventListener("DOMContentLoaded", () => {
  const informacionJson = document.getElementById("jugarSolo");


  let selectedGameConfig = {
    tipoJuego: null,
    Tematica: null,
    dificultad: null
  };


  informacionJson.addEventListener("click", () => {
    // First fetch the main game configuration
    fetch("json/juegos.json")
      .then((response) => response.json())
      .then((datos) => {
        mostrarConfiguracion(datos.configurarJuego);
      })
      .catch((error) => console.error("Error al cargar el JSON:", error));
  });

  function mostrarConfiguracion(juegoConfig) {
    let resultadoMostrar = `
      
          <div class="col row tituloAtras">
            <div class="col-4"><a href="configurarJuego.html"><img src="img/iconos/atrasN.png" alt="" class="atras"></a></div>
            <div class="col-6">
              <h1 class="game-title">${juegoConfig.titulo}</h1>
            </div>
          </div>

      <div class="col row">
          <div class="col-3 ">
              
    `;

    resultadoMostrar += `
          <div class="carouselG">
            <div class="carousel-innerG">
                <div class="carousel-itemG">1</div>
                <div class="carousel-itemG">2</div>
                <div class="carousel-itemG">3</div>
                <div class="carousel-itemG">4</div>
                <div class="carousel-itemG">5</div>
                <div class="carousel-itemG">6</div>
            </div>
          </div>
      </div>
      <div class="col-8 sala" id="juego">
    `;

    // Fetch game types from PHP backend
    fetch("procesos/juegos/tipoJuegos/juegos.php")
      .then((response) => response.json())
      .then((datos) => {
        let gameContent = `
          <h1 class="tamaño_letra textoEleccion">¿Qué quieres jugar?</h1>
          <div class="tarjetas-container">
        `;

        datos.forEach((juego) => {
          if (juego.imagen) {
            gameContent += `
              <div class="option juegoUno">
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

        document.getElementById("juego").innerHTML = gameContent;

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

    document.getElementById("contenido").innerHTML = resultadoMostrar;
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
      <h1 class="tamaño_letra textoEleccion">Selecciona la temática</h1>
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
                        <h1 class="tamaño_letra textoEleccion">Elige la temática</h1>
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
                        <h1 class="tamaño_letra textoEleccion">Elige la dificultad</h1>
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
    "idModo": 1
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
  fetch('procesos/configuracion/redireccion.php')
    .then(response => response.json())
    .then(data => {
        console.log(data); // Aquí puedes manejar los datos JSON
        // Acceder a los valores individuales
        console.log(data.nombrejuego);
        console.log(data.tematicajuego);
        console.log(data.nombredificultad);

        if(data.nombredificultad === null){
          if(data.tematicajuego === 'arma tu nave' ){
            window.location.href =  `espacialCartas.html`;
            console.log(`${data.nombrejuego}${data.tematicajuego}.html`)
          }else{
            window.location.href =  `espacialArma.html`;
            console.log(`${data.nombrejuego}${data.tematicajuego}.html`)
          }
        }else{
          window.location.href = `juego/juegoOrdenar/${data.nombrejuego}${data.tematicajuego}${data.nombredificultad}.html`;
         console.log(`${data.nombrejuego}${data.tematicajuego}${data.nombredificultad}.html`)

        }

    })
    .catch(error => console.error('Error al obtener los datos:', error));

}


// const multijuga = document.getElementById('jugarMultijugador');

// multijuga.addEventListener("click", ()=>{
//   fetch("json/opcionMul.json")
//   .then((response) => response.json())
//   .then((datos) => {
//     multijugador(datos.multi);
   
// }) 
// .catch((error) => console.error("Error al cargar el JSON:", error));
// })


// function multijugador(condicion) {
//   let resultadoMostrar = `
//           <a href="configurarJuego.php"><img src="img/iconos/atrasN.png" alt="" class="atras"></a>
//           <div class="bienvenido"><img src="${condicion.logo}" alt="logoMemory" class="segundoLogo"></div>
//           <h1 class="textoEleccion">${condicion.texto}</h1>
//           <div class="contenedorOpciones">
//               <img src="${condicion.unirse}" class="oJuegos zoom" alt="Imagen 1" id="unirseSala">
//               <img src="${condicion.crear}" class="oJuegos zoom" alt="Imagen 2" id="crearSala">
//           </div>
//       `;

//   document.getElementById("contenido").innerHTML = resultadoMostrar;
//   document.getElementById("unirseSala").addEventListener("click", peticion);
//   document.getElementById("crearSala").addEventListener("click", crearSala);
// }
// function crearSala() {
//   window.location.href = `crearSala.html`;
// }


// function peticion(){
//   window.location.href = `unirse_sala/index.html`;
  
// }

// function unirse(unir) {
//   let resultadoMostrar = `
//           <div class="bienvenido"><img src="${unir.logo}" alt="logoMemory" class="segundoLogo"></div>
//               <h1 class="textoEleccion"${unir.textoU}</h1>
//           <div class="unirse">
//               <div class="">
//                   <input class="form-control" id="codigo" required="" type="text" />
//               </div>
//               <img src="${unir.imgU}" alt="" class="play zoom" id="play" width="200">
//           </div>

          
//       `;

//   document.getElementById("contenido").innerHTML = resultadoMostrar;
//   const logo = (document.querySelector(".segundoLogo").style.width = "15vh");
//   const atras = (document.querySelector(".atras").style.width = "8vh");
// }
// window.addEventListener("popstate", (e) => {
//   console.log("Navegación: " + history.state);
// });


}); 