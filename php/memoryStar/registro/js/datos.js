
document.getElementById('registrar').addEventListener('submit', function(event) {
    event.preventDefault(); 
    
    let email = document.getElementById('email').value;
    let usuario = document.getElementById('usuario').value;
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


      fetch("../procesos/registrarPersona")

      alert("Formulario enviado correctamente");
    }
  });