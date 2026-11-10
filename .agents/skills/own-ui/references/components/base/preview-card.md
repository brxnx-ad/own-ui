# Preview Card

## 1. Identificación

Preview Card envuelve las piezas de `@base-ui/react/preview-card` para mostrar la vista previa de un enlace, combina clases con `clsx` y reexporta su fábrica de handles. [API de Base UI](https://base-ui.com/react/components/preview-card)

## 2. Propósito y casos de uso

Úsala para dar contexto visual antes de abrir un enlace, como el resumen de una ficha o la descripción de una página del catálogo. La vista aparece al pasar el puntero o al enfocar el enlace con el teclado. El enlace sigue abriendo su destino.

Incluye la información de la vista previa en el destino para que esté disponible por la misma ruta con teclado, lector de pantalla o pantalla táctil. Si el contenido requiere acciones o edición dentro del panel, usa [Popover](popover.md).

## 3. Importación y anatomía

Resuelve la ruta y el alias según la [referencia de estructura](../../structure.md).

```tsx
import {
  createPreviewCardHandle,
  PreviewCard,
  PreviewCardBackdrop,
  PreviewCardPopup,
  PreviewCardPortal,
  PreviewCardPositioner,
  PreviewCardTrigger,
  PreviewCardViewport,
} from "@/components/own/base/preview-card";
```

| Exportación | Elemento | `data-slot` | Responsabilidad |
| :--- | :--- | :--- | :--- |
| `PreviewCard` | Sin nodo propio | — | Coordina el estado, el activador y sus datos. |
| `PreviewCardTrigger` | `a` | `preview-card-trigger` | Navega al destino y sirve de activador y ancla predeterminada. |
| `PreviewCardPortal` | `div` portaleado a `body` por defecto | `preview-card-portal` | Aloja el fondo y el posicionador en el destino del portal. |
| `PreviewCardBackdrop` | `div` de presentación | `preview-card-backdrop` | Atenúa visualmente la página. |
| `PreviewCardPositioner` | `div` de presentación | `preview-card-positioner` | Calcula la posición, las colisiones y el espacio disponible. |
| `PreviewCardPopup` | `div` | `preview-card-popup` | Muestra el resumen visual y queda fuera del recorrido de Tab y del árbol de accesibilidad por defecto. |
| `PreviewCardViewport` | `div` | `preview-card-viewport` | Presenta el contenido del activador actual cuando varios enlaces comparten la tarjeta. |
| `createPreviewCardHandle` | Sin nodo | — | Crea un handle tipado para vincular una raíz con sus activadores externos. |

También se exportan `PreviewCardHandle<Payload>`, `PreviewCardProps<Payload>`, `PreviewCardActions`, `PreviewCardChangeEventDetails`, `PreviewCardTriggerProps<Payload>` y los tipos `PreviewCardPortalProps`, `PreviewCardBackdropProps`, `PreviewCardPositionerProps`, `PreviewCardPopupProps` y `PreviewCardViewportProps`.

El portal contiene al posicionador y el fondo opcional es su hermano. El posicionador envuelve el popup. Usa el viewport como hijo directo del popup para aplicar los estilos de cambio de activador. El consumidor proporciona la URL, el texto del enlace y el resumen.

```tsx
<PreviewCard>
  <PreviewCardTrigger href="/catalogo">Catálogo</PreviewCardTrigger>
  <PreviewCardPortal>
    <PreviewCardPositioner>
      <PreviewCardPopup>
        <p>Consulta las fichas de todos los componentes.</p>
      </PreviewCardPopup>
    </PreviewCardPositioner>
  </PreviewCardPortal>
</PreviewCard>
```

## 4. Variantes y tamaños

La familia carece de variantes y tamaños propios. El popup tiene un ancho base de `18rem` limitado por el espacio disponible. Ajusta el ancho y el espaciado con CSS. Las props de lado, alineación y demora controlan la colocación y la interacción.

## 5. Props y callbacks

| Pieza | Prop o callback | Tipo | Predeterminado | Opcional | Función y condiciones |
| :--- | :--- | :--- | :--- | :--- | :--- |
| PreviewCard | `open`, `defaultOpen` | `boolean` | —, `false` | Sí | Estado controlado o apertura inicial no controlada. |
| PreviewCard | `onOpenChange` | `(open: boolean, details: PreviewCardChangeEventDetails) => void` | — | Sí | Recibe el estado solicitado. `details.cancel()` cancela el cambio. |
| PreviewCard | `onOpenChangeComplete` | `(open: boolean) => void` | — | Sí | Se ejecuta cuando finaliza la apertura o el cierre, incluidas las transiciones correspondientes. |
| PreviewCard | `triggerId`, `defaultTriggerId` | `string \| null` | — | Sí | Selecciona el enlace activo en modo controlado o al abrir inicialmente. |
| PreviewCard | `handle` | `PreviewCardHandle<Payload>` | — | Sí | Vincula activadores externos con la raíz montada. |
| PreviewCard | `children` | `ReactNode \| ({ payload }: { payload: Payload \| undefined }) => ReactNode` | — | Sí | Recibe contenido fijo o renderiza según el activador. |
| PreviewCard | `actionsRef` | `React.RefObject<PreviewCardActions \| null>` | — | Sí | Expone `close()` y `unmount()` para finalizar un cierre aplazado. |
| PreviewCardTrigger | `href`, `id` | `string` | —, ID generado | Sí | `href` establece el destino. Aporta la URL en el enlace nativo o al componer con `render`. `id` identifica el enlace para control externo. |
| PreviewCardTrigger | `delay`, `closeDelay` | `number` | `600`, `300` | Sí | Define las demoras en milisegundos. `delay` se usa al pasar el ratón y al abrir por foco de teclado. `closeDelay` se aplica al salir con el puntero. |
| PreviewCardTrigger | `handle`, `payload` | `PreviewCardHandle<Payload>`, `Payload` | — | Sí | Asocia una raíz externa y aporta los datos para renderizar la tarjeta. |
| PreviewCardPortal | `container` | `HTMLElement \| ShadowRoot \| ref \| null` | `body` | Sí | Elige el destino del portal. |
| PreviewCardPortal | `keepMounted` | `boolean` | `false` | Sí | Conserva los nodos del portal al cerrar la vista. |
| PreviewCardPositioner | `anchor` | `Element \| VirtualElement \| ref \| función \| null` | Activador | Sí | Define otra referencia de posición si la composición lo requiere. |
| PreviewCardPositioner | `positionMethod` | `"absolute" \| "fixed"` | `"absolute"` | Sí | Selecciona la estrategia de posición CSS. |
| PreviewCardPositioner | `side`, `align` | `"top" \| "bottom" \| "left" \| "right" \| "inline-start" \| "inline-end"`, `"start" \| "center" \| "end"` | `"bottom"`, `"center"` | Sí | Elige lado y alineación preferidos, sujetos a colisiones. |
| PreviewCardPositioner | `sideOffset`, `alignOffset` | `number \| OffsetFunction` | `8`, `0` | Sí | Separa la tarjeta del ancla en cada eje. La función recibe el lado, la alineación y las medidas de ancla y posicionador. |
| PreviewCardPositioner | `collisionBoundary`, `collisionPadding` | `Boundary`, `Padding` | `"clipping-ancestors"`, `5` | Sí | Ajusta los límites de colocación y su separación. |
| PreviewCardPositioner | `collisionAvoidance` | `CollisionAvoidance` | Ajuste de Base UI con alternativa perpendicular hacia el final | Sí | Controla el cambio de lado, el desplazamiento y la alternativa perpendicular. |
| PreviewCardPositioner | `sticky`, `disableAnchorTracking` | `boolean` | `false` | Sí | Cambia el cálculo de posición al desplazarse el ancla o desactiva el seguimiento de cambios de layout. |
| Piezas con nodo | `className`, `style` | `string`, `CSSProperties` o funciones del estado | — | Sí | Añade clases o estilos al nodo correspondiente. |
| Piezas con nodo | `render`, `ref`, atributos y eventos HTML | Según la pieza | Elemento de anatomía, —, — | Sí | Compone o accede al nodo. Conserva su semántica y los atributos de la primitiva. |

El valor predeterminado de `sideOffset` es propio de own-ui. El resto de las props de interacción y los callbacks provienen de Base UI. Los tipos auxiliares del posicionamiento se infieren de `PreviewCardPositionerProps`.

`details.reason` admite `trigger-hover`, `trigger-focus`, `trigger-press`, `outside-press`, `escape-key`, `imperative-action` y `none`. El detalle incluye el evento y puede incluir `trigger`. Para terminar el cierre con una animación externa, llama a `details.preventUnmountOnClose()` y después a `actionsRef.current?.unmount()` al finalizar. El portal decide si conserva su contenido mediante `keepMounted`.

`createPreviewCardHandle<Payload>()` devuelve un handle con `open(triggerId)`, `close()` e `isOpen`. `open(id)` requiere un activador registrado con ese ID y el mismo handle. Los métodos se invocan desde un evento o un efecto y tienen efecto mientras la raíz esté montada.

## 6. Funcionamiento y estados

- La tarjeta abre con el ratón o el foco visible de teclado. El puntero puede pasar del enlace a la tarjeta manteniéndola abierta. Escape permite cerrarla y el enlace conserva su navegación.
- Usa `defaultOpen` para un valor inicial y `open` con `onOpenChange` para controlar el estado. Con varios activadores controlados, asigna un `id` a cada enlace y conserva en `triggerId` el que recibe `details.trigger` al abrir.
- Con un handle compartido, el `payload` del activador selecciona el contenido. El viewport puede remontar sus hijos al cambiar de enlace. Si necesitas conservar datos entre enlaces, almacénalos fuera de ese viewport.
- El portal desmonta su contenido después del cierre por defecto. Con `keepMounted`, conserva los nodos ocultos. Durante el cierre, el posicionador impide la interacción con la tarjeta.
- El enlace activo usa `data-popup-open`. Positioner, Popup y Backdrop exponen `data-open` y `data-closed`. Positioner y Popup exponen `data-side` y `data-align`. Positioner usa `data-anchor-hidden` cuando se oculta el ancla.
- Popup y Backdrop exponen `data-starting-style` y `data-ending-style`. Popup y Viewport pueden indicar `data-instant`. Viewport aporta `data-transitioning` y `data-activation-direction`. Base UI usa hijos directos `data-current` y `data-previous` para el contenido en transición. own-ui oculta el hijo anterior al cambiar de activador.

## 7. Estilos admitidos por pieza

| Pieza | Estilo base y ajustes |
| :--- | :--- |
| PreviewCard | Comparte estado sin generar un nodo visual. El consumidor controla la separación exterior de los enlaces. |
| Trigger | Mantiene el flujo del texto, con subrayado, peso medio y radio pequeño. Usa `primary-bold` en claro y `content-bold` en oscuro. El subrayado gana grosor al pasar el puntero o abrir. El foco visible dibuja un contorno `primary-base` separado 2 px. |
| Portal | Hereda el tema y el apilamiento de su destino. Se puede personalizar su contenedor. |
| Backdrop | Usa `fixed inset-0 z-40` con `gray-bold/40` en claro y `surface-soft/70` en oscuro. La primitiva deja pasar el puntero. |
| Positioner | Usa `z-50` y el ancho máximo `--available-width`. Oculta la tarjeta si aparece `data-anchor-hidden`. Si se usa `sticky` y el diseño necesita visibilidad con el ancla oculta, ajusta `visibility` en el posicionador. |
| Popup | Caja de `w-72 p-4 rounded-base`, borde `gray-base`, fondo `surface-base`, texto `content-bold` y `shadow-m`. Limita ancho y alto a `--available-width` y `--available-height`. Recorta el desborde, por lo que el resumen debe ser breve. El consumidor aporta su distribución y tipografía interior. |
| Viewport | Recorta el contenido durante el cambio y oculta de inmediato `data-previous`. Como hijo directo del popup, activa el alto medido `--popup-height` y fija temporalmente las dimensiones del posicionador mediante `--positioner-width` y `--positioner-height`. |

Las transiciones de apertura y cierre combinan opacidad y escala durante 150 ms con origen `--transform-origin`. El fondo usa opacidad. Al cambiar entre activadores, el contenido actual aparece con opacidad progresiva y el alto del popup puede transicionar. Los estados instantáneos y la preferencia de movimiento reducido omiten las transiciones correspondientes.

Los colores heredan [los tokens compartidos](../../globals.md). `className` puede ser una cadena o función de estado. Los wrappers estilizados combinan clases con `clsx` con la excepción de colores descrita en [globals](../../globals.md#composición-y-precedencia-de-clases). `style` admite un objeto o función del estado y actúa sobre la pieza. Por ejemplo, `<PreviewCardPopup style={{ width: "16rem" }}>` ajusta la tarjeta dentro del ancho disponible. Al usar `render`, conserva atributos, eventos, refs y estilos de posición.

## 8. Ejemplos de composición

Enlace interno de App Router con un resumen complementario. La URL se entrega al componente Link.

```tsx
import Link from "next/link";
import {
  PreviewCard,
  PreviewCardPopup,
  PreviewCardPortal,
  PreviewCardPositioner,
  PreviewCardTrigger,
} from "@/components/own/base/preview-card";

export function CatalogPreview() {
  return (
    <PreviewCard>
      <PreviewCardTrigger render={<Link href="/catalogo" />}>Catálogo</PreviewCardTrigger>
      <PreviewCardPortal>
        <PreviewCardPositioner side="top" align="start">
          <PreviewCardPopup>
            <p className="body-sm">Consulta las fichas de todos los componentes.</p>
          </PreviewCardPopup>
        </PreviewCardPositioner>
      </PreviewCardPortal>
    </PreviewCard>
  );
}
```

Para compartir una tarjeta entre enlaces separados, crea un handle estable por montaje y pásalo a ambos enlaces y a la raíz. El siguiente fragmento va en un módulo cliente, dentro de un componente que ya importa `useState`, Link y las piezas de la anatomía.

```tsx
const [handle] = useState(createPreviewCardHandle<string>);

return (
  <>
    <PreviewCardTrigger handle={handle} payload="Guías de integración" render={<Link href="/guias" />}>
      Guías
    </PreviewCardTrigger>
    <PreviewCardTrigger handle={handle} payload="Ejemplos de composición" render={<Link href="/ejemplos" />}>
      Ejemplos
    </PreviewCardTrigger>
    <PreviewCard handle={handle}>
      {({ payload }) => (
        <PreviewCardPortal>
          <PreviewCardPositioner>
            <PreviewCardPopup>
              <PreviewCardViewport>
                <p className="body-sm">{payload}</p>
              </PreviewCardViewport>
            </PreviewCardPopup>
          </PreviewCardPositioner>
        </PreviewCardPortal>
      )}
    </PreviewCard>
  </>
);
```

## 9. Accesibilidad e integración

- Proporciona un nombre descriptivo y un destino real al enlace. Tab recorre los enlaces y Enter navega al destino. Escape descarta la vista previa. El fondo es visual y el popup carece de un gestor modal de foco.
- El popup es contenido complementario y el wrapper lo marca con `aria-hidden` y omite `tabIndex`. Conserva esas condiciones al personalizarlo y mantén sus hijos libres de controles enfocables. La página enlazada ofrece el contenido en la navegación normal.
- Con `render` usa un enlace real para el activador y conserva su `href`, eventos, estado visual y ref. En App Router puedes componer con `next/link`.
- El destino del portal debe recibir el tema y las utilidades. Si usas un contenedor personalizado o ShadowRoot, comprueba el recorte y el apilamiento de Positioner y Backdrop. [Estructura y composición](../../structure.md)

## 10. Límites y verificación

Exporta `preview-card.tsx` desde `base/` con los tokens de [globals.css](../../globals.md). Sus clases se generan desde el módulo. Coloca estado, callbacks y handles en una frontera cliente.

Verifica apertura por foco y puntero, cierre con Escape, navegación al destino, colisiones, ambos temas y anchos pequeños. Al compartir una tarjeta, prueba el cambio en ambos sentidos y con movimiento reducido para comprobar que el resumen anterior se oculta al moverse el anclaje. En pantallas táctiles, verifica que el enlace abra el destino.

Para exportar esta familia, incluye `preview-card.module.css` junto con `preview-card.tsx`. El módulo contiene las transiciones propias y respeta la preferencia de movimiento reducido.
