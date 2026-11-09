import Link from "next/link";
import { Alert, AlertAction, AlertDescription, AlertTitle } from "@/components/own/simple/alert";
import { Button } from "@/components/own/base/button";
import { Info } from "lucide-react";
import { Example, SimpleShowcase } from "../simple-showcase";
import { DynamicAlertExample } from "./examples";

const variants = [
  { variant: "default", title: "Aviso neutro", message: "Resumen semanal", detail: "El resumen reúne los cambios de los últimos siete días." },
  { variant: "success", title: "Confirmación", message: "Cambios guardados", detail: "La nueva configuración ya está activa." },
  { variant: "warning", title: "Advertencia", message: "Poco espacio disponible", detail: "Libera espacio antes de subir más archivos." },
  { variant: "destructive", title: "Error", message: "No se pudo guardar", detail: "Revisa tu conexión y vuelve a intentarlo." },
] as const;

export default function Page() {
  return <SimpleShowcase name="Alert" description="Mensajes contextuales con variantes de estado y acciones opcionales."
    anatomy={`<Alert variant="info" icon={<Info />}>
  <AlertTitle>Información</AlertTitle>
  <AlertDescription>Detalles del mensaje.</AlertDescription>
  <AlertAction>Acciones</AlertAction>
</Alert>`}
    parts={[["Alert", "Contenedor del mensaje y su icono opcional."], ["AlertTitle", "Título del mensaje."], ["AlertDescription", "Contenido explicativo."], ["AlertAction", "Contenedor de acciones aportadas por el consumidor."]]}
    api={[["Alert", "variant", '"default" | "info" | "success" | "warning" | "destructive"', '"default"', "Sí", "Selecciona el color del mensaje."], ["Alert", "icon", "ReactNode", "—", "Sí", "Icono decorativo oculto a lectores de pantalla."], ["Alert", "role", "HTML role", "—", "Sí", "Usa status o alert cuando el mensaje dinámico requiera anunciarse."]]}>
    <Example title="Mensaje informativo" description={<>Añade un icono decorativo con <code>icon</code> y una acción con <code>AlertAction</code>.</>}>
      <Alert variant="info" icon={<Info />}>
        <AlertTitle>Avisos de la interfaz</AlertTitle>
        <AlertDescription>Este aviso permanece visible junto al contenido. Consulta Toast para ver avisos temporales.</AlertDescription>
        <AlertAction>
          <Button size="sm" variant="secondary" nativeButton={false} role="link" render={<Link href="/toast" />}>Ver Toast</Button>
        </AlertAction>
      </Alert>
    </Example>
    {variants.map(({ variant, title, message, detail }) => (
      <Example key={variant} title={title} description={<>Aplica <code>variant=&quot;{variant}&quot;</code> al mensaje.</>}>
        <Alert variant={variant}>
          <AlertTitle>{message}</AlertTitle>
          <AlertDescription>{detail}</AlertDescription>
        </Alert>
      </Example>
    ))}
    <Example title="Aviso dinámico" description={<>Actualiza el contenido de una región <code>role=&quot;status&quot;</code> para anunciar un resultado sin mover el foco.</>}>
      <DynamicAlertExample />
    </Example>
  </SimpleShowcase>;
}
