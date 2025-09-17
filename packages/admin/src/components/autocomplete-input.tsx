import {
  FormControl,
  FormError,
  FormField,
  FormLabel,
} from "@workspace/admin/form";
import type { SupportCreateSuggestionOptions } from "@workspace/admin/hooks/useSupportCreateSuggestion";
import { useSupportCreateSuggestion } from "@workspace/admin/hooks/useSupportCreateSuggestion";
import { Button } from "@workspace/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@workspace/ui/command";
import { cn } from "@workspace/ui/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@workspace/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import type { ChoicesProps, InputProps } from "ra-core";
import {
  FieldTitle,
  useChoices,
  useChoicesContext,
  useEvent,
  useGetRecordRepresentation,
  useInput,
  useTranslate,
} from "ra-core";
import * as React from "react";
import { useCallback } from "react";
import { InputHelperText } from "./input-helper-text";

export function AutocompleteInput(
  props: Omit<InputProps, "source"> &
    Omit<SupportCreateSuggestionOptions, "handleChange" | "filter"> &
    Partial<Pick<InputProps, "source">> &
    ChoicesProps & {
      className?: string;
      disableValue?: string;
      filterToQuery?: (searchText: string) => any;
      translateChoice?: boolean;
      placeholder?: string;
      inputText?:
        | React.ReactNode
        | ((option: any | undefined) => React.ReactNode);
    },
) {
  const {
    filterToQuery = DefaultFilterToQuery,
    inputText,
    create,
    createValue,
    createLabel,
    createHintValue,
    createItemLabel,
    onCreate,
    optionText,
  } = props;
  const {
    allChoices = [],
    source,
    resource,
    isFromReference,
    setFilters,
  } = useChoicesContext(props);
  const { id, field, isRequired } = useInput({ ...props, source });
  const translate = useTranslate();
  const { placeholder = translate("ra.action.search", { _: "Search..." }) } =
    props;

  const getRecordRepresentation = useGetRecordRepresentation(resource);
  const { getChoiceText, getChoiceValue } = useChoices({
    optionText:
      props.optionText ?? (isFromReference ? getRecordRepresentation : "name"),
    optionValue: props.optionValue ?? "id",
    disableValue: props.disableValue,
    translateChoice: props.translateChoice ?? !isFromReference,
  });

  const [filterValue, setFilterValue] = React.useState("");

  const [open, setOpen] = React.useState(false);
  const selectedChoice = allChoices.find(
    (choice) => getChoiceValue(choice) === field.value,
  );

  const getInputText = useCallback(
    (selectedChoice: any) => {
      if (typeof inputText === "function") {
        return inputText(selectedChoice);
      }

      if (inputText !== undefined) {
        return inputText;
      }

      return getChoiceText(selectedChoice);
    },
    [inputText, getChoiceText],
  );

  const handleOpenChange = useEvent((isOpen: boolean) => {
    setOpen(isOpen);

    // Reset the filter when the popover is closed
    if (!isOpen) {
      setFilters(filterToQuery(""));
    }
  });

  const handleChange = useCallback(
    (choice: any) => {
      if (field.value === getChoiceValue(choice) && !isRequired) {
        field.onChange("");
        setFilterValue("");

        if (isFromReference) {
          setFilters(filterToQuery(""));
        }

        setOpen(false);

        return;
      }

      field.onChange(getChoiceValue(choice));
      setOpen(false);
    },
    [
      field.value,
      field.onChange,
      getChoiceValue,
      isRequired,
      setFilterValue,
      isFromReference,
      setFilters,
      filterToQuery,
      setOpen,
    ],
  );

  const {
    getCreateItem,
    handleChange: handleChangeWithCreateSupport,
    createElement,
    getOptionDisabled,
  } = useSupportCreateSuggestion({
    create,
    createLabel,
    createValue,
    createHintValue,
    createItemLabel,
    onCreate,
    handleChange,
    optionText,
    filter: filterValue,
  });

  const createItem =
    (create || onCreate) && (filterValue !== "" || createLabel)
      ? getCreateItem(filterValue)
      : null;
  let finalChoices = allChoices;

  if (createItem) {
    finalChoices = [...finalChoices, createItem];
  }

  return (
    <>
      <FormField className={props.className} id={id} name={source}>
        {props.label !== false && (
          <FormLabel>
            <FieldTitle
              isRequired={isRequired}
              label={props.label}
              resource={resource}
              source={props.source ?? source}
            />
          </FormLabel>
        )}
        <FormControl>
          <Popover open={open} onOpenChange={handleOpenChange}>
            <PopoverTrigger asChild>
              <Button
                aria-expanded={open}
                className="h-auto w-full justify-between py-1.75 font-normal"
                role="combobox"
                variant="outline"
              >
                {selectedChoice ? (
                  getInputText(selectedChoice)
                ) : (
                  <span className="text-muted-foreground">{placeholder}</span>
                )}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              {/* We handle the filtering ourselves */}
              <Command shouldFilter={!isFromReference}>
                <CommandInput
                  placeholder="Search..."
                  value={filterValue}
                  onValueChange={(filter) => {
                    setFilterValue(filter);

                    // We don't want the ChoicesContext to filter the choices if the input
                    // is not from a reference as it would also filter out the selected values
                    if (isFromReference) {
                      setFilters(filterToQuery(filter));
                    }
                  }}
                />
                <CommandList>
                  <CommandEmpty>No matching item found.</CommandEmpty>
                  <CommandGroup>
                    {finalChoices.map((choice) => {
                      const isCreateItem =
                        !!createItem && choice?.id === createItem.id;
                      const disabled = getOptionDisabled(choice);

                      return (
                        <CommandItem
                          key={getChoiceValue(choice)}
                          disabled={disabled}
                          value={
                            isCreateItem
                              ? // if it's the create option, include the filter value so it is shown in the command input
                                // characters before and after the filter value are required
                                // to show the option when the filter value starts or ends with a space
                                `?${filterValue}?`
                              : getChoiceValue(choice)
                          }
                          onSelect={() => handleChangeWithCreateSupport(choice)}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              field.value === getChoiceValue(choice)
                                ? "opacity-100"
                                : "opacity-0",
                            )}
                          />
                          {getChoiceText(isCreateItem ? createItem : choice)}
                        </CommandItem>
                      );
                    })}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </FormControl>
        <InputHelperText helperText={props.helperText} />
        <FormError />
      </FormField>
      {createElement}
    </>
  );
}

const DefaultFilterToQuery = (searchText: string) => ({ q: searchText });
