import clsx from "@/components/own/classes";
import type { ComponentPropsWithRef } from "react";

export interface AspectRatioProps extends ComponentPropsWithRef<"div"> {
  ratio?: number;
}

export function AspectRatio({ className, ratio = 1, style, ...props }: AspectRatioProps) {
  const aspectRatio = Number.isFinite(ratio) && ratio > 0 ? ratio : 1;

  return (
    <div
      data-slot="aspect-ratio"
      className={clsx("relative min-w-0", className)}
      style={{ aspectRatio, ...style }}
      {...props}
    />
  );
}
