import {
  FormControl,
  FormError,
  FormField,
  FormLabel,
} from "@workspace/admin/form";
import { InputHelperText } from "@workspace/admin/input-helper-text";
import { Label } from "@workspace/ui/label";
import { cn } from "@workspace/ui/lib/utils";
import { RadioGroup, RadioGroupItem } from "@workspace/ui/radio-group";
import { Skeleton } from "@workspace/ui/skeleton";
import {
  type ChoicesProps,
  FieldTitle,
  type InputProps,
  useChoices,
  useChoicesContext,
  useInput,
} from "ra-core";
import type * as React from "react";

export function RadioButtonGroupInput(inProps: RadioButtonGroupInputProps) {
  const {
    choices: choicesProp,
    isFetching: isFetchingProp,
    isLoading: isLoadingProp,
    isPending: isPendingProp,
    resource: resourceProp,
    source: sourceProp,

    format,
    onBlur,
    onChange,
    parse,
    validate,
    disabled,
    readOnly,

    optionText,
    optionValue = "id",
    translateChoice,
    disableValue = "disabled",

    className,
    helperText,
    label,
    row,
    ...rest
  } = inProps;

  const {
    allChoices,
    isPending,
    error: fetchError,
    resource,
    source,
  } = useChoicesContext({
    choices: choicesProp,
    isFetching: isFetchingProp,
    isLoading: isLoadingProp,
    isPending: isPendingProp,
    resource: resourceProp,
    source: sourceProp,
  });

  if (source === undefined) {
    throw new Error(
      `If you're not wrapping the RadioButtonGroupInput inside a ReferenceArrayInput, you must provide the source prop`,
    );
  }

  if (!isPending && !fetchError && allChoices === undefined) {
    throw new Error(
      `If you're not wrapping the RadioButtonGroupInput inside a ReferenceArrayInput, you must provide the choices prop`,
    );
  }

  const { id, field, isRequired } = useInput({
    format,
    onBlur,
    onChange,
    parse,
    resource,
    source,
    validate,
    disabled,
    readOnly,
    ...rest,
  });

  const { getChoiceText, getChoiceValue, getDisableValue } = useChoices({
    optionText,
    optionValue,
    translateChoice,
    disableValue,
  });

  if (isPending) {
    return <Skeleton className="h-9 w-full" />;
  }

  return (
    <FormField className={className} id={id} name={field.name}>
      {label ? (
        <FormLabel>
          <FieldTitle
            isRequired={isRequired}
            label={label}
            resource={resource}
            source={source}
          />
        </FormLabel>
      ) : null}

      <FormControl>
        <RadioGroup
          {...rest}
          className={cn("flex", row ? "flex-row gap-4" : "flex-col gap-2")}
          disabled={disabled || readOnly}
          value={field.value || ""}
          onValueChange={field.onChange}
        >
          {allChoices?.map((choice) => {
            const value = getChoiceValue(choice);
            const isDisabled = disabled || readOnly || getDisableValue(choice);

            return (
              <div key={value} className="flex items-center space-x-2">
                <RadioGroupItem
                  disabled={isDisabled}
                  id={`${id}-${value}`}
                  value={value}
                />
                <Label
                  className={cn(
                    "cursor-pointer text-sm font-normal",
                    isDisabled && "cursor-not-allowed opacity-50",
                  )}
                  htmlFor={`${id}-${value}`}
                >
                  {getChoiceText(choice)}
                </Label>
              </div>
            );
          })}
        </RadioGroup>
      </FormControl>
      <InputHelperText helperText={helperText} />
      <FormError />
    </FormField>
  );
}

export interface RadioButtonGroupInputProps
  extends Partial<InputProps>,
    ChoicesProps,
    Omit<
      React.ComponentProps<typeof RadioGroup>,
      "defaultValue" | "onBlur" | "onChange" | "type"
    > {
  row?: boolean;
}
