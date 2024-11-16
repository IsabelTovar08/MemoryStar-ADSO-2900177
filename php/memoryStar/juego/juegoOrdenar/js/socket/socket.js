// Verifica el modo de juego (un jugador o multijugador)
const urlParams = new URLSearchParams(window.location.search);
const modoJuego = urlParams.get('modo') || 'un_jugador'; // Asume 'un_jugador' si no se especifica

let ws = null;

// Solo se conecta a WebSocket en modo multijugador
if (modoJuego === 'multijugador') {
    ws = new WebSocket('ws://localhost:8080');

    ws.onopen = () => {
        console.log('Conectado al WebSocket en el juego multijugador');
        socket.send(JSON.stringify({
            type: 'startGame', 
            roomCode: roomCode}));
        // ws.send(JSON.stringify({ type: 'joinGame', username: 'Usuario123' }));
    };
    ws.onmessage = function(event) {
        const data = JSON.parse(event.data);
        console.log(data)
        if (data.type === 'gameData') {
            console.log('Datos del juego recibidos correctamente:', data);
            
            // Aquí puedes realizar otras verificaciones para asegurarte de que los datos sean correctos
            if (data.roomName && data.scores && Array.isArray(data.users)) {
                console.log('Toda la información necesaria está presente.');
            } else {
                console.log('Faltan algunos datos en la respuesta.');
            }
        } else if (data.type === 'gameStarted') {
            console.log('El juego ha comenzado');
        }
        
        // if (data.type === 'userData') {
        //     // Almacenar la información del jugador en el cliente
        //     const userName = data.userName;
        //     const userId = data.userId;
        //     const score = data.score;
        //     console.log(data)
            
        //     // Guardar al jugador en un objeto o array para su posterior uso
        //     players[userId] = { userName, score };
    
        //     console.log(`Jugador conectado: ${userName}, ID: ${userId}, Puntuación: ${score}`);
        // }
        // if (data.type === 'history') {
        //     // Almacenar la información del jugador en el cliente
        //     console.log(data.history)
           
        // }
       
    };

    // ws.onmessage = (event) => {
    //     const data = JSON.parse(event.data);
    //     if (data.type === 'chat' || data.type === 'userJoined' || data.type === 'userLeft') {
    //         document.getElementById('chat').innerHTML += `<p>${data.message}</p>`;
    //     }
    // };

    ws.onclose = () => console.log('Desconectado del WebSocket');
} else {
    console.log("Modo de juego: Un jugador");
    // Aquí puedes ejecutar el juego sin depender de WebSocket
}
function handleUserData(data){
    const capacidad_sala = document.querySelector('.maximo');
    capacidad_sala.textContent = `/${data.roomCapacity}`;
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