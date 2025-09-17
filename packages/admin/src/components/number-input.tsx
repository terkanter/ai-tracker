import {
  FormControl,
  FormError,
  FormField,
  FormLabel,
} from "@workspace/admin/form";
import { InputHelperText } from "@workspace/admin/input-helper-text";
import { Input } from "@workspace/ui/input";
import {
  FieldTitle,
  type InputProps,
  useInput,
  useResourceContext,
} from "ra-core";
import * as React from "react";
import { useEffect, useState } from "react";

export function NumberInput(props: NumberInputProps) {
  const {
    label,
    source,
    className,
    resource: resourceProp,
    validate: _validateProp,
    format: _formatProp,
    parse = convertStringToNumber,
    onFocus,
    ...rest
  } = props;
  const resource = useResourceContext({ resource: resourceProp });

  const { id, field, isRequired } = useInput(props);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const numberValue = parse(value);

    setValue(value);
    field.onChange(numberValue ?? 0);
  };

  const [value, setValue] = useState<string | undefined>(
    field.value?.toString() ?? "",
  );

  const hasFocus = React.useRef(false);

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    onFocus?.(event);
    hasFocus.current = true;
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    field.onBlur?.(event);
    hasFocus.current = false;
    setValue(field.value?.toString() ?? "");
  };

  useEffect(() => {
    if (!hasFocus.current) {
      setValue(field.value?.toString() ?? "");
    }
  }, [field.value]);

  return (
    <FormField className={className} id={id} name={field.name}>
      {label !== false && (
        <FormLabel>
          <FieldTitle
            isRequired={isRequired}
            label={label}
            resource={resource}
            source={source}
          />
        </FormLabel>
      )}
      <FormControl>
        <Input
          {...rest}
          {...field}
          type="number"
          value={value}
          onBlur={handleBlur}
          onChange={handleChange}
          onFocus={handleFocus}
        />
      </FormControl>
      <InputHelperText helperText={props.helperText} />
      <FormError />
    </FormField>
  );
}

export interface NumberInputProps
  extends InputProps,
    Omit<
      React.ComponentProps<"input">,
      "defaultValue" | "onBlur" | "onChange" | "type"
    > {
  parse?: (value: string) => number;
}

const convertStringToNumber = (value?: string | null) => {
  if (value == null || value === "") {
    return null;
  }

  const float = Number.parseFloat(value);

  return Number.isNaN(float) ? 0 : float;
};
