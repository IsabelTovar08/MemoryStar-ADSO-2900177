const cuadros = document.querySelectorAll('.color');
const lugarDrop = document.querySelector('#contenedor-final');

cuadros.forEach((cuadro, indice) => {
    cuadro.setAttribute("id", "color"+indice)

    cuadro.addEventListener('dropover', (e) => {
        console.log("Estas moviendo el cuadrito "+ parseInt(indice+1))
        e.dataTransfer.setData("text", e.target.id)
    });
});
lugarDrop.addEventListener('dropover', (e) => {
    console.log('ya')
    e.preventDefault();

    let cuadro = e.dataTransfer.getData("text");
    e.target.appendChild(document.querySelector('#'+cuadro))
    console.log('ya')
});