import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStatus, useLogout } from '../../hooks/useAuth';

// Role IDs
const ADMIN = 1;
const TECNICO = 2;
const COORDINADOR = 3;

function Navbar() {
  const { isAuthenticated, roleId } = useAuthStatus();
  const logout = useLogout();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login'); // Redirect to login page after logout
  };

  const getMenuItems = () => {
    if (!isAuthenticated) {
      return (
        <li>
          <Link to="/login" className="text-white hover:text-blue-200">
            Iniciar Sesión
          </Link>
        </li>
      );
    }

    let items = [];

    switch (roleId) {
      case ADMIN:
        items.push(
          <li key="admin-dashboard">
            <Link to="/admin/dashboard" className="text-white hover:text-blue-200">
              Admin Dashboard
            </Link>
          </li>,
          <li key="users">
            <Link to="/admin/users" className="text-white hover:text-blue-200">
              Gestionar Usuarios
            </Link>
          </li>,
          <li key="admin-expedientes">
            <Link to="/admin/expedientes" className="text-white hover:text-blue-200">
              Gestionar Expedientes
            </Link>
          </li>,
          <li key="admin-indicios">
            <Link to="/admin/indicios" className="text-white hover:text-blue-200">
              Gestionar Indicios
            </Link>
          </li>
          // Add other admin specific links
        );
        break;
      case TECNICO:
        items.push(
          <li key="tecnico-dashboard">
            <Link to="/tecnico/dashboard" className="text-white hover:text-blue-200">
              Técnico Dashboard
            </Link>
          </li>,
          <li key="my-expedientes">
            <Link to="/tecnico/expedientes" className="text-white hover:text-blue-200">
              Mis Expedientes
            </Link>
          </li>,
          <li key="create-expediente">
            <Link to="/tecnico/expedientes/create" className="text-white hover:text-blue-200">
              Crear Expediente
            </Link>
          </li>
          // Add other tecnico specific links
        );
        break;
      case COORDINADOR:
        items.push(
          <li key="coordinador-dashboard">
            <Link to="/coordinador/dashboard" className="text-white hover:text-blue-200">
              Coordinador Dashboard
            </Link>
          </li>,
          <li key="review-expedientes">
            <Link to="/coordinador/expedientes/review" className="text-white hover:text-blue-200">
              Revisar Expedientes
            </Link>
          </li>
          // Add other coordinador specific links
        );
        break;
      default:
        // No specific role or other roles
        break;
    }

    items.push(
      <li key="logout">
        <button onClick={handleLogout} className="text-white hover:text-blue-200 bg-red-500 px-3 py-1 rounded">
          Cerrar Sesión
        </button>
      </li>
    );

    return items;
  };

  return (
    <nav className="bg-blue-600 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">
          DicriApp
        </Link>
        <ul className="flex space-x-4">{getMenuItems()}</ul>
      </div>
    </nav>
  );
}

export default Navbar;