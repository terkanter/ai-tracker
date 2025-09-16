import {
  Select as HeroUISelect,
  SelectProps as HeroUISelectProps,
  SelectItem,
  SelectSection,
} from "@heroui/select";
import { cn } from "@workspace/ui/lib/utils";

export interface SelectProps extends HeroUISelectProps {}

export function Select({ className, ...props }: SelectProps) {
  return <HeroUISelect className={cn(className)} {...props} />;
}

export { SelectItem, SelectSection };
