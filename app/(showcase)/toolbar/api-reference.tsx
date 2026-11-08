const anatomy = `<Toolbar aria-label="Herramientas del informe">
  <ToolbarGroup aria-label="Historial">
    <ToolbarButton>Deshacer</ToolbarButton>
    <ToolbarButton>Rehacer</ToolbarButton>
  </ToolbarGroup>
  <ToolbarSeparator />
  <ToolbarLink render={<Link href="/input" />}>Ayuda</ToolbarLink>
  <ToolbarInput aria-label="Filtrar archivos" />
</Toolbar>`;

const parts = [
  ["Toolbar", "Agrupa los controles y administra el recorrido de foco."],
  ["ToolbarGroup", "Organiza acciones relacionadas y puede deshabilitarlas en conjunto."],
  ["ToolbarButton", "Ejecuta una acción o activa un componente compuesto con render."],
  ["ToolbarInput", "Integra un campo nativo con el recorrido de la barra."],
  ["ToolbarLink", "Integra un enlace navegable con el recorrido de la barra."],
  ["ToolbarSeparator", "Divide las herramientas con una línea perpendicular al eje de la barra."],
];

const groups = [
  {
    piece: "Toolbar",
    rows: [
      ["orientation", '"horizontal" | "vertical"', '"horizontal"', "Define la disposición y las flechas del recorrido."],
      ["loopFocus", "boolean", "true", "Permite pasar de un extremo al otro con las flechas."],
      ["disabled", "boolean", "false", "Deshabilita botones, campos y toggles compatibles. Los enlaces mantienen su destino."],
      ["aria-label / aria-labelledby", "string", "—", "Da nombre a la barra de herramientas."],
    ],
  },
  {
    piece: "ToolbarGroup",
    rows: [
      ["disabled", "boolean", "false", "Deshabilita las herramientas compatibles del subgrupo."],
      ["aria-label / aria-labelledby", "string", "—", "Identifica las herramientas relacionadas."],
    ],
  },
  {
    piece: "ToolbarButton / ToolbarInput",
    rows: [
      ["disabled", "boolean", "false", "Deshabilita el control. Se combina con el estado del grupo y la raíz."],
      ["focusableWhenDisabled", "boolean", "true", "Conserva el control en el recorrido cuando está deshabilitado. Usa false para omitirlo."],
    ],
  },
  {
    piece: "ToolbarButton",
    rows: [
      ["nativeButton", "boolean", "true", "Usa false si render produce un elemento distinto de button."],
      ["onClick", "Evento de clic del botón", "—", "Conecta la acción puntual del consumidor."],
    ],
  },
  {
    piece: "ToolbarInput",
    rows: [
      ["value / defaultValue", "string | number | readonly string[]", "—", "Valor controlado o inicial del campo nativo."],
      ["onChange", "Evento de cambio del input", "—", "Lee el valor desde event.currentTarget.value."],
      ["readOnly", "boolean", "false", "Conserva el foco y el valor sin edición. own-ui lo activa en el campo nativo deshabilitado."],
    ],
  },
  {
    piece: "ToolbarLink",
    rows: [
      ["href", "string", "—", "Define el destino del enlace. También puedes aportarlo mediante Link en render."],
    ],
  },
  {
    piece: "ToolbarSeparator",
    rows: [
      ["orientation", '"horizontal" | "vertical"', "Eje opuesto a Toolbar", "Permite sustituir la orientación automática del separador."],
    ],
  },
  {
    piece: "Todas las piezas",
    rows: [
      ["className / style", "Valor estático o función del estado", "—", "Personaliza el nodo de la pieza."],
      ["render", "ReactElement | ((props, state) => ReactElement)", "Nodo de la pieza", "Sustituye o compone el elemento. Conserva los handlers y el ref."],
      ["ref y atributos HTML", "Según el nodo", "—", "Dan acceso al elemento y permiten añadir atributos compatibles."],
    ],
  },
];

export function Anatomy() {
  return (
    <section aria-labelledby="anatomy-heading" className="space-y-4">
      <h2 id="anatomy-heading" className="h3">Anatomía</h2>
      <p className="body-sm text-gray-bold/75">El ejemplo usa <code>Link</code> de <code>next/link</code> para la navegación interna.</p>
      <pre aria-label="Composición de Toolbar en JSX" className="overflow-x-auto rounded-2xl border border-gray-base bg-surface-base p-6 text-sm">
        <code>{anatomy}</code>
      </pre>
      <div className="overflow-x-auto rounded-2xl border border-gray-base bg-surface-base">
        <table className="body-sm w-full text-left">
          <caption className="sr-only">Piezas de Toolbar y sus responsabilidades</caption>
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
      <div role="region" aria-label="Tabla de referencia de API" tabIndex={0} className="overflow-x-auto rounded-2xl border border-gray-base bg-surface-base focus-visible:outline-2 focus-visible:outline-gray-bold">
        <table className="body-sm w-full min-w-3xl text-left">
          <caption className="sr-only">Props, tipos y valores predeterminados de Toolbar</caption>
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
        <li>Usa <kbd>Tab</kbd> para entrar o salir de la barra y las flechas del eje para recorrerla.</li>
        <li>En horizontal, coloca un solo campo de texto y déjalo al final para reducir los conflictos entre las flechas de edición y de navegación.</li>
        <li>Las piezas reflejan su eje con <code>data-orientation</code>. Botón y campo también exponen <code>data-disabled</code> y <code>data-focusable</code>.</li>
      </ul>
    </section>
  );
}
