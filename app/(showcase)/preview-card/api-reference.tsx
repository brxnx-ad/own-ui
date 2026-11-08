import { ShowcaseAnatomyContent, ShowcaseApiTable } from "@/components/shared/showcase-reference";
import { ShowcaseAnatomy, ShowcaseApiReference } from "@/components/shared/showcase";
const anatomy = `<PreviewCard>
  <PreviewCardTrigger render={<Link href="/meter" />}>Meter</PreviewCardTrigger>
  <PreviewCardPortal>
    <PreviewCardBackdrop /> {/* Opcional */}
    <PreviewCardPositioner>
      <PreviewCardPopup>
        <PreviewCardViewport> {/* Opcional, para activadores compartidos */}
          <p>Representa un valor dentro de un rango conocido.</p>
        </PreviewCardViewport>
      </PreviewCardPopup>
    </PreviewCardPositioner>
  </PreviewCardPortal>
</PreviewCard>`;

const anatomyRows = [
  ["PreviewCard", "Coordina la apertura, el activador y sus datos sin añadir un nodo."],
  ["PreviewCardTrigger", "Enlace que muestra la vista previa y conserva su destino."],
  ["PreviewCardPortal", "Monta la tarjeta en el destino del portal."],
  ["PreviewCardBackdrop", "Atenúa el fondo sin interceptar el puntero."],
  ["PreviewCardPositioner", "Ancla la tarjeta y ajusta su colocación al espacio disponible."],
  ["PreviewCardPopup", "Presenta el resumen visual sin entrar al recorrido de teclado."],
  ["PreviewCardViewport", "Anima la entrada del contenido del activador actual."],
];

const groups = [
  {
    piece: "PreviewCard",
    rows: [
      ["open / defaultOpen", "boolean", "— / false", "Controla la apertura o fija su estado inicial."],
      ["onOpenChange", "(open: boolean, details: PreviewCardChangeEventDetails) => void", "—", "Recibe el estado solicitado y el motivo. details.cancel() cancela el cambio."],
      ["onOpenChangeComplete", "(open: boolean) => void", "—", "Se ejecuta al concluir la apertura o el cierre."],
      ["triggerId / defaultTriggerId", "string | null", "—", "Identifica el activador asociado en modo controlado o al abrir inicialmente."],
      ["handle / children", "PreviewCardHandle<Payload> / ReactNode | ({ payload }) => ReactNode", "—", "Vincula activadores separados y selecciona el contenido a partir de su payload."],
      ["actionsRef", "React.RefObject<PreviewCardActions | null>", "—", "Expone close() y unmount() para finalizar un cierre aplazado."],
    ],
  },
  {
    piece: "PreviewCardTrigger",
    rows: [
      ["href / id", "string", "— / ID generado", "Define el destino del enlace y el ID de anclaje."],
      ["delay / closeDelay", "number", "600 / 300", "Define las demoras de apertura y cierre en milisegundos. El foco usa delay para abrir."],
      ["handle / payload", "PreviewCardHandle<Payload> / Payload", "—", "Asocia una raíz externa y aporta datos al contenido."],
    ],
  },
  {
    piece: "PreviewCardPortal",
    rows: [
      ["container", "HTMLElement | ShadowRoot | ref | null", "body", "Selecciona el destino del portal."],
      ["keepMounted", "boolean", "false", "Conserva el contenido portaleado mientras la tarjeta permanece oculta."],
    ],
  },
  {
    piece: "PreviewCardPositioner",
    rows: [
      ["anchor / positionMethod", "Element | VirtualElement | ref | función | null / absolute | fixed", "Activador / absolute", "Elige el ancla y la estrategia de colocación."],
      ["side / align", "Side / Align", "bottom / center", "Indica el lado y la alineación preferidos, sujetos al ajuste por colisiones."],
      ["sideOffset / alignOffset", "number | OffsetFunction", "8 / 0", "Separa la tarjeta del ancla en cada eje. Admite píxeles o una función de medición."],
      ["collisionBoundary / collisionPadding", "Boundary / Padding", "clipping-ancestors / 5", "Define el área de colocación y el espacio respecto a sus bordes."],
      ["collisionAvoidance", "CollisionAvoidance", "Ajuste de Base UI", "Define cómo cambia de lado o se desplaza la tarjeta si el espacio es insuficiente."],
      ["sticky / disableAnchorTracking", "boolean", "false", "Ajusta la colocación al salir el ancla de la vista o desactiva el seguimiento de cambios de layout."],
    ],
  },
  {
    piece: "Piezas con nodo",
    rows: [
      ["className / style", "string / CSSProperties, o funciones del estado", "—", "Añade clases o estilos al nodo correspondiente."],
      ["render / ref / atributos HTML", "Según la pieza", "Elemento nativo / — / —", "Personaliza el elemento conservando atributos, eventos y refs."],
    ],
  },
];

export function Anatomy() {
  return (
    <ShowcaseAnatomy>
      <ShowcaseAnatomyContent name="Preview Card" code={anatomy} parts={anatomyRows} />
    </ShowcaseAnatomy>
  );
}

export function ApiReference() {
  return (
    <ShowcaseApiReference>
      <ShowcaseApiTable
        name="Preview Card"
        groups={groups.map(({ piece, rows }) => ({
          piece: piece,
          rows: rows.map(([prop, type, defaultValue, description]) => ({ prop, type, defaultValue, description })),
        }))}
      />
      <ul className="body-sm space-y-2 text-gray-bold/75">
        <li>Usa un destino real en el enlace. Mantén el resumen visual libre de controles y ofrece la información en la página enlazada.</li>
        <li><code>details.reason</code> distingue puntero, foco, pulsación, Escape e interacción exterior o imperativa. <code>createPreviewCardHandle()</code> expone <code>open(id)</code>, <code>close()</code> e <code>isOpen</code> para una raíz montada.</li>
        <li>Al cambiar de activador, <code>PreviewCardViewport</code> oculta el contenido anterior y anima la entrada del nuevo si se permite el movimiento.</li>
      </ul>
    </ShowcaseApiReference>
  );
}
