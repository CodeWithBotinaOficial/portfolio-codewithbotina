import { motion } from 'framer-motion';
import { Section, Button } from '../ui';
import {
  Mail,
  Github,
  Linkedin,
  Youtube,
  Instagram,
  Facebook,
  MessageCircle,
} from 'lucide-react';

const Contact = () => {
  const contactMethods = [
    {
      icon: <Mail className="w-8 h-8" />,
      title: 'Email',
      value: 'info@codewithbotina.com',
      href: 'mailto:info@codewithbotina.com',
      color: 'bg-red-100 text-red-600',
    },
    {
      icon: <Github className="w-8 h-8" />,
      title: 'GitHub',
      value: '@CodeWithBotinaOficial',
      href: 'https://github.com/CodeWithBotinaOficial',
      color: 'bg-gray-100 text-gray-900',
    },
    {
      icon: <Linkedin className="w-8 h-8" />,
      title: 'LinkedIn',
      value: 'codewithbotinaoficial',
      href: 'https://www.linkedin.com/in/codewithbotinaoficial',
      color: 'bg-blue-100 text-blue-600',
    },
    {
      icon: <Youtube className="w-8 h-8" />,
      title: 'YouTube',
      value: '@CodeWithBotina',
      href: 'https://www.youtube.com/@CodeWithBotina',
      color: 'bg-red-100 text-red-600',
    },
    {
      icon: <Instagram className="w-8 h-8" />,
      title: 'Instagram',
      value: '@codewithbotina',
      href: 'https://www.instagram.com/codewithbotina/',
      color: 'bg-pink-100 text-pink-600',
    },
    {
      icon: <Facebook className="w-8 h-8" />,
      title: 'Facebook',
      value: 'codewithbotina',
      href: 'https://www.facebook.com/codewithbotina',
      color: 'bg-blue-100 text-blue-700',
    },
  ];

  return (
    <Section
      id="contact"
      title="Conectemos"
      subtitle="¿Tienes un proyecto en mente? ¿Quieres colaborar? ¡Hablemos!"
      centered
      className="bg-gradient-to-br from-primary-50 to-blue-50"
    >
      <div className="max-w-5xl mx-auto">
        {/* Intro */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-lg text-gray-600 mb-6">
            Estoy siempre abierto a nuevas oportunidades, colaboraciones y
            conversaciones interesantes. Ya sea que tengas una pregunta, una
            propuesta de proyecto, o simplemente quieras conectar, ¡no dudes en
            contactarme!
          </p>
          <div className="flex justify-center gap-4">
            <a href="mailto:info@codewithbotina.com">
              <Button
                variant="primary"
                size="lg"
                icon={<Mail className="w-5 h-5" />}
              >
                Enviar Email
              </Button>
            </a>
            <a
              href="https://github.com/CodeWithBotinaOficial"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="secondary"
                size="lg"
                icon={<MessageCircle className="w-5 h-5" />}
              >
                Ver GitHub
              </Button>
            </a>
          </div>
        </motion.div>

        {/* Contact Methods Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contactMethods.map((method, index) => (
            <motion.a
              key={method.title}
              href={method.href}
              target={method.href.startsWith('http') ? '_blank' : undefined}
              rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 group"
            >
              <div
                className={`w-16 h-16 rounded-full ${method.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
              >
                {method.icon}
              </div>
              <h3 className="text-lg font-bold mb-2">{method.title}</h3>
              <p className="text-gray-600 text-sm break-all">{method.value}</p>
            </motion.a>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center bg-white rounded-xl p-8 shadow-lg"
        >
          <h3 className="text-2xl font-bold mb-4">
            ¿Interesado en colaborar?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Siempre estoy buscando nuevos desafíos y oportunidades para crecer.
            Si tienes un proyecto emocionante, una idea innovadora, o
            simplemente quieres charlar sobre tecnología, estaré encantado de
            escucharte.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="mailto:info@codewithbotina.com">
              <Button variant="primary" size="lg">
                Contactar por Email
              </Button>
            </a>
            <a
              href="https://www.linkedin.com/in/codewithbotinaoficial"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="secondary"
                size="lg"
                icon={<Linkedin className="w-5 h-5" />}
              >
                Conectar en LinkedIn
              </Button>
            </a>
          </div>
        </motion.div>

        {/* Call to Action for CodeWithBotina Community */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-gray-600 mb-4">
            ¿Te gusta mi contenido? Únete a la comunidad{' '}
            <strong className="text-primary-600">CodeWithBotina</strong>
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="https://www.youtube.com/@CodeWithBotina"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="ghost"
                size="sm"
                icon={<Youtube className="w-5 h-5" />}
              >
                YouTube
              </Button>
            </a>
            <a
              href="https://www.instagram.com/codewithbotina/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="ghost"
                size="sm"
                icon={<Instagram className="w-5 h-5" />}
              >
                Instagram
              </Button>
            </a>
            <a
              href="https://www.facebook.com/codewithbotina"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="ghost"
                size="sm"
                icon={<Facebook className="w-5 h-5" />}
              >
                Facebook
              </Button>
            </a>
          </div>
        </motion.div>
      </div>
    </Section>
  );
};

export default Contact;