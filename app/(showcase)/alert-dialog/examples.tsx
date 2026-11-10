"use client";

import { useEffect, useRef, useState, type ComponentProps, type ReactNode } from "react";
import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogClose,
  AlertDialogDescription,
  AlertDialogPopup,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogViewport,
  createAlertDialogHandle,
} from "@/components/own/base/alert-dialog";
import { Button } from "@/components/own/base/button";

function Surface(props: ComponentProps<typeof AlertDialogPopup>) {
  return (
    <AlertDialogPortal>
      <AlertDialogBackdrop />
      <AlertDialogViewport>
        <AlertDialogPopup {...props} />
      </AlertDialogViewport>
    </AlertDialogPortal>
  );
}

function Actions({ children }: { children: ReactNode }) {
  return (
    <div className="flex shrink-0 flex-col gap-2 sm:flex-row sm:justify-end">
      {children}
    </div>
  );
}

function Preview({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div role="status" className="w-full max-w-sm space-y-3 rounded-base border border-gray-base bg-surface-bold p-4">
      <p className="caption font-medium text-content-soft">{label}</p>
      <div className="body-sm">{children}</div>
    </div>
  );
}

export function ConfirmationExample() {
  const [defaults, setDefaults] = useState(false);

  return (
    <div className="flex w-full flex-col items-center gap-4 text-center">
      <Preview label="Preferencias actuales">
        <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-left">
          <dt className="text-content-base">Idioma</dt>
          <dd className="font-medium">{defaults ? "Español" : "English"}</dd>
          <dt className="text-content-base">Densidad</dt>
          <dd className="font-medium">{defaults ? "Cómoda" : "Compacta"}</dd>
        </dl>
      </Preview>
      <AlertDialog>
        <AlertDialogTrigger render={<Button variant="secondary" />}>
          Restablecer preferencias
        </AlertDialogTrigger>
        <Surface>
          <div className="space-y-2">
            <AlertDialogTitle>¿Restablecer las preferencias?</AlertDialogTitle>
            <AlertDialogDescription>
              El idioma cambiará a Español y la densidad a Cómoda.
              Cancelar conserva las preferencias actuales.
            </AlertDialogDescription>
          </div>
          <Actions>
            <AlertDialogClose render={<Button variant="secondary" />}>Cancelar</AlertDialogClose>
            <AlertDialogClose render={<Button />} onClick={() => setDefaults(true)}>
              Restablecer
            </AlertDialogClose>
          </Actions>
        </Surface>
      </AlertDialog>
      {defaults && <Button variant="ghost" size="sm" onClick={() => setDefaults(false)}>Volver a personalizar</Button>}
    </div>
  );
}

export function DestructiveExample() {
  const [discarded, setDiscarded] = useState(false);
  const cancelRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const restoreRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="flex w-full flex-col items-center gap-4 text-center">
      <Preview label="Borrador local">
        {discarded ? (
          <p className="text-content-base">Sin borrador. Se ha descartado el contenido de la vista previa.</p>
        ) : (
          <div className="space-y-2">
            <p className="font-semibold">Propuesta de proyecto</p>
            <p className="text-content-base">Objetivo: reducir el tiempo de preparación del informe semanal.</p>
          </div>
        )}
      </Preview>
      <AlertDialog>
        {discarded ? (
          <Button ref={restoreRef} variant="secondary" onClick={() => setDiscarded(false)}>Restaurar borrador</Button>
        ) : (
          <AlertDialogTrigger ref={triggerRef} render={<Button variant="destructive" />}>
            Descartar borrador
          </AlertDialogTrigger>
        )}
        <Surface initialFocus={cancelRef} finalFocus={() => restoreRef.current ?? triggerRef.current}>
          <div className="space-y-2">
            <AlertDialogTitle>¿Descartar el borrador?</AlertDialogTitle>
            <AlertDialogDescription>
              Se descartará «Propuesta de proyecto» y desaparecerá de la vista previa.
              Cancela para conservar el borrador.
            </AlertDialogDescription>
          </div>
          <Actions>
            <AlertDialogClose ref={cancelRef} render={<Button variant="secondary" />}>
              Cancelar
            </AlertDialogClose>
            <AlertDialogClose render={<Button variant="destructive" />} onClick={() => setDiscarded(true)}>Descartar borrador</AlertDialogClose>
          </Actions>
        </Surface>
      </AlertDialog>
    </div>
  );
}

export function ControlledExample() {
  const [open, setOpen] = useState(false);
  const [published, setPublished] = useState(false);
  const openButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="flex w-full flex-col items-center gap-4 text-center">
      <Preview label="Informe mensual">
        <p className="font-semibold">{published ? "Publicado" : "Borrador sin publicar"}</p>
      </Preview>
      <Button ref={openButtonRef} variant="secondary" onClick={() => setOpen(true)}>
        Publicar informe
      </Button>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <Surface finalFocus={openButtonRef}>
          <div className="space-y-2">
            <AlertDialogTitle>¿Publicar el informe mensual?</AlertDialogTitle>
            <AlertDialogDescription>
              El informe pasará de Borrador a Publicado en la vista previa.
            </AlertDialogDescription>
          </div>
          <Actions>
            <AlertDialogClose render={<Button variant="secondary" />}>Cancelar</AlertDialogClose>
            <Button onClick={() => { setPublished(true); setOpen(false); }}>Publicar</Button>
          </Actions>
        </Surface>
      </AlertDialog>
      {published && <Button variant="ghost" size="sm" onClick={() => setPublished(false)}>Volver a borrador</Button>}
    </div>
  );
}

export function AsyncExample({ failFirstAttempt = false }: { failFirstAttempt?: boolean }) {
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(false);
  const [completed, setCompleted] = useState(false);
  const pendingRef = useRef(false);
  const attemptedRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cancelRef = useRef<HTMLButtonElement>(null);

  useEffect(() => () => {
    if (timerRef.current !== null) clearTimeout(timerRef.current);
  }, []);

  function confirm() {
    if (pendingRef.current) return;
    pendingRef.current = true;
    setPending(true);
    setError(false);

    // El fallo solo se simula en el ejemplo dedicado al error y reintento.
    timerRef.current = setTimeout(() => {
      timerRef.current = null;
      pendingRef.current = false;
      setPending(false);
      if (failFirstAttempt && !attemptedRef.current) {
        attemptedRef.current = true;
        setError(true);
        return;
      }
      setCompleted(true);
      setOpen(false);
    }, 1200);
  }

  return (
    <div className="flex w-full flex-col items-center gap-4 text-center">
      <Preview label="Copias de seguridad">
        <p className="font-semibold">{completed ? "informe-mensual.zip" : "Sin copias guardadas"}</p>
        {completed && <p className="text-success-bold">Copia creada correctamente.</p>}
      </Preview>
      <AlertDialog
        open={open}
        onOpenChange={(nextOpen, details) => {
          if (!nextOpen && pendingRef.current) {
            details.cancel();
            return;
          }
          if (nextOpen) {
            attemptedRef.current = false;
            setError(false);
          }
          setOpen(nextOpen);
        }}
      >
        <AlertDialogTrigger render={<Button variant="secondary" />}>
          Crear copia de seguridad
        </AlertDialogTrigger>
        <Surface initialFocus={cancelRef} aria-busy={pending || undefined}>
          <div className="space-y-2">
            <AlertDialogTitle>¿Crear una copia de seguridad?</AlertDialogTitle>
            <AlertDialogDescription>
              Se creará una copia del informe mensual. El diálogo permanecerá
              abierto mientras se prepara el archivo.
            </AlertDialogDescription>
          </div>
          {error && (
            <p role="alert" className="body-sm rounded-base border border-error-base bg-error-soft p-3 text-error-bold">
              No se pudo crear la copia. Inténtalo de nuevo.
            </p>
          )}
          <Actions>
            <AlertDialogClose ref={cancelRef} disabled={pending} render={<Button variant="secondary" />}>
              Cancelar
            </AlertDialogClose>
            <Button loading={pending} onClick={confirm}>
              {pending ? "Creando copia…" : error ? "Reintentar" : "Crear copia"}
            </Button>
          </Actions>
        </Surface>
      </AlertDialog>
      {completed && <Button variant="ghost" size="sm" onClick={() => setCompleted(false)}>Reiniciar ejemplo</Button>}
    </div>
  );
}

interface Template {
  name: string;
  description: string;
}

const templates: Template[] = [
  { name: "Informe mensual", description: "Incluye indicadores, resultados y próximos pasos." },
  { name: "Resumen ejecutivo", description: "Organiza los hallazgos y las decisiones principales." },
];

export function DetachedTriggersExample() {
  const [handle] = useState(() => createAlertDialogHandle<Template>());
  const [selected, setSelected] = useState<Template | null>(null);

  return (
    <div className="flex w-full flex-col items-center gap-4 text-center">
      <Preview label="Plantilla del documento">
        <div className="space-y-2">
          <p className="font-semibold">{selected?.name ?? "Ninguna plantilla seleccionada"}</p>
          <p className="text-content-base">{selected?.description ?? "Elige una opción y confirma para aplicarla aquí."}</p>
        </div>
      </Preview>
      <div className="flex flex-wrap justify-center gap-2">
        {templates.map(template => (
          <AlertDialogTrigger key={template.name} handle={handle} payload={template} render={<Button variant="secondary" />}>
            {template.name}
          </AlertDialogTrigger>
        ))}
      </div>
      <AlertDialog handle={handle}>
        {({ payload }) => (
          <Surface>
            <div className="space-y-2">
              <AlertDialogTitle>¿Usar «{payload?.name}»?</AlertDialogTitle>
              <AlertDialogDescription>{payload?.description}</AlertDialogDescription>
            </div>
            <Actions>
              <AlertDialogClose render={<Button variant="secondary" />}>Cancelar</AlertDialogClose>
              <AlertDialogClose
                render={<Button />}
                onClick={() => { if (payload) setSelected(payload); }}
              >
                Usar plantilla
              </AlertDialogClose>
            </Actions>
          </Surface>
        )}
      </AlertDialog>
    </div>
  );
}

const reviewItems = [
  ["Destino", "La configuración se aplicará al entorno de demostración seleccionado."],
  ["Alcance", "Se incluyen las preferencias de visualización y las opciones compartidas del equipo."],
  ["Permisos", "Los permisos actuales se mantienen y no se crean usuarios adicionales."],
  ["Datos", "Los documentos, archivos adjuntos y registros existentes se conservan."],
  ["Historial", "La versión anterior seguirá disponible para consultar las diferencias."],
  ["Notificaciones", "Las preferencias de cada usuario seguirán controlando los avisos recibidos."],
  ["Compatibilidad", "Las sesiones nuevas utilizarán la configuración al volver a cargar la aplicación."],
  ["Recuperación", "Podrás volver a la configuración anterior desde el historial del entorno."],
];

export function LongContentExample() {
  const [applied, setApplied] = useState(false);
  const cancelRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="flex w-full flex-col items-center gap-4 text-center">
      <Preview label="Configuración del equipo">
        <p className="font-semibold">{applied ? "Configuración compartida aplicada" : "Configuración personalizada"}</p>
      </Preview>
      <AlertDialog>
        <AlertDialogTrigger render={<Button variant="secondary" />}>Revisar configuración</AlertDialogTrigger>
        <Surface initialFocus={cancelRef}>
          <div className="shrink-0 space-y-2">
            <AlertDialogTitle>¿Aplicar la configuración?</AlertDialogTitle>
            <AlertDialogDescription>
              Revisa las condiciones de la configuración compartida antes de aplicarla al equipo de la vista previa.
            </AlertDialogDescription>
          </div>
          <div
            role="region"
            aria-label="Detalle de la configuración"
            tabIndex={0}
            className="min-h-0 overflow-y-auto overscroll-contain rounded-base border border-gray-base p-4 focus-visible:outline-2 focus-visible:outline-primary-base"
          >
            <dl className="space-y-4 body-sm">
              {reviewItems.map(([title, description]) => (
                <div key={title} className="space-y-1">
                  <dt className="font-semibold">{title}</dt>
                  <dd className="text-content-base">{description}</dd>
                </div>
              ))}
            </dl>
          </div>
          <Actions>
            <AlertDialogClose ref={cancelRef} render={<Button variant="secondary" />}>Cancelar</AlertDialogClose>
            <AlertDialogClose render={<Button />} onClick={() => setApplied(true)}>Aplicar configuración</AlertDialogClose>
          </Actions>
        </Surface>
      </AlertDialog>
      {applied && <Button variant="ghost" size="sm" onClick={() => setApplied(false)}>Restablecer vista previa</Button>}
    </div>
  );
}
