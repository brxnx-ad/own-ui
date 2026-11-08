const anatomy = `<label>
  Notificaciones
  <Switch defaultChecked>
    <SwitchThumb />
  </Switch>
</label>`;

const parts = [
  ["Switch", "Renderiza el control accesible y el input asociado al formulario."],
  ["SwitchThumb", "Se desplaza dentro de la pista e indica el estado de forma visual."],
];

const groups = [
  {
    piece: "Switch",
    rows: [
      ["checked", "boolean", "—", "Determina el estado desde el consumidor."],
      ["defaultChecked", "boolean", "false", "Establece el estado inicial en modo no controlado."],
      ["onCheckedChange", "(checked: boolean, details: SwitchChangeEventDetails) => void", "—", "Recibe el nuevo estado. details.cancel() cancela el cambio."],
      ["disabled", "boolean", "false", "Impide la interacción y excluye el campo del envío. También se hereda de Field."],
      ["readOnly", "boolean", "false", "Impide el cambio y mantiene el foco y la participación en el envío."],
      ["required", "boolean", "false", "Exige que el interruptor esté encendido para validar el formulario."],
      ["name / form", "string", "—", "Nombre al enviar e id del formulario propietario si el campo se monta fuera de él."],
      ["value", "string", '"on"', "Valor enviado cuando el interruptor está encendido."],
      ["uncheckedValue", "string", "—", "Valor enviado cuando el interruptor está apagado. Si se omite, el campo no se envía apagado."],
      ["nativeButton", "boolean", "false", "Usa true junto con render si la raíz se sustituye por un botón nativo."],
      ["id", "string", "Generado", "Se aplica al input asociado o a la raíz si se usa nativeButton."],
      ["inputRef", "React.Ref<HTMLInputElement>", "—", "Da acceso al input de formulario. El ref de Switch apunta a la raíz visible."],
    ],
  },
  {
    piece: "Ambas piezas",
    rows: [
      ["className / style", "Valor estático o función de SwitchState", "—", "Añade clases o estilos inline al nodo de la pieza."],
      ["render", "ReactElement | ((props, state: SwitchState) => ReactElement)", "span", "Sustituye el nodo. Conserva las props, los eventos y el ref."],
      ["ref y atributos HTML", "Ref y atributos del nodo renderizado", "—", "Permiten acceder a la raíz visible o al indicador y añadir atributos del nodo."],
    ],
  },
];

export function Anatomy() {
  return (
    <section aria-labelledby="anatomy-heading" className="space-y-4">
      <h2 id="anatomy-heading" className="h3">Anatomía</h2>
      <pre aria-label="Composición de Switch en JSX" className="overflow-x-auto rounded-2xl border border-gray-base bg-surface-base p-6 text-sm">
        <code>{anatomy}</code>
      </pre>
      <div className="overflow-x-auto rounded-2xl border border-gray-base bg-surface-base">
        <table className="body-sm w-full text-left">
          <caption className="sr-only">Piezas de Switch y sus responsabilidades</caption>
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
          <caption className="sr-only">Props, tipos y valores predeterminados de Switch</caption>
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
        <li>Ambas piezas reflejan <code>data-checked</code> o <code>data-unchecked</code>, además de los estados de deshabilitación, solo lectura y validación.</li>
        <li><code>onCheckedChange</code> recibe el evento original en <code>details.event</code> y el motivo <code>{'"none"'}</code>.</li>
        <li>Usa una etiqueta estable para ambos estados. El desplazamiento del indicador respeta la preferencia de movimiento reducido.</li>
      </ul>
    </section>
  );
}
