let socket;
let userName;
let codigoSala;
let nombreSala;
let capacidadSala;
let id_de_usuario;
let rutaSeleccionada = '';

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

// createRoomButton.addEventListener('click', () => {
//     obtenerDatosUsuario(
//         (data) => {
//             const nombreSala = prompt("Ingresa el nombre de la sala:");
//             const capacidadSala = prompt("Ingresa la capacidad de la sala:");
//             if (nombreSala && capacidadSala) {
//                 socket.send(JSON.stringify({
//                     type: 'crearSala',
//                     usuario: data.usuario,
//                     id_usuario: data.id_usuario,
//                     nombreSala: nombreSala,
//                     capacidadSala: capacidadSala
//                 }));

//             } else {
//                 alert("Por favor, ingresa el nombre y la capacidad de la sala.");
//             }
//         },
//         () => {
//             alert("Debes iniciar sesión para continuar."); // Acción personalizada
//         }
//     );
// });


const contenedorUnirseSala = document.querySelector('.unimer-sala');
const contenedorCrearSala = document.querySelector('.crear-sala');
const cajaUnirme = document.querySelector('.caja-unirme');
const cajaCrear = document.querySelector('.caja-crear');

contenedorCrearSala.addEventListener('click', () => {
    cajaUnirme.style.display = 'none';
    cajaCrear.style.display = 'inline-block';

    // Solo cuando la caja para crear sala se muestra, buscamos el formulario
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
                        localStorage.setItem('rutaSeleccionada', rutaSeleccionada);
                        console.log('Ruta seleccionada:', rutaSeleccionada);
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
                            dificultad: dificultad
                        }));
                    } else {
                        alert("Por favor, ingresa el nombre de la sala.");
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
// Cuando se hace clic en el contenedor de unirse a una sala
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
                    alert("Por favor, ingresa el código de la sala.");
                }
            },
            () => {
                alert("Debes iniciar sesión para continuar.");  // Acción personalizada si el usuario no ha iniciado sesión
            }
        );
    });
}
;



function initializeSocket() {
    socket = new WebSocket("ws://localhost:8080");

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
                alert(data.message);
                break;
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
            case 'startGame':
                sessionStorage.setItem('gameData', JSON.stringify(data));
                sessionStorage.setItem('codigoSala', codigoSala);
                const rutaGuardada = localStorage.getItem('rutaSeleccionada');
                console.log(data)
                window.location.href = `${rutaGuardada}?modo=multijugador&codigo=${codigoSala}`;
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

    alert(`Sala creada! Código: ${codigoSala}`);
    if (data.esAnfitrion) {
        endChatButton.style.display = "block";

    }
    obtenerUsuario(data);
    console.log(data)
    const nombre_sala = document.getElementById('nombre_sala');
    nombre_sala.textContent = data.nombreSala;
    const codigo_sala = document.getElementById('codigo_sala');
    codigo_sala.textContent = data.codigoSala;
    const capacidad_sala = document.querySelector('.maximo');
    capacidad_sala.textContent = `/${data.capacidadSala}`;
}

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
        alert(`Te has unido a la sala ${codigoSala}`);
        document.getElementById('estiloBootstrap').disabled = false;
        document.getElementById('estiloChat').disabled = false;
        document.getElementById('estiloEspera').disabled = false;
        document.getElementById('estiloCrear').disabled = true;
        const nombre_salai = document.getElementById('nombre_sala');
        nombre_salai.textContent = data.nombreSala;

        const codigo_salai = document.getElementById('codigo_sala');
        codigo_salai.textContent = data.codigoSala;

        const capacidad_salai = document.querySelector('.maximo');
        capacidad_salai.textContent = `/${data.capacidadSala}`;
        obtenerUsuario(data);
    },
        () => {
            alert("Por favor inicia sesión para continuar.")

        }
    );
}

function createUserNotification(data) {
    const name = document.getElementById('name');
    name.textContent = data.usuario;
    // Si ya existe un 'idUsuario' en el localStorage, no lo sobreescribimos.
    if (!localStorage.getItem("idUsuario")) {
        localStorage.setItem("idUsuario", data.idUsuario); // Guardar el idUsuario solo si no está guardado
    }

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
                        <h6 id="id_user">${data.idUsuario}</h6>
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
    // Recuperar el idUsuario desde localStorage antes de enviarlo
    const idUsuario = localStorage.getItem('idUsuario'); // Obtenerlo de localStorage

    // Enviar la solicitud con el idUsuario correcto
    socket.send(JSON.stringify({
        type: 'iniciarjuego',
        codigoSala: codigoSala,
        id_user: idUsuario // Usar el idUsuario desde localStorage
    }));

    console.log(codigoSala);
    // startGame();
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
        connectionDiv.remove(); // Eliminar la notificación del usuario que se desconectó
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
    // console.log(data)


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
                        <h6>${idUsuario}</h6>
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