import type { FieldProps } from "@workspace/admin/lib/field.type";
import { Badge } from "@workspace/ui/badge";
import type { RaRecord } from "ra-core";
import { useFieldValue, useTranslate } from "ra-core";
import type * as React from "react";

type BadgeProps = React.ComponentProps<typeof Badge>;

export function BadgeField<RecordType extends RaRecord = RaRecord>({
  defaultValue,
  source,
  record,
  empty,
  variant = "outline",
  ...rest
}: BadgeFieldProps<RecordType>) {
  const value = useFieldValue({ defaultValue, source, record });
  const translate = useTranslate();

  if (value == null) {
    return empty && typeof empty === "string"
      ? translate(empty, { _: empty })
      : empty;
  }

  return (
    <Badge variant={variant} {...rest}>
      {typeof value !== "string" ? value.toString() : value}
    </Badge>
  );
}

export interface BadgeFieldProps<RecordType extends RaRecord = RaRecord>
  extends FieldProps<RecordType>,
    BadgeProps {
  variant?: "default" | "outline" | "secondary" | "destructive";
}
