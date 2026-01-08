import { useState, useEffect, useCallback } from 'react';
import {
  getHabilidades,
  getHabilidadesPorCategoria,
} from '../services/contentful';
import type { Habilidad } from '../types';

interface UseSkillsReturn {
  skills: Record<string, Habilidad[]>;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

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
      setError(err instanceof Error ? err.message : 'Failed to fetch skills');
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

interface UseSkillsByCategoryReturn {
  skills: Habilidad[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

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
      setError(err instanceof Error ? err.message : 'Failed to fetch skills');
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