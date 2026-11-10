"use client";

import { ToggleGroup as Primitive } from "@base-ui/react/toggle-group";
import clsx from "@/components/own/classes";

export type ToggleGroupProps<Value extends string = string> = Primitive.Props<Value>;
export type ToggleGroupState = Primitive.State;
export type ToggleGroupChangeEventDetails = Primitive.ChangeEventDetails;

const groupStyles = clsx(
  "inline-flex min-w-0 max-w-full flex-wrap items-center gap-1.5",
  "data-[orientation=vertical]:flex-col data-[orientation=vertical]:flex-nowrap data-[orientation=vertical]:items-stretch",
);

export function ToggleGroup<Value extends string>({ className, ...props }: ToggleGroupProps<Value>) {
  return (
    <Primitive<Value>
      data-slot="toggle-group"
      className={typeof className === "function" ? (state) => clsx(groupStyles, className(state)) : clsx(groupStyles, className)}
      {...props}
    />
  );
}
