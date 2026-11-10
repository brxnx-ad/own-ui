import { ShowcaseAnatomyContent, ShowcaseApiTable } from "@/components/shared/showcase-reference";
import { ShowcaseAnatomy, ShowcaseApiReference } from "@/components/shared/showcase";
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
    <ShowcaseAnatomy>
      <ShowcaseAnatomyContent name="Menubar" code={anatomy} parts={parts} />
    </ShowcaseAnatomy>
  );
}

export function ApiReference() {
  return (
    <ShowcaseApiReference>
      <ShowcaseApiTable
        name="Menubar"
        groups={[{
          piece: "Menubar",
          rows: rows.map(([prop, type, initial, description]) => ({ prop, type, defaultValue: initial, description })),
        }]}
      />
      <ul className="body-sm list-disc space-y-2 ps-5 text-content-base">
        <li><code>MenubarState</code> expone <code>orientation</code>, <code>modal</code> y <code>hasSubmenuOpen</code>.</li>
        <li>La barra publica <code>{'data-slot="menubar"'}</code>, <code>data-orientation</code>, <code>data-modal</code> y <code>data-has-submenu-open</code> según el estado.</li>
        <li>La apertura controlada y <code>onOpenChange</code> se configuran en cada <code>Menu</code>; <code>modal</code> se configura en la barra.</li>
        <li>Tab entra en la barra, las flechas recorren los activadores y las teclas Inicio y Fin saltan a los extremos. Escape cierra el panel activo.</li>
      </ul>
    </ShowcaseApiReference>
  );
}
