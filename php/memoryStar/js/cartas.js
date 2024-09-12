document.addEventListener('DOMContentLoaded', function() {
    const contenedor = document.querySelector('.contenedorCartas');
    const cartas = Array.from(document.querySelectorAll('.carta')); // Convertir NodeList a Array
    let cartasVolteadas = [];
    let aciertos = 0;
    const totalAciertos = cartas.length / 2; // Total de pares de cartas
    let intervalo;
    let tiempoRestante = 10; // 60 segundos

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
            
                // Mostrar el primer modal
                var myModal = new bootstrap.Modal(document.getElementById('seguirJugando'));
                myModal.show();
            
                // Configurar para que se cierre automáticamente después de 3 segundos (puedes ajustar este tiempo)
                setTimeout(function() {
                    myModal.hide();
                    
                    // Mostrar el segundo modal después de que el primero se cierre
                    myModal._element.addEventListener('hidden.bs.modal', function () {
                        var modal2 = new bootstrap.Modal(document.getElementById('tablapuntuacionsolo'));
                        modal2.show();
                    }, {once: true}); // El {once: true} asegura que el evento se ejecuta solo una vez
                }, 3000); // Tiempo en milisegundos (3 segundos)
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
