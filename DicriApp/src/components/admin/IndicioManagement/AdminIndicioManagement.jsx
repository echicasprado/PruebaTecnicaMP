import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStatus } from '../../../hooks/useAuth';
import { useIndicios, useDeleteIndicio } from '../../../hooks/useIndicios';
import { useExpedientes } from '../../../hooks/useExpedientes';
import { useUsuarios } from '../../../hooks/useUsuarios';
import ConfirmationModal from '../../common/ConfirmationModal';

// Role IDs
const ADMIN = 1;

function AdminIndicioManagement() {
  const navigate = useNavigate();
  const { roleId, isAuthenticated } = useAuthStatus();
  
  const { data: indicios, loading: loadingIndicios, error: errorIndicios, refetch: refetchIndicios } = useIndicios();
  const { data: expedientes, loading: loadingExpedientes, error: errorExpedientes } = useExpedientes();
  const { data: usuarios, loading: loadingUsuarios, error: errorUsuarios } = useUsuarios();
  const [deleteIndicio, { loading: deleting, error: deleteError }] = useDeleteIndicio();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [indicioToDeleteId, setIndicioToDeleteId] = useState(null);

  const getExpedienteDescription = (expedienteId) => {
    const exp = expedientes?.find(e => e.id === expedienteId);
    return exp ? exp.descripcion : 'Desconocido';
  };

  const getUserName = (userId) => {
    const user = usuarios?.find(u => u.id === userId);
    return user ? user.nombre : 'Desconocido';
  };

  useEffect(() => {
    if (!isAuthenticated || roleId !== ADMIN) {
      navigate('/unauthorized');
    }
  }, [isAuthenticated, roleId, navigate]);

  const handleDeleteClick = (indicioId) => {
    setIndicioToDeleteId(indicioId);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (indicioToDeleteId) {
      try {
        await deleteIndicio(indicioToDeleteId);
        alert('Indicio eliminado con éxito!');
        refetchIndicios(); // Refresh the list after deletion
      } catch (err) {
        console.error('Error al eliminar indicio:', err);
        alert(`Error al eliminar indicio: ${deleteError?.message || 'Ha ocurrido un error.'}`);
      } finally {
        setIsModalOpen(false);
        setIndicioToDeleteId(null);
      }
    }
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false);
    setIndicioToDeleteId(null);
  };

  if (loadingIndicios || loadingExpedientes || loadingUsuarios) {
    return <div className="p-6 text-center">Cargando indicios...</div>;
  }

  if (errorIndicios) {
    return <div className="p-6 text-center text-red-600">Error al cargar indicios: {errorIndicios.message}</div>;
  }

  if (errorExpedientes || errorUsuarios) {
    return <div className="p-6 text-center text-red-600">Error al cargar datos de apoyo.</div>;
  }

  return (
    <div className="p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Gestión de Indicios (Admin)</h2>
      <button
        onClick={() => navigate('/admin/indicios/create')}
        className="mb-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
      >
        Crear Nuevo Indicio
      </button>

      <div className="overflow-x-auto">
        {indicios.length === 0 ? (
          <p className="text-gray-600">No hay indicios registrados.</p>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Descripción
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Expediente
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Técnico
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {indicios.map((ind) => (
                <tr key={ind.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{ind.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ind.descripcion}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{getExpedienteDescription(ind.expediente_id)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{getUserName(ind.tecnico_id)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => navigate(`/admin/indicios/edit/${ind.id}`)}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDeleteClick(ind.id)}
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
        )}
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        message={`¿Estás seguro de que quieres eliminar el indicio con ID: ${indicioToDeleteId}? Esta acción es irreversible.`}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
}

export default AdminIndicioManagement;
