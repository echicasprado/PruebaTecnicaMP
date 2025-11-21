import { Outlet, Navigate } from 'react-router-dom';
import Navbar from './Navbar';
import { useAuthStatus } from '../../hooks/useAuth';

const ADMIN = 1;
const TECNICO = 2;
const COORDINADOR = 3;

function AppLayout() {
  const { isAuthenticated, roleId } = useAuthStatus();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

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
