import { ShowcaseAnatomy, ShowcaseApiReference } from "@/components/shared/showcase";
import { ShowcaseAnatomyContent, ShowcaseApiTable, type ShowcaseApiGroup } from "@/components/shared/showcase-reference";

const anatomy = `"use client";

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

<Chart
  definition={definition}
  ariaLabel="Unidades por día"
  height={240}
  caption="La producción aumentó en 9 unidades."
/>`;

const parts = [
  ["Chart", "Figura semántica que aplica los tokens de own-ui y aloja el adaptador SVG de React."],
  ["definition", "Define datos, marcas, escalas, guías y comportamientos de TanStack Charts."],
  ["SVG y tooltip", "El adaptador dibuja el gráfico y presenta los datos del punto enfocado cuando la definición habilita tooltip."],
  ["caption", "Pie de figura opcional con contexto visible, como una tendencia o la fuente de los datos."],
];

const groups: ShowcaseApiGroup[] = [
  { piece: "Chart", rows: [
    { prop: "definition", type: "ChartDefinition<TDatum, TXValue, TYValue>", defaultValue: "—", optional: "No", description: "Define la escena y mantiene la inferencia de tipos de los callbacks." },
    { prop: "ariaLabel", type: "string", defaultValue: "—", optional: "No", description: "Nombre accesible de la superficie SVG." },
    { prop: "ariaDescription", type: "string", defaultValue: "—", description: "Descripción accesible de la superficie." },
    { prop: "caption", type: "ReactNode", defaultValue: "—", description: "Añade un figcaption debajo del gráfico." },
    { prop: "figureProps", type: 'Props de figure sin children ni dangerouslySetInnerHTML', defaultValue: "—", description: "Personaliza la figura y permite apuntar a ella con ref." },
    { prop: "width / initialWidth", type: "number", defaultValue: "Adaptable / 640", description: "Fija el ancho o indica la medida inicial para el renderizado en servidor." },
    { prop: "height / aspectRatio", type: "number", defaultValue: "320 si no hay proporción / —", description: "Configura una altura fija o una proporción. height tiene precedencia." },
    { prop: "className / style", type: "string / CSSProperties", defaultValue: "—", description: "Personalizan el host del adaptador dentro de la figura." },
    { prop: "tabIndex / idPrefix", type: "number / string", defaultValue: "0 / ID generado", description: "Ajusta el foco de la superficie o el prefijo de recursos SVG." },
  ] },
  { piece: "Callbacks de TanStack", rows: [
    { prop: "onFocusChange", type: "(point: ChartPoint | null) => void", defaultValue: "—", description: "Recibe el punto enfocado o null al perderlo." },
    { prop: "onFocusGroupChange", type: "(points: readonly ChartPoint[]) => void", defaultValue: "—", description: "Recibe los puntos del grupo enfocado." },
    { prop: "onSelect", type: "(point: ChartPoint | null) => void", defaultValue: "—", description: "Recibe la activación de un punto por teclado o puntero." },
    { prop: "onRender", type: "(context: ChartRenderContext) => void", defaultValue: "—", description: "Expone la superficie y la escena después de renderizar." },
    { prop: "renderSvg / measureText", type: "ChartSvgRenderer / ChartTextMeasurer", defaultValue: "Comportamiento de TanStack", description: "Personalizan la serialización SVG o la medición tipográfica del motor." },
  ] },
];

export function ChartReference() {
  return (
    <>
      <ShowcaseAnatomy>
        <ShowcaseAnatomyContent name="Chart" code={anatomy} parts={parts} />
      </ShowcaseAnatomy>
      <ShowcaseApiReference>
        <ShowcaseApiTable name="Chart" groups={groups} />
        <p className="body-sm text-gray-bold/75">
          Crea la definición en un Client Component. Puedes pasar los datos serializables desde una página de servidor.
        </p>
      </ShowcaseApiReference>
    </>
  );
}
