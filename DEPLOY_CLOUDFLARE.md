# Despliegue en Cloudflare Pages

Esta guía te ayudará a desplegar tu portafolio en Cloudflare Pages.

## Configuración del Proyecto

Para facilitar el despliegue, he realizado los siguientes cambios en el proyecto:

1.  **`wrangler.toml`**: He añadido un archivo de configuración `wrangler.toml` en la raíz del proyecto. Este archivo le indica a Cloudflare cómo desplegar tu sitio.

    ```toml
    name = "portfolio-codewithbotina"
    main = "dist/index.html"
    compatibility_date = "2024-05-12"

    [pages]
    "*" = "dist"
    ```

2.  **`package.json`**: He añadido un script `deploy` a tu `package.json` para simplificar el proceso de despliegue.

    ```json
      "scripts": {
        "dev": "vite",
        "build": "tsc -b && vite build",
        "lint": "eslint .",
        "preview": "vite preview",
        "deploy": "wrangler pages deploy dist"
      },
    ```

## Pasos para el Despliegue

1.  **Inicia Sesión en Cloudflare**: 
    Abre tu terminal y ejecuta el siguiente comando para iniciar sesión en tu cuenta de Cloudflare:
    ```bash
    npx wrangler login
    ```

2.  **Construye tu Proyecto**:
    Asegúrate de que tu proyecto esté construido y listo para desplegar.
    ```bash
    npm run build
    ```

3.  **Despliega tu Proyecto**:
    Una vez que hayas iniciado sesión y construido tu proyecto, puedes desplegarlo con el siguiente comando:
    ```bash
    npm run deploy
    ```

Después de ejecutar estos comandos, tu sitio estará desplegado en Cloudflare Pages. Podrás ver la URL de tu sitio en la salida del comando `npm run deploy`.

## Configuración del Subdominio (Opcional)

Si deseas utilizar un subdominio personalizado (por ejemplo, `portfolio.tudominio.com`), sigue estos pasos en tu dashboard de Cloudflare:

1.  Ve a la sección **Workers & Pages** y selecciona tu proyecto.
2.  Ve a la pestaña **Custom Domains**.
3.  Haz clic en **Set up a custom domain**.
4.  Sigue las instrucciones para añadir tu subdominio. Esto generalmente implica añadir un registro CNAME en la configuración de DNS de tu dominio.