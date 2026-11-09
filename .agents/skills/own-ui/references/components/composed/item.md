# Item

## 1. Identificación

Item compone piezas HTML, `Separator` de own-ui, `useRender` de Base UI y `clsx` para formar filas y grupos de contenido.

## 2. Propósito y casos de uso

Usa Item para presentar una entidad con medio visual, título, descripción y acciones opcionales. ItemGroup añade semántica de lista y distribución. Para texto plano usa estructuras de lectura más sencillas; un Item no constituye por sí solo un enlace ni un botón.

## 3. Importación y anatomía

```tsx
import {
  Item, ItemActions, ItemContent, ItemDescription, ItemFooter,
  ItemGroup, ItemHeader, ItemMedia, ItemSeparator, ItemTitle,
} from "@/components/own/composed/item";
```

| Pieza | Elemento predeterminado | Responsabilidad |
| :--- | :--- | :--- |
| `ItemGroup` | `div[role=list]` | Agrupa elementos. |
| `Item` | `div`, o `div[role=listitem]` en ItemGroup | Contenedor principal con variante y tamaño. |
| `ItemMedia` | `div` | Presenta icono o imagen. |
| `ItemContent` | `div` | Organiza título y descripción. |
| `ItemTitle` | `div` | Contenido de título. El consumidor elige la semántica del encabezado. |
| `ItemDescription` | `p` | Texto descriptivo. |
| `ItemActions` | `div` | Agrupa controles aportados por el consumidor. |
| `ItemHeader`, `ItemFooter` | `div` | Piezas opcionales que abarcan el ancho del elemento. |
| `ItemSeparator` | `div[role=separator]` de Separator | Separador horizontal decorativo. |

```tsx
<ItemGroup aria-label="Documentos">
  <Item variant="outline">
    <ItemMedia variant="icon"><FileText aria-hidden="true" /></ItemMedia>
    <ItemContent>
      <ItemTitle>Informe</ItemTitle>
      <ItemDescription>Actualizado hoy</ItemDescription>
    </ItemContent>
    <ItemActions><Button>Abrir</Button></ItemActions>
  </Item>
  <ItemSeparator />
</ItemGroup>
```

El módulo exporta `ItemVariant`, `ItemSize`, `ItemMediaVariant`, `ItemProps` y `ItemMediaProps`.

## 4. Variantes y tamaños

| Prop | Valores y predeterminado | Apariencia |
| :--- | :--- | :--- |
| `variant` | `default`, `outline`, `muted`; predeterminado `default` | Borde transparente, borde `gray-base` o fondo `surface-base`. |
| `size` | `default`, `sm`, `xs`; predeterminado `default` | Ajusta separación y padding interior. `xs` reduce el texto de la fila. |
| `ItemMedia.variant` | `default`, `icon`, `image`; predeterminado `default` | Sin estilo adicional, ajuste de SVG o medio cuadrado con imagen recortada. |

`ItemHeader` y `ItemFooter` ocupan el ancho del elemento. El ancho de contenido, imágenes y acciones puede personalizarse con clases.

## 5. Props y callbacks

| Pieza | Prop o callback | Tipo | Predeterminado | Opcional | Función y condiciones |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Item | `variant` | `ItemVariant` | `"default"` | Sí | Selecciona el borde o superficie. |
| Item | `size` | `ItemSize` | `"default"` | Sí | Ajusta la densidad. |
| Item | `render` | Elemento o callback de `useRender` | `div` | Sí | Cambia el nodo. En la forma funcional pasa las props y la ref recibidas al elemento final. |
| Item | `className`, `style`, `ref` | Props de `useRender` para `div` | — | Sí | Se aplican al elemento que se renderiza. |
| ItemMedia | `variant` | `ItemMediaVariant` | `"default"` | Sí | Cambia dimensiones y estilos del medio. |
| ItemSeparator | Props de Separator | `SeparatorProps` | `orientation="horizontal"`, decorativo | Sí | Acepta orientación, className, style, render y props nativas de la pieza. |
| ItemGroup, ItemContent, ItemActions, ItemHeader, ItemFooter | Props del `div` | `ComponentPropsWithRef<"div">` | — | Sí | Atributos, contenido, eventos, className, style y ref. |
| ItemTitle | Props del `div` | `ComponentPropsWithRef<"div">` | — | Sí | El consumidor controla la semántica de encabezado. |
| ItemDescription | Props del `p` | `ComponentPropsWithRef<"p">` | — | Sí | Expone semántica de párrafo y sus atributos. |

## 6. Funcionamiento y estados

Item no mantiene estado. ItemGroup crea un contexto para que un Item sin `render` reciba `role="listitem"`. Cuando se usa `render`, el elemento personalizado debe llevar su propia semántica de lista. ItemGroup no envuelve cada hijo en un `li`.

Los slots son `item-group`, `item`, `item-media`, `item-content`, `item-title`, `item-description`, `item-actions`, `item-header`, `item-footer` e `item-separator`. Item expone `data-variant` y `data-size`; ItemMedia expone `data-variant`.

## 7. Estilos admitidos por pieza

| Pieza | Estilos y selectores |
| :--- | :--- |
| ItemGroup | Columna de ancho disponible, separación base `gap-3`. El consumidor ajusta el espaciado del grupo con `className`. |
| Item | Fila flexible con borde `gray-base` y radio `rounded-base`. `default` deja borde transparente, `outline` lo muestra y `muted` usa `surface-base`. El foco visible usa `primary-base`. |
| ItemMedia | SVG sin tamaño explícito `size-4`; imagen `size-10`, recortada con `object-cover`. `group-data-[size=sm]/item` y `group-data-[size=xs]/item` reducen dimensiones. |
| ItemContent | `flex-1 min-w-0`; etiquetas largas pueden partirse con `wrap-anywhere`. |
| ItemTitle, ItemDescription | Texto que se adapta al ancho. Las descripciones subrayan enlaces descendientes. |
| ItemActions, ItemHeader, ItemFooter | Flex con wrapping y gap `2`; header y footer ocupan el ancho entero mediante `basis-full`. |
| ItemSeparator | Usa `gray-base`; el consumidor puede ajustar orientación y espacio con las props de Separator. |

Todos los ajustes locales actúan con `className` o `style` sobre la pieza concreta. Usa tokens de own-ui para mantener ambos temas. `render` acepta elementos o funciones de Base UI; `clsx` concatena clases sin fusionar utilidades en conflicto.

## 8. Ejemplos de composición

```tsx
<Item variant="outline" render={<Link href="/documents/42" />}>
  <ItemMedia variant="image"><Image src={src} alt="" width={40} height={40} /></ItemMedia>
  <ItemContent>
    <ItemTitle>Guía del proyecto</ItemTitle>
    <ItemDescription>Actualizada hoy</ItemDescription>
  </ItemContent>
</Item>
```

Usa Image con dimensiones o `fill` de Next.js y proporciona un `alt` acorde a si la imagen aporta información. Los atributos y el ref para el enlace los combina Base UI en `render`.

## 9. Accesibilidad e integración

Asigna un nombre a ItemGroup. El Item predeterminado dentro de la lista expone `role=listitem`. Si reemplazas su nodo con `render`, usa un elemento cuya función sea acorde y propaga props y ref. Si el elemento entero es interactivo, garantiza un nombre accesible y foco visible. No envuelvas acciones de Button en un enlace interactivo que también contiene la fila.

ItemTitle usa `div`; escoge el nivel de encabezado y la estructura de contenido desde el consumidor. ItemDescription usa un párrafo. Los separadores son decorativos por defecto. Los iconos decorativos reciben `aria-hidden="true"`.

## 10. Límites y verificación

Item no crea botones, enlaces, encabezados, imágenes ni colecciones; el consumidor proporciona su contenido y semántica. ItemGroup es un `div[role=list]`, no una lista HTML con `ul/li`. Exporta `item.tsx`, Separator y los tokens compartidos. Verifica Item aislado y agrupado, roles, variantes, medios, enlaces, acciones, teclado y anchos estrechos en ambos temas.
