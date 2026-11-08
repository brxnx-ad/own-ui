import { ShowcaseAnatomyContent, ShowcaseApiTable } from "@/components/shared/showcase-reference";
import { ShowcaseAnatomy, ShowcaseApiReference } from "@/components/shared/showcase";
const anatomy = `<Dialog>
  <DialogTrigger>Ver detalles</DialogTrigger>
  <DialogPortal>
    <DialogBackdrop />
    <DialogViewport>
      <DialogPopup>
        <DialogTitle>Entrega del informe</DialogTitle>
        <DialogDescription>Consulta el formato y el canal de entrega.</DialogDescription>
        <DialogClose>Cerrar</DialogClose>
      </DialogPopup>
    </DialogViewport>
  </DialogPortal>
</Dialog>`;

const parts = [
  ["Dialog", "Agrupa las piezas y gestiona la apertura. No genera un nodo."],
  ["DialogTrigger", "Botón que abre el diálogo y puede proporcionar datos al contenido."],
  ["DialogPortal", "Traslada el contenido a otro nodo del DOM, por defecto bajo body."],
  ["DialogBackdrop", "Capa visual opcional que atenúa el fondo."],
  ["DialogViewport", "Centra el popup dentro de la ventana y define su espacio disponible."],
  ["DialogPopup", "Contenedor con rol dialog, límites de tamaño y gestión de foco."],
  ["DialogTitle", "Encabezado que da nombre accesible al diálogo."],
  ["DialogDescription", "Párrafo que aporta la descripción accesible."],
  ["DialogClose", "Botón que solicita el cierre."],
];

const groups = [
  { name: "Dialog", rows: [
    ["open", "boolean", "—", "Controla si el diálogo está abierto."],
    ["defaultOpen", "boolean", "false", "Apertura inicial en modo no controlado."],
    ["onOpenChange", "(open: boolean, details: ChangeEventDetails) => void", "—", "Recibe solicitudes de apertura y cierre. details.cancel() cancela la transición de estado."],
    ["onOpenChangeComplete", "(open: boolean) => void", "—", "Se ejecuta cuando termina la transición de apertura o de cierre."],
    ["modal", "boolean | 'trap-focus'", "true", "true restringe foco, puntero y scroll de la página. false permite interacción exterior. 'trap-focus' retiene el foco sin bloquear puntero ni scroll."],
    ["disablePointerDismissal", "boolean", "false", "Evita el cierre por pulsación exterior. Con modal=false también evita el cierre al salir el foco. Escape sigue disponible."],
    ["triggerId / defaultTriggerId", "string | null", "—", "Identifica el activador asociado en modo controlado o al abrir inicialmente, respectivamente."],
    ["handle", "DialogHandle<Payload>", "—", "Conecta la raíz a activadores externos o a métodos imperativos."],
    ["children", "ReactNode | ({ payload }) => ReactNode", "—", "Contenido directo o función que recibe el payload activo, que puede ser undefined."],
    ["actionsRef", "RefObject<Actions | null>", "—", "Expone close() y unmount(). Este último completa un cierre retenido con details.preventUnmountOnClose()."],
  ]},
  { name: "DialogTrigger", rows: [
    ["handle / payload", "DialogHandle<Payload> / Payload", "—", "El mismo handle que la raíz conecta un activador externo. payload aporta los datos para esa apertura."],
    ["id", "string", "Generado", "Identifica al activador para triggerId, defaultTriggerId y handle.open(id)."],
  ]},
  { name: "DialogTrigger / DialogClose", rows: [
    ["disabled", "boolean", "false", "Deshabilita el control."],
    ["nativeButton", "boolean", "true", "Configura false cuando render sustituye el botón por otro elemento."],
  ]},
  { name: "DialogPortal", rows: [
    ["container", "HTMLElement | ShadowRoot | RefObject<HTMLElement | ShadowRoot | null> | null", "Portal padre o body", "Cambia el destino del portal. null explícito retrasa el montaje hasta resolver el destino."],
    ["keepMounted", "boolean", "false", "Conserva oculto el contenido cuando termina el cierre."],
  ]},
  { name: "DialogBackdrop", rows: [
    ["forceRender", "boolean", "false", "También muestra el backdrop visual de un diálogo anidado."],
  ]},
  { name: "DialogPopup", rows: [
    ["initialFocus", "FocusTarget", "Primer elemento tabulable o popup", "Selecciona el foco al abrir. En apertura táctil, el comportamiento predeterminado enfoca el popup."],
    ["finalFocus", "FocusTarget", "Activador o foco previo", "Selecciona el destino del foco al cerrar."],
  ]},
  { name: "Piezas con nodo", rows: [
    ["className", "string | (state) => string | undefined", "—", "Añade clases estáticas o derivadas del estado de la pieza."],
    ["style", "CSSProperties | (state) => CSSProperties | undefined", "—", "Aplica estilos al nodo correspondiente."],
    ["render", "ReactElement | (props, state) => ReactElement", "Elemento de cada pieza", "Sustituye el nodo. Conserva props, eventos y ref recibidos."],
  ]},
];

export function Anatomy() {
  return (
    <ShowcaseAnatomy>
      <ShowcaseAnatomyContent name="Dialog" code={anatomy} parts={parts} />
    </ShowcaseAnatomy>
  );
}

export function ApiReference() {
  return (
    <ShowcaseApiReference>
      <ShowcaseApiTable
        name="Dialog"
        groups={groups.map(({ name, rows }) => ({
          piece: name,
          rows: rows.map(([prop, type, defaultValue, description]) => ({ prop, type, defaultValue, description })),
        }))}
      />
      <ul className="body-sm space-y-2 text-gray-bold/75">
        <li><code>FocusTarget</code> acepta un booleano, una ref o una función que recibe <code>mouse</code>, <code>touch</code>, <code>pen</code> o <code>keyboard</code> y devuelve un elemento, booleano, <code>null</code> o <code>undefined</code>.</li>
        <li><code>details.reason</code> distingue <code>trigger-press</code>, <code>outside-press</code>, <code>escape-key</code>, <code>close-press</code>, <code>focus-out</code>, <code>imperative-action</code> y <code>none</code>.</li>
        <li><code>createDialogHandle&lt;Payload&gt;()</code> devuelve un <code>DialogHandle&lt;Payload&gt;</code> con <code>open(id)</code>, <code>openWithPayload(payload)</code>, <code>close()</code> e <code>isOpen</code>.</li>
        <li>Las piezas con nodo aceptan los atributos HTML admitidos por Base UI. En modo modal, Tab recorre los controles internos. Las transiciones respetan el movimiento reducido.</li>
      </ul>
    </ShowcaseApiReference>
  );
}
