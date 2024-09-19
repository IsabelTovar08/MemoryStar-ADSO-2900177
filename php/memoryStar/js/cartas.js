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
                mostrarMensaje(aciertos);

                if (aciertos === totalAciertos) {
                    setTimeout(() => {
                        // Redirigir al usuario después de mostrar el último mensaje
                        window.location.href = 'otra-pagina.html'; // Cambia esto a la URL de destino
                    }, 3000); // Esperar 3 segundos antes de redirigir
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

    function mostrarMensaje(aciertos) {
        const mensajeDiv = document.getElementById(`mensaje${aciertos}`);
        const mensajeTexto = document.getElementById(`mensajeTexto${aciertos}`);
        const mensajes = ['¡Pareja 1 completada!', '¡Pareja 2 completada!', '¡Pareja 3 completada!', '¡Pareja 4 completada!'];
        
        if (mensajeDiv) {
            mensajeTexto.textContent = mensajes[aciertos - 1];
            mensajeDiv.style.display = 'block';
            
            setTimeout(() => {
                mensajeDiv.style.display = 'none';
            }, 6000); // Mostrar el mensaje durante 2 segundos
        }
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
