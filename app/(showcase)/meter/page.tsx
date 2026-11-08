import { ShowcasePage, ShowcaseExample } from "@/components/shared/showcase";
import {
  Meter,
  MeterIndicator,
  MeterLabel,
  MeterTrack,
  MeterValue,
} from "@/components/own/base/meter";
import { Anatomy, ApiReference } from "./api-reference";
import { CustomValueExample, ThresholdMeterExample } from "./examples";


export default function MeterShowcasePage() {
  return (
    <ShowcasePage title="Meter" implementation="@base-ui/react/meter" description="Representación gráfica de un valor escalar dentro de un rango conocido.">
        <ShowcaseExample contentClassName="mx-auto w-full max-w-md"
          title="Porcentaje con etiqueta y valor"
          description={
            <>
              Asocia <code>MeterLabel</code> a la raíz y presenta el porcentaje
              calculado entre <code>0</code> y <code>100</code> con{" "}
              <code>MeterValue</code>.
            </>
          }
        >
          <Meter value={64} locale="es-AR">
            <MeterLabel>Almacenamiento utilizado</MeterLabel>
            <MeterValue />
            <MeterTrack>
              <MeterIndicator />
            </MeterTrack>
          </Meter>
        </ShowcaseExample>
        <ShowcaseExample contentClassName="mx-auto w-full max-w-md"
          title="Rango y formato de unidades"
          description={
            <>
              Define una escala propia con <code>min</code> y <code>max</code>{" "}
              y formatea la magnitud mediante <code>format</code> y{" "}
              <code>locale</code>.
            </>
          }
        >
          <Meter
            value={340}
            min={0}
            max={500}
            locale="es-AR"
            format={{
              style: "unit",
              unit: "gigabyte",
              unitDisplay: "short",
            }}
          >
            <MeterLabel>Volumen de copias de seguridad</MeterLabel>
            <MeterValue />
            <MeterTrack>
              <MeterIndicator />
            </MeterTrack>
          </Meter>
        </ShowcaseExample>
        <ShowcaseExample contentClassName="mx-auto w-full max-w-md"
          title="Texto visible y accesible personalizados"
          description={
            <>
              Personaliza la lectura en pantalla con la función hija de{" "}
              <code>MeterValue</code> y detalla el anuncio para lectores de
              pantalla con <code>getAriaValueText</code>.
            </>
          }
        >
          <CustomValueExample />
        </ShowcaseExample>
        <ShowcaseExample contentClassName="mx-auto w-full max-w-md"
          title="Umbrales cromáticos dinámicos"
          description={
            <>
              Cambia el nivel de carga para observar la transición de ancho y
              color semántico en <code>MeterIndicator</code>.
            </>
          }
        >
          <ThresholdMeterExample />
        </ShowcaseExample>
        <ShowcaseExample contentClassName="mx-auto w-full max-w-md"
          title="Medidor sin etiqueta visible"
          description={
            <>
              Cuando el contexto adyacente ya identifica la métrica, omite{" "}
              <code>MeterLabel</code> y nombra la raíz con{" "}
              <code>aria-label</code>.
            </>
          }
        >
          <Meter value={82} locale="es-AR" aria-label="Batería restante">
            <MeterValue />
            <MeterTrack>
              <MeterIndicator />
            </MeterTrack>
          </Meter>
        </ShowcaseExample>
        <Anatomy />
        <ApiReference />
    </ShowcasePage>
  );
}
