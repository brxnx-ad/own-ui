import { ShowcaseAnatomyContent, ShowcaseApiTable } from "@/components/shared/showcase-reference";
import { ShowcaseAnatomy, ShowcaseApiReference } from "@/components/shared/showcase";
const anatomy = `<label htmlFor="code">Código de verificación</label>
<OTPField id="code" name="code" length={4} required>
  <OTPFieldInput />
  <OTPFieldInput aria-label="Carácter 2 de 4" />
  <OTPFieldSeparator aria-hidden />
  <OTPFieldInput aria-label="Carácter 3 de 4" />
  <OTPFieldInput aria-label="Carácter 4 de 4" />
</OTPField>`;

const anatomyRows = [
  ["OTPField", "Agrupa las casillas, coordina el foco y conserva el código completo para el formulario."],
  ["OTPFieldInput", "Representa una casilla de entrada. El consumidor monta una por cada posición del código."],
  ["OTPFieldSeparator", "Separa grupos visuales. Se puede omitir y queda fuera del valor y del recorrido de teclado."],
];

const groups = [
  {
    piece: "OTPField",
    rows: [
      ["length", "number", "—", "No", "Entero positivo que debe coincidir con la cantidad de casillas montadas."],
      ["value / defaultValue", "string", "— / cadena vacía", "Sí", "Código controlado o inicial. Las cadenas conservan ceros iniciales."],
      ["validationType", '"numeric" | "alpha" | "alphanumeric" | "none"', '"numeric"', "Sí", "Filtra por dígitos, letras ASCII, ambos o una regla personalizada."],
      ["normalizeValue", "(value: string) => string", "—", "Sí", "Transformación idempotente aplicada después del filtrado inicial y antes de limitar la longitud."],
      ["onValueChange", "(value: string, details: OTPFieldChangeEventDetails) => void", "—", "Sí", "Recibe el código normalizado. details.cancel() permite cancelar el cambio."],
      ["onValueInvalid", "(value: string, details: OTPFieldInvalidEventDetails) => void", "—", "Sí", "Informa del texto intentado cuando el filtrado o la normalización descartan caracteres."],
      ["onValueComplete", "(value: string, details: OTPFieldCompleteEventDetails) => void", "—", "Sí", "Se ejecuta al completar el código por entrada o pegado, y al pegar un código completo sobre otro completo."],
      ["autoSubmit", "boolean", "false", "Sí", "Solicita el envío del formulario al completar el código, después de onValueComplete."],
      ["mask", "boolean", "false", "Sí", "Usa type=password en las casillas para ocultar los caracteres en pantalla."],
      ["required / disabled / readOnly", "boolean", "false", "Sí", "Exige un código, deshabilita el campo o impide su edición."],
      ["id / name / form", "string", "ID generado / — / —", "Sí", "id identifica la primera casilla. name y form configuran el envío del código completo."],
      ["autoComplete / inputMode", "Atributos HTML de input", '"one-time-code" / según validationType', "Sí", "Configuran el autocompletado de la primera casilla y el teclado sugerido."],
      ["aria-labelledby / aria-describedby", "string", "Según etiqueta y Field", "Sí", "Asocian el nombre y la ayuda del grupo."],
    ],
  },
  {
    piece: "OTPFieldInput",
    rows: [
      ["aria-label", "string", "—", "Sí", "Identifica cada casilla posterior a la primera. La primera recibe el nombre mediante label o FieldLabel."],
      ["placeholder / type", "Atributos HTML de input", "— / según mask", "Sí", "Personalizan una casilla. El placeholder aparece si está vacía y pierde el foco."],
    ],
  },
  {
    piece: "OTPFieldSeparator",
    rows: [
      ["orientation", '"horizontal" | "vertical"', '"horizontal"', "Sí", "Determina el eje visual y semántico del separador."],
      ["aria-hidden", "boolean", "—", "Sí", "Excluye el separador del árbol de accesibilidad si cumple una función decorativa."],
    ],
  },
  {
    piece: "Todas",
    rows: [
      ["className / style", "string / CSSProperties, o funciones del estado", "—", "Sí", "Añade clases y estilos a cada nodo."],
      ["render / ref / atributos HTML", "Según la pieza", "Elemento nativo / — / —", "Sí", "Compone el nodo, da acceso a su ref o añade atributos."],
    ],
  },
];

export function Anatomy() {
  return (
    <ShowcaseAnatomy>
      <ShowcaseAnatomyContent name="OTP Field" code={anatomy} parts={anatomyRows} />
    </ShowcaseAnatomy>
  );
}

export function ApiReference() {
  return (
    <ShowcaseApiReference>
      <ShowcaseApiTable
        name="OTP Field"
        groups={groups.map(({ piece, rows }) => ({
          piece: piece,
          rows: rows.map(([prop, type, defaultValue, optional, description]) => ({ prop, type, defaultValue, description, optional })),
        }))}
      />
      <ul className="body-sm space-y-2 text-gray-bold/75">
        <li><code>onValueChange</code> distingue <code>input-change</code>, <code>input-clear</code>, <code>input-paste</code> y <code>keyboard</code>. Los callbacks de texto rechazado y de código completo distinguen escritura y pegado y carecen de cancelación.</li>
        <li>Tab entra al grupo por la casilla activa. Usa las flechas para moverte dentro del grupo y Retroceso para borrar. En un código parcial, el foco puede avanzar hasta la primera casilla vacía.</li>
        <li>El campo envía el código completo como una cadena. Los separadores visuales quedan fuera del valor enviado.</li>
      </ul>
    </ShowcaseApiReference>
  );
}
