import * as React from "react";

type IconProps = React.ComponentProps<"svg">;

function Icon({ children, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      {children}
    </svg>
  );
}

export function Chevron(props: IconProps) {
  return <Icon {...props}><path d="m6 9 6 6 6-6" /></Icon>;
}

export function Check(props: IconProps) {
  return <Icon {...props}><path d="m5 12 4 4L19 6" /></Icon>;
}

export function Minus(props: IconProps) {
  return <Icon {...props}><path d="M5 12h14" /></Icon>;
}

export function Plus(props: IconProps) {
  return <Icon {...props}><path d="M12 5v14M5 12h14" /></Icon>;
}

export function Close(props: IconProps) {
  return <Icon {...props}><path d="M6 6l12 12M18 6 6 18" /></Icon>;
}

export { Spinner } from "./spinner";
export type { SpinnerProps } from "./spinner";
