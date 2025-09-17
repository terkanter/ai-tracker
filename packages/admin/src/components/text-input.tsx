import {
  FormControl,
  FormError,
  FormField,
  FormLabel,
} from "@workspace/admin/form";
import { InputHelperText } from "@workspace/admin/input-helper-text";
import { Input } from "@workspace/ui/input";
import { Textarea } from "@workspace/ui/textarea";
import {
  FieldTitle,
  type InputProps,
  useInput,
  useResourceContext,
} from "ra-core";

export type TextInputProps = InputProps & {
  multiline?: boolean;
} & React.ComponentProps<"textarea"> &
  React.ComponentProps<"input">;

export function TextInput(props: TextInputProps) {
  const resource = useResourceContext(props);
  const {
    label,
    source,
    multiline,
    className,
    validate: _validateProp,
    format: _formatProp,
    ...rest
  } = props;
  const { id, field, isRequired } = useInput(props);

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
        {multiline ? (
          <Textarea {...rest} {...field} />
        ) : (
          <Input {...rest} {...field} />
        )}
      </FormControl>
      <InputHelperText helperText={props.helperText} />
      <FormError />
    </FormField>
  );
}
