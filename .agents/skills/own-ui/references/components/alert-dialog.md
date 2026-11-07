# Alert Dialog

## Propósito y compatibilidad

Usar para decisiones que interrumpen una tarea y requieren confirmación: descartar un borrador, publicar cambios o aceptar una operación. Para contenido general sin esa exigencia, evaluar Dialog cuando esté disponible en el catálogo.

El módulo convencional es `components/own/independant/alert-dialog.tsx`. Localiza la implementación y resuelve los imports de los ejemplos en el proyecto consumidor según [estructura](../structure.md). Consulta los tipos de `@base-ui/react/alert-dialog` instalados en el destino para opciones avanzadas.

Este contrato se comprobó en Next.js 16.4.5 con React y React DOM 19.3, Base UI 1.9.0, `clsx` 2.1.1, Tailwind CSS v4 y tipos de React 19. Son versiones de referencia, no una obligación de fijarlas exactamente en todo proyecto consumidor; valida las versiones compatibles del destino. Los wrappers usan refs como props de React 19.

La definición requiere el archivo `alert-dialog.tsx` y la configuración de [globals](../globals.md); no importa otras familias propias ni iconos de soporte. Button es una dependencia de las composiciones de ejemplo que lo elijan: para utilizarlas exporta también [Button](button.md) y sus archivos de soporte. Prepara el apilamiento, el contenedor del backdrop y la herencia del tema según la referencia de estructura.

En App Router, conserva `"use client"` en el módulo de la familia y en los módulos consumidores que declaren refs, hooks o handlers de confirmación. Las páginas y layouts pueden permanecer en servidor y delegar el diálogo interactivo a un componente cliente; no necesitan volverse cliente en su totalidad.

Importar desde `@/components/own/independant/alert-dialog`. Es independiente: envuelve piezas de su familia de Base UI. El consumidor puede proporcionar Button mediante `render`, elegir sus variantes y decidir cuántas acciones presenta. Esa composición externa no cambia la clasificación. Ver [estructura](../structure.md).

## Piezas y variantes

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

No hay props propias `variant` o `size` en estas piezas ni exportaciones `AlertDialogAction` o `AlertDialogCancel`. Las variantes de los botones corresponden al componente suministrado mediante `render`. Todas las piezas DOM exponen un `data-slot` con prefijo `alert-dialog-`; Root no expone un nodo que pueda estilizarse.

## Props y funcionamiento

| Pieza | Prop | Tipo, valor inicial y uso |
| :--- | :--- | :--- |
| Root | `defaultOpen` | `boolean`, `false`; apertura inicial no controlada. |
| Root | `open` | `boolean`, sin valor impuesto; usar junto con `onOpenChange` en modo controlado. No combinar con `defaultOpen`. |
| Root | `onOpenChange` | `(open, eventDetails) => void`; responde a solicitudes. `eventDetails.cancel()` cancela el cambio. Una actualización externa de `open` no dispara este callback. |
| Root | `onOpenChangeComplete` | `(open: boolean) => void`; después de completar la transición. |
| Root | `children` | `ReactNode` o `({ payload }) => ReactNode`; `payload` puede ser `undefined`. |
| Root / Trigger | `handle` | `AlertDialogHandle<Payload>`; conecta un activador externo con una raíz montada. |
| Root | `triggerId` / `defaultTriggerId` | `string \| null`; activador activo controlado o inicial. `defaultTriggerId` parte de `null`. |
| Root | `actionsRef` | Ref opcional con `close()` y `unmount()`. Para cierre animado externo, usar antes `eventDetails.preventUnmountOnClose()` y completar después con `unmount()`. |
| Trigger | `payload` | Datos del tipo `Payload`, opcionales. |
| Trigger | `id` | `string`; si se omite se genera. Permite asociar la raíz al activador. |
| Trigger / Close | `disabled` | `boolean`, `false`. |
| Trigger / Close | `nativeButton` | `boolean`, `true`; indicar `false` si `render` sustituye el botón nativo por otro elemento. |
| Portal | `keepMounted` | `boolean`, `false`; mantiene el contenido cerrado en el DOM y su estado local, oculto y fuera de la navegación por foco. |
| Portal | `container` | Elemento, ShadowRoot o ref opcional; destino predeterminado: `body`. |
| Backdrop | `forceRender` | `boolean`, `false`; permite un backdrop propio en diálogos anidados. |
| Popup | `initialFocus` | `boolean`, ref o función de tipo de interacción. Por defecto enfoca el primer elemento tabulable; en apertura táctil, el popup. |
| Popup | `finalFocus` | `boolean`, ref o función de tipo de interacción. Por defecto vuelve al activador o al elemento enfocado previamente. |

Las funciones de foco reciben `mouse`, `touch`, `pen` o `keyboard`. Devuelven un elemento de destino, `true` o `null` para el comportamiento predeterminado, o `false`/`undefined` para evitar moverlo.

El diálogo es siempre modal: limita el foco al popup, bloquea el desplazamiento de la página e impide la interacción exterior. Pulsar fuera no lo cierra; Escape solicita el cierre. Root no acepta `modal` ni `disablePointerDismissal`.

Incluir un título y una descripción breve. Proporcionar una acción de cancelación con `AlertDialogClose`. En decisiones destructivas, dirigir `initialFocus` a Cancelar. Si confirmar elimina el activador, proporcionar `finalFocus` hacia un control que siga disponible.

## Composición síncrona

Este fragmento se coloca dentro de un componente cliente. Los imports son convencionales: adáptalos a la distribución del consumidor. `onDiscard` es una función síncrona proporcionada por la aplicación; `cancelRef` se crea en ese componente.

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
} from "@/components/own/independant/alert-dialog";
import { Button } from "@/components/own/independant/button";

const cancelRef = useRef<HTMLButtonElement>(null);

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
```

Las declaraciones con hooks y el JSX pertenecen al cuerpo del componente; los imports van al inicio del módulo. `render` compone el comportamiento con Button sobre un único elemento DOM; no anidar un Button como hijo de un activador que ya sea un botón. En `render` funcional, propagar las props y la ref recibidas y conservar la semántica y los eventos.

## Estado controlado y operaciones asíncronas

Usar `open` y `onOpenChange` si la aplicación decide cuándo cerrar. Un Button externo puede abrir con `setOpen(true)` sin AlertDialogTrigger; proporcionar entonces una ref apropiada a `finalFocus`.

Para una petición, conservar la estructura de Portal, Viewport, Popup, título y descripción. Confirmar con Button y cerrar después del éxito; AlertDialogClose solicita el cierre inmediatamente y no espera una promesa.

El siguiente fragmento usa las piezas y Button importados en la composición anterior. `save` es una función asíncrona de la aplicación que devuelve una promesa; no es una exportación de own-ui. Importa los hooks de React y coloca las declaraciones y handlers dentro de un componente cliente:

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

En esa composición, conectar las solicitudes de cierre y las acciones así:

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

`dialogContent` es un nodo React construido por el consumidor con Trigger, Portal, Backdrop, Viewport y Popup, con su título, descripción y acciones; no es una exportación ni un prop especial de own-ui. Dentro de Popup, anunciar `error` con `role="alert"`, usar `aria-busy={pending || undefined}`, deshabilitar Cancelar durante la petición y renderizar la confirmación con `<Button loading={pending} onClick={confirm}>Guardar</Button>`. No envolver esa confirmación en AlertDialogClose. Si no se desea bloquear la cancelación, definir primero cómo cancelar o desacoplar la operación pendiente.

## Activadores externos y genéricos

Importar `createAlertDialogHandle` desde el módulo propio y `useState` desde React. `Item` representa el tipo de datos de la aplicación e `item`, una instancia de esos datos. Mantener una instancia estable, por ejemplo `const [handle] = useState(() => createAlertDialogHandle<Item>());`. Pasar el mismo `handle` a Root y a los Trigger externos, y `payload={item}` a cada activador. La función `children` de Root recibe los datos del activador activo.

`createAlertDialogHandle` y el tipo `AlertDialogHandle<Payload = unknown>` se exportan desde el módulo propio. El handle proporciona `open(triggerId: string | null)`, `openWithPayload(payload)`, `close()` e `isOpen` de solo lectura. Sus métodos se llaman desde eventos o efectos y solo tienen efecto mientras una raíz con ese handle está montada; `isOpen` no es una suscripción de React.

## Estilos admitidos por pieza

Consultar [globals](../globals.md) para tokens y utilidades. La separación respecto del entorno pertenece al consumidor: usar contenedores con `gap`, padding y alineación; mantener los componentes propios libres de márgenes exteriores.

| Pieza | Base actual y personalización pertinente |
| :--- | :--- |
| Backdrop | `absolute inset-0 z-50`, `bg-gray-bold/40`, en oscuro `bg-surface-soft/70`. Ajustar atenuación con tokens semánticos y opacidad. |
| Viewport | `fixed inset-0 z-50 flex items-center justify-center`, `p-4 sm:p-6`, overflow y overscroll controlados. Aquí se adapta la posición y el espacio respecto del borde de la pantalla. |
| Popup | `w-full min-w-0 max-w-lg max-h-full`, columna con `gap-6`, `p-6`, overflow vertical, `rounded-base`, borde `gray-base`, `surface-base`, texto `gray-bold` y `shadow-l`. Ajustar tamaño, límites, padding o separación según el caso conservando acceso al contenido. |
| Title / Description | `h4 text-gray-bold` y `body-sm text-gray-bold/75`. Conservar jerarquía semántica y legibilidad al personalizarlos. |
| Trigger / Close | Sin apariencia impuesta por own-ui; elegir Button, sus variantes, tamaños e iconos mediante `render`, o aportar estilos directamente. |
| Portal | Cambia la ubicación DOM. Verificar apilamiento, contenedor y herencia de tema al usar un destino personalizado. |

Para sobrescribir una propiedad concreta del Popup puede usarse `style={{ maxWidth: "42rem" }}` o un selector de mayor especificidad, definido en `globals.css` si la personalización es compartida. Preferir límites adaptables y comprobar pantallas estrechas; no fijar una altura que oculte las acciones. Para detalle extenso, el consumidor puede reservar encabezado y acciones con `shrink-0` y dar `min-h-0 overflow-y-auto` al detalle.

En las piezas DOM se conservan `className`, `style`, `render`, refs y atributos nativos. Las piezas con estilos propios combinan `className` estático o funcional con `clsx`; `style` también puede depender del estado. No se usa `tailwind-merge`: añadir `max-w-2xl` o `p-8` al final de la cadena no garantiza reemplazar una clase conflictiva existente. Elegir `style` o un selector de mayor especificidad para esos casos; no atribuir esa limitación a las propiedades nuevas que no compiten con la base.

## Estados y animaciones

Backdrop anima opacidad; Popup anima opacidad y transformación durante `150ms`, con escala `95%` al entrar/salir cuando el movimiento está permitido. Base UI publica `data-starting-style` y `data-ending-style`, además de los estados pertinentes `data-open`, `data-closed`, `data-nested` y `data-nested-dialog-open` según la pieza.

Personalizar transiciones con clases sobre esos estados, o con `className(state)`/`style(state)`. Mantener la entrada y la salida coordinadas para que el desmontaje espere su transición. Conservar `motion-reduce:transition-none` y aplicar la escala mediante `motion-safe`; no introducir animaciones que ignoren esa preferencia.

El centrado de los activadores y el layout de la aplicación pertenecen a sus contenedores. El contenido portaleado conserva su propio diseño, incluidos el orden de lectura y la alineación de las acciones.
