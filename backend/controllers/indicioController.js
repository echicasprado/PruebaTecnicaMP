const { sequelize } = require("../config/db");

const createIndicio = async (req, res) => {
  try {
    const {
      descripcion,
      color,
      tamanio,
      peso,
      ubicacion,
      tecnica_registrada,
      tecnico_id,
      expediente_id,
    } = req.body;

    if (
      !(
        descripcion &&
        color &&
        tamanio &&
        peso &&
        ubicacion &&
        tecnica_registrada &&
        tecnico_id &&
        expediente_id
      )
    ) {
      return res.status(400).send("All input is required");
    }

    const [result] = await sequelize.query(
      "EXEC usp_CreateIndicio @descripcion = :descripcion, @color = :color, @tamanio = :tamanio, @peso = :peso, @ubicacion = :ubicacion, @tecnica_registrada = :tecnica_registrada, @tecnico_id = :tecnico_id, @expediente_id = :expediente_id",
      {
        replacements: {
          descripcion,
          color,
          tamanio,
          peso,
          ubicacion,
          tecnica_registrada,
          tecnico_id,
          expediente_id,
        },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    res.status(201).json({ id: result[0].id });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating indicio");
  }
};

const getIndicios = async (req, res) => {
  try {
    const [results] = await sequelize.query("EXEC usp_GetIndicios");
    res.status(200).json(results);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching indicios");
  }
};

const getIndicioById = async (req, res) => {
  try {
    const { id } = req.params;
    const [results] = await sequelize.query("EXEC usp_GetIndicioById @id = :id", {
      replacements: { id },
    });
    if (results.length === 0) {
      return res.status(404).send("Indicio not found");
    }
    res.status(200).json(results[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching indicio");
  }
};

const getIndiciosByExpedienteId = async (req, res) => {
  try {
    const { expediente_id } = req.params;
    const [results] = await sequelize.query(
      "EXEC usp_GetIndiciosByExpedienteId @expediente_id = :expediente_id",
      {
        replacements: { expediente_id },
      }
    );
    res.status(200).json(results);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching indicios by expediente_id");
  }
};

const updateIndicio = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      descripcion,
      color,
      tamanio,
      peso,
      ubicacion,
      tecnica_registrada,
    } = req.body;

    await sequelize.query(
      "EXEC usp_UpdateIndicio @id = :id, @descripcion = :descripcion, @color = :color, @tamanio = :tamanio, @peso = :peso, @ubicacion = :ubicacion, @tecnica_registrada = :tecnica_registrada",
      {
        replacements: {
          id,
          descripcion,
          color,
          tamanio,
          peso,
          ubicacion,
          tecnica_registrada,
        },
      }
    );

    res.status(200).send("Indicio updated successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating indicio");
  }
};

const deleteIndicio = async (req, res) => {
  try {
    const { id } = req.params;
    await sequelize.query("EXEC usp_DeleteIndicio @id = :id", {
      replacements: { id },
    });
    res.status(200).send("Indicio deleted successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting indicio");
  }
};

module.exports = {
  createIndicio,
  getIndicios,
  getIndicioById,
  getIndiciosByExpedienteId,
  updateIndicio,
  deleteIndicio,
};
