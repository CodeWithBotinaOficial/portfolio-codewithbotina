import { createClient, type Entry } from 'contentful';
import type {
  Proyecto,
  Experiencia,
  Habilidad,
  FilterOptions,
  SortOrder,
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
  // CORS is handled by Contentful's CDN automatically
  // No additional configuration needed for production
});

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Extract image URL from Contentful asset
 */
export const getImageUrl = (asset: any): string | null => {
  if (!asset?.fields?.file?.url) return null;
  const url = asset.fields.file.url;
  // Ensure HTTPS
  return url.startsWith('//') ? `https:${url}` : url;
};

/**
 * Parse Contentful entry to typed object
 */
const parseEntry = <T>(entry: Entry<any>): T => {
  return {
    ...entry.fields,
    id: entry.sys.id,
    createdAt: entry.sys.createdAt,
    updatedAt: entry.sys.updatedAt,
  } as T;
};

/**
 * Handle API errors gracefully
 */
const handleError = (error: any, context: string) => {
  console.error(`[Contentful Error - ${context}]:`, error);
  
  if (error.sys?.id === 'NotFound') {
    throw new Error(`Content not found: ${context}`);
  }
  
  if (error.sys?.id === 'RateLimitExceeded') {
    throw new Error('Rate limit exceeded. Please try again later.');
  }
  
  if (error.message?.includes('Network')) {
    throw new Error('Network error. Please check your connection.');
  }
  
  throw new Error(`Failed to fetch ${context}: ${error.message}`);
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
    handleError(error, 'projects');
    return [];
  }
};

/**
 * Fetch featured projects only
 */
export const getProyectosDestacados = async (): Promise<Proyecto[]> => {
  return getProyectos({ destacado: true }, 'orden', 'asc');
};

/**
 * Fetch single project by ID
 */
export const getProyectoById = async (id: string): Promise<Proyecto | null> => {
  try {
    const entry = await client.getEntry(id);
    return parseEntry<Proyecto>(entry);
  } catch (error) {
    handleError(error, `project with ID ${id}`);
    return null;
  }
};

// ============================================================================
// EXPERIENCE API
// ============================================================================

/**
 * Fetch all experiences sorted by date
 */
export const getExperiencias = async (
  tipo?: Experiencia['tipo']
): Promise<Experiencia[]> => {
  try {
    const query: any = {
      content_type: 'experiencia',
      order: '-fields.fechaInicio',
    };

    if (tipo) {
      query['fields.tipo'] = tipo;
    }

    const response = await client.getEntries(query);
    return response.items.map((item) => parseEntry<Experiencia>(item));
  } catch (error) {
    handleError(error, 'experiences');
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
    return habilidades.reduce((acc, skill) => {
      const category = skill.categoria || 'Otros';
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(skill);
      return acc;
    }, {} as Record<string, Habilidad[]>);
  } catch (error) {
    handleError(error, 'skills');
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
    handleError(error, `skills in category ${categoria}`);
    return [];
  }
};

// ============================================================================
// ANALYTICS & UTILITIES
// ============================================================================

/**
 * Get all unique technologies used across projects
 */
export const getTecnologiasUnicas = async (): Promise<string[]> => {
  try {
    const proyectos = await getProyectos();
    const tecnologias = new Set<string>();
    
    proyectos.forEach((proyecto) => {
      proyecto.tecnologias?.forEach((tech) => tecnologias.add(tech));
    });
    
    return Array.from(tecnologias).sort();
  } catch (error) {
    console.error('Error fetching unique technologies:', error);
    return [];
  }
};

/**
 * Check if Contentful service is available
 */
export const checkContentfulHealth = async (): Promise<boolean> => {
  try {
    await client.getSpace();
    return true;
  } catch (error) {
    console.error('Contentful health check failed:', error);
    return false;
  }
};

// ============================================================================
// EXPORT CLIENT FOR ADVANCED USAGE
// ============================================================================

export { client };