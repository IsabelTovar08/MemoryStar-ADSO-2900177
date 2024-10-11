const carouselElement = document.querySelector('#carouselExampleIndicators');
carouselElement.addEventListener('slid.bs.carousel', function () {
    // Obtener el índice del carousel-item activo
    const activeIndex = [...carouselElement.querySelectorAll('.carousel-item')]
        .findIndex(item => item.classList.contains('active'));

    // Desmarcar todos los inputs
    const inputs = carouselElement.querySelectorAll('input[type="radio"]');
    inputs.forEach(input => input.checked = false);

    // Activar el input correspondiente
    if (inputs[activeIndex]) {
        inputs[activeIndex].checked = true;
    }
});

function seleccionarImagen() {
    // Seleccionar el input marcado
    const seleccionada = document.querySelector('input[name="carousel"]:checked');

    // Actualizar el contenido de 'resultado'
    // document.getElementById('resultado').textContent = `Has seleccionado: ${seleccionada.value}`;

    // Eliminar la clase 'seleccion' de cualquier item que la tenga
    const previousSelectedItem = document.querySelector('.carousel-item.seleccion');
    if (previousSelectedItem) {
        previousSelectedItem.classList.remove('seleccion');
    }

    // Seleccionar el item activo
    const activeItem = document.querySelector('.carousel-item.active');

    // Agregar la clase 'seleccion' al item activo
    if (activeItem) {
        activeItem.classList.add('seleccion');
    }
    const bieen = document.getElementById('bien');
    bieen.play();
}