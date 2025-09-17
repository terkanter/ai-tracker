import { TextField } from "@workspace/admin/text-field";
import { cn } from "@workspace/ui/lib/utils";
import {
  type ExtractRecordPaths,
  FieldTitle,
  type HintedString,
  useRecordContext,
  useResourceContext,
  useTranslate,
} from "ra-core";
import type { HTMLAttributes } from "react";
import { createElement, type ElementType, type ReactNode } from "react";

export function RecordField<
  RecordType extends Record<string, any> = Record<string, any>,
>(props: RecordFieldProps<RecordType>) {
  const {
    children,
    className,
    empty,
    field,
    label,
    render,
    resource: _,
    source,
    record: recordProp,
    variant,
    ...rest
  } = props;
  const resource = useResourceContext(props);
  const record = useRecordContext<RecordType>({ recordProp });
  const translate = useTranslate();

  if (!source && !label && !render) return null;

  return (
    <div
      className={cn(
        className,
        "flex",
        variant === "inline" ? "flex-row" : "flex-col",
      )}
      {...rest}
    >
      {label !== "" && label !== false ? (
        <div
          className={cn(
            variant === "inline" ? "block min-w-50" : "text-xs",
            "text-muted-foreground",
          )}
        >
          <FieldTitle
            isRequired={false}
            label={label}
            resource={resource}
            source={source}
          />
        </div>
      ) : null}
      {children ? (
        <span className="flex-1">{children}</span>
      ) : render ? (
        record && (
          <span className="flex-1">
            {render(record) ||
              (typeof empty === "string"
                ? translate(empty, { _: empty })
                : empty)}
          </span>
        )
      ) : field ? (
        createElement(field, {
          source,
          empty,
          className: "flex-1",
        })
      ) : source ? (
        <TextField className="flex-1" empty={empty} source={source} />
      ) : null}
    </div>
  );
}

// FIXME remove custom type when using TypeScript >= 5.4 as it is now native
type NoInfer<T> = T extends infer U ? U : never;

export interface RecordFieldProps<
  RecordType extends Record<string, any> = Record<string, any>,
> extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  className?: string;
  empty?: ReactNode;
  field?: ElementType;
  label?: ReactNode;
  render?: (record: RecordType) => React.ReactNode;
  resource?: string;
  source?: NoInfer<HintedString<ExtractRecordPaths<RecordType>>>;
  record?: RecordType;
  variant?: "default" | "inline";
}
