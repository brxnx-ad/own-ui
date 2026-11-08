import { Skeleton } from "@/components/own/simple/skeleton";
import { Example, SimpleShowcase } from "../simple-showcase";

export default function Page() {
  return <SimpleShowcase name="Skeleton" description="Marcadores visuales para representar contenido durante la carga."
    anatomy={`<div aria-busy="true" aria-label="Cargando perfil">
  <Skeleton className="h-4 w-40" />
</div>`}
    parts={[["Skeleton", "Marcador decorativo oculto al árbol de accesibilidad."]]}
    api={[["Skeleton", "inline", "boolean", "false", "Sí", "Usa inline-block para acompañar texto."], ["Skeleton", "className", "string", "—", "Sí", "Define las dimensiones del marcador."], ["Skeleton", "aria-hidden", "true", "true", "Sí", "El componente fuerza el ocultamiento del marcador decorativo."]]}>
    <Example
      title="Barrido sincronizado"
      description={<>La misma franja recorre la pantalla de izquierda a derecha y solo aparece dentro de los marcadores. Usa <code>aria-busy</code> para indicar que el contenido está en carga.</>}
    >
      <div aria-busy="true" className="grid grid-cols-2 gap-6">
        {[0, 1].map((column) => (
          <div key={column} className="space-y-3">
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    </Example>
    <Example title="Marcador en línea" description={<>Con <code>inline</code> se integra junto a texto; la animación respeta movimiento reducido.</>}><p className="text-center">Cargando nombre <Skeleton inline className="h-4 w-20" /></p></Example>
  </SimpleShowcase>;
}
