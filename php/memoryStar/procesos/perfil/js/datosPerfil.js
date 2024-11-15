document.getElementById('profileForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const nombrePersona = document.getElementById('txtNombreP').value;
    const apellidoPersona = document.getElementById('txtApellidoP').value;
    const telefonoPersona = document.getElementById('txtTelefonoP').value;

    let datos = {
        "nombrePersona": nombrePersona,
        "apellidoPersona": apellidoPersona,
        "numeroPersona": telefonoPersona
    };

    fetch('procesos/perfil/recibirPerfil.php', {
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
        if (data.status === 'success') {
            alert(data.message);
            
            const { nombre, apellido, telefono } = data.data[0];

        console.log('Nombre:', nombre);
        console.log('Apellido:', apellido);
        console.log('Número:', telefono);

        document.getElementById('nombrePrf').innerHTML = nombre;
        document.getElementById('apellidoPrf').innerHTML = apellido;
        document.getElementById('numeroTelef').innerHTML = telefono;
        } else {
            alert(data.error || 'Ocurrió un error inesperado');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Ocurrió un error: ' + error.message);
    });
});


