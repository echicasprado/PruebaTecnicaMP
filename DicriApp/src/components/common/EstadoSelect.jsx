import React from 'react';
import { useEstados } from '../../../hooks/useEstados';

function EstadoSelect({ value, onChange, label = 'Estado', required = false, disabled = false }) {
  const { data: estados, loading, error } = useEstados();

  if (loading) {
    return (
      <div>
        <label htmlFor="estado-select" className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        <select
          id="estado-select"
          name="estado-select"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 cursor-not-allowed"
          disabled
        >
          <option>Cargando estados...</option>
        </select>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <label htmlFor="estado-select" className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        <select
          id="estado-select"
          name="estado-select"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-red-50 cursor-not-allowed text-red-700"
          disabled
        >
          <option>Error al cargar estados</option>
        </select>
      </div>
    );
  }

  return (
    <div>
      <label htmlFor="estado-select" className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        id="estado-select"
        name="estado-select"
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value, 10))}
        required={required}
        disabled={disabled}
      >
        <option value="">Seleccione un estado</option>
        {estados.map((estado) => (
          <option key={estado.id} value={estado.id}>
            {estado.nombre}
          </option>
        ))}
      </select>
    </div>
  );
}

export default EstadoSelect;
