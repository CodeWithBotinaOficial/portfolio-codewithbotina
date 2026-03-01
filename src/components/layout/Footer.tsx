import { Heart } from 'lucide-react';

/**
 * Navigation item structure for footer links.
 */
interface FooterLink {
  label: string;
  href: string;
}

const footerLinks: FooterLink[] = [
  { label: 'Inicio', href: '#hero' },
  { label: 'Sobre Mí', href: '#about' },
  { label: 'Proyectos', href: '#projects' },
  { label: 'Experiencia', href: '#experience' },
  { label: 'Contacto', href: '#contact' },
];

/**
 * Footer component displaying brand info, navigation links, and copyright.
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-charcoal text-white pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1">
            <h3 className="text-2xl font-bold text-white mb-4 tracking-tight font-heading">
              CodeWithBotina
            </h3>
            <p className="text-gray-400 mb-6 font-light leading-relaxed">
              Software Engineer | System Architect
            </p>
            <p className="text-gray-400 text-sm font-light italic">
              "De los campos de Buga a la vanguardia tecnológica" 🇨🇴
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h4 className="text-lg font-semibold mb-6 text-beige-200 font-heading">Navegación</h4>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm tracking-wide block py-1"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-span-1">
            <h4 className="text-lg font-semibold mb-6 text-beige-200 font-heading">Contacto</h4>
            <p className="text-gray-400 text-sm mb-2">support@codewithbotina.com</p>
            <p className="text-gray-400 text-sm">Guadalajara de Buga, Valle del Cauca</p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-xs tracking-wide">
            © {currentYear} Diego Alejandro Botina. Todos los derechos reservados.
          </p>
          <p className="text-gray-500 text-xs flex items-center gap-2 tracking-wide">
            Hecho con <Heart className="w-3 h-3 text-red-500 fill-current" /> en
            Colombia
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
