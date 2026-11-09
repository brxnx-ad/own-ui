import { Mountain, Trees, Waves } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPagination,
  CarouselPrevious,
} from "@/components/own/dependant/carousel";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/own/simple/card";
import { ShowcaseExample, ShowcasePage } from "@/components/shared/showcase";
import { CarouselReference } from "./api-reference";

const destinations = [
  { name: "Cordillera", detail: "Miradores y senderos de altura.", Icon: Mountain, accent: "bg-primary-soft text-primary-bold" },
  { name: "Costa", detail: "Playas y recorridos junto al mar.", Icon: Waves, accent: "bg-info-soft text-info-bold" },
  { name: "Bosque", detail: "Rutas bajo árboles nativos.", Icon: Trees, accent: "bg-success-soft text-success-bold" },
];

const stages = [
  { title: "Preparar la ruta", description: "Define el destino y el tiempo disponible." },
  { title: "Revisar el equipo", description: "Lleva agua, ropa adecuada y el mapa." },
  { title: "Consultar el tiempo", description: "Confirma las condiciones antes de salir." },
  { title: "Compartir el plan", description: "Informa el trayecto y la hora de regreso." },
];

function Navigation({ pagination = false }: { pagination?: boolean }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <CarouselPrevious />
      {pagination && <CarouselPagination />}
      <CarouselNext />
    </div>
  );
}

export default function Page() {
  return (
    <ShowcasePage
      title="Carousel"
      implementation="Embla Carousel + Button"
      description="Desplaza diapositivas por posiciones con el puntero, el teclado o controles de navegación."
    >
      <ShowcaseExample
        title="Navegación por posiciones"
        description="Arrastra la diapositiva o elige una posición con las flechas y los indicadores."
      >
        <Carousel aria-label="Destinos al aire libre" className="flex flex-col gap-4">
          <CarouselContent>
            {destinations.map(({ name, detail, Icon, accent }) => (
              <CarouselItem key={name} aria-label={name}>
                <Card className="h-full shadow-none!">
                  <div className={`grid h-28 place-items-center rounded-base ${accent}`}>
                    <Icon className="size-12" aria-hidden="true" />
                  </div>
                  <CardHeader>
                    <CardTitle as="h3">{name}</CardTitle>
                    <CardDescription>{detail}</CardDescription>
                  </CardHeader>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <Navigation pagination />
        </Carousel>
      </ShowcaseExample>

      <ShowcaseExample
        title="Tarjetas con ancho adaptable"
        description={<>Muestra dos tarjetas a partir de <code>sm</code> y avanza por grupos con <code>{'slidesToScroll: "auto"'}</code>.</>}
      >
        <Carousel aria-label="Preparación de la salida" options={{ align: "start", slidesToScroll: "auto" }} className="flex flex-col gap-4">
          <CarouselContent className="gap-3">
            {stages.map(({ title, description }) => (
              <CarouselItem key={title} aria-label={title} className="sm:basis-[calc((100%_-_0.75rem)/2)]">
                <Card className="h-full shadow-none!">
                  <CardHeader>
                    <CardTitle as="h3">{title}</CardTitle>
                    <CardDescription>{description}</CardDescription>
                  </CardHeader>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <Navigation pagination />
        </Carousel>
      </ShowcaseExample>

      <ShowcaseExample
        title="Desplazamiento vertical en bucle"
        description={<>Recorre las etapas en el eje vertical y vuelve al inicio con <code>loop</code>.</>}
        contentClassName="mx-auto w-full max-w-sm"
      >
        <Carousel aria-label="Secuencia de preparación" orientation="vertical" options={{ loop: true }} className="flex flex-col gap-4">
          <CarouselContent viewportClassName="h-40!">
            {stages.map(({ title, description }, index) => (
              <CarouselItem key={title} aria-label={title}>
                <Card className="h-full justify-center shadow-none!">
                  <CardHeader>
                    <span className="overline text-primary-bold">Etapa {index + 1}</span>
                    <CardTitle as="h3">{title}</CardTitle>
                    <CardDescription>{description}</CardDescription>
                  </CardHeader>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <Navigation />
        </Carousel>
      </ShowcaseExample>
      <CarouselReference />
    </ShowcasePage>
  );
}
