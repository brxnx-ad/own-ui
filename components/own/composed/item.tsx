"use client";

import { createContext, useContext, type ComponentPropsWithRef } from "react";
import { useRender } from "@base-ui/react/use-render";
import clsx from "clsx";
import { Separator, type SeparatorProps } from "@/components/own/base/separator";

export type ItemVariant = "default" | "outline" | "muted";
export type ItemSize = "default" | "sm" | "xs";
export type ItemMediaVariant = "default" | "icon" | "image";

export interface ItemProps extends useRender.ComponentProps<"div"> {
  variant?: ItemVariant;
  size?: ItemSize;
}

export interface ItemMediaProps extends ComponentPropsWithRef<"div"> {
  variant?: ItemMediaVariant;
}

const ItemGroupContext = createContext(false);

const variantStyles: Record<ItemVariant, string> = {
  default: "border-transparent",
  outline: "border-gray-base",
  muted: "border-transparent bg-surface-base",
};

const sizeStyles: Record<ItemSize, string> = {
  default: "gap-3 px-4 py-3 text-sm",
  sm: "gap-2.5 px-3 py-2.5 text-sm",
  xs: "gap-2 px-2.5 py-2 text-xs",
};

const mediaStyles: Record<ItemMediaVariant, string> = {
  default: "",
  icon: "[&_svg:not([class*='size-'])]:size-4",
  image: "size-10 overflow-hidden rounded-base group-data-[size=sm]/item:size-8 group-data-[size=xs]/item:size-6 [&_img]:size-full [&_img]:object-cover",
};

export function ItemGroup({ className, ...props }: ComponentPropsWithRef<"div">) {
  return (
    <ItemGroupContext.Provider value>
      <div
        role="list"
        data-slot="item-group"
        className={clsx("flex w-full min-w-0 flex-col gap-3", className)}
        {...props}
      />
    </ItemGroupContext.Provider>
  );
}

export function ItemSeparator(props: SeparatorProps) {
  return <Separator data-slot="item-separator" aria-hidden="true" orientation="horizontal" {...props} />;
}

export function Item({
  className,
  variant = "default",
  size = "default",
  render,
  ref,
  ...props
}: ItemProps) {
  const inGroup = useContext(ItemGroupContext);

  return useRender({
    render,
    ref,
    props: {
      "data-slot": "item",
      "data-variant": variant,
      "data-size": size,
      role: inGroup && !render ? "listitem" : undefined,
      className: clsx(
        "group/item flex w-full min-w-0 flex-wrap items-center rounded-base border text-gray-bold",
        "motion-safe:transition-colors [&:is(a,button)]:hover:bg-surface-bold",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-base",
        variantStyles[variant],
        sizeStyles[size],
        className,
      ),
      ...props,
    },
  });
}

export function ItemMedia({ className, variant = "default", ...props }: ItemMediaProps) {
  return (
    <div
      data-slot="item-media"
      data-variant={variant}
      className={clsx(
        "flex shrink-0 items-center justify-center gap-2 group-has-[[data-slot=item-description]]/item:self-start",
        mediaStyles[variant],
        className,
      )}
      {...props}
    />
  );
}

export function ItemContent({ className, ...props }: ComponentPropsWithRef<"div">) {
  return (
    <div
      data-slot="item-content"
      className={clsx("flex min-w-0 flex-1 flex-col gap-1 [&+[data-slot=item-content]]:flex-none", className)}
      {...props}
    />
  );
}

export function ItemTitle({ className, ...props }: ComponentPropsWithRef<"div">) {
  return (
    <div
      data-slot="item-title"
      className={clsx("wrap-anywhere font-medium", className)}
      {...props}
    />
  );
}

export function ItemDescription({ className, ...props }: ComponentPropsWithRef<"p">) {
  return (
    <p
      data-slot="item-description"
      className={clsx("wrap-anywhere leading-normal text-gray-bold/75 [&_a]:underline [&_a]:underline-offset-4", className)}
      {...props}
    />
  );
}

export function ItemActions({ className, ...props }: ComponentPropsWithRef<"div">) {
  return (
    <div
      data-slot="item-actions"
      className={clsx("flex min-w-0 flex-wrap items-center gap-2", className)}
      {...props}
    />
  );
}

export function ItemHeader({ className, ...props }: ComponentPropsWithRef<"div">) {
  return (
    <div
      data-slot="item-header"
      className={clsx("flex min-w-0 basis-full flex-wrap items-center justify-between gap-2", className)}
      {...props}
    />
  );
}

export function ItemFooter({ className, ...props }: ComponentPropsWithRef<"div">) {
  return (
    <div
      data-slot="item-footer"
      className={clsx("flex min-w-0 basis-full flex-wrap items-center justify-between gap-2", className)}
      {...props}
    />
  );
}
