import { useState, useEffect, useCallback } from 'react';
import {
  getExpedientes,
  getExpedienteById,
  createExpediente as apiCreateExpediente,
  updateExpediente as apiUpdateExpediente,
  deleteExpediente as apiDeleteExpediente,
} from '../services/expedienteService';

/**
 * Hook para obtener la lista de todos los expedientes.
 */
export function useExpedientes() {
  const [state, setState] = useState({ data: [], loading: true, error: null });

  const fetchData = useCallback(async (signal) => {
    try {
      setState(prevState => ({ ...prevState, loading: true, error: null }));
      const data = await getExpedientes({ signal });
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

/**
 * Hook para obtener un único expediente por su ID.
 * @param {string | null} id - El ID del expediente a obtener.
 */
export function useExpediente(id) {
  const [state, setState] = useState({ data: null, loading: false, error: null });

  const fetchData = useCallback(async (signal) => {
    if (!id) {
      setState({ data: null, loading: false, error: null });
      return;
    }
    try {
      setState({ data: null, loading: true, error: null });
      const data = await getExpedienteById(id, { signal });
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

/**
 * Hook para crear un nuevo expediente.
 * @returns {[Function, { loading: boolean, error: Error | null, data: any | null }]}
 */
export function useCreateExpediente() {
  const [state, setState] = useState({ loading: false, error: null, data: null });

  const createExpediente = useCallback(async (expedienteData) => {
    setState({ loading: true, error: null, data: null });
    try {
      const data = await apiCreateExpediente(expedienteData);
      setState({ loading: false, error: null, data });
      return data;
    } catch (error) {
      setState({ loading: false, error, data: null });
      throw error;
    }
  }, []);

  return [createExpediente, state];
}

/**
 * Hook para actualizar un expediente existente.
 * @returns {[Function, { loading: boolean, error: Error | null, data: any | null }]}
 */
export function useUpdateExpediente() {
  const [state, setState] = useState({ loading: false, error: null, data: null });

  const updateExpediente = useCallback(async (id, expedienteData) => {
    setState({ loading: true, error: null, data: null });
    try {
      const data = await apiUpdateExpediente(id, expedienteData);
      setState({ loading: false, error: null, data });
      return data;
    } catch (error) {
      setState({ loading: false, error, data: null });
      throw error;
    }
  }, []);

  return [updateExpediente, state];
}

/**
 * Hook para eliminar un expediente.
 * @returns {[Function, { loading: boolean, error: Error | null }]}
 */
export function useDeleteExpediente() {
  const [state, setState] = useState({ loading: false, error: null, data: null });

  const deleteExpediente = useCallback(async (id) => {
    setState({ loading: true, error: null, data: null });
    try {
      await apiDeleteExpediente(id);
      setState({ loading: false, error: null, data: { success: true } });
    } catch (error) {
      setState({ loading: false, error, data: null });
      throw error;
    }
  }, []);

  return [deleteExpediente, state];
}