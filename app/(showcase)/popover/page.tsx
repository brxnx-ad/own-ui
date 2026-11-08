import { ShowcasePage, ShowcaseExample } from "@/components/shared/showcase";
import { Button } from "@/components/own/base/button";
import { Input } from "@/components/own/base/input";
import {
  Popover,
  PopoverBackdrop,
  PopoverClose,
  PopoverDescription,
  PopoverPopup,
  PopoverPortal,
  PopoverPositioner,
  PopoverTitle,
  PopoverTrigger,
  type PopoverPositionerProps,
  type PopoverProps,
  type PopoverTriggerProps,
} from "@/components/own/base/popover";
import { Anatomy, ApiReference } from "./api-reference";
import { ControlledExample, DetachedTriggersExample, FocusExample } from "./examples";


function PopoverExample({ trigger, title, description, triggerProps, positionerProps, modal, keepMounted, children }: {
  trigger: string;
  title: string;
  description: string;
  triggerProps?: Pick<PopoverTriggerProps, "openOnHover" | "delay" | "closeDelay">;
  positionerProps?: Pick<PopoverPositionerProps, "side" | "align" | "sideOffset">;
  modal?: PopoverProps["modal"];
  keepMounted?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <Popover modal={modal}>
      <PopoverTrigger render={<Button variant="outline" />} {...triggerProps}>{trigger}</PopoverTrigger>
      <PopoverPortal keepMounted={keepMounted}>
        {modal === true && <PopoverBackdrop />}
        <PopoverPositioner {...positionerProps}>
          <PopoverPopup>
            <PopoverTitle>{title}</PopoverTitle>
            <PopoverDescription>{description}</PopoverDescription>
            {children}
            <PopoverClose className="self-start" render={<Button variant="outline" size="sm" />}>Cerrar</PopoverClose>
          </PopoverPopup>
        </PopoverPositioner>
      </PopoverPortal>
    </Popover>
  );
}

export default function PopoverShowcasePage() {
  return (
    <ShowcasePage title="Popover" implementation="@base-ui/react/popover" description="Panel anclado a un activador para mostrar información o editar datos sin cambiar de pantalla.">
        <ShowcaseExample contentClassName="flex flex-wrap items-center justify-center gap-3" title="Panel informativo" description={<>Abre los detalles con <code>PopoverTrigger</code> y ciérralos con el botón, Escape o al pulsar fuera del panel.</>}>
          <PopoverExample
            trigger="Ver detalles"
            title="Detalles del informe"
            description="El informe consolida las solicitudes registradas durante la última semana."
          />
        </ShowcaseExample>
        <ShowcaseExample contentClassName="flex flex-wrap items-center justify-center gap-3" title="Lado y alineación" description={<>Usa <code>{'side="top"'}</code> y <code>{'align="start"'}</code> para preferir el borde superior de inicio, con ajuste automático si falta espacio.</>}>
          <PopoverExample
            trigger="Ver fecha de corte"
            title="Fecha de corte"
            description="Los datos se actualizan al final de cada jornada."
            positionerProps={{ side: "top", align: "start", sideOffset: 12 }}
          />
        </ShowcaseExample>
        <ShowcaseExample contentClassName="flex flex-wrap items-center justify-center gap-3" title="Apertura al pasar el puntero" description={<>Usa <code>openOnHover</code> y ajusta los tiempos de apertura y cierre con <code>delay</code> y <code>closeDelay</code>.</>}>
          <PopoverExample
            trigger="Consultar disponibilidad"
            title="Estado del servicio"
            description="El servicio está operativo y las solicitudes se procesan con normalidad."
            triggerProps={{ openOnHover: true, delay: 200, closeDelay: 150 }}
          />
        </ShowcaseExample>
        <ShowcaseExample contentClassName="flex flex-wrap items-center justify-center gap-3" title="Modo modal" description={<>Con <code>modal</code>, Tab permanece dentro del panel y el fondo queda bloqueado mientras está abierto.</>}>
          <PopoverExample
            trigger="Ver horario de mantenimiento"
            title="Ventana de mantenimiento"
            description="La plataforma se actualizará el viernes entre las 18:00 y las 19:00."
            modal
          />
        </ShowcaseExample>
        <ShowcaseExample contentClassName="flex flex-wrap items-center justify-center gap-3" title="Foco contenido" description={<>Usa <code>{'modal="trap-focus"'}</code> para mantener Tab en el panel y conservar el desplazamiento de la página.</>}>
          <PopoverExample
            trigger="Consultar permisos"
            title="Permisos del equipo"
            description="El equipo puede consultar y descargar informes."
            modal="trap-focus"
          />
        </ShowcaseExample>
        <ShowcaseExample contentClassName="flex flex-wrap items-center justify-center gap-3" title="Foco inicial y retorno" description={<>Enfoca el campo al abrir con <code>initialFocus</code> y devuelve el foco al activador al cerrar con <code>finalFocus</code>.</>}>
          <FocusExample />
        </ShowcaseExample>
        <ShowcaseExample contentClassName="flex flex-wrap items-center justify-center gap-3" title="Contenido persistente" description={<>Escribe una nota, cierra y vuelve a abrir el panel para comprobar que <code>keepMounted</code> conserva el valor.</>}>
          <PopoverExample
            trigger="Editar nota"
            title="Nota interna"
            description="La nota se conserva al cerrar y volver a abrir este panel."
            keepMounted
          >
            <label className="grid gap-1">
              <span className="body-sm font-medium">Nota</span>
              <Input />
            </label>
          </PopoverExample>
        </ShowcaseExample>
        <ShowcaseExample contentClassName="flex flex-wrap items-center justify-center gap-3" title="Activadores separados" description={<>Comparte un <code>handle</code> entre dos activadores y usa su <code>payload</code> para cambiar el contenido dentro de <code>PopoverViewport</code>.</>}>
          <DetachedTriggersExample />
        </ShowcaseExample>
        <ShowcaseExample contentClassName="flex flex-wrap items-center justify-center gap-3" title="Apertura controlada" description={<>Controla <code>open</code> y <code>triggerId</code> para abrir el mismo panel desde un botón externo y anclarlo a Preferencias.</>}>
          <ControlledExample />
        </ShowcaseExample>
        <Anatomy />
        <ApiReference />
    </ShowcasePage>
  );
}
