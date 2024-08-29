document.addEventListener("DOMContentLoaded", function () {
    function operaciones() {
        let puntuacion = parseInt(document.getElementById("txtnumero1").value);
        const maximaPuntuacion = 1000;
        const barra = document.getElementById("barra-progreso");
        let progresoBarra = (puntuacion / maximaPuntuacion) * 100;
        barra.style.width = progresoBarra + "%";
        return false;
    }

    document.querySelector("form").onsubmit = operaciones;


    const imagen = document.querySelectorAll('.rango');
    let subir = true;
    setInterval(() => {
        if(subir){
            imagen.style.transform = 'translateY(-8px)';
        }else{
            imagen.style.transform = 'translateY(0)';
        }
        subir = !subir;
    }, 1000);
});
