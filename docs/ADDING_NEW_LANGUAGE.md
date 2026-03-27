# Guía para Agregar un Nuevo Idioma
## Guide to Adding a New Language

Esta guía detalla los pasos necesarios para agregar un nuevo idioma al portafolio, cubriendo tanto la configuración del código como la del CMS Contentful.

---

### 1. Configurar el nuevo locale en i18next
#### Configure the new locale in i18next

Edita el archivo `src/i18n.ts` para incluir el nuevo código de idioma (ej. `'fr'`) en el array de idiomas soportados.

```typescript
// src/i18n.ts
i18n.init({
  fallbackLng: 'es',
  supportedLngs: ['es', 'en', 'fr'], // Agrega el nuevo idioma aquí
  // ... rest of config
});
```

### 2. Crear el archivo de traducción
#### Create the translation file

Crea una nueva carpeta y archivo en `public/locales/{nuevo_idioma}/translation.json`. Copia el contenido de `public/locales/es/translation.json` y traduce todos los valores.

**Ruta:** `public/locales/fr/translation.json`

### 3. Mapear el locale para Contentful
#### Map the locale for Contentful

Actualiza el objeto `contentfulLocaleMap` en `src/services/contentful.ts` para que el código corto del frontend coincida con el código de locale de Contentful (ej. `fr-FR`).

```typescript
// src/services/contentful.ts
export const contentfulLocaleMap: Record<string, string> = {
  es: 'es-CO',
  en: 'en-US',
  fr: 'fr-FR', // Agrega el mapeo aquí
};
```

### 4. Actualizar el selector de idiomas
#### Update the Language Switcher

Modifica `src/components/LanguageSwitcher.tsx` para incluir el botón del nuevo idioma. Asegúrate de agregarlo a la lista de `supportedLocales` dentro de la función `changeLanguage`.

```tsx
// src/components/LanguageSwitcher.tsx
const changeLanguage = (lng: string) => {
  const supportedLocales = ['es', 'en', 'fr']; // Actualiza esta lista
  // ... logic
};

// En el JSX:
<button onClick={() => changeLanguage('fr')}>FR</button>
```

### 5. Configurar el idioma en Contentful (Dashboard)
#### Configure the language in Contentful (Dashboard)

1. Ve a tu espacio en Contentful.
2. Navega a **Settings > Locales**.
3. Haz clic en **Add Locale**.
4. Selecciona el idioma deseado (ej. French - France) y guarda.

### 6. Traducir contenido en Contentful (Dashboard)
#### Translate content in Contentful (Dashboard)

1. Ve a la pestaña **Content**.
2. Abre cada entrada existente de **Proyecto** y **Experiencia Laboral**.
3. Verás nuevos campos para el idioma agregado. Completa las traducciones para todos los campos localizables (títulos, descripciones, etc.).

### 7. Configurar el idioma de respaldo (Dashboard)
#### Set fallback locale (Dashboard)

En la configuración del nuevo locale en Contentful (**Settings > Locales**), asegúrate de establecer el **Fallback locale** a `Spanish (Colombia)` para que el contenido no traducido se muestre en español por defecto.

### 8. Sincronizar modelos de contenido
#### Sync Content Models

Si has agregado el locale manualmente a través del dashboard, puedes omitir este paso. De lo contrario, actualiza `scripts/setup-contentful-locales.ts` para incluir el nuevo locale y ejecútalo:

```bash
npm run setup:contentful-locales
```

### 9. Verificar integridad
#### Verify integrity

Ejecuta el linter y los tests para asegurar que no haya errores de sintaxis o lógica.

```bash
npm run lint
npm run test
```

---

### Lista de Verificación
### Checklist

- [ ] Nuevo locale agregado a `src/i18n.ts`.
- [ ] Archivo JSON creado en `public/locales/{lng}/`.
- [ ] Mapeo agregado en `src/services/contentful.ts`.
- [ ] Botón agregado a `LanguageSwitcher.tsx`.
- [ ] Locale configurado en el Dashboard de Contentful.
- [ ] Entradas traducidas en Contentful.
- [ ] Fallback locale configurado en Contentful.
- [ ] Script de configuración ejecutado (si aplica).
- [ ] Lint y Tests aprobados.
