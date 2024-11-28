function redirigir() {
  setTimeout(() => {
    window.location.href = "aCohete/animacion3.html";
  }, 2000);
}

document.addEventListener("DOMContentLoaded", function () {
  let tiempo = document.getElementById("tiempo");
  let duracion = 20;
  let timerInterval;
  let puntuacion = 0;
  let rubis = 0;
  let contador = 0;
  const audioLoser = new Audio("sonidos/juego/perder1.mp3");

  timerInterval = tempo(duracion, tiempo);

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
    overlap: 0.1,
    ondropactivate: function (event) {
      event.target.classList.add("dropzone-active");
    },
    ondragenter: function (event) {
      const dropzoneElement = event.target;
      const draggableElement = event.relatedTarget;
    },
    ondragleave: function (event) {
      event.target.classList.remove("dropzone-highlight");
      event.relatedTarget.classList.remove("can-drop");
    },
    ondrop: function (event) {
      event.relatedTarget.setAttribute(
        "data-dropped",
        event.target.getAttribute("data-id")
      );
    },
    ondropdeactivate: function (event) {
      event.target.classList.remove("dropzone-active");
      event.target.classList.remove("dropzone-highlight");
    },
  });

  const btnVerificar = document.getElementById("verificar");

  btnVerificar.addEventListener("click", function () {
    const objetos = document.querySelectorAll(".arrastrable");
    let correcto = true;

    objetos.forEach((objeto) => {
      const objetoId = objeto.getAttribute("data-id");
      const dropzoneId = objeto.getAttribute("data-dropped");

      if (objetoId !== dropzoneId) {
        correcto = false;
        objeto.classList.add("incorrecto");
        setTimeout(() => {
          objeto.classList.remove("incorrecto");
        }, 2000);
      } else {
        objeto.classList.remove("incorrecto");
        objeto.classList.add("correcto");
      }
    });

    if (correcto) {
      clearInterval(timerInterval);
      calcularRecompensas();
      mostrarTabla();
    }
  });

  function calcularRecompensas() {
    let tiempoTranscurrido =
      20 - parseInt(tiempo.textContent.trim().split(":")[1]);

    if (tiempoTranscurrido <= 7) {
      puntuacion = 200;
      rubis = 1;
    } else if (tiempoTranscurrido <= 14) {
      puntuacion = 150;
    } else {
      puntuacion = 100;
    }

    contador = tiempoTranscurrido;
  }
  const perdio = document.getElementById("perdiste");
  function tempo(pduracion, elemento) {
    let duracion = pduracion;
    const intervalo = setInterval(() => {
      elemento.innerHTML = ` 00:${duracion < 10 ? "0" : ""}${duracion}`;
      duracion--;
      if (duracion <= 0) {
        clearInterval(intervalo);
        elemento.innerHTML = `¡Tiempo!`;
        puntuacion = 0;
        rubis = 0;
        contador = 20;

        var perdistee = new bootstrap.Modal(document.getElementById("perdioo"));
        perdistee.show();
        // Intentar reproducir el sonido
        audioLoser.play().catch((error) => {
          console.error("Error al reproducir audio:", error);
        });

        perdio.addEventListener("click", () => {
          window.location.href = "index.html";
        });
      }
    }, 1000);
    return intervalo;
  }

  function mostrarTabla() {
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
              <img src="modales/modales/img/tablas/Star.png" class="star" alt="">
              <img src="modales/modales/img/tablas/Star.png" class="star" alt="">
              <img src="modales/modales/img/tablas/Star.png" class="star" alt="">
            </div>
            <div class="puntaje-total">
              ${puntuacion}
            </div>

            <div class="contenedor-puntaje">
              Tiempo:
              ${contador}s
            </div>
            <div class="contenedor-rubi">
              <div>${rubis}</div>
              <img src="modales/modales/img/tablas/rubipuntaje.png"
                  style="width: 4vh; height: auto;">
            </div>

            <div class="col-12 row contenedor-info">
              <div class="col-6 usuarioPerfill">
                <img src="modales/modales/img/tablas/fotouser.png" alt="" style="width: 16px;">
              </div>
              <div class="col-3">${contador}s</div>
              <div class="col-3">${puntuacion}pts</div>
            </div>
          </div>

          <div class="contenedor-botonTsolo">
            <button class="botonTsolo" onclick="redirigir()">
              Siguiente
            </button>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modalFinal);
    new bootstrap.Modal(modalFinal, { backdrop: "static" }).show();

  
  }
});
