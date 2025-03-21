// configuracion por nivel
const DIFFICULTY_CONFIGS = {
  facil: {
    objetosIniciales: 4,
    incrementoPorRonda: 1,
    tiempoVisualizacion: 5000,
    tiempoRonda: 30,
  },
  medio: {
    objetosIniciales: 5,
    incrementoPorRonda: 1,
    tiempoVisualizacion: 5000,
    tiempoRonda: 30,
  },
  dificil: {
    objetosIniciales: 6,
    incrementoPorRonda: 1,
    tiempoVisualizacion: 5000,
    tiempoRonda: 30,
  },
};

// obtener dificultad
function getCurrentDifficulty() {
  const pathname = window.location.pathname;
  if (pathname.includes("MemorixMagicRoombasico")) return "facil";
  if (pathname.includes("MemorixMagicRoomDesafiante")) return "medio";
  if (pathname.includes("MemorixMagicRoomPro")) return "dificil";
  return "facil";
}

// aplicar dificultad
function getGameConfig() {
  const difficulty = getCurrentDifficulty();
  return DIFFICULTY_CONFIGS[difficulty];
}

let rondaActual = 1;
let puntajeTotal = 0;
let totalRubis = 0;
let tiemposPorRonda = [];
let botonPresionado = false;
let intervaloBarra;
let intervaloTemp;
let contador = -2;
let tiempoRestante;
let idDropzone = [];
const audioVictory = new Audio("../../sonidos/juego/victoria1.mp3");
let GAME_CONFIG;

// numero de objetos por ronda
function getObjetosParaRonda() {
  return (
    GAME_CONFIG.objetosIniciales +
    (rondaActual - 1) * GAME_CONFIG.incrementoPorRonda
  );
}

// crear dropzone
function createDropzones() {
  const cantidadObjetos = getObjetosParaRonda();
  const listaDrop = document.getElementById("listaDrop");
  listaDrop.innerHTML = ""; // Clear existing dropzones
  idDropzone = [];

  for (let i = 1; i <= cantidadObjetos; i++) {
    const dropzone = document.createElement("div");
    dropzone.className = "dropzone";
    dropzone.classList.add(`posicion${i}`);
    listaDrop.appendChild(dropzone);
  }

  // id ramdom
  const dropzoneElements = document.querySelectorAll(".dropzone");
  const numeros = Array.from(
    { length: cantidadObjetos },
    (_, index) => index + 1
  );
  const numerosBarajados = shuffleArray([...numeros]);

  dropzoneElements.forEach((dropzone, index) => {
    const nuevoId = `drop-objeto${numerosBarajados[index]}`;
    idDropzone.push(nuevoId);
    dropzone.id = nuevoId;
  });
}

// objetos
function createObjects() {
  const cantidadObjetos = getObjetosParaRonda();
  const listaObjeto = document.getElementById("listaObjeto");
  listaObjeto.innerHTML = ""; // Clear existing objects

  for (let i = 1; i <= cantidadObjetos; i++) {
    const objeto = document.createElement("img");
    objeto.src = `img/hab/objeto${i}.png`;
    objeto.id = `objeto${i}`;
    objeto.className = "objetos arrastrable";
    listaObjeto.appendChild(objeto);
  }
}

// meszclar
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// drag
function initializeDragDrop() {
  interact(".arrastrable").draggable({
    listeners: {
      start(event) {
        event.target.classList.add("drag");
      },
      move(event) {
        const { target } = event;
        const x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
        const y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

        target.style.transform = `translate(${x}px, ${y}px)`;
        target.setAttribute("data-x", x);
        target.setAttribute("data-y", y);
      },
      end(event) {
        event.target.classList.remove("drag");
      },
    },
  });

  interact(".dropzone").dropzone({
    accept: ".arrastrable",
    overlap: 0.4,
    ondropactivate: function (event) {
      event.target.classList.add("dropzone-active");
    },
    ondragenter: function (event) {
      event.target.classList.add("dropzone-highlight");
      event.relatedTarget.classList.add("can-drop");
    },
    ondragleave: function (event) {
      event.target.classList.remove("dropzone-highlight");
      event.relatedTarget.classList.remove("can-drop");
    },
    ondrop: function (event) {
      event.relatedTarget.setAttribute("data-dropped", event.target.id);
    },
    ondropdeactivate: function (event) {
      event.target.classList.remove("dropzone-active", "dropzone-highlight");
    },
  });
}

// tiempos
function iniciarTemp() {
  contador = -5;
  limpiarIntervalos();

  intervaloTemp = setInterval(function () {
    contador++;
    if (contador >= 0) {
      document.getElementById("verificarBtn").disabled = false;

      // Formatear contador a mm:ss
      const minutos = Math.floor(contador / 60);
      const segundos = contador % 60;
      const formatoTiempo = `${minutos < 10 ? '0' : ''}${minutos}:${segundos < 10 ? '0' : ''}${segundos}`;

      document.getElementById("temp").innerHTML = `${formatoTiempo}`;
      
      if (!intervaloBarra) {
        iniciarBarra();
      }
    } else {
      document.getElementById("verificarBtn").disabled = true;
    }
  }, 1000);
}


function iniciarBarra() {
  const barraRegresiva = document.getElementById("countdown-bar");
  const textoRegresivo = document.getElementById("countdown-text");

  tiempoRestante = GAME_CONFIG.tiempoRonda;
  barraRegresiva.style.width = "100%";
  textoRegresivo.textContent = tiempoRestante;

  if (intervaloBarra) {
    clearInterval(intervaloBarra);
  }

  intervaloBarra = setInterval(() => {
    tiempoRestante--;
    textoRegresivo.textContent = tiempoRestante;
    barraRegresiva.style.width =
      (tiempoRestante / GAME_CONFIG.tiempoRonda) * 100 + "%";

    if (tiempoRestante <= 0) {
      clearInterval(intervaloBarra);
      intervaloBarra = null;
      textoRegresivo.textContent = "¡Tiempo!";
      barraRegresiva.style.width = "0%";
      if (!botonPresionado) {
        finalizarRonda();
      }
    }
  }, 1000);
}

// verificar
function verificarPosicion() {
  const objetos = document.querySelectorAll(".arrastrable");
  let aciertos = 0;
  botonPresionado = true;
  let aciertos2 = 0;
  let desaciertos = 0;

  // Detener los temporizadores inmediatamente
  limpiarIntervalos();

  objetos.forEach((objeto, index) => {
    const dropzoneEsperada = `drop-objeto${index + 1}`;
    const dropzoneActual = objeto.getAttribute("data-dropped");

    if (dropzoneActual === dropzoneEsperada) {
      aciertos += 100;
    } else {
      desaciertos += 1;
    }
  });

  puntajeTotal += aciertos;
  tiemposPorRonda.push(contador);

  mostrarResultadosRonda(aciertos, desaciertos);
}

function finalizarRonda() {
  botonPresionado = true;
  
  limpiarIntervalos();
  verificarPosicion();
}

// mostrar rexultados
function mostrarResultadosRonda(aciertos, desaciertos) {
  // Asegurarnos que los temporizadores estén detenidos
  limpiarIntervalos();
  
  const objetosTotales = getObjetosParaRonda();
  const puntajePerfecto = objetosTotales * 100;
  
  let rubis = 0;

  document.getElementById("puntosSecu1").innerHTML = `${aciertos}pts`;
  document.getElementById("puntosSecu2").innerHTML = `${puntajeTotal}pts`;
  document.getElementById("tiempo1").innerHTML = `00:${contador<10?'0':''}${contador}`;
  document.getElementById("aciertos").innerHTML = `Aciertos:${aciertos / 100}`;
  document.getElementById("desaciertos").innerHTML = `Fallos:${desaciertos}`;
  document.getElementById("nRonda").innerHTML= `PUNTUACION RONDA ${rondaActual}`;

  if (aciertos === puntajePerfecto) {
    rubis = 5;
  }
  document.getElementById("rubis").innerHTML = `+${rubis}`;
  totalRubis += rubis;

  const modal = new bootstrap.Modal(
    document.getElementById("tablapuntuacionsolo")
  );
  modal.show();

  document.getElementById("tablapuntuacionsolo").addEventListener(
    "hidden.bs.modal",
    () => {
      if (rondaActual < 3) {
        rondaActual++;
        iniciarNuevaRonda();
      } else {
        mostrarResultadosFinales();
      }
    },
    { once: true }
  );
}

// limpiar tiempos
function limpiarIntervalos() {
  if (intervaloBarra) {
    clearInterval(intervaloBarra);
    intervaloBarra = null;
  }
  if (intervaloTemp) {
    clearInterval(intervaloTemp);
    intervaloTemp = null;
  }
}

//pista
function mostrarObjetosEnDropzones() {
  const objetos = document.querySelectorAll(".arrastrable");

  objetos.forEach((objeto, index) => {
    const dropzone = document.getElementById(`drop-objeto${index + 1}`);
    const dropzoneRect = dropzone.getBoundingClientRect();

    objeto.style.transform = `translate(${
      dropzoneRect.left - objeto.offsetLeft
    }px, ${dropzoneRect.top - objeto.offsetTop}px)`;
  });

  setTimeout(() => {
    objetos.forEach((objeto) => {
      objeto.style.transform = "translate(0px, 0px)";
      objeto.setAttribute("data-x", "0");
      objeto.setAttribute("data-y", "0");
    });
  }, GAME_CONFIG.tiempoVisualizacion);
}

// nueva ronda
function iniciarNuevaRonda() {
  limpiarIntervalos();
  botonPresionado = false;

  createDropzones();
  createObjects();
  initializeDragDrop();

  // titulo
  document.querySelector(
    ".textoArrastrar"
  ).textContent = `Ronda ${rondaActual} de 3 - Pon los objetos en su lugar (${getObjetosParaRonda()} objetos)`;

  iniciarTemp();
  mostrarObjetosEnDropzones();
}

// resultadp final
function mostrarResultadosFinales() {
  limpiarIntervalos();
  
  const tiempoPromedio = (
    tiemposPorRonda.reduce((a, b) => a + b, 0) / tiemposPorRonda.length
  ).toFixed(1);

  const modalFinal = document.createElement("div");
  modalFinal.className = "modal fade";
  modalFinal.id = "modalFinal";
  modalFinal.setAttribute("tabindex", "-1");
  modalFinal.setAttribute("aria-labelledby", "modalFinalLabel");
  modalFinal.setAttribute("aria-hidden", "true");
  modalFinal.setAttribute("data-bs-backdrop", "static");
  modalFinal.setAttribute("data-bs-keyboard", "false");

  modalFinal.className = "modal fade";
  modalFinal.id = "modalFinal";
  modalFinal.setAttribute("tabindex", "-1");
  modalFinal.setAttribute("aria-labelledby", "modalFinalLabel");
  modalFinal.setAttribute("aria-hidden", "true");
  modalFinal.setAttribute("data-bs-backdrop", "static");
  modalFinal.setAttribute("data-bs-keyboard", "false");

  modalFinal.innerHTML = `
      <div class="modal-dialog modal-sm modal-dialog-centered">
          <div class="modal-content contenedorTsolo">
              <div class="tituloTsolo">¡Juego Completado!</div>
              <div class="contenedorTsoloInterior">
              <div class="contenedor-estrellas">
                            <img src="../../modales/modales/img/tablas/Star.png" class="star" alt="">
                            <img src="../../modales/modales/img/tablas/Star.png" class="star" alt="">
                            <img src="../../modales/modales/img/tablas/Star.png" class="star" alt="">
                        </div>
                  <div class="puntaje-total">
                      ${puntajeTotal}
                  </div>
  
                  <div class="contenedor-puntaje">
                      Tiempo Promedio:
                      00:${tiempoPromedio<10?'0':''}${tiempoPromedio}
                  </div>
                  <div class="contenedor-rubi">
                            <div>${totalRubis}</div>
                            <img src="../../modales/modales/img/tablas/rubipuntaje.png"
                                style="width: 4vh; height: auto;">
                  </div>
  
                  <div class="col-12 row contenedor-info">
                      <div class="col-6 usuarioPerfill">
                          <img src="../../modales/modales/img/tablas/fotouser.png" alt="" style="width: 16px;">
                          
                      </div>
                      <div class="col-3">00:${tiempoPromedio<10?'0':''}${tiempoPromedio}</div>
                      <div class="col-3">${puntajeTotal}pts</div>
                  </div>
              </div>
  
              <div class="contenedor-botonTsolo">
                  <button class="botonTsolo" onclick="jugarNuevo()">
                      Jugar de Nuevo
                  </button>
                  <button class="botonTsolo" onclick="redirigir()">
                      Salir
                  </button>
              </div>
          </div>
      </div>
  `;

  document.body.appendChild(modalFinal);
  new bootstrap.Modal(modalFinal).show();
  // Intentar reproducir el sonido
  audioVictory.play().catch((error) => {
    console.error("Error al reproducir audio:", error);
  });
  

  enviarPuntuacion(puntajeTotal, tiempoPromedio, totalRubis);
  obtenerDatosUsuario();
}
function redirigir(){
  setTimeout(() => {
    window.location.href=("../../index.html")
  }, 2000);
}
function jugarNuevo(){
  setTimeout(() => {
    location.reload();
  }, 2000);
}

async function obtenerDatosUsuario() {
  const rutas = [
    "procesos/login/obtenerUsuario.php",
    "../procesos/login/obtenerUsuario.php",
    "../../procesos/login/obtenerUsuario.php",
    "../../../procesos/login/obtenerUsuario.php",
    // Añade más rutas si es necesario
  ];

  let datosUsuario = null;

  for (let ruta of rutas) {
    try {
      const response = await fetch(ruta);
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          datosUsuario = data;
          break; // Salir del bucle si la solicitud fue exitosa
        }
      }
    } catch (error) {
      console.error(
        `Error al obtener los datos del usuario desde ${ruta}:`,
        error
      );
    }
  }

  if (datosUsuario) {
    const nombreUsuarioElement = document.querySelectorAll(".usuarioPerfill");
    nombreUsuarioElement.forEach((elemento) => {
      elemento.innerHTML = datosUsuario.usuario;
    });
  } else {
    window.location.href = "antesLogin.html";
  }
}

function enviarPuntuacion(puntajeTotal, tiempoPromedio, totalRubis) {
  const arrPuntos = {
      puntajeTotal: puntajeTotal,
      tiempoPromedio: tiempoPromedio,
      totalRubis: totalRubis,
  };

  console.log('Enviando datos:', arrPuntos);

  fetch("../../procesos/puntuacion/recibirPuntuacion.php", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(arrPuntos), 
  })
  .then(response => {
      if (!response.ok) {
          return response.json().then(err => Promise.reject(err));
      }
      return response.json();
  })
  .then(data => {
      console.log('Respuesta recibida:', data);
      if (data.success) {
          console.log('Datos procesados correctamente:', data.datos);
          // Aquí puedes hacer algo con la respuesta exitosa
      } else {
          alert(data.mensaje || 'Error al procesar los datos');
      }
  })
  .catch(error => {
      console.error("Error:", error);
      alert("Ocurrió un error al enviar la puntuación: " + 
            (error.mensaje || error.message || 'Error desconocido'));
  });
}
// reiniciar juego
window.addEventListener("DOMContentLoaded", function () {
  GAME_CONFIG = getGameConfig();
  document
    .getElementById("verificarBtn")
    .addEventListener("click", verificarPosicion);
  document.getElementById("verificarBtn").disabled = true;

  iniciarNuevaRonda();
});
// window.addEventListener('beforeunload', (event) => {
//   event.preventDefault();
//   event.returnValue = 'Tus cambios no se han guardado. ¿Estás seguro de que deseas salir?';

//   // Añade un breve retraso para la redirección en caso de que el usuario confirme salir
//   setTimeout(() => {
//     window.location.href = '../../index.html';
//   }, 100);
// });

// function toggleFullScreen() {
//   if (!document.fullscreenElement) {
//     // Si no está en pantalla completa, solicitar entrar a pantalla completa
//     document.documentElement.requestFullscreen().catch((err) => {
//       console.log(`Error al intentar entrar en pantalla completa: ${err.message}`);
//     });
//   } else {
//     // Si está en pantalla completa, salir de ella
//     document.exitFullscreen();
//   }
// }
const userPuntos = document.querySelectorAll(".userPunto");

// Aplicar clases dinámicamente para podio
if (userPuntos[0]) userPuntos[0].classList.add("ganador"); // Primer lugar
if (userPuntos[1]) userPuntos[1].classList.add("segundo"); // Segundo lugar
if (userPuntos[2]) userPuntos[2].classList.add("tercero"); // Tercer lugar

const fotor = document.querySelectorAll(".foto-user");

// Aplicar clases dinámicamente para podio
if (fotor[0]) fotor[0].classList.add("ganador1"); // Primer lugar
if (fotor[1]) fotor[1].classList.add("segundo1"); // Segundo lugar
if (fotor[2]) fotor[2].classList.add("tercero1"); // Tercer lugar

const btnSalir = document.getElementById("salir");
btnSalir.addEventListener('click',function(){
  Swal.fire({
    text: `¿Estás seguro de que deseas salir del juego?`,
    icon: 'warning', // Tipo de icono: advertencia
    background: '#1a1a2e', // Fondo oscuro acorde al diseño dinámico
    color: '#00d0ff', // Texto llamativo
    confirmButtonColor: '#0f3460', // Botón "Aceptar" azul oscuro
    cancelButtonColor: '#16213e', // Botón "Cancelar" azul tenue
    showCancelButton: true, // Muestra el botón de cancelar
    confirmButtonText: 'Sí, salir', // Texto para el botón de confirmar
    cancelButtonText: 'Cancelar', // Texto para el botón de cancelar
    width: 350,
    customClass: {
        popup: 'memorystar-popup',
        title: 'memorystar-title',
        content: 'memorystar-content',
    }
  }).then((result) => {
    if (result.isConfirmed) {
        salirr(); // Llama a la función si el usuario confirma
    }
  });
})

function salirr(){
  window.location.href="../../index.html";
}