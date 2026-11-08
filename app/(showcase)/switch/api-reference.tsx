import { ShowcaseAnatomyContent, ShowcaseApiTable } from "@/components/shared/showcase-reference";
import { ShowcaseAnatomy, ShowcaseApiReference } from "@/components/shared/showcase";
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
    <ShowcaseAnatomy>
      <ShowcaseAnatomyContent name="Switch" code={anatomy} parts={parts} />
    </ShowcaseAnatomy>
  );
}

export function ApiReference() {
  return (
    <ShowcaseApiReference>
      <ShowcaseApiTable
        name="Switch"
        groups={groups.map(({ piece, rows }) => ({
          piece: piece,
          rows: rows.map(([name, type, defaultValue, description]) => ({ prop: name, type, defaultValue, description })),
        }))}
      />
      <ul className="body-sm list-disc space-y-2 ps-5 text-gray-bold/75">
        <li>Ambas piezas reflejan <code>data-checked</code> o <code>data-unchecked</code>, además de los estados de deshabilitación, solo lectura y validación.</li>
        <li><code>onCheckedChange</code> recibe el evento original en <code>details.event</code> y el motivo <code>{'"none"'}</code>.</li>
        <li>Usa una etiqueta estable para ambos estados. El desplazamiento del indicador respeta la preferencia de movimiento reducido.</li>
      </ul>
    </ShowcaseApiReference>
  );
}
