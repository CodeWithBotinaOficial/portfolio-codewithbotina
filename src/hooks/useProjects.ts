import { useState, useEffect, useCallback, useMemo } from 'react';
import { getProyectos, getProyectosDestacados } from '../services/contentful';
import type { Proyecto, FilterOptions, SortOrder } from '../types';

/**
 * Interface defining the return shape of the useProjects hook.
 */
interface UseProjectsReturn {
  /** Array of fetched projects */
  projects: Proyecto[];
  /** Loading state indicator */
  loading: boolean;
  /** Error message if fetch fails, null otherwise */
  error: string | null;
  /** Function to manually trigger a data refresh */
  refetch: () => Promise<void>;
}

/**
 * Custom hook to fetch and manage project data from Contentful.
 * 
 * Implements memoization for filters to prevent unnecessary re-fetches
 * and provides a clean interface for component consumption.
 * 
 * @param filters - Optional filtering criteria for projects
 * @param sortBy - Field to sort by ('fecha' or 'orden')
 * @param order - Sort direction ('asc' or 'desc')
 * @returns Object containing projects data, loading state, error state, and refetch function
 */
export const useProjects = (
  filters?: FilterOptions,
  sortBy: 'fecha' | 'orden' = 'orden',
  order: SortOrder = 'asc'
): UseProjectsReturn => {
  const [projects, setProjects] = useState<Proyecto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Memoize filters to prevent effect loops if a new object is passed on every render
  const filtersString = JSON.stringify(filters);
  const memoizedFilters = useMemo(() => {
    if (!filtersString) return undefined;
    try {
      return JSON.parse(filtersString) as FilterOptions;
    } catch {
      return undefined;
    }
  }, [filtersString]);

  /**
   * Asynchronous function to fetch projects from the service.
   * Wrapped in useCallback to be stable across renders.
   */
  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getProyectos(memoizedFilters, sortBy, order);
      setProjects(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch projects';
      setError(errorMessage);
      console.error('Error fetching projects:', err);
    } finally {
      setLoading(false);
    }
  }, [memoizedFilters, sortBy, order]);

  // Trigger fetch when dependencies change
  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return {
    projects,
    loading,
    error,
    refetch: fetchProjects,
  };
};

/**
 * Custom hook specifically for fetching featured projects.
 * 
 * @returns Object containing featured projects data, loading state, error state, and refetch function
 */
export const useFeaturedProjects = (): UseProjectsReturn => {
  const [projects, setProjects] = useState<Proyecto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getProyectosDestacados();
      setProjects(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch featured projects';
      setError(errorMessage);
      console.error('Error fetching featured projects:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return {
    projects,
    loading,
    error,
    refetch: fetchProjects,
  };
};
