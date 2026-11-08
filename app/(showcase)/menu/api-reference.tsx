import { ShowcaseAnatomyContent, ShowcaseApiTable } from "@/components/shared/showcase-reference";
import { ShowcaseAnatomy, ShowcaseApiReference } from "@/components/shared/showcase";
const anatomy = `<Menu>
  <MenuTrigger>Acciones</MenuTrigger>
  <MenuPortal>
    <MenuPositioner align="start" sideOffset={6}>
      <MenuPopup>
        <MenuGroup>
          <MenuGroupLabel>Documento</MenuGroupLabel>
          <MenuItem>Duplicar</MenuItem>
        </MenuGroup>
        <MenuSeparator />
        <MenuSubmenu>
          <MenuSubmenuTrigger>Mover a</MenuSubmenuTrigger>
          <MenuPortal>
            <MenuPositioner>
              <MenuPopup>
                <MenuItem>Archivo</MenuItem>
              </MenuPopup>
            </MenuPositioner>
          </MenuPortal>
        </MenuSubmenu>
      </MenuPopup>
    </MenuPositioner>
  </MenuPortal>
</Menu>`;

const parts = [
  ["Menu · MenuTrigger", "La raíz coordina la apertura y el activador abre el menú desde un botón."],
  ["MenuPortal · MenuBackdrop", "El portal aloja el panel y puede incluir un fondo visual antes del posicionador."],
  ["MenuPositioner · MenuPopup · MenuArrow", "Posicionan el panel, contienen las opciones y, opcionalmente, señalan el ancla."],
  ["MenuGroup · MenuGroupLabel · MenuSeparator", "Agrupan, nombran y separan opciones relacionadas."],
  ["MenuItem · MenuLinkItem", "Ejecutan una acción o navegan a un destino."],
  ["MenuCheckboxItem · MenuCheckboxItemIndicator", "Cambian una preferencia booleana y muestran una marca."],
  ["MenuRadioGroup · MenuRadioItem · MenuRadioItemIndicator", "Coordinan una elección exclusiva y muestran un punto."],
  ["MenuSubmenu · MenuSubmenuTrigger", "Asocian una fila del menú padre con el panel hijo."],
  ["MenuViewport", "Gestiona el contenido entrante y saliente cuando el consumidor anima un cambio de activador."],
  ["MenuFilterProvider · MenuInput · MenuClear · MenuList · MenuEmpty", "Coordinan la búsqueda, el borrado de la consulta, la lista y el mensaje sin coincidencias."],
  ["createMenuHandle · MenuHandle · useMenuFilter", "Crean un handle tipado para activadores separados y ofrecen comparadores para filtros propios."],
];

type Row = [prop: string, type: string, initial: string, description: string, required?: true];

const groups: { part: string; rows: Row[] }[] = [
  { part: "Menu y MenuSubmenu", rows: [
    ["open / defaultOpen", "boolean", "— / false", "Controla la apertura o establece su estado inicial."],
    ["onOpenChange", "(open: boolean, details: ChangeDetails) => void", "—", "Recibe solicitudes de apertura o cierre. details.cancel() cancela el cambio."],
    ["onOpenChangeComplete", "(open: boolean) => void", "—", "Se ejecuta al terminar la transición de apertura o cierre."],
    ["onItemHighlighted", "(item: HTMLElement | undefined, details: HighlightDetails) => void", "—", "Informa el resaltado por teclado, puntero u otro cambio. Los detalles incluyen label."],
    ["orientation / loopFocus", "'vertical' | 'horizontal' / boolean", "'vertical' / true", "Elige el eje de navegación y si las flechas vuelven al extremo opuesto."],
    ["highlightItemOnHover / disabled", "boolean", "true / false", "Controla el resaltado con puntero o deshabilita la raíz."],
    ["actionsRef", "RefObject<Actions | null>", "—", "Expone close() y unmount() para controlar el cierre imperativo y su desmontaje."],
    ["closeParentOnEsc", "boolean", "false", "En submenús, permite cerrar toda la cadena con Escape."],
  ]},
  { part: "Menu", rows: [
    ["modal", "boolean", "true", "Limita la interacción exterior del menú superior. La apertura por hover no es modal."],
    ["triggerId / defaultTriggerId", "string | null", "—", "Vincula el id del activador en modo controlado o cuando empieza abierto."],
    ["handle / children", "MenuHandle<Payload> / ReactNode | (({ payload }) => ReactNode)", "—", "Conecta activadores externos y permite leer el payload activo."],
  ]},
  { part: "MenuTrigger", rows: [
    ["handle / payload", "MenuHandle<Payload> / Payload", "—", "Asocia el botón externo y aporta datos a la raíz."],
    ["disabled / nativeButton", "boolean", "false / true", "Deshabilita el botón o adapta la semántica cuando render cambia el elemento."],
  ]},
  { part: "MenuTrigger y MenuSubmenuTrigger", rows: [
    ["openOnHover / delay / closeDelay", "boolean / number / number", "Según la pieza / 100 / 0", "Activa la apertura por puntero y configura sus demoras en ms. Un activador superior aislado abre por pulsación y un submenú abre también por hover."],
  ]},
  { part: "MenuPortal", rows: [
    ["container / keepMounted", "HTMLElement | ShadowRoot | ref | null / boolean", "body / false", "Elige el destino y si el contenido cerrado permanece montado."],
  ]},
  { part: "MenuPositioner", rows: [
    ["side / align", "Side / Align", "bottom / center", "Indica la colocación preferida. Un submenú usa inline-end y start."],
    ["sideOffset / alignOffset", "number | OffsetFunction", "0", "Desplaza el panel en el eje del lado o de alineación."],
    ["anchor / positionMethod", "Element | VirtualElement | ref | función | null / 'absolute' | 'fixed'", "Activador / absolute", "Cambia el punto de referencia o la estrategia CSS."],
    ["collisionBoundary / collisionPadding / collisionAvoidance", "Boundary / Padding / CollisionAvoidance", "clipping-ancestors / 5 / según contexto", "Define dónde y cómo se reajusta el panel para que quepa."],
    ["arrowPadding / sticky / disableAnchorTracking", "number / boolean / boolean", "5 / false / false", "Restringe el recorrido de la flecha o ajusta el seguimiento del ancla."],
  ]},
  { part: "MenuPopup", rows: [
    ["finalFocus", "boolean | ref | ((interactionType) => boolean | HTMLElement | null | void)", "Foco de Base UI", "Elige el destino del foco al cerrar o evita moverlo con false."],
    ["aria-label / aria-labelledby", "string", "Según la composición", "Aporta un nombre accesible al diálogo cuando se usa un filtro."],
  ]},
  { part: "Items y MenuSubmenuTrigger", rows: [
    ["label / id", "string", "Texto / generado", "Define el texto para búsqueda o navegación por escritura y el identificador del elemento."],
    ["disabled / nativeButton", "boolean", "false", "Disponible en acciones, casillas, radios y activadores de submenú. Usa nativeButton si render devuelve button."],
    ["closeOnClick", "boolean", "true en Item", "En LinkItem, CheckboxItem y RadioItem vale false. MenuSubmenuTrigger abre el submenú."],
  ]},
  { part: "MenuLinkItem", rows: [
    ["href", "string", "—", "Atributo HTML del enlace. Proporciónalo aquí o mediante el Link compuesto con render."],
  ]},
  { part: "MenuCheckboxItem", rows: [
    ["checked / defaultChecked", "boolean", "— / false", "Controla el marcado o establece el estado inicial."],
    ["onCheckedChange", "(checked: boolean, details: ChangeDetails) => void", "—", "Se ejecuta al activar la casilla. El motivo es item-press y permite cancelar el cambio."],
  ]},
  { part: "MenuRadioGroup", rows: [
    ["value / defaultValue / disabled", "any / any / boolean", "— / — / false", "Controla la selección, define la inicial o deshabilita el grupo."],
    ["onValueChange", "(value: any, details: ChangeDetails) => void", "—", "Se ejecuta al cambiar de opción. El motivo es item-press y permite cancelar el cambio."],
  ]},
  { part: "MenuRadioItem", rows: [
    ["value", "any", "—", "Valor que identifica esta opción dentro de su grupo.", true],
  ]},
  { part: "Indicadores", rows: [
    ["keepMounted / children", "boolean / ReactNode", "false / marca propia", "Conserva el espacio cuando el indicador está desmarcado o sustituye su contenido."],
  ]},
  { part: "MenuSeparator", rows: [
    ["orientation", "'horizontal' | 'vertical'", "'horizontal'", "Cambia el eje visual y semántico del separador."],
  ]},
  { part: "MenuFilterProvider", rows: [
    ["filter / locale", "((text: string, query: string) => boolean) | null / Intl.LocalesArgument", "Contiene / entorno", "Configura la comparación o usa null si filtras los elementos externamente."],
    ["autoHighlight", "boolean | 'always'", "false", "Resalta la primera coincidencia con consulta o también con la consulta vacía."],
    ["value / defaultValue", "string", "— / ''", "Controla la consulta o establece su valor inicial."],
    ["onValueChange", "(value: string, details: FilterDetails) => void", "—", "Recibe escritura, borrado y reinicio al cerrar. details.cancel() cancela el cambio."],
  ]},
  { part: "MenuClear", rows: [
    ["disabled / nativeButton", "boolean", "false / true", "Deshabilita el borrado o ajusta su semántica al componer otro elemento."],
  ]},
  { part: "Piezas con nodo", rows: [
    ["className", "string | ((state) => string | undefined)", "Clases de la pieza", "Añade clases estáticas o dependientes del estado."],
    ["style", "CSSProperties | ((state) => CSSProperties | undefined)", "—", "Aplica estilos al nodo renderizado."],
    ["render", "ReactElement | ((props, state) => ReactElement)", "Elemento de cada pieza", "Cambia el elemento y conserva el contrato accesible si propaga las props y la ref."],
  ]},
];

export function Anatomy() {
  return (
    <ShowcaseAnatomy>
      <ShowcaseAnatomyContent name="Menu" code={anatomy} parts={parts} />
    </ShowcaseAnatomy>
  );
}

export function ApiReference() {
  return (
    <ShowcaseApiReference>
      <ShowcaseApiTable
        name="Menu"
        groups={groups.map(({ part, rows }) => ({
          piece: part,
          rows: rows.map(([prop, type, initial, description, required]) => ({ prop, type, defaultValue: initial, description, optional: required ? "No" : "Sí" })),
        }))}
      />
      <ul className="body-sm list-disc space-y-2 ps-5 text-gray-bold/75">
        <li><code>Side</code> admite lados físicos y lógicos. <code>Align</code> admite <code>start</code>, <code>center</code> y <code>end</code>.</li>
        <li>Los detalles de cambio incluyen el evento y su motivo. Entre los motivos de apertura y cierre están <code>trigger-press</code>, <code>outside-press</code>, <code>item-press</code> y <code>escape-key</code>.</li>
        <li>El teclado permite abrir desde el botón, recorrer las opciones con flechas y cerrar con Escape. El panel respeta el movimiento reducido.</li>
        <li>Las piezas aceptan los atributos de su elemento HTML. El activador raíz tiene estilo propio y también admite composición con <code>render</code>.</li>
      </ul>
    </ShowcaseApiReference>
  );
}
