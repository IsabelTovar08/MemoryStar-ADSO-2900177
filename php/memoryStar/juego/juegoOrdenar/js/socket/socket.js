// // Obtener parámetros de la URL
// const urlParams = new URLSearchParams(window.location.search);
// const modoJuego = urlParams.get('modo') || 'un_jugador';
// const codigo = urlParams.get('codigo');
// let ws = null;
// let gameData = null;
// let usuarioEsAdmin = false;  // Inicializamos como false

// // Función para obtener datos del usuario
// async function obtenerDatosUsuario(callback, manejarError) {
//     try {
//         const response = await fetch('../../procesos/login/obtenerUsuario.php');
//         if (response.ok) {
//             const data = await response.json();
//             if (data.success && data.usuario) {
//                 callback(data);
//             } else {
//                 manejarError();
//             }
//         } else {
//             console.log(`Error al obtener datos del servidor: Código ${response.status}`);
//         }
//     } catch (error) {
//         console.log(`Error al obtener datos del usuario: ${error.message}`);
//     }
// }

// // Lógica para modo multijugador
// if (modoJuego === 'multijugador') {
//     gameData = JSON.parse(sessionStorage.getItem('gameData'));
//     if (gameData) {
//         console.log('Datos de la sala:', gameData);

//         const scoreList = document.getElementById('scoreList');
//         const codigoSala = gameData.gameData.codigoSala;

//         obtenerDatosUsuario(
//             (data) => {
//                 const id_usuario = data.id_usuario;
//                 const usuario = data.usuario;
//                 console.log(`Usuario ID: ${id_usuario}, Nombre: ${usuario}`);

//                 // Verificar si el usuario es admin
//                 const adminId = gameData.players.find(player => player.isAdmin)?.idUsuario;
//                 usuarioEsAdmin = adminId === id_usuario;

//                 console.log("Estado de admin:", usuarioEsAdmin);
//                 localStorage.setItem('usuarioEsAdmin', usuarioEsAdmin);

//                 // Actualizar la lista de jugadores
//                 scoreList.innerHTML = '';
//                 gameData.players.forEach(player => {
//                     const listItem = document.createElement('li');
//                     listItem.textContent = `${player.usuario}: ${player.score} puntos`;
//                     scoreList.appendChild(listItem);
//                 });

//                 // Lógica para el botón 'aceptar' basada en usuarioEsAdmin
//                 const aceptar = document.querySelector('.botonTsolo');
//                 aceptar.addEventListener('click', () => {
//                     const contenedorUsers = document.getElementById('contedor_users');
//                     contenedorUsers.innerHTML = '';
//                     gameData.players.forEach((player, index) => {
//                         const contenedor = document.createElement('div');
//                         contenedor.className = 'col-12 row contenedor-info';
//                         contenedor.innerHTML = `
//                             <div class="col-6 usuarioPerfill">
//                                 ${index + 1}. <img src="../../modales/modales/img/tablas/fotouser.png" alt="" style="width: 16px;"> ${player.usuario}
//                             </div>
//                             <div class="col-3">${player.time}s</div>
//                             <div class="col-3">${player.score} puntos</div>
//                         `;
//                         contenedorUsers.appendChild(contenedor);
//                     });

//                     // Ocultar el botón si no es admin
//                     if (!usuarioEsAdmin) {
//                         aceptar.style.display = 'none';
//                     }
//                 });
//             },
//             () => {
//                 console.log("Error al cargar los datos del usuario.");
//             }
//         );
//     }

//     // Configuración del WebSocket
//     ws = new WebSocket('ws://localhost:8080');

//     ws.onopen = () => {
//         console.log('Conectado al WebSocket en el juego multijugador');
//         ws.send(JSON.stringify({
//             type: 'reconectarSala',
//             codigoSala: gameData.gameData.codigoSala,
//             players: gameData.players
//         }));
//     };

//     ws.onmessage = (event) => {
//         const data = JSON.parse(event.data);
//         switch (data.type) {
//             case 'nuevoOrden':
//                 console.log('Orden correcto recibido:', data.orden);
//                 mostrarLibrosEnOrden(data.orden); // Actualizar el juego
//                 break;

//             case 'actualizarEstadisticas':
//                 actualizarEstadisticas();
//                 break;

//             case 'ordenCorrecto':
//                 console.log('Orden correcta recibida:', data.orden);
//                 break;

//             case 'error':
//                 console.error('Error:', data.message);
//                 break;
//         }
//     };

//     ws.onclose = () => console.log('Desconectado del WebSocket');
// } else {
//     console.log("Modo de juego: Un jugador");
// }

// // Función para actualizar las estadísticas de jugadores
// function actualizarEstadisticas() {
//     const scoreList = document.getElementById('scoreList');
//     scoreList.innerHTML = '';

//     gameData.players
//         .sort((a, b) => a.time - b.time) // Ordenar por tiempo
//         .forEach((player, index) => {
//             const listItem = document.createElement('li');
//             listItem.textContent = `#${index + 1} ${player.usuario}: ${player.score} puntos, ${player.time} segundos`;
//             scoreList.appendChild(listItem);
//         });
// }

// console.log("admin fin " + usuarioEsAdmin);

// export { ws, gameData, usuarioEsAdmin };