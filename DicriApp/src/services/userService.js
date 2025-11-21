import apiFetch from './api';

export const getUsuarios = async (options) => {
  return apiFetch('/users', options);
};

export const getUsuarioById = async (id, options) => {
  return apiFetch(`/users/${id}`, options);
};

export const updateUsuario = async (id, userData, options) => {
  return apiFetch(`/users/${id}`, {
    method: 'PUT',
    body: userData,
    ...options,
  });
};

export const deleteUsuario = async (id, options) => {
  return apiFetch(`/users/${id}`, {
    method: 'DELETE',
    ...options,
  });
};
