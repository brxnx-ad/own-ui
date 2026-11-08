import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";
import {
  ScrollArea,
  ScrollAreaContent,
  ScrollAreaCorner,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
} from "@/components/own/base/scroll-area";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Anatomy, ApiReference } from "./api-reference";
import { KeepMountedExample } from "./examples";

const chapters = [
  "Preparación del proyecto",
  "Definición de superficies",
  "Escalas tipográficas",
  "Componentes interactivos",
  "Validación de formularios",
  "Navegación por teclado",
  "Temas y contraste",
  "Publicación del catálogo",
];

const milestones = [
  ["Exploración", "Reunir referencias"],
  ["Diseño", "Definir la composición"],
  ["Prototipo", "Probar las interacciones"],
  ["Revisión", "Verificar accesibilidad"],
  ["Entrega", "Preparar la documentación"],
];

const schedule = [
  ["Estructura", "Inventario", "Anatomía", "Composición", "Revisión"],
  ["Estilos", "Superficies", "Tipografía", "Estados", "Temas"],
  ["Interacción", "Puntero", "Teclado", "Táctil", "Foco"],
  ["Integración", "Imports", "Ejemplos", "Pruebas", "Ajustes"],
  ["Documentación", "Anatomía", "Props", "Accesibilidad", "Publicación"],
];

const panelStyles = "w-full rounded-base border border-gray-base bg-surface-bold";

function Behavior({ title, description, children }: {
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
        <div className="mx-auto w-full max-w-lg">{children}</div>
      </div>
    </section>
  );
}

function ChapterList() {
  return (
    <ol className="list-decimal divide-y divide-gray-base ps-5">
      {chapters.map((chapter) => (
        <li key={chapter} className="py-2.5 ps-1">{chapter}</li>
      ))}
    </ol>
  );
}

export default function ScrollAreaShowcasePage() {
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
              <h1 className="h1">Scroll Area</h1>
              <span className="caption rounded-base bg-primary-soft px-2.5 py-0.5 font-semibold text-gray-bold">
                @base-ui/react/scroll-area
              </span>
            </div>
            <p className="subtitle">Desplazamiento nativo dentro de una región con barras personalizadas por eje.</p>
          </header>
        </div>

        <Behavior title="Desplazamiento vertical" description={<>Recorre el índice con la rueda, las flechas o arrastrando el <code>ScrollAreaThumb</code>.</>}>
          <ScrollArea className={panelStyles}>
            <ScrollAreaViewport role="region" aria-label="Índice de la guía" className="max-h-44">
              <ScrollAreaContent className="body-sm py-2 ps-4 pe-6">
                <ChapterList />
              </ScrollAreaContent>
            </ScrollAreaViewport>
            <ScrollAreaScrollbar><ScrollAreaThumb /></ScrollAreaScrollbar>
          </ScrollArea>
        </Behavior>

        <Behavior title="Desplazamiento horizontal" description={<>Usa <code>{'orientation="horizontal"'}</code> para recorrer una fila más ancha que su ventana.</>}>
          <ScrollArea className={panelStyles}>
            <ScrollAreaViewport role="region" aria-label="Etapas del proyecto">
              <ScrollAreaContent className="p-3 pb-7">
                <ol className="flex gap-3">
                  {milestones.map(([title, detail]) => (
                    <li key={title} className="w-36 shrink-0 space-y-1 rounded-base border border-gray-base bg-surface-base p-3">
                      <span className="block text-sm font-semibold">{title}</span>
                      <span className="caption block text-gray-bold/75">{detail}</span>
                    </li>
                  ))}
                </ol>
              </ScrollAreaContent>
            </ScrollAreaViewport>
            <ScrollAreaScrollbar orientation="horizontal"><ScrollAreaThumb /></ScrollAreaScrollbar>
          </ScrollArea>
        </Behavior>

        <Behavior title="Desplazamiento en ambos ejes" description={<>Combina una barra por eje con <code>ScrollAreaCorner</code> para separar las pistas en la esquina.</>}>
          <ScrollArea className={panelStyles}>
            <ScrollAreaViewport role="region" aria-label="Plan de trabajo semanal" className="max-h-44">
              <ScrollAreaContent className="p-3 pe-7 pb-7">
                <table className="body-sm min-w-xl text-left">
                  <caption className="sr-only">Actividades por área y día</caption>
                  <thead className="bg-surface-base">
                    <tr>
                      {["Área", "Lunes", "Martes", "Miércoles", "Jueves"].map((day) => (
                        <th key={day} scope="col" className="px-3 py-2">{day}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {schedule.map(([area, ...tasks]) => (
                      <tr key={area} className="border-t border-gray-base">
                        <th scope="row" className="px-3 py-2 font-medium">{area}</th>
                        {tasks.map((task) => <td key={task} className="px-3 py-2">{task}</td>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </ScrollAreaContent>
            </ScrollAreaViewport>
            <ScrollAreaScrollbar><ScrollAreaThumb /></ScrollAreaScrollbar>
            <ScrollAreaScrollbar orientation="horizontal"><ScrollAreaThumb /></ScrollAreaScrollbar>
            <ScrollAreaCorner />
          </ScrollArea>
        </Behavior>

        <Behavior title="Indicios en los bordes" description={<>Los degradados se muestran cuando quedan más de 16 px por recorrer hacia un borde, según <code>overflowEdgeThreshold</code>.</>}>
          <ScrollArea className={`group ${panelStyles}`} overflowEdgeThreshold={16}>
            <ScrollAreaViewport role="region" aria-label="Capítulos con indicios de desplazamiento" className="max-h-40">
              <ScrollAreaContent className="body-sm py-3 ps-4 pe-6">
                <ChapterList />
              </ScrollAreaContent>
            </ScrollAreaViewport>
            <ScrollAreaScrollbar><ScrollAreaThumb /></ScrollAreaScrollbar>
            <div aria-hidden="true" className="pointer-events-none absolute start-0 end-4 top-0 z-10 h-5 rounded-ss-base bg-linear-to-b from-surface-bold opacity-0 group-data-overflow-y-start:opacity-100 motion-safe:transition-opacity" />
            <div aria-hidden="true" className="pointer-events-none absolute start-0 end-4 bottom-0 z-10 h-5 rounded-es-base bg-linear-to-t from-surface-bold opacity-0 group-data-overflow-y-end:opacity-100 motion-safe:transition-opacity" />
          </ScrollArea>
        </Behavior>

        <Behavior title="Barra persistente" description={<>Con <code>keepMounted</code>, la barra sigue en el DOM cuando el contenido cabe y reaparece al añadir filas.</>}>
          <KeepMountedExample />
        </Behavior>

        <Anatomy />
        <ApiReference />
      </div>
    </main>
  );
}
