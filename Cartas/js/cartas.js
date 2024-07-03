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

function hola() {
    var cartas = document.getElementsByClassName('carta');
    for (var cartaSeleccionada = 0; cartaSeleccionada < cartas.length; cartaSeleccionada++) {
        cartas[cartaSeleccionada].onclick = voltearCarta;
    }
}
function voltearCarta() {
    this.classList.toggle('volteada');
}
document.addEventListener('DOMContentLoaded', hola);


