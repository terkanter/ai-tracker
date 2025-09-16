import {
  Listbox as HeroUIListbox,
  ListboxProps as HeroUIListboxProps,
  ListboxItem,
} from "@heroui/listbox";
import { cn } from "@workspace/ui/lib/utils";

export interface ListboxProps extends HeroUIListboxProps {}

export function Listbox({ className, ...props }: ListboxProps) {
  return <HeroUIListbox className={cn(className)} {...props} />;
}

export { ListboxItem };
