import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";
import { Switch, SwitchThumb } from "@/components/own/base/switch";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Anatomy, ApiReference } from "./api-reference";
import { ControlledExample, FormExample, RequiredExample } from "./examples";

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
      <div className="rounded-2xl border border-gray-base bg-surface-base p-6 shadow-s sm:p-8">
        <div className="mx-auto w-full max-w-xs">{children}</div>
      </div>
    </section>
  );
}

const settingRow = "body-sm flex items-center justify-between gap-4 font-medium";

export default function SwitchShowcasePage() {
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
              <h1 className="h1">Switch</h1>
              <span className="caption rounded-base bg-primary-soft px-2.5 py-0.5 font-semibold">
                @base-ui/react/switch
              </span>
            </div>
            <p className="subtitle">Activa o desactiva una preferencia con el puntero o el teclado.</p>
          </header>
        </div>

        <Example title="Activación con etiqueta" description={<>Pulsa la etiqueta o usa <kbd>Espacio</kbd> sobre el interruptor, que empieza encendido con <code>defaultChecked</code>.</>}>
          <label className={`${settingRow} cursor-pointer`}>
            Notificaciones
            <Switch defaultChecked><SwitchThumb /></Switch>
          </label>
        </Example>

        <Example title="Preferencia controlada" description={<>Sincroniza <code>checked</code> y <code>onCheckedChange</code> para mostrar u ocultar los detalles del archivo.</>}>
          <ControlledExample />
        </Example>

        <Example title="Solo lectura" description={<>Usa <code>readOnly</code> para que el interruptor siga siendo enfocable sin que se pueda cambiar.</>}>
          <label className={settingRow}>
            Copia de seguridad diaria
            <Switch defaultChecked readOnly><SwitchThumb /></Switch>
          </label>
        </Example>

        <Example title="Interruptor deshabilitado" description={<>Aplica <code>disabled</code> para omitir el interruptor de la navegación por tabulación.</>}>
          <label className={settingRow}>
            Sincronización automática
            <Switch disabled><SwitchThumb /></Switch>
          </label>
        </Example>

        <Example title="Validación con Field" description={<>Intenta guardar con el interruptor apagado para ver el error de <code>required</code> que muestra <code>FieldError</code>.</>}>
          <RequiredExample />
        </Example>

        <Example title="Envío en ambos estados" description={<>Usa <code>value</code> y <code>uncheckedValue</code> para guardar un valor distinto al encender o apagar el interruptor.</>}>
          <FormExample />
        </Example>

        <Example title="Botón nativo con etiqueta separada" description={<>Combina <code>nativeButton</code> y <code>{'render={<button />}'}</code> para asociar una etiqueta hermana mediante <code>htmlFor</code>.</>}>
          <div className={settingRow}>
            <label className="cursor-pointer" htmlFor="switch-sounds">Sonidos de la interfaz</label>
            <Switch id="switch-sounds" nativeButton render={<button type="button" />}><SwitchThumb /></Switch>
          </div>
        </Example>

        <Anatomy />
        <ApiReference />
      </div>
    </main>
  );
}
