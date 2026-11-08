import { ToggleGroup as BaseToggleGroup } from "@base-ui/react/toggle-group";
import { ArrowLeft, Bold, Italic, Star, Underline } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { Toggle } from "@/components/own/independant/toggle";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Anatomy, ApiReference } from "./api-reference";
import { CanceledExample, ControlledExample } from "./examples";

function Example({ title, description, children }: {
  title: string;
  description: ReactNode;
  children: ReactNode;
}) {
  return (
    <section aria-label={title} className="space-y-4">
      <div className="space-y-2">
        <h2 className="h3">{title}</h2>
        <p className="body-sm text-gray-bold/75">{description}</p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3 rounded-2xl border border-gray-base bg-surface-base p-6 shadow-s sm:p-8">
        {children}
      </div>
    </section>
  );
}

export default function ToggleShowcasePage() {
  return (
    <main className="min-h-screen bg-surface-soft px-6 py-12 text-gray-bold sm:px-12">
      <div className="mx-auto max-w-4xl space-y-12">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-gray-bold/70 transition-colors hover:text-gray-bold">
              <ArrowLeft aria-hidden className="size-4" />
              Volver al catálogo
            </Link>
            <ThemeToggle />
          </div>
          <header className="space-y-2">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="h1">Toggle</h1>
              <span className="caption rounded-base bg-primary-soft px-2.5 py-0.5 font-semibold">@base-ui/react/toggle</span>
            </div>
            <p className="subtitle">Activa o desactiva una herramienta con un botón que conserva su estado.</p>
          </header>
        </div>

        <Example title="Pulsación independiente" description={<>Activa y desactiva el botón con clic, <kbd>Espacio</kbd> o <kbd>Enter</kbd>. El estado se expone mediante <code>aria-pressed</code>.</>}>
          <Toggle>Resaltar coincidencias</Toggle>
        </Example>

        <Example title="Estado inicial" description={<>Usa <code>defaultPressed</code> para empezar con el botón presionado y dejar que gestione los cambios.</>}>
          <Toggle defaultPressed>Fijar vista</Toggle>
        </Example>

        <Example title="Botón solo icono" description={<>Combina <code>iconOnly</code> y <code>{'variant="ghost"'}</code> para una huella cuadrada con nombre accesible mediante <code>aria-label</code>.</>}>
          <Toggle iconOnly variant="ghost" aria-label="Marcar como favorito" className="group">
            <Star aria-hidden className="group-data-pressed:fill-current" />
          </Toggle>
        </Example>

        <Example title="Tamaños" description={<>Usa <code>size</code> para ajustar la altura, la tipografía y el espaciado al contexto del botón.</>}>
          <Toggle size="sm">Pequeño</Toggle>
          <Toggle size="md">Mediano</Toggle>
          <Toggle size="lg">Grande</Toggle>
        </Example>

        <Example title="Estado controlado" description={<>Sincroniza <code>pressed</code> y <code>onPressedChange</code> para cambiar la densidad de la lista.</>}>
          <ControlledExample />
        </Example>

        <Example title="Botón deshabilitado" description={<>Aplica <code>disabled</code> para conservar el estado actual y bloquear la interacción.</>}>
          <Toggle size="sm" disabled>Ajustar a guías</Toggle>
          <Toggle size="sm" disabled defaultPressed>Ajustar a cuadrícula</Toggle>
        </Example>

        <Example title="Cancelar el cambio" description={<>Llama a <code>details.cancel()</code> desde <code>onPressedChange</code> para conservar el estado mientras los cambios estén bloqueados.</>}>
          <CanceledExample />
        </Example>

        <Example title="Elemento personalizado" description={<>Combina <code>{'render={<span />}'}</code> y <code>{'nativeButton={false}'}</code> para conservar el rol de botón y la activación por teclado.</>}>
          <Toggle render={<span />} nativeButton={false}>Marcar revisión</Toggle>
        </Example>

        <Example title="Dentro de un grupo" description={<>Asigna un <code>value</code> distinto a cada botón para compartir la selección y recorrerlos con flechas mediante <code>ToggleGroup</code> de Base UI.</>}>
          <BaseToggleGroup aria-label="Formato de texto" className="flex flex-wrap justify-center gap-1" defaultValue={["bold"]} multiple>
            <Toggle value="bold" variant="ghost" size="sm" iconOnly aria-label="Negrita"><Bold aria-hidden /></Toggle>
            <Toggle value="italic" variant="ghost" size="sm" iconOnly aria-label="Cursiva"><Italic aria-hidden /></Toggle>
            <Toggle value="underline" variant="ghost" size="sm" iconOnly aria-label="Subrayado"><Underline aria-hidden /></Toggle>
          </BaseToggleGroup>
        </Example>

        <Anatomy />
        <ApiReference />
      </div>
    </main>
  );
}
