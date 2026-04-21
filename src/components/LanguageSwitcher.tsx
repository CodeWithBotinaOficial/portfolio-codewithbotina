import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const changeLanguage = (lng: string) => {
    const currentPath = location.pathname;
    const pathParts = currentPath.split('/');
    
    // Check if the first part is a supported locale
    const supportedLocales = ['es', 'en', 'pt'];
    if (supportedLocales.includes(pathParts[1])) {
      pathParts[1] = lng;
    } else {
      pathParts.splice(1, 0, lng);
    }
    
    const newPath = pathParts.join('/') || '/';
    i18n.changeLanguage(lng);
    navigate(newPath);
  };

  return (
    <div className="flex items-center gap-2" role="navigation" aria-label="Language selector">
      <button
        onClick={() => changeLanguage('es')}
        className={`px-2 py-1 text-sm font-medium transition-colors rounded ${
          i18n.language.startsWith('es')
            ? 'bg-blue-600 text-white'
            : 'text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400'
        }`}
        aria-current={i18n.language.startsWith('es') ? 'true' : undefined}
        aria-label="Español (Colombia)"
      >
        ES
      </button>
      <span className="text-gray-300 dark:text-gray-600">|</span>
      <button
        onClick={() => changeLanguage('en')}
        className={`px-2 py-1 text-sm font-medium transition-colors rounded ${
          i18n.language.startsWith('en')
            ? 'bg-blue-600 text-white'
            : 'text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400'
        }`}
        aria-current={i18n.language.startsWith('en') ? 'true' : undefined}
        aria-label="English (US)"
      >
        EN
      </button>
      <span className="text-gray-300 dark:text-gray-600">|</span>
      <button
        onClick={() => changeLanguage('pt')}
        className={`px-2 py-1 text-sm font-medium transition-colors rounded ${
          i18n.language.startsWith('pt')
            ? 'bg-blue-600 text-white'
            : 'text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400'
        }`}
        aria-current={i18n.language.startsWith('pt') ? 'true' : undefined}
        aria-label="Português (Brasil)"
      >
        PT
      </button>
    </div>
  );
};
