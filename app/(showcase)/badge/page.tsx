import { Badge, type BadgeVariant } from "@/components/own/simple/badge";
import { Check } from "lucide-react";
import { Example, SimpleShowcase } from "../simple-showcase";

const badges = [
  { variant: "default", title: "Categoría destacada", label: "Diseño" },
  { variant: "secondary", title: "Etiqueta secundaria", label: "Interno" },
  { variant: "info", title: "Estado informativo", label: "En revisión" },
  { variant: "success", title: "Estado positivo", label: "Aprobado" },
  { variant: "warning", title: "Estado de advertencia", label: "Por vencer" },
  { variant: "destructive", title: "Estado de error", label: "Rechazado" },
  { variant: "outline", title: "Etiqueta con contorno", label: "Opcional" },
] satisfies { variant: BadgeVariant; title: string; label: string }[];

export default function Page() {
  return <SimpleShowcase name="Badge" description="Etiqueta compacta para clasificar contenido y mostrar estados."
    anatomy={`<Badge variant="success">
  <Check aria-hidden="true" />
  Completado
</Badge>`}
    parts={[["Badge", "Etiqueta span que recibe texto e iconos del consumidor."]]}
    api={[["Badge", "variant", '"default" | "secondary" | "info" | "success" | "warning" | "destructive" | "outline"', '"default"', "Sí", "Selecciona la apariencia de la etiqueta."]]}>
    {badges.map(({ variant, title, label }) => (
      <Example key={variant} title={title} description={<>Muestra la etiqueta con <code>variant=&quot;{variant}&quot;</code>.</>}>
        <div className="flex justify-center"><Badge variant={variant}>{label}</Badge></div>
      </Example>
    ))}
    <Example title="Etiqueta con icono" description="El consumidor aporta el icono decorativo junto al texto."><div className="flex justify-center"><Badge variant="success"><Check aria-hidden="true" />Completado</Badge></div></Example>
  </SimpleShowcase>;
}
