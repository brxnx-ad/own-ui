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
    <section aria-labelledby="anatomy-heading" className="space-y-4">
      <h2 id="anatomy-heading" className="h3">Anatomía</h2>
      <p className="body-sm text-gray-bold/75">Cinco piezas que se componen así:</p>
      <pre aria-label="Composición de Accordion en JSX" className="overflow-x-auto rounded-2xl border border-gray-base bg-surface-base p-6 text-sm text-gray-bold"><code>{anatomy}</code></pre>
      <div className="overflow-x-auto rounded-2xl border border-gray-base bg-surface-base">
        <table className="w-full text-left body-sm">
          <caption className="sr-only">Piezas de Accordion y sus responsabilidades</caption>
          <thead className="bg-surface-bold"><tr><th scope="col" className="p-4">Pieza</th><th scope="col" className="p-4">Responsabilidad</th></tr></thead>
          <tbody>{parts.map(([name, description]) => <tr key={name} className="border-t border-gray-base"><th scope="row" className="p-4 font-mono text-xs">{name}</th><td className="p-4">{description}</td></tr>)}</tbody>
        </table>
      </div>
    </section>
  );
}

export function ApiReference() {
  return (
    <section aria-labelledby="api-heading" className="space-y-4">
      <h2 id="api-heading" className="h3">Referencia de API</h2>
      <p className="body-sm text-gray-bold/75">Opciones agrupadas por pieza. Todas son opcionales.</p>
      <div role="region" aria-label="Tabla de referencia de API" tabIndex={0} className="overflow-x-auto rounded-2xl border border-gray-base bg-surface-base focus-visible:outline-2 focus-visible:outline-primary-base">
        <table className="w-full min-w-3xl text-left body-sm">
          <caption className="sr-only">Opciones de Accordion, tipos, valores predeterminados y comportamiento</caption>
          <thead className="bg-surface-bold"><tr>{["Pieza", "Prop o callback", "Tipo", "Predeterminado", "Opcional", "Función"].map(label => <th key={label} scope="col" className="p-4">{label}</th>)}</tr></thead>
          {groups.map(group => <tbody key={group.name}>{group.rows.map(([name, type, defaultValue, description], index) => <tr key={name} className="border-t border-gray-base align-top">
            {index === 0 && <th scope="rowgroup" rowSpan={group.rows.length} className="p-4 font-medium">{group.name}</th>}
            <th scope="row" className="p-4 font-mono text-xs">{name}</th><td className="p-4 font-mono text-xs">{type}</td><td className="p-4">{defaultValue}</td><td className="p-4">Sí</td><td className="min-w-64 p-4">{description}</td>
          </tr>)}</tbody>)}
        </table>
      </div>
      <dl className="space-y-2 body-sm text-gray-bold/75">
        <div><dt className="inline font-medium text-gray-bold">Tipos: </dt><dd className="inline"><code>Value</code> es el tipo de identificador; <code>eventDetails</code> incluye el evento y el motivo del cambio.</dd></div>
        <div><dt className="inline font-medium text-gray-bold">Accesibilidad: </dt><dd className="inline">Tab recorre los activadores; Enter y Espacio abren y cierran. Se respeta el movimiento reducido.</dd></div>
        <div><dt className="inline font-medium text-gray-bold">Atributos: </dt><dd className="inline">Cada pieza acepta sus atributos HTML nativos.</dd></div>
        <div><dt className="inline font-medium text-gray-bold">Compatibilidad: </dt><dd className="inline"><code>orientation</code> y <code>loopFocus</code> están obsoletos y ya no modifican el foco.</dd></div>
      </dl>
    </section>
  );
}
