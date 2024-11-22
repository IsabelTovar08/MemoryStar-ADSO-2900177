async function obtenerDatosUsuario() {
    const rutas = [
        'procesos/login/obtenerUsuario.php',
        '../procesos/login/obtenerUsuario.php',
        '../../procesos/login/obtenerUsuario.php',
        '../../../procesos/login/obtenerUsuario.php',
        // Añade más rutas si es necesario
    ];
    
    let datosUsuario = null;
    
    for (let ruta of rutas) {
        try {
            const response = await fetch(ruta);
            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    datosUsuario = data;
                    break; // Salir del bucle si la solicitud fue exitosa
                }
            }
        } catch (error) {
            console.error(`Error al obtener los datos del usuario desde ${ruta}:`, error);
        }
    }
    
    if (datosUsuario) {
        const nombreUsuarioElement = document.querySelectorAll('.usuarioPerfill, .nombre');
        nombreUsuarioElement.forEach(elemento => {
            elemento.
            innerHTML = datosUsuario.usuario;
        });
    } else {    
        window.location.href = 'antesLogin.html';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    obtenerDatosUsuario();
});