let ordenVerificar;

const urlParams = new URLSearchParams(window.location.search);
const modoJuego = urlParams.get('modo') || 'un_jugador';
const codigo = urlParams.get('codigo');
let ws;
let gameData = null;
let usuarioEsAdmin = false;
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
const aceptar = document.querySelector('.botonTsolo');
const contenedorUsers = document.getElementById('contedor_users');



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
  if (orden) {
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
  iniciar();
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


  const usuarioEsAdmin = JSON.parse(localStorage.getItem('usuarioEsAdmin'));
  if (usuarioEsAdmin) {
    ordenCorrecto = mezclarArreglo([...idsLibros]);

    sessionStorage.setItem('ordenCorrectoAdmin', JSON.stringify(ordenCorrecto));
    console.log(ordenCorrecto)
    console.log("u")
    // enviarOrdenCorrecto();

  } else {
    ordenCorrecto = JSON.parse(sessionStorage.getItem('ordenCorrectoAdmin'));
    console.log(ordenVerificar)

  }
  // ordenCorrecto =  JSON.parse(sessionStorage.getItem('ordenCorrecto'));
  console.log(ordenCorrecto)
  // sessionStorage.removeItem('ordenCorrecto');
  // iniciar()



  // mostrarLibrosEnOrden(ordenCorrecto);

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
      const formatoTiempo = `${minutos < 10 ? "0" : ""}${minutos}:${segundos < 10 ? "0" : ""
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
        finalizarRonda(ordenVerificar); // Nueva función para manejar el fin de ronda
      }
    }
  }, 1000);
}

// funcion para finaliar la ronda
function finalizarRonda(ordenVerificar) {
  ws.send(JSON.stringify({
    type: 'ordenEnviado',
    codigoSala: gameData.gameData.codigoSala,
    usuario: JSON.parse(localStorage.getItem('id_usuario'))
  }));
  botonPresionado = true;
  limpiarIntervalos();

  let ordenActual = Sortable.get(libros).toArray();
  let ordenActualConComillas = ordenActual.map((id) => `'${id}'`);
  let aciertosRonda = 0;
  let desaciertos = 0;
  let rubis = 0;

  ordenActualConComillas.forEach((id, index) => {

    if (id === ordenVerificar[index]) {
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

  document.getElementById("tiempo1").innerHTML = `00:${contador < 10 ? "0" : ""
    }${contador}`;
  document.getElementById("puntosSecu1").innerHTML = `${aciertosRonda}pts`;
  document.getElementById("puntosSecu2").innerHTML = `${puntajeTotal}pts`;
  document.getElementById("aciertos").innerHTML = `Aciertos:${aciertosRonda / 100
    }`;
  document.getElementById("desaciertos").innerHTML = `Fallos:${desaciertos}`;

  if (aciertosRonda === ordenVerificar.length * 100) {
    rubis = window.location.pathname.includes("Dificil")
      ? 15
      : window.location.pathname.includes("Medio")
        ? 10
        : 5;
  }
  totalRubis += rubis;
  document.getElementById("rubis").innerHTML = `+${rubis}`;

  document.getElementById("nRonda").innerHTML = `PUNTUACION RONDA ${rondaActual}`;

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
        enviarOrdenCorrecto();

      } else {
        mostrarResultadosFinales();
      }
    },
    { once: true }
  );

  sendPlayerStatsToServer(aciertosRonda, contador)
  console.log('ENVIADO DESDE LIBROS JS')

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
                        00:${tiempoPromedio < 10 ? "0" : ""}${tiempoPromedio}
                    </div>
                    <div class="contenedor-rubi">
                              <div>${totalRubis}</div>
                              <img src="../../modales/modales/img/tablas/rubipuntaje.png"
                                  style="width: 4vh; height: auto;">
                    </div>
    
                    <div class="contedor_users">
                      <div class="col-12 row contenedor-info">
                          <div class="col-6 usuarioPerfill">
                              <img src="../../modales/modales/img/tablas/fotouser.png" alt="" style="width: 16px;">
                      
                          </div>
                          <div class="col-3">00:${tiempoPromedio < 10 ? "0" : ""}${tiempoPromedio}</div>
                          <div class="col-3">${puntajeTotal}pts</div>
                      </div>
                    </div>
                </div>
    
                <div class="contenedor-botonTsolo">
                    <button class="botonTsolo" onclick="redirigir()">
                        Salir
                    </button>
                </div>
            </div>
        </div>
    `;

  document.body.appendChild(modalFinal);
  new bootstrap.Modal(modalFinal).show();

  enviarPuntuacion(puntajeTotal, tiempoPromedio, totalRubis);
  // obtenerDatosUsuario();
}
function redirigir() {
  window.location.href = ("../../index.html");
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



if (modoJuego === 'multijugador') {
  // Obtener los datos de la sala desde el sessionStorage
  gameData = JSON.parse(sessionStorage.getItem('gameData'));

  if (gameData) {
    console.log('Datos de la sala:', gameData);

    const scoreList = document.getElementById('scoreList');
    const codigoSala = gameData.gameData.codigoSala;

    obtenerDatosUsuario(
      (data) => {
        const id_usuario = data.id_usuario;
        const usuario = data.usuario;
        console.log(`Usuario ID: ${id_usuario}, Nombre: ${usuario}`);

        // Verificar si el usuario es admin
        const adminId = gameData.players.find(player => player.isAdmin)?.idUsuario;
        usuarioEsAdmin = adminId === id_usuario;

        console.log("Estado de admin:", usuarioEsAdmin);
        localStorage.setItem('usuarioEsAdmin', usuarioEsAdmin);
        localStorage.setItem('id_usuario', id_usuario);

        // Actualizar la lista de jugadores
        scoreList.innerHTML = '';
        gameData.players.forEach(player => {
          const listItem = document.createElement('li');
          listItem.textContent = `${player.usuario}: ${player.score} puntos`;
          scoreList.appendChild(listItem);
        });

        // Lógica para el botón 'aceptar' basada en usuarioEsAdmin
        if (!usuarioEsAdmin) {
          aceptar.style.display = 'none';

        }

      },
      () => {
        console.log("Error al cargar los datos del usuario.");
      }
    );
  }

  console.log("Modo de juego: Multijugador");
} else {
  console.log("Modo de juego: Un jugador");
}

// Función para obtener datos del usuario
async function obtenerDatosUsuario(callback, manejarError) {
  try {
    const response = await fetch('../../procesos/login/obtenerUsuario.php');
    if (response.ok) {
      const data = await response.json();
      if (data.success && data.usuario) {
        callback(data);
      } else {
        manejarError();
      }
    } else {
      console.log(`Error al obtener datos del servidor: Código ${response.status}`);
    }
  } catch (error) {
    console.log(`Error al obtener datos del usuario: ${error.message}`);
  }
}

// Función para iniciar el juego multijugador
function iniciar() {
  // Configuración del WebSocket
  ws = new WebSocket('ws://localhost:8080');

  ws.onopen = () => {
    console.log('Conectado al WebSocket en el juego multijugador');
    if (gameData) {
      console.log("info" + gameData.gameData)

      // console.log("info" + gameData.gameData.codigoSala)
      ws.send(JSON.stringify({
        type: 'reconectarSala',
        codigoSala: gameData.gameData.codigoSala,
        players: gameData.players
      }));
      enviarOrdenCorrecto();
    } else {
      console.error('gameData no está disponible en la conexión WebSocket');
    }
  };

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    switch (data.type) {
      // case 'nuevoOrden':
      //   console.log('Orden correcto recibido:', data.orden);
      //   mostrarLibrosEnOrden(data.orden); // Actualizar el juego
      //   sessionStorage.removeItem('ordenCorrecto');

      //   break;

      case 'actualizarEstadisticas':
        console.log("Estadisticasdsgfrd")
        console.log("Estadísticas: ", JSON.stringify(data.players));
        actualizarEstadisticas(data)


        break;

      case 'ordenCorrecto':
        console.log('Orden correcta recibida:', data.orden);
        ordenVerificar = data.orden;
        mostrarLibrosEnOrden(data.orden); // Actualizar el juego}
        break;

      case 'error':
        console.error('Error:', data.message);
        break;
      case 'actualizarJugadores':
        contenedorUsers.innerHTML = '';

        // Crear el contenido del contenedor para los jugadores
        data.players.forEach((player, index) => {
          const contenedor = document.createElement('div');
          contenedor.className = 'col-12 row contenedor-info';
          contenedor.innerHTML = `
                  <div class="col-6 usuarioPerfill">
                      ${index + 1}. <img src="../../modales/modales/img/tablas/fotouser.png" alt="" style="width: 16px;"> ${player.usuario}
                  </div>
                  <div class="col-3" id="tiempo1">${player.time}s</div>
                  <div class="col-3" id="puntosSecu2">${player.score} puntos</div>
              `;
          contenedorUsers.appendChild(contenedor);
        });
        break;
      case 'cerrarModal':
        // Cierra el modal visible

        const modalElement = document.querySelector('.modal.show');
        if (modalElement) {
          const modalInstance = bootstrap.Modal.getInstance(modalElement);
          modalInstance.hide();
          console.log("Modal cerrado por el administrador");
        }
        const contenUser = document.getElementById('contedor_users');
        contenUser.innerHTML = `
            <div class="col-12 row contenedor-info">
                                      <div class="col-6 usuarioPerfill"><img src="../../modales/modales/img/tablas/fotouser.png"
                                              alt="" style="width: 16px;"></div>
                                      <div class="col-3" id="tiempo1">0</div>
                                      <div class="col-3" id="puntosSecu2">0s</div>
                                  </div>
          `;
        // iniciar()
        // enviarOrdenCorrecto();
        break;
    }
  };

  ws.onclose = () => console.log('Desconectado del WebSocket');
}

// Función para enviar estadísticas de los jugadores
function sendPlayerStatsToServer(score, time) {
  console.log(score);
  console.log(time);
  const id_usuario = JSON.parse(localStorage.getItem('id_usuario'));


  if (ws.readyState === WebSocket.OPEN) {
    if (gameData) {
      ws.send(JSON.stringify({
        type: 'puntajeRonda',
        codigoSala: gameData.gameData.codigoSala,
        player: {
          idUsuario: id_usuario, // Asume el primer jugador en el array, cambiar si es necesario
          score: score,
          time: time
        }
      }));
      console.log({
        player: {
          idUsuario: id_usuario, // Asume el primer jugador en el array, cambiar si es necesario
          score: score,
          time: time
        }
      })

      console.log("enviado")
    } else {
      console.error('gameData no está definido');
    }
  } else {
    console.error("WebSocket no está conectado");
  }
}

// Función para enviar el orden correcto al servidor (solo si es admin)
function enviarOrdenCorrecto() {
  const ordenCorrectoAdmin = JSON.parse(sessionStorage.getItem('ordenCorrectoAdmin'));

  if (!ordenCorrectoAdmin) {
    console.error('No se encontró el orden correcto en la sesión.');
    return;
  }

  const usuarioEsAdmin = JSON.parse(localStorage.getItem('usuarioEsAdmin'));

  console.log("enviando paso 1");
  console.log(usuarioEsAdmin);

  // Asegúrate de que el WebSocket está conectado
  if (usuarioEsAdmin) {
    console.log("enviando paso 2");

    if (gameData) {
      console.log("enviando paso 3");

      // Enviar el orden correcto a todos los jugadores
      ws.send(JSON.stringify({
        type: 'ordenCorrecto',
        codigoSala: gameData.gameData.codigoSala,
        orden: ordenCorrectoAdmin
      }));
      mostrarLibrosEnOrden(ordenCorrectoAdmin);
      ordenVerificar = ordenCorrectoAdmin;
      // sessionStorage.removeItem('ordenCorrecto');
      sessionStorage.removeItem('ordenCorrectoAdmin');


      console.log('Orden correcto enviado:', ordenCorrectoAdmin);
    } else {
      console.error('gameData no está definido');
    }
  } else {
    console.log("No es admin");
  }
}


// Función para actualizar las estadísticas de los jugadores
function actualizarEstadisticas(data) {
  let estado = 0; // Estado inicial para controlar las acciones

  aceptar.addEventListener('click', () => {
    if (estado === 0) {
      // Primera acción: Actualizar las estadísticas
      const contenedorUsers = document.getElementById('contedor_users');
      contenedorUsers.innerHTML = '';
      data.players.forEach((player, index) => {
        const contenedor = document.createElement('div');
        contenedor.className = 'col-12 row contenedor-info';
        contenedor.innerHTML = `
            <div class="col-6 usuarioPerfill">
              ${index + 1}. <img src="../../modales/modales/img/tablas/fotouser.png" alt="" style="width: 16px;"> ${player.usuario}
            </div>
            <div class="col-3" id="tiempo1">${player.time}s</div>
            <div class="col-3" id="puntosSecu2">${player.score} puntos</div>
          `;
        contenedorUsers.appendChild(contenedor);
      });

      const dataToSend = {
        type: 'actualizarJugadores',
        codigoSala: gameData.gameData.codigoSala,
        players: data.players,
      };

      ws.send(JSON.stringify(dataToSend)); // Envía los datos
      console.log('Datos enviados para actualizar jugadores');

      // Cambiar el estado para la siguiente acción
      estado = 1;
    } else if (estado === 1) {
      // Segunda acción: Cerrar el modal
      const dataToSend = {
        type: 'cerrarModal',
        codigoSala: gameData.gameData.codigoSala,
      };

      ws.send(JSON.stringify(dataToSend)); // Envía el mensaje para cerrar el modal
      console.log('Mensaje enviado para cerrar el modal');

      // Resetear estado si es necesario o mantenerlo en 1
      estado = 0; // Opcional: Para reiniciar la secuencia si fuera necesario
    }
  });
}


// Verificar si estamos en modo multijugador

botonVerificar.addEventListener("click", () => {
  finalizarRonda(ordenVerificar);
});