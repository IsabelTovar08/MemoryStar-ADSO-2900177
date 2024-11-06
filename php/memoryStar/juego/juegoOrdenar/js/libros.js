// Configuración de niveles
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
    incrementoPorRonda: 2,
    tiempoVisualizacion: 5000,
    tiempoRonda: 15,
  },
};

const contenedorLibros = document.querySelector("#lista");
const libros = document.getElementById("lista");
const botonVerificar = document.getElementById("verificarBtn");
const resultado = document.getElementById("resultado");

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

  ordenActualConComillas.forEach((id, index) => {
    if (id === ordenCorrecto[index]) {
      aciertosRonda = aciertosRonda + 100;
    }
  });

  puntajeTotal += aciertosRonda;

  // Guardar el tiempo de la ronda actual
  tiemposPorRonda.push(contador);

  document.getElementById("tiempo1").innerHTML = `${contador}s`;
  document.getElementById("puntosSecu1").innerHTML = aciertosRonda;
  document.getElementById("puntosSecu2").innerHTML = puntajeTotal;

  if (
    contador <= configuracionNivel.tiempoRonda / 2 &&
    aciertosRonda === ordenCorrecto.length * 100
  ) {
    let rubis = window.location.pathname.includes("Dificil")
      ? 15
      : window.location.pathname.includes("Medio")
      ? 10
      : 5;
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
  new bootstrap.Modal(modalFinal).show();
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
