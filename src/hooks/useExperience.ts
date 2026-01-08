import { useState, useEffect, useCallback } from 'react';
import {
  getExperiencias,
  getEducacion,
  getCertificaciones,
} from '../services/contentful';
import type { Experiencia } from '../types';

interface UseExperienceReturn {
  experiences: Experiencia[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useExperience = (
  tipo?: Experiencia['tipo']
): UseExperienceReturn => {
  const [experiences, setExperiences] = useState<Experiencia[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchExperiences = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getExperiencias(tipo);
      setExperiences(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to fetch experiences'
      );
      console.error('Error fetching experiences:', err);
    } finally {
      setLoading(false);
    }
  }, [tipo]);

  useEffect(() => {
    fetchExperiences();
  }, [fetchExperiences]);

  return {
    experiences,
    loading,
    error,
    refetch: fetchExperiences,
  };
};

export const useEducation = (): UseExperienceReturn => {
  const [experiences, setExperiences] = useState<Experiencia[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchExperiences = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getEducacion();
      setExperiences(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to fetch education'
      );
      console.error('Error fetching education:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchExperiences();
  }, [fetchExperiences]);

  return {
    experiences,
    loading,
    error,
    refetch: fetchExperiences,
  };
};

export const useCertifications = (): UseExperienceReturn => {
  const [experiences, setExperiences] = useState<Experiencia[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchExperiences = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getCertificaciones();
      setExperiences(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to fetch certifications'
      );
      console.error('Error fetching certifications:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchExperiences();
  }, [fetchExperiences]);

  return {
    experiences,
    loading,
    error,
    refetch: fetchExperiences,
  };
};