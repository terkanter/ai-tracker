import { CancelButton } from "@workspace/admin/cancel-button";
import { SaveButton } from "@workspace/admin/form";
import { cn } from "@workspace/ui/lib/utils";
import { Form, type FormProps } from "ra-core";
import type * as React from "react";
import type { ReactNode } from "react";
import { Children } from "react";

export function SimpleForm({
  children,
  className,
  toolbar = defaultFormToolbar,
  ...rest
}: {
  children: ReactNode;
  className?: string;
  toolbar?: ReactNode;
} & FormProps) {
  return (
    <Form
      className={cn(`flex w-full max-w-lg flex-col gap-4`, className)}
      {...rest}
    >
      {children}
      {toolbar}
    </Form>
  );
}

export function FormToolbar({
  children,
  className,
  ...rest
}: FormToolbarProps) {
  return (
    <div
      {...rest}
      className={cn(
        "to-background sticky bottom-0 bg-linear-to-b from-transparent to-10% pt-4 pb-4 md:block md:pt-2 md:pb-0",
        className,
      )}
      role="toolbar"
    >
      {Children.count(children) === 0 ? (
        <div className="flex flex-row justify-end gap-2">
          <CancelButton />
          <SaveButton />
        </div>
      ) : (
        children
      )}
    </div>
  );
}

export interface FormToolbarProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  className?: string;
}

const defaultFormToolbar = <FormToolbar />;
