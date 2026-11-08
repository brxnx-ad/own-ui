import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Anatomy, ApiReference } from "./api-reference";
import {
  AnchoredExample,
  ConfirmationExample,
  DeduplicatedExample,
  GlobalManagerExample,
  LimitExample,
  PromiseExample,
  ShowcaseProvider,
  StatusExample,
  TimeoutExample,
  UndoExample,
} from "./examples";

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
      <div className="flex justify-center rounded-2xl border border-gray-base bg-surface-base p-6 shadow-s sm:p-8">
        {children}
      </div>
    </section>
  );
}

export default function ToastShowcasePage() {
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
              <h1 className="h1">Toast</h1>
              <span className="caption rounded-base bg-primary-soft px-2.5 py-0.5 font-semibold">@base-ui/react/toast</span>
            </div>
            <p className="subtitle">Informa el resultado de una acción sin interrumpir la tarea actual.</p>
          </header>
        </div>

        <ShowcaseProvider>
          <Example title="Confirmación breve" description={<>Crea un aviso con <code>add</code> y ciérralo con su botón o arrastrándolo hacia la derecha.</>}>
            <ConfirmationExample />
          </Example>
          <Example title="Tipo y prioridad" description={<>Usa <code>type</code> para el acento visual y <code>{'priority: "high"'}</code> para un anuncio urgente.</>}>
            <StatusExample />
          </Example>
          <Example title="Cierre automático" description={<>Configura <code>timeout</code> en milisegundos y pasa el puntero sobre el aviso para pausar su cierre.</>}>
            <TimeoutExample />
          </Example>
          <Example title="Deshacer una acción" description={<>Define <code>actionProps</code> para devolver el informe a la lista y <code>{"timeout: 0"}</code> para mantener disponible la acción.</>}>
            <UndoExample />
          </Example>
          <Example title="Resultado de una promesa" description={<>Usa <code>promise</code> para convertir el mismo aviso de carga en confirmación o error.</>}>
            <PromiseExample />
          </Example>
          <Example title="Aviso con identificador estable" description={<>Reutiliza <code>id</code> en <code>add</code> para sustituir el contenido del aviso de sincronización y reiniciar su temporizador.</>}>
            <DeduplicatedExample />
          </Example>
          <Example title="Límite de avisos visibles" description={<>Genera cuatro avisos con el <code>limit</code> predeterminado de tres y cierra uno para recuperar el más antiguo.</>}>
            <LimitExample />
          </Example>
          <Example title="Aviso junto al activador" description={<>Pasa <code>positionerProps.anchor</code> para mostrar el mensaje junto al botón que lo solicita.</>}>
            <AnchoredExample />
          </Example>
          <Example title="Gestor fuera de React" description={<>Usa una instancia de <code>createToastManager</code> para publicar avisos desde una función sin hooks.</>}>
            <GlobalManagerExample />
          </Example>
        </ShowcaseProvider>

        <Anatomy />
        <ApiReference />
      </div>
    </main>
  );
}
