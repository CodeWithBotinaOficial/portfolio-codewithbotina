import { useEffect, useMemo, useState } from 'react';
import { LazyMotion, domAnimation, m, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Section } from '../ui';
import { getSkills } from '../../services/contentful';
import type { Skill } from '../../types';
import SkillCard from './skills/SkillCard';

type CategoryFilter = 'all' | string;

const Skills = () => {
  const { t, i18n } = useTranslation();
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getSkills(i18n.language);
        if (!cancelled) setSkills(data);
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Failed to fetch skills';
        if (!cancelled) setError(msg);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    run();
    return () => {
      cancelled = true;
    };
  }, [i18n.language]);

  const categories = useMemo(() => {
    const set = new Set<string>();
    for (const s of skills) {
      for (const c of s.categoria || []) set.add(c);
    }
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [skills]);

  const filteredSkills = useMemo(() => {
    if (activeCategory === 'all') return skills;
    return skills.filter((s) => (s.categoria || []).includes(activeCategory));
  }, [activeCategory, skills]);

  useEffect(() => {
    if (activeCategory !== 'all' && !categories.includes(activeCategory)) {
      setActiveCategory('all');
    }
  }, [activeCategory, categories]);

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
  };

  if (loading) {
    return (
      <LazyMotion features={domAnimation}>
        <Section
          id="skills"
          title={t('skills.title')}
          subtitle={t('skills.subtitle')}
          centered
          className="relative overflow-hidden bg-gradient-to-b from-beige-100 via-background to-surface"
        >
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-charcoal"></div>
          </div>
        </Section>
      </LazyMotion>
    );
  }

  if (error) {
    return (
      <LazyMotion features={domAnimation}>
        <Section
          id="skills"
          title={t('skills.title')}
          centered
          className="relative overflow-hidden bg-gradient-to-b from-beige-100 via-background to-surface"
        >
          <div className="text-center py-20">
            <p className="text-red-600 mb-4">{error}</p>
            <p className="text-text-muted">
              {i18n.language.startsWith('es')
                ? 'Por favor, verifica tu conexión a Contentful.'
                : 'Please check your connection to Contentful.'}
            </p>
          </div>
        </Section>
      </LazyMotion>
    );
  }

  return (
    <LazyMotion features={domAnimation}>
      <Section
        id="skills"
        title={t('skills.title')}
        subtitle={t('skills.subtitle')}
        centered
        className="relative overflow-hidden bg-gradient-to-b from-beige-100 via-background to-surface"
      >
        {/* Background accents */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-beige-200/40 blur-3xl" />
          <div className="absolute -bottom-28 -right-24 w-96 h-96 rounded-full bg-beige-300/30 blur-3xl" />
        </div>

        {/* Filters */}
        <div className="relative z-10 flex flex-wrap justify-center gap-3 mb-12">
          <button
            type="button"
            onClick={() => setActiveCategory('all')}
            aria-pressed={activeCategory === 'all'}
            className={[
              'px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border',
              activeCategory === 'all'
                ? 'bg-charcoal text-white border-charcoal shadow-soft'
                : 'bg-white/70 text-text-muted border-beige-200 hover:bg-beige-100 hover:text-charcoal',
            ].join(' ')}
          >
            {t('skills.filterAll')} ({skills.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              aria-pressed={activeCategory === cat}
              className={[
                'px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border',
                activeCategory === cat
                  ? 'bg-charcoal text-white border-charcoal shadow-soft'
                  : 'bg-white/70 text-text-muted border-beige-200 hover:bg-beige-100 hover:text-charcoal',
              ].join(' ')}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <m.div
          className="relative z-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-120px' }}
          layout
        >
          <AnimatePresence initial={false}>
            {filteredSkills.map((skill) => (
              <m.div
                key={skill.id}
                variants={itemVariants}
                layout
                initial="hidden"
                animate="show"
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <SkillCard skill={skill} />
              </m.div>
            ))}
          </AnimatePresence>
        </m.div>

        {filteredSkills.length === 0 && (
          <div className="relative z-10 text-center py-10">
            <p className="text-text-muted">
              {i18n.language.startsWith('es')
                ? 'No hay habilidades para esta categoría.'
                : 'No skills found for this category.'}
            </p>
          </div>
        )}
      </Section>
    </LazyMotion>
  );
};

export default Skills;
