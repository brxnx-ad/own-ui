"use client";

import { Form as Primitive } from "@base-ui/react/form";
import clsx from "clsx";

export type FormProps<Values extends Primitive.Values = Primitive.Values> = Primitive.Props<Values>;
export type FormActions = Primitive.Actions;
export type FormSubmitEventDetails = Primitive.SubmitEventDetails;
export type FormValidationMode = Primitive.ValidationMode;

const formClasses = "flex min-w-0 flex-col gap-4";

export function Form<Values extends Primitive.Values = Primitive.Values>({
  className,
  ...props
}: FormProps<Values>) {
  return (
    <Primitive<Values>
      data-slot="form"
      className={typeof className === "function"
        ? (state) => clsx(formClasses, className(state))
        : clsx(formClasses, className)}
      {...props}
    />
  );
}
