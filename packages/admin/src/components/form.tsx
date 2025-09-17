import type * as LabelPrimitive from "@radix-ui/react-label";
import { Slot } from "@radix-ui/react-slot";
import type { UseMutationOptions } from "@tanstack/react-query";
import { Button } from "@workspace/ui/button";
import { Label } from "@workspace/ui/label";
import { cn } from "@workspace/ui/lib/utils";
import { Loader2, Save } from "lucide-react";
import {
  type CreateParams,
  type RaRecord,
  setSubmissionErrors,
  type TransformData,
  type UpdateParams,
  useRecordFromLocation,
  useSaveContext,
  useTranslate,
  ValidationError,
  warning,
} from "ra-core";
import type * as React from "react";
import {
  createContext,
  type MouseEventHandler,
  useCallback,
  useContext,
  useMemo,
} from "react";
import { FormProvider, useFormContext, useFormState } from "react-hook-form";

const Form = FormProvider as React.ComponentType<
  React.ComponentProps<typeof FormProvider>
>;

type FormItemContextValue = {
  id: string;
  name: string;
};

const FormItemContext = createContext<FormItemContextValue>(
  {} as FormItemContextValue,
);

const useFormField = () => {
  const { getFieldState, formState } = useFormContext();
  const { id, name } = useContext(FormItemContext);

  const fieldState = getFieldState(name, formState);

  return useMemo(
    () => ({
      formItemId: id,
      formDescriptionId: `${id}-description`,
      formMessageId: `${id}-message`,
      ...fieldState,
    }),
    [id, fieldState],
  );
};

function FormField({ className, id, name, ...props }: FormItemProps) {
  const contextValue: FormItemContextValue = useMemo(
    () => ({
      id,
      name,
    }),
    [id, name],
  );

  return (
    <FormItemContext.Provider value={contextValue}>
      <div
        className={cn("grid gap-2", className)}
        data-slot="form-item"
        role="group"
        {...props}
      />
    </FormItemContext.Provider>
  );
}

type FormItemProps = Omit<React.ComponentProps<"div">, "id"> & {
  id: string;
  name: string;
};

function FormLabel({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  const { error, formItemId } = useFormField();

  return (
    <Label
      className={cn("data-[error=true]:text-destructive", className)}
      data-error={!!error}
      data-slot="form-label"
      htmlFor={formItemId}
      {...props}
    />
  );
}

function FormControl({ ...props }: React.ComponentProps<typeof Slot>) {
  const { error, formItemId, formDescriptionId, formMessageId } =
    useFormField();

  return (
    <Slot
      aria-describedby={
        error ? `${formDescriptionId} ${formMessageId}` : `${formDescriptionId}`
      }
      aria-invalid={!!error}
      data-slot="form-control"
      id={formItemId}
      {...props}
    />
  );
}

function FormDescription({ className, ...props }: React.ComponentProps<"p">) {
  const { formDescriptionId } = useFormField();

  return (
    <div
      className={cn("text-muted-foreground text-sm", className)}
      data-slot="form-description"
      id={formDescriptionId}
      {...props}
    />
  );
}

function FormError({ className, ...props }: React.ComponentProps<"p">) {
  const { invalid, error, formMessageId } = useFormField();

  const err = error?.root?.message ?? error?.message;

  if (!invalid || !err) {
    return null;
  }

  return (
    <p
      className={cn("text-destructive text-sm", className)}
      data-slot="form-message"
      id={formMessageId}
      {...props}
    >
      <ValidationError error={err} />
    </p>
  );
}

function SaveButton<RecordType extends RaRecord = RaRecord>(
  props: SaveButtonProps<RecordType>,
) {
  const {
    className,
    icon = defaultIcon,
    label = "ra.action.save",
    onClick,
    mutationOptions,
    disabled: disabledProp,
    type = "submit",
    transform,
    variant = "default",
    alwaysEnable = false,
    ...rest
  } = props;
  const translate = useTranslate();
  const form = useFormContext();
  const saveContext = useSaveContext();
  const { dirtyFields, isValidating, isSubmitting } = useFormState();
  // useFormState().isDirty might differ from useFormState().dirtyFields (https://github.com/react-hook-form/react-hook-form/issues/4740)
  const isDirty = Object.keys(dirtyFields).length > 0;
  // Use form isDirty, isValidating and form context saving to enable or disable the save button
  // if alwaysEnable is undefined and the form wasn't prefilled
  const recordFromLocation = useRecordFromLocation();
  const disabled = valueOrDefault(
    alwaysEnable === false || alwaysEnable === undefined
      ? undefined
      : !alwaysEnable,
    disabledProp ||
      (!isDirty && recordFromLocation == null) ||
      isValidating ||
      isSubmitting,
  );

  warning(
    type === "submit" &&
      ((mutationOptions &&
        (mutationOptions.onSuccess || mutationOptions.onError)) ||
        transform),
    'Cannot use <SaveButton mutationOptions> props on a button of type "submit". To override the default mutation options on a particular save button, set the <SaveButton type="button"> prop, or set mutationOptions in the main view component (<Create> or <Edit>).',
  );

  const handleSubmit = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async (values: any) => {
      let errors: unknown;

      if (saveContext?.save) {
        // @ts-expect-error
        errors = await saveContext.save(values, {
          ...mutationOptions,
          transform,
        });
      }

      if (errors != null) {
        setSubmissionErrors(errors, form.setError);
      }
    },
    [form.setError, saveContext, mutationOptions, transform],
  );

  const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    async (event) => {
      if (onClick) {
        onClick(event);
      }

      if (event.defaultPrevented) {
        return;
      }

      if (type === "button") {
        // this button doesn't submit the form, so it doesn't trigger useIsFormInvalid in <FormContent>
        // therefore we need to check for errors manually
        event.stopPropagation();
        await form.handleSubmit(handleSubmit)(event);
      }
    },
    [onClick, type, form, handleSubmit],
  );

  const displayedLabel = label && translate(label, { _: label });

  return (
    <Button
      className={cn(
        disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
        className,
      )}
      disabled={disabled}
      type={type}
      variant={variant}
      onClick={handleClick}
      {...rest}
    >
      {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : icon}
      {displayedLabel}
    </Button>
  );
}

const defaultIcon = <Save className="h-4 w-4" />;

interface Props<
  RecordType extends RaRecord = RaRecord,
  MutationOptionsError = unknown,
> {
  className?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  label?: string;
  mutationOptions?: UseMutationOptions<
    RecordType,
    MutationOptionsError,
    CreateParams<RecordType> | UpdateParams<RecordType>
  >;
  transform?: TransformData;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
}

export type SaveButtonProps<RecordType extends RaRecord = RaRecord> =
  Props<RecordType> &
    React.ComponentProps<"button"> & {
      alwaysEnable?: boolean;
    };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const valueOrDefault = (value: any, defaultValue: any) =>
  typeof value === "undefined" ? defaultValue : value;

export {
  Form,
  FormControl,
  FormDescription,
  FormError,
  FormField,
  FormLabel,
  SaveButton,
  useFormField,
};
