import apiFetch from './api';

export const login = async (credentials, options) => {
  const data = await apiFetch('/login', {
    method: 'POST',
    body: credentials,
    ...options,
  });
  if (data.token) {
    localStorage.setItem('token', data.token);
    if (data.role) {
      localStorage.setItem('roleId', data.role);
    }
    // Assuming data.id contains the user's ID
    if (data.id) {
      localStorage.setItem('userId', data.id);
    }
  }
  return data;
};

export const register = async (userData, options) => {
  return apiFetch('/register', {
    method: 'POST',
    body: userData,
    ...options,
  });
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('roleId');
  localStorage.removeItem('userId'); // Also remove userId on logout
};

export const getProtectedData = async (options) => {
    return apiFetch('/protected', options);
};
