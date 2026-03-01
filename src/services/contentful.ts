import { createClient } from 'contentful';
import type {
  Proyecto,
  Experiencia,
  Habilidad,
  FilterOptions,
  SortOrder,
  ContentfulAsset,
} from '../types';

// ============================================================================
// CLIENT CONFIGURATION
// ============================================================================

const SPACE_ID = import.meta.env.VITE_CONTENTFUL_SPACE_ID;
const ACCESS_TOKEN = import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN;

if (!SPACE_ID || !ACCESS_TOKEN) {
  throw new Error(
    'Contentful credentials are missing. Please check your .env.local file.'
  );
}

// Create Contentful client
const client = createClient({
  space: SPACE_ID,
  accessToken: ACCESS_TOKEN,
});

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Extract image URL from Contentful asset
 */
export const getImageUrl = (asset: ContentfulAsset | undefined): string | null => {
  if (!asset?.fields?.file?.url) return null;
  const url = asset.fields.file.url;
  // Ensure HTTPS
  return url.startsWith('//') ? `https:${url}` : url;
};

/**
 * Parse Contentful entry to typed object
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseEntry = <T>(entry: any): T => {
  return {
    ...entry.fields,
    id: entry.sys.id,
    createdAt: entry.sys.createdAt,
    updatedAt: entry.sys.updatedAt,
  } as T;
};

// ============================================================================
// PROJECTS API
// ============================================================================

/**
 * Fetch all projects with optional filtering and sorting
 */
export const getProyectos = async (
  filters?: FilterOptions,
  sortBy: 'fecha' | 'orden' = 'orden',
  order: SortOrder = 'asc'
): Promise<Proyecto[]> => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query: any = {
      content_type: 'proyecto',
      order: `${order === 'asc' ? '' : '-'}fields.${sortBy}`,
    };

    if (filters?.destacado !== undefined) {
      query['fields.destacado'] = filters.destacado;
    }

    if (filters?.tecnologia) {
      query['fields.tecnologias[in]'] = filters.tecnologia;
    }

    const response = await client.getEntries(query);
    return response.items.map((item) => parseEntry<Proyecto>(item));
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
};

/**
 * Fetch featured projects only
 */
export const getProyectosDestacados = async (): Promise<Proyecto[]> => {
  return getProyectos({ destacado: true }, 'orden', 'asc');
};

// ============================================================================
// EXPERIENCE API
// ============================================================================

/**
 * Fetch all experiences sorted by date
 */
export const getExperiencias = async (
  tipo?: string
): Promise<Experiencia[]> => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query: any = {
      content_type: 'experiencia',
      order: '-fields.fechaInicio',
    };

    if (tipo) {
      query['fields.tipo[in]'] = tipo;
    }

    const response = await client.getEntries(query);
    return response.items.map((item) => parseEntry<Experiencia>(item));
  } catch (error) {
    console.error('Error fetching experiences:', error);
    return [];
  }
};

/**
 * Fetch education experiences only
 */
export const getEducacion = async (): Promise<Experiencia[]> => {
  return getExperiencias('Educación');
};

/**
 * Fetch certifications only
 */
export const getCertificaciones = async (): Promise<Experiencia[]> => {
  return getExperiencias('Certificación');
};

// ============================================================================
// SKILLS API
// ============================================================================

/**
 * Fetch all skills grouped by category
 */
export const getHabilidades = async (): Promise<Record<string, Habilidad[]>> => {
  try {
    const response = await client.getEntries({
      content_type: 'habilidad',
      order: ['-fields.nivel'],
    });

    const habilidades = response.items.map((item) => parseEntry<Habilidad>(item));

    // Group by category
    return habilidades.reduce(
      (acc, skill) => {
        const category = skill.categoria || 'Otros';
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(skill);
        return acc;
      },
      {} as Record<string, Habilidad[]>
    );
  } catch (error) {
    console.error('Error fetching skills:', error);
    return {};
  }
};

/**
 * Fetch skills by category
 */
export const getHabilidadesPorCategoria = async (
  categoria: Habilidad['categoria']
): Promise<Habilidad[]> => {
  try {
    const response = await client.getEntries({
      content_type: 'habilidad',
      'fields.categoria': categoria,
      order: ['-fields.nivel'],
    });

    return response.items.map((item) => parseEntry<Habilidad>(item));
  } catch (error) {
    console.error(`Error fetching skills in category ${categoria}:`, error);
    return [];
  }
};
