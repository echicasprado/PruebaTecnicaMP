import React, { useState, useEffect } from 'react';
import { useLogin, useAuthStatus } from '../../hooks/useAuth';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginUser, { loading, error, data }] = useLogin();
  const isAuthenticated = useAuthStatus();

  useEffect(() => {
    if (isAuthenticated) {
      // Aquí podrías redirigir al usuario a la página principal o dashboard
      console.log('Usuario ya autenticado. Redirigiendo...');
      // Ejemplo: navigate('/dashboard'); si usas react-router-dom
    }
  }, [isAuthenticated]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginUser({ email, password });
      // Si el login es exitoso, el hook useAuthStatus detectará el cambio en localStorage
      console.log('Inicio de sesión exitoso:', data);
    } catch (err) {
      console.error('Error al iniciar sesión:', err);
    }
  };

  if (isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md text-center">
          <h2 className="text-2xl font-bold mb-4 text-green-600">¡Ya estás autenticado!</h2>
          <p className="text-gray-700">Bienvenido de nuevo.</p>
          {/* Aquí podrías añadir un botón para ir al dashboard, etc. */}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Iniciar Sesión</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
          {error && (
            <p className="mt-2 text-center text-sm text-red-600">
              Error: {error.message || 'Credenciales inválidas.'}
            </p>
          )}
          {data && !error && ( // Only show success if no error
            <p className="mt-2 text-center text-sm text-green-600">
              ¡Sesión iniciada con éxito!
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default Login;
