import apiFetch from './api';

export const getExpedientes = async (options) => {
  return apiFetch('/expedientes', options);
};

export const getExpedienteById = async (id, options) => {
  return apiFetch(`/expedientes/${id}`, options);
};

export const createExpediente = async (expedienteData, options) => {
  return apiFetch('/expedientes', {
    method: 'POST',
    body: expedienteData,
    ...options,
  });
};

export const updateExpediente = async (id, expedienteData, options) => {
  return apiFetch(`/expedientes/${id}`, {
    method: 'PUT',
    body: expedienteData,
    ...options,
  });
};

export const deleteExpediente = async (id, options) => {
  return apiFetch(`/expedientes/${id}`, {
    method: 'DELETE',
    ...options,
  });
};
