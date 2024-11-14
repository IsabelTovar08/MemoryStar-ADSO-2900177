let socket;
let userName;
let roomCode;
let notificationsContainer = document.getElementById('usuarios');
let abandono = document.getElementById('notifications-container');
const chat = document.getElementById('chat');
const notification = document.getElementById('notification');
const audio = new Audio('notificacion.mp3');
const audioChat = new Audio('chat.mp3');

// Crear los botones de sala
const createRoomButton = document.createElement('button');
createRoomButton.innerText = "Crear Sala";
createRoomButton.classList.add('button-room');

const joinRoomButton = document.createElement('button');
joinRoomButton.innerText = "Unirse a Sala";
joinRoomButton.classList.add('button-room');

const endChatButton = document.createElement('button');
endChatButton.innerText = "Finalizar Chat";
endChatButton.classList.add('botton-iniciar');
endChatButton.style.display = "none";

// Agregar los botones al DOM
const buttonContainer = document.createElement('div');
buttonContainer.classList.add('room-buttons');
buttonContainer.appendChild(createRoomButton);
buttonContainer.appendChild(joinRoomButton);
buttonContainer.appendChild(endChatButton);
document.body.insertBefore(buttonContainer, document.body.firstChild);

// Event Listeners para los botones
createRoomButton.addEventListener('click', () => {
    userName = prompt("Por favor, ingresa tu nombre:");
    if (userName) {
        socket.send(JSON.stringify({ type: 'createRoom' }));
    }
});

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

endChatButton.addEventListener('click', () => {
    socket.send(JSON.stringify({ type: 'endChat' }));
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
    socket.send(JSON.stringify({
        type: 'setUserName',
        userName: userName
    }));
    createRoomButton.style.display = 'none';
    joinRoomButton.style.display = 'none';
}

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

function handleChatEnded() {
    alert("El chat ha finalizado.");
    window.location.href = "../juego/espacial/cartas/juegoPixel/index.html";
}


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
                        <img src="img" alt="">
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
                        <img src="img" alt="">
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