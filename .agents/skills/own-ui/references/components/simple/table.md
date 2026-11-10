# Table

## 1. Identificación

Table utiliza la anatomía nativa de `table`, un `div` de desplazamiento y `clsx` para combinar estilos.

## 2. Propósito y casos de uso

Muestra datos con encabezados de columna o fila, un título y un pie opcional. Cuando el contenido excede el ancho disponible, el contenedor permite desplazamiento horizontal. El consumidor provee datos, formato y cualquier control interactivo.

## 3. Importación y anatomía

```tsx
import {
  Table, TableCaption, TableHeader, TableBody, TableFooter,
  TableRow, TableHead, TableCell,
} from "@/components/own/simple/table";

<Table>
  <TableCaption>Inventario</TableCaption>
  <TableHeader>
    <TableRow><TableHead scope="col">Artículo</TableHead><TableHead scope="col">Unidades</TableHead></TableRow>
  </TableHeader>
  <TableBody>
    <TableRow><TableHead scope="row">Cuaderno</TableHead><TableCell>12</TableCell></TableRow>
  </TableBody>
  <TableFooter>
    <TableRow><TableHead scope="row">Total</TableHead><TableCell>12</TableCell></TableRow>
  </TableFooter>
</Table>
```

| Pieza | HTML | Responsabilidad |
| :--- | :--- | :--- |
| `Table` | `div` con `table` | Contenedor horizontal y tabla semántica. |
| `TableCaption` | `caption` | Título de la tabla, como primer hijo de table. |
| `TableHeader` | `thead` | Agrupa filas de encabezado. |
| `TableBody` | `tbody` | Agrupa filas de datos. |
| `TableFooter` | `tfoot` | Agrupa filas de resumen. |
| `TableRow` | `tr` | Fila dentro de uno de los grupos. |
| `TableHead` | `th` | Encabezado de columna, fila o grupo. |
| `TableCell` | `td` | Celda de datos. |

El módulo exporta `TableProps`. Usa `TableRow` dentro de `TableHeader`, `TableBody` o `TableFooter`. Ubica las celdas directamente dentro de su fila.

## 4. Variantes y tamaños

La familia carece de props de variante o tamaño. La tabla usa `w-full` y el contenedor limita su ancho con `max-w-full`. Define un ancho mínimo en la tabla cuando las columnas requieran más espacio.

## 5. Props y callbacks

| Pieza | Prop o callback | Tipo | Predeterminado | Opcional | Función y condiciones |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `Table` | `containerProps` | `Omit<ComponentPropsWithRef<"div">, "children" \| "dangerouslySetInnerHTML">` | — | Sí | Personaliza el div exterior. Puede cambiar tabIndex, nombre, rol, estilos y ref del contenedor. |
| Contenedor | `containerProps.tabIndex` | `number` | `0` | Sí | Incluye el contenedor en la navegación con Tab de forma predeterminada. |
| `TableHead` | `scope` | `string` | — | Sí | Usa `col`, `row`, `colgroup` o `rowgroup` para vincular el encabezado con las celdas correspondientes. |
| `Table` | Props HTML y `ref` | `ComponentPropsWithRef<"table">` | — | Sí | Incluye `children`, `className`, `style`, atributos y eventos nativos. Se aplica a la tabla interior. |
| `TableCaption` | Props HTML y `ref` | `ComponentPropsWithRef<"caption">` | — | Sí | Incluye `children`, `className`, `style`, atributos y eventos nativos. |
| `TableHeader` | Props HTML y `ref` | `ComponentPropsWithRef<"thead">` | — | Sí | Incluye `children`, `className`, `style`, atributos y eventos nativos. |
| `TableBody` | Props HTML y `ref` | `ComponentPropsWithRef<"tbody">` | — | Sí | Incluye `children`, `className`, `style`, atributos y eventos nativos. |
| `TableFooter` | Props HTML y `ref` | `ComponentPropsWithRef<"tfoot">` | — | Sí | Incluye `children`, `className`, `style`, atributos y eventos nativos. |
| `TableRow` | Props HTML y `ref` | `ComponentPropsWithRef<"tr">` | — | Sí | Incluye `children`, `className`, `style`, atributos y eventos nativos. |
| `TableHead` | Props HTML y `ref` | `ComponentPropsWithRef<"th">` | — | Sí | Incluye `children`, `className`, `style`, atributos y eventos nativos. |
| `TableCell` | Props HTML y `ref` | `ComponentPropsWithRef<"td">` | — | Sí | Incluye `children`, `className`, `style`, atributos y eventos nativos. |

Los eventos son los del elemento HTML correspondiente. La familia carece de callbacks propios.

## 6. Funcionamiento y estados

Los slots son `table-container`, `table`, `table-caption`, `table-header`, `table-body`, `table-footer`, `table-row`, `table-head` y `table-cell`. El contenedor recibe un contorno en `:focus-visible` y usa desplazamiento horizontal nativo. La familia carece de selección, ordenamiento, paginación y estado de desplazamiento controlado.

## 7. Estilos admitidos por pieza

- **Contenedor.** `min-w-0 max-w-full overflow-x-auto`, `rounded-base`, `surface-base` y borde `gray-base`. El contorno visible usa `gray-bold` con offset interior. Ajusta este nodo con `containerProps.className`, `containerProps.style` o su slot.
- **Tabla y grupos.** `Table` usa `w-full`, `body-sm`, `content-bold` y `caption-top`. `TableHeader` y `TableFooter` usan `surface-bold` y un borde inferior y superior respectivamente. El pie también usa `font-medium`. `TableBody` carece de estilos propios.
- **Filas y celdas.** `TableRow` usa borde inferior `gray-base` salvo en la última fila del grupo. `TableHead` y `TableCell` usan `px-3 py-2` y alineación vertical media. El encabezado usa `text-start` y `font-semibold`. `TableCaption` usa `h6`, borde inferior, `px-3 py-2` y `text-start`.
- La familia carece de sombras, animaciones y prop `render`.

Las piezas aceptan `className` de tipo `string` y `style` como objeto CSS. `clsx` concatena las clases donde hay utilidades propias. `TableBody` reenvía las props directamente. `ref` de `Table` apunta a `table` y `containerProps.ref` al `div` exterior. Consulta [los estilos compartidos](../../globals.md) para los tokens por tema. El consumidor decide la separación exterior.

## 8. Ejemplos de composición

```tsx
import { Table, TableCaption, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/own/simple/table";

export function QuarterlyReport() {
  return (
    <Table className="min-w-[36rem]" containerProps={{ role: "region", "aria-labelledby": "quarterly-caption" }}>
      <TableCaption id="quarterly-caption">Resumen trimestral</TableCaption>
      <TableHeader>
        <TableRow><TableHead scope="col">Equipo</TableHead><TableHead scope="col">Primer trimestre</TableHead><TableHead scope="col">Segundo trimestre</TableHead></TableRow>
      </TableHeader>
      <TableBody>
        <TableRow><TableHead scope="row">Diseño</TableHead><TableCell>12</TableCell><TableCell>16</TableCell></TableRow>
      </TableBody>
    </Table>
  );
}
```

## 9. Accesibilidad e integración

Usa `TableCaption` y `scope` en los encabezados. El contenedor puede recibir `role="region"` y un nombre mediante `containerProps`. Tab permite enfocar el contenedor y las flechas desplazan el contenido cuando desborda. Conserva ese acceso al personalizar `tabIndex` y el foco. Si añades controles a las celdas, cada uno conserva su propia semántica y nombre.

## 10. Límites y verificación

Verifica el desplazamiento a ancho reducido, foco visible y relación entre encabezados y celdas. La tabla está orientada a datos tabulares nativos. Exporta `table.tsx`. El consumidor gestiona ordenamiento, selección y cualquier interacción adicional.
