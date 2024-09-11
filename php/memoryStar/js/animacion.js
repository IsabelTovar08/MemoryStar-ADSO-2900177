window.onload = function() {
    var loader = document.getElementById('loader');
    
    if (loader) {
        // Utilizamos un efecto de desvanecimiento simple en JavaScript puro
        var opacity = 1;  // Opacidad inicial

        // Crear una función que reduce la opacidad
        function fadeOut() {
            opacity -= 0.1;  // Disminuir la opacidad
            loader.style.opacity = opacity;

            if (opacity <= 0) {
                loader.style.display = 'none';  // Ocultar el elemento cuando la opacidad llegue a 0
            } else {
                requestAnimationFrame(fadeOut);  // Llamar a la función de nuevo en el siguiente frame
            }
        }

        fadeOut();  // Iniciar el efecto de desvanecimiento
    }
};
