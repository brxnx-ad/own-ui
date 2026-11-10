# Scroll Area

## 1. Identificación

Scroll Area envuelve las seis piezas de `@base-ui/react/scroll-area` y usa `clsx` para combinar los estilos de own-ui. [API de Base UI](https://base-ui.com/react/components/scroll-area)

## 2. Propósito y casos de uso

Acota el desplazamiento nativo a una parte de la interfaz y muestra una barra personalizada para cada eje que el consumidor configure. Úsalo para listas largas dentro de un panel, filas horizontales o tablas que superen el ancho y la altura disponibles. Se puede desplazar con rueda, panel táctil, gestos, teclado o arrastre del indicador.

Usa el desplazamiento de página para contenido que pueda seguir el flujo normal. Si solo necesitas una región con las barras del sistema, basta un contenedor con overflow nativo. La virtualización se integra por separado.

## 3. Importación y anatomía

Adapta el alias y la ruta según la [referencia de estructura](../../structure.md).

~~~tsx
import {
  ScrollArea,
  ScrollAreaContent,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
} from "@/components/own/base/scroll-area";

export function ActivityList() {
  return (
    <ScrollArea className="w-full rounded-base border border-gray-base bg-surface-bold">
      <ScrollAreaViewport role="region" aria-label="Actividad reciente" className="max-h-24">
        <ScrollAreaContent className="py-2 ps-4 pe-6">
          <ul className="body-sm space-y-2">
            <li>Se guardó el borrador.</li>
            <li>Se generó la vista previa.</li>
            <li>Se verificaron los enlaces.</li>
            <li>Se publicó la actualización.</li>
          </ul>
        </ScrollAreaContent>
      </ScrollAreaViewport>
      <ScrollAreaScrollbar>
        <ScrollAreaThumb />
      </ScrollAreaScrollbar>
    </ScrollArea>
  );
}
~~~

| Exportación | Elemento | `data-slot` | Responsabilidad |
| :--- | :--- | :--- | :--- |
| `ScrollArea` | `div` | `scroll-area` | Agrupa las piezas y coordina la medición. |
| `ScrollAreaViewport` | `div` desplazable | `scroll-area-viewport` | Recibe el foco, contiene el desplazamiento nativo y calcula la distancia a cada borde. |
| `ScrollAreaContent` | `div[role="presentation"]` | `scroll-area-content` | Envuelve el contenido y observa sus cambios de tamaño. |
| `ScrollAreaScrollbar` | `div[aria-hidden="true"]` | `scroll-area-scrollbar` | Coloca la pista de un eje y gestiona la interacción con el puntero. |
| `ScrollAreaThumb` | `div` | `scroll-area-thumb` | Indica la posición y permite cambiarla mediante arrastre. |
| `ScrollAreaCorner` | `div[aria-hidden="true"]` | `scroll-area-corner` | Ocupa la intersección de dos barras. |

El módulo exporta estos tipos de Base UI para las piezas correspondientes:

- Raíz y viewport: `ScrollAreaProps`, `ScrollAreaState`, `ScrollAreaViewportProps` y `ScrollAreaViewportState`.
- Contenido y esquina: `ScrollAreaContentProps`, `ScrollAreaContentState`, `ScrollAreaCornerProps` y `ScrollAreaCornerState`.
- Barra y tirador: `ScrollAreaScrollbarProps`, `ScrollAreaScrollbarState`, `ScrollAreaThumbProps` y `ScrollAreaThumbState`.

Coloca Content dentro de Viewport y un Thumb dentro de cada Scrollbar. Las barras son hermanas de Viewport dentro de la raíz. Añade Corner como hermano de las barras cuando compongas ambos ejes. El consumidor aporta el contenido, su nombre accesible cuando corresponda y los límites de tamaño.

## 4. Variantes y tamaños

La familia carece de props propias de variante o tamaño. La prop heredada `orientation` elige el eje de cada barra y usa `"vertical"` por defecto. Con ambas barras, Corner reserva su intersección. La orientación solo configura la barra. El overflow nativo depende del contenido y de las dimensiones del viewport.

La pista mide `1rem` en el eje transversal con el espaciado predeterminado de Tailwind. Su padding es `0.1875rem` por lado. Base UI ajusta el largo del indicador según la proporción visible, con un mínimo de 16 px.

## 5. Props y callbacks

| Pieza | Prop o callback | Tipo | Predeterminado | Opcional | Función y condiciones |
| :--- | :--- | :--- | :--- | :--- | :--- |
| ScrollArea | `overflowEdgeThreshold` | `number \| Partial<{ xStart: number; xEnd: number; yStart: number; yEnd: number }>` | `0` | Sí | Umbral heredado, en píxeles. Acepta un valor común o uno por borde. Las claves omitidas y los valores negativos se tratan como 0. |
| ScrollAreaViewport | `onScroll` | `(event: BaseUIEvent<React.UIEvent<HTMLDivElement>>) => void` | — | Sí | Evento HTML tipado por Base UI. Lee la posición desde `event.currentTarget`. |
| ScrollAreaViewport | `tabIndex` | `number` | `0` con desbordamiento, `-1` sin él | Sí | Atributo HTML. Mantén el valor dinámico de Base UI para conservar la navegación por teclado. |
| ScrollAreaScrollbar | `orientation` | `"vertical" \| "horizontal"` | `"vertical"` | Sí | Opción heredada. Determina el eje de la pista y su indicador. |
| ScrollAreaScrollbar | `keepMounted` | `boolean` | `false` | Sí | Opción heredada. Conserva la pista y su indicador en el DOM cuando ese eje no desborda. |
| Todas | `className` | `string \| ((state) => string \| undefined)` | — | Sí | Añade clases estáticas o calculadas para la pieza. |
| Todas | `style` | `React.CSSProperties \| ((state) => React.CSSProperties \| undefined)` | — | Sí | Aplica estilos inline estáticos o calculados al nodo de la pieza. |
| Todas | `render` | `React.ReactElement \| ((props, state) => React.ReactElement)` | `div` | Sí | Reemplaza el nodo conservando las props necesarias para la primitiva. |
| Todas | `ref`, atributos y eventos HTML | `React.Ref<HTMLDivElement>` y atributos según la pieza | — | Sí | Accede al nodo y añade atributos, como `role` y `aria-label` en Viewport. |

No hay callbacks propios de cambio de posición. `onScroll` recibe un evento de React sin motivo de cambio. Base UI permite omitir su handler con `event.preventBaseUIHandler()`, lo que interrumpe la sincronización de las barras y los bordes. Deja que ese handler se ejecute cuando solo necesitas observar la posición.

## 6. Funcionamiento y estados

- El DOM mantiene la posición del desplazamiento. Para leer o cambiar la posición desde un componente cliente, usa el ref de Viewport y sus propiedades `scrollTop` y `scrollLeft` o su método `scrollTo()`.
- Base UI mide Viewport y Content para actualizar las barras cuando cambian sus dimensiones. Por defecto, desmonta la barra de un eje que deja de desbordar. Con `keepMounted`, own-ui conserva el nodo oculto con `visibility: hidden` hasta que vuelva a necesitarse. Corner se monta cuando hay overflow en ambos ejes.
- Los indicadores de borde se activan cuando la distancia restante supera estrictamente su umbral. Los umbrales modifican los atributos de borde, mientras que la detección de overflow y las variables CSS de distancia siguen reflejando la medición real.

| Pieza | Atributos de estado de Base UI |
| :--- | :--- |
| ScrollArea, Viewport y Content | `data-scrolling`, `data-has-overflow-x`, `data-has-overflow-y`, `data-overflow-x-start`, `data-overflow-x-end`, `data-overflow-y-start` y `data-overflow-y-end`. |
| Scrollbar | Los mismos atributos, con `data-scrolling` específico del eje, más `data-hovering` y `data-orientation`. |
| Thumb | `data-orientation` y `data-scrolling` del eje de su barra. |
| Corner | Solo el `data-slot` propio. Su presencia depende del overflow de ambos ejes. |

El estado de raíz también incluye `cornerHidden` en las funciones de estilo y `render` de Root, Viewport, Content y Scrollbar. Ese valor no tiene un atributo DOM correspondiente.

## 7. Estilos admitidos por pieza

| Pieza | Dimensiones, color y ajustes locales |
| :--- | :--- |
| ScrollArea | Define el ancho, el radio, el borde y la superficie de la instancia en la raíz, por ejemplo con `w-full max-w-lg rounded-base border border-gray-base bg-surface-bold`. La raíz aporta mínimos de ancho y alto de cero y un contexto aislado. El margen exterior y la separación pertenecen al contenedor. |
| Viewport | Ocupa el tamaño de la raíz cuando sus dimensiones están definidas, hereda su radio y usa un contorno interior `gray-bold` al recibir foco visible. Define un límite vertical con `max-h-48` en Viewport o una altura definida en la raíz. En un layout flex o grid, permite que la región encoja. Conserva el overflow del viewport para mantener el desplazamiento y la medición. |
| Content | Añade padding, gaps y tipografía, por ejemplo `body-sm pe-6 pb-6`. Reserva espacio en los bordes donde las barras se superponen al contenido. Base UI usa `min-width: fit-content`. Controla el ancho intrínseco de los hijos para activar o evitar el desplazamiento horizontal. |
| Scrollbar | Usa `surface-soft`. Ajusta el grosor en el eje transversal con `style={{ width: "1.25rem" }}` para la vertical o con `style={{ height: "1.25rem" }}` para la horizontal. Conserva su posición absoluta y permite que Base UI mida su tamaño y padding. |
| Thumb | Usa radio completo y `gray-bold` al 55 % en reposo y al 75 % con hover o desplazamiento del eje. En colores forzados usa `CanvasText`. Ajusta color y radio en este nodo. Conserva el largo medido, su `transform` y su ocupación transversal. |
| Corner | Usa `surface-soft`. Puedes ajustar su fondo para acompañar a las barras. Base UI calcula su ancho y alto a partir del grosor de ambas pistas y los usa para acortar las barras. |

Las piezas reutilizables no fijan la tipografía del contenido ni añaden sombras. Los tokens de superficie, texto y foco se adaptan al tema del consumidor. Para un ajuste de instancia, aplica clases, estilos o selectores sobre el nodo indicado. Cambiar los tokens de [globals.css](../../globals.md) afecta a las demás piezas que los consumen.

Base UI define `--scroll-area-corner-width` y `--scroll-area-corner-height` en Root, `--scroll-area-thumb-height` o `--scroll-area-thumb-width` en la barra correspondiente y `--scroll-area-overflow-x-start`, `--scroll-area-overflow-x-end`, `--scroll-area-overflow-y-start` y `--scroll-area-overflow-y-end` en Viewport. Usa estas últimas en el propio viewport para efectos dependientes de la distancia. La herencia automática de esas variables depende del navegador.

El color de Thumb transiciona durante 150 ms con `motion-safe`. Con movimiento reducido, cambia de inmediato. La posición y el largo se sincronizan con el desplazamiento nativo, sin una transición añadida. Evita animar esos valores si necesitas que el indicador siga al puntero con precisión. Las barras aparecen o se ocultan según la medición sin animación de montaje.

Los wrappers combinan `className` estático o funcional con sus clases base mediante `clsx`. Content delega `className` directamente porque carece de clases propias. Base UI combina los estilos, eventos y refs que intervienen en la composición. Los estilos inline pueden sobrescribir la geometría interna y, salvo la [excepción de colores `content`](../../globals.md#composición-y-precedencia-de-clases), las utilidades en conflicto se resuelven por cascada. Conserva los eventos y el ref recibidos al sustituir el nodo con `render`.

## 8. Ejemplos de composición

El ejemplo de anatomía muestra una lista vertical. En una fila horizontal, usa `orientation="horizontal"`, conserva un ancho intrínseco mayor que el viewport y reserva espacio inferior para la pista.

Para un plano en ambos ejes, monta una pista por eje y Corner. Este ejemplo recibe del consumidor el contenido del plano.

~~~tsx
import type { ReactNode } from "react";
import {
  ScrollArea,
  ScrollAreaContent,
  ScrollAreaCorner,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
} from "@/components/own/base/scroll-area";

export function PlanViewport({ children }: { children: ReactNode }) {
  return (
    <ScrollArea className="w-full max-w-lg rounded-base border border-gray-base bg-surface-bold">
      <ScrollAreaViewport role="region" aria-label="Plano de la planta" className="h-56">
        <ScrollAreaContent className="min-h-80 min-w-2xl p-4 pe-7 pb-7">
          {children}
        </ScrollAreaContent>
      </ScrollAreaViewport>
      <ScrollAreaScrollbar><ScrollAreaThumb /></ScrollAreaScrollbar>
      <ScrollAreaScrollbar orientation="horizontal"><ScrollAreaThumb /></ScrollAreaScrollbar>
      <ScrollAreaCorner />
    </ScrollArea>
  );
}
~~~

Para señalar contenido por debajo del área visible, añade `overflowEdgeThreshold={{ yEnd: 16 }}` a Root y usa `data-overflow-y-end` como selector del indicador decorativo. Para conservar una barra al cambiar los datos, añade `keepMounted` a la barra de ese eje.

## 9. Accesibilidad e integración

- Base UI añade el viewport al orden de tabulación cuando hay desbordamiento. Enfócalo con Tab y usa las flechas correspondientes al eje. El navegador gestiona el desplazamiento por teclado y los gestos. Las barras personalizadas son decorativas para tecnologías de asistencia y se operan con el puntero.
- Si el área merece un punto de referencia, usa `role="region"` junto con `aria-labelledby` o `aria-label` en Viewport. Conserva los roles del contenido, como listas, encabezados y tablas. Mantén visibles el contorno del viewport y el foco de los controles dentro de él.
- Con `render`, conserva un elemento contenedor compatible con overflow y propaga sus props, estilos, eventos y ref al mismo nodo. Mantén el módulo interactivo como componente cliente. Una página de servidor puede componerlo con contenido estático y props serializables.

## 10. Límites y verificación

Distribuye `scroll-area.tsx` con Base UI, `clsx` y la configuración común de Tailwind de own-ui. No requiere iconos, familias propias adicionales ni un bloque específico de CSS global. Comprueba que Tailwind detecte el módulo y genere las utilidades condicionales de overflow, orientación y movimiento.

Verifica cada eje, la aparición de Corner con ambas barras, la navegación por teclado y el arrastre, además de la medición tras cambiar el tamaño o el contenido. Comprueba que el contenido siga accesible en los bordes, en temas claro y oscuro, con movimiento reducido y en un ancho de pantalla pequeño. Las barras se miden en el cliente, por lo que las dimensiones calculadas y los atributos de overflow aparecen después de la hidratación.
