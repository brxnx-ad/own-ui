import { Suspense } from "react";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/own/composed/pagination";
import { ShowcaseExample, ShowcasePage } from "@/components/shared/showcase";
import { ComposedReference } from "../composed-reference";

type PaginationPageProps = { searchParams: Promise<{ pagina?: string | string[] }> };

const pages = [1, 2, 3, 4, 5];

async function PaginationNavigation({ searchParams }: PaginationPageProps) {
  const { pagina } = await searchParams;
  const page = pages.find((number) => String(number) === pagina) ?? 1;

  return (
    <>
      <p className="mb-4 text-center body-sm">Página {page} de {pages.length}</p>
      <Pagination aria-label="Páginas de resultados">
        <PaginationContent>
          {page > 1 && (
            <PaginationItem><PaginationPrevious href={`?pagina=${page - 1}`} /></PaginationItem>
          )}
          {pages.map((number) => (
            <PaginationItem key={number}>
              <PaginationLink href={`?pagina=${number}`} isActive={number === page} aria-label={`Página ${number}`}>
                {number}
              </PaginationLink>
            </PaginationItem>
          ))}
          {page < pages.length && (
            <PaginationItem><PaginationNext href={`?pagina=${page + 1}`} /></PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </>
  );
}

export default function Page({ searchParams }: PaginationPageProps) {
  return <ShowcasePage title="Pagination" implementation="Button + Next.js Link" description="Navega entre páginas de una colección de resultados.">
    <ShowcaseExample title="Navegación entre páginas" description="Selecciona un número o usa los enlaces anterior y siguiente.">
      <Suspense fallback={<p role="status" className="flex min-h-16 items-center justify-center body-sm">Cargando paginación…</p>}>
        <PaginationNavigation searchParams={searchParams} />
      </Suspense>
    </ShowcaseExample>
    <ShowcaseExample title="Intervalos omitidos" description="PaginationEllipsis indica que existen páginas intermedias.">
      <Pagination aria-label="Ejemplo de páginas con intervalo"><PaginationContent><PaginationItem><PaginationLink href="/pagination?pagina=1">1</PaginationLink></PaginationItem><PaginationItem><PaginationEllipsis /></PaginationItem><PaginationItem><PaginationLink href="/pagination?pagina=5">5</PaginationLink></PaginationItem></PaginationContent></Pagination>
    </ShowcaseExample>
    <ShowcaseExample title="Tamaño de enlaces" description="Ajusta el tamaño de los enlaces con size.">
      <Pagination aria-label="Ejemplo de tamaños"><PaginationContent><PaginationItem><PaginationLink size="sm" href="/pagination?pagina=1">1</PaginationLink></PaginationItem><PaginationItem><PaginationLink size="md" href="/pagination?pagina=2">2</PaginationLink></PaginationItem><PaginationItem><PaginationLink size="lg" href="/pagination?pagina=3">3</PaginationLink></PaginationItem></PaginationContent></Pagination>
    </ShowcaseExample>
    <ComposedReference name="Pagination" code={`<Pagination aria-label="Páginas de resultados">
  <PaginationContent>
    <PaginationItem><PaginationPrevious href="?pagina=1" /></PaginationItem>
    <PaginationItem><PaginationLink href="?pagina=2" isActive>2</PaginationLink></PaginationItem>
    <PaginationItem><PaginationEllipsis /></PaginationItem>
    <PaginationItem><PaginationLink href="?pagina=5">5</PaginationLink></PaginationItem>
    <PaginationItem><PaginationNext href="?pagina=3" /></PaginationItem>
  </PaginationContent>
</Pagination>`} parts={[["Pagination", "Región de navegación con nombre accesible."], ["PaginationContent / PaginationItem", "Lista y elementos semánticos."], ["PaginationLink", "Enlace a una página, con estado activo opcional."], ["PaginationPrevious / PaginationNext", "Enlaces direccionales con texto e icono."], ["PaginationEllipsis", "Indica páginas omitidas."]]} groups={[
      { piece: "Pagination", rows: [{ prop: "aria-label", type: "string", defaultValue: '"Paginación"', description: "Identifica la región de navegación." }] },
      { piece: "PaginationLink", rows: [{ prop: "href", type: "LinkProps[\u0022href\u0022]", defaultValue: "—", optional: "No", description: "Destino del enlace de Next.js." }, { prop: "isActive", type: "boolean", defaultValue: "false", description: "Aplica el estilo activo y aria-current=page." }, { prop: "size", type: '"sm" | "md" | "lg"', defaultValue: '"sm"', description: "Ajusta el tamaño del botón visual." }, { prop: "onKeyDown / onKeyUp", type: "(event) => void", defaultValue: "—", description: "Reciben los eventos de teclado del enlace." }] },
      { piece: "PaginationPrevious / PaginationNext", rows: [{ prop: "text", type: "string", defaultValue: '"Anterior" / "Siguiente"', description: "Define el texto visible y el nombre accesible predeterminado." }, { prop: "href", type: "LinkProps[\u0022href\u0022]", defaultValue: "—", optional: "No", description: "Destino anterior o siguiente." }] },
      { piece: "PaginationEllipsis", rows: [{ prop: "children", type: "ReactNode", defaultValue: "Elipsis y texto accesible", description: "Sustituye el contenido predeterminado." }] },
      { piece: "Todas las piezas", rows: [{ prop: "className, style, ref y atributos", type: "Props del elemento", defaultValue: "—", description: "Personalizan las piezas y sus atributos." }] },
    ]} note="Los enlaces conservan la navegación nativa por teclado. El consumidor calcula los destinos y decide qué controles mostrar en los límites." />
  </ShowcasePage>;
}
