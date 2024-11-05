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

// seleccionar dificaultad
function getCurrentDifficulty() {
  const pathname = window.location.pathname;
  if (pathname.includes("MemorixQuimilabbasico")) return "facil";
  if (pathname.includes("MemorixQuimilabDesafiante")) return "medio";
  if (pathname.includes("MemorixQuimilabPro")) return "dificil";
  return "facil"; // Default to easy if not found
}

// aplicar dificultad
function getGameConfig() {
  const difficulty = getCurrentDifficulty();
  return DIFFICULTY_CONFIGS[difficulty];
}

let rondaActual = 1;
let puntajeTotal = 0;
let tiemposPorRonda = [];
let botonPresionado = false;
let intervaloBarra;
let intervaloTemp;
let contador = -5;
let tiempoRestante;
let idDropzone = [];
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
    objeto.src = `img/lab/objeto${i}.png`;
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
      document.getElementById("temp").innerHTML = `TIEMPO: ${contador}s`;
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

  objetos.forEach((objeto, index) => {
    const dropzoneEsperada = `drop-objeto${index + 1}`;
    const dropzoneActual = objeto.getAttribute("data-dropped");

    if (dropzoneActual === dropzoneEsperada) {
      aciertos += 100;
    }
  });

  puntajeTotal += aciertos;
  tiemposPorRonda.push(contador);

  mostrarResultadosRonda(aciertos);
}

function finalizarRonda() {
  botonPresionado = true;
  verificarPosicion();
}

// mostrar rexultados
function mostrarResultadosRonda(aciertos) {
  const objetosTotales = getObjetosParaRonda();
  const puntajePerfecto = objetosTotales * 100;

  document.getElementById("puntosSecu1").innerHTML = aciertos;
  document.getElementById("puntosSecu2").innerHTML = puntajeTotal;
  document.getElementById("tiempo1").innerHTML = `${contador}s`;

  if (contador <= 5 && aciertos === puntajePerfecto) {
    let rubis = 5;
    document.getElementById("rubis").innerHTML = `+${rubis}`;
  }

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
                      ${tiempoPromedio}s
                  </div>
  
                  <div class="col-12 row contenedor-info">
                      <div class="col-6">
                          <img src="../../modales/modales/img/tablas/fotouser.png" alt="" style="width: 16px;">
                          Usuario
                      </div>
                      <div class="col-3">${tiempoPromedio}s</div>
                      <div class="col-3">${puntajeTotal}pts</div>
                  </div>
              </div>
  
              <div class="contenedor-botonTsolo">
                  <button class="botonTsolo" onclick="salir()" style="margin-left: 20px;">
                      Salir
                  </button>
              </div>
          </div>
      </div>
  `;

  document.body.appendChild(modalFinal);
  new bootstrap.Modal(modalFinal, { backdrop: "static" }).show();
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
