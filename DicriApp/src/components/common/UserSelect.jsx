import React from 'react';
import { useUsuarios } from '../../hooks/useUsuarios';

function UserSelect({ value, onChange, label = 'Usuario', required = false, disabled = false, filterRoleId = null }) {
  const { data: usuarios, loading, error } = useUsuarios();

  const filteredUsers = filterRoleId
    ? usuarios.filter(user => user.rol_id === filterRoleId)
    : usuarios;

  if (loading) {
    return (
      <div>
        <label htmlFor="user-select" className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        <select
          id="user-select"
          name="user-select"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 cursor-not-allowed"
          disabled
        >
          <option>Cargando usuarios...</option>
        </select>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <label htmlFor="user-select" className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        <select
          id="user-select"
          name="user-select"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-red-50 cursor-not-allowed text-red-700"
          disabled
        >
          <option>Error al cargar usuarios</option>
        </select>
      </div>
    );
  }

  return (
    <div>
      <label htmlFor="user-select" className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        id="user-select"
        name="user-select"
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value, 10))}
        required={required}
        disabled={disabled}
      >
        <option value="">Seleccione un {label.toLowerCase()}</option>
        {filteredUsers.map((user) => (
          <option key={user.id} value={user.id}>
            {user.nombre} ({user.email})
          </option>
        ))}
      </select>
    </div>
  );
}

export default UserSelect;
