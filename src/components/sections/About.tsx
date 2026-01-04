import { motion } from 'framer-motion';
import { Section } from '../ui';
import { Award, Heart, Target, Zap } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Visión',
      description:
        'Crear tecnología que inspire y transforme. Mis sueños incluyen desarrollar un sistema operativo universal y un lenguaje de programación revolucionario.',
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Lealtad',
      description:
        'Valoro por encima de todo la lealtad, el respeto y el compromiso. Creo en construir relaciones duraderas basadas en la confianza mutua.',
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Determinación',
      description:
        'Con un hambre insaciable por el conocimiento, estoy dispuesto a sacrificar y trabajar duro para alcanzar mis objetivos y no desperdiciar mi talento.',
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Excelencia',
      description:
        'Graduado con honores en cada etapa educativa, busco siempre la excelencia en todo lo que hago, desde el código hasta las relaciones humanas.',
    },
  ];

  const milestones = [
    {
      year: '2007',
      title: 'Nací en Buga, Valle del Cauca',
      description: 'Crecí en el campo, conectado con mis raíces campesinas.',
    },
    {
      year: '2024',
      title: 'Graduado Bachiller con Honores',
      description:
        'Mayor puntaje ICFES de mi colegio. Técnico Agropecuario y Técnico en Operación Turística Local (SENA).',
    },
    {
      year: '2024',
      title: 'Técnico en Sistemas Informáticos',
      description: "Graduado con honores de Discenter's Buga.",
    },
    {
      year: '2025',
      title: 'Jala University',
      description:
        'Inicié mi carrera en Commercial Software Engineering with a concentration in Design and Architecture.',
    },
  ];

  return (
    <Section
      id="about"
      title="Mi Historia"
      subtitle="Un viaje desde los campos de Buga hasta la vanguardia tecnológica"
      centered
      className="bg-white"
    >
      {/* Story */}
      <div className="max-w-4xl mx-auto mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="prose prose-lg mx-auto text-gray-600"
        >
          <p className="text-xl leading-relaxed">
            Soy <strong>Diego Alejandro Botina Herrera</strong>, conocido como
            Alejandro o simplemente Botina. Nací el 1 de febrero de 2007 en
            Guadalajara de Buga, Valle del Cauca, Colombia. Mis raíces son
            campesinas — tanto mamá como papá crecieron en el campo, y yo tuve
            la fortuna de vivir en ese entorno antes de mudarme a un lugar más
            urbano donde descubrí mi pasión por la tecnología.
          </p>
          <p className="text-xl leading-relaxed mt-6">
            Estudié en la Institución Educativa Nuestra Señora de Fátima, donde
            me gradué con honores como el estudiante con el{' '}
            <strong>mayor puntaje ICFES</strong> de mi generación, reconocido
            por mi compromiso académico y mis aportaciones a la institución.
            Obtuve títulos técnicos en Agropecuaria y Operación Turística Local,
            además de mi técnico en Sistemas Informáticos.
          </p>
          <p className="text-xl leading-relaxed mt-6">
            <em>
              "Lo más triste de la vida es el talento desperdiciado, y las
              decisiones que tomes moldearán tu vida para siempre."
            </em>{' '}
            — Una historia del Bronx (1993). Esta cita resume mi filosofía: no
            desperdiciaré mi talento. Mis padres me brindaron su apoyo
            emocional y económico, y he llegado con la frente en alto hasta hoy,
            orgulloso de quien soy y con un futuro que no pienso desperdiciar.
          </p>
        </motion.div>
      </div>

      {/* Values */}
      <div className="mb-20">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl md:text-3xl font-bold text-center mb-12"
        >
          Mis Valores
        </motion.h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center p-6 rounded-xl bg-gray-50 hover:bg-primary-50 transition-colors"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-full mb-4">
                {value.icon}
              </div>
              <h4 className="text-xl font-bold mb-3">{value.title}</h4>
              <p className="text-gray-600">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div>
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl md:text-3xl font-bold text-center mb-12"
        >
          Mi Trayectoria
        </motion.h3>
        <div className="max-w-3xl mx-auto">
          {milestones.map((milestone, index) => (
            <motion.div
              key={milestone.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative pl-8 pb-12 border-l-2 border-primary-300 last:pb-0"
            >
              <div className="absolute left-0 top-0 w-4 h-4 bg-primary-600 rounded-full transform -translate-x-[9px]" />
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="text-primary-600 font-bold text-sm mb-2">
                  {milestone.year}
                </div>
                <h4 className="text-xl font-bold mb-2">{milestone.title}</h4>
                <p className="text-gray-600">{milestone.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default About;