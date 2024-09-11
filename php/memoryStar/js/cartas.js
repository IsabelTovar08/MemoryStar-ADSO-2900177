document.addEventListener('DOMContentLoaded', function() {
    const contenedor = document.querySelector('.contenedorCartas');
    const cartas = Array.from(document.querySelectorAll('.carta')); // Convertir NodeList a Array
    let cartasVolteadas = [];
    let aciertos = 0;
    const totalAciertos = cartas.length / 2; // Total de pares de cartas
    let intervalo;
    let tiempoRestante = 60; // 60 segundos

    // Mezclar las cartas
    function mezclarCartas() {
        const cartasParaMezclar = cartas.filter(carta => !carta.classList.contains('central'));

        for (let iteracionMezclar = cartasParaMezclar.length - 1; iteracionMezclar > 0; iteracionMezclar--) {
            const j = Math.floor(Math.random() * (iteracionMezclar + 1));
            contenedor.appendChild(cartasParaMezclar[j]);
        }
    }

    // Función para voltear las cartas
    function voltearCarta(carta) {
        if (cartasVolteadas.length === 2) return;

        carta.classList.add('volteada');
        cartasVolteadas.push(carta);

        if (cartasVolteadas.length === 2) {
            const [primeraCarta, segundaCarta] = cartasVolteadas;
            const idPrimeraCarta = primeraCarta.getAttribute('data-id');
            const idSegundaCarta = segundaCarta.getAttribute('data-id');

            if (idPrimeraCarta === idSegundaCarta) {
                aciertos++;
                cartasVolteadas = [];

                // Verificar si todas las cartas han sido resueltas
                if (aciertos === totalAciertos) {
                    clearInterval(intervalo);
                    alert("¡Has resuelto todas las cartas!");
                }
            } else {
                setTimeout(() => {
                    primeraCarta.classList.remove('volteada');
                    segundaCarta.classList.remove('volteada');
                    cartasVolteadas = [];
                }, 1000);
            }
        }
    }

    // Iniciar el contador de tiempo
    function iniciarContador() {
        intervalo = setInterval(() => {
            tiempoRestante--;
            
            console.log(`Tiempo restante: ${tiempoRestante} segundos`);

            if (tiempoRestante <= 0) {
                clearInterval(intervalo);
                alert("¡Se acabó el tiempo!");
                // Aquí podrías deshabilitar las cartas para que no se puedan seguir volteando
            }
        }, 1000);
    }

    // Vincular eventos de clic a las cartas después de mezclar
    function inicializarJuego() {
        for (let iteracion = 0; iteracion < cartas.length; iteracion++) {
            cartas[iteracion].addEventListener('click', function() {
                voltearCarta(cartas[iteracion]);
            });
        }
    }

    // Iniciar el juego
    mezclarCartas();
    inicializarJuego();
    iniciarContador();
});
