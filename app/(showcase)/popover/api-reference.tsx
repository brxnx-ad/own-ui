import { ShowcaseAnatomyContent, ShowcaseApiTable } from "@/components/shared/showcase-reference";
import { ShowcaseAnatomy, ShowcaseApiReference } from "@/components/shared/showcase";
const anatomy = `<Popover>
  <PopoverTrigger render={<Button variant="outline" />}>Abrir panel</PopoverTrigger>
  <PopoverPortal>
    <PopoverBackdrop /> {/* Opcional, para atenuar el fondo */}
    <PopoverPositioner>
      <PopoverPopup>
        <PopoverViewport> {/* Opcional, para cambios entre activadores */}
          <PopoverTitle>Detalles del informe</PopoverTitle>
          <PopoverDescription>Resumen de la última semana.</PopoverDescription>
          <PopoverClose render={<Button variant="outline" />}>Cerrar</PopoverClose>
        </PopoverViewport>
      </PopoverPopup>
    </PopoverPositioner>
  </PopoverPortal>
</Popover>`;

const anatomyRows = [
  ["Popover", "Comparte el estado y los activadores. Carece de nodo HTML propio."],
  ["PopoverTrigger", "Abre el panel y actúa como ancla predeterminada."],
  ["PopoverPortal", "Monta el contenido fuera de la jerarquía visual del activador."],
  ["PopoverBackdrop", "Atenúa visualmente el fondo."],
  ["PopoverPositioner", "Calcula la colocación, la alineación y el espacio disponible."],
  ["PopoverPopup", "Contiene el panel con semántica de diálogo y administra el foco."],
  ["PopoverViewport", "Muestra el contenido del activador actual y anima su entrada cuando se permite el movimiento."],
  ["PopoverTitle", "Aporta el nombre accesible del panel."],
  ["PopoverDescription", "Aporta el texto que describe el panel."],
  ["PopoverClose", "Cierra el panel y permite devolver el foco según la configuración."],
];

const groups = [
  {
    piece: "Popover",
    rows: [
      ["open / defaultOpen", "boolean", "— / false", "Controla el estado desde el consumidor o fija el estado inicial."],
      ["onOpenChange", "(open: boolean, details: PopoverChangeEventDetails) => void", "—", "Recibe el estado solicitado, el motivo y el activador cuando está disponible. Permite cancelar el cambio."],
      ["onOpenChangeComplete", "(open: boolean) => void", "—", "Se ejecuta al terminar la apertura o el cierre, incluidas sus transiciones."],
      ["modal", 'boolean | "trap-focus"', "false", "Controla el bloqueo exterior, el desplazamiento de página y la contención de foco. Monta PopoverClose en los modos con contención."],
      ["triggerId / defaultTriggerId", "string | null", "—", "Identifica el activador asociado en modo controlado o en la apertura inicial."],
      ["handle / children", "PopoverHandle<Payload> / ReactNode | ({ payload }) => ReactNode", "—", "Vincula activadores externos y permite renderizar contenido según su payload."],
      ["actionsRef", "React.RefObject<PopoverActions | null>", "—", "Da acceso a close() y unmount(). Este último termina el cierre aplazado con preventUnmountOnClose()."],
    ],
  },
  {
    piece: "PopoverTrigger / PopoverClose",
    rows: [
      ["nativeButton / disabled", "boolean", "true / false", "Adapta la semántica al sustituir el botón nativo o deshabilita el control."],
    ],
  },
  {
    piece: "PopoverTrigger",
    rows: [
      ["id / handle / payload", "string / PopoverHandle<Payload> / Payload", "ID generado / — / —", "Identifica el activador, vincula una raíz externa y aporta datos al panel."],
      ["openOnHover / delay / closeDelay", "boolean / number / number", "false / 300 / 0", "Añade apertura con el puntero y configura las demoras en milisegundos."],
    ],
  },
  {
    piece: "PopoverPortal",
    rows: [
      ["container", "HTMLElement | ShadowRoot | ref | null", "body", "Define el destino del portal."],
      ["keepMounted", "boolean", "false", "Conserva el portal y sus hijos mientras el panel está cerrado."],
    ],
  },
  {
    piece: "PopoverPositioner",
    rows: [
      ["anchor / positionMethod", "Element | VirtualElement | ref | función | null / absolute | fixed", "Activador / absolute", "Elige otra ancla y la estrategia de posicionamiento."],
      ["side / align", "Side / Align", "bottom / center", "Elige un lado físico o lógico y la alineación start, center o end."],
      ["sideOffset / alignOffset", "number | OffsetFunction", "8 / 0", "Desplaza el panel respecto al ancla, en píxeles o mediante una función de medición."],
      ["collisionBoundary / collisionPadding", "Boundary / Padding", "clipping-ancestors / 5", "Define el área de colocación y la separación de sus bordes."],
      ["collisionAvoidance", "CollisionAvoidance", "Ajuste de Base UI", "Configura cambio de lado, desplazamiento y búsqueda en el eje perpendicular."],
      ["sticky / disableAnchorTracking", "boolean", "false", "Conserva el panel en la vista cuando se desplaza el ancla o desactiva el seguimiento de cambios de layout."],
    ],
  },
  {
    piece: "PopoverPopup",
    rows: [
      ["initialFocus / finalFocus", "boolean | ref | (interaction) => HTMLElement | boolean | null | void", "Según la interacción", "Elige el elemento que recibe el foco al abrir y al cerrar."],
    ],
  },
  {
    piece: "Piezas con nodo",
    rows: [
      ["className / style", "string / CSSProperties, o funciones del estado", "—", "Personaliza las clases y los estilos de cada nodo."],
      ["render / ref / atributos HTML", "Según la pieza", "Elemento nativo / — / —", "Compone el elemento y conserva sus eventos, atributos y refs."],
    ],
  },
];

export function Anatomy() {
  return (
    <ShowcaseAnatomy>
      <ShowcaseAnatomyContent name="Popover" code={anatomy} parts={anatomyRows} />
    </ShowcaseAnatomy>
  );
}

export function ApiReference() {
  return (
    <ShowcaseApiReference>
      <ShowcaseApiTable
        name="Popover"
        groups={groups.map(({ piece, rows }) => ({
          piece: piece,
          rows: rows.map(([prop, type, defaultValue, description]) => ({ prop, type, defaultValue, description })),
        }))}
      />
      <ul className="body-sm space-y-2 text-gray-bold/75">
        <li><code>details.reason</code> distingue el activador, el clic exterior, Escape, el botón de cierre, la salida de foco y las acciones imperativas. Usa <code>details.cancel()</code> para rechazar el cambio.</li>
        <li><code>createPopoverHandle()</code> vincula una raíz montada con sus activadores externos y expone <code>open(id)</code>, <code>close()</code> e <code>isOpen</code>.</li>
        <li><code>PopoverViewport</code> añade una transición de contenido entre activadores con movimiento permitido.</li>
      </ul>
    </ShowcaseApiReference>
  );
}
