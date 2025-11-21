import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuthStatus } from '../../../hooks/useAuth';
import { useExpediente, useUpdateExpediente } from '../../../hooks/useExpedientes';
import { useEstados } from '../../../hooks/useEstados';
import UserSelect from '../../common/UserSelect';

const TECNICO = 2;
const COORDINADOR = 3;

function TecnicoExpedienteEdit() {
  const { expedienteId } = useParams();
  const navigate = useNavigate();
  const { roleId, isAuthenticated } = useAuthStatus();
  const loggedInUserId = parseInt(localStorage.getItem('userId'), 10);

  const { data: expediente, loading: loadingExpediente, error: errorExpediente } = useExpediente(expedienteId);
  const [updateExpediente, { loading: updating, error: updateError }] = useUpdateExpediente();
  const { data: estados, loading: loadingEstados, error: errorEstados } = useEstados();

  const [descripcion, setDescripcion] = useState('');
  const [coordinadorId, setCoordinadorId] = useState('');

  const estadoAbiertoId = estados?.find(estado => estado.nombre.toLowerCase() === 'en proceso')?.id;

  useEffect(() => {
    if (!isAuthenticated || roleId !== TECNICO) {
      navigate('/unauthorized');
    }
  }, [isAuthenticated, roleId, navigate]);

  useEffect(() => {
    if (expediente) {
      if (expediente.tecnico_id !== loggedInUserId) {
        alert('No tienes permiso para editar este expediente.');
        navigate('/tecnico/expedientes');
        return;
      }

      if (expediente.estado_id !== estadoAbiertoId) {
        alert('Este expediente no puede ser editado porque no está en estado "abierto".');
        navigate('/tecnico/expedientes');
        return;
      }
      setDescripcion(expediente.descripcion);
      setCoordinadorId(expediente.coordinador_id || '');
    }
  }, [expediente, loggedInUserId, estadoAbiertoId, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (expedienteId) {
      try {
        await updateExpediente(parseInt(expedienteId, 10), {
          descripcion,
          coordinador_id: coordinadorId,
        });
        alert('Expediente actualizado con éxito!');
        navigate('/tecnico/expedientes');
      } catch (err) {
        console.error('Error al actualizar expediente:', err);
      }
    }
  };

  if (loadingExpediente || loadingEstados) {
    return <div className="p-6 text-center">Cargando expediente...</div>;
  }

  if (errorExpediente) {
    return <div className="p-6 text-center text-red-600">Error al cargar expediente: {errorExpediente.message}</div>;
  }

  if (errorEstados) {
    return <div className="p-6 text-center text-red-600">Error al cargar estados de apoyo.</div>;
  }

  if (!expediente) {
    return <div className="p-6 text-center text-gray-600">Expediente no encontrado.</div>;
  }

  return (
    <div className="p-6 bg-white shadow rounded-lg max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Editar Expediente #{expedienteId}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700">Descripción</label>
          <textarea
            id="descripcion"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm h-32 resize-none"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
          ></textarea>
        </div>
        
        <UserSelect
          label="Coordinador Asignado"
          value={coordinadorId}
          onChange={setCoordinadorId}
          filterRoleId={COORDINADOR} // Filter for Coordinadores
          required={true}
        />
        
        {updateError && <p className="text-red-500 text-sm mt-2">Error: {updateError.message || 'Error al actualizar expediente'}</p>}

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => navigate('/tecnico/expedientes')} // Cancel button, go back to list
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
            {updating ? 'Actualizando...' : 'Actualizar Expediente'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default TecnicoExpedienteEdit;
