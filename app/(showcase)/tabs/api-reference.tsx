import { ShowcaseAnatomyContent, ShowcaseApiTable } from "@/components/shared/showcase-reference";
import { ShowcaseAnatomy, ShowcaseApiReference } from "@/components/shared/showcase";
const anatomy = `<Tabs defaultValue="summary">
  <TabsList aria-label="Información del informe">
    <TabsTab value="summary">Resumen</TabsTab>
    <TabsTab value="activity">Actividad</TabsTab>
    <TabsIndicator />
  </TabsList>
  <TabsPanel value="summary">Resultados de la revisión.</TabsPanel>
  <TabsPanel value="activity">Últimas observaciones.</TabsPanel>
</Tabs>`;

const parts = [
  ["Tabs", "Coordina la selección y la orientación de la familia."],
  ["TabsList", "Agrupa las pestañas y gestiona el recorrido con teclado."],
  ["TabsTab", "Selecciona el panel con el mismo valor."],
  ["TabsIndicator", "Se ajusta a la posición y al tamaño de la pestaña activa."],
  ["TabsPanel", "Presenta el contenido de la pestaña activa."],
];

const groups = [
  {
    piece: "Tabs",
    rows: [
      ["value", "TabsValue", "—", "Controla la selección. null representa una raíz sin pestaña activa."],
      ["defaultValue", "TabsValue", "0", "Selección inicial no controlada. Usa un valor habilitado para que el primer render tenga el panel correcto."],
      ["orientation", '"horizontal" | "vertical"', '"horizontal"', "Configura la disposición y el eje de navegación por flechas."],
      ["onValueChange", "(value: TabsValue, details: TabsChangeEventDetails) => void", "—", "Recibe la selección y su motivo. details.cancel() solo afecta a cambios iniciados por el usuario."],
    ],
  },
  {
    piece: "TabsList",
    rows: [
      ["activateOnFocus", "boolean", "false", "Activa la pestaña habilitada que recibe el foco. En modo manual se confirma con Enter o Espacio."],
      ["loopFocus", "boolean", "true", "Permite que las flechas vuelvan al otro extremo de la lista."],
      ["aria-label / aria-labelledby", "string", "—", "Identifica el conjunto mediante un nombre accesible."],
    ],
  },
  {
    piece: "TabsTab",
    rows: [
      ["value", "TabsValue", "—", "Identificador de la pestaña. Debe coincidir con el del panel.", "No"],
      ["disabled", "boolean", "false", "Impide activar la pestaña. Base UI permite descubrirla con las flechas."],
      ["nativeButton", "boolean", "true", "Usa false cuando render sustituya el botón por otro elemento."],
    ],
  },
  {
    piece: "TabsIndicator",
    rows: [
      ["renderBeforeHydration", "boolean", "false", "Intenta medir y mostrar el indicador antes de que React hidrate la página."],
    ],
  },
  {
    piece: "TabsPanel",
    rows: [
      ["value", "TabsValue", "—", "Identificador de la pestaña asociada.", "No"],
      ["keepMounted", "boolean", "false", "Conserva el panel en el DOM cuando queda oculto."],
    ],
  },
  {
    piece: "Todas las piezas",
    rows: [
      ["className / style", "Valor estático o función del estado de la pieza", "—", "Añade clases o estilos inline al nodo correspondiente."],
      ["render", "ReactElement | ((props, state) => ReactElement)", "Nodo de la pieza", "Cambia el elemento y permite conservar las props, eventos y refs."],
      ["ref y atributos HTML", "Según el nodo de la pieza", "—", "Accede al elemento renderizado o añade atributos HTML compatibles."],
    ],
  },
];

export function Anatomy() {
  return (
    <ShowcaseAnatomy>
      <ShowcaseAnatomyContent name="Tabs" code={anatomy} parts={parts} />
    </ShowcaseAnatomy>
  );
}

export function ApiReference() {
  return (
    <ShowcaseApiReference>
      <ShowcaseApiTable
        name="Tabs"
        groups={groups.map(({ piece, rows }) => ({
          piece: piece,
          rows: rows.map(([name, type, defaultValue, description, optional = "Sí"]) => ({ prop: name, type, defaultValue, description, optional })),
        }))}
      />
      <ul className="body-sm list-disc space-y-2 ps-5 text-content-base">
        <li><code>TabsValue</code> conserva el tipo abierto de Base UI. Usa valores únicos, por ejemplo cadenas o números.</li>
        <li>Los motivos de cambio son <code>none</code>, <code>initial</code>, <code>disabled</code> y <code>missing</code>. <code>details.activationDirection</code> indica la dirección del cambio.</li>
        <li><kbd>Home</kbd> y <kbd>End</kbd> enfocan los extremos de la lista. Con <kbd>Tab</kbd> puedes seguir al panel activo.</li>
        <li>El indicador usa las variables de posición de Base UI. Su transición se desactiva con movimiento reducido.</li>
      </ul>
    </ShowcaseApiReference>
  );
}
