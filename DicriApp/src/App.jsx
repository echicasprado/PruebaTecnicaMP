import React from 'react';
import { Routes, Route, Navigate, Outlet, useNavigate } from 'react-router-dom';
import Login from './components/layout/Login';
import AppLayout from './components/layout/AppLayout';
import AdminDashboard from './components/admin/AdminDashboard';
import TecnicoDashboard from './components/tecnico/TecnicoDashboard';
import CoordinadorDashboard from './components/coordinador/CoordinadorDashboard';
import AdminUserList from './components/admin/UserManagement/AdminUserList';
import AdminUserCreate from './components/admin/UserManagement/AdminUserCreate';
import AdminUserEdit from './components/admin/UserManagement/AdminUserEdit';
import { useAuthStatus } from './hooks/useAuth';
import ErrorBoundary from './components/common/ErrorBoundary';
import AdminExpedienteManagement from './components/admin/ExpedienteManagement/AdminExpedienteManagement';
import AdminExpedienteCreate from './components/admin/ExpedienteManagement/AdminExpedienteCreate';
import AdminExpedienteEdit from './components/admin/ExpedienteManagement/AdminExpedienteEdit';
import AdminIndicioManagement from './components/admin/IndicioManagement/AdminIndicioManagement';
import AdminIndicioCreate from './components/admin/IndicioManagement/AdminIndicioCreate';
import AdminIndicioEdit from './components/admin/IndicioManagement/AdminIndicioEdit';
import TecnicoExpedienteList from './components/tecnico/ExpedienteManagement/TecnicoExpedienteList';
import TecnicoExpedienteCreate from './components/tecnico/ExpedienteManagement/TecnicoExpedienteCreate';
import TecnicoExpedienteEdit from './components/tecnico/ExpedienteManagement/TecnicoExpedienteEdit';
import TecnicoIndicioList from './components/tecnico/IndicioManagement/TecnicoIndicioList';
import TecnicoIndicioCreate from './components/tecnico/IndicioManagement/TecnicoIndicioCreate';
import TecnicoIndicioEdit from './components/tecnico/IndicioManagement/TecnicoIndicioEdit';
import CoordinadorExpedienteReviewList from './components/coordinador/ExpedienteReview/CoordinadorExpedienteReviewList';
import CoordinadorExpedienteReview from './components/coordinador/ExpedienteReview/CoordinadorExpedienteReview';

const ADMIN = 1;
const TECNICO = 2;
const COORDINADOR = 3;

const ProtectedRoute = ({ allowedRoles }) => {
  const { isAuthenticated, roleId } = useAuthStatus();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(roleId)) {
    switch (roleId) {
      case ADMIN:
        return <Navigate to="/admin/dashboard" replace />;
      case TECNICO:
        return <Navigate to="/tecnico/dashboard" replace />;
      case COORDINADOR:
        return <Navigate to="/coordinador/dashboard" replace />;
      default:
        return <Navigate to="/unauthorized" replace />;
    }
  }

  return <Outlet />;
};

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
      return <Navigate to="/unauthorized" replace />;
  }
};

function App() {
  const navigate = useNavigate();

  const handleUserCreated = () => {
    navigate('/admin/users');
  };

  const handleUserUpdated = () => {
    navigate('/admin/users');
  };

  const handleCancel = () => {
    navigate('/admin/users');
  };

  const handleAdminExpedienteCreated = () => {
    navigate('/admin/expedientes');
  }

  const handleAdminExpedienteCancel = () => {
    navigate('/admin/expedientes');
  }

  const handleAdminExpedienteUpdated = () => {
    navigate('/admin/expedientes');
  }

  const handleAdminIndicioCreated = () => {
    navigate('/admin/indicios');
  }

  const handleAdminIndicioCancel = () => {
    navigate('/admin/indicios');
  }

  const handleAdminIndicioUpdated = () => {
    navigate('/admin/indicios');
  }

  const handleExpedienteCreated = () => {
    navigate('/tecnico/expedientes');
  }

  const handleExpedienteCancel = () => {
    navigate('/tecnico/expedientes');
  }

  const handleExpedienteUpdated = () => {
    navigate('/tecnico/expedientes');
  }

  const handleIndicioCreated = () => {
    navigate('/tecnico/expedientes');
  }

  const handleIndicioCancel = () => {
    navigate('/tecnico/expedientes');
  }

  const handleIndicioUpdated = () => {
    navigate('/tecnico/expedientes');
  }

  const handleCoordinadorReviewCompleted = () => {
    navigate('/coordinador/expedientes/review');
  }


  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<RoleBasedRedirect />} />

        {/* Protected Routes - Admin */}
        <Route element={<ProtectedRoute allowedRoles={[ADMIN]} />}>
          <Route path="/admin" element={<AppLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="users" element={<AdminUserList />} />
            <Route path="users/create" element={<AdminUserCreate onUserCreated={handleUserCreated} onCancel={handleCancel} />} />
            <Route path="users/edit/:userId" element={<AdminUserEdit onUserUpdated={handleUserUpdated} onCancel={handleCancel} />} />
            
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
    </ErrorBoundary>
  );
}

export default App;
