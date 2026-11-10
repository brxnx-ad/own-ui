import { ShowcaseAnatomyContent, ShowcaseApiTable } from "@/components/shared/showcase-reference";
import { ShowcaseAnatomy, ShowcaseApiReference } from "@/components/shared/showcase";
const anatomy = `<CheckboxGroup aria-labelledby="informes" defaultValue={["inventario"]}>
  <p id="informes">Informes semanales</p>
  <label>
    <Checkbox value="inventario" aria-labelledby="opcion-inventario">
      <CheckboxIndicator />
    </Checkbox>
    <span id="opcion-inventario">Inventario</span>
  </label>
  <label>
    <Checkbox value="ventas" aria-labelledby="opcion-ventas">
      <CheckboxIndicator />
    </Checkbox>
    <span id="opcion-ventas">Ventas</span>
  </label>
</CheckboxGroup>`;

const parts = [
  ["CheckboxGroup", "Agrupa las opciones, administra los valores seleccionados y comunica el nombre del grupo."],
  ["Checkbox", "Aporta una opción identificada por value o el control global con parent."],
  ["CheckboxIndicator", "Muestra el estado de cada casilla y la selección parcial de la casilla principal."],
];

const rows = [
  ["defaultValue", "string[]", "[]", "Valores inicialmente marcados en modo no controlado."],
  ["value", "string[]", "—", "Valores marcados en modo controlado. Actualízalos con onValueChange."],
  ["onValueChange", "(value: string[], details: CheckboxGroupChangeEventDetails) => void", "—", "Recibe la próxima selección tras activar una casilla. details.cancel() cancela el cambio."],
  ["allValues", "string[]", "—", "Valores de todas las opciones. Úsalo con un grupo controlado y una casilla con parent."],
  ["disabled", "boolean", "false", "Deshabilita todas las casillas del grupo, incluida la principal."],
  ["children", "ReactNode", "—", "Contenido del grupo, incluidas las casillas y sus etiquetas."],
  ["aria-labelledby / aria-label", "string", "—", "Proporciona el nombre accesible del grupo. Prefiere aria-labelledby cuando el título es visible."],
  ["className", "string | (state) => string | undefined", "—", "Agrega clases estáticas o dependientes del estado al contenedor."],
  ["style", "CSSProperties | (state) => CSSProperties | undefined", "—", "Aplica estilos inline al contenedor."],
  ["render", "ReactElement | (props, state) => ReactElement", "div", "Sustituye el contenedor. Propaga las props y la referencia recibidas para conservar su semántica."],
];

export function Anatomy() {
  return (
    <ShowcaseAnatomy>
      <ShowcaseAnatomyContent name="Checkbox Group" code={anatomy} parts={parts} />
    </ShowcaseAnatomy>
  );
}

export function ApiReference() {
  return (
    <ShowcaseApiReference>
      <ShowcaseApiTable
        name="Checkbox Group"
        groups={[{
          piece: "CheckboxGroup",
          rows: rows.map(([prop, type, defaultValue, description]) => ({ prop, type, defaultValue, description })),
        }]}
      />
      <ul className="list-disc space-y-2 pl-5 body-sm text-content-base">
        <li>Asigna un <code>value</code> único a cada opción. <code>parent</code> y <code>name</code> pertenecen a <code>Checkbox</code>.</li>
        <li><code>onValueChange</code> recibe el evento nativo y el motivo <code>none</code>. Actualizar <code>value</code> desde fuera no dispara el callback.</li>
        <li>Tab recorre las casillas habilitadas y Espacio cambia la selección. Cada casilla conserva su etiqueta y su foco.</li>
      </ul>
    </ShowcaseApiReference>
  );
}
