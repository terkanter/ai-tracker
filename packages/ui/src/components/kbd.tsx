import { Kbd as HeroUIKbd, KbdProps as HeroUIKbdProps } from "@heroui/kbd";
import { cn } from "@workspace/ui/lib/utils";

export interface KbdProps extends HeroUIKbdProps {}

export function Kbd({ className, ...props }: KbdProps) {
  return <HeroUIKbd className={cn(className)} {...props} />;
}
