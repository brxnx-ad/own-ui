import Link from "next/link";
import { FileText } from "lucide-react";
import { Item, ItemActions, ItemContent, ItemDescription, ItemFooter, ItemGroup, ItemHeader, ItemMedia, ItemSeparator, ItemTitle } from "@/components/own/composed/item";
import { ShowcaseExample, ShowcasePage } from "@/components/shared/showcase";
import { ComposedReference } from "../composed-reference";

function DocumentItem({ variant = "default", size = "default" }: { variant?: "default" | "outline" | "muted"; size?: "default" | "sm" | "xs" }) {
  return <Item variant={variant} size={size}><ItemMedia variant="icon"><FileText aria-hidden="true" /></ItemMedia><ItemContent><ItemTitle>Archivos del proyecto</ItemTitle><ItemDescription>Consulta los adjuntos.</ItemDescription></ItemContent><ItemActions><Link className="underline underline-offset-4" href="/attachment">Ver adjuntos</Link></ItemActions></Item>;
}

export default function Page() {
  return <ShowcasePage title="Item" implementation="Separator + contenido" description="Organiza información, medios y acciones en elementos reutilizables.">
    <ShowcaseExample title="Elemento con acción" description="Combina medio, contenido y una acción."><DocumentItem variant="outline" /></ShowcaseExample>
    <ShowcaseExample title="Variantes" description="Elige la superficie con variant."><div className="space-y-3"><DocumentItem /><DocumentItem variant="outline" /><DocumentItem variant="muted" /></div></ShowcaseExample>
    <ShowcaseExample title="Tamaños" description="Ajusta la densidad con size."><div className="space-y-3"><DocumentItem size="default" /><DocumentItem size="sm" /><DocumentItem size="xs" /></div></ShowcaseExample>
    <ShowcaseExample title="Lista de elementos" description="ItemGroup aporta semántica de lista y admite separadores decorativos."><ItemGroup aria-label="Documentos"><DocumentItem /><ItemSeparator /><DocumentItem size="sm" /></ItemGroup></ShowcaseExample>
    <ShowcaseExample title="Encabezado y pie" description="Añade contenido de ancho completo con ItemHeader e ItemFooter."><Item variant="outline"><ItemHeader><span className="font-medium">Solicitud</span><span>En curso</span></ItemHeader><ItemContent><ItemTitle>Revisión de documento</ItemTitle><ItemDescription>Se requieren comentarios del equipo.</ItemDescription></ItemContent><ItemFooter><span>Hoy</span><Link className="underline underline-offset-4" href="/textarea">Ver campo de comentarios</Link></ItemFooter></Item></ShowcaseExample>
    <ShowcaseExample title="Elemento como enlace" description="Sustituye el elemento principal mediante render."><Item variant="outline" render={<Link href="/" />}><ItemContent><ItemTitle>Catálogo de own-ui</ItemTitle><ItemDescription>Explora los componentes disponibles.</ItemDescription></ItemContent></Item></ShowcaseExample>
    <ComposedReference name="Item" code={`<ItemGroup aria-label="Documentos">
  <Item variant="outline">
    <ItemMedia>Icono</ItemMedia>
    <ItemContent><ItemTitle>Informe</ItemTitle>
      <ItemDescription>Actualizado hoy</ItemDescription>
    </ItemContent>
    <ItemActions>Acción</ItemActions>
  </Item>
  <ItemSeparator />
</ItemGroup>`} parts={[["ItemGroup / ItemSeparator", "Agrupan elementos y los separan visualmente."], ["Item", "Contenedor principal con variante y tamaño."], ["ItemMedia", "Contiene un icono o imagen."], ["ItemContent / ItemTitle / ItemDescription", "Organizan la información principal."], ["ItemActions", "Contiene controles asociados."], ["ItemHeader / ItemFooter", "Añaden contenido de ancho completo."]]} groups={[
      { piece: "Item", rows: [{ prop: "variant", type: '"default" | "outline" | "muted"', defaultValue: '"default"', description: "Selecciona el tratamiento visual." }, { prop: "size", type: '"default" | "sm" | "xs"', defaultValue: '"default"', description: "Ajusta la densidad." }, { prop: "render", type: "ReactElement | función", defaultValue: "div", description: "Sustituye el elemento principal. Conserva props y ref con la forma de función." }] },
      { piece: "ItemMedia", rows: [{ prop: "variant", type: '"default" | "icon" | "image"', defaultValue: '"default"', description: "Adapta el contenido multimedia." }] },
      { piece: "ItemSeparator", rows: [{ prop: "orientation", type: '"horizontal" | "vertical"', defaultValue: '"horizontal"', description: "Configura Separator, decorativo por defecto." }] },
      { piece: "Todas las piezas", rows: [{ prop: "className, style, ref y atributos", type: "Props del elemento", defaultValue: "—", description: "Personalizan el nodo y su contenido." }] },
    ]} note="ItemGroup asigna role=list y sus Item predeterminados reciben role=listitem. Si render cambia el elemento, proporciona la semántica de lista adecuada." />
  </ShowcasePage>;
}
