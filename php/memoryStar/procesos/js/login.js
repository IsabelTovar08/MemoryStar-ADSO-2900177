function iniciarSesion(event) {
    event.preventDefault();
    
    let usuario = document.getElementById('username2').value.trim();
    let password = document.getElementById('password2').value.trim();
    let mensajeError = '';
    
    
    const noEspaciosNiComillas = /^[^\s"']+$/;


    if (usuario === '') {
        mensajeError += 'Falta el usuario. ';
    } else if (!noEspaciosNiComillas.test(usuario)) {
        mensajeError += 'El usuario no debe tener espacios ni comillas. ';
    }

   
    if (password === '') {
        mensajeError += 'Falta la contraseña. ';
    } else if (password.length < 8) {
        mensajeError += 'La contraseña debe tener al menos 8 caracteres. ';
    }

    if (mensajeError !== '') {
        document.getElementById('mensajeError').innerText = mensajeError;
    } else {
        document.getElementById('mensajeError').innerText = '';

        function enviarDatos(usuario, password) {
            let datos = {
                "usuario": usuario,
                "password": password
            };

            fetch('../login/sesionPersona.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(datos)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la respuesta del servidor');
                }
                return response.json();
            })
            .then(data => {
                if (data.error) {
                    alert(data.error);
                } else {  
                    window.location.href = '../../pingpong.html'; 
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Ocurrió un error durante el inicio de sesión: ' + error.message);
            });
        }

        enviarDatos(usuario, password);
    }

    return false;
}
