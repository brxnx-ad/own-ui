import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Anatomy, ApiReference } from "./api-reference";
import {
  AsyncExample,
  ConfirmationExample,
  ControlledExample,
  DestructiveExample,
  DetachedTriggersExample,
  LongContentExample,
} from "./examples";

function Behavior({ title, description, children }: {
  title: string;
  description: ReactNode;
  children: ReactNode;
}) {
  return (
    <section aria-label={title} className="space-y-4">
      <div className="space-y-2">
        <h2 className="h3">{title}</h2>
        <p className="body-sm text-gray-bold/75">{description}</p>
      </div>
      <div className="flex flex-col items-center rounded-2xl border border-gray-base bg-surface-base p-6 shadow-s sm:p-8">
        {children}
      </div>
    </section>
  );
}

export default function AlertDialogShowcasePage() {
  return (
    <main className="min-h-screen bg-surface-soft px-6 py-12 text-gray-bold sm:px-12">
      <div className="mx-auto max-w-4xl space-y-12">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-gray-bold/70 transition-colors hover:text-gray-bold">
              <ArrowLeft className="size-4" />
              Volver al catálogo
            </Link>
            <ThemeToggle />
          </div>
          <header className="space-y-2">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="h1">Alert Dialog</h1>
              <span className="caption rounded-base bg-primary-soft px-2.5 py-0.5 font-semibold text-primary-bold">
                @base-ui/react/alert-dialog
              </span>
            </div>
            <p className="subtitle">Diálogos modales para confirmar acciones que requieren una decisión explícita.</p>
            <p className="body-sm text-gray-bold/75">Las acciones solo modifican la vista previa de cada ejemplo.</p>
          </header>
        </div>
        <Behavior title="Confirmación básica" description={<>Restablecer cambia las preferencias de la vista previa; Cancelar las conserva. El diálogo gestiona su apertura sin <code>open</code>.</>}>
          <ConfirmationExample />
        </Behavior>
        <Behavior title="Acción destructiva" description={<>Descarta el borrador de la vista previa. Al abrir, <code>initialFocus</code> sitúa el foco en Cancelar.</>}>
          <DestructiveExample />
        </Behavior>
        <Behavior title="Apertura desde el estado" description={<>Publica el informe controlando la apertura desde un botón externo con <code>open</code> y <code>onOpenChange</code>.</>}>
          <ControlledExample />
        </Behavior>
        <Behavior title="Confirmación con espera" description={<>Crear copia muestra <code>loading</code> y bloquea el cierre hasta que termina la operación simulada.</>}>
          <AsyncExample />
        </Behavior>
        <Behavior title="Error y reintento" description="El primer intento falla intencionalmente y mantiene el diálogo abierto; Reintentar completa la copia.">
          <AsyncExample failFirstAttempt />
        </Behavior>
        <Behavior title="Un diálogo, dos activadores" description={<>Ambos botones abren un único diálogo con <code>handle</code>; cada uno envía una plantilla distinta mediante <code>payload</code>.</>}>
          <DetachedTriggersExample />
        </Behavior>
        <Behavior title="Contenido desplazable" description="Abre la revisión y desplaza el detalle: el encabezado y las acciones permanecen disponibles para confirmar o cancelar.">
          <LongContentExample />
        </Behavior>
        <Anatomy />
        <ApiReference />
      </div>
    </main>
  );
}
