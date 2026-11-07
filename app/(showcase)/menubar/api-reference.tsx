const anatomy = `<Menubar aria-label="Comandos del documento">
  <Menu>
    <MenuTrigger>Formato</MenuTrigger>
    <MenuPortal>
      <MenuPositioner sideOffset={5}>
        <MenuPopup>
          <MenuItem>Restablecer formato</MenuItem>
        </MenuPopup>
      </MenuPositioner>
    </MenuPortal>
  </Menu>
  <Menu>
    <MenuTrigger>Vista</MenuTrigger>
    <MenuPortal>
      <MenuPositioner sideOffset={5}>
        <MenuPopup>
          <MenuCheckboxItem>Mostrar detalles</MenuCheckboxItem>
        </MenuPopup>
      </MenuPositioner>
    </MenuPortal>
  </Menu>
</Menubar>`;

const parts = [
  ["Menubar", "Renderiza la barra y coordina el foco y la apertura entre los menús que recibe."],
  ["Menu · MenuTrigger", "Cada raíz vincula su botón con un panel. El activador se registra como opción de la barra."],
  ["MenuPortal · MenuPositioner · MenuPopup", "Montan y posicionan el panel. La orientación de la barra determina el lado preferido."],
  ["MenuItem · MenuCheckboxItem", "Ejecutan comandos o cambian preferencias en el panel correspondiente."],
];

const rows = [
  ["orientation", "'horizontal' | 'vertical'", "'horizontal'", "Define el eje de las flechas de la barra, su distribución y el lado preferido de los paneles."],
  ["loopFocus", "boolean", "true", "Hace circular el foco entre los extremos de la barra. Cada Menu gestiona su propio recorrido interior."],
  ["modal", "boolean", "true", "Restringe las pulsaciones exteriores y aplica la política de bloqueo de desplazamiento de Base UI mientras hay un menú abierto."],
  ["disabled", "boolean", "false", "Deshabilita los activadores de la barra. Cada Menu también puede deshabilitarse por separado."],
  ["children", "ReactNode", "—", "Recibe las raíces Menu que compone el consumidor."],
  ["className", "string | ((state: MenubarState) => string | undefined)", "Clases de la barra", "Agrega clases estáticas o dependientes de la orientación, la modalidad o la apertura."],
  ["style", "CSSProperties | ((state: MenubarState) => CSSProperties | undefined)", "—", "Aplica estilos estáticos o funcionales al contenedor."],
  ["render", "ReactElement | ((props, state: MenubarState) => ReactElement)", "div", "Sustituye el elemento manteniendo el rol, las props, los handlers y la ref."],
  ["ref", "Ref<HTMLDivElement>", "—", "Expone el nodo de la barra con React 19."],
  ["aria-label / aria-labelledby", "string", "—", "Asigna un nombre accesible, especialmente si hay varias barras en la página."],
];

export function Anatomy() {
  return (
    <section aria-labelledby="anatomy-heading" className="space-y-4">
      <h2 id="anatomy-heading" className="h3">Anatomía</h2>
      <pre aria-label="Composición de Menubar en JSX" className="overflow-x-auto rounded-2xl border border-gray-base bg-surface-base p-6 text-sm">
        <code>{anatomy}</code>
      </pre>
      <div className="overflow-x-auto rounded-2xl border border-gray-base bg-surface-base">
        <table className="body-sm w-full text-left">
          <caption className="sr-only">Menubar y las piezas que recibe de Menu</caption>
          <thead className="bg-surface-bold">
            <tr><th scope="col" className="p-4">Pieza</th><th scope="col" className="p-4">Responsabilidad</th></tr>
          </thead>
          <tbody>
            {parts.map(([name, description]) => (
              <tr key={name} className="border-t border-gray-base align-top">
                <th scope="row" className="wrap-anywhere p-4 font-mono text-xs">{name}</th>
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
      <div role="region" aria-label="Tabla de referencia de API de Menubar" tabIndex={0} className="overflow-x-auto rounded-2xl border border-gray-base bg-surface-base focus-visible:outline-2 focus-visible:outline-primary-base">
        <table className="body-sm w-full min-w-3xl text-left">
          <caption className="sr-only">Props y valores predeterminados de Menubar</caption>
          <thead className="bg-surface-bold">
            <tr>{["Pieza", "Prop o callback", "Tipo", "Predeterminado", "Opcional", "Función"].map((label) => (
              <th key={label} scope="col" className="p-4">{label}</th>
            ))}</tr>
          </thead>
          <tbody>
            {rows.map(([prop, type, initial, description], index) => (
              <tr key={prop} className="border-t border-gray-base align-top">
                {index === 0 && <th scope="rowgroup" rowSpan={rows.length} className="p-4 font-medium">Menubar</th>}
                <th scope="row" className="p-4 font-mono text-xs">{prop}</th>
                <td className="p-4 font-mono text-xs">{type}</td>
                <td className="p-4">{initial}</td>
                <td className="p-4">Sí</td>
                <td className="min-w-64 p-4">{description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ul className="body-sm list-disc space-y-2 ps-5 text-gray-bold/75">
        <li><code>MenubarState</code> expone <code>orientation</code>, <code>modal</code> y <code>hasSubmenuOpen</code>.</li>
        <li>La barra publica <code>{'data-slot="menubar"'}</code>, <code>data-orientation</code>, <code>data-modal</code> y <code>data-has-submenu-open</code> según el estado.</li>
        <li>La apertura controlada y <code>onOpenChange</code> se configuran en cada <code>Menu</code>; <code>modal</code> se configura en la barra.</li>
        <li>Tab entra en la barra, las flechas recorren los activadores y las teclas Inicio y Fin saltan a los extremos. Escape cierra el panel activo.</li>
      </ul>
    </section>
  );
}
