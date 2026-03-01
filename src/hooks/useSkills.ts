import { useState, useEffect, useCallback } from 'react';
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
  const [skills, setSkills] = useState<Record<string, Habilidad[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSkills = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getHabilidades();
      setSkills(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch skills';
      setError(errorMessage);
      console.error('Error fetching skills:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSkills();
  }, [fetchSkills]);

  return {
    skills,
    loading,
    error,
    refetch: fetchSkills,
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
  const [skills, setSkills] = useState<Habilidad[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSkills = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getHabilidadesPorCategoria(categoria);
      setSkills(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch skills';
      setError(errorMessage);
      console.error('Error fetching skills:', err);
    } finally {
      setLoading(false);
    }
  }, [categoria]);

  useEffect(() => {
    fetchSkills();
  }, [fetchSkills]);

  return {
    skills,
    loading,
    error,
    refetch: fetchSkills,
  };
};
