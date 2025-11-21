import { useState, useCallback, useEffect } from 'react';
import { 
    login as apiLogin, 
    register as apiRegister, 
    logout as apiLogout 
} from '../services/authService';

/**
 * Hook to manage user authentication status and role.
 * Returns { isAuthenticated: boolean, roleId: string | null }.
 */
export function useAuthStatus() {
    const [authStatus, setAuthStatus] = useState({
        isAuthenticated: false,
        roleId: null
    });
    
    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem('token');
            const role = localStorage.getItem('roleId');
            setAuthStatus({
                isAuthenticated: !!token,
                roleId: role ? parseInt(role, 10) : null
            });
        };

        checkAuth();

        const handleStorageChange = () => {
            checkAuth();
        };

        window.addEventListener('storage', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    return authStatus;
}


/**
 * Hook for handling the login action.
 * @returns {[Function, { loading: boolean, error: Error | null, data: any | null }]}
 */
export function useLogin() {
  const [state, setState] = useState({ loading: false, error: null, data: null });

  const login = useCallback(async (credentials) => {
    setState({ loading: true, error: null, data: null });
    try {
      const data = await apiLogin(credentials);
      setState({ loading: false, error: null, data });
      window.dispatchEvent(new Event('storage'));
      return data;
    } catch (error) {
      setState({ loading: false, error, data: null });
      throw error;
    }
  }, []);

  return [login, state];
}

/**
 * Hook for handling the user registration action.
 * @returns {[Function, { loading: boolean, error: Error | null, data: any | null }]}
 */
export function useRegister() {
  const [state, setState] = useState({ loading: false, error: null, data: null });

  const register = useCallback(async (userData) => {
    setState({ loading: true, error: null, data: null });
    try {
      const data = await apiRegister(userData);
      setState({ loading: false, error: null, data });
      return data;
    } catch (error) {
      setState({ loading: false, error, data: null });
      throw error;
    }
  }, []);

  return [register, state];
}

/**
 * Hook for handling the logout action.
 */
export function useLogout() {
    const logout = useCallback(() => {
        apiLogout();
        // Manually trigger a storage event to update useAuthStatus hook in other tabs/windows
        window.dispatchEvent(new Event('storage'));
    }, []);

    return logout;
}
