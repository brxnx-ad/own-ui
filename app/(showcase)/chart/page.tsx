import { ShowcaseExample, ShowcasePage } from "@/components/shared/showcase";
import { ChartReference } from "./api-reference";
import { BarExample, ComparisonExample, TrendExample } from "./examples";

export default function Page() {
  return (
    <ShowcasePage
      title="Chart"
      implementation="TanStack Charts"
      description="Representa datos con marcas SVG tipadas, ejes adaptables y navegación por puntos."
    >
      <ShowcaseExample
        title="Tendencia mensual"
        description={<>Recorre la serie de <code>lineY</code> con el puntero o enfoca el gráfico y usa las flechas.</>}
      >
        <TrendExample />
      </ShowcaseExample>
      <ShowcaseExample
        title="Comparación por área"
        description={<>Compara categorías con <code>barY</code> y abre la tabla para consultar sus valores exactos.</>}
      >
        <BarExample />
      </ShowcaseExample>
      <ShowcaseExample
        title="Series por período"
        description={<>Cambia el semestre para actualizar la <code>definition</code> y selecciona un punto con Enter o con el puntero.</>}
      >
        <ComparisonExample />
      </ShowcaseExample>
      <ChartReference />
    </ShowcasePage>
  );
}
