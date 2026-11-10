import { ShowcaseAnatomyContent, ShowcaseApiTable } from "@/components/shared/showcase-reference";
import { ShowcaseAnatomy, ShowcaseApiReference } from "@/components/shared/showcase";
const anatomy = `<ScrollArea className="w-full">
  <ScrollAreaViewport role="region" aria-label="Plan de trabajo" className="max-h-44">
    <ScrollAreaContent className="min-w-xl pe-6 pb-6">
      {contenido}
    </ScrollAreaContent>
  </ScrollAreaViewport>
  <ScrollAreaScrollbar>
    <ScrollAreaThumb />
  </ScrollAreaScrollbar>
  <ScrollAreaScrollbar orientation="horizontal">
    <ScrollAreaThumb />
  </ScrollAreaScrollbar>
  <ScrollAreaCorner />
</ScrollArea>`;

const parts = [
  ["ScrollArea", "Agrupa las piezas y coordina las mediciones y los estados."],
  ["ScrollAreaViewport", "Contiene el desplazamiento nativo y recibe el foco cuando hay desbordamiento."],
  ["ScrollAreaContent", "Envuelve el contenido y permite recalcular las barras al cambiar sus dimensiones."],
  ["ScrollAreaScrollbar", "Contiene la pista del eje indicado y se coloca junto al borde correspondiente."],
  ["ScrollAreaThumb", "Indica la posición y permite cambiarla mediante arrastre."],
  ["ScrollAreaCorner", "Ocupa la intersección cuando ambos ejes desbordan."],
];

const groups = [
  {
    piece: "ScrollArea",
    rows: [
      ["overflowEdgeThreshold", "number | Partial<{ xStart: number; xEnd: number; yStart: number; yEnd: number }>", "0", "Distancia en píxeles que debe superarse para activar los atributos de cada borde. Las claves omitidas usan 0."],
    ],
  },
  {
    piece: "ScrollAreaViewport",
    rows: [
      ["onScroll", "(event: BaseUIEvent<React.UIEvent<HTMLDivElement>>) => void", "—", "Lee scrollTop y scrollLeft desde event.currentTarget. Conserva el handler interno para sincronizar las barras."],
      ["tabIndex", "number", "0 con desbordamiento, −1 sin él", "Base UI actualiza el valor según la medición del área."],
    ],
  },
  {
    piece: "ScrollAreaScrollbar",
    rows: [
      ["orientation", '"vertical" | "horizontal"', '"vertical"', "Selecciona el eje de la pista y su indicador."],
      ["keepMounted", "boolean", "false", "Conserva la barra y su indicador en el DOM cuando ese eje deja de desbordar. El estilo base los mantiene ocultos."],
    ],
  },
  {
    piece: "Todas las piezas",
    rows: [
      ["className", "string | (state) => string | undefined", "—", "Acepta clases estáticas o dependientes del estado de la pieza."],
      ["style", "CSSProperties | (state) => CSSProperties | undefined", "—", "Aplica estilos al elemento de la pieza. Conserva las dimensiones y transformaciones que calcula Base UI."],
      ["render", "ReactElement | (props, state) => ReactElement", "div", "Sustituye el elemento. Propaga las props, los eventos y el ref al componerlo."],
      ["ref", "React.Ref<HTMLDivElement>", "—", "En Viewport da acceso a los métodos y propiedades de desplazamiento nativo."],
    ],
  },
];

export function Anatomy() {
  return (
    <ShowcaseAnatomy>
      <p className="body-sm text-content-base">El viewport contiene el contenido y cada barra se compone con su indicador.</p>
      <ShowcaseAnatomyContent name="Scroll Area" code={anatomy} parts={parts} />
    </ShowcaseAnatomy>
  );
}

export function ApiReference() {
  return (
    <ShowcaseApiReference>
      <p className="body-sm text-content-base">Las opciones específicas de cada pieza provienen de Base UI.</p>
      <ShowcaseApiTable
        name="Scroll Area"
        groups={groups.map(({ piece, rows }) => ({
          piece: piece,
          rows: rows.map(([name, type, defaultValue, description]) => ({ prop: name, type, defaultValue, description })),
        }))}
      />
      <ul className="body-sm list-disc space-y-2 ps-5 text-content-base">
        <li>Usa <code>Tab</code> para enfocar el viewport y las flechas para recorrerlo. Identifica las regiones relevantes con un nombre accesible.</li>
        <li>Los atributos <code>data-has-overflow-x</code> y <code>data-has-overflow-y</code> indican qué ejes desbordan. Los atributos <code>data-overflow-*-start</code> y <code>data-overflow-*-end</code> indican hacia qué bordes queda contenido.</li>
        <li>Las pistas se superponen al contenido. Reserva espacio junto al borde con padding en <code>ScrollAreaContent</code>.</li>
        <li>La transición de color del indicador y la opacidad de los degradados del ejemplo respetan el movimiento reducido.</li>
      </ul>
    </ShowcaseApiReference>
  );
}
