import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuthStatus } from '../../../hooks/useAuth';
import { useIndiciosByExpediente, useDeleteIndicio } from '../../../hooks/useIndicios';
import { useExpediente } from '../../../hooks/useExpedientes';
import ConfirmationModal from '../../common/ConfirmationModal';

// Role IDs
const TECNICO = 2;

function TecnicoIndicioList() {
  const { expedienteId } = useParams();
  const navigate = useNavigate();
  const { roleId, isAuthenticated } = useAuthStatus();
  const loggedInUserId = parseInt(localStorage.getItem('userId'), 10);

  const { data: indicios, loading: loadingIndicios, error: errorIndicios, refetch: refetchIndicios } = useIndiciosByExpediente(expedienteId);
  const { data: expediente, loading: loadingExpediente, error: errorExpediente } = useExpediente(expedienteId);
  const [deleteIndicio, { loading: deleting, error: deleteError }] = useDeleteIndicio();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [indicioToDeleteId, setIndicioToDeleteId] = useState(null);

  useEffect(() => {
    if (!isAuthenticated || roleId !== TECNICO) {
      navigate('/unauthorized');
      return;
    }
    // Ensure the technician owns the expediente this list is for
    if (!loadingExpediente && expediente && expediente.tecnico_id !== loggedInUserId) {
      alert('No tienes permiso para ver los indicios de este expediente.');
      navigate('/tecnico/expedientes');
    }
  }, [isAuthenticated, roleId, navigate, expediente, loggedInUserId, loadingExpediente]);


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


  if (loadingIndicios || loadingExpediente) {
    return <div className="p-6 text-center">Cargando indicios...</div>;
  }

  if (errorIndicios) {
    return <div className="p-6 text-center text-red-600">Error al cargar indicios: {errorIndicios.message}</div>;
  }
  if (errorExpediente) {
    return <div className="p-6 text-center text-red-600">Error al cargar expediente: {errorExpediente.message}</div>;
  }

  if (!expediente) {
      return <div className="p-6 text-center text-gray-600">Expediente no encontrado.</div>;
  }

  return (
    <div className="p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Indicios para Expediente: {expediente.descripcion}</h2>
      <button
        onClick={() => navigate(`/tecnico/expedientes/${expedienteId}/indicios/create`)}
        className="mb-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
      >
        Agregar Nuevo Indicio
      </button>

      <div className="overflow-x-auto">
        {indicios.length === 0 ? (
          <p className="text-gray-600">No hay indicios para este expediente.</p>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Descripción
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Color
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tamaño
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ubicación
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {indicios.map((indicio) => (
                <tr key={indicio.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{indicio.descripcion}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{indicio.color}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{indicio.tamanio}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{indicio.ubicacion}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => navigate(`/tecnico/indicios/edit/${indicio.id}`)}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDeleteClick(indicio.id)}
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
        message={`¿Estás seguro de que quieres eliminar este indicio? Esta acción es irreversible.`}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
}

export default TecnicoIndicioList;

