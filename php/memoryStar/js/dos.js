document.addEventListener('DOMContentLoaded', function() {

    function mostrar() {
        var modalHTML = `
            <nav class="nav flex-column apartado-iconos">
                <img id="desplegarOpciones" src="img/iconos/opcionesN.png" alt="desplegarOpciones" class="iconos efectosIconos">
                <img id="controlMusica" src="img/iconos/musicaApagada.png" alt="Reproducir" class="iconos efectosIconos">
                <img src="img/iconos/copaN.png" alt="Histórico" class="iconos efectosIconos" data-bs-toggle="modal" data-bs-target="#hisorico">
                <img src="img/iconos/ajustesN.png" alt="Ajustes" class="iconos efectosIconos" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                <div class="collapse" id="collapseExample" style="width: 500%;">
                    <div class="card card-body color">
                        <div class="col-12 row">
                            <div class="col-5">Música</div>
                            <div class="col-6">
                                <input type="range" class="secondary" id="volumenMusica" min="0" max="1" step="0.1" value="1">
                            </div>
                        </div>
                        <div class="col-12 row">
                            <div class="col-5">Sonido</div>
                            <div class="col-6">
                                <input type="range" id="volumenSonido" min="0" max="1" step="0.1" value="1">
                            </div>
                        </div>
                        <button id="botonSilencio" class="btn btn-primary">Silenciar</button>
                    </div>
                </div>
                <img src="img/iconos/ayudaN.png" alt="Ayuda" class="iconos efectosIconos" data-bs-toggle="modal" data-bs-target="#exampleModal-ayuda">
            </nav>
        `;

        // Agregar el contenido de modalHTML al contenedor con id 'fluid'
        document.getElementById('fluid').innerHTML += modalHTML;
    }

    mostrar();
});
