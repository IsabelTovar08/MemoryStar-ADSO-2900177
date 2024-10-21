/**
 * Título: Sonidos de Juego
 * Autor: María Isabel Tovar Pastrana
 * Fecha: 04 de Julio del 2024
 */
import { cargarAudios } from './sonidos.js';
document.addEventListener('DOMContentLoaded', () => {
    cargarAudios().then(audios => {
        // Elementos HTML
        const musicaFondo = document.getElementById('musicaFondo');
        const iconoMusica = document.getElementById('controlMusica');
        const sonidoCursor = document.getElementById('sonidoCursor');
        const sonidoClick = document.getElementById('click');
        const iconos = document.querySelectorAll('.efectosIconos');
        const volumenMusica = document.getElementById('volumenMusica');
        const volumenSonido = document.getElementById('volumenSonido');
        const botonSilencio = document.getElementById('botonSilencio');
        const cartas = document.querySelectorAll('.imagen');
        const sonidoCartas = document.getElementById('sonidoVoltearCartas');

        let isMuted = false;
        let userInteracted = false;

        // Recuperar el estado de la música y su tiempo
        const musicStatus = localStorage.getItem('musicStatus');
        const musicTime = localStorage.getItem('musicTime');

        if (musicStatus === 'playing') {
            musicaFondo.currentTime = musicTime ? parseFloat(musicTime) : 0;
            musicaFondo.play();
            iconoMusica.src = 'img/iconos/musicaa.png';
            iconoMusica.alt = 'Pausar';
        } else {
            iconoMusica.src = 'img/iconos/musicaApagada.png';
            iconoMusica.alt = 'Reproducir';
        }

        // Función para música de fondo
        function funcionMusicaFondo() {
            if (musicaFondo.paused) {
                musicaFondo.play();
                iconoMusica.src = 'img/iconos/musicaa.png';
                iconoMusica.alt = 'Pausar';
                localStorage.setItem('musicStatus', 'playing');
            } else {
                musicaFondo.pause();
                iconoMusica.src = 'img/iconos/musicaApagada.png';
                iconoMusica.alt = 'Reproducir';
                localStorage.setItem('musicStatus', 'paused');
            }
        }

        // Guardar el tiempo actual de la música en el localStorage
        musicaFondo.addEventListener('timeupdate', () => {
            localStorage.setItem('musicTime', musicaFondo.currentTime);
        });

        // Función para reproducir sonidos
        function reproducirSonido(sonido) {
            sonido.currentTime = 0; // Reinicia el sonido
            sonido.play().catch(error => {
                console.log('No se pudo reproducir el sonido:', error);
            });
        }

        // Controlar el volumen de la música
        function controlarVolumenMusica() {
            musicaFondo.volume = volumenMusica.value;
        }

        // Controlar el volumen de los sonidos
        function controlarVolumenSonido() {
            sonidoCursor.volume = volumenSonido.value;
            sonidoClick.volume = volumenSonido.value;
            sonidoCartas.volume = volumenSonido.value;
        }

        // Silenciar
        function silenciar() {
            isMuted = !isMuted;
            botonSilencio.textContent = isMuted ? 'Activar sonido' : 'Silenciar';
            musicaFondo.muted = isMuted;
            sonidoCursor.muted = isMuted;
            sonidoClick.muted = isMuted;
            sonidoCartas.muted = isMuted;
        }

        // Eventos
        // Al dar click en el ícono de música
        iconoMusica.addEventListener('click', funcionMusicaFondo);

        // Al interactuar con la página
        document.body.addEventListener('click', () => {
            userInteracted = true;
        });

        // Al interactuar con los íconos
        iconos.forEach(icono => {
            icono.addEventListener('click', () => reproducirSonido(sonidoClick));
            icono.addEventListener('mouseover', () => {
                if (userInteracted) {
                    reproducirSonido(sonidoCursor);
                }
            });
        });

        cartas.forEach(carta => {
            carta.addEventListener('click', () => reproducirSonido(sonidoCartas));
        });

        // Manipular el volumen
        volumenMusica.addEventListener('input', controlarVolumenMusica);
        volumenSonido.addEventListener('input', controlarVolumenSonido);

        // Al dar click en el botón silenciar
        botonSilencio.addEventListener('click', silenciar);
    });
});