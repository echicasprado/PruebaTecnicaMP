import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStatus } from '../../../hooks/useAuth'; // Adjusted path
import { useCreateExpediente } from '../../../hooks/useExpedientes'; // Adjusted path
import { useEstados } from '../../../hooks/useEstados'; // Adjusted path
import UserSelect from '../../common/UserSelect'; // Adjusted path

// Role IDs - Defined here for clarity, but ideally in a common config
const ADMIN = 1;
const TECNICO = 2;
const COORDINADOR = 3;

function TecnicoExpedienteCreate() {
  const navigate = useNavigate();
  const { roleId, isAuthenticated } = useAuthStatus();
  const [createExpediente, { loading, error, data: newExpediente }] = useCreateExpediente();
  const { data: estados, loading: loadingEstados, error: errorEstados } = useEstados();

  const [descripcion, setDescripcion] = useState('');
  const [coordinadorId, setCoordinadorId] = useState(''); // Stores the ID of the selected coordinator

  // Find the 'abierto' estado ID once states are loaded
  const estadoAbiertoId = estados?.find(estado => estado.nombre.toLowerCase() === 'abierto')?.id;

  useEffect(() => {
    if (!isAuthenticated || roleId !== TECNICO) {
      navigate('/unauthorized'); // Redirect if not authenticated or not a technician
    }
  }, [isAuthenticated, roleId, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!estadoAbiertoId) {
      alert('Error: No se encontró el estado "abierto".');
      return;
    }
    
    const tecnicoId = parseInt(localStorage.getItem('userId'), 10);

    if (isNaN(tecnicoId)) {
        alert('Error: No se pudo obtener el ID del técnico logueado.');
        return;
    }

    try {
      await createExpediente({
        descripcion,
        tecnico_id: tecnicoId,
        coordinador_id: coordinadorId,
        estado_id: estadoAbiertoId,
        // fecha will be set by the DB
      });
      alert('Expediente creado con éxito!');
      navigate('/tecnico/dashboard'); // Redirect to technician's dashboard or list of expedientes
    } catch (err) {
      console.error('Error al crear expediente:', err);
      // Error message already handled by the hook
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
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Crear Nuevo Expediente</h2>
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
        
        {error && <p className="text-red-500 text-sm mt-2">Error: {error.message || 'Error al crear expediente'}</p>}

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => navigate('/tecnico/dashboard')} // Cancel button, go back to dashboard
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

export default TecnicoExpedienteCreate;
