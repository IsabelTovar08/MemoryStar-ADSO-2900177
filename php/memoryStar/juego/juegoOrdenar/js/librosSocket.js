let ordenVerificar;
let ws;
let gameData = null;
let usuarioEsAdmin = false;
let todosListos;
let usuarioId;
let usuarioAdmin;
let mensaje = document.querySelector('.mensaje');
iniciar();

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

gameData = JSON.parse(sessionStorage.getItem('gameData'));
function iniciar() {
  ws = new WebSocket('ws://192.168.131.53:8080');
  ws.onopen = () => {
    console.log('Conectado al WebSocket en el juego multijugador');
    if (gameData) {
      console.log("info" + gameData.gameData)
      ws.send(JSON.stringify({
        type: 'reconectarSala',
        codigoSala: gameData.gameData.codigoSala,
        players: gameData.players
      }));
    } else {
      console.error('gameData no está disponible en la conexión WebSocket');
    }
    console.log(ordenVerificar)
  };
  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    switch (data.type) {
      case 'actualizarEstadisticas':
        console.log("Estadisticasdsgfrd")
        console.log("Estadísticas: ", JSON.stringify(data.players));
        actualizarEstadisticas(data)
        break;
      case 'ordenCorrectoR':
        console.log('Orden correcta recibida:', data.orden);
        mostrarLibrosEnOrden(data.orden);
        ordenVerificar = data.orden;
        break;
      case 'error':
        console.error('Error:', data.message);
        break;
      case 'actualizarJugadoresRecibir':
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
              `; 5
          contenedorUsers.appendChild(contenedor);
        });
        break;
      case 'cerrarModal':
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
        break;
      case 'todosFinalizados':
        console.log('todos:', data);
        todosListos = true;
        break;
    }
  };

  ws.onclose = () => console.log('Desconectado del WebSocket');
}
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

function detectarNivel() {
  const rutaCompleta = window.location.pathname;
  const nombreArchivo = rutaCompleta.split("/").pop();
  console.log("Página actual:", nombreArchivo);

  configuracionNivel =
    NIVELES[nombreArchivo] || NIVELES["ordenarBibliotecaFacil.html"];
  tiempoRestante = configuracionNivel.tiempoRonda;

  return configuracionNivel;
}

function obtenerCantidadLibros() {
  return (
    configuracionNivel.librosIniciales +
    (rondaActual - 1) * configuracionNivel.incrementoPorRonda
  );
}

function obtenerLibrosParaRonda() {
  const cantidadLibros = obtenerCantidadLibros();
  return todosLosLibros.slice(0, cantidadLibros);
}

function mezclarArreglo(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

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

function iniciarRonda() {
  console.log("iniciando")
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
  // const usuarioEsAdmin = JSON.parse(localStorage.getItem('usuarioEsAdmin'));
  if (usuarioEsAdmin) {
    ordenCorrecto = mezclarArreglo([...idsLibros]);
    ordenVerificar = ordenCorrecto;
    console.log(ordenCorrecto)
    console.log("u")
    enviarOrdenCorrecto();

  } else {
    console.log(ordenCorrecto)
    obtenerOrdenCorrecto()
  }
  console.log(ordenCorrecto)
  reiniciarTemporizadores();
  document.getElementById(
    "ronda-actual"
  ).textContent = `Ronda ${rondaActual} de 3`;

}
function obtenerOrdenCorrecto() {
  console.log("estoy en obtener")
  // ws.addEventListener('open', () => {
  //   console.log("WebSocket conectado, recibi ordenCorrecto");
  //   ws.send(JSON.stringify({
  //     type: 'obtenerOrdenCorrecto'
  //   }));
  //   console.log('ya');
  // }, { once: true });
  if (ws.readyState === WebSocket.OPEN) {
    console.log("WebSocket listo, recibiendo ordenCorrecto");
    ws.send(JSON.stringify({
          type: 'obtenerOrdenCorrecto'
        }));
    // mostrarLibrosEnOrden(ordenCorrecto);
    console.log('Orden correcto recibiendo:',);
  } else if (ws.readyState === WebSocket.CONNECTING) {
    console.warn("WebSocket aún conectando, reintentando recibir...");
    ws.addEventListener('open', () => {
      console.log("WebSocket conectado, recibiendo ordenCorrecto");
      ws.send(JSON.stringify({
            type: 'obtenerOrdenCorrecto'
          }));
      // mostrarLibrosEnOrden(ordenCorrecto);
      console.log('Orden recibido tras conectar:');
    }, { once: true });
  } else {
    console.error("No se puede recibir, WebSocket no está conectado (estado:", ws.readyState, ")");
  }
}
function iniciarTemp() {
  contador = -5;
  limpiarIntervalos();
  intervaloTemp = setInterval(function () {
    contador++;
    if (contador >= 0) {
      document.getElementById("verificarBtn").disabled = false;
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

function finalizarRonda(ordenVerificar) {
  console.log("e" + ordenVerificar)
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
    } else {
      desaciertos = desaciertos + 1;
    }
  });

  puntajeTotal += aciertosRonda;
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
  ws.send(JSON.stringify({
    type: 'ordenEnviado',
    codigoSala: gameData.gameData.codigoSala,
    usuario: usuarioId
  }));
  sendPlayerStatsToServer(aciertosRonda, contador)
  console.log('ENVIADO DESDE LIBROS JS')
}

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

function calcularTiempoPromedio() {
  const suma = tiemposPorRonda.reduce((a, b) => a + b, 0);
  return (suma / tiemposPorRonda.length).toFixed(1);
}
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

document.addEventListener("DOMContentLoaded", async () => {
  console.log("Inicio del DOMContentLoaded");
  await reconocerAdmin(); // Espera a que esta función termine
  console.log("Después de llamar a reconocerAdmin");
  detectarNivel();
  console.log("Después de llamar a detectarNivel");
  const rondaDisplay = document.createElement("div");
  rondaDisplay.id = "ronda-actual";
  rondaDisplay.className = "text-center mb-3";
  document
    .querySelector("#lista")
    .parentNode.insertBefore(rondaDisplay, document.querySelector("#lista"));
  console.log("u");
  iniciarRonda();
});

async function reconocerAdmin() {
  await obtenerDatosUsuario(
    (data) => {
      usuarioId = data.id_usuario;
      const usuario = data.usuario;
      contenedorNombre = document.getElementById('nombre');
      contenedorNombre.textContent = usuario;
      console.log(`Usuario ID: ${usuarioId}, Nombre: ${usuario}`);

      const adminId = gameData.players.find(player => player.isAdmin)?.idUsuario;
      usuarioEsAdmin = adminId === usuarioId;

      console.log("Estado de admin:", usuarioEsAdmin);
      if (!usuarioEsAdmin) {
        aceptar.style.display = 'none';
      }
    },
    () => {
      console.log("Error al cargar los datos del usuario.");
    }
  );
}

function sendPlayerStatsToServer(score, time) {
  console.log(score);
  console.log(time);
  console.log(usuarioId)

  if (ws.readyState === WebSocket.OPEN) {
    if (gameData) {
      ws.send(JSON.stringify({
        type: 'puntajeRonda',
        codigoSala: gameData.gameData.codigoSala,
        player: {
          idUsuario: usuarioId,
          score: score,
          time: time
        }
      }));
      console.log("enviado")
    } else {
      console.error('gameData no está definido');
    }
  } else {
    console.error("WebSocket no está conectado");
  }
}

function enviarOrdenCorrecto() {
  console.log("Orden correcto a enviar:", ordenCorrecto);
  console.log(usuarioEsAdmin)
  if (!usuarioEsAdmin) {
    console.log("No es admin, no se envía ordenCorrecto");
    return;
  }

  if (ws.readyState === WebSocket.OPEN) {
    console.log("WebSocket listo, enviando ordenCorrecto");
    ws.send(JSON.stringify({
      type: 'ordenCorrecto',
      codigoSala: gameData.gameData.codigoSala,
      orden: ordenCorrecto
    }));
    mostrarLibrosEnOrden(ordenCorrecto);
    console.log('Orden correcto enviado:', ordenCorrecto);
  } else if (ws.readyState === WebSocket.CONNECTING) {
    console.warn("WebSocket aún conectando, reintentando envío...");
    ws.addEventListener('open', () => {
      console.log("WebSocket conectado, enviando ordenCorrecto");
      ws.send(JSON.stringify({
        type: 'ordenCorrecto',
        codigoSala: gameData.gameData.codigoSala,
        orden: ordenCorrecto
      }));
      mostrarLibrosEnOrden(ordenCorrecto);
      console.log('Orden correcto enviado tras conectar:', ordenCorrecto);
    }, { once: true });
  } else {
    console.error("No se puede enviar, WebSocket no está conectado (estado:", ws.readyState, ")");
  }
}


function actualizarEstadisticas(data) {
  let estado = 0;
  console.log(todosListos)
  mensaje.textContent="";

  if (todosListos) {
    mensaje.style.color = 'green';
    mensaje.innerHTML = `<i class="fa-solid fa-circle-check"></i> Todos listos.`;
  }else{
    mensaje.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Esperando jugadores...`;
  }
  aceptar.addEventListener('click', () => {
    if (estado === 0 && todosListos) {
      const contenedorUsers = document.getElementById('contedor_users');
      contenedorUsers.innerHTML = '';
      data.players.sort((a, b) => {
        if (b.score !== a.score) {
          return b.score - a.score;
        }
        return a.time - b.time;
      });

      data.players.forEach((player, index) => {
        const contenedor = document.createElement('div');
        contenedor.className = 'col-12 row contenedor-info';
        if (index < 3) {
          contenedor.classList.add('destacado');
        }

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
        type: 'actualizarJugadoresEnviar',
        codigoSala: gameData.gameData.codigoSala,
        players: data.players,
      };

      ws.send(JSON.stringify(dataToSend));
      console.log('Datos enviados para actualizar jugadores');

      estado = 1;
      console.log(todosListos)

    } else if (estado === 1) {
      const dataToSend = {
        type: 'cerrarModal',
        codigoSala: gameData.gameData.codigoSala,
      };
      ws.send(JSON.stringify(dataToSend));
      console.log('Mensaje enviado para cerrar el modal');
      estado = 0;
      todosListos = false;

    }
  });
}
botonVerificar.addEventListener("click", () => {
  console.log(ordenVerificar)
  finalizarRonda(ordenVerificar);
});
iniciar();
