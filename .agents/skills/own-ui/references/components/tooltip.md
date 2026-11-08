# Tooltip

## 1. Identificación

Tooltip envuelve las piezas de `@base-ui/react/tooltip`, combina las clases del sistema con `clsx` y reexporta el proveedor de grupo y la fábrica de handles. [API de Base UI](https://base-ui.com/react/components/tooltip)

## 2. Propósito y casos de uso

Úsalo para presentar una indicación breve sobre la función de un control o su atajo de teclado cuando el usuario pasa el puntero o enfoca el elemento con Tab. La indicación permanece anclada al control sin desplazar el foco ni interrumpir el recorrido de teclado, y puede cerrarse con Escape.

Reserva su contenido para texto conciso de apoyo sin controles enfocables. Si necesitas enlaces, formularios o botones dentro del panel, usa [Popover](popover.md). Para mostrar un resumen visual del destino de un enlace antes de navegar, usa [Preview Card](preview-card.md).

## 3. Importación y anatomía

Adapta la ruta y el alias según la [referencia de estructura](../structure.md).

```tsx
import {
  createTooltipHandle,
  Tooltip,
  TooltipArrow,
  TooltipPopup,
  TooltipPortal,
  TooltipPositioner,
  TooltipProvider,
  TooltipTrigger,
  TooltipViewport,
} from "@/components/own/independant/tooltip";
```

| Exportación | Elemento | `data-slot` | Responsabilidad |
| :--- | :--- | :--- | :--- |
| `TooltipProvider` | Sin nodo propio | — | Comparte las demoras de apertura y cierre entre varios tooltips y abre de inmediato las indicaciones contiguas. |
| `Tooltip` | Sin nodo propio | — | Coordina el estado de apertura, el activador activo y su payload. |
| `TooltipTrigger` | `button` | `tooltip-trigger` | Abre el tooltip con puntero o foco visible y actúa como ancla predeterminada. |
| `TooltipPortal` | `div` portaleado a `body` por defecto | `tooltip-portal` | Monta el posicionador en el contenedor del portal. |
| `TooltipPositioner` | `div` | `tooltip-positioner` | Calcula la colocación, resuelve colisiones y gestiona la inercia del contenedor. |
| `TooltipPopup` | `div` | `tooltip-popup` | Presenta el contenido breve del tooltip con bordes, sombra y transiciones. |
| `TooltipArrow` | `div[aria-hidden="true"]` | `tooltip-arrow` | Flecha decorativa opcional orientada hacia el activador. |
| `TooltipViewport` | `div` | `tooltip-viewport` | Transiciona el contenido cuando varios activadores comparten el mismo tooltip. |
| `createTooltipHandle` | Sin nodo | — | Crea un handle tipado para asociar una raíz montada con activadores separados. |

El módulo también exporta `TooltipHandle<Payload>`, `TooltipProviderProps`, `TooltipProviderState`, `TooltipProps<Payload>`, `TooltipState`, `TooltipActions`, `TooltipChangeEventDetails`, `TooltipChangeEventReason`, `TooltipTriggerProps<Payload>`, `TooltipTriggerState` y los pares `Props` y `State` de `Portal`, `Positioner`, `Popup`, `Arrow` y `Viewport`.

Coloca `TooltipPositioner` dentro de `TooltipPortal` y `TooltipPopup` dentro del posicionador. Si incluyes `TooltipArrow` o `TooltipViewport`, colócalos como hijos directos de `TooltipPopup`. `TooltipProvider` puede envolver varios bloques `Tooltip` o una barra de acciones completa. El consumidor aporta el control activador y el texto de la indicación.

```tsx
<Tooltip>
  <TooltipTrigger>Guardar</TooltipTrigger>
  <TooltipPortal>
    <TooltipPositioner>
      <TooltipPopup>Guarda los cambios pendientes (Ctrl + S)</TooltipPopup>
    </TooltipPositioner>
  </TooltipPortal>
</Tooltip>
```

## 4. Variantes y tamaños

La familia carece de props propias de variante o tamaño. `TooltipPopup` se ajusta a su contenido con `w-fit`, padding `px-3 py-1.5` y tipografía `body-sm`, limitado a `min(20rem, var(--available-width))` de ancho y `var(--available-height)` de alto. Ajusta sus dimensiones con CSS cuando una instancia lo requiera. La colocación, el seguimiento del cursor y las demoras se configuran mediante props en la raíz, el proveedor, el activador y el posicionador. Al componer el activador con [Button](button.md), elige la variante y el tamaño en el propio botón.

## 5. Props y callbacks

| Pieza | Prop o callback | Tipo | Predeterminado | Opcional | Función y condiciones |
| :--- | :--- | :--- | :--- | :--- | :--- |
| TooltipProvider | `delay`, `closeDelay` | `number` | —, — | Sí | Demoras en milisegundos compartidas por los tooltips dentro del proveedor. |
| TooltipProvider | `timeout` | `number` | `400` | Sí | Tiempo en milisegundos tras cerrar un tooltip durante el cual otro del mismo proveedor abre sin espera. |
| Tooltip | `open`, `defaultOpen` | `boolean` | —, `false` | Sí | Estado controlado de apertura o valor inicial no controlado. |
| Tooltip | `onOpenChange` | `(open: boolean, details: TooltipChangeEventDetails) => void` | — | Sí | Recibe el estado solicitado y el motivo. `details.cancel()` cancela el cambio. |
| Tooltip | `onOpenChangeComplete` | `(open: boolean) => void` | — | Sí | Se ejecuta al finalizar la apertura o el cierre y sus transiciones. |
| Tooltip | `disabled` | `boolean` | `false` | Sí | Desactiva la apertura del tooltip para todos sus activadores. |
| Tooltip | `disableHoverablePopup` | `boolean` | `false` | Sí | Cierra el tooltip al abandonar el activador e impide mantenerlo abierto al pasar el puntero sobre el popup. |
| Tooltip | `trackCursorAxis` | `"none" \| "x" \| "y" \| "both"` | `"none"` | Sí | Hace que el posicionador siga las coordenadas del puntero en el eje elegido. |
| Tooltip | `triggerId`, `defaultTriggerId` | `string \| null` | —, `null` | Sí | Selecciona el activador asociado en modo controlado o en la apertura inicial. |
| Tooltip | `handle` | `TooltipHandle<Payload>` | — | Sí | Conecta una raíz montada con activadores externos. |
| Tooltip | `children` | `ReactNode \| ({ payload }: { payload: Payload \| undefined }) => ReactNode` | — | Sí | Recibe contenido estático o una función que renderiza según el `payload` del activador activo. |
| Tooltip | `actionsRef` | `React.RefObject<TooltipActions \| null>` | — | Sí | Expone `close()` y `unmount()` para concluir un cierre diferido. |
| TooltipTrigger | `id`, `handle`, `payload` | `string`, `TooltipHandle<Payload>`, `Payload` | ID generado, —, — | Sí | Identifica el activador, lo vincula con una raíz externa y entrega datos al popup. |
| TooltipTrigger | `delay`, `closeDelay` | `number` | `600`, `0` | Sí | Demoras en milisegundos para abrir con el puntero y cerrar al salir. Prevalecen sobre `TooltipProvider`. |
| TooltipTrigger | `closeOnClick` | `boolean` | `true` | Sí | Cierra el tooltip cuando el usuario pulsa el activador. Usa `false` para mantenerlo abierto tras el clic. |
| TooltipTrigger | `disabled` | `boolean` | `false` | Sí | Deshabilita la apertura del tooltip en este activador sin añadir `disabled` al botón subyacente. |
| TooltipPortal | `container` | `HTMLElement \| ShadowRoot \| ref \| null` | `body` | Sí | Selecciona el contenedor donde se monta el portal. |
| TooltipPortal | `keepMounted` | `boolean` | `false` | Sí | Conserva los nodos del portal en el DOM mientras el tooltip permanece cerrado. |
| TooltipPositioner | `anchor` | `Element \| VirtualElement \| ref \| función \| null` | Activador | Sí | Define otra referencia de anclaje si la composición lo requiere. |
| TooltipPositioner | `positionMethod` | `"absolute" \| "fixed"` | `"absolute"` | Sí | Selecciona la estrategia CSS de posicionamiento. |
| TooltipPositioner | `side`, `align` | `"top" \| "bottom" \| "left" \| "right" \| "inline-start" \| "inline-end"`, `"start" \| "center" \| "end"` | `"top"`, `"center"` | Sí | Define el lado y la alineación preferidos antes de resolver colisiones. |
| TooltipPositioner | `sideOffset`, `alignOffset` | `number \| OffsetFunction` | `8`, `0` | Sí | Separa el popup del ancla en cada eje en píxeles o mediante una función de medición. |
| TooltipPositioner | `collisionBoundary`, `collisionPadding` | `Boundary`, `Padding` | `"clipping-ancestors"`, `5` | Sí | Define el contorno de colisión y su separación mínima. |
| TooltipPositioner | `arrowPadding` | `number` | `5` | Sí | Distancia mínima en píxeles entre `TooltipArrow` y los extremos del popup. |
| TooltipPositioner | `collisionAvoidance` | `CollisionAvoidance` | Ajuste de Base UI | Sí | Configura el cambio de lado, el desplazamiento o la alternativa perpendicular. |
| TooltipPositioner | `sticky`, `disableAnchorTracking` | `boolean` | `false` | Sí | Mantiene el popup dentro de la vista al desplazarse el ancla o desactiva el seguimiento de layout. |
| Piezas con nodo | `className`, `style` | `string`, `CSSProperties` o funciones del estado | — | Sí | Añade clases o estilos inline al nodo de la pieza. |
| Piezas con nodo | `render`, `ref`, atributos y eventos HTML | Según la pieza | Elemento de anatomía, —, — | Sí | Compone el nodo o accede a su ref conservando atributos y eventos de Base UI. |

El valor `sideOffset = 8` es un ajuste de own-ui; el resto de opciones y callbacks provienen de Base UI.

`details.reason` puede ser `trigger-hover`, `trigger-focus`, `trigger-press`, `outside-press`, `escape-key`, `disabled`, `imperative-action` o `none`. El objeto `details` incluye el evento desencadenante, `trigger` cuando corresponde, `cancel()` y `preventUnmountOnClose()`. Si aplazas el desmontaje con `details.preventUnmountOnClose()`, invoca `actionsRef.current?.unmount()` cuando termine la animación externa.

`createTooltipHandle<Payload>()` devuelve un handle con `open(triggerId)`, `close()` e `isOpen`. Invoca `open(id)` o `close()` desde un evento o efecto mientras la raíz asociada esté montada; `triggerId` debe coincidir con un `TooltipTrigger` registrado con ese mismo handle.

## 6. Funcionamiento y estados

- El tooltip se abre tras `delay` al pasar un puntero de ratón o de forma inmediata al recibir foco visible de teclado (`:focus-visible`). Al pulsar el activador o presionar Escape se cierra y no vuelve a abrirse por foco en ese mismo elemento hasta que el foco o el puntero salgan y regresen, salvo que `closeOnClick` sea `false` para el clic.
- Precedencia de demora de apertura en hover: si `TooltipProvider` ya está en fase instantánea tras un tooltip previo, la demora es `0`; en caso contrario se usa `delay` de `TooltipTrigger`, luego `delay` de `TooltipProvider` y por último `600` ms. Para el cierre, `closeDelay` de `TooltipTrigger` prevalece sobre `closeDelay` de `TooltipProvider` y sobre `0` ms.
- Por defecto (`disableHoverablePopup = false` y `trackCursorAxis !== "both"`), Base UI traza un polígono seguro entre el activador y el popup para que el usuario pueda desplazar el puntero sobre el texto sin que se cierre. Cuando el tooltip está cerrado, o cuando `disableHoverablePopup` es `true` o `trackCursorAxis` es `"both"`, el posicionador recibe `inert`.
- En modo controlado, coordina `open` y `onOpenChange`. Si varios activadores comparten una raíz controlada, asigna un `id` a cada uno y actualiza `triggerId` con `details.trigger.id` cuando se abra.
- El portal desmonta su subárbol al completarse el cierre, salvo que `keepMounted` sea `true`. Cuando se cambia de activador con `TooltipViewport`, el contenido se remonta según el activador y su `payload` y el contenedor anterior se oculta.
- `TooltipTrigger` expone `data-popup-open` cuando el tooltip abierto le pertenece y `data-trigger-disabled` cuando está deshabilitado en el activador o en la raíz.
- `TooltipPositioner`, `TooltipPopup` y `TooltipArrow` exponen `data-open`, `data-closed`, `data-side` y `data-align`. `TooltipPositioner` añade `data-anchor-hidden` cuando el ancla sale del área visible. `TooltipArrow` añade `data-uncentered` cuando no puede centrarse respecto al ancla.
- `TooltipPopup` expone `data-starting-style` y `data-ending-style` durante las transiciones de entrada y salida. `TooltipPopup`, `TooltipArrow` y `TooltipViewport` exponen `data-instant` (`"delay"`, `"focus"` o `"dismiss"`), y el estado de `TooltipPositioner` usa `"tracking-cursor"` cuando `trackCursorAxis` no es `"none"`. `TooltipViewport` expone `data-transitioning` y `data-activation-direction`, e inserta contenedores internos con `data-current` y `data-previous`.

## 7. Estilos admitidos por pieza

| Pieza | Estilo base y ajustes |
| :--- | :--- |
| Provider y Tooltip | No generan nodos DOM. La disposición y la separación entre controles activadores pertenecen al contenedor del consumidor. |
| Trigger | Renderiza `button` sin clases visuales impuestas por el wrapper para evitar colisiones al componer con `render={<Button />}`. Aporta clases propias o compón con `Button`. |
| Portal | Monta el contenedor portaleado en `body` por defecto; hereda tokens y tema del destino. |
| Positioner | Usa `z-50`, `max-w-(--available-width)` y `data-anchor-hidden:invisible`. Si su popup contiene `TooltipViewport`, fija su ancho y alto a `--positioner-width` y `--positioner-height`. |
| Popup | Usa `body-sm`, `w-fit`, `min-w-0`, `max-w-[min(20rem,var(--available-width))]`, `max-h-(--available-height)`, `px-3 py-1.5`, `rounded-base`, `border border-gray-base`, `bg-surface-base`, `text-gray-bold` y `shadow-m`. Recorta el desborde con `overflow-hidden`, cambia a `overflow-visible` cuando contiene `TooltipArrow` y adopta `--popup-width` y `--popup-height` cuando contiene `TooltipViewport`. |
| Arrow | Cuadrado de `size-2` (`0.5rem`) con `pointer-events-none`, `border-t border-l border-gray-base bg-surface-base` y `data-uncentered:invisible`. Se desplaza `-0.25rem` y rota según `data-side`, incluidos `inline-start` e `inline-end` en LTR y RTL. |
| Viewport | Contenedor relativo con `min-w-0 overflow-hidden` que oculta `[data-previous]` y aplica una transición de opacidad de 150 ms sobre `[data-current]`. |

Los colores se adaptan automáticamente entre modo claro y oscuro mediante los tokens de [globals.css](../globals.md). Para cambiar el ancho máximo o el espaciado de un tooltip concreto, pasa `className` o `style` en `TooltipPopup` (por ejemplo, `<TooltipPopup style={{ maxWidth: "14rem" }}>`). Si personalizas el fondo o el borde de `TooltipPopup`, aplica el mismo color de superficie y borde en `TooltipArrow` para mantener la continuidad visual.

Las transiciones de `TooltipPopup` animan `opacity`, `scale`, `width` y `height` durante 150 ms (`ease-out`) con `origin-(--transform-origin)` bajo `motion-safe`, partiendo de `opacity-0` y `scale-95` en `data-starting-style` y `data-ending-style`. Cuando Base UI marca `data-instant` (apertura por foco, cierre con Escape/clic o paso inmediato dentro de `TooltipProvider`) o el sistema solicita movimiento reducido, las transiciones se omiten.

`TooltipPositioner`, `TooltipPopup`, `TooltipArrow` y `TooltipViewport` combinan `className` (cadena o función de estado) con `clsx` sin `tailwind-merge`. `TooltipTrigger` y `TooltipPortal` delegan sus props directamente a Base UI. Al usar `render`, conserva las referencias, atributos y handlers que entrega la primitiva.

## 8. Ejemplos de composición

Grupo de controles de formato con demora compartida y flecha opcional:

```tsx
import { Button } from "@/components/own/independant/button";
import {
  Tooltip,
  TooltipArrow,
  TooltipPopup,
  TooltipPortal,
  TooltipPositioner,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/own/independant/tooltip";

export function FormattingToolbar() {
  return (
    <TooltipProvider delay={250}>
      <div className="flex flex-wrap items-center gap-2">
        <Tooltip>
          <TooltipTrigger render={<Button variant="outline" size="sm" />}>
            Negrita
          </TooltipTrigger>
          <TooltipPortal>
            <TooltipPositioner>
              <TooltipPopup>
                <TooltipArrow />
                <span>Aplica énfasis fuerte (Ctrl + B)</span>
              </TooltipPopup>
            </TooltipPositioner>
          </TooltipPortal>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger render={<Button variant="outline" size="sm" />}>
            Cursiva
          </TooltipTrigger>
          <TooltipPortal>
            <TooltipPositioner>
              <TooltipPopup>
                <TooltipArrow />
                <span>Aplica énfasis en cursiva (Ctrl + I)</span>
              </TooltipPopup>
            </TooltipPositioner>
          </TooltipPortal>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}
```

Activadores separados que comparten una sola instancia de `Tooltip` mediante `createTooltipHandle` y `TooltipViewport`:

```tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/own/independant/button";
import {
  createTooltipHandle,
  Tooltip,
  TooltipPopup,
  TooltipPortal,
  TooltipPositioner,
  TooltipTrigger,
  TooltipViewport,
} from "@/components/own/independant/tooltip";

export function SharedHintActions() {
  const [handle] = useState(createTooltipHandle<string>);

  return (
    <>
      <div className="flex flex-wrap gap-2">
        <TooltipTrigger
          handle={handle}
          payload="Busca por título o etiqueta (Ctrl + K)"
          render={<Button variant="outline" />}
        >
          Buscar
        </TooltipTrigger>
        <TooltipTrigger
          handle={handle}
          payload="Descarga los resultados visibles en CSV"
          render={<Button variant="outline" />}
        >
          Exportar
        </TooltipTrigger>
      </div>
      <Tooltip handle={handle}>
        {({ payload }) => (
          <TooltipPortal>
            <TooltipPositioner>
              <TooltipPopup>
                <TooltipViewport>{payload}</TooltipViewport>
              </TooltipPopup>
            </TooltipPositioner>
          </TooltipPortal>
        )}
      </Tooltip>
    </>
  );
}
```

## 9. Accesibilidad e integración

- Proporciona siempre un nombre accesible propio a los botones de solo icono (`aria-label` o texto oculto visualmente); no dependas únicamente del tooltip como etiqueta única si el control puede usarse en pantallas táctiles.
- El foco de teclado abre el tooltip sin espera, Escape lo cierra sin retirar el foco del activador y el puntero puede recorrer el popup mientras `disableHoverablePopup` sea `false` y `trackCursorAxis` no sea `"both"`.
- Ten en cuenta que `disabled` en `TooltipTrigger` solo desactiva el tooltip; para deshabilitar el botón en sí, pasa `disabled` al elemento renderizado. Un `<button disabled>` nativo no recibe foco ni dispara eventos de puntero, por lo que no abrirá un tooltip por interacción directa.
- Si compones `TooltipTrigger` mediante `render`, usa un elemento enfocable por teclado (como `Button` o un enlace con `href`) y conserva las props, eventos y refs fusionados por Base UI.
- Con el portal predeterminado en `body`, asegúrate de que el contenedor raíz de la aplicación aísle su apilamiento (`isolation: isolate`) y de que el destino del portal herede el tema y las variables tipográficas según [structure.md](../structure.md).

## 10. Límites y verificación

Exporta `tooltip.tsx` junto con [los tokens compartidos de `globals.css`](../globals.md). La familia es independiente: no requiere iconos de soporte ni un bloque adicional en `@layer components`. Incluye `button.tsx` y su icono `Spinner` solo si el consumidor compone los activadores con `Button`. Coloca `createTooltipHandle`, estado controlado y callbacks en módulos con `"use client"`.

Verifica la apertura con puntero y con Tab, el cierre con Escape, la transición inmediata entre controles dentro de `TooltipProvider`, la orientación de `TooltipArrow` en cada `side`, el cambio de contenido con `TooltipViewport`, ambos temas y el respeto a `prefers-reduced-motion`.
