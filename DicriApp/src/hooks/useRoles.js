import { useState, useEffect, useCallback } from 'react';
import { getRoles as apiGetRoles } from '../services/roleService';

export function useRoles() {
  const [state, setState] = useState({ data: [], loading: true, error: null });

  const fetchData = useCallback(async (signal) => {
    try {
      setState(prevState => ({ ...prevState, loading: true, error: null }));
      const data = await apiGetRoles({ signal });
      setState(prevState => ({ ...prevState, data, loading: false }));
    } catch (error) {
      if (error.name !== 'AbortError') {
        setState(prevState => ({ ...prevState, error, loading: false }));
      }
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    fetchData(controller.signal);
    return () => controller.abort();
  }, [fetchData]);

  return { ...state, refetch: () => fetchData(new AbortController().signal) };
}
