# own-ui · Estructura del proyecto

> **Objetivo y alcance del documento:** Reflejar fielmente todos los directorios de primer nivel del repositorio, sus responsabilidades y las reglas de ubicación de archivos. Se considera desactualizado si existen carpetas raíz en el proyecto que no figuren en la tabla, si alguna carpeta listada ya no existe o si la ubicación real de los archivos contradice estas directrices.

[Sistema de estilos](02-estilos.md) · [Objetivos](03-objetivos.md) · [Mantenimiento](04-mantenimiento.md)

---

## 1. Directorios principales

| Carpeta | Responsabilidad |
| :--- | :--- |
| `app/` | Rutas, layouts y páginas del App Router de Next.js. Utiliza grupos de rutas como `(showcase)` para organizar las páginas de catálogo y aloja **componentes localizados** (exclusivos de una vista que no se reutilizan transversalmente). |
| `components/own/` | Primitivas y componentes reutilizables propios construidos sobre Base UI. |
| `components/shared/` | Componentes compartidos de soporte e interfaz transversal (como el alternador de temas). |
| `assets/styles/` | Estilos globales del proyecto. Contiene `globals.css`, donde se importa Tailwind CSS v4, se definen las semillas de color en espacio OKLCH, las escalas, los tokens semánticos de superficies y tríadas cromáticas, y las utilidades tipográficas y de interacción. |
| `public/` | Recursos estáticos no procesados por el compilador, como logotipos, favicons, vectores e imágenes públicas. |
| `docs/` | Documentación técnica, diseño de arquitectura, planificaciones y la colección maestra (`docs/master/`). |

---

## 2. Directrices de organización

* **Colocación de componentes:** Los componentes que pertenecen exclusivamente a una pantalla o sección específica residen dentro de la carpeta correspondiente en `app/`. No se extraen a carpetas globales si no existe una necesidad real de reutilización.
* **Fuente única de estilos:** Toda la configuración visual (variables CSS, `@theme inline`, utilidades y resets) se centraliza en `assets/styles/globals.css`. Se evita la dispersión de hojas de estilo auxiliares.
* **Raíz limpia:** Se preserva la raíz del repositorio sin carpetas arbitrarias ni código huérfano. Las configuraciones de herramientas (`next.config.ts`, `tsconfig.json`, `package.json`) residen en el nivel superior.
