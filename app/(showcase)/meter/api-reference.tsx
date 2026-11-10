import { ShowcaseAnatomyContent, ShowcaseApiTable } from "@/components/shared/showcase-reference";
import { ShowcaseAnatomy, ShowcaseApiReference } from "@/components/shared/showcase";
const anatomy = `<Meter value={64}>
  <MeterLabel>Almacenamiento utilizado</MeterLabel>
  <MeterValue />
  <MeterTrack>
    <MeterIndicator />
  </MeterTrack>
</Meter>`;

const parts = [
  [
    "Meter",
    "Renderiza un div con rol meter, calcula el porcentaje dentro del rango y publica los atributos ARIA del valor.",
  ],
  [
    "MeterLabel",
    "Renderiza un span cuyo identificador se registra automáticamente en aria-labelledby de la raíz.",
  ],
  [
    "MeterValue",
    "Renderiza un span con aria-hidden que presenta el valor formateado o el retorno de su función hija.",
  ],
  [
    "MeterTrack",
    "Renderiza un div que ocupa el ancho completo de la cuadrícula y representa el rango total entre min y max.",
  ],
  [
    "MeterIndicator",
    "Renderiza el relleno interior cuyo ancho refleja el porcentaje acotado entre 0 % y 100 %.",
  ],
];

const groups = [
  {
    name: "Meter",
    rows: [
      [
        "value",
        "number",
        "—",
        "No",
        "Valor actual del medidor. Se acota entre min y max para aria-valuenow, el texto formateado y el ancho del indicador.",
      ],
      [
        "min",
        "number",
        "0",
        "Sí",
        "Límite inferior del rango comunicado en aria-valuemin.",
      ],
      [
        "max",
        "number",
        "100",
        "Sí",
        "Límite superior del rango comunicado en aria-valuemax.",
      ],
      [
        "format",
        "Intl.NumberFormatOptions",
        "{ style: 'percent' } sobre el porcentaje",
        "Sí",
        "Opciones de Intl.NumberFormat para formatear el valor acotado en MeterValue y aria-valuetext.",
      ],
      [
        "locale",
        "Intl.LocalesArgument",
        "Configuración regional del entorno",
        "Sí",
        "Configuración regional empleada por Intl.NumberFormat al formatear el valor.",
      ],
      [
        "getAriaValueText",
        "(formattedValue: string, value: number) => string",
        "formattedValue",
        "Sí",
        "Genera la alternativa textual legible para aria-valuetext. Recibe el texto formateado y el valor numérico original.",
      ],
      [
        "aria-label / aria-labelledby / aria-valuetext",
        "string",
        "ID de MeterLabel / formattedValue",
        "Sí",
        "Nombre accesible cuando se omite MeterLabel o sobrescritura directa de los atributos ARIA en la raíz.",
      ],
    ],
  },
  {
    name: "MeterLabel",
    rows: [
      [
        "id",
        "string",
        "ID generado",
        "Sí",
        "Identificador registrado en la raíz para vincular la etiqueta con aria-labelledby.",
      ],
      [
        "children",
        "ReactNode",
        "—",
        "Sí",
        "Texto visible de la etiqueta que identifica la magnitud medida.",
      ],
    ],
  },
  {
    name: "MeterValue",
    rows: [
      [
        "children",
        "null | ((formattedValue: string, value: number) => ReactNode)",
        "formattedValue",
        "Sí",
        "Función opcional para personalizar la presentación visual del valor sin alterar aria-valuetext.",
      ],
    ],
  },
  {
    name: "Todas las piezas",
    rows: [
      [
        "className",
        "string | ((state: MeterState) => string | undefined)",
        "Clases de la pieza",
        "Sí",
        "Combina clases adicionales estáticas o funcionales con las clases base de own-ui.",
      ],
      [
        "style",
        "CSSProperties | ((state: MeterState) => CSSProperties | undefined)",
        "Ancho calculado en MeterIndicator",
        "Sí",
        "Aplica estilos en línea al nodo. En MeterIndicator se fusiona con el ancho porcentual calculado.",
      ],
      [
        "render",
        "ReactElement | ((props, state: MeterState) => ReactElement)",
        "Elemento de la pieza",
        "Sí",
        "Sustituye el elemento conservando las props, los atributos ARIA y la referencia DOM.",
      ],
      [
        "ref",
        "Ref<HTMLDivElement> | Ref<HTMLSpanElement>",
        "—",
        "Sí",
        "Expone el nodo DOM montado mediante React 19.",
      ],
    ],
  },
];

export function Anatomy() {
  return (
    <ShowcaseAnatomy>
      <ShowcaseAnatomyContent name="Meter" code={anatomy} parts={parts} />
    </ShowcaseAnatomy>
  );
}

export function ApiReference() {
  return (
    <ShowcaseApiReference>
      <ShowcaseApiTable
        name="Meter"
        groups={groups.map(({ name, rows }) => ({
          piece: name,
          rows: rows.map(([prop, type, defaultValue, optional, description]) => ({ prop, type, defaultValue, description, optional })),
        }))}
      />
      <ul className="body-sm list-disc space-y-2 ps-5 text-content-base">
        <li>
          Si <code>value</code> queda fuera de <code>[min, max]</code> o es{" "}
          <code>NaN</code>, Base UI acota el porcentaje entre <code>0</code> y{" "}
          <code>100</code> y el valor de <code>aria-valuenow</code> entre{" "}
          <code>min</code> y <code>max</code>.
        </li>
        <li>
          Las piezas exponen <code>data-slot</code> (<code>meter</code>,{" "}
          <code>meter-label</code>, <code>meter-value</code>,{" "}
          <code>meter-track</code> y <code>meter-indicator</code>).{" "}
          <code>MeterState</code> es un objeto vacío compartido por las cinco
          piezas.
        </li>
        <li>
          <code>MeterIndicator</code> transiciona <code>width</code> y{" "}
          <code>background-color</code> durante <code>150ms</code> con{" "}
          <code>motion-safe</code>, respetando{" "}
          <code>prefers-reduced-motion: reduce</code>.
        </li>
        <li>
          Meter es un indicador de solo lectura y no recibe foco de teclado. Si
          no renderizas <code>MeterLabel</code>, proporciona{" "}
          <code>aria-label</code> o <code>aria-labelledby</code> en{" "}
          <code>Meter</code>.
        </li>
      </ul>
    </ShowcaseApiReference>
  );
}
