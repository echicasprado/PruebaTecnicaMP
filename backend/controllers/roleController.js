const { sequelize } = require('../config/db');
const { QueryTypes } = require('sequelize');

const getRoles = async (req, res) => {
  try {
    const roles = await sequelize.query('EXEC usp_GetRoles', {
      type: QueryTypes.SELECT
    });
    res.status(200).json(roles);
  } catch (error) {
    console.error('Error fetching roles:', error);
    res.status(500).send('Error fetching roles');
  }
};

module.exports = {
  getRoles,
};
