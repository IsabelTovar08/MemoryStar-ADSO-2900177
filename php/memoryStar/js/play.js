document.addEventListener('DOMContentLoaded', function () {
    // var myModal = new bootstrap.Modal(document.getElementById('modalInicio'));
    // myModal.show();
    const boton = document.getElementById('play');
    const botonesJugar = document.getElementById('jugar');

    // Función para aplicar la animación
    function aplicarAnimacion(selector) {
        anime({
            targets: selector,
            opacity: [0, 1],
            translateY: [-50, 0],
            duration: 1500,
            easing: 'easeOutExpo',
        });
    }

    // Función para ocultar y mostrar mensaje
    const ocultarMensaje = document.querySelector('.cerrarMensaje');
    const mensaje = document.querySelector('.mensaje');
    const mostrar = document.querySelector('.mostrarMensaje');

    ocultarMensaje.addEventListener('click', () => {
        mensaje.style.visibility = 'hidden';
        mensaje.style.transition = '0.1s';
    });

    mostrar.addEventListener('click', () => {
        mensaje.style.visibility = 'visible';
        mensaje.style.transition = '0.1s';
    });

    // Función para elegir el modo de juego
// Función para elegir el modo de juego
// function elegirModo() {
//     let resultadoMostrar = `
//         <a href="index.php"><img src="img/iconos/atras.png" alt="" width="50" class="atras"></a>
//         <div class="bienvenido"><img src="img/iconos/logoBienvenido.png" alt="logoMemory" class="logoBienvenido"></div>
//         <h1 class="textoEleccion">Selecciona el modo de Juego</h1>
//         <div class="contenedorOpciones">
//             <img src="img/iconos/jugarSolo.png" class="oJuegos zoom" alt="Imagen 1" id="jugarSolo">
//             <img src="img/iconos/modoVs.png" class="oJuegos zoom" alt="Imagen 2" id="jugarVs">
//             <img src="img/iconos/multijugador.png" class="oJuegos zoom" alt="Imagen 3" id="jugarMultijugador">
//         </div>
//     `;

//     document.getElementById('contenido').innerHTML = resultadoMostrar;
//     aplicarAnimacion('#contenido');

//     document.querySelectorAll('.contenedorOpciones img').forEach(image => {
//         image.addEventListener('click', () => console.log(`Has hecho clic en la imagen con ID: ${image.id}`));
//     });

//     document.getElementById('jugarSolo').addEventListener('click', elegirJuego);
//     document.getElementById('jugarVs').addEventListener('click', elegirJuego);
//     document.getElementById('jugarMultijugador').addEventListener('click', elegirJuego);
// }
// Función para elegir el tipo de juego (Cartas, Secuencia, Asociación)
// Función para elegir el tipo de juego (Cartas, Secuencia, Asociación)
function elegirJuego() {
    let resultadoMostrar = `
       <a href="configurarJuego.php"><img src="img/iconos/atras.png" alt="" class="atras"></a>
            <div class="bienvenido"><img src="img/iconos/segundoMemory.png" alt="logoMemory" class="segundoLogo"></div>
       <h1 class="textoEleccion">¿Qué quieres jugar?</h1>
       <div class="contenedorOpciones">
           <div class="radio-inputs">
               <label id="juegoCartas">
                   <input class="radio-input" type="radio" name="juego" value="Cartas">
                   <span class="radio-tile">
                       <span class="radio-icon">
                           <img src="img/iconos/cartas.png" alt="logoMemory" class="logoInicio">
                       </span>
                       <span class="radio-label">Cartas</span>
                   </span>
               </label>
               <label id="juegoSecuencia">
                   <input class="radio-input" type="radio" name="juego" value="Secuencia">
                   <span class="radio-tile">
                       <span class="radio-icon">
                           <img src="img/iconos/secuencias.png" alt="logoMemory" class="logoInicio">
                       </span>
                       <span class="radio-label">Secuencia</span>
                   </span>
               </label>
               <label id="juegoAsociacion">
                   <input class="radio-input" type="radio" name="juego" value="Asociación">
                   <span class="radio-tile">
                       <span class="radio-icon">
                           <img src="img/iconos/asociar.png" alt="logoMemory" class="logoInicio">
                       </span>
                       <span class="radio-label">Asociación</span>
                   </span>
               </label>
           </div>
       </div>
       <div id="res"></div>
    `;

    document.getElementById('contenido').innerHTML = resultadoMostrar;
    aplicarAnimacion('#contenido');
    const logo = document.querySelector('.segundoLogo').style.width = '15vh';
    const atras = document.querySelector('.atras').style.width = '8vh';


    document.querySelectorAll('input[name="juego"]').forEach(juego => {
        juego.addEventListener('change', function() {
            let juegoSeleccionado = this.value;
            if (juegoSeleccionado === 'Cartas') {
                seleccionarTematicaCartas();
            } else if (juegoSeleccionado === 'Secuencia') {
                seleccionarTematicaSecuencia();
            } else if (juegoSeleccionado === 'Asociación') {
                seleccionarTematicaAsociacion();
            }
        });
    });
}

// Función para seleccionar temática y nivel para Cartas
// Función para seleccionar temática y nivel para Cartas
function seleccionarTematicaCartas() {
    let nivelTematicaHTML = `
       <h1 class="textoEleccion">Selecciona la temática</h1>
       <div class="contenedorOpciones">
           <div class="radio-inputs">
               <label>
                   <input class="radio-input" type="radio" name="tematica" value="Animales">
                   <span class="radio-tile">
                        <span class="radio-icon">
                           <img src="img/iconos/animales.png" alt="logoMemory" class="logoInicio">
                       </span>
                       <span class="radio-label">Animales</span>
                   </span>
               </label>
               <label>
                   <input class="radio-input" type="radio" name="tematica" value="Comida">
                   <span class="radio-tile">
                        <span class="radio-icon">
                           <img src="img/iconos/comida.png" alt="logoMemory" class="logoInicio">
                       </span>
                       <span class="radio-label">Comida</span>
                   </span>
               </label>
               <label>
                   <input class="radio-input" type="radio" name="tematica" value="Paises">
                   <span class="radio-tile">
                        <span class="radio-icon">
                           <img src="img/iconos/paises.png" alt="logoMemory" class="logoInicio">
                       </span>
                       <span class="radio-label">Países</span>
                   </span>
               </label>
           </div>
       </div>
       <h1 class="textoEleccion">Selecciona el nivel de dificultad</h1>
       <div class="contenedorOpciones">
           <div class="radio-inputs">
               <label>
                   <input class="radio-input" type="radio" name="nivel" value="Facil">
                   <span class="radio-tile niveles">
                       <span class="radio-label facil">Fácil</span>
                   </span>
               </label>
               <label>
                   <input class="radio-input" type="radio" name="nivel" value="Medio">
                   <span class="radio-tile niveles inter">
                       <span class="radio-label medio">Intermedio</span>
                   </span>
               </label>
               <label>
                   <input class="radio-input" type="radio" name="nivel" value="Dificil">
                   <span class="radio-tile niveles">
                       <span class="radio-label dificil">Difícil</span>
                   </span>
               </label>
           </div>
       </div>
       <img src="img/iconos/play.png" alt="" class="play zoom" id="procesarJuegoCartas">
    `;

    document.getElementById('res').innerHTML = nivelTematicaHTML;
    aplicarAnimacion('#res');

    document.getElementById('procesarJuegoCartas').addEventListener('click', procesarEleccionCartas);
}

// Función para seleccionar temática y nivel para Secuencia
function seleccionarTematicaSecuencia() {
    let nivelTematicaHTML = `
       <h1 class="textoEleccion">Selecciona la temática</h1>
       <div class="contenedorOpciones">
           <div class="radio-inputs">
               <label>
                   <input class="radio-input" type="radio" name="tematica" value="cMarinas">
                   <span class="radio-tile">
                        <span class="radio-icon">
                           <img src="img/iconos/cMar.png" alt="logoMemory" class="logoInicio">
                       </span>
                       <span class="radio-label">Criaturas Marinas</span>
                   </span>
               </label>
               <label>
                   <input class="radio-input" type="radio" name="tematica" value="Matematicas">
                   <span class="radio-tile">
                        <span class="radio-icon">
                           <img src="img/iconos/matematicasN.png" alt="logoMemory" class="logoInicio">
                       </span>
                       <span class="radio-label">Matemáticas</span>
                   </span>
               </label>
               <label>
                   <input class="radio-input" type="radio" name="tematica" value="Tecnologia">
                   <span class="radio-tile">
                        <span class="radio-icon">
                           <img src="img/iconos/tecnologia.png" alt="logoMemory" class="logoInicio">
                       </span>
                       <span class="radio-label">Tecnología</span>
                   </span>
               </label>
           </div>
       </div>
       <h1 class="textoEleccion">Selecciona el nivel de dificultad</h1>
       <div class="contenedorOpciones">
           <div class="radio-inputs">
               <label>
                   <input class="radio-input" type="radio" name="nivel" value="Facil">
                   <span class="radio-tile niveles">
                       <span class="radio-label facil">Fácil</span>
                   </span>
               </label>
               <label>
                   <input class="radio-input" type="radio" name="nivel" value="Medio">
                   <span class="radio-tile niveles inter">
                       <span class="radio-label medio">Intermedio</span>
                   </span>
               </label>
               <label>
                   <input class="radio-input" type="radio" name="nivel" value="Dificil">
                   <span class="radio-tile niveles">
                       <span class="radio-label dificil">Difícil</span>
                   </span>
               </label>
           </div>
       </div>
       <img src="img/iconos/play.png" alt="" class="play zoom" id="procesarJuegoSecuencia">
    `;

    document.getElementById('res').innerHTML = nivelTematicaHTML;
    aplicarAnimacion('#res');

    document.getElementById('procesarJuegoSecuencia').addEventListener('click', procesarEleccionSecuencia);
}

// Función para seleccionar temática y nivel para Asociación
function seleccionarTematicaAsociacion() {
    let nivelTematicaHTML = `
       <h1 class="textoEleccion">Selecciona la temática</h1>
       <div class="contenedorOpciones">
           <div class="radio-inputs">
               <label>
                   <input class="radio-input" type="radio" name="tematica" value="Matematicas">
                   <span class="radio-tile">
                        <span class="radio-icon">
                           <img src="img/iconos/matematicasN.png" alt="logoMemory" class="logoInicio">
                       </span>
                       <span class="radio-label">Matemáticas</span>
                   </span>
               </label>
               <label>
                   <input class="radio-input" type="radio" name="tematica" value="Deportes">
                   <span class="radio-tile">
                        <span class="radio-icon">
                           <img src="img/iconos/deportes.png" alt="logoMemory" class="logoInicio">
                       </span>
                       <span class="radio-label">Deportes</span>
                   </span>
               </label>
               <label>
                   <input class="radio-input" type="radio" name="tematica" value="Tecnologia">
                   <span class="radio-tile">
                    <span class="radio-icon">
                           <img src="img/iconos/tecnologia.png" alt="logoMemory" class="logoInicio">
                       </span>
                       <span class="radio-label">Tecnología</span>
                   </span>
               </label>
           </div>
       </div>
       <h1 class="textoEleccion">Selecciona el nivel de dificultad</h1>
       <div class="contenedorOpciones">
           <div class="radio-inputs">
               <label>
                   <input class="radio-input" type="radio" name="nivel" value="Facil">
                   <span class="radio-tile niveles">
                       <span class="radio-label facil">Fácil</span>
                   </span>
               </label>
               <label>
                   <input class="radio-input" type="radio" name="nivel" value="Medio">
                   <span class="radio-tile niveles inter">
                       <span class="radio-label medio">Intermedio</span>
                   </span>
               </label>
               <label>
                   <input class="radio-input" type="radio" name="nivel" value="Difícil">
                   <span class="radio-tile niveles">
                       <span class="radio-label dificil">Difícil</span>
                   </span>
               </label>
           </div>
       </div>
       <img src="img/iconos/play.png" alt="" class="play zoom" id="procesarJuegoAsociacion">
    `;

    document.getElementById('res').innerHTML = nivelTematicaHTML;
    aplicarAnimacion('#res');

    document.getElementById('procesarJuegoAsociacion').addEventListener('click', procesarEleccionAsociacion);
}


// Funciones para procesar la elección final de cada juego
function procesarEleccionCartas() {
    procesarEleccion('Cartas');
}

function procesarEleccionSecuencia() {
    procesarEleccion('Secuencia');
}

function procesarEleccionAsociacion() {
    procesarEleccion('Asociación');
}

// Función para procesar la elección final y redirigir
function procesarEleccion(juegoSeleccionado) {
    let tematicaSeleccionada = document.querySelector('input[name="tematica"]:checked');
    let nivelSeleccionado = document.querySelector('input[name="nivel"]:checked');

    if (!tematicaSeleccionada || !nivelSeleccionado) {
        alert("Por favor completa todas las selecciones.");
        return;
    }

    tematicaSeleccionada = tematicaSeleccionada.value;
    nivelSeleccionado = nivelSeleccionado.value;

    console.log(`Juego: ${juegoSeleccionado}, Temática: ${tematicaSeleccionada}, Nivel: ${nivelSeleccionado}`);

    // Redirigir a la página correspondiente
    window.location.href = `juego_${juegoSeleccionado}_${tematicaSeleccionada}_${nivelSeleccionado}.php`;
}


// Función para elegir el tipo de juego (Cartas, Secuencia, Asociación)


    function desplegarNivel() {
        document.body.style.backgroundImage = "url('img/fondos/fondo.jpeg')";
        let resultadoMostrar = `
        <h1 class="textoEleccion">Elige la temática</h1>
        <h1 class="textoEleccion">Elige el nivel de dificultad</h1>
        <div class="contenedorOpciones">
            <div class="radio-inputs">
                <label>
                    <input class="radio-input" type="radio" name="engine">
                    <span class="radio-tile">
                        <span class="radio-icon">
                            <img src="img/iconos/solo.png" alt="logoMemory" class="logoInicio">
                        </span>
                        <span class="radio-label">Fácil</span>
                    </span>
                </label>
                <label>
                    <input class="radio-input" type="radio" name="engine">
                    <span class="radio-tile">
                        <span class="radio-icon">
                            <img src="img/iconos/solo.png" alt="logoMemory" class="logoInicio">
                        </span>
                        <span class="radio-label">Intermedio</span>
                    </span>
                </label>
                <label>
                    <input class="radio-input" type="radio" name="engine">
                    <span class="radio-tile">
                        <span class="radio-icon">
                            <img src="img/iconos/solo.png" alt="logoMemory" class="logoInicio">
                        </span>
                        <span class="radio-label">Difícil</span>
                    </span>
                </label>
            </div>
        </div>
    `;

        document.getElementById('res').innerHTML = resultadoMostrar;

        // aplicarAnimacion('#res');

    }
   
    // Función para el modo Vs
    function vs() {
        let resultadoMostrar = `
            <img src="img/iconos/atras.png" alt="" class="atras" width="50">
            <div class="bienvenido"><img src="img/iconos/segundoMemory.png" alt="logoMemory" class="segundo"></div>
            <h1 class="textoEleccion">Selecciona una opción</h1>
            <div class="contenedorOpciones">
                <img src="img/iconos/unirseVs.png" class="oJuegos zoom" alt="Imagen 1" id="unirseVs">
                <img src="img/iconos/crearVs.png" class="oJuegos zoom" alt="Imagen 2" id="crearVs">
            </div>
        `;

        document.getElementById('contenido').innerHTML = resultadoMostrar;
        aplicarAnimacion('#contenido');

        document.querySelector('.atras').addEventListener('click', elegirModo);
    const atras = document.querySelector('.atras').style.width = '8vh';

        document.getElementById('unirseVs').addEventListener('click', unirse);
        document.getElementById('crearVs').addEventListener('click', elegirJuego);
    }

    // Función para multijugador
    function multijugador() {
        let resultadoMostrar = `
            <img src="img/iconos/atras.png" alt="" class="atras" width="50">
            <div class="bienvenido"><img src="img/iconos/segundoMemory.png" alt="logoMemory" class="segundo"></div>
            <h1 class="textoEleccion">Selecciona una opción</h1>
            <div class="contenedorOpciones">
                <img src="img/iconos/unirseSala.png" class="oJuegos zoom" alt="Imagen 1" id="unirseSala">
                <img src="img/iconos/crearSala.png" class="oJuegos zoom" alt="Imagen 2" id="crearSala">
            </div>
        `;

        document.getElementById('contenido').innerHTML = resultadoMostrar;
        aplicarAnimacion('#contenido');

        document.querySelector('.atras').addEventListener('click', elegirModo);
        document.getElementById('unirseSala').addEventListener('click', unirse);
        document.getElementById('crearSala').addEventListener('click', elegirJuego);
    }

    // Función para unirse a una sala
    function unirse() {
        let resultadoMostrar = `
            <img src="img/iconos/atras.png" alt="" class="atras" width="50">
            <div class="bienvenido"><img src="img/iconos/segundoMemory.png" alt="logoMemory" class="segundo"></div>
            <div class="unirse">
                <h1 class="textoEleccion">Ingresa el código de invitación</h1>
                <div class="formField">
                    <input id="codigo" required="" type="text" />
                    <span>Código de invitación</span>
                    <img src="img/iconos/camara.png" alt="" width="40">
                </div>
                <img src="img/iconos/play.png" alt="" class="play zoom" id="play" width="200">
            </div>
        `;

        document.getElementById('contenido').innerHTML = resultadoMostrar;
        aplicarAnimacion('#contenido');
    }

    // Asignar evento al botón "play"
    document.getElementById('jugarSolo').addEventListener('click', elegirJuego);
    document.getElementById('jugarVs').addEventListener('click', elegirJuego);
    document.getElementById('jugarMultijugador').addEventListener('click', elegirJuego);

    // Función para la navegación con el botón de retroceso
    window.addEventListener('popstate', e => {
        console.log('Navegación: ' + history.state);
    });
});