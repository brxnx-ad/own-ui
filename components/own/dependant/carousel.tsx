"use client";

import { createContext, useCallback, useContext, useEffect, useId, useSyncExternalStore, type ComponentProps } from "react";
import useEmblaCarousel from "embla-carousel-react";
import clsx from "clsx";
import { Button, type ButtonProps } from "@/components/own/base/button";
import { Chevron } from "@/components/own/icons";

export type CarouselApi = NonNullable<ReturnType<typeof useEmblaCarousel>[1]>;
export type CarouselOptions = Pick<
  NonNullable<Parameters<typeof useEmblaCarousel>[0]>,
  "align" | "containScroll" | "dragFree" | "duration" | "loop" | "skipSnaps" | "slidesToScroll" | "startIndex" | "watchDrag"
>;
export type CarouselOrientation = "horizontal" | "vertical";

type DivProps = ComponentProps<"div">;
type AccessibleName =
  | { "aria-label": string; "aria-labelledby"?: string }
  | { "aria-label"?: string; "aria-labelledby": string };

export type CarouselProps = Omit<DivProps, "dir" | "role" | "aria-label" | "aria-labelledby"> & AccessibleName & {
  orientation?: CarouselOrientation;
  dir?: "ltr" | "rtl";
  role?: "region" | "group";
  options?: CarouselOptions;
  onApiChange?: (api: CarouselApi | undefined) => void;
  formatStatus?: (position: number, total: number) => string;
};

export interface CarouselContentProps extends DivProps {
  viewportClassName?: string;
}

export type CarouselItemProps = Omit<DivProps, "role" | "aria-label" | "aria-labelledby"> & AccessibleName;

export interface CarouselControlProps extends Omit<
  ButtonProps,
  "type" | "render" | "nativeButton" | "focusableWhenDisabled" | "aria-controls" | "className"
> {
  className?: string;
}

export interface CarouselPaginationProps extends Omit<DivProps, "children" | "role"> {
  getLabel?: (position: number, total: number) => string;
}

interface CarouselContextValue {
  viewportRef: ReturnType<typeof useEmblaCarousel>[0];
  viewportId: string;
  api: CarouselApi | undefined;
  orientation: CarouselOrientation;
  dir: "ltr" | "rtl";
  selected: number;
  total: number;
  canScrollPrev: boolean;
  canScrollNext: boolean;
}

const CarouselContext = createContext<CarouselContextValue | null>(null);

function useCarouselContext() {
  const context = useContext(CarouselContext);
  if (!context) throw new Error("Carousel parts must be used within Carousel.");
  return context;
}

const reducedMotion = "(prefers-reduced-motion: reduce)";
const defaultStatus = (position: number, total: number) => `Posición ${position} de ${total}`;
const defaultPageLabel = (position: number, total: number) => `Ir a la posición ${position} de ${total}`;

export function Carousel({
  orientation = "horizontal",
  dir = "ltr",
  role = "region",
  options,
  onApiChange,
  formatStatus = defaultStatus,
  className,
  onKeyDown,
  tabIndex = 0,
  children,
  ...props
}: CarouselProps) {
  const viewportId = useId();
  const [viewportRef, api] = useEmblaCarousel({
    ...options,
    axis: orientation === "horizontal" ? "x" : "y",
    direction: dir,
    breakpoints: { [reducedMotion]: { duration: 0 } },
  });

  const subscribe = useCallback((update: () => void) => {
    if (!api) return () => {};
    api.on("select", update).on("reInit", update);
    return () => { api.off("select", update).off("reInit", update); };
  }, [api]);

  const selected = useSyncExternalStore(subscribe, () => api?.selectedScrollSnap() ?? 0, () => 0);
  const total = useSyncExternalStore(subscribe, () => api?.slideNodes().length ? api.scrollSnapList().length : 0, () => 0);
  const canScrollPrev = useSyncExternalStore(subscribe, () => api?.canScrollPrev() ?? false, () => false) && total > 1;
  const canScrollNext = useSyncExternalStore(subscribe, () => api?.canScrollNext() ?? false, () => false) && total > 1;

  useEffect(() => {
    if (!api || !onApiChange) return;
    onApiChange(api);
    return () => onApiChange(undefined);
  }, [api, onApiChange]);

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    onKeyDown?.(event);
    if (event.defaultPrevented || event.target !== event.currentTarget || !api || total < 2 ||
        event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;

    const previousKey = orientation === "vertical" ? "ArrowUp" : dir === "rtl" ? "ArrowRight" : "ArrowLeft";
    const nextKey = orientation === "vertical" ? "ArrowDown" : dir === "rtl" ? "ArrowLeft" : "ArrowRight";
    if (event.key === previousKey) {
      event.preventDefault();
      api.scrollPrev();
    } else if (event.key === nextKey) {
      event.preventDefault();
      api.scrollNext();
    }
  }

  return (
    <CarouselContext.Provider value={{ viewportRef, viewportId, api, orientation, dir, selected, total, canScrollPrev, canScrollNext }}>
      <div
        data-slot="carousel"
        data-orientation={orientation}
        aria-roledescription="carrusel"
        {...props}
        role={role}
        dir={dir}
        tabIndex={tabIndex}
        onKeyDown={handleKeyDown}
        className={clsx("min-w-0 rounded-base outline-none focus-visible:ring-2 focus-visible:ring-primary-base", className)}
      >
        {children}
        <span data-slot="carousel-status" role="status" className="sr-only">
          {total > 1 ? formatStatus(selected + 1, total) : ""}
        </span>
      </div>
    </CarouselContext.Provider>
  );
}

export function CarouselContent({ className, viewportClassName, ...props }: CarouselContentProps) {
  const { viewportRef, viewportId, orientation } = useCarouselContext();
  const vertical = orientation === "vertical";

  return (
    <div
      ref={viewportRef}
      id={viewportId}
      data-slot="carousel-viewport"
      className={clsx("overflow-hidden", vertical && "h-64", viewportClassName)}
    >
      <div
        data-slot="carousel-content"
        className={clsx("flex", vertical ? "h-full flex-col touch-pan-x" : "touch-pan-y", "touch-pinch-zoom", className)}
        {...props}
      />
    </div>
  );
}

export function CarouselItem({ className, ...props }: CarouselItemProps) {
  return (
    <div
      data-slot="carousel-item"
      aria-roledescription="diapositiva"
      className={clsx("min-h-0 min-w-0 shrink-0 grow-0 basis-full", className)}
      {...props}
      role="group"
    />
  );
}

function CarouselControl({
  previous,
  variant = "outline",
  size = "sm",
  className,
  disabled,
  icon,
  onClick,
  ...props
}: CarouselControlProps & { previous: boolean }) {
  const { api, canScrollPrev, canScrollNext, orientation, dir, viewportId } = useCarouselContext();
  const blocked = disabled || !(previous ? canScrollPrev : canScrollNext);
  const rotation = orientation === "vertical"
    ? (previous ? "rotate-180" : undefined)
    : (previous === (dir === "ltr") ? "rotate-90" : "-rotate-90");

  return (
    <Button
      data-slot={previous ? "carousel-previous" : "carousel-next"}
      aria-label={previous ? "Posición anterior" : "Posición siguiente"}
      {...props}
      aria-controls={viewportId}
      type="button"
      variant={variant}
      size={size}
      className={clsx("aria-disabled:opacity-50 motion-reduce:transition-none", className)}
      icon={icon ?? <Chevron className={rotation} />}
      disabled={blocked}
      focusableWhenDisabled
      onClick={(event) => {
        onClick?.(event);
        if (blocked || event.defaultPrevented) return;
        if (previous) api?.scrollPrev();
        else api?.scrollNext();
      }}
    />
  );
}

export function CarouselPrevious(props: CarouselControlProps) {
  return <CarouselControl {...props} previous />;
}

export function CarouselNext(props: CarouselControlProps) {
  return <CarouselControl {...props} previous={false} />;
}

export function CarouselPagination({ className, getLabel = defaultPageLabel, ...props }: CarouselPaginationProps) {
  const { api, viewportId, selected, total } = useCarouselContext();
  if (total < 2) return null;

  return (
    <div
      data-slot="carousel-pagination"
      aria-label="Posiciones"
      className={clsx("flex flex-wrap items-center gap-1", className)}
      {...props}
      role="group"
    >
      {Array.from({ length: total }, (_, index) => {
        const current = index === selected;
        return (
          <Button
            key={index}
            type="button"
            data-slot="carousel-page"
            data-current={current ? "" : undefined}
            variant="ghost"
            size="sm"
            className="size-8! p-0! motion-reduce:transition-none"
            aria-label={getLabel(index + 1, total)}
            aria-controls={viewportId}
            aria-current={current ? "true" : undefined}
            disabled={current}
            focusableWhenDisabled
            onClick={() => api?.scrollTo(index)}
          >
            <span aria-hidden="true" className={clsx("size-2 rounded-full", current ? "bg-primary-base" : "bg-gray-bold/50")} />
          </Button>
        );
      })}
    </div>
  );
}
