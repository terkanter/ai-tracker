import { FormError, FormField, FormLabel } from "@workspace/admin/form";
import { Switch } from "@workspace/ui/switch";
import { FieldTitle, useInput } from "ra-core";
import type React from "react";
import { useCallback } from "react";
import { InputHelperText } from "./input-helper-text";

export function BooleanInput(props: BooleanInputProps) {
  const {
    className,
    defaultValue = false,
    format,
    label,
    helperText,
    onBlur,
    onChange,
    onFocus,
    readOnly,
    disabled,
    parse,
    resource,
    source,
    validate,
    ...rest
  } = props;
  const { id, field, isRequired } = useInput({
    defaultValue,
    format,
    parse,
    resource,
    source,
    onBlur,
    onChange,
    type: "checkbox",
    validate,
    disabled,
    readOnly,
    ...rest,
  });

  const handleChange = useCallback(
    (checked: boolean) => {
      field.onChange(checked);
      // Ensure field is considered as touched
      field.onBlur();
    },
    [field],
  );

  return (
    <FormField className={className} id={id} name={field.name}>
      <div className="flex items-center space-x-2">
        <Switch
          checked={Boolean(field.value)}
          id={id}
          onCheckedChange={handleChange}
          onFocus={onFocus}
        />
        <FormLabel htmlFor={id}>
          <FieldTitle
            isRequired={isRequired}
            label={label}
            resource={resource}
            source={source}
          />
        </FormLabel>
      </div>
      <InputHelperText helperText={helperText} />
      <FormError />
    </FormField>
  );
}

export interface BooleanInputProps {
  className?: string;
  defaultValue?: boolean;
  format?: (value: any) => any;
  helperText?: React.ReactNode;
  label?: React.ReactNode;
  onBlur?: (event: React.FocusEvent<HTMLButtonElement>) => void;
  onChange?: (value: any) => void;
  onFocus?: (event: React.FocusEvent<HTMLButtonElement>) => void;
  readOnly?: boolean;
  disabled?: boolean;
  parse?: (value: any) => any;
  resource?: string;
  source: string;
  validate?: any;
}
