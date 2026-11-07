const anatomy = `<Form onFormSubmit={saveContact}>
  <Fieldset>
    <FieldsetLegend>Contacto del turno</FieldsetLegend>
    <Field name="email">
      <FieldLabel>Correo del contacto</FieldLabel>
      <FieldControl type="email" required />
      <FieldError />
    </Field>
  </Fieldset>
  <Button type="submit">Guardar contacto</Button>
</Form>`;

const parts = [
  ["Form", "Genera un form nativo y coordina la validación y el envío."],
  ["Field y sus piezas", "Registran un valor y vinculan su etiqueta y mensajes al control."],
  ["Fieldset y su leyenda", "Agrupan controles relacionados bajo un nombre común cuando la composición lo requiere."],
  ["Botón de envío", "Solicita el envío con type=submit."],
];

const rows = [
  ["validationMode", "'onSubmit' | 'onBlur' | 'onChange'", "'onSubmit'", "Modo predeterminado de los campos. La prop del Field prevalece."],
  ["errors", "Record<string, string | string[]>", "—", "Asocia mensajes externos con el name de cada Field."],
  ["onFormSubmit", "(values: Values, details: FormSubmitEventDetails) => void", "—", "Recibe los valores registrados y cancela el envío nativo."],
  ["onSubmit", "(event: FormEvent<HTMLFormElement>) => void", "—", "Recibe el evento React tras validar los campos. Permite leer FormData o dejar que el navegador complete el envío."],
  ["action", "string | (data: FormData) => void | Promise<void>", "—", "Destino nativo o acción de React. Para ejecutarla, deja que el evento de envío siga su curso."],
  ["actionsRef", "RefObject<FormActions | null>", "—", "Expone validate(name?) para validar un campo por nombre o todos los registrados."],
  ["noValidate", "boolean", "true", "Base UI gestiona la validación registrada. Usa false si también quieres habilitar la validación nativa previa al evento submit."],
  ["className", "string | (state) => string | undefined", "—", "Añade clases a la raíz."],
  ["style", "CSSProperties | (state) => CSSProperties | undefined", "—", "Aplica estilos a la raíz."],
  ["render", "ReactElement | (props, state) => ReactElement", "form", "Permite componer la raíz conservando el nodo form, sus props, eventos y ref."],
  ["children, ref y atributos HTML", "Props de form", "Según HTML", "Contenido, referencia al nodo y opciones nativas como method y encType."],
];

export function Anatomy() {
  return (
    <section aria-labelledby="anatomy-heading" className="space-y-4">
      <h2 id="anatomy-heading" className="h3">Anatomía</h2>
      <pre aria-label="Composición de Form en JSX" className="overflow-x-auto rounded-2xl border border-gray-base bg-surface-base p-6 text-sm">
        <code>{anatomy}</code>
      </pre>
      <div className="overflow-x-auto rounded-2xl border border-gray-base bg-surface-base">
        <table className="body-sm w-full text-left">
          <caption className="sr-only">Elementos de una composición con Form</caption>
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
      <div role="region" aria-label="Tabla de referencia de API de Form" tabIndex={0} className="overflow-x-auto rounded-2xl border border-gray-base bg-surface-base focus-visible:outline-2 focus-visible:outline-primary-base">
        <table className="body-sm w-full min-w-3xl text-left">
          <caption className="sr-only">Opciones de Form, tipos, valores predeterminados y comportamiento</caption>
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
                {index === 0 && <th scope="rowgroup" rowSpan={rows.length} className="p-4 font-medium">Form</th>}
                <th scope="row" className="p-4 font-mono text-xs">{prop}</th>
                <td className="min-w-40 p-4 font-mono text-xs">{type}</td>
                <td className="p-4">{defaultValue}</td>
                <td className="p-4">Sí</td>
                <td className="min-w-64 p-4">{description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ul className="body-sm space-y-2 text-gray-bold/75">
        <li>Al enviar, Base UI valida los campos registrados y enfoca el primer control inválido disponible. Una validación asíncrona pendiente por sí sola no bloquea el envío.</li>
        <li><code>FormSubmitEventDetails</code> incluye el evento nativo y el motivo <code>none</code>. El tipo <code>Values</code> describe el objeto recibido por TypeScript.</li>
        <li>Para consultar controles nativos, archivos o nombres repetidos, usa <code>FormData</code> en el evento o en la acción.</li>
      </ul>
    </section>
  );
}
