const anatomy = `<Collapsible>
  <CollapsibleTrigger>Detalles de entrega</CollapsibleTrigger>
  <CollapsiblePanel>El envío tarda de tres a cinco días hábiles.</CollapsiblePanel>
</Collapsible>`;

const parts = [
  ["Collapsible", "Agrupa las piezas y administra el estado de apertura."],
  ["CollapsibleTrigger", "Abre y cierra el panel. Incluye un chevron decorativo que gira al abrirlo."],
  ["CollapsiblePanel", "Contiene el contenido desplegable y anima su altura y opacidad."],
];

const groups = [
  { name: "Collapsible", rows: [
    ["defaultOpen", "boolean", "false", "Apertura inicial en modo no controlado."],
    ["open", "boolean", "—", "Apertura controlada por el consumidor. Actualízala con onOpenChange."],
    ["onOpenChange", "(open: boolean, details: CollapsibleRootChangeEventDetails) => void", "—", "Recibe la apertura propuesta desde el activador o la búsqueda de página. Usa details.cancel() para cancelar."],
    ["disabled", "boolean", "false", "Deshabilita el activador por defecto. Conserva el estado actual del panel."],
  ] },
  { name: "CollapsibleTrigger", rows: [
    ["disabled", "boolean", "Hereda de Collapsible", "Permite especificar la deshabilitación del activador localmente."],
    ["nativeButton", "boolean", "true", "Usa false si render sustituye el botón por otro elemento."],
  ] },
  { name: "CollapsiblePanel", rows: [
    ["keepMounted", "boolean", "false", "Conserva el panel en el DOM mientras está cerrado."],
    ["hiddenUntilFound", "boolean", "false", "Permite encontrar contenido oculto con la búsqueda del navegador y prevalece sobre keepMounted."],
    ["id", "string", "Generado", "Identificador del panel que usa el activador en aria-controls al abrirse."],
  ] },
  { name: "Todas las piezas", rows: [
    ["className", "string | (state) => string | undefined", "—", "Aplica clases estáticas o dependientes del estado al nodo de la pieza."],
    ["style", "CSSProperties | (state) => CSSProperties | undefined", "—", "Aplica estilos inline al nodo de la pieza."],
    ["render", "ReactElement | (props, state) => ReactElement", "Elemento de la pieza", "Sustituye el nodo. Propaga las props, los eventos y la referencia recibidos."],
  ] },
];

export function Anatomy() {
  return (
    <section aria-labelledby="anatomy-heading" className="space-y-4">
      <h2 id="anatomy-heading" className="h3">Anatomía</h2>
      <pre aria-label="Composición de Collapsible en JSX" className="overflow-x-auto rounded-2xl border border-gray-base bg-surface-base p-6 text-sm text-gray-bold">
        <code>{anatomy}</code>
      </pre>
      <div className="overflow-x-auto rounded-2xl border border-gray-base bg-surface-base">
        <table className="w-full text-left body-sm">
          <caption className="sr-only">Piezas de Collapsible y sus responsabilidades</caption>
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
          <caption className="sr-only">Opciones de Collapsible, tipos, valores predeterminados y comportamiento</caption>
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
                  <td className="p-4 font-mono text-xs">{type}</td>
                  <td className="p-4">{defaultValue}</td>
                  <td className="p-4">Sí</td>
                  <td className="min-w-64 p-4">{description}</td>
                </tr>
              ))}
            </tbody>
          ))}
        </table>
      </div>
      <ul className="list-disc space-y-2 pl-5 body-sm text-gray-bold/75">
        <li><code>details.reason</code> es <code>trigger-press</code> para el activador y <code>none</code> para la búsqueda de página. Cambiar <code>open</code> desde fuera no ejecuta el callback.</li>
        <li>Tab enfoca el activador habilitado. Enter y Espacio alternan la apertura.</li>
        <li>El panel usa <code>--collapsible-panel-height</code> para la transición. El panel y el chevron respetan la preferencia de movimiento reducido.</li>
      </ul>
    </section>
  );
}
