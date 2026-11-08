import { ShowcasePage, ShowcaseExample } from "@/components/shared/showcase";
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
    <ShowcasePage title="Tooltip" implementation="@base-ui/react/tooltip" description="Indicación breve anclada a un control al pasar el puntero o enfocarlo con el teclado.">
        <ShowcaseExample contentClassName="flex flex-wrap items-center justify-center gap-3" title="Indicación contextual" description={<>Pasa el puntero sobre <code>TooltipTrigger</code> o enfócalo con Tab para mostrar la ayuda, y pulsa Escape para ocultarla.</>}>
          <TooltipHint
            trigger="Archivar conversación"
            hint="Traslada el hilo al archivo sin eliminar sus mensajes."
          />
        </ShowcaseExample>
        <ShowcaseExample contentClassName="flex flex-wrap items-center justify-center gap-3" title="Grupo con apertura inmediata" description={<>Envuelve varios controles en <code>TooltipProvider</code> para compartir <code>delay</code> y abrir sin espera las indicaciones contiguas.</>}>
          <TooltipProvider delay={250}>
            <TooltipHint trigger="Negrita" hint="Aplica énfasis fuerte (Ctrl + B)" />
            <TooltipHint trigger="Cursiva" hint="Aplica énfasis en cursiva (Ctrl + I)" />
            <TooltipHint trigger="Código" hint="Formatea como fragmento en línea (Ctrl + E)" />
          </TooltipProvider>
        </ShowcaseExample>
        <ShowcaseExample contentClassName="flex flex-wrap items-center justify-center gap-3" title="Lado, alineación y flecha" description={<>Coloca la indicación bajo el control con <code>{'side="bottom"'}</code>, alinea su inicio con <code>{'align="start"'}</code> y añade <code>TooltipArrow</code>.</>}>
          <TooltipHint
            trigger="Sincronizar catálogo"
            hint="Actualiza las referencias locales con la última versión publicada."
            positionerProps={{ side: "bottom", align: "start", sideOffset: 10 }}
            arrow
          />
        </ShowcaseExample>
        <ShowcaseExample contentClassName="flex flex-wrap items-center justify-center gap-3" title="Permanecer abierto al pulsar" description={<>Usa <code>{'closeOnClick={false}'}</code> en <code>TooltipTrigger</code> para conservar visible la indicación después de activar el botón.</>}>
          <TooltipHint
            trigger="Copiar enlace"
            hint="El enlace permanece visible mientras el puntero o el foco sigan en el botón."
            triggerProps={{ delay: 150, closeOnClick: false }}
          />
        </ShowcaseExample>
        <ShowcaseExample contentClassName="flex flex-wrap items-center justify-center gap-3" title="Seguimiento del puntero" description={<>Configura <code>{'trackCursorAxis="x"'}</code> en <code>Tooltip</code> para que la indicación acompañe horizontalmente al cursor.</>}>
          <TooltipHint
            trigger="Recorrer línea de tiempo"
            hint="Sigue la posición horizontal del puntero sobre el control."
            rootProps={{ trackCursorAxis: "x" }}
            triggerProps={{ delay: 100 }}
          />
        </ShowcaseExample>
        <ShowcaseExample contentClassName="flex flex-wrap items-center justify-center gap-3" title="Activadores separados" description={<>Comparte un <code>handle</code> entre varios controles y usa su <code>payload</code> para cambiar el contenido en <code>TooltipViewport</code>.</>}>
          <DetachedTriggersExample />
        </ShowcaseExample>
        <ShowcaseExample contentClassName="flex flex-wrap items-center justify-center gap-3" title="Apertura controlada" description={<>Controla <code>open</code> y <code>triggerId</code> para mostrar la ayuda desde un botón externo y anclarla al control elegido.</>}>
          <ControlledExample />
        </ShowcaseExample>
        <Anatomy />
        <ApiReference />
    </ShowcasePage>
  );
}
