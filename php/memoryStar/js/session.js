async function obtenerDatosUsuario() {
    try {
        const response = await fetch('procesos/login/obtenerUsuario.php');
        const data = await response.json();
        console.log( data.usuario);
        console.log(data)
        if (data.success) {
            const nombreUsuarioElement = document.querySelectorAll('.usuarioPerfill, .nombre');
            if (nombreUsuarioElement) {
                nombreUsuarioElement.forEach(elemento => {
                    elemento.innerHTML = data.usuario;
                    
                });
            }
        } else {
            window.location.href = 'antesLogin.html';
        }
    } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    obtenerDatosUsuario();
});