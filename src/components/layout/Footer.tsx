import { Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { label: 'Sobre Mí', href: '#about' },
    { label: 'Proyectos', href: '#projects' },
    { label: 'Experiencia', href: '#experience' },
    { label: 'Contacto', href: '#contact' },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold text-gradient mb-4">
              CodeWithBotina
            </h3>
            <p className="text-gray-400 mb-4">
              Software Engineer | System Architect
            </p>
            <p className="text-gray-400 text-sm">
              De los campos de Buga a la vanguardia tecnológica 🇨🇴
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-valentine-rose transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-gray-400 text-sm">
            © {currentYear} Diego Alejandro Botina. Todos los derechos reservados.
          </p>
          <p className="text-gray-400 text-sm flex items-center gap-2">
            Hecho con <Heart className="w-4 h-4 text-valentine-crimson fill-current" /> en
            Colombia
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;