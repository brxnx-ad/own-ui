import { AspectRatio } from "@/components/own/simple/aspect-ratio";
import { Example, SimpleShowcase } from "../simple-showcase";

export default function Page() {
  return <SimpleShowcase name="Aspect Ratio" description="Contenedor que mantiene una proporción entre ancho y altura."
    anatomy={`<AspectRatio ratio={16 / 9}>
  <div className="absolute inset-0">Contenido</div>
</AspectRatio>`}
    parts={[["AspectRatio", "Contenedor relativo que aplica la proporción CSS."]]}
    api={[["AspectRatio", "ratio", "number", "1", "Sí", "Relación ancho / altura. Los valores no positivos o no finitos usan 1."], ["AspectRatio", "style.aspectRatio", 'CSSProperties["aspectRatio"]', "Deriva de ratio", "Sí", "Si se proporciona, prevalece sobre ratio."]]}>
    <Example title="Formato panorámico" description={<>Usa <code>ratio=&#123;16 / 9&#125;</code> para reservar espacio para contenido multimedia.</>}><AspectRatio ratio={16 / 9} className="overflow-hidden rounded-base bg-primary-soft"><div className="absolute inset-0 flex items-center justify-center text-gray-bold">16 : 9</div></AspectRatio></Example>
    <Example title="Formato cuadrado" description={<>La proporción predeterminada es <code>1</code>.</>}><div className="mx-auto max-w-xs"><AspectRatio className="overflow-hidden rounded-base bg-info-soft"><div className="absolute inset-0 flex items-center justify-center">1 : 1</div></AspectRatio></div></Example>
    <Example title="Formato vertical" description={<>Una relación menor que uno, como <code>3 / 4</code>, produce un formato vertical.</>}><div className="mx-auto max-w-xs"><AspectRatio ratio={3 / 4} className="overflow-hidden rounded-base bg-success-soft"><div className="absolute inset-0 flex items-center justify-center">3 : 4</div></AspectRatio></div></Example>
    <Example title="Proporción por estilo" description={<>Usa <code>style.aspectRatio</code> para sustituir la proporción indicada por <code>ratio</code> en esta instancia.</>}>
      <AspectRatio ratio={1} style={{ aspectRatio: "3 / 1" }} className="overflow-hidden rounded-base bg-primary-soft">
        <div className="absolute inset-0 flex items-center justify-center">3 : 1</div>
      </AspectRatio>
    </Example>
  </SimpleShowcase>;
}
