import { ShowcaseAnatomyContent, ShowcaseApiTable } from "@/components/shared/showcase-reference";
import { ShowcaseAnatomy, ShowcaseApiReference } from "@/components/shared/showcase";
const anatomy = `<Select items={opciones}>
  <SelectLabel>Formato</SelectLabel>
  <SelectTrigger>
    <SelectValue placeholder="Elige un formato" />
    <SelectIcon />
  </SelectTrigger>
  <SelectPortal>
    <SelectPositioner>
      <SelectPopup>
        <SelectList>
          {opciones.map(({ value, label }) => (
            <SelectItem key={value} value={value}>
              <SelectItemText>{label}</SelectItemText>
              <SelectItemIndicator />
            </SelectItem>
          ))}
        </SelectList>
      </SelectPopup>
    </SelectPositioner>
  </SelectPortal>
</Select>`;

const parts = [
  ["Select", "Coordina valor, apertura y formulario. No crea un contenedor visible."],
  ["SelectLabel", "Asocia el nombre visible al activador."],
  ["SelectTrigger", "Recibe el foco y abre el panel."],
  ["SelectValue", "Presenta el valor seleccionado o el texto de espera."],
  ["SelectIcon", "Muestra un chevron decorativo que gira al abrir el panel."],
  ["SelectPortal", "Traslada el panel y su fondo opcional al contenedor del portal."],
  ["SelectBackdrop", "Añade un fondo visual detrás del panel."],
  ["SelectPositioner", "Coloca el panel respecto al activador y resuelve colisiones."],
  ["SelectPopup", "Dibuja el panel y gestiona el retorno de foco."],
  ["SelectArrow", "Señala el anclaje en el modo de panel separado."],
  ["SelectList", "Contiene las opciones y el desplazamiento."],
  ["SelectItem", "Representa una opción seleccionable."],
  ["SelectItemText", "Proporciona el texto de la opción para la navegación y la alineación."],
  ["SelectItemIndicator", "Muestra la marca de selección."],
  ["SelectGroup / SelectGroupLabel", "Agrupan opciones y asocian el nombre del grupo."],
  ["SelectSeparator", "Dibuja una división visual entre opciones o grupos."],
  ["SelectScrollUpArrow / SelectScrollDownArrow", "Desplazan listas largas al pasar el puntero."],
];

const groups = [
  {
    piece: "Select",
    rows: [
      ["multiple", "boolean", "false", "Activa la selección múltiple y mantiene el panel abierto al alternar una opción."],
      ["value / defaultValue", "Value | null o readonly Value[]", "null o []", "Valor controlado o inicial, según el modo."],
      ["onValueChange", "(value, details: SelectChangeEventDetails) => void", "—", "Recibe el valor propuesto. El valor es Value | null o Value[] según el modo."],
      ["open / defaultOpen", "boolean", "false", "Apertura controlada o inicial."],
      ["onOpenChange / onOpenChangeComplete", "(open, details: SelectOpenChangeEventDetails) => void / (open: boolean) => void", "—", "Notifican la solicitud de cambio de apertura y la finalización de la transición."],
      ["items", "Mapa, lista de { value, label } o grupos", "—", "Resuelve las etiquetas en el activador. Renderiza SelectItem por cada opción."],
      ["itemToStringLabel / itemToStringValue", "(item: Value) => string", "—", "Define la etiqueta visible o la cadena de formulario para valores objeto."],
      ["isItemEqualToValue", "(item: Value, value: Value) => boolean", "Object.is", "Compara el valor de la opción con el seleccionado."],
      ["disabled / readOnly / required", "boolean", "false", "Bloquea la interacción, conserva el valor en solo lectura o exige selección."],
      ["name / form / autoComplete / id", "string", "—", "Asocia el campo al formulario y configura su identificación y autocompletado."],
      ["inputRef / actionsRef", "React.Ref<HTMLInputElement> / RefObject<SelectActions | null>", "—", "Accede al input oculto o a las acciones close() y unmount()."],
      ["modal / highlightItemOnHover", "boolean", "true", "Controla la modalidad del panel y el resaltado por puntero."],
    ],
  },
  {
    piece: "SelectTrigger",
    rows: [
      ["disabled / nativeButton", "boolean", "false / true", "Deshabilita el activador o indica si el elemento sustituido con render es un botón nativo."],
    ],
  },
  {
    piece: "SelectValue",
    rows: [
      ["placeholder / children", "ReactNode / ReactNode | ((value) => ReactNode)", "—", "Texto en vacío o formato explícito del valor. Una etiqueta de null en items también tiene precedencia sobre el placeholder."],
    ],
  },
  {
    piece: "SelectPortal",
    rows: [
      ["container", "HTMLElement | ShadowRoot | RefObject | null", "body", "Define el destino del portal. Elige uno que herede el tema."],
    ],
  },
  {
    piece: "SelectPositioner",
    rows: [
      ["alignItemWithTrigger", "boolean", "false", "Superpone la opción y el valor del activador si hay espacio. En táctil usa el posicionamiento separado."],
      ["side / align", "Side / 'start' | 'center' | 'end'", "'bottom' / 'center'", "Lado y alineación preferidos en el modo separado, sujetos a colisiones."],
      ["sideOffset / alignOffset", "number | ((data) => number)", "4 / 0", "Separación y desplazamiento en píxeles respecto del anclaje."],
      ["anchor / positionMethod / collision*", "Opciones de posicionamiento de Base UI", "Activador / absolute / según opción", "Permite elegir el anclaje, método y límites de colisión."],
    ],
  },
  {
    piece: "SelectPopup",
    rows: [
      ["finalFocus", "boolean | RefObject | ((closeType) => boolean | HTMLElement | null | void)", "Retorno predeterminado", "Controla a dónde vuelve el foco al cerrar."],
    ],
  },
  {
    piece: "SelectItem",
    rows: [
      ["value / label", "Value / string", "null / texto de la opción", "Identifica la opción y fija, si se indica, el texto que coincide con la búsqueda por teclado."],
      ["disabled / nativeButton", "boolean", "false", "Impide seleccionar esta opción o indica si se renderiza como un botón nativo."],
    ],
  },
  {
    piece: "Indicador y flechas de desplazamiento",
    rows: [
      ["keepMounted", "boolean", "false", "Mantiene el nodo de la pieza aunque no se necesite mostrar."],
    ],
  },
  {
    piece: "SelectSeparator",
    rows: [
      ["orientation", "'horizontal' | 'vertical'", "'horizontal'", "Elige el eje de la división visual."],
    ],
  },
  {
    piece: "Piezas DOM",
    rows: [
      ["className / style", "string / CSSProperties o función del estado", "—", "Aplica clases o estilos al nodo correspondiente."],
      ["render / ref", "ReactElement o función / React.Ref", "Elemento de la pieza / —", "Compone otro elemento o accede a él. Propaga las props, eventos y ref recibidos."],
    ],
  },
];

export function Anatomy() {
  return (
    <ShowcaseAnatomy>
      <p className="body-sm text-content-base">Compón el activador y las opciones, y añade las piezas de grupo, anclaje o desplazamiento según el contenido.</p>
      <ShowcaseAnatomyContent name="Select" code={anatomy} parts={parts} />
    </ShowcaseAnatomy>
  );
}

export function ApiReference() {
  return (
    <ShowcaseApiReference>
      <p className="body-sm text-content-base">El posicionador de own-ui usa un panel separado por defecto con una distancia de 4 px.</p>
      <ShowcaseApiTable
        name="Select"
        groups={groups.map(({ piece, rows }) => ({
          piece: piece,
          rows: rows.map(([name, type, defaultValue, description]) => ({ prop: name, type, defaultValue, description })),
        }))}
      />
      <ul className="body-sm list-disc space-y-2 ps-5 text-content-base">
        <li><code>details.reason</code> distingue motivos como <code>item-press</code> o <code>escape-key</code>. <code>details.cancel()</code> cancela el cambio asociado.</li>
        <li>Usa <code>Tab</code> para enfocar, flechas para recorrer, <code>Enter</code> o espacio para seleccionar y <code>Escape</code> para cerrar.</li>
        <li>Identifica el activador con <code>SelectLabel</code> o con un nombre accesible en <code>SelectTrigger</code>. En selección múltiple, <code>FormData.getAll()</code> recupera los valores del campo.</li>
      </ul>
    </ShowcaseApiReference>
  );
}
