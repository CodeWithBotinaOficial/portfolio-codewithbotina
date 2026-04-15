import { useState, useEffect } from 'react';
import { Menu, X, Github, Linkedin } from 'lucide-react';
import { LazyMotion, domAnimation, m, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from '../LanguageSwitcher';

/**
 * Social link structure.
 */
interface SocialLink {
  icon: React.ReactNode;
  href: string;
  label: string;
}

const socialLinks: SocialLink[] = [
  {
    icon: <Github className="w-5 h-5" />,
    href: 'https://github.com/CodeWithBotinaOficial',
    label: 'GitHub',
  },
  {
    icon: <Linkedin className="w-5 h-5" />,
    href: 'https://www.linkedin.com/in/codewithbotinaoficial',
    label: 'LinkedIn',
  },
];

/**
 * Header component containing the logo, navigation, and mobile menu.
 * Handles scroll effects and mobile responsiveness.
 */
const Header = () => {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: t('nav.home'), href: '#hero' },
    { label: t('nav.about'), href: '#about' },
    { label: t('nav.projects'), href: '#projects' },
    { label: t('nav.skills'), href: '#skills' },
    { label: t('nav.experience'), href: '#experience' },
    { label: t('nav.contact'), href: '#contact' },
  ];

  // Handle scroll effect for header background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /**
   * Smooth scrolls to the target section and closes mobile menu.
   * @param href - The ID of the section to scroll to (e.g., '#hero')
   */
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <LazyMotion features={domAnimation}>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-surface/90 backdrop-blur-md shadow-soft py-2'
            : 'bg-transparent py-4'
        }`}
      >
        <div className="container-custom">
          <nav className="flex items-center justify-between">
            {/* Logo */}
            <button
              type="button"
              onClick={() => scrollToSection('#hero')}
              className="relative z-50 bg-transparent p-0 border-0"
              aria-label="CodeWithBotina Home"
            >
              <img 
                src="/logo.svg" 
                alt="CodeWithBotina Logo" 
                className="h-10 w-auto transition-transform duration-300 hover:scale-105"
                width="40"
                height="40"
                loading="eager"
                fetchPriority="high"
              />
            </button>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => scrollToSection(item.href)}
                  className="text-text-muted hover:text-charcoal font-medium text-sm tracking-wide transition-colors relative group bg-transparent border-0 p-0"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-charcoal transition-all duration-300 group-hover:w-full"></span>
                </button>
              ))}
            </div>

            {/* Social Links & Language Switcher - Desktop */}
            <div className="hidden md:flex items-center gap-6">
              <div className="flex items-center gap-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-muted hover:text-charcoal transition-colors p-2 hover:bg-beige-100 rounded-full"
                    aria-label={link.label}
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
              <div className="h-4 w-px bg-beige-300"></div>
              <LanguageSwitcher />
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-4 md:hidden">
              <LanguageSwitcher />
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="relative z-50 p-2 text-charcoal hover:bg-beige-100 rounded-lg transition-colors"
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </nav>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <m.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 bg-surface border-b border-beige-200 shadow-medium md:hidden"
            >
              <div className="container-custom py-6 flex flex-col gap-4">
                {navItems.map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => scrollToSection(item.href)}
                    className="text-text-main hover:text-charcoal font-medium text-lg py-2 border-b border-beige-100 last:border-0 bg-transparent text-left"
                  >
                    {item.label}
                  </button>
                ))}
                <div className="flex items-center gap-6 pt-4 mt-2">
                  {socialLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text-muted hover:text-charcoal transition-colors"
                      aria-label={link.label}
                    >
                      {link.icon}
                    </a>
                  ))}
                </div>
              </div>
            </m.div>
          )}
        </AnimatePresence>
      </header>
    </LazyMotion>
  );
};

export default Header;
