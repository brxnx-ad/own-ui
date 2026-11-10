# Button Group

## 1. Identificación

Button Group compone elementos HTML, el componente `Separator` de own-ui y `useRender` de Base UI para agrupar botones y texto.

## 2. Propósito y casos de uso

Agrupa controles relacionados, como acciones de edición o botones para cambiar de vista. Usa Button Group cuando el conjunto comparte un nombre y una orientación. No proporciona selección ni movimiento del foco por flechas. Para controles con selección coordinada usa Toggle Group.

## 3. Importación y anatomía

```tsx
import { Button } from "@/components/own/base/button";
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from "@/components/own/composed/button-group";
```

| Pieza | Elemento predeterminado | Responsabilidad |
| :--- | :--- | :--- |
| `ButtonGroup` | `div[role=group]` | Agrupa y ordena los controles. |
| `ButtonGroupText` | `div` | Presenta texto o contenido junto al grupo. |
| `ButtonGroupSeparator` | `div[role=separator]` de Separator | Divide controles relacionados. |
| `Button` | `button` de own-ui | Acción aportada por el consumidor. |

```tsx
<ButtonGroup aria-label="Edición">
  <Button variant="outline">Copiar</Button>
  <ButtonGroupSeparator />
  <Button variant="outline">Pegar</Button>
</ButtonGroup>
```

El módulo exporta `ButtonGroupOrientation`, `ButtonGroupProps` y `ButtonGroupTextProps` como tipos.

## 4. Variantes y tamaños

`orientation` admite `horizontal` y `vertical`, con `horizontal` como valor inicial. Los botones mantienen las variantes y tamaños de Button. Un grupo anidado conserva su separación y no aplica el ajuste de bordes de un grupo simple.

## 5. Props y callbacks

| Pieza | Prop o callback | Tipo | Predeterminado | Opcional | Función y condiciones |
| :--- | :--- | :--- | :--- | :--- | :--- |
| ButtonGroup | `orientation` | `ButtonGroupOrientation` | `"horizontal"` | Sí | Establece eje y `data-orientation`. |
| ButtonGroup | `className`, `style`, `ref` | Props de `div` | — | Sí | Actúan sobre el contenedor. |
| ButtonGroupText | `render` | Elemento React o función de Base UI | `div` | Sí | Sustituye el elemento; conserva los atributos y la ref al pasar props en la forma funcional. |
| ButtonGroupText | `className` | Cadena o función de estado de Base UI | — | Sí | Se combina con las clases base y actúa sobre la pieza renderizada. |
| ButtonGroupSeparator | `orientation` | Props de Separator | Perpendicular a ButtonGroup | Sí | Cambia explícitamente la orientación inferida. |
| ButtonGroupSeparator | `decorative` | `boolean` heredado de Separator | `true` | Sí | Controla si se expone como separador semántico. |
| ButtonGroupSeparator | `className`, `style`, `ref` | Props de Separator | — | Sí | Conserva el contrato de la pieza de Separator. |
| Todas las piezas | Atributos HTML y eventos | Propios de su elemento | Según HTML | Sí | Los atributos que no consume el wrapper llegan a su nodo. |

## 6. Funcionamiento y estados

`ButtonGroup` expone `data-slot="button-group"` y `data-orientation`. `ButtonGroupText` usa `data-slot="button-group-text"`. El separador usa `data-slot="button-group-separator"` y hereda los estados y atributos de Separator. El grupo no administra estados de los hijos.

La orientación del separador se determina por el contexto de ButtonGroup. Fuera de un grupo usa la orientación horizontal predeterminada. Un `orientation` explícito en Separator prevalece sobre la inferida.

## 7. Estilos admitidos por pieza

| Pieza | Estilos y nodos afectados |
| :--- | :--- |
| ButtonGroup | Contenedor `flex w-fit`; cambia a columna en orientación vertical. Los controles adyacentes pierden radios interiores y borde compartido. Los hijos con foco visible se elevan sobre el contorno del vecino. Grupos anidados usan separación de `gap-2`. |
| ButtonGroupText | Superficie `surface-base`, borde `gray-base`, radio `rounded-base` y padding horizontal. SVG sin tamaño explícito se ajusta a `size-4`. |
| ButtonGroupSeparator | Usa el color `gray-base` y la geometría horizontal o vertical de Separator. El contexto define qué eje divide. |

Los estilos se adaptan con `className`, `style` y los selectores `data-slot` o `data-orientation`. El CSS Module gestiona radios y bordes conjuntos con selectores `:has`; incluye `button-group.module.css` al exportar la familia. `clsx` concatena clases, y aplica la excepción de colores descrita en [globals](../../globals.md#composición-y-precedencia-de-clases). Los botones conservan sus propios estados y tokens por tema.

## 8. Ejemplos de composición

```tsx
<ButtonGroup aria-label="Cantidad">
  <Button variant="outline" onClick={decrease}>Reducir</Button>
  <ButtonGroupText aria-live="polite">{quantity}</ButtonGroupText>
  <Button variant="outline" onClick={increase}>Aumentar</Button>
</ButtonGroup>
```

`quantity`, `decrease` e `increase` pertenecen al consumidor. Para una pila de acciones, usa `orientation="vertical"`; el separador cambia de eje automáticamente.

## 9. Accesibilidad e integración

Asigna un nombre al grupo con `aria-label` o `aria-labelledby`. Cada botón conserva su posición independiente en el orden de Tab y su anillo de foco visible. Button Group no implementa navegación con flechas ni una única parada de foco. Separator es decorativo por defecto; hazlo semántico solo si la división aporta estructura que debe anunciarse.

Las funciones de `render` y los handlers del consumidor requieren una frontera cliente de App Router.

## 10. Límites y verificación

El grupo no gestiona selección, deshabilitación conjunta ni estado activo. La orientación se transmite mediante React Context y requiere que el separador sea descendiente directo o indirecto de ButtonGroup. Exporta `button-group.tsx`, `button-group.module.css` y `separator.tsx` con los tokens semánticos. Verifica las dos orientaciones, anidación, separadores, focos en extremos e interiores, ambos temas y ancho reducido.
