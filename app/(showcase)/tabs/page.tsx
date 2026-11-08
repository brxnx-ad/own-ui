import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";
import { Input } from "@/components/own/independant/input";
import { Tabs, TabsIndicator, TabsList, TabsPanel, TabsTab } from "@/components/own/independant/tabs";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Anatomy, ApiReference } from "./api-reference";
import { ControlledExample, RemovedTabExample } from "./examples";

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
        <div className="mx-auto w-full max-w-lg">{children}</div>
      </div>
    </section>
  );
}

const animatedPanel = "col-start-1 row-start-1 motion-safe:transition-opacity motion-safe:duration-150 motion-safe:data-starting-style:opacity-0 motion-safe:data-ending-style:opacity-0";

const projectViews = [
  { id: "overview", label: "Resumen general", text: "El proyecto está en etapa de revisión." },
  { id: "schedule", label: "Calendario de entregas", text: "La próxima entrega es el jueves." },
  { id: "members", label: "Personas del equipo", text: "Cuatro personas colaboran en este proyecto." },
  { id: "history", label: "Historial de cambios", text: "La estructura de navegación se actualizó hoy." },
];

export default function TabsShowcasePage() {
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
              <h1 className="h1">Tabs</h1>
              <span className="caption rounded-base bg-primary-soft px-2.5 py-0.5 font-semibold">
                @base-ui/react/tabs
              </span>
            </div>
            <p className="subtitle">Alterna entre paneles relacionados en la misma página.</p>
          </header>
        </div>

        <Example title="Selección manual" description={<>Recorre las pestañas con las flechas y usa <kbd>Enter</kbd> o <kbd>Espacio</kbd> para abrir el panel correspondiente.</>}>
          <Tabs defaultValue="summary">
            <TabsList aria-label="Información del informe">
              <TabsTab value="summary">Resumen</TabsTab>
              <TabsTab value="activity">Actividad</TabsTab>
              <TabsTab value="archive" disabled>Archivo</TabsTab>
              <TabsIndicator renderBeforeHydration />
            </TabsList>
            <TabsPanel value="summary">El informe reúne los resultados de la última revisión.</TabsPanel>
            <TabsPanel value="activity">Se incorporaron dos observaciones al informe.</TabsPanel>
            <TabsPanel value="archive">Las versiones archivadas están pendientes de publicación.</TabsPanel>
          </Tabs>
        </Example>

        <Example title="Activación al recibir foco" description={<>Añade <code>activateOnFocus</code> para cambiar de panel al recorrer la lista con las flechas.</>}>
          <Tabs defaultValue="week">
            <TabsList aria-label="Periodo de actividad" activateOnFocus>
              <TabsTab value="week">Semana</TabsTab>
              <TabsTab value="month">Mes</TabsTab>
              <TabsIndicator />
            </TabsList>
            <TabsPanel value="week">Se completaron 7 tareas esta semana.</TabsPanel>
            <TabsPanel value="month">Se completaron 26 tareas este mes.</TabsPanel>
          </Tabs>
        </Example>

        <Example title="Orientación vertical" description={<>Usa <code>{'orientation="vertical"'}</code> para recorrer la lista con las flechas arriba y abajo, y <code>{'loopFocus={false}'}</code> para detenerte en los extremos.</>}>
          <Tabs defaultValue="profile" orientation="vertical">
            <TabsList aria-label="Preferencias de la cuenta" loopFocus={false}>
              <TabsTab value="profile">Perfil</TabsTab>
              <TabsTab value="alerts">Alertas</TabsTab>
              <TabsTab value="security">Seguridad</TabsTab>
              <TabsIndicator />
            </TabsList>
            <TabsPanel value="profile">Edita tu nombre y la foto que ve tu equipo.</TabsPanel>
            <TabsPanel value="alerts">Elige qué avisos quieres recibir.</TabsPanel>
            <TabsPanel value="security">Revisa tus dispositivos y sesiones activas.</TabsPanel>
          </Tabs>
        </Example>

        <Example title="Selección controlada" description={<>Sincroniza <code>value</code> y <code>onValueChange</code> para abrir un panel desde las pestañas o con un botón externo.</>}>
          <ControlledExample />
        </Example>

        <Example title="Conservar contenido" description={<>Escribe en el borrador, cambia de pestaña y vuelve para comprobar cómo <code>keepMounted</code> conserva el texto.</>}>
          <Tabs defaultValue="draft">
            <TabsList aria-label="Borrador de publicación">
              <TabsTab value="draft">Borrador</TabsTab>
              <TabsTab value="guidelines">Pautas</TabsTab>
              <TabsIndicator />
            </TabsList>
            <TabsPanel value="draft" keepMounted>
              <label className="grid gap-2 font-medium">
                Título del borrador
                <Input defaultValue="Guía del equipo" />
              </label>
            </TabsPanel>
            <TabsPanel value="guidelines">Usa un título breve que explique el tema de la publicación.</TabsPanel>
          </Tabs>
        </Example>

        <Example title="Retirar la pestaña activa" description={<>Quita la vista previa activa para ver cómo Tabs selecciona la primera pestaña habilitada en modo no controlado.</>}>
          <RemovedTabExample />
        </Example>

        <Example title="Transición entre paneles" description={<>Usa <code>data-starting-style</code> y <code>data-ending-style</code> para fundir los paneles con movimiento permitido.</>}>
          <Tabs defaultValue="current">
            <TabsList aria-label="Estado de publicación">
              <TabsTab value="current">Actual</TabsTab>
              <TabsTab value="planned">Planificado</TabsTab>
              <TabsIndicator />
            </TabsList>
            <div className="grid">
              <TabsPanel className={animatedPanel} value="current">La edición actual incluye la guía de navegación.</TabsPanel>
              <TabsPanel className={animatedPanel} value="planned">La próxima edición incluye la guía de accesibilidad.</TabsPanel>
            </div>
          </Tabs>
        </Example>

        <Example title="Lista desplazable" description={<>Desplaza la lista o navega con flechas cuando las pestañas superen el ancho disponible.</>}>
          <Tabs className="mx-auto max-w-72" defaultValue="overview">
            <TabsList aria-label="Vistas del proyecto">
              {projectViews.map(({ id, label }) => <TabsTab key={id} value={id}>{label}</TabsTab>)}
              <TabsIndicator />
            </TabsList>
            {projectViews.map(({ id, text }) => <TabsPanel key={id} value={id}>{text}</TabsPanel>)}
          </Tabs>
        </Example>

        <Anatomy />
        <ApiReference />
      </div>
    </main>
  );
}
