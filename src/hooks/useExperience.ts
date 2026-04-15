import { useTranslation } from 'react-i18next';
import useSWR from 'swr';
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
  const { i18n } = useTranslation();

  const { data, error, isLoading, mutate } = useSWR<Experiencia[]>(
    ['experiences', tipo, i18n.language],
    ([, t, l]) => getExperiencias(t as string, l as string),
    { revalidateOnFocus: false, dedupingInterval: 300000 }
  );

  return {
    experiences: data ?? [],
    loading: isLoading,
    error: error ? (error instanceof Error ? error.message : 'Failed to fetch experiences') : null,
    refetch: async () => { await mutate(); },
  };
};

/**
 * Custom hook specifically for fetching education history.
 * 
 * @returns Object containing education data, loading state, error state, and refetch function
 */
export const useEducation = (): UseExperienceReturn => {
  const { i18n } = useTranslation();

  const { data, error, isLoading, mutate } = useSWR<Experiencia[]>(
    ['education', i18n.language],
    ([, l]) => getEducacion(l as string),
    { revalidateOnFocus: false, dedupingInterval: 300000 }
  );

  return {
    experiences: data ?? [],
    loading: isLoading,
    error: error ? (error instanceof Error ? error.message : 'Failed to fetch education') : null,
    refetch: async () => { await mutate(); },
  };
};

/**
 * Custom hook specifically for fetching certifications.
 * 
 * @returns Object containing certification data, loading state, error state, and refetch function
 */
export const useCertifications = (): UseExperienceReturn => {
  const { i18n } = useTranslation();

  const { data, error, isLoading, mutate } = useSWR<Experiencia[]>(
    ['certifications', i18n.language],
    ([, l]) => getCertificaciones(l as string),
    { revalidateOnFocus: false, dedupingInterval: 300000 }
  );

  return {
    experiences: data ?? [],
    loading: isLoading,
    error: error ? (error instanceof Error ? error.message : 'Failed to fetch certifications') : null,
    refetch: async () => { await mutate(); },
  };
};
