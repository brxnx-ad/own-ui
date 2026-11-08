import { ShowcaseAnatomyContent, ShowcaseApiTable } from "@/components/shared/showcase-reference";
import { ShowcaseAnatomy, ShowcaseApiReference } from "@/components/shared/showcase";
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
    <ShowcaseAnatomy>
      <ShowcaseAnatomyContent name="Checkbox" code={anatomy} parts={parts} />
    </ShowcaseAnatomy>
  );
}

export function ApiReference() {
  return (
    <ShowcaseApiReference>
      <ShowcaseApiTable
        name="Checkbox"
        groups={groups.map(({ name, rows }) => ({
          piece: name,
          rows: rows.map(([prop, type, defaultValue, description]) => ({ prop, type, defaultValue, description })),
        }))}
      />
      <ul className="list-disc space-y-2 pl-5 body-sm text-gray-bold/75">
        <li><code>onCheckedChange</code> recibe el evento nativo y el motivo <code>none</code>. Cambiar <code>checked</code> desde fuera no dispara el callback.</li>
        <li>Tab lleva el foco a la casilla habilitada y Espacio alterna su valor. Dentro de un formulario, Enter puede activar su botón de envío.</li>
        <li>La transición de opacidad del indicador respeta la preferencia de movimiento reducido.</li>
      </ul>
    </ShowcaseApiReference>
  );
}
