import Link from "next/link";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/own/simple/empty";
import { Button } from "@/components/own/base/button";
import { Search } from "lucide-react";
import { Example, SimpleShowcase } from "../simple-showcase";

export default function Page() {
  return <SimpleShowcase name="Empty" description="Presenta un estado vacío y orienta hacia el siguiente paso."
    anatomy={`<Empty>
  <EmptyHeader>
    <EmptyMedia variant="icon">…</EmptyMedia>
    <EmptyTitle as="h3">Sin resultados</EmptyTitle>
    <EmptyDescription>Prueba otra búsqueda.</EmptyDescription>
  </EmptyHeader>
  <EmptyContent>Acciones</EmptyContent>
</Empty>`}
    parts={[["Empty", "Contenedor del estado vacío."], ["EmptyHeader", "Agrupa el contenido introductorio."], ["EmptyMedia", "Contiene icono o contenido visual."], ["EmptyTitle", "Título con nivel de encabezado configurable."], ["EmptyDescription", "Explica la situación."], ["EmptyContent", "Agrupa acciones o contenido adicional."]]}
    api={[
      ["Empty", "border", '"dashed" | "solid" | "none"', '"dashed"', "Sí", "Elige el tipo de borde. Usa none para omitir las clases de borde o aportar las tuyas."],
      ["Empty", "background", '"soft" | "base" | "bold" | "none"', '"base"', "Sí", "Elige una superficie. Usa none para dejar el fondo transparente o asignarlo con className."],
      ["EmptyMedia", "variant", '"default" | "icon"', '"default"', "Sí", "Aplica la presentación para iconos."],
      ["EmptyTitle", "as", '"h2" | "h3" | "h4" | "h5" | "h6"', '"h2"', "Sí", "Define la jerarquía del título."],
    ]}>
    <Example title="Sin resultados" description={<>Acompaña el mensaje con un icono en <code>EmptyMedia</code> y una acción en <code>EmptyContent</code>.</>}>
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon"><Search aria-hidden="true" /></EmptyMedia>
          <EmptyTitle as="h3">Sin resultados</EmptyTitle>
          <EmptyDescription>Vuelve al listado para probar otra búsqueda.</EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button size="sm" variant="secondary" nativeButton={false} role="link" render={<Link href="/" />}>Explorar catálogo</Button>
        </EmptyContent>
      </Empty>
    </Example>
    <Example title="Estado vacío sencillo" description="Presenta el mensaje sin contenido visual ni acciones."><Empty><EmptyHeader><EmptyTitle as="h3">Aún no hay notas</EmptyTitle><EmptyDescription>Las notas aparecerán aquí cuando se agreguen.</EmptyDescription></EmptyHeader></Empty></Example>
    <Example title="Recurso visual libre" description={<>Usa <code>EmptyMedia</code> con su variante predeterminada para conservar la geometría del contenido.</>}>
      <Empty background="soft">
        <EmptyHeader>
          <EmptyMedia aria-hidden="true"><Search className="size-8 text-content-base" /></EmptyMedia>
          <EmptyTitle as="h3">Aún no hay búsquedas guardadas</EmptyTitle>
          <EmptyDescription>Las búsquedas guardadas aparecerán aquí.</EmptyDescription>
        </EmptyHeader>
      </Empty>
    </Example>
    <Example
      title="Borde y superficie"
      description={<>Selecciona un borde continuo con <code>border=&quot;solid&quot;</code> y una superficie elevada con <code>background=&quot;bold&quot;</code>.</>}
    >
      <Empty border="solid" background="bold">
        <EmptyHeader>
          <EmptyTitle as="h3">Sin archivos adjuntos</EmptyTitle>
          <EmptyDescription>Los archivos que agregues aparecerán aquí.</EmptyDescription>
        </EmptyHeader>
      </Empty>
    </Example>
    <Example
      title="Borde y fondo personalizados"
      description={<>Usa <code>none</code> en ambas props para aplicar tus propias utilidades con <code>className</code>.</>}
    >
      <Empty border="none" background="none" className="border border-dotted border-info-base bg-info-soft">
        <EmptyHeader>
          <EmptyTitle as="h3">Sin novedades</EmptyTitle>
          <EmptyDescription>Cuando haya una actualización, aparecerá aquí.</EmptyDescription>
        </EmptyHeader>
      </Empty>
    </Example>
  </SimpleShowcase>;
}
