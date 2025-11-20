CREATE DATABASE DICRI_DB;

CREATE TABLE Role (
  id INT PRIMARY KEY IDENTITY(1,1),
  nombre VARCHAR(50) NOT NULL,
  created_at DATETIME DEFAULT GETDATE(),
  updated_at DATETIME DEFAULT GETDATE(),
  available BIT DEFAULT 1
);

CREATE TABLE Estado(
    id INT PRIMARY KEY IDENTITY(1,1),
    nombre VARCHAR(50) NOT NULL,
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE(),
    available BIT DEFAULT 1
);

CREATE TABLE Usuario (
  id INT PRIMARY KEY IDENTITY(1,1),
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  rol_id INT,
  created_at DATETIME DEFAULT GETDATE(),
  updated_at DATETIME DEFAULT GETDATE(),
  available BIT DEFAULT 1,
  FOREIGN KEY (rol_id) REFERENCES Role(id)
);

CREATE TABLE Expediente(
    id INT PRIMARY KEY IDENTITY(1,1),
    descripcion VARCHAR(250) NOT NULL,
    fecha DATETIME,
    justificacion_rechazo VARCHAR(250),
    tecnico_id INT,
    coordinador_id INT,
    estado_id INT,
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE(),
    available BIT DEFAULT 1,
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
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE(),
    available BIT DEFAULT 1,
    FOREIGN KEY (tecnico_id) REFERENCES Usuario (id),
    FOREIGN KEY (expediente_id) REFERENCES Expediente(id)
);