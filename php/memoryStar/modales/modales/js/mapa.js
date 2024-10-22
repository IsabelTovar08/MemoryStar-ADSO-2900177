document.addEventListener("DOMContentLoaded", function () {
    function operaciones() {
        let puntuacion = parseInt(document.getElementById("txtnumero1").value) || 0;
        const maximaPuntuacion = 1000;
        const barra = document.getElementById("barra-progreso");
        let progresoBarra = (puntuacion / maximaPuntuacion) * 100;
        barra.style.width = progresoBarra + "%";

       
        desbloquearRecompensas(progresoBarra);

        return false; 
    }

    function desbloquearRecompensas(progreso) {
        const recompensas = document.querySelectorAll('.recompensa img'); 
        const puntosDesbloqueo = [10, 30, 50, 70, 90]; 
        const imagenesDesbloqueadas = [
            'img/rangos/rango1.png', 
            'img/rangos/rango2.png',
            'img/rangos/rango3.png', 
            'img/rangos/rango4.png', 
            'img/rangos/rango5.png'  
        ];
        const imagenBloqueada = 'img/rangos/rangoBloqueadoo.png'; 
    
        for (let iteracionMapa = 0; iteracionMapa < recompensas.length; iteracionMapa++) {
            if (progreso >= puntosDesbloqueo[iteracionMapa]) {
                recompensas[iteracionMapa].src = imagenesDesbloqueadas[iteracionMapa]; 
            } else {
                recompensas[iteracionMapa].src = imagenBloqueada; 
            }
        }
    }
    

    document.querySelector("form").onsubmit = operaciones;

    
    const imagenes = document.querySelectorAll('.imagenMapa');
    let subir = true;
    setInterval(() => {
        imagenes.forEach(imagen => {
            imagen.style.transform = subir ? 'translateY(-8px)' : 'translateY(0)';
        });
        subir = !subir;
    }, 1000);
});
