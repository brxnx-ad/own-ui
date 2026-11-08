# Popover

## 1. Identificación

Popover envuelve la familia de `@base-ui/react/popover`, combina las clases de presentación con `clsx` y reexporta su fábrica de handles. [API de Base UI](https://base-ui.com/react/components/popover)

## 2. Propósito y casos de uso

Usa Popover para mostrar información contextual, editar un dato breve o presentar un conjunto pequeño de controles cerca de su activador. El panel se posiciona respecto a un ancla y se puede cerrar desde el contenido, con Escape o mediante interacción exterior según el modo.

Usa [Menu](menu.md) si la interacción es una lista de comandos que requiere navegación de menú. Usa [Dialog](dialog.md) para tareas que conviene presentar en una ventana independiente del activador.

## 3. Importación y anatomía

Resuelve el alias y la ubicación del módulo en el consumidor según la [referencia de estructura](../../structure.md).

```tsx
import {
  createPopoverHandle,
  Popover,
  PopoverBackdrop,
  PopoverClose,
  PopoverDescription,
  PopoverPopup,
  PopoverPortal,
  PopoverPositioner,
  PopoverTitle,
  PopoverTrigger,
  PopoverViewport,
} from "@/components/own/base/popover";
```

| Exportación | Elemento | `data-slot` | Responsabilidad |
| :--- | :--- | :--- | :--- |
| `Popover` | Sin nodo propio | — | Comparte el estado, la configuración y el activador. |
| `PopoverTrigger` | `button` | `popover-trigger` | Abre el panel y sirve de ancla predeterminada. |
| `PopoverPortal` | `div` portaleado a `body` por defecto | `popover-portal` | Aloja el fondo y el posicionador en el destino del portal. |
| `PopoverBackdrop` | `div` | `popover-backdrop` | Atenúa visualmente el resto de la página. |
| `PopoverPositioner` | `div` | `popover-positioner` | Calcula la posición, las colisiones y el espacio disponible. |
| `PopoverPopup` | `div[role="dialog"]` | `popover-popup` | Presenta el contenido y coordina el foco. |
| `PopoverViewport` | `div` | `popover-viewport` | Gestiona la transición de contenido entre activadores de un mismo panel. |
| `PopoverTitle` | `h2` | `popover-title` | Nombra el diálogo. |
| `PopoverDescription` | `p` | `popover-description` | Aporta una descripción accesible. |
| `PopoverClose` | `button` | `popover-close` | Cierra el panel. |
| `createPopoverHandle` | Sin nodo | — | Crea un handle tipado para una raíz y sus activadores separados. |

El módulo también exporta `PopoverHandle<Payload>`, `PopoverProps<Payload>`, `PopoverActions`, `PopoverChangeEventDetails`, `PopoverTriggerProps<Payload>` y los tipos `PopoverPortalProps`, `PopoverBackdropProps`, `PopoverPositionerProps`, `PopoverPopupProps`, `PopoverViewportProps`, `PopoverTitleProps`, `PopoverDescriptionProps` y `PopoverCloseProps`.

Coloca `PopoverPositioner` bajo `PopoverPortal` y `PopoverPopup` dentro del posicionador. El fondo opcional es hermano del posicionador. Si usas el viewport, colócalo como hijo directo del popup para aplicar los estilos de transición. La aplicación decide el contenido y la presentación de los botones.

```tsx
<Popover>
  <PopoverTrigger>Ver detalles</PopoverTrigger>
  <PopoverPortal>
    <PopoverPositioner>
      <PopoverPopup>
        <PopoverTitle>Detalles del informe</PopoverTitle>
        <PopoverDescription>Incluye los registros de la última semana.</PopoverDescription>
        <PopoverClose>Cerrar</PopoverClose>
      </PopoverPopup>
    </PopoverPositioner>
  </PopoverPortal>
</Popover>
```

## 4. Variantes y tamaños

La familia carece de props propias de variante y tamaño. El popup tiene un ancho base de `20rem` limitado por el espacio disponible. Ajusta sus dimensiones con CSS. Los modos `false`, `true` y `"trap-focus"` de `modal` cambian la interacción, y el lado y la alineación se definen en el posicionador. Al componer con [Button](button.md), elige la variante y tamaño de cada acción en el consumidor.

## 5. Props y callbacks

| Pieza | Prop o callback | Tipo | Predeterminado | Opcional | Función y condiciones |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Popover | `open`, `defaultOpen` | `boolean` | —, `false` | Sí | Estado controlado o apertura inicial no controlada. |
| Popover | `onOpenChange` | `(open: boolean, details: PopoverChangeEventDetails) => void` | — | Sí | Recibe el estado solicitado y el evento. `details.cancel()` cancela el cambio de la primitiva. |
| Popover | `onOpenChangeComplete` | `(open: boolean) => void` | — | Sí | Se ejecuta al terminar el cambio de apertura o cierre y las animaciones asociadas. |
| Popover | `modal` | `boolean \| "trap-focus"` | `false` | Sí | Configura la interacción exterior y la contención de foco. Monta `PopoverClose` dentro del popup para contener el foco y ofrecer una salida. |
| Popover | `triggerId`, `defaultTriggerId` | `string \| null` | — | Sí | Elige el activador asociado a la apertura controlada o inicial, respectivamente. |
| Popover | `handle` | `PopoverHandle<Payload>` | — | Sí | Conecta la raíz montada con activadores externos. |
| Popover | `children` | `ReactNode \| ({ payload }: { payload: Payload \| undefined }) => ReactNode` | — | Sí | Recibe contenido fijo o renderiza según el activador activo. |
| Popover | `actionsRef` | `React.RefObject<PopoverActions \| null>` | — | Sí | Expone `close()` y `unmount()` para terminar un cierre aplazado. |
| PopoverTrigger | `id`, `handle`, `payload` | `string`, `PopoverHandle<Payload>`, `Payload` | ID generado, —, — | Sí | Identifica el activador, lo vincula con una raíz externa y aporta datos al contenido. |
| PopoverTrigger | `openOnHover`, `delay`, `closeDelay` | `boolean`, `number`, `number` | `false`, `300`, `0` | Sí | Añade apertura con el puntero. Los tiempos se expresan en ms y requieren `openOnHover`. |
| Trigger y Close | `nativeButton`, `disabled` | `boolean` | `true`, `false` | Sí | Conserva la semántica al sustituir el botón mediante `render` o deshabilita el control. |
| PopoverPortal | `container` | `HTMLElement \| ShadowRoot \| ref \| null` | `body` | Sí | Elige el destino del portal. |
| PopoverPortal | `keepMounted` | `boolean` | `false` | Sí | Conserva el portal y sus hijos mientras el popup está cerrado. |
| PopoverPositioner | `anchor` | `Element \| VirtualElement \| ref \| función \| null` | Activador | Sí | Usa un elemento, referencia, función o ancla virtual para colocar el popup. |
| PopoverPositioner | `positionMethod` | `"absolute" \| "fixed"` | `"absolute"` | Sí | Selecciona la estrategia CSS de posicionamiento. |
| PopoverPositioner | `side`, `align` | `"top" \| "bottom" \| "left" \| "right" \| "inline-start" \| "inline-end"`, `"start" \| "center" \| "end"` | `"bottom"`, `"center"` | Sí | Indica la posición preferida, sujeta a colisiones. |
| PopoverPositioner | `sideOffset`, `alignOffset` | `number \| OffsetFunction` | `8`, `0` | Sí | Separa el panel en cada eje. La función recibe `side`, `align` y las dimensiones de `anchor` y `positioner`. |
| PopoverPositioner | `collisionBoundary`, `collisionPadding` | `Boundary`, `Padding` | `"clipping-ancestors"`, `5` | Sí | Determina los límites del posicionamiento y la separación de sus bordes. |
| PopoverPositioner | `collisionAvoidance` | `CollisionAvoidance` | Ajuste de Base UI con alternativa perpendicular hacia el final | Sí | Configura `side`, `align` y `fallbackAxisSide` para cambiar de lado, desplazar el panel o preservar la posición. |
| PopoverPositioner | `sticky`, `disableAnchorTracking` | `boolean` | `false` | Sí | Ajusta la colocación cuando el ancla sale de la vista o desactiva el seguimiento de sus cambios de layout. |
| PopoverPopup | `initialFocus`, `finalFocus` | `boolean \| ref \| (interaction) => HTMLElement \| boolean \| null \| void` | Según la interacción | Sí | `false` conserva el foco actual y `true` aplica el comportamiento base. La función recibe `mouse`, `touch`, `pen` o `keyboard`. |
| Piezas con nodo | `className`, `style` | `string`, `CSSProperties` o funciones del estado | — | Sí | Personaliza el nodo de cada pieza. |
| Piezas con nodo | `render`, `ref`, atributos y eventos HTML | Según la pieza | Elemento de anatomía, —, — | Sí | Compone el nodo o añade atributos. Conserva la semántica y la ref. |

El valor predeterminado de `sideOffset` es un ajuste de own-ui. Las props de interacción y los callbacks se heredan de Base UI. `OffsetFunction`, `Boundary`, `Padding` y `CollisionAvoidance` se infieren desde `PopoverPositionerProps`.

`details.reason` puede ser `trigger-hover`, `trigger-focus`, `trigger-press`, `outside-press`, `escape-key`, `close-press`, `focus-out`, `imperative-action` o `none`. El detalle aporta el evento y, cuando está disponible, `trigger`. `details.allowPropagation()` permite propagar eventos que Base UI detendría. Para controlar una animación de salida externa, llama a `details.preventUnmountOnClose()` en el cierre y después a `actionsRef.current?.unmount()` cuando termine la animación. `keepMounted` determina si se retira el DOM.

`createPopoverHandle<Payload>()` devuelve un handle con `open(triggerId)`, `close()` e `isOpen`. Invoca los métodos desde un evento o efecto. `open(id)` requiere un activador con ese ID y el mismo handle. Los métodos tienen efecto mientras la raíz asociada esté montada.

## 6. Funcionamiento y estados

- Usa `defaultOpen` para el estado inicial y `open` con `onOpenChange` para el modo controlado. Con varios activadores controlados, asigna un `id` a cada uno y actualiza `triggerId` al abrir con el ID de `details.trigger`. La colocación puede seguir un `anchor` explícito.
- En modo base se permite interactuar con el resto de la página. `modal={true}` bloquea la interacción exterior y contiene el foco con un `PopoverClose` montado. En escritorio también bloquea el desplazamiento. En pantallas táctiles el bloqueo del scroll depende del ancho del panel. `modal="trap-focus"` mantiene Tab dentro del popup y permite puntero y desplazamiento exteriores.
- El portal suele desmontar su contenido al finalizar el cierre. Con `keepMounted`, las piezas permanecen ocultas y conservan su estado. El viewport puede remontar su contenido al cambiar de activador. Conserva fuera del viewport el estado que deba sobrevivir a ese cambio.
- El activador expone `data-popup-open`, `data-pressed` y `data-disabled`. Positioner, Popup y Backdrop exponen `data-open` y `data-closed`. Positioner y Popup reflejan `data-side` y `data-align`. Positioner aporta `data-anchor-hidden`.
- Popup y Backdrop usan `data-starting-style` y `data-ending-style`. Popup y Viewport exponen `data-instant` para cambios inmediatos. Viewport aporta `data-transitioning` y `data-activation-direction`. Sus contenedores directos tienen `data-current` o `data-previous`, con atributos de inicio o salida durante la transición.

## 7. Estilos admitidos por pieza

| Pieza | Estilo base y ajustes |
| :--- | :--- |
| Popover | La raíz comparte estado sin crear un nodo visual. |
| Trigger y Close | Conservan el elemento y los estados de Base UI. Proporciona clases o compón con `render` para aplicar los estilos de acción. |
| Portal | Proporciona el contenedor de las piezas portaleadas. El destino define su contexto visual y de apilamiento. |
| Backdrop | Cubre el viewport con `fixed inset-0 z-40`, `gray-bold/40` en claro y `surface-soft/70` en oscuro. Usa `pointer-events-none`. El modo de la raíz gestiona el bloqueo exterior. |
| Positioner | Usa `z-50` y limita su ancho a `--available-width`. Oculta el panel con `data-anchor-hidden`. Si se usa `sticky` y el diseño debe mantener el panel visible cuando el ancla queda oculta, ajusta `visibility` en este nodo. |
| Popup | Columna con `gap-2`, `p-4`, `rounded-base`, borde `gray-base`, `surface-base` y `shadow-m`. Limita su ancho y altura a `--available-width` y `--available-height`. Usa un anillo `primary-base` cuando el popup recibe foco visible. |
| Viewport | Contenedor relativo con desplazamiento vertical y recorte durante el cambio de contenido. Si es hijo directo del popup, este usa `--popup-height` y el posicionador fija sus dimensiones a `--positioner-width` y `--positioner-height` para estabilizar la colocación. |
| Title y Description | `h4` en apariencia para el título y `body-sm` para la descripción. Usan `gray-bold` y `gray-bold/75` respectivamente, con quiebre de texto largo. |

El popup desplaza su contenido cuando supera la altura disponible. Usa el viewport para transicionar el contenido entre activadores. Si añades otro contenedor desplazable, deja espacio para los anillos de foco de sus controles.

La apertura y el cierre usan 150 ms de opacidad y escala, con origen `--transform-origin`. El fondo cambia de opacidad. Al cambiar de activador, el viewport oculta de inmediato el contenido anterior y anima la entrada del nuevo. El alto del popup puede transicionar con el viewport. Las transiciones se activan con movimiento permitido. Los cambios instantáneos del popup y el contenido del viewport omiten las transiciones. `data-instant="trigger-change"` permite que el contenido nuevo complete su transición.

Los colores heredan los tokens claro y oscuro de [globals.css](../../globals.md). `className` admite una cadena o una función del estado y los wrappers estilizados combinan su resultado con `clsx`. El orden de clases no resuelve conflictos entre utilidades. `style` admite un objeto o una función del estado y actúa en el nodo correspondiente. Por ejemplo, `<PopoverPopup style={{ width: "18rem" }}>` cambia el ancho base y conserva el límite disponible. `render` compone el nodo. Conserva los estilos de posición y las variables que aporta Base UI al modificar el posicionador.

## 8. Ejemplos de composición

Panel modal con fondo visual, una acción de cierre y botones compuestos desde el consumidor.

```tsx
import { Button } from "@/components/own/base/button";
import {
  Popover,
  PopoverBackdrop,
  PopoverClose,
  PopoverDescription,
  PopoverPopup,
  PopoverPortal,
  PopoverPositioner,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/own/base/popover";

export function MaintenanceNotice() {
  return (
    <Popover modal>
      <PopoverTrigger render={<Button variant="outline" />}>Ver horario</PopoverTrigger>
      <PopoverPortal>
        <PopoverBackdrop />
        <PopoverPositioner align="start">
          <PopoverPopup>
            <PopoverTitle>Mantenimiento programado</PopoverTitle>
            <PopoverDescription>El servicio se actualizará el viernes a las 18:00.</PopoverDescription>
            <PopoverClose className="self-start" render={<Button variant="secondary" />}>Cerrar</PopoverClose>
          </PopoverPopup>
        </PopoverPositioner>
      </PopoverPortal>
    </Popover>
  );
}
```

Dos activadores separados comparten un handle y cambian el contenido del panel. El estado conserva una instancia del handle por montaje.

```tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/own/base/button";
import {
  createPopoverHandle,
  Popover,
  PopoverPopup,
  PopoverPortal,
  PopoverPositioner,
  PopoverTitle,
  PopoverTrigger,
  PopoverViewport,
} from "@/components/own/base/popover";

export function WorkspacePopover() {
  const [handle] = useState(createPopoverHandle<string>);

  return (
    <>
      <PopoverTrigger handle={handle} payload="Solicitudes abiertas" render={<Button />}>Solicitudes</PopoverTrigger>
      <PopoverTrigger handle={handle} payload="Cambios recientes" render={<Button />}>Cambios</PopoverTrigger>
      <Popover handle={handle}>
        {({ payload }) => (
          <PopoverPortal>
            <PopoverPositioner>
              <PopoverPopup>
                <PopoverViewport>
                  <PopoverTitle>{payload ?? "Espacio de trabajo"}</PopoverTitle>
                </PopoverViewport>
              </PopoverPopup>
            </PopoverPositioner>
          </PopoverPortal>
        )}
      </Popover>
    </>
  );
}
```

## 9. Accesibilidad e integración

- Usa `PopoverTitle` para nombrar el diálogo o configura `aria-label` en el popup. `PopoverDescription` vincula un resumen breve. Da un nombre accesible a los botones que muestran solo un icono.
- Un activador nativo admite Enter y Espacio. El popup permite Escape y gestiona el retorno de foco según el motivo y `finalFocus`. Por defecto, al abrir con teclado o ratón el foco va a un control interno o al panel, y al abrir con toque queda en el panel. La apertura por hover conserva el foco actual.
- Monta `PopoverClose` dentro del popup en ambos modos de contención. Si usas `render`, propaga atributos, eventos y refs al elemento interactivo. Indica `nativeButton={false}` para un activador o cierre no nativo.
- Con el portal predeterminado, conserva tema y estilos en `body` y aísla el apilamiento de la aplicación según [estructura](../../structure.md). Para un destino personalizado, comprueba límites de desborde y visibilidad del fondo. Con ShadowRoot, carga allí los estilos y verifica la herencia de los tokens.

## 10. Límites y verificación

Exporta `popover.tsx` desde `base/` con [los tokens compartidos](../../globals.md). La familia usa clases del módulo sin CSS específico ni iconos de soporte. Incluye Button u otros controles si el consumidor los elige. Coloca callbacks, referencias y handles en una frontera cliente de App Router.

Comprueba colocación y colisiones a anchos reducidos, retorno de foco, cierre exterior, Escape y desplazamiento del contenido. Prueba los dos temas, el movimiento reducido y el cambio entre activadores con `PopoverViewport`. Verifica el cierre táctil cuando combines activadores de hover con modalidades de foco.
