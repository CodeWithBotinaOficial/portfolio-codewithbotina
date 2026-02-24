import { motion } from 'framer-motion';
import { Section } from '../ui';
import { useExperience } from '../../hooks';
import { Calendar, MapPin, Briefcase, GraduationCap, Award } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { getImageUrl } from '../../services/contentful';

const Experience = () => {
  const { experiences, loading, error } = useExperience();

  if (loading) {
    return (
      <Section
        id="experience"
        title="Experiencia & Educación"
        subtitle="Mi trayectoria académica y profesional"
        centered
        className="bg-surface"
      >
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-charcoal"></div>
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
        className="bg-surface"
      >
        <div className="text-center py-20">
          <p className="text-red-600 mb-4">{error}</p>
          <p className="text-text-muted">
            Por favor, verifica tu conexión a Contentful.
          </p>
        </div>
      </Section>
    );
  }

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMM yyyy', { locale: es });
    } catch {
      return dateString;
    }
  };

  const getTypeIcon = (type: string | string[]) => {
    // Handle both string and array of strings (Contentful can return arrays for multi-select)
    const typeStr = Array.isArray(type) ? type[0] : type;
    const lowerType = typeStr?.toLowerCase() || '';
    
    if (lowerType.includes('educación') || lowerType.includes('education')) return <GraduationCap className="w-5 h-5" />;
    if (lowerType.includes('certificación') || lowerType.includes('certification')) return <Award className="w-5 h-5" />;
    return <Briefcase className="w-5 h-5" />;
  };

  const getDisplayType = (type: string | string[]) => {
    return Array.isArray(type) ? type[0] : type;
  };

  return (
    <Section
      id="experience"
      title="Experiencia & Educación"
      subtitle="Mi trayectoria académica y profesional"
      centered
      className="bg-surface"
    >
      <div className="max-w-4xl mx-auto relative">
        {/* Vertical Line */}
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-beige-300 transform md:-translate-x-1/2"></div>

        {experiences.map((exp, index) => (
          <motion.div
            key={exp.id || index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`relative flex flex-col md:flex-row gap-8 mb-12 last:mb-0 ${
              index % 2 === 0 ? 'md:flex-row-reverse' : ''
            }`}
          >
            {/* Timeline Dot */}
            <div className="absolute left-8 md:left-1/2 top-0 w-4 h-4 bg-charcoal rounded-full border-4 border-white shadow-sm transform -translate-x-1/2 z-10 mt-6"></div>

            {/* Content Card */}
            <div className="md:w-1/2 pl-20 md:pl-0 md:px-12">
              <div className={`bg-white p-6 rounded-2xl border border-beige-200 shadow-soft hover:shadow-medium transition-all duration-300 relative group ${
                index % 2 === 0 ? 'md:text-left' : 'md:text-right'
              }`}>
                {/* Arrow for desktop */}
                <div className={`hidden md:block absolute top-8 w-4 h-4 bg-white border-t border-l border-beige-200 transform rotate-45 ${
                  index % 2 === 0 ? '-left-2.5 border-r-0 border-b-0' : '-right-2.5 border-l-0 border-t-0 border-r border-b rotate-[-135deg]'
                }`}></div>

                <div className={`flex items-center gap-3 mb-4 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  {exp.logo && (
                    <img
                      src={getImageUrl(exp.logo) || ''}
                      alt={exp.institucion}
                      className="w-12 h-12 object-contain rounded-lg bg-white p-1 border border-beige-100"
                    />
                  )}
                  <div className={`flex-grow ${index % 2 !== 0 ? 'md:text-right' : ''}`}>
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-beige-100 text-charcoal mb-1 ${
                      index % 2 !== 0 ? 'md:flex-row-reverse' : ''
                    }`}>
                      {getTypeIcon(exp.tipo)}
                      {getDisplayType(exp.tipo)}
                    </span>
                    <h3 className="text-lg font-bold text-charcoal leading-tight">{exp.cargoTitulo}</h3>
                    <p className="text-charcoal-light font-medium text-sm">{exp.institucion}</p>
                  </div>
                </div>

                <div className={`flex flex-wrap gap-x-4 gap-y-2 text-xs text-text-light mb-4 ${
                  index % 2 === 0 ? 'md:justify-start' : 'md:justify-end'
                }`}>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>
                      {formatDate(exp.fechaInicio)} - {exp.fechaFin ? formatDate(exp.fechaFin) : 'Presente'}
                    </span>
                  </div>
                  {exp.ubicacion && (
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span>{exp.ubicacion}</span>
                    </div>
                  )}
                </div>

                {exp.descripcion && (
                  <p className="text-text-muted text-sm leading-relaxed">
                    {exp.descripcion}
                  </p>
                )}
              </div>
            </div>
            
            {/* Empty space for the other side */}
            <div className="hidden md:block md:w-1/2"></div>
          </motion.div>
        ))}

        {experiences.length === 0 && (
          <div className="text-center py-12">
            <p className="text-text-muted text-lg">
              No hay experiencias registradas aún.
            </p>
          </div>
        )}
      </div>
    </Section>
  );
};

export default Experience;
