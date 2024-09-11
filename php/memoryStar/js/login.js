    // Logo login
let botonBuscar = document.getElementById('buscarC');
let cancelarCorreo = document.getElementById('cancelarR');
let modalRecuperar = 
botonBuscar.addEventListener('click',buscarCuenta);
function buscarCuenta(){
let resultadoMostrar = "";
let correo = document.getElementById('emalRecuperar').value;
    resultadoMostrar += `
                <div class="modal-body">
                    <h4>Se enviará un código a tu correo</h4><br>
                    <h5 style="margin-left: 5%;">Se enviará un código al correo</h5>
                    <h5 style="margin-left: 50%;">${correo}</h5><br>
                     <div class="botones">
                        <button type="button" class="btn" id="cancelarR">Cancelar</button>
                        <button type="button" class="btn aceptar" id="confirmarC">Confirmar</button>
                    </div>
                </div>
    `;
    document.getElementById('buscarEmail').innerHTML = resultadoMostrar;
}