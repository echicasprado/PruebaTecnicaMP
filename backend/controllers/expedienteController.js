const { sequelize } = require("../config/db");

const createExpediente = async (req, res) => {
  try {
    const { descripcion, tecnico_id, coordinador_id, estado_id } = req.body;

    if (!(descripcion && tecnico_id && coordinador_id && estado_id)) {
      return res
        .status(400)
        .send(
          "All input is required (descripcion, tecnico_id, coordinador_id, estado_id)"
        );
    }

    const [result] = await sequelize.query(
      "EXEC usp_CreateExpediente @descripcion = :descripcion, @tecnico_id = :tecnico_id, @coordinador_id = :coordinador_id, @estado_id = :estado_id",
      {
        replacements: {
          descripcion,
          tecnico_id,
          coordinador_id,
          estado_id,
        },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    res.status(201).json({ id: result[0].id });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating expediente");
  }
};

const getExpedientes = async (req, res) => {
  try {
    const [results] = await sequelize.query("EXEC usp_GetExpedientes");
    res.status(200).json(results);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching expedientes");
  }
};

const getExpedienteById = async (req, res) => {
  try {
    const { id } = req.params;
    const [results] = await sequelize.query(
      "EXEC usp_GetExpedienteById @id = :id",
      {
        replacements: { id },
      }
    );
    if (results.length === 0) {
      return res.status(404).send("Expediente not found");
    }
    res.status(200).json(results[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching expediente");
  }
};

const updateExpediente = async (req, res) => {
  try {
    const { id } = req.params;
    const { descripcion, justificacion_rechazo, tecnico_id, coordinador_id, estado_id } = req.body;

    await sequelize.query(
      "EXEC usp_UpdateExpediente @id = :id, @descripcion = :descripcion, @justificacion_rechazo = :justificacion_rechazo, @tecnico_id = :tecnico_id, @coordinador_id = :coordinador_id, @estado_id = :estado_id",
      {
        replacements: {
          id,
          descripcion,
          justificacion_rechazo,
          tecnico_id,
          coordinador_id,
          estado_id,
        },
      }
    );

    res.status(200).send("Expediente updated successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating expediente");
  }
};

const deleteExpediente = async (req, res) => {
  try {
    const { id } = req.params;
    await sequelize.query("EXEC usp_DeleteExpediente @id = :id", {
      replacements: { id },
    });
    res.status(200).send("Expediente deleted successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting expediente");
  }
};

module.exports = {
  createExpediente,
  getExpedientes,
  getExpedienteById,
  updateExpediente,
  deleteExpediente,
};
