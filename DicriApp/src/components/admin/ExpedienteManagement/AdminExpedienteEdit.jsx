import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useExpediente, useUpdateExpediente } from '../../../hooks/useExpedientes';
import { useEstados } from '../../../hooks/useEstados';
import UserSelect from '../../common/UserSelect';
import EstadoSelect from '../../common/EstadoSelect';

// Role IDs
const TECNICO = 2;
const COORDINADOR = 3;

function AdminExpedienteEdit() {
  const { expedienteId } = useParams();
  const navigate = useNavigate();

  const { data: expediente, loading: loadingExpediente, error: errorExpediente } = useExpediente(expedienteId);
  const [updateExpediente, { loading: updating, error: updateError }] = useUpdateExpediente();
  const { data: estados, loading: loadingEstados, error: errorEstados } = useEstados();

  const [descripcion, setDescripcion] = useState('');
  const [tecnicoId, setTecnicoId] = useState('');
  const [coordinadorId, setCoordinadorId] = useState('');
  const [estadoId, setEstadoId] = useState('');
  const [justificacionRechazo, setJustificacionRechazo] = useState('');

  useEffect(() => {
    if (expediente) {
      setDescripcion(expediente.descripcion);
      setTecnicoId(expediente.tecnico_id || '');
      setCoordinadorId(expediente.coordinador_id || '');
      setEstadoId(expediente.estado_id || '');
      setJustificacionRechazo(expediente.justificacion_rechazo || '');
    }
  }, [expediente]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (expedienteId) {
      try {
        await updateExpediente(parseInt(expedienteId, 10), {
          descripcion,
          tecnico_id: tecnicoId,
          coordinador_id: coordinadorId,
          estado_id: estadoId,
          justificacion_rechazo: justificacionRechazo || null,
        });
        alert('Expediente actualizado con éxito!');
        navigate('/admin/expedientes');
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
    return <div className="p-6 text-center text-red-600">Error al cargar datos de apoyo.</div>;
  }

  if (!expediente) {
    return <div className="p-6 text-center text-gray-600">Expediente no encontrado.</div>;
  }

  return (
    <div className="p-6 bg-white shadow rounded-lg max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Editar Expediente #{expedienteId} (Admin)</h2>
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
          label="Técnico Asignado"
          value={tecnicoId}
          onChange={setTecnicoId}
          filterRoleId={TECNICO}
          required={false} // Admin can assign/unassign
        />

        <UserSelect
          label="Coordinador Asignado"
          value={coordinadorId}
          onChange={setCoordinadorId}
          filterRoleId={COORDINADOR}
          required={false} // Admin can assign/unassign
        />

        <EstadoSelect
          label="Estado"
          value={estadoId}
          onChange={setEstadoId}
          required={true}
        />

        {estadoId && estados?.find(e => e.id === estadoId)?.nombre.toLowerCase() === 'rechazado' && (
            <div>
                <label htmlFor="justificacionRechazo" className="block text-sm font-medium text-gray-700">Justificación de Rechazo</label>
                <textarea
                    id="justificacionRechazo"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm h-24 resize-none"
                    value={justificacionRechazo}
                    onChange={(e) => setJustificacionRechazo(e.target.value)}
                    required
                ></textarea>
            </div>
        )}
        
        {updateError && <p className="text-red-500 text-sm mt-2">Error: {updateError.message || 'Error al actualizar expediente'}</p>}

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => navigate('/admin/expedientes')}
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

export default AdminExpedienteEdit;
