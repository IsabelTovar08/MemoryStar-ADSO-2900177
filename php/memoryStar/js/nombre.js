// index.js
document.addEventListener('DOMContentLoaded', () => {
    console.log("hols")
    fetch('../registro/procesos/obtenerUsuario.php')
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            document.getElementById('usuarioBienvenida').innerText = 'No se ha iniciado sesión';
        } else {
            document.getElementById('usuarioBienvenida').innerText = 'Bienvenido, ' + data.usuario;
        }
    })
    .catch(error => console.error('Error:', error));
});
