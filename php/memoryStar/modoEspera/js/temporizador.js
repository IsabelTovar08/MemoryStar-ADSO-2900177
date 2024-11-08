const tiempo = document.querySelector('.tiempo')
let minutos = 5 ;
function repetir(){
    let segundos =60;
    

    function mostrar(min){
        min = minutos
        if(segundos == 0 && minutos==0){
            alert('ya')
        }
        else if(segundos == 0){

            tiempo.textContent = min +':'+segundos;
            minutos -=1;
            setTimeout(repetir,1000)
        }else{
                segundos -=1;
                tiempo.textContent = min +':'+segundos;
                setTimeout(mostrar,1000)

        }
    }
    mostrar(minutos)

}
repetir()

const conteChat = document.querySelector('.conte-chat')
const flecha = document.querySelector('.flecha')
flecha.addEventListener('click',function(){
    conteChat.classList.toggle('show')
})