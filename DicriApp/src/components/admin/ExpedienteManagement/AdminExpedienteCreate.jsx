import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateExpediente } from '../../../hooks/useExpedientes';
import { useEstados } from '../../../hooks/useEstados';
import UserSelect from '../../common/UserSelect';
import EstadoSelect from '../../common/EstadoSelect';

// Role IDs
const TECNICO = 2;
const COORDINADOR = 3;

function AdminExpedienteCreate() {
  const navigate = useNavigate();
  const [createExpediente, { loading, error }] = useCreateExpediente();
  const { data: estados, loading: loadingEstados, error: errorEstados } = useEstados();

  const [descripcion, setDescripcion] = useState('');
  const [tecnicoId, setTecnicoId] = useState('');
  const [coordinadorId, setCoordinadorId] = useState('');
  const [estadoId, setEstadoId] = useState('');
  const [justificacionRechazo, setJustificacionRechazo] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createExpediente({
        descripcion,
        tecnico_id: tecnicoId,
        coordinador_id: coordinadorId,
        estado_id: estadoId,
        justificacion_rechazo: justificacionRechazo || null,
      });
      alert('Expediente creado con éxito!');
      navigate('/admin/expedientes');
    } catch (err) {
      console.error('Error al crear expediente:', err);
    }
  };

  if (loadingEstados) {
    return <div className="p-6 text-center">Cargando estados...</div>;
  }

  if (errorEstados) {
    return <div className="p-6 text-center text-red-600">Error al cargar estados: {errorEstados.message}</div>;
  }

  return (
    <div className="p-6 bg-white shadow rounded-lg max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Crear Nuevo Expediente (Admin)</h2>
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
          filterRoleId={TECNICO} // Filter for Tecnicos
          required={true}
        />

        <UserSelect
          label="Coordinador Asignado"
          value={coordinadorId}
          onChange={setCoordinadorId}
          filterRoleId={COORDINADOR} // Filter for Coordinadores
          required={true}
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
        
        {error && <p className="text-red-500 text-sm mt-2">Error: {error.message || 'Error al crear expediente'}</p>}

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => navigate('/admin/expedientes')}
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
            {loading ? 'Creando...' : 'Crear Expediente'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AdminExpedienteCreate;
