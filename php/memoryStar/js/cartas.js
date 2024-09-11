/** 
 * Borrador del movivmiento de las cartas
 * Autor:  Mauricio noscue 
 * Fecha: 01/07/204
*/


/**
 * Modificación: al voltear una carta muestre otro fondo
 * Mdoficado por: Mauricio noscue 
 * Fecha: 02/07/2024
 */

/**
 * Modificación: Al voltear una carta que vuelva a la posición incial en dos segundos 
 * Mdoficado por: Mauricio noscue 
 * Fecha: 05/07/2024
 */

/**
 * Modificación: Si las cartas son iguales que se mantengan volteadas y si no lo son que vuelvan a la posición inicial 
 * Mdoficado por: Mauricio noscue 
 * Fecha: 05/07/2024
 */
document.addEventListener('DOMContentLoaded', function() {
    const contenedor = document.querySelector('.contenedorCartas');
    const central = document.querySelectorAll('.central');
    const cartas = Array.from(document.querySelectorAll('.carta')); // Convertir NodeList a Array
    let cartasVolteadas = [];
    let aciertos = [];
    let fallos = [];

    

    // Mezclar las cartas
function mezclarCartas() {
    // Filtrar las cartas que no tienen la clase 'central'
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
                aciertos.push(20);
                cartasVolteadas = [];
            } else {
                fallos.push(10);
                setTimeout(() => {
                    primeraCarta.classList.remove('volteada');
                    segundaCarta.classList.remove('volteada');
                    cartasVolteadas = [];
                }, 1000);
            }
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

});
