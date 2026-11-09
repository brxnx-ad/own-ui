# Pagination

## 1. Identificación

Pagination compone `Button` y `Chevron` de own-ui con `next/link`, además de elementos HTML y `clsx`.

## 2. Propósito y casos de uso

Presenta una navegación para páginas dentro de una colección. El consumidor determina la página actual, los enlaces, los límites y los intervalos que muestra. La familia no cuenta resultados ni genera páginas.

## 3. Importación y anatomía

```tsx
import {
  Pagination, PaginationContent, PaginationEllipsis, PaginationItem,
  PaginationLink, PaginationNext, PaginationPrevious,
} from "@/components/own/composed/pagination";
```

| Pieza | Elemento predeterminado | Responsabilidad |
| :--- | :--- | :--- |
| `Pagination` | `nav` | Región de navegación con nombre accesible. |
| `PaginationContent` | `ul` | Lista de opciones de paginación. |
| `PaginationItem` | `li` | Elemento de lista. |
| `PaginationLink` | `a` de Next Link, con comportamiento visual de Button | Enlace a una página. |
| `PaginationPrevious`, `PaginationNext` | Enlace | Destino anterior o siguiente con Chevron y texto. |
| `PaginationEllipsis` | `span` | Indica un conjunto de páginas omitidas. |

```tsx
<Pagination aria-label="Páginas de resultados">
  <PaginationContent>
    <PaginationItem><PaginationPrevious href="?page=1" /></PaginationItem>
    <PaginationItem><PaginationLink href="?page=2" isActive>2</PaginationLink></PaginationItem>
    <PaginationItem><PaginationEllipsis /></PaginationItem>
    <PaginationItem><PaginationNext href="?page=3" /></PaginationItem>
  </PaginationContent>
</Pagination>
```

## 4. Variantes y tamaños

`PaginationLink.size` hereda Button: `sm`, `md` o `lg`. El predeterminado es `sm`; los controles anterior y siguiente también usan `sm`, con padding compacto en pantallas menores al breakpoint `sm`. `isActive` es un estado de página, no un tamaño ni una variante de `Button` seleccionable.

## 5. Props y callbacks

| Pieza | Prop o callback | Tipo | Predeterminado | Opcional | Función y condiciones |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Pagination | `aria-label` | `string` | `"Paginación"` | Sí | Nombre predeterminado de la región; se puede reemplazar con `aria-labelledby`. |
| Pagination | Props de `nav` | `ComponentPropsWithRef<"nav">` | — | Sí | Incluye className, style, ref y atributos nativos. Las props pueden sobrescribir los defaults del wrapper. |
| PaginationContent | Props de `ul` | `ComponentPropsWithRef<"ul">` | — | Sí | Personaliza la lista. |
| PaginationItem | Props de `li` | `ComponentPropsWithRef<"li">` | — | Sí | Identidad y contenido del elemento. |
| PaginationLink | `href` | `LinkProps["href"]` | — | No | Destino requerido de Next Link. |
| PaginationLink | `isActive` | `boolean` | `false` | Sí | Elige Button `outline` o `ghost`, añade `data-active` y `aria-current="page"`. |
| PaginationLink | `size` | `ButtonSize` | `"sm"` | Sí | Ajusta la escala del botón. |
| PaginationLink | Props de Link | `ComponentPropsWithRef<typeof Link>` | Según Next Link | Sí | Añade destino y navegación. Los handlers de teclado se envuelven para preservar la interacción de enlace nativo. |
| PaginationPrevious / Next | `text` | `string` | `"Anterior"` / `"Siguiente"` | Sí | Texto visible desde `sm` y nombre accesible. Se combina con las props de PaginationLink salvo `children`. |
| PaginationEllipsis | Props de `span` | `ComponentPropsWithRef<"span">` | — | Sí | Personaliza el nodo; `children` sustituye puntos y texto accesible predeterminados. |
| Todas las piezas | `className` y style | Según el nodo y Button | — | Sí | Aplicados al elemento renderizado correspondiente. |

## 6. Funcionamiento y estados

- Pagination no mantiene estado. El enlace activo se determina con `isActive`. El consumidor decide cómo representar los límites, si omite los enlaces anterior y siguiente, y qué URL asigna a cada número.
- La lista y sus ranuras son `pagination`, `pagination-content`, `pagination-item`, `pagination-link` y `pagination-ellipsis`. El enlace activo expone `data-active` y `aria-current="page"`.
- PaginationPrevious y PaginationNext ocultan el texto visual por debajo del breakpoint `sm`, pero mantienen el texto en el nombre accesible. Chevron se refleja para idiomas de derecha a izquierda mediante utilidades `rtl:`.
- El enlace se compone con Button en modo no nativo. Un wrapper evita que el tratamiento de teclado de Button intercepte Espacio como si el enlace fuera un botón; Enter mantiene la navegación de Link.

## 7. Estilos admitidos por pieza

| Pieza | Estilos y estados |
| :--- | :--- |
| Pagination | Flex centrado a ancho disponible. `className` se aplica al `nav`. |
| PaginationContent | Lista flexible con wrapping, centrada, gap `1` y ancho mínimo cero. El consumidor puede ajustar distribución y separación. |
| PaginationLink | Button `outline` activo y `ghost` inactivo. Tiene ancho mínimo `2rem`, números tabulares y conserva el foco visible de Button. `className` actúa a través del wrapper de Button y llega al enlace. |
| Previous / Next | Chevron ocupa `1.15em`. El texto se muestra desde `sm`; en móvil los botones reducen el padding. Direcciones compatibles con RTL. |
| PaginationEllipsis | `size-8`, centrado, con texto `gray-bold/75`. Puntos visuales ocultos a accesibilidad; texto de reemplazo visible para tecnologías de asistencia. |

Los colores, estados de foco y tamaños de botones heredan el sistema de Button y sus tokens claro/oscuro. Ajusta la distribución de la lista mediante `className`; la familia no define módulos CSS. `clsx` no resuelve conflictos entre utilidades de Tailwind.

## 8. Ejemplos de composición

```tsx
const currentPage = 3;
const totalPages = 8;

<Pagination aria-label="Resultados de búsqueda">
  <PaginationContent>
    {currentPage > 1 && <PaginationItem>
      <PaginationPrevious href={`?page=${currentPage - 1}`} />
    </PaginationItem>}
    <PaginationItem>
      <PaginationLink href="?page=3" isActive aria-label="Página 3">3</PaginationLink>
    </PaginationItem>
    <PaginationItem><PaginationEllipsis /></PaginationItem>
    {currentPage < totalPages && <PaginationItem>
      <PaginationNext href={`?page=${currentPage + 1}`} />
    </PaginationItem>}
  </PaginationContent>
</Pagination>
```

El consumidor calcula `currentPage`, `totalPages` y las rutas. Evita renderizar enlaces fuera de los límites o identidades activas que no reflejen la página de la URL.

## 9. Accesibilidad e integración

Proporciona un nombre único para cada `nav` en la página. Usa `isActive` en el enlace que representa la página actual; añade un nombre al número si su contexto no basta. Los controles direccionales conservan texto accesible aunque lo oculten visualmente en pantallas pequeñas. PaginationEllipsis oculta sus puntos y conserva un texto alternativo.

La navegación usa Next Link, incluidos sus destinos y handlers de teclado. La familia puede componerse desde una página de servidor si sus props son serializables; handlers personalizados deben definirse en una frontera cliente.

## 10. Límites y verificación

Pagination no calcula páginas ni proporciona enlaces deshabilitados. El consumidor omite los controles no disponibles y genera href válidos. Exporta `pagination.tsx`, `button.tsx`, `icons/index.tsx`, `icons/spinner.tsx`, `next/link` y tokens. Verifica destino, activo, extremos, idioma RTL, nombres accesibles, foco, teclado, wrapping y ancho móvil.
