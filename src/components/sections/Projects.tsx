import { useState } from 'react';
import { LazyMotion, domAnimation, m } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Section, Card, MarkdownLite } from '../ui';
import { useProjects } from '../../hooks';
import {
  Github,
  ExternalLink,
  Calendar,
  ArrowLeft,
} from 'lucide-react';
import { getImageUrl } from '../../services/contentful';
import { format } from 'date-fns';
import { es, enUS } from 'date-fns/locale';

const Projects = () => {
  const { t, i18n } = useTranslation();
  const { projects, loading, error } = useProjects();
  const [filter, setFilter] = useState<string>('all');

  const dateLocale = i18n.language.startsWith('es') ? es : enUS;

  // Get unique technologies
  const technologies = Array.from(
    new Set(projects.flatMap((p) => p.tecnologias || []))
  ).sort();

  // Filter projects
  const filteredProjects =
    filter === 'all'
      ? projects
      : projects.filter((p) => p.tecnologias?.includes(filter));

  if (loading) {
    return (
      <LazyMotion features={domAnimation}>
        <Section
          id="projects"
          title={t('projects.title')}
          subtitle={t('projects.subtitle')}
          centered
          className="bg-beige-100"
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
          id="projects"
          title={t('projects.title')}
          centered
          className="bg-beige-100"
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
        id="projects"
        title={t('projects.title')}
        subtitle={t('projects.subtitle')}
        centered
        className="bg-beige-100"
      >
        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              filter === 'all'
                ? 'bg-charcoal text-white shadow-soft'
                : 'bg-white text-text-muted hover:bg-beige-200 hover:text-charcoal'
            }`}
            onClick={() => setFilter('all')}
          >
            {i18n.language.startsWith('es') ? 'Todos' : 'All'} ({projects.length})
          </button>
          {technologies.map((tech) => (
            <button
              key={tech}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                filter === tech
                  ? 'bg-charcoal text-white shadow-soft'
                  : 'bg-white text-text-muted hover:bg-beige-200 hover:text-charcoal'
              }`}
              onClick={() => setFilter(tech)}
            >
              {tech}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <m.div
              key={project.titulo}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card
                className="h-[550px] border-none shadow-soft hover:shadow-hover transition-shadow duration-300 rounded-2xl"
                isFlippable
                cardBack={
                  <div className="p-6 flex flex-col h-full bg-surface rounded-2xl">
                    <div className="flex items-center justify-between mb-4 border-b border-beige-200 pb-2">
                      <h4 className="text-lg font-bold text-charcoal">{i18n.language.startsWith('es') ? 'Más Detalles' : 'More Details'}</h4>
                      <button
                        className="text-text-muted hover:text-charcoal transition-colors"
                        aria-label={i18n.language.startsWith('es') ? 'Volver a la vista principal' : 'Back to main view'}
                      >
                        <ArrowLeft className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="prose prose-sm lg:prose-base overflow-y-auto flex-grow mb-4 text-text-muted">
                      <MarkdownLite text={project.descripcionCompleta} />
                    </div>
                  </div>
                }
              >
                {/* Card Front */}
                <div className="h-full flex flex-col bg-surface rounded-2xl overflow-hidden">
                  {/* Project Image */}
                  {project.imagenPrincipal && (
                    <div className="relative h-48 bg-beige-200 overflow-hidden group">
                      <img
                        src={getImageUrl(project.imagenPrincipal) || ''}
                        alt={project.titulo}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {project.destacado && (
                        <div className="absolute top-4 right-4 bg-charcoal text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                          ⭐ {i18n.language.startsWith('es') ? 'Destacado' : 'Featured'}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Project Content */}
                  <div className="p-6 flex-grow flex flex-col">
                    <h3 className="text-xl font-bold mb-2 text-charcoal">{project.titulo}</h3>
                    <p className="text-text-muted mb-4 flex-grow text-sm leading-relaxed">
                      {project.descripcionCorta}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tecnologias?.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-beige-100 text-charcoal-light rounded-full text-xs font-medium border border-beige-200"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.tecnologias && project.tecnologias.length > 4 && (
                        <span className="px-3 py-1 bg-beige-100 text-text-muted rounded-full text-xs font-medium border border-beige-200">
                          +{project.tecnologias.length - 4}
                        </span>
                      )}
                    </div>

                    {/* Date */}
                    {project.fecha && (
                      <div className="flex items-center text-xs text-text-light mb-4">
                        <Calendar className="w-3 h-3 mr-2" />
                        {format(new Date(project.fecha), 'MMMM yyyy', {
                          locale: dateLocale,
                        })}
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-3 mt-auto">
                      {project.urlGithub && (
                        <a
                          href={project.urlGithub}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button className="w-full py-2 px-4 bg-transparent border border-charcoal text-charcoal rounded-xl text-sm font-medium hover:bg-charcoal hover:text-white transition-all duration-300 flex items-center justify-center gap-2">
                            <Github className="w-4 h-4" />
                            {t('projects.github')}
                          </button>
                        </a>
                      )}
                      {project.urlDemo && (
                        <a
                          href={project.urlDemo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button className="w-full py-2 px-4 bg-charcoal text-white rounded-xl text-sm font-medium hover:bg-charcoal-dark hover:shadow-md transition-all duration-300 flex items-center justify-center gap-2">
                            <ExternalLink className="w-4 h-4" />
                            {t('projects.demo')}
                          </button>
                        </a>
                      )}
                    </div>
                    <div className="text-center text-xs text-text-light mt-4 italic">
                      {i18n.language.startsWith('es') ? 'Click en la tarjeta para ver detalles' : 'Click on card to see details'}
                    </div>
                  </div>
                </div>
              </Card>
            </m.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-text-muted text-lg">
              {i18n.language.startsWith('es') ? `No se encontraron proyectos con "${filter}"` : `No projects found with "${filter}"`}
            </p>
            <button
              onClick={() => setFilter('all')}
              className="mt-4 text-charcoal hover:underline font-medium"
            >
              {i18n.language.startsWith('es') ? 'Ver todos los proyectos' : 'View all projects'}
            </button>
          </div>
        )}

        {/* View All Projects Link */}
        {projects.length > 6 && (
          <div className="text-center mt-16">
            <a
              href="https://github.com/CodeWithBotinaOficial"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <button className="btn-primary rounded-xl">
                {i18n.language.startsWith('es') ? 'Ver Todos los Proyectos en GitHub' : 'View All Projects on GitHub'}
              </button>
            </a>
          </div>
        )}
      </Section>
    </LazyMotion>
  );
};

export default Projects;
