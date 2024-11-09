async function obtenerDatosUsuario() {
    const urls = [
        '../../procesos/login/obtenerUsuario.php',
        '../../../procesos/login/obtenerUsuario.php',
        '../procesos/login/obtenerUsuario.php',
        'procesos/login/obtenerUsuario.php',
        
        // Agrega más rutas aquí según sea necesario
    ];

    let data = null;
    for (const url of urls) {
        try {
            const response = await fetch(url);
            if (response.ok) {
                data = await response.json();
                if (data.success) break;
            }
        } catch (error) {
            console.warn(`Error al intentar la URL: ${url}`, error);
        }
    }

    if (data && data.success) {
        const nombreUsuarioElement = document.querySelectorAll('.usuarioPerfill');
        if (nombreUsuarioElement) {
            nombreUsuarioElement.forEach(elemento => {
                elemento.innerHTML = data.usuario;
            });
        }
    } else {
        console.error('Error: No se pudo obtener los datos del usuario desde ninguna URL.');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    obtenerDatosUsuario();
});
