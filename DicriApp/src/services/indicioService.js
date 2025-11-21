import apiFetch from './api';

export const getIndicios = async (options) => {
  return apiFetch('/indicios', options);
};

export const getIndicioById = async (id, options) => {
  return apiFetch(`/indicios/${id}`, options);
};

export const getIndiciosByExpedienteId = async (expedienteId, options) => {
  return apiFetch(`/indicios/expediente/${expedienteId}`, options);
};

export const createIndicio = async (indicioData, options) => {
  return apiFetch('/indicios', {
    method: 'POST',
    body: indicioData,
    ...options,
  });
};

export const updateIndicio = async (id, indicioData, options) => {
  return apiFetch(`/indicios/${id}`, {
    method: 'PUT',
    body: indicioData,
    ...options,
  });
};

export const deleteIndicio = async (id, options) => {
  return apiFetch(`/indicios/${id}`, {
    method: 'DELETE',
    ...options,
  });
};
