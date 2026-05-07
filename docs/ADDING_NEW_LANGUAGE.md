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
  supportedLngs: ['es', 'en', 'pt', 'fr'], // Agrega el nuevo idioma aquí
  // ... rest of config
});
```

### 2. Crear el archivo de traducción
#### Create the translation file

Crea una nueva carpeta y archivo en `src/locales/{nuevo_idioma}/translation.json`. Copia el contenido de `src/locales/es/translation.json` y traduce todos los valores.

**Ruta:** `src/locales/fr/translation.json`

### 3. Mapear el locale para Contentful
#### Map the locale for Contentful

Actualiza el objeto `contentfulLocaleMap` en `src/services/contentful.ts`. 

**Estrategia de dos niveles (Tiered Strategy):**
- **Nivel 1 (Soporte Completo):** `es`, `en`. Ambos tienen contenido traducido en Contentful.
- **Nivel 2 (Solo UI):** `pt`, `fr`. Las cadenas estáticas de la UI están traducidas, pero el contenido dinámico de Contentful usa el respaldo (fallback) a `es-CO` debido a las limitaciones del plan gratuito.

```typescript
// src/services/contentful.ts
export const contentfulLocaleMap: Record<string, string> = {
  es: 'es-CO',
  en: 'en-US',
  pt: 'es-CO', // Fallback a español
  fr: 'es-CO', // Fallback a español
};
```

### 4. Actualizar el selector de idiomas
#### Update the Language Switcher

Modifica `src/components/LanguageSwitcher.tsx` para incluir el botón del nuevo idioma. Asegúrate de agregarlo a la lista de `supportedLocales` dentro de la función `changeLanguage`.

```tsx
// src/components/LanguageSwitcher.tsx
const changeLanguage = (lng: string) => {
  const supportedLocales = ['es', 'en', 'pt', 'fr']; // Actualiza esta lista
  // ... logic
};

// En el JSX:
<button onClick={() => changeLanguage('fr')} aria-label="Français">FR</button>
```

### 5. Configurar el idioma en Contentful (Dashboard)
#### Configure the language in Contentful (Dashboard)

1. Ve a tu espacio en Contentful.
2. Navega a **Settings > Locales**.
3. Haz clic en **Add Locale**.
4. Selecciona el idioma deseado (ej. French (France)) y guarda.
5. **Código de locale:** Asegúrate de usar `fr-FR`.

### 6. Traducir contenido en Contentful (Dashboard)
#### Translate content in Contentful (Dashboard)

*(Solo para idiomas de Nivel 1)*
1. Ve a la pestaña **Content**.
2. Abre cada entrada existente de **Proyecto** y **Experiencia Laboral**.
3. Verás nuevos campos para el idioma agregado. Completa las traducciones para todos los campos localizables.

### 7. Configurar el idioma de respaldo (Dashboard)
#### Set fallback locale (Dashboard)

En la configuración del nuevo locale en Contentful (**Settings > Locales**), establece el **Fallback locale** a `Spanish (Colombia)` para que el contenido no traducido se muestre en español por defecto.

### 8. Sincronizar modelos de contenido
#### Sync Content Models

Actualiza `scripts/setup-contentful-locales.ts` para incluir el nuevo locale y ejecútalo (requiere plan de pago para más de 2 locales activos):

```bash
npm run setup:contentful-locales
```

### 9. Actualizar enrutamiento en App.tsx
#### Update routing in App.tsx

Asegúrate de incluir el nuevo idioma en las validaciones de ruta en `src/App.tsx`.

```typescript
// src/App.tsx
useEffect(() => {
  if (lang && ['es', 'en', 'pt', 'fr'].includes(lang) && i18n.language !== lang) {
    i18n.changeLanguage(lang);
  }
}, [lang, i18n]);
```

### 10. Verificar integridad
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
- [ ] Archivo JSON creado en `src/locales/{lng}/`.
- [ ] Mapeo agregado en `src/services/contentful.ts` (con fallback si es Tier 2).
- [ ] Botón agregado a `LanguageSwitcher.tsx`.
- [ ] Locale configurado en el Dashboard de Contentful.
- [ ] Entradas traducidas en Contentful (si aplica).
- [ ] Fallback locale configurado en Contentful.
- [ ] Script de configuración actualizado en `scripts/setup-contentful-locales.ts`.
- [ ] Rutas actualizadas en `App.tsx`.
- [ ] Lint y Tests aprobados.
