function iniciarSesion(event) {
    event.preventDefault();
    console.log('hola')
  let usuario = document.getElementById('username2').value;
  let password = document.getElementById('password2').value;
  let mensajeError = '';

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
          .then(response => response.json())
          .then(data => {
              if (data.error) {
                  alert(data.error);
              } else {  
                
                  window.location.href = '../../pingpong.html'; 
              }
          })
          .catch(error => console.error('Error:', error));
      }

      enviarDatos(usuario, password);



  }

  return false;
}
