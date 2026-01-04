
# Guía de Despliegue en Cloudflare Pages

Esta guía te mostrará cómo desplegar tu portafolio en [Cloudflare Pages](https://pages.cloudflare.com/), una plataforma de alojamiento rápida, segura y gratuita para sitios estáticos y Jamstack.

## Prerrequisitos

-   Una cuenta de [GitHub](https://github.com/).
-   Una cuenta de [Cloudflare](https://dash.cloudflare.com/sign-up).
-   Tener el código del proyecto en un repositorio de GitHub (puedes hacer un "fork" del original y subirlo a tu cuenta).
-   Tus credenciales de [Contentful](https://www.contentful.com/) (`SPACE_ID` y `ACCESS_TOKEN`).

---

## Paso 1: Conectar Cloudflare con tu Repositorio de GitHub

1.  Inicia sesión en tu panel de control de Cloudflare.
2.  En el menú lateral, ve a **Workers & Pages**.
3.  Haz clic en **Create application** > **Pages** > **Connect to Git**.
4.  Selecciona tu cuenta de GitHub y elige el repositorio de tu portafolio.

---

## Paso 2: Configurar los Ajustes de Build

Una vez que selecciones el repositorio, Cloudflare te pedirá que configures el proceso de build.

1.  **Project name:** Elige un nombre para tu proyecto (ej. `mi-portafolio`).
2.  **Production branch:** Selecciona la rama principal de tu repositorio (normalmente `main` o `master`).
3.  **Framework preset:** Elige **`Vite`** en el menú desplegable. Cloudflare autocompletará la mayoría de los ajustes.
4.  **Build command:** Asegúrate de que esté configurado como `npm run build`.
5.  **Build output directory:** Debe ser `dist`.

La configuración debería verse así:

-   **Framework preset:** `Vite`
-   **Build command:** `npm run build`
-   **Build output directory:** `/dist`
-   **Root directory:** `/`

---

## Paso 3: Añadir las Variables de Entorno

Este es un paso crucial para que tu sitio pueda obtener los datos de Contentful.

1.  Dentro de la configuración del proyecto, haz clic en **Environment variables**.
2.  Añade las siguientes dos variables para el entorno de **Producción**:

    | Variable name                | Value                  |
    | ---------------------------- | ---------------------- |
    | `VITE_CONTENTFUL_SPACE_ID`   | `TU_SPACE_ID`          |
    | `VITE_CONTENTFUL_ACCESS_TOKEN` | `TU_ACCESS_TOKEN`      |

    > **Importante:** Reemplaza `TU_SPACE_ID` y `TU_ACCESS_TOKEN` con tus propias credenciales de Contentful. Asegúrate de que los nombres de las variables coincidan exactamente.

3.  No es necesario hacer clic en "Encrypt", ya que Cloudflare lo maneja de forma segura.

---

## Paso 4: Desplegar el Sitio

1.  Con la configuración de build y las variables de entorno listas, haz clic en **Save and Deploy**.
2.  Cloudflare comenzará a construir tu sitio. Puedes ver el progreso en tiempo real.
3.  Una vez completado, tu sitio estará disponible en una URL de `*.pages.dev` (ej. `mi-portafolio.pages.dev`).

---

## Paso 5 (Opcional): Configurar un Subdominio Personalizado

Si tienes un dominio registrado en Cloudflare, puedes asignarle un subdominio a tu nuevo sitio.

1.  Una vez que el despliegue inicial sea exitoso, ve a la pestaña **Custom domains** dentro de tu proyecto de Pages.
2.  Haz clic en **Set up a custom domain**.
3.  Introduce el subdominio que deseas usar (ej. `portfolio.tudominio.com`).
4.  Cloudflare verificará tu dominio y te guiará. Como tu dominio ya está en Cloudflare, el proceso es casi automático. Generalmente, solo necesitas confirmar. Cloudflare creará el registro CNAME necesario en tu configuración DNS por ti.
5.  Espera unos minutos a que los cambios de DNS se propaguen y Cloudflare emita un certificado SSL para tu subdominio.

¡Y eso es todo! Tu portafolio ahora está alojado en Cloudflare Pages con tu propio subdominio, listo para ser compartido con el mundo.
