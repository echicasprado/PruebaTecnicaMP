import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStatus } from '../../../hooks/useAuth';
import { useExpedientes } from '../../../hooks/useExpedientes';
import { useEstados } from '../../../hooks/useEstados';
import { useUsuarios } from '../../../hooks/useUsuarios';

// Role IDs
const TECNICO = 2; // Defined here for component scope

function TecnicoExpedienteList() {
  const navigate = useNavigate();
  const { roleId, isAuthenticated } = useAuthStatus();
  const loggedInUserId = parseInt(localStorage.getItem('userId'), 10);

  const { data: expedientes, loading: loadingExpedientes, error: errorExpedientes, refetch: refetchExpedientes } = useExpedientes();
  const { data: estados, loading: loadingEstados, error: errorEstados } = useEstados();
  const { data: usuarios, loading: loadingUsuarios, error: errorUsuarios } = useUsuarios();

  // Find the 'abierto' estado ID
  const estadoAbiertoId = estados?.find(estado => estado.nombre.toLowerCase() === 'abierto')?.id;

  // Filter expedientes: only those created by the logged-in technician and in 'abierto' state
  const filteredExpedientes = expedientes?.filter(exp => 
    exp.tecnico_id === loggedInUserId && exp.estado_id === estadoAbiertoId
  ) || [];

  const getEstadoName = (estadoId) => {
    const estado = estados?.find(e => e.id === estadoId);
    return estado ? estado.nombre : 'Desconocido';
  };

  const getUserName = (userId) => {
    const user = usuarios?.find(u => u.id === userId);
    return user ? user.nombre : 'Desconocido';
  };

  useEffect(() => {
    // Basic redirection check, should be covered by ProtectedRoute, but good for direct access
    if (!isAuthenticated || roleId !== TECNICO) {
      navigate('/unauthorized');
    }
  }, [isAuthenticated, roleId, navigate]);

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
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Mis Expedientes Abiertos</h2>
      <button
        onClick={() => navigate('/tecnico/expedientes/create')}
        className="mb-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
      >
        Crear Nuevo Expediente
      </button>

      <div className="overflow-x-auto">
        {filteredExpedientes.length === 0 ? (
          <p className="text-gray-600">No tienes expedientes abiertos.</p>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Descripción
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Coordinador
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredExpedientes.map((exp) => (
                <tr key={exp.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{exp.descripcion}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{getEstadoName(exp.estado_id)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{getUserName(exp.coordinador_id)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => navigate(`/tecnico/expedientes/edit/${exp.id}`)}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      Editar
                    </button>
                    <button
                        onClick={() => navigate(`/tecnico/expedientes/${exp.id}/indicios/create`)}
                        className="text-blue-600 hover:text-blue-900"
                    >
                        Agregar Indicio
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default TecnicoExpedienteList;
