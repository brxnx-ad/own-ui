# Empty

## 1. Identificación

Empty compone elementos HTML nativos y aplica sus opciones visuales con `clsx`.

## 2. Propósito y casos de uso

Explica por qué una lista o vista está vacía y ofrece un siguiente paso cuando corresponde. Sirve para una búsqueda sin resultados, una colección nueva o una vista sin actividad. Para indicar una carga en curso, usa [Skeleton](skeleton.md).

## 3. Importación y anatomía

```tsx
import {
  Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription, EmptyContent,
} from "@/components/own/simple/empty";

<Empty>
  <EmptyHeader>
    <EmptyMedia variant="icon"><span aria-hidden="true">⌕</span></EmptyMedia>
    <EmptyTitle as="h3">Sin resultados</EmptyTitle>
    <EmptyDescription>Prueba con otros términos de búsqueda.</EmptyDescription>
  </EmptyHeader>
  <EmptyContent><a href="/search">Quitar filtros</a></EmptyContent>
</Empty>
```

| Pieza | HTML | Responsabilidad |
| :--- | :--- | :--- |
| `Empty` | `div` | Raíz del estado vacío. |
| `EmptyHeader` | `div` | Agrupa el recurso visual, el título y la explicación. |
| `EmptyMedia` | `div` | Recibe un icono o contenido visual del consumidor. |
| `EmptyTitle` | `h2` | Encabezado semántico de nivel configurable. |
| `EmptyDescription` | `p` | Explica el estado y puede incluir enlaces. |
| `EmptyContent` | `div` | Agrupa acciones o contenido adicional. |

El módulo exporta `EmptyProps`, `EmptyBorder`, `EmptyBackground`, `EmptyMediaProps`, `EmptyMediaVariant` y `EmptyTitleProps`. El consumidor decide qué piezas monta y qué acciones incluye.

## 4. Variantes y tamaños

- **Borde.** `dashed` es el predeterminado y `solid` mantiene el mismo ancho y color `gray-base` con trazo continuo. `none` omite todas las clases de borde.
- **Fondo.** `soft`, `base` y `bold` aplican `surface-soft`, `surface-base` y `surface-bold`. El predeterminado es `base`. `none` omite las clases de fondo.
- **Media.** `default` centra el contenido sin tamaño fijo. `icon` agrega `size-10`, borde y fondo. La familia carece de prop de tamaño.

## 5. Props y callbacks

| Pieza | Prop o callback | Tipo | Predeterminado | Opcional | Función y condiciones |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `Empty` | `border` | `"dashed" \| "solid" \| "none"` | `dashed` | Sí | Elige el borde con independencia del fondo. |
| `Empty` | `background` | `"soft" \| "base" \| "bold" \| "none"` | `base` | Sí | Elige la superficie con independencia del borde. |
| `EmptyMedia` | `variant` | `"default" \| "icon"` | `default` | Sí | Define la presentación del recurso visual. |
| `EmptyTitle` | `as` | `"h2" \| "h3" \| "h4" \| "h5" \| "h6"` | `h2` | Sí | Elige el elemento de encabezado sin cambiar el estilo h5. |
| `Empty`, `EmptyHeader`, `EmptyMedia`, `EmptyContent` | Props HTML y `ref` | `ComponentPropsWithRef<"div">` | — | Sí | Incluye `children`, `className`, `style`, atributos y eventos nativos. |
| `EmptyTitle` | Props HTML y `ref` | `ComponentPropsWithRef<"h2">` | — | Sí | Incluye `children`, `className`, `style`, atributos y eventos nativos. Se reenvía al nivel elegido. |
| `EmptyDescription` | Props HTML y `ref` | `ComponentPropsWithRef<"p">` | — | Sí | Incluye `children`, `className`, `style`, atributos y eventos nativos. |

Los eventos son los del elemento HTML correspondiente. La familia carece de callbacks propios.

## 6. Funcionamiento y estados

Los slots son `empty`, `empty-header`, `empty-media`, `empty-title`, `empty-description` y `empty-content`. Solo `EmptyMedia` expone `data-variant`. La raíz resuelve borde y fondo mediante clases. El consumidor decide cuándo se muestra el estado vacío. La familia carece de estado interno.

## 7. Estilos admitidos por pieza

- **Empty** usa flex vertical centrado, `min-w-0`, `gap-4`, `p-6`, `rounded-base` y `gray-bold`. Para un borde o fondo propio, elige `none` en la opción correspondiente y agrega las clases a la raíz.
- **EmptyHeader** limita el ancho con `max-w-sm` y separa el contenido con `gap-2`. **EmptyMedia** centra su contenido con `max-w-full`. En `icon` usa `rounded-base`, borde `gray-base`, `surface-bold` y ajusta SVG sin clase que contenga `size-` a `1.15em`.
- **EmptyTitle** usa `h5`. **EmptyDescription** usa `body-sm`, `gray-bold/80` y subraya los enlaces descendientes. Ambos pueden partir palabras largas. **EmptyContent** centra sus hijos, permite envoltura y usa `max-w-sm` y `gap-2`.
- La familia carece de sombra, animaciones y prop `render`.

Cada pieza pública admite `className` de tipo `string` y `style` como objeto CSS en su nodo. `clsx` concatena las clases y la cascada determina el resultado cuando se contradicen. Las props HTML y `ref` llegan al nodo correspondiente. Consulta [los estilos compartidos](../../globals.md) para los tokens por tema. El consumidor decide la separación exterior.

## 8. Ejemplos de composición

```tsx
import { Empty, EmptyHeader, EmptyTitle, EmptyDescription } from "@/components/own/simple/empty";

export function EmptyHistory() {
  return (
    <Empty border="none" background="none" className="border border-dotted border-info-base bg-info-soft">
      <EmptyHeader>
        <EmptyTitle as="h3">Aún no hay actividad</EmptyTitle>
        <EmptyDescription>Los cambios del proyecto aparecerán aquí.</EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}
```

## 9. Accesibilidad e integración

Elige el nivel del título según la página. Usa texto para explicar el estado, marca los iconos decorativos con `aria-hidden="true"` y da texto alternativo a imágenes informativas. Usa controles nativos para conservar el teclado y el foco. Si el cambio debe anunciarse, gestiona una región viva en el consumidor.

## 10. Límites y verificación

Comprueba contraste en ambos temas al personalizar el fondo, así como la envoltura de las acciones con poco espacio. Exporta `empty.tsx`. El componente carece de detección de datos vacíos y las acciones conservan sus propias dependencias.
