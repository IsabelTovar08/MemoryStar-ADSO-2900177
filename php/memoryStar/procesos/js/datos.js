function registrarUsuario(event) {
  event.preventDefault();
  
  let email = document.getElementById('email').value;
  let usuario = document.getElementById('username').value;
  let password = document.getElementById('password').value;
  let mensajeError = '';
  
  if (email === '') {
      mensajeError += 'Falta el correo. ';
  }
  
  if (usuario === '') {
      mensajeError += 'Falta el usuario. ';
  }
  
  if (password === '') {
      mensajeError += 'Falta la contraseña. ';
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
          console.log('Respuesta del servidor:', data); // Para debug
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