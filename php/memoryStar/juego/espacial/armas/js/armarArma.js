document.addEventListener("DOMContentLoaded", function () {
  let tiempo = document.getElementById("tiempo");
  let duracion = 20;
  console.log('lol')

  const modalElement = document.getElementById("armarArma");
  modalElement.addEventListener('shown.bs.modal', function () {
    tempo(duracion, tiempo);
  });
  
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

  //DROP
  interact(".dropzone").dropzone({
    accept: ".arrastrable",
    overlap: 0.1,
    ondropactivate: function (event) {
      event.target.classList.add("dropzone-active");
    },
    ondragenter: function (event) {
      const dropzoneElement = event.target;
      const draggableElement = event.relatedTarget;

      //   dropzoneElement.classList.add("dropzone-highlight");
      //   draggableElement.classList.add("can-drop");
    },
    ondragleave: function (event) {
      event.target.classList.remove("dropzone-highlight");
      event.relatedTarget.classList.remove("can-drop");
    },
    ondrop: function (event) {
      // VER EN Q DROPZONE CAYO
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
    intervalo=null

    objetos.forEach((objeto) => {
      const objetoId = objeto.getAttribute("data-id");
      const dropzoneId = objeto.getAttribute("data-dropped");

      if (objetoId !== dropzoneId) {
        correcto = false;
        console.log(`El objeto ${objetoId} está en la dropzone incorrecta.`);
        // Cambiar el estilo si es incorrecto
        objeto.classList.add("incorrecto");
      } else {
        console.log(`El objeto ${objetoId} está en la dropzone correcta.`);
        // Cambiar el estilo si es correcto
        objeto.classList.remove("incorrecto");
        objeto.classList.add("correcto");
      }
    });

    if (correcto) {
      console.log("Todos los objetos están en las dropzones correctas.");
      window.location.href = "juego/espacial/armas/juegoDulces/index.html";
    } else {
      console.log("Algunos objetos no están en las dropzones correctas.");
    }

  });
  


  function tempo(pduracion, elemento) {
    let duracion = pduracion;
    const intervalo = setInterval(() => {
      elemento.innerHTML =
        ` 00:${duracion < 10 ? "0" : ""}${duracion}`;
      duracion--;
      if (duracion <= 0) {
        clearInterval(intervalo);
        elemento.innerHTML = `¡Tiempo!`;
        mostrarTabla();
      }
    }, 1000);
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
                  ${"puntajeTotal"}
              </div>

              <div class="contenedor-puntaje">
                  Tiempo Promedio:
                  ${"tiempoPromedio"}s
              </div>
              <div class="contenedor-rubi">
                        <div>${"totalRubis"}</div>
                        <img src="modales/modales/img/tablas/rubipuntaje.png"
                            style="width: 4vh; height: auto;">
              </div>

              <div class="col-12 row contenedor-info">
                  <div class="col-6 usuarioPerfill">
                      <img src="modales/modales/img/tablas/fotouser.png" alt="" style="width: 16px;">
                      
                  </div>
                  <div class="col-3">${"tiempoPromedio"}s</div>
                  <div class="col-3">${"puntajeTotal"}pts</div>
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
});
