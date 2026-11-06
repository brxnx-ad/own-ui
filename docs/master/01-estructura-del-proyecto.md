# own-ui · Estructura del proyecto

Organización de carpetas, responsabilidades arquitectónicas y directrices de archivos.

---

## 1. Directorios principales

| Carpeta | Responsabilidad |
| :--- | :--- |
| `app/` | Rutas, layouts y páginas del App Router de Next.js. Agrupa páginas por dominio y aloja **componentes localizados** (exclusivos de una vista o flujo particular, que no se reutilizan de forma transversal). |
| `assets/styles/` | Estilos globales del proyecto. Contiene `globals.css`, donde se importa Tailwind CSS v4, se definen las semillas de color en espacio OKLCH, las escalas, los tokens semánticos de superficies y tríadas cromáticas, y las utilidades tipográficas y de interacción. |
| `public/` | Recursos estáticos no procesados por el compilador, como logotipos, favicons, vectores e imágenes públicas. |
| `docs/` | Documentación técnica, diseño de arquitectura, planificaciones y la colección maestra (`docs/master/`). |

---

## 2. Directrices de organización

* **Colocación de componentes:** Los componentes que pertenecen exclusivamente a una pantalla o sección específica residen dentro de la carpeta correspondiente en `app/`. No se extraen a carpetas globales si no existe una necesidad real de reutilización.
* **Fuente única de estilos:** Toda la configuración visual (variables CSS, `@theme inline`, utilidades y resets) se centraliza en `assets/styles/globals.css`. Se evita la dispersión de hojas de estilo auxiliares.
* **Raíz limpia:** Se preserva la raíz del repositorio sin carpetas arbitrarias ni código huérfano. Las configuraciones de herramientas (`next.config.ts`, `tsconfig.json`, `package.json`) residen en el nivel superior.
