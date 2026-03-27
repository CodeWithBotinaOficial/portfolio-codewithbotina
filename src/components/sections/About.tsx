import { LazyMotion, domAnimation, m } from 'framer-motion';
import { Section } from '../ui';
import { Award, Heart, Target, Zap } from 'lucide-react';
import { useTranslation } from 'react-i18next';

/**
 * About section component.
 * Displays personal history, core values, and a timeline of achievements.
 */
const About = () => {
  const { t } = useTranslation();

  const values = [
    {
      icon: <Target className="w-6 h-6" />,
      title: t('about.values.vision.title'),
      description: t('about.values.vision.description'),
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: t('about.values.loyalty.title'),
      description: t('about.values.loyalty.description'),
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: t('about.values.determination.title'),
      description: t('about.values.determination.description'),
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: t('about.values.excellence.title'),
      description: t('about.values.excellence.description'),
    },
  ];

  const milestones = [
    {
      year: t('about.milestones.m1.year'),
      title: t('about.milestones.m1.title'),
      description: t('about.milestones.m1.description'),
    },
    {
      year: t('about.milestones.m2.year'),
      title: t('about.milestones.m2.title'),
      description: t('about.milestones.m2.description'),
    },
    {
      year: t('about.milestones.m3.year'),
      title: t('about.milestones.m3.title'),
      description: t('about.milestones.m3.description'),
    },
    {
      year: t('about.milestones.m4.year'),
      title: t('about.milestones.m4.title'),
      description: t('about.milestones.m4.description'),
    },
  ];

  return (
    <LazyMotion features={domAnimation}>
      <Section
        id="about"
        title={t('about.title')}
        subtitle={t('about.subtitle')}
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
            <p className="text-lg md:text-xl leading-relaxed font-light" dangerouslySetInnerHTML={{ __html: t('about.story1') }} />
            <p className="text-lg md:text-xl leading-relaxed mt-6 font-light" dangerouslySetInnerHTML={{ __html: t('about.story2') }} />
            
            <blockquote className="mt-8 pl-6 border-l-4 border-beige-300 italic text-charcoal-light text-xl">
              "{t('about.quote')}"
              <footer className="text-sm mt-2 not-italic text-text-light">— {t('about.quoteAuthor')}</footer>
            </blockquote>
            
            <p className="text-lg md:text-xl leading-relaxed mt-6 font-light">
              {t('about.story3')}
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
            {t('about.valuesTitle')}
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
            {t('about.trajectoryTitle')}
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
