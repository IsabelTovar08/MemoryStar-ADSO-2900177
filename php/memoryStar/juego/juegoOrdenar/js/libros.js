// import { obtenerDatosUsuario } from '../../../js/session.js';// Configuración de niveles

const NIVELES = {
  "MemorixBookifybasico.html": {
    librosIniciales: 4,
    incrementoPorRonda: 1,
    tiempoVisualizacion: 5000,
    tiempoRonda: 15,
  },
  "MemorixBookifyDesafiante.html": {
    librosIniciales: 5,
    incrementoPorRonda: 1,
    tiempoVisualizacion: 5000,
    tiempoRonda: 15,
  },
  "MemorixBookifyPro.html": {
    librosIniciales: 6,
    incrementoPorRonda: 1,
    tiempoVisualizacion: 5000,
    tiempoRonda: 15,
  },
};

const contenedorLibros = document.querySelector("#lista");
const libros = document.getElementById("lista");
const botonVerificar = document.getElementById("verificarBtn");
const resultado = document.getElementById("resultado");
const audioVictory = new Audio("../../sonidos/juego/victoria1.mp3");

// libros total
const todosLosLibros = [
  { src: "img/librito1.png", dataId: "1" },
  { src: "img/librito2.png", dataId: "2" },
  { src: "img/librito3.png", dataId: "3" },
  { src: "img/librito4.png", dataId: "4" },
  { src: "img/librito5.png", dataId: "5" },
  { src: "img/librito6.png", dataId: "6" },
  { src: "img/librito7.png", dataId: "7" },
  { src: "img/librito8.png", dataId: "8" },
  { src: "img/librito9.png", dataId: "9" },
];

// Variables globales para el control de rondas
let rondaActual = 1;
let puntajeTotal = 0;
let totalRubis = 0;
let sortable;
let ordenCorrecto;
let intervaloBarra = null;
let intervaloTemp = null;
let idsLibros = [];
let contador = -5;
let botonPresionado = false;
let tiempoRestante;
let configuracionNivel;
let tiemposPorRonda = [];

// Función para detectar el nivel actual
function detectarNivel() {
  const rutaCompleta = window.location.pathname;
  const nombreArchivo = rutaCompleta.split("/").pop();
  console.log("Página actual:", nombreArchivo);

  configuracionNivel =
    NIVELES[nombreArchivo] || NIVELES["ordenarBibliotecaFacil.html"];
  tiempoRestante = configuracionNivel.tiempoRonda;

  //   const tituloNivel =
  //     document.querySelector("h1") || document.createElement("h1");
  //   tituloNivel.textContent = nombreArchivo.includes("Facil")
  //     ? "Nivel Fácil"
  //     : nombreArchivo.includes("Medio")
  //     ? "Nivel Medio"
  //     : "Nivel Difícil";

  return configuracionNivel;
}

// Función para obtener la cantidad de libros para la ronda actual
function obtenerCantidadLibros() {
  return (
    configuracionNivel.librosIniciales +
    (rondaActual - 1) * configuracionNivel.incrementoPorRonda
  );
}

// Función para obtener los libros para la ronda actual
function obtenerLibrosParaRonda() {
  const cantidadLibros = obtenerCantidadLibros();
  return todosLosLibros.slice(0, cantidadLibros);
}

// Función para mezclar arreglo
function mezclarArreglo(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Función para mostrar libros en orden
function mostrarLibrosEnOrden(orden) {
  libros.innerHTML = "";
  orden.forEach((id) => {
    let img = document.createElement("img");
    let idSinComillas = id.replace(/'/g, "");
    img.setAttribute("src", `img/librito${idSinComillas}.png`);
    img.setAttribute("data-id", idSinComillas);
    img.classList.add("libro", "inicio");
    libros.appendChild(img);
  });
}

// Funciones de Drag and Drop
function deshabilitarDrag() {
  if (sortable) {
    sortable.destroy();
  }
  sortable = Sortable.create(libros, {
    animation: 250,
    chosenClass: "seleccionado",
    dragClass: "drag",
    group: "lista-libros",
    sort: false,
  });
}

function habilitarDrag() {
  if (sortable) {
    sortable.destroy();
  }
  sortable = Sortable.create(libros, {
    animation: 250,
    chosenClass: "seleccionado",
    dragClass: "drag",
    group: "lista-libros",
    sort: true,
    store: {
      set: (sortable) => {
        let ordenActual = sortable.toArray();
        console.log("Orden actual:", ordenActual);
      },
    },
    onStart: () => {
      document.querySelectorAll(".libro").forEach((libro) => {
        libro.classList.remove("inicio");
      });
    },
  });
}

// Función para iniciar una nueva ronda
function iniciarRonda() {
  limpiarIntervalos();
  botonPresionado = false;

  const librosRonda = obtenerLibrosParaRonda();

  contenedorLibros.innerHTML = "";
  idsLibros = [];

  librosRonda.forEach((libro) => {
    const imgLibro = document.createElement("img");
    imgLibro.src = libro.src;
    imgLibro.alt = "";
    imgLibro.classList.add("libro");
    imgLibro.setAttribute("data-id", libro.dataId);
    contenedorLibros.appendChild(imgLibro);
    idsLibros.push(`'${libro.dataId}'`);
  });

  ordenCorrecto = mezclarArreglo([...idsLibros]);

  mostrarLibrosEnOrden(ordenCorrecto);

  reiniciarTemporizadores();

  document.getElementById(
    "ronda-actual"
  ).textContent = `Ronda ${rondaActual} de 3`;
}

// Sistema de temporizador y barra de progreso
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
      const formatoTiempo = `${minutos < 10 ? "0" : ""}${minutos}:${
        segundos < 10 ? "0" : ""
      }${segundos}`;

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

  tiempoRestante = configuracionNivel.tiempoRonda;
  barraRegresiva.style.width = "100%";
  textoRegresivo.textContent = tiempoRestante;

  if (intervaloBarra) {
    clearInterval(intervaloBarra);
  }

  intervaloBarra = setInterval(() => {
    tiempoRestante--;
    textoRegresivo.textContent = tiempoRestante;
    barraRegresiva.style.width =
      (tiempoRestante / configuracionNivel.tiempoRonda) * 100 + "%";

    if (tiempoRestante <= 0) {
      clearInterval(intervaloBarra);
      intervaloBarra = null;
      textoRegresivo.textContent = "¡Tiempo!";
      barraRegresiva.style.width = "0%";
      if (!botonPresionado) {
        finalizarRonda(); // Nueva función para manejar el fin de ronda
      }
    }
  }, 1000);
}

// funcion para finaliar la ronda
function finalizarRonda() {
  botonPresionado = true;
  limpiarIntervalos();

  let ordenActual = Sortable.get(libros).toArray();
  let ordenActualConComillas = ordenActual.map((id) => `'${id}'`);
  let aciertosRonda = 0;
  let desaciertos = 0;
  let rubis = 0;

  ordenActualConComillas.forEach((id, index) => {
    if (id === ordenCorrecto[index]) {
      aciertosRonda = aciertosRonda + 100;
      // ordenActualConComillas.classList.add="bien"
      // ordenActualConComillas.classList.remove="mal"
    } else {
      desaciertos = desaciertos + 1;
      // ordenActualConComillas.classList.remove="bien"
      // ordenActualConComillas.classList.add="mal"
    }
  });

  puntajeTotal += aciertosRonda;

  // Guardar el tiempo de la ronda actual
  tiemposPorRonda.push(contador);

  document.getElementById("tiempo1").innerHTML = `00:${
    contador < 10 ? "0" : ""
  }${contador}`;
  document.getElementById("puntosSecu1").innerHTML = `${aciertosRonda}pts`;
  document.getElementById("puntosSecu2").innerHTML = `${puntajeTotal}pts`;
  document.getElementById("aciertos").innerHTML = `Aciertos:${
    aciertosRonda / 100
  }`;
  document.getElementById("desaciertos").innerHTML = `Fallos:${desaciertos}`;

  if (aciertosRonda === ordenCorrecto.length * 100) {
    rubis = window.location.pathname.includes("Dificil")
      ? 15
      : window.location.pathname.includes("Medio")
      ? 10
      : 5;
  }
  totalRubis += rubis;
  document.getElementById("rubis").innerHTML = `+${rubis}`;

  document.getElementById(
    "nRonda"
  ).innerHTML = `PUNTUACION RONDA ${rondaActual}`;

  const modal = new bootstrap.Modal(
    document.getElementById("tablapuntuacionsolo")
  );
  modal.show();

  document.getElementById("tablapuntuacionsolo").addEventListener(
    "hidden.bs.modal",
    () => {
      if (rondaActual < 3) {
        rondaActual++;
        iniciarRonda();
      } else {
        mostrarResultadosFinales();
      }
    },
    { once: true }
  );
}

// Función para limpiar intervalos
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

// Función para reiniciar temporizadores
function reiniciarTemporizadores() {
  limpiarIntervalos();

  tiempoRestante = configuracionNivel.tiempoRonda;
  contador = -5;
  botonPresionado = false;

  const barraRegresiva = document.getElementById("countdown-bar");
  const textoRegresivo = document.getElementById("countdown-text");
  barraRegresiva.style.width = "100%";
  textoRegresivo.textContent = configuracionNivel.tiempoRonda;

  deshabilitarDrag();
  iniciarTemp();

  if (window.dragTimeout) {
    clearTimeout(window.dragTimeout);
  }

  window.dragTimeout = setTimeout(() => {
    document.querySelectorAll(".libro").forEach((libro) => {
      libro.classList.remove("inicial");
    });
    let ordenMezclado = mezclarArreglo([...idsLibros]);
    mostrarLibrosEnOrden(ordenMezclado);
    habilitarDrag();
  }, configuracionNivel.tiempoVisualizacion);
}

// Función para calcular el tiempo promedio
function calcularTiempoPromedio() {
  const suma = tiemposPorRonda.reduce((a, b) => a + b, 0);
  return (suma / tiemposPorRonda.length).toFixed(1);
}

// Event Listener para el botón verificar
botonVerificar.addEventListener("click", () => {
  finalizarRonda();
});

// Función para mostrar resultados finales
function mostrarResultadosFinales() {
  const tiempoPromedio = calcularTiempoPromedio();
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
                  <div class="puntaje-total">${puntajeTotal}</div>
                  <div class="contenedor-puntaje">
                      Tiempo Promedio: 00:${tiempoPromedio < 10 ? "0" : ""}${tiempoPromedio}
                  </div>
                  <div class="contenedor-rubi">
                      <div>${totalRubis}</div>
                      <img src="../../modales/modales/img/tablas/rubipuntaje.png" style="width: 4vh; height: auto;">
                  </div>
<<<<<<< HEAD
  
                  <div class="col-12 row contenedor-info">
                      <div class="col-6 usuarioPerfill">
                          <img src="../../modales/modales/img/tablas/fotouser.png" alt="" style="width: 16px;">
                          
                      </div>
                      <div class="col-3">00:${
                        tiempoPromedio < 10 ? "0" : ""
                      }${tiempoPromedio}</div>
=======
                  <div class="col-12 row contenedor-info">
                      <div class="col-6 usuarioPerfill">
                          <img src="../../modales/modales/img/tablas/fotouser.png" alt="" style="width: 16px;">
                      </div>
                      <div class="col-3">00:${tiempoPromedio < 10 ? "0" : ""}${tiempoPromedio}</div>
>>>>>>> 1256259451bc41943ab78cad5ed8ec217b8fe35b
                      <div class="col-3">${puntajeTotal}pts</div>
                  </div>
              </div>
              <div class="contenedor-botonTsolo">
<<<<<<< HEAD
                  <button class="botonTsolo" onclick="redirigir()">
                      Salir
                  </button>
=======
                  <button class="botonTsolo" onclick="redirigir()">Salir</button>
>>>>>>> 1256259451bc41943ab78cad5ed8ec217b8fe35b
              </div>
          </div>
      </div>
  `;

  document.body.appendChild(modalFinal);

  const bootstrapModal = new bootstrap.Modal(modalFinal);
  bootstrapModal.show();

  // Intentar reproducir el sonido
  audioVictory.play().catch((error) => {
    console.error("Error al reproducir audio:", error);
  });

  enviarPuntuacion(puntajeTotal, tiempoPromedio, totalRubis);
  obtenerDatosUsuario();
}

function redirigir() {
  setTimeout(() => {
    window.location.href = "../../index.html";
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
  }
}

function enviarPuntuacion(puntajeTotal, tiempoPromedio, totalRubis) {
  const arrPuntos = {
    puntajeTotal: puntajeTotal,
    tiempoPromedio: tiempoPromedio,
    totalRubis: totalRubis,
  };

  console.log("Enviando datos:", arrPuntos);

  fetch("../../procesos/puntuacion/recibirPuntuacion.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(arrPuntos),
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((err) => Promise.reject(err));
      }
      return response.json();
    })
    .then((data) => {
      console.log("Respuesta recibida:", data);
      if (data.success) {
        console.log("Datos procesados correctamente:", data.datos);
        // Aquí puedes hacer algo con la respuesta exitosa
      } else {
        alert(data.mensaje || "Error al procesar los datos");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert(
        "Ocurrió un error al enviar la puntuación: " +
          (error.mensaje || error.message || "Error desconocido")
      );
    });
}

// Función para reiniciar el juego
function salir() {}

// Inicialización del juego
window.addEventListener("DOMContentLoaded", () => {
  detectarNivel();

  const rondaDisplay = document.createElement("div");
  rondaDisplay.id = "ronda-actual";
  rondaDisplay.className = "text-center mb-3";
  document
    .querySelector("#lista")
    .parentNode.insertBefore(rondaDisplay, document.querySelector("#lista"));

  iniciarRonda();
});
