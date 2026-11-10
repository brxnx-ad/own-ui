import { ShowcasePage, ShowcaseExample } from "@/components/shared/showcase";
import { Anatomy, ApiReference } from "./api-reference";
import {
  AsyncExample,
  ConfirmationExample,
  ControlledExample,
  DestructiveExample,
  DetachedTriggersExample,
  LongContentExample,
} from "./examples";


export default function AlertDialogShowcasePage() {
  return (
    <ShowcasePage title="Alert Dialog" implementation="@base-ui/react/alert-dialog" description="Diálogos modales para confirmar acciones que requieren una decisión explícita." note={<><p className="body-sm text-content-base">Las acciones solo modifican la vista previa de cada ejemplo.</p></>}>
        <ShowcaseExample contentClassName="flex flex-col items-center gap-6" title="Confirmación básica" description={<>Restablecer cambia las preferencias de la vista previa; Cancelar las conserva. El diálogo gestiona su apertura sin <code>open</code>.</>}>
          <ConfirmationExample />
        </ShowcaseExample>
        <ShowcaseExample contentClassName="flex flex-col items-center gap-6" title="Acción destructiva" description={<>Descarta el borrador de la vista previa. Al abrir, <code>initialFocus</code> sitúa el foco en Cancelar.</>}>
          <DestructiveExample />
        </ShowcaseExample>
        <ShowcaseExample contentClassName="flex flex-col items-center gap-6" title="Apertura desde el estado" description={<>Publica el informe controlando la apertura desde un botón externo con <code>open</code> y <code>onOpenChange</code>.</>}>
          <ControlledExample />
        </ShowcaseExample>
        <ShowcaseExample contentClassName="flex flex-col items-center gap-6" title="Confirmación con espera" description={<>Crear copia muestra <code>loading</code> y bloquea el cierre hasta que termina la operación simulada.</>}>
          <AsyncExample />
        </ShowcaseExample>
        <ShowcaseExample contentClassName="flex flex-col items-center gap-6" title="Error y reintento" description="El primer intento falla intencionalmente y mantiene el diálogo abierto; Reintentar completa la copia.">
          <AsyncExample failFirstAttempt />
        </ShowcaseExample>
        <ShowcaseExample contentClassName="flex flex-col items-center gap-6" title="Un diálogo, dos activadores" description={<>Ambos botones abren un único diálogo con <code>handle</code>; cada uno envía una plantilla distinta mediante <code>payload</code>.</>}>
          <DetachedTriggersExample />
        </ShowcaseExample>
        <ShowcaseExample contentClassName="flex flex-col items-center gap-6" title="Contenido desplazable" description="Abre la revisión y desplaza el detalle: el encabezado y las acciones permanecen disponibles para confirmar o cancelar.">
          <LongContentExample />
        </ShowcaseExample>
        <Anatomy />
        <ApiReference />
    </ShowcasePage>
  );
}
