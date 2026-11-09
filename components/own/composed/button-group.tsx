"use client";

import { createContext, useContext, type ComponentPropsWithRef } from "react";
import { useRender } from "@base-ui/react/use-render";
import clsx from "clsx";
import { Separator, type SeparatorProps } from "@/components/own/base/separator";
import styles from "./button-group.module.css";

export type ButtonGroupOrientation = "horizontal" | "vertical";

export interface ButtonGroupProps extends ComponentPropsWithRef<"div"> {
  orientation?: ButtonGroupOrientation;
}

export type ButtonGroupTextProps = useRender.ComponentProps<"div">;

const OrientationContext = createContext<ButtonGroupOrientation>("horizontal");

export function ButtonGroup({ className, orientation = "horizontal", ...props }: ButtonGroupProps) {
  return (
    <OrientationContext.Provider value={orientation}>
      <div
        role="group"
        data-slot="button-group"
        data-orientation={orientation}
        className={clsx(
          styles.group,
          "flex w-fit items-stretch has-[>[data-slot=button-group]:not([hidden])]:gap-2",
          "[&>*:focus-visible]:relative [&>*:focus-visible]:z-10",
          orientation === "vertical" && "flex-col",
          className,
        )}
        {...props}
      />
    </OrientationContext.Provider>
  );
}

export function ButtonGroupText({ className, render, ref, ...props }: ButtonGroupTextProps) {
  return useRender({
    render,
    ref,
    props: {
      "data-slot": "button-group-text",
      className: clsx(
        "flex min-w-0 items-center gap-2 rounded-base border border-gray-base bg-surface-base px-3 text-sm font-medium text-gray-bold",
        "[&_svg:not([class*='size-'])]:size-4",
        className,
      ),
      ...props,
    },
  });
}

export function ButtonGroupSeparator({ orientation, ...props }: SeparatorProps) {
  const groupOrientation = useContext(OrientationContext);

  return (
    <Separator
      data-slot="button-group-separator"
      aria-hidden="true"
      orientation={orientation ?? (groupOrientation === "horizontal" ? "vertical" : "horizontal")}
      {...props}
    />
  );
}
