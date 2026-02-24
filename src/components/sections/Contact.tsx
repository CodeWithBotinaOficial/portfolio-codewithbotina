import { motion } from 'framer-motion';
import { Section } from '../ui';
import { socialLinks } from '../../utils/socialLinks';
import { Mail, ArrowRight } from 'lucide-react';

/**
 * Contact section component.
 * Provides multiple ways for users to get in touch.
 */
const Contact = () => {
  return (
    <Section
      id="contact"
      title="Conectemos"
      subtitle="¿Tienes un proyecto en mente? ¿Quieres colaborar? ¡Hablemos!"
      centered
      className="bg-beige-100"
    >
      <div className="max-w-5xl mx-auto">
        {/* Intro */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-lg md:text-xl text-text-muted mb-8 max-w-3xl mx-auto font-light leading-relaxed">
            Estoy siempre abierto a nuevas oportunidades, colaboraciones y
            conversaciones interesantes. Ya sea que tengas una pregunta, una
            propuesta de proyecto, o simplemente quieras conectar, ¡no dudes en
            contactarme!
          </p>
          <div className="flex justify-center">
            <a 
              href="mailto:support@codewithbotina.com"
              className="btn-primary group rounded-xl"
            >
              <Mail className="w-5 h-5 mr-2" />
              Enviar Email
              <ArrowRight className="w-4 h-4 ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
            </a>
          </div>
        </motion.div>

        {/* Contact Methods Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {socialLinks.map((method, index) => {
            const Icon = method.icon;
            return (
              <motion.a
                key={method.name}
                href={method.href}
                target={method.href.startsWith('http') ? '_blank' : undefined}
                rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-surface rounded-xl p-8 border border-beige-200 shadow-soft hover:shadow-medium hover:border-beige-300 transition-all duration-300 group flex flex-col items-center text-center"
              >
                <div
                  className="w-14 h-14 rounded-full bg-beige-100 text-charcoal flex items-center justify-center mb-6 group-hover:bg-charcoal group-hover:text-white transition-colors duration-300"
                >
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-charcoal font-heading">{method.name}</h3>
                <p className="text-text-muted text-sm break-all group-hover:text-charcoal transition-colors duration-300">{method.value}</p>
              </motion.a>
            );
          })}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center bg-charcoal text-white rounded-2xl p-10 md:p-16 shadow-xl relative overflow-hidden"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl"></div>
          
          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-bold mb-6 font-heading">
              ¿Interesado en colaborar?
            </h3>
            <p className="text-gray-300 max-w-2xl mx-auto text-lg font-light leading-relaxed mb-8">
              Siempre estoy buscando nuevos desafíos y oportunidades para crecer.
              Si tienes un proyecto emocionante, una idea innovadora, o
              simplemente quieres charlar sobre tecnología, estaré encantado de
              escucharte.
            </p>
            <a 
              href="https://www.linkedin.com/in/codewithbotinaoficial" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3 border border-white/30 text-white rounded-xl hover:bg-white hover:text-charcoal transition-all duration-300 font-medium font-heading"
            >
              Conectar en LinkedIn
            </a>
          </div>
        </motion.div>
      </div>
    </Section>
  );
};

export default Contact;
