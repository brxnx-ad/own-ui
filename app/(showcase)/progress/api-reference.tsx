import { ShowcaseAnatomyContent, ShowcaseApiTable } from "@/components/shared/showcase-reference";
import { ShowcaseAnatomy, ShowcaseApiReference } from "@/components/shared/showcase";
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
    <ShowcaseAnatomy>
      <ShowcaseAnatomyContent name="Progress" code={anatomy} parts={anatomyRows} />
    </ShowcaseAnatomy>
  );
}

export function ApiReference() {
  return (
    <ShowcaseApiReference>
      <ShowcaseApiTable
        name="Progress"
        groups={groups.map(({ piece, rows }) => ({
          piece: piece,
          rows: rows.map(([prop, type, defaultValue, optional, description]) => ({ prop, type, defaultValue, description, optional })),
        }))}
      />
      <ul className="body-sm space-y-2 text-content-base">
        <li>Base UI acota los valores finitos al rango y omite <code>aria-valuenow</code> cuando el progreso es indeterminado.</li>
        <li>Las piezas exponen <code>data-progressing</code>, <code>data-indeterminate</code> o <code>data-complete</code>. Con movimiento reducido, el segmento indeterminado permanece centrado.</li>
        <li>Coloca los controles que cambian el avance fuera de la barra. Usa <code>ProgressLabel</code> o un nombre accesible en la raíz.</li>
      </ul>
    </ShowcaseApiReference>
  );
}
