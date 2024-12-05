function redirigir() {
  setTimeout(() => {
    window.location.href = "../../../index.html";
  }, 2000);
}


function cerrarYAbrirModal() {
  // Cerrar el modal actual
  const modalFinal = document.getElementById('modalFinal');
  const modalInstance = bootstrap.Modal.getInstance(modalFinal);
  modalInstance.hide();

  // Esperar a que el modal actual termine de cerrarse
  modalFinal.addEventListener('hidden.bs.modal', function () {
      modalFinal.remove(); // Eliminar el modal del DOM

      // Realizar el fetch para obtener los datos desde PHP
      fetch('../../../procesos/puntuacionmario/final.php')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                // Crear un nuevo modal con los datos obtenidos
                const nuevoModal = document.createElement("div");
                nuevoModal.className = "modal fade";
                nuevoModal.id = "nuevoModal";
                nuevoModal.setAttribute("tabindex", "-1");
                nuevoModal.setAttribute("aria-labelledby", "nuevoModalLabel");
                nuevoModal.setAttribute("aria-hidden", "true");
                nuevoModal.setAttribute("data-bs-backdrop", "static");
                nuevoModal.setAttribute("data-bs-keyboard", "false");

                nuevoModal.innerHTML = `
                        <div class="modal-dialog modal-sm modal-dialog-centered">
                <div class="modal-content contenedorTsolo">
                    <div class="tituloTsolo">¡Juego Completado! Puntuación final</div>
                    <div class="contenedorTsoloInterior">
                        <div class="contenedor-estrellas">
                            <img src="../../../modales/modales/img/tablas/Star.png" class="star" alt="">
                            <img src="../../../modales/modales/img/tablas/Star.png" class="star" alt="">
                            <img src="../../../modales/modales/img/tablas/Star.png" class="star" alt="">
                        </div>
                        <div class="puntaje-total">
                        ${data.data.puntos}
                        </div>
                        <div class="contenedor-puntaje">
                            Tiempo:
                            ${data.data.tiempo}s
                        </div>
                        <div class="contenedor-rubi">
                            <div>${data.data.diamantes}</div>
                            <img src="../../../modales/modales/img/tablas/rubipuntaje.png"
                                style="width: 4vh; height: auto;">
                        </div>
                        <div class="col-12 row contenedor-info">
                            <div class="col-6 usuarioPerfill">
                                <img src="../../../modales/modales/img/tablas/fotouser.png" alt="" style="width: 16px;">
                            </div>
                            <div class="col-3"> ${data.data.tiempo}s</div>
                            <div class="col-3">$${data.data.puntos}pts</div>
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


           
        





                document.body.appendChild(nuevoModal);
                new bootstrap.Modal(nuevoModal).show();
            } else {
                alert(data.message || 'No se pudieron obtener los datos.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Hubo un problema al obtener los datos.');
        });
  });
}


document.addEventListener("DOMContentLoaded", function () {
  const btnVeri = document.getElementById("verificar");
  let ordenCorrect = [];
  let tiempo = document.getElementById("tiempo");
  let duracion = 15;
  let timerInterval;
  let puntuacion = 0;
  let rubis = 0;
  let contador = 0;
  const audioVictory = new Audio("../../../sonidos/juego/victoria1.mp3");
  const audioLoser = new Audio("../../../sonidos/juego/perder1.mp3");

  timerInterval = tempo(duracion, tiempo);

  fetch("php/almacenar_orden.php")
    .then((response) => response.json())
    .then((data) => {
      ordenCorrect = data.ordenDef || [];
      console.log("Orden correcto:", ordenCorrect);
    });

  let ordenActual;
  const lista = document.getElementById("lista1");
  Sortable.create(lista, {
    animation: 250,
    chosenClass: "seleccionado",
    dragClass: "drag",
    store: {
      set: (sortable) => {
        ordenActual = sortable.toArray();
        console.log("Orden actual:", ordenActual);
      },
    },
  });

  const loader = document.getElementById("loader");
  const mainContent = document.getElementById("main-content");
  const toastMessage = document.getElementById("toastMessage");

  btnVeri.addEventListener("click", function () {
    if (!ordenCorrect.length) {
      alert("El orden correcto no se ha cargado. Inténtalo de nuevo.");
      return;
    }

    loader.style.display = "block";
    mainContent.classList.add("blur");

    setTimeout(() => {
      let aciertos = 0;
      ordenActual = Sortable.get(lista).toArray();
      const cuadros = document.querySelectorAll(".cuadro");
      let correcto = true;

      ordenActual.forEach((id, index) => {
        const cuadro = cuadros[index];
        const idEsperado = ordenCorrect[index];

        if (id == idEsperado) {
          aciertos += 1;
          cuadro.classList.add("bien");
          setTimeout(() => {
            cuadro.classList.remove("bien");
          }, 1000);
        } else {
          cuadro.classList.add("mal");
          setTimeout(() => {
            cuadro.classList.remove("mal");
          }, 1000);
          correcto = false;
        }
      });

      loader.style.display = "none";
      mainContent.classList.remove("blur");

      if (correcto) {
        toastMessage.innerHTML =
          "¡Correcto! Has acertado en todas las posiciones.";
        clearInterval(timerInterval);
        calcularRecompensas();
        mostrarTabla();
      } else {
        toastMessage.innerHTML = `Has acertado en ${aciertos} de ${ordenCorrect.length} posiciones.`;
      }

      const resultadoToast = new bootstrap.Toast(
        document.getElementById("resultadoToast")
      );
      resultadoToast.show();
    }, 500);
  });

  function calcularRecompensas() {
    let tiempoTranscurrido =
      15 - parseInt(tiempo.textContent.trim().split(":")[1]);

    if (tiempoTranscurrido <= 5) {
      puntuacion = 200;
      rubis = 1;
    } else if (tiempoTranscurrido <= 10) {
      puntuacion = 150;
    } else {
      puntuacion = 100;
    }

    contador = tiempoTranscurrido;
  }

  function tempo(pduracion, elemento) {
    let duracion = pduracion;
    const intervalo = setInterval(() => {
      elemento.innerHTML = `00:${duracion < 10 ? "0" : ""}${duracion}`;
      duracion--;
      if (duracion <= 0) {
        clearInterval(intervalo);
        elemento.innerHTML = `¡Tiempo!`;
        puntuacion = 0;
        rubis = 0;
        contador = 5;
        var perdistee = new bootstrap.Modal(document.getElementById("perdioo"));
        perdistee.show();
        // Intentar reproducir el sonido
        audioLoser.play().catch((error) => {
          console.error("Error al reproducir audio:", error);
        });
        let perdio = document.getElementById("perdiste");
        perdio.addEventListener("click", () => {
          window.location.href = "../../../index.html";
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
                              <img src="../../../modales/modales/img/tablas/Star.png" class="star" alt="">
                              <img src="../../../modales/modales/img/tablas/Star.png" class="star" alt="">
                              <img src="../../../modales/modales/img/tablas/Star.png" class="star" alt="">
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
                              <img src="../../../modales/modales/img/tablas/rubipuntaje.png"
                                  style="width: 4vh; height: auto;">
                    </div>
                    <div class="col-12 row contenedor-info">
                      <div class="col-6 usuarioPerfill">
                          <img src="../../../modales/modales/img/tablas/fotouser.png" alt="" style="width: 16px;">
                      </div>
                      <div class="col-3">${contador}s</div>
                      <div class="col-3">${puntuacion}pts</div>
                  </div>
                </div>
    
                <div class="contenedor-botonTsolo">
                    <button class="botonTsolo" onclick="cerrarYAbrirModal()"
                    >
                        Salir
                    </button>
                </div>
            </div>
        </div>
    `;

    puntosfinal(puntuacion, rubis, contador);

    document.body.appendChild(modalFinal);
    new bootstrap.Modal(modalFinal, { backdrop: "static" }).show();
  }
});

function puntosfinal(puntuacion, rubis, contador) {
  const datosJuego = {
    puntos: puntuacion,
    diamantes: rubis,
    tiempo: contador,
    archivo: 3,
  };
  fetch("../../../procesos/puntuacionmario/datos.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datosJuego),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data.mensaje);
      console.log("enviado 3");
    })
    .catch((error) => {
      console.error("Error al enviar datos:", error);
    });
}
