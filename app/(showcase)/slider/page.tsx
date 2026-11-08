import { ShowcasePage, ShowcaseExample } from "@/components/shared/showcase";
import {
  Slider,
  SliderControl,
  SliderIndicator,
  SliderLabel,
  SliderThumb,
  SliderTrack,
  SliderValue,
} from "@/components/own/base/slider";
import { Anatomy, ApiReference } from "./api-reference";
import { ControlledExample, FormExample } from "./examples";


function Rail({ children = <SliderThumb /> }: { children?: React.ReactNode }) {
  return (
    <SliderControl>
      <SliderTrack>
        <SliderIndicator />
        {children}
      </SliderTrack>
    </SliderControl>
  );
}

export default function SliderShowcasePage() {
  return (
    <ShowcasePage title="Slider" implementation="@base-ui/react/slider" description="Ajusta un valor o un intervalo numérico con puntero o teclado.">
        <ShowcaseExample contentClassName="mx-auto w-full max-w-sm px-2" title="Ajuste de un valor" description={<>Arrastra el control o usa las flechas para cambiar el volumen que muestra <code>SliderValue</code>.</>}>
          <Slider defaultValue={60} locale="es-CL" format={{ style: "unit", unit: "percent" }}>
            <SliderLabel>Volumen</SliderLabel>
            <SliderValue />
            <Rail />
          </Slider>
        </ShowcaseExample>
        <ShowcaseExample contentClassName="mx-auto w-full max-w-sm px-2" title="Rango de valores" description={<>Usa un <code>SliderThumb</code> por extremo y <code>minStepsBetweenValues</code> para mantener la diferencia mínima.</>}>
          <Slider defaultValue={[20000, 65000]} max={100000} step={5000} largeStep={10000} minStepsBetweenValues={2} thumbCollisionBehavior="none" locale="es-CL" format={{ style: "currency", currency: "CLP" }}>
            <SliderLabel>Presupuesto</SliderLabel>
            <SliderValue />
            <Rail>
              <SliderThumb index={0} aria-label="Presupuesto mínimo" />
              <SliderThumb index={1} aria-label="Presupuesto máximo" />
            </Rail>
          </Slider>
        </ShowcaseExample>
        <ShowcaseExample contentClassName="mx-auto w-full max-w-sm px-2" title="Pasos con marcas" description={<>Combina <code>{"step={25}"}</code> con marcas en la pista y usa <kbd>Page Up</kbd> o <kbd>Page Down</kbd> para avanzar de a <code>largeStep</code>.</>}>
          <Slider defaultValue={50} step={25} largeStep={50} locale="es-CL" format={{ style: "unit", unit: "percent" }}>
            <SliderLabel>Brillo de la pantalla</SliderLabel>
            <SliderValue />
            <Rail>
              {[0, 25, 50, 75, 100].map((position) => (
                <span key={position} aria-hidden className="pointer-events-none absolute top-1/2 size-1 -translate-y-1/2 rounded-full bg-surface-bold" style={{ insetInlineStart: `calc(${position}% - 2px)` }} />
              ))}
              <SliderThumb />
            </Rail>
          </Slider>
        </ShowcaseExample>
        <ShowcaseExample contentClassName="mx-auto w-full max-w-sm px-2" title="Orientación vertical" description={<>Con <code>{'orientation="vertical"'}</code>, el valor aumenta hacia arriba.</>}>
          <Slider className="mx-auto max-w-40" orientation="vertical" defaultValue={45} locale="es-CL" format={{ style: "unit", unit: "percent" }}>
            <SliderLabel>Nivel de luz</SliderLabel>
            <SliderValue />
            <Rail />
          </Slider>
        </ShowcaseExample>
        <ShowcaseExample contentClassName="mx-auto w-full max-w-sm px-2" title="Alineación en el borde" description={<>Usa <code>{'thumbAlignment="edge"'}</code> y lleva el control a un extremo para ver cómo queda dentro de la pista.</>}>
          <Slider defaultValue={0} thumbAlignment="edge" locale="es-CL" format={{ style: "unit", unit: "percent" }}>
            <SliderLabel>Transparencia</SliderLabel>
            <SliderValue />
            <Rail />
          </Slider>
        </ShowcaseExample>
        <ShowcaseExample contentClassName="mx-auto w-full max-w-sm px-2" title="Valor controlado" description={<>Sincroniza <code>value</code> y <code>onValueChange</code> para ajustar el zoom desde el control o restablecerlo con un botón.</>}>
          <ControlledExample />
        </ShowcaseExample>
        <ShowcaseExample contentClassName="mx-auto w-full max-w-sm px-2" title="Envío en un formulario" description={<>Asigna <code>name</code> al slider para aplicar el límite al enviar el formulario.</>}>
          <FormExample />
        </ShowcaseExample>
        <ShowcaseExample contentClassName="mx-auto w-full max-w-sm px-2" title="Control deshabilitado" description={<>Aplica <code>disabled</code> para mostrar un ajuste fijo sin permitir cambios.</>}>
          <Slider defaultValue={35} disabled locale="es-CL" format={{ style: "unit", unit: "percent" }}>
            <SliderLabel>Velocidad del ventilador</SliderLabel>
            <SliderValue />
            <Rail />
          </Slider>
        </ShowcaseExample>
        <Anatomy />
        <ApiReference />
    </ShowcasePage>
  );
}
