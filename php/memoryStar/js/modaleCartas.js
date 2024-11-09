import { JuegoCartas } from './../juego/espacial/cartas/js/cartas.js';

class JuegoModal {
    constructor() {
        this.myModal = document.getElementById('modalInicio');
        this.overlay = document.querySelector('.overlay');
        this.omitir = document.querySelector('.omitir');
        this.empezar = document.querySelector('.game-start-message');
        this.ronda = document.getElementById('ronda');
        this.modalBody = document.getElementById('modalBody');
        this.nextButton = document.getElementById('nextButton');
        this.modalContents = [
            "¡Bienvenido, explorador! Tu misión es encontrar las cartas que contienen pistas esenciales para ensamblar una nave espacial. Cada pareja de cartas que encuentres te acercará a tu objetivo.",
            "Comienza volteando las cartas para buscar parejas. Cuando encuentres una pareja, recibirás una pista que te mostrará el orden correcto para ensamblar la nave espacial. ¡Mantente atento a los detalles!",
            "Una vez que hayas encontrado todas las parejas, serás transportado a la siguiente escena. Allí deberás buscar las partes de la nave que corresponden a las pistas que has recogido."
        ];
        this.currentModalIndex = 0;

        this.initEventListeners();
    }

    initEventListeners() {
        document.addEventListener('DOMContentLoaded', () => {
            this.myModal.style.display = 'flex';
            this.omitir.addEventListener('click', () => this.iniciarJuego());
            this.nextButton.addEventListener('click', () => this.mostrarSiguienteContenidoModal());
        });
    }

    mostrarSiguienteContenidoModal() {
        this.modalBody.classList.add('fade-out');

        setTimeout(() => {
            this.currentModalIndex++;

            if (this.currentModalIndex < this.modalContents.length) {
                this.modalBody.innerHTML = this.modalContents[this.currentModalIndex];
                this.modalBody.classList.remove('fade-out');
                this.modalBody.classList.add('fade-in');

                if (this.currentModalIndex === this.modalContents.length - 1) {
                    this.nextButton.textContent = 'Finalizar';
                }
            } else {
                this.iniciarJuego();
            }

            setTimeout(() => {
                this.modalBody.classList.remove('fade-in');
            }, 500);
        }, 500);
    }

    iniciarJuego() {
        this.myModal.style.display = 'none';
        this.overlay.style.display = 'none';
        this.empezar.style.display = 'flex';

        setTimeout(() => {
            this.empezar.style.display = 'none';
            this.ronda.style.display = 'flex';
        }, 1500);

        new JuegoCartas();
    }
}

// Crear una instancia de la clase para iniciar el modal
new JuegoModal();