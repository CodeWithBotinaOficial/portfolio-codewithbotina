import { useState, useEffect } from 'react';
import { getProyectos, getProyectosDestacados } from '../services/contentful';
import type { Proyecto, FilterOptions, SortOrder } from '../types';

interface UseProjectsReturn {
  projects: Proyecto[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useProjects = (
  filters?: FilterOptions,
  sortBy: 'fecha' | 'orden' = 'orden',
  order: SortOrder = 'asc'
): UseProjectsReturn => {
  const [projects, setProjects] = useState<Proyecto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getProyectos(filters, sortBy, order);
      setProjects(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch projects');
      console.error('Error fetching projects:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [JSON.stringify(filters), sortBy, order]);

  return {
    projects,
    loading,
    error,
    refetch: fetchProjects,
  };
};

export const useFeaturedProjects = (): UseProjectsReturn => {
  const [projects, setProjects] = useState<Proyecto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getProyectosDestacados();
      setProjects(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch featured projects');
      console.error('Error fetching featured projects:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return {
    projects,
    loading,
    error,
    refetch: fetchProjects,
  };
};