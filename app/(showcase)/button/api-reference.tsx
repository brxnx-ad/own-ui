const anatomy = `<Button icon={<ProjectIcon />} iconPosition="start">
  Abrir proyecto
</Button>`;

const options = [
  ["variant", '"primary" | "secondary" | "outline" | "ghost" | "destructive"', '"primary"', "Define la jerarquía visual de la acción."],
  ["size", '"sm" | "md" | "lg"', '"md"', "Ajusta la altura, el espaciado y el tamaño del texto."],
  ["loading", "boolean", "false", "Muestra el Spinner, deshabilita la interacción y añade aria-busy."],
  ["disabled", "boolean", "false", "Deshabilita la acción. loading también activa este estado."],
  ["icon", "ReactNode", "—", "Recibe un icono del consumidor. Sin children, el botón adopta proporciones cuadradas."],
  ["iconPosition", '"start" | "end"', '"start"', "Coloca el icono o el Spinner antes o después del contenido."],
  ["children", "ReactNode", "—", "Contenido del botón. Si solo hay un icono, proporciona aria-label."],
  ["focusableWhenDisabled", "boolean", "false", "Permite el foco de teclado estando deshabilitado; la acción permanece bloqueada."],
  ["render", "ReactElement | (props, state) => ReactElement", "button", "Sustituye el elemento. En la forma de función, propaga las props y ref recibidas."],
  ["nativeButton", "boolean", "true", "Indica si el elemento de render es un button nativo. Para un enlace, usa false y role=link."],
  ["className", "string", "—", "Añade clases al botón."],
  ["style", "CSSProperties | (state) => CSSProperties", "—", "Añade estilos estáticos o dependientes del estado de Base UI."],
  ["onClick", "(event) => void", "—", "Se ejecuta al activar el botón habilitado con ratón o teclado."],
  ["type", '"button" | "submit" | "reset"', '"button"', "Define la acción nativa dentro de un formulario."],
];

export function ButtonAnatomy() {
  return (
    <section aria-labelledby="button-anatomy" className="space-y-4">
      <h2 id="button-anatomy" className="h3">Anatomía</h2>
      <p className="body-sm text-gray-bold/75">Una pieza pública con contenido e icono opcionales.</p>
      <pre aria-label="Composición de Button en JSX" className="overflow-x-auto rounded-2xl border border-gray-base bg-surface-base p-6 text-sm"><code>{anatomy}</code></pre>
      <div className="overflow-x-auto rounded-2xl border border-gray-base bg-surface-base">
        <table className="w-full text-left body-sm">
          <caption className="sr-only">Partes de Button y sus responsabilidades</caption>
          <thead className="bg-surface-bold"><tr><th scope="col" className="p-4">Pieza</th><th scope="col" className="p-4">Responsabilidad</th></tr></thead>
          <tbody>
            <tr className="border-t border-gray-base"><th scope="row" className="p-4 font-mono text-xs">Button</th><td className="p-4">Gestiona la acción, los estilos y el foco mediante Base UI.</td></tr>
            <tr className="border-t border-gray-base"><th scope="row" className="p-4 font-mono text-xs">icon</th><td className="p-4">Ranura opcional; no es un subcomponente exportado. ProjectIcon representa un icono del consumidor.</td></tr>
            <tr className="border-t border-gray-base"><th scope="row" className="p-4 font-mono text-xs">children</th><td className="p-4">Texto o contenido opcional del botón.</td></tr>
            <tr className="border-t border-gray-base"><th scope="row" className="p-4 font-mono text-xs">Spinner</th><td className="p-4">Indicador interno que sustituye al icono durante loading; no se compone manualmente dentro de Button.</td></tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}

export function ButtonApiReference() {
  return (
    <section aria-labelledby="button-api" className="space-y-4">
      <h2 id="button-api" className="h3">Referencia de API</h2>
      <p className="body-sm text-gray-bold/75">Opciones de Button. Todas son opcionales.</p>
      <div role="region" aria-label="Tabla de API de Button" tabIndex={0} className="overflow-x-auto rounded-2xl border border-gray-base bg-surface-base focus-visible:outline-2 focus-visible:outline-primary-base">
        <table className="w-full min-w-3xl text-left body-sm">
          <caption className="sr-only">Props, callbacks y valores predeterminados de Button</caption>
          <thead className="bg-surface-bold"><tr>{["Pieza", "Prop o callback", "Tipo", "Predeterminado", "Opcional", "Función"].map(label => <th key={label} scope="col" className="p-4">{label}</th>)}</tr></thead>
          <tbody>{options.map(([name, type, defaultValue, description], index) => <tr key={name} className="border-t border-gray-base align-top">
            {index === 0 && <th scope="rowgroup" rowSpan={options.length} className="p-4">Button</th>}
            <th scope="row" className="p-4 font-mono text-xs">{name}</th><td className="p-4 font-mono text-xs">{type}</td><td className="p-4">{defaultValue}</td><td className="p-4">Sí</td><td className="min-w-64 p-4">{description}</td>
          </tr>)}</tbody>
        </table>
      </div>
      <p className="body-sm text-gray-bold/75">Tab recorre los botones habilitados; Enter y Espacio activan un botón nativo. Los enlaces conservan su navegación nativa. Los botones de solo icono necesitan un nombre accesible y los iconos decorativos deben ocultarse a lectores de pantalla.</p>
      <p className="caption text-gray-bold/75">También se admiten atributos HTML, ARIA, ref y eventos nativos. La prop className se documenta como cadena porque el wrapper actual no evalúa funciones de clases.</p>
    </section>
  );
}
