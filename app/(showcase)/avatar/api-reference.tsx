const anatomy = `<Avatar role="img" aria-label="Elena Marín">
  <AvatarFallback>EM</AvatarFallback>
  <AvatarImage src="/showcase/avatar.svg" alt="" />
</Avatar>`;

const parts = [
  ["Avatar", "Renderiza un span que define el tamaño y coordina el estado de la imagen."],
  ["AvatarFallback", "Renderiza un span con el contenido alternativo mientras la imagen no está disponible."],
  ["AvatarImage", "Renderiza el img que ocupa la caja del avatar."],
];

const groups = [
  { name: "Avatar", rows: [
    ["size", '"sm" | "md" | "lg"', '"md"', "Ajusta la caja y el texto a 32, 40 o 48 px de lado con la escala base."],
  ] },
  { name: "AvatarFallback", rows: [
    ["delay", "number", "0", "Milisegundos desde el montaje antes de permitir que aparezca el contenido alternativo."],
  ] },
  { name: "AvatarImage", rows: [
    ["src / srcSet", "string", "—", "Fuente de la imagen o conjunto de fuentes. Usa sizes cuando corresponda."],
    ["alt", "string", "—", "Alternativa textual. Usa una cadena vacía si la raíz o un texto adyacente ya identifica a la persona."],
    ["keepMounted", "boolean", "false", "Mantiene el img en el DOM y carga la imagen en el propio nodo. Permite usar loading=\"lazy\" y componer con next/image."],
    ["onLoadingStatusChange", "(status: ImageLoadingStatus) => void", "—", "Notifica loading, loaded o error. Recibe el estado sin detalles de evento ni mecanismo de cancelación."],
  ] },
  { name: "Todas las piezas", rows: [
    ["className", "string | (state) => string | undefined", "—", "Combina clases adicionales estáticas o dependientes del estado con las clases base."],
    ["style", "CSSProperties | (state) => CSSProperties | undefined", "—", "Aplica estilos inline al nodo de la pieza."],
    ["render", "ReactElement | (props, state) => ReactElement", "Elemento de la pieza", "Sustituye el nodo conservando las props, los eventos y la referencia DOM."],
  ] },
];

export function Anatomy() {
  return (
    <section aria-labelledby="anatomy-heading" className="space-y-4">
      <h2 id="anatomy-heading" className="h3">Anatomía</h2>
      <pre aria-label="Composición de Avatar en JSX" className="overflow-x-auto rounded-2xl border border-gray-base bg-surface-base p-6 text-sm text-gray-bold">
        <code>{anatomy}</code>
      </pre>
      <div className="overflow-x-auto rounded-2xl border border-gray-base bg-surface-base">
        <table className="w-full text-left body-sm">
          <caption className="sr-only">Piezas de Avatar y sus responsabilidades</caption>
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
      <p className="body-sm text-gray-bold/75">
        <code>size</code> es propia de own-ui. Las demás opciones se heredan de Base UI o del elemento HTML de la pieza.
      </p>
      <div role="region" aria-label="Tabla de referencia de API" tabIndex={0} className="overflow-x-auto rounded-2xl border border-gray-base bg-surface-base focus-visible:outline-2 focus-visible:outline-primary-base">
        <table className="w-full min-w-3xl text-left body-sm">
          <caption className="sr-only">Opciones de Avatar, tipos, valores predeterminados y comportamiento</caption>
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
                  <td className="p-4">Sí</td>
                  <td className="min-w-64 p-4">{description}</td>
                </tr>
              ))}
            </tbody>
          ))}
        </table>
      </div>
      <ul className="list-disc space-y-2 pl-5 body-sm text-gray-bold/75">
        <li><code>ImageLoadingStatus</code> admite <code>idle</code>, <code>loading</code>, <code>loaded</code> y <code>error</code>. El estado inicial es <code>idle</code>.</li>
        <li>Con <code>keepMounted</code>, el nodo de imagen queda invisible durante la carga o el error y conserva su caja para la carga diferida.</li>
        <li>Avatar no recibe foco por defecto. Si abre un perfil, compón el avatar dentro de un enlace con nombre accesible.</li>
      </ul>
    </section>
  );
}
