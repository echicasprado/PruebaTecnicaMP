import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStatus } from '../../../hooks/useAuth';
import { useExpedientes, useDeleteExpediente } from '../../../hooks/useExpedientes';
import { useEstados } from '../../../hooks/useEstados';
import { useUsuarios } from '../../../hooks/useUsuarios';
import ConfirmationModal from '../../common/ConfirmationModal';

// Role IDs
const ADMIN = 1;

function AdminExpedienteManagement() {
  const navigate = useNavigate();
  const { roleId, isAuthenticated } = useAuthStatus();
  
  const { data: expedientes, loading: loadingExpedientes, error: errorExpedientes, refetch: refetchExpedientes } = useExpedientes();
  const { data: estados, loading: loadingEstados, error: errorEstados } = useEstados();
  const { data: usuarios, loading: loadingUsuarios, error: errorUsuarios } = useUsuarios();
  const [deleteExpediente, { loading: deleting, error: deleteError }] = useDeleteExpediente();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expedienteToDeleteId, setExpedienteToDeleteId] = useState(null);

  const getEstadoName = (estadoId) => {
    const estado = estados?.find(e => e.id === estadoId);
    return estado ? estado.nombre : 'Desconocido';
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

  const handleDeleteClick = (expedienteId) => {
    setExpedienteToDeleteId(expedienteId);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (expedienteToDeleteId) {
      try {
        await deleteExpediente(expedienteToDeleteId);
        alert('Expediente eliminado con éxito!');
        refetchExpedientes(); // Refresh the list after deletion
      } catch (err) {
        console.error('Error al eliminar expediente:', err);
        alert(`Error al eliminar expediente: ${deleteError?.message || 'Ha ocurrido un error.'}`);
      } finally {
        setIsModalOpen(false);
        setExpedienteToDeleteId(null);
      }
    }
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false);
    setExpedienteToDeleteId(null);
  };

  if (loadingExpedientes || loadingEstados || loadingUsuarios) {
    return <div className="p-6 text-center">Cargando expedientes...</div>;
  }

  if (errorExpedientes) {
    return <div className="p-6 text-center text-red-600">Error al cargar expedientes: {errorExpedientes.message}</div>;
  }

  if (errorEstados || errorUsuarios) {
    return <div className="p-6 text-center text-red-600">Error al cargar datos de apoyo.</div>;
  }

  return (
    <div className="p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Gestión de Expedientes (Admin)</h2>
      <button
        onClick={() => navigate('/admin/expedientes/create')}
        className="mb-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
      >
        Crear Nuevo Expediente
      </button>

      <div className="overflow-x-auto">
        {expedientes.length === 0 ? (
          <p className="text-gray-600">No hay expedientes registrados.</p>
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
                  Técnico
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Coordinador
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {expedientes.map((exp) => (
                <tr key={exp.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{exp.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{exp.descripcion}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{getUserName(exp.tecnico_id)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{getUserName(exp.coordinador_id)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{getEstadoName(exp.estado_id)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => navigate(`/admin/expedientes/edit/${exp.id}`)}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDeleteClick(exp.id)}
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
        message={`¿Estás seguro de que quieres eliminar el expediente con ID: ${expedienteToDeleteId}? Esta acción es irreversible.`}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
}

export default AdminExpedienteManagement;
