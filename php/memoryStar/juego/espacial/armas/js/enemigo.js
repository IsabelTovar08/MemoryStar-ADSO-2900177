document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.sep');
    const container = document.getElementById('imagenes');
      
    let speed = 0; // Velocidad por defecto
   
    const placedPositions = []; // Para almacenar las posiciones de las imágenes ya colocadas

    // Posicionar las imágenes de manera aleatoria al cargar sin superposición
    images.forEach(img => {
        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;
        const imgWidth = img.clientWidth;
        const imgHeight = img.clientHeight;

        if (container.offsetHeight< 500) {
            speed = 1; // Reducir la velocidad
        } else {
            speed = 2; // Velocidad normal
        }
        let isOverlapping;
        let randomX, randomY;

        do {
            isOverlapping = false;
            randomX = Math.floor(Math.random() * (containerWidth - imgWidth));
            randomY = Math.floor(Math.random() * (containerHeight - imgHeight));

            // Verificar superposición con otras imágenes ya colocadas
            for (const position of placedPositions) {
                const [x, y, width, height] = position;

                if (
                    randomX < x + width &&
                    randomX + imgWidth > x &&
                    randomY < y + height &&
                    randomY + imgHeight > y
                ) {
                    isOverlapping = true;
                    break;
                }
            }
        } while (isOverlapping);

        // Guardar la posición actual en el arreglo de posiciones
        placedPositions.push([randomX, randomY, imgWidth, imgHeight]);

        img.style.left = `${randomX}px`;
        img.style.top = `${randomY}px`;

        // Asignar dirección y velocidad aleatoria
        img.dx = Math.random() < 0.5 ? speed : -speed;
        img.dy = Math.random() < 0.5 ? speed : -speed;

        // Verificación de ID al hacer clic
        const correct = 1;
        img.addEventListener('click', () => {
            if (img.id == correct) {
                console.log('correcto');
                // Aquí puedes agregar la lógica adicional que desees
                img.classList.add("bien")
                img.classList.remove("mal")
            } else {
                console.log(`La imagen tiene un id diferente: ${img.id}`);
                // Lógica alternativa si la imagen no tiene el id 1
                img.classList.remove("bien")
                img.classList.add("mal")

                setTimeout(()=>{
                    img.classList.remove("mal")
                },500)
            }
        });
    });

    function checkCollision(img1, img2) {
        const rect1 = img1.getBoundingClientRect();
        const rect2 = img2.getBoundingClientRect();

        return !(
            rect1.right < rect2.left ||
            rect1.left > rect2.right ||
            rect1.bottom < rect2.top ||
            rect1.top > rect2.bottom
        );
    }

    function moveImages() {
        // Cambiar velocidad si la altura de la pantalla es menor a 500px
        // if (window.innerHeight < 1500) {
        //     speed = 5; // Reducir la velocidad
        // } else {
        //     speed = 2; // Velocidad normal
        // }

        images.forEach(img => {
            const rect = img.getBoundingClientRect();

            // Mover las imágenes y cambiar la dirección cuando tocan los bordes
            if (rect.left <= 0 || rect.right >= window.innerWidth) img.dx *= -1;
            if (rect.top <= 0 || rect.bottom >= window.innerHeight) img.dy *= -1;

            img.style.left = rect.left + img.dx + 'px';
            img.style.top = rect.top + img.dy + 'px';

            // Colisiones entre imágenes
            images.forEach(otherImg => {
                if (img !== otherImg && checkCollision(img, otherImg)) {
                    img.dx *= -1;
                    img.dy *= -1;
                    otherImg.dx *= -1;
                    otherImg.dy *= -1;
                }
            });
        });

        // Llamar a la función moveImages de nuevo para animar continuamente
        requestAnimationFrame(moveImages);
    }

    moveImages();
});
