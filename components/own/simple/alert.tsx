import clsx from "clsx";
import type { ComponentPropsWithRef, ReactNode } from "react";

export type AlertVariant = "default" | "info" | "success" | "warning" | "destructive";

export interface AlertProps extends Omit<ComponentPropsWithRef<"div">, "dangerouslySetInnerHTML"> {
  variant?: AlertVariant;
  icon?: ReactNode;
}

const variantStyles: Record<AlertVariant, string> = {
  default: "border-gray-base bg-surface-base",
  info: "border-info-base bg-info-soft",
  success: "border-success-base bg-success-soft",
  warning: "border-warning-base bg-warning-soft",
  destructive: "border-error-base bg-error-soft",
};

export function Alert({ className, variant = "default", icon, children, ...props }: AlertProps) {
  return (
    <div
      data-slot="alert"
      data-variant={variant}
      className={clsx(
        "flex min-w-0 items-start gap-3 rounded-base border px-4 py-3 text-gray-bold",
        variantStyles[variant],
        className,
      )}
      {...props}
    >
      {icon != null && (
        <span
          data-slot="alert-icon"
          aria-hidden="true"
          className="body-sm inline-flex shrink-0 items-center [&_svg:not([class*='size-'])]:size-[1.15em]"
        >
          {icon}
        </span>
      )}
      <div data-slot="alert-content" className="flex min-w-0 flex-1 flex-col gap-1">
        {children}
      </div>
    </div>
  );
}

export function AlertTitle({ className, ...props }: ComponentPropsWithRef<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={clsx("h5 wrap-anywhere", className)}
      {...props}
    />
  );
}

export function AlertDescription({ className, ...props }: ComponentPropsWithRef<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={clsx("body-sm wrap-break-word [&_a]:underline [&_a]:underline-offset-2", className)}
      {...props}
    />
  );
}

export function AlertAction({ className, ...props }: ComponentPropsWithRef<"div">) {
  return (
    <div
      data-slot="alert-action"
      className={clsx("flex flex-wrap items-center gap-2 pt-2", className)}
      {...props}
    />
  );
}
