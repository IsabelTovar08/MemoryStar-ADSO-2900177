function registrarUsuario(event) {
    event.preventDefault();
    
    let email = document.getElementById('email').value.trim();
    let usuario = document.getElementById('username').value.trim();
    let password = document.getElementById('password').value.trim();
    let mensajeError = '';
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const noEspaciosNiComillas = /^[^\s"']+$/;
  
    if (email === '') {
        mensajeError += 'Falta el correo. ';
    } else if (!emailRegex.test(email)) {
        mensajeError += 'El correo no es válido. ';
    } else if (!noEspaciosNiComillas.test(email)) {
        mensajeError += 'El correo no debe tener espacios ni comillas. ';
    }
  
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
        // Mostrar el error con SweetAlert
        Swal.fire({
            icon: 'error',
            title: '¡Error!',
            text: mensajeError,
            confirmButtonText: 'Aceptar'
        });
    } else {
        // Si no hay errores, continuar con el envío de datos
        let datos = {
            "email": email,
            "usuario": usuario,
            "password": password
        };
        
        fetch('../registrar/registrarPersona.php', {
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
            console.log('Respuesta del servidor:', data); 
            if (data.error) {
                // Mostrar error con SweetAlert
                Swal.fire({
                    icon: 'error',
                    title: '¡Error!',
                    text: data.error,
                    confirmButtonText: 'Aceptar'
                });
            } else if (data.success) {
                // Mostrar éxito con SweetAlert y cambiar al formulario de login
                Swal.fire({
                    icon: 'success',
                    title: '¡Registrado!',
                    text: 'Te has registrado con éxito.',
                    confirmButtonText: 'Aceptar'
                }).then(() => {
                    // Mueve el formulario al login al activar la clase 'active' en el wrapper
                    const wrapper = document.querySelector('.wrapper');
                    wrapper.classList.remove('active');  // Cambia a la vista de login
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: '¡Error inesperado!',
                    text: 'Ocurrió un error inesperado en el servidor.',
                    confirmButtonText: 'Aceptar'
                });
            }
        })
        .catch(error => {
            console.error('Error:', error);
            Swal.fire({
                icon: 'error',
                title: '¡Error!',
                text: 'Ocurrió un error durante el proceso: ' + error.message,
                confirmButtonText: 'Aceptar'
            });
        });
    }
    
    return false;
}
