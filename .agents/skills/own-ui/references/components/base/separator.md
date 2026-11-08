# Separator

## 1. Identificación

Separator envuelve `Separator` de `@base-ui/react/separator` y combina las clases de own-ui con `clsx`. [API de Base UI](https://base-ui.com/react/components/separator)

## 2. Propósito y casos de uso

Marca una división entre bloques apilados o entre grupos en una fila. Conserva su semántica accesible cuando la división ayuda a entender la estructura. Usa `aria-hidden` para una línea puramente decorativa, por ejemplo entre dos metadatos relacionados. Para un límite que se pueda arrastrar y cambie el tamaño de dos paneles, usa un control de redimensionamiento con su propia interacción de teclado.

## 3. Importación y anatomía

Adapta el alias según la [referencia de estructura](../../structure.md).

```tsx
import { Separator } from "@/components/own/base/separator";

export function OrderSummary() {
  return (
    <div className="grid gap-4">
      <p>Tres productos confirmados.</p>
      <Separator />
      <p>Retiro en tienda desde el jueves.</p>
    </div>
  );
}
```

| Exportación | Nodo predeterminado | Responsabilidad |
| :--- | :--- | :--- |
| `Separator` | `div[role="separator"]` | Renderiza la línea y expone su orientación. Se coloca entre los bloques hermanos que aporta el consumidor. |
| `SeparatorProps` | — | Tipo de props heredado de Base UI. |
| `SeparatorState` | — | Estado `{ orientation: "horizontal" \| "vertical" }` que reciben las funciones de personalización. |

La familia consta de una sola pieza que se utiliza sin hijos ni contenedor propio.

## 4. Variantes y tamaños

`orientation` es una prop heredada que modifica tanto la geometría como la semántica. No hay props propias de variante o tamaño.

| Orientación | Dimensiones predeterminadas |
| :--- | :--- |
| `"horizontal"` (predeterminada) | Altura de 1 px y ancho completo. |
| `"vertical"` | Ancho de 1 px. En una fila flex se estira al alto de la fila. En flujo normal necesita una altura definida por el consumidor. |

## 5. Props y callbacks

| Pieza | Prop o callback | Tipo | Predeterminado | Opcional | Función y condiciones |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Separator | `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | Sí | Opción de Base UI. Configura `aria-orientation` y `data-orientation`. |
| Separator | `className` | `string \| ((state: SeparatorState) => string \| undefined)` | — | Sí | Añade clases estáticas o calculadas al nodo. |
| Separator | `style` | `React.CSSProperties \| ((state: SeparatorState) => React.CSSProperties \| undefined)` | — | Sí | Aplica estilos inline estáticos o calculados al nodo. |
| Separator | `render` | `React.ReactElement \| ((props, state: SeparatorState) => React.ReactElement)` | `div` | Sí | Reemplaza el elemento. La función recibe las props preparadas por Base UI. |
| Separator | `ref` | `React.Ref<HTMLDivElement>` | — | Sí | Accede al nodo predeterminado. El tipo sigue siendo el de `div` al cambiar el elemento con `render`. |
| Separator | `aria-hidden` | `boolean \| "true" \| "false"` | — | Sí | Atributo ARIA heredado. `true` conserva la línea visual y la oculta a las tecnologías de asistencia. |

También admite atributos y eventos HTML heredados de la primitiva. La familia no emite callbacks de cambio.

## 6. Funcionamiento y estados

La orientación se lee directamente de la prop en cada render. Base UI coloca `role="separator"` y asigna el valor `horizontal` o `vertical` a `aria-orientation` y `data-orientation`. El wrapper añade `data-slot="separator"`. El componente es estático y se monta en el lugar donde se declara, sin portal ni estado interno de interacción.

## 7. Estilos admitidos por pieza

- **Dimensiones y distribución.** El nodo se muestra como bloque y conserva su grosor en flex con `shrink-0`. El contenedor controla la separación y el espacio disponible mediante `gap`, padding o sus propios límites. Ajusta el largo con `max-w-*` en horizontal o `h-*` en vertical. Para un grosor puntual, usa `style={{ height: 2 }}` en horizontal o `style={{ width: 2 }}` en vertical.
- **Color y geometría.** La línea usa `bg-gray-base`, que sigue el tema del consumidor. En colores forzados usa `CanvasText`. La geometría base es recta y el grosor se consigue con el fondo. `border-0` también suprime el borde predeterminado al usar `render={<hr />}`. La pieza carece de tipografía propia, radio y sombra.
- **Estados y movimiento.** Usa `[data-slot="separator"]` y `[data-orientation="vertical"]` para ajustar el nodo desde una hoja de estilos. La pieza no añade animaciones ni transiciones.
- **Composición.** `className` estático o funcional se combina con las clases base mediante `clsx`. Las utilidades en conflicto se resuelven por cascada. Para ajustar el color de una instancia puedes usar `style={{ backgroundColor: "var(--primary-base)" }}` o un selector con la precedencia adecuada. Comprueba los colores forzados si cambias el fondo mediante estilos inline. Para cambios de tema compartidos, consulta [globals.css](../../globals.md).

## 8. Ejemplos de composición

En una fila, el separador vertical ocupa la altura que le da el contenido. Este ejemplo marca una división visual entre metadatos.

```tsx
import { Separator } from "@/components/own/base/separator";

export function ReadingDetails() {
  return (
    <div className="flex items-center gap-3">
      <span>Guía de diseño</span>
      <Separator orientation="vertical" aria-hidden />
      <span>4 min de lectura</span>
    </div>
  );
}
```

Para un cambio temático entre párrafos, conserva la orientación horizontal y usa `<Separator render={<hr />} />` con el mismo import.

## 9. Accesibilidad e integración

Por defecto, el separador queda fuera del orden de tabulación y no requiere eventos de teclado ni nombre accesible. Usa `aria-hidden` solo si la división carece de significado para quien recorre la interfaz con un lector de pantalla. Si necesitas un separador dentro de un menú, usa la pieza de separación de esa familia para mantener su composición.

Con `render`, usa un nodo sin interacción y conserva los atributos de orientación y el rol. Base UI combina clases, estilos, eventos y refs en la forma de elemento. Un componente personalizado debe propagar las props y el ref al mismo nodo. Con un callback de `render`, propaga las props recibidas explícitamente. Las funciones de personalización y los refs se definen en un módulo cliente cuando se usan desde App Router. Una página de servidor puede componer Separator con props serializables o con un elemento como `<hr />`.

## 10. Límites y verificación

Exporta `separator.tsx` con Base UI, `clsx` y la configuración común de Tailwind de own-ui. No requiere iconos, otras familias ni un bloque propio en la hoja global. Comprueba que Tailwind detecte el archivo y genere las utilidades de orientación, fondo y colores forzados.

Verifica ambos ejes en el espacio disponible, el grosor de 1 px en los temas claro y oscuro y la altura del separador vertical al envolver el texto de la fila. Comprueba el rol, la orientación accesible, la exclusión del separador decorativo del árbol de accesibilidad y la ausencia de paradas de tabulación en las líneas.
