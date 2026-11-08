const anatomy = `import { Toggle } from "@/components/own/independant/toggle";
import { ToggleGroup } from "@/components/own/independant/toggle-group";

<ToggleGroup aria-label="Vista de archivos" defaultValue={["list"]}>
  <Toggle value="list">Lista</Toggle>
  <Toggle value="cards">Tarjetas</Toggle>
</ToggleGroup>`;

const parts = [
  ["ToggleGroup", "Agrupa los botones y coordina la selección y el foco."],
  ["Toggle", "Identifica una opción con su value y muestra su estado presionado."],
];

const groups = [
  {
    piece: "ToggleGroup",
    rows: [
      ["value", "readonly Value[]", "—", "Selección controlada. Usa [] para liberar todas las opciones."],
      ["defaultValue", "readonly Value[]", "[]", "Selección inicial en modo no controlado."],
      ["onValueChange", "(value: Value[], details: ToggleGroupChangeEventDetails) => void", "—", "Recibe el arreglo propuesto. details.cancel() impide aplicarlo."],
      ["multiple", "boolean", "false", "Permite mantener varias opciones activas al mismo tiempo."],
      ["disabled", "boolean", "false", "Deshabilita todos los botones del grupo."],
      ["orientation", '"horizontal" | "vertical"', '"horizontal"', "Define la disposición visual y las flechas que recorren el grupo."],
      ["loopFocus", "boolean", "true", "Permite que las flechas pasen de un extremo al otro."],
      ["aria-label / aria-labelledby", "string", "—", "Identifica el grupo de forma accesible."],
      ["className / style", "Valor estático o función de ToggleGroupState", "—", "Personaliza el nodo contenedor."],
      ["render", "ReactElement | ((props, state: ToggleGroupState) => ReactElement)", "div", "Sustituye el nodo. Conserva el rol, los handlers, los hijos y el ref."],
      ["ref / children", "React.Ref<HTMLDivElement> / ReactNode", "—", "Dan acceso al nodo y permiten aportar los botones."],
    ],
  },
  {
    piece: "Toggle",
    rows: [
      ["value", "Value extends string", "—", "Identificador único y no vacío de la opción dentro del grupo.", "No en el grupo"],
      ["disabled", "boolean", "false", "Impide la interacción con esta opción y conserva su estado."],
    ],
  },
];

export function Anatomy() {
  return (
    <section aria-labelledby="anatomy-heading" className="space-y-4">
      <h2 id="anatomy-heading" className="h3">Anatomía</h2>
      <pre aria-label="Composición de Toggle Group en JSX" className="overflow-x-auto rounded-2xl border border-gray-base bg-surface-base p-6 text-sm">
        <code>{anatomy}</code>
      </pre>
      <div className="overflow-x-auto rounded-2xl border border-gray-base bg-surface-base">
        <table className="body-sm w-full text-left">
          <caption className="sr-only">Piezas de Toggle Group y sus responsabilidades</caption>
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
          <caption className="sr-only">Props, tipos y valores predeterminados de Toggle Group</caption>
          <thead className="bg-surface-bold">
            <tr>
              {["Pieza", "Prop o callback", "Tipo", "Predeterminado", "Opcional", "Función"].map((label) => (
                <th key={label} scope="col" className="p-4">{label}</th>
              ))}
            </tr>
          </thead>
          {groups.map(({ piece, rows }) => (
            <tbody key={piece}>
              {rows.map(([name, type, defaultValue, description, optional = "Sí"], index) => (
                <tr key={name} className="border-t border-gray-base align-top">
                  {index === 0 && <th scope="rowgroup" rowSpan={rows.length} className="p-4 font-medium">{piece}</th>}
                  <th scope="row" className="p-4 font-mono text-xs">{name}</th>
                  <td className="min-w-36 p-4 font-mono text-xs">{type}</td>
                  <td className="p-4">{defaultValue}</td>
                  <td className="p-4">{optional}</td>
                  <td className="min-w-60 p-4">{description}</td>
                </tr>
              ))}
            </tbody>
          ))}
        </table>
      </div>
      <ul className="body-sm list-disc space-y-2 ps-5 text-gray-bold/75">
        <li>El grupo usa <code>{'role="group"'}</code>. Cada botón mantiene su propio <code>aria-pressed</code>.</li>
        <li>El grupo expone <code>data-orientation</code> y, según el estado, <code>data-multiple</code> y <code>data-disabled</code>.</li>
        <li>Las flechas mueven el foco. <kbd>Enter</kbd> y <kbd>Espacio</kbd> cambian la selección.</li>
      </ul>
    </section>
  );
}
