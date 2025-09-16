import {
  Switch as HeroUISwitch,
  SwitchProps as HeroUISwitchProps,
  useSwitch,
} from "@heroui/switch";
import { cn } from "@workspace/ui/lib/utils";

export interface SwitchProps extends HeroUISwitchProps {}

export function Switch({ className, ...props }: SwitchProps) {
  return <HeroUISwitch className={cn(className)} {...props} />;
}

export { HeroUISwitch, useSwitch };
