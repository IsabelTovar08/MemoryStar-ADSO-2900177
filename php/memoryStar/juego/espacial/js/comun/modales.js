document.addEventListener("DOMContentLoaded", function () {
  function informacionModales() {
    fetch("../../json/modal.json")
      .then((responde) => responde.json())
      .then((datos) => {
        let modalMuerte = datos.infoModal.Muerte;
        modales(modalMuerte);
      })
      .catch((error) =>
        console.error("Error al cargar el JSON de temáticas:", error)
      );
  }

  function objetos() {
    fetch("../../json/modal.json")
      .then((responde) => responde.json())
      .then((datos) => {
        partesN(datos.infoModal);
      })
      .catch((error) =>
        console.error("Error al cargar el JSON de temáticas:", error)
      );
  }

  function redi() {
    fetch("../../json/modal.json")
      .then((responde) => responde.json())
      .then((datos) => {
        let rediri = datos.infoModal.redireccion;
        redirigir(rediri);
      })
      .catch((error) =>
        console.error("Error al cargar el JSON de temáticas:", error)
      );
  }
  salir();

  informacionModales();
  objetos();
  redi();

  function modales(modal) {
    let modalJuego = "";
    modalJuego += `
          <div class="modal fade custom-modal" id="${modal.id}" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="geometric-bg">
                <div class="grid-pattern"></div>
                <div class="geometric-shape triangle"></div>
                <div class="geometric-shape circle"></div>
                <div class="geometric-shape square"></div>
                <div class="glow-effect glow-1"></div>
                <div class="glow-effect glow-2"></div>
                <div class="floating-dots dot-1"></div>
                <div class="floating-dots dot-2"></div>
                <div class="floating-dots dot-3"></div>
                <div class="floating-dots dot-4"></div>
                <div class="floating-dots dot-5"></div>
                <div class="neon-line"></div>
            </div> 

            <div class="modal-header tit">
                <h5 class="modal-title tituloo">${modal.texto}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body d-flex">
                <div class="modal-text-container" style="width: 60%;">
                    <p>${modal.body}</p>
                    <div class="row mb-3">
                        <div class="col">${modal.Ddisponibles}</div>
                        <div class="col" id=" ${modal.idDiamantes} "></div>
                    </div>
                    <div id="${modal.idTemporizador}" class="fs-2">5</div>
                </div>
                <div class="modal-image-container" style="width: 40%; margin-right: 10px;">
                    <img src="../../img/vacamuerta.png" alt="Oxygen" class="img-fluid">
                </div>
            </div>
            <div class="modal-footer">
            <button type="button" id="${modal.idOxigeno}" data-bs-dismiss="modal" class="btn btn-primary">Comprar</button>
            
               
            </div>
        </div>
    </div>
</div> 
        `;

    document.body.insertAdjacentHTML("beforeend", modalJuego);
  }

  function partesN(info) {
    let mostrarParte = "";
    info.partesNave.forEach((parte) => {
      mostrarParte += `
                <div class="modal" id="${parte.ids}" tabindex="-1">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-body">
                                ${parte.texto}
                            </div>
                        </div>
                    </div>
                </div>
            `;
    });

    document.body.insertAdjacentHTML("beforeend", mostrarParte);
  }

  function redirigir(ir) {
    let redirigir = "";
    redirigir += `
          <div class="modal" id="${ir.id}" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered">
                  <div class="modal-content modalRedirigir">
                      <div class="modal-body">
                          ${ir.texto}
                          <div class="boton_aceptar"><button type="button" id="${ir.id2}" class="btn btn-primary">Aceptar</button></div>
                      </div>
                  </div>
              </div>
          </div>
      `;
    document.body.insertAdjacentHTML("beforeend", redirigir);
  }

  function salir() {
    let salir = "";
    salir += `
                <div class="modal fade" id="exitModal" aria-labelledby="exitModalLabel" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-hidden="true""
                    aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="salir modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exitModalLabel">¿Estás seguro que quieres salir?</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <p>¿Quieres abandonar la misión espacial?</p>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-no" data-bs-dismiss="modal">No</button>
                                <a href="../../../../index.html"><button type="button" class="btn btn-yes">Sí</button></a>
                            </div>
                        </div>
                    </div>
                </div>
    `;
    document.body.insertAdjacentHTML("beforeend", salir);
  }
});
