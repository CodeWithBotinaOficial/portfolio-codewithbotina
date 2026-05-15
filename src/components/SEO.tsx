import { Helmet } from 'react-helmet-async'

interface SEOProps {
  title: string
  description: string
  locale: string        // 'es' | 'en' | 'pt' | 'fr' | 'nl'
  path: string          // e.g. '/en' or '/fr/projects'
  type?: 'website' | 'profile'
  keywords?: string
}

const BASE_URL = 'https://portfolio.codewithbotina.com'

const localeToHreflang: Record<string, string> = {
  es: 'es-CO',
  en: 'en-US',
  pt: 'pt-BR',
  fr: 'fr-FR',
  nl: 'nl-NL',
}

const localeToOGLocale: Record<string, string> = {
  es: 'es_CO',
  en: 'en_US',
  pt: 'pt_BR',
  fr: 'fr_FR',
  nl: 'nl_NL',
}

export function SEO({ title, description, locale, path, type = 'website', keywords }: SEOProps) {
  const canonicalUrl = `${BASE_URL}${path}`
  const allLocales = ['es', 'en', 'pt', 'fr', 'nl']
  const basePath = path.replace(/^\/(es|en|pt|fr|nl)/, '')

  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Diego Alejandro Botina',
    alternateName: 'CodeWithBotina',
    url: BASE_URL,
    jobTitle: 'Software Engineer',
    description: description,
    image: `${BASE_URL}/codewithbotina-preview.png`,
    sameAs: [
      'https://github.com/CodeWithBotinaOficial',
      'https://linkedin.com/in/codewithbotina',
    ],
    knowsAbout: ['React', 'TypeScript', 'Node.js', 'Software Architecture', 'System Design'],
    nationality: { '@type': 'Country', name: 'Colombia' },
    worksFor: { '@type': 'Organization', name: 'Jala University' },
  }

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'CodeWithBotina Portfolio',
    url: BASE_URL,
    inLanguage: ['es-CO', 'en-US', 'pt-BR', 'fr-FR', 'nl-NL'],
    author: {
      '@type': 'Person',
      name: 'Diego Alejandro Botina'
    }
  }

  return (
    <Helmet>
      {/* Core */}
      <html lang={locale} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="author" content="Diego Alejandro Botina" />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <link rel="canonical" href={canonicalUrl} />

      {/* hreflang for all 5 locales + x-default pointing to /en */}
      {allLocales.map(loc => (
        <link
          key={loc}
          rel="alternate"
          hrefLang={localeToHreflang[loc]}
          href={`${BASE_URL}/${loc}${basePath}`}
        />
      ))}
      <link rel="alternate" hrefLang="x-default" href={`${BASE_URL}/en${basePath}`} />

      {/* Open Graph */}
      <meta property="og:site_name" content="CodeWithBotina Portfolio" />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:locale" content={localeToOGLocale[locale]} />
      {allLocales
        .filter(loc => loc !== locale)
        .map(loc => (
          <meta key={loc} property="og:locale:alternate" content={localeToOGLocale[loc]} />
        ))}
      <meta property="og:image" content={`${BASE_URL}/codewithbotina-preview.png`} />
      <meta property="og:image:alt" content="Diego Alejandro Botina - Software Engineer Portfolio" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* Twitter / X Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${BASE_URL}/codewithbotina-preview.png`} />
      <meta name="twitter:image:alt" content="Diego Alejandro Botina - Software Engineer Portfolio" />
      <meta name="twitter:creator" content="@CodeWithBotina" />

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(personJsonLd)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(websiteJsonLd)}
      </script>
    </Helmet>
  )
}
