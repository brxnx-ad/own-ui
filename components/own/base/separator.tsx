"use client";

import { Separator as Primitive } from "@base-ui/react/separator";
import clsx from "@/components/own/classes";

export type SeparatorProps = Primitive.Props;
export type SeparatorState = Primitive.State;

const separatorStyles = clsx(
  "block shrink-0 border-0 bg-gray-base",
  "data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full",
  "data-[orientation=vertical]:w-px data-[orientation=vertical]:self-stretch",
  "forced-colors:forced-color-adjust-none forced-colors:bg-[CanvasText]",
);

export function Separator({ className, ...props }: SeparatorProps) {
  return (
    <Primitive
      data-slot="separator"
      className={
        typeof className === "function"
          ? (state) => clsx(separatorStyles, className(state))
          : clsx(separatorStyles, className)
      }
      {...props}
    />
  );
}
