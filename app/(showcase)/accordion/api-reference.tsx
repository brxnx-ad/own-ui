import { ShowcaseAnatomyContent, ShowcaseApiTable } from "@/components/shared/showcase-reference";
import { ShowcaseAnatomy, ShowcaseApiReference } from "@/components/shared/showcase";
const anatomy = `<Accordion>
  <AccordionItem value="details">
    <AccordionHeader>
      <AccordionTrigger>Detalles</AccordionTrigger>
    </AccordionHeader>
    <AccordionPanel>Contenido</AccordionPanel>
  </AccordionItem>
</Accordion>`;

const parts = [
  ["Accordion", "Agrupa los elementos y coordina su estado."],
  ["AccordionItem", "Vincula el encabezado con su panel."],
  ["AccordionHeader", "Aporta la jerarquía de encabezado; renderiza h3 por defecto."],
  ["AccordionTrigger", "Abre y cierra el panel; incluye el chevron decorativo."],
  ["AccordionPanel", "Contiene el contenido expandible y su transición."],
];

const groups = [
  { name: "Accordion", rows: [
    ["defaultValue", "Value[]", "[]", "Paneles abiertos inicialmente en modo no controlado."],
    ["value", "Value[]", "—", "Paneles abiertos en modo controlado. Usar con onValueChange; no combinar con defaultValue."],
    ["onValueChange", "(value: Value[], eventDetails) => void", "—", "Se ejecuta al solicitar un cambio desde el acordeón. Permite actualizar el estado controlado o cancelar mediante eventDetails.cancel()."],
    ["multiple", "boolean", "false", "Permite mantener varios paneles abiertos."],
    ["disabled", "boolean", "false", "Deshabilita la interacción con todos los elementos."],
    ["keepMounted", "boolean", "false", "Conserva los paneles cerrados en el DOM."],
    ["hiddenUntilFound", "boolean", "false", "Permite buscar contenido cerrado en navegadores compatibles. Prevalece sobre keepMounted."],
  ]},
  { name: "AccordionItem", rows: [
    ["value", "any", "ID generado", "Identifica el elemento. Define un valor estable para referenciarlo desde value o defaultValue de Accordion."],
    ["disabled", "boolean", "false", "Deshabilita este elemento; también hereda la deshabilitación de la raíz."],
    ["onOpenChange", "(open: boolean, eventDetails) => void", "—", "Se ejecuta al solicitar abrir o cerrar este elemento. Los cambios externos de props no disparan este callback."],
  ]},
  { name: "AccordionPanel", rows: [
    ["keepMounted", "boolean", "Hereda de Accordion", "Configura la persistencia para este panel."],
    ["hiddenUntilFound", "boolean", "Hereda de Accordion", "Configura la búsqueda para este panel y prevalece sobre keepMounted."],
  ]},
  { name: "AccordionTrigger", rows: [
    ["nativeButton", "boolean", "true", "Al sustituir el elemento con render, indica si sigue siendo un button nativo. Usa false si no lo es."],
  ]},
  { name: "Todas las piezas", rows: [
    ["className", "string | (state) => string", "—", "Añade clases estáticas o dependientes del estado."],
    ["style", "CSSProperties | (state) => CSSProperties", "—", "Añade estilos estáticos o dependientes del estado."],
    ["render", "ReactElement | (props, state) => ReactElement", "Elemento de cada pieza", "Sustituye el elemento renderizado. En la forma de función, propaga las props y ref recibidas para conservar comportamiento y accesibilidad."],
  ]},
];

export function Anatomy() {
  return (
    <ShowcaseAnatomy>
      <p className="body-sm text-content-base">Cinco piezas que se componen así:</p>
      <ShowcaseAnatomyContent name="Accordion" code={anatomy} parts={parts} />
    </ShowcaseAnatomy>
  );
}

export function ApiReference() {
  return (
    <ShowcaseApiReference>
      <p className="body-sm text-content-base">Opciones agrupadas por pieza. Todas son opcionales.</p>
      <ShowcaseApiTable
        name="Accordion"
        groups={groups.map((group) => ({
          piece: group.name,
          rows: group.rows.map(([name, type, defaultValue, description]) => ({ prop: name, type, defaultValue, description })),
        }))}
      />
      <dl className="space-y-2 body-sm text-content-base">
        <div><dt className="inline font-medium text-content-bold">Tipos: </dt><dd className="inline"><code>Value</code> es el tipo de identificador; <code>eventDetails</code> incluye el evento y el motivo del cambio.</dd></div>
        <div><dt className="inline font-medium text-content-bold">Accesibilidad: </dt><dd className="inline">Tab recorre los activadores; Enter y Espacio abren y cierran. Se respeta el movimiento reducido.</dd></div>
        <div><dt className="inline font-medium text-content-bold">Atributos: </dt><dd className="inline">Cada pieza acepta sus atributos HTML nativos.</dd></div>
        <div><dt className="inline font-medium text-content-bold">Compatibilidad: </dt><dd className="inline"><code>orientation</code> y <code>loopFocus</code> están obsoletos y ya no modifican el foco.</dd></div>
      </dl>
    </ShowcaseApiReference>
  );
}
