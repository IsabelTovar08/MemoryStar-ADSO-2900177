// Realizar la petición al backend
function mostrarR(){
    fetch('procesos/ranking/obtenerRanking.php')
    .then(response => response.json())
    .then(data => {
        if (data.status === "success") {
            console.log("Datos recibidos:", data.data);

            const tbody = document.querySelector('.cuerpo-tabla-historial');
            data.data.forEach((usuario, index) => {
                const fila = document.createElement('tr');
                
            //    // aqui envio los usuario al ranking 
                const usuarioranking = index + 1;
                
                fila.innerHTML = `
                    <td> ${usuarioranking}</td>
                    <td>${usuario.nombre_usuario}</td>
                    <td>${usuario.puntosacumulados}</td>
                    <td>${usuario.diamantes}</td>
                    <td>${usuario.nivel}</td>
                    <td>${usuario.fechar_registro}</td>
                    
                 
                   
                `;
                
                tbody.appendChild(fila);
            });



         
            // data.data.forEach(usuario => {
                
            //     console.log(`Usuario: ${usuario.nombre_usuario}, Diamantes: ${usuario.diamantes}`);
            // });
        }
        
        // else {
        //     console.error("Error:", data.message);
        // }
    })
    .catch(error => console.error("Error en la petición:", error));

}


document.addEventListener('DOMContentLoaded', () => {
    mostrarR();
});