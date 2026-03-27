import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  locale: string; // 'es' | 'en'
  path: string;   // e.g. '/es' or '/en/projects'
}

const BASE_URL = 'https://portfolio.codewithbotina.com';

export function SEO({ title, description, locale, path }: SEOProps) {
  return (
    <Helmet>
      <html lang={locale} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={`${BASE_URL}${path}`} />

      {/* hreflang for Google - React uses hrefLang (camelCase) */}
      <link rel="alternate" hrefLang="es" href={`${BASE_URL}${path.replace(`/${locale}`, '/es')}`} />
      <link rel="alternate" hrefLang="en" href={`${BASE_URL}${path.replace(`/${locale}`, '/en')}`} />
      <link rel="alternate" hrefLang="x-default" href={`${BASE_URL}/es`} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={`${BASE_URL}${path}`} />
      <meta property="og:locale" content={locale === 'es' ? 'es_CO' : 'en_US'} />
      <meta property="og:locale:alternate" content={locale === 'es' ? 'en_US' : 'es_CO'} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={`${BASE_URL}/codewithbotina-preview.png`} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${BASE_URL}/codewithbotina-preview.png`} />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "Diego Alejandro Botina",
          "url": BASE_URL,
          "jobTitle": "Software Developer",
          "sameAs": [
            "https://github.com/CodeWithBotinaOficial",
            "https://linkedin.com/in/codewithbotina"
          ]
        })}
      </script>
    </Helmet>
  );
}
