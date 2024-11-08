const tablas = document.querySelectorAll('.Tabla-cuerpo')

const bottomHistoricoSolo = document.querySelector('.historico-solo')
const bottomHistoricoMulti = document.querySelector('.historico-multi')



bottomHistoricoSolo.addEventListener('click',()=>{
    bottomHistoricoSolo.style.background = "rgb(43, 7, 247)"
    bottomHistoricoSolo.style.color = "white"
    bottomHistoricoMulti.style.background = "white"
    bottomHistoricoMulti.style.color = "black"
    bottomHistoricoSolo.style.transition = "all 2 ease"
    bottomHistoricoMulti.style.transition = "all 2 ease"


    tablas[0].style.display = 'inline-table'
    tablas[1].style.display = 'none'

})

bottomHistoricoMulti.addEventListener('click',()=>{
    bottomHistoricoMulti.style.background = "rgb(43, 7, 247)"
    bottomHistoricoMulti.style.color = "white"
    bottomHistoricoSolo.style.background = "white"
    bottomHistoricoSolo.style.color = "black"
    bottomHistoricoMulti.style.transition = "all 2 ease"
    bottomHistoricoSolo.style.transition = "all 2 ease"


    tablas[1].style.display= 'inline-table' 
    tablas[0].style.display = 'none'

})