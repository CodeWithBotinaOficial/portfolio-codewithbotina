import { motion } from 'framer-motion';
import { Section } from '../ui';
import { useExperience } from '../../hooks';
import { Calendar, MapPin } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { getImageUrl } from '../../services/contentful';
import type { Experiencia } from '../../types';

const Experience = () => {
  const { experiences, loading, error } = useExperience();

  if (loading) {
    return (
      <Section
        id="experience"
        title="Experiencia & Educación"
        subtitle="Mi trayectoria académica y profesional"
        centered
        className="bg-white"
      >
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-valentine-crimson"></div>
        </div>
      </Section>
    );
  }

  if (error) {
    return (
      <Section
        id="experience"
        title="Experiencia & Educación"
        centered
        className="bg-white"
      >
        <div className="text-center py-20">
          <p className="text-red-600 mb-4">{error}</p>
          <p className="text-gray-600">
            Por favor, verifica tu conexión a Contentful.
          </p>
        </div>
      </Section>
    );
  }



  const formatDate = (date: string) => {
    return format(new Date(date), 'MMMM yyyy', { locale: es });
  };

  const getTypeColor = (tipo: string) => {
    switch (tipo) {
      case 'Educación':
        return 'bg-valentine-rose/20 text-valentine-crimson';
      case 'Certificación':
        return 'bg-valentine-rose/10 text-valentine-burgundy';
      case 'Experiencia':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getTypeIcon = (tipo: string) => {
    switch (tipo) {
      case 'Educación':
        return '🎓';
      case 'Certificación':
        return '📜';
      case 'Experiencia':
        return '💼';
      default:
        return '📌';
    }
  };

  const ExperienceCard = ({ exp, index }: { exp: Experiencia; index: number }) => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative pl-8 pb-12 border-l-2 border-valentine-rose last:pb-0"
    >
      <div className="absolute left-0 top-0 w-4 h-4 bg-valentine-crimson rounded-full transform -translate-x-[9px]" />
      
      <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-grow">
            <div className="flex items-center gap-2 mb-2">
              {exp.tipo?.length > 0 && (
                <>
                  <span className="text-2xl">{getTypeIcon(exp.tipo[0])}</span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${getTypeColor(
                      exp.tipo[0]
                    )}`}
                  >
                    {exp.tipo[0]}
                  </span>
                </>
              )}
            </div>
            <h3 className="text-xl font-bold mb-1">{exp.cargoTitulo}</h3>
            <p className="text-valentine-crimson font-semibold">{exp.institucion}</p>
          </div>
          {exp.logo && (
            <img
              src={getImageUrl(exp.logo) || ''}
              alt={exp.institucion}
              className="w-16 h-16 object-contain rounded-lg"
            />
          )}
        </div>

        {/* Date and Location */}
        <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>
              {formatDate(exp.fechaInicio)}
              {exp.fechaFin ? ` - ${formatDate(exp.fechaFin)}` : ' - Actual'}
            </span>
          </div>
          {exp.ubicacion && (
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>{exp.ubicacion}</span>
            </div>
          )}
        </div>

        {/* Description */}
        {exp.descripcion && (
          <p className="text-gray-600 leading-relaxed">{exp.descripcion}</p>
        )}
      </div>
    </motion.div>
  );

  return (
    <Section
      id="experience"
      title="Experiencia & Educación"
      subtitle="Mi trayectoria académica y profesional"
      centered
      className="bg-white"
    >
      <div className="max-w-4xl mx-auto">
        {experiences.length > 0 ? (
          experiences.map((exp, index) => (
            <ExperienceCard key={exp.id || index} exp={exp} index={index} />
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              No hay experiencias registradas aún.
            </p>
          </div>
        )}
      </div>
    </Section>
  );
};

export default Experience;
