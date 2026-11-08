"use client";

import { useRef, useState, type ComponentProps } from "react";
import { Button } from "@/components/own/base/button";
import {
  Dialog,
  DialogBackdrop,
  DialogClose,
  DialogDescription,
  DialogPopup,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
  DialogViewport,
  createDialogHandle,
} from "@/components/own/base/dialog";

const inputClass = "body-sm w-full rounded-base border border-gray-base bg-surface-bold px-3 py-2 text-gray-bold focus-visible:outline-2 focus-visible:outline-primary-base";

function Surface({
  backdrop = true,
  keepMounted,
  ...props
}: ComponentProps<typeof DialogPopup> & { backdrop?: boolean; keepMounted?: boolean }) {
  return (
    <DialogPortal keepMounted={keepMounted}>
      {backdrop && <DialogBackdrop />}
      <DialogViewport>
        <DialogPopup {...props} />
      </DialogViewport>
    </DialogPortal>
  );
}

function CloseButton({ children = "Cerrar" }: { children?: string }) {
  return (
    <div className="flex shrink-0 justify-end">
      <DialogClose render={<Button variant="secondary" />}>{children}</DialogClose>
    </div>
  );
}

export function BasicExample() {
  return (
    <Dialog>
      <DialogTrigger render={<Button />}>Ver detalles</DialogTrigger>
      <Surface>
        <div className="space-y-2">
          <DialogTitle>Entrega del informe</DialogTitle>
          <DialogDescription>Consulta el formato y el canal de entrega.</DialogDescription>
        </div>
        <dl className="body-sm grid grid-cols-[auto_1fr] gap-x-4 gap-y-2">
          <dt className="font-semibold">Formato</dt>
          <dd>PDF</dd>
          <dt className="font-semibold">Canal</dt>
          <dd>Carpeta compartida del proyecto</dd>
        </dl>
        <CloseButton />
      </Surface>
    </Dialog>
  );
}

export function ControlledExample() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("Informe mensual");
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex w-full flex-col items-center gap-4 text-center">
      <p className="body-sm break-all font-semibold">{name}</p>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger render={<Button variant="secondary" />}>Editar nombre</DialogTrigger>
        <Surface initialFocus={inputRef}>
          <div className="space-y-2">
            <DialogTitle>Editar nombre del informe</DialogTitle>
            <DialogDescription>El nombre se aplica a la vista previa.</DialogDescription>
          </div>
          <form
            className="space-y-4"
            onSubmit={(event) => {
              event.preventDefault();
              const nextName = inputRef.current?.value.trim();
              if (!nextName) return;
              setName(nextName);
              setOpen(false);
            }}
          >
            <label className="body-sm block space-y-2 font-medium">
              <span>Nombre</span>
              <input ref={inputRef} required maxLength={80} defaultValue={name} className={inputClass} />
            </label>
            <div className="flex flex-wrap justify-end gap-2">
              <DialogClose render={<Button variant="secondary" />}>Cancelar</DialogClose>
              <Button type="submit">Guardar</Button>
            </div>
          </form>
        </Surface>
      </Dialog>
    </div>
  );
}

export function ExplicitDismissalExample() {
  return (
    <Dialog disablePointerDismissal>
      <DialogTrigger render={<Button variant="secondary" />}>Ver instrucciones</DialogTrigger>
      <Surface>
        <div className="space-y-2">
          <DialogTitle>Instrucciones de revisión</DialogTitle>
          <DialogDescription>Comprueba las cifras y las fuentes antes de compartir el informe.</DialogDescription>
        </div>
        <CloseButton />
      </Surface>
    </Dialog>
  );
}

export function NonModalExample() {
  const [marked, setMarked] = useState(false);

  return (
    <div className="flex w-full flex-wrap justify-center gap-2">
      <Dialog modal={false}>
        <DialogTrigger render={<Button variant="secondary" />}>Abrir ayuda</DialogTrigger>
        <Surface backdrop={false} className="self-end">
          <div className="space-y-2">
            <DialogTitle>Ayuda para la revisión</DialogTitle>
            <DialogDescription>Marca el informe como revisado cuando termines de comprobar sus datos.</DialogDescription>
          </div>
          <CloseButton />
        </Surface>
      </Dialog>
      <Button aria-pressed={marked} variant="outline" onClick={() => setMarked(!marked)}>
        {marked ? "Informe revisado" : "Marcar como revisado"}
      </Button>
    </div>
  );
}

export function PersistenceExample() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="secondary" />}>Abrir notas</DialogTrigger>
      <Surface keepMounted>
        <div className="space-y-2">
          <DialogTitle>Notas de revisión</DialogTitle>
          <DialogDescription>Escribe un borrador y vuelve a abrir esta ventana.</DialogDescription>
        </div>
        <label className="body-sm block space-y-2 font-medium">
          <span>Borrador</span>
          <textarea className={inputClass} rows={3} />
        </label>
        <CloseButton />
      </Surface>
    </Dialog>
  );
}

const reports = [
  { name: "Producción", summary: "Volumen por turno y utilización de capacidad." },
  { name: "Calidad", summary: "Tasa de defectos y resultados de inspección." },
];

export function DetachedTriggersExample() {
  const [handle] = useState(() => createDialogHandle<(typeof reports)[number]>());

  return (
    <>
      <div className="flex flex-wrap justify-center gap-2">
        {reports.map((report) => (
          <DialogTrigger key={report.name} handle={handle} payload={report} render={<Button variant="secondary" />}>
            {report.name}
          </DialogTrigger>
        ))}
      </div>
      <Dialog handle={handle}>
        {({ payload }) => (
          <Surface>
            <div className="space-y-2">
              <DialogTitle>{payload?.name ?? "Informe"}</DialogTitle>
              <DialogDescription>{payload?.summary ?? "Elige un informe para consultar su resumen."}</DialogDescription>
            </div>
            <CloseButton />
          </Surface>
        )}
      </Dialog>
    </>
  );
}

export function NestedExample() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="secondary" />}>Ver ficha del indicador</DialogTrigger>
      <Surface>
        <div className="space-y-2">
          <DialogTitle>Utilización de capacidad</DialogTitle>
          <DialogDescription>Proporción de capacidad disponible que se utiliza en un período.</DialogDescription>
        </div>
        <div className="flex flex-wrap justify-end gap-2">
          <Dialog>
            <DialogTrigger render={<Button variant="outline" />}>Ver fórmula</DialogTrigger>
            <Surface>
              <div className="space-y-2">
                <DialogTitle>Fórmula de utilización</DialogTitle>
                <DialogDescription>Divide la producción real por la capacidad disponible y multiplica por 100.</DialogDescription>
              </div>
              <CloseButton>Volver a la ficha</CloseButton>
            </Surface>
          </Dialog>
          <DialogClose render={<Button variant="secondary" />}>Cerrar ficha</DialogClose>
        </div>
      </Surface>
    </Dialog>
  );
}

const reviewSteps = [
  ["Período", "Confirma que las fechas del informe coinciden con el período de revisión."],
  ["Origen de los datos", "Identifica el sistema y la fecha de extracción de cada conjunto de datos."],
  ["Unidades", "Usa las mismas unidades en los gráficos, las tablas y el texto."],
  ["Comparaciones", "Verifica que la base de comparación tenga el mismo alcance que el período actual."],
  ["Excepciones", "Explica los valores atípicos y los registros excluidos del cálculo."],
  ["Responsables", "Indica quién revisó las cifras y quién debe resolver los puntos pendientes."],
];

export function ScrollableExample() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="secondary" />}>Ver lista de revisión</DialogTrigger>
      <Surface>
        <div className="shrink-0 space-y-2">
          <DialogTitle>Lista de revisión del informe</DialogTitle>
          <DialogDescription>Consulta los criterios antes de publicar el informe.</DialogDescription>
        </div>
        <div
          role="region"
          aria-label="Criterios de revisión"
          tabIndex={0}
          className="min-h-0 max-h-52 overflow-y-auto overscroll-contain rounded-base border border-gray-base p-4 focus-visible:outline-2 focus-visible:outline-primary-base"
        >
          <dl className="body-sm space-y-4">
            {reviewSteps.map(([title, description]) => (
              <div key={title} className="space-y-1">
                <dt className="font-semibold">{title}</dt>
                <dd className="text-gray-bold/75">{description}</dd>
              </div>
            ))}
          </dl>
        </div>
        <CloseButton />
      </Surface>
    </Dialog>
  );
}
