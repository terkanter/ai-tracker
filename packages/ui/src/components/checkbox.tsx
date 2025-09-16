import {
  CheckboxGroup,
  Checkbox as HeroUICheckbox,
  CheckboxProps as HeroUICheckboxProps,
} from "@heroui/checkbox";
import { cn } from "@workspace/ui/lib/utils";

export interface CheckboxProps extends HeroUICheckboxProps {}

export function Checkbox({ className, ...props }: CheckboxProps) {
  return <HeroUICheckbox className={cn(className)} {...props} />;
}

export { CheckboxGroup };
