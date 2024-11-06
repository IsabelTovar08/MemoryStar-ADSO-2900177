
    var container = document.getElementById("Content-salir");

// Si el modal se genera dinámicamente, agrégalo dentro de 'fluid'
var modalHTML = `
                <div class="salir"><img src="img/iconos/salir.png" alt="" data-bs-toggle="modal"
                        data-bs-target="#exitModal"></div>
                <div class="modal fade" id="exitModal" tabindex="-1" aria-labelledby="exitModalLabel"
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
                                <a href="index.html"><button type="button" class="btn btn-yes">Sí</button></a>
                            </div>
                        </div>
                    </div>
                </div>
`;

// Añadir el modal dentro del contenedor 'fluid'
container.insertAdjacentHTML("afterbegin", modalHTML);
