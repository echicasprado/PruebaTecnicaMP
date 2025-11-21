import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useIndicio, useUpdateIndicio } from '../../../hooks/useIndicios';
import { useExpedientes } from '../../../hooks/useExpedientes';
import { useUsuarios } from '../../../hooks/useUsuarios';
import UserSelect from '../../common/UserSelect';

// Role IDs
const TECNICO = 2;

function AdminIndicioEdit() {
  const { indicioId } = useParams();
  const navigate = useNavigate();

  const { data: indicio, loading: loadingIndicio, error: errorIndicio } = useIndicio(indicioId);
  const [updateIndicio, { loading: updating, error: updateError }] = useUpdateIndicio();
  const { data: expedientes, loading: loadingExpedientes, error: errorExpedientes } = useExpedientes();
  const { data: usuarios, loading: loadingUsuarios, error: errorUsuarios } = useUsuarios();

  const [descripcion, setDescripcion] = useState('');
  const [color, setColor] = useState('');
  const [tamanio, setTamanio] = useState('');
  const [peso, setPeso] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [tecnicaRegistrada, setTecnicaRegistrada] = useState('');
  const [tecnicoId, setTecnicoId] = useState('');
  const [expedienteId, setExpedienteId] = useState('');

  useEffect(() => {
    if (indicio) {
      setDescripcion(indicio.descripcion);
      setColor(indicio.color);
      setTamanio(indicio.tamanio);
      setPeso(indicio.peso);
      setUbicacion(indicio.ubicacion);
      setTecnicaRegistrada(indicio.tecnica_registrada);
      setTecnicoId(indicio.tecnico_id || '');
      setExpedienteId(indicio.expediente_id || '');
    }
  }, [indicio]);

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
          tecnico_id: tecnicoId,
          expediente_id: expedienteId,
        });
        alert('Indicio actualizado con éxito!');
        navigate('/admin/indicios');
      } catch (err) {
        console.error('Error al actualizar indicio:', err);
      }
    }
  };

  if (loadingIndicio || loadingExpedientes || loadingUsuarios) {
    return <div className="p-6 text-center">Cargando indicio...</div>;
  }

  if (errorIndicio) {
    return <div className="p-6 text-center text-red-600">Error al cargar indicio: {errorIndicio.message}</div>;
  }
  if (errorExpedientes || errorUsuarios) {
    return <div className="p-6 text-center text-red-600">Error al cargar datos de apoyo.</div>;
  }

  if (!indicio) {
    return <div className="p-6 text-center text-gray-600">Indicio no encontrado.</div>;
  }

  return (
    <div className="p-6 bg-white shadow rounded-lg max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Editar Indicio #{indicioId} (Admin)</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="expedienteId" className="block text-sm font-medium text-gray-700">Expediente</label>
          <select
            id="expedienteId"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            value={expedienteId}
            onChange={(e) => setExpedienteId(parseInt(e.target.value, 10))}
            required
          >
            <option value="">Seleccione un expediente</option>
            {expedientes.map(exp => (
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
        
        <UserSelect
          label="Técnico Asignado"
          value={tecnicoId}
          onChange={setTecnicoId}
          filterRoleId={TECNICO} // Filter for Tecnicos
          required={true}
        />
        
        {updateError && <p className="text-red-500 text-sm mt-2">Error: {updateError.message || 'Error al actualizar indicio'}</p>}

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => navigate('/admin/indicios')}
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

export default AdminIndicioEdit;
