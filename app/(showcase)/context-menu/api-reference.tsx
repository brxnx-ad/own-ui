import { ShowcaseAnatomyContent, ShowcaseApiTable } from "@/components/shared/showcase-reference";
import { ShowcaseAnatomy, ShowcaseApiReference } from "@/components/shared/showcase";
const anatomy = `<ContextMenu>
  <ContextMenuTrigger>Revisar inventario</ContextMenuTrigger>
  <ContextMenuPortal>
    <ContextMenuPositioner>
      <ContextMenuPopup aria-label="Acciones de la tarea">
        <ContextMenuItem onClick={pinTask}>Fijar tarea</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem disabled>Duplicar tarea</ContextMenuItem>
      </ContextMenuPopup>
    </ContextMenuPositioner>
  </ContextMenuPortal>
</ContextMenu>`;

const parts = [
  ["ContextMenu, ContextMenuTrigger", "Coordina el estado y define el área que recibe el gesto contextual."],
  ["Portal, Positioner, Popup", "Montan, posicionan y contienen el menú."],
  ["Backdrop, Arrow", "Añaden un fondo y una flecha opcionales."],
  ["Item, LinkItem", "Ejecutan una acción o navegan mediante un enlace."],
  ["Group, GroupLabel, Separator", "Agrupan y separan acciones relacionadas."],
  ["CheckboxItem, CheckboxItemIndicator", "Alternan una opción y muestran su marca."],
  ["RadioGroup, RadioItem, RadioItemIndicator", "Agrupan opciones excluyentes y muestran la opción seleccionada."],
  ["ContextMenuSubmenu, SubmenuTrigger", "Anidan un menú con su propio activador, portal y panel."],
];

const groups = [
  { name: "ContextMenu / Submenu", rows: [
    ["open / defaultOpen", "boolean", "false sin control", "Apertura controlada o inicial."],
    ["onOpenChange", "(open: boolean, details) => void", "—", "Recibe la apertura propuesta. details.cancel() cancela la solicitud."],
    ["onOpenChangeComplete", "(open: boolean) => void", "—", "Notifica al terminar la animación."],
    ["onItemHighlighted", "(item: HTMLElement | undefined, details) => void", "—", "Notifica cambios de resaltado con evento, motivo y etiqueta."],
    ["disabled / loopFocus / highlightItemOnHover", "boolean", "false / true / true", "Configuran deshabilitación, recorrido circular y resaltado con puntero."],
    ["orientation", "vertical | horizontal", "vertical", "Define el eje de navegación del menú."],
    ["actionsRef", "RefObject<ContextMenuRootActions | null>", "—", "Expone acciones como close() para cerrar desde el consumidor."],
  ] },
  { name: "ContextMenuTrigger", rows: [
    ["tabIndex", "number", "0", "own-ui incluye el área en el recorrido con Tab para que reciba el gesto de menú contextual del teclado."],
  ] },
  { name: "ContextMenuPortal", rows: [
    ["container / keepMounted", "Elemento | ref / boolean", "body / false", "Controlan el destino del portal y su permanencia tras el cierre."],
  ] },
  { name: "ContextMenuPositioner", rows: [
    ["anchor / side / align", "Ancla / Side / Align", "Automático / según nivel / start", "Usa el punto de apertura en la raíz y el activador en el submenú."],
    ["sideOffset / alignOffset", "number | OffsetFunction", "Según colocación", "Ajustan la distancia y el desplazamiento respecto del ancla."],
  ] },
  { name: "ContextMenuPopup", rows: [
    ["finalFocus", "boolean | RefObject | función", "Comportamiento de Base UI", "Elige el destino del foco cuando se cierra el menú."],
  ] },
  { name: "Item / LinkItem / CheckboxItem / RadioItem", rows: [
    ["closeOnClick", "boolean", "true en Item, false en el resto", "Controla si activar la opción cierra el menú."],
    ["label", "string", "Texto de la opción", "Define el texto usado para navegar por escritura."],
  ] },
  { name: "ContextMenuCheckboxItem", rows: [
    ["checked / defaultChecked", "boolean", "false sin control", "Marca controlada o inicial."],
    ["onCheckedChange", "(checked: boolean, details) => void", "—", "Recibe el estado propuesto de la casilla."],
  ] },
  { name: "ContextMenuRadioGroup / RadioItem", rows: [
    ["value", "Valor de selección", "—", "En el grupo controla la selección. En cada opción identifica su valor."],
    ["defaultValue / onValueChange", "Valor / (value, details) => void", "—", "Inicializa la selección o sincroniza el grupo controlado."],
  ] },
  { name: "Indicadores", rows: [
    ["keepMounted", "boolean", "false", "Conserva el nodo de la marca para reservar su espacio al desmarcar."],
  ] },
  { name: "ContextMenuSubmenuTrigger", rows: [
    ["openOnHover / delay / closeDelay", "boolean / number / number", "true / 100 / 0", "Controlan la apertura por puntero y las demoras en milisegundos."],
  ] },
];

export function Anatomy() {
  return (
    <ShowcaseAnatomy>
      <ShowcaseAnatomyContent name="Context Menu" code={anatomy} parts={parts} />
    </ShowcaseAnatomy>
  );
}

export function ApiReference() {
  return (
    <ShowcaseApiReference>
      <ShowcaseApiTable
        name="Context Menu"
        groups={groups.map(({ name, rows }) => ({
          piece: name,
          rows: rows.map(([prop, type, defaultValue, description]) => ({ prop, type, defaultValue, description, optional: name === "ContextMenuRadioGroup / RadioItem" && prop === "value" ? "Sí en el grupo" : "Sí" })),
        }))}
      />
      <ul className="list-disc space-y-2 pl-5 body-sm text-gray-bold/75">
        <li>Las piezas con nodo visible admiten <code>className</code>, <code>style</code> y <code>render</code>.</li>
        <li>Las flechas recorren las opciones. Enter o Espacio ejecutan la opción enfocada. Escape cierra el menú.</li>
        <li><code>Item</code>, <code>CheckboxItem</code>, <code>RadioItem</code> y <code>SubmenuTrigger</code> admiten <code>disabled</code>. Al personalizar el nodo, propaga sus eventos y referencia.</li>
      </ul>
    </ShowcaseApiReference>
  );
}
