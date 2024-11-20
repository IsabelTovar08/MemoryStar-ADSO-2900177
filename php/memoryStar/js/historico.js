// Función para cargar los datos del historial en el modal
function cargarHistorico() {
    fetch('procesos/puntuacion/historico.php') // Asegúrate de que la URL sea correcta
        .then(response => response.json())
        .then(data => {
            const tbody = document.querySelector('.Tabla-cuerpo tbody');
            tbody.innerHTML = ''; // Limpiar el contenido previo
            
            if (data.error) {
                tbody.innerHTML = `<tr><td colspan="4">${data.error}</td></tr>`;
                return;
            }

            if (data.length === 0) {
                tbody.innerHTML = `<tr><td colspan="4">No hay partidas jugadas </td></tr>`;
                return;
            }
 
            data.forEach((partida, index) => {
                const fila = document.createElement('tr');
                
                // La partida más antigua será "Partida 1", la más reciente será la última
                const numeroPartida = index + 1;
                
                fila.innerHTML = `
                    <td>Partida ${numeroPartida}</td>
                    <td>${partida.diamantes}</td>
                    <td>${partida.puntos}</td>
                    <td>${partida.tiempo} sg</td>
                `;
                
                tbody.appendChild(fila);
            });
        })
        .catch(error => {
            console.error('Error al cargar el historial:', error);
            const tbody = document.querySelector('.Tabla-cuerpo tbody');
            tbody.innerHTML = `<tr><td colspan="4">Error al cargar datos</td></tr>`;
        });
}

// Llamar a la función cuando el modal se abra
document.getElementById('hisorico').addEventListener('show.bs.modal', cargarHistorico);
