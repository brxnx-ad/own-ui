import clsx from "clsx";
import type { ComponentPropsWithRef } from "react";

export interface TableProps extends ComponentPropsWithRef<"table"> {
  containerProps?: Omit<ComponentPropsWithRef<"div">, "children" | "dangerouslySetInnerHTML">;
}

export function Table({ className, containerProps, ...props }: TableProps) {
  const { className: containerClassName, ...containerAttributes } = containerProps ?? {};

  return (
    <div
      data-slot="table-container"
      tabIndex={0}
      className={clsx(
        "min-w-0 max-w-full overflow-x-auto rounded-base border border-gray-base bg-surface-base",
        "focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-gray-bold",
        containerClassName,
      )}
      {...containerAttributes}
    >
      <table
        data-slot="table"
        className={clsx("body-sm w-full caption-top text-gray-bold", className)}
        {...props}
      />
    </div>
  );
}

export function TableHeader({ className, ...props }: ComponentPropsWithRef<"thead">) {
  return (
    <thead
      data-slot="table-header"
      className={clsx("border-b border-gray-base bg-surface-bold", className)}
      {...props}
    />
  );
}

export function TableBody(props: ComponentPropsWithRef<"tbody">) {
  return <tbody data-slot="table-body" {...props} />;
}

export function TableFooter({ className, ...props }: ComponentPropsWithRef<"tfoot">) {
  return (
    <tfoot
      data-slot="table-footer"
      className={clsx("border-t border-gray-base bg-surface-bold font-medium", className)}
      {...props}
    />
  );
}

export function TableRow({ className, ...props }: ComponentPropsWithRef<"tr">) {
  return (
    <tr
      data-slot="table-row"
      className={clsx("not-last:border-b not-last:border-gray-base", className)}
      {...props}
    />
  );
}

export function TableHead({ className, ...props }: ComponentPropsWithRef<"th">) {
  return (
    <th
      data-slot="table-head"
      className={clsx("px-3 py-2 text-start align-middle font-semibold", className)}
      {...props}
    />
  );
}

export function TableCell({ className, ...props }: ComponentPropsWithRef<"td">) {
  return (
    <td
      data-slot="table-cell"
      className={clsx("px-3 py-2 align-middle", className)}
      {...props}
    />
  );
}

export function TableCaption({ className, ...props }: ComponentPropsWithRef<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      className={clsx("h6 border-b border-gray-base px-3 py-2 text-start", className)}
      {...props}
    />
  );
}
