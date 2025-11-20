const { sequelize } = require('../config/db');
const { QueryTypes } = require('sequelize');

const getEstados = async (req, res) => {
  try {
    const estados = await sequelize.query('EXEC usp_GetEstados', {
      type: QueryTypes.SELECT
    });
    res.status(200).json(estados);
  } catch (error) {
    console.error('Error fetching estados:', error);
    res.status(500).send('Error fetching estados');
  }
};

const getEstadoById = async (req, res) => {
  try {
    const { id } = req.params;
    const estado = await sequelize.query('EXEC usp_GetEstadoById @id = :id', {
      replacements: { id: id },
      type: QueryTypes.SELECT
    });

    if (estado.length === 0) {
      return res.status(404).send('Estado not found');
    }

    res.status(200).json(estado[0]);
  } catch (error) {
    console.error('Error fetching estado by ID:', error);
    res.status(500).send('Error fetching estado by ID');
  }
};

module.exports = {
  getEstados,
  getEstadoById,
};
