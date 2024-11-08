
function registrarUsuario(event){

  event.preventDefault();
  console.log('jpña')
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
      
    function enviarDatos() {
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
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          alert(data.error);
        } else {
          alert('Datos enviados correctamente');
    
          // alert('seras enviado al login');
          // window.location.href = '../login/login.html';
        }
      })
      .catch(error => console.error('Error:', error));
    }
    enviarDatos();
  }

  return false;
}




