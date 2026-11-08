const anatomy = `import { Separator } from "@/components/own/base/separator";

<Separator />`;

const props = [
  ["orientation", '"horizontal" | "vertical"', '"horizontal"', "Define el eje visual y la orientación accesible."],
  ["className", "string | (state: SeparatorState) => string | undefined", "—", "Combina clases estáticas o calculadas con el estilo base."],
  ["style", "CSSProperties | (state: SeparatorState) => CSSProperties | undefined", "—", "Aplica estilos inline al mismo elemento."],
  ["render", "ReactElement | (props, state: SeparatorState) => ReactElement", "div", "Sustituye el elemento. Conserva las props y el ref al usar la forma funcional."],
  ["aria-hidden", 'boolean | "true" | "false"', "—", "Con true, oculta una división decorativa a las tecnologías de asistencia."],
  ["ref", "React.Ref<HTMLDivElement>", "—", "Da acceso al nodo predeterminado."],
];

export function Anatomy() {
  return (
    <section aria-labelledby="anatomy-heading" className="space-y-4">
      <h2 id="anatomy-heading" className="h3">Anatomía</h2>
      <pre aria-label="Composición de Separator en JSX" className="overflow-x-auto rounded-2xl border border-gray-base bg-surface-base p-6 text-sm">
        <code>{anatomy}</code>
      </pre>
      <div className="rounded-2xl border border-gray-base bg-surface-base">
        <table className="body-sm w-full text-left">
          <caption className="sr-only">Anatomía de Separator</caption>
          <thead className="bg-surface-bold">
            <tr>
              <th scope="col" className="p-4">Pieza</th>
              <th scope="col" className="p-4">Responsabilidad</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-gray-base">
              <th scope="row" className="p-4 font-mono text-xs">Separator</th>
              <td className="p-4">Renderiza un <code>div</code> con <code>{'role="separator"'}</code> y la orientación correspondiente.</td>
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
          <caption className="sr-only">Props, tipos y valores predeterminados de Separator</caption>
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
                {index === 0 && <th scope="rowgroup" rowSpan={props.length} className="p-4 font-medium">Separator</th>}
                <th scope="row" className="p-4 font-mono text-xs">{name}</th>
                <td className="min-w-36 p-4 font-mono text-xs">{type}</td>
                <td className="p-4">{defaultValue}</td>
                <td className="p-4">Sí</td>
                <td className="min-w-60 p-4">{description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ul className="body-sm list-disc space-y-2 ps-5 text-gray-bold/75">
        <li><code>SeparatorState</code> expone <code>orientation</code>. El nodo incluye <code>{'data-slot="separator"'}</code> y <code>data-orientation</code>.</li>
        <li>La línea mide 1 px de grosor. En vertical, necesita una fila que le dé altura mediante estiramiento o una altura definida por el consumidor.</li>
        <li>El separador es estático y queda fuera del orden de tabulación por defecto.</li>
      </ul>
    </section>
  );
}
