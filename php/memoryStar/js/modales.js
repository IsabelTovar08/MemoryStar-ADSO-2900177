document.addEventListener("DOMContentLoaded", function () {

    function peticionModal(){
        fetch("json/modalesConfig.json")
        .then((response) =>response.json())
        .then((datos) =>{
            mostrarModal(datos.modales);
        })
        .catch((error) =>
            console.error("Error al cargar el JSON de temáticas:", error)
          );
    }

    peticionModal();

    function mostrarModal (mostrar){
        let verModal = "";
        mostrar.modalOpciones.forEach(modal => {
            verModal += `
            <div class="modal fade" id="${modal.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">${modal.nombre}</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            ${modal.descripcion}
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Aceptar</button>
                        </div>
                    </div>
                </div>
            </div>
            `;

            document.body.insertAdjacentHTML('beforeend', verModal);
        });
    }
});