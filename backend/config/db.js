const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_SERVER,
    dialect: 'mssql',
    port: parseInt(process.env.DB_PORT || '1433', 10),
    dialectOptions: {
      options: {
        encrypt: false,
        trustServerCertificate: true,
      },
    },
    logging: false,
  }
);

async function connectDb() {
  try {
    await sequelize.authenticate();
    console.log('Conectado a SQL Server con Sequelize.');
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
    throw error;
  }
}

module.exports = {
  sequelize,
  connectDb,
};