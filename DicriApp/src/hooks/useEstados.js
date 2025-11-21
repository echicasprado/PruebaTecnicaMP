import { useState, useEffect, useCallback } from 'react';
import { 
    getEstados as apiGetEstados,
    getEstadoById as apiGetEstadoById
} from '../services/estadoService';

export function useEstados() {
  const [state, setState] = useState({ data: [], loading: true, error: null });

  const fetchData = useCallback(async (signal) => {
    try {
      setState(prevState => ({ ...prevState, loading: true, error: null }));
      const data = await apiGetEstados({ signal });
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

export function useEstado(id) {
    const [state, setState] = useState({ data: null, loading: false, error: null });
  
    const fetchData = useCallback(async (signal) => {
      if (!id) return;
      try {
        setState({ data: null, loading: true, error: null });
        const data = await apiGetEstadoById(id, { signal });
        setState({ data, loading: false, error: null });
      } catch (error) {
        if (error.name !== 'AbortError') {
          setState({ error, loading: false, data: null });
        }
      }
    }, [id]);
  
    useEffect(() => {
      const controller = new AbortController();
      fetchData(controller.signal);
      return () => controller.abort();
    }, [id, fetchData]);
  
    return { ...state, refetch: () => fetchData(new AbortController().signal) };
  }
