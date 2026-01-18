import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Youtube, FileDown } from 'lucide-react';
import { Button } from '../ui';
import Particles from '../ui/Particles';

const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const socialLinks = [
    {
      icon: <Github className="w-6 h-6" />,
      href: 'https://github.com/CodeWithBotinaOficial',
      label: 'GitHub',
    },
    {
      icon: <Linkedin className="w-6 h-6" />,
      href: 'https://www.linkedin.com/in/codewithbotinaoficial',
      label: 'LinkedIn',
    },
    {
      icon: <Youtube className="w-6 h-6" />,
      href: 'https://www.youtube.com/@CodeWithBotina',
      label: 'YouTube',
    },
  ];

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-valentine-rose/20 via-white to-valentine-rose/20 relative overflow-hidden"
    >
      <Particles />
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-valentine-rose rounded-full mix-blend-multiply filter blur-xl opacity-70"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-valentine-crimson/50 rounded-full mix-blend-multiply filter blur-xl opacity-70"
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Greeting */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <span className="inline-block px-4 py-2 bg-valentine-crimson rounded-full text-white font-semibold shadow-lg text-sm md:text-base">
              👋 Hola, soy Diego Alejandro Botina
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
          >
            De los Campos de Buga a la{' '}
            <span className="text-gradient">Vanguardia Tecnológica</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl lg:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto"
          >
            Software Engineer | System Architect | Estudiante de Commercial
            Software Engineering en Jala University
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-base md:text-lg text-gray-500 mb-12 max-w-2xl mx-auto"
          >
            Con un hambre insaciable por la innovación, sueño con crear un
            sistema operativo universal y un lenguaje de programación que
            combine la simplicidad del lenguaje natural con la eficiencia de C y
            Assembly. Poniendo a Colombia en la élite de la tecnología de punta.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Button
              variant="primary"
              size="lg"
              onClick={() => scrollToSection('#projects')}
            >
              Ver Proyectos
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => scrollToSection('#contact')}
            >
              Contactar
            </Button>
            <Button
              variant="ghost"
              size="lg"
              icon={<FileDown className="w-5 h-5" />}
              className="animate-pulse"
              onClick={() => {
                // 1. Get the path and sanitize it (remove accidental quotes from env variables)
                const rawPath = import.meta.env.VITE_CV_DOWNLOAD_URL || '/assets/cv/DiegoBotina_CV.pdf';
                const cvPath = rawPath.replace(/[中心"]/g, '');

                // 2. Create a hidden anchor element to trigger the download
                const link = document.createElement('a');
                link.href = cvPath;
                
                // 3. Set the download attribute with the desired filename
                link.setAttribute('download', 'DiegoBotina_CV.pdf');
                
                // 4. Security and accessibility best practices
                link.style.display = 'none';
                link.rel = 'noopener noreferrer';
                
                // 5. Append, trigger, and cleanup
                document.body.appendChild(link);
                link.click();
                
                // Small delay for cleanup to ensure browser handles the click event
                setTimeout(() => {
                  document.body.removeChild(link);
                }, 100);
              }}
            >
              Descargar CV
            </Button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex justify-center items-center gap-6"
          >
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-valentine-crimson transition-colors p-3 hover:bg-white rounded-full hover:shadow-lg"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                aria-label={link.label}
              >
                {link.icon}
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <motion.button
            onClick={() => scrollToSection('#about')}
            className="flex flex-col items-center text-gray-500 hover:text-valentine-crimson transition-colors"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-sm mb-2">Scroll para conocer más</span>
            <ArrowDown className="w-6 h-6" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;