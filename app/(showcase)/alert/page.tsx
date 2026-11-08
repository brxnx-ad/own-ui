import { Alert, AlertAction, AlertDescription, AlertTitle } from "@/components/own/simple/alert";
import { Button } from "@/components/own/base/button";
import { Info } from "lucide-react";
import { Example, SimpleShowcase } from "../simple-showcase";

export default function Page() {
  return <SimpleShowcase name="Alert" description="Mensajes contextuales con variantes de estado y acciones opcionales."
    anatomy={`<Alert variant="info" icon={<Info />}>
  <AlertTitle>Información</AlertTitle>
  <AlertDescription>Detalles del mensaje.</AlertDescription>
  <AlertAction>Acciones</AlertAction>
</Alert>`}
    parts={[["Alert", "Contenedor del mensaje y su icono opcional."], ["AlertTitle", "Título del mensaje."], ["AlertDescription", "Contenido explicativo."], ["AlertAction", "Contenedor de acciones aportadas por el consumidor."]]}
    api={[["Alert", "variant", '"default" | "info" | "success" | "warning" | "destructive"', '"default"', "Sí", "Selecciona el color del mensaje."], ["Alert", "icon", "ReactNode", "—", "Sí", "Icono decorativo oculto a lectores de pantalla."], ["Alert", "role", "HTML role", "—", "Sí", "Usa status o alert cuando el mensaje dinámico requiera anunciarse."]]}>
    <Example title="Mensaje informativo" description={<>Añade un icono decorativo con <code>icon</code> y una acción contextual.</>}>
      <Alert variant="info" icon={<Info />}><AlertTitle>Actualización disponible</AlertTitle><AlertDescription>Hay una nueva versión lista para revisar.</AlertDescription><AlertAction><Button size="sm" variant="secondary">Revisar</Button></AlertAction></Alert>
    </Example>
    {(["default", "success", "warning", "destructive"] as const).map((variant) => <Example key={variant} title={`Variante ${variant}`} description={<>Aplica <code>variant=&quot;{variant}&quot;</code> al mensaje.</>}><Alert variant={variant}><AlertTitle>{variant === "success" ? "Cambios guardados" : variant === "warning" ? "Revisa los datos" : variant === "destructive" ? "No se pudo guardar" : "Información general"}</AlertTitle><AlertDescription>El texto explica el estado y el siguiente paso disponible.</AlertDescription></Alert></Example>)}
  </SimpleShowcase>;
}
