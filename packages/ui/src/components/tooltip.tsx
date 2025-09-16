import {
  Tooltip as HeroUITooltip,
  TooltipProps as HeroUITooltipProps,
} from "@heroui/tooltip";
import { cn } from "@workspace/ui/lib/utils";

export interface TooltipProps extends HeroUITooltipProps {}

export function Tooltip({ className, ...props }: TooltipProps) {
  return <HeroUITooltip className={cn(className)} {...props} />;
}
