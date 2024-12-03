document.addEventListener('DOMContentLoaded', () => {
    // Este código se ejecuta solo cuando el DOM está completamente cargado
    const contenedor = document.getElementById('QR');
    const codigoElement = document.getElementById('codigo_sala'); // Obtén el elemento
    let codigo = codigoElement ? codigoElement.textContent : ''; // Asegúrate de que no sea nulo
    
    // Verifica si el contenido está vacío
    if (!codigo.trim()) {
        console.error('El contenido de #codigo_sala está vacío o no se ha cargado aún.');
        return; // Detenemos el código si el valor está vacío
    }

    const contendorC = document.getElementById('codigoSalaModal');
    contendorC.textContent = `kjadcfhkewsi + ${codigo}`;

    // Genera el QR solo si el código no está vacío
    new QRCode(contenedor, codigo);

    const copiar = document.querySelector('.botto-copiar');
    copiar.addEventListener('click', () => {
        navigator.clipboard.writeText(codigo)
            .then(() => {
                console.log('Texto copiado');
            })
            .catch(err => {
                console.error('No se pudo copiar', err);
            });
    });
});
