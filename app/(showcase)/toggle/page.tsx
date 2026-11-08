import { ShowcasePage, ShowcaseExample } from "@/components/shared/showcase";
import { ToggleGroup as BaseToggleGroup } from "@base-ui/react/toggle-group";
import { Bold, Italic, Star, Underline } from "lucide-react";
import { Toggle } from "@/components/own/base/toggle";
import { Anatomy, ApiReference } from "./api-reference";
import { CanceledExample, ControlledExample } from "./examples";


export default function ToggleShowcasePage() {
  return (
    <ShowcasePage title="Toggle" implementation="@base-ui/react/toggle" description="Activa o desactiva una herramienta con un botón que conserva su estado.">
        <ShowcaseExample contentClassName="flex flex-wrap items-center justify-center gap-3" title="Pulsación independiente" description={<>Activa y desactiva el botón con clic, <kbd>Espacio</kbd> o <kbd>Enter</kbd>. El estado se expone mediante <code>aria-pressed</code>.</>}>
          <Toggle>Resaltar coincidencias</Toggle>
        </ShowcaseExample>
        <ShowcaseExample contentClassName="flex flex-wrap items-center justify-center gap-3" title="Estado inicial" description={<>Usa <code>defaultPressed</code> para empezar con el botón presionado y dejar que gestione los cambios.</>}>
          <Toggle defaultPressed>Fijar vista</Toggle>
        </ShowcaseExample>
        <ShowcaseExample contentClassName="flex flex-wrap items-center justify-center gap-3" title="Botón solo icono" description={<>Combina <code>iconOnly</code> y <code>{'variant="ghost"'}</code> para una huella cuadrada con nombre accesible mediante <code>aria-label</code>.</>}>
          <Toggle iconOnly variant="ghost" aria-label="Marcar como favorito" className="group">
            <Star aria-hidden className="group-data-pressed:fill-current" />
          </Toggle>
        </ShowcaseExample>
        <ShowcaseExample contentClassName="flex flex-wrap items-center justify-center gap-3" title="Tamaños" description={<>Usa <code>size</code> para ajustar la altura, la tipografía y el espaciado al contexto del botón.</>}>
          <Toggle size="sm">Pequeño</Toggle>
          <Toggle size="md">Mediano</Toggle>
          <Toggle size="lg">Grande</Toggle>
        </ShowcaseExample>
        <ShowcaseExample contentClassName="flex flex-wrap items-center justify-center gap-3" title="Estado controlado" description={<>Sincroniza <code>pressed</code> y <code>onPressedChange</code> para cambiar la densidad de la lista.</>}>
          <ControlledExample />
        </ShowcaseExample>
        <ShowcaseExample contentClassName="flex flex-wrap items-center justify-center gap-3" title="Botón deshabilitado" description={<>Aplica <code>disabled</code> para conservar el estado actual y bloquear la interacción.</>}>
          <Toggle size="sm" disabled>Ajustar a guías</Toggle>
          <Toggle size="sm" disabled defaultPressed>Ajustar a cuadrícula</Toggle>
        </ShowcaseExample>
        <ShowcaseExample contentClassName="flex flex-wrap items-center justify-center gap-3" title="Cancelar el cambio" description={<>Llama a <code>details.cancel()</code> desde <code>onPressedChange</code> para conservar el estado mientras los cambios estén bloqueados.</>}>
          <CanceledExample />
        </ShowcaseExample>
        <ShowcaseExample contentClassName="flex flex-wrap items-center justify-center gap-3" title="Elemento personalizado" description={<>Combina <code>{'render={<span />}'}</code> y <code>{'nativeButton={false}'}</code> para conservar el rol de botón y la activación por teclado.</>}>
          <Toggle render={<span />} nativeButton={false}>Marcar revisión</Toggle>
        </ShowcaseExample>
        <ShowcaseExample contentClassName="flex flex-wrap items-center justify-center gap-3" title="Dentro de un grupo" description={<>Asigna un <code>value</code> distinto a cada botón para compartir la selección y recorrerlos con flechas mediante <code>ToggleGroup</code> de Base UI.</>}>
          <BaseToggleGroup aria-label="Formato de texto" className="flex flex-wrap justify-center gap-1" defaultValue={["bold"]} multiple>
            <Toggle value="bold" variant="ghost" size="sm" iconOnly aria-label="Negrita"><Bold aria-hidden /></Toggle>
            <Toggle value="italic" variant="ghost" size="sm" iconOnly aria-label="Cursiva"><Italic aria-hidden /></Toggle>
            <Toggle value="underline" variant="ghost" size="sm" iconOnly aria-label="Subrayado"><Underline aria-hidden /></Toggle>
          </BaseToggleGroup>
        </ShowcaseExample>
        <Anatomy />
        <ApiReference />
    </ShowcasePage>
  );
}
