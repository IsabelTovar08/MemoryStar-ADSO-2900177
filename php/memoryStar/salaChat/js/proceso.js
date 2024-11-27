function procesarEleccionEspacial(juegoSeleccionado) {
    const tematica = document.querySelector('input[name="tipoJuegoEspacial"]:checked');
    const dificultad = document.querySelector('input[name="nivel"]:checked');

    if (!tematica || !dificultad) {
        alert("Por favor, completa todas las selecciones.");
        return;
    }

    // Redirigir con las selecciones
    window.location.href = `${juegoSeleccionado}_${tematica.value}_${dificultad.value}.php`;
}