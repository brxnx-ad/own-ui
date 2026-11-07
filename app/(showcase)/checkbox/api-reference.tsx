const anatomy = `<label>
  <Checkbox name="resumen" defaultChecked>
    <CheckboxIndicator />
  </Checkbox>
  Enviarme un resumen semanal
</label>`;

const parts = [
  ["Checkbox", "Renderiza el control visible con rol checkbox y un input asociado para formularios."],
  ["CheckboxIndicator", "Muestra una marca o un guion según el estado. Acepta contenido decorativo propio."],
];

const groups = [
  { name: "Checkbox", rows: [
    ["checked", "boolean", "—", "Estado controlado. Actualízalo con onCheckedChange."],
    ["defaultChecked", "boolean", "false", "Selección inicial en modo no controlado."],
    ["onCheckedChange", "(checked: boolean, details: CheckboxRootChangeEventDetails) => void", "—", "Recibe el nuevo valor al activar el control. details.cancel() cancela el cambio."],
    ["indeterminate", "boolean", "false", "Expone aria-checked=mixed y muestra el guion. El valor booleano sigue determinando el envío."],
    ["disabled", "boolean", "false", "Impide cambios, excluye el control del recorrido con Tab y omite su valor del envío."],
    ["readOnly", "boolean", "false", "Impide cambios desde el control y conserva su participación en el foco y el formulario."],
    ["required", "boolean", "false", "Exige una casilla marcada para superar la validación del formulario."],
    ["name / form", "string", "—", "Identifican el campo y, si hace falta, el formulario externo que contiene el valor."],
    ["value", "string", '"on" al enviar', "Valor enviado cuando está marcada."],
    ["uncheckedValue", "string", "—", "Valor opcional al enviar una casilla desmarcada independiente."],
    ["inputRef", "Ref<HTMLInputElement>", "—", "Referencia al input asociado. ref apunta al control visible."],
    ["id", "string", "Generado", "Asigna el identificador al input o al botón visible cuando nativeButton está activo."],
    ["nativeButton", "boolean", "false", "Actívalo cuando render sustituya el span por un botón nativo."],
    ["parent", "boolean", "false", "Reservado para el control de selección global de un Checkbox Group de Base UI."],
  ] },
  { name: "CheckboxIndicator", rows: [
    ["children", "ReactNode", "Marca o guion", "Sustituye los iconos predeterminados por contenido decorativo."],
    ["keepMounted", "boolean", "false", "Mantiene montado el indicador al desmarcar, con opacidad cero."],
  ] },
  { name: "Ambas piezas", rows: [
    ["className", "string | (state) => string | undefined", "—", "Agrega clases estáticas o dependientes del estado."],
    ["style", "CSSProperties | (state) => CSSProperties | undefined", "—", "Aplica estilos inline al nodo de la pieza."],
    ["render", "ReactElement | (props, state) => ReactElement", "span", "Sustituye el nodo. Propaga las props, los eventos y la referencia DOM al componerlo."],
  ] },
];

export function Anatomy() {
  return (
    <section aria-labelledby="anatomy-heading" className="space-y-4">
      <h2 id="anatomy-heading" className="h3">Anatomía</h2>
      <pre aria-label="Composición de Checkbox en JSX" className="overflow-x-auto rounded-2xl border border-gray-base bg-surface-base p-6 text-sm text-gray-bold">
        <code>{anatomy}</code>
      </pre>
      <div className="overflow-x-auto rounded-2xl border border-gray-base bg-surface-base">
        <table className="w-full text-left body-sm">
          <caption className="sr-only">Piezas de Checkbox y sus responsabilidades</caption>
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
          <caption className="sr-only">Opciones de Checkbox, tipos, valores predeterminados y comportamiento</caption>
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
        <li><code>onCheckedChange</code> recibe el evento nativo y el motivo <code>none</code>. Cambiar <code>checked</code> desde fuera no dispara el callback.</li>
        <li>Tab lleva el foco a la casilla habilitada y Espacio alterna su valor. Dentro de un formulario, Enter puede activar su botón de envío.</li>
        <li>La transición de opacidad del indicador respeta la preferencia de movimiento reducido.</li>
      </ul>
    </section>
  );
}
