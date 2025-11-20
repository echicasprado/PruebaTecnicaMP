const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Usuario = require('./User'); // Renamed from User to Usuario for consistency
const Expediente = require('./Expediente');

const Indicio = sequelize.define('Indicio', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  descripcion: {
    type: DataTypes.STRING(250),
    allowNull: true,
  },
  color: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  tamanio: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  peso: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  ubicacion: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  tecnica_registrada: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  tecnico_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  expediente_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  available: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  tableName: 'Indicio',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

module.exports = Indicio;
