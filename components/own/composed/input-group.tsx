"use client";

import type { ComponentPropsWithRef } from "react";
import clsx from "@/components/own/classes";
import { Button, type ButtonProps } from "@/components/own/base/button";
import { Input, type InputProps } from "@/components/own/base/input";
import { Textarea, type TextareaProps } from "@/components/own/simple/textarea";
import styles from "./input-group.module.css";

export type InputGroupAddonAlignment = "inline-start" | "inline-end" | "block-start" | "block-end";
export type InputGroupButtonSize = "xs" | "sm" | "icon-xs" | "icon-sm";

export interface InputGroupAddonProps extends ComponentPropsWithRef<"div"> {
  align?: InputGroupAddonAlignment;
}

export interface InputGroupButtonProps extends Omit<ButtonProps, "size"> {
  size?: InputGroupButtonSize;
}

const addonStyles: Record<InputGroupAddonAlignment, string> = {
  "inline-start": "-order-1 ps-2",
  "inline-end": "order-1 pe-2",
  "block-start": "-order-2 basis-full flex-wrap px-2 pt-2",
  "block-end": "order-2 basis-full flex-wrap px-2 pb-2",
};

const buttonStyles: Record<InputGroupButtonSize, string> = {
  xs: "h-6! gap-1! px-1.5!",
  sm: "",
  "icon-xs": "size-6! px-0!",
  "icon-sm": "size-8! px-0!",
};

const interactiveElements = [
  "button", "a[href]", "input", "textarea", "select", "label", "summary",
  "[role='button']", "[role='link']", "[tabindex]", "[contenteditable]:not([contenteditable='false'])",
].join(", ");

const fieldElements = [
  ":scope > input:not([type='hidden'])",
  ":scope > textarea",
  ":scope > [data-slot='textarea-frame'] > textarea",
].join(", ");

export function InputGroup({ className, ...props }: ComponentPropsWithRef<"div">) {
  return (
    <div
      data-slot="input-group"
      role="group"
      className={clsx(
        styles.group,
        "flex w-full min-w-0 flex-wrap items-center rounded-base border border-gray-base bg-surface-bold",
        className,
      )}
      {...props}
    />
  );
}

export function InputGroupAddon({
  align = "inline-start",
  className,
  onClick,
  ...props
}: InputGroupAddonProps) {
  return (
    <div
      data-slot="input-group-addon"
      data-align={align}
      className={clsx(
        "flex min-w-0 items-center gap-2 text-sm text-content-base [&_svg:not([class*='size-'])]:size-4",
        addonStyles[align],
        className,
      )}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented || !(event.target instanceof Element)) return;

        const addon = event.currentTarget;
        const interactive = event.target.closest(interactiveElements);
        if (interactive && addon.contains(interactive)) return;

        const group = addon.parentElement;
        if (group?.matches('[data-slot="input-group"]')) {
          group.querySelector<HTMLInputElement | HTMLTextAreaElement>(fieldElements)?.focus();
        }
      }}
      {...props}
    />
  );
}

export function InputGroupButton({
  className,
  size = "xs",
  variant = "ghost",
  children,
  icon,
  loading,
  ...props
}: InputGroupButtonProps) {
  const buttonSize = size === "xs" && !children && (icon || loading) ? "icon-xs" : size;

  return (
    <Button
      data-slot="input-group-button"
      data-size={buttonSize}
      variant={variant}
      size="sm"
      className={clsx(buttonStyles[buttonSize], className)}
      icon={icon}
      loading={loading}
      {...props}
    >
      {children}
    </Button>
  );
}

export function InputGroupText({ className, ...props }: ComponentPropsWithRef<"span">) {
  return (
    <span
      data-slot="input-group-text"
      className={clsx("inline-flex min-w-0 items-center gap-1.5", className)}
      {...props}
    />
  );
}

export function InputGroupInput(props: InputProps) {
  return <Input data-slot="input-group-control" {...props} />;
}

export function InputGroupTextarea(props: TextareaProps) {
  return <Textarea data-slot="input-group-control" {...props} />;
}
