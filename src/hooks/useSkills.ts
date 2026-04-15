import { useTranslation } from 'react-i18next';
import useSWR from 'swr';
import {
  getHabilidades,
  getHabilidadesPorCategoria,
} from '../services/contentful';
import type { Habilidad } from '../types';

/**
 * Interface defining the return shape of the useSkills hook.
 */
interface UseSkillsReturn {
  /** Object mapping skill categories to arrays of skills */
  skills: Record<string, Habilidad[]>;
  /** Loading state indicator */
  loading: boolean;
  /** Error message if fetch fails, null otherwise */
  error: string | null;
  /** Function to manually trigger a data refresh */
  refetch: () => Promise<void>;
}

/**
 * Custom hook to fetch and manage all skills, grouped by category.
 * 
 * @returns Object containing grouped skills data, loading state, error state, and refetch function
 */
export const useSkills = (): UseSkillsReturn => {
  const { i18n } = useTranslation();

  const { data, error, isLoading, mutate } = useSWR<Record<string, Habilidad[]>>(
    ['skills', i18n.language],
    ([, l]) => getHabilidades(l as string),
    { revalidateOnFocus: false, dedupingInterval: 300000 }
  );

  return {
    skills: data ?? {},
    loading: isLoading,
    error: error ? (error instanceof Error ? error.message : 'Failed to fetch skills') : null,
    refetch: async () => { await mutate(); },
  };
};

/**
 * Interface defining the return shape of the useSkillsByCategory hook.
 */
interface UseSkillsByCategoryReturn {
  /** Array of skills for the specified category */
  skills: Habilidad[];
  /** Loading state indicator */
  loading: boolean;
  /** Error message if fetch fails, null otherwise */
  error: string | null;
  /** Function to manually trigger a data refresh */
  refetch: () => Promise<void>;
}

/**
 * Custom hook to fetch skills for a specific category.
 * 
 * @param categoria - The category of skills to fetch (e.g., 'Frontend', 'Backend')
 * @returns Object containing filtered skills data, loading state, error state, and refetch function
 */
export const useSkillsByCategory = (
  categoria: Habilidad['categoria']
): UseSkillsByCategoryReturn => {
  const { i18n } = useTranslation();

  const { data, error, isLoading, mutate } = useSWR<Habilidad[]>(
    ['skills-by-category', categoria, i18n.language],
    ([, cat, l]) => getHabilidadesPorCategoria(cat as Habilidad['categoria'], l as string),
    { revalidateOnFocus: false, dedupingInterval: 300000 }
  );

  return {
    skills: data ?? [],
    loading: isLoading,
    error: error ? (error instanceof Error ? error.message : 'Failed to fetch skills') : null,
    refetch: async () => { await mutate(); },
  };
};
