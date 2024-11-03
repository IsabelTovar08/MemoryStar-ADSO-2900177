document.addEventListener('DOMContentLoaded', function () {
    var myModal = document.querySelector('.modalRedirigir');
    const overlay = document.querySelector('.overlay');
    const omitir = document.querySelector('.omitir');
    const empezar = document.querySelector('.game-start-message');

    omitir.addEventListener('click', () => {
        myModal.style.display = 'none';
        overlay.style.display = 'none';
        empezar.style.display = 'block';
    })

    const modalContents = [
        "¡Bienvenido, explorador! Tu misión es encontrar las cartas que contienen pistas esenciales para ensamblar una nave espacial. Cada pareja de cartas que encuentres te acercará a tu objetivo.",
        "Comienza volteando las cartas para buscar parejas. Cuando encuentres una pareja, recibirás una pista que te mostrará el orden correcto para ensamblar la nave espacial. ¡Mantente atento a los detalles!",
        "Una vez que hayas encontrado todas las parejas, serás transportado a la siguiente escena. Allí deberás buscar las partes de la nave que corresponden a las pistas que has recogido."
    ];
    
    let currentModalIndex = 0; // Índice del contenido actual del modal
    const modalBody = document.getElementById('modalBody');
    const nextButton = document.getElementById('nextButton');
    
    nextButton.addEventListener('click', function () {
        // Aplicar la animación de desvanecimiento
        modalBody.classList.add('fade-out');
    
        // Esperar a que la animación termine antes de cambiar el contenido
        setTimeout(() => {
            currentModalIndex++; // Aumenta el índice del modal actual
    
            if (currentModalIndex < modalContents.length) {
                // Cambia el contenido del modal si hay más contenido
                modalBody.innerHTML = modalContents[currentModalIndex];
    
                // Aplicar la animación de aparición
                modalBody.classList.remove('fade-out');
                modalBody.classList.add('fade-in');
    
                // Si es el último contenido, cambia el texto del botón a "Finalizar"
                if (currentModalIndex === modalContents.length - 1) {
                    nextButton.textContent = 'Finalizar';
                }
            } else {
                myModal.style.display = 'none';
                overlay.style.display = 'none';
                empezar.style.display = 'block';


            }
    
            // Eliminar la clase de animación de aparición después de un tiempo
            setTimeout(() => {
                modalBody.classList.remove('fade-in');
            }, 500); // Tiempo igual a la duración de la animación
        }, 500); // Tiempo igual a la duración de la animación de desvanecimiento
    });
});


