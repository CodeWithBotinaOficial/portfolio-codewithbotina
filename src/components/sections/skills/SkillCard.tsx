import { useMemo, useRef } from 'react';
import { m, useInView } from 'framer-motion';
import { Star } from 'lucide-react';
import type { Skill } from '../../../types';
import { useTranslation } from 'react-i18next';

interface SkillCardProps {
  skill: Skill;
}

const clampLevel = (value: number) => Math.max(0, Math.min(100, value));

const SkillCard = ({ skill }: SkillCardProps) => {
  const { t } = useTranslation();
  const level = typeof skill.nivel === 'number' ? clampLevel(skill.nivel) : null;

  const initials = useMemo(() => {
    const normalized = (skill.nombre || '').trim();
    if (!normalized) return '??';
    return normalized.slice(0, 2).toUpperCase();
  }, [skill.nombre]);

  const barRef = useRef<HTMLDivElement | null>(null);
  const barInView = useInView(barRef, { once: true, margin: '-20% 0px -30% 0px' });

  return (
    <div
      className={[
        'group rounded-2xl border bg-white/80 backdrop-blur-sm p-4 md:p-5 shadow-soft transition-all duration-300 h-full flex flex-col',
        'hover:shadow-medium hover:-translate-y-0.5',
        skill.destacada ? 'border-amber-200 ring-1 ring-amber-200/70' : 'border-beige-200 hover:border-beige-300',
      ].join(' ')}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="shrink-0">
          {skill.imagenUrl ? (
            <img
              src={skill.imagenUrl}
              alt={`${skill.nombre} logo`}
              className="w-11 h-11 md:w-12 md:h-12 object-contain rounded-xl bg-background border border-beige-200 p-2"
              loading="lazy"
              decoding="async"
            />
          ) : skill.iconoUrl ? (
            <img
              src={skill.iconoUrl}
              alt={`${skill.nombre} icon`}
              className="w-11 h-11 md:w-12 md:h-12 object-contain rounded-xl bg-background border border-beige-200 p-2"
              loading="lazy"
              decoding="async"
            />
          ) : (
            <div
              className="w-11 h-11 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-beige-200 to-beige-100 border border-beige-200 flex items-center justify-center text-charcoal font-bold tracking-wider"
              aria-hidden="true"
            >
              {initials}
            </div>
          )}
        </div>

        {skill.destacada && (
          <div
            className="inline-flex items-center gap-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 px-2 py-1 text-[11px] font-semibold whitespace-nowrap"
            aria-label={t('skills.featuredLabel')}
            title={t('skills.featuredLabel')}
          >
            <Star className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{t('skills.featuredLabel')}</span>
          </div>
        )}
      </div>

      <div className="mt-3 min-w-0 flex-1">
        <h3 className="text-sm md:text-base font-bold text-charcoal leading-snug pr-2">
          {skill.nombre}
        </h3>
        {skill.descripcion && (
          <p className="mt-1.5 text-xs md:text-sm text-text-light leading-relaxed">
            {skill.descripcion}
          </p>
        )}
      </div>

      {level !== null && (
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] md:text-xs font-medium text-text-light">
              {t('skills.levelLabel')}
            </span>
            <span className="text-[11px] md:text-xs font-semibold text-charcoal">
              {level}%
            </span>
          </div>

          <div
            ref={barRef}
            className="h-2.5 rounded-full bg-beige-100 border border-beige-200 overflow-hidden"
            role="progressbar"
            aria-valuenow={level}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`${t('skills.levelLabel')}: ${skill.nombre}`}
          >
            <m.div
              className="h-full rounded-full bg-gradient-to-r from-charcoal to-charcoal-light"
              initial={{ width: '0%' }}
              animate={{ width: barInView ? `${level}%` : '0%' }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillCard;
