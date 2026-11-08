import { ShowcaseAnatomyContent, ShowcaseApiTable } from "@/components/shared/showcase-reference";
import { ShowcaseAnatomy, ShowcaseApiReference } from "@/components/shared/showcase";
const anatomy = `<p id="channel-label">Canal de notificación</p>
<RadioGroup name="channel" aria-labelledby="channel-label" defaultValue="correo">
  <label>
    <Radio value="correo"><RadioIndicator /></Radio>
    Correo electrónico
  </label>
  <label>
    <Radio value="sms"><RadioIndicator /></Radio>
    SMS
  </label>
</RadioGroup>`;

const anatomyRows = [
  ["RadioGroup", "Comparte la selección, la navegación con flechas y la configuración del formulario."],
  ["Radio", "Representa una opción. Base UI renderiza un control visible y un input nativo asociado."],
  ["RadioIndicator", "Dibuja el punto de selección y se monta o desmonta según el estado."],
];

const groups = [
  {
    piece: "RadioGroup",
    rows: [
      ["value / defaultValue", "Value", "—", "Sí", "Selecciona el valor controlado o el valor inicial. Sin valor inicial, el grupo comienza vacío."],
      ["onValueChange", "(value: Value, details: RadioGroupChangeEventDetails) => void", "—", "Sí", "Recibe la opción propuesta y el evento nativo. details.cancel() cancela el cambio."],
      ["name / form", "string", "Nombre de Field o — / —", "Sí", "Identifica el dato y asocia los inputs con un formulario externo por su ID."],
      ["disabled / readOnly / required", "boolean", "false", "Sí", "Deshabilita todo el grupo, conserva la selección sin edición o exige elegir una opción."],
      ["inputRef", "React.Ref<HTMLInputElement>", "—", "Sí", "Accede al input representativo del grupo. Base UI prioriza la opción marcada y habilitada."],
      ["aria-label / aria-labelledby", "string", "Según Field o Fieldset", "Sí", "Da un nombre accesible al conjunto cuando la etiqueta se aporta desde el consumidor."],
    ],
  },
  {
    piece: "Radio",
    rows: [
      ["value", "Value", "—", "No", "Identifica una opción con un valor único y estable en el grupo."],
      ["disabled / readOnly / required", "boolean", "false", "Sí", "Aplica el estado a la opción. El estado heredado del grupo sigue vigente."],
      ["nativeButton / id", "boolean / string", "false / ID generado", "Sí", "Usa nativeButton con render de botón. id identifica el botón nativo o el input oculto cuando se usa el span predeterminado."],
      ["inputRef", "React.Ref<HTMLInputElement>", "—", "Sí", "Accede al input nativo de esta opción."],
    ],
  },
  {
    piece: "RadioIndicator",
    rows: [
      ["keepMounted", "boolean", "false", "Sí", "Conserva el punto en el DOM al desmarcar la opción. El estilo base lo oculta mientras está desmarcado."],
    ],
  },
  {
    piece: "Todas",
    rows: [
      ["className / style", "string / CSSProperties, o funciones del estado", "—", "Sí", "Personaliza clases y estilos de cada pieza."],
      ["render / ref / atributos HTML", "Según la pieza", "Elemento de anatomía / — / —", "Sí", "Compone el nodo conservando su rol, estado, eventos y referencia."],
    ],
  },
];

export function Anatomy() {
  return (
    <ShowcaseAnatomy>
      <ShowcaseAnatomyContent name="Radio Group" code={anatomy} parts={anatomyRows} />
    </ShowcaseAnatomy>
  );
}

export function ApiReference() {
  return (
    <ShowcaseApiReference>
      <ShowcaseApiTable
        name="Radio Group"
        groups={groups.map(({ piece, rows }) => ({
          piece: piece,
          rows: rows.map(([prop, type, defaultValue, optional, description]) => ({ prop, type, defaultValue, description, optional })),
        }))}
      />
      <ul className="body-sm space-y-2 text-gray-bold/75">
        <li>Tab entra al grupo, las flechas recorren y seleccionan opciones habilitadas y Espacio marca la opción enfocada.</li>
        <li>Con el <code>span</code> predeterminado, Base UI puede conservar una parada de Tab en la opción marcada de un grupo deshabilitado.</li>
        <li>El grupo compara las opciones por igualdad estricta. Si usas objetos, conserva sus referencias. El input serializa el valor para <code>FormData</code>.</li>
        <li><code>details.reason</code> vale <code>&quot;none&quot;</code>. El indicador desvanece su entrada y salida cuando se permite el movimiento.</li>
      </ul>
    </ShowcaseApiReference>
  );
}
