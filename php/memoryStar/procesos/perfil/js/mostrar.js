document.addEventListener("DOMContentLoaded", () => {


    function mostrarPerfil(){
        fetch("procesos/perfil/mostrarPerfil.php")
        .then((response) => response.json())
        .then((datos) => {
            console.log(datos)

            const { nombre, apellido, telefono } = datos[0];

            console.log('Nombre:', nombre);
            console.log('Apellido:', apellido);
            console.log('Número:', telefono);
    
            document.getElementById('nombrePrf').innerHTML = nombre;
            document.getElementById('apellidoPrf').innerHTML = apellido;
            document.getElementById('numeroTelef').innerHTML = telefono;
          
            // document.getElementById('nombrePrf').innerHTML = nombre;
            // document.getElementById('apellidoPrf').innerHTML = apellido;
            // document.getElementById('numeroTelef').innerHTML = telefono;
        })
        .catch((error) => console.error("Error al cargar el JSON:", error));

    }
  
    mostrarPerfil()

})