const anatomy = `<Progress value={64} locale="es-CL">
  <ProgressLabel>Exportación del informe</ProgressLabel>
  <ProgressValue />
  <ProgressTrack>
    <ProgressIndicator />
  </ProgressTrack>
</Progress>`;

const anatomyRows = [
  ["Progress", "Expone el estado de la tarea como una barra de progreso accesible."],
  ["ProgressLabel", "Da un nombre accesible a la barra."],
  ["ProgressValue", "Muestra el texto formateado o el contenido de su función hija."],
  ["ProgressTrack", "Contiene el indicador y delimita el área de relleno."],
  ["ProgressIndicator", "Muestra la proporción completada o el segmento indeterminado."],
];

const groups = [
  {
    piece: "Progress",
    rows: [
      ["value", "number | null", "—", "No", "Avance actual. Usa null para indicar que el avance se desconoce."],
      ["min / max", "number", "0 / 100", "Sí", "Definen el rango y el cálculo del ancho. Usa límites finitos con max mayor que min."],
      ["locale / format", "Intl.LocalesArgument / Intl.NumberFormatOptions", "Locale del entorno / porcentaje", "Sí", "Con format se muestra el valor acotado en la unidad elegida. Al omitirlo se muestra el porcentaje del rango."],
      ["getAriaValueText", "(formattedValue: string, value: number | null) => string", "—", "Sí", "Personaliza la lectura del avance. Recibe el texto formateado y el valor entregado a la raíz."],
      ["aria-valuetext", "string", "Texto calculado", "Sí", "Sobrescribe el texto accesible calculado, incluido el de getAriaValueText."],
      ["aria-label / aria-labelledby", "string", "Según ProgressLabel", "Sí", "Nombra la barra cuando la etiqueta se resuelve fuera de la familia."],
    ],
  },
  {
    piece: "ProgressValue",
    rows: [
      ["children", "null | ((formattedValue: string | null, value: number | null) => ReactNode)", "Texto formateado", "Sí", "Personaliza el texto visible. La función recibe el valor original y, en estado indeterminado, el texto indeterminate."],
    ],
  },
  {
    piece: "Todas",
    rows: [
      ["className / style", "string / CSSProperties, o funciones del estado", "—", "Sí", "Añade clases o estilos a cada nodo según su estado."],
      ["render / ref / atributos HTML", "Según la pieza", "Elemento de la anatomía / — / —", "Sí", "Compone, accede o añade atributos conservando la semántica de la barra."],
    ],
  },
];

export function Anatomy() {
  return (
    <section aria-labelledby="anatomy-heading" className="space-y-4">
      <h2 id="anatomy-heading" className="h3">Anatomía</h2>
      <pre aria-label="Composición de Progress en JSX" className="overflow-x-auto rounded-2xl border border-gray-base bg-surface-base p-6 text-sm">
        <code>{anatomy}</code>
      </pre>
      <div className="overflow-x-auto rounded-2xl border border-gray-base bg-surface-base">
        <table className="body-sm w-full text-left">
          <caption className="sr-only">Piezas de Progress y sus responsabilidades</caption>
          <thead className="bg-surface-bold">
            <tr><th scope="col" className="p-4">Pieza</th><th scope="col" className="p-4">Responsabilidad</th></tr>
          </thead>
          <tbody>
            {anatomyRows.map(([piece, description]) => (
              <tr key={piece} className="border-t border-gray-base align-top">
                <th scope="row" className="p-4 font-mono text-xs">{piece}</th>
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
      <div role="region" aria-label="Tabla de referencia de API de Progress" tabIndex={0} className="overflow-x-auto rounded-2xl border border-gray-base bg-surface-base focus-visible:outline-2 focus-visible:outline-primary-base">
        <table className="body-sm w-full min-w-3xl text-left">
          <caption className="sr-only">Opciones de Progress por pieza</caption>
          <thead className="bg-surface-bold">
            <tr>
              {["Pieza", "Prop o callback", "Tipo", "Predeterminado", "Opcional", "Función"].map((label) => (
                <th key={label} scope="col" className="p-4">{label}</th>
              ))}
            </tr>
          </thead>
          {groups.map(({ piece, rows }) => (
            <tbody key={piece}>
              {rows.map(([prop, type, defaultValue, optional, description], index) => (
                <tr key={prop} className="border-t border-gray-base align-top">
                  {index === 0 && <th scope="rowgroup" rowSpan={rows.length} className="p-4 font-medium">{piece}</th>}
                  <th scope="row" className="p-4 font-mono text-xs">{prop}</th>
                  <td className="min-w-40 p-4 font-mono text-xs">{type}</td>
                  <td className="p-4">{defaultValue}</td>
                  <td className="p-4">{optional}</td>
                  <td className="min-w-64 p-4">{description}</td>
                </tr>
              ))}
            </tbody>
          ))}
        </table>
      </div>
      <ul className="body-sm space-y-2 text-gray-bold/75">
        <li>Base UI acota los valores finitos al rango y omite <code>aria-valuenow</code> cuando el progreso es indeterminado.</li>
        <li>Las piezas exponen <code>data-progressing</code>, <code>data-indeterminate</code> o <code>data-complete</code>. Con movimiento reducido, el segmento indeterminado permanece centrado.</li>
        <li>Coloca los controles que cambian el avance fuera de la barra. Usa <code>ProgressLabel</code> o un nombre accesible en la raíz.</li>
      </ul>
    </section>
  );
}
