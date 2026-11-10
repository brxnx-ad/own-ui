"use client";

import { CheckboxGroup as Primitive } from "@base-ui/react/checkbox-group";
import clsx from "@/components/own/classes";

const baseClasses = "grid gap-2.5";

export function CheckboxGroup({ className, ...props }: Primitive.Props) {
  return (
    <Primitive
      data-slot="checkbox-group"
      className={typeof className === "function"
        ? (state) => clsx(baseClasses, className(state))
        : clsx(baseClasses, className)}
      {...props}
    />
  );
}
