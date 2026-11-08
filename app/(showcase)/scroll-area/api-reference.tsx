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
    <section aria-labelledby="anatomy-heading" className="space-y-4">
      <h2 id="anatomy-heading" className="h3">Anatomía</h2>
      <p className="body-sm text-gray-bold/75">El viewport contiene el contenido y cada barra se compone con su indicador.</p>
      <pre aria-label="Composición de Scroll Area en JSX" className="overflow-x-auto rounded-2xl border border-gray-base bg-surface-base p-6 text-sm">
        <code>{anatomy}</code>
      </pre>
      <div className="overflow-x-auto rounded-2xl border border-gray-base bg-surface-base">
        <table className="body-sm w-full text-left">
          <caption className="sr-only">Piezas de Scroll Area y sus responsabilidades</caption>
          <thead className="bg-surface-bold">
            <tr><th scope="col" className="p-4">Pieza</th><th scope="col" className="p-4">Responsabilidad</th></tr>
          </thead>
          <tbody>
            {parts.map(([name, description]) => (
              <tr key={name} className="border-t border-gray-base">
                <th scope="row" className="p-4 font-mono text-xs">{name}</th>
                <td className="p-4">{description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export function ApiReference() {
  return (
    <section aria-labelledby="api-heading" className="space-y-4">
      <h2 id="api-heading" className="h3">Referencia de API</h2>
      <p className="body-sm text-gray-bold/75">Las opciones específicas de cada pieza provienen de Base UI.</p>
      <div role="region" aria-label="Tabla de referencia de API" tabIndex={0} className="overflow-x-auto rounded-2xl border border-gray-base bg-surface-base focus-visible:outline-2 focus-visible:outline-gray-bold">
        <table className="body-sm w-full min-w-3xl text-left">
          <caption className="sr-only">Props, tipos y valores predeterminados de Scroll Area</caption>
          <thead className="bg-surface-bold">
            <tr>
              {["Pieza", "Prop o callback", "Tipo", "Predeterminado", "Opcional", "Función"].map((label) => (
                <th key={label} scope="col" className="p-4">{label}</th>
              ))}
            </tr>
          </thead>
          {groups.map(({ piece, rows }) => (
            <tbody key={piece}>
              {rows.map(([name, type, defaultValue, description], index) => (
                <tr key={name} className="border-t border-gray-base align-top">
                  {index === 0 && <th scope="rowgroup" rowSpan={rows.length} className="p-4 font-medium">{piece}</th>}
                  <th scope="row" className="p-4 font-mono text-xs">{name}</th>
                  <td className="min-w-36 p-4 font-mono text-xs">{type}</td>
                  <td className="p-4">{defaultValue}</td>
                  <td className="p-4">Sí</td>
                  <td className="min-w-60 p-4">{description}</td>
                </tr>
              ))}
            </tbody>
          ))}
        </table>
      </div>
      <ul className="body-sm list-disc space-y-2 ps-5 text-gray-bold/75">
        <li>Usa <code>Tab</code> para enfocar el viewport y las flechas para recorrerlo. Identifica las regiones relevantes con un nombre accesible.</li>
        <li>Los atributos <code>data-has-overflow-x</code> y <code>data-has-overflow-y</code> indican qué ejes desbordan. Los atributos <code>data-overflow-*-start</code> y <code>data-overflow-*-end</code> indican hacia qué bordes queda contenido.</li>
        <li>Las pistas se superponen al contenido. Reserva espacio junto al borde con padding en <code>ScrollAreaContent</code>.</li>
        <li>La transición de color del indicador y la opacidad de los degradados del ejemplo respetan el movimiento reducido.</li>
      </ul>
    </section>
  );
}
