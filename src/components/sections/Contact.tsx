import { motion } from 'framer-motion';
import { Section, Button } from '../ui';
import { socialLinks } from '../../utils/socialLinks';
import { Mail } from 'lucide-react';

const Contact = () => {
  const emailLink = socialLinks.find((l) => l.name === 'Email')?.href;

  return (
    <Section
      id="contact"
      title="Conectemos"
      subtitle="¿Tienes un proyecto en mente? ¿Quieres colaborar? ¡Hablemos!"
      centered
      className="bg-gradient-to-br from-valentine-rose/10 to-blue-50"
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
            <a href={emailLink}>
              <Button
                variant="primary"
                size="lg"
                icon={<Mail className="w-5 h-5" />}
              >
                Enviar Email
              </Button>
            </a>
          </div>
        </motion.div>

        {/* Contact Methods Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {socialLinks.map((method, index) => (
            <motion.a
              key={method.name}
              href={method.href}
              target={method.href.startsWith('http') ? '_blank' : undefined}
              rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 group focus:ring-2 focus:ring-valentine-rose"
            >
              <div
                className="w-16 h-16 rounded-full bg-valentine-rose/20 text-valentine-crimson flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
              >
                <method.icon className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold mb-2">{method.name}</h3>
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
          <p className="text-gray-600 max-w-2xl mx-auto">
            Siempre estoy buscando nuevos desafíos y oportunidades para crecer.
            Si tienes un proyecto emocionante, una idea innovadora, o
            simplemente quieres charlar sobre tecnología, estaré encantado de
            escucharte.
          </p>
        </motion.div>
      </div>
    </Section>
  );
};

export default Contact;