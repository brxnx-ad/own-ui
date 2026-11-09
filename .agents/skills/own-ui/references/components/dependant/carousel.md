# Carousel

## 1. Identificación

Carousel usa `embla-carousel-react` para medir y desplazar las diapositivas y compone Button y Chevron de own-ui para la navegación.

## 2. Propósito y casos de uso

Presenta una colección en una ventana de tamaño acotado. Permite recorrer una diapositiva o un grupo por posición, como en una galería o una fila de tarjetas. El consumidor aporta el contenido, la separación exterior y la ubicación de los controles.

## 3. Importación y anatomía

```tsx
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPagination,
  CarouselPrevious,
} from "@/components/own/dependant/carousel";

<Carousel aria-label="Destinos">
  <CarouselContent>
    <CarouselItem aria-label="Cordillera">Cordillera</CarouselItem>
    <CarouselItem aria-label="Costa">Costa</CarouselItem>
  </CarouselContent>
  <div className="flex items-center justify-center gap-2">
    <CarouselPrevious />
    <CarouselPagination />
    <CarouselNext />
  </div>
</Carousel>
```

| Pieza | Elemento predeterminado | Responsabilidad |
| :--- | :--- | :--- |
| `Carousel` | `div` con rol `region` | Inicializa Embla y añade una región viva para anunciar la posición. |
| `CarouselContent` | Dos `div` | El exterior recorta el desbordamiento y recibe la ref de Embla. El interior es la pista. |
| `CarouselItem` | `div` con rol `group` | Cada diapositiva es un hijo directo de la pista. |
| `CarouselPrevious`, `CarouselNext` | `button` | Retroceden o avanzan una posición. Van dentro de la raíz y fuera de `CarouselContent`. |
| `CarouselPagination` | `div` con rol `group` y botones | Elige una posición. Va dentro de la raíz y fuera de `CarouselContent`. |

El módulo también exporta los tipos `CarouselApi`, `CarouselOptions`, `CarouselOrientation`, `CarouselProps`, `CarouselContentProps`, `CarouselItemProps`, `CarouselControlProps` y `CarouselPaginationProps`.

## 4. Variantes y tamaños

`orientation` determina el eje horizontal o vertical. `dir` ajusta el sentido horizontal. Las diapositivas ocupan el 100 % de la ventana en el eje de desplazamiento. En vertical, la ventana parte de 16 rem de alto. Los controles direccionales exponen las variantes y tamaños de [Button](../base/button.md) y parten de `outline` y `sm`. Los indicadores tienen botones de 32 px con puntos de 8 px.

## 5. Props y callbacks

| Pieza | Prop o callback | Tipo | Predeterminado | Opcional | Función y condiciones |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Carousel, Item | `aria-label` o `aria-labelledby` | `string` | — | Uno obligatorio | Nombra la colección o la diapositiva. |
| Carousel | `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | Sí | Configura el eje, la pista y las flechas. |
| Carousel | `dir` | `"ltr" \| "rtl"` | `"ltr"` | Sí | Configura el sentido del contenido y la navegación horizontal. |
| Carousel | `role` | `"region" \| "group"` | `"region"` | Sí | Elige si la colección constituye una región de la página. |
| Carousel | `options` | `CarouselOptions` | Opciones de Embla | Sí | Subconjunto de opciones descritas abajo. |
| Carousel | `onApiChange` | `(api: CarouselApi \| undefined) => void` | — | Sí | Entrega la instancia al inicializar y `undefined` al liberar la referencia o sustituir el callback. Usa una función estable o un setter de estado. |
| Carousel | `formatStatus` | `(position: number, total: number) => string` | `Posición X de Y` | Sí | Personaliza la región viva. La posición empieza en 1. |
| Carousel | `tabIndex`, `onKeyDown` | Props de `div` | `0`, — | Sí | Gestionan el foco y reciben el evento antes del manejo interno. Usa `preventDefault()` para cancelar la navegación. |
| CarouselContent | `viewportClassName` | `string` | — | Sí | Añade clases al nodo exterior. |
| CarouselPrevious, Next | `variant`, `size`, `icon` | `ButtonVariant`, `ButtonSize`, `ReactNode` | `"outline"`, `"sm"`, Chevron | Sí | Ajustan el Button direccional. Chevron gira según el eje y el sentido. |
| CarouselPrevious, Next | `aria-label`, `disabled` | `string`, `boolean` | `Posición anterior` o `Posición siguiente`, `false` | Sí | Cambian el nombre y añaden un bloqueo al calculado por Embla. |
| CarouselPrevious, Next | `onClick` | `ButtonProps["onClick"]` | — | Sí | Se ejecuta antes de avanzar o retroceder. Usa `preventDefault()` para cancelar el desplazamiento. |
| CarouselPagination | `getLabel` | `(position: number, total: number) => string` | `Ir a la posición X de Y` | Sí | Nombra cada indicador. La posición empieza en 1. |
| CarouselPagination | `aria-label` | `string` | `Posiciones` | Sí | Nombra el grupo de indicadores. |
| Piezas con nodo | `className`, `style`, `ref` | Props del nodo | — | Sí | En `CarouselContent` apuntan a la pista. Los controles direccionales aceptan `className` como cadena. |

| Opciones de Embla admitidas | Predeterminado | Función |
| :--- | :--- | :--- |
| `align`, `containScroll` | `"center"`, `"trimSnaps"` | Alineación de las posiciones y ajuste en los extremos. |
| `loop`, `startIndex` | `false`, `0` | Bucle cuando la geometría lo permite e índice inicial de base cero. |
| `slidesToScroll` | `1` | Un número fijo o `"auto"` para agrupar según el tamaño visible. |
| `dragFree`, `skipSnaps` | `false`, `false` | Inercia libre y salto de posiciones con un gesto fuerte. |
| `duration`, `watchDrag` | `25`, `true` | Ajustan la duración interna de la navegación y habilitan o personalizan el arrastre. |

Consulta las firmas y condiciones en [las opciones de Embla v8](https://www.embla-carousel.com/docs/v8/api/options).

## 6. Funcionamiento y estados

- Embla calcula las posiciones a partir de las dimensiones y las opciones. Una posición puede reunir varias diapositivas. Los controles, el indicador activo y el anuncio se sincronizan con `select` y `reInit`, incluidos cambios de tamaño o de contenido.
- Los botones direccionales se deshabilitan en los límites y conservan el foco. Con menos de dos posiciones, la paginación se oculta. El indicador actual conserva el foco y expone `data-current`, `aria-current` y `aria-disabled`.
- El motor se libera al desmontar el carrusel. `onApiChange` permite obtener la instancia para leer el estado, suscribirse a eventos o llamar a métodos de navegación.
- Slots disponibles: `carousel`, `carousel-status`, `carousel-viewport`, `carousel-content`, `carousel-item`, `carousel-previous`, `carousel-next`, `carousel-pagination` y `carousel-page`. La raíz expone `data-orientation`.

## 7. Estilos admitidos por pieza

- La raíz usa `rounded-base` y un anillo `primary-base` al recibir foco visible. Aplica superficies y sombras al contenido según su contexto. La raíz y la pista carecen de relleno y separación exterior predeterminados.
- Ajusta la ventana con `viewportClassName` y la pista con `className`, por ejemplo para añadir un `gap`. Ajusta la base flexible de cada diapositiva para mostrar más de una. Conserva una altura definida en vertical y el recorte del viewport en ambos ejes.
- Los controles direccionales usan la geometría y los colores de Button. La paginación usa `primary-base` para la posición actual y `gray-bold/50` para las demás. Los colores siguen las tríadas de ambos temas.
- Las clases se combinan mediante `clsx`. Para sustituir la altura vertical, usa, por ejemplo, `viewportClassName="h-40!"`. Aplica un espacio interior a las diapositivas que contengan controles si el borde del viewport recorta sus anillos de foco.
- Embla mueve la pista y aplica duración 0 a la navegación programática con `prefers-reduced-motion: reduce`. El arrastre sigue disponible. Las transiciones de los botones propios se desactivan con movimiento reducido.

## 8. Ejemplos de composición

```tsx
import {
  Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious,
} from "@/components/own/dependant/carousel";

export function PreparationSteps() {
  return (
    <Carousel aria-label="Preparación de la salida" orientation="vertical" options={{ loop: true }}>
      <CarouselContent viewportClassName="h-40!">
        <CarouselItem aria-label="Equipo">Revisar el equipo</CarouselItem>
        <CarouselItem aria-label="Tiempo">Consultar el tiempo</CarouselItem>
        <CarouselItem aria-label="Trayecto">Compartir el plan</CarouselItem>
      </CarouselContent>
      <div className="flex justify-center gap-2">
        <CarouselPrevious />
        <CarouselNext />
      </div>
    </Carousel>
  );
}
```

Para navegar por grupos adaptables, combina `options={{ align: "start", slidesToScroll: "auto" }}` con una base flexible menor a partir del ancho deseado. Si consumes `onApiChange` o pasas handlers, define esa composición en un Client Component.

## 9. Accesibilidad e integración

- Nombra la colección y cada diapositiva con `aria-label` o referencia un encabezado visible con `aria-labelledby`. Usa `role="group"` en la raíz cuando una región adicional no aporte valor.
- Con foco en la raíz, usa las flechas del eje activo. Los controles se operan con Tab, Enter y Espacio. Los eventos de teclado dentro del contenido conservan su comportamiento. Embla desplaza la pista al enfocar un control en una diapositiva que quedó fuera de la vista.
- La posición anunciada puede corresponder a un grupo. Localiza `formatStatus`, `getLabel`, los nombres de los controles y `aria-roledescription` de la raíz y las diapositivas según el idioma de la aplicación. [Patrón de carrusel de WAI](https://www.w3.org/WAI/ARIA/apg/patterns/carousel/)

## 10. Límites y verificación

- El avance es manual. El bucle enlaza los extremos cuando las medidas lo permiten. Para mantener la geometría y los observadores del wrapper, configura el eje, el sentido y las opciones desde sus props.
- Para exportar la familia, copia los archivos de [estructura](../../structure.md#compatibilidad-y-archivos-necesarios), integra los tokens de own-ui e instala `embla-carousel-react` 8.6.0. Los tipos se derivan del hook de React. [Integración de Embla para React](https://www.embla-carousel.com/docs/v8/get-started/react)
- Comprueba arrastre, controles, foco en los límites, cambio de tamaño, paginación agrupada, ambos temas, el eje vertical y el movimiento reducido.
