"use client";

import { Menubar as Primitive } from "@base-ui/react/menubar";
import clsx from "@/components/own/classes";

export type MenubarProps = Primitive.Props;
export type MenubarState = Primitive.State;

const menubarClasses = clsx(
  "inline-flex max-w-full min-w-0 flex-wrap items-stretch gap-1 rounded-base border border-gray-base bg-surface-soft p-1 shadow-s",
  "data-[orientation=vertical]:flex-col data-[orientation=vertical]:flex-nowrap",
);

export function Menubar({ className, disabled, ...props }: MenubarProps) {
  return (
    <Primitive
      data-slot="menubar"
      aria-disabled={disabled || undefined}
      disabled={disabled}
      className={typeof className === "function"
        ? (state) => clsx(menubarClasses, className(state))
        : clsx(menubarClasses, className)}
      {...props}
    />
  );
}
