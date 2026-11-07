import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import {
  PreviewCard,
  PreviewCardBackdrop,
  PreviewCardPopup,
  PreviewCardPortal,
  PreviewCardPositioner,
  PreviewCardTrigger,
  type PreviewCardPositionerProps,
  type PreviewCardTriggerProps,
} from "@/components/own/independant/preview-card";
import { Anatomy, ApiReference } from "./api-reference";
import { ControlledExample, DetachedTriggersExample, PreviewSummary } from "./examples";

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
      <div className="flex justify-center rounded-2xl border border-gray-base bg-surface-base p-6 shadow-s sm:p-8">
        {children}
      </div>
    </section>
  );
}

function LinkPreview({ href, preview, triggerProps, positionerProps, backdrop }: {
  href: string;
  preview: ComponentProps<typeof PreviewSummary>;
  triggerProps?: Pick<PreviewCardTriggerProps, "delay" | "closeDelay">;
  positionerProps?: Pick<PreviewCardPositionerProps, "side" | "align" | "sideOffset">;
  backdrop?: boolean;
}) {
  return (
    <PreviewCard>
      <PreviewCardTrigger render={<Link href={href} />} {...triggerProps}>{preview.title}</PreviewCardTrigger>
      <PreviewCardPortal>
        {backdrop && <PreviewCardBackdrop />}
        <PreviewCardPositioner {...positionerProps}>
          <PreviewCardPopup>
            <PreviewSummary {...preview} />
          </PreviewCardPopup>
        </PreviewCardPositioner>
      </PreviewCardPortal>
    </PreviewCard>
  );
}

export default function PreviewCardShowcasePage() {
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
              <h1 className="h1">Preview Card</h1>
              <span className="caption rounded-base bg-primary-soft px-2.5 py-0.5 font-semibold text-gray-bold">
                @base-ui/react/preview-card
              </span>
            </div>
            <p className="subtitle">Vista previa visual del destino de un enlace al pasar el puntero o enfocarlo con el teclado.</p>
          </header>
        </div>
        <Behavior title="Vista previa de un enlace" description={<>Pasa el puntero sobre <code>PreviewCardTrigger</code> o enfócalo con Tab para ver el resumen, y activa el enlace para abrir su destino.</>}>
          <p className="body-sm text-center">
            Para representar un valor en un rango, consulta{" "}
            <LinkPreview href="/meter" preview={{ category: "Medición", title: "Meter", summary: "Representa gráficamente un valor escalar dentro de un rango conocido." }} />.
          </p>
        </Behavior>
        <Behavior title="Demoras de apertura y cierre" description={<>Usa <code>delay</code> para abrir antes y <code>closeDelay</code> para mantener visible la tarjeta al alejar el puntero.</>}>
          <LinkPreview
            href="/input"
            preview={{ category: "Entrada", title: "Input", summary: "Control nativo para editar una línea de texto con una etiqueta HTML o dentro de Field." }}
            triggerProps={{ delay: 180, closeDelay: 650 }}
          />
        </Behavior>
        <Behavior title="Lado y alineación" description={<>Coloca la tarjeta sobre el enlace con <code>{'side="top"'}</code> y alinea sus bordes iniciales con <code>{'align="start"'}</code>.</>}>
          <LinkPreview
            href="/avatar"
            preview={{ category: "Identidad", title: "Avatar", summary: "Muestra una imagen de perfil con iniciales o contenido alternativo." }}
            positionerProps={{ side: "top", align: "start", sideOffset: 12 }}
          />
        </Behavior>
        <Behavior title="Fondo visual" description={<>Añade <code>PreviewCardBackdrop</code> para atenuar la página mientras se muestra el resumen.</>}>
          <LinkPreview
            href="/accordion"
            preview={{ category: "Contenido", title: "Accordion", summary: "Organiza información en paneles que se abren y cierran de forma individual o múltiple." }}
            backdrop
          />
        </Behavior>
        <Behavior title="Activadores separados" description={<>Pasa de un enlace al otro para cambiar el <code>payload</code> del mismo <code>handle</code> y ver cómo entra el nuevo contenido en <code>PreviewCardViewport</code>.</>}>
          <DetachedTriggersExample />
        </Behavior>
        <Behavior title="Apertura controlada" description={<>Abre la vista de Meter desde el botón externo y usa <code>open</code> y <code>triggerId</code> para anclarla al enlace correspondiente.</>}>
          <ControlledExample />
        </Behavior>
        <Anatomy />
        <ApiReference />
      </div>
    </main>
  );
}
