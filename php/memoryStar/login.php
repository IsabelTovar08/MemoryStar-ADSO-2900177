<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Iniciar Sesión - MemoryStart ¡Pon a prueba tu memoria!</title>
    <link rel="shortcut icon" href="img/iconos/segundoMemory.png">
    <link rel="stylesheet" href="bootstrap/css/bootstrap.css">
    <link rel="stylesheet" href="css/estilosLogin.css">
</head>
<body>
    <div class="container-xxl">
        <img id="imagen" src="img/iconos/nuevoMemory.png" alt="Ejemplo de Imagen" width="370" class="logo">
        <div class="tarjeta">
            <form class="formularioLogin">
                <div class="label">
                    <h2>Iniciar Sesión</h2>
                </div>
                <div class="formField"><input id="username" required="" type="text" /><span>Usuario</span></div>
                <div class="formField"><input id="password" required="" type="password" /><span>Contraseña</span></div>
                <span class="olvidarContraseña">¿Olvidaste tu contraseña?</span>
                <button type="submit">Iniciar</button>
                <span class="noTienesCuenta">¿No tienes cuenta? <a href="signup.php">Regístrate</a></span>
            </form>
        </div>
    </div>
    <script src="js/login.js"></script>
</body>
</html>