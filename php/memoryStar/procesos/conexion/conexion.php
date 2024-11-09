<?php
class conexion {
    private $servidor;
    private $usuario;
    private $password;
    private $puerto;
    private $baseDatos;
    public function __construct(){
        $this->servidor = "localhost";
        $this->usuario = "postgres";
        $this->password = "123456";
        $this->puerto = "5432";
        $this->baseDatos = "corredor";
    }
    public function conectar (){
       try{
        $dsn = "pgsql:host = $this->servidor;port=$this->puerto;dbname=$this->baseDatos";
        $pdo = new PDO($dsn, $this->usuario, $this->password,[
            PDO::ATTR_ERRMODE =>PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
        ]);
            // echo 'conexion exitosa yei';
       }catch(PDOException $e){
            echo 'conexion fallida'. $e->getMessage();
       }
       return $pdo;
    }
        

        public function ejecutar($sql, $valores) {
            $pdo = $this->conectar();
            if (!$pdo) return false; 
    
            $stmt = $pdo->prepare($sql);
            return $stmt->execute($valores); 
        }


        public function login($sql, $valores){
            $pdo =$this->conectar();
            $stmt= $pdo->prepare($sql);
            $stmt->execute($valores);
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        }


        public function obtenerUltimoIdConfiguracion() {
            $sql = "SELECT id_configuracion_juego FROM configuracionJuego ORDER BY id_configuracion_juego DESC LIMIT 1";
            $conexion = $this->conectar(); // Conectar a la base de datos
            $stmt = $conexion->prepare($sql); // Preparar la consulta
            $stmt->execute(); // Ejecutar la consulta
        
            // Obtener el resultado
            $resultado = $stmt->fetch(PDO::FETCH_ASSOC); // Obtener la fila asociativa
        
            return $resultado ? $resultado['id_configuracion_juego'] : null; 
        }
        


    }

   






// $conexion = new conexion();
// $conexion->conectar();