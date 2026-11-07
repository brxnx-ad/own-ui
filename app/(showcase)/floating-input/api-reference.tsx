const anatomy = `<FloatingInput
  label="Correo de contacto"
  name="email"
  type="email"
  variant="outline"
  required
  fieldProps={{ validationMode: "onBlur" }}
>
  <FieldDescription>Usa tu correo de trabajo.</FieldDescription>
  <FieldError />
</FloatingInput>`;

const parts = [
  ["FloatingInput", "Compone Field, Input y una etiqueta nativa. En outline, añade el contorno recortado."],
  ["FieldDescription", "Pieza opcional de Field que asocia texto de ayuda al control."],
  ["FieldError", "Pieza opcional de Field que muestra y asocia el error activo."],
];

const rows = [
  ["label", "string", "—", "No", "Texto de la etiqueta visible y nombre accesible del control."],
  ["variant", '"inset" | "outline"', '"inset"', "Sí", "Coloca la etiqueta elevada dentro del campo o sobre el borde superior."],
  ["type", '"text" | "search" | "email" | "password" | "tel" | "url"', '"text"', "Sí", "Elige el tipo de entrada de texto y su comportamiento nativo."],
  ["name / disabled", "string / boolean", "— / false", "Sí", "Configura el nombre de envío y la deshabilitación desde la raíz Field."],
  ["value / defaultValue", "InputProps['value'] / InputProps['defaultValue']", "—", "Sí", "Controla el valor o establece el inicial. Un valor presente mantiene arriba la etiqueta."],
  ["onValueChange", "(value: string, details: InputChangeEventDetails) => void", "—", "Sí", "Recibe el valor editado. Actualiza value para aceptar el cambio en modo controlado."],
  ["fieldProps", "FloatingInputFieldProps", "—", "Sí", "Configura validación, estado y estilos de la raíz. Incluye validationMode, validate, invalid y actionsRef."],
  ["children", "ReactNode", "—", "Sí", "Coloca piezas opcionales como FieldDescription y FieldError debajo del control."],
  ["className / style / ref", "Según InputProps", "—", "Sí", "Aplica clases o estilos al input y permite acceder a su nodo nativo."],
  ["id / required / readOnly / autoComplete / onChange", "Según InputProps", "—", "Sí", "Configura el control nativo y conserva los eventos de React."],
];

export function Anatomy() {
  return (
    <section aria-labelledby="anatomy-heading" className="space-y-4">
      <h2 id="anatomy-heading" className="h3">Anatomía</h2>
      <pre aria-label="Composición de FloatingInput en JSX" className="overflow-x-auto rounded-2xl border border-gray-base bg-surface-base p-6 text-sm">
        <code>{anatomy}</code>
      </pre>
      <div className="overflow-x-auto rounded-2xl border border-gray-base bg-surface-base">
        <table className="body-sm w-full text-left">
          <caption className="sr-only">Piezas de FloatingInput y sus responsabilidades</caption>
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
      <div role="region" aria-label="Tabla de referencia de API de FloatingInput" tabIndex={0} className="overflow-x-auto rounded-2xl border border-gray-base bg-surface-base focus-visible:outline-2 focus-visible:outline-primary-base">
        <table className="body-sm w-full min-w-3xl text-left">
          <caption className="sr-only">Opciones de FloatingInput, tipos, valores predeterminados y comportamiento</caption>
          <thead className="bg-surface-bold">
            <tr>
              {["Pieza", "Prop o callback", "Tipo", "Predeterminado", "Opcional", "Función"].map((label) => (
                <th key={label} scope="col" className="p-4">{label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(([prop, type, defaultValue, optional, description], index) => (
              <tr key={prop} className="border-t border-gray-base align-top">
                {index === 0 && <th scope="rowgroup" rowSpan={rows.length} className="p-4 font-medium">FloatingInput</th>}
                <th scope="row" className="p-4 font-mono text-xs">{prop}</th>
                <td className="min-w-40 p-4 font-mono text-xs">{type}</td>
                <td className="p-4">{defaultValue}</td>
                <td className="p-4">{optional}</td>
                <td className="min-w-64 p-4">{description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ul className="body-sm space-y-2 text-gray-bold/75">
        <li>Usa <code>label</code> para nombrar el campo y <code>FieldDescription</code> para una pista adicional.</li>
        <li>Las opciones de validación de Field van en <code>fieldProps</code>. Para mostrar el mensaje, añade <code>FieldError</code> como hijo.</li>
        <li><code>onValueChange</code> conserva los detalles de Input, incluido el evento nativo y el motivo <code>none</code>.</li>
      </ul>
    </section>
  );
}
