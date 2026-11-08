import { ShowcaseAnatomyContent, ShowcaseApiTable } from "@/components/shared/showcase-reference";
import { ShowcaseAnatomy, ShowcaseApiReference } from "@/components/shared/showcase";
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
    <ShowcaseAnatomy>
      <ShowcaseAnatomyContent name="FloatingInput" code={anatomy} parts={parts} />
    </ShowcaseAnatomy>
  );
}

export function ApiReference() {
  return (
    <ShowcaseApiReference>
      <ShowcaseApiTable
        name="FloatingInput"
        groups={[{
          piece: "FloatingInput",
          rows: rows.map(([prop, type, defaultValue, optional, description]) => ({ prop, type, defaultValue, description, optional })),
        }]}
      />
      <ul className="body-sm space-y-2 text-gray-bold/75">
        <li>Usa <code>label</code> para nombrar el campo y <code>FieldDescription</code> para una pista adicional.</li>
        <li>Las opciones de validación de Field van en <code>fieldProps</code>. Para mostrar el mensaje, añade <code>FieldError</code> como hijo.</li>
        <li><code>onValueChange</code> conserva los detalles de Input, incluido el evento nativo y el motivo <code>none</code>.</li>
      </ul>
    </ShowcaseApiReference>
  );
}
