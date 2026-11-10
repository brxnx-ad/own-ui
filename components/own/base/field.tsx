"use client";

import { Field as Primitive } from "@base-ui/react/field";
import type { HTMLProps } from "@base-ui/react/types";
import { useRender } from "@base-ui/react/use-render";
import clsx from "@/components/own/classes";
import { cloneElement, type ReactElement, type ReactNode } from "react";
import styles from "./field.module.css";

export const FieldValidity = Primitive.Validity;
export type FieldActions = Primitive.Root.Actions;
export type FieldValidityData = Primitive.ValidityData;
export type FieldValidityState = Primitive.Validity.State;

function classes<State>(
  base: string,
  className?: string | ((state: State) => string | undefined),
) {
  return typeof className === "function"
    ? (state: State) => clsx(base, className(state))
    : clsx(base, className);
}

export function Field({ className, ...props }: Primitive.Root.Props) {
  return (
    <Primitive.Root
      data-slot="field"
      className={classes(clsx("flex min-w-0 flex-col", styles.field), className)}
      {...props}
    />
  );
}

export function FieldLabel({ className, ...props }: Primitive.Label.Props) {
  return (
    <Primitive.Label
      data-slot="field-label"
      className={classes("body-sm font-medium text-content-bold data-disabled:text-content-soft", className)}
      {...props}
    />
  );
}

export function FieldControl({ className, ...props }: Primitive.Control.Props) {
  return (
    <Primitive.Control
      data-slot="field-control"
      className={classes(
        "min-h-10 w-full min-w-0 rounded-base border border-gray-base bg-surface-bold px-3 py-2 text-base text-content-bold outline-none placeholder:text-content-soft focus-visible:ring-2 focus-visible:ring-primary-base aria-invalid:border-error-base aria-invalid:focus-visible:ring-error-base data-disabled:cursor-not-allowed data-disabled:opacity-50 sm:text-sm",
        className,
      )}
      {...props}
    />
  );
}

export function FieldDescription({ className, ...props }: Primitive.Description.Props) {
  return (
    <Primitive.Description
      data-slot="field-description"
      className={classes("body-sm text-content-base data-disabled:text-content-soft", className)}
      {...props}
    />
  );
}

function FieldErrorMessage({ elementProps, render, state }: {
  elementProps: HTMLProps;
  render: Primitive.Error.Props["render"];
  state: Primitive.Error.State;
}) {
  const element = useRender({
    props: { ...elementProps },
    render: typeof render === "function" ? (props) => render(props, state) : render,
  }) as ReactElement<{ children?: ReactNode }>;
  const Content = element.type === "p" || element.type === "span" ? "span" : "div";

  return cloneElement(element, undefined, (
    <Content data-slot="field-error-content" className="[&>ul]:list-disc [&>ul]:ps-5">
      {element.props.children}
    </Content>
  ));
}

export function FieldError({ className, render, ...props }: Primitive.Error.Props) {
  return (
    <Primitive.Error
      data-slot="field-error"
      className={classes(clsx("body-sm text-error-bold", styles.error), className)}
      render={(elementProps, state) => (
        <FieldErrorMessage elementProps={elementProps} render={render} state={state} />
      )}
      {...props}
    />
  );
}

export function FieldItem({ className, ...props }: Primitive.Item.Props) {
  return (
    <Primitive.Item
      data-slot="field-item"
      className={classes("grid min-w-0 gap-1", className)}
      {...props}
    />
  );
}
