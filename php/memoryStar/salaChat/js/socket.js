let socket;
let userName;
let codigoSala;
let nombreSala;
let capacidadSala;
let id_de_usuario;
let notificationsContainer = document.getElementById('usuarios');
let abandono = document.getElementById('notifications-container');
const chat = document.getElementById('chat');
const notification = document.getElementById('notification');
const audio = new Audio('notificacion.mp3');
const audioChat = new Audio('chat.mp3');
let jugadores = [];

const createRoomButton = document.createElement('button');
createRoomButton.innerText = "Crear Sala";
createRoomButton.classList.add('button-room');

const joinRoomButton = document.createElement('button');
joinRoomButton.innerText = "Unirse a Sala";
joinRoomButton.classList.add('button-room');

const endChatButton = document.createElement('button');
endChatButton.innerText = "Iniciar Chat";
endChatButton.classList.add('botton-iniciar');
endChatButton.style.display = "none";

// Agregar los botones al DOM
const buttonContainer = document.createElement('div');
buttonContainer.classList.add('room-buttons');
buttonContainer.appendChild(createRoomButton);
buttonContainer.appendChild(joinRoomButton);
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

createRoomButton.addEventListener('click', () => {
    obtenerDatosUsuario(
        (data) => {
            const nombreSala = prompt("Ingresa el nombre de la sala:");
            const capacidadSala = prompt("Ingresa la capacidad de la sala:");
            if (nombreSala && capacidadSala) {
                socket.send(JSON.stringify({
                    type: 'crearSala',
                    usuario: data.usuario,
                    id_usuario: data.id_usuario,
                    nombreSala: nombreSala,
                    capacidadSala: capacidadSala
                }));

            } else {
                alert("Por favor, ingresa el nombre y la capacidad de la sala.");
            }
        },
        () => {
            alert("Debes iniciar sesión para continuar."); // Acción personalizada
        }
    );
});


joinRoomButton.addEventListener('click', () => {
    obtenerDatosUsuario(
        (data) => {
            const code = prompt("Ingresa el código de la sala:");
            if (code) {
                socket.send(JSON.stringify({
                    type: 'unirseSala',
                    codigoSala: code.toUpperCase(),
                    id_usuario: data.id_usuario
                }));
            } else {
                alert("Por favor, ingresa el código de la sala.");
            }
        },
        () => {
            alert("Debes iniciar sesión para continuar."); // Acción personalizada
        }
    );
});


function initializeSocket() {
    socket = new WebSocket("ws://localhost:8080");

    socket.onopen = () => {
        console.log("Conectado al WebSocket");
        createRoomButton.disabled = false;
        joinRoomButton.disabled = false;
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
                sessionStorage.setItem('codigoSala', codigoSala); // Guarda el código de la sala
                // sessionStorage.setItem('nombreUsuario', nombreUsuario);
                console.log(data)
                document.cookie = `idUsuario=${encodeURIComponent(id_de_usuario)}; path=/`;
                window.location.href = `../juego/juegoOrdenar/MemorixBookifyDesafiante.html?modo=multijugador&codigo=${codigoSala}`;
                break;
        }
    };

    socket.onclose = () => {
        console.log("Conexión cerrada");
        createRoomButton.disabled = true;
        joinRoomButton.disabled = true;
    };

    socket.onerror = (error) => {
        console.error("Error en WebSocket:", error);
    };
}

function handlecrearSala(data) {
    codigoSala = data.codigoSala;
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
    createRoomButton.style.display = 'none';
    joinRoomButton.style.display = 'none';


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
            // socket.send(JSON.stringify({
            //     type: 'manejoUnion',
            //     usuario: userName
            // }));
            obtenerUsuario(data);
            createRoomButton.style.display = 'none';
            joinRoomButton.style.display = 'none';
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


document.getElementById('send').addEventListener('click', () => {
    enviarMensaje();
});
document.getElementById('message').addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        enviarMensaje();
    }
});

document.getElementById('messages').addEventListener('click', function () {
    const mensaje = new SpeechSynthesisUtterance(texto);

    mensaje.lang = 'es-ES';
    mensaje.rate = 1;
    mensaje.pitch = 1;
    mensaje.volume = 1;

    speechSynthesis.speak(mensaje);
});
function scrollToBottom() {
    const messages = document.getElementById('messages');
    setTimeout(() => {
        messages.scrollTop = messages.scrollHeight;
    }, 0);
}

initializeSocket();