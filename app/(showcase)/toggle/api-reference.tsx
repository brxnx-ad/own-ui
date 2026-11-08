const anatomy = `import { Toggle } from "@/components/own/base/toggle";

<Toggle defaultPressed>Fijar vista</Toggle>`;

const props = [
  ["variant", '"outline" | "ghost"', '"outline"', "Elige un borde visible o transparente en reposo. Ambas variantes comparten el estado presionado."],
  ["size", '"sm" | "md" | "lg"', '"md"', "Define altura, tipografía y espaciado."],
  ["iconOnly", "boolean", "false", "Usa una huella cuadrada. Aporta un nombre accesible si el contenido solo es un icono."],
  ["pressed", "boolean", "—", "Controla el estado desde el consumidor."],
  ["defaultPressed", "boolean", "false", "Establece el estado inicial en modo no controlado."],
  ["onPressedChange", "(pressed: boolean, details: ToggleChangeEventDetails) => void", "—", "Recibe el estado propuesto. details.cancel() cancela el cambio."],
  ["disabled", "boolean", "false", "Impide la interacción. También se hereda del grupo."],
  ["value", "string", "—", "Identificador único y no vacío dentro de ToggleGroup."],
  ["nativeButton", "boolean", "true", "Usa false si render produce otro elemento, como span."],
  ["render", "ReactElement | ((props, state: ToggleState) => ReactElement)", "button", "Sustituye el nodo. Conserva sus props, eventos y ref."],
  ["className / style", "Valor estático o función de ToggleState", "—", "Aplica clases o estilos inline al nodo."],
  ["ref y atributos HTML", "Ref y atributos del nodo", "—", "Dan acceso al elemento y permiten añadir, por ejemplo, aria-label."],
];

export function Anatomy() {
  return (
    <section aria-labelledby="anatomy-heading" className="space-y-4">
      <h2 id="anatomy-heading" className="h3">Anatomía</h2>
      <pre aria-label="Composición de Toggle en JSX" className="overflow-x-auto rounded-2xl border border-gray-base bg-surface-base p-6 text-sm">
        <code>{anatomy}</code>
      </pre>
      <div className="overflow-x-auto rounded-2xl border border-gray-base bg-surface-base">
        <table className="body-sm w-full text-left">
          <caption className="sr-only">Anatomía de Toggle</caption>
          <thead className="bg-surface-bold">
            <tr><th scope="col" className="p-4">Pieza</th><th scope="col" className="p-4">Responsabilidad</th></tr>
          </thead>
          <tbody>
            <tr className="border-t border-gray-base">
              <th scope="row" className="p-4 font-mono text-xs">Toggle</th>
              <td className="p-4">Renderiza un <code>button</code> y comunica su estado persistente con <code>aria-pressed</code>.</td>
            </tr>
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
          <caption className="sr-only">Props, tipos y valores predeterminados de Toggle</caption>
          <thead className="bg-surface-bold">
            <tr>
              {["Pieza", "Prop o callback", "Tipo", "Predeterminado", "Opcional", "Función"].map((label) => (
                <th key={label} scope="col" className="p-4">{label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {props.map(([name, type, defaultValue, description], index) => (
              <tr key={name} className="border-t border-gray-base align-top">
                {index === 0 && <th scope="rowgroup" rowSpan={props.length} className="p-4 font-medium">Toggle</th>}
                <th scope="row" className="p-4 font-mono text-xs">{name}</th>
                <td className="min-w-36 p-4 font-mono text-xs">{type}</td>
                <td className="p-4">{defaultValue}</td>
                <td className="p-4">{name === "value" ? "Sí, fuera de un grupo" : "Sí"}</td>
                <td className="min-w-60 p-4">{description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ul className="body-sm list-disc space-y-2 ps-5 text-gray-bold/75">
        <li><code>ToggleState</code> expone <code>pressed</code> y <code>disabled</code>. El nodo refleja esos estados mediante <code>data-pressed</code> y <code>data-disabled</code>.</li>
        <li><code>onPressedChange</code> recibe el evento original en <code>details.event</code> y el motivo <code>none</code>. Dentro de un grupo, la selección del grupo tiene prioridad.</li>
        <li>El elemento nativo usa <code>{'type="button"'}</code>. Conserva la misma etiqueta al alternar el estado.</li>
      </ul>
    </section>
  );
}
