import type { FieldProps } from "@workspace/admin/lib/field.type";
import { genericMemo } from "@workspace/admin/lib/genericMemo";
import { cn } from "@workspace/ui/lib/utils";
import { useFieldValue, useTranslate } from "ra-core";
import type React from "react";
import type { AnchorHTMLAttributes } from "react";

function EmailFieldImpl<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  RecordType extends Record<string, any> = Record<string, any>,
>(inProps: EmailFieldProps<RecordType>) {
  const { className, empty, defaultValue, source, record, ...rest } = inProps;
  const value = useFieldValue({ defaultValue, source, record });
  const translate = useTranslate();

  if (value == null) {
    if (!empty) {
      return null;
    }

    return (
      <span className={className} {...rest}>
        {typeof empty === "string" ? translate(empty, { _: empty }) : empty}
      </span>
    );
  }

  return (
    <a
      className={cn("underline hover:no-underline", className)}
      href={`mailto:${value}`}
      onClick={stopPropagation}
      {...rest}
    >
      {value}
    </a>
  );
}
EmailFieldImpl.displayName = "EmailFieldImpl";

export const EmailField = genericMemo(EmailFieldImpl);

export interface EmailFieldProps<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  RecordType extends Record<string, any> = Record<string, any>,
> extends FieldProps<RecordType>,
    AnchorHTMLAttributes<HTMLAnchorElement> {}

// useful to prevent click bubbling in a DataTable with rowClick
const stopPropagation = (e: React.MouseEvent<HTMLAnchorElement>) =>
  e.stopPropagation();
