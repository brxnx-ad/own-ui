import { ShowcasePage, ShowcaseExample } from "@/components/shared/showcase";
import { Separator } from "@/components/own/base/separator";
import { Anatomy, ApiReference } from "./api-reference";


export default function SeparatorShowcasePage() {
  return (
    <ShowcasePage title="Separator" implementation="@base-ui/react/separator" description="División horizontal o vertical entre grupos de contenido.">
        <ShowcaseExample contentClassName="mx-auto w-full max-w-sm" title="Separación entre bloques" description={<>Inserta <code>Separator</code> entre bloques apilados para marcar una división horizontal.</>}>
          <div className="grid gap-4">
            <div className="space-y-1">
              <h3 className="h5">Resumen del pedido</h3>
              <p className="body-sm text-content-base">Tres productos confirmados.</p>
            </div>
            <Separator />
            <div className="space-y-1">
              <h3 className="h5">Entrega</h3>
              <p className="body-sm text-content-base">Retiro en tienda desde el jueves.</p>
            </div>
          </div>
        </ShowcaseExample>
        <ShowcaseExample contentClassName="mx-auto w-full max-w-sm" title="Separación entre columnas" description={<>Usa <code>{'orientation="vertical"'}</code> para que la línea cubra el alto de la fila.</>}>
          <div className="flex gap-3 sm:gap-5">
            <div className="min-w-0 flex-1 space-y-1">
              <h3 className="h5">En curso</h3>
              <p className="body-sm text-content-base">3 tareas</p>
            </div>
            <Separator orientation="vertical" />
            <div className="min-w-0 flex-1 space-y-1">
              <h3 className="h5">Terminadas</h3>
              <p className="body-sm text-content-base">8 tareas</p>
            </div>
          </div>
        </ShowcaseExample>
        <ShowcaseExample contentClassName="mx-auto w-full max-w-sm" title="División decorativa" description={<>Añade <code>aria-hidden</code> si la línea solo separa elementos visualmente.</>}>
          <div className="body-sm flex justify-center gap-3 text-content-base">
            <span>Guía de diseño</span>
            <Separator orientation="vertical" aria-hidden />
            <span>4 min de lectura</span>
          </div>
        </ShowcaseExample>
        <ShowcaseExample contentClassName="mx-auto w-full max-w-sm" title="Cambio de tema en un texto" description={<>Usa <code>{'render={<hr />}'}</code> para representar un cambio temático con el elemento HTML correspondiente.</>}>
          <div className="body-sm grid gap-4">
            <p>La primera prueba confirmó el diseño.</p>
            <Separator render={<hr />} />
            <p>Al día siguiente comenzó la revisión de accesibilidad.</p>
          </div>
        </ShowcaseExample>
        <Anatomy />
        <ApiReference />
    </ShowcasePage>
  );
}
