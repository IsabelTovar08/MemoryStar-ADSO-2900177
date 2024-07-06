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



function hola() {
    // Obtiene todas las cartas con la clase 'carta'
    let cartas = document.getElementsByClassName('carta');
    
    // Agrega un evento 'onclick' a cada carta para que se voltee al hacer clic
    for (let cartaSeleccionada = 0; cartaSeleccionada < cartas.length; cartaSeleccionada++) {
        cartas[cartaSeleccionada].onclick = voltearCarta;
    }
}

// Variables para almacenar la primera y segunda carta seleccionadas
let primeraCarta = null;
let segundaCarta = null;
// Variable para evitar que se puedan voltear más cartas mientras se comparan dos cartas
let bloqueo = false;

function voltearCarta() {
    // Si el bloqueo está activo, no permite voltear otra carta
    if (bloqueo) return;
    // Si la carta seleccionada es la misma que la primera carta, no hace nada
    if (this === primeraCarta) return;

    // Añade la clase 'volteada' a la carta seleccionada para voltear la carta
    this.classList.add('volteada');

    // Si no hay una primera carta seleccionada, esta será la primera carta
    if (!primeraCarta) {
        primeraCarta = this;
        return;
    }

    // Si ya hay una primera carta, esta será la segunda carta
    segundaCarta = this;
    // Activa el bloqueo para evitar que se puedan voltear más cartas
    bloqueo = true;

    // Obtiene los atributos 'data-id' de ambas cartas para compararlas
    const idPrimeraCarta = primeraCarta.getAttribute('data-id');
    const idSegundaCarta = segundaCarta.getAttribute('data-id');

    // Si los IDs son iguales, las cartas son iguales y se quedan volteadas
    if (idPrimeraCarta === idSegundaCarta) {
        resetearCartas(true);
    } else {
        // Si los IDs son diferentes, espera 2 segundos y las revierte a su estado inicial
        setTimeout(() => {
            primeraCarta.classList.remove('volteada');
            segundaCarta.classList.remove('volteada');
            resetearCartas(false);
        }, 1000); // 1000 ms = 1 segundos
    }
}

function resetearCartas(conservarVolteadas) {
    // Si las cartas no son iguales y no deben conservarse volteadas, las revierte a su estado inicial
    if (!conservarVolteadas) {
        primeraCarta.classList.remove('volteada');
        segundaCarta.classList.remove('volteada');
    }
    // Reinicia las variables de las cartas seleccionadas
    primeraCarta = null;
    segundaCarta = null;
    // Desactiva el bloqueo para permitir voltear otras cartas
    bloqueo = false;
}

// Agrega un evento 'DOMContentLoaded' para asegurarse de que el código se ejecute cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', hola);