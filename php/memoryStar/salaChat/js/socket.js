let socket;
let userName;
let roomCode;
let nombreSala;
let capacidadSala;
let juegoIniciado = false;
let notificationsContainer = document.getElementById('usuarios');
let abandono = document.getElementById('notifications-container');
const chat = document.getElementById('chat');
const notification = document.getElementById('notification');
 let jugadores = [];
// const boton_unirse = document.getElementById('unirse');

// Crear los botones de sala
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


async function obtenerDatosUsuario(callback) {
    try {
        const response = await fetch('../procesos/login/obtenerUsuario.php');
        if (response.ok) {
            const data = await response.json();
            if (data.success) {
                callback(data);  // Llamada al callback con los datos obtenidos
            }
        }
    } catch (error) {
        console.error("Error al obtener los datos del usuario:", error);
    }
}




// Event Listeners para los botones
createRoomButton.addEventListener('click', () => {
    obtenerDatosUsuario((data) => {
        // Solicita el nombre y la capacidad de la sala
        const nombreSala = prompt("Ingresa el nombre de la sala:");
        const capacidadSala = prompt("Ingresa la capacidad de la sala:");

        if (nombreSala && capacidadSala) {
            // Envía todos los datos necesarios en el evento de creación de sala
            socket.send(JSON.stringify({
                type: 'createRoom',
                usuario: data.usuario,
                id_usuario: data.id_usuario,
                roomName: nombreSala,
                roomCapacity: capacidadSala // Enviar la capacidad de la sala
            }));

        } else {
            alert("Por favor, ingresa el nombre y la capacidad de la sala.");
        }
    });
});
function startGame() {
    socket.send(JSON.stringify({
        type: 'redirectToGame',
        usuario: userName,
        url: '../../juego/juegoOrdenar/MemorixBookifyDesafiante.html'
    }));
}

joinRoomButton.addEventListener('click', () => {
    userName = prompt("Por favor, ingresa tu nombre:");
    if (userName) {
        const code = prompt("Ingresa el código de la sala:");
        if (code) {
            socket.send(JSON.stringify({
                type: 'joinRoom',
                roomCode: code.toUpperCase()
            }));
        }
    }
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
            case 'roomCreated':
                handleRoomCreated(data);
                console.log(data)
                break;
            case 'roomJoined':
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
            case 'history':
                console.log(data.history)
                data.history.forEach(notification => {
                    historial(notification.user, notification.message, notification.isAdmin, notification.state);
                });
                break;
                // else if (data.type === 'playerList') {
                //     jugadores = data.jugadores;  // Actualizamos la lista de jugadores
                // } else if (data.type === 'gameStarted') {
                //     // Redirigimos al juego con los nombres de los jugadores en la URL
                //     const jugadoresString = encodeURIComponent(JSON.stringify(jugadores));
                //     window.location.href = `juego.html?modo=multijugador&jugadores=${jugadoresString}`;
            case 'gameStarted':
                    // Redirige al juego con WebSocket activo
                    juegoIniciado = true;
                    window.location.href = '../juego/juegoOrdenar/MemorixBookifyDesafiante.html?modo=multijugador';
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

function handleRoomCreated(data) {

    roomCode = data.roomCode;
    alert(`Sala creada! Código: ${roomCode}`);
    if (data.isHost) {
        endChatButton.style.display = "block";
    }
    obtenerDatosUsuario((data) => {
        socket.send(JSON.stringify({
            type: 'setUserName',
            usuario: data.usuario,
            id_usuario: data.id_usuario

        }));
    });
    console.log(data)
    const nombre_sala = document.getElementById('nombre_sala');
    nombre_sala.textContent = data.roomName;
    const codigo_sala = document.getElementById('codigo_sala');
    codigo_sala.textContent = data.roomCode;
    const capacidad_sala = document.querySelector('.maximo');
    capacidad_sala.textContent = `/${data.roomCapacity}`;
    createRoomButton.style.display = 'none';
    joinRoomButton.style.display = 'none';


}
endChatButton.addEventListener('click', () => {
    socket.send(JSON.stringify({
         type: 'startGame', 
         roomCode: roomCode}));
        //  console.log(roomCode)
    // startGame();

});
function handleRoomJoined(data) {
    roomCode = data.roomCode;
    alert(`Te has unido a la sala ${roomCode}`);
    socket.send(JSON.stringify({
        type: 'setUserName',
        userName: userName
    }));
    createRoomButton.style.display = 'none';
    joinRoomButton.style.display = 'none';
}

// function handleChatEnded() {
//     alert("El chat ha finalizado.");
//     window.location.href = "../juego/espacial/cartas/juegoPixel/index.html";
// }


// ... (mantener las funciones existentes de manejo de mensajes y notificaciones) ...

function leerMensaje(texto) {
    console.log("Leyendo mensaje:", texto); // Verificar si esta línea se ejecuta
    const mensaje = new SpeechSynthesisUtterance(texto); // Crear un objeto SpeechSynthesisUtterance con el texto
    window.speechSynthesis.speak(mensaje); // Leer el texto
}

// Asegúrate de que el evento se está configurando correctamente
document.getElementById('messages').addEventListener('click', (event) => {
    console.log("Elemento clickeado:", event.target); // Verifica qué elemento ha sido clickeado
    if (event.target && event.target.classList.contains('me') || event.target.classList.contains('other')) {
        leerMensaje(event.target.innerText);  // Leer el mensaje al hacer clic en él
    }
});

// Funciones adicionales para el manejo de notificaciones de usuarios y mensajes
function createUserNotification(data) {
    const numero = document.querySelector('.numero-usuario');
    numero.textContent = data.userCount;
    const connectionDiv = document.createElement('div');
    connectionDiv.classList.add('contenedor-usuario');
    connectionDiv.setAttribute('data-username', data.user); // Añadir identificador único
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
                        <h2>${data.user}</h2>
                    </div>
                    <div class="descripcion">
                        <h6>${roleText} ${data.state}</h6>
                    </div>
                </div>
                <div class="conte-diamante-img">
                    <div class="diamante">
                        <img src="../img/iconos/segundoMemory.png" alt="" width="20">
                    </div>
                </div>
            </div>
        </div>`
        ;
    notificationsContainer.appendChild(connectionDiv);
}

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

function historial(user, message, isAdmin, state) {
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
                        <h2>${user}</h2>
                    </div>
                    <div class="descripcion">
                        <h6>${roleText} ${state}</h6>
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

// Función para manejar el envío de mensajes
function enviarMensaje() {
    let message = document.getElementById('message').value.trim();
    document.getElementById('message').value = '';

    if (message !== '') {
        let text = document.createElement('div');
        text.classList.add('me');
        text.innerText = message;
        document.getElementById('messages').appendChild(text);
        socket.send(JSON.stringify({ type: 'chat', message: message, from: userName }));
        // leerMensaje(message);
        scrollToBottom();
    }
}


document.getElementById('send').addEventListener('click', () => {
    enviarMensaje();
});
// Enviar mensaje al presionar "Enter"
document.getElementById('message').addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        enviarMensaje();  // Llamar a la función de envío de mensaje
    }
});

// Enviar mensaje al hacer clic en el botón "Send"
document.getElementById('messages').addEventListener('click', function () {

    // Crear una nueva instancia de SpeechSynthesisUtterance
    const mensaje = new SpeechSynthesisUtterance(texto);

    // Opciones de la voz (puedes personalizarla)
    mensaje.lang = 'es-ES'; // Establecer idioma
    mensaje.rate = 1; // Velocidad de la voz
    mensaje.pitch = 1; // Tono de la voz
    mensaje.volume = 1; // Volumen

    // Reproducir el mensaje
    speechSynthesis.speak(mensaje);


});
function scrollToBottom() {
    const messages = document.getElementById('messages');
    setTimeout(() => {
        messages.scrollTop = messages.scrollHeight;
    }, 0);
}

// Inicializar el WebSocket
initializeSocket();