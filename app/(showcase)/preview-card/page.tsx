import { ShowcasePage, ShowcaseExample } from "@/components/shared/showcase";
import Link from "next/link";
import type { ComponentProps } from "react";
import {
  PreviewCard,
  PreviewCardBackdrop,
  PreviewCardPopup,
  PreviewCardPortal,
  PreviewCardPositioner,
  PreviewCardTrigger,
  type PreviewCardPositionerProps,
  type PreviewCardTriggerProps,
} from "@/components/own/base/preview-card";
import { Anatomy, ApiReference } from "./api-reference";
import { ControlledExample, DetachedTriggersExample, PreviewSummary } from "./examples";


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
    <ShowcasePage title="Preview Card" implementation="@base-ui/react/preview-card" description="Vista previa visual del destino de un enlace al pasar el puntero o enfocarlo con el teclado.">
        <ShowcaseExample contentClassName="flex justify-center" title="Vista previa de un enlace" description={<>Pasa el puntero sobre <code>PreviewCardTrigger</code> o enfócalo con Tab para ver el resumen, y activa el enlace para abrir su destino.</>}>
          <p className="body-sm text-center">
            Para representar un valor en un rango, consulta{" "}
            <LinkPreview href="/meter" preview={{ category: "Medición", title: "Meter", summary: "Representa gráficamente un valor escalar dentro de un rango conocido." }} />.
          </p>
        </ShowcaseExample>
        <ShowcaseExample contentClassName="flex justify-center" title="Demoras de apertura y cierre" description={<>Usa <code>delay</code> para abrir antes y <code>closeDelay</code> para mantener visible la tarjeta al alejar el puntero.</>}>
          <LinkPreview
            href="/input"
            preview={{ category: "Entrada", title: "Input", summary: "Control nativo para editar una línea de texto con una etiqueta HTML o dentro de Field." }}
            triggerProps={{ delay: 180, closeDelay: 650 }}
          />
        </ShowcaseExample>
        <ShowcaseExample contentClassName="flex justify-center" title="Lado y alineación" description={<>Coloca la tarjeta sobre el enlace con <code>{'side="top"'}</code> y alinea sus bordes iniciales con <code>{'align="start"'}</code>.</>}>
          <LinkPreview
            href="/avatar"
            preview={{ category: "Identidad", title: "Avatar", summary: "Muestra una imagen de perfil con iniciales o contenido alternativo." }}
            positionerProps={{ side: "top", align: "start", sideOffset: 12 }}
          />
        </ShowcaseExample>
        <ShowcaseExample contentClassName="flex justify-center" title="Fondo visual" description={<>Añade <code>PreviewCardBackdrop</code> para atenuar la página mientras se muestra el resumen.</>}>
          <LinkPreview
            href="/accordion"
            preview={{ category: "Contenido", title: "Accordion", summary: "Organiza información en paneles que se abren y cierran de forma individual o múltiple." }}
            backdrop
          />
        </ShowcaseExample>
        <ShowcaseExample contentClassName="flex justify-center" title="Activadores separados" description={<>Pasa de un enlace al otro para cambiar el <code>payload</code> del mismo <code>handle</code> y ver cómo entra el nuevo contenido en <code>PreviewCardViewport</code>.</>}>
          <DetachedTriggersExample />
        </ShowcaseExample>
        <ShowcaseExample contentClassName="flex justify-center" title="Apertura controlada" description={<>Abre la vista de Meter desde el botón externo y usa <code>open</code> y <code>triggerId</code> para anclarla al enlace correspondiente.</>}>
          <ControlledExample />
        </ShowcaseExample>
        <Anatomy />
        <ApiReference />
    </ShowcasePage>
  );
}
