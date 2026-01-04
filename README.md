# Portafolio CodeWithBotina

¡Bienvenido a mi portafolio personal! Este proyecto muestra mis habilidades y experiencia como desarrollador de software. Aquí encontrarás información sobre mí, los proyectos en los que he trabajado y las tecnologías que domino.

![Previsualización del Portafolio](./public/codewithbotina-preview.png)

## ✨ Características

-   **Diseño Moderno y Responsivo**: Una interfaz de usuario limpia y adaptable a cualquier tamaño de pantalla, construida con Tailwind CSS.
-   **Componentes Reutilizables**: Desarrollado con React y TypeScript, siguiendo una arquitectura basada en componentes para facilitar el mantenimiento y la escalabilidad.
-   **Gestión de Contenido**: El contenido del portafolio (proyectos, experiencia, etc.) se gestiona a través de Contentful, lo que permite actualizaciones sencillas sin necesidad de modificar el código.
-   **Animaciones Fluidas**: Uso de Framer Motion para animaciones sutiles que mejoran la experiencia de usuario.
-   **Optimizado para el Rendimiento**: Construido con Vite para un desarrollo rápido y un empaquetado optimizado para producción.

## 🚀 Tecnologías Utilizadas

-   **Frontend**:
    -   [React](https://reactjs.org/)
    -   [TypeScript](https://www.typescriptlang.org/)
    -   [Vite](https://vitejs.dev/)
    -   [Tailwind CSS](https://tailwindcss.com/)
    -   [Framer Motion](https://www.framer.com/motion/)
-   **CMS**:
    -   [Contentful](https://www.contentful.com/)
-   **Despliegue**:
    -   [Cloudflare Pages](https://pages.cloudflare.com/)

## 🛠️ Instalación y Uso Local

Para ejecutar este proyecto en tu entorno local, sigue estos pasos:

1.  **Clona el Repositorio**:
    ```bash
    git clone https://github.com/CodeWithBotinaOficial/portfolio-codewithbotina.git
    cd portfolio-codewithbotina
    ```

2.  **Instala las Dependencias**:
    ```bash
    npm install
    ```

3.  **Configura las Variables de Entorno**:
    Crea un archivo `.env.local` en la raíz del proyecto y añade tus credenciales de Contentful:
    ```env
    VITE_CONTENTFUL_SPACE_ID=tu_space_id
    VITE_CONTENTFUL_ACCESS_TOKEN=tu_access_token
    ```

4.  **Ejecuta el Servidor de Desarrollo**:
    ```bash
    npm run dev
    ```
    Abre [http://localhost:5173](http://localhost:5173) en tu navegador para ver el proyecto.

##  Scripts Disponibles

En el archivo `package.json` encontrarás los siguientes scripts:

-   `npm run dev`: Inicia el servidor de desarrollo de Vite.
-   `npm run build`: Compila el proyecto para producción.
-   `npm run lint`: Ejecuta ESLint para analizar el código.
-   `npm run preview`: Sirve el build de producción localmente para previsualización.
-   `npm run deploy`: Despliega el proyecto en Cloudflare Pages (ver `DEPLOY_CLOUDFLARE.md`).

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.
