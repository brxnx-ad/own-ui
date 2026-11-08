import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Button } from "@/components/own/base/button";
import {
  Tooltip,
  TooltipArrow,
  TooltipPopup,
  TooltipPortal,
  TooltipPositioner,
  TooltipProvider,
  TooltipTrigger,
  type TooltipPositionerProps,
  type TooltipProps,
  type TooltipTriggerProps,
} from "@/components/own/base/tooltip";
import { Anatomy, ApiReference } from "./api-reference";
import { ControlledExample, DetachedTriggersExample } from "./examples";

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
      <div className="flex flex-wrap justify-center gap-2 rounded-2xl border border-gray-base bg-surface-base p-6 shadow-s sm:p-8">
        {children}
      </div>
    </section>
  );
}

function TooltipHint({ trigger, hint, rootProps, triggerProps, positionerProps, arrow }: {
  trigger: string;
  hint: string;
  rootProps?: Pick<TooltipProps, "disableHoverablePopup" | "trackCursorAxis">;
  triggerProps?: Pick<TooltipTriggerProps, "delay" | "closeDelay" | "closeOnClick">;
  positionerProps?: Pick<TooltipPositionerProps, "side" | "align" | "sideOffset">;
  arrow?: boolean;
}) {
  return (
    <Tooltip {...rootProps}>
      <TooltipTrigger render={<Button variant="outline" />} {...triggerProps}>
        {trigger}
      </TooltipTrigger>
      <TooltipPortal>
        <TooltipPositioner {...positionerProps}>
          <TooltipPopup>
            {arrow && <TooltipArrow />}
            <span>{hint}</span>
          </TooltipPopup>
        </TooltipPositioner>
      </TooltipPortal>
    </Tooltip>
  );
}

export default function TooltipShowcasePage() {
  return (
    <main className="min-h-screen bg-surface-soft px-6 py-12 text-gray-bold sm:px-12">
      <div className="mx-auto max-w-4xl space-y-12">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-gray-bold/70 transition-colors hover:text-gray-bold">
              <ArrowLeft aria-hidden className="size-4" />
              Volver al catálogo
            </Link>
            <ThemeToggle />
          </div>
          <header className="space-y-2">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="h1">Tooltip</h1>
              <span className="caption rounded-base bg-primary-soft px-2.5 py-0.5 font-semibold text-gray-bold">
                @base-ui/react/tooltip
              </span>
            </div>
            <p className="subtitle">Indicación breve anclada a un control al pasar el puntero o enfocarlo con el teclado.</p>
          </header>
        </div>

        <Behavior title="Indicación contextual" description={<>Pasa el puntero sobre <code>TooltipTrigger</code> o enfócalo con Tab para mostrar la ayuda, y pulsa Escape para ocultarla.</>}>
          <TooltipHint
            trigger="Archivar conversación"
            hint="Traslada el hilo al archivo sin eliminar sus mensajes."
          />
        </Behavior>

        <Behavior title="Grupo con apertura inmediata" description={<>Envuelve varios controles en <code>TooltipProvider</code> para compartir <code>delay</code> y abrir sin espera las indicaciones contiguas.</>}>
          <TooltipProvider delay={250}>
            <TooltipHint trigger="Negrita" hint="Aplica énfasis fuerte (Ctrl + B)" />
            <TooltipHint trigger="Cursiva" hint="Aplica énfasis en cursiva (Ctrl + I)" />
            <TooltipHint trigger="Código" hint="Formatea como fragmento en línea (Ctrl + E)" />
          </TooltipProvider>
        </Behavior>

        <Behavior title="Lado, alineación y flecha" description={<>Coloca la indicación bajo el control con <code>{'side="bottom"'}</code>, alinea su inicio con <code>{'align="start"'}</code> y añade <code>TooltipArrow</code>.</>}>
          <TooltipHint
            trigger="Sincronizar catálogo"
            hint="Actualiza las referencias locales con la última versión publicada."
            positionerProps={{ side: "bottom", align: "start", sideOffset: 10 }}
            arrow
          />
        </Behavior>

        <Behavior title="Permanecer abierto al pulsar" description={<>Usa <code>{'closeOnClick={false}'}</code> en <code>TooltipTrigger</code> para conservar visible la indicación después de activar el botón.</>}>
          <TooltipHint
            trigger="Copiar enlace"
            hint="El enlace permanece visible mientras el puntero o el foco sigan en el botón."
            triggerProps={{ delay: 150, closeOnClick: false }}
          />
        </Behavior>

        <Behavior title="Seguimiento del puntero" description={<>Configura <code>{'trackCursorAxis="x"'}</code> en <code>Tooltip</code> para que la indicación acompañe horizontalmente al cursor.</>}>
          <TooltipHint
            trigger="Recorrer línea de tiempo"
            hint="Sigue la posición horizontal del puntero sobre el control."
            rootProps={{ trackCursorAxis: "x" }}
            triggerProps={{ delay: 100 }}
          />
        </Behavior>

        <Behavior title="Activadores separados" description={<>Comparte un <code>handle</code> entre varios controles y usa su <code>payload</code> para cambiar el contenido en <code>TooltipViewport</code>.</>}>
          <DetachedTriggersExample />
        </Behavior>

        <Behavior title="Apertura controlada" description={<>Controla <code>open</code> y <code>triggerId</code> para mostrar la ayuda desde un botón externo y anclarla al control elegido.</>}>
          <ControlledExample />
        </Behavior>

        <Anatomy />
        <ApiReference />
      </div>
    </main>
  );
}
