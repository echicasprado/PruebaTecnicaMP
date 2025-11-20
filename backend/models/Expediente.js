const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Estado = require('./Estado');
const Usuario = require('./User'); // Renamed from User to Usuario for consistency

const Expediente = sequelize.define('Expediente', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  descripcion: {
    type: DataTypes.STRING(250),
    allowNull: false,
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  justificacion_rechazo: {
    type: DataTypes.STRING(250),
    allowNull: true,
  },
  tecnico_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  coordinador_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  estado_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  available: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  tableName: 'Expediente',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

module.exports = Expediente;
