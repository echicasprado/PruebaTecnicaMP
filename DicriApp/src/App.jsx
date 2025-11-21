import React from 'react';
import { Routes, Route, Navigate, Outlet, useNavigate } from 'react-router-dom';
import Login from './components/layout/Login';
import AppLayout from './components/layout/AppLayout';
import AdminDashboard from './components/admin/AdminDashboard';
import TecnicoDashboard from './components/tecnico/TecnicoDashboard';
import CoordinadorDashboard from './components/coordinador/CoordinadorDashboard';
import AdminUserList from './components/admin/UserManagement/AdminUserList'; // Import
import AdminUserCreate from './components/admin/UserManagement/AdminUserCreate'; // Import
import AdminUserEdit from './components/admin/UserManagement/AdminUserEdit';   // Import
import { useAuthStatus } from './hooks/useAuth';

// Role IDs
const ADMIN = 1;
const TECNICO = 2;
const COORDINADOR = 3;

// Component to protect routes based on authentication and role
const ProtectedRoute = ({ allowedRoles }) => {
  const { isAuthenticated, roleId } = useAuthStatus();

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(roleId)) {
    // Redirect to an unauthorized page or dashboard if role is not allowed
    // For now, redirect to the general dashboard
    switch (roleId) {
      case ADMIN:
        return <Navigate to="/admin/dashboard" replace />;
      case TECNICO:
        return <Navigate to="/tecnico/dashboard" replace />;
      case COORDINADOR:
        return <Navigate to="/coordinador/dashboard" replace />;
      default:
        return <Navigate to="/unauthorized" replace />; // A generic unauthorized page
    }
  }

  // If authenticated and role is allowed, render the children (Outlet)
  return <Outlet />;
};

// Component to handle initial redirection based on role after login
const RoleBasedRedirect = () => {
  const { isAuthenticated, roleId } = useAuthStatus();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  switch (roleId) {
    case ADMIN:
      return <Navigate to="/admin/dashboard" replace />;
    case TECNICO:
      return <Navigate to="/tecnico/dashboard" replace />;
    case COORDINADOR:
      return <Navigate to="/coordinador/dashboard" replace />;
    default:
      // Fallback for unknown roles or if roleId is null
      return <Navigate to="/unauthorized" replace />;
  }
};

function App() {
  const navigate = useNavigate(); // Hook must be called inside a component.

  // Callback for when a user is created
  const handleUserCreated = () => {
    navigate('/admin/users'); // Navigate back to the list after creation
  };

  // Callback for when a user is updated
  const handleUserUpdated = () => {
    navigate('/admin/users'); // Navigate back to the list after update
  };

  // Callback for when user creation/edit is cancelled
  const handleCancel = () => {
    navigate('/admin/users'); // Navigate back to the list
  };


  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />

      {/* Redirect for authenticated users */}
      <Route path="/" element={<RoleBasedRedirect />} />

      {/* Protected Routes - Admin */}
      <Route element={<ProtectedRoute allowedRoles={[ADMIN]} />}>
        <Route path="/admin" element={<AppLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<AdminUserList />} />
          <Route path="users/create" element={<AdminUserCreate onUserCreated={handleUserCreated} onCancel={handleCancel} />} />
          <Route path="users/edit/:userId" element={<AdminUserEdit onUserUpdated={handleUserUpdated} onCancel={handleUserCancel} />} />
          
          <Route path="expedientes" element={<AdminExpedienteManagement />} />
          <Route path="expedientes/create" element={<AdminExpedienteCreate onExpedienteCreated={handleAdminExpedienteCreated} onCancel={handleAdminExpedienteCancel} />} />
          <Route path="expedientes/edit/:expedienteId" element={<AdminExpedienteEdit onExpedienteUpdated={handleAdminExpedienteUpdated} onCancel={handleAdminExpedienteCancel} />} />

          <Route path="indicios" element={<AdminIndicioManagement />} />
          <Route path="indicios/create" element={<AdminIndicioCreate onIndicioCreated={handleAdminIndicioCreated} onCancel={handleAdminIndicioCancel} />} />
          <Route path="indicios/edit/:indicioId" element={<AdminIndicioEdit onIndicioUpdated={handleAdminIndicioUpdated} onCancel={handleAdminIndicioCancel} />} />
        </Route>
      </Route>

      {/* Protected Routes - Tecnico */}
      <Route element={<ProtectedRoute allowedRoles={[TECNICO]} />}>
        <Route path="/tecnico" element={<AppLayout />}>
          <Route path="dashboard" element={<TecnicoDashboard />} />
          <Route path="expedientes" element={<TecnicoExpedienteList />} />
          <Route path="expedientes/create" element={<TecnicoExpedienteCreate onExpedienteCreated={handleExpedienteCreated} onCancel={handleExpedienteCancel} />} />
          <Route path="expedientes/edit/:expedienteId" element={<TecnicoExpedienteEdit onExpedienteUpdated={handleExpedienteUpdated} onCancel={handleExpedienteCancel} />} />
          
          <Route path="expedientes/:expedienteId/indicios" element={<TecnicoIndicioList />} />
          <Route path="expedientes/:expedienteId/indicios/create" element={<TecnicoIndicioCreate onIndicioCreated={handleIndicioCreated} onCancel={handleIndicioCancel} />} />
          <Route path="indicios/edit/:indicioId" element={<TecnicoIndicioEdit onIndicioUpdated={handleIndicioUpdated} onCancel={handleIndicioCancel} />} />
        </Route>
      </Route>

      {/* Protected Routes - Coordinador */}
      <Route element={<ProtectedRoute allowedRoles={[COORDINADOR]} />}>
        <Route path="/coordinador" element={<AppLayout />}>
          <Route path="dashboard" element={<CoordinadorDashboard />} />
          <Route path="expedientes/review" element={<CoordinadorExpedienteReviewList />} />
          <Route path="expedientes/review/:expedienteId" element={<CoordinadorExpedienteReview onReviewCompleted={handleCoordinadorReviewCompleted} />} />
        </Route>
      </Route>

      {/* Catch all - No match route */}
      <Route path="*" element={
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <h1 className="text-3xl font-bold text-gray-800">404 - Página no encontrada</h1>
        </div>
      } />
       <Route path="/unauthorized" element={
        <div className="min-h-screen flex items-center justify-center bg-red-100">
          <h1 className="text-3xl font-bold text-red-800">Acceso no autorizado</h1>
        </div>
      } />
    </Routes>
  );
}

export default App;
