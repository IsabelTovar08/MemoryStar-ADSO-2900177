
async function obtenerDatosUsuario() {
    try {
      const response = await fetch('registro/procesos/obtenerUsuario.php');  
        const data = await response.json();
        console.log(data)
        if (data.success) {
            const nombreUsuarioElement = document.getElementById('nombreUsuario');
            if (nombreUsuarioElement) {
                nombreUsuarioElement.textContent = data.personaNombre;
            }
        } else {
            window.location.href = 'registro/login.html';
        }
    } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
    }
  }
  
  
    obtenerDatosUsuario();  // Solo ejecuta si existe el elemento
  