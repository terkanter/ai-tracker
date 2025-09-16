import {
  Divider as HeroUIDivider,
  DividerProps as HeroUIDividerProps,
} from "@heroui/divider";
import { cn } from "@workspace/ui/lib/utils";

// Separator is essentially a Divider in HeroUI
export interface SeparatorProps extends HeroUIDividerProps {}

export function Separator({ className, ...props }: SeparatorProps) {
  return <HeroUIDivider className={cn(className)} {...props} />;
}
