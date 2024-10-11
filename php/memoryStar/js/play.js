document.addEventListener('DOMContentLoaded', function () {
    // var myModal = new bootstrap.Modal(document.getElementById('modalInicio'));
    // myModal.show();
    const boton = document.querySelector('.play');
    const botonesJugar = document.getElementById('jugar');


    // Función para ocultar y mostrar mensaje
    // const ocultarMensaje = document.querySelector('.cerrarMensaje');
    // const mensaje = document.querySelector('.contenido-mensaje');
    // const mostrar = document.querySelector('.mostrarMensaje');

    // ocultarMensaje.addEventListener('click', () => {
    //     mensaje.style.visibility = 'hidden';
    //     mensaje.style.transition = '0.1s';
    // });

    // mostrar.addEventListener('click', () => {
    //     mensaje.style.visibility = 'visible';
    //     mensaje.style.transition = '0.1s';
    // });

    // Función para elegir el modo de juego
    function elegirJuego() {
        let resultadoMostrar = `
                <a href="configurarJuego.php"><img src="img/iconos/atrasN.png" alt="" class="atras"></a>
                <h1 class="game-title">Configurar Juego</h1>
                <div class="col row">
                    <div class="col-4 sala">
                        <h1 class="textoEleccion">Elje tu avatar</h1>
                        <div id="carouselExampleIndicators" class="carousel slide carousel-container"
                            data-bs-interval="false">
                            <div class="carousel-indicators">
                                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0"
                                    class="active" aria-current="true" aria-label="Slide 1"></button>
                                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"
                                    aria-label="Slide 2"></button>
                                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"
                                    aria-label="Slide 3"></button>
                            </div>
                            <div class="carousel-inner carousel-images">
                                <div class="carousel-item active">
                                    <img src="img/gif/esqueleto.gif" class="d-block w-100" alt="..." style="padding:5%">
                                    <input type="radio" id="img1" name="carousel" value="Imagen 1" checked>
                                </div>
                                <div class="carousel-item">
                                    <img src="img/gif/calabaza.gif" class="d-block w-100" alt="...">
                                    <input type="radio" id="img2" name="carousel" value="Imagen 2">
                                </div>
                                <div class="carousel-item">
                                    <img src="img/gif/hongo.gif" class="d-block w-100" alt="..." style="padding:19%;">
                                    <input type="radio" id="img3" name="carousel" value="Imagen 3">
                                </div>
                            </div>
                            <button class="carousel-control-prev" type="button"
                                data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Previous</span>
                            </button>
                            <button class="carousel-control-next" type="button"
                                data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Next</span>
                            </button>
                        </div>
                        <div class="button-container">
                            <div class="btn-accept"></div>
                        </div>
                        <div class="boton-avatar ">
                            <button class="btn" onclick="seleccionarImagen()">Seleccionar</button>
                        </div>
 
                    </div>
                    <div class="col-7 sala" id="juego">
        
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

                    </div>
                </div>
                
        `;
    
        document.getElementById('contenido').innerHTML = resultadoMostrar;
    
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

    // window.onload = elegirJuegoSala;
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
                                    <h6>Planetscape </h6>
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

        document.getElementById('res').innerHTML = nivelTematicaHTML;
        document.querySelector('.play').style.width = '20vh';
        document.getElementById('procesarJuegoCartas').addEventListener('click', procesarEleccionCartas);
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

        document.getElementById('res').innerHTML = nivelTematicaHTML;
        document.querySelector('.play').style.width = '20vh';
        document.getElementById('procesarJuegoSecuencia').addEventListener('click', procesarEleccionSecuencia);
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
        window.location.href = `${juegoSeleccionado}${tematicaSeleccionada}${nivelSeleccionado}.html`;
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

    function multijugador() {
        let resultadoMostrar = `
            <a href="configurarJuego.php"><img src="img/iconos/atrasN.png" alt="" class="atras"></a>
            <div class="bienvenido"><img src="img/iconos/segundoMemory.png" alt="logoMemory" class="segundoLogo"></div>
            <h1 class="textoEleccion">Selecciona una opción</h1>
            <div class="contenedorOpciones">
                <img src="img/iconos/unirseSala.png" class="oJuegos zoom" alt="Imagen 1" id="unirseSala">
                <img src="img/iconos/crearSala.png" class="oJuegos zoom" alt="Imagen 2" id="crearSala">
            </div>
        `;

        document.getElementById('contenido').innerHTML = resultadoMostrar;

        document.getElementById('unirseSala').addEventListener('click', unirse);
        document.getElementById('crearSala').addEventListener('click', crearSala);
    }
    function crearSala() {
        window.location.href = `crearSala.php`
    }
    // Función para unirse a una sala
    function unirse() {
        let resultadoMostrar = `
            <div class="bienvenido"><img src="img/iconos/segundoMemory.png" alt="logoMemory" class="segundoLogo"></div>
                <h1 class="textoEleccion">Ingresa el código de invitación</h1>
            <div class="unirse">
                <div class="">
                    <input class="form-control" id="codigo" required="" type="text" />
                </div>
                <img src="img/iconos/play.png" alt="" class="play zoom" id="play" width="200">
            </div>
        `;

        document.getElementById('contenido').innerHTML = resultadoMostrar;
        const logo = document.querySelector('.segundoLogo').style.width = '15vh';
        const atras = document.querySelector('.atras').style.width = '8vh';
    }

    // Asignar evento al botón "play"
    document.getElementById('jugarSolo').addEventListener('click', elegirJuego);
    document.getElementById('jugarMultijugador').addEventListener('click', multijugador);

    // Función para la navegación con el botón de retroceso
    window.addEventListener('popstate', e => {
        console.log('Navegación: ' + history.state);
    });
});