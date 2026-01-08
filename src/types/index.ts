// ============================================================================
// CONTENTFUL TYPES
// ============================================================================

export interface ContentfulAsset {
  sys: {
    id: string;
  };
  metadata: Record<string, unknown>;
  fields: {
    title: string;
    description?: string;
    file: {
      url: string;
      details: {
        size: number;
        image?: {
          width: number;
          height: number;
        };
      };
      fileName: string;
      contentType: string;
    };
  };
}

// ============================================================================
// PROJECT TYPES
// ============================================================================

export interface Proyecto {
  id?: string;
  titulo: string;
  descripcionCorta: string;
  descripcionCompleta: string;
  tecnologias: string[];
  imagenPrincipal?: ContentfulAsset;
  urlGithub?: string;
  urlDemo?: string;
  destacado: boolean;
  fecha: string;
  orden: number;
}

export interface ProyectoEntry {
  sys: {
    id: string;
    createdAt: string;
    updatedAt: string;
  };
  fields: Proyecto;
}

// ============================================================================
// EXPERIENCE TYPES
// ============================================================================

export interface Experiencia {
  id?: string;
  institucion: string;
  cargoTitulo: string;
  descripcion?: string;
  fechaInicio: string;
  fechaFin?: string;
  logo?: ContentfulAsset;
  tipo: string[];
  ubicacion?: string;
}

export interface ExperienciaEntry {
  sys: {
    id: string;
    createdAt: string;
    updatedAt: string;
  };
  fields: Experiencia;
}

// ============================================================================
// SKILL TYPES
// ============================================================================

export interface Habilidad {
  id?: string;
  nombre: string;
  categoria: 'Frontend' | 'Backend' | 'Herramientas' | 'Lenguajes' | 'Otros';
  nivel: number;
  iconoUrl?: string;
}

export interface HabilidadEntry {
  sys: {
    id: string;
  };
  fields: Habilidad;
}

// ============================================================================
// UI COMPONENT TYPES
// ============================================================================

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  icon?: React.ReactNode;
}

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  title?: string;
  subtitle?: string;
}

// ============================================================================
// NAVIGATION TYPES
// ============================================================================

export interface NavItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
}

// ============================================================================
// API RESPONSE TYPES
// ============================================================================

export interface ContentfulResponse<T> {
  sys: { type: 'Array' };
  total: number;
  skip: number;
  limit: number;
  items: T[];
}

// ============================================================================
// UTILITY TYPES
// ============================================================================

export type SortOrder = 'asc' | 'desc';

export interface FilterOptions {
  destacado?: boolean;
  tecnologia?: string;
  categoria?: string;
}