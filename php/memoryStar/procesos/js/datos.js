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
        document.getElementById('mensajeError').innerText = mensajeError;
    } else {
        document.getElementById('mensajeError').innerText = '';
        
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
                alert(data.error);
            } else if (data.success && data.redirect) {
                window.location.href = data.redirect;
            } else {
                alert('Ocurrió un error inesperado en el servidor');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Ocurrió un error durante el proceso: ' + error.message);
        });
    }
    
    return false;
  }
  