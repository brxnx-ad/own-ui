# Badge

## 1. Identificación

Badge es un `span` con variantes de presentación y composición de clases mediante `clsx`.

## 2. Propósito y casos de uso

Identifica una categoría, prioridad o estado compacto junto a otro contenido. El consumidor aporta la etiqueta visible. Si el elemento debe ejecutar una acción, usa [Button](../base/button.md) o un enlace con semántica propia.

## 3. Importación y anatomía

```tsx
import { Badge } from "@/components/own/simple/badge";

<Badge variant="success">Completado</Badge>
```

| Pieza | HTML | Responsabilidad |
| :--- | :--- | :--- |
| `Badge` | `span` | Muestra texto y, opcionalmente, iconos aportados en children. |

El módulo también exporta `BadgeProps` y `BadgeVariant`.

## 4. Variantes y tamaños

| Variante | Fondo | Borde |
| :--- | :--- | :--- |
| `default` | `primary-soft` | `primary-base` |
| `secondary` | `surface-bold` | `gray-base` |
| `info` | `info-soft` | `info-base` |
| `success` | `success-soft` | `success-base` |
| `warning` | `warning-soft` | `warning-base` |
| `destructive` | `error-soft` | `error-base` |
| `outline` | Transparente | `gray-base` |

`default` se aplica al omitir `variant`. La familia carece de prop de tamaño.

## 5. Props y callbacks

| Pieza | Prop o callback | Tipo | Predeterminado | Opcional | Función y condiciones |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `Badge` | `variant` | `BadgeVariant` | `default` | Sí | Selecciona la combinación de fondo y borde. |
| `Badge` | Props HTML y `ref` | `ComponentPropsWithRef<"span">` | — | Sí | Incluye `children`, `className`, `style`, atributos y eventos nativos. |

Los eventos son los del elemento HTML correspondiente. La familia carece de callbacks propios.

## 6. Funcionamiento y estados

`data-slot="badge"` identifica el nodo y `data-variant` refleja la prop. El consumidor puede cambiar el texto y la variante con un nuevo render. El componente carece de selección, carga, estado interno y comportamiento interactivo propio.

## 7. Estilos admitidos por pieza

`inline-flex` centra los hijos en el eje vertical con `gap-1`. Usa `max-w-full`, `wrap-anywhere`, `px-2`, `py-0.5`, borde, `rounded-base`, `caption` y texto `content-bold` en todas las variantes. Los SVG descendientes conservan su ancho y reciben `size-[1.15em]` si su clase no contiene `size-`. Carece de sombra, animaciones y prop `render`.

Cada pieza pública admite `className` de tipo `string` y `style` como objeto CSS en su nodo. `clsx` concatena las clases y, salvo la [excepción de colores `content`](../../globals.md#composición-y-precedencia-de-clases), la cascada determina el resultado cuando se contradicen. Las props HTML y `ref` llegan al nodo correspondiente. Consulta [los estilos compartidos](../../globals.md) para los tokens por tema. El consumidor decide la separación exterior.

## 8. Ejemplos de composición

```tsx
import { Badge } from "@/components/own/simple/badge";

export function OrderStatus() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span>Pedido 1842</span>
      <Badge variant="warning">Pendiente de pago</Badge>
      <Badge variant="outline">Retiro en tienda</Badge>
    </div>
  );
}
```

## 9. Accesibilidad e integración

Usa texto que explique el estado aunque se pierda el color. Marca los SVG decorativos con `aria-hidden="true"`. Badge conserva la semántica de `span` y queda fuera del orden de tabulación por defecto. Si el estado cambia y debe anunciarse, actualiza una región viva gestionada por el consumidor.

## 10. Límites y verificación

Comprueba etiquetas largas, contraste de `outline` sobre la superficie del consumidor y los tamaños de icono en ambos temas. Exporta `badge.tsx`. El componente carece de un activador o enlace integrado.
