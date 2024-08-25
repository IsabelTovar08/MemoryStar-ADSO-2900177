<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registrarse - MemoryStart ¡Pon a prueba tu memoria!r</title>
    <link rel="shortcut icon" href="img/iconos/segundoMemory.png">
    <link rel="stylesheet" href="bootstrap/css/bootstrap.css">
    <link rel="stylesheet" href="css/estilosLogin.css">
</head>
<body>
    <div class="container-xxl">
        <img id="imagen" src="img/iconos/nuevoMemory.png" alt="Ejemplo de Imagen" width="370" class="logo">
        <div class="tarjeta iniciarS">
            <form class="formularioLogin">
                <div class="label">
                    <h2>Registrarse</h2>
                </div>
                <div class="formField"><input id="username" required="" type="text" /><span>Nombre</span></div>
                <div class="formField"><input id="username" required="" type="text" /><span>Apellido</span></div>
                <div class="formField"><input id="username" required="" type="text" /><span>Teléfono</span></div>
                <div class="formField"><input id="username" required="" type="text" /><span>Email</span></div>
                <div class="formField"><input id="password" required="" type="password" /><span>Contraseña</span></div>
                <button type="submit">Iniciar</button>
                <span class="noTienesCuenta">¿Ya tienes una cuenta? <a href="login.php">Iniciar Sesión</a></span>
            </form>
        </div>
    </div>
    <script src="js/play.js"></script>
</body>
</html>