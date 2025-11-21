import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuthStatus } from '../../../hooks/useAuth';
import { useCreateIndicio } from '../../../hooks/useIndicios';
import { useExpedientes } from '../../../hooks/useExpedientes';
import { useEstados } from '../../../hooks/useEstados';

// Role IDs
const TECNICO = 2;

function TecnicoIndicioCreate() {
  const { expedienteId: routeExpedienteId } = useParams(); // Expediente ID from URL (optional)
  const navigate = useNavigate();
  const { roleId, isAuthenticated } = useAuthStatus();
  const loggedInUserId = parseInt(localStorage.getItem('userId'), 10);

  const [createIndicio, { loading, error }] = useCreateIndicio();
  const { data: expedientes, loading: loadingExpedientes, error: errorExpedientes } = useExpedientes();
  const { data: estados, loading: loadingEstados, error: errorEstados } = useEstados();

  const [descripcion, setDescripcion] = useState('');
  const [color, setColor] = useState('');
  const [tamanio, setTamanio] = useState('');
  const [peso, setPeso] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [tecnicaRegistrada, setTecnicaRegistrada] = useState('');
  const [selectedExpedienteId, setSelectedExpedienteId] = useState(routeExpedienteId || '');

  // Find the 'abierto' estado ID
  const estadoAbiertoId = estados?.find(estado => estado.nombre.toLowerCase() === 'abierto')?.id;

  // Filter eligible expedientes: created by loggedInUserId and in 'abierto' state
  const eligibleExpedientes = expedientes?.filter(exp => 
    exp.tecnico_id === loggedInUserId && exp.estado_id === estadoAbiertoId
  ) || [];

  useEffect(() => {
    if (!isAuthenticated || roleId !== TECNICO) {
      navigate('/unauthorized');
    }
    // If an expedienteId is provided in the URL but it's not eligible, redirect
    if (routeExpedienteId && !eligibleExpedientes.some(exp => String(exp.id) === routeExpedienteId)) {
        if (!loadingExpedientes && !loadingEstados) { // Only show alert after data is loaded
            alert('El expediente especificado no es elegible para añadir indicios.');
            navigate('/tecnico/expedientes'); // Redirect to technician's expedientes list
        }
    }
  }, [isAuthenticated, roleId, navigate, routeExpedienteId, eligibleExpedientes, loadingExpedientes, loadingEstados]);

  useEffect(() => {
    // If coming from /tecnico/expedientes/:expedienteId/indicios/create, pre-select expediente
    if (routeExpedienteId) {
        setSelectedExpedienteId(routeExpedienteId);
    }
  }, [routeExpedienteId]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedExpedienteId) {
        alert('Debe seleccionar un expediente para el indicio.');
        return;
    }

    try {
      await createIndicio({
        descripcion,
        color,
        tamanio,
        peso,
        ubicacion,
        tecnica_registrada: tecnicaRegistrada,
        tecnico_id: loggedInUserId,
        expediente_id: parseInt(selectedExpedienteId, 10),
      });
      alert('Indicio creado con éxito!');
      navigate(`/tecnico/expedientes/${selectedExpedienteId}/indicios`); // Redirect to indicios list for that expediente
    } catch (err) {
      console.error('Error al crear indicio:', err);
    }
  };

  if (loadingExpedientes || loadingEstados) {
    return <div className="p-6 text-center">Cargando datos...</div>;
  }

  if (errorExpedientes || errorEstados) {
    return <div className="p-6 text-center text-red-600">Error al cargar datos de apoyo.</div>;
  }

  return (
    <div className="p-6 bg-white shadow rounded-lg max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Crear Nuevo Indicio</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="expediente" className="block text-sm font-medium text-gray-700">Expediente</label>
          <select
            id="expediente"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            value={selectedExpedienteId}
            onChange={(e) => setSelectedExpedienteId(e.target.value)}
            required
            disabled={!!routeExpedienteId} // Disable if expedienteId is provided in URL
          >
            <option value="">Seleccione un expediente</option>
            {eligibleExpedientes.map(exp => (
              <option key={exp.id} value={exp.id}>
                {exp.descripcion} (ID: {exp.id})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700">Descripción</label>
          <textarea
            id="descripcion"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm h-24 resize-none"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="color" className="block text-sm font-medium text-gray-700">Color</label>
          <input
            type="text"
            id="color"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="tamanio" className="block text-sm font-medium text-gray-700">Tamaño</label>
          <input
            type="text"
            id="tamanio"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            value={tamanio}
            onChange={(e) => setTamanio(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="peso" className="block text-sm font-medium text-gray-700">Peso</label>
          <input
            type="text"
            id="peso"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            value={peso}
            onChange={(e) => setPeso(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="ubicacion" className="block text-sm font-medium text-gray-700">Ubicación</label>
          <input
            type="text"
            id="ubicacion"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            value={ubicacion}
            onChange={(e) => setUbicacion(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="tecnicaRegistrada" className="block text-sm font-medium text-gray-700">Técnica Registrada</label>
          <input
            type="text"
            id="tecnicaRegistrada"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            value={tecnicaRegistrada}
            onChange={(e) => setTecnicaRegistrada(e.target.value)}
          />
        </div>
        
        {error && <p className="text-red-500 text-sm mt-2">Error: {error.message || 'Error al crear indicio'}</p>}

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => navigate(`/tecnico/expedientes/${selectedExpedienteId}/indicios`)} // Cancel, go to indicios list for this expediente
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
            {loading ? 'Creando...' : 'Crear Indicio'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default TecnicoIndicioCreate;
