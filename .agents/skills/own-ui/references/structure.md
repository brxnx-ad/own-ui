# own-ui · Estructura y composición

## Ubicación de las piezas

El entorno de referencia es Next.js con App Router. Las rutas siguientes son convenciones del material exportado, relativas a la raíz del proyecto consumidor. Localiza primero los archivos recibidos y comprueba sus aliases. Si el destino usa `src/app/`, `src/components/` u otra organización dentro de Next.js, conserva esa estructura y ajusta los imports.

| Ruta convencional | Responsabilidad en el consumidor |
| :--- | :--- |
| `components/own/simple/` | Componentes que no necesitan primitivas de Base UI ni librerías externas especializadas. Si su definición reutiliza otra familia propia, se clasifican como compuestos. |
| `components/own/base/` | Familias basadas en una sola familia primitiva de Base UI, sin dependencias de otras familias propias ni motores externos especializados. Verifica cuáles se han exportado al destino en la tabla de archivos necesarios. |
| `components/own/composed/` | Familias que reutilizan internamente otros componentes definidos en `components/own/`. |
| `components/own/dependant/` | Familias que requieren una librería externa especializada para su comportamiento principal, aunque también compongan componentes de own-ui. |
| `components/own/classes.ts` | Helper compartido de clases; usa `clsx` y resuelve de forma acotada sustituciones por `text-content-*`. Inclúyelo junto con sus consumidores. |
| `components/own/icons/` | Soporte SVG compartido. Consulta la [referencia de iconos](icons.md) para sus API y archivos. |
| `app/` o `src/app/` | Rutas, páginas y layouts del App Router del proyecto consumidor. Los ejemplos interactivos y componentes exclusivos de una vista se colocan cerca de ella. |
| `app/layout.tsx` o `src/app/layout.tsx` | Layout raíz: importa la hoja global e integra la fuente, el proveedor de temas y el apilamiento del contenido y los portales. |
| `components/shared/` o equivalente | Wrappers cliente compartidos, como un ThemeProvider de `next-themes`, cuando el consumidor necesite mantenerlos en un módulo propio. |
| `assets/styles/globals.css` | Fuente única de tokens, configuración de Tailwind, temas y utilidades visuales compartidas. |
| `.agents/skills/own-ui/` | Entrada `SKILL.md` y referencias de componentes, estructura y estilos de esta skill. |

Los nombres de las carpetas de componentes son `simple`, `base`, `composed` y `dependant`. Resuelve los imports según la ubicación real de los archivos exportados y los aliases del consumidor.

## Compatibilidad y archivos necesarios

Las referencias de Button, Accordion y Alert Dialog parten de la revisión de origen `f48ed4e49171`. Las de Autocomplete y Avatar acompañan a `autocomplete.tsx` y `avatar.tsx` en sus respectivas distribuciones. En el consumidor, coteja la revisión registrada al exportar, el código recibido y los tipos instalados.

| Capa | Base de compatibilidad |
| :--- | :--- |
| Aplicación | Next.js 16.4.5 con App Router, React y React DOM 19.3.0. La navegación interna usa `next/link` y la fuente de referencia se carga con `next/font/google`. |
| Wrappers | `@base-ui/react` 1.9.0 y `clsx` 2.1.1. Los wrappers reciben referencias DOM como props de React 19. |
| Estilos y tema | Tailwind CSS v4 (4.3.4 en el origen) para generar las utilidades y `next-themes` 0.4.6 para aplicar el tema por clase. |
| Motor de Carousel | `embla-carousel-react` 8.6.0, requerido al exportar Carousel. |
| Motor de Chart | `@tanstack/charts` 1.5.0 con el adaptador SVG de React, requerido al exportar Chart. |

Comprueba la compatibilidad del entorno receptor al usar otras versiones. Consulta los tipos de la primitiva instalada para las opciones heredadas y distingue las dependencias de cada wrapper de la configuración compartida de la aplicación.

Las 37 familias Base UI se ubican en `components/own/base/`, siete familias compuestas en `components/own/composed/` y las ocho familias de HTML nativo en `components/own/simple/`. Carousel y Chart se ubican en `components/own/dependant/`. Además de los archivos de la tabla, incluye `components/own/classes.ts` y `clsx` para los módulos que lo importan, incluido `icons/spinner.tsx` cuando se exporta. En la tabla, los nombres de archivo sueltos se resuelven dentro de la carpeta de cada familia. Las rutas que incluyen una carpeta son relativas a `components/own/`.

| Familia | Archivos propios y de soporte necesarios |
| :--- | :--- |
| Alert | `alert.tsx`. El consumidor aporta los iconos y las acciones. |
| Aspect Ratio | `aspect-ratio.tsx`. El consumidor aporta el contenido del marco. |
| Badge | `badge.tsx`. El consumidor aporta el texto y los iconos opcionales. |
| Card | `card.tsx`. El consumidor aporta las acciones y el contenido. |
| Carousel | `dependant/carousel.tsx`, `base/button.tsx`, `icons/index.tsx`, `icons/spinner.tsx` y la dependencia `embla-carousel-react` 8.6.0. |
| Chart | `dependant/chart.tsx`, `dependant/chart.module.css` y la dependencia `@tanstack/charts` 1.5.0. El consumidor aporta la definición del gráfico. |
| Empty | `empty.tsx`. El consumidor aporta el recurso visual y las acciones opcionales. |
| Skeleton | `skeleton.tsx` y `skeleton.module.css`. El módulo CSS define la base gris, el brillo por tema y la animación compartida. |
| Table | `table.tsx`. Incluye el contenedor desplazable y las piezas de la tabla. |
| Textarea | `textarea.tsx`. Conserva `"use client"` para el contador y su sincronización con el campo nativo. |
| Button | `button.tsx`. Importa Spinner del [módulo de iconos](#iconos-de-soporte). |
| Accordion | `accordion.tsx`, `accordion.module.css` y Chevron con su helper SVG, definidos en `icons/index.tsx`. Si se copia el módulo completo de iconos, incluye también los archivos que reexporta, como Spinner. |
| Alert Dialog | `alert-dialog.tsx`; su definición no importa otras familias propias ni iconos de soporte. Button solo es necesario si el consumidor lo elige para sus acciones. |
| Autocomplete | `autocomplete.tsx`, Chevron y Close con su helper SVG en `icons/index.tsx`. Si se copia el módulo de iconos completo, incluye también `icons/spinner.tsx` por su reexportación. |
| Avatar | `avatar.tsx`. El consumidor aporta la imagen y el contenido alternativo. |
| Checkbox | `checkbox.tsx`, Check y Minus con su helper SVG en `icons/index.tsx`. Si se copia el módulo de iconos completo, incluye también `icons/spinner.tsx` por su reexportación. |
| Checkbox Group | `checkbox-group.tsx`. Incluye Checkbox y sus iconos cuando el consumidor componga el grupo con las casillas de own-ui. |
| Collapsible | `collapsible.tsx`, `collapsible.module.css` y Chevron con su helper SVG en `icons/index.tsx`. Si se copia el módulo completo de iconos, incluye también `icons/spinner.tsx` por su reexportación. |
| Combobox | `combobox.tsx`, Check, Chevron y Close con su helper SVG en `icons/index.tsx`. Si se copia el módulo completo de iconos, incluye también `icons/spinner.tsx` por su reexportación. |
| Context Menu | `context-menu.tsx`, Check y Chevron con su helper SVG en `icons/index.tsx`. Si se copia el módulo completo de iconos, incluye también `icons/spinner.tsx` por su reexportación. |
| Dialog | `dialog.tsx`. Los controles se eligen en la composición del consumidor. |
| Drawer | `drawer.tsx` y `drawer.module.css`. El módulo contiene las transiciones del panel y del fondo, la geometría del agarre y el espacio reservado en los puntos de ajuste. Sus piezas envuelven Base UI y los controles se eligen en la composición. |
| Field | `field.tsx` y `field.module.css`. Los controles adicionales y Base UI Form se incorporan según la composición. |
| Fieldset | `fieldset.tsx`. Los campos y controles se eligen en la composición. |
| FloatingInput | `composed/floating-input.tsx`, `composed/floating-input.module.css`, `base/input.tsx`, `base/field.tsx` e `base/field.module.css`. |
| Attachment | `composed/attachment.tsx` y `base/button.tsx`. Button requiere `icons/index.tsx` y `icons/spinner.tsx`. |
| Button Group | `composed/button-group.tsx`, `composed/button-group.module.css` y `base/separator.tsx`. |
| Command | `composed/command.tsx`, `base/autocomplete.tsx`, `base/dialog.tsx`, `icons/index.tsx` e `icons/spinner.tsx` por la reexportación de Spinner. |
| Input Group | `composed/input-group.tsx`, `composed/input-group.module.css`, `base/button.tsx`, `base/input.tsx`, `simple/textarea.tsx` y los iconos de Button. |
| Item | `composed/item.tsx` y `base/separator.tsx`. |
| Pagination | `composed/pagination.tsx`, `base/button.tsx`, `icons/index.tsx`, `icons/spinner.tsx` por el reexport de Spinner y `next/link` de Next.js. |
| Form | `form.tsx`. Los campos, grupos y botones se eligen en la composición. |
| Input | `input.tsx`. Incluye Field cuando el consumidor utilice sus etiquetas, descripciones o validación coordinada. |
| Menu | `menu.tsx`, Check y Chevron con su helper SVG en `icons/index.tsx`. Si se copia el módulo completo de iconos, incluye también `icons/spinner.tsx` por su reexportación. |
| Menubar | `menubar.tsx`. Incluye Menu y sus archivos de soporte cuando el consumidor elija las piezas de own-ui para componer la barra. |
| Meter | `meter.tsx`. Sus piezas envuelven Base UI sin requerir iconos ni otras familias propias. |
| Navigation Menu | `navigation-menu.tsx`, `navigation-menu.module.css` y Chevron con su helper SVG en `icons/index.tsx`. Si se copia el módulo completo de iconos, incluye también `icons/spinner.tsx` por su reexportación. |
| Number Field | `number-field.tsx`, Minus y Plus con su helper SVG en `icons/index.tsx`. Si se copia el módulo completo de iconos, incluye también `icons/spinner.tsx` por su reexportación. |
| OTP Field | `otp-field.tsx`. Sus piezas envuelven Base UI sin requerir iconos ni otras familias propias. Incluye Field si el consumidor utiliza su etiquetado y validación. |
| Popover | `popover.tsx` y `popover.module.css`. Sus piezas envuelven Base UI. Incluye Button u otros controles si la composición del consumidor los utiliza. |
| Preview Card | `preview-card.tsx` y `preview-card.module.css`. Sus piezas envuelven Base UI. El consumidor aporta los enlaces y el contenido de sus vistas previas. |
| Progress | `progress.tsx` y `progress.module.css`, que define el barrido indeterminado. |
| Radio Group | `radio-group.tsx`. El módulo exporta el grupo, la opción y el indicador. Incluye Field y Form si la composición los utiliza. |
| Scroll Area | `scroll-area.tsx`. Utiliza las utilidades y tokens compartidos de Tailwind, sin un bloque de CSS de componente ni archivos de soporte propios. |
| Select | `select.tsx` y `select.module.css`, Check y Chevron con su helper SVG en `icons/index.tsx`. Si se copia el módulo de iconos completo, incluye también `icons/spinner.tsx` por su reexportación. Field y Form se incluyen según la composición. |
| Separator | `separator.tsx`. Usa Base UI, `clsx` y los tokens y utilidades compartidos de Tailwind. |
| Slider | `slider.tsx`. Usa las siete piezas de Base UI y las utilidades compartidas de Tailwind. Incluye Field o Form si el consumidor los utiliza para validación coordinada. |
| Switch | `switch.tsx`. Usa Base UI, `clsx` y los tokens y utilidades compartidos de Tailwind. Field y Form se incluyen según la composición. |
| Tabs | `tabs.tsx`. Usa Base UI, `clsx` y los tokens y utilidades compartidos de Tailwind. El consumidor aporta el contenido de los paneles. |
| Toast | `toast.tsx` y `toast.module.css`. Usa Base UI, `clsx` y las utilidades compartidas de Tailwind. El consumidor aporta el proveedor, la región y la composición que renderiza la cola. |
| Toggle | `toggle.tsx`. Usa Base UI, `clsx` y las utilidades compartidas de Tailwind. Los iconos y la agrupación pertenecen a la composición del consumidor. |
| Toggle Group | `toggle-group.tsx`. Usa Base UI, `clsx` y utilidades de distribución de Tailwind. Incluye `toggle.tsx` si el consumidor elige los botones de own-ui. |
| Toolbar | `toolbar.tsx`. Usa Base UI, `clsx` y las utilidades compartidas de Tailwind. Incluye las familias adicionales que el consumidor componga como herramientas. |
| Tooltip | `tooltip.tsx` y `tooltip.module.css`. Sus piezas envuelven Base UI. Incluye Button si la composición del consumidor lo utiliza. |

Al preparar una exportación, reúne las familias seleccionadas, sus dependencias transitivas, los módulos CSS importados y las reglas globales que consumen. Adapta los imports de soporte si distribuyes solo parte del módulo de iconos. Copia la carpeta de la skill con sus referencias y ajusta el índice a las familias entregadas o indica su disponibilidad. Verifica los enlaces relativos desde la carpeta copiada y registra la revisión y las versiones comprobadas.

### Iconos de soporte

`icons/index.tsx` define Chevron, Check, Minus, Plus y Close, y reexporta Spinner y `SpinnerProps` desde `icons/spinner.tsx`. Los componentes que importan `@/components/own/icons` requieren ambos archivos si conservas el índice original, incluso cuando solo usan un icono estático. Los seis son piezas de soporte compartidas y se documentan en una [referencia común](icons.md).

## Clasificación por familia

La unidad de clasificación es la familia propia y sus piezas, no el número de elementos HTML ni de partes de Base UI. La carpeta se determina por las dependencias de la definición, con este orden:

- **`dependant/`.** Requiere una librería externa especializada para su comportamiento principal. Esta categoría prevalece aunque la definición también use componentes de own-ui.
- **`composed/`.** Reutiliza internamente otra familia propia, incluso mediante un `render` predeterminado.
- **`base/`.** Envuelve una sola familia primitiva de Base UI y no depende de otras familias propias ni de un motor externo especializado.
- **`simple/`.** No requiere primitivas de Base UI ni librerías externas especializadas.
- Los iconos, tipos y helpers de soporte no constituyen por sí mismos una dependencia entre familias del catálogo.
- Recibir Button mediante `children` o `render` desde el consumidor no convierte al componente receptor en compuesto.

Radio Group se mantiene como una sola familia del catálogo en `base/`, aunque Base UI distribuya `RadioGroup` y `Radio` en módulos distintos.

Alert Dialog pertenece a `base/`: Trigger y Close envuelven las primitivas de su familia. El consumidor puede componerlos con Button y decidir sus variantes, sin fijar los botones dentro de la definición de Alert Dialog.

Checkbox Group también pertenece a `base/`. Su definición envuelve la primitiva de agrupación y recibe las casillas desde el consumidor. El mismo criterio se aplica a grupos y formularios cuando el consumidor aporta las piezas, como Menu dentro de Menubar. Usa la tabla de archivos necesarios para comprobar qué familias se incluyen en una exportación.

Input envuelve su primitiva de Base UI y puede registrarse en Field. FloatingInput pertenece a `composed/` porque su definición renderiza Input y Field de own-ui. Los módulos CSS se exportan junto a los componentes que los importan.

## Imports y composición

~~~tsx
import { FloatingInput } from "@/components/own/composed/floating-input";
import { Button } from "@/components/own/base/button";
import { Input } from "@/components/own/base/input";
import { Accordion, AccordionItem } from "@/components/own/base/accordion";
import {
  AlertDialog,
  AlertDialogClose,
} from "@/components/own/base/alert-dialog";
import { Chevron, Spinner } from "@/components/own/icons";
~~~

Estos ejemplos presuponen un alias `@/` que apunta a la raíz donde se ubica `components/`. Sustitúyelo por el alias o la ruta relativa real del consumidor. Usa los módulos concretos recibidos; no presupongas un barrel de todo `components/own/`.

La definición reutilizable controla sus piezas y estados internos. El consumidor controla su colocación, separación exterior, contenido y las opciones que la API deje abiertas. Un helper de una pantalla que compone Button con Alert Dialog pertenece a esa pantalla y no cambia la clasificación de ninguna de las dos familias.

## Integración del entorno y los estilos

Localiza la hoja global del consumidor e integra allí los bloques de own-ui descritos en [globals.md](globals.md), conservando los estilos existentes y resolviendo posibles colisiones de tokens. Importa esa hoja desde el layout raíz de App Router. Comprueba que Tailwind CSS v4 detecta las clases de los componentes exportados; si sus archivos quedan fuera de las fuentes detectadas, registra su ubicación con la configuración de fuentes del compilador.

La integración de referencia carga Plus Jakarta Sans mediante `next/font/google`, aplica su variable `--font-sans` a `html` y usa `font-sans text-content-bold antialiased` en `body`. Integra `next-themes` con `attribute="class"`, `defaultTheme="system"`, `enableSystem` y `disableTransitionOnChange`; coloca `suppressHydrationWarning` en `html`. Si el consumidor ya tiene esta configuración, reutilízala. Las piezas reutilizables no incluyen por sí solas la configuración del layout; [globals.md](globals.md) detalla cómo integrarla sin requerir un archivo del proyecto de origen.

Para Alert Dialog, el fondo absoluto necesita un contenedor de referencia que cubra la página; con el portal predeterminado en `body`, proporciona un contexto adecuado, por ejemplo `body { position: relative; }`. Aísla el apilamiento del contenido de aplicación, por ejemplo con `isolation: isolate`, dejando los portales fuera de ese contexto. Comprueba cobertura, orden visual y herencia de tema si cambias el contenedor del portal.

Conserva las directivas `"use client"` de los módulos recibidos y coloca el estado y los handlers de sus composiciones en una frontera cliente de App Router. Las páginas y el layout raíz pueden seguir siendo Server Components que renderizan esas piezas; incorporar un proveedor cliente no obliga a convertir todo el layout en cliente. Usa `next/link` para la navegación interna, también al componer Button mediante `render`.

## Extensión y verificación

Para una nueva familia, sigue el tipado del elemento nativo o de la primitiva instalada y los patrones de las familias recibidas. Los estilos actuales usan `components/own/classes.ts`, `clsx` y tipos o diccionarios de TypeScript. Consulta [globals.md](globals.md) para la resolución limitada de colores de texto. Documenta las props, estados, formas de estilo y límites reales de la implementación que se distribuya. Al ampliar el catálogo, vincula la referencia desde el índice y registra en esta guía los archivos requeridos. Incluye también la API de las piezas de soporte que se exporten.

Verifica imports, tipado y generación de utilidades con las herramientas del consumidor. Prueba las composiciones relevantes en una vista de su aplicación, incluidos ambos temas, foco, ancho disponible y estados afectados. La demostración define su disposición en sus contenedores.

Para el contrato y los estilos de cada familia, consulta el [índice de referencias por componente](../SKILL.md#componentes).
