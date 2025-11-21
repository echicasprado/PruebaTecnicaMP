import apiFetch from './api';

export const getEstados = async (options) => {
  return apiFetch('/estados', options);
};

export const getEstadoById = async (id, options) => {
  return apiFetch(`/estados/${id}`, options);
};
