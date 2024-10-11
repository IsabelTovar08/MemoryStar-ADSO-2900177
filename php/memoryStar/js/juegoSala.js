document.addEventListener('DOMContentLoaded', function () {
    // Función para elegir el modo de juego
    function elegirJuegoSala() {
        let resultadoMostrar = `
            <h1 class="textoEleccion">¿Qué quieres jugar?</h1>
            <div class="tarjetas-container">
                <div class="option juegoUno" data-bs-toggle="modal" data-bs-target="#espacial">
                    <input type="radio" name="tipoJuego" id="juegoEspacial" value="JuegoEspacial">
                    <label class="tarjetaOpcion" for="juegoEspacial">
                        <img src="img/gif/espacial.gif" alt="">
                    </label>
                    <div class="romboide">
                        <h6>Planetscape</h6>
                    </div>
                </div>                
                <div class="option" data-bs-toggle="modal" data-bs-target="#ordenar">
                    <input type="radio" name="tipoJuego" id="juegoOrdenar" value="JuegoOrdenar">
                    <label class="tarjetaOpcion" for="juegoOrdenar">
                        <img src="img/gif/memorizar.gif" alt="">
                    </label>
                    <div class="romboide">
                         <h6>Memorix</h6>
                    </div>
                </div>
            </div>
            <div id="res"></div>
        `;
    
        document.getElementById('juegoSala').innerHTML = resultadoMostrar;
    
        // Corregido el nombre aquí
        document.querySelectorAll('input[name="tipoJuego"]').forEach(juego => {
            juego.addEventListener('change', function () {
                let juegoSeleccionado = this.value;
                if (juegoSeleccionado === 'JuegoEspacial') {
                    seleccionarTematicaCartas();
                } else if (juegoSeleccionado === 'JuegoOrdenar') {
                    seleccionarTematicaSecuencia();
                }
            });
        });
    }

    // Función para seleccionar temática y nivel para Cartas
    // Función para seleccionar temática y nivel para Cartas
    function seleccionarTematicaCartas() {
        let nivelTematicaHTML = `
       <h1 class="textoEleccion">Selecciona la temática</h1>
             <div class="tarjetas-container">
                            <div class="option juegoUno">
                                <input type="radio" name="tipoJuegoEspacial" id="cartas" value="Cartas">
                                <label class="tarjetaOpcion" for="cartas">
                                    <img src="img/gif/espacial.gif" alt="">
                                </label>
                                <div class="romboide">
                                    <h6>supervivencia estelar</h6>
                                </div>
                            </div>
                            <div class="option">
                                <input type="radio" name="tipoJuegoEspacial" id="arma" value="Arma">
                                <label class="tarjetaOpcion" for="arma">
                                    <img src="img/gif/memorizar.gif" alt="">
                                </label>
                                <div class="romboide">
                                    <h6>Memorix</h6>
                                </div>
                            </div>
                        </div>
       <img src="img/iconos/play.png" alt="" class="play zoom" id="procesarJuegoCartas">
    `;

        document.getElementById('res').innerHTML = nivelTematicaHTML;    document.getElementById('procesarJuegoCartas').addEventListener('click', procesarEleccionCartas);
    }

    // Función para seleccionar temática y nivel para Secuencia
    function seleccionarTematicaSecuencia() {
        let nivelTematicaHTML = `
       <h1 class="textoEleccion">Selecciona la temática</h1>
                               <div class="col row">
                            <div class="col">
                                <h1 class="textoEleccion">Elije la temática</h1>
                                <div class="tarjetas-container">
                                    <div class="option quimica">
                                        <input type="radio" name="juegoOrdenar" id="ordenarQuimica"
                                            value="Quimica">
                                        <label class="tarjetaOpcion" for="ordenarQuimica">
                                            <img src="img/iconos/quimica.png" alt="">
                                        </label>
                                        <div class="romboide">
                                            <h6>QuimiLab</h6>
                                        </div>
                                    </div>
                                    <div class="option habitacion">
                                        <input type="radio" name="juegoOrdenar" id="ordenarHabitacion"
                                            value="Habitacion">
                                        <label class="tarjetaOpcion" for="ordenarHabitacion">
                                            <img src="img/iconos/habitacion.png" alt="">
                                        </label>
                                        <div class="romboide">
                                            <h6>MagicRoom</h6>
                                        </div>
                                    </div>
                                </div>
                                <div class="tarjetas-container">
                                    <div class="option oficina">
                                        <input type="radio" name="juegoOrdenar" id="ordenarOficina"
                                            value="Oficina">
                                        <label class="tarjetaOpcion" for="ordenarOficina">
                                            <img src="img/iconos/oficina.png" alt="">
                                        </label>
                                        <div class="romboide">
                                            <h6>OfiMundo</h6>
                                        </div>
                                    </div>
                                    <div class="option biblioteca">
                                        <input type="radio" name="juegoOrdenar" id="ordenarBiblioteca"
                                            value="Biblioteca">
                                        <label class="tarjetaOpcion" for="ordenarBiblioteca">
                                            <img src="img/iconos/libros.png" alt="">
                                        </label>
                                        <div class="romboide">
                                            <h6>Bookify</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col">
                                <h1 class="textoEleccion">Elije la dificultad</h1>
                                <div class="tarjetas-container">
                                    <div class="option facil">
                                        <input type="radio" name="nivel" id="nivelFacil" value="Facil">
                                        <label class="tarjetaOpcion" for="nivelFacil">
                                            <img src="img/iconos/facil.png" alt="">
                                        </label>
                                        <div class="romboide">
                                            <h6>Básico</h6>
                                        </div>
                                    </div>
                                    <div class="option medio">
                                        <input type="radio" name="nivel" id="nivelMedio" value="Medio">
                                        <label class="tarjetaOpcion" for="nivelMedio">
                                            <img src="img/iconos/medio (2).png" alt="">
                                        </label>
                                        <div class="romboide">
                                            <h6>Desafiante</h6>
                                        </div>
                                    </div>
                                </div>
                                <div class="tarjetas-container">
                                    <div class="option dificil">
                                        <input type="radio" name="nivel" id="nivelDificil" value="Dificil">
                                        <label class="tarjetaOpcion" for="nivelDificil">
                                            <img src="img/iconos/dificill.png" alt="">
                                        </label>
                                        <div class="romboide">
                                            <h6>Pro</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
       <img src="img/iconos/play.png" alt="" class="play zoom" id="procesarJuegoSecuencia">
    `;

        document.getElementById('res').innerHTML = nivelTematicaHTML;    document.getElementById('procesarJuegoSecuencia').addEventListener('click', procesarEleccionSecuencia);
    }


    // Funciones para procesar la elección final de cada juego
    function procesarEleccionCartas() {
        procesarEleccionEspacial('Espacial');
    }

    function procesarEleccionSecuencia() {
        procesarEleccion('ordenar');
    }

    // Función para procesar la elección final y redirigir
    function procesarEleccion(juegoSeleccionado) {
        let tematicaSeleccionada = document.querySelector('input[name="juegoOrdenar"]:checked');
        let nivelSeleccionado = document.querySelector('input[name="nivel"]:checked');

        if (!tematicaSeleccionada || !nivelSeleccionado) {
            alert("Por favor completa todas las selecciones.");
            return;
        }

        tematicaSeleccionada = tematicaSeleccionada.value;
        nivelSeleccionado = nivelSeleccionado.value;

        console.log(`Juego: ${juegoSeleccionado}, Temática: ${tematicaSeleccionada}, Nivel: ${nivelSeleccionado}`);

        // Redirigir a la página correspondiente
        window.location.href = `${juegoSeleccionado}${tematicaSeleccionada}${nivelSeleccionado}.php`;
    }
    function procesarEleccionEspacial(juegoSeleccionado) {
        let tematicaSeleccionada = document.querySelector('input[name="tipoJuegoEspacial"]:checked');

        if (!tematicaSeleccionada) {
            alert("Por favor completa todas las selecciones.");
            return;
        }

        tematicaSeleccionada = tematicaSeleccionada.value;

        console.log(`Juego: ${juegoSeleccionado}, Temática: ${tematicaSeleccionada}`);

        // Redirigir a la página correspondiente
        window.location.href = `${juegoSeleccionado}${tematicaSeleccionada}.php`;
    }
    window.onload = elegirJuegoSala;

    // Asignar evento al botón "play"
});