import clsx from "clsx";
import type { ComponentPropsWithRef } from "react";
import styles from "./skeleton.module.css";

export interface SkeletonProps extends Omit<ComponentPropsWithRef<"span">, "children" | "dangerouslySetInnerHTML" | "tabIndex"> {
  inline?: boolean;
}

export function Skeleton({ className, inline = false, ...props }: SkeletonProps) {
  return (
    <span
      data-slot="skeleton"
      data-inline={inline ? "" : undefined}
      className={clsx(
        "rounded-base border border-gray-base",
        styles.wave,
        inline ? "inline-block align-middle" : "block",
        className,
      )}
      {...props}
      aria-hidden="true"
    />
  );
}
