import React from 'react';
import { useRoles } from '../../../hooks/useRoles';

function RoleSelect({ value, onChange, label = 'Rol', required = false, disabled = false }) {
  const { data: roles, loading, error } = useRoles();

  if (loading) {
    return (
      <div>
        <label htmlFor="role-select" className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        <select
          id="role-select"
          name="role-select"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 cursor-not-allowed"
          disabled
        >
          <option>Cargando roles...</option>
        </select>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <label htmlFor="role-select" className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        <select
          id="role-select"
          name="role-select"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-red-50 cursor-not-allowed text-red-700"
          disabled
        >
          <option>Error al cargar roles</option>
        </select>
      </div>
    );
  }

  return (
    <div>
      <label htmlFor="role-select" className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        id="role-select"
        name="role-select"
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value, 10))}
        required={required}
        disabled={disabled}
      >
        <option value="">Seleccione un rol</option>
        {roles.map((role) => (
          <option key={role.id} value={role.id}>
            {role.nombre}
          </option>
        ))}
      </select>
    </div>
  );
}

export default RoleSelect;
