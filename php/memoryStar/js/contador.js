let intervalo;
let tiempoRestante = 40; 
function iniciarContador() {
        intervalo = setInterval(() => {
            tiempoRestante--;
            
            console.log(`Tiempo restante: ${tiempoRestante} segundos`);

            if (tiempoRestante <= 0) {
                clearInterval(intervalo);
          
                var myModal = new bootstrap.Modal(document.getElementById('seguirJugando'));
                myModal.show();
            
               
                setTimeout(function() {
                    myModal.hide();
               
                    myModal._element.addEventListener('hidden.bs.modal', function () {
                        var modal2 = new bootstrap.Modal(document.getElementById('tablapuntuacionsolo'));
                        modal2.show();
                    }, {once: true}); 
                }, 3000); 
            }
        }, 1000);
    }


    iniciarContador();