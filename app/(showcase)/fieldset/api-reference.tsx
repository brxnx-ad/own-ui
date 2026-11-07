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
    <section aria-labelledby="anatomy-heading" className="space-y-4">
      <h2 id="anatomy-heading" className="h3">Anatomía</h2>
      <pre aria-label="Composición de Fieldset en JSX" className="overflow-x-auto rounded-2xl border border-gray-base bg-surface-base p-6 text-sm">
        <code>{anatomy}</code>
      </pre>
      <div className="overflow-x-auto rounded-2xl border border-gray-base bg-surface-base">
        <table className="body-sm w-full text-left">
          <caption className="sr-only">Piezas de Fieldset y sus responsabilidades</caption>
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
      <div role="region" aria-label="Tabla de referencia de API de Fieldset" tabIndex={0} className="overflow-x-auto rounded-2xl border border-gray-base bg-surface-base focus-visible:outline-2 focus-visible:outline-primary-base">
        <table className="body-sm w-full min-w-3xl text-left">
          <caption className="sr-only">Opciones de Fieldset, tipos, valores predeterminados y comportamiento</caption>
          <thead className="bg-surface-bold">
            <tr>
              {["Pieza", "Prop o callback", "Tipo", "Predeterminado", "Opcional", "Función"].map((label) => (
                <th key={label} scope="col" className="p-4">{label}</th>
              ))}
            </tr>
          </thead>
          {groups.map(({ name, rows }) => (
            <tbody key={name}>
              {rows.map(([prop, type, defaultValue, description], index) => (
                <tr key={prop} className="border-t border-gray-base align-top">
                  {index === 0 && <th scope="rowgroup" rowSpan={rows.length} className="p-4 font-medium">{name}</th>}
                  <th scope="row" className="p-4 font-mono text-xs">{prop}</th>
                  <td className="min-w-40 p-4 font-mono text-xs">{type}</td>
                  <td className="p-4">{defaultValue}</td>
                  <td className="p-4">Sí</td>
                  <td className="min-w-64 p-4">{description}</td>
                </tr>
              ))}
            </tbody>
          ))}
        </table>
      </div>
      <ul className="body-sm space-y-2 text-gray-bold/75">
        <li>Ambas piezas exponen <code>data-disabled</code> al deshabilitarse. La raíz nativa omite sus controles deshabilitados del envío.</li>
        <li>Si sustituyes el <code>fieldset</code> por otro elemento, el componente usado en <code>render</code> debe encargarse de la semántica y de aplicar la deshabilitación a sus controles.</li>
      </ul>
    </section>
  );
}
