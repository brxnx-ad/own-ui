import Link from "next/link";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/own/simple/card";
import { Button } from "@/components/own/base/button";
import { Example, SimpleShowcase } from "../simple-showcase";

export default function Page() {
  return <SimpleShowcase name="Card" description="Superficie para agrupar contenido, encabezados y acciones."
    anatomy={`<Card>
  <CardHeader>
    <CardTitle as="h3">Título</CardTitle>
    <CardDescription>Descripción</CardDescription>
    <CardAction>Acción</CardAction>
  </CardHeader>
  <CardContent>Contenido</CardContent>
  <CardFooter>Pie</CardFooter>
</Card>`}
    parts={[["Card", "Contenedor de la tarjeta."], ["CardHeader", "Agrupa título, descripción y acción."], ["CardTitle", "Encabezado con nivel configurable."], ["CardDescription", "Descripción secundaria."], ["CardAction", "Acción alineada en la cabecera."], ["CardContent", "Contenido principal."], ["CardFooter", "Pie para contenido o acciones."]]}
    api={[["Card", "size", '"sm" | "md"', '"md"', "Sí", "Controla el padding y la separación interna."], ["CardTitle", "as", '"h2" | "h3" | "h4" | "h5" | "h6"', '"h2"', "Sí", "Ajusta el nivel semántico del encabezado."]]}>
    <Example title="Tarjeta con acciones" description={<>Coloca una acción junto al título con <code>CardAction</code> y otra en <code>CardFooter</code>.</>}>
      <Card>
        <CardHeader>
          <CardTitle as="h3">Informe de ventas</CardTitle>
          <CardDescription>Datos del último trimestre.</CardDescription>
          <CardAction>
            <Button size="sm" variant="outline" nativeButton={false} role="link" render={<Link href="/table" />}>Ver tabla</Button>
          </CardAction>
        </CardHeader>
        <CardContent>El informe reúne las ventas por producto y por equipo.</CardContent>
        <CardFooter>
          <Button size="sm" nativeButton={false} role="link" render={<Link href="/attachment" />}>Ver adjuntos</Button>
        </CardFooter>
      </Card>
    </Example>
    <Example title="Tamaño compacto" description={<>Reduce el espacio interior con <code>size=&quot;sm&quot;</code>.</>}><Card size="sm"><CardHeader><CardTitle as="h3">Nota rápida</CardTitle><CardDescription>Información resumida.</CardDescription></CardHeader><CardContent>Contenido de la tarjeta.</CardContent></Card></Example>
  </SimpleShowcase>;
}
