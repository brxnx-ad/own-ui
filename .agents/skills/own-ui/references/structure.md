# own-ui · Estructura y composición

## Ubicación de las piezas

El entorno de referencia es Next.js con App Router. Las rutas siguientes son convenciones del material exportado, relativas a la raíz del proyecto consumidor. Localiza primero los archivos recibidos y comprueba sus aliases. Si el destino usa `src/app/`, `src/components/` u otra organización dentro de Next.js, conserva esa estructura y ajusta los imports.

| Ruta convencional | Responsabilidad en el consumidor |
| :--- | :--- |
| `components/own/independant/` | Familias propias definidas sin reutilizar internamente componentes propios de otra familia. Verifica cuáles se han exportado al destino en la tabla de archivos necesarios. |
| `components/own/dependant/` | Familias propias que importan y reutilizan componentes propios de otra familia dentro de su definición. Solo se necesita si se incorporan familias de ese tipo. |
| `components/own/icons/` | Soporte SVG compartido: Chevron, Check, Minus, Plus, Close y Spinner. |
| `app/` o `src/app/` | Rutas, páginas y layouts del App Router del proyecto consumidor. Los ejemplos interactivos y componentes exclusivos de una vista se colocan cerca de ella. |
| `app/layout.tsx` o `src/app/layout.tsx` | Layout raíz: importa la hoja global e integra la fuente, el proveedor de temas y el apilamiento del contenido y los portales. |
| `components/shared/` o equivalente | Wrappers cliente compartidos, como un ThemeProvider de `next-themes`, cuando el consumidor necesite mantenerlos en un módulo propio. |
| `assets/styles/globals.css` | Fuente única de tokens, configuración de Tailwind, temas y utilidades visuales compartidas. |
| `.agents/skills/own-ui/` | Entrada `SKILL.md` y referencias de componentes, estructura y estilos de esta skill. |

Los nombres convencionales son `independant` y `dependant`. Si se conserva esta organización, conserva su escritura exacta en los imports. La ubicación real de los archivos determina cómo resolverlos en el consumidor.

## Compatibilidad y archivos necesarios

Las referencias de Button, Accordion y Alert Dialog parten de la revisión de origen `f48ed4e49171`. Las de Autocomplete y Avatar acompañan a `autocomplete.tsx` y `avatar.tsx` en sus respectivas distribuciones. En el consumidor, coteja la revisión registrada al exportar, el código recibido y los tipos instalados.

| Capa | Base de compatibilidad |
| :--- | :--- |
| Aplicación | Next.js 16.4.5 con App Router, React y React DOM 19.3.0. La navegación interna usa `next/link` y la fuente de referencia se carga con `next/font/google`. |
| Wrappers | `@base-ui/react` 1.9.0 y `clsx` 2.1.1. Los wrappers reciben referencias DOM como props de React 19. |
| Estilos y tema | Tailwind CSS v4 (4.3.4 en el origen) para generar las utilidades y `next-themes` 0.4.6 para aplicar el tema por clase. |

Comprueba la compatibilidad del entorno receptor al usar otras versiones. Consulta los tipos de la primitiva instalada para las opciones heredadas y distingue las dependencias de cada wrapper de la configuración compartida de la aplicación.

| Familia | Archivos propios y de soporte necesarios |
| :--- | :--- |
| Button | `button.tsx` y Spinner desde `icons/spinner.tsx`, con el módulo de exportación de iconos al que apunte su import. |
| Accordion | `accordion.tsx` y Chevron con su helper SVG, definidos en `icons/index.tsx`. Si se copia el módulo completo de iconos, incluye también los archivos que reexporta, como Spinner. |
| Alert Dialog | `alert-dialog.tsx`; su definición no importa otras familias propias ni iconos de soporte. Button solo es necesario si el consumidor lo elige para sus acciones. |
| Autocomplete | `autocomplete.tsx`, Chevron y Close con su helper SVG en `icons/index.tsx`. Si se copia el módulo de iconos completo, incluye también `icons/spinner.tsx` por su reexportación. |
| Avatar | `avatar.tsx`. El consumidor aporta la imagen y el contenido alternativo. |
| Checkbox | `checkbox.tsx`, Check y Minus con su helper SVG en `icons/index.tsx`. Si se copia el módulo de iconos completo, incluye también `icons/spinner.tsx` por su reexportación. |
| Checkbox Group | `checkbox-group.tsx`. Incluye Checkbox y sus iconos cuando el consumidor componga el grupo con las casillas de own-ui. |
| Collapsible | `collapsible.tsx` y Chevron con su helper SVG en `icons/index.tsx`. Si se copia el módulo completo de iconos, incluye también `icons/spinner.tsx` por su reexportación. |
| Combobox | `combobox.tsx`, Check, Chevron y Close con su helper SVG en `icons/index.tsx`. Si se copia el módulo completo de iconos, incluye también `icons/spinner.tsx` por su reexportación. |
| Context Menu | `context-menu.tsx`, Check y Chevron con su helper SVG en `icons/index.tsx`. Si se copia el módulo completo de iconos, incluye también `icons/spinner.tsx` por su reexportación. |
| Dialog | `dialog.tsx`. Los controles se eligen en la composición del consumidor. |
| Drawer | `drawer.tsx`. Sus piezas envuelven Base UI y los controles se eligen en la composición. |
| Field | `field.tsx`. Los controles adicionales y Base UI Form se incorporan según la composición. |
| Fieldset | `fieldset.tsx`. Los campos y controles se eligen en la composición. |
| FloatingInput | `dependant/floating-input.tsx`, `independant/input.tsx`, `independant/field.tsx` y el bloque de FloatingInput en `@layer components` de la hoja global. Para las transiciones de `FieldError`, incluye también el bloque de Field. |
| Form | `form.tsx`. Los campos, grupos y botones se eligen en la composición. |
| Input | `input.tsx`. Incluye Field cuando el consumidor utilice sus etiquetas, descripciones o validación coordinada. |
| Menu | `menu.tsx`, Check y Chevron con su helper SVG en `icons/index.tsx`. Si se copia el módulo completo de iconos, incluye también `icons/spinner.tsx` por su reexportación. |
| Menubar | `menubar.tsx`. Incluye Menu y sus archivos de soporte cuando el consumidor elija las piezas de own-ui para componer la barra. |
| Meter | `meter.tsx`. Sus piezas envuelven Base UI sin requerir iconos ni otras familias propias. |
| Navigation Menu | `navigation-menu.tsx` y Chevron con su helper SVG en `icons/index.tsx`. Si se copia el módulo completo de iconos, incluye también `icons/spinner.tsx` por su reexportación. |
| Number Field | `number-field.tsx`, Minus y Plus con su helper SVG en `icons/index.tsx`. Si se copia el módulo completo de iconos, incluye también `icons/spinner.tsx` por su reexportación. |
| OTP Field | `otp-field.tsx`. Sus piezas envuelven Base UI sin requerir iconos ni otras familias propias. Incluye Field si el consumidor utiliza su etiquetado y validación. |
| Popover | `popover.tsx`. Sus piezas envuelven Base UI. Incluye Button u otros controles si la composición del consumidor los utiliza. |
| Preview Card | `preview-card.tsx`. Sus piezas envuelven Base UI. El consumidor aporta los enlaces y el contenido de sus vistas previas. |
| Progress | `progress.tsx` y el bloque `own-ui-progress-sweep` de `@layer components` en la hoja global, incluido el selector de movimiento. |
| Radio Group | `radio-group.tsx`. El módulo exporta el grupo, la opción y el indicador. Incluye Field y Form si la composición los utiliza. |
| Scroll Area | `scroll-area.tsx`. Utiliza las utilidades y tokens compartidos de Tailwind, sin un bloque de CSS de componente ni archivos de soporte propios. |
| Select | `select.tsx`, Check y Chevron con su helper SVG en `icons/index.tsx`. Si se copia el módulo de iconos completo, incluye también `icons/spinner.tsx` por su reexportación. Field y Form se incluyen según la composición. |
| Tooltip | `tooltip.tsx`. Sus piezas envuelven Base UI sin requerir iconos ni bloques de CSS propios. Incluye Button si la composición del consumidor lo utiliza. |

Al preparar una exportación, reúne las familias seleccionadas, sus dependencias transitivas y los bloques de CSS que consumen. Adapta los imports de soporte si distribuyes solo parte del módulo de iconos. Copia la carpeta de la skill con sus referencias y ajusta el índice a las familias entregadas o indica su disponibilidad. Verifica los enlaces relativos desde la carpeta copiada y registra la revisión y las versiones comprobadas.

## Clasificación por familia

La unidad de clasificación es la familia propia y sus piezas, no el número de elementos HTML ni de partes de Base UI.

- **Independiente:** su definición se construye con las piezas de Base UI de la familia correspondiente, sin importar y reutilizar componentes propios de otra familia.
- **Dependiente:** su definición importa y reutiliza internamente un componente propio de otra familia. La dependencia existe también si ese uso es un `render` predeterminado que el consumidor puede sustituir.
- Los iconos, tipos y helpers de soporte no constituyen por sí mismos una dependencia entre familias del catálogo.
- Recibir Button mediante `children` o `render` desde el consumidor no convierte al componente receptor en dependiente.

Alert Dialog es independiente: Trigger y Close envuelven sus propias primitivas. El consumidor puede componerlos con Button y decidir sus variantes, sin fijar los botones dentro de la definición de Alert Dialog.

Checkbox Group también es independiente. Su definición envuelve la primitiva de agrupación y recibe las casillas desde el consumidor. El mismo criterio se aplica a grupos y formularios cuando el consumidor aporta las piezas, como Menu dentro de Menubar. Usa la tabla de archivos necesarios para comprobar qué familias se incluyen en una exportación.

Input envuelve su primitiva de Base UI y puede registrarse en Field. FloatingInput es dependiente porque su definición renderiza Input y Field de own-ui. Su bloque de estilos en `globals.css` forma parte de la exportación.

## Imports y composición

~~~tsx
import { FloatingInput } from "@/components/own/dependant/floating-input";
import { Button } from "@/components/own/independant/button";
import { Input } from "@/components/own/independant/input";
import { Accordion, AccordionItem } from "@/components/own/independant/accordion";
import {
  AlertDialog,
  AlertDialogClose,
} from "@/components/own/independant/alert-dialog";
import { Chevron, Spinner } from "@/components/own/icons";
~~~

Estos ejemplos presuponen un alias `@/` que apunta a la raíz donde se ubica `components/`. Sustitúyelo por el alias o la ruta relativa real del consumidor. Usa los módulos concretos recibidos; no presupongas un barrel de todo `components/own/`.

La definición reutilizable controla sus piezas y estados internos. El consumidor controla su colocación, separación exterior, contenido y las opciones que la API deje abiertas. Un helper de una pantalla que compone Button con Alert Dialog pertenece a esa pantalla y no cambia la clasificación de ninguna de las dos familias.

## Integración del entorno y los estilos

Localiza la hoja global del consumidor e integra allí los bloques de own-ui descritos en [globals.md](globals.md), conservando los estilos existentes y resolviendo posibles colisiones de tokens. Importa esa hoja desde el layout raíz de App Router. Comprueba que Tailwind CSS v4 detecta las clases de los componentes exportados; si sus archivos quedan fuera de las fuentes detectadas, registra su ubicación con la configuración de fuentes del compilador.

La integración de referencia carga Plus Jakarta Sans mediante `next/font/google`, aplica su variable `--font-sans` a `html` y usa `font-sans antialiased` en `body`. Integra `next-themes` con `attribute="class"`, `defaultTheme="system"`, `enableSystem` y `disableTransitionOnChange`; coloca `suppressHydrationWarning` en `html`. Si el consumidor ya tiene esta configuración, reutilízala. Las piezas reutilizables no incluyen por sí solas la configuración del layout; [globals.md](globals.md) detalla cómo integrarla sin requerir un archivo del proyecto de origen.

Para Alert Dialog, el fondo absoluto necesita un contenedor de referencia que cubra la página; con el portal predeterminado en `body`, proporciona un contexto adecuado, por ejemplo `body { position: relative; }`. Aísla el apilamiento del contenido de aplicación, por ejemplo con `isolation: isolate`, dejando los portales fuera de ese contexto. Comprueba cobertura, orden visual y herencia de tema si cambias el contenedor del portal.

Conserva las directivas `"use client"` de los módulos recibidos y coloca el estado y los handlers de sus composiciones en una frontera cliente de App Router. Las páginas y el layout raíz pueden seguir siendo Server Components que renderizan esas piezas; incorporar un proveedor cliente no obliga a convertir todo el layout en cliente. Usa `next/link` para la navegación interna, también al componer Button mediante `render`.

## Extensión y verificación

Para una nueva familia, sigue el tipado de la primitiva instalada y los patrones de las familias recibidas. Los estilos actuales se construyen con `clsx` y tipos o diccionarios de TypeScript. Documenta las props, estados, formas de estilo y límites reales de la implementación que se distribuya. Actualiza el índice y la referencia afectada al ampliar las familias distribuidas.

Verifica imports, tipado y generación de utilidades con las herramientas del consumidor. Prueba las composiciones relevantes en una vista de su aplicación, incluidos ambos temas, foco, ancho disponible y estados afectados. La demostración define su disposición en sus contenedores.

Para el contrato y los estilos de cada familia, consulta el [índice de referencias por componente](../SKILL.md#componentes).
