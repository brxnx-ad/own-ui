import { ShowcaseAnatomyContent, ShowcaseApiTable } from "@/components/shared/showcase-reference";
import { ShowcaseAnatomy, ShowcaseApiReference } from "@/components/shared/showcase";
const anatomy = `import {
  Autocomplete, AutocompleteClear, AutocompleteEmpty, AutocompleteInput,
  AutocompleteInputGroup, AutocompleteItem, AutocompleteList,
  AutocompletePopup, AutocompletePortal, AutocompletePositioner,
  AutocompleteTrigger,
} from "@/components/own/base/autocomplete";

<Autocomplete items={["Santiago", "Valdivia"]}>
  <label htmlFor="city">Ciudad</label>
  <AutocompleteInputGroup>
    <AutocompleteInput id="city" />
    <AutocompleteClear aria-label="Borrar texto" />
    <AutocompleteTrigger aria-label="Mostrar sugerencias" />
  </AutocompleteInputGroup>
  <AutocompletePortal>
    <AutocompletePositioner>
      <AutocompletePopup>
        <AutocompleteEmpty>Sin sugerencias.</AutocompleteEmpty>
        <AutocompleteList>
          {(city: string) => (
            <AutocompleteItem key={city} value={city}>{city}</AutocompleteItem>
          )}
        </AutocompleteList>
      </AutocompletePopup>
    </AutocompletePositioner>
  </AutocompletePortal>
</Autocomplete>`;

const parts = [
  ["Autocomplete", "Coordina el texto, la apertura y las sugerencias sin añadir un elemento HTML."],
  ["AutocompleteInputGroup", "Agrupa el campo y sus controles en un div que sirve de ancla."],
  ["AutocompleteInput", "Input que recibe texto libre y gestiona la navegación por teclado."],
  ["AutocompleteTrigger", "Botón opcional que abre o cierra las sugerencias; incluye un chevron."],
  ["AutocompleteIcon", "Span decorativo que admite un icono personalizado."],
  ["AutocompleteClear", "Botón con icono de cierre que borra el texto y enfoca el campo."],
  ["AutocompleteValue", "Muestra el valor actual o lo entrega a una función de renderizado."],
  ["AutocompletePortal", "Monta las piezas flotantes en otro contenedor del DOM."],
  ["AutocompleteBackdrop", "Div que cubre el fondo si el consumidor decide mostrarlo."],
  ["AutocompletePositioner", "Div que ancla y posiciona el panel con relación al campo."],
  ["AutocompletePopup", "Div que contiene la lista y sus mensajes."],
  ["AutocompleteArrow", "Div decorativo que apunta hacia el ancla desde el panel."],
  ["AutocompleteStatus", "Región viva para mensajes como el progreso de una búsqueda."],
  ["AutocompleteEmpty", "Región viva que muestra su contenido cuando faltan resultados."],
  ["AutocompleteList", "Div que organiza las sugerencias como lista o cuadrícula."],
  ["AutocompleteItem", "Div interactivo que completa el campo con una sugerencia."],
  ["AutocompleteRow", "Div que agrupa las opciones de una fila cuando se usa grid."],
  ["AutocompleteGroup", "Div que reúne opciones relacionadas dentro de la lista."],
  ["AutocompleteGroupLabel", "Div que asigna un nombre accesible al grupo que lo contiene."],
  ["AutocompleteSeparator", "Div que separa visualmente opciones o grupos."],
  ["AutocompleteCollection", "Renderiza las opciones filtradas de su contexto sin añadir un nodo."],
];

const groups = [
  { part: "Autocomplete", rows: [
    ["items / filteredItems", "readonly Item[] | readonly Group<Item>[]", "—", "Sí", "Colección plana o agrupada. filteredItems controla externamente los resultados y conserva la estructura de items."],
    ["filter", "((item, query, itemToString?) => boolean) | null", "Coincidencia parcial", "Sí", "Cambia el criterio de filtrado. Usa null para mostrar la colección sin filtrar."],
    ["itemToStringValue", "(item: Item) => string", "—", "Sí", "Obtiene el texto de un objeto para el campo y el formulario. Los objetos con forma { value, label } usan label automáticamente."],
    ["mode", '"list" | "both" | "inline" | "none"', '"list"', "Sí", "list y both filtran la lista; both e inline previsualizan en el campo la opción resaltada por teclado."],
    ["value / defaultValue", "Valor de input de React", 'defaultValue: ""', "Sí", "Configura el texto controlado o su valor inicial. Actualiza el valor controlado desde onValueChange."],
    ["onValueChange", "(value: string, details) => void", "—", "Sí", "Notifica cambios de texto por escritura, elección de una sugerencia o limpieza del campo."],
    ["open / defaultOpen", "boolean", "defaultOpen: false", "Sí", "Controla la apertura del panel o define su estado inicial."],
    ["onOpenChange", "(open: boolean, details) => void", "—", "Sí", "Notifica solicitudes de apertura o cierre; admite details.cancel() y details.preventUnmountOnClose()."],
    ["onOpenChangeComplete", "(open: boolean) => void", "—", "Sí", "Se ejecuta cuando termina la apertura o el cierre, incluida la transición."],
    ["onItemHighlighted", "(item: Item | undefined, details) => void", "—", "Sí", "Notifica cambios de opción resaltada con motivo keyboard, pointer o none y el índice correspondiente."],
    ["autoHighlight", 'boolean | "always"', "false", "Sí", "Resalta la primera coincidencia al escribir o desde la apertura con always."],
    ["keepHighlight / highlightItemOnHover", "boolean", "false / true", "Sí", "Configura si el resaltado se mantiene al salir de la lista y si responde al puntero."],
    ["openOnInputClick", "boolean", "false", "Sí", "Permite abrir las sugerencias con un clic en el campo."],
    ["loopFocus", "boolean", "true", "Sí", "Permite volver al campo al recorrer la lista más allá de sus extremos."],
    ["limit / locale", "number / Intl.LocalesArgument", "-1 / idioma del navegador", "Sí", "Limita el número de resultados y configura la comparación de texto. El valor -1 deja el resultado sin límite."],
    ["disabled / readOnly / required", "boolean", "false", "Sí", "Deshabilita la familia, impide editar el texto o exige un valor para el formulario, respectivamente."],
    ["name / form / submitOnItemClick", "string / string / boolean", "— / — / false", "Sí", "Define la clave de envío, el ID del formulario y si aceptar una sugerencia lo envía."],
    ["id / inputRef", "string / Ref<HTMLInputElement>", "—", "Sí", "Define el identificador de la familia y permite acceder al input oculto; usa ref en AutocompleteInput para acceder al campo visible."],
    ["inline / modal / grid / virtualized", "boolean", "false", "Sí", "Configura lista sin popup (con open), interacción modal, filas navegables o virtualización externa."],
    ["actionsRef", "RefObject<Actions | null>", "—", "Sí", "Expone close() y unmount(). Usa unmount() tras una animación externa si suspendiste el desmontaje."],
  ]},
  { part: "AutocompleteInput", rows: [
    ["disabled", "boolean", "false", "Sí", "Deshabilita el campo; la deshabilitación de la raíz también se aplica."],
  ]},
  { part: "AutocompleteTrigger / Clear", rows: [
    ["disabled / nativeButton", "boolean", "false / true", "Sí", "Controla la deshabilitación local y si el elemento indicado por render sigue siendo un botón nativo."],
    ["children / aria-label", "ReactNode / string", "Icono de cada pieza / —", "Sí", "Sustituye el icono predeterminado y da un nombre accesible al botón si solo muestra un icono."],
  ]},
  { part: "AutocompleteClear", rows: [
    ["keepMounted", "boolean", "false", "Sí", "Mantiene el botón en el DOM incluso cuando el campo está vacío; data-visible indica cuándo hay texto."],
  ]},
  { part: "AutocompletePortal", rows: [
    ["container / keepMounted", "HTMLElement | ShadowRoot | RefObject | null / boolean", "Portal padre o body / false", "Sí", "Define el destino del portal y si permanece montado al cerrar. Un destino null difiere el montaje."],
  ]},
  { part: "AutocompletePositioner", rows: [
    ["anchor / side / align", "Element | RefObject | VirtualElement | (() => Element | VirtualElement | null) | null / Side / Align", "Ancla automática / bottom / center", "Sí", "Cambia la referencia y la ubicación preferida. Base UI ajusta el panel ante colisiones."],
    ["sideOffset / alignOffset", "number | (position) => number", "4 / 0", "Sí", "Separa el panel del ancla y ajusta su desplazamiento en el eje de alineación."],
  ]},
  { part: "AutocompletePopup", rows: [
    ["initialFocus / finalFocus", "boolean | RefObject | (interaction) => HTMLElement | boolean | void | null", "Comportamiento de Base UI", "Sí", "Configura el foco al abrir o cerrar el panel."],
  ]},
  { part: "AutocompleteList / Collection", rows: [
    ["children", "(item, index) => ReactNode", "—", "Solo List", "Renderiza la colección filtrada. List acepta también nodos JSX; Collection requiere una función."],
  ]},
  { part: "AutocompleteItem", rows: [
    ["value / disabled / index", "Item / boolean / number", "— / false / automático", "Sí", "Pasa el elemento que estás renderizando, marca una opción deshabilitada o fija su índice al virtualizar."],
    ["nativeButton", "boolean", "false", "Sí", "Indica si la opción se renderiza como un botón nativo."],
  ]},
  { part: "AutocompleteGroup", rows: [
    ["items", "readonly Item[]", "—", "Sí", "Proporciona las opciones del grupo al AutocompleteCollection anidado."],
  ]},
  { part: "AutocompleteSeparator", rows: [
    ["orientation", '"horizontal" | "vertical"', '"horizontal"', "Sí", "Configura el eje del separador."],
  ]},
  { part: "AutocompleteValue", rows: [
    ["children", "ReactNode | (value: string) => ReactNode", "Texto actual", "Sí", "Personaliza la presentación del valor sin añadir un elemento propio."],
  ]},
  { part: "Piezas con nodo", rows: [
    ["className / style", "string / CSSProperties o funciones de estado", "Clases de la pieza", "Sí", "Añade clases y estilos estáticos o calculados según el estado de la pieza."],
    ["render", "ReactElement | (props, state) => ReactElement", "Elemento de la pieza", "Sí", "Sustituye el elemento. Propaga los atributos, eventos y refs recibidos al componerlo."],
  ]},
];

export function Anatomy() {
  return (
    <ShowcaseAnatomy id="autocomplete-anatomy">
      <ShowcaseAnatomyContent name="Autocomplete" code={anatomy} parts={parts} />
    </ShowcaseAnatomy>
  );
}

export function ApiReference() {
  return (
    <ShowcaseApiReference id="autocomplete-api">
      <ShowcaseApiTable
        name="Autocomplete"
        groups={groups.map(({ part, rows }) => ({
          piece: part,
          rows: rows.map(([name, type, defaultValue, optional, description]) => ({ prop: name, type, defaultValue, description, optional })),
        }))}
      />
      <ul className="space-y-2 body-sm text-content-base">
        <li><code>useAutocompleteFilter</code> ofrece coincidencia parcial, inicial y final. <code>useAutocompleteFilteredItems</code> lee los resultados dentro de <code>Autocomplete</code>.</li>
        <li>Los detalles de cambio indican el motivo mediante <code>reason</code>, por ejemplo <code>input-change</code>, <code>item-press</code>, <code>clear-press</code> o <code>escape-key</code>.</li>
        <li>Asocia una etiqueta visible con el campo. Las flechas recorren las opciones, Enter acepta la opción resaltada y Escape cierra el panel.</li>
        <li>Las piezas que renderizan un elemento aceptan sus atributos HTML. El panel y el fondo respetan la preferencia de movimiento reducido.</li>
      </ul>
    </ShowcaseApiReference>
  );
}
