async function verificarExistencia(tipo, valor) {
    try {
        const response = await fetch('../registrar/verificacionUsuario.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                tipo: tipo,
                valor: valor
            })
        });
        
        if (!response.ok) {
            throw new Error('Error en la respuesta del servidor');
        }
        
        const data = await response.json();
        return data.exists;
    } catch (error) {
        console.error('Error:', error);
        return false;
    }
}

async function registrarUsuario(event) {
    event.preventDefault();
    
    let email = document.getElementById('email').value.trim();
    let usuario = document.getElementById('username').value.trim();
    let password = document.getElementById('password').value.trim();
    let mensajeError = '';
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const noEspaciosNiComillas = /^[^\s"']+$/;
    
    // Validaciones básicas
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
        Swal.fire({
            icon: 'error',
            title: '¡Error!',
            text: mensajeError,
            confirmButtonText: 'Aceptar'
        });
        return false;
    }
    
    // Verificar si el usuario existe
    const usuarioExiste = await verificarExistencia('usuario', usuario);
    if (usuarioExiste) {
        Swal.fire({
            icon: 'error',
            title: '¡Error!',
            text: 'El nombre de usuario ya está registrado',
            confirmButtonText: 'Aceptar'
        });
        return false;
    }
    
    // Verificar si el email existe
    const emailExiste = await verificarExistencia('email', email);
    if (emailExiste) {
        Swal.fire({
            icon: 'error',
            title: '¡Error!',
            text: 'El correo electrónico ya está registrado',
            confirmButtonText: 'Aceptar'
        });
        return false;
    }
    
    // Si llegamos aquí, podemos proceder con el registro
    let datos = {
        "email": email,
        "usuario": usuario,
        "password": password
    };
    
    try {
        const response = await fetch('../registrar/registrarPersona.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(datos)
        });
        
        if (!response.ok) {
            throw new Error('Error en la respuesta del servidor');
        }
        
        const data = await response.json();
        
        if (data.success) {
            Swal.fire({
                icon: 'success',
                title: '¡Registrado!',
                text: 'Te has registrado con éxito.',
                confirmButtonText: 'Aceptar'
            }).then(() => {
                const wrapper = document.querySelector('.wrapper');
                wrapper.classList.remove('active');
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: '¡Error!',
                text: data.error || 'Ocurrió un error inesperado en el servidor.',
                confirmButtonText: 'Aceptar'
            });
        }
    } catch (error) {
        console.error('Error:', error);
        Swal.fire({
            icon: 'error',
            title: '¡Error!',
            text: 'Ocurrió un error durante el proceso: ' + error.message,
            confirmButtonText: 'Aceptar'
        });
    }
    
    return false;
}