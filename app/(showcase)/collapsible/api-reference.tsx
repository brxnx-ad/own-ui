import { ShowcaseAnatomyContent, ShowcaseApiTable } from "@/components/shared/showcase-reference";
import { ShowcaseAnatomy, ShowcaseApiReference } from "@/components/shared/showcase";
const anatomy = `<Collapsible>
  <CollapsibleTrigger>Detalles de entrega</CollapsibleTrigger>
  <CollapsiblePanel>El envío tarda de tres a cinco días hábiles.</CollapsiblePanel>
</Collapsible>`;

const parts = [
  ["Collapsible", "Agrupa las piezas y administra el estado de apertura."],
  ["CollapsibleTrigger", "Abre y cierra el panel. Incluye un chevron decorativo que gira al abrirlo."],
  ["CollapsiblePanel", "Contiene el contenido desplegable y anima su altura y opacidad."],
];

const groups = [
  { name: "Collapsible", rows: [
    ["defaultOpen", "boolean", "false", "Apertura inicial en modo no controlado."],
    ["open", "boolean", "—", "Apertura controlada por el consumidor. Actualízala con onOpenChange."],
    ["onOpenChange", "(open: boolean, details: CollapsibleRootChangeEventDetails) => void", "—", "Recibe la apertura propuesta desde el activador o la búsqueda de página. Usa details.cancel() para cancelar."],
    ["disabled", "boolean", "false", "Deshabilita el activador por defecto. Conserva el estado actual del panel."],
  ] },
  { name: "CollapsibleTrigger", rows: [
    ["disabled", "boolean", "Hereda de Collapsible", "Permite especificar la deshabilitación del activador localmente."],
    ["nativeButton", "boolean", "true", "Usa false si render sustituye el botón por otro elemento."],
  ] },
  { name: "CollapsiblePanel", rows: [
    ["keepMounted", "boolean", "false", "Conserva el panel en el DOM mientras está cerrado."],
    ["hiddenUntilFound", "boolean", "false", "Permite encontrar contenido oculto con la búsqueda del navegador y prevalece sobre keepMounted."],
    ["id", "string", "Generado", "Identificador del panel que usa el activador en aria-controls al abrirse."],
  ] },
  { name: "Todas las piezas", rows: [
    ["className", "string | (state) => string | undefined", "—", "Aplica clases estáticas o dependientes del estado al nodo de la pieza."],
    ["style", "CSSProperties | (state) => CSSProperties | undefined", "—", "Aplica estilos inline al nodo de la pieza."],
    ["render", "ReactElement | (props, state) => ReactElement", "Elemento de la pieza", "Sustituye el nodo. Propaga las props, los eventos y la referencia recibidos."],
  ] },
];

export function Anatomy() {
  return (
    <ShowcaseAnatomy>
      <ShowcaseAnatomyContent name="Collapsible" code={anatomy} parts={parts} />
    </ShowcaseAnatomy>
  );
}

export function ApiReference() {
  return (
    <ShowcaseApiReference>
      <ShowcaseApiTable
        name="Collapsible"
        groups={groups.map(({ name, rows }) => ({
          piece: name,
          rows: rows.map(([prop, type, defaultValue, description]) => ({ prop, type, defaultValue, description })),
        }))}
      />
      <ul className="list-disc space-y-2 pl-5 body-sm text-content-base">
        <li><code>details.reason</code> es <code>trigger-press</code> para el activador y <code>none</code> para la búsqueda de página. Cambiar <code>open</code> desde fuera no ejecuta el callback.</li>
        <li>Tab enfoca el activador habilitado. Enter y Espacio alternan la apertura.</li>
        <li>El panel usa <code>--collapsible-panel-height</code> para la transición. El panel y el chevron respetan la preferencia de movimiento reducido.</li>
      </ul>
    </ShowcaseApiReference>
  );
}
