// Logo login
let botonBuscar = document.getElementById('buscarCuenta');
let cancelarCorreo = document.getElementById('cancelarRecupera');

botonBuscar.addEventListener('click', buscarCuenta);

function buscarCuenta() {
    let correo = document.getElementById('emalRecuperar').value;
    let resultadoMostrar = "";

    resultadoMostrar += `
                <div class="modal-body">
                    <h4>Se enviará un código a tu correo</h4><br>
                    <h5 style="margin-left: 5%;">Se enviará un código al correo</h5>
                    <h5 style="margin-left: 50%;">${correo}</h5><br>
                     <div class="botones">
                        <button type="button" class="btn" id="cancelarCorreo">Cancelar</button>
                        <button type="button" onclick="eviarEmail();" class="btn aceptar" id="confirmarCorreo">Confirmar</button>
                    </div>
                </div>
    `;
    document.getElementById('buscarEmail').innerHTML = resultadoMostrar;
}
function eviarEmail() {
    let resultadoMostrar = "";

    resultadoMostrar += `
                <div class="modal-body">
                    <h4>Ingresa tu código.</h4><br>
                    <h5 style="margin-left: 5%;">Ingresa el código que se envió a tu coreo.</h5>
                    <div class="inputs"><input id="codigoRecuperarClave" type="text" required/><span><i class="bi bi-envelope-at"></i> Código</span></div>
                    <div class="botones">
                        <button type="submit" onclick="nuevaClave();" class="btn aceptar" id="verificarCodigo">Verificar</button>
                    </div>
                </div>
    `;
    document.getElementById('buscarEmail').innerHTML = resultadoMostrar;
}
function nuevaClave() {
    let resultadoMostrar = "";

    resultadoMostrar += `
                    <div class="modal-body">
                        <h4>Ingresa tu nueva contraseña.</h4><br>
                        <div class="inputs"><input id="codigoRecuperarClave" type="text" required/><span><i class="bi bi-envelope-at"></i> Contraseña</span></div>
                        <div class="inputs"><input id="codigoRecuperarClave" type="text" required/><span><i class="bi bi-envelope-at"></i> Confirmar contraseña</span></div>
                        <div class="botones">
                            <button type="submit" onclick="cuentaRecuperada();" class="btn aceptar" id="verificarNuevaClave">Verificar</button>
                        </div>
                    </div>
        `;
    document.getElementById('buscarEmail').innerHTML = resultadoMostrar;
}

function cuentaRecuperada() {
    let resultadoMostrar = "";

    resultadoMostrar += `
                    <div class="modal-body">
                        <h4>¡Cuenta recuperada!</h4><br>
                        <h5 style="margin-left: 5%;">Usa tu nueva contraseña para acceder</h5>
                        <div class="botones">
                            <button type="submit" class="btn aceptar" id="buscarCuenta">Acceder</button>
                        </div>
                    </div>
        `;
    document.getElementById('buscarEmail').innerHTML = resultadoMostrar;
}
function codigoIncorrecto() {
    let resultadoMostrar = "";

    resultadoMostrar += `
                    <div class="modal-body">
                        <h4>¡Cuenta recuperada!</h4><br>
                        <h5 style="margin-left: 5%;">Usa tu nueva contraseña para acceder</h5>
                        <div class="botones">
                            <button type="submit" class="btn aceptar" id="buscarCuenta" data-bs-dismiss="modal">Acceder</button>
                        </div>
                    </div>
        `;
    document.getElementById('buscarEmail').innerHTML = resultadoMostrar;
}