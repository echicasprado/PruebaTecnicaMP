IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'DICRI_DB')
BEGIN
  CREATE DATABASE DICRI_DB;
END;
GO

USE DICRI_DB;
GO

CREATE TABLE Role (
  id INT PRIMARY KEY IDENTITY(1,1),
  nombre VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE Estado(
    id INT PRIMARY KEY IDENTITY(1,1),
    nombre VARCHAR(50) NOT NOT UNIQUE
);

-- Crear tabla de Usuarios
CREATE TABLE Usuario (
  id INT PRIMARY KEY IDENTITY(1,1),
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  rol_id INT,
  FOREIGN KEY (rol_id) REFERENCES Role(id)
);


CREATE TABLE Expediente(
    id INT PRIMARY KEY IDENTITY(1,1),
    descripcion VARCHAR(250) NOT NULL,
    fecha DATETIME,
    coordinador_id INT, 
    estado_id INT 
    FOREIGN KEY (estado_id) REFERENCES Estado(id),
    FOREIGN KEY (coordinador_id) REFERENCES Usuario(id)
);

CREATE TABLE Indicio(
    id INT PRIMARY KEY IDENTITY(1,1),
    descripcion VARCHAR(250),
    color VARCHAR(50),
    tamanio VARCHAR(50),
    peso VARCHAR(50),
    ubicacion VARCHAR(100),
    tecnica_registrada VARCHAR(100),
    tecnico_id INT NOT NULL,
    expediente_id INT NOT NULL,
    FOREIGN KEY (tecnico_id) REFERENCES Usuario (id),
    FOREIGN KEY (expediente_id) REFERENCES Expediente(id)
);