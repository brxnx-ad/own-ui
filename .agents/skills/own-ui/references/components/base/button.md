# Button

## 1. Identificación

Button utiliza la primitiva `@base-ui/react/button`, `clsx` y el icono interno Spinner.

## 2. Propósito y casos de uso

Button representa acciones como guardar, cancelar o enviar un formulario. La primitiva aporta el comportamiento de botón y la gestión del foco. El consumidor aporta el texto, el icono y el handler de la acción. Para una navegación interna con apariencia de botón, compón la pieza con `next/link`.

## 3. Importación y anatomía

El módulo exporta `Button`, que renderiza un `button` por defecto, y los tipos `ButtonProps`, `ButtonVariant` y `ButtonSize`. Cuando hay icono o carga, el wrapper puede insertar un `span` interno para alojar el icono o Spinner.

```tsx
import { Button } from "@/components/own/base/button";

<Button type="submit">Guardar</Button>
```

## 4. Variantes y tamaños

Los valores predeterminados son `variant="primary"` y `size="md"`.

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

## 5. Props y callbacks

Las filas marcadas como propias amplían `ButtonPrimitive.Props`. El resto corresponde a la primitiva o a los atributos del elemento.

| Pieza | Prop o callback | Tipo | Predeterminado | Opcional | Función y condiciones |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Button | `variant` | `ButtonVariant` | `"primary"` | Sí | Prop propia de jerarquía visual. |
| Button | `size` | `ButtonSize` | `"md"` | Sí | Prop propia de dimensiones y densidad. |
| Button | `loading` | `boolean` | `false` | Sí | Prop propia que añade Spinner y activa la deshabilitación efectiva y `aria-busy`. |
| Button | `icon` | `ReactNode` | — | Sí | Prop propia para el icono del consumidor. Spinner ocupa su ranura durante la carga. |
| Button | `iconPosition` | `"start" \| "end"` | `"start"` | Sí | Prop propia de posición. El wrapper solo renderiza la ranura final si hay contenido. |
| Button | `disabled` | `boolean` | `false` | Sí | Impide activar la acción. |
| Button | `children` | `ReactNode` | — | Sí | Contenido y, habitualmente, nombre accesible. |
| Button | `type` | `"button" \| "submit" \| "reset"` | `"button"` | Sí | Comportamiento del botón nativo en formularios. |
| Button | `onClick` | `(event: BaseUIEvent<MouseEvent<HTMLButtonElement>>) => void` | — | Sí | Handler heredado de activación. El evento añade `preventBaseUIHandler()` a la interfaz de React. |
| Button | `focusableWhenDisabled` | `boolean` | `false` | Sí | Mantiene el acceso con teclado cuando está deshabilitado. La acción sigue bloqueada. |
| Button | `nativeButton` | `boolean` | `true` | Sí | Indica si `render` conserva un botón nativo. |
| Button | `render` | `ReactElement \| ((props, state) => ReactElement)` | Elemento nativo | Sí | Compone el comportamiento en un elemento. |
| Button | `className` | `string \| ((state) => string \| undefined)` | — | Sí | Tipo heredado. El wrapper incorpora únicamente cadenas en ejecución. |
| Button | `style` | `CSSProperties \| ((state) => CSSProperties \| undefined)` | — | Sí | Estilos directos o derivados del estado de Base UI. |
| Button | `ref` | `Ref<HTMLButtonElement>` | — | Sí | Referencia al nodo. Verifica que el elemento aportado por `render` admita la ref que necesita tu composición. |

## 6. Funcionamiento y estados

- El consumidor controla `loading` y `disabled`. La deshabilitación efectiva es `disabled || loading`. Gestiona el ciclo de la operación y sus errores en el consumidor.
- Durante la carga, Spinner sustituye al icono y el botón recibe `aria-busy`. La ausencia de contenido con icono o carga activa el tamaño cuadrado.
- El nodo principal tiene `data-slot="button"`, `data-variant`, `data-size` y, según el estado, `data-loading` y `data-disabled`. La ranura usa `data-slot="button-icon"` y el SVG de soporte usa `data-slot="spinner"`.
- El estado que Base UI pasa a `style` y `render` contiene `disabled`. Usa los atributos del nodo para seleccionar las opciones propias.

## 7. Estilos admitidos por pieza

Consulta [globals](../../globals.md) para los tokens y las utilidades compartidas.

| Necesidad | Aplicación aceptable |
| :--- | :--- |
| Jerarquía y tamaños estándar | Prioriza `variant` y `size`; conserva el sistema de estados existente. |
| Ancho y colocación | Usa clases aditivas como `className="w-full"`; centra y separa desde un contenedor con `flex`, `justify-center` y `gap-*`. |
| Medida específica | Usa `style`, por ejemplo `style={{ minWidth: "10rem" }}`. Si cambias altura o padding, revisa texto, icono y proporción óptica. |
| Colores y foco | Las superficies y tríadas de la tabla de variantes se resuelven por tema. El anillo usa `primary-base` o `error-base` para la variante destructiva y separación `surface-soft`. |
| Tipografía y geometría | El nodo usa `font-medium` y `rounded-base`. La ranura es un `span` que aplica `size-[1.15em]` a los SVG descendientes sin clase `size-*`. |
| Estados | Usa `data-[loading]:*`, `data-[disabled]:*`, `disabled:*`, `focus-visible:*` y los atributos propios `data-variant` y `data-size`, según el elemento y su estado real. |
| Animación | Transición de 150 ms en fondo, texto, borde, sombra, `transform` y opacidad. La compresión en `:active` habilitado usa `motion-safe:active:not-disabled:scale-[0.98]`. Tailwind v4 genera la propiedad individual `scale`, que queda fuera de la lista de transición actual. |
| Movimiento reducido | La compresión ya usa `motion-safe`. El wrapper conserva la transición base y Spinner usa `animate-spin`. Si el ajuste debe desactivar ambos, usa `motion-reduce:transition-none motion-reduce:[&_[data-slot=spinner]]:animate-none` en Button. |
| Elemento distinto | Usa `render`, propagando las props y `ref` recibidas si eliges la forma de función. |

El wrapper pasa `className` a `clsx` sin evaluar funciones y sin fusionar conflictos de Tailwind. Para un ajuste directo usa `style` sobre el nodo principal. Para estados y descendientes usa un selector con precedencia comprobada. El consumidor controla la separación exterior desde su contenedor.

## 8. Ejemplos de composición

Este fragmento recibe `pending` del estado del formulario. El ejemplo de solo icono usa Check, que debe estar incluido en los archivos de soporte del consumidor.

```tsx
import { Button } from "@/components/own/base/button";
import { Check } from "@/components/own/icons";

<div className="flex flex-wrap items-center gap-3">
  <Button icon={<Check aria-hidden="true" />} aria-label="Confirmar selección" />
  <Button loading={pending} type="submit" style={{ minWidth: "10rem" }}>
    {pending ? "Guardando…" : "Guardar"}
  </Button>
</div>
```

```tsx
import Link from "next/link";
import { Button } from "@/components/own/base/button";

<Button render={<Link href="/" />} nativeButton={false} role="link">
  Ir al inicio
</Button>
```

En una confirmación se puede componer Button con `AlertDialogClose render={<Button variant="secondary" />}`. Consulta el [ejemplo de Alert Dialog](alert-dialog.md#8-ejemplos-de-composición) para la estructura completa.

## 9. Accesibilidad e integración

- Tab alcanza los controles habilitados. Enter y Espacio activan un botón nativo. Un `Link` conserva la semántica y la navegación de un enlace.
- Da un nombre accesible al botón solo icono y marca el SVG decorativo con `aria-hidden`. En carga, un texto como «Guardando…» describe la operación.
- Conserva un indicador visible de foco. Con `render` funcional, propaga atributos, eventos y ref al mismo nodo DOM.
- En App Router, conserva `"use client"` en el módulo de Button y coloca los handlers y estados del consumidor en su frontera cliente. Para enviar un formulario, usa `type="submit"` dentro del formulario y gestiona allí la operación.

## 10. Límites y verificación

- Para un botón solo icono usa `iconPosition="start"`. Con `"end"` y sin contenido el wrapper omite la ranura.
- Usa cadenas para `className` y `render` para composición. Comprueba variantes, anchos con texto y con icono, carga, deshabilitación, foco y nombres accesibles en ambos temas.
