document.addEventListener('DOMContentLoaded', function () {
    const objetos = document.querySelectorAll('.centrar');
    const boton = document.getElementById('play');
    const botonesJugar = document.getElementById('jugar');

    let currentIndex = 0;
    let indiceActual = 0;

    function mostrarSiguienteObjeto() {
        // Oculta el objeto actual
        objetos[indiceActual].style.display = 'none';

        // Incrementa el índice, y reinícialo si es mayor que el número de objetos
        indiceActual = (indiceActual + 1) % objetos.length;

        // Muestra el siguiente objeto
        objetos[indiceActual].style.display = 'block';
    }

    // Muestra el primer objeto
    objetos[indiceActual].style.display = 'block';

    // Configura el intervalo para cambiar de objeto cada 1 segundo (1000 milisegundos)
    setInterval(mostrarSiguienteObjeto, 1000);

    // Función para elegir la temática del juego
    function elegirModo() {
        let resultadoMostrar = "";
        botonesJugar.style.display = "none";

        // Generación dinámica del slider
        resultadoMostrar += `
                <img src="img/iconos/logoBienvenido.png" alt="logoMemory" class="segundoInicio">
                <h1 class="textoEleccion">Selecciona el modo de Juego</h1>
                <div class="contenedorOpciones">
                    <img src="img/iconos/matematicas.png" class="oJuegos zoom" alt="Imagen 1" id="Imagen1">
                    <img src="img/iconos/animales.png" class="oJuegos zoom" alt="Imagen 2" id="Imagen2">
                    <img src="img/iconos/comida.png" class="oJuegos zoom" alt="Imagen 3" id="Imagen3">
                </div>
        `;

        // Insertar el HTML dinámico en el DOM
        document.getElementById('contenido').innerHTML = resultadoMostrar;
        const logo = document.querySelector('.segundoInicio');
        logo.style.width = "20%";
        // Seleccionar todas las imágenes recién añadidas y agregarles el evento de clic
        const images = document.querySelectorAll('.contenedorOpciones img');
        images.forEach(image => {
            image.addEventListener('click', function () {
                console.log(`Has hecho clic en la imagen con ID: ${this.id}`);
                elegirjuego();
            });
        });
    }
    function elegirjuego() {
        let resultadoMostrar = "";
        botonesJugar.style.display = "none";

        // Generación dinámica del slider
        resultadoMostrar += `
                <img src="img/iconos/segundoMemory.png" alt="logoMemory" class="segundoInicio">
                <h1 class="textoEleccion">¿Qué quieres jugar?</h1>
                <div class="contenedorOpciones">
                    <img src="img/iconos/multijugador.png" class="oJuegos zoom" alt="Imagen 1" id="Imagen1">
                    <img src="img/iconos/animales.png" class="oJuegos zoom" alt="Imagen 2" id="Imagen2">
                    <img src="img/iconos/comida.png" class="oJuegos zoom" alt="Imagen 3" id="Imagen3">
                </div>
        `;

        // Insertar el HTML dinámico en el DOM
        document.getElementById('contenido').innerHTML = resultadoMostrar;

        // Seleccionar todas las imágenes recién añadidas y agregarles el evento de clic
        const images = document.querySelectorAll('.contenedorOpciones img');
        images.forEach(image => {
            image.addEventListener('click', function () {
                console.log(`Has hecho clic en la imagen con ID: ${this.id}`);
                elegirTemática();
            });
        });
    }

    function elegirTemática() {
        let resultadoMostrar = "";
        botonesJugar.style.display = "none";
        // Generación dinámica del slider
        resultadoMostrar += `
                <img src="img/iconos/segundoMemory.png" alt="logoMemory" class="segundoInicio">
                <h1 class="textoEleccion">Elige la temática del juego</h1>
                <div id="juegos" class="contenedorOpciones">
                    <img src="img/iconos/matematicas.png" alt="Imagen 1" class="oJuegos zoom">
                    <img src="img/iconos/animales.png" alt="Imagen 2" class="oJuegos zoom">
                    <img src="img/iconos/comida.png" alt="Imagen 3" class="oJuegos zoom">
                    <img src="img/iconos/paises.png" alt="Imagen 4" class="oJuegos zoom">
                    <img src="img/iconos/tecnologia.png" alt="Imagen 5" class="oJuegos zoom">
                </div>
        `;

        document.getElementById('contenido').innerHTML = resultadoMostrar;
        const images = document.querySelectorAll('.contenedorOpciones img');
        images.forEach(image => {
            image.addEventListener('click', function () {
                console.log(`Has hecho clic en la imagen con ID: ${this.id}`);
                elegirNivel();
            });
        });
    }
    function elegirNivel() {
        let resultadoMostrar = "";
        botonesJugar.style.display = "none";
        boton.style.width = '8%';
        // Generación dinámica del slider
        resultadoMostrar += `
                <img src="img/iconos/segundoMemory.png" alt="logoMemory" class="segundoInicio">
                <h1 class="textoEleccion">Elige el nivel</h1>
                <div class="contenedorOpciones">
                    <img src="img/iconos/facil.png" class="oJuegos zoom" alt="Imagen 1" id="Imagen1">
                    <img src="img/iconos/intermedio.png" class="oJuegos zoom" alt="Imagen 2" id="Imagen2">
                    <img src="img/iconos/dificil.png" class="oJuegos zoom" alt="Imagen 3" id="Imagen3">
                </div>
        `;

        // Insertar el HTML dinámico en el DOM
        document.getElementById('contenido').innerHTML = resultadoMostrar;

        // Seleccionar todas las imágenes recién añadidas y agregarles el evento de clic
        const images = document.querySelectorAll('.contenedorOpciones img');
        images.forEach(image => {
            image.addEventListener('click', function () {
                console.log(`Has hecho clic en la imagen con ID: ${this.id}`);

            });
        });
    }

    function addEventListenersToDots() {
        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showSlide(index);
            });
        });
    }

    function showSlide(index) {
        const slides = document.querySelector('.slides');
        const totalSlides = document.querySelectorAll('.slide').length;
        const visibleSlides = 3; // Número de diapositivas visibles a la vez
        const maxIndex = totalSlides - visibleSlides;

        if (index > maxIndex) {
            currentIndex = 0;
        } else if (index < 0) {
            currentIndex = maxIndex;
        } else {
            currentIndex = index;
        }
        slides.style.transform = `translateX(-${currentIndex * 33}%)`;
        updateDots();
    }

    function nextSlide() {
        showSlide(currentIndex + 1);
    }

    function prevSlide() {
        showSlide(currentIndex - 1);
    }

    function updateDots() {
        const dots = document.querySelectorAll('.dot');
        const visibleSlides = 3;
        dots.forEach((dot, i) => {
            dot.classList.remove('active');
            if (i >= currentIndex && i < currentIndex + visibleSlides) {
                dot.classList.add('active');
            }
        });
    }
    // Evento para el botón "play"
    boton.addEventListener('click', elegirModo);
    // cartas.addEventListener('click', elegirTemática);

    // Logo login
    const imagen = document.getElementById('imagen');
    let subir = true;
    setInterval(() => {
        if (subir) {
            imagen.style.transform = 'translateY(-20px)';
        } else {
            imagen.style.transform = 'translateY(0)';
        }
        subir = !subir;
    }, 1000);

});
// function elegirTemática() {
//     let resultadoMostrar = "";
//     botonesJugar.style.display = "none";
//     // Generación dinámica del slider
//     resultadoMostrar += `
//             <img src="img/iconos/segundoMemory.png" alt="logoMemory" class="segundoInicio">
//             <h1 class="textoEleccion">Elige la temática del juego</h1>
//             <div id="juegos" class="">
//                 <div class="slider" id="">
//                     <div class="slides">
//                         <div class="slide opcion1"><img src="img/iconos/matematicas.png" alt="Imagen 1"></div>
//                         <div class="slide opcion2"><img src="img/iconos/animales.png" alt="Imagen 2"></div>
//                         <div class="slide opcion3"><img src="img/iconos/comida.png" alt="Imagen 3"></div>
//                         <div class="slide opcion4"><img src="img/iconos/paises.png" alt="Imagen 4"></div>
//                         <div class="slide opcion5"><img src="img/iconos/tecnologia.png" alt="Imagen 5"></div>
//                     </div>
//                     <button class="prev">&#10094;</button>
//                     <button class="next">&#10095;</button>
//                 </div>
//                 <div class="dots">
//                     <span class="dot"></span>
//                     <span class="dot"></span>
//                     <span class="dot"></span>
//                     <span class="dot"></span>
//                     <span class="dot"></span>
//                 </div>
//             </div>
//     `;

//     document.getElementById('contenido').innerHTML = resultadoMostrar;

//     // Añade los event listeners después de actualizar el DOM
//     document.querySelector('.prev').addEventListener('click', prevSlide);
//     document.querySelector('.next').addEventListener('click', nextSlide);
//     addEventListenersToDots();

//     // Inicializa el slide
//     showSlide(currentIndex);
// }