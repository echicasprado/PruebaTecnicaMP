CREATE PROCEDURE usp_GetRoles
AS
BEGIN
    SELECT * FROM Role WHERE available = 1;
END

CREATE PROCEDURE usp_GetEstados
AS
BEGIN
    SELECT * FROM Estado WHERE available = 1;
END

CREATE PROCEDURE usp_GetEstadoById
    @id INT
AS
BEGIN
    SELECT * FROM Estado WHERE id = @id AND available = 1;
END

CREATE PROCEDURE usp_CreateUsuario
    @nombre VARCHAR(100),
    @email VARCHAR(100),
    @password_hash VARCHAR(255),
    @rol_id INT
AS
BEGIN
    INSERT INTO Usuario (nombre, email, password_hash, rol_id) VALUES (@nombre, @email, @password_hash, @rol_id);
    SELECT SCOPE_IDENTITY() AS id;
END

CREATE PROCEDURE usp_GetUsuarios
AS
BEGIN
    SELECT id, nombre, email, rol_id, created_at, updated_at FROM Usuario WHERE available = 1;
END

CREATE PROCEDURE usp_GetUsuarioById
    @id INT
AS
BEGIN
    SELECT id, nombre, email, rol_id, created_at, updated_at FROM Usuario WHERE id = @id AND available = 1;
END

CREATE PROCEDURE usp_GetUsuarioByEmail
    @email VARCHAR(100)
AS
BEGIN
    SELECT * FROM Usuario WHERE email = @email AND available = 1;
END

CREATE PROCEDURE usp_UpdateUsuario
    @id INT,
    @nombre VARCHAR(100),
    @email VARCHAR(100),
    @rol_id INT
AS
BEGIN
    UPDATE Usuario SET
        nombre = @nombre,
        email = @email,
        rol_id = @rol_id
    WHERE id = @id;
END

CREATE PROCEDURE usp_DeleteUsuario
    @id INT
AS
BEGIN
    UPDATE Usuario SET available = 0 WHERE id = @id;
END

CREATE PROCEDURE usp_CreateExpediente
    @descripcion VARCHAR(250),
    @tecnico_id INT,
    @coordinador_id INT,
    @estado_id INT
AS
BEGIN
    INSERT INTO Expediente (descripcion, fecha, tecnico_id, coordinador_id, estado_id)
    VALUES (@descripcion, GETDATE(), @tecnico_id, @coordinador_id, @estado_id);
    SELECT SCOPE_IDENTITY() AS id;
END

CREATE PROCEDURE usp_GetExpedientes
AS
BEGIN
    SELECT * FROM Expediente WHERE available = 1;
END

CREATE PROCEDURE usp_GetExpedienteById
    @id INT
AS
BEGIN
    SELECT * FROM Expediente WHERE id = @id AND available = 1;
END

CREATE PROCEDURE usp_UpdateExpediente
    @id INT,
    @descripcion VARCHAR(250),
    @justificacion_rechazo VARCHAR(250),
    @tecnico_id INT,
    @coordinador_id INT,
    @estado_id INT
AS
BEGIN
    UPDATE Expediente SET
        descripcion = @descripcion,
        justificacion_rechazo = @justificacion_rechazo,
        tecnico_id = @tecnico_id,
        coordinador_id = @coordinador_id,
        estado_id = @estado_id
    WHERE id = @id;
END

CREATE PROCEDURE usp_DeleteExpediente
    @id INT
AS
BEGIN
    UPDATE Indicio SET available = 0 WHERE expediente_id = @id;
    UPDATE Expediente SET available = 0 WHERE id = @id;
END

CREATE PROCEDURE usp_CreateIndicio
    @descripcion VARCHAR(250),
    @color VARCHAR(50),
    @tamanio VARCHAR(50),
    @peso VARCHAR(50),
    @ubicacion VARCHAR(100),
    @tecnica_registrada VARCHAR(100),
    @tecnico_id INT,
    @expediente_id INT
AS
BEGIN
    INSERT INTO Indicio (descripcion, color, tamanio, peso, ubicacion, tecnica_registrada, tecnico_id, expediente_id)
    VALUES (@descripcion, @color, @tamanio, @peso, @ubicacion, @tecnica_registrada, @tecnico_id, @expediente_id);
    SELECT SCOPE_IDENTITY() AS id;
END

CREATE PROCEDURE usp_GetIndicios
AS
BEGIN
    SELECT * FROM Indicio WHERE available = 1;
END

CREATE PROCEDURE usp_GetIndicioById
    @id INT
AS
BEGIN
    SELECT * FROM Indicio WHERE id = @id AND available = 1;
END

CREATE PROCEDURE usp_GetIndiciosByExpedienteId
    @expediente_id INT
AS
BEGIN
    SELECT * FROM Indicio WHERE expediente_id = @expediente_id AND available = 1;
END

CREATE PROCEDURE usp_UpdateIndicio
    @id INT,
    @descripcion VARCHAR(250),
    @color VARCHAR(50),
    @tamanio VARCHAR(50),
    @peso VARCHAR(50),
    @ubicacion VARCHAR(100),
    @tecnica_registrada VARCHAR(100)
AS
BEGIN
    UPDATE Indicio SET
        descripcion = @descripcion,
        color = @color,
        tamanio = @tamanio,
        peso = @peso,
        ubicacion = @ubicacion,
        tecnica_registrada = @tecnica_registrada
    WHERE id = @id;
END

CREATE PROCEDURE usp_DeleteIndicio
    @id INT
AS
BEGIN
    UPDATE Indicio SET available = 0 WHERE id = @id;
END