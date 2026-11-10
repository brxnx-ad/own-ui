import { ShowcaseAnatomyContent, ShowcaseApiTable } from "@/components/shared/showcase-reference";
import { ShowcaseAnatomy, ShowcaseApiReference } from "@/components/shared/showcase";
const anatomy = `<Fieldset>
  <FieldsetLegend>Contacto del equipo</FieldsetLegend>
  <Field name="contactName">
    <FieldLabel>Nombre</FieldLabel>
    <FieldControl />
  </Field>
  <Field name="contactEmail">
    <FieldLabel>Correo de contacto</FieldLabel>
    <FieldControl type="email" />
  </Field>
</Fieldset>`;

const parts = [
  ["Fieldset", "Agrupa los controles en un fieldset nativo y transmite su deshabilitación."],
  ["FieldsetLegend", "Renderiza un div por defecto y proporciona el nombre accesible del grupo."],
];

const groups = [
  { name: "Fieldset", rows: [
    ["disabled", "boolean", "false", "Deshabilita el grupo. Si un Fieldset padre está deshabilitado, disabled={false} en el hijo no lo reactiva."],
    ["name / form", "string", "—", "Atributos del fieldset nativo. Cada control conserva su propio nombre y asociación para el envío."],
    ["children", "ReactNode", "—", "Contiene la leyenda y los controles que aporta el consumidor."],
  ]},
  { name: "FieldsetLegend", rows: [
    ["id", "string", "ID generado", "Identificador que la raíz usa en aria-labelledby."],
    ["children", "ReactNode", "—", "Contenido que nombra el grupo."],
  ]},
  { name: "Ambas piezas", rows: [
    ["className", "string | (state: { disabled: boolean }) => string | undefined", "—", "Añade clases al nodo."],
    ["style", "CSSProperties | (state: { disabled: boolean }) => CSSProperties | undefined", "—", "Aplica estilos inline al nodo."],
    ["render", "ReactElement | (props, state) => ReactElement", "fieldset / div", "Sustituye el elemento. Conserva las props y la ref, incluidos los atributos que nombran al grupo."],
    ["ref, eventos y atributos HTML", "Según el nodo de Base UI", "—", "Acceso al nodo y a sus atributos compatibles."],
  ]},
];

export function Anatomy() {
  return (
    <ShowcaseAnatomy>
      <ShowcaseAnatomyContent name="Fieldset" code={anatomy} parts={parts} />
    </ShowcaseAnatomy>
  );
}

export function ApiReference() {
  return (
    <ShowcaseApiReference>
      <ShowcaseApiTable
        name="Fieldset"
        groups={groups.map(({ name, rows }) => ({
          piece: name,
          rows: rows.map(([prop, type, defaultValue, description]) => ({ prop, type, defaultValue, description })),
        }))}
      />
      <ul className="body-sm space-y-2 text-content-base">
        <li>Ambas piezas exponen <code>data-disabled</code> al deshabilitarse. La raíz nativa omite sus controles deshabilitados del envío.</li>
        <li>Si sustituyes el <code>fieldset</code> por otro elemento, el componente usado en <code>render</code> debe encargarse de la semántica y de aplicar la deshabilitación a sus controles.</li>
      </ul>
    </ShowcaseApiReference>
  );
}
