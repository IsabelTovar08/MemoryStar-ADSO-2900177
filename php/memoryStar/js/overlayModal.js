document.addEventListener('DOMContentLoaded', function() {
    var modalAyuda1 = new bootstrap.Modal(document.getElementById('exampleModal-ayuda'));
    var modalAyuda2 = new bootstrap.Modal(document.getElementById('exampleModal-ayuda2'));
    var modalAyuda3 = new bootstrap.Modal(document.getElementById('exampleModal-ayuda3'));
    var modalAyuda4 = new bootstrap.Modal(document.getElementById('exampleModal-ayuda4'));

    var goToModal2 = document.getElementById('goToModal2');
    var goToModal3 = document.getElementById('goToModal3');
    var goToModal4 = document.getElementById('goToModal4');

    goToModal2.addEventListener('click', function() {
        modalAyuda1.hide(); // Oculta el primer modal
        modalAyuda1._element.addEventListener('hidden.bs.modal', function () { 
            modalAyuda2.show(); // Muestra el segundo modal después de ocultar el primero
        }, { once: true });
    });

    goToModal3.addEventListener('click', function() {
        modalAyuda1.hide(); // Oculta el primer modal
        modalAyuda1._element.addEventListener('hidden.bs.modal', function () { 
            modalAyuda3.show(); // Muestra el tercer modal después de ocultar el primero
        }, { once: true });
    });

    goToModal4.addEventListener('click', function() {
        modalAyuda1.hide(); // Oculta el primer modal
        modalAyuda1._element.addEventListener('hidden.bs.modal', function () { 
            modalAyuda4.show(); // Muestra el cuarto modal después de ocultar el primero
        }, { once: true });
    });
});
