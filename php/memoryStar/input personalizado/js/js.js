let input = document.getElementById('input');
let emoji = document.querySelectorAll('#emoji');
let iconoEmoji =  document.querySelector('.icon_input');
let label = document.querySelector('.label_input')
let containerEmoji = document.querySelector('.container_emojis');
let send  = document.querySelector('.send');

iconoEmoji.addEventListener('click',()=>{
    containerEmoji.classList.toggle('open_container_emojis');
})

function funcion_input(){
    if(input.value === ""){
        label.classList.remove('add_toogle')
        send.classList.add('disabled')
        send.setAttribute('disabled', send) // agregar atributo al elemento y poner a que elemento
        containerEmoji.classList.remove('open_container_emojis');
    }else{
        label.classList.add('add_toogle')
        send.classList.remove('disabled')
        send.removeAttribute('disabled') //quitar el atributo

    }
}
input.addEventListener('keyup',()=>{ // ingresar algo en el input
    input.setAttribute("value",document.getElementById('input').value)
    funcion_input()
})





for(const emojis of emoji){
emojis.addEventListener('click',()=>{
    input.setAttribute("value",document.getElementById('input').value +=  emojis.innerHTML);
    if(input !=""){
        label.classList.add('add_toogle')
    }
    funcion_input()
})
}

send.addEventListener('click',()=>{
    containerEmoji.classList.remove('open_container_emojis');
    alert("el mensaje enviado fue: "+input.value)
    input.value = "";
    label.classList.remove('add_toogle')
    funcion_input()
})