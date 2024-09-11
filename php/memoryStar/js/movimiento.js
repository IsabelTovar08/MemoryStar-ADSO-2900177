const imagenes = document.querySelectorAll('.imagen');
let subir = true;

setInterval(() => {
    imagenes.forEach(imagen => {
        if (subir) {
            imagen.style.transform = 'translateY(-8px)';
        } else {
            imagen.style.transform = 'translateY(0)';
        }
    });
    subir = !subir;
}, 1000);
