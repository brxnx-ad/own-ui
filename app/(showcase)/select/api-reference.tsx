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
    <section aria-labelledby="anatomy-heading" className="space-y-4">
      <h2 id="anatomy-heading" className="h3">Anatomía</h2>
      <p className="body-sm text-gray-bold/75">Compón el activador y las opciones, y añade las piezas de grupo, anclaje o desplazamiento según el contenido.</p>
      <pre aria-label="Composición de Select en JSX" className="overflow-x-auto rounded-2xl border border-gray-base bg-surface-base p-6 text-sm">
        <code>{anatomy}</code>
      </pre>
      <div className="overflow-x-auto rounded-2xl border border-gray-base bg-surface-base">
        <table className="body-sm w-full text-left">
          <caption className="sr-only">Piezas de Select y sus responsabilidades</caption>
          <thead className="bg-surface-bold">
            <tr><th scope="col" className="p-4">Pieza</th><th scope="col" className="p-4">Responsabilidad</th></tr>
          </thead>
          <tbody>
            {parts.map(([name, description]) => (
              <tr key={name} className="border-t border-gray-base">
                <th scope="row" className="p-4 font-mono text-xs">{name}</th>
                <td className="p-4">{description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export function ApiReference() {
  return (
    <section aria-labelledby="api-heading" className="space-y-4">
      <h2 id="api-heading" className="h3">Referencia de API</h2>
      <p className="body-sm text-gray-bold/75">El posicionador de own-ui usa un panel separado por defecto con una distancia de 4 px.</p>
      <div role="region" aria-label="Tabla de referencia de API" tabIndex={0} className="overflow-x-auto rounded-2xl border border-gray-base bg-surface-base focus-visible:outline-2 focus-visible:outline-gray-bold">
        <table className="body-sm w-full min-w-3xl text-left">
          <caption className="sr-only">Props, tipos y valores predeterminados de Select</caption>
          <thead className="bg-surface-bold">
            <tr>
              {["Pieza", "Prop o callback", "Tipo", "Predeterminado", "Opcional", "Función"].map((label) => (
                <th key={label} scope="col" className="p-4">{label}</th>
              ))}
            </tr>
          </thead>
          {groups.map(({ piece, rows }) => (
            <tbody key={piece}>
              {rows.map(([name, type, defaultValue, description], index) => (
                <tr key={name} className="border-t border-gray-base align-top">
                  {index === 0 && <th scope="rowgroup" rowSpan={rows.length} className="p-4 font-medium">{piece}</th>}
                  <th scope="row" className="p-4 font-mono text-xs">{name}</th>
                  <td className="min-w-40 p-4 font-mono text-xs">{type}</td>
                  <td className="p-4">{defaultValue}</td>
                  <td className="p-4">Sí</td>
                  <td className="min-w-60 p-4">{description}</td>
                </tr>
              ))}
            </tbody>
          ))}
        </table>
      </div>
      <ul className="body-sm list-disc space-y-2 ps-5 text-gray-bold/75">
        <li><code>details.reason</code> distingue motivos como <code>item-press</code> o <code>escape-key</code>. <code>details.cancel()</code> cancela el cambio asociado.</li>
        <li>Usa <code>Tab</code> para enfocar, flechas para recorrer, <code>Enter</code> o espacio para seleccionar y <code>Escape</code> para cerrar.</li>
        <li>Identifica el activador con <code>SelectLabel</code> o con un nombre accesible en <code>SelectTrigger</code>. En selección múltiple, <code>FormData.getAll()</code> recupera los valores del campo.</li>
      </ul>
    </section>
  );
}
