import { useState, useEffect, useCallback } from 'react';
import {
  getUsuarios as apiGetUsuarios,
  getUsuarioById as apiGetUsuarioById,
  updateUsuario as apiUpdateUsuario,
  deleteUsuario as apiDeleteUsuario,
} from '../services/userService';

export function useUsuarios() {
  const [state, setState] = useState({ data: [], loading: true, error: null });

  const fetchData = useCallback(async (signal) => {
    try {
      setState(prevState => ({ ...prevState, loading: true, error: null }));
      const data = await apiGetUsuarios({ signal });
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

export function useUsuario(id) {
  const [state, setState] = useState({ data: null, loading: false, error: null });

  const fetchData = useCallback(async (signal) => {
    if (!id) return;
    try {
      setState({ data: null, loading: true, error: null });
      const data = await apiGetUsuarioById(id, { signal });
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

export function useUpdateUsuario() {
  const [state, setState] = useState({ loading: false, error: null, data: null });

  const updateUsuario = useCallback(async (id, userData) => {
    setState({ loading: true, error: null, data: null });
    try {
      const data = await apiUpdateUsuario(id, userData);
      setState({ loading: false, error: null, data });
      return data;
    } catch (error) {
      setState({ loading: false, error, data: null });
      throw error;
    }
  }, []);

  return [updateUsuario, state];
}

export function useDeleteUsuario() {
  const [state, setState] = useState({ loading: false, error: null, data: null });

  const deleteUsuario = useCallback(async (id) => {
    setState({ loading: true, error: null, data: null });
    try {
      await apiDeleteUsuario(id);
      setState({ loading: false, error: null, data: { success: true } });
    } catch (error) {
      setState({ loading: false, error, data: null });
      throw error;
    }
  }, []);

  return [deleteUsuario, state];
}
