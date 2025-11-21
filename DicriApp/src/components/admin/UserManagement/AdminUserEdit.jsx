import React, { useState, useEffect } from 'react';
import { useUsuario, useUpdateUsuario } from '../../../hooks/useUsuarios';
import RoleSelect from '../../common/RoleSelect';

function AdminUserEdit({ userId, onUserUpdated, onCancel }) {
  const { data: user, loading: loadingUser, error: errorUser } = useUsuario(userId);
  const [updateUser, { loading: updating, error: updateError }] = useUpdateUsuario();

  const [email, setEmail] = useState('');
  const [nombre, setNombre] = useState('');
  const [rolId, setRolId] = useState('');
  const [password, setPassword] = useState(''); // For optional password change

  useEffect(() => {
    if (user) {
      setEmail(user.email);
      setNombre(user.nombre);
      setRolId(user.rol_id);
      setPassword(''); // Clear password field on user change
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = {
        email,
        nombre,
        rol_id: rolId,
      };
      // Only include password if it's explicitly set by the user
      if (password) {
        userData.password = password; // Assuming backend expects 'password' for update
      }
      await updateUser(userId, userData);
      alert('Usuario actualizado con éxito!');
      if (onUserUpdated) {
        onUserUpdated(); // Notify parent to refresh list
      }
    } catch (err) {
      console.error('Error al actualizar usuario:', err);
    }
  };

  if (loadingUser) {
    return <div className="p-6 text-center">Cargando datos del usuario...</div>;
  }

  if (errorUser) {
    return <div className="p-6 text-center text-red-600">Error al cargar usuario: {errorUser.message}</div>;
  }

  if (!user) {
    return <div className="p-6 text-center text-gray-600">Usuario no encontrado.</div>;
  }

  return (
    <div className="p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Editar Usuario</h2>
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
        <RoleSelect value={rolId} onChange={setRolId} required={true} />
        
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Nueva Contraseña (opcional)</label>
          <input
            type="password"
            id="password"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Dejar en blanco para no cambiar"
          />
        </div>
        
        {updateError && <p className="text-red-500 text-sm mt-2">Error: {updateError.message || 'Error al actualizar usuario'}</p>}

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            disabled={updating}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            disabled={updating}
          >
            {updating ? 'Actualizando...' : 'Actualizar Usuario'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AdminUserEdit;
