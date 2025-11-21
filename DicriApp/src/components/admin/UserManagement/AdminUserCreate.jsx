import React, { useState } from 'react';
import { useRegister } from '../../../hooks/useAuth';
import RoleSelect from '../../common/RoleSelect';

function AdminUserCreate({ onUserCreated, onCancel }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nombre, setNombre] = useState('');
  const [rolId, setRolId] = useState('');

  const [registerUser, { loading, error, data }] = useRegister();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // The backend expects 'rol_id' as per the User model.
      // The register service correctly sends rol_id.
      await registerUser({ email, password, nombre, rol_id: rolId });
      alert('Usuario creado con éxito!');
      if (onUserCreated) {
        onUserCreated(); // Notify parent to refresh list
      }
      // Clear form
      setEmail('');
      setPassword('');
      setNombre('');
      setRolId('');
    } catch (err) {
      console.error('Error al crear usuario:', err);
      // Error message already handled by the hook
    }
  };

  return (
    <div className="p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Crear Nuevo Usuario</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Nombre</label>
          <input
            type="text"
            id="nombre"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
          <input
            type="password"
            id="password"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <RoleSelect value={rolId} onChange={setRolId} required={true} />
        
        {error && <p className="text-red-500 text-sm mt-2">Error: {error.message || 'Error al crear usuario'}</p>}
        {data && !error && <p className="text-green-500 text-sm mt-2">Usuario creado con éxito.</p>}

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            disabled={loading}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Creando...' : 'Crear Usuario'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AdminUserCreate;
