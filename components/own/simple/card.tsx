import clsx from "clsx";
import type { ComponentPropsWithRef } from "react";

export type CardSize = "sm" | "md";

export interface CardProps extends ComponentPropsWithRef<"div"> {
  size?: CardSize;
}

export interface CardTitleProps extends ComponentPropsWithRef<"h2"> {
  as?: "h2" | "h3" | "h4" | "h5" | "h6";
}

const sizeStyles: Record<CardSize, string> = {
  sm: "gap-3 p-3",
  md: "gap-4 p-4",
};

export function Card({ className, size = "md", ...props }: CardProps) {
  return (
    <div
      data-slot="card"
      data-size={size}
      className={clsx(
        "flex min-w-0 flex-col rounded-base border border-gray-base bg-surface-base text-gray-bold shadow-s",
        sizeStyles[size],
        className,
      )}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }: ComponentPropsWithRef<"div">) {
  return (
    <div
      data-slot="card-header"
      className={clsx(
        "grid min-w-0 items-start gap-1",
        "has-[>[data-slot=card-action]]:grid-cols-[minmax(0,1fr)_auto] has-[>[data-slot=card-action]]:gap-x-3",
        className,
      )}
      {...props}
    />
  );
}

export function CardTitle({ as: Heading = "h2", className, ...props }: CardTitleProps) {
  return (
    <Heading
      data-slot="card-title"
      className={clsx("h4 wrap-anywhere", className)}
      {...props}
    />
  );
}

export function CardDescription({ className, ...props }: ComponentPropsWithRef<"p">) {
  return (
    <p
      data-slot="card-description"
      className={clsx("body-sm wrap-anywhere text-gray-bold/80", className)}
      {...props}
    />
  );
}

export function CardAction({ className, ...props }: ComponentPropsWithRef<"div">) {
  return (
    <div
      data-slot="card-action"
      className={clsx("col-start-2 row-span-2 row-start-1 justify-self-end", className)}
      {...props}
    />
  );
}

export function CardContent({ className, ...props }: ComponentPropsWithRef<"div">) {
  return <div data-slot="card-content" className={clsx("min-w-0", className)} {...props} />;
}

export function CardFooter({ className, ...props }: ComponentPropsWithRef<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={clsx("flex flex-wrap items-center gap-2 border-t border-gray-base pt-3", className)}
      {...props}
    />
  );
}
