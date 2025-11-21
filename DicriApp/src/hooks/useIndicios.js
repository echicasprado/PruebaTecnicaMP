import { useState, useEffect, useCallback } from 'react';
import {
  getIndicios as apiGetIndicios,
  getIndicioById as apiGetIndicioById,
  getIndiciosByExpedienteId as apiGetIndiciosByExpedienteId,
  createIndicio as apiCreateIndicio,
  updateIndicio as apiUpdateIndicio,
  deleteIndicio as apiDeleteIndicio,
} from '../services/indicioService';

// Similar structure to useExpedientes, but for Indicios

export function useIndicios() {
  const [state, setState] = useState({ data: [], loading: true, error: null });

  const fetchData = useCallback(async (signal) => {
    try {
      setState(prevState => ({ ...prevState, loading: true, error: null }));
      const data = await apiGetIndicios({ signal });
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

export function useIndicio(id) {
  const [state, setState] = useState({ data: null, loading: false, error: null });

  const fetchData = useCallback(async (signal) => {
    if (!id) return;
    try {
      setState({ data: null, loading: true, error: null });
      const data = await apiGetIndicioById(id, { signal });
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

export function useIndiciosByExpediente(expedienteId) {
    const [state, setState] = useState({ data: [], loading: false, error: null });
  
    const fetchData = useCallback(async (signal) => {
      if (!expedienteId) return;
      try {
        setState({ data: [], loading: true, error: null });
        const data = await apiGetIndiciosByExpedienteId(expedienteId, { signal });
        setState({ data, loading: false, error: null });
      } catch (error) {
        if (error.name !== 'AbortError') {
          setState({ error, loading: false, data: [] });
        }
      }
    }, [expedienteId]);
  
    useEffect(() => {
      const controller = new AbortController();
      fetchData(controller.signal);
      return () => controller.abort();
    }, [expedienteId, fetchData]);
  
    return { ...state, refetch: () => fetchData(new AbortController().signal) };
}

export function useCreateIndicio() {
  const [state, setState] = useState({ loading: false, error: null, data: null });

  const createIndicio = useCallback(async (indicioData) => {
    setState({ loading: true, error: null, data: null });
    try {
      const data = await apiCreateIndicio(indicioData);
      setState({ loading: false, error: null, data });
      return data;
    } catch (error) {
      setState({ loading: false, error, data: null });
      throw error;
    }
  }, []);

  return [createIndicio, state];
}

export function useUpdateIndicio() {
  const [state, setState] = useState({ loading: false, error: null, data: null });

  const updateIndicio = useCallback(async (id, indicioData) => {
    setState({ loading: true, error: null, data: null });
    try {
      const data = await apiUpdateIndicio(id, indicioData);
      setState({ loading: false, error: null, data });
      return data;
    } catch (error) {
      setState({ loading: false, error, data: null });
      throw error;
    }
  }, []);

  return [updateIndicio, state];
}

export function useDeleteIndicio() {
  const [state, setState] = useState({ loading: false, error: null, data: null });

  const deleteIndicio = useCallback(async (id) => {
    setState({ loading: true, error: null, data: null });
    try {
      await apiDeleteIndicio(id);
      setState({ loading: false, error: null, data: { success: true } });
    } catch (error) {
      setState({ loading: false, error, data: null });
      throw error;
    }
  }, []);

  return [deleteIndicio, state];
}
