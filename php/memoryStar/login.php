<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Iniciar Sesión - MemoryStart ¡Pon a prueba tu memoria!</title>
    <link rel="shortcut icon" href="img/iconos/segundoMemory.png">
    <link rel="stylesheet" href="bootstrap/css/bootstrap.css">
    <link rel="stylesheet" href="css/estilosLogin.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css">

</head>

<body>
    <a href="index.php">Volver</a>
    <div class="container-xxl contenido">
        <img id="imagen" src="img/iconos/nuevoMemory.png" alt="Ejemplo de Imagen" class="logo">
        <div class="login">
            <div class="label">
                <h2>Iniciar Sesión</h2>
            </div>
            <div class="tarjeta form">
                <form class="formularioLogin">
                    <div class="inputs"><input id="username" required="" type="text" /><span><i class="bi bi-person"></i> Usuario</span></div>
                    <div class="inputs"><input id="password" required="" type="password" /><span><i class="bi bi-lock"></i> Contraseña</span></div>
                    <span class="olvidarContraseña" data-bs-toggle="modal" data-bs-target="#recuperarContraseña">¿Olvidaste tu contraseña?</span>
                    <button type="submit">Iniciar <i class="bi bi-box-arrow-in-right"></i></button>
                    <span class="noTienesCuenta">¿No tienes cuenta? <a href="signup.php">Regístrate</a></span>
                </form>
            </div>
        </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="recuperarContraseña" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content recupera" id="buscarEmail">
                <div class="modal-body">
                    <h4>Recuperar Cuenta</h4><br>
                    <h5 style="margin-left: 5%;">Ingresa el correo eléctrónico asociado a tu cuenta.</h5>
                    <div class="inputs"><input id="emalRecuperar" required="" type="text" /><span><i class="bi bi-envelope-at"></i> Email</span></div>
                    <div class="botones">
                        <button type="button" class="btn" id="cancelarR" data-bs-dismiss="modal">Cancelar</button>
                        <button type="button" class="btn aceptar" id="buscarC">Buscar</button>
                    </div>
                </div>
            </div>
            <div class="dots">
                <span class="dot" onclick="goToSlide(0)"></span>
                <span class="dot" onclick="goToSlide(1)"></span>
                <span class="dot" onclick="goToSlide(2)"></span>
                <span class="dot" onclick="goToSlide(3)"></span>
            </div>
        </div>
    </div>
    <script src="js/login.js"></script>
    <script src="bootstrap/js/bootstrap.js"></script>
</body>

</html>