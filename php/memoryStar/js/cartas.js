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
    const cartas = document.querySelectorAll('.carta');
    let cartasVolteadas = [];
    let aciertos = [];
    let fallos = [];
 
    let iteracion1;
    let iteracion2;
    let imprimir = '';

    for ( let iteracion = 0; iteracion < cartas.length; iteracion++) {
        cartas[iteracion].addEventListener('click', () => voltearCarta(cartas[iteracion]));
    }

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

    window.mostrarResultados = function() {
        imprimir = '<table class="table">';
        imprimir += '<tr>';
        for (iteracion1 = 0; iteracion1 < aciertos.length; iteracion1++) {
            imprimir += '<td>' + aciertos[iteracion1] + '</td>';
        }
        imprimir += '</tr>';
        imprimir += '<tr>';
        for (iteracion2 = 0; iteracion2 < fallos.length; iteracion2++) {
            imprimir += '<td>' + fallos[iteracion2] + '</td>';
        }
        imprimir += '</tr>';
        imprimir += '</table>';
        document.getElementById("resultados").innerHTML = imprimir;
    }
});
