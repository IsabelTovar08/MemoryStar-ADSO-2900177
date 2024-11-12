document.addEventListener("DOMContentLoaded", function () {
  const btnVeri = document.getElementById("verificar");
  let ordenCorrect = []; // Declarar en un ámbito global para acceso en todas las funciones
  let tiempo = document.getElementById("tiempo");
  let duracion = 15;

  // Recuperar `ordenDef` del servidor
  fetch("php/almacenar_orden.php")
    .then((response) => response.json())
    .then((data) => {
      ordenCorrect = data.ordenDef || [];
      console.log("Orden correcto:", ordenCorrect);
    });

  let ordenActual;
  console.log("Holaaaaaaa");

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

  // verificar
  const loader = document.getElementById("loader");
  const mainContent = document.getElementById("main-content");
  const toastMessage = document.getElementById("toastMessage");

  btnVeri.addEventListener("click", function () {
    if (!ordenCorrect.length) {
      alert("El orden correcto no se ha cargado. Inténtalo de nuevo.");
      return;
    }

    loader.style.display = "block"; // Mostrar la animación de carga
    mainContent.classList.add("blur"); // Desenfocar el fondo

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
          cuadro.classList.remove("mal");
          cuadro.classList.add("bien");
        } else {
          cuadro.classList.add("mal");
          cuadro.classList.remove("bien");
          correcto = false;
        }
      });

      loader.style.display = "none"; // Ocultar la animación de carga
      mainContent.classList.remove("blur"); // Quitar el desenfoque del fondo

      // Configurar el mensaje de resultado en el toast
      if (correcto) {
        toastMessage.innerHTML =
          "¡Correcto! Has acertado en todas las posiciones.";
      } else {
        toastMessage.innerHTML = `Has acertado en ${aciertos} de ${ordenCorrect.length} posiciones.`;
      }

      // Mostrar el toast
      const resultadoToast = new bootstrap.Toast(
        document.getElementById("resultadoToast")
      );
      resultadoToast.show();
    }, 500); // Tiempo simulado para la verificación
  });

  function tempo(pduracion,elemento) {
    let duracion = pduracion;
    const intervalo = setInterval(() => {
      elemento.innerHTML = `00:${duracion<10 ? '0':''}${duracion}`
      duracion--;
      if(duracion <= 0){
        clearInterval(intervalo)
        elemento.innerHTML = `¡Tiempo!`
        mostrarTabla()
      }
    },1000);
  }
  tempo(duracion,tiempo);

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
                              <img src="../../../modales/modales/img/tablas/Star.png" class="star" alt="">
                              <img src="../../../modales/modales/img/tablas/Star.png" class="star" alt="">
                              <img src="../../../modales/modales/img/tablas/Star.png" class="star" alt="">
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
                              <img src="../../../modales/modales/img/tablas/rubipuntaje.png"
                                  style="width: 4vh; height: auto;">
                    </div>
    
                    <div class="col-12 row contenedor-info">
                        <div class="col-6 usuarioPerfill">
                            <img src="../../modales/modales/img/tablas/fotouser.png" alt="" style="width: 16px;">
                            
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
