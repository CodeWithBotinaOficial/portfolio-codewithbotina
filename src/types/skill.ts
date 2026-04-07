export interface Skill {
  id: string;
  nombre: string;
  categoria: string[];
  nivel?: number;
  iconoUrl?: string;
  imagenUrl?: string;
  descripcion?: string;
  destacada?: boolean;
  orden?: number;
}

