import pkg from 'contentful-management';
const { createClient } = pkg;
import * as dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const SPACE_ID = process.env.VITE_CONTENTFUL_SPACE_ID;
const MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN;

if (!SPACE_ID || !MANAGEMENT_TOKEN) {
  console.error('Error: VITE_CONTENTFUL_SPACE_ID and CONTENTFUL_MANAGEMENT_TOKEN must be set in .env.local');
  process.exit(1);
}

async function setupLocales() {
  const client = createClient({
    accessToken: MANAGEMENT_TOKEN!,
  });

  try {
    const space = await client.getSpace(SPACE_ID!);
    const environment = await space.getEnvironment('master');

    console.log('Checking locales...');
    const locales = await environment.getLocales();
    
    // Check en-US
    const hasEnUS = locales.items.some(locale => locale.code === 'en-US');
    if (!hasEnUS) {
      console.log('Adding en-US locale...');
      await environment.createLocale({
        name: 'English (US)',
        code: 'en-US',
        fallbackCode: 'es-CO', // Assuming es-CO is the default
      });
      console.log('Locale en-US added successfully.');
    } else {
      console.log('Locale en-US already exists.');
    }

    // Check pt-BR
    const hasPtBR = locales.items.some(locale => locale.code === 'pt-BR');
    if (!hasPtBR) {
      console.log('Adding pt-BR locale...');
      await environment.createLocale({
        name: 'Portuguese (Brazil)',
        code: 'pt-BR',
        fallbackCode: 'es-CO',
      });
      console.log('Locale pt-BR added successfully.');
    } else {
      console.log('Locale pt-BR already exists.');
    }

    const contentTypesToLocalize = ['proyecto', 'experiencia'];
    const fieldsToLocalize: Record<string, string[]> = {
      proyecto: ['titulo', 'descripcionCorta', 'descripcionCompleta', 'tecnologias'],
      experiencia: ['institucion', 'cargoTitulo', 'descripcion', 'ubicacion'],
    };

    for (const contentTypeId of contentTypesToLocalize) {
      console.log(`Updating content type: ${contentTypeId}...`);
      const contentType = await environment.getContentType(contentTypeId);
      let updated = false;

      contentType.fields.forEach(field => {
        if (fieldsToLocalize[contentTypeId].includes(field.id)) {
          if (!field.localized) {
            field.localized = true;
            updated = true;
            console.log(`  Localized field: ${field.id}`);
          }
        }
      });

      if (updated) {
        const updatedContentType = await contentType.update();
        await updatedContentType.publish();
        console.log(`Content type ${contentTypeId} updated and published.`);
      } else {
        console.log(`Content type ${contentTypeId} already localized.`);
      }
    }

    console.log('Setup completed successfully!');
  } catch (error) {
    console.error('Error during setup:', error);
    process.exit(1);
  }
}

setupLocales();
