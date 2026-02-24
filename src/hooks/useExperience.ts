import { useState, useEffect, useCallback } from 'react';
import {
  getExperiencias,
  getEducacion,
  getCertificaciones,
} from '../services/contentful';
import type { Experiencia } from '../types';

/**
 * Interface defining the return shape of the useExperience hook.
 */
interface UseExperienceReturn {
  /** Array of fetched experience entries */
  experiences: Experiencia[];
  /** Loading state indicator */
  loading: boolean;
  /** Error message if fetch fails, null otherwise */
  error: string | null;
  /** Function to manually trigger a data refresh */
  refetch: () => Promise<void>;
}

/**
 * Custom hook to fetch and manage professional experience data from Contentful.
 * 
 * @param tipo - Optional filter for the type of experience (e.g., 'Experiencia', 'Educación')
 * @returns Object containing experience data, loading state, error state, and refetch function
 */
export const useExperience = (
  tipo?: string
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
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch experiences';
      setError(errorMessage);
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

/**
 * Custom hook specifically for fetching education history.
 * 
 * @returns Object containing education data, loading state, error state, and refetch function
 */
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
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch education';
      setError(errorMessage);
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

/**
 * Custom hook specifically for fetching certifications.
 * 
 * @returns Object containing certification data, loading state, error state, and refetch function
 */
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
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch certifications';
      setError(errorMessage);
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
