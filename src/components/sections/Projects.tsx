import { useState } from 'react';
import { motion } from 'framer-motion';
import { Section, Card, Button, MarkdownLite } from '../ui';
import { useFeaturedProjects } from '../../hooks';
import {
  Github,
  ExternalLink,
  Calendar,
  ArrowLeft,
} from 'lucide-react';
import { getImageUrl } from '../../services/contentful';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const Projects = () => {
  const { projects, loading, error } = useFeaturedProjects();
  const [filter, setFilter] = useState<string>('all');

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
      <Section
        id="projects"
        title="Proyectos Destacados"
        subtitle="Soluciones innovadoras que demuestran mi pasión por la tecnología"
        centered
        className="bg-gray-50"
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
        id="projects"
        title="Proyectos Destacados"
        centered
        className="bg-gray-50"
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

  return (
    <Section
      id="projects"
      title="Proyectos Destacados"
      subtitle="Soluciones innovadoras que demuestran mi pasión por la tecnología"
      centered
      className="bg-gray-50"
    >
      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        <Button
          variant={filter === 'all' ? 'primary' : 'ghost'}
          size="sm"
          onClick={() => setFilter('all')}
        >
          Todos ({projects.length})
        </Button>
        {technologies.map((tech) => (
          <Button
            key={tech}
            variant={filter === tech ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setFilter(tech)}
          >
            {tech}
          </Button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project, index) => (
          <motion.div
            key={project.titulo}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card
              className="h-[550px]"
              isFlippable
              cardBack={
                <div className="p-6 flex flex-col h-full bg-white">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-bold">Más Detalles</h4>
                    <button
                      className="text-gray-500 hover:text-primary-600"
                      aria-label="Volver a la vista principal"
                    >
                      <ArrowLeft className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="prose prose-sm lg:prose-base overflow-y-auto flex-grow mb-4">
                    <MarkdownLite text={project.descripcionCompleta} />
                  </div>
                </div>
              }
            >
              {/* Card Front */}
              <div className="h-full flex flex-col">
                {/* Project Image */}
                {project.imagenPrincipal && (
                  <div className="relative h-48 bg-gray-200 overflow-hidden">
                    <img
                      src={getImageUrl(project.imagenPrincipal) || ''}
                      alt={project.titulo}
                      className="w-full h-full object-cover"
                    />
                    {project.destacado && (
                      <div className="absolute top-4 right-4 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-xs font-bold">
                        ⭐ Destacado
                      </div>
                    )}
                  </div>
                )}

                {/* Project Content */}
                <div className="p-6 flex-grow flex flex-col">
                  <h3 className="text-xl font-bold mb-2">{project.titulo}</h3>
                  <p className="text-gray-600 mb-4 flex-grow">
                    {project.descripcionCorta}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tecnologias?.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.tecnologias && project.tecnologias.length > 4 && (
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                        +{project.tecnologias.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Date */}
                  {project.fecha && (
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <Calendar className="w-4 h-4 mr-2" />
                      {format(new Date(project.fecha), 'MMMM yyyy', {
                        locale: es,
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
                        <Button
                          variant="secondary"
                          size="sm"
                          icon={<Github className="w-4 h-4" />}
                          className="w-full"
                        >
                          Código
                        </Button>
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
                        <Button
                          variant="primary"
                          size="sm"
                          icon={<ExternalLink className="w-4 h-4" />}
                          className="w-full"
                        >
                          Demo
                        </Button>
                      </a>
                    )}
                  </div>
                  <div className="text-center text-sm text-gray-500 mt-4">
                    Click para ver más
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">
            No se encontraron proyectos con "{filter}"
          </p>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setFilter('all')}
            className="mt-4"
          >
            Ver todos los proyectos
          </Button>
        </div>
      )}

      {/* View All Projects Link */}
      {projects.length > 6 && (
        <div className="text-center mt-12">
          <a
            href="https://github.com/CodeWithBotinaOficial"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="primary" size="lg">
              Ver Todos los Proyectos en GitHub
            </Button>
          </a>
        </div>
      )}
    </Section>
  );
};

export default Projects;