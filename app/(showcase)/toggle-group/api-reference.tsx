import { ShowcaseAnatomyContent, ShowcaseApiTable } from "@/components/shared/showcase-reference";
import { ShowcaseAnatomy, ShowcaseApiReference } from "@/components/shared/showcase";
const anatomy = `import { Toggle } from "@/components/own/base/toggle";
import { ToggleGroup } from "@/components/own/base/toggle-group";

<ToggleGroup aria-label="Vista de archivos" defaultValue={["list"]}>
  <Toggle value="list">Lista</Toggle>
  <Toggle value="cards">Tarjetas</Toggle>
</ToggleGroup>`;

const parts = [
  ["ToggleGroup", "Agrupa los botones y coordina la selección y el foco."],
  ["Toggle", "Identifica una opción con su value y muestra su estado presionado."],
];

const groups = [
  {
    piece: "ToggleGroup",
    rows: [
      ["value", "readonly Value[]", "—", "Selección controlada. Usa [] para liberar todas las opciones."],
      ["defaultValue", "readonly Value[]", "[]", "Selección inicial en modo no controlado."],
      ["onValueChange", "(value: Value[], details: ToggleGroupChangeEventDetails) => void", "—", "Recibe el arreglo propuesto. details.cancel() impide aplicarlo."],
      ["multiple", "boolean", "false", "Permite mantener varias opciones activas al mismo tiempo."],
      ["disabled", "boolean", "false", "Deshabilita todos los botones del grupo."],
      ["orientation", '"horizontal" | "vertical"', '"horizontal"', "Define la disposición visual y las flechas que recorren el grupo."],
      ["loopFocus", "boolean", "true", "Permite que las flechas pasen de un extremo al otro."],
      ["aria-label / aria-labelledby", "string", "—", "Identifica el grupo de forma accesible."],
      ["className / style", "Valor estático o función de ToggleGroupState", "—", "Personaliza el nodo contenedor."],
      ["render", "ReactElement | ((props, state: ToggleGroupState) => ReactElement)", "div", "Sustituye el nodo. Conserva el rol, los handlers, los hijos y el ref."],
      ["ref / children", "React.Ref<HTMLDivElement> / ReactNode", "—", "Dan acceso al nodo y permiten aportar los botones."],
    ],
  },
  {
    piece: "Toggle",
    rows: [
      ["value", "Value extends string", "—", "Identificador único y no vacío de la opción dentro del grupo.", "No en el grupo"],
      ["disabled", "boolean", "false", "Impide la interacción con esta opción y conserva su estado."],
    ],
  },
];

export function Anatomy() {
  return (
    <ShowcaseAnatomy>
      <ShowcaseAnatomyContent name="Toggle Group" code={anatomy} parts={parts} />
    </ShowcaseAnatomy>
  );
}

export function ApiReference() {
  return (
    <ShowcaseApiReference>
      <ShowcaseApiTable
        name="Toggle Group"
        groups={groups.map(({ piece, rows }) => ({
          piece: piece,
          rows: rows.map(([name, type, defaultValue, description, optional = "Sí"]) => ({ prop: name, type, defaultValue, description, optional })),
        }))}
      />
      <ul className="body-sm list-disc space-y-2 ps-5 text-gray-bold/75">
        <li>El grupo usa <code>{'role="group"'}</code>. Cada botón mantiene su propio <code>aria-pressed</code>.</li>
        <li>El grupo expone <code>data-orientation</code> y, según el estado, <code>data-multiple</code> y <code>data-disabled</code>.</li>
        <li>Las flechas mueven el foco. <kbd>Enter</kbd> y <kbd>Espacio</kbd> cambian la selección.</li>
      </ul>
    </ShowcaseApiReference>
  );
}
