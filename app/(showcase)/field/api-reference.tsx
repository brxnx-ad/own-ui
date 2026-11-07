const anatomy = `<Field name="email">
  <FieldLabel>Correo de entrega</FieldLabel>
  <FieldControl type="email" required />
  <FieldDescription>Ingresa la dirección que recibirá el informe.</FieldDescription>
  <FieldError />
</Field>`;

const parts = [
  ["Field", "Raíz que agrupa el control y gestiona su estado y validación."],
  ["FieldLabel", "Etiqueta accesible asociada al control."],
  ["FieldControl", "Input que registra el valor y las restricciones del campo."],
  ["FieldDescription", "Ayuda asociada al control mediante aria-describedby."],
  ["FieldError", "Mensaje asociado al control cuando coincide la condición de error."],
  ["FieldValidity", "Entrega la validez y los datos al render prop sin crear un nodo."],
  ["FieldItem", "Crea un contexto de etiqueta y descripción para una opción de un grupo."],
];

const groups = [
  { name: "Field", rows: [
    ["name", "string", "Nombre del control", "Identifica el campo al enviar. Tiene precedencia sobre el nombre del control."],
    ["disabled", "boolean", "false", "Deshabilita los controles compatibles. También puede heredarse de Fieldset."],
    ["validationMode", "'onSubmit' | 'onBlur' | 'onChange'", "Modo de Form o 'onSubmit'", "Determina si se valida al enviar, al perder el foco o al cambiar el valor."],
    ["validationDebounceTime", "number", "0", "Espera en milisegundos cuando se valida un valor no vacío tras un cambio."],
    ["validate", "(value: unknown, formValues: Form.Values) => ValidationResult | Promise<ValidationResult>", "—", "Devuelve uno o varios errores personalizados. Un resultado vacío indica que la regla propia se cumple."],
    ["invalid", "boolean", "undefined", "Marca el campo como inválido desde la aplicación. Para un mensaje gestionado por el consumidor, renderiza FieldError con match={true} cuando corresponda."],
    ["dirty / touched", "boolean", "Estado interno", "Controlan si el valor ha cambiado o el campo ha sido visitado."],
    ["actionsRef", "RefObject<FieldActions | null>", "—", "Expone validate() para validar el campo de forma imperativa."],
  ]},
  { name: "FieldControl", rows: [
    ["value / defaultValue", "Props de input", "—", "Valor controlado o inicial, respectivamente."],
    ["onValueChange", "(value: string, details: ChangeEventDetails) => void", "—", "Informa el valor del DOM. El modo controlado usa el valor que el consumidor confirma mediante value."],
    ["id", "string", "Generado", "Identifica el control para su etiqueta."],
    ["name / disabled", "string / boolean", "— / false", "El nombre de Field prevalece. El control se deshabilita si la raíz o el propio control lo indican."],
    ["type, required, pattern, minLength, readOnly…", "Atributos de input", "Según HTML", "Configuran las restricciones, el tipo y la edición del control."],
  ]},
  { name: "FieldLabel", rows: [
    ["nativeLabel", "boolean", "true", "Usa false con render si la etiqueta se renderiza como un elemento distinto de label."],
  ]},
  { name: "FieldError", rows: [
    ["match", "boolean | keyof ValidityState", "undefined", "Una clave filtra por condición nativa o customError. true fuerza la aparición. false u omitirlo usa la invalidez del campo."],
    ["children", "ReactNode", "Mensaje de Base UI", "Sustituye el texto que genera el navegador, validate o Form.errors."],
  ]},
  { name: "FieldValidity", rows: [
    ["children", "(state: FieldValidityState) => ReactNode", "—", "Recibe validity, value, initialValue, error, errors y transitionStatus."],
  ]},
  { name: "FieldItem", rows: [
    ["disabled", "boolean", "false", "Deshabilita la opción compatible. Una raíz deshabilitada también deshabilita las opciones."],
  ]},
  { name: "Piezas con nodo", rows: [
    ["className", "string | (state) => string | undefined", "—", "Añade clases estáticas o derivadas del estado."],
    ["style", "CSSProperties | (state) => CSSProperties | undefined", "—", "Aplica estilos al nodo de la pieza."],
    ["render", "ReactElement | (props, state) => ReactElement", "Nodo de la pieza", "Sustituye el elemento conservando las props, los eventos y la ref."],
  ]},
];

export function Anatomy() {
  return (
    <section aria-labelledby="anatomy-heading" className="space-y-4">
      <h2 id="anatomy-heading" className="h3">Anatomía</h2>
      <pre aria-label="Composición de Field en JSX" className="overflow-x-auto rounded-2xl border border-gray-base bg-surface-base p-6 text-sm">
        <code>{anatomy}</code>
      </pre>
      <div className="overflow-x-auto rounded-2xl border border-gray-base bg-surface-base">
        <table className="body-sm w-full text-left">
          <caption className="sr-only">Piezas de Field y sus responsabilidades</caption>
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
      <div role="region" aria-label="Tabla de referencia de API de Field" tabIndex={0} className="overflow-x-auto rounded-2xl border border-gray-base bg-surface-base focus-visible:outline-2 focus-visible:outline-primary-base">
        <table className="body-sm w-full min-w-3xl text-left">
          <caption className="sr-only">Opciones de Field, tipos, valores predeterminados y comportamiento</caption>
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
                  <td className="p-4">{name === "FieldValidity" ? "No" : "Sí"}</td>
                  <td className="min-w-64 p-4">{description}</td>
                </tr>
              ))}
            </tbody>
          ))}
        </table>
      </div>
      <ul className="body-sm space-y-2 text-gray-bold/75">
        <li><code>ValidationResult</code> admite <code>string</code>, <code>string[]</code>, <code>null</code> o <code>void</code>. Una promesa pendiente de <code>validate</code> no bloquea el envío.</li>
        <li><code>onValueChange</code> recibe el evento nativo y el motivo <code>none</code>. En modo no controlado, <code>details.cancel()</code> omite la validación de ese cambio.</li>
        <li>Los controles compatibles con el contexto de Field, como Checkbox, pueden sustituir a <code>FieldControl</code>. Las piezas con nodo aceptan los atributos HTML de su primitiva.</li>
      </ul>
    </section>
  );
}
