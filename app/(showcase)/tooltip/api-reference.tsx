const anatomy = `<TooltipProvider> {/* Opcional, para compartir demoras entre varios tooltips */}
  <Tooltip>
    <TooltipTrigger render={<Button variant="outline" />}>Guardar</TooltipTrigger>
    <TooltipPortal>
      <TooltipPositioner>
        <TooltipPopup>
          <TooltipArrow /> {/* Opcional */}
          <TooltipViewport> {/* Opcional, para activadores compartidos */}
            <span>Guarda los cambios pendientes (Ctrl + S)</span>
          </TooltipViewport>
        </TooltipPopup>
      </TooltipPositioner>
    </TooltipPortal>
  </Tooltip>
</TooltipProvider>`;

const anatomyRows = [
  ["TooltipProvider", "Coordina un grupo de tooltips para compartir demoras y abrir sin espera las indicaciones contiguas."],
  ["Tooltip", "Agrupa el activador y su popup sin generar un nodo HTML propio."],
  ["TooltipTrigger", "Control que abre la indicación al pasar el puntero o recibir foco visible y sirve de ancla."],
  ["TooltipPortal", "Monta el posicionador fuera de la jerarquía DOM del activador, en body por defecto."],
  ["TooltipPositioner", "Calcula la colocación respecto al ancla, resuelve colisiones y expone las medidas disponibles."],
  ["TooltipPopup", "Presenta el texto breve de ayuda sin desplazar el foco desde el activador."],
  ["TooltipArrow", "Flecha decorativa opcional posicionada hacia el activador."],
  ["TooltipViewport", "Transiciona el contenido cuando varios activadores comparten el mismo tooltip."],
];

const groups = [
  {
    piece: "TooltipProvider",
    rows: [
      ["delay / closeDelay", "number", "— / —", "Define en milisegundos las demoras de apertura y cierre compartidas por los activadores del grupo."],
      ["timeout", "number", "400", "Ventana en milisegundos durante la cual el siguiente tooltip del grupo se abre de forma instantánea tras cerrar el anterior."],
    ],
  },
  {
    piece: "Tooltip",
    rows: [
      ["open / defaultOpen", "boolean", "— / false", "Controla la visibilidad desde el consumidor o establece la apertura inicial."],
      ["onOpenChange", "(open: boolean, details: TooltipChangeEventDetails) => void", "—", "Recibe el nuevo estado y el detalle del evento. details.cancel() impide el cambio."],
      ["onOpenChangeComplete", "(open: boolean) => void", "—", "Se ejecuta cuando finalizan la apertura o el cierre y sus transiciones."],
      ["disabled", "boolean", "false", "Desactiva la apertura del tooltip para todos sus activadores asociados."],
      ["disableHoverablePopup", "boolean", "false", "Cierra el tooltip al salir del activador sin permitir mantenerlo abierto pasando el puntero al popup."],
      ["trackCursorAxis", '"none" | "x" | "y" | "both"', '"none"', "Hace que la posición del tooltip siga al puntero en el eje indicado."],
      ["triggerId / defaultTriggerId", "string | null", "— / null", "Identifica el activador activo en modo controlado o en la apertura inicial."],
      ["handle / children", "TooltipHandle<Payload> / ReactNode | ({ payload }) => ReactNode", "—", "Conecta activadores externos y permite renderizar contenido en función del payload activo."],
      ["actionsRef", "React.RefObject<TooltipActions | null>", "—", "Expone close() y unmount() para completar cierres controlados externamente."],
    ],
  },
  {
    piece: "TooltipTrigger",
    rows: [
      ["id / handle / payload", "string / TooltipHandle<Payload> / Payload", "ID generado / — / —", "Identifica el activador, lo vincula con una raíz externa y entrega datos al popup."],
      ["delay / closeDelay", "number", "600 / 0", "Configura en milisegundos las demoras de apertura en hover y de cierre para este activador."],
      ["closeOnClick", "boolean", "true", "Determina si el tooltip se cierra cuando el usuario pulsa el activador."],
      ["disabled", "boolean", "false", "Impide que este activador abra el tooltip sin añadir el atributo HTML disabled al elemento."],
    ],
  },
  {
    piece: "TooltipPortal",
    rows: [
      ["container", "HTMLElement | ShadowRoot | ref | null", "body", "Selecciona el contenedor donde se monta el portal."],
      ["keepMounted", "boolean", "false", "Mantiene los nodos del portal en el DOM mientras el tooltip está cerrado."],
    ],
  },
  {
    piece: "TooltipPositioner",
    rows: [
      ["anchor / positionMethod", "Element | VirtualElement | ref | función | null / absolute | fixed", "Activador / absolute", "Define una referencia de anclaje distinta del activador o cambia el método CSS."],
      ["side / align", "Side / Align", "top / center", "Indica el lado y la alineación preferidos antes de ajustar por colisiones."],
      ["sideOffset / alignOffset", "number | OffsetFunction", "8 / 0", "Separa el popup del ancla en cada eje en píxeles o mediante una función."],
      ["collisionBoundary / collisionPadding", "Boundary / Padding", "clipping-ancestors / 5", "Delimita el área de colisión y el margen mínimo respecto a sus bordes."],
      ["arrowPadding", "number", "5", "Distancia mínima en píxeles entre TooltipArrow y las esquinas del popup."],
      ["collisionAvoidance", "CollisionAvoidance", "Ajuste de Base UI", "Configura cómo se invierte de lado o se desplaza el popup ante falta de espacio."],
      ["sticky / disableAnchorTracking", "boolean", "false", "Mantiene el popup visible al desplazarse el ancla o desactiva el seguimiento de layout."],
    ],
  },
  {
    piece: "Piezas con nodo",
    rows: [
      ["className / style", "string / CSSProperties, o funciones del estado", "—", "Añade clases o estilos en línea calculados según el estado de la pieza."],
      ["render / ref / atributos HTML", "Según la pieza", "Elemento nativo / — / —", "Reemplaza el elemento conservando accesibilidad, eventos, atributos de estado y refs."],
    ],
  },
];

export function Anatomy() {
  return (
    <section aria-labelledby="anatomy-heading" className="space-y-4">
      <h2 id="anatomy-heading" className="h3">Anatomía</h2>
      <pre aria-label="Composición de Tooltip en JSX" className="overflow-x-auto rounded-2xl border border-gray-base bg-surface-base p-6 text-sm">
        <code>{anatomy}</code>
      </pre>
      <div className="overflow-x-auto rounded-2xl border border-gray-base bg-surface-base">
        <table className="body-sm w-full text-left">
          <caption className="sr-only">Piezas de Tooltip y sus responsabilidades</caption>
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
      <div role="region" aria-label="Tabla de referencia de API de Tooltip" tabIndex={0} className="overflow-x-auto rounded-2xl border border-gray-base bg-surface-base focus-visible:outline-2 focus-visible:outline-primary-base">
        <table className="body-sm w-full min-w-3xl text-left">
          <caption className="sr-only">Opciones de Tooltip por pieza</caption>
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
        <li>El foco de teclado abre el tooltip sin espera y Escape lo descarta. Reserva su contenido para textos breves de apoyo y usa <code>Popover</code> si el panel contiene controles interactivos.</li>
        <li><code>details.reason</code> distingue <code>trigger-hover</code>, <code>trigger-focus</code>, <code>trigger-press</code>, <code>outside-press</code>, <code>escape-key</code>, <code>disabled</code>, <code>imperative-action</code> y <code>none</code>.</li>
        <li><code>createTooltipHandle()</code> vincula activadores externos con una raíz montada y expone <code>open(id)</code>, <code>close()</code> e <code>isOpen</code>.</li>
      </ul>
    </section>
  );
}
