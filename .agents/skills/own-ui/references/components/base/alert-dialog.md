# Alert Dialog

## 1. Identificación

Alert Dialog utiliza la primitiva `@base-ui/react/alert-dialog` y `clsx`.

## 2. Propósito y casos de uso

Usa Alert Dialog para confirmar una decisión que requiere la atención del usuario, como descartar un borrador, publicar cambios o aceptar una operación irreversible. Para mostrar contenido general en una ventana modal, usa Dialog si el consumidor dispone de esa familia. Alert Dialog contiene el foco, impide interactuar con el resto de la página y requiere una decisión explícita o Escape para cerrarse por teclado.

## 3. Importación y anatomía

| Exportación | Función y elemento predeterminado |
| :--- | :--- |
| `AlertDialog<Payload>` | Coordina estado y modalidad; no genera un elemento HTML. |
| `AlertDialogTrigger<Payload>` | Botón que abre el diálogo y puede aportar datos. |
| `AlertDialogPortal` | Mueve el contenido a `body` o a un contenedor; genera un `div`. |
| `AlertDialogBackdrop` | Fondo de atenuación; genera un `div`. |
| `AlertDialogViewport` | Contenedor de posicionamiento y desplazamiento; genera un `div`. |
| `AlertDialogPopup` | Superficie con `role="alertdialog"`; genera un `div`. |
| `AlertDialogTitle` | Nombre accesible; genera un `h2`. |
| `AlertDialogDescription` | Descripción accesible; genera un `p`. |
| `AlertDialogClose` | Botón que solicita el cierre. |
| `createAlertDialogHandle<Payload>()` | Crea el handle estable para activadores externos; no genera HTML. |
| `AlertDialogHandle<Payload = unknown>` | Tipo exportado del handle. |

Compón Backdrop y Viewport como hermanos dentro de Portal. Viewport contiene Popup, donde el consumidor aporta el título, la descripción y las acciones. El activador puede estar en Root o asociarse desde fuera mediante un handle.

```tsx
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogPortal,
  AlertDialogBackdrop,
  AlertDialogViewport,
  AlertDialogPopup,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogClose,
} from "@/components/own/base/alert-dialog";

<AlertDialog>
  <AlertDialogTrigger>Ver advertencia</AlertDialogTrigger>
  <AlertDialogPortal>
    <AlertDialogBackdrop />
    <AlertDialogViewport>
      <AlertDialogPopup>
        <AlertDialogTitle>Sesión por expirar</AlertDialogTitle>
        <AlertDialogDescription>Guarda los cambios antes de salir.</AlertDialogDescription>
        <AlertDialogClose>Entendido</AlertDialogClose>
      </AlertDialogPopup>
    </AlertDialogViewport>
  </AlertDialogPortal>
</AlertDialog>
```

## 4. Variantes y tamaños

La familia carece de props propias `variant` y `size`. El consumidor elige la cantidad, el tipo y las variantes de sus controles. Para ajustar el tamaño del diálogo, personaliza Popup y Viewport según la sección 7.

## 5. Props y callbacks

Las opciones de la tabla se heredan de Base UI. Las piezas DOM conservan los atributos HTML, ARIA, eventos y refs de sus primitivas.

| Pieza | Prop o callback | Tipo | Predeterminado | Opcional | Función y condiciones |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Root | `defaultOpen` | `boolean` | `false` | Sí | Apertura inicial en modo no controlado. |
| Root | `open` | `boolean` | — | Sí | Estado controlado. Usa `onOpenChange` para responder a solicitudes. |
| Root | `onOpenChange` | `(open: boolean, eventDetails) => void` | — | Sí | Solicitud de abrir o cerrar. `eventDetails.cancel()` cancela el cambio. |
| Root | `onOpenChangeComplete` | `(open: boolean) => void` | — | Sí | Se ejecuta al completarse la transición de apertura o cierre. |
| Root | `children` | `ReactNode \| (({ payload }) => ReactNode)` | — | Sí | Contenido. La función recibe el payload activo, que puede ser `undefined`. |
| Root / Trigger | `handle` | `AlertDialogHandle<Payload>` | — | Sí | Asocia activadores externos con una raíz montada. |
| Root | `triggerId` | `string \| null` | — | Sí | Identifica el activador asociado en modo controlado. |
| Root | `defaultTriggerId` | `string \| null` | `null` | Sí | Identifica el activador asociado a una apertura inicial. |
| Root | `actionsRef` | `RefObject<Actions \| null>` | — | Sí | Expone `close()` y `unmount()` para control imperativo. |
| Trigger | `payload` | `Payload` | — | Sí | Datos que se entregan a Root al abrir desde este activador. |
| Trigger | `id` | `string` | ID generado | Sí | ID del nodo y de su asociación con Root. |
| Trigger / Close | `disabled` | `boolean` | `false` | Sí | Deshabilita la acción del control. |
| Trigger / Close | `nativeButton` | `boolean` | `true` | Sí | Indica si `render` conserva un botón nativo. |
| Portal | `keepMounted` | `boolean` | `false` | Sí | Conserva el DOM y el estado local del contenido cerrado. |
| Portal | `container` | `HTMLElement \| ShadowRoot \| RefObject<HTMLElement \| ShadowRoot \| null> \| null` | `body` | Sí | Destino del portal. |
| Backdrop | `forceRender` | `boolean` | `false` | Sí | Permite renderizar un fondo propio en un diálogo anidado. |
| Popup | `initialFocus` | `boolean \| RefObject<HTMLElement \| null> \| FocusTarget` | Primer control tabulable o Popup en apertura táctil | Sí | Decide dónde se sitúa el foco al abrir. |
| Popup | `finalFocus` | `boolean \| RefObject<HTMLElement \| null> \| FocusTarget` | Activador o foco previo | Sí | Decide dónde regresa el foco al cerrar. |
| Piezas DOM | `className` | `string \| ((state) => string \| undefined)` | Clases propias según la pieza | Sí | Añade clases al nodo. |
| Piezas DOM | `style` | `CSSProperties \| ((state) => CSSProperties \| undefined)` | — | Sí | Aplica estilos directos o calculados al nodo. |
| Piezas DOM | `render` | `ReactElement \| ((props, state) => ReactElement)` | Elemento de la sección 3 | Sí | Compone el comportamiento en un elemento. |

`FocusTarget` representa una función que recibe `"mouse"`, `"touch"`, `"pen"` o `"keyboard"`. Devuelve el elemento de destino, `true` o `null` para el comportamiento predeterminado, o `false` o `undefined` para evitar mover el foco.

`onOpenChange` recibe el motivo y el evento en `eventDetails`. Entre los motivos están `"trigger-press"`, `"close-press"`, `"escape-key"`, `"imperative-action"` y `"none"`. El tipo de Base UI también incluye `"outside-press"` y `"focus-out"` para Dialog. Alert Dialog impide el cierre por interacción exterior.

## 6. Funcionamiento y estados

- Elige `defaultOpen` para inicializar el estado interno o `open` para controlarlo. Los cambios directos a `open` actualizan la vista sin invocar `onOpenChange`.
- En modo modal, el foco permanece dentro de Popup y el desplazamiento de la página queda bloqueado. Escape solicita el cierre.
- Portal se desmonta después de la salida. Con `keepMounted` conserva el contenido cerrado, oculto y fuera de la navegación por foco. Para terminar el cierre con una animación externa, llama a `eventDetails.preventUnmountOnClose()` al solicitar el cierre y luego a `actionsRef.current?.unmount()`.
- Para confirmar una operación asíncrona, controla `open` y cierra después del éxito. Conserva un estado de error en el consumidor para permitir reintentos.

| Pieza | `data-slot` | Atributos de Base UI |
| :--- | :--- | :--- |
| Trigger | `alert-dialog-trigger` | `data-disabled`, `data-popup-open` |
| Portal | `alert-dialog-portal` | — |
| Backdrop | `alert-dialog-backdrop` | `data-open`, `data-closed`, `data-starting-style`, `data-ending-style` |
| Viewport | `alert-dialog-viewport` | `data-open`, `data-closed`, `data-starting-style`, `data-ending-style`, `data-nested`, `data-nested-dialog-open` |
| Popup | `alert-dialog-popup` | Los mismos atributos de estado que Viewport. |
| Title | `alert-dialog-title` | — |
| Description | `alert-dialog-description` | — |
| Close | `alert-dialog-close` | `data-disabled` |

Root coordina el estado sin nodo DOM propio.

## 7. Estilos admitidos por pieza

Consulta la [referencia de estilos](../../globals.md) para los tokens y utilidades. Ajusta la separación de los activadores en sus contenedores y distribuye las acciones desde el contenido de Popup.

| Pieza | Base actual y personalización pertinente |
| :--- | :--- |
| Backdrop | `absolute inset-0 z-50`, `bg-gray-bold/40`, en oscuro `bg-surface-soft/70`. Ajusta la atenuación con tokens semánticos y opacidad. |
| Viewport | `fixed inset-0 z-50 flex items-center justify-center`, `p-4 sm:p-6`, overflow y overscroll controlados. Aquí se adapta la posición y el espacio respecto del borde de la pantalla. |
| Popup | `w-full min-w-0 max-w-lg max-h-full`, columna con `gap-6`, `p-6`, overflow vertical, `rounded-base`, borde `gray-base`, `surface-base`, texto `gray-bold` y `shadow-l`. Ajustar tamaño, límites, padding o separación según el caso conservando acceso al contenido. |
| Title / Description | `h4 text-gray-bold` y `body-sm text-gray-bold/75`. Conservar jerarquía semántica y legibilidad al personalizarlos. |
| Trigger / Close | Sin apariencia impuesta por own-ui; elegir Button, sus variantes, tamaños e iconos mediante `render`, o aportar estilos directamente. |
| Portal | Su nodo envuelve el contenido portaleado. Verifica apilamiento, contenedor y herencia de tema al usar un destino personalizado. |

Para sobrescribir una propiedad concreta del Popup puede usarse `style={{ maxWidth: "42rem" }}` o un selector de mayor especificidad, definido en `globals.css` si la personalización es compartida. Preferir límites adaptables y comprobar pantallas estrechas; no fijar una altura que oculte las acciones. Para detalle extenso, el consumidor puede reservar encabezado y acciones con `shrink-0` y dar `min-h-0 overflow-y-auto` al detalle.

Backdrop, Viewport, Popup, Title y Description combinan clases estáticas y funcionales con `clsx` sin fusionar conflictos de Tailwind. Las demás piezas DOM pasan `className` a la primitiva. Usa `style` sobre el nodo pertinente o un selector con precedencia comprobada al modificar una propiedad de la base.

Backdrop y Popup transicionan la opacidad durante 150 ms. Popup usa `scale-95` en entrada y salida si el usuario permite movimiento. Tailwind v4 emite la propiedad individual `scale`. Para interpolarla, incluye `scale` en la lista de propiedades de transición, que actualmente contiene `opacity,transform`. Conserva los estados `data-starting-style` y `data-ending-style` para coordinar el desmontaje. Mantén `motion-reduce:transition-none` y el escalado bajo `motion-safe`. Base UI expone `--nested-dialogs` en Popup para contar diálogos descendientes abiertos.

## 8. Ejemplos de composición

### Confirmación síncrona

La aplicación aporta `onDiscard` y debe disponer de [Button](button.md) y sus archivos de soporte. El control de cancelación recibe el foco inicial.

```tsx
"use client";

import { useRef } from "react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogPortal,
  AlertDialogBackdrop,
  AlertDialogViewport,
  AlertDialogPopup,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogClose,
} from "@/components/own/base/alert-dialog";
import { Button } from "@/components/own/base/button";

export function DiscardDialog({ onDiscard }: { onDiscard: () => void }) {
  const cancelRef = useRef<HTMLButtonElement>(null);

  return (
    <AlertDialog>
      <AlertDialogTrigger render={<Button variant="destructive" />}>
        Descartar borrador
      </AlertDialogTrigger>
      <AlertDialogPortal>
        <AlertDialogBackdrop />
        <AlertDialogViewport>
          <AlertDialogPopup initialFocus={cancelRef}>
            <div className="space-y-2">
              <AlertDialogTitle>¿Descartar el borrador?</AlertDialogTitle>
              <AlertDialogDescription>
                Se perderán los cambios sin guardar.
              </AlertDialogDescription>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
              <AlertDialogClose ref={cancelRef} render={<Button variant="secondary" />}>
                Cancelar
              </AlertDialogClose>
              <AlertDialogClose render={<Button variant="destructive" />} onClick={onDiscard}>
                Descartar
              </AlertDialogClose>
            </div>
          </AlertDialogPopup>
        </AlertDialogViewport>
      </AlertDialogPortal>
    </AlertDialog>
  );
}
```

### Confirmación asíncrona

Usa `open` y `onOpenChange` si la aplicación decide cuándo cerrar. Si un Button externo abre el diálogo con `setOpen(true)`, proporciona su ref a `finalFocus`.

Confirma con Button y cierra después del éxito. Reserva AlertDialogClose para la acción que solicita un cierre inmediato.

Importa los hooks de React y usa las piezas y Button de la composición anterior. Coloca las declaraciones y handlers dentro de un componente cliente que reciba `save`, la función asíncrona de la aplicación.

```tsx
"use client";

import { useRef, useState } from "react";

const [open, setOpen] = useState(false);
const [pending, setPending] = useState(false);
const [error, setError] = useState<string | null>(null);
const pendingRef = useRef(false);

async function confirm() {
  if (pendingRef.current) return;
  pendingRef.current = true;
  setPending(true);
  setError(null);
  try {
    await save();
    setOpen(false);
  } catch {
    setError("No se pudo guardar. Inténtalo de nuevo.");
  } finally {
    pendingRef.current = false;
    setPending(false);
  }
}
```

En ese componente, usa el siguiente fragmento como JSX de retorno. `dialogContent` representa el Trigger y el Portal de la composición síncrona, con su Backdrop, Viewport, Popup, título y descripción.

```tsx
<AlertDialog open={open} onOpenChange={(nextOpen, details) => {
  if (!nextOpen && pendingRef.current) {
    details.cancel();
    return;
  }
  setOpen(nextOpen);
}}>
  {dialogContent}
</AlertDialog>
```

En Popup, aplica `aria-busy={pending || undefined}`, anuncia `error` con `role="alert"` y deshabilita Cancelar mientras dura la petición. Renderiza la confirmación como `<Button loading={pending} onClick={confirm}>Guardar</Button>`. Si Cancelar debe seguir disponible, define cómo cancelar o desacoplar la operación pendiente.

### Activadores externos y genéricos

Importa `createAlertDialogHandle` desde el módulo propio y `useState` desde React. Crea una instancia estable con `const [handle] = useState(() => createAlertDialogHandle<Item>());`, donde `Item` es el tipo de datos de la aplicación. Pasa el mismo `handle` a Root y a los Trigger externos. Asigna `payload={item}` a cada activador. La función `children` de Root recibe los datos del activador activo.

El handle proporciona `open(triggerId: string | null)`, `openWithPayload(payload)`, `close()` e `isOpen` de solo lectura. Llama a los métodos desde eventos o efectos con la raíz montada. Para renderizar según la apertura, usa el estado controlado de React. `isOpen` ofrece una lectura puntual.

## 9. Accesibilidad e integración

- Incluye Title y Description para dar nombre y descripción al diálogo. Mantén una acción de cancelación o cierre dentro de Popup. Tab y Mayús+Tab permanecen dentro del diálogo, y Escape solicita el cierre.
- En decisiones destructivas, asigna `initialFocus` a Cancelar. Si la confirmación elimina el activador, usa `finalFocus` para devolver el foco a un control que siga disponible.
- Con `render`, compón cada acción sobre un solo nodo y conserva props, eventos y refs. Da un nombre accesible a los controles solo icono y comprueba su semántica si sustituyes el botón nativo.
- Conserva `"use client"` en los módulos con refs, estado o handlers. El layout servidor integra la fuente, el tema y el apilamiento. Revisa el contexto de Backdrop, el destino del portal y el acceso a las acciones con contenido largo. Consulta la [integración de portales](../../globals.md#6-layout-tema-portales-y-movimiento).

## 10. Límites y verificación

- Root fija la modalidad y el cierre exterior. Las opciones `modal` y `disablePointerDismissal` pertenecen a Dialog. La familia expone Close y deja al consumidor definir sus acciones de confirmación y cancelación.
- Close solicita el cierre inmediatamente. Para operaciones asíncronas usa una acción propia y decide cómo manejar solicitudes de cierre mientras se ejecuta la operación.
- Comprueba apertura, Escape, foco inicial y de retorno, errores y reintentos si aplica, montaje, contraste de Backdrop y acceso a las acciones en pantallas estrechas. Revisa los dos temas y el movimiento reducido.
