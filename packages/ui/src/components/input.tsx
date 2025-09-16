import {
  Input as HeroUIInput,
  InputProps as HeroUIInputProps,
} from "@heroui/input";
import { cn } from "@workspace/ui/lib/utils";

export interface InputProps extends HeroUIInputProps {}

export function Input({ className, ...props }: InputProps) {
  return <HeroUIInput className={cn(className)} {...props} />;
}
