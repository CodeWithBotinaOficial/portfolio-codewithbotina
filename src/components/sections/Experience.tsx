import { motion } from 'framer-motion';
import { Section } from '../ui';
import { useExperience } from '../../hooks';
import { Calendar, MapPin, Award } from 'lucide-react';
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
        className="bg-white"
      >
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-600"></div>
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

  // Group experiences by type
  const educacion = experiences.filter((exp) => exp.tipo === 'Educación');
  const certificaciones = experiences.filter(
    (exp) => exp.tipo === 'Certificación'
  );
  const experienciaLaboral = experiences.filter(
    (exp) => exp.tipo === 'Experiencia'
  );

  const formatDate = (date: string) => {
    return format(new Date(date), 'MMMM yyyy', { locale: es });
  };

  const getTypeColor = (tipo: string) => {
    switch (tipo) {
      case 'Educación':
        return 'bg-blue-100 text-blue-700';
      case 'Certificación':
        return 'bg-green-100 text-green-700';
      case 'Experiencia':
        return 'bg-purple-100 text-purple-700';
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

  const ExperienceCard = ({ exp, index }: { exp: any; index: number }) => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative pl-8 pb-12 border-l-2 border-primary-300 last:pb-0"
    >
      <div className="absolute left-0 top-0 w-4 h-4 bg-primary-600 rounded-full transform -translate-x-[9px]" />
      
      <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-grow">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">{getTypeIcon(exp.tipo)}</span>
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold ${getTypeColor(
                  exp.tipo
                )}`}
              >
                {exp.tipo}
              </span>
            </div>
            <h3 className="text-xl font-bold mb-1">{exp.cargoTitulo}</h3>
            <p className="text-primary-600 font-semibold">{exp.institucion}</p>
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
        {/* Education Section */}
        {educacion.length > 0 && (
          <div className="mb-16">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl font-bold mb-8 flex items-center gap-3"
            >
              <span className="text-3xl">🎓</span>
              Educación
            </motion.h3>
            {educacion.map((exp, index) => (
              <ExperienceCard key={exp.institucion} exp={exp} index={index} />
            ))}
          </div>
        )}

        {/* Certifications Section */}
        {certificaciones.length > 0 && (
          <div className="mb-16">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl font-bold mb-8 flex items-center gap-3"
            >
              <Award className="w-8 h-8 text-primary-600" />
              Certificaciones
            </motion.h3>
            {certificaciones.map((exp, index) => (
              <ExperienceCard key={exp.institucion} exp={exp} index={index} />
            ))}
          </div>
        )}

        {/* Work Experience Section */}
        {experienciaLaboral.length > 0 && (
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl font-bold mb-8 flex items-center gap-3"
            >
              <span className="text-3xl">💼</span>
              Experiencia Laboral
            </motion.h3>
            {experienciaLaboral.map((exp, index) => (
              <ExperienceCard key={exp.institucion} exp={exp} index={index} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {experiences.length === 0 && (
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