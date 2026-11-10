# Chart

## 1. Identificación

Chart envuelve el adaptador SVG `@tanstack/charts/react` con una figura semántica y un módulo CSS que aplica los tokens de own-ui.

## 2. Propósito y casos de uso

Representa datos en gráficos con ejes, guías, leyendas y navegación por puntos. El consumidor elige las marcas, escalas e interacciones de TanStack Charts. Usa una tabla como complemento cuando el lector necesite consultar valores exactos.

## 3. Importación y anatomía

El módulo exporta `Chart` y el tipo genérico `ChartProps<TDatum, TXValue, TYValue>`. La definición infiere los tipos de los datos y de los valores de ambos ejes.

```tsx
"use client";

import { Chart } from "@/components/own/dependant/chart";
import { lineY } from "@tanstack/charts/line";
import { scaleLinear } from "@tanstack/charts/scales/linear";
import { defineChart } from "@tanstack/charts/scene";
import { tooltip } from "@tanstack/charts/tooltip";

const rows = [{ day: 1, units: 32 }, { day: 2, units: 41 }];
const definition = defineChart({
  marks: [lineY(rows, { x: "day", y: "units", points: true })],
  scales: { x: { scale: scaleLinear }, y: { scale: scaleLinear } },
  tooltip,
});

export function DailyOutput() {
  return <Chart definition={definition} ariaLabel="Unidades por día" caption="La producción aumentó en 9 unidades." />;
}
```

| Pieza | Elemento | Responsabilidad |
| :--- | :--- | :--- |
| Chart | `figure` con `data-slot="chart"` | Aloja el gráfico y delimita los estilos de own-ui. |
| Adaptador | Dos `div` con las clases `ts-chart-host` y `ts-chart-surface` | Mide el espacio, monta el motor y mantiene el SVG. |
| Superficie | `svg.ts-chart` con rol `img` | Presenta las marcas, guías y el nombre accesible. |
| Pie opcional | `figcaption` con `data-slot="chart-caption"` | Presenta un resumen, una fuente u otro contexto visible. |

## 4. Variantes y tamaños

La definición determina el tipo de gráfico. El ancho es adaptable por defecto. `height` fija la altura, `aspectRatio` ajusta la altura al ancho y `width` fija el ancho cuando se requiere. La altura predeterminada es 320 px y el ancho inicial para renderizado en servidor es 640 px si se omite `width`.

## 5. Props y callbacks

| Pieza | Prop o callback | Tipo | Predeterminado | Opcional | Función y condiciones |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Chart | `definition` | `ChartDefinition<TDatum, TXValue, TYValue>` | — | No | Definición de TanStack Charts. Su identidad delimita las actualizaciones. |
| Chart | `ariaLabel` | `string` | — | No | Nombre accesible del SVG. |
| Chart | `ariaDescription` | `string` | — | Sí | Descripción adicional del SVG. |
| Chart | `caption` | `ReactNode` | — | Sí | Añade un pie visible a la figura. |
| Chart | `figureProps` | `Omit<ComponentProps<"figure">, "children" \| "dangerouslySetInnerHTML">` | — | Sí | Atributos, eventos, ref y estilos de la figura. |
| Chart | `width`, `initialWidth` | `number` | Adaptable, `640` | Sí | Ancho fijo y ancho inicial para el renderizado adaptable, respectivamente. |
| Chart | `height`, `aspectRatio` | `number` | `320` sin proporción, — | Sí | Altura fija o proporción ancho/alto positiva. `height` tiene precedencia. |
| Chart | `className`, `style` | `string`, `CSSProperties` | — | Sí | Aplican al host de TanStack. `style` puede sobrescribir el tamaño visual del host sin cambiar las dimensiones fijadas por props. |
| Chart | `tabIndex` | `number` | `0` | Sí | Orden de foco de la superficie. La definición puede desactivar el teclado. |
| Chart | `idPrefix` | `string` | Generado por React | Sí | Prefijo de recursos SVG. Usa un valor único y estable si lo configuras. |
| Chart | `onFocusChange` | `(point: ChartPoint \| null) => void` | — | Sí | Recibe el punto enfocado o `null` al perderlo. |
| Chart | `onFocusGroupChange` | `(points: readonly ChartPoint[]) => void` | — | Sí | Recibe los puntos del grupo enfocado. |
| Chart | `onSelect` | `(point: ChartPoint \| null) => void` | — | Sí | Recibe la activación mediante el teclado o el puntero. |
| Chart | `onRender` | `(context: ChartRenderContext) => void` | — | Sí | Expone la superficie y la escena tras el renderizado. |
| Chart | `renderSvg`, `measureText` | `ChartSvgRenderer`, `ChartTextMeasurer` | Comportamiento del motor | Sí | Personalizan la serialización SVG y la medición de texto. |

`ChartDefinition` y `ChartPoint` se pueden importar desde `@tanstack/charts/react`. Consulta los tipos y casos avanzados en la [API del adaptador React](https://tanstack.com/charts/latest/docs/framework/react/reference/chart).

## 6. Funcionamiento y estados

- El adaptador renderiza el SVG inicial en el servidor y mide el contenedor tras hidratarse. Conserva los datos y las dimensiones iniciales deterministas entre servidor y cliente.
- Declara las definiciones fijas fuera del render. Cuando capturen props o estado, reconstruye la definición con `useMemo` y usa como dependencias los datos y las opciones que cambian.
- La definición controla el foco, el tooltip, la leyenda y el movimiento. Importa `tooltip` desde `@tanstack/charts/tooltip` para habilitar la consulta de puntos. `colorLegend` desde `@tanstack/charts/legend` usa la escala cromática de la definición.
- Los dos slots de own-ui son `chart` y `chart-caption`. El motor gestiona el SVG, los estados de foco y los nodos del tooltip.

## 7. Estilos admitidos por pieza

- `figureProps.className` y `figureProps.style` afectan a la figura. Añade una superficie, borde o padding según el contexto. La figura ocupa el ancho disponible y mantiene el pie debajo con una separación interna.
- El módulo asigna `--ts-chart-1` a `--ts-chart-6` a las familias primaria, información, éxito, advertencia, error y neutra. En oscuro aclara las cinco primeras mezclándolas con `gray-bold`. Para una instancia, define las variables en la figura. Para un significado fijo por serie, usa una escala ordinal con dominio explícito y valores `var(--ts-chart-N)`.
- El texto y los ejes por defecto heredan `content-bold`. El tooltip usa `surface-bold`, borde `gray-base`, radio base y `shadow-m`. Si un portal mueve el tooltip fuera de la figura, aplica los tokens necesarios en un ancestro compartido.
- `className` y `style` afectan al host interior. Usa las props de dimensiones para que el tamaño de la escena coincida con el tamaño del host. El módulo dibuja un contorno en el SVG cuando recibe foco visible.
- El movimiento pertenece a la definición. Si habilitas `svgAnimation`, conserva la adaptación a `prefers-reduced-motion` del motor. [Temas y estilos de TanStack Charts](https://tanstack.com/charts/latest/docs/guides/themes-and-styling)

## 8. Ejemplos de composición

```tsx
"use client";

import { useMemo } from "react";
import { barY } from "@tanstack/charts/bar";
import { scaleBand } from "@tanstack/charts/scales/band";
import { scaleLinear } from "@tanstack/charts/scales/linear";
import { defineChart } from "@tanstack/charts/scene";
import { tooltip } from "@tanstack/charts/tooltip";
import { Chart } from "@/components/own/dependant/chart";

export function OrdersByArea({ rows }: { rows: readonly { area: string; orders: number }[] }) {
  const definition = useMemo(() => defineChart({
    marks: [barY(rows, { x: "area", y: "orders", radius: { end: 4 } })],
    scales: {
      x: { scale: () => scaleBand<string>().padding(0.24), axis: { label: "Área" } },
      y: { scale: scaleLinear, grid: true, axis: { label: "Órdenes" } },
    },
    tooltip,
  }), [rows]);

  return <Chart definition={definition} ariaLabel="Órdenes por área" initialWidth={560} height={260} />;
}
```

Puedes pasar `rows` desde una página del servidor. Crea la definición y los callbacks en el componente cliente porque contienen funciones y escalas.

## 9. Accesibilidad e integración

- Da al SVG un `ariaLabel` que identifique el dato y su contexto. Usa `ariaDescription` para añadir información pertinente y `caption` para un resumen visible.
- Con el gráfico enfocado, usa las flechas para recorrer los puntos y Enter o Espacio para activarlos. En la configuración estándar, Escape cierra el tooltip fijado. El tooltip transitorio se oculta cuando deja de haber un punto enfocado.
- Distingue las series mediante texto, formas o patrones de línea además del color. Ofrece una tabla o un resumen textual cuando la consulta del dato sea importante. [Accesibilidad en TanStack Charts](https://tanstack.com/charts/latest/docs/guides/accessibility)

## 10. Límites y verificación

- Este componente usa el adaptador SVG y su tooltip estándar. El consumidor decide la representación, la preparación de datos y el contenido alternativo. [Adaptador React de TanStack Charts](https://tanstack.com/charts/latest/docs/framework/react/adapter)
- Para exportarlo, copia `chart.tsx` y `chart.module.css`, conserva los tokens de own-ui e instala `@tanstack/charts` 1.5.0. [Archivos y compatibilidad](../../structure.md#compatibilidad-y-archivos-necesarios)
- Comprueba el renderizado inicial, la adaptación al ancho, el contraste en ambos temas, el foco por teclado, el tooltip y las actualizaciones de datos.
