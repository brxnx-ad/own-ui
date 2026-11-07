# Drawer

## 1. Identificación

Drawer es una familia independiente que envuelve `@base-ui/react/drawer` y combina sus estilos con `clsx`.

## 2. Propósito y casos de uso

Usa Drawer para hojas inferiores, paneles laterales o bandejas superiores que necesiten arrastre para abrirse o cerrarse, puntos de ajuste o una transición coordinada con el fondo. Los ejemplos de uso incluyen filtros, formularios y detalles de un elemento. Para una ventana que solo necesita apertura, cierre y foco, usa [Dialog](dialog.md).

## 3. Importación y anatomía

```tsx
import {
  Drawer,
  DrawerBackdrop,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerIndent,
  DrawerIndentBackground,
  DrawerPopup,
  DrawerPortal,
  DrawerProvider,
  DrawerSwipeArea,
  DrawerTitle,
  DrawerTrigger,
  DrawerViewport,
  DrawerVirtualKeyboardProvider,
  createDrawerHandle,
  type DrawerGripPosition,
  type DrawerHandle,
  type DrawerPopupProps,
  type DrawerSnapPoint,
  type DrawerSwipeDirection,
} from "@/components/own/independant/drawer";
```

| Pieza | Nodo predeterminado | Responsabilidad |
| :--- | :--- | :--- |
| `Drawer` | Ninguno | Configura apertura, modalidad, dirección y puntos de ajuste. |
| `DrawerTrigger` | `button` | Abre el panel. Admite activadores externos asociados con `handle`. |
| `DrawerPortal` | `div` | Traslada las capas a otro nodo del DOM. |
| `DrawerBackdrop` | `div` | Capa visual opcional detrás del panel. |
| `DrawerViewport` | `div` | Delimita el área de posicionamiento y coordina gestos y scroll táctil. |
| `DrawerPopup` | `div` con rol `dialog` | Posiciona el panel, administra el foco e incluye el agarre configurable. Colócalo dentro de Viewport. |
| `DrawerContent` | `div` | Cuerpo desplazable. Permite seleccionar texto con el puntero. |
| `DrawerTitle` | `h2` | Encabezado que da nombre accesible al panel. |
| `DrawerDescription` | `p` | Descripción accesible del panel. |
| `DrawerClose` | `button` | Solicita el cierre desde el panel. |
| `DrawerSwipeArea` | `div` | Zona de apertura por arrastre. Va dentro de la raíz y fuera del portal. |
| `DrawerProvider` | Ninguno | Coordina las raíces que contiene con las piezas de fondo. |
| `DrawerIndentBackground` | `div` | Capa detrás de la interfaz. Colócala antes de Indent, dentro de Provider. |
| `DrawerIndent` | `div` | Envuelve la interfaz cuyo estilo puede cambiar al abrir un panel. |
| `DrawerVirtualKeyboardProvider` | Ninguno | Va dentro de Drawer y envuelve Portal o Viewport para coordinar el teclado virtual en una hoja inferior. |

`createDrawerHandle<Payload>()` devuelve un `DrawerHandle<Payload>` para controlar un panel o compartirlo entre activadores. `DrawerSnapPoint` tipa las alturas de ajuste y `DrawerSwipeDirection` tipa las direcciones del gesto.

En esta composición el consumidor aporta título, descripción y controles. El agarre integrado queda fuera de Content para admitir arrastre con el ratón mientras el cuerpo conserva la selección de texto.

```tsx
<Drawer>
  <DrawerTrigger>Ver resumen</DrawerTrigger>
  <DrawerPortal>
    <DrawerBackdrop />
    <DrawerViewport>
      <DrawerPopup>
        <DrawerContent>
          <DrawerTitle>Resumen del turno</DrawerTitle>
          <DrawerDescription>Consulta los indicadores del turno.</DrawerDescription>
          <DrawerClose>Cerrar</DrawerClose>
        </DrawerContent>
      </DrawerPopup>
    </DrawerViewport>
  </DrawerPortal>
</Drawer>
```

## 4. Variantes y tamaños

Drawer carece de props `variant` y `size`. La dirección de Base UI también determina el borde de own-ui. El modo `modal` regula la interacción exterior.

| `swipeDirection` | Borde y gesto de cierre | Agarre en `auto` | Tamaño predeterminado |
| :--- | :--- | :--- | :--- |
| `down` (predeterminado) | Inferior, hacia abajo | `top` | Ancho disponible y altura natural limitada a la altura del Viewport menos `1rem`. |
| `up` | Superior, hacia arriba | `bottom` | Mismo límite vertical, anclado arriba. |
| `left` | Izquierdo, hacia la izquierda | `right` | Altura disponible y ancho `min(26rem, 100% - 2rem)`. |
| `right` | Derecho, hacia la derecha | `left` | Mismo ancho, anclado a la derecha. |

Con una lista `snapPoints` en un panel vertical, own-ui dimensiona el popup a la altura del Viewport menos `1rem`. Base UI mide esa altura y aplica el desplazamiento del punto activo. Cada punto indica una altura visible, con `0` a `1` como fracción del Viewport, números mayores que `1` como píxeles y cadenas en `px` o `rem`. El valor `1` llega a la altura máxima del popup y conserva el espacio de `1rem`.

## 5. Props y callbacks

Los tipos de acciones y eventos corresponden a `Drawer.Root.Actions`, `Drawer.Root.ChangeEventDetails` y `Drawer.Root.SnapPointChangeEventDetails` de Base UI. `DrawerPopupProps` añade `gripPosition` y `showGripBorder` a las props del popup de la primitiva. Own-ui agrega clases y `data-slot`, y usa `data-snap-points` para dimensionar el popup vertical.

| Pieza | Prop o callback | Tipo | Predeterminado | Opcional | Función y condiciones |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `Drawer` | `open` | `boolean` | `undefined` | Sí | Controla si está abierto. |
| `Drawer` | `defaultOpen` | `boolean` | `false` | Sí | Valor inicial en modo no controlado. |
| `Drawer` | `onOpenChange` | `(open: boolean, details: ChangeEventDetails) => void` | — | Sí | Recibe la solicitud de apertura o cierre. |
| `Drawer` | `onOpenChangeComplete` | `(open: boolean) => void` | — | Sí | Se ejecuta tras completar la apertura o el cierre. |
| `Drawer` | `swipeDirection` | `DrawerSwipeDirection` | `"down"` | Sí | Sentido del gesto de cierre y borde de posicionamiento. |
| `Drawer` | `snapPoints` | `DrawerSnapPoint[]` | — | Sí | Alturas de ajuste en modo vertical. |
| `Drawer` | `snapPoint` | `DrawerSnapPoint \| null` | `undefined` | Sí | Punto activo controlado. `null` deja el popup sin desplazamiento de ajuste. |
| `Drawer` | `defaultSnapPoint` | `DrawerSnapPoint \| null` | Primer punto o `null` | Sí | Punto inicial cuando la altura se gestiona internamente. |
| `Drawer` | `onSnapPointChange` | `(point: DrawerSnapPoint \| null, details: SnapPointChangeEventDetails) => void` | — | Sí | Recibe una solicitud de ajuste, incluida la actualización al cerrar. |
| `Drawer` | `snapToSequentialPoints` | `boolean` | `false` | Sí | Evita que la velocidad del gesto salte puntos por sí sola. |
| `Drawer` | `modal` | `boolean \| "trap-focus"` | `true` | Sí | `true` restringe foco, puntero y scroll exterior. `false` permite interacción exterior. `"trap-focus"` retiene el foco y permite puntero y scroll si se omite el backdrop visual. |
| `Drawer` | `disablePointerDismissal` | `boolean` | `false` | Sí | Evita cerrar con pulsación exterior y, en modo no modal, al salir el foco. |
| `Drawer` | `triggerId`, `defaultTriggerId` | `string \| null` | `undefined`, `null` | Sí | Identifica el activador asociado en modo controlado o al abrir inicialmente. |
| `Drawer` | `actionsRef` | `RefObject<Actions \| null>` | — | Sí | Expone `close()` y `unmount()` para el cierre imperativo y la finalización de un cierre retenido. |
| `Drawer` | `handle` | `DrawerHandle<Payload>` | — | Sí | Asocia la raíz con activadores externos y métodos imperativos. |
| `Drawer` | `children` | `ReactNode \| ((args: { payload: Payload \| undefined }) => ReactNode)` | — | Sí | La función recibe los datos del activador si existen. |
| `DrawerTrigger` | `handle`, `payload` | `DrawerHandle<Payload>`, `Payload` | — | Sí | Asocia un activador externo a la raíz y pasa datos a su función hija. |
| `DrawerTrigger` | `id` | `string` | Generado | Sí | Identificador HTML y clave para `triggerId`, `defaultTriggerId` o `handle.open(id)`. |
| Trigger y Close | `disabled`, `nativeButton` | `boolean` | `false`, `true` | Sí | Deshabilita el botón o indica que `render` produce otro elemento. |
| `DrawerPortal` | `container` | `HTMLElement \| ShadowRoot \| RefObject<HTMLElement \| ShadowRoot \| null> \| null` | Portal padre o `document.body` | Sí | Cambia el destino. `null` explícito aplaza el montaje. |
| `DrawerPortal` | `keepMounted` | `boolean` | `false` | Sí | Conserva el contenido montado y oculto al cerrar. |
| `DrawerBackdrop` | `forceRender` | `boolean` | `false` | Sí | Muestra también el backdrop de un panel anidado. |
| `DrawerPopup` | `gripPosition` | `DrawerGripPosition` | `"auto"` | Sí | `auto` elige el borde opuesto al de entrada. Acepta `top`, `right`, `bottom` y `left` para fijar el borde, o `none` para ocultar el agarre integrado. `swipeDirection` determina el sentido del gesto. |
| `DrawerPopup` | `showGripBorder` | `boolean` | `false` | Sí | Con `true`, muestra el borde entre el agarre y el contenido. |
| `DrawerPopup` | `initialFocus`, `finalFocus` | `FocusTarget` | Popup, activador o foco previo | Sí | Define el destino del foco al abrir y al cerrar, respectivamente. |
| `DrawerSwipeArea` | `disabled` | `boolean` | `false` | Sí | Desactiva la zona de apertura por gesto. |
| `DrawerSwipeArea` | `swipeDirection` | `DrawerSwipeDirection` | Dirección opuesta a la raíz | Sí | Define el sentido del gesto de apertura. |
| Proveedores | `children` | `ReactNode` | — | Sí | Envuelve las piezas que usan su contexto. |
| Piezas con nodo | `className` | `string \| ((state) => string \| undefined)` | — | Sí | Añade clases al nodo. |
| Piezas con nodo | `style` | `CSSProperties \| ((state) => CSSProperties \| undefined)` | — | Sí | Aplica estilos inline al nodo. |
| Piezas con nodo | `render` | `ReactElement \| ((props, state) => ReactElement)` | Nodo de la pieza | Sí | Sustituye o compone el elemento. |
| Piezas con nodo | `ref`, eventos y atributos HTML | Según la pieza | — | Sí | Conserva las props de la primitiva de Base UI. |

`FocusTarget` admite `boolean`, `RefObject<HTMLElement | null>` o una función `(interaction: "mouse" | "touch" | "pen" | "keyboard" | "") => boolean | HTMLElement | null | void`. La cadena vacía representa una interacción sin tipo identificado. Una función puede devolver un nodo para enfocarlo, `true` o `null` para usar el foco predeterminado de Base UI, o `false` o `undefined` para omitir el cambio.

Ambos callbacks de cambio reciben `reason`, `event`, `trigger`, `cancel()`, `allowPropagation()`, `isCanceled` e `isPropagationAllowed`. Los motivos tipados son `trigger-press`, `outside-press`, `escape-key`, `close-watcher`, `close-press`, `focus-out`, `imperative-action`, `swipe` y `none`. Usa `cancel()` antes de actualizar el estado controlado. El callback de apertura añade `preventUnmountOnClose()`, que retiene el cierre hasta que la aplicación llama a `actionsRef.current?.unmount()` al acabar su animación externa.

El handle expone `open(triggerId: string | null): void`, `openWithPayload(payload: Payload): void`, `close(): void` e `isOpen` de solo lectura. Conserva una instancia estable, úsala desde eventos o efectos con la raíz montada y actualiza `open` desde `onOpenChange` si lo controlas.

## 6. Funcionamiento y estados

- `open` y `snapPoint` se controlan por separado. En sus modos no controlados, `defaultOpen` y `defaultSnapPoint` aportan el valor inicial. Un cierre aceptado por Base UI solicita volver al punto predeterminado. Un cambio de `open` realizado directamente por el padre no ejecuta la solicitud de cierre. Si controlas ese caso y quieres reiniciar el punto, actualiza ambos estados.
- Un arrastre suficiente puede cerrar el panel o cambiar su punto activo. Desde un punto de ajuste, Base UI puede solicitar `null` al intentar cerrar por gesto. Un punto compacto debe dejar espacio para el título y las acciones esenciales.
- Tras la animación de salida, el portal desmonta sus hijos salvo cuando `keepMounted` los conserva ocultos. El consumidor gestiona carga, validación y errores. Puede cancelar un cierre desde `onOpenChange` si la aplicación necesita conservar el panel abierto.
- En paneles anidados, el panel superior recibe Escape y los gestos de cierre. Su backdrop visual se omite por defecto. Puedes usar los atributos de anidación para adaptar la apariencia del panel padre.

| `data-slot` | Atributos y estado disponibles |
| :--- | :--- |
| `drawer-trigger` | `data-popup-open` en el activador asociado a la apertura, `data-disabled`. |
| `drawer-close` | `data-disabled`. |
| `drawer-portal` | Sin estado de Drawer. |
| `drawer-backdrop` | `data-open`, `data-closed`, `data-starting-style`, `data-ending-style` y `data-swiping` durante el gesto. |
| `drawer-viewport` | `data-open`, `data-closed`, `data-starting-style`, `data-ending-style`, `data-nested`. |
| `drawer-popup` | Estados de apertura y transición, `data-swipe-direction`, `data-swiping`, `data-swipe-dismiss`, `data-expanded` cuando el punto es `1`, `data-nested-drawer-open`, `data-nested-drawer-swiping`, `data-grip-position` con el borde efectivo o `none`, y `data-snap-points="down"` o `"up"` si own-ui aplica puntos verticales. |
| `drawer-grip`, `drawer-grip-indicator` | Zona de arrastre y marca decorativa. Ambas quedan fuera del árbol de accesibilidad. La banda usa `data-grip-border` cuando muestra el separador. |
| `drawer-content` | `data-drawer-content` identifica el cuerpo para los gestos. |
| `drawer-title`, `drawer-description` | Sin atributos de estado propios. |
| `drawer-swipe-area` | `data-open`, `data-closed`, `data-swiping`, `data-swipe-direction` y `data-disabled`. |
| `drawer-indent`, `drawer-indent-background` | `data-active` con un Drawer abierto en el proveedor, `data-inactive` en reposo. |

## 7. Estilos admitidos por pieza

| Pieza | Estilos base y ajustes locales |
| :--- | :--- |
| Trigger y Close | Usa `className` o compón [Button](button.md) con `render` para elegir variantes, tamaños, iconos y foco visible. |
| Portal | Recibe clases y estilos en el contenedor portaleado. El destino debe heredar tipografía y tokens de tema. |
| Backdrop | Capa fija `inset-0 z-50` con `bg-gray-bold/40` en claro y `bg-surface-soft/70` en oscuro. Su opacidad de reposo se ajusta con `--drawer-swipe-progress` y mantiene un mínimo de `0.25` mientras el panel sigue abierto. |
| Viewport | Capa fija `z-50` con `overflow-clip` para recortar el movimiento sin desplazar el panel al enfocar sus controles. Deja pasar el puntero fuera del popup y ajusta el borde inferior con `--drawer-keyboard-inset` cuando el proveedor lo publica. |
| Popup | Flex vertical con `bg-surface-base`, `text-gray-bold`, `border-gray-base`, `shadow-l` y `rounded-base` en el borde interior. Ajusta dimensiones con `style`, por ejemplo `style={{ width: "min(22rem, 90%)" }}` en un lateral. |
| Agarre | Banda de `2rem` en el borde elegido. La marca es horizontal en `top` y `bottom`, y vertical en `left` y `right`. Personaliza el grosor mediante `--drawer-grip-size` en Popup, por ejemplo `className="[--drawer-grip-size:2.5rem]"`. El bloque de Drawer en `@layer components` de `globals.css` define su disposición y reserva el espacio al ajustar la altura. Incluye ese bloque al exportar la familia. |
| Content | Flex vertical con `gap-4`, `min-h-0`, `overflow-y-auto` y `overscroll-contain`. Su padding usa el mayor valor entre `1.5rem` y la zona segura de cada lado. |
| Title y Description | `h4 text-gray-bold` y `body-sm text-gray-bold/75`. Usa `render={<h3 />}` si la jerarquía del documento lo pide. |
| SwipeArea | El consumidor fija su posición, tamaño y señal visual. Evita cubrir otros controles. Base UI asigna el `touch-action` acorde al gesto. |
| Indent y fondo | El consumidor define el efecto con `data-active` o con los valores de gesto. Mantén el portal fuera del ancestro transformado. |

El popup combina `--drawer-swipe-movement-x`, `--drawer-swipe-movement-y` y `--drawer-snap-point-offset` en `transform`. Para los puntos verticales reserva, dentro de la caja de altura fija, el espacio que queda fuera del Viewport. Esto mantiene el cuerpo desplazable en la parte visible. Conserva el límite de altura y esa reserva si personalizas los puntos de ajuste. Base UI expone `--nested-drawers`, `--drawer-height`, `--drawer-frontmost-height` y `--drawer-swipe-progress` en las piezas que gestionan apilamiento o fondo. Lee esas variables en el nodo que las publica, ya que algunas se registran sin herencia.

Backdrop y Popup usan transiciones de `300ms` en opacidad y `transform`, respectivamente. El gesto elimina la transición y el cierre animado ajusta su duración con `--drawer-swipe-strength`. En entrada y salida, `--own-drawer-exit` determina la traslación fuera del borde. Al reducir movimiento se eliminan las transiciones, y el gesto sigue desplazando directamente el panel. Si cambias la transición del popup, conserva los selectores de entrada y salida para que Base UI sincronice el montaje. El wrapper carece de pseudoelementos decorativos.

Las piezas estilizadas combinan `className` estático o funcional con `clsx`. Base UI aplica `style` estático o funcional y fusiona props, eventos y refs con `render`. En un `render` como función, propaga las props recibidas al nodo resultante. La cascada decide la precedencia de utilidades conflictivas. Consulta [globals](../globals.md) para distinguir los ajustes locales de los cambios que afectan ambos temas.

## 8. Ejemplos de composición

Hoja con altura controlada y un botón como alternativa al gesto. Usa los imports de la sección 3 en el mismo módulo cliente.

```tsx
"use client";

import { useState } from "react";

const points: DrawerSnapPoint[] = ["16rem", 1];

export function ReviewSheet() {
  const [point, setPoint] = useState<DrawerSnapPoint | null>(points[0]);

  return (
    <Drawer snapPoints={points} snapPoint={point} onSnapPointChange={setPoint}>
      <DrawerTrigger>Ver revisión</DrawerTrigger>
      <DrawerPortal>
        <DrawerBackdrop />
        <DrawerViewport>
          <DrawerPopup>
            <DrawerContent>
              <DrawerTitle>Revisión del turno</DrawerTitle>
              <button type="button" onClick={() => setPoint(point === 1 ? points[0] : 1)}>
                {point === 1 ? "Reducir" : "Ampliar"}
              </button>
              <DrawerClose>Cerrar</DrawerClose>
            </DrawerContent>
          </DrawerPopup>
        </DrawerViewport>
      </DrawerPortal>
    </Drawer>
  );
}
```

Panel no modal con zona de apertura por gesto y agarre inferior sin separador. El panel sigue cerrándose hacia la derecha. Usa los mismos imports de la sección 3.

```tsx
export function HelpDrawer() {
  return (
    <Drawer swipeDirection="right" modal={false} disablePointerDismissal>
      <div className="relative inline-flex pr-12">
        <DrawerTrigger>Abrir ayuda</DrawerTrigger>
        <DrawerSwipeArea className="absolute inset-y-0 right-0 w-10 bg-primary-soft" />
      </div>
      <DrawerPortal>
        <DrawerViewport>
          <DrawerPopup gripPosition="bottom">
            <DrawerContent>
              <DrawerTitle>Ayuda</DrawerTitle>
              <DrawerDescription>Consulta los criterios mientras completas la revisión.</DrawerDescription>
              <DrawerClose>Cerrar</DrawerClose>
            </DrawerContent>
          </DrawerPopup>
        </DrawerViewport>
      </DrawerPortal>
    </Drawer>
  );
}
```

## 9. Accesibilidad e integración

- Proporciona un nombre accesible con `DrawerTitle` o `aria-label` en Popup. Añade `DrawerDescription` para una explicación breve. Los botones que solo tienen icono requieren un nombre accesible.
- Conserva Trigger y Close como alternativas al arrastre. Enter y Espacio activan los botones nativos, Escape cierra y Tab recorre el contenido. Con `modal=true` o `"trap-focus"`, incluye Close dentro del popup para ofrecer una salida a lectores de pantalla táctiles.
- Coloca el texto seleccionable dentro de `DrawerContent`. Si ya usas un agarre propio, conserva su ubicación fuera de Content y usa `gripPosition="none"` para ocultar el integrado. En controles con gestos propios, `data-base-ui-swipe-ignore` excluye el gesto de Drawer. Los valores `x` o `y` reservan un eje para gestos táctiles dentro de esos controles.
- Coloca los campos y el envío dentro del formulario en el popup o asócialos con el atributo `form`. En hojas inferiores con campos, envuelve el portal con `DrawerVirtualKeyboardProvider` dentro de Drawer. Verifica el foco y el acceso a los controles con el teclado virtual del dispositivo.
- Al usar `render`, conserva refs, atributos ARIA y eventos. Renderiza los `children` que recibe el popup directamente dentro de su nodo para que el agarre conserve su posición. Los handlers, refs y funciones de renderizado se definen en módulos cliente de App Router. Si cambias el destino del portal, revisa las capas, el bloque de referencia de los elementos fijos y la herencia del tema. Consulta [estructura](../structure.md).

## 10. Límites y verificación

La implementación requiere Base UI 1.9.0, React 19, `clsx` y Tailwind CSS v4 con los tokens de own-ui. `DrawerViewport` es necesario para el arrastre y el bloqueo de scroll táctil. Los puntos de ajuste se aplican a `up` y `down`. El cierre nativo con el gesto de retroceso de Android depende de `CloseWatcher` en un navegador compatible. Al integrar, verifica las alturas mínima y máxima, los gestos de puntero y toque, la selección de texto, el foco, los portales, ambos temas y el movimiento reducido.
