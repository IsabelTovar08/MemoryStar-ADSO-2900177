<?php
session_start();
session_unset(); // Liberar todas las variables de sesión
session_destroy(); // Destruir la sesión

// Redirigir al login
header("Location: ../../antesLogin.html");
exit();
