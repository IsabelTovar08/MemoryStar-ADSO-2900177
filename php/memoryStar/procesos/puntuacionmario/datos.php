<?php 
require_once '../conexion/conexion.php';  
header('Content-Type: application/json'); 
session_start();  

// Verificar que existe el id de usuario en sesión
if (!isset($_SESSION['id_usuario'])) {     
    echo json_encode(['error' => 'No hay usuario en sesión']);     
    exit; 
}  

// Recibir datos JSON 
$datos = json_decode(file_get_contents('php://input'), true);  

// Inicializar array de datos en sesión si no existe 
if (!isset($_SESSION['datos_archivos'])) {     
    $_SESSION['datos_archivos'] = []; 
}  

// Guardar datos del archivo actual 
$_SESSION['datos_archivos'][$datos['archivo']] = $datos;  

// Verificar si ya tenemos datos de los tres archivos 
if (count($_SESSION['datos_archivos']) === 3) {     
    // Calcular totales     
    $total_puntos = 0;     
    $total_diamantes = 0;     
    $total_tiempo = 0;          

    foreach ($_SESSION['datos_archivos'] as $datos_archivo) {         
        $total_puntos += $datos_archivo['puntos'];         
        $total_diamantes += $datos_archivo['diamantes'];         
        $total_tiempo += $datos_archivo['tiempo'];     
    }          

    try {         
        $conexion = new conexion();                  

        // Primero, obtener los puntos actuales del usuario
        $sqlTotal = "SELECT puntosacumulados, diamantes FROM usuario WHERE id_usuario = :id_usuario";
        $stmtTotal = $conexion->conectar()->prepare($sqlTotal);
        $stmtTotal->execute([':id_usuario' => $_SESSION['id_usuario']]);
        $usuarioActual = $stmtTotal->fetch(PDO::FETCH_ASSOC);
        
        // Calcular puntos totales
        $puntosTotal = $usuarioActual['puntosacumulados'] + $total_puntos;
        
        // Calcular nivel basado en puntos totales
        $nivel = 0;
        if ($puntosTotal > 10000) {
            $nivel = 5;
        } elseif ($puntosTotal > 7000) {
            $nivel = 4;
        } elseif ($puntosTotal > 5000) {
            $nivel = 3;
        } elseif ($puntosTotal > 3000) {
            $nivel = 2;
        } elseif ($puntosTotal > 1000) {
            $nivel = 1;
        }

        // Insertar registro de puntos
        $sql_insert_puntos = "INSERT INTO puntos (usuario_id, puntos, diamantes, tiempo) 
                               VALUES (:id_usuario, :puntos, :diamantes, :tiempo)
                               RETURNING idpuntos";
        $valores_insert = [
            ':id_usuario' => $_SESSION['id_usuario'],
            ':puntos' => $total_puntos,
            ':diamantes' => $total_diamantes,
            ':tiempo' => $total_tiempo
        ];
        $resultado_insert = $conexion->ejecutarInsert($sql_insert_puntos, $valores_insert);

        // Actualizar usuario con nuevos totales y nivel
        $sql_update_usuario = "UPDATE usuario 
                                SET puntosacumulados = :total_puntos,
                                    diamantes = diamantes + :diamantes,
                                    nivel = :nivel
                                WHERE id_usuario = :id_usuario
                                RETURNING *";
        $valores_update = [
            ':total_puntos' => $puntosTotal,
            ':diamantes' => $total_diamantes,
            ':nivel' => $nivel,
            ':id_usuario' => $_SESSION['id_usuario']
        ];
        $resultado_update = $conexion->ejecutarInsert($sql_update_usuario, $valores_update);

        if ($resultado_insert && $resultado_update) {
            // Limpiar datos de sesión de archivos
            unset($_SESSION['datos_archivos']);

            echo json_encode([
                'success' => true,
                'mensaje' => 'Datos guardados y usuario actualizado correctamente',
                'idpuntos' => $resultado_insert['idpuntos'],
                'totales' => [
                    'puntos' => $total_puntos,
                    'puntosAcumulados' => $puntosTotal,
                    'diamantes' => $total_diamantes,
                    'tiempo' => $total_tiempo,
                    'nivel' => $nivel,
                    'id_usuario' => $_SESSION['id_usuario']
                ]
            ]);
        } else {
            echo json_encode(['error' => 'Error al guardar los datos o actualizar usuario']);
        }
    } catch (Exception $e) {
        echo json_encode(['error' => 'Error en la base de datos: ' . $e->getMessage()]);
    }      
} else {     
    // Todavía no tenemos todos los datos     
    echo json_encode([         
        'success' => true,         
        'mensaje' => 'Datos recibidos',         
        'archivos_pendientes' => 3 - count($_SESSION['datos_archivos'])     
    ]); 
}