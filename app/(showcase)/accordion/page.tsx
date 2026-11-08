import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
} from "@/components/own/base/accordion";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { ControlledExample, PersistenceExample } from "./examples";
import { Anatomy, ApiReference } from "./api-reference";

function Behavior({ title, description, children }: {
  title: string;
  description: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-4">
      <div className="space-y-2">
        <h2 className="h3">{title}</h2>
        <p className="body-sm text-gray-bold/75">{description}</p>
      </div>
      <div className="rounded-2xl border border-gray-base bg-surface-base p-6 shadow-s sm:p-8">
        <div className="mx-auto w-full max-w-xl space-y-4">{children}</div>
      </div>
    </section>
  );
}

function Example({ multiple = false }: { multiple?: boolean }) {
  return (
    <Accordion multiple={multiple} defaultValue={["one"]}>
      <AccordionItem value="one">
        <AccordionHeader>
          <AccordionTrigger>¿Qué es own-ui?</AccordionTrigger>
        </AccordionHeader>
        <AccordionPanel>
          Una colección de componentes accesibles construidos sobre Base UI.
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem value="two">
        <AccordionHeader>
          <AccordionTrigger>¿Cómo se aplican los estilos?</AccordionTrigger>
        </AccordionHeader>
        <AccordionPanel>
          Los componentes utilizan las superficies y los tokens semánticos del
          proyecto.
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem value="disabled" disabled>
        <AccordionHeader>
          <AccordionTrigger>Sección deshabilitada</AccordionTrigger>
        </AccordionHeader>
        <AccordionPanel>
          Este contenido no se puede abrir mientras el elemento esté
          deshabilitado.
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}

export default function AccordionShowcasePage() {
  return (
    <main className="min-h-screen bg-surface-soft px-6 py-12 text-gray-bold sm:px-12">
      <div className="mx-auto max-w-4xl space-y-12">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-gray-bold/70 transition-colors hover:text-gray-bold"
            >
              <ArrowLeft className="size-4" />
              Volver al catálogo
            </Link>
            <ThemeToggle />
          </div>
          <header className="space-y-2">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="h1">Accordion</h1>
              <span className="caption rounded-base bg-primary-soft px-2.5 py-0.5 font-semibold text-primary-bold">
                @base-ui/react/accordion
              </span>
            </div>
            <p className="subtitle">
              Paneles expandibles para organizar contenido relacionado.
            </p>
          </header>
        </div>
        <section className="space-y-4">
          <div>
            <h2 className="h3">Apertura individual</h2>
            <p className="body-sm mt-1 text-gray-bold/75">
              Un solo panel abierto a la vez.
            </p>
          </div>
          <div className="rounded-2xl border border-gray-base bg-surface-base p-6 shadow-s sm:p-8">
            <div className="mx-auto w-full max-w-xl">
              <Example />
            </div>
          </div>
        </section>
            <Behavior title="Apertura múltiple" description={<>Permite abrir varios paneles a la vez con <code>multiple</code>.</>}><Example multiple /></Behavior>
            <Behavior title="Estado controlado" description={<>Controla la apertura desde fuera con <code>value</code> y <code>onValueChange</code>.</>}><ControlledExample /></Behavior>
            <Behavior title="Deshabilitación global" description={<>Deshabilita todos los elementos con <code>disabled</code>.</>}>
              <Accordion disabled><AccordionItem><AccordionHeader><AccordionTrigger>Sin interacción</AccordionTrigger></AccordionHeader><AccordionPanel>Contenido deshabilitado.</AccordionPanel></AccordionItem></Accordion>
            </Behavior>
            <Behavior title="Conservar contenido" description={<>Conserva el valor del campo al cerrar el panel con <code>keepMounted</code>.</>}><PersistenceExample /></Behavior>
            <Behavior title="Buscar contenido" description={<>Busca «heliotropo» en el panel cerrado mediante <code>hiddenUntilFound</code>.</>}>
              <Accordion hiddenUntilFound><AccordionItem><AccordionHeader><AccordionTrigger>Buscar contenido</AccordionTrigger></AccordionHeader><AccordionPanel>La palabra heliotropo está dentro del panel.</AccordionPanel></AccordionItem></Accordion>
            </Behavior>
            <Behavior title="Nivel de encabezado" description={<>Adapta el nivel del encabezado con <code>render</code>.</>}>
              <h3 className="h5">Sección interna</h3>
              <Accordion><AccordionItem><AccordionHeader render={<h4 />}><AccordionTrigger>Encabezado personalizado</AccordionTrigger></AccordionHeader><AccordionPanel>El nivel del encabezado sigue la jerarquía de esta página.</AccordionPanel></AccordionItem></Accordion>
            </Behavior>
        <Anatomy />
        <ApiReference />
      </div>
    </main>
  );
}
