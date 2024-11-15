// Verifica el modo de juego (un jugador o multijugador)
const urlParams = new URLSearchParams(window.location.search);
const modoJuego = urlParams.get('modo') || 'un_jugador'; // Asume 'un_jugador' si no se especifica

let ws = null;

// Solo se conecta a WebSocket en modo multijugador
if (modoJuego === 'multijugador') {
    ws = new WebSocket('ws://localhost:8080');

    ws.onopen = () => {
        console.log('Conectado al WebSocket en el juego multijugador');
        ws.send(JSON.stringify({ type: 'joinGame', username: 'Usuario123' }));
    };

    ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.type === 'chat' || data.type === 'userJoined' || data.type === 'userLeft') {
            document.getElementById('chat').innerHTML += `<p>${data.message}</p>`;
        }
    };

    ws.onclose = () => console.log('Desconectado del WebSocket');
} else {
    console.log("Modo de juego: Un jugador");
    // Aquí puedes ejecutar el juego sin depender de WebSocket
}

// Lógica del juego
function iniciarJuego() {
    if (modoJuego === 'multijugador') {
        console.log("Iniciando el juego en modo multijugador.");
        // Colocar la lógica para el juego multijugador
    } else {
        console.log("Iniciando el juego en modo un jugador.");
        // Colocar la lógica para el juego un jugador
    }
}

iniciarJuego();