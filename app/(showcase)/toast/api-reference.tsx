const anatomy = `<ToastProvider>
  <Publisher />
  <ToastPortal>
    <ToastViewport aria-label="Notificaciones">
      <ToastStack>
        {toasts.map((toast) => (
          <Toast key={toast.id} toast={toast}>
            <ToastContent>
              <ToastTitle />
              <ToastDescription />
              <ToastAction />
              <ToastClose>Cerrar</ToastClose>
            </ToastContent>
          </Toast>
        ))}
      </ToastStack>
    </ToastViewport>
  </ToastPortal>
</ToastProvider>`;

const parts = [
  ["ToastProvider", "Mantiene los avisos, los temporizadores y el gestor compartido."],
  ["ToastPortal", "Traslada la región de notificaciones al contenedor indicado."],
  ["ToastViewport", "Proporciona la región de anuncios y coordina el foco y la pausa."],
  ["ToastStack", "Coloca los avisos de esquina en una lista desplazable."],
  ["Toast", "Renderiza un aviso del gestor y coordina su ciclo de entrada y salida."],
  ["ToastContent", "Agrupa las piezas visibles de un aviso."],
  ["ToastTitle / ToastDescription", "Vinculan el título y la descripción con el aviso."],
  ["ToastAction", "Ejecuta la acción que aporta el consumidor."],
  ["ToastClose", "Cierra el aviso al activarse."],
  ["ToastPositioner / ToastArrow", "Colocan un aviso junto a un elemento y señalan su ancla."],
];

const groups = [
  {
    piece: "ToastProvider",
    rows: [
      ["timeout", "number", "5000", "Tiempo predeterminado en milisegundos. Usa 0 para evitar el cierre automático."],
      ["limit", "number", "3", "Máximo de avisos activos visibles. Los más antiguos permanecen limitados en la cola."],
      ["toastManager", "ToastManager", "Gestor interno", "Conecta una instancia de createToastManager para publicar fuera de React."],
    ],
  },
  {
    piece: "Gestor",
    rows: [
      ["add", "(options: ToastManagerAddOptions<Data>) => string", "—", "Agrega un aviso y devuelve su id. Repetir un id activo actualiza el aviso y reinicia su temporizador."],
      ["update", "(id, options | (previous) => options) => void", "—", "Modifica un aviso activo y admite una función para derivar los cambios."],
      ["close", "(id?: string) => void", "Todos", "Cierra el aviso indicado o todos los de la cola."],
      ["promise", "(promise: Promise<Value>, options) => Promise<Value>", "—", "Muestra carga y actualiza el mismo aviso con éxito o error. Conserva el resultado o rechazo de la promesa."],
      ["type / priority", 'string / "low" | "high"', '— / "low"', "Separan el acento visual del modo de anuncio accesible."],
      ["actionProps", "React.ComponentPropsWithoutRef<'button'>", "—", "Define el contenido y el evento de ToastAction. La acción decide si cierra el aviso."],
      ["positionerProps", "ToastManagerPositionerProps", "—", "Configura el ancla y las opciones geométricas de ToastPositioner."],
      ["onClose / onRemove", "() => void", "—", "Se ejecutan al iniciar el cierre y al retirar el aviso, respectivamente."],
    ],
  },
  {
    piece: "ToastPortal / ToastViewport",
    rows: [
      ["container", "HTMLElement | ShadowRoot | ref | null", "document.body", "Destino de ToastPortal."],
      ["aria-label", "string", '"Notifications"', "Nombre accesible de la región de ToastViewport."],
    ],
  },
  {
    piece: "Toast / ToastPositioner",
    rows: [
      ["toast", "ToastObject<Data>", "—", "Objeto actual de la cola. Usa el mismo para la raíz y para el posicionador del aviso anclado.", "No"],
      ["swipeDirection", '"up" | "down" | "left" | "right" o arreglo', '"right"', "Direcciones de descarte del aviso de esquina. Usa [] para desactivar el gesto."],
      ["anchor / side / align", "Element | null / Side / Align", '— / "top" / "center"', "Ajustan la posición relativa. Las props directas de ToastPositioner tienen prioridad."],
      ["sideOffset / alignOffset", "number | ((geometry) => number)", "0 / 0", "Separación en píxeles en cada eje, con ajuste de colisiones de Base UI."],
    ],
  },
  {
    piece: "Piezas DOM",
    rows: [
      ["className / style", "Valor estático o función del estado", "—", "Personaliza la pieza. ToastStack usa props nativas de div."],
      ["render", "ReactElement | ((props, state) => ReactElement)", "Nodo de la pieza", "Sustituye el nodo de Base UI. Action y Close usan nativeButton para indicar si el sustituto es un botón."],
    ],
  },
];

export function Anatomy() {
  return (
    <section aria-labelledby="anatomy-heading" className="space-y-4">
      <h2 id="anatomy-heading" className="h3">Anatomía</h2>
      <p className="body-sm text-gray-bold/75">Un descendiente del proveedor obtiene <code>toasts</code> con <code>useToastManager</code> y renderiza la lista. Los avisos anclados usan <code>ToastPositioner</code> fuera de <code>ToastStack</code>.</p>
      <pre aria-label="Composición de Toast en JSX" className="overflow-x-auto rounded-2xl border border-gray-base bg-surface-base p-6 text-sm">
        <code>{anatomy}</code>
      </pre>
      <div className="overflow-x-auto rounded-2xl border border-gray-base bg-surface-base">
        <table className="body-sm w-full text-left">
          <caption className="sr-only">Piezas de Toast y sus responsabilidades</caption>
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
      <div role="region" aria-label="Tabla de referencia de API" tabIndex={0} className="overflow-x-auto rounded-2xl border border-gray-base bg-surface-base focus-visible:outline-2 focus-visible:outline-gray-bold">
        <table className="body-sm w-full min-w-3xl text-left">
          <caption className="sr-only">Props, tipos y valores predeterminados de Toast</caption>
          <thead className="bg-surface-bold">
            <tr>
              {["Pieza", "Prop o callback", "Tipo", "Predeterminado", "Opcional", "Función"].map((label) => (
                <th key={label} scope="col" className="p-4">{label}</th>
              ))}
            </tr>
          </thead>
          {groups.map(({ piece, rows }) => (
            <tbody key={piece}>
              {rows.map(([name, type, defaultValue, description, optional = "Sí"], index) => (
                <tr key={name} className="border-t border-gray-base align-top">
                  {index === 0 && <th scope="rowgroup" rowSpan={rows.length} className="p-4 font-medium">{piece}</th>}
                  <th scope="row" className="p-4 font-mono text-xs">{name}</th>
                  <td className="min-w-36 p-4 font-mono text-xs">{type}</td>
                  <td className="p-4">{defaultValue}</td>
                  <td className="p-4">{optional}</td>
                  <td className="min-w-60 p-4">{description}</td>
                </tr>
              ))}
            </tbody>
          ))}
        </table>
      </div>
      <ul className="body-sm list-disc space-y-2 ps-5 text-gray-bold/75">
        <li>Usa <kbd>F6</kbd> para enfocar la región, <kbd>Tab</kbd> para recorrer los avisos y <kbd>Escape</kbd> para cerrar el que tiene el foco.</li>
        <li>Para anuncios urgentes, incluye el mensaje en <code>title</code> o <code>description</code> del objeto que recibe el gestor.</li>
        <li><code>data-limited</code> oculta los avisos sobre el límite. Base UI conserva esos avisos en la cola hasta que se cierren o vuelvan a estar disponibles.</li>
      </ul>
    </section>
  );
}
