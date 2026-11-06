import * as React from "react";
import clsx from "clsx";

export type SpinnerProps = React.ComponentProps<"svg">;

export function Spinner({ className, ...props }: SpinnerProps) {
  return (
    <svg
      data-slot="spinner"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={clsx("size-4 shrink-0 animate-spin", className)}
      {...props}
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.5" className="opacity-25" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}
