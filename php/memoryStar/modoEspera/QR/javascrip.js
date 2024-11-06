const contenedor = document.getElementById('QR')
let codigo = document.querySelector('.codigo')
let guardarNumero = [];
let numeroAleatorio;
for(let iteracion =0; iteracion<6; iteracion++){
    numeroAleatorio = Math.floor(Math.random()*10);
    guardarNumero.push(numeroAleatorio);

}


let numeroSinComas = guardarNumero.join("")

const abecedarioMayusculas = [];
const abecedarioMinusculas = [];

new QRCode(contenedor,`${numeroSinComas}`);
codigo.textContent = numeroSinComas


const copiar = document.querySelector('.botto-copiar')


// cuando le presiones copiar que se copie el codigo que esta en codigo
copiar.addEventListener('click', () => {
    navigator.clipboard.writeText(codigo.textContent)
    .then(() => {
        alert("copiado")
    })
    .catch(err => {
        console.error('No se pudo copiar', err)
    })
})  


// como hago para que el QR no se cambie si no este como esta 

