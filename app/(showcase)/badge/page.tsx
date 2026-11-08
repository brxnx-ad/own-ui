import { Badge } from "@/components/own/simple/badge";
import { Check } from "lucide-react";
import { Example, SimpleShowcase } from "../simple-showcase";

export default function Page() {
  return <SimpleShowcase name="Badge" description="Etiqueta compacta para clasificar contenido y mostrar estados."
    anatomy={`<Badge variant="success">
  <Check aria-hidden="true" />
  Completado
</Badge>`}
    parts={[["Badge", "Etiqueta span que recibe texto e iconos del consumidor."]]}
    api={[["Badge", "variant", '"default" | "secondary" | "info" | "success" | "warning" | "destructive" | "outline"', '"default"', "Sí", "Selecciona la apariencia de la etiqueta."]]}>
    {(["default", "secondary", "info", "success", "warning", "destructive", "outline"] as const).map((variant) => <Example key={variant} title={`Variante ${variant}`} description={<>Muestra la etiqueta con <code>variant=&quot;{variant}&quot;</code>.</>}><div className="flex justify-center"><Badge variant={variant}>{variant}</Badge></div></Example>)}
    <Example title="Etiqueta con icono" description="El consumidor aporta el icono decorativo junto al texto."><div className="flex justify-center"><Badge variant="success"><Check aria-hidden="true" />Completado</Badge></div></Example>
  </SimpleShowcase>;
}
