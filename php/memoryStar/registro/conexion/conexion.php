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
        $this->baseDatos = "memo";
    }
    public function conectar (){
       try{
        $dsn = "pgsql:host = $this->servidor;port=$this->puerto;dbname=$this->baseDatos";
        $pdo = new PDO($dsn, $this->usuario, $this->password,[
            PDO::ATTR_ERRMODE =>PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
        ]);
            echo 'conexion exitosa yei';
       }catch(PDOException $e){
            echo 'conexion fallida'. $e->getMessage();
       }
       return $pdo;
    }
    public function ejecutar($sql, $valores){
        $pdo =$this->conectar();
        $stmt= $pdo->prepare($sql);
        $stmt->execute($valores);
    }
}
$conexion = new conexion();
$conexion->conectar();