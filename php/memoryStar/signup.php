<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registrarse - MemoryStart ¡Pon a prueba tu memoria!r</title>
    <link rel="shortcut icon" href="img/iconos/segundoMemory.png">
    <link rel="stylesheet" href="bootstrap/css/bootstrap.css">
    <link rel="stylesheet" href="css/estilosLogin.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css">
</head>

<body>
<a href="index.php">Volver</a>
<div class="container-xxl contenido">
        <img id="imagen" src="img/iconos/nuevoMemory.png" alt="Ejemplo de Imagen" class="logo">
        <div class="iniciarSesion">
            <div class="label">
                <h2>Iniciar Sesión</h2>
            </div>

            <?php
            include('controladores/controladorRegistro.php')
            ?>
            <div class="tarjeta form">
                <form class="formularioLogin"  method="post" action="">
                <div class="inputs"><input id="name"  name ="nombre" required="" type="text" /><span><i class="bi bi-person-add"></i> Nombre</span></div>
                <div class="inputs"><input id="lastname"  name ="apellido" required="" type="text" /><span><i class="bi bi-person-add"></i> Apellido</span></div>
                <div class="inputs"><input id="email"  name ="email" required="" type="text" /><span><i class="bi bi-envelope-at"></i> Email</span></div>
                    <div class="inputs"><input id="username"  name ="usuario" required="" type="text" /><span><i class="bi bi-person"></i> Usuario</span></div>
                    <div class="inputs"><input id="password"  name ="contraseña" required="" type="password" /><span><i class="bi bi-lock"></i> Contraseña</span></div>
                    <input   name = "registro"type="submit">Iniciar <i class="bi bi-box-arrow-in-right"></i></button>
                    <span class="noTienesCuenta">¿Ya tienes cuenta? <a href="login.php">Inicia Sesión</a></span>
                </form>
            </div>
        </div>
    </div>
    <script src="js/login.js"></script>
</body>

</html>