import { useEffect, lazy, Suspense } from 'react';
import { Routes, Route, Navigate, useLocation, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Layout } from './components/layout';
import { SEO } from './components/SEO';
import Hero from './components/sections/Hero';

const About = lazy(() => import('./components/sections/About'));
const Projects = lazy(() => import('./components/sections/Projects'));
const Skills = lazy(() => import('./components/sections/Skills'));
const Experience = lazy(() => import('./components/sections/Experience'));
const Contact = lazy(() => import('./components/sections/Contact'));

const PortfolioContent = () => {
  const { lang } = useParams<{ lang: string }>();
  const { i18n, t } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    if (lang && ['es', 'en'].includes(lang) && i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [lang, i18n]);

  return (
    <Layout>
      <SEO 
        title={t('seo.home.title')}
        description={t('seo.home.description')}
        locale={i18n.language.startsWith('es') ? 'es' : 'en'}
        path={location.pathname}
      />
      <Hero />
      <Suspense fallback={null}>
        <About />
        <Projects />
        <Skills />
        <Experience />
        <Contact />
      </Suspense>
    </Layout>
  );
};

const RootRedirect = () => {
  const { i18n } = useTranslation();
  const location = useLocation();
  
  if (location.pathname === '/') {
    const detectedLng = i18n.language.split('-')[0];
    const targetLng = ['es', 'en'].includes(detectedLng) ? detectedLng : 'es';
    return <Navigate to={`/${targetLng}`} replace />;
  }
  
  return <Navigate to="/es" replace />;
};

function App() {
  return (
    <Routes>
      <Route path="/:lang" element={<PortfolioContent />} />
      <Route path="/" element={<RootRedirect />} />
      <Route path="*" element={<Navigate to="/es" replace />} />
    </Routes>
  );
}

export default App;
