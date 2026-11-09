# Toast

## 1. Identificación

Toast envuelve las piezas y los gestores de `@base-ui/react/toast`. own-ui añade `ToastStack` para la lista de esquina y combina sus clases con `clsx`. [API de Base UI](https://base-ui.com/react/components/toast)

## 2. Propósito y casos de uso

Comunica resultados breves, como una confirmación de guardado, un error de conexión o una acción reversible. Usa la lista de esquina para eventos generales y un aviso anclado para respuestas ligadas a un control visible. Para decisiones obligatorias, compón un Alert Dialog. Los errores que el usuario deba corregir en un campo se presentan junto al campo.

## 3. Importación y anatomía

Adapta el import a la [estructura del consumidor](../../structure.md).

```tsx
"use client";

import {
  Toast, ToastAction, ToastClose, ToastContent, ToastDescription, ToastPortal,
  ToastProvider, ToastStack, ToastTitle, ToastViewport, useToastManager,
} from "@/components/own/base/toast";

function Publisher() {
  const { add } = useToastManager();
  return (
    <button type="button" onClick={() => add({ title: "Cambios guardados", type: "success" })}>
      Guardar cambios
    </button>
  );
}

function Notifications() {
  const { toasts } = useToastManager();
  return (
    <ToastPortal>
      <ToastViewport aria-label="Notificaciones">
        <ToastStack>
          {toasts.map((toast) => (
            <Toast key={toast.id} toast={toast}>
              <ToastContent>
                <ToastTitle />
                <ToastDescription />
                <ToastAction />
                <ToastClose>Cerrar</ToastClose>
              </ToastContent>
            </Toast>
          ))}
        </ToastStack>
      </ToastViewport>
    </ToastPortal>
  );
}

export function ToastExample() {
  return <ToastProvider><Publisher /><Notifications /></ToastProvider>;
}
```

| Exportación | Nodo predeterminado y `data-slot` | Responsabilidad |
| :--- | :--- | :--- |
| `ToastProvider` | Contexto, sin nodo propio | Administra los avisos, el límite, el foco y los temporizadores. |
| `ToastPortal` | `div`, `toast-portal` | Monta la región en otro contenedor DOM. |
| `ToastViewport` | `div[role="region"]`, `toast-viewport` | Región accesible que coordina los anuncios y la navegación. |
| `ToastStack` | `div`, `toast-stack` | Lista desplazable de esquina para los avisos generales. Es una pieza propia de own-ui. |
| `Toast` | `div`, `toast` | Renderiza un objeto activo y coordina su cierre, medición y gesto. |
| `ToastContent` | `div`, `toast-content` | Contiene el mensaje y los controles. Base UI observa sus dimensiones. |
| `ToastTitle` | `h2`, `toast-title` | Da nombre al aviso. |
| `ToastDescription` | `p`, `toast-description` | Aporta la descripción y puede ser el único texto visible. |
| `ToastAction` | `button`, `toast-action` | Ejecuta la acción definida por el consumidor. |
| `ToastClose` | `button`, `toast-close` | Cierra el aviso. Aporta texto o un icono con nombre accesible. |
| `ToastPositioner` | `div`, `toast-positioner` | Coloca un aviso junto a un elemento de anclaje. |
| `ToastArrow` | `div`, `toast-arrow` | Señala visualmente el elemento anclado. |
| `useToastManager` | Hook | Lee `toasts` y expone `add`, `update`, `close` y `promise`. |
| `createToastManager` | Función | Crea un gestor utilizable fuera de componentes React. |

Usa un Viewport bajo el proveedor y renderiza el objeto actual de la cola con `key={toast.id}`. Monta Stack dentro de Viewport. Para avisos anclados, coloca Positioner como hermano de Stack y usa el mismo objeto `toast` en Positioner y en su Toast. Arrow va dentro de esa raíz.

- Entorno y cola: `ToastProviderProps`, `ToastPortalProps`, `ToastViewportProps` y `ToastStackProps`. Este último corresponde a las props nativas de un `div`.
- Aviso y acciones: `ToastProps`, `ToastContentProps`, `ToastTitleProps`, `ToastDescriptionProps`, `ToastActionProps` y `ToastCloseProps`.
- Aviso anclado: `ToastPositionerProps` y `ToastArrowProps`.
- Gestor: `ToastObject`, `ToastManager`, `ToastManagerAddOptions`, `ToastManagerUpdateOptions`, `ToastManagerPromiseOptions`, `ToastManagerPositionerProps` y `UseToastManagerReturnValue`.

## 4. Variantes y tamaños

El `type` heredado acepta cualquier cadena. own-ui asigna acentos a `info`, `success`, `warning`, `error` y `loading`, con un borde neutro para los demás valores. Ajusta las dimensiones con estilos. Stack ocupa hasta 25 rem de ancho incluidos sus márgenes interiores de 8 px. El posicionador anclado usa el ancho del contenido hasta un máximo de 20 rem o el espacio disponible.

## 5. Props y callbacks

| Pieza | Prop o callback | Tipo | Predeterminado | Opcional | Función y condiciones |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Provider | `timeout`, `limit` | `number` | `5000`, `3` | Sí | Duración predeterminada en ms y máximo simultáneo de avisos activos visibles. |
| Provider | `toastManager` | `ToastManager<Data>` | Gestor interno | Sí | Conecta el gestor creado fuera de React. |
| Portal | `container` | `HTMLElement \| ShadowRoot \| ref \| null` | `document.body` | Sí | Destino del portal. |
| Viewport | `aria-label` | `string` | `"Notifications"` | Sí | Nombre accesible de la región. Localízalo en el idioma de la interfaz. |
| Stack | Props de `div` | `ComponentPropsWithRef<"div">` | — | Sí | Admite estilos y atributos HTML, además de la ref del `div`. |
| Toast y Positioner | `toast` | `ToastObject<Data>` | — | No | Objeto actual de la cola. |
| Toast | `swipeDirection` | `"up" \| "down" \| "left" \| "right"` o arreglo | `"right"` en own-ui | Sí | Dirección física de descarte. `[]` desactiva el gesto. Base UI lo omite para avisos con `positionerProps.anchor`. |
| Positioner | `anchor`, `side`, `align` | `Element \| null`, `Side`, `Align` | —, `"top"`, `"center"` | Sí | Geometría del ancla y lado o alineación preferidos. Las props directas tienen prioridad sobre `toast.positionerProps`. |
| Positioner | `sideOffset`, `alignOffset` | `number \| ((geometry) => number)` | `0`, `0` | Sí | Separación en píxeles. La función recibe lado, alineación y dimensiones del ancla y del posicionador. |
| Positioner | `positionMethod`, `collisionBoundary`, `collisionPadding`, `collisionAvoidance` | Opciones de posicionamiento de Base UI | `"absolute"`, `"clipping-ancestors"`, `5`, política de Base UI | Sí | Define la estrategia de CSS y cómo se resuelven las colisiones. |
| Positioner | `arrowPadding`, `sticky`, `disableAnchorTracking` | `number`, `boolean`, `boolean` | `5`, `false`, `false` | Sí | Espacio interior de la flecha y ajustes de seguimiento o adherencia. |
| Title y Description | `children` | `React.ReactNode` | Campo del objeto `toast` | Sí | Sustituye el texto visible si se proporciona. |
| Action | `children` | `React.ReactNode` | `toast.actionProps?.children` | Sí | El contenido de `actionProps` tiene prioridad cuando está definido. Sin contenido renderizable, la pieza se omite. |
| Action y Close | `nativeButton` | `boolean` | `true` | Sí | Usa `false` con un elemento sustituto que carezca de semántica de botón nativo. |
| Piezas de Base UI con nodo | `className`, `style`, `render`, `ref` | Props heredadas de la pieza | Nodo predeterminado para `render` | Sí | Personalización estática o funcional y acceso al nodo. `ToastStack` acepta clases y estilos estáticos mediante sus props DOM. |

El hook y el gestor externo comparten los métodos siguientes. El arreglo reactivo `toasts` pertenece al hook.

| Método | Firma | Comportamiento |
| :--- | :--- | :--- |
| `add` | `(options: ToastManagerAddOptions<Data>) => string` | Devuelve el id. Repetir un id activo actualiza el aviso y reinicia su temporizador. |
| `update` | `(id, options \| ((previous: ToastObject<Data>) => options)) => void` | Combina un objeto parcial con el aviso activo. Pasar `timeout` vuelve a programar el cierre. |
| `close` | `(id?: string) => void` | Inicia el cierre del aviso indicado o de todos si se omite el id. |
| `promise` | `(task: Promise<Value>, options: ToastManagerPromiseOptions<Value, Data>) => Promise<Value>` | Crea un aviso de carga y lo actualiza al resolverse o rechazarse la tarea. Devuelve el resultado o el rechazo. |

En `add`, puedes pasar `id`, `title`, `description`, `type`, `priority`, `timeout`, `actionProps`, `positionerProps`, `data`, `onClose` y `onRemove`. `priority` es `"low"` por defecto o `"high"` para un anuncio urgente. `timeout` hereda el valor del proveedor y `0` mantiene el aviso abierto. `actionProps` contiene props de botón, incluido su handler. `positionerProps` aporta la geometría del ancla. Pasa `className`, `style` y `render` directamente a Positioner cuando quieras personalizar su nodo. `onClose()` se ejecuta al iniciar el cierre y `onRemove()` al quitar el aviso de la cola tras la salida.

## 6. Funcionamiento y estados

- La cola se renderiza de más nuevo a más antiguo. Stack usa flujo vertical invertido, con el aviso más nuevo junto al borde inferior. Al superar `limit`, Base UI marca los avisos más antiguos como `inert` y `data-limited` y own-ui los oculta. Si se libera espacio antes de que se cierren, pueden volver a mostrarse.
- Base UI pausa los temporizadores al pasar el puntero por la región, al navegar en ella con foco visible y al perder foco la ventana. `type="loading"` no inicia un temporizador. `promise` asigna `loading`, `success` o `error` al mismo id. Las opciones de cada fase pueden ser texto u objeto y, para éxito o error, una función del resultado o del rechazo.
- Toast expone `data-type`, `data-expanded`, `data-limited`, `data-swiping`, `data-swipe-direction`, `data-starting-style` y `data-ending-style`. Viewport expone `data-expanded`. Content expone `data-expanded` y `data-behind`. Title, Description, Action y Close exponen `data-type`. Positioner expone `data-side`, `data-align` y `data-anchor-hidden`. Arrow expone `data-side`, `data-align` y `data-uncentered`.
- El gestor externo publica en los proveedores suscritos. Llama sus métodos después de que el proveedor se monte y conserve la suscripción. La instancia externa no almacena avisos pendientes mientras está desconectada.

## 7. Estilos admitidos por pieza

| Pieza | Dimensiones y personalización |
| :--- | :--- |
| Provider y Portal | Provider organiza el contexto. En Portal puedes elegir contenedor, atributos y estilos del nodo que recibe la región. |
| Viewport y Stack | Viewport agrupa los avisos y dibuja el foco en Stack cuando se enfoca la región. Stack es fijo al final lógico, respeta el área segura inferior y limita la altura a la ventana dinámica. Usa `gap-2`, `p-2`, desplazamiento vertical y `z-50`. Ajusta posición, ancho y separación en Stack. |
| Toast | Tarjeta `surface-base` con `rounded-base`, `shadow-m`, borde de 1 px y acento de 4 px al inicio lógico. Los tipos usan las tríadas `info`, `success`, `warning`, `error` y `primary`. El foco visible usa un contorno interior `gray-bold`. El movimiento de arrastre se aplica en este nodo. |
| Content, Title y Description | Content usa `p-3` y espacio vertical de 8 px. Title usa texto pequeño seminegrita. Description usa `body-sm` y `gray-bold/75`. Ambas piezas permiten ajustar el salto de línea, el color o el elemento con `render`. |
| Action y Close | Controles con mínimo de 32 px, radio compartido y contorno exterior de foco. Action usa `surface-bold` y borde `gray-base`. Close eleva el fondo al pasar el puntero. Los SVG sin tamaño explícito se ajustan a 16 px. |
| Positioner y Arrow | Positioner limita el ancho con `--available-width` y se oculta si el ancla queda oculta. Arrow usa un cuadrado de 8 px girado con superficie y borde de la tarjeta. La posición y rotación siguen `data-side`. |

La tarjeta transiciona opacidad y transformación durante 200 ms con `motion-safe`. Entra desde 8 px más abajo y se desvanece al cerrar. Con movimiento reducido, los estados visuales cambian de inmediato y el gesto sigue el puntero. Los botones transicionan colores durante 150 ms con movimiento permitido.

El gesto usa `--toast-swipe-movement-x` y `--toast-swipe-movement-y` y Base UI aplica estilos inline mientras se arrastra. Con direcciones de descarte solo horizontales, un Stack desbordado prioriza el desplazamiento táctil nativo sobre el descarte táctil. La lista propia conserva el flujo, por lo que `--toast-index`, `--toast-offset-y`, `--toast-height` y `--toast-frontmost-height` quedan disponibles para otras composiciones. En los avisos anclados, conserva las posiciones inline y variables de Floating UI.

Usa `data-slot`, atributos de estado, clases o estilos para ajustes locales. Las clases estáticas y funcionales se combinan con `clsx` y la cascada resuelve conflictos. Los cambios en los tokens globales afectan a todas las piezas que los comparten. [globals.css](../../globals.md)

## 8. Ejemplos de composición

Con el gestor y el proveedor ya montados, puedes crear un aviso anclado desde un handler cliente. `anchor` es el elemento que inició la acción.

```tsx
const { add } = useToastManager();
function showAvailability(anchor: HTMLButtonElement) {
  add({
    id: "link-availability",
    title: "Enlace disponible",
    type: "info",
    positionerProps: { anchor, side: "top", sideOffset: 8 },
  });
}
```

En `Notifications`, separa los objetos cuyo `positionerProps?.anchor` sea distinto de `undefined`. Renderiza cada uno con `<ToastPositioner key={toast.id} toast={toast}>` y un `<Toast toast={toast}>` que contenga `ToastArrow` y las mismas piezas de contenido que en el ejemplo de anatomía. Conserva los objetos generales dentro de Stack y usa un solo Viewport para ambas composiciones.

Para una acción reversible, entrega `actionProps: { children: "Deshacer", onClick: undo }` a `add`. El handler `undo` restaura el estado del consumidor y puede llamar a `close(id)`. Usa `timeout: 0` si la acción debe permanecer disponible hasta el cierre manual. Para publicar desde funciones sin hooks, exporta una instancia estable de `createToastManager()` y pásala a `ToastProvider` mediante `toastManager`.

## 9. Accesibilidad e integración

- El viewport anuncia de forma cortés. Para avisos de prioridad alta, Base UI usa una región de alerta. Coloca el texto urgente directamente en `title` o `description` del objeto publicado, porque los hijos JSX de las piezas visibles no alimentan esa región.
- `F6` enfoca la región cuando hay avisos. Desde ahí, `Tab` entra en la lista y `Shift+Tab` devuelve el foco anterior. `Escape` cierra el aviso que contiene el foco. Base UI gestiona los cambios de foco al cerrar.
- Los botones solo icono requieren un nombre accesible. Usa acciones explícitas para alternativas al gesto. `data-base-ui-swipe-ignore` permite excluir un descendiente del arrastre. Base UI ya excluye los elementos interactivos.
- Con `render`, conserva props, eventos, hijos y ref de la pieza. El consumidor debe mantener los tokens del tema en el contenedor del portal. Coloca el proveedor y los handlers en módulos cliente de App Router y monta el proveedor desde un layout si la región debe persistir al navegar.

## 10. Límites y verificación

Exporta `toast.tsx` y `toast.module.css` con Base UI, `clsx` y las utilidades compartidas de Tailwind. La familia usa las piezas que entrega el consumidor para iconos y acciones.

Verifica la cola con alturas diferentes, los avisos limitados, el cierre con teclado y con gesto, la pausa del temporizador, el enfoque de la región y el comportamiento anclado. Comprueba la anchura móvil, el desplazamiento, ambos temas y el movimiento reducido. Si publicas promesas, maneja su rechazo según el flujo de la aplicación incluso cuando ya muestres un aviso de error.
