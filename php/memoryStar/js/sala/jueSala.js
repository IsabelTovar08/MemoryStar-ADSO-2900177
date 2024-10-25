document.addEventListener("DOMContentLoaded", function () {

    function juegos (){
        fetch("json/juegos.json")
      .then((response) => response.json())
      .then((datos) => {
        mostrarJuegos(datos.configurarJuego);
      })
      .catch((error) => console.error("Error al cargar el JSON:", error));
    }


    juegos();

    function mostrarJuegos(op){
        let mostrar = `
        <h1 class="textoEleccion">¿Qué quieres jugar?</h1>
                  <div class="tarjetas-container">`;
        op.juegos.forEach(juego => {
            mostrar +=`
                
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

    mostrar += `
                  </div>
                <div id="res"></div>`;
       

                  document.getElementById("juegoSala").innerHTML = mostrar;
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
    }



    
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
  window.location.href = `juego/juegoOrdenar/${juegoSeleccionado}${tematicaSeleccionada}${nivelSeleccionado}.html`;
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
  window.location.href = `${juegoSeleccionado}${tematicaSeleccionada}.html`;
}
})