# Card

## 1. Identificación

Card agrupa elementos HTML nativos en una superficie y combina sus utilidades mediante `clsx`.

## 2. Propósito y casos de uso

Presenta una unidad de contenido con título, resumen, acción en cabecera y pie opcionales. Úsala para proyectos, notas u otros elementos que necesitan su propio bloque visual.

## 3. Importación y anatomía

```tsx
import {
  Card, CardHeader, CardTitle, CardDescription, CardAction, CardContent, CardFooter,
} from "@/components/own/simple/card";

<Card>
  <CardHeader>
    <CardTitle as="h3">Proyecto</CardTitle>
    <CardDescription>Resumen del proyecto.</CardDescription>
    <CardAction><button type="button">Editar</button></CardAction>
  </CardHeader>
  <CardContent>Actividad reciente</CardContent>
  <CardFooter>Actualizado hoy</CardFooter>
</Card>
```

| Pieza | HTML | Responsabilidad |
| :--- | :--- | :--- |
| `Card` | `div` | Superficie y distribución vertical. |
| `CardHeader` | `div` | Cuadrícula para título, descripción y acción. |
| `CardTitle` | `h2` | Encabezado semántico, configurable de h2 a h6. |
| `CardDescription` | `p` | Descripción secundaria. |
| `CardAction` | `div` | Ubica la acción aportada por el consumidor. |
| `CardContent` | `div` | Contiene el cuerpo. |
| `CardFooter` | `div` | Agrupa contenido o acciones al pie. |

El módulo exporta `CardProps`, `CardSize` y `CardTitleProps`. Para que la cabecera reserve la segunda columna, coloca `CardAction` como hijo directo de `CardHeader`.

## 4. Variantes y tamaños

`size="md"` aplica `p-4` y `gap-4`. `size="sm"` aplica `p-3` y `gap-3`. Las dos densidades conservan los estilos internos de las subpiezas. `CardTitle.as` controla el nivel HTML y conserva el estilo `h4`. La familia carece de variantes cromáticas propias.

## 5. Props y callbacks

| Pieza | Prop o callback | Tipo | Predeterminado | Opcional | Función y condiciones |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `Card` | `size` | `"sm" \| "md"` | `md` | Sí | Define el padding y la separación vertical de la raíz. |
| `CardTitle` | `as` | `"h2" \| "h3" \| "h4" \| "h5" \| "h6"` | `h2` | Sí | Elige el encabezado HTML. |
| `Card`, `CardHeader`, `CardAction`, `CardContent`, `CardFooter` | Props HTML y `ref` | `ComponentPropsWithRef<"div">` | — | Sí | Incluye `children`, `className`, `style`, atributos y eventos nativos. |
| `CardTitle` | Props HTML y `ref` | `ComponentPropsWithRef<"h2">` | — | Sí | Incluye `children`, `className`, `style`, atributos y eventos nativos. Las props se pasan al encabezado elegido. |
| `CardDescription` | Props HTML y `ref` | `ComponentPropsWithRef<"p">` | — | Sí | Incluye `children`, `className`, `style`, atributos y eventos nativos. |

Los eventos son los del elemento HTML correspondiente. La familia carece de callbacks propios.

## 6. Funcionamiento y estados

Los slots son `card`, `card-header`, `card-title`, `card-description`, `card-action`, `card-content` y `card-footer`. `data-size` se aplica en la raíz. `CardHeader` detecta un hijo directo con `data-slot="card-action"` mediante `:has()` y cambia a columnas `minmax(0,1fr)` y `auto`. Cada pieza se monta cuando el consumidor la incluye. La familia carece de estado interno.

## 7. Estilos admitidos por pieza

- **Card** usa flex vertical, `min-w-0`, `surface-base`, texto `content-bold`, borde `gray-base`, `rounded-base` y `shadow-s`.
- **CardHeader** usa `gap-1` y agrega `gap-x-3` con acción directa. **CardAction** se coloca arriba, a la derecha, ocupando dos filas. **CardTitle** usa `h4` y **CardDescription** `body-sm` con `content-base`. Los dos textos pueden partir palabras largas.
- **CardContent** conserva `min-w-0`. **CardFooter** usa flex con envoltura, `gap-2`, borde superior `gray-base` y `pt-3`. La familia carece de animaciones y prop `render`.

Cada pieza pública admite `className` de tipo `string` y `style` como objeto CSS en su nodo. `clsx` concatena las clases y, salvo la [excepción de colores `content`](../../globals.md#composición-y-precedencia-de-clases), la cascada determina el resultado cuando se contradicen. Las props HTML y `ref` llegan al nodo correspondiente. Consulta [los estilos compartidos](../../globals.md) para los tokens por tema. El consumidor decide la separación exterior.

## 8. Ejemplos de composición

```tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/own/simple/card";

export function CompactNote() {
  return (
    <Card size="sm" className="max-w-md">
      <CardHeader><CardTitle as="h3">Próxima reunión</CardTitle></CardHeader>
      <CardContent>Martes, 10:00.</CardContent>
    </Card>
  );
}
```

## 9. Accesibilidad e integración

Elige `as` según la jerarquía de la página. Usa enlaces o botones reales para las acciones. El contenedor mantiene su semántica genérica, y el consumidor puede asociarlo con un título mediante un rol apropiado y `aria-labelledby` si necesita una región nombrada.

## 10. Límites y verificación

Comprueba el reparto de la cabecera con títulos largos y acciones anchas en el espacio disponible. Evita cambiar el slot de CardAction si dependes de la segunda columna. Exporta `card.tsx`. El comportamiento de la cuadrícula depende de `:has()`.
