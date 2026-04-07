import { createClient } from 'contentful';
import type {
  Proyecto,
  Experiencia,
  Habilidad,
  Skill,
  FilterOptions,
  SortOrder,
  ContentfulAsset,
} from '../types';

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
};

const getLocaleCode = (locale?: string): string => {
  if (!locale) return contentfulLocaleMap['es'];
  return contentfulLocaleMap[locale] || contentfulLocaleMap['es'];
};

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
  order: SortOrder = 'asc',
  locale?: string
): Promise<Proyecto[]> => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query: any = {
      content_type: 'proyecto',
      order: `${order === 'asc' ? '' : '-'}fields.${sortBy}`,
      locale: getLocaleCode(locale),
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
export const getProyectosDestacados = async (locale?: string): Promise<Proyecto[]> => {
  return getProyectos({ destacado: true }, 'orden', 'asc', locale);
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query: any = {
      content_type: 'experiencia',
      order: '-fields.fechaInicio',
      locale: getLocaleCode(locale),
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

    return response.items.map((item) => parseEntry<Habilidad>(item));
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query: any = {
      content_type: 'habilidad',
      order: 'fields.orden',
      locale: getLocaleCode(locale),
      include: 1,
    };

    const response = await client.getEntries(query);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return response.items.map((item: any) => {
      const fields = item.fields ?? {};
      const categoriaRaw = fields.categoria as unknown;
      const categoria =
        Array.isArray(categoriaRaw) ? (categoriaRaw as string[]) : categoriaRaw ? [String(categoriaRaw)] : [];

      const imagenUrl = getImageUrl(fields.imagen as ContentfulAsset | undefined) || undefined;

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
  } catch (error) {
    console.error('Error fetching skills:', error);
    return [];
  }
};
