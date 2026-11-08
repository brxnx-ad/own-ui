"use client";

import { useState, type ReactNode } from "react";
import { Button } from "@/components/own/base/button";
import {
  createToastManager,
  Toast,
  ToastAction,
  ToastArrow,
  ToastClose,
  ToastContent,
  ToastDescription,
  ToastPortal,
  ToastPositioner,
  ToastProvider,
  ToastStack,
  ToastTitle,
  ToastViewport,
  useToastManager,
  type ToastObject,
} from "@/components/own/base/toast";
import { Close } from "@/components/own/icons";

const showcaseManager = createToastManager();

function Notification({ toast, anchored = false }: { toast: ToastObject<object>; anchored?: boolean }) {
  return (
    <Toast toast={toast}>
      {anchored && <ToastArrow />}
      <ToastContent>
        <div className="flex items-start gap-2">
          <div className="min-w-0 flex-1 space-y-1">
            <ToastTitle />
            <ToastDescription />
          </div>
          <ToastClose aria-label="Cerrar notificación"><Close /></ToastClose>
        </div>
        <ToastAction />
      </ToastContent>
    </Toast>
  );
}

function ShowcaseViewport() {
  const { toasts } = useToastManager();

  return (
    <ToastPortal>
      <ToastViewport aria-label="Notificaciones del showcase">
        <ToastStack>
          {toasts.filter((toast) => toast.positionerProps?.anchor === undefined).map((toast) => (
            <Notification key={toast.id} toast={toast} />
          ))}
        </ToastStack>
        {toasts.filter((toast) => toast.positionerProps?.anchor !== undefined).map((toast) => (
          <ToastPositioner key={toast.id} toast={toast}>
            <Notification toast={toast} anchored />
          </ToastPositioner>
        ))}
      </ToastViewport>
    </ToastPortal>
  );
}

export function ShowcaseProvider({ children }: { children: ReactNode }) {
  return (
    <ToastProvider toastManager={showcaseManager}>
      {children}
      <ShowcaseViewport />
    </ToastProvider>
  );
}

export function ConfirmationExample() {
  const { add } = useToastManager();
  return (
    <Button type="button" size="sm" onClick={() => add({ title: "Cambios guardados", description: "El equipo ya puede ver la versión actualizada.", type: "success" })}>
      Guardar cambios
    </Button>
  );
}

const statusExamples = [
  { label: "Información", title: "Exportación disponible", description: "El informe está listo para descargar.", type: "info", priority: "low" },
  { label: "Advertencia", title: "Poco espacio disponible", description: "Libera espacio antes de subir más archivos.", type: "warning", priority: "low" },
  { label: "Error urgente", title: "Conexión interrumpida", description: "Los cambios recientes aún no se han sincronizado.", type: "error", priority: "high" },
] as const;

export function StatusExample() {
  const { add } = useToastManager();
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {statusExamples.map(({ label, ...toast }) => (
        <Button key={toast.type} type="button" size="sm" variant="outline" onClick={() => add(toast)}>{label}</Button>
      ))}
    </div>
  );
}

export function TimeoutExample() {
  const { add } = useToastManager();
  return (
    <Button type="button" size="sm" variant="outline" onClick={() => add({ title: "Vista actualizada", description: "El resumen ya incluye la última entrega.", timeout: 3000 })}>
      Actualizar vista
    </Button>
  );
}

export function UndoExample() {
  const [archived, setArchived] = useState(false);
  const { add, close } = useToastManager();
  const id = "showcase-archive";

  function archive() {
    setArchived(true);
    add({
      id,
      title: "Informe archivado",
      description: "Puedes devolverlo a la lista de informes activos.",
      timeout: 0,
      actionProps: {
        children: "Deshacer",
        onClick() {
          setArchived(false);
          close(id);
        },
      },
    });
  }

  return (
    <div className="body-sm flex w-full max-w-xs items-center justify-between gap-3">
      <span>Informe mensual <span className="caption block text-gray-bold/75">{archived ? "Archivado" : "Activo"}</span></span>
      <Button type="button" size="sm" variant="outline" onClick={archive} disabled={archived}>Archivar</Button>
    </div>
  );
}

export function PromiseExample() {
  const { promise } = useToastManager();

  function simulate(fail: boolean) {
    const task = new Promise<string>((resolve, reject) => {
      setTimeout(() => {
        if (fail) reject(new Error("Sin conexión"));
        else resolve("Resumen del equipo");
      }, 900);
    });

    void promise(task, {
      loading: { title: "Guardando borrador…", description: "Esperando confirmación." },
      success: (name) => ({ title: "Borrador guardado", description: name }),
      error: { title: "No se pudo guardar", description: "Revisa la conexión e inténtalo de nuevo." },
    }).catch(() => {
      // The rejected task is already represented by the error toast.
    });
  }

  return (
    <div className="flex flex-wrap justify-center gap-2">
      <Button type="button" size="sm" onClick={() => simulate(false)}>Simular guardado</Button>
      <Button type="button" size="sm" variant="outline" onClick={() => simulate(true)}>Simular error</Button>
    </div>
  );
}

export function DeduplicatedExample() {
  const { add } = useToastManager();
  const id = "showcase-sync";

  return (
    <div className="flex flex-wrap justify-center gap-2">
      <Button type="button" size="sm" variant="outline" onClick={() => add({ id, title: "Sincronización en pausa", type: "warning" })}>Pausar sincronización</Button>
      <Button type="button" size="sm" variant="outline" onClick={() => add({ id, title: "Sincronización reanudada", type: "info" })}>Reanudar sincronización</Button>
    </div>
  );
}

export function LimitExample() {
  const { add, close } = useToastManager();

  function notify() {
    for (const title of ["Proyecto creado", "Archivos importados", "Vista previa lista", "Informe publicado"]) {
      add({ title, type: "info", timeout: 0 });
    }
  }

  return (
    <div className="flex flex-wrap justify-center gap-2">
      <Button type="button" size="sm" onClick={notify}>Mostrar cuatro avisos</Button>
      <Button type="button" size="sm" variant="outline" onClick={() => close()}>Cerrar todos</Button>
    </div>
  );
}

export function AnchoredExample() {
  const { add } = useToastManager();

  return (
    <Button type="button" size="sm" variant="outline" onClick={(event) => add({
      id: "showcase-anchored",
      title: "Enlace disponible",
      description: "Cualquier persona del equipo puede abrirlo.",
      type: "info",
      positionerProps: { anchor: event.currentTarget, side: "top", sideOffset: 8 },
    })}>
      Consultar acceso al enlace
    </Button>
  );
}

function notifyBackgroundSync() {
  showcaseManager.add({ title: "Copia sincronizada", description: "La copia de seguridad está al día.", type: "success" });
}

export function GlobalManagerExample() {
  return <Button type="button" size="sm" variant="outline" onClick={notifyBackgroundSync}>Simular copia en segundo plano</Button>;
}
