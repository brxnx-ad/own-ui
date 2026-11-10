# own-ui · Estructura del proyecto

> **Objetivo y alcance del documento:** Reflejar los directorios principales del repositorio, sus responsabilidades y la clasificación de los componentes propios por las dependencias de su implementación. Se considera desactualizado si existen carpetas raíz en el proyecto que no figuren en la tabla, si alguna carpeta listada ya no existe o si la ubicación de los componentes contradice el criterio de clasificación descrito.



---

## 1. Directorios principales

| Carpeta | Responsabilidad |
| :--- | :--- |
| `app/` | Rutas, layouts y páginas del App Router de Next.js. Utiliza grupos de rutas como `(showcase)` para organizar las páginas de catálogo y aloja **componentes localizados** (exclusivos de una vista que no se reutilizan transversalmente). |
| `components/own/` | Componentes reutilizables del catálogo, organizados por las dependencias de su implementación. |
| `components/own/simple/` | Componentes definidos con HTML nativo y utilidades compartidas. |
| `components/own/base/` | Componentes que envuelven una familia primitiva de Base UI, como Input y Field. |
| `components/own/composed/` | Componentes que reutilizan otras familias propias, como FloatingInput. |
| `components/own/dependant/` | Componentes que necesitan una librería externa especializada. |
| `components/own/classes.ts` | Composición de clases con `clsx` y resolución acotada de colores de texto `content-*`. Se exporta junto a los componentes que lo importan. |
| `components/own/icons/` | Iconos internos compartidos de soporte. Su uso no determina la clasificación de un componente del catálogo. |
| `components/shared/` | Componentes compartidos de soporte e interfaz transversal (como el alternador de temas). |
| `assets/styles/` | Estilos globales del proyecto. Contiene `globals.css`, donde se importa Tailwind CSS v4, se definen las semillas de color en espacio OKLCH, las escalas, los tokens semánticos de superficies y tríadas cromáticas, y las utilidades tipográficas y de interacción. |
| `public/` | Recursos estáticos no procesados por el compilador, como logotipos, favicons, vectores e imágenes públicas. |
| `docs/` | Documentación técnica, diseño de arquitectura, planificaciones y la colección maestra (`docs/master/`). |
| `.agents/skills/own-ui/` | Skill distribuible para proyectos consumidores, con referencias agrupadas por categoría. |

---

## 2. Directrices de organización

* **Colocación de componentes:** Los componentes que pertenecen exclusivamente a una pantalla o sección específica residen dentro de la carpeta correspondiente en `app/`. No se extraen a carpetas globales si no existe una necesidad real de reutilización.
* **Estilos compartidos y locales:** `assets/styles/globals.css` centraliza los tokens, las utilidades y los resets. Cuando una animación necesita CSS adicional, su módulo `<componente>.module.css` se ubica junto al componente que lo importa.
* **Raíz limpia:** Se preserva la raíz del repositorio sin carpetas arbitrarias ni código huérfano. Las configuraciones de herramientas (`next.config.ts`, `tsconfig.json`, `package.json`) residen en el nivel superior.

---

## 3. Clasificación de componentes

Clasifica cada familia según las dependencias de su definición. Aplica la primera categoría que corresponda.

1. **`dependant/`** requiere una librería externa especializada para su comportamiento principal. Carousel usa Embla para desplazar las diapositivas y compone Button para sus controles. Chart usa el adaptador SVG de TanStack Charts.
2. **`composed/`** reutiliza otras familias propias en su definición, incluido un `render` predeterminado.
3. **`base/`** envuelve una familia primitiva de Base UI. Radio Group reúne las primitivas `RadioGroup` y `Radio` en una sola familia del catálogo.
4. **`simple/`** se define con HTML nativo y utilidades compartidas, sin necesitar primitivas de Base UI, otras familias propias ni librerías externas especializadas.

Los helpers, los tipos y los iconos de soporte forman parte de la infraestructura común. La clasificación se conserva cuando el consumidor o el showcase aporta piezas mediante `children`, `render` o ranuras.

Alert Dialog pertenece a `base/` porque su definición envuelve las piezas de `@base-ui/react/alert-dialog`. El consumidor puede aportar Button y elegir sus variantes mediante `render`.

Input envuelve `@base-ui/react/input` y admite el contexto de Field de Base UI. FloatingInput importa las implementaciones propias de Input y Field para aportar la etiqueta flotante y asociarla al control.

Los imports reflejan la carpeta del componente. Usa `@/components/own/base/input` para Input y `@/components/own/composed/floating-input` para FloatingInput.
