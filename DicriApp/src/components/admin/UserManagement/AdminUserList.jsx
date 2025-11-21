import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { useUsuarios, useDeleteUsuario } from '../../../hooks/useUsuarios';
import { useRoles } from '../../../hooks/useRoles';
import ConfirmationModal from '../../common/ConfirmationModal'; // Import the modal

function AdminUserList() {
  const { data: usuarios, loading: loadingUsers, error: errorUsers, refetch: refetchUsers } = useUsuarios();
  const { data: roles, loading: loadingRoles, error: errorRoles } = useRoles();
  const [deleteUser, { loading: deleting, error: deleteError }] = useDeleteUsuario();
  const navigate = useNavigate(); // Initialize useNavigate

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToDeleteId, setUserToDeleteId] = useState(null);

  const getRoleName = (roleId) => {
    if (roles) {
      const role = roles.find(r => r.id === roleId);
      return role ? role.nombre : 'Desconocido';
    }
    return 'Cargando...';
  };

  const handleDeleteClick = (userId) => {
    setUserToDeleteId(userId);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (userToDeleteId) {
      try {
        await deleteUser(userToDeleteId);
        alert('Usuario eliminado con éxito!');
        refetchUsers(); // Refresh the list after deletion
      } catch (err) {
        console.error('Error al eliminar usuario:', err);
        alert(`Error al eliminar usuario: ${deleteError?.message || 'Ha ocurrido un error.'}`);
      } finally {
        setIsModalOpen(false);
        setUserToDeleteId(null);
      }
    }
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false);
    setUserToDeleteId(null);
  };

  if (loadingUsers || loadingRoles) {
    return <div className="p-6 text-center">Cargando usuarios...</div>;
  }

  if (errorUsers) {
    return <div className="p-6 text-center text-red-600">Error al cargar usuarios: {errorUsers.message}</div>;
  }

  if (errorRoles) {
    return <div className="p-6 text-center text-red-600">Error al cargar roles: {errorRoles.message}</div>;
  }

  return (
    <div className="p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Gestión de Usuarios</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nombre
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rol
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {usuarios.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.nombre}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{getRoleName(user.rol_id)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => navigate(`/admin/users/edit/${user.id}`)}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDeleteClick(user.id)}
                    className="text-red-600 hover:text-red-900"
                    disabled={deleting}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        onClick={() => navigate('/admin/users/create')}
        className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
      >
        Agregar Nuevo Usuario
      </button>

      <ConfirmationModal
        isOpen={isModalOpen}
        message={`¿Estás seguro de que quieres eliminar al usuario con ID: ${userToDeleteId}? Esta acción es irreversible.`}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
}

export default AdminUserList;