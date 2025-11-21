import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuthStatus } from '../../../hooks/useAuth';
import { useIndicio, useUpdateIndicio } from '../../../hooks/useIndicios'; // Use useIndicio for single fetch

// Role IDs
const TECNICO = 2;

function TecnicoIndicioEdit() {
  const { indicioId } = useParams();
  const navigate = useNavigate();
  const { roleId, isAuthenticated } = useAuthStatus();
  const loggedInUserId = parseInt(localStorage.getItem('userId'), 10);

  const { data: indicio, loading: loadingIndicio, error: errorIndicio } = useIndicio(indicioId);
  const [updateIndicio, { loading: updating, error: updateError }] = useUpdateIndicio();

  const [descripcion, setDescripcion] = useState('');
  const [color, setColor] = useState('');
  const [tamanio, setTamanio] = useState('');
  const [peso, setPeso] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [tecnicaRegistrada, setTecnicaRegistrada] = useState('');

  useEffect(() => {
    if (!isAuthenticated || roleId !== TECNICO) {
      navigate('/unauthorized');
    }
  }, [isAuthenticated, roleId, navigate]);

  useEffect(() => {
    if (indicio) {
      // Check if the logged-in technician owns this indicio
      if (indicio.tecnico_id !== loggedInUserId) {
        alert('No tienes permiso para editar este indicio.');
        navigate(`/tecnico/expedientes/${indicio.expediente_id}/indicios`); // Redirect to indicios list for that expediente
        return;
      }
      setDescripcion(indicio.descripcion);
      setColor(indicio.color);
      setTamanio(indicio.tamanio);
      setPeso(indicio.peso);
      setUbicacion(indicio.ubicacion);
      setTecnicaRegistrada(indicio.tecnica_registrada);
    }
  }, [indicio, loggedInUserId, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (indicioId) {
      try {
        await updateIndicio(parseInt(indicioId, 10), {
          descripcion,
          color,
          tamanio,
          peso,
          ubicacion,
          tecnica_registrada: tecnicaRegistrada,
        });
        alert('Indicio actualizado con éxito!');
        navigate(`/tecnico/expedientes/${indicio?.expediente_id}/indicios`); // Redirect to list of indicios for that expediente
      } catch (err) {
        console.error('Error al actualizar indicio:', err);
      }
    }
  };

  if (loadingIndicio) {
    return <div className="p-6 text-center">Cargando indicio...</div>;
  }

  if (errorIndicio) {
    return <div className="p-6 text-center text-red-600">Error al cargar indicio: {errorIndicio.message}</div>;
  }

  if (!indicio) {
    return <div className="p-6 text-center text-gray-600">Indicio no encontrado.</div>;
  }

  return (
    <div className="p-6 bg-white shadow rounded-lg max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Editar Indicio #{indicioId}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
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
        
        {updateError && <p className="text-red-500 text-sm mt-2">Error: {updateError.message || 'Error al actualizar indicio'}</p>}

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => navigate(`/tecnico/expedientes/${indicio?.expediente_id}/indicios`)} // Cancel, go back to indicios list
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
            {updating ? 'Actualizando...' : 'Actualizar Indicio'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default TecnicoIndicioEdit;
