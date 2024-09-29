var lugarI = document.querySelector('#desplegarOpciones');
var iconosv = document.querySelectorAll('.iconos');

lugarI.classList.add('visible');

function visivilidadIconos() {
    iconosv.forEach(function(icono) {
        if (icono.classList.contains('visible')) {
            icono.classList.remove('visible');
            lugarI.classList.add('visible');

        } else {
            icono.classList.add('visible');
        }
    });
}

lugarI.addEventListener('click', visivilidadIconos);