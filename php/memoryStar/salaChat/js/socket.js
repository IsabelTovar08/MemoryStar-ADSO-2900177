let socket;
let userName;
let codigoSala;
let nombreSala;
let capacidadSala;
let id_de_usuario;
let rutaSeleccionada;

let notificationsContainer = document.getElementById('usuarios');
let abandono = document.getElementById('notifications-container');
const chat = document.getElementById('chat');
const notification = document.getElementById('notification');
const audio = new Audio('notificacion.mp3');
const audioChat = new Audio('chat.mp3');
let jugadores = [];

const endChatButton = document.createElement('button');
endChatButton.innerText = "Iniciar Chat";
endChatButton.classList.add('botton-iniciar');
endChatButton.style.display = "none";

const buttonContainer = document.createElement('div');
buttonContainer.classList.add('room-buttons');
buttonContainer.appendChild(endChatButton);
document.body.insertBefore(buttonContainer, document.body.firstChild);

async function obtenerDatosUsuario(callback, manejarError) {
    try {
        const response = await fetch('../procesos/login/obtenerUsuario.php');
        if (response.ok) {
            const data = await response.json();
            if (data.success && data.usuario) {
                callback(data); // Llama al callback con los datos obtenidos
            } else {
                manejarError(); // Llama al manejador de errores
            }
        } else {
            console.log(`Error al obtener datos del servidor: Código ${response.status}`);
        }
    } catch (error) {
        console.log(`Error al obtener datos del usuario: ${error.message}`);
    }
}

const contenedorUnirseSala = document.querySelector('.unimer-sala');
const contenedorCrearSala = document.querySelector('.crear-sala');
const cajaUnirme = document.querySelector('.caja-unirme');
const cajaCrear = document.querySelector('.caja-crear');

contenedorCrearSala.addEventListener('click', () => {
    cajaUnirme.style.display = 'none';
    cajaCrear.style.display = 'inline-block';

    const formCrearSala = document.getElementById('form-crear-sala');
    if (formCrearSala) {
        formCrearSala.addEventListener('submit', (e) => {
            e.preventDefault();

            obtenerDatosUsuario(
                (data) => {
                    const nombreSala = document.getElementById('nombre').value;
                    const dificultad = document.querySelector('input[name="nivel"]:checked').value;
                    const tema = document.querySelector('input[name="juegoOrdenar"]:checked').value;

                    if (nombreSala) {
                        rutaSeleccionada = `../juego/juegoOrdenar/Memorix${tema}${dificultad}.html`;
                        const tematica = document.getElementById('tematica');
                        tematica.textContent = `${tema}`;

                        const dificultadHTML = document.getElementById('dificultad');
                        dificultadHTML.textContent = `${dificultad}`;
                        socket.send(JSON.stringify({
                            type: 'crearSala',
                            usuario: data.usuario,
                            id_usuario: data.id_usuario,
                            nombreSala: nombreSala,
                            tematica: tema,
                            dificultad: dificultad,
                            rutaJuego: rutaSeleccionada
                        }));
                    } else {
                        //alert("Por favor, ingresa el nombre de la sala.");
                        Swal.fire({
                            
                            text: `Por favor, ingresa el nombre de la sala.`,
                            icon: 'error', // Tipo de icono (success, error, warning, info, question)
                            background: '#1a1a2e', // Fondo oscuro acorde al diseño dinámico
                            color: '#00d0ff', // Texto llamativo de color rojo vibrante
                            confirmButtonColor: '#0f3460', // Botón con tono azul oscuro
                            cancelButtonColor: '#16213e', // Botón cancelar (si se usa) en azul más tenue
                            width: 350,
                            customClass: {
                              popup: 'memorystar-popup',
                              title: 'memorystar-title',
                              content: 'memorystar-content',
                            }
                        });
                    }
                },
                () => {
                    alert("Debes iniciar sesión para continuar.");
                }
            );
        });
    }
});
function inicioSala() {

}
contenedorUnirseSala.addEventListener('click', () => {
    cajaUnirme.style.display = 'inline-block';
    cajaCrear.style.display = 'none';

})
const formUnirseSala = document.getElementById('form-unirse-sala');
if (formUnirseSala) {
    formUnirseSala.addEventListener('submit', (e) => {
        e.preventDefault();

        obtenerDatosUsuario(
            (data) => {
                const codigoSala = document.getElementById('codigo').value;

                if (codigoSala) {
                    socket.send(JSON.stringify({
                        type: 'unirseSala',
                        codigoSala: codigoSala.toUpperCase(),
                        id_usuario: data.id_usuario
                    }));
                } else {
                    //alert("Por favor, ingresa el código de la sala.");
                    Swal.fire({
                        
                        text: `Por favor, ingresa el código de la sala.`,
                        icon: 'error', // Tipo de icono (success, error, warning, info, question)
                        background: '#1a1a2e', // Fondo oscuro acorde al diseño dinámico
                        color: '#00d0ff', // Texto llamativo de color rojo vibrante
                        confirmButtonColor: '#0f3460', // Botón con tono azul oscuro
                        cancelButtonColor: '#16213e', // Botón cancelar (si se usa) en azul más tenue
                        width: 350,
                        customClass: {
                          popup: 'memorystar-popup',
                          title: 'memorystar-title',
                          content: 'memorystar-content',
                        }
                    });                }
            },
            () => {
                //alert("Debes iniciar sesión para continuar.");  // Acción personalizada si el usuario no ha iniciado sesión
                Swal.fire({
                            
                    text: `Debes iniciar sesión para continuar.`,
                    icon: 'error', // Tipo de icono (success, error, warning, info, question)
                    background: '#1a1a2e', // Fondo oscuro acorde al diseño dinámico
                    color: '#00d0ff', // Texto llamativo de color rojo vibrante
                    confirmButtonColor: '#0f3460', // Botón con tono azul oscuro
                    cancelButtonColor: '#16213e', // Botón cancelar (si se usa) en azul más tenue
                    width: 350,
                    customClass: {
                      popup: 'memorystar-popup',
                      title: 'memorystar-title',
                      content: 'memorystar-content',
                    }
                });
            }
        );
    });
}
;



function initializeSocket() {
    socket = new WebSocket("ws://192.168.101.88:8080");

    socket.onopen = () => {
        console.log("Conectado al WebSocket");
    };

    socket.onmessage = (event) => {
        let data = JSON.parse(event.data);

        switch (data.type) {
            case 'salaCreada':
                handlecrearSala(data);
                console.log(data)
                break;
            case 'unionExitosa':
                handleRoomJoined(data);
                console.log(data)
                break;
            case 'error':
                //alert(data.message);
                Swal.fire({
                    
                    text: `${data.message}`,
                    icon: 'error', // Tipo de icono (success, error, warning, info, question)
                    background: '#1a1a2e', // Fondo oscuro acorde al diseño dinámico
                    color: '#00d0ff', // Texto llamativo de color rojo vibrante
                    confirmButtonColor: '#0f3460', // Botón con tono azul oscuro
                    cancelButtonColor: '#16213e', // Botón cancelar (si se usa) en azul más tenue
                    width: 350,
                    customClass: {
                      popup: 'memorystar-popup',
                      title: 'memorystar-title',
                      content: 'memorystar-content',
                    }
                });                break;
            case 'chat':
                let text = document.createElement('div');
                text.classList.add('other');
                text.innerText = data.message;
                let from = document.createElement('span');
                from.classList.add('nombre-enviado');
                from.innerText = data.from;

                document.getElementById('messages').appendChild(text);
                document.getElementById('messages').appendChild(from);

                scrollToBottom();
                audioChat.play();

                if (chat.style.display !== 'block') {
                    notification.style.display = 'block';
                    audio.play();
                }
                break;
            case 'newConnection':
                createUserNotification(data);
                console.log(data)
                notificacionNuevo(data.message);
                break;
            case 'disconnection':
                usuarioAbandono(data);
                break;
            case 'chatEnded':
                handleChatEnded();
                break;
            case 'historial':
                data.historial.forEach(notification => {
                    historial(notification.usuario, notification.message, notification.isAdmin, notification.estado, notification.idUsuario);
                });
                break;
            case 'recibirRuta':
                // rutaSeleccionada = data.rutaJuego;
                console.log("data ruta " + data.rutaJuego)
                break;
            case 'startGame':
                sessionStorage.setItem('gameData', JSON.stringify(data));
                sessionStorage.setItem('codigoSala', codigoSala);
                console.log(data)
                console.log(data.ruta)
                window.location.href = `${data.ruta}?modo=multijugador&codigo=${codigoSala}`;
                break;
        }
    };

    socket.onclose = () => {
        console.log("Conexión cerrada");
    };

    socket.onerror = (error) => {
        console.error("Error en WebSocket:", error);
    };
}

function handlecrearSala(data) {
    codigoSala = data.codigoSala;
    document.getElementById('estiloBootstrap').disabled = false;
    document.getElementById('estiloChat').disabled = false;
    document.getElementById('estiloEspera').disabled = false;
    document.getElementById('estiloCrear').disabled = true;

    //alert(`Sala creada! Código: ${codigoSala}`);
    //Swal(`Sala creada! Código: ${codigoSala}`);
    Swal.fire({
        title: 'Sala creada!',
        text: `Código: ${codigoSala}`,
        //icon: 'success', // Tipo de icono (success, error, warning, info, question)
        background: '#1a1a2e', // Fondo oscuro acorde al diseño dinámico
        color: '#00d0ff', // Texto llamativo de color rojo vibrante
        confirmButtonColor: '#0f3460', // Botón con tono azul oscuro
        cancelButtonColor: '#16213e', // Botón cancelar (si se usa) en azul más tenue
        width: 350,
        customClass: {
          popup: 'memorystar-popup',
          title: 'memorystar-title',
          content: 'memorystar-content',
        }
    });
      
    
    if (data.esAnfitrion) {
        endChatButton.style.display = "block";

    }
    obtenerUsuario(data);
    const name = document.getElementById('name');
    name.innerHTML = `
        <h1>${data.usuario}</h1>
    `;
    console.log(data)
    agregarInfoSala(data)
    generarQR();
}
function agregarInfoSala(data){
    const cog = document.getElementById('codigoSalaModal');
    cog.textContent = data.codigoSala;

    const nombre_sala = document.getElementById('nombre_sala');
    nombre_sala.textContent = data.nombreSala;

    const codigo_sala = document.getElementById('codigo_sala');
    codigo_sala.textContent = data.codigoSala;

    const tematica = document.getElementById('tematica');
    tematica.textContent = data.tematica;

    const dificultadHTML = document.getElementById('dificultad');
    dificultadHTML.textContent = data.dificultad;
}
function generarQR() {
    const contenedor = document.getElementById('QR');
    const codigoElement = document.getElementById('codigoSalaModal').textContent; 
    console.log(codigoElement)
    
    new QRCode(contenedor, codigoElement);

    const copiar = document.querySelector('.botto-copiar');
    copiar.addEventListener('click', () => {
        navigator.clipboard.writeText(codigoElement)
            .then(() => {
                console.log('Texto copiado');
            })
            .catch(err => {
                console.error('No se pudo copiar', err);
            });
    });
};

function obtenerUsuario(data) {
    socket.send(JSON.stringify({
        type: 'manejoUnion',
        usuario: data.usuario,
        id_usuario: data.id_usuario
    }));
}
function handleRoomJoined(data) {
    codigoSala = data.codigoSala;
    obtenerDatosUsuario((data) => {
        //alert(`Te has unido a la sala ${codigoSala}`);
        Swal.fire({
            title: 'Te has unido a la sala',
            text: `Código: ${codigoSala}`,
            icon: 'success', // Tipo de icono (success, error, warning, info, question)
            background: '#1a1a2e', // Fondo oscuro acorde al diseño dinámico
            color: '#00d0ff', // Texto llamativo de color rojo vibrante
            confirmButtonColor: '#0f3460', // Botón con tono azul oscuro
            cancelButtonColor: '#16213e', // Botón cancelar (si se usa) en azul más tenue
            width: 350,
            customClass: {
              popup: 'memorystar-popup',
              title: 'memorystar-title',
              content: 'memorystar-content',
            }
        });

        document.getElementById('estiloBootstrap').disabled = false;
        document.getElementById('estiloChat').disabled = false;
        document.getElementById('estiloEspera').disabled = false;
        document.getElementById('estiloCrear').disabled = true;
        const name = document.getElementById('name');
        name.innerHTML = `
            <h1>${data.usuario}</h1>
        `;
        obtenerUsuario(data);
    },
        () => {
            //alert("Por favor inicia sesión para continuar.")
            Swal.fire({
            
                text: `Por favor inicia sesión para continuar.`,
                icon: 'error', // Tipo de icono (success, error, warning, info, question)
                background: '#1a1a2e', // Fondo oscuro acorde al diseño dinámico
                color: '#00d0ff', // Texto llamativo de color rojo vibrante
                confirmButtonColor: '#0f3460', // Botón con tono azul oscuro
                cancelButtonColor: '#16213e', // Botón cancelar (si se usa) en azul más tenue
                width: 350,
                customClass: {
                  popup: 'memorystar-popup',
                  title: 'memorystar-title',
                  content: 'memorystar-content',
                }
            });

        }
    );
    agregarInfoSala(data);
    generarQR();
}

function createUserNotification(data) {
    const numero = document.querySelector('.numero-usuario');
    numero.textContent = data.contadorUsuarios;
    const connectionDiv = document.createElement('div');
    connectionDiv.classList.add('contenedor-usuario');
    connectionDiv.setAttribute('data-username', data.usuario); // Añadir identificador único
    const roleText = data.isAdmin ? "<span style='font-weight: bold;'>(Administrador)</span>" : "";

    connectionDiv.innerHTML = `
        <div class="usuario">
            <div class="posicion-perfil">
                <div class="perfil">
                    <img src="img/images.jpeg" alt="perfil">
                </div>
            </div>
            <div class="contexto-usuario">
                <div style="font-size: .8em;">
                    <div class="nombre">
                        <h2>${data.usuario}</h2>
                    </div>
                    <div class="descripcion">
                        <h6>${roleText} ${data.estado}</h6>
                    </div>
                </div>
                <div class="conte-diamante-img">
                    <div class="diamante">
                        <img src="../img/iconos/segundoMemory.png" alt="" width="20">
                    </div>
                </div>
            </div>
        </div>`;

    // Agregar la notificación al contenedor
    notificationsContainer.appendChild(connectionDiv);
}

endChatButton.addEventListener('click', () => {
    socket.send(JSON.stringify({
        type: 'iniciarjuego',
        codigoSala: codigoSala,
        rutaJuego: rutaSeleccionada
    }));

    console.log(codigoSala);
});

function notificacionNuevo(message) {
    const connectionDiv = document.createElement('div');
    connectionDiv.classList.add('user-notification');
    connectionDiv.innerHTML = `
        <span class="notification-text">${message}</span>
        <button class="close-notification">×</button>
    `;
    connectionDiv.querySelector('.close-notification').addEventListener('click', () => {
        connectionDiv.classList.add('fade-out');
        setTimeout(() => connectionDiv.remove(), 300);
    });
    abandono.appendChild(connectionDiv);
}

function usuarioAbandono(data) {
    const connectionDiv = document.querySelector(`.contenedor-usuario[data-username="${data.user}"]`);
    if (connectionDiv) {
        connectionDiv.remove();
    }

    const disconnectionDiv = document.createElement('div');
    disconnectionDiv.classList.add('user-notification');
    disconnectionDiv.innerHTML = `
        <span class="notification-text">${data.message}</span>
        <button class="close-notification">×</button>
    `;
    disconnectionDiv.querySelector('.close-notification').addEventListener('click', () => {
        disconnectionDiv.classList.add('fade-out');
        setTimeout(() => disconnectionDiv.remove(), 300);
    });
    abandono.appendChild(disconnectionDiv);
}

function historial(usuario, message, isAdmin, estado, idUsuario) {
    const connectionDiv = document.createElement('div');
    connectionDiv.classList.add('contenedor-usuario');
    const roleText = isAdmin ? "<span style='font-weight: bold;'>(Administrador)</span>" : "";

    connectionDiv.innerHTML = `
        <div class="usuario">
            <div class="posicion-perfil">
                <div class="perfil">
                    <img src="img/images.jpeg" alt="perfil">
                </div>
            </div>
            <div class="contexto-usuario">
                <div style="font-size: .8em;">
                    <div class="nombre">
                        <h2>${usuario}</h2>
                    </div>
                    <div class="descripcion">
                        <h6>${roleText} ${estado}</h6>
                    </div>
                </div>
                <div class="conte-diamante-img">
                    <div class="diamante">
                        <img src="../img/iconos/segundoMemory.png" alt="" width="20">
                    </div>
                </div>
            </div>
        </div>
    `;
    notificationsContainer.appendChild(connectionDiv);
}

function enviarMensaje() {
    let message = document.getElementById('message').value.trim();
    document.getElementById('message').value = '';

    if (message !== '') {
        let text = document.createElement('div');
        text.classList.add('me');
        text.innerText = message;
        document.getElementById('messages').appendChild(text);
        obtenerDatosUsuario(
            (data) => {
                socket.send(JSON.stringify({
                    type: 'chat',
                    message: message,
                    from: data.usuario
                }));
            },
            () => {
                socket.send(JSON.stringify({
                    type: 'chat',
                    message: message,
                    from: userName
                }));
            }
        );
        scrollToBottom();
    }

}

// Comprobar si el elemento existe antes de agregar el event listener
const sendButton = document.getElementById('send');
const messageInput = document.getElementById('message');
const messagesContainer = document.getElementById('messages');

// Agregar el evento de click al botón "send" si existe
if (sendButton) {
    sendButton.addEventListener('click', () => {
        enviarMensaje();
    });
}

// Agregar el evento de "keypress" al input "message" si existe
if (messageInput) {
    messageInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            enviarMensaje();
        }
    });
}

// Agregar el evento de "click" al contenedor de mensajes si existe
if (messagesContainer) {
    messagesContainer.addEventListener('click', function () {
        const mensaje = new SpeechSynthesisUtterance(texto);

        mensaje.lang = 'es-ES';
        mensaje.rate = 1;
        mensaje.pitch = 1;
        mensaje.volume = 1;

        speechSynthesis.speak(mensaje);
    });
}

function scrollToBottom() {
    const messages = document.getElementById('messages');
    setTimeout(() => {
        messages.scrollTop = messages.scrollHeight;
    }, 0);
}

initializeSocket();