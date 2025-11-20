const { sequelize } = require('../config/db');
const User = require('./User');
const Role = require('./Role');
const Estado = require('./Estado');
const Expediente = require('./Expediente');
const Indicio = require('./Indicio');

Role.hasMany(User, { foreignKey: 'rol_id', as: 'usuarios' });
User.belongsTo(Role, { foreignKey: 'rol_id', as: 'role' });

User.hasMany(Expediente, { foreignKey: 'tecnico_id', as: 'expedientes_tecnico' });
User.hasMany(Expediente, { foreignKey: 'coordinador_id', as: 'expedientes_coordinador' });
Expediente.belongsTo(User, { foreignKey: 'tecnico_id', as: 'tecnico' });
Expediente.belongsTo(User, { foreignKey: 'coordinador_id', as: 'coordinador' });

Estado.hasMany(Expediente, { foreignKey: 'estado_id', as: 'expedientes' });
Expediente.belongsTo(Estado, { foreignKey: 'estado_id', as: 'estado' });

User.hasMany(Indicio, { foreignKey: 'tecnico_id', as: 'indicios_tecnico' });
Indicio.belongsTo(User, { foreignKey: 'tecnico_id', as: 'tecnico' });

Expediente.hasMany(Indicio, { foreignKey: 'expediente_id', as: 'indicios' });
Indicio.belongsTo(Expediente, { foreignKey: 'expediente_id', as: 'expediente' });

const db = {
  sequelize,
  User,
  Role,
  Estado,
  Expediente,
  Indicio,
};

module.exports = db;
