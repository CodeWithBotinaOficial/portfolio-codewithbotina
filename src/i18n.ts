import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './locales/en/translation.json';
import es from './locales/es/translation.json';
import pt from './locales/pt/translation.json'; // Import pt translation

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'es',
    supportedLngs: ['es', 'en', 'pt'], // Add 'pt' to supportedLngs
    debug: false,
    resources: {
      en: { translation: en },
      es: { translation: es },
      pt: { translation: pt }, // Add pt translation
    },
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
    detection: {
      order: ['path', 'localStorage', 'navigator'],
      lookupFromPathIndex: 0,
      caches: ['localStorage'],
    },
  });

export default i18n;
