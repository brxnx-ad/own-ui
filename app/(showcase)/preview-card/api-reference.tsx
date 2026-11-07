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
    <section aria-labelledby="anatomy-heading" className="space-y-4">
      <h2 id="anatomy-heading" className="h3">Anatomía</h2>
      <pre aria-label="Composición de Preview Card en JSX" className="overflow-x-auto rounded-2xl border border-gray-base bg-surface-base p-6 text-sm">
        <code>{anatomy}</code>
      </pre>
      <div className="overflow-x-auto rounded-2xl border border-gray-base bg-surface-base">
        <table className="body-sm w-full text-left">
          <caption className="sr-only">Piezas de Preview Card y sus responsabilidades</caption>
          <thead className="bg-surface-bold">
            <tr><th scope="col" className="p-4">Pieza</th><th scope="col" className="p-4">Responsabilidad</th></tr>
          </thead>
          <tbody>
            {anatomyRows.map(([piece, description]) => (
              <tr key={piece} className="border-t border-gray-base align-top">
                <th scope="row" className="break-all p-4 font-mono text-xs sm:break-normal">{piece}</th>
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
      <div role="region" aria-label="Tabla de referencia de API de Preview Card" tabIndex={0} className="overflow-x-auto rounded-2xl border border-gray-base bg-surface-base focus-visible:outline-2 focus-visible:outline-primary-base">
        <table className="body-sm w-full min-w-3xl text-left">
          <caption className="sr-only">Opciones de Preview Card por pieza</caption>
          <thead className="bg-surface-bold">
            <tr>
              {["Pieza", "Prop o callback", "Tipo", "Predeterminado", "Opcional", "Función"].map((label) => (
                <th key={label} scope="col" className="p-4">{label}</th>
              ))}
            </tr>
          </thead>
          {groups.map(({ piece, rows }) => (
            <tbody key={piece}>
              {rows.map(([prop, type, defaultValue, description], index) => (
                <tr key={prop} className="border-t border-gray-base align-top">
                  {index === 0 && <th scope="rowgroup" rowSpan={rows.length} className="p-4 font-medium">{piece}</th>}
                  <th scope="row" className="p-4 font-mono text-xs">{prop}</th>
                  <td className="min-w-40 p-4 font-mono text-xs">{type}</td>
                  <td className="p-4">{defaultValue}</td>
                  <td className="p-4">Sí</td>
                  <td className="min-w-64 p-4">{description}</td>
                </tr>
              ))}
            </tbody>
          ))}
        </table>
      </div>
      <ul className="body-sm space-y-2 text-gray-bold/75">
        <li>Usa un destino real en el enlace. Mantén el resumen visual libre de controles y ofrece la información en la página enlazada.</li>
        <li><code>details.reason</code> distingue puntero, foco, pulsación, Escape e interacción exterior o imperativa. <code>createPreviewCardHandle()</code> expone <code>open(id)</code>, <code>close()</code> e <code>isOpen</code> para una raíz montada.</li>
        <li>Al cambiar de activador, <code>PreviewCardViewport</code> oculta el contenido anterior y anima la entrada del nuevo si se permite el movimiento.</li>
      </ul>
    </section>
  );
}
