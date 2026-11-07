const anatomy = `<Combobox items={cities}>
  <label htmlFor="city">Ciudad</label>
  <ComboboxInputGroup>
    <ComboboxInput id="city" />
    <ComboboxClear aria-label="Limpiar selección" />
    <ComboboxTrigger aria-label="Mostrar opciones" />
  </ComboboxInputGroup>
  <ComboboxPortal>
    <ComboboxPositioner>
      <ComboboxPopup>
        <ComboboxEmpty>No hay coincidencias.</ComboboxEmpty>
        <ComboboxList>
          {(city: string) => (
            <ComboboxItem key={city} value={city}>
              <span>{city}</span>
              <ComboboxItemIndicator />
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxPopup>
    </ComboboxPositioner>
  </ComboboxPortal>
</Combobox>`;

const parts = [
  ["Combobox","Coordina la selección, la consulta, la apertura y el formulario."],
  ["Label, Value","Nombran el activador y muestran su selección cuando la búsqueda está dentro del panel."],
  ["InputGroup, Input, Trigger, Icon, Clear","Componen el campo, su activador y la acción de limpiar."],
  ["Chips, Chip, ChipRemove","Muestran y permiten quitar valores en selección múltiple."],
  ["Portal, Backdrop, Positioner, Popup, Arrow","Ubican, muestran y decoran el panel flotante."],
  ["Status, Empty","Anuncian estados y el resultado de una búsqueda sin coincidencias."],
  ["List, Collection, Row, Group, GroupLabel, Separator","Organizan y recorren las opciones filtradas."],
  ["Item, ItemIndicator","Representan una opción y su marca de selección."],
];

const groups = [
  { name: "Combobox", rows: [
    ["items","readonly Item[] | Group<Item>[] | colección","—","Fuente de datos. Cada Item debe recibir su valor de selección."],
    ["multiple","boolean","false","Selecciona varios valores y devuelve un arreglo en onValueChange."],
    ["value / defaultValue","Value | readonly Value[] | null","—","Selección controlada o inicial. Usa null en selección única vacía y [] en múltiple."],
    ["onValueChange","(value, details) => void","—","Notifica la selección. En modo único, puede recibir null. details.cancel() cancela el cambio."],
    ["inputValue / defaultInputValue","InputHTMLAttributes<HTMLInputElement>['value']","—","Texto de búsqueda controlado o inicial, independiente de la selección."],
    ["onInputValueChange","(text: string, details) => void","—","Notifica los cambios del texto, incluidos los reinicios hechos por la primitiva."],
    ["open / defaultOpen","boolean","false sin control","Apertura controlada o inicial del panel."],
    ["onOpenChange","(open: boolean, details) => void","—","Notifica una solicitud de apertura o cierre. Puede cancelarse."],
    ["onOpenChangeComplete","(open: boolean) => void","—","Notifica después de las animaciones de apertura o cierre."],
    ["filter / filteredItems","Función | null / readonly Item[] | readonly Group<Item>[]","Filtro interno","Personalizan el filtro o proporcionan resultados externos. filter=null desactiva el filtro interno."],
    ["itemToStringLabel / itemToStringValue","(value: Value) => string","Según valor","Resuelven texto visible y valor de formulario para objetos."],
    ["isItemEqualToValue","(item: Value, value: Value) => boolean","Object.is","Compara opciones y selección con referencias distintas."],
    ["name / form","string","—","Identifican el campo y el formulario asociado."],
    ["disabled / readOnly / required","boolean","false","Bloquean interacción, impiden cambiar la selección o exigen una opción."],
    ["autoHighlight / loopFocus / highlightItemOnHover","boolean","false / true / true","Configuran el resaltado automático, el recorrido con flechas y el puntero."],
    ["openOnInputClick / modal","boolean","true / false","Controlan la apertura desde el campo y la interacción fuera del panel."],
    ["limit","number","-1","Limita la cantidad de resultados. -1 permite todos."],
  ] },
  { name: "ComboboxList / Collection", rows: [
    ["children","ReactNode | (item, index) => ReactNode","—","List acepta nodos o una función. Collection requiere una función para recorrer un grupo."],
  ] },
  { name: "ComboboxItem", rows: [
    ["value / disabled / index","Value / boolean / number","null / false / automático","Identifica la opción, la deshabilita o declara su índice al virtualizar."],
  ] },
  { name: "Clear / Portal / ItemIndicator", rows: [
    ["keepMounted","boolean","false","Conserva el nodo cuando queda inactivo. El control de limpieza y el indicador se ocultan visualmente."],
  ] },
  { name: "ComboboxPortal", rows: [
    ["container","HTMLElement | ShadowRoot | RefObject | null","body","Define dónde se inserta el portal."],
  ] },
  { name: "ComboboxPositioner", rows: [
    ["anchor / side / align","Ancla / Side / Align","Automático / bottom / center","Controlan el anclaje y la colocación. Base UI ajusta la posición ante colisiones."],
    ["sideOffset","number | OffsetFunction","4","Separa el panel del ancla. Valor predeterminado de own-ui."],
  ] },
  { name: "ComboboxPopup", rows: [
    ["initialFocus / finalFocus","boolean | RefObject | función","Comportamiento de Base UI","Controlan el foco al abrir y al cerrar el panel."],
  ] },
];

export function Anatomy() {
  return (
    <section aria-labelledby="anatomy-heading" className="space-y-4">
      <h2 id="anatomy-heading" className="h3">Anatomía</h2>
      <pre aria-label="Composición de Combobox en JSX" className="overflow-x-auto rounded-2xl border border-gray-base bg-surface-base p-6 text-sm text-gray-bold">
        <code>{anatomy}</code>
      </pre>
      <div className="overflow-x-auto rounded-2xl border border-gray-base bg-surface-base">
        <table className="w-full text-left body-sm">
          <caption className="sr-only">Piezas de Combobox y sus responsabilidades</caption>
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
      <div role="region" aria-label="Tabla de referencia de API" tabIndex={0} className="overflow-x-auto rounded-2xl border border-gray-base bg-surface-base focus-visible:outline-2 focus-visible:outline-primary-base">
        <table className="w-full min-w-3xl text-left body-sm">
          <caption className="sr-only">Opciones de Combobox, tipos, valores predeterminados y comportamiento</caption>
          <thead className="bg-surface-bold">
            <tr>
              {["Pieza", "Prop o callback", "Tipo", "Predeterminado", "Opcional", "Función"].map((label) => (
                <th key={label} scope="col" className="p-4">{label}</th>
              ))}
            </tr>
          </thead>
          {groups.map(({ name, rows }) => (
            <tbody key={name}>
              {rows.map(([prop, type, defaultValue, description], index) => (
                <tr key={prop} className="border-t border-gray-base align-top">
                  {index === 0 && <th scope="rowgroup" rowSpan={rows.length} className="p-4 font-medium">{name}</th>}
                  <th scope="row" className="p-4 font-mono text-xs">{prop}</th>
                  <td className="p-4 font-mono text-xs">{type}</td>
                  <td className="p-4">{defaultValue}</td>
                  <td className="p-4">{name === "ComboboxList / Collection" ? "Sí en List" : "Sí"}</td>
                  <td className="min-w-64 p-4">{description}</td>
                </tr>
              ))}
            </tbody>
          ))}
        </table>
      </div>
      <ul className="list-disc space-y-2 pl-5 body-sm text-gray-bold/75">
        <li>Las piezas con nodo visible admiten <code>className</code>, <code>style</code> y <code>render</code> según los tipos de Base UI.</li>
        <li><code>createComboboxItems</code> separa los datos que renderiza la lista del valor que guarda el formulario. Los hooks de filtrado mantienen los tipos de Base UI.</li>
        <li>Las flechas recorren la lista, Enter selecciona la opción resaltada y Escape cierra el panel.</li>
      </ul>
    </section>
  );
}
