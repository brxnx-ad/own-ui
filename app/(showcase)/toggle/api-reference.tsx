import { ShowcaseAnatomyContent, ShowcaseApiTable } from "@/components/shared/showcase-reference";
import { ShowcaseAnatomy, ShowcaseApiReference } from "@/components/shared/showcase";
const anatomy = `import { Toggle } from "@/components/own/base/toggle";

<Toggle defaultPressed>Fijar vista</Toggle>`;

const props = [
  ["variant", '"outline" | "ghost"', '"outline"', "Elige un borde visible o transparente en reposo. Ambas variantes comparten el estado presionado."],
  ["size", '"sm" | "md" | "lg"', '"md"', "Define altura, tipografía y espaciado."],
  ["iconOnly", "boolean", "false", "Usa una huella cuadrada. Aporta un nombre accesible si el contenido solo es un icono."],
  ["pressed", "boolean", "—", "Controla el estado desde el consumidor."],
  ["defaultPressed", "boolean", "false", "Establece el estado inicial en modo no controlado."],
  ["onPressedChange", "(pressed: boolean, details: ToggleChangeEventDetails) => void", "—", "Recibe el estado propuesto. details.cancel() cancela el cambio."],
  ["disabled", "boolean", "false", "Impide la interacción. También se hereda del grupo."],
  ["value", "string", "—", "Identificador único y no vacío dentro de ToggleGroup."],
  ["nativeButton", "boolean", "true", "Usa false si render produce otro elemento, como span."],
  ["render", "ReactElement | ((props, state: ToggleState) => ReactElement)", "button", "Sustituye el nodo. Conserva sus props, eventos y ref."],
  ["className / style", "Valor estático o función de ToggleState", "—", "Aplica clases o estilos inline al nodo."],
  ["ref y atributos HTML", "Ref y atributos del nodo", "—", "Dan acceso al elemento y permiten añadir, por ejemplo, aria-label."],
];

export function Anatomy() {
  return (
    <ShowcaseAnatomy>
      <ShowcaseAnatomyContent name="Toggle" code={anatomy} parts={[[<>Toggle</>, <>Renderiza un <code>button</code> y comunica su estado persistente con <code>aria-pressed</code>.</>]]} />
    </ShowcaseAnatomy>
  );
}

export function ApiReference() {
  return (
    <ShowcaseApiReference>
      <ShowcaseApiTable
        name="Toggle"
        groups={[{
          piece: "Toggle",
          rows: props.map(([name, type, defaultValue, description]) => ({ prop: name, type, defaultValue, description, optional: name === "value" ? "Sí, fuera de un grupo" : "Sí" })),
        }]}
      />
      <ul className="body-sm list-disc space-y-2 ps-5 text-content-base">
        <li><code>ToggleState</code> expone <code>pressed</code> y <code>disabled</code>. El nodo refleja esos estados mediante <code>data-pressed</code> y <code>data-disabled</code>.</li>
        <li><code>onPressedChange</code> recibe el evento original en <code>details.event</code> y el motivo <code>none</code>. Dentro de un grupo, la selección del grupo tiene prioridad.</li>
        <li>El elemento nativo usa <code>{'type="button"'}</code>. Conserva la misma etiqueta al alternar el estado.</li>
      </ul>
    </ShowcaseApiReference>
  );
}
