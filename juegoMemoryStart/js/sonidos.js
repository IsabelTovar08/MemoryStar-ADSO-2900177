/**
 * Título: Sonidos de Juego
 * Autor: María Isabel Tovar Pastrana
 * Fecha: 04 de Julio del 2024
 */

// Música de fondo
const musicaFondo = document.getElementById('musicaFondo');
const iconoMusica = document.getElementById('controlMusica');

iconoMusica.addEventListener('click', () => {
    if (musicaFondo.paused) {
        musicaFondo.play();
        iconoMusica.src = 'img/iconos/sonido-encendido.png';
        iconoMusica.alt = 'Pausar';
    } else {
        musicaFondo.pause();
        iconoMusica.src = 'img/iconos/sonido-apagadoo.png';
        iconoMusica.alt = 'Reproducir';
    }
});

// Sonido al pasar el mouse por los íconos
const sonidoCursor = document.getElementById('sonidoCursor');
const iconos = document.querySelectorAll('.efectosIconos');

iconos.forEach(icono => {
    icono.addEventListener('mouseover', () => {
        sonidoCursor.currentTime = 0; // Reinicia el sonido
        sonidoCursor.play().catch(error => {
            console.log('No se pudo reproducir el sonido:', error);
        });
    });
});

// Sonido al dar click   
const sonidoClick = document.getElementById('click');

iconos.forEach(icono => {
    icono.addEventListener('click', () => {
        sonidoClick.currentTime = 0; // Reinicia el sonido
        sonidoClick.play().catch(error => {
            console.log('No se pudo reproducir el sonido:', error);
        });
    });
});

// Controlar el volumen de la música de Fondo
volumenMusica.addEventListener('input', () => {
    musicaFondo.volume = volumenMusica.value;
});
// Controlar el volumen del sonido
volumenSonido.addEventListener('input', () => {
    sonidoCursor.volume = volumenSonido.value;
    sonidoClick.volume = volumenSonido.value;
});
    
// Silenciar sonido general
const botonSilencio = document.getElementById('botonSilencio');
let isMuted = false;

botonSilencio.addEventListener('click', () => {
    isMuted = !isMuted;
    botonSilencio.textContent = isMuted ? 'Activar sonido' : 'Silenciar';
    musicaFondo.muted = isMuted;
    sonidoCursor.muted = isMuted;
    sonidoClick.muted = isMuted;
});