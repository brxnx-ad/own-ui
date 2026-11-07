# Button

Lee esta referencia para crear, consumir o ajustar acciones, botones con icono y estados de carga de own-ui.

El módulo convencional es `components/own/independant/button.tsx`. Localiza su archivo y resuelve el alias de los ejemplos en el proyecto consumidor mediante [estructura](../structure.md); comprueba la implementación distribuida antes de asumir cambios de API.

## Compatibilidad y archivos necesarios

Este contrato se comprobó en Next.js 16.4.5 con React y React DOM 19.3, Base UI 1.9.0, `clsx` 2.1.1, Tailwind CSS v4 y tipos de React 19. Son versiones de referencia, no una obligación de fijarlas exactamente en todo proyecto consumidor; valida las versiones compatibles del destino. El wrapper usa refs como props de React 19.

La definición requiere `button.tsx`, el Spinner de soporte y los tokens y utilidades descritos en [globals](../globals.md). Resuelve su import de `own/icons` hacia los archivos exportados. Si conservas el barrel `icons/index.tsx`, conserva sus definiciones SVG y el módulo `spinner.tsx` que reexporta; si distribuyes solo Spinner, adapta ese import y las exportaciones al subconjunto disponible.

En App Router, conserva `"use client"` en el wrapper y define handlers, hooks y estados del consumidor en un módulo cliente. Las páginas y layouts pueden seguir siendo componentes de servidor y delegar esa interacción a piezas cliente; no conviertas toda la página en cliente por utilizar Button.

## Propósito y composición

Button representa una acción y delega comportamiento de botón y foco a `@base-ui/react/button`. Tiene una sola pieza pública, `Button`, y exporta los tipos `ButtonProps`, `ButtonVariant` y `ButtonSize`.

```tsx
"use client";

import { Button } from "@/components/own/independant/button";

<Button onClick={save}>Guardar</Button>
```

`save` representa el handler del consumidor. Para enviar un formulario, usa `type="submit"`. Para navegación, compón con un enlace y conserva su semántica. El consumidor decide cuántos botones necesita, sus acciones y cómo separarlos.

Es independiente: el Spinner de `own/icons` es soporte compartido, no otra familia del catálogo. Consultar [estructura](../structure.md) para el criterio completo.

## Variantes y dimensiones

| `variant` | Uso | Reposo | Hover y active |
| :--- | :--- | :--- | :--- |
| `primary` | Acción principal. | `bg-primary-base text-white`. | `bg-primary-bold`. |
| `secondary` | Acción secundaria delimitada. | `bg-surface-base border-gray-base text-gray-bold`. | `bg-surface-bold`. |
| `outline` | Acción delimitada sobre su entorno. | Fondo transparente, `border-gray-base`. | `bg-surface-bold`. |
| `ghost` | Acción de baja jerarquía. | Fondo y borde transparentes. | `bg-surface-bold`. |
| `destructive` | Acción destructiva explícita. | `bg-error-soft border-error-base text-error-bold`. | `bg-error-base text-white`. |

Todas comparten un borde de 1px para conservar sus medidas al cambiar de variante.

| `size` | Botón con contenido | Solo icono o carga sin contenido |
| :--- | :--- | :--- |
| `sm` | `h-8 px-3 gap-1.5 text-xs`. | `size-8 px-0 text-xs`. |
| `md` | `h-10 px-4 gap-2 text-sm`. | `size-10 px-0 text-sm`. |
| `lg` | `h-12 px-6 gap-2.5 text-base`. | `size-12 px-0 text-base`. |

La detección de solo icono usa `!children && Boolean(icon || loading)`. Para una acción con texto, proporciona contenido no vacío; para un botón solo icono, omite `children` y define un nombre accesible.

## Props principales

Las props propias se añaden a `ButtonPrimitive.Props`; atributos HTML, ARIA, eventos y `ref` se propagan al elemento.

| Prop | Tipo | Predeterminado | Función |
| :--- | :--- | :--- | :--- |
| `variant` | `"primary" \| "secondary" \| "outline" \| "ghost" \| "destructive"` | `"primary"` | Jerarquía visual. |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Altura, padding, separación y tipografía. |
| `loading` | `boolean` | `false` | Añade Spinner, deshabilita y activa `aria-busy`. |
| `disabled` | `boolean` | `false` | Impide activar la acción. |
| `icon` | `ReactNode` | — | Icono del consumidor, sustituido por Spinner durante la carga. |
| `iconPosition` | `"start" \| "end"` | `"start"` | Posición del icono o Spinner cuando hay contenido. |
| `children` | `ReactNode` | — | Contenido del botón. |
| `type` | `"button" \| "submit" \| "reset"` | `"button"` | Comportamiento nativo en formularios. |
| `focusableWhenDisabled` | `boolean` | `false` | Permite alcanzar un botón deshabilitado con teclado; la acción sigue bloqueada. |
| `render` | `ReactElement \| (props, state) => ReactElement` | `<button>` | Composición o sustitución del elemento. |
| `nativeButton` | `boolean` | `true` | Indica si el elemento de `render` es un botón nativo. |
| `className` | Cadena utilizable por el wrapper | — | Añade clases; ver la limitación funcional abajo. |
| `style` | `CSSProperties \| (state) => CSSProperties` | — | Estilos directos o dependientes del estado de Base UI. |

Aunque el tipo heredado permite `className` funcional, el wrapper actual lo entrega a `clsx` y no evalúa esa función. Usa cadenas, atributos de estado o `style` funcional. El estado de Base UI en Button contiene `disabled`; no incluye `variant`, `size` ni `loading` propios.

## Funcionamiento y accesibilidad

- La deshabilitación efectiva es `disabled || loading`.
- `loading` añade `data-loading`, `aria-busy` y un Spinner decorativo. Mantén un texto útil, como «Guardando…», para describir la operación.
- El foco visible lleva anillo primario; `destructive` usa el token de error. Conserva un indicador visible al personalizarlo.
- Tab recorre botones disponibles; Enter y Espacio activan un botón nativo. Los enlaces conservan su interacción de navegación.
- El botón solo icono necesita `aria-label` o un nombre accesible equivalente; sus SVG decorativos deben tener `aria-hidden`.
- Los SVG de la ranura sin clase `size-*` reciben `size-[1.15em]` para escalar con el texto. Un SVG con `size-*` controla su tamaño explícitamente.
- En el wrapper actual, un botón solo icono con `iconPosition="end"` no renderiza la ranura. Para este caso, conserva `iconPosition="start"`.

```tsx
import { Check } from "@/components/own/icons";

<Button icon={<Check />} aria-label="Confirmar selección" />
<Button loading={pending} type="submit">
  {pending ? "Guardando…" : "Guardar"}
</Button>
```

`pending` es estado del consumidor. El ejemplo de icono requiere que el destino incluya Check, o que lo sustituya por un icono propio con nombre de import válido. Deshabilitar la interfaz no sustituye la protección del handler contra operaciones duplicadas cuando esa protección sea necesaria.

## Formas de aplicar estilos

Consulta [globals](../globals.md) para los tokens y las utilidades compartidas.

| Necesidad | Aplicación aceptable |
| :--- | :--- |
| Jerarquía y tamaños estándar | Prioriza `variant` y `size`; conserva el sistema de estados existente. |
| Ancho y colocación | Usa clases aditivas como `className="w-full"`; centra y separa desde un contenedor con `flex`, `justify-center` y `gap-*`. |
| Medida específica | Usa `style`, por ejemplo `style={{ minWidth: "10rem" }}`. Si cambias altura o padding, revisa texto, icono y proporción óptica. |
| Colores | Consume superficies y tríadas semánticas; evita paletas Tailwind numéricas o colores arbitrarios para una variante del catálogo. |
| Estados | Usa `data-[loading]:*`, `data-[disabled]:*`, `disabled:*`, `focus-visible:*` y los atributos propios `data-variant` y `data-size`, según el elemento y su estado real. |
| Animación | Transición base de 150ms en color, borde, sombra, transform y opacidad; compresión `scale-[0.98]` solo con `motion-safe` durante active habilitado. |
| Movimiento reducido | Cualquier animación añadida debe respetarlo. Para eliminar también las transiciones de color cuando se solicite, añade `motion-reduce:transition-none`; el wrapper no la incluye de base. |
| Elemento distinto | Usa `render`, propagando las props y `ref` recibidas si eliges la forma de función. |

Las clases se concatenan con `clsx`; no existe fusión mediante `tailwind-merge`. Poner una clase después de otra en `className` no garantiza que sobrescriba una utilidad en conflicto. Para un ajuste puntual determinista, usa `style`; para estados o pseudo-elementos, usa selectores con precedencia comprobada o utilidades importantes de Tailwind v4 cuando sean necesarias. Para una variante reutilizable autorizada, modifica su diccionario tipado en el componente.

```tsx
<div className="flex flex-wrap justify-center gap-3">
  <Button variant="secondary">Cancelar</Button>
  <Button className="w-full sm:w-auto" style={{ minWidth: "10rem" }}>
    Confirmar
  </Button>
</div>
```

La geometría propia usa `rounded-base`. Un componente del catálogo no añade márgenes exteriores para ubicarse; el padre controla esa separación.

## Composición como enlace y con otras primitivas

```tsx
import Link from "next/link";
import { Button } from "@/components/own/independant/button";

<Button render={<Link href="/" />} nativeButton={false} role="link">
  Ir al inicio
</Button>
```

Link conserva la navegación de Next.js y la semántica de enlace; `nativeButton={false}` y `role="link"` evitan tratarlo como botón nativo. Propaga los atributos y eventos del componente al personalizar `render`.

Componer con `render` permite compartir apariencia sin crear botones anidados. En Alert Dialog, por ejemplo, el consumidor puede usar `AlertDialogClose render={<Button variant="secondary" />}`. Esa combinación en el uso no cambia la independencia de Button ni la de Alert Dialog.

## Al verificar cambios

Comprueba variantes afectadas, medidas con texto y solo icono, carga/deshabilitación, foco y nombres accesibles. Revisa ambos temas y el ancho donde la acción deba ajustarse. No inventes una prop `asChild`: la composición pública es `render`.
