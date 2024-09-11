document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('seguirJugando');
    const regresiva = document.getElementById('regresiva');
    let intervalo;

    modal.addEventListener('shown.bs.modal', function () {
        let tiempo = 5; // segundos
        regresiva.textContent = `${tiempo}s`;
        intervalo = setInterval(function() {
            tiempo -= 1;
            regresiva.textContent = `${tiempo}s`;

            if (tiempo <= 0) {
                clearInterval(intervalo);
                regresiva.textContent = "0s";
                // Cierra el modal cuando el contador llega a cero
                const modalInstance = bootstrap.Modal.getInstance(modal);
                modalInstance.hide();
            }
        }, 1000);
    });

    modal.addEventListener('hidden.bs.modal', function () {
        clearInterval(intervalo); //si se acabba se detiene
    });
});
