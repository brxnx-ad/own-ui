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
    <section aria-labelledby="anatomy-heading" className="space-y-4">
      <h2 id="anatomy-heading" className="h3">Anatomía</h2>
      <pre aria-label="Composición de Checkbox Group en JSX" className="overflow-x-auto rounded-2xl border border-gray-base bg-surface-base p-6 text-sm text-gray-bold">
        <code>{anatomy}</code>
      </pre>
      <div className="overflow-x-auto rounded-2xl border border-gray-base bg-surface-base">
        <table className="w-full text-left body-sm">
          <caption className="sr-only">Piezas de Checkbox Group y sus responsabilidades</caption>
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
      <div role="region" aria-label="Tabla de referencia de API" tabIndex={0} className="overflow-x-auto rounded-2xl border border-gray-base bg-surface-base focus-visible:outline-2 focus-visible:outline-primary-base">
        <table className="w-full min-w-3xl text-left body-sm">
          <caption className="sr-only">Opciones de Checkbox Group, tipos, valores predeterminados y comportamiento</caption>
          <thead className="bg-surface-bold">
            <tr>
              {["Pieza", "Prop o callback", "Tipo", "Predeterminado", "Opcional", "Función"].map((label) => (
                <th key={label} scope="col" className="p-4">{label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(([prop, type, defaultValue, description], index) => (
              <tr key={prop} className="border-t border-gray-base align-top">
                {index === 0 && <th scope="rowgroup" rowSpan={rows.length} className="p-4 font-medium">CheckboxGroup</th>}
                <th scope="row" className="p-4 font-mono text-xs">{prop}</th>
                <td className="p-4 font-mono text-xs">{type}</td>
                <td className="p-4">{defaultValue}</td>
                <td className="p-4">Sí</td>
                <td className="min-w-64 p-4">{description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ul className="list-disc space-y-2 pl-5 body-sm text-gray-bold/75">
        <li>Asigna un <code>value</code> único a cada opción. <code>parent</code> y <code>name</code> pertenecen a <code>Checkbox</code>.</li>
        <li><code>onValueChange</code> recibe el evento nativo y el motivo <code>none</code>. Actualizar <code>value</code> desde fuera no dispara el callback.</li>
        <li>Tab recorre las casillas habilitadas y Espacio cambia la selección. Cada casilla conserva su etiqueta y su foco.</li>
      </ul>
    </section>
  );
}
