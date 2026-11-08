import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/own/simple/table";
import { Example, SimpleShowcase } from "../simple-showcase";

export default function Page() {
  return <SimpleShowcase name="Table" description="Tabla HTML con contenedor desplazable y estructura semántica."
    anatomy={`<Table containerProps={{ role: "region", "aria-label": "Ventas" }}>
  <TableCaption>Ventas</TableCaption>
  <TableHeader><TableRow><TableHead scope="col">Producto</TableHead></TableRow></TableHeader>
  <TableBody><TableRow><TableCell>Cuaderno</TableCell></TableRow></TableBody>
  <TableFooter>…</TableFooter>
</Table>`}
    parts={[["Table", "Tabla y contenedor horizontal enfocable."], ["TableCaption", "Título nativo de la tabla."], ["TableHeader", "Agrupa encabezados de columna."], ["TableBody", "Agrupa filas de datos."], ["TableFooter", "Agrupa filas de resumen."], ["TableRow", "Fila de la tabla."], ["TableHead", "Celda de encabezado th."], ["TableCell", "Celda de datos td."]]}
    api={[["Table", "containerProps", "HTML div props", "—", "Sí", "Configura el contenedor desplazable, su nombre accesible y tabIndex."], ["TableHead", "scope", '"row" | "col" | "rowgroup" | "colgroup"', "—", "Sí", "Relaciona encabezados con filas o columnas."], ["TableCaption", "children", "ReactNode", "—", "Sí", "Identifica el contenido de la tabla."]]}>
    <Example title="Tabla de datos" description={<>Utiliza <code>scope</code> para identificar los encabezados de fila y columna.</>}><Table containerProps={{ role: "region", "aria-label": "Ventas por producto" }}><TableCaption>Ventas por producto</TableCaption><TableHeader><TableRow><TableHead scope="col">Producto</TableHead><TableHead scope="col">Cantidad</TableHead><TableHead scope="col">Total</TableHead></TableRow></TableHeader><TableBody><TableRow><TableHead scope="row">Cuaderno</TableHead><TableCell>12</TableCell><TableCell>$24.000</TableCell></TableRow><TableRow><TableHead scope="row">Lápiz</TableHead><TableCell>8</TableCell><TableCell>$4.000</TableCell></TableRow></TableBody><TableFooter><TableRow><TableHead scope="row">Total</TableHead><TableCell>20</TableCell><TableCell>$28.000</TableCell></TableRow></TableFooter></Table></Example>
    <Example title="Desplazamiento horizontal" description={<>Enfoca el contenedor con Tab y desplázalo con las flechas cuando la tabla exceda el ancho disponible.</>}><Table className="min-w-[700px]" containerProps={{ role: "region", "aria-label": "Resumen trimestral" }}><TableCaption>Resumen trimestral</TableCaption><TableHeader><TableRow><TableHead scope="col">Equipo</TableHead><TableHead scope="col">Primer trimestre</TableHead><TableHead scope="col">Segundo trimestre</TableHead><TableHead scope="col">Tercer trimestre</TableHead></TableRow></TableHeader><TableBody><TableRow><TableHead scope="row">Diseño</TableHead><TableCell>12</TableCell><TableCell>16</TableCell><TableCell>21</TableCell></TableRow></TableBody></Table></Example>
  </SimpleShowcase>;
}
