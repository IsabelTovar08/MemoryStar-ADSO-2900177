// mandar el mensaje
const nombre = [];



document.addEventListener('DOMContentLoaded',function(){
    fetch('../json/usuario.json')
    .then(response => response.json())
    .then(data => {
    data.forEach(user => {
            nombre.push(user.nombre)
    });
    })
    .catch(error => console.error('Error:', error));
})



function enviarMensaje(){
    const comentario = document.querySelector('.mensaje').value
    const mostrar = document.querySelector('.ver-mensaje')
    mostrar.innerHTML += `<div>
                            <div><b>${nombre[0]}</b></div>
                            <div>${comentario}</div>
                            </div>`;
}


function salir(){
    alert('salidar')
    window.location.href = '#' // poner enlaces
}

// temporizador


