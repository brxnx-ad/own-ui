"use client";

import { Avatar as Primitive } from "@base-ui/react/avatar";
import clsx from "@/components/own/classes";

export type AvatarSize = "sm" | "md" | "lg";

export interface AvatarProps extends Primitive.Root.Props {
  size?: AvatarSize;
}

const sizeStyles: Record<AvatarSize, string> = {
  sm: "size-8 text-xs",
  md: "size-10 text-sm",
  lg: "size-12 text-base",
};

function classes<State>(
  base: string,
  className?: string | ((state: State) => string | undefined),
) {
  return typeof className === "function"
    ? (state: State) => clsx(base, className(state))
    : clsx(base, className);
}

export function Avatar({ className, size = "md", ...props }: AvatarProps) {
  return (
    <Primitive.Root
      data-slot="avatar"
      data-size={size}
      className={classes(
        clsx(
          "relative isolate inline-flex shrink-0 overflow-hidden rounded-base border border-gray-base bg-surface-bold align-middle text-content-bold",
          sizeStyles[size],
        ),
        className,
      )}
      {...props}
    />
  );
}

export function AvatarImage({ className, ...props }: Primitive.Image.Props) {
  return (
    <Primitive.Image
      data-slot="avatar-image"
      className={classes(
        "absolute inset-0 z-10 size-full object-cover data-loading:invisible data-error:invisible",
        className,
      )}
      {...props}
    />
  );
}

export function AvatarFallback({ className, ...props }: Primitive.Fallback.Props) {
  return (
    <Primitive.Fallback
      data-slot="avatar-fallback"
      className={classes(
        "absolute inset-0 flex items-center justify-center font-semibold",
        className,
      )}
      {...props}
    />
  );
}
