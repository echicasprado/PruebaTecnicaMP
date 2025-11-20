USE DICRI_DB;

INSERT INTO Role (nombre) VALUES ('Admin'), ('Tecnico'), ('Coordinador');
INSERT INTO Estado (nombre) VALUES ('En proceso'), ('Aprobado'), ('Rechazado');

INSERT INTO Usuario (nombre, email, password_hash, rol_id) VALUES
('Admin User', 'admin@example.com', 'admin_hash', 1),
('Tecnico User 1', 'tecnico1@example.com', 'tec1_hash', 2),
('Tecnico User 2', 'tecnico2@example.com', 'tec2_hash', 2),
('Coordinador User 1', 'coordinador1@example.com', 'coord1_hash', 3),
('Coordinador User 2', 'coordinador2@example.com', 'coord2_hash', 3);

INSERT INTO Expediente (descripcion, fecha, justificacion_rechazo, tecnico_id, coordinador_id, estado_id) VALUES
('Expediente 1', GETDATE(), NULL, 2, 4, 1),
('Expediente 2', GETDATE(), NULL, 2, 5, 2),
('Expediente 3', GETDATE(), 'Falta de informacion', 3, 4, 3),
('Expediente 4', GETDATE(), NULL, 3, 5, 1),
('Expediente 5', GETDATE(), NULL, 2, 4, 2);

INSERT INTO Indicio (descripcion, color, tamanio, peso, ubicacion, tecnica_registrada, tecnico_id, expediente_id) VALUES
('Indicio 1 for Exp 1', 'Rojo', 'Pequeño', '10g', 'Mesa', 'Cromatografia', 2, 1),
('Indicio 2 for Exp 1', 'Azul', 'Grande', '1kg', 'Suelo', 'Espectrometria', 2, 1),
('Indicio 1 for Exp 2', 'Verde', 'Mediano', '50g', 'Caja', 'Microscopia', 2, 2),
('Indicio 1 for Exp 3', 'Negro', 'Pequeño', '5g', 'Bolsa', 'Cromatografia', 3, 3),
('Indicio 1 for Exp 4', 'Blanco', 'Grande', '2kg', 'Armario', 'Espectrometria', 3, 4);
