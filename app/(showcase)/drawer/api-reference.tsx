import { ShowcaseAnatomyContent, ShowcaseApiTable } from "@/components/shared/showcase-reference";
import { ShowcaseAnatomy, ShowcaseApiReference } from "@/components/shared/showcase";
const anatomy = `<Drawer>
  <DrawerTrigger>Ver resumen</DrawerTrigger>
  <DrawerPortal>
    <DrawerBackdrop />
    <DrawerViewport>
      <DrawerPopup>
        <DrawerContent>
          <DrawerTitle>Resumen semanal</DrawerTitle>
          <DrawerDescription>Consulta los indicadores del turno.</DrawerDescription>
          <DrawerClose>Cerrar</DrawerClose>
        </DrawerContent>
      </DrawerPopup>
    </DrawerViewport>
  </DrawerPortal>
</Drawer>`;

const parts = [
  ["Drawer", "Agrupa las piezas y configura apertura, dirección y puntos de ajuste."],
  ["DrawerTrigger", "Abre el panel desde un botón y puede proporcionar datos."],
  ["DrawerPortal", "Monta el panel y sus capas en otro nodo del DOM."],
  ["DrawerBackdrop", "Capa visual opcional que atenúa la página."],
  ["DrawerViewport", "Contiene el panel y gestiona los gestos de arrastre."],
  ["DrawerPopup", "Panel con rol dialog, gestión de foco y agarre integrado configurable."],
  ["DrawerContent", "Cuerpo desplazable que permite seleccionar texto con el puntero."],
  ["DrawerTitle", "Encabezado que da nombre accesible al panel."],
  ["DrawerDescription", "Párrafo que describe el panel."],
  ["DrawerClose", "Botón que solicita cerrar el panel."],
  ["DrawerSwipeArea", "Área opcional de apertura por arrastre dentro de la raíz y fuera del portal."],
  ["DrawerProvider", "Coordina las piezas de fondo con las raíces que contiene."],
  ["DrawerIndent / DrawerIndentBackground", "Contenido de la aplicación y capa de fondo que exponen data-active."],
  ["DrawerVirtualKeyboardProvider", "Se coloca dentro de la raíz y envuelve el panel inferior para gestionar foco y teclado virtual."],
];

const groups = [
  { name: "Drawer", rows: [
    ["open / defaultOpen", "boolean", "— / false", "Controla la apertura o fija su valor inicial, respectivamente."],
    ["onOpenChange", "(open: boolean, details: ChangeEventDetails) => void", "—", "Recibe una solicitud de apertura o cierre. Usa details.cancel() para cancelarla."],
    ["onOpenChangeComplete", "(open: boolean) => void", "—", "Se ejecuta al completar la apertura o el cierre."],
    ["swipeDirection", "'up' | 'down' | 'left' | 'right'", "'down'", "Determina el borde y el sentido de cierre en la implementación de own-ui."],
    ["snapPoints", "DrawerSnapPoint[]", "—", "Alturas del panel vertical. Usa fracciones de 0 a 1, números mayores que 1 para píxeles o cadenas px/rem."],
    ["snapPoint / defaultSnapPoint", "DrawerSnapPoint | null", "— / Primer punto o null", "Punto activo controlado o valor inicial sin control. Un valor controlado null deja el panel sin desplazamiento de ajuste."],
    ["onSnapPointChange", "(point: DrawerSnapPoint | null, details: SnapPointChangeEventDetails) => void", "—", "Recibe el punto solicitado o el restablecimiento al cerrar. details.cancel() cancela el cambio."],
    ["snapToSequentialPoints", "boolean", "false", "Limita el efecto de la velocidad al elegir un punto de ajuste."],
    ["modal", "boolean | 'trap-focus'", "true", "true restringe foco, puntero y scroll exterior. false permite interacción exterior. 'trap-focus' retiene solo el foco si se omite el fondo visual."],
    ["disablePointerDismissal", "boolean", "false", "Evita el cierre por pulsación exterior y, en modo no modal, por salida de foco."],
    ["actionsRef", "RefObject<Actions | null>", "—", "Expone close() y unmount(). Usa unmount() para completar un cierre retenido con preventUnmountOnClose()."],
    ["handle", "DrawerHandle<Payload>", "—", "Asocia la raíz con activadores externos y métodos imperativos."],
    ["triggerId / defaultTriggerId", "string | null", "— / null", "Identifican el activador asociado en modo controlado o al abrir inicialmente."],
    ["children", "ReactNode | ({ payload }) => ReactNode", "—", "Renderiza las piezas. La función recibe los datos del activador, si existen."],
  ]},
  { name: "DrawerTrigger", rows: [
    ["handle / payload", "DrawerHandle<Payload> / Payload", "—", "Comparte el handle de la raíz para un activador externo. payload aporta los datos de apertura."],
    ["id", "string", "Generado", "Identifica el activador para triggerId, defaultTriggerId y handle.open(id)."],
  ]},
  { name: "DrawerTrigger / DrawerClose", rows: [
    ["disabled", "boolean", "false", "Deshabilita el control."],
    ["nativeButton", "boolean", "true", "Usa false cuando render produce un elemento distinto de button."],
  ]},
  { name: "DrawerPortal", rows: [
    ["container", "HTMLElement | ShadowRoot | RefObject<HTMLElement | ShadowRoot | null> | null", "Portal padre o body", "Cambia el destino. null explícito aplaza el montaje."],
    ["keepMounted", "boolean", "false", "Mantiene el contenido montado y oculto después del cierre."],
  ]},
  { name: "DrawerBackdrop", rows: [
    ["forceRender", "boolean", "false", "Muestra también el fondo visual de un panel anidado."],
  ]},
  { name: "DrawerPopup", rows: [
    ["gripPosition", "'auto' | 'top' | 'right' | 'bottom' | 'left' | 'none'", "'auto'", "Ubica el agarre. auto usa el borde opuesto al de entrada y none lo oculta. El sentido de cierre se configura en swipeDirection."],
    ["showGripBorder", "boolean", "false", "Activa el borde que separa el agarre del contenido."],
    ["initialFocus / finalFocus", "FocusTarget", "Popup / activador o foco previo", "Determina el destino al abrir o al cerrar, respectivamente."],
  ]},
  { name: "DrawerSwipeArea", rows: [
    ["disabled", "boolean", "false", "Desactiva esta área de gesto."],
    ["swipeDirection", "DrawerSwipeDirection", "Opuesta a la raíz", "Elige el sentido de apertura del área."],
  ]},
  { name: "Proveedores", rows: [
    ["children", "ReactNode", "—", "DrawerProvider recibe las piezas de fondo y sus raíces. DrawerVirtualKeyboardProvider envuelve el portal o viewport dentro de Drawer."],
  ]},
  { name: "Piezas con nodo", rows: [
    ["className", "string | (state) => string | undefined", "—", "Añade clases estáticas o dependientes del estado."],
    ["style", "CSSProperties | (state) => CSSProperties | undefined", "—", "Aplica estilos al nodo de la pieza."],
    ["render", "ReactElement | (props, state) => ReactElement", "Nodo de la pieza", "Sustituye el elemento conservando las props, eventos y ref recibidos."],
  ]},
];

export function Anatomy() {
  return (
    <ShowcaseAnatomy>
      <ShowcaseAnatomyContent name="Drawer" code={anatomy} parts={parts} />
    </ShowcaseAnatomy>
  );
}

export function ApiReference() {
  return (
    <ShowcaseApiReference>
      <ShowcaseApiTable
        name="Drawer"
        groups={groups.map(({ name, rows }) => ({
          piece: name,
          rows: rows.map(([prop, type, defaultValue, description]) => ({ prop, type, defaultValue, description })),
        }))}
      />
      <ul className="body-sm space-y-2 text-gray-bold/75">
        <li><code>FocusTarget</code> acepta un booleano, una ref o una función que recibe <code>mouse</code>, <code>touch</code>, <code>pen</code>, <code>keyboard</code> o una cadena vacía si no hay interacción identificada.</li>
        <li><code>details.reason</code> distingue <code>trigger-press</code>, <code>outside-press</code>, <code>escape-key</code>, <code>close-watcher</code>, <code>close-press</code>, <code>focus-out</code>, <code>imperative-action</code>, <code>swipe</code> y <code>none</code>.</li>
        <li><code>createDrawerHandle&lt;Payload&gt;()</code> devuelve un handle con <code>open(id)</code>, <code>openWithPayload(payload)</code>, <code>close()</code> e <code>isOpen</code>.</li>
        <li>Conserva un botón de apertura y otro de cierre como alternativas al gesto. Las piezas con nodo admiten atributos HTML y la animación respeta el movimiento reducido.</li>
      </ul>
    </ShowcaseApiReference>
  );
}
