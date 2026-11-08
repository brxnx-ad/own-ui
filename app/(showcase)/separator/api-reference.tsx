import { ShowcaseAnatomyContent, ShowcaseApiTable } from "@/components/shared/showcase-reference";
import { ShowcaseAnatomy, ShowcaseApiReference } from "@/components/shared/showcase";
const anatomy = `import { Separator } from "@/components/own/base/separator";

<Separator />`;

const props = [
  ["orientation", '"horizontal" | "vertical"', '"horizontal"', "Define el eje visual y la orientación accesible."],
  ["className", "string | (state: SeparatorState) => string | undefined", "—", "Combina clases estáticas o calculadas con el estilo base."],
  ["style", "CSSProperties | (state: SeparatorState) => CSSProperties | undefined", "—", "Aplica estilos inline al mismo elemento."],
  ["render", "ReactElement | (props, state: SeparatorState) => ReactElement", "div", "Sustituye el elemento. Conserva las props y el ref al usar la forma funcional."],
  ["aria-hidden", 'boolean | "true" | "false"', "—", "Con true, oculta una división decorativa a las tecnologías de asistencia."],
  ["ref", "React.Ref<HTMLDivElement>", "—", "Da acceso al nodo predeterminado."],
];

export function Anatomy() {
  return (
    <ShowcaseAnatomy>
      <ShowcaseAnatomyContent name="Separator" code={anatomy} parts={[[<>Separator</>, <>Renderiza un <code>div</code> con <code>{'role="separator"'}</code> y la orientación correspondiente.</>]]} />
    </ShowcaseAnatomy>
  );
}

export function ApiReference() {
  return (
    <ShowcaseApiReference>
      <ShowcaseApiTable
        name="Separator"
        groups={[{
          piece: "Separator",
          rows: props.map(([name, type, defaultValue, description]) => ({ prop: name, type, defaultValue, description })),
        }]}
      />
      <ul className="body-sm list-disc space-y-2 ps-5 text-gray-bold/75">
        <li><code>SeparatorState</code> expone <code>orientation</code>. El nodo incluye <code>{'data-slot="separator"'}</code> y <code>data-orientation</code>.</li>
        <li>La línea mide 1 px de grosor. En vertical, necesita una fila que le dé altura mediante estiramiento o una altura definida por el consumidor.</li>
        <li>El separador es estático y queda fuera del orden de tabulación por defecto.</li>
      </ul>
    </ShowcaseApiReference>
  );
}
