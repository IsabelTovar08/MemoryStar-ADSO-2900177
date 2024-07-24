<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Formulario de Inicio de Sesión</title>
    <link rel="stylesheet" href="css/estilosLogin.css">
</head>

<body>

    <div class="container">
        <form class="formularioLogin">
            <label class="label">Iniciar Sesión</label>
            <input id="username" type="text" placeholder="Usuario" required>
            <input id="password" type="password" placeholder="Contraseña" required>
            <span class="olvidarContraseña">¿Olvidaste tu contraseña?</span>
            <button type="submit">Iniciar</button>
            <span class="noTienesCuenta">¿No tienes cuenta? <a href="">Regístrate</a></span>
        </form>
    </div>
</body>
</html>
