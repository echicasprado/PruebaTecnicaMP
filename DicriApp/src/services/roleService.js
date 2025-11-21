import apiFetch from './api';

export const getRoles = async (options) => {
  return apiFetch('/roles', options);
};
