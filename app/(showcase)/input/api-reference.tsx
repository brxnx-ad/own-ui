import { ShowcaseAnatomyContent, ShowcaseApiTable } from "@/components/shared/showcase-reference";
import { ShowcaseAnatomy, ShowcaseApiReference } from "@/components/shared/showcase";
const anatomy = `<label htmlFor="report-title">Título del informe</label>
<Input id="report-title" name="title" />`;

const rows = [
  ["defaultValue", "string | number | readonly string[]", "—", "Valor inicial en modo no controlado."],
  ["value", "string | number | readonly string[]", "—", "Valor del modo controlado. Actualízalo para aceptar los cambios."],
  ["onValueChange", "(value: string, details: InputChangeEventDetails) => void", "—", "Recibe el texto del DOM y los detalles del evento nativo cuando el usuario edita el campo."],
  ["type", "HTMLInputTypeAttribute", '"text" (HTML)', "Selecciona el tipo de entrada y las restricciones nativas correspondientes."],
  ["id / name", "string", "ID generado / —", "Asocia la etiqueta y nombra el valor enviado. El nombre de Field tiene precedencia."],
  ["disabled", "boolean", "false", "Impide enfocar y editar el control y lo excluye del envío. También se puede heredar de Field."],
  ["readOnly", "boolean", "false", "Impide editar en los tipos compatibles. Permite el foco, la selección y el envío del valor."],
  ["required / pattern / minLength / maxLength", "boolean / string / number / number", "—", "Definen las restricciones del navegador según el tipo de entrada."],
  ["placeholder / autoComplete / inputMode", "Atributos de input", "—", "Configuran la pista visual, el autocompletado y el teclado sugerido."],
  ["aria-invalid", 'boolean | "true" | "false" | "grammar" | "spelling"', "Estado de Field o —", "Con true, señala el error y cambia el borde y el anillo. Field lo establece cuando el control habilitado es inválido."],
  ["className", "string | (state: InputState) => string | undefined", "—", "Combina las clases del consumidor con las clases base."],
  ["style", "CSSProperties | (state: InputState) => CSSProperties | undefined", "—", "Aplica estilos inline al nodo."],
  ["render", "ReactElement | (props, state: InputState) => ReactElement", "input", "Compone un control alternativo que debe conservar los atributos, eventos y la ref."],
  ["ref / onChange / otros atributos HTML", "Según InputProps", "—", "Acceso al nodo y a la API nativa. onChange recibe el evento de React."],
];

export function Anatomy() {
  return (
    <ShowcaseAnatomy>
      <ShowcaseAnatomyContent name="Input" code={anatomy} parts={[[<>Input</>, <>Renderiza el control nativo y se registra en Field cuando está dentro de uno. El consumidor aporta la etiqueta.</>]]} />
    </ShowcaseAnatomy>
  );
}

export function ApiReference() {
  return (
    <ShowcaseApiReference>
      <ShowcaseApiTable
        name="Input"
        groups={[{
          piece: "Input",
          rows: rows.map(([prop, type, defaultValue, description]) => ({ prop, type, defaultValue, description })),
        }]}
      />
      <ul className="body-sm space-y-2 text-gray-bold/75">
        <li><code>onValueChange</code> recibe <code>{'details.reason === "none"'}</code>. En modo no controlado, <code>details.cancel()</code> omite la validación del cambio en Field y conserva la edición nativa.</li>
        <li><code>size</code> es un atributo HTML. Define el ancho visual desde el contenedor o mediante CSS.</li>
        <li>Usa <code>Input</code> directamente dentro de <code>Field</code> para asociarlo a <code>FieldLabel</code>, <code>FieldDescription</code> y <code>FieldError</code>.</li>
      </ul>
    </ShowcaseApiReference>
  );
}
