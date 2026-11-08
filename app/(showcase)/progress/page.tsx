import { ShowcasePage, ShowcaseExample } from "@/components/shared/showcase";
import {
  Progress,
  ProgressIndicator,
  ProgressLabel,
  ProgressTrack,
  ProgressValue,
} from "@/components/own/base/progress";
import { Anatomy, ApiReference } from "./api-reference";
import { BatchExample, IndeterminateExample } from "./examples";


export default function ProgressShowcasePage() {
  return (
    <ShowcasePage title="Progress" implementation="@base-ui/react/progress" description="Barra de progreso para tareas con avance conocido o duración aún indeterminada.">
        <ShowcaseExample contentClassName="mx-auto w-full max-w-md" title="Avance determinado" description={<>Usa <code>value</code> para indicar cuánto ha avanzado la tarea y muestra el porcentaje con <code>ProgressValue</code>.</>}>
          <Progress value={64} locale="es-CL">
            <ProgressLabel>Exportación del informe</ProgressLabel>
            <ProgressValue />
            <ProgressTrack>
              <ProgressIndicator />
            </ProgressTrack>
          </Progress>
        </ShowcaseExample>
        <ShowcaseExample contentClassName="mx-auto w-full max-w-md" title="Rango y unidades" description={<>Representa una copia reanudada entre <code>{'min={1}'}</code> y <code>{'max={4}'}</code> y muestra los gigabytes copiados con <code>format</code>.</>}>
          <Progress value={2.5} min={1} max={4} locale="es-CL" format={{ style: "unit", unit: "gigabyte" }}>
            <ProgressLabel>Datos copiados</ProgressLabel>
            <ProgressValue />
            <ProgressTrack>
              <ProgressIndicator />
            </ProgressTrack>
          </Progress>
        </ShowcaseExample>
        <ShowcaseExample contentClassName="mx-auto w-full max-w-md" title="Avance indeterminado" description={<>Usa <code>{'value={null}'}</code> mientras calculas el avance y cambia a un valor numérico cuando tengas una estimación.</>}>
          <IndeterminateExample />
        </ShowcaseExample>
        <ShowcaseExample contentClassName="mx-auto w-full max-w-md" title="Procesamiento por lotes" description={<>Procesa lotes para actualizar <code>value</code> y anunciar la cantidad con <code>getAriaValueText</code>.</>}>
          <BatchExample />
        </ShowcaseExample>
        <ShowcaseExample contentClassName="mx-auto w-full max-w-md" title="Tarea completada" description={<>Cuando <code>value</code> alcanza <code>max</code>, la barra se llena y el indicador usa el color de éxito con <code>data-complete</code>.</>}>
          <Progress value={100} locale="es-CL">
            <ProgressLabel>Sincronización completada</ProgressLabel>
            <ProgressValue />
            <ProgressTrack>
              <ProgressIndicator />
            </ProgressTrack>
          </Progress>
        </ShowcaseExample>
        <Anatomy />
        <ApiReference />
    </ShowcasePage>
  );
}
