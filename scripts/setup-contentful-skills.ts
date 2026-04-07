import pkg from 'contentful-management';
const { createClient } = pkg;
import * as dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const SPACE_ID = process.env.VITE_CONTENTFUL_SPACE_ID;
const MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN;

if (!SPACE_ID || !MANAGEMENT_TOKEN) {
  console.error(
    'Error: VITE_CONTENTFUL_SPACE_ID and CONTENTFUL_MANAGEMENT_TOKEN must be set in .env.local'
  );
  process.exit(1);
}

type Field = {
  id: string;
  name: string;
  type: string;
  localized?: boolean;
  required?: boolean;
  // For Link fields
  linkType?: string;
  // For Array fields
  items?: unknown;
  // For default values
  defaultValue?: Record<string, unknown>;
};

const ensureFieldExists = (
  fields: Field[],
  desired: Field
): { changed: boolean; fields: Field[] } => {
  const existing = fields.find((f) => f.id === desired.id);
  if (!existing) {
    return { changed: true, fields: [...fields, desired] };
  }

  let changed = false;
  // Only update safe properties; do not attempt to mutate field type/linkType.
  (['name', 'localized', 'required', 'defaultValue'] as const).forEach((key) => {
    if (desired[key] !== undefined && existing[key] !== desired[key]) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (existing as any)[key] = desired[key];
      changed = true;
    }
  });

  return { changed, fields };
};

async function setupSkillsModel() {
  const client = createClient({ accessToken: MANAGEMENT_TOKEN! });

  try {
    const space = await client.getSpace(SPACE_ID!);
    const environment = await space.getEnvironment('master');

    const locales = await environment.getLocales();
    const defaultLocale = locales.items.find((l) => l.default)?.code || 'es-CO';

    console.log('Updating content type: habilidad...');
    const contentType = await environment.getContentType('habilidad');
    let updated = false;

    // 1.1 Mark existing fields as localized
    for (const field of contentType.fields as Field[]) {
      if (field.id === 'nombre' || field.id === 'categoria') {
        if (!field.localized) {
          field.localized = true;
          updated = true;
          console.log(`  Localized field: ${field.id}`);
        }
      }
    }

    // 1.2 Add new fields if missing (idempotent)
    const desiredFields: Field[] = [
      {
        id: 'descripcion',
        name: 'Descripción',
        type: 'Symbol',
        localized: true,
        required: false,
      },
      {
        id: 'imagen',
        name: 'Imagen',
        type: 'Link',
        linkType: 'Asset',
        localized: false,
        required: false,
      },
      {
        id: 'destacada',
        name: 'Destacada',
        type: 'Boolean',
        localized: false,
        required: false,
        defaultValue: { [defaultLocale]: false },
      },
      {
        id: 'orden',
        name: 'Orden',
        type: 'Integer',
        localized: false,
        required: false,
      },
    ];

    for (const desired of desiredFields) {
      const result = ensureFieldExists(contentType.fields as Field[], desired);
      contentType.fields = result.fields as unknown as typeof contentType.fields;
      if (result.changed) {
        updated = true;
        console.log(`  Ensured field: ${desired.id}`);
      }
    }

    if (updated) {
      const updatedContentType = await contentType.update();
      await updatedContentType.publish();
      console.log('Content type habilidad updated and published.');
    } else {
      console.log('Content type habilidad already up to date.');
    }

    console.log('Setup completed successfully!');
  } catch (error) {
    console.error('Error during setup:', error);
    process.exit(1);
  }
}

setupSkillsModel();

