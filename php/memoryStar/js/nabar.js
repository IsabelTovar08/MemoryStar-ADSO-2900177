document.addEventListener('DOMContentLoaded', function () {
    function cargarDatos(){
        fetch("json/nabar.json")
        .then(response => response.json())
        .then((datos) => {
            modales(datos.Datos);
          })
          .catch((error) => console.error("Error al cargar el JSON:", error));
    }

    cargarDatos();

    function modales(){
        
    }
})