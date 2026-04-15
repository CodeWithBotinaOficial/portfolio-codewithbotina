import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';
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
 * Implements SWR for caching and provides a clean interface for component consumption.
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
  const { i18n } = useTranslation();

  const memoizedFilters = useMemo(() => {
    return filters ? JSON.stringify(filters) : 'no-filters';
  }, [filters]);

  const { data, error, isLoading, mutate } = useSWR<Proyecto[]>(
    ['projects', memoizedFilters, sortBy, order, i18n.language],
    async ([, f, s, o, l]) => {
      const parsedFilters = f === 'no-filters' ? undefined : JSON.parse(f as string) as FilterOptions;
      return getProyectos(parsedFilters, s as 'fecha' | 'orden', o as SortOrder, l as string);
    },
    { revalidateOnFocus: false, dedupingInterval: 300000 }
  );

  return {
    projects: data ?? [],
    loading: isLoading,
    error: error ? (error instanceof Error ? error.message : 'Failed to fetch projects') : null,
    refetch: async () => { await mutate(); },
  };
};

/**
 * Custom hook specifically for fetching featured projects.
 * 
 * @returns Object containing featured projects data, loading state, error state, and refetch function
 */
export const useFeaturedProjects = (): UseProjectsReturn => {
  const { i18n } = useTranslation();

  const { data, error, isLoading, mutate } = useSWR<Proyecto[]>(
    ['featured-projects', i18n.language],
    async ([, l]) => getProyectosDestacados(l as string),
    { revalidateOnFocus: false, dedupingInterval: 300000 }
  );

  return {
    projects: data ?? [],
    loading: isLoading,
    error: error ? (error instanceof Error ? error.message : 'Failed to fetch featured projects') : null,
    refetch: async () => { await mutate(); },
  };
};
