import {
  Divider as HeroUIDivider,
  DividerProps as HeroUIDividerProps,
} from "@heroui/divider";
import { cn } from "@workspace/ui/lib/utils";

export interface DividerProps extends HeroUIDividerProps {}

export function Divider({ className, ...props }: DividerProps) {
  return <HeroUIDivider className={cn(className)} {...props} />;
}
