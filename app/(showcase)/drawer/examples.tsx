"use client";

import { useState, type ComponentProps, type ReactNode } from "react";
import { Button } from "@/components/own/independant/button";
import {
  Drawer,
  DrawerBackdrop,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerIndent,
  DrawerIndentBackground,
  DrawerPopup,
  DrawerPortal,
  DrawerProvider,
  DrawerSwipeArea,
  DrawerTitle,
  DrawerTrigger,
  DrawerViewport,
  DrawerVirtualKeyboardProvider,
  type DrawerSnapPoint,
  type DrawerSwipeDirection,
} from "@/components/own/independant/drawer";

function Surface({ backdrop = true, ...props }: ComponentProps<typeof DrawerPopup> & { backdrop?: boolean }) {
  return (
    <DrawerPortal>
      {backdrop && <DrawerBackdrop />}
      <DrawerViewport>
        <DrawerPopup {...props} />
      </DrawerViewport>
    </DrawerPortal>
  );
}

function Heading({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="space-y-2">
      <DrawerTitle>{title}</DrawerTitle>
      <DrawerDescription>{children}</DrawerDescription>
    </div>
  );
}

function CloseButton({ children = "Cerrar" }: { children?: string }) {
  return (
    <div className="flex justify-end">
      <DrawerClose render={<Button variant="secondary" />}>{children}</DrawerClose>
    </div>
  );
}

export function BottomExample() {
  return (
    <Drawer>
      <DrawerTrigger render={<Button />}>Ver resumen</DrawerTrigger>
      <Surface>
        <DrawerContent>
          <Heading title="Resumen semanal">Consulta los indicadores del turno.</Heading>
          <dl className="body-sm grid grid-cols-[auto_1fr] gap-x-4 gap-y-2">
            <dt className="font-semibold">Producción</dt><dd>420 unidades</dd>
            <dt className="font-semibold">Cumplimiento</dt><dd>96 %</dd>
          </dl>
          <CloseButton />
        </DrawerContent>
      </Surface>
    </Drawer>
  );
}

const edges = [
  ["left", "Izquierda"],
  ["right", "Derecha"],
  ["up", "Arriba"],
] satisfies [DrawerSwipeDirection, string][];

export function DirectionsExample() {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {edges.map(([direction, label]) => (
        <Drawer key={direction} swipeDirection={direction}>
          <DrawerTrigger render={<Button variant="secondary" />}>{label}</DrawerTrigger>
          <Surface>
            <DrawerContent>
              <Heading title={`Panel ${label.toLowerCase()}`}>
                Arrastra el asa hacia el borde por el que entró el panel.
              </Heading>
              <CloseButton />
            </DrawerContent>
          </Surface>
        </Drawer>
      ))}
    </div>
  );
}

export function GripPositionExample() {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      <Drawer swipeDirection="right">
        <DrawerTrigger render={<Button variant="secondary" />}>Agarre inferior</DrawerTrigger>
        <Surface gripPosition="bottom">
          <DrawerContent>
            <Heading title="Agarre inferior">Arrastra el agarre de abajo hacia la derecha para cerrar.</Heading>
            <CloseButton />
          </DrawerContent>
        </Surface>
      </Drawer>
      <Drawer swipeDirection="right">
        <DrawerTrigger render={<Button variant="secondary" />}>Agarre con borde</DrawerTrigger>
        <Surface gripPosition="bottom" showGripBorder>
          <DrawerContent>
            <Heading title="Agarre con borde">Arrastra la banda inferior hacia la derecha para cerrar.</Heading>
            <CloseButton />
          </DrawerContent>
        </Surface>
      </Drawer>
      <Drawer swipeDirection="right">
        <DrawerTrigger render={<Button variant="secondary" />}>Sin agarre</DrawerTrigger>
        <Surface gripPosition="none">
          <DrawerContent>
            <Heading title="Panel sin agarre">Puedes cerrar el panel con Cerrar o Escape.</Heading>
            <CloseButton />
          </DrawerContent>
        </Surface>
      </Drawer>
    </div>
  );
}

export function FormExample() {
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState("Revisar la disponibilidad del turno.");

  return (
    <div className="flex w-full flex-col items-center gap-4 text-center">
      <p className="body-sm max-w-md wrap-anywhere">{note}</p>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger render={<Button variant="secondary" />}>Editar nota</DrawerTrigger>
        <DrawerVirtualKeyboardProvider>
          <Surface>
            <DrawerContent>
              <Heading title="Nota del turno">Guarda la nota para aplicarla a la vista previa.</Heading>
              <form
                className="space-y-4"
                onSubmit={(event) => {
                  event.preventDefault();
                  const value = String(new FormData(event.currentTarget).get("note") ?? "").trim();
                  if (!value) return;
                  setNote(value);
                  setOpen(false);
                }}
              >
                <label className="body-sm block space-y-2 font-medium">
                  <span>Nota</span>
                  <textarea name="note" rows={3} required maxLength={200} defaultValue={note} className="body-sm block w-full resize-y rounded-base border border-gray-base bg-surface-bold p-3 focus-visible:outline-2 focus-visible:outline-primary-base" />
                </label>
                <div className="flex flex-wrap justify-end gap-2">
                  <DrawerClose render={<Button variant="secondary" />}>Cancelar</DrawerClose>
                  <Button type="submit">Guardar nota</Button>
                </div>
              </form>
            </DrawerContent>
          </Surface>
        </DrawerVirtualKeyboardProvider>
      </Drawer>
    </div>
  );
}

const snapPoints: DrawerSnapPoint[] = ["16rem", 1];
const reviewItems = [
  ["Producción", "Contrasta las unidades producidas con el plan del turno."],
  ["Paradas", "Registra la duración y la causa de las detenciones."],
  ["Calidad", "Revisa la proporción de unidades que requirieron retrabajo."],
  ["Materiales", "Confirma que el inventario alcanza para el turno siguiente."],
  ["Dotación", "Comprueba los relevos y las ausencias previstas."],
  ["Incidencias", "Asigna un responsable y un plazo para cada acción pendiente."],
];

export function SnapExample() {
  const [point, setPoint] = useState<DrawerSnapPoint | null>(snapPoints[0]);
  const expanded = point === 1;

  return (
    <Drawer snapPoints={snapPoints} snapPoint={point} onSnapPointChange={setPoint}>
      <DrawerTrigger render={<Button variant="secondary" />}>Ver revisión de turno</DrawerTrigger>
      <Surface>
        <DrawerContent role="region" aria-label="Detalle de revisión" tabIndex={0} className="focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary-base">
          <Heading title="Revisión de turno">Arrastra el asa o usa el botón para cambiar la altura visible.</Heading>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={() => setPoint(expanded ? snapPoints[0] : 1)}>
              {expanded ? "Reducir" : "Ampliar"}
            </Button>
            <DrawerClose render={<Button variant="secondary" />}>Cerrar revisión</DrawerClose>
          </div>
          <dl className="body-sm grid gap-4">
            {reviewItems.map(([label, description]) => (
              <div key={label} className="rounded-base border border-gray-base bg-surface-bold p-4">
                <dt className="font-semibold">{label}</dt>
                <dd>{description}</dd>
              </div>
            ))}
          </dl>
        </DrawerContent>
      </Surface>
    </Drawer>
  );
}

export function SwipeAreaExample() {
  return (
    <Drawer swipeDirection="right">
      <div className="relative flex min-h-28 w-full max-w-md items-center justify-center rounded-base border border-gray-base bg-surface-bold p-4 pr-20">
        <DrawerTrigger render={<Button variant="secondary" />}>Abrir accesos</DrawerTrigger>
        <DrawerSwipeArea className="absolute inset-y-0 right-0 grid w-16 cursor-grab place-items-center rounded-r-base border-l border-dashed border-primary-base bg-primary-soft p-1 text-center text-xs font-semibold text-primary-bold">
          Arrastra hacia la izquierda
        </DrawerSwipeArea>
      </div>
      <Surface>
        <DrawerContent>
          <Heading title="Accesos del turno">Consulta la carpeta compartida para ver el plan y el registro de incidencias.</Heading>
          <CloseButton />
        </DrawerContent>
      </Surface>
    </Drawer>
  );
}

export function NonModalExample() {
  const [reviewed, setReviewed] = useState(false);

  return (
    <div className="flex flex-wrap justify-center gap-2">
      <Drawer modal={false} disablePointerDismissal>
        <DrawerTrigger render={<Button variant="secondary" />}>Abrir guía</DrawerTrigger>
        <Surface backdrop={false}>
          <DrawerContent>
            <Heading title="Guía de verificación">Comprueba que el registro contiene la fecha, el turno y el responsable.</Heading>
            <CloseButton />
          </DrawerContent>
        </Surface>
      </Drawer>
      <Button variant="outline" aria-pressed={reviewed} onClick={() => setReviewed(!reviewed)}>
        {reviewed ? "Registro revisado" : "Marcar como revisado"}
      </Button>
    </div>
  );
}

export function NestedExample() {
  return (
    <Drawer swipeDirection="right">
      <DrawerTrigger render={<Button variant="secondary" />}>Ver ficha del equipo</DrawerTrigger>
      <Surface>
        <DrawerContent>
          <Heading title="Ficha del equipo">Línea de ensamblaje 3.</Heading>
          <Drawer>
            <DrawerTrigger render={<Button variant="outline" />}>Ver mantención</DrawerTrigger>
            <Surface>
              <DrawerContent>
                <Heading title="Plan de mantención">La revisión preventiva se realiza al inicio de cada semana.</Heading>
                <CloseButton>Volver a la ficha</CloseButton>
              </DrawerContent>
            </Surface>
          </Drawer>
          <CloseButton>Cerrar ficha</CloseButton>
        </DrawerContent>
      </Surface>
    </Drawer>
  );
}

export function IndentExample() {
  return (
    <DrawerProvider>
      <div className="relative w-full max-w-md overflow-hidden rounded-base border border-gray-base">
        <DrawerIndentBackground className="absolute inset-0 bg-primary-soft opacity-0 transition-opacity duration-300 data-active:opacity-100 motion-reduce:transition-none" />
        <DrawerIndent className="relative flex min-h-32 flex-col items-center justify-center gap-3 rounded-base bg-surface-bold p-4 transition-transform duration-300 motion-safe:data-active:scale-90 motion-reduce:transition-none">
          <p className="body-sm font-semibold">Vista previa del tablero</p>
          <Drawer>
            <DrawerTrigger render={<Button variant="secondary" />}>Abrir panel del tablero</DrawerTrigger>
            <Surface backdrop={false}>
              <DrawerContent>
                <Heading title="Panel del tablero">El tablero cambia de escala mientras este panel está abierto.</Heading>
                <CloseButton />
              </DrawerContent>
            </Surface>
          </Drawer>
        </DrawerIndent>
      </div>
    </DrawerProvider>
  );
}
