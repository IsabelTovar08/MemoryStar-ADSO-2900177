document.addEventListener("DOMContentLoaded", function () {
  const informacionJson = document.getElementById("jugarSolo");

  informacionJson.addEventListener("click", () => {
    fetch("json/juegos.json")
      .then((response) => response.json())
      .then((datos) => {
        mostrarConfiguracion(datos.configurarJuego);
      })
      .catch((error) => console.error("Error al cargar el JSON:", error));
  });

  function mostrarConfiguracion(juegoConfig) {
    let resultadoMostrar = `
              <a href="configurarJuego.php"><img src="img/iconos/atrasN.png" alt="" class="atras"></a>
              <h1 class="game-title">${juegoConfig.titulo}</h1>
              <div class="col row">
                  <div class="col-4 sala">
                      <h1 class="textoEleccion">${juegoConfig.avatarTitulo}</h1>
                      <div id="carouselExampleIndicators" class="carousel slide carousel-container" data-bs-interval="false">
                          <div class="carousel-indicators">
          `;

    juegoConfig.imagenes.forEach((imagen, index) => {
      resultadoMostrar += `
                  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${index}" 
                      class="${
                        index === 0 ? "active" : ""
                      }" aria-label="Slide ${index + 1}"></button>
              `;
    });

    resultadoMostrar += `</div><div class="carousel-inner carousel-images">`;

    juegoConfig.imagenes.forEach((imagen, index) => {
      resultadoMostrar += `
                  <div class="carousel-item ${index === 0 ? "active" : ""}">
                      <img src="${imagen.src}" class="d-block w-100" alt="${
        imagen.alt
      }">
                      <input type="radio" id="img${
                        index + 1
                      }" name="carousel" value="${imagen.value}" ${
        imagen.checked ? "checked" : ""
      }>
                  </div>
              `;
    });

    resultadoMostrar += `
                  </div>
                  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                      <span class="visually-hidden">Previous</span>
                  </button>
                  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                      <span class="carousel-control-next-icon" aria-hidden="true"></span>
                      <span class="visually-hidden">Next</span>
                  </button>
              </div>
              <div class="boton-avatar">
                  <button class="btn" onclick="seleccionarImagen()">Seleccionar</button>
              </div>
              </div>
              <div class="col-7 sala" id="juego">
                  <h1 class="textoEleccion">¿Qué quieres jugar?</h1>
                  <div class="tarjetas-container">
          `;

    juegoConfig.juegos.forEach((juego) => {
      resultadoMostrar += `
                  <div class="option" data-bs-toggle="modal" data-bs-target="${juego.modalTarget}">
                      <input type="radio" name="tipoJuego" id="${juego.value}" value="${juego.value}">
                      <label class="tarjetaOpcion" for="${juego.value}">
                          <img src="${juego.src}" alt="${juego.nombre}">
                      </label>
                      <div class="romboide">
                          <h6>${juego.nombre}</h6>
                      </div>
                  </div>
              `;
    });

    resultadoMostrar += `
                  </div>
                <div id="res"></div>
              </div>
              </div>
          `;

    document.getElementById("contenido").innerHTML = resultadoMostrar;

    // Agregar el evento change para opciones de juegos
    document.querySelectorAll('input[name="tipoJuego"]').forEach((juego) => {
      juego.addEventListener("change", function () {
        let juegoSeleccionado = this.value;
        if (juegoSeleccionado === "JuegoEspacial") {
          console.log("ci");
          seleccionarTematicaCartas(); // Aquí llamamos a la función de temática
        } else if (juegoSeleccionado === "JuegoOrdenar") {
          console.log("si");
          seleccionarTematicaSecuencia();
        }
      });
    });
  
    // document.getElementById('JuegoEspacial').addEventListener('click', cargarTematicasCartas);
  }
  // Llamar a la función para cargar las temáticas de cartas

  function seleccionarTematicaCartas() {
    fetch("json/opciones.json") // Cambia el nombre del archivo según corresponda
      .then((response) => response.json())
      .then((datos) => {
        mostrarOpcionesCartas(datos.opciones);
      })
      .catch((error) =>
        console.error("Error al cargar el JSON de temáticas:", error)
      );
  }

  function mostrarOpcionesCartas(opciones) {
    document.getElementById("res").innerHTML = "";
    let resultadoTematicas = ` 
    <h1 class="textoEleccion">Selecciona la temática</h1>
             <div class="tarjetas-container">`;
    opciones.opcionesCartas.forEach((opcion) => {
      resultadoTematicas += `
                    	 <div class="option ${opcion.descripcion}">
                                <input type="radio" name="tipoJuegoEspacial" id="${opcion.id}" value="${opcion.value}">
                                <label class="tarjetaOpcion" for="${opcion.for}">
                                    <img src="${opcion.src}" alt="">
                                </label>
                                <div class="romboide">
                                    <h6>${opcion.nombre}</h6>
                                </div>
                            </div>
              `;
    });

    resultadoTematicas += `</div>  
     <img src="img/iconos/play.png" alt="" class="play zoom" id="procesarJuegoCartas">
    `;
    document.getElementById("res").innerHTML += resultadoTematicas;
    document.querySelector(".play").style.width = "20vh";
    document
      .getElementById("procesarJuegoCartas")
      .addEventListener("click", procesarEleccionCartas);
    // document.querySelector('.play').style.width = '20vh';
    // document.getElementById('procesarJuegoCartas').addEventListener('click', procesarEleccionCartas);
  }

  function seleccionarTematicaSecuencia() {
    fetch("json/opciones.json")
        .then((response) => response.json())
        .then((datos) => {
            mostrarOpcionesOrdenar(datos.opciones);
        })
        .catch((error) =>
            console.error("Error al cargar el JSON de temáticas:", error)
        );
}

function mostrarOpcionesOrdenar(opciones) {
    document.getElementById("res").innerHTML = "";
    
    let nivelTematicaHTML = `
        <h1 class="textoEleccion">${opciones.textoELeccion}</h1>
        <div class="col row">
            <div class="col">
                <h1 class="textoEleccion">${opciones.textoTematica}</h1>
                
                <!-- Primer contenedor de tarjetas -->
                <div class="tarjetas-container">`;

   
    opciones.opcionesOrdenar.grupo1.forEach((opcionOr) => {
        nivelTematicaHTML += `
                    <div class="option ${opcionOr.value}">
                        <input type="radio" name="juegoOrdenar" id="${opcionOr.id}" value="${opcionOr.value2}">
                        <label class="tarjetaOpcion" for="${opcionOr.id}">
                            <img src="${opcionOr.imgSrc}" alt="">
                        </label>
                        <div class="romboide">
                            <h6>${opcionOr.nombre}</h6>
                        </div>
                    </div>
                `;
    });

    nivelTematicaHTML += `
                </div> <!-- Cierra el primer tarjetas-container -->
                
                <!-- Segundo contenedor de tarjetas -->
                <div class="tarjetas-container">`;


    opciones.opcionesOrdenar.grupo2.forEach((opcionOr) => {
        nivelTematicaHTML += `
                    <div class="option ${opcionOr.value}">
                        <input type="radio" name="juegoOrdenar" id="${opcionOr.id}" value="${opcionOr.value2}">
                        <label class="tarjetaOpcion" for="${opcionOr.id}">
                            <img src="${opcionOr.imgSrc}" alt="">
                        </label>
                        <div class="romboide">
                            <h6>${opcionOr.nombre}</h6>
                        </div>
                    </div>
                `;
    });

    nivelTematicaHTML += `
                </div> <!-- Cierra el segundo tarjetas-container -->
            </div>
            <div class="col">
                  <h1 class="textoEleccion">Elije la dificultad</h1>
                   <div class="tarjetas-container">`;

   
    opciones.opcionesOrdenar.difcultades1.forEach((opcionOr) => {
        nivelTematicaHTML += `
                    <div class="option ${opcionOr.option}">
                        <input type="radio" name="nivel" id="${opcionOr.id}" value="${opcionOr.value}">
                        <label class="tarjetaOpcion" for="${opcionOr.for}">
                            <img src="${opcionOr.img}" alt="">
                        </label>
                        <div class="romboide">
                            <h6>${opcionOr.nombre}</h6>
                        </div>
                    </div>
                `;
    });

    nivelTematicaHTML += `
                </div> <!-- Cierra el primer tarjetas-container dificultad  -->
                  <!-- Segundo contenedor de tarjetas  dificultad -->
                <div class="tarjetas-container">`;


    opciones.opcionesOrdenar.dificultades2.forEach((opcionOr) => {
        nivelTematicaHTML += `
                     <div class="option ${opcionOr.option}">
                        <input type="radio" name="nivel" id="${opcionOr.id}" value="${opcionOr.value}">
                        <label class="tarjetaOpcion" for="${opcionOr.for}">
                            <img src="${opcionOr.img}" alt="">
                        </label>
                        <div class="romboide">
                            <h6>${opcionOr.nombre}</h6>
                        </div>
                    </div>
                `;
    });

    nivelTematicaHTML += `
                </div> <!-- Cierra el segundo tarjetas-container dificultad  -->
            </div>
        </div>
      <img src="img/iconos/play.png" alt="" class="play zoom" id="procesarJuegoSecuencia">
    `;


    
    document.getElementById("res").innerHTML = nivelTematicaHTML;
    document.querySelector(".play").style.width = "20vh";
    document
      .getElementById("procesarJuegoSecuencia")
      .addEventListener("click", procesarEleccionSecuencia);
}

// Funciones para procesar la elección final de cada juego
function procesarEleccionCartas() {
  procesarEleccionEspacial("Espacial");
}

function procesarEleccionSecuencia() {
  procesarEleccion("ordenar");
}

// Función para procesar la elección final y redirigir
function procesarEleccion(juegoSeleccionado) {
  let tematicaSeleccionada = document.querySelector(
    'input[name="juegoOrdenar"]:checked'
  );
  let nivelSeleccionado = document.querySelector(
    'input[name="nivel"]:checked'
  );

  if (!tematicaSeleccionada || !nivelSeleccionado) {
    alert("Por favor completa todas las selecciones.");
    return;
  }

  tematicaSeleccionada = tematicaSeleccionada.value;
  nivelSeleccionado = nivelSeleccionado.value;

  console.log(
    `Juego: ${juegoSeleccionado}, Temática: ${tematicaSeleccionada}, Nivel: ${nivelSeleccionado}`
  );

  // Redirigir a la página correspondiente
  window.location.href = `${juegoSeleccionado}${tematicaSeleccionada}${nivelSeleccionado}.html`;
}
function procesarEleccionEspacial(juegoSeleccionado) {
  let tematicaSeleccionada = document.querySelector(
    'input[name="tipoJuegoEspacial"]:checked'
  );

  if (!tematicaSeleccionada) {
    alert("Por favor completa todas las selecciones.");
    return;
  }

  tematicaSeleccionada = tematicaSeleccionada.value;

  console.log(
    `Juego: ${juegoSeleccionado}, Temática: ${tematicaSeleccionada}`
  );

  // Redirigir a la página correspondiente
  window.location.href = `${juegoSeleccionado}${tematicaSeleccionada}.php`;
}

const multijuga = document.getElementById('jugarMultijugador');

multijuga.addEventListener("click", ()=>{
  fetch("json/opcionMul.json")
  .then((response) => response.json())
  .then((datos) => {
    multijugador(datos.multi);
   
}) 
.catch((error) => console.error("Error al cargar el JSON:", error));
})


function multijugador(condicion) {
  let resultadoMostrar = `
          <a href="configurarJuego.php"><img src="img/iconos/atrasN.png" alt="" class="atras"></a>
          <div class="bienvenido"><img src="${condicion.logo}" alt="logoMemory" class="segundoLogo"></div>
          <h1 class="textoEleccion">${condicion.texto}</h1>
          <div class="contenedorOpciones">
              <img src="${condicion.unirse}" class="oJuegos zoom" alt="Imagen 1" id="unirseSala">
              <img src="${condicion.crear}" class="oJuegos zoom" alt="Imagen 2" id="crearSala">
          </div>
      `;

  document.getElementById("contenido").innerHTML = resultadoMostrar;
  document.getElementById("unirseSala").addEventListener("click", peticion);
  document.getElementById("crearSala").addEventListener("click", crearSala);
}
function crearSala() {
  window.location.href = `crearSala.php`;
}


function peticion(){
   fetch("json/opcionMul.json") 
      .then((response) => response.json())
      .then((datos) => {
        unirse(datos.multi);
      })
      .catch((error) =>
        console.error("Error al cargar el JSON de temáticas:", error)
      );
}

function unirse(unir) {
  let resultadoMostrar = `
          <div class="bienvenido"><img src="${unir.logo}" alt="logoMemory" class="segundoLogo"></div>
              <h1 class="textoEleccion"${unir.textoU}</h1>
          <div class="unirse">
              <div class="">
                  <input class="form-control" id="codigo" required="" type="text" />
              </div>
              <img src="${unir.imgU}" alt="" class="play zoom" id="play" width="200">
          </div>
      `;

  document.getElementById("contenido").innerHTML = resultadoMostrar;
  const logo = (document.querySelector(".segundoLogo").style.width = "15vh");
  const atras = (document.querySelector(".atras").style.width = "8vh");
}
window.addEventListener("popstate", (e) => {
  console.log("Navegación: " + history.state);
});

});
