CREATE DATABASE Tienda;
USE Tienda;

CREATE TABLE Usuarios (
    id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    nombre_usuario VARCHAR(50) UNIQUE NOT NULL,
    correo VARCHAR(100) UNIQUE NOT NULL,
    contrasena VARCHAR(255) NOT NULL,
    monedas INT DEFAULT 0,
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Articulos (
    id_articulo INT PRIMARY KEY AUTO_INCREMENT,
    nombre_articulo VARCHAR(100) NOT NULL,
    tipo_articulo ENUM('Icono', 'Poder') NOT NULL,
    precio INT NOT NULL,
    descripcion TEXT
);

CREATE TABLE Compras (
    id_compra INT PRIMARY KEY AUTO_INCREMENT,
    id_usuario INT,
    id_articulo INT,
    fecha_compra DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario),
    FOREIGN KEY (id_articulo) REFERENCES Articulos(id_articulo)
);

CREATE TABLE IconosDesbloqueados (
    id_desbloqueo INT PRIMARY KEY AUTO_INCREMENT,
    id_usuario INT,
    id_articulo INT,
    fecha_desbloqueo DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario),
    FOREIGN KEY (id_articulo) REFERENCES Articulos(id_articulo),
    UNIQUE (id_usuario, id_articulo)
);

CREATE TABLE PoderesAdquiridos (
    id_adquisicion INT PRIMARY KEY AUTO_INCREMENT,
    id_usuario INT,
    id_articulo INT,
    cantidad INT DEFAULT 1,
    fecha_adquisicion DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario),
    FOREIGN KEY (id_articulo) REFERENCES Articulos(id_articulo),
    UNIQUE (id_usuario, id_articulo)
);
