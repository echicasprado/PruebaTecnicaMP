import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Navbar from './Navbar';
import { useAuthStatus } from '../../hooks/useAuth';

// Role IDs
const ADMIN = 1;
const TECNICO = 2;
const COORDINADOR = 3;

/**
 * Main application layout for authenticated users.
 * Includes Navbar and renders child routes via Outlet.
 */
function AppLayout() {
  const { isAuthenticated, roleId } = useAuthStatus();

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Define common routes here or specific roles can define their own layouts
  // For now, it's a simple layout with a Navbar

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto p-4">
        <Outlet /> {/* Renders the matched child route */}
      </main>
      {/* Optional: Footer */}
    </div>
  );
}

export default AppLayout;
