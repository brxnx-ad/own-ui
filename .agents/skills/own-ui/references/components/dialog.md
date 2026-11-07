# Dialog

## 1. Identificación

Dialog es una familia independiente que envuelve `@base-ui/react/dialog` y combina sus clases visuales con `clsx`.

## 2. Propósito y casos de uso

Usa Dialog para consultar detalles, editar datos o completar una tarea en una ventana superpuesta. En modo modal, el diálogo restringe la interacción exterior. Para ayuda auxiliar que permita seguir usando la página, usa el modo no modal y omite el backdrop. Para una confirmación urgente que requiera una decisión explícita, consulta [Alert Dialog](alert-dialog.md).

## 3. Importación y anatomía

```tsx
import {
  Dialog,
  DialogBackdrop,
  DialogClose,
  DialogDescription,
  DialogPopup,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
  DialogViewport,
  createDialogHandle,
  type DialogHandle,
} from "@/components/own/independant/dialog";
```

| Pieza | Nodo predeterminado | Responsabilidad |
| :--- | :--- | :--- |
| `Dialog` | Ninguno | Raíz que mantiene el estado y el contexto de la familia. |
| `DialogTrigger` | `button` | Abre la ventana y puede aportar un `payload`. Puede estar fuera de la raíz si comparte su `handle`. |
| `DialogPortal` | `div` | Traslada las piezas visuales a otro nodo del DOM. |
| `DialogBackdrop` | `div` | Capa visual opcional bajo la ventana. |
| `DialogViewport` | `div` | Contenedor de posicionamiento para centrar y limitar la altura del popup. |
| `DialogPopup` | `div` con rol `dialog` | Aloja el contenido y administra el foco. |
| `DialogTitle` | `h2` | Da nombre accesible al popup. |
| `DialogDescription` | `p` | Asocia una descripción breve al popup. |
| `DialogClose` | `button` | Solicita cerrar el diálogo. |

`createDialogHandle<Payload>()` crea una instancia estable de `DialogHandle<Payload>` para conectar activadores externos o abrir y cerrar mediante métodos. El consumidor aporta el título, el contenido y los controles. Compón el popup dentro del portal y usa el viewport para obtener el centrado y los límites base. Si lo omites, define el posicionamiento del popup en la composición.

```tsx
<Dialog>
  <DialogTrigger>Ver detalles</DialogTrigger>
  <DialogPortal>
    <DialogBackdrop />
    <DialogViewport>
      <DialogPopup>
        <DialogTitle>Entrega del informe</DialogTitle>
        <DialogDescription>Sube un PDF a la carpeta del proyecto.</DialogDescription>
        <DialogClose>Cerrar</DialogClose>
      </DialogPopup>
    </DialogViewport>
  </DialogPortal>
</Dialog>
```

## 4. Variantes y tamaños

La familia carece de props `variant` y `size`. `modal` es un modo de interacción con valores `true` (predeterminado), `false` y `"trap-focus"`. El popup usa `w-full max-w-lg` (hasta `32rem` con la escala predeterminada de Tailwind), altura limitada al espacio interior del viewport y scroll vertical cuando el contenido lo supera. Los tamaños de las acciones pertenecen a los controles que el consumidor compone.

## 5. Props y callbacks

El wrapper hereda la API de Base UI y añade clases y `data-slot` en las piezas con nodo. En los tipos siguientes, `Actions` y `ChangeEventDetails` corresponden a `Dialog.Root.Actions` y `Dialog.Root.ChangeEventDetails` del módulo `@base-ui/react/dialog`. `Payload` es el tipo compartido entre la raíz, el handle y los activadores asociados.

| Pieza | Prop o callback | Tipo | Predeterminado | Opcional | Función y condiciones |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `Dialog` | `open` | `boolean` | `undefined` | Sí | Fuente de verdad de la apertura en modo controlado. |
| `Dialog` | `defaultOpen` | `boolean` | `false` | Sí | Estado inicial en modo no controlado. |
| `Dialog` | `modal` | `boolean \| "trap-focus"` | `true` | Sí | `true` restringe foco, puntero y scroll de página. `false` permite interacción exterior. `"trap-focus"` retiene el foco y permite puntero y scroll exteriores si se omite el backdrop visual. |
| `Dialog` | `disablePointerDismissal` | `boolean` | `false` | Sí | Evita el cierre por pulsación exterior y, en modo no modal, por salida de foco. Escape y Close siguen disponibles. |
| `Dialog` | `onOpenChange` | `(open: boolean, details: ChangeEventDetails) => void` | — | Sí | Recibe la solicitud de cambio. `details.cancel()` cancela su procesamiento por Base UI. |
| `Dialog` | `onOpenChangeComplete` | `(open: boolean) => void` | — | Sí | Se ejecuta al completar la apertura o el cierre, tras las transiciones cuando corresponda. |
| `Dialog` | `triggerId` | `string \| null` | `undefined` | Sí | Controla qué Trigger está asociado. Coincide con el `id` de la pieza activadora. |
| `Dialog` | `defaultTriggerId` | `string \| null` | `null` | Sí | Identifica el activador asociado al abrir inicialmente con `defaultOpen`. |
| `Dialog` | `handle` | `DialogHandle<Payload>` | — | Sí | Conecta los activadores externos y las acciones imperativas del handle. |
| `Dialog` | `children` | `ReactNode \| ((args: { payload: Payload \| undefined }) => ReactNode)` | — | Sí | Renderiza contenido directo o dependiente del activador. Contempla el caso de `payload` ausente. |
| `Dialog` | `actionsRef` | `RefObject<Actions \| null>` | — | Sí | Expone `close(): void` y `unmount(): void`. Usa `unmount()` para finalizar un cierre retenido, tras una animación externa. |
| `DialogTrigger` | `handle` | `DialogHandle<Payload>` | — | Sí | Comparte el handle de la raíz cuando el activador se renderiza fuera de ella. |
| `DialogTrigger` | `payload` | `Payload` | — | Sí | Datos que recibe la función hija de la raíz al activar este botón. |
| `DialogTrigger` | `id` | `string` | Generado | Sí | Identificador HTML y clave para `triggerId`, `defaultTriggerId` y `handle.open(id)`. |
| `DialogTrigger`, `DialogClose` | `disabled` | `boolean` | `false` | Sí | Deshabilita el botón. |
| `DialogTrigger`, `DialogClose` | `nativeButton` | `boolean` | `true` | Sí | Usa `false` si `render` produce un elemento distinto de `button`. |
| `DialogPortal` | `container` | `HTMLElement \| ShadowRoot \| RefObject<HTMLElement \| ShadowRoot \| null> \| null` | Portal padre o `document.body` | Sí | Cambia el destino. Un valor explícito `null` retrasa el montaje hasta resolverlo. |
| `DialogPortal` | `keepMounted` | `boolean` | `false` | Sí | Conserva el contenido montado y oculto después del cierre. |
| `DialogBackdrop` | `forceRender` | `boolean` | `false` | Sí | Renderiza también el backdrop visual de un diálogo anidado. |
| `DialogPopup` | `initialFocus` | `FocusTarget` | Primer tabulable o popup | Sí | Define el foco al abrir. Por defecto, una apertura táctil enfoca el popup. |
| `DialogPopup` | `finalFocus` | `FocusTarget` | Activador o foco anterior | Sí | Define el foco al cerrar. |
| Piezas con nodo | `className` | `string \| ((state) => string \| undefined)` | — | Sí | Añade clases al nodo de la pieza. |
| Piezas con nodo | `style` | `CSSProperties \| ((state) => CSSProperties \| undefined)` | — | Sí | Aplica estilos inline al nodo de la pieza. |
| Piezas con nodo | `render` | `ReactElement \| ((props, state) => ReactElement)` | Nodo de la pieza | Sí | Cambia el elemento o lo compone con un control del consumidor. |
| Piezas con nodo | `ref`, eventos y atributos HTML | Según la pieza de Base UI | — | Sí | Conserva el acceso al nodo, eventos y atributos compatibles con la primitiva. |

`FocusTarget` acepta `boolean`, `RefObject<HTMLElement | null>` o `(interaction: "mouse" | "touch" | "pen" | "keyboard") => boolean | HTMLElement | null | void`. `true` usa el comportamiento predeterminado y `false` evita el cambio de foco. En la función, devuelve un elemento para enfocarlo, `true` o `null` para usar el destino predeterminado, o `false` o `undefined` para omitirlo.

`details.reason` admite `trigger-press`, `outside-press`, `escape-key`, `close-press`, `focus-out`, `imperative-action` y `none`. Incluye el evento nativo (`event`), el activador cuando existe (`trigger`), `cancel()`, `allowPropagation()`, `isCanceled`, `isPropagationAllowed` y `preventUnmountOnClose()`. `preventUnmountOnClose()` se usa al solicitar el cierre cuando la aplicación controla su animación y llamará después a `actionsRef.current?.unmount()`.

El handle expone `open(triggerId: string | null): void`, `openWithPayload(payload: Payload): void`, `close(): void` e `isOpen: boolean` de solo lectura. `open(null)` y `openWithPayload` abren sin activador asociado. Llama a estos métodos desde eventos o efectos, con una raíz montada que use la instancia. Si la raíz controla `open`, actualiza el estado desde `onOpenChange` para aplicar la solicitud.

## 6. Funcionamiento y estados

- Usa `defaultOpen` solo como valor inicial, o `open` con `onOpenChange` para controlar el ciclo. Asignar `open` desde el padre cambia el estado directamente, sin emitir una nueva solicitud mediante `onOpenChange`.
- Al cerrar, Base UI conserva el popup durante la salida y luego lo desmonta. `keepMounted` conserva el árbol oculto y su estado local. Una animación de cierre externa puede retener esta fase hasta llamar a `unmount()`.
- En diálogos anidados, Escape actúa sobre el superior. El backdrop visual de un hijo se omite por defecto. Usa los atributos de anidación para adaptar la apariencia del padre si el contexto lo pide.
- La aplicación gestiona formularios, validación, carga y errores. Si cerrar durante una operación es inapropiado, cancela la solicitud en `onOpenChange` y mantén el valor controlado de `open`.

| `data-slot` | Atributos de estado de Base UI |
| :--- | :--- |
| `dialog-trigger` | `data-popup-open` si es el activador asociado al diálogo abierto, `data-disabled`. |
| `dialog-portal` | Sin atributos de estado de Dialog. |
| `dialog-backdrop` | `data-open`, `data-closed`, `data-starting-style`, `data-ending-style`. |
| `dialog-viewport` | Los cuatro estados de Backdrop, `data-nested` y `data-nested-dialog-open`. |
| `dialog-popup` | Los cuatro estados de Backdrop, `data-nested`, `data-nested-dialog-open` y `--nested-dialogs` con el número de diálogos descendientes abiertos. |
| `dialog-title`, `dialog-description` | Sin atributos de estado propios. |
| `dialog-close` | `data-disabled`. |

## 7. Estilos admitidos por pieza

| Pieza | Estilos y ajustes locales |
| :--- | :--- |
| Trigger y Close | Usan la apariencia del botón renderizado. Aplica `className` o compón [Button](button.md) mediante `render` para elegir variantes, tamaño, iconos y anillo de foco. |
| Portal | Sin clases base. Sus clases y estilos actúan en el contenedor portaleado, desde el que se heredan variables y tipografía. |
| Backdrop | Cubre la ventana con `fixed inset-0 z-50`. Usa `bg-gray-bold/40` en claro y `bg-surface-soft/70` en oscuro. Cambia la intensidad en esta pieza para una instancia concreta. |
| Viewport | Usa posición fija, `z-50`, centrado flex y `p-4 sm:p-6`. Deja pasar el puntero en el área exterior. Para permitir interacción exterior en modo no modal, conserva ese comportamiento y omite el backdrop visual. |
| Popup | Usa `w-full max-w-lg max-h-full min-h-0 min-w-0`, `p-6`, `gap-4`, scroll vertical contenido, `rounded-base`, `border-gray-base`, `bg-surface-base`, `text-gray-bold` y `shadow-l`. Para ajustar el ancho de una instancia, usa, por ejemplo, `style={{ maxWidth: "28rem" }}`. Conserva el límite de altura o proporciona una estrategia de scroll equivalente. |
| Title y Description | Usan `h4 text-gray-bold` y `body-sm text-gray-bold/75`, respectivamente. `render={<h3 />}` cambia el nivel del título conservando su apariencia base. |

Backdrop transiciona opacidad y Popup transiciona opacidad y `scale` durante `150ms`. Ambos usan los atributos de entrada y salida de Base UI. La escala a `95%` se aplica con `motion-safe` y se eliminan las transiciones con `motion-reduce`. Los selectores de estado se aplican a la pieza que los emite. Un selector de la pantalla que depende de la ascendencia puede dejar de alcanzar una pieza en el portal. Ajusta duración y estados en el popup si necesitas que Base UI sincronice el desmontaje con la salida. El wrapper carece de variables propias de medición y de pseudoelementos decorativos.

Las piezas estilizadas combinan sus clases con `clsx`, incluso si `className` es una función. Base UI aplica `style` estático o funcional y combina props, eventos y refs al componer `render`. Si usas `render` como función, propaga explícitamente las props que recibe al nodo resultante. La precedencia entre utilidades conflictivas depende de la cascada generada. Los ajustes de tokens compartidos en [globals](../globals.md) afectan todas las instancias que los consumen.

## 8. Ejemplos de composición

Edición controlada con botón de apertura externo. El fragmento usa las piezas importadas en la sección 3 y recibe el callback `onSave` del consumidor.

```tsx
"use client";

import { useRef, useState } from "react";

export function EditName({ onSave }: { onSave: (name: string) => void }) {
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const input = useRef<HTMLInputElement>(null);

  return (
    <>
      <button type="button" ref={trigger} onClick={() => setOpen(true)}>Editar nombre</button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogPortal>
          <DialogBackdrop />
          <DialogViewport>
            <DialogPopup initialFocus={input} finalFocus={trigger}>
              <DialogTitle>Editar nombre</DialogTitle>
              <form onSubmit={(event) => {
                event.preventDefault();
                const name = input.current?.value.trim();
                if (!name) return;
                onSave(name);
                setOpen(false);
              }}>
                <label>Nombre <input ref={input} name="name" required /></label>
                <DialogClose type="button">Cancelar</DialogClose>
                <button type="submit">Guardar</button>
              </form>
            </DialogPopup>
          </DialogViewport>
        </DialogPortal>
      </Dialog>
    </>
  );
}
```

Para compartir una ventana entre varios activadores, crea el handle una vez en un componente cliente. Este fragmento usa los imports de la sección 3 y `useState` de React.

```tsx
const [handle] = useState(() => createDialogHandle<string>());

return (
  <>
    <DialogTrigger handle={handle} payload="Producción">Producción</DialogTrigger>
    <DialogTrigger handle={handle} payload="Calidad">Calidad</DialogTrigger>
    <Dialog handle={handle} modal={false}>
      {({ payload }) => (
        <DialogPortal>
          <DialogViewport>
            <DialogPopup>
              <DialogTitle>{payload ?? "Informe"}</DialogTitle>
              <DialogClose>Cerrar</DialogClose>
            </DialogPopup>
          </DialogViewport>
        </DialogPortal>
      )}
    </Dialog>
  </>
);
```

## 9. Accesibilidad e integración

- Mantén un nombre accesible mediante `DialogTitle` o `aria-label` en Popup. `DialogDescription` es opcional y funciona mejor con una frase breve. Los controles solo icono requieren un nombre como `aria-label="Cerrar"`.
- Usa Enter o Espacio sobre botones nativos y Escape para cerrar. En `true` y `"trap-focus"`, Tab y Mayús+Tab recorren el diálogo. Incluye `DialogClose` dentro del popup para proporcionar salida también a lectores de pantalla táctiles. Revisa `finalFocus` si el activador puede desaparecer al guardar.
- Cuando uses `render`, conserva ref, props ARIA y eventos. En un formulario, usa `type="button"` para Cancelar y `type="submit"` para el envío. El árbol React atraviesa el portal, pero la asociación nativa de un control con un formulario sigue el DOM. Coloca el formulario dentro del popup o usa el atributo `form` con un identificador válido.
- Para mantener visibles el encabezado y las acciones con contenido extenso, usa secciones `shrink-0` y un cuerpo `min-h-0 overflow-y-auto`. Si la región necesita desplazarse con teclado, dale un nombre y `tabIndex={0}` con foco visible. Prueba también pantallas de poca altura y la apertura del teclado virtual.
- Conserva las fronteras cliente de App Router. Los handlers, las refs y las funciones de renderizado se definen en módulos cliente. Al cambiar el destino del portal, comprueba la herencia de tokens, los contextos de apilamiento y los ancestros que puedan contener elementos fijos. Consulta [estructura](../structure.md) para la integración con Next.js.

## 10. Límites y verificación

El módulo requiere Base UI 1.9.0, `clsx`, React 19 para refs como props y las utilidades de own-ui en Tailwind CSS v4. La familia deja al consumidor elegir acciones, iconos, formulario y validación. Si se usa un destino de portal personalizado, verifica que la capa cubra el área prevista y que la ventana conserve sus tokens de tema. Al integrar, comprueba apertura y cierre por teclado y puntero, restauración de foco, contenido persistente, apilamiento, scroll en móvil, ambos temas y movimiento reducido.
