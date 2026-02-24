import { motion } from 'framer-motion';
import { FileDown } from 'lucide-react';

const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDownloadCV = () => {
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
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col justify-center bg-background relative overflow-hidden pt-20"
    >
      {/* Abstract Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-beige-100/50 -skew-x-12 transform origin-top-right translate-x-1/4"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-beige-200/30 rounded-full blur-3xl transform -translate-x-1/4 translate-y-1/4"></div>
      </div>

      <div className="container-custom relative z-10 flex-grow flex flex-col justify-center">
        <div className="max-w-4xl mx-auto text-center">
          {/* Greeting */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-6"
          >
            <span className="inline-block px-4 py-1.5 bg-beige-200 text-charcoal font-medium rounded-full text-sm tracking-wide">
              👋 Hola, soy Diego Alejandro Botina
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-charcoal"
          >
            De los Campos de Buga a la{' '}
            <span className="text-charcoal-light relative inline-block">
              Vanguardia Tecnológica
              <svg className="absolute w-full h-3 -bottom-1 left-0 text-beige-300 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
              </svg>
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="text-xl md:text-2xl text-text-muted mb-8 max-w-3xl mx-auto font-light"
          >
            Software Engineer | System Architect | Estudiante de Commercial
            Software Engineering en Jala University
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="text-base md:text-lg text-text-light mb-12 max-w-2xl mx-auto leading-relaxed"
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
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button
              onClick={() => scrollToSection('#projects')}
              className="btn-primary rounded-xl"
            >
              Ver Proyectos
            </button>
            <button
              onClick={() => scrollToSection('#contact')}
              className="btn-secondary rounded-xl"
            >
              Contactar
            </button>
            <button
              onClick={handleDownloadCV}
              className="text-charcoal hover:text-charcoal-light font-medium px-6 py-3 transition-colors flex items-center gap-2 group rounded-xl"
            >
              <FileDown className="w-5 h-5 group-hover:-translate-y-1 transition-transform duration-300" />
              <span>Descargar CV</span>
            </button>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="relative z-10 pb-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="flex justify-center"
        >
          <button
            onClick={() => scrollToSection('#about')}
            className="flex flex-col items-center text-text-light hover:text-charcoal transition-colors group"
          >
            <span className="text-sm mb-3 tracking-widest uppercase text-xs">Descubre más</span>
            <div className="w-6 h-10 border-2 border-text-light rounded-full flex justify-center p-1 group-hover:border-charcoal transition-colors">
              <motion.div 
                className="w-1 h-2 bg-text-light rounded-full group-hover:bg-charcoal transition-colors"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
