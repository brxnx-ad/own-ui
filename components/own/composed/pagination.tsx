"use client";

import type { ComponentPropsWithRef, KeyboardEvent } from "react";
import Link from "next/link";
import clsx from "@/components/own/classes";
import { Button, type ButtonSize } from "@/components/own/base/button";
import { Chevron } from "@/components/own/icons";

export interface PaginationLinkProps extends ComponentPropsWithRef<typeof Link> {
  isActive?: boolean;
  size?: ButtonSize;
}

export interface PaginationDirectionProps extends Omit<PaginationLinkProps, "children"> {
  text?: string;
}

function preserveLinkKeyboard(event: KeyboardEvent<HTMLAnchorElement>) {
  // Button handles Space as activation. Pagination links keep the browser's link behavior.
  if (event.key === " " && "preventBaseUIHandler" in event && typeof event.preventBaseUIHandler === "function") {
    event.preventBaseUIHandler();
  }
}

export function Pagination({ className, ...props }: ComponentPropsWithRef<"nav">) {
  return (
    <nav
      data-slot="pagination"
      aria-label="Paginación"
      className={clsx("flex w-full min-w-0 justify-center", className)}
      {...props}
    />
  );
}

export function PaginationContent({ className, ...props }: ComponentPropsWithRef<"ul">) {
  return (
    <ul
      data-slot="pagination-content"
      className={clsx("flex min-w-0 flex-wrap items-center justify-center gap-1", className)}
      {...props}
    />
  );
}

export function PaginationItem(props: ComponentPropsWithRef<"li">) {
  return <li data-slot="pagination-item" {...props} />;
}

export function PaginationLink({
  className,
  children,
  isActive = false,
  size = "sm",
  "aria-current": ariaCurrent,
  onKeyDown,
  onKeyUp,
  ...props
}: PaginationLinkProps) {
  return (
    <Button
      variant={isActive ? "outline" : "ghost"}
      size={size}
      nativeButton={false}
      className={clsx("min-w-8 tabular-nums", className)}
      render={(
        <Link
          role="link"
          data-slot="pagination-link"
          aria-current={isActive ? "page" : ariaCurrent}
          data-active={isActive ? "" : undefined}
          {...props}
          onKeyDown={(event) => {
            preserveLinkKeyboard(event);
            onKeyDown?.(event);
          }}
          onKeyUp={(event) => {
            preserveLinkKeyboard(event);
            onKeyUp?.(event);
          }}
        />
      )}
    >
      {children}
    </Button>
  );
}

export function PaginationPrevious({ text = "Anterior", className, ...props }: PaginationDirectionProps) {
  return (
    <PaginationLink
      aria-label={text || "Anterior"}
      className={clsx("max-sm:px-2", className)}
      {...props}
    >
      <Chevron className="size-[1.15em] shrink-0 rotate-90 rtl:-rotate-90" />
      <span className="hidden sm:inline">{text}</span>
    </PaginationLink>
  );
}

export function PaginationNext({ text = "Siguiente", className, ...props }: PaginationDirectionProps) {
  return (
    <PaginationLink
      aria-label={text || "Siguiente"}
      className={clsx("max-sm:px-2", className)}
      {...props}
    >
      <span className="hidden sm:inline">{text}</span>
      <Chevron className="size-[1.15em] shrink-0 -rotate-90 rtl:rotate-90" />
    </PaginationLink>
  );
}

export function PaginationEllipsis({ className, children, ...props }: ComponentPropsWithRef<"span">) {
  return (
    <span
      data-slot="pagination-ellipsis"
      className={clsx("inline-flex size-8 items-center justify-center text-content-base", className)}
      {...props}
    >
      {children ?? (
        <>
          <span aria-hidden="true">…</span>
          <span className="sr-only">Más páginas</span>
        </>
      )}
    </span>
  );
}
