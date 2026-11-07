# own-ui · Estructura del proyecto

> **Objetivo y alcance del documento:** Reflejar los directorios principales del repositorio, sus responsabilidades y la clasificación de los componentes propios por sus dependencias internas. Se considera desactualizado si existen carpetas raíz en el proyecto que no figuren en la tabla, si alguna carpeta listada ya no existe o si la ubicación de los componentes contradice el criterio de clasificación descrito.

[Sistema de estilos](02-estilos.md) · [Objetivos](03-objetivos.md) · [Mantenimiento](04-mantenimiento.md) · [Pendientes](05-pendientes.md)

---

## 1. Directorios principales

| Carpeta | Responsabilidad |
| :--- | :--- |
| `app/` | Rutas, layouts y páginas del App Router de Next.js. Utiliza grupos de rutas como `(showcase)` para organizar las páginas de catálogo y aloja **componentes localizados** (exclusivos de una vista que no se reutilizan transversalmente). |
| `components/own/` | Componentes reutilizables propios construidos sobre Base UI, organizados por sus dependencias internas. |
| `components/own/independant/` | Componentes cuya definición envuelve primitivas de Base UI sin reutilizar otras familias propias, como Input y Field. |
| `components/own/dependant/` | Componentes cuya definición importa y renderiza otras familias propias. FloatingInput compone Input y Field. |
| `components/own/icons/` | Iconos internos compartidos de soporte. Su uso no determina la clasificación de un componente del catálogo. |
| `components/shared/` | Componentes compartidos de soporte e interfaz transversal (como el alternador de temas). |
| `assets/styles/` | Estilos globales del proyecto. Contiene `globals.css`, donde se importa Tailwind CSS v4, se definen las semillas de color en espacio OKLCH, las escalas, los tokens semánticos de superficies y tríadas cromáticas, y las utilidades tipográficas y de interacción. |
| `public/` | Recursos estáticos no procesados por el compilador, como logotipos, favicons, vectores e imágenes públicas. |
| `docs/` | Documentación técnica, diseño de arquitectura, planificaciones y la colección maestra (`docs/master/`). |

---

## 2. Directrices de organización

* **Colocación de componentes:** Los componentes que pertenecen exclusivamente a una pantalla o sección específica residen dentro de la carpeta correspondiente en `app/`. No se extraen a carpetas globales si no existe una necesidad real de reutilización.
* **Fuente única de estilos:** Toda la configuración visual (variables CSS, `@theme inline`, utilidades y resets) se centraliza en `assets/styles/globals.css`. Se evita la dispersión de hojas de estilo auxiliares.
* **Raíz limpia:** Se preserva la raíz del repositorio sin carpetas arbitrarias ni código huérfano. Las configuraciones de herramientas (`next.config.ts`, `tsconfig.json`, `package.json`) residen en el nivel superior.

---

## 3. Componentes independientes y dependientes

La clasificación corresponde a la implementación de own-ui. Se determina por los componentes propios que cada definición importa y renderiza internamente:

* **Independiente (`independant/`):** Se define sin reutilizar otro componente propio del catálogo. Puede envolver varias piezas de una familia de Base UI, usar iconos de soporte y aceptar composición externa mediante `children`, `render` o ranuras.
* **Dependiente (`dependant/`):** Reutiliza uno o más componentes propios del catálogo dentro de su definición. Por ejemplo, un componente que importa Button y lo renderiza internamente como acción predeterminada depende de Button.

El uso de una primitiva de Base UI, un helper, un tipo o un icono de `components/own/icons/` no constituye una dependencia entre componentes propios del catálogo. La composición que realiza el consumidor o el showcase tampoco modifica la clasificación del componente recibido.

Alert Dialog es independiente: su definición envuelve las piezas de `@base-ui/react/alert-dialog`. El consumidor decide los botones y sus variantes mediante `render`, incluido el uso de Button, sin introducir esa dependencia en la definición de Alert Dialog.

Input envuelve `@base-ui/react/input` y admite el contexto de Field de Base UI. FloatingInput importa las implementaciones propias de Input y Field para aportar la etiqueta flotante y asociarla al control.

Los imports reflejan la carpeta del componente. Usa `@/components/own/independant/input` y `@/components/own/dependant/floating-input`. Los nombres de carpeta vigentes son exactamente `independant` y `dependant`.
