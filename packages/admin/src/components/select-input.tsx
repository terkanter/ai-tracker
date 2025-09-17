import { FormError, FormField, FormLabel } from "@workspace/admin/form";
import type { SupportCreateSuggestionOptions } from "@workspace/admin/hooks/useSupportCreateSuggestion";
import { useSupportCreateSuggestion } from "@workspace/admin/hooks/useSupportCreateSuggestion";
import { InputHelperText } from "@workspace/admin/input-helper-text";
import { cn } from "@workspace/ui/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/select";
import { Skeleton } from "@workspace/ui/skeleton";
import { X } from "lucide-react";
import type { InputProps } from "ra-core";
import {
  type ChoicesProps,
  FieldTitle,
  useChoices,
  useChoicesContext,
  useGetRecordRepresentation,
  useInput,
  useTranslate,
} from "ra-core";
import type { ComponentProps } from "react";
import { type ReactElement, useCallback, useEffect } from "react";

export function SelectInput(props: SelectInputProps) {
  const {
    choices: choicesProp,
    isLoading: isLoadingProp,
    isFetching: isFetchingProp,
    isPending: isPendingProp,
    resource: resourceProp,
    source: sourceProp,

    optionText,
    optionValue,
    disableValue = "disabled",
    translateChoice,
    createValue,
    createHintValue,

    alwaysOn,
    defaultValue,
    format,
    label,
    helperText,
    name,
    onBlur,
    onChange,
    parse,
    validate,
    readOnly,
    disabled,

    className,
    emptyText = "",
    emptyValue = "",
    filter: _filter,
    create,
    createLabel,
    onCreate,

    ...rest
  } = props;
  const translate = useTranslate();

  useEffect(() => {
    if (emptyValue == null) {
      throw new Error(
        `emptyValue being set to null or undefined is not supported. Use parse to turn the empty string into null.`,
      );
    }
  }, [emptyValue]);

  const {
    allChoices,
    isPending,
    error: fetchError,
    source,
    resource,
    isFromReference,
  } = useChoicesContext({
    choices: choicesProp,
    isLoading: isLoadingProp,
    isFetching: isFetchingProp,
    isPending: isPendingProp,
    resource: resourceProp,
    source: sourceProp,
  });

  if (source === undefined) {
    throw new Error(
      `If you're not wrapping the SelectInput inside a ReferenceInput, you must provide the source prop`,
    );
  }

  if (!isPending && !fetchError && allChoices === undefined) {
    throw new Error(
      `If you're not wrapping the SelectInput inside a ReferenceInput, you must provide the choices prop`,
    );
  }

  const getRecordRepresentation = useGetRecordRepresentation(resource);
  const { getChoiceText, getChoiceValue, getDisableValue } = useChoices({
    optionText:
      optionText ?? (isFromReference ? getRecordRepresentation : undefined),
    optionValue,
    disableValue,
    translateChoice: translateChoice ?? !isFromReference,
    createValue,
    createHintValue,
  });
  const { id, field, isRequired } = useInput({
    alwaysOn,
    defaultValue,
    format,
    label,
    helperText,
    name,
    onBlur,
    onChange,
    parse,
    resource,
    source,
    validate,
    readOnly,
    disabled,
  });

  const renderEmptyItemOption = useCallback(() => {
    return typeof emptyText === "string"
      ? emptyText === ""
        ? " " // em space, forces the display of an empty line of normal height
        : translate(emptyText, { _: emptyText })
      : emptyText;
  }, [emptyText, translate]);

  const renderMenuItemOption = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (choice: any) => getChoiceText(choice),
    [getChoiceText],
  );

  const handleChange = useCallback(
    async (value: string) => {
      if (value === emptyValue) {
        field.onChange(emptyValue);
      } else {
        // Find the choice by value and pass it to field.onChange
        const choice = allChoices?.find(
          (choice) => getChoiceValue(choice) === value,
        );

        field.onChange(choice ? getChoiceValue(choice) : value);
      }
    },
    [field, getChoiceValue, emptyValue, allChoices],
  );

  const {
    getCreateItem,
    handleChange: handleChangeWithCreateSupport,
    createElement,
  } = useSupportCreateSuggestion({
    create,
    createLabel,
    createValue,
    createHintValue,
    onCreate,
    handleChange,
    optionText,
  });

  if (isPending) {
    return (
      <FormField
        className={cn("w-full min-w-20", className)}
        id={id}
        name={field.name}
      >
        {label !== "" && label !== false && (
          <FormLabel>
            <FieldTitle
              isRequired={isRequired}
              label={label}
              resource={resourceProp}
              source={source}
            />
          </FormLabel>
        )}
        <div className="relative">
          <Skeleton className="h-9 w-full" />
        </div>
        <InputHelperText helperText={helperText} />
        <FormError />
      </FormField>
    );
  }

  const createItem = create || onCreate ? getCreateItem() : null;
  let finalChoices = fetchError ? [] : allChoices;

  if (create || onCreate) {
    finalChoices = [...finalChoices, createItem];
  }

  // Handle reset functionality
  const handleReset = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    field.onChange(emptyValue);
  };

  return (
    <>
      <FormField
        className={cn("w-full min-w-20", className)}
        id={id}
        name={field.name}
        {...rest}
      >
        {label !== "" && label !== false && (
          <FormLabel>
            <FieldTitle
              isRequired={isRequired}
              label={label}
              resource={resourceProp}
              source={source}
            />
          </FormLabel>
        )}
        <div className="relative">
          <Select
            //FIXME https://github.com/radix-ui/primitives/issues/3135
            // Setting a key based on the value fixes an issue where onValueChange
            // was called with an empty string when the controlled value was changed.
            // See: https://github.com/radix-ui/primitives/issues/3135#issuecomment-2916908248
            key={`select:${field.value?.toString() ?? emptyValue}`}
            value={field.value?.toString() || emptyValue}
            onValueChange={handleChangeWithCreateSupport}
          >
            <SelectTrigger
              className={cn("hover:bg-accent w-full transition-all")}
              disabled={field.disabled}
            >
              <SelectValue placeholder={renderEmptyItemOption()} />

              {field.value && field.value !== emptyValue ? (
                <div
                  className="text-muted-foreground pointer-events-auto ml-auto p-0 opacity-50 hover:bg-transparent hover:opacity-100"
                  role="button"
                  onClick={handleReset}
                >
                  <X className="h-4 w-4" />
                </div>
              ) : null}
            </SelectTrigger>
            <SelectContent>
              {finalChoices?.map((choice) => {
                if (!choice) return null;

                const value = getChoiceValue(choice);
                const isDisabled = getDisableValue(choice);

                return (
                  <SelectItem
                    key={value}
                    disabled={isDisabled}
                    value={value?.toString()}
                  >
                    {renderMenuItemOption(
                      !!createItem && choice?.id === createItem.id
                        ? createItem
                        : choice,
                    )}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
        <InputHelperText helperText={helperText} />
      </FormField>
      {createElement}
    </>
  );
}

export type SelectInputProps = ChoicesProps &
  // Source is optional as SelectInput can be used inside a ReferenceInput that already defines the source
  Partial<InputProps> &
  Omit<SupportCreateSuggestionOptions, "handleChange"> & {
    emptyText?: string | ReactElement;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    emptyValue?: any;
    onChange?: (value: string) => void;
  } & Omit<ComponentProps<typeof FormField>, "id" | "name" | "children">;
