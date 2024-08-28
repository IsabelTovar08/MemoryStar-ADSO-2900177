document.addEventListener('DOMContentLoaded', function() {
    var modalAyuda1 = new bootstrap.Modal(document.getElementById('exampleModal-ayuda'));
    var modalAyuda2 = new bootstrap.Modal(document.getElementById('exampleModal-ayuda2'));
    var modalAyuda3 = new bootstrap.Modal(document.getElementById('exampleModal-ayuda3'));
    var modalAyuda4 = new bootstrap.Modal(document.getElementById('exampleModal-ayuda4'));

    var goToModal2 = document.getElementById('goToModal2');
    var salir1 = document.getElementById('salir1');

    var goToModal3 = document.getElementById('goToModal3');
    var salir2 = document.getElementById('salir2');

    var goToModal4 = document.getElementById('goToModal4');
    var salir3 = document.getElementById('salir3');

    //modal2
    goToModal2.addEventListener('click', function() {
        modalAyuda1.hide(); // Oculta el primer modal
        modalAyuda1._element.addEventListener('hidden.bs.modal', function () { 
            modalAyuda2.show(); // Muestra el segundo modal 
        }, { once: true });
    });

    salir1.addEventListener('click', function() {
        modalAyuda2.hide(); // Oculta modal
        modalAyuda2._element.addEventListener('hidden.bs.modal', function(){
            modalAyuda1.show(); // devueleve al primer modal
        }, { once: true });

    });

    //modal 3
    goToModal3.addEventListener('click', function() {
        modalAyuda1.hide(); // Oculta el primer modal
        modalAyuda1._element.addEventListener('hidden.bs.modal', function () { 
            modalAyuda3.show(); // Muestra el tercer modal 
        }, { once: true });
    });

    salir2.addEventListener('click', function() {
        modalAyuda3.hide(); // Oculta modal
        modalAyuda3._element.addEventListener('hidden.bs.modal', function(){
            modalAyuda1.show(); // devueleve al primer modal
        }, { once: true });

    });

    //modal 4
    goToModal4.addEventListener('click', function() {
        modalAyuda1.hide(); // Oculta el primer modal
        modalAyuda1._element.addEventListener('hidden.bs.modal', function () { 
            modalAyuda4.show(); // Muestra el cuarto modal 
        }, { once: true });
    });
    salir3.addEventListener('click', function() {
        modalAyuda4.hide(); // Oculta modal
        modalAyuda4._element.addEventListener('hidden.bs.modal', function(){
            modalAyuda1.show(); // devueleve al primer modal
        }, { once: true });

    });
});
