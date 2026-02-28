import { LazyMotion, domAnimation, m } from 'framer-motion';
import { Section } from '../ui';
import { Award, Heart, Target, Zap } from 'lucide-react';

/**
 * Interface for a core value item.
 */
interface ValueItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

/**
 * Interface for a timeline milestone item.
 */
interface MilestoneItem {
  year: string;
  title: string;
  description: string;
}

const values: ValueItem[] = [
  {
    icon: <Target className="w-6 h-6" />,
    title: 'Visión',
    description:
      'Crear tecnología que inspire y transforme. Mis sueños incluyen desarrollar un sistema operativo universal y un lenguaje de programación revolucionario.',
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: 'Lealtad',
    description:
      'Valoro por encima de todo la lealtad, el respeto y el compromiso. Creo en construir relaciones duraderas basadas en la confianza mutua.',
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: 'Determinación',
    description:
      'Con un hambre insaciable por el conocimiento, estoy dispuesto a sacrificar y trabajar duro para alcanzar mis objetivos y no desperdiciar mi talento.',
  },
  {
    icon: <Award className="w-6 h-6" />,
    title: 'Excelencia',
    description:
      'Graduado con honores en cada etapa educativa, busco siempre la excelencia en todo lo que hago, desde el código hasta las relaciones humanas.',
  },
];

const milestones: MilestoneItem[] = [
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

/**
 * About section component.
 * Displays personal history, core values, and a timeline of achievements.
 */
const About = () => {
  return (
    <LazyMotion features={domAnimation}>
      <Section
        id="about"
        title="Mi Historia"
        subtitle="Un viaje desde los campos de Buga hasta la vanguardia tecnológica"
        centered
        className="bg-surface"
      >
        {/* Story */}
        <div className="max-w-4xl mx-auto mb-20">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="prose prose-lg mx-auto text-text-muted"
          >
          <p className="text-lg md:text-xl leading-relaxed font-light">
            Soy <strong className="text-charcoal font-semibold">Diego Alejandro Botina Herrera</strong>, conocido como
            Alejandro o simplemente Botina. Nací el 1 de febrero de 2007 en
            Guadalajara de Buga, Valle del Cauca, Colombia. Mis raíces son
            campesinas — tanto mamá como papá crecieron en el campo, y yo tuve
            la fortuna de vivir en ese entorno antes de mudarme a un lugar más
            urbano donde descubrí mi pasión por la tecnología.
          </p>
          <p className="text-lg md:text-xl leading-relaxed mt-6 font-light">
            Estudié en la Institución Educativa Nuestra Señora de Fátima, donde
            me gradué con honores como el estudiante con el{' '}
            <strong className="text-charcoal font-semibold">mayor puntaje ICFES</strong> de mi generación, reconocido
            por mi compromiso académico y mis aportaciones a la institución.
            Obtuve títulos técnicos en Agropecuaria y Operación Turística Local,
            además de mi técnico en Sistemas Informáticos.
          </p>
          <blockquote className="mt-8 pl-6 border-l-4 border-beige-300 italic text-charcoal-light text-xl">
            "Lo más triste de la vida es el talento desperdiciado, y las
            decisiones que tomes moldearán tu vida para siempre."
            <footer className="text-sm mt-2 not-italic text-text-light">— Una historia del Bronx (1993)</footer>
          </blockquote>
          <p className="text-lg md:text-xl leading-relaxed mt-6 font-light">
            Esta cita resume mi filosofía: no desperdiciaré mi talento. Mis padres me brindaron su apoyo
            emocional y económico, y he llegado con la frente en alto hasta hoy,
            orgulloso de quien soy y con un futuro que no pienso desperdiciar.
          </p>
          </m.div>
        </div>

        {/* Values */}
        <div className="mb-24">
          <m.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-bold text-center mb-16 text-charcoal font-heading"
          >
            Mis Valores
          </m.h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <m.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group p-8 rounded-xl bg-background border border-beige-200 hover:border-beige-300 hover:shadow-soft transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-beige-200 text-charcoal rounded-lg mb-6 group-hover:scale-110 transition-transform duration-300">
                  {value.icon}
                </div>
                <h4 className="text-xl font-bold mb-3 text-charcoal font-heading">{value.title}</h4>
                <p className="text-text-muted text-sm leading-relaxed">{value.description}</p>
              </m.div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div>
          <m.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-bold text-center mb-16 text-charcoal font-heading"
          >
            Mi Trayectoria
          </m.h3>
          <div className="max-w-3xl mx-auto relative">
            {/* Vertical Line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-beige-300 transform md:-translate-x-1/2"></div>
            
            {milestones.map((milestone, index) => (
              <m.div
                key={milestone.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex flex-col md:flex-row gap-8 mb-12 last:mb-0 ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Dot */}
                <div className="absolute left-[-5px] md:left-1/2 top-0 w-3 h-3 bg-charcoal rounded-full border-2 border-white transform md:-translate-x-1/2 z-10"></div>
                
                {/* Content */}
                <div className="md:w-1/2 pl-8 md:pl-0 md:px-8">
                  <div className={`flex flex-col ${index % 2 === 0 ? 'md:items-start' : 'md:items-end'}`}>
                    <span className="text-charcoal-light font-bold text-sm mb-2 tracking-wider">{milestone.year}</span>
                    <h4 className={`text-xl font-bold mb-2 text-charcoal font-heading ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                      {milestone.title}
                    </h4>
                    <p className={`text-text-muted text-sm leading-relaxed ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                      {milestone.description}
                    </p>
                  </div>
                </div>
                
                {/* Empty space for the other side */}
                <div className="hidden md:block md:w-1/2"></div>
              </m.div>
            ))}
          </div>
        </div>
      </Section>
    </LazyMotion>
  );
};

export default About;
