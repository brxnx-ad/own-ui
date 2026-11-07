const anatomy = `<AlertDialog>
  <AlertDialogTrigger render={<Button variant="secondary" />}>
    Restablecer preferencias
  </AlertDialogTrigger>
  <AlertDialogPortal>
    <AlertDialogBackdrop />
    <AlertDialogViewport>
      <AlertDialogPopup>
        <div className="space-y-2">
          <AlertDialogTitle>¿Restablecer las preferencias?</AlertDialogTitle>
          <AlertDialogDescription>
            Se recuperarán los valores predeterminados.
          </AlertDialogDescription>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
          <AlertDialogClose render={<Button variant="secondary" />}>
            Cancelar
          </AlertDialogClose>
          <AlertDialogClose render={<Button />}>Restablecer</AlertDialogClose>
        </div>
      </AlertDialogPopup>
    </AlertDialogViewport>
  </AlertDialogPortal>
</AlertDialog>`;

const parts = [
  ["AlertDialog", "Coordina el estado y la modalidad. No renderiza un elemento HTML."],
  ["AlertDialogTrigger", "Abre el diálogo y aporta el payload opcional del activador."],
  ["AlertDialogPortal", "Traslada las piezas superpuestas al body o al contenedor indicado."],
  ["AlertDialogBackdrop", "Atenúa el contenido exterior sin cerrar el diálogo al pulsarlo."],
  ["AlertDialogViewport", "Centra el popup, reserva espacio exterior y permite desplazamiento."],
  ["AlertDialogPopup", "Contiene el diálogo con role=alertdialog y gestiona el foco."],
  ["AlertDialogTitle", "Etiqueta el diálogo; renderiza h2 por defecto."],
  ["AlertDialogDescription", "Asocia una descripción accesible al diálogo."],
  ["AlertDialogClose", "Solicita el cierre. Se compone con Button para cancelar o confirmar."],
];

const groups = [
  { name: "AlertDialog", rows: [
    ["defaultOpen", "boolean", "false", "Sí", "Abre inicialmente el diálogo no controlado. No combinar con open."],
    ["open", "boolean", "—", "Sí", "Controla la apertura. Usar con onOpenChange para responder a las solicitudes de cambio."],
    ["onOpenChange", "(open: boolean, eventDetails) => void", "—", "Sí", "Se ejecuta al solicitar abrir o cerrar. eventDetails.cancel() cancela la solicitud. Los cambios externos de open no disparan este callback."],
    ["onOpenChangeComplete", "(open: boolean) => void", "—", "Sí", "Se ejecuta cuando termina la transición de apertura o cierre."],
    ["handle", "AlertDialogHandle<Payload>", "—", "Sí", "Vincula activadores externos con esta raíz. Crear una instancia estable con createAlertDialogHandle<Payload>()."],
    ["children", "ReactNode | ({ payload: Payload | undefined }) => ReactNode", "—", "Sí", "Compone las piezas; la forma de función recibe los datos del activador activo."],
    ["triggerId", "string | null", "—", "Sí", "Identifica el activador activo en modo controlado, especialmente con varios activadores. Usar su id para mantener la asociación y el retorno del foco."],
    ["defaultTriggerId", "string | null", "null", "Sí", "Asocia el activador inicial cuando se utiliza defaultOpen."],
    ["actionsRef", "RefObject<{ close(): void; unmount(): void } | null>", "—", "Sí", "Permite cerrar de forma imperativa. Para animaciones de cierre externas, llamar antes a eventDetails.preventUnmountOnClose() y después a unmount(); Portal.keepMounted determina si el contenido se retira del DOM."],
  ]},
  { name: "AlertDialogTrigger", rows: [
    ["handle", "AlertDialogHandle<Payload>", "—", "Condicional", "Necesario si el activador está fuera de AlertDialog; debe coincidir con el handle de la raíz."],
    ["payload", "Payload", "—", "Sí", "Datos disponibles en la función children de la raíz al abrir desde este activador."],
    ["id", "string", "ID generado", "Sí", "Identificador que permite referenciar este activador con triggerId o defaultTriggerId."],
  ]},
  { name: "AlertDialogTrigger / AlertDialogClose", rows: [
    ["disabled", "boolean", "false", "Sí", "Impide activar este botón."],
    ["nativeButton", "boolean", "true", "Sí", "Indica si render produce un button nativo. Usar false para otro elemento y conservar el comportamiento accesible de botón."],
  ]},
  { name: "AlertDialogPortal", rows: [
    ["container", "HTMLElement | ShadowRoot | RefObject<HTMLElement | ShadowRoot | null> | null", "body", "Sí", "Contenedor de destino del portal; debe permitir el posicionamiento y apilamiento de sus piezas."],
    ["keepMounted", "boolean", "false", "Sí", "Conserva el contenido cerrado en el DOM y su estado local; permanece oculto y fuera de la navegación por foco."],
  ]},
  { name: "AlertDialogBackdrop", rows: [
    ["forceRender", "boolean", "false", "Sí", "Permite renderizar un backdrop propio también en diálogos anidados."],
  ]},
  { name: "AlertDialogPopup", rows: [
    ["initialFocus", "boolean | RefObject<HTMLElement | null> | (interactionType) => boolean | HTMLElement | null | void", "Primer elemento enfocable; popup con apertura táctil", "Sí", "Destino del foco al abrir. Una referencia permite enfocar Cancelar en confirmaciones destructivas. false evita mover el foco."],
    ["finalFocus", "boolean | RefObject<HTMLElement | null> | (interactionType) => boolean | HTMLElement | null | void", "Activador o elemento enfocado previamente", "Sí", "Destino del foco al cerrar. Define una referencia alternativa si el activador deja de existir. false evita devolver el foco."],
  ]},
  { name: "Piezas con elemento HTML", rows: [
    ["className", "string | (state) => string | undefined", "Estilos de own-ui", "Sí", "Añade clases estáticas o dependientes del estado, combinadas mediante clsx. Usa style o selectores más específicos para sobrescribir propiedades en conflicto."],
    ["style", "CSSProperties | (state) => CSSProperties | undefined", "—", "Sí", "Añade estilos estáticos o dependientes del estado."],
    ["render", "ReactElement | (props, state) => ReactElement", "Elemento de cada pieza", "Sí", "Sustituye el elemento o compone con Button sin anidar botones. Propaga las props y ref en la forma de función y conserva la semántica de la pieza."],
    ["ref", "Ref del elemento renderizado", "—", "Sí", "Acceso al elemento DOM, incluido el destino de initialFocus y finalFocus."],
  ]},
  { name: "createAlertDialogHandle<Payload>()", rows: [
    ["Retorno", "AlertDialogHandle<Payload>", "Nueva instancia", "—", "Crea el vínculo entre una raíz y sus activadores. Mantener la instancia estable durante la vida del componente."],
  ]},
  { name: "AlertDialogHandle<Payload>", rows: [
    ["open", "(triggerId: string | null) => void", "—", "—", "Abre asociado a un activador que comparta el handle; null abre sin activador."],
    ["openWithPayload", "(payload: Payload) => void", "—", "—", "Abre con datos sin asociar un activador."],
    ["close", "() => void", "—", "—", "Solicita el cierre del diálogo."],
    ["isOpen", "boolean (solo lectura)", "false", "—", "Consulta la apertura actual; no es una suscripción de React. Los métodos solo tienen efecto mientras una raíz con el handle está montada."],
  ]},
];

export function Anatomy() {
  return (
    <section aria-labelledby="anatomy-heading" className="space-y-4">
      <h2 id="anatomy-heading" className="h3">Anatomía</h2>
      <p className="body-sm text-gray-bold/75">Nueve piezas con acciones compuestas mediante Button:</p>
      <pre aria-label="Composición de Alert Dialog en JSX" className="overflow-x-auto rounded-2xl border border-gray-base bg-surface-base p-6 text-sm text-gray-bold"><code>{anatomy}</code></pre>
      <div role="region" aria-label="Tabla de anatomía" tabIndex={0} className="overflow-x-auto rounded-2xl border border-gray-base bg-surface-base focus-visible:outline-2 focus-visible:outline-primary-base">
        <table className="w-full text-left body-sm">
          <caption className="sr-only">Piezas de Alert Dialog y sus responsabilidades</caption>
          <thead className="bg-surface-bold"><tr><th scope="col" className="p-4">Pieza</th><th scope="col" className="p-4">Responsabilidad</th></tr></thead>
          <tbody>{parts.map(([name, description]) => (
            <tr key={name} className="border-t border-gray-base">
              <th scope="row" className="p-4 font-mono text-xs">{name}</th><td className="p-4">{description}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </section>
  );
}

export function ApiReference() {
  return (
    <section aria-labelledby="api-heading" className="space-y-4">
      <h2 id="api-heading" className="h3">Referencia de API</h2>
      <p className="body-sm text-gray-bold/75">Props de cada pieza y utilidades para compartir el diálogo entre activadores.</p>
      <div role="region" aria-label="Tabla de referencia de API" tabIndex={0} className="overflow-x-auto rounded-2xl border border-gray-base bg-surface-base focus-visible:outline-2 focus-visible:outline-primary-base">
        <table className="w-full min-w-3xl text-left body-sm">
          <caption className="sr-only">API de Alert Dialog: tipos, valores predeterminados y condiciones</caption>
          <thead className="bg-surface-bold"><tr>{["Pieza", "Prop o callback", "Tipo", "Predeterminado", "Opcional", "Función"].map(label => <th key={label} scope="col" className="p-4">{label}</th>)}</tr></thead>
          {groups.map(group => (
            <tbody key={group.name}>
              {group.rows.map(([name, type, defaultValue, optional, description], index) => (
                <tr key={name} className="border-t border-gray-base align-top">
                  {index === 0 && <th scope="rowgroup" rowSpan={group.rows.length} className="p-4 font-medium">{group.name}</th>}
                  <th scope="row" className="p-4 font-mono text-xs">{name}</th>
                  <td className="p-4 font-mono text-xs">{type}</td>
                  <td className="p-4">{defaultValue}</td>
                  <td className="p-4">{optional}</td>
                  <td className="min-w-64 p-4">{description}</td>
                </tr>
              ))}
            </tbody>
          ))}
        </table>
      </div>
      <dl className="space-y-3 body-sm text-gray-bold/75">
        <div><dt className="inline font-medium text-gray-bold">Eventos: </dt><dd className="inline"><code>eventDetails</code> incluye el evento original, <code>reason</code> y <code>cancel()</code>. Los motivos tipados son <code>trigger-press</code>, <code>close-press</code>, <code>escape-key</code>, <code>imperative-action</code>, <code>none</code>, <code>outside-press</code> y <code>focus-out</code>; los dos últimos no cierran un Alert Dialog mediante interacción exterior.</dd></div>
        <div><dt className="inline font-medium text-gray-bold">Accesibilidad: </dt><dd className="inline">Incluye un título, una descripción breve y una acción de cancelación. Tab y Mayús+Tab recorren el diálogo, Enter y Espacio activan sus botones y Escape solicita el cierre. El foco permanece dentro y se devuelve al cerrar; el desplazamiento de la página queda bloqueado.</dd></div>
        <div><dt className="inline font-medium text-gray-bold">Carga asíncrona: </dt><dd className="inline">Usa Button con <code>loading</code> para confirmar, controla <code>open</code> y cancela las solicitudes de cierre mientras la operación está pendiente. AlertDialogClose cierra de inmediato y se reserva para acciones que puedan terminar de forma síncrona.</dd></div>
        <div><dt className="inline font-medium text-gray-bold">Atributos y movimiento: </dt><dd className="inline">Las piezas DOM aceptan atributos HTML y exponen <code>data-slot</code>. Base UI añade los estados de cada pieza, como <code>data-open</code>, <code>data-closed</code>, <code>data-starting-style</code> y <code>data-ending-style</code>. Se respeta el movimiento reducido.</dd></div>
        <div><dt className="inline font-medium text-gray-bold">Modalidad: </dt><dd className="inline">El diálogo siempre es modal y pulsar fuera no lo cierra. La raíz no acepta <code>modal</code> ni <code>disablePointerDismissal</code>.</dd></div>
      </dl>
    </section>
  );
}
