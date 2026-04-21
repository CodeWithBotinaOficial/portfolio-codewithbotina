import { createClient, type EntriesQueries, type Entry, type EntrySkeletonType } from 'contentful';
import type {
  Proyecto,
  Experiencia,
  Habilidad,
  Skill,
  FilterOptions,
  SortOrder,
  ContentfulAsset,
  BaseContentfulEntity,
} from '../types';
import { sortByFeaturedThenOrder } from '../utils/sortByFeaturedThenOrder';

// ============================================================================
// CLIENT CONFIGURATION
// ============================================================================

// NOTE: We intentionally use `process.env.*` here (instead of `import.meta.env.*`)
// so Jest/ts-jest can compile this module. Vite injects these at build/dev time
// via `define` in vite.config.ts.
const SPACE_ID = process.env.VITE_CONTENTFUL_SPACE_ID;
const ACCESS_TOKEN = process.env.VITE_CONTENTFUL_ACCESS_TOKEN;

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
// I18N CONFIGURATION
// ============================================================================

export const contentfulLocaleMap: Record<string, string> = {
  es: 'es-CO',
  en: 'en-US',
  pt: 'es-CO', // pt-BR not available in Contentful free plan — fallback to Spanish content
};

const getLocaleCode = (locale?: string): string => {
  if (!locale) return contentfulLocaleMap['es'];
  return contentfulLocaleMap[locale] || contentfulLocaleMap['es'];
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Optimize Contentful image URL with query parameters
 */
export const optimizeContentfulImage = (url: string, width: number = 200): string => {
  if (!url) return url;
  const base = url.startsWith('//') ? `https:${url}` : url;
  return `${base}?w=${width}&fm=webp&q=75`;
};

/**
 * Extract image URL from Contentful asset
 */
export const getImageUrl = (asset: ContentfulAsset | undefined, width?: number): string | null => {
  if (!asset?.fields?.file?.url) return null;
  const url = asset.fields.file.url;
  // Ensure HTTPS
  const base = url.startsWith('//') ? `https:${url}` : url;
  return width ? optimizeContentfulImage(base, width) : base;
};

/**
 * Parse Contentful entry to typed object
 */
const parseEntry = <T extends BaseContentfulEntity>(entry: Entry<EntrySkeletonType, undefined, string>): T => {
  return {
    ...(entry.fields as unknown as T),
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
  order: SortOrder = 'asc',
  locale?: string
): Promise<Proyecto[]> => {
  try {
    const query: Record<string, string | number | boolean | string[] | undefined> = {
      content_type: 'proyecto',
      locale: getLocaleCode(locale),
    };

    if (filters?.tecnologia) {
      query['fields.tecnologias[in]'] = filters.tecnologia;
    }

    const response = await client.getEntries(
      query as unknown as EntriesQueries<EntrySkeletonType, undefined>
    );
    const projects = response.items.map((item) => {
      const p = parseEntry<Proyecto>(item);
      
      // Try to get image from 'imagen' or 'imagenPrincipal'
      const imageAsset = p.imagen || p.imagenPrincipal;
      if (imageAsset) {
        // Apply optimization to project images
        const url = getImageUrl(imageAsset, 600);
        if (url) {
          p.imagenUrl = url;
        }
      }
      return p;
    });

    // Client-side sorting as required by the featured-first rule
    let sorted = sortByFeaturedThenOrder(projects, 'destacado');

    // Handle explicit sortBy/order if it's not the default featured-first
    // (Though the requirement says featured-first rule applies to both sections)
    if (sortBy === 'fecha') {
      sorted = sorted.sort((a, b) => {
        const dateA = new Date(a.fecha).getTime();
        const dateB = new Date(b.fecha).getTime();
        return order === 'asc' ? dateA - dateB : dateB - dateA;
      });
    }

    return sorted;
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
};

/**
 * Fetch featured projects only
 */
export const getProyectosDestacados = async (locale?: string): Promise<Proyecto[]> => {
  const allProjects = await getProyectos(undefined, 'orden', 'asc', locale);
  return allProjects.filter(p => p.destacado);
};

// ============================================================================
// EXPERIENCE API
// ============================================================================

/**
 * Fetch all experiences sorted by date
 */
export const getExperiencias = async (
  tipo?: string,
  locale?: string
): Promise<Experiencia[]> => {
  try {
    const query: Record<string, string | number | boolean | string[] | undefined> = {
      content_type: 'experiencia',
      order: '-fields.fechaInicio',
      locale: getLocaleCode(locale),
    };

    if (tipo) {
      query['fields.tipo[in]'] = tipo;
    }

    const response = await client.getEntries(
      query as unknown as EntriesQueries<EntrySkeletonType, undefined>
    );
    return response.items.map((item) => {
      const e = parseEntry<Experiencia>(item);
      if (e.logo) {
         // Apply optimization to experience logos
         const url = getImageUrl(e.logo, 80);
         if (url) {
           e.logoUrl = url;
         }
      }
      return e;
    });
  } catch (error) {
    console.error('Error fetching experiences:', error);
    return [];
  }
};

/**
 * Fetch education experiences only
 */
export const getEducacion = async (locale?: string): Promise<Experiencia[]> => {
  return getExperiencias('Educación', locale);
};

/**
 * Fetch certifications only
 */
export const getCertificaciones = async (locale?: string): Promise<Experiencia[]> => {
  return getExperiencias('Certificación', locale);
};

// ============================================================================
// SKILLS API
// ============================================================================

/**
 * Fetch all skills grouped by category
 */
export const getHabilidades = async (locale?: string): Promise<Record<string, Habilidad[]>> => {
  try {
    const response = await client.getEntries({
      content_type: 'habilidad',
      order: ['-fields.nivel'],
      locale: getLocaleCode(locale),
    });

    const habilidades = response.items.map((item) => {
      const h = parseEntry<Habilidad>(item);
      if (h.imagen) {
        const url = getImageUrl(h.imagen, 80);
        if (url) {
          h.imagenUrl = url;
        }
      }
      return h;
    });

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
  categoria: Habilidad['categoria'],
  locale?: string
): Promise<Habilidad[]> => {
  try {
    const response = await client.getEntries({
      content_type: 'habilidad',
      'fields.categoria': categoria,
      order: ['-fields.nivel'],
      locale: getLocaleCode(locale),
    });

    return response.items.map((item) => {
      const h = parseEntry<Habilidad>(item);
      if (h.imagen) {
        const url = getImageUrl(h.imagen, 80);
        if (url) {
          h.imagenUrl = url;
        }
      }
      return h;
    });
  } catch (error) {
    console.error(`Error fetching skills in category ${categoria}:`, error);
    return [];
  }
};

// ============================================================================
// SKILLS (NEW) API
// ============================================================================

/**
 * Fetch all skills as a flat list (localized), ordered by "orden" ascending.
 */
export const getSkills = async (locale: string): Promise<Skill[]> => {
  try {
    const query = {
      content_type: 'habilidad',
      locale: getLocaleCode(locale),
      include: 1,
    };

    const response = await client.getEntries(query);

    const skills = response.items.map((item: Entry<EntrySkeletonType, undefined, string>) => {
      const fields = item.fields ?? {};
      const categoriaRaw = fields.categoria as unknown;
      const categoria =
        Array.isArray(categoriaRaw) ? (categoriaRaw as string[]) : categoriaRaw ? [String(categoriaRaw)] : [];

      const imagenUrl = getImageUrl(fields.imagen as ContentfulAsset | undefined, 80) || undefined;

      return {
        id: item.sys.id as string,
        nombre: String(fields.nombre ?? ''),
        categoria,
        nivel: typeof fields.nivel === 'number' ? fields.nivel : undefined,
        iconoUrl: typeof fields.iconoUrl === 'string' ? fields.iconoUrl : undefined,
        imagenUrl,
        descripcion: typeof fields.descripcion === 'string' ? fields.descripcion : undefined,
        destacada: typeof fields.destacada === 'boolean' ? fields.destacada : undefined,
        orden: typeof fields.orden === 'number' ? fields.orden : undefined,
      } satisfies Skill;
    });

    return sortByFeaturedThenOrder(skills, 'destacada');
  } catch (error) {
    console.error('Error fetching skills:', error);
    return [];
  }
};
