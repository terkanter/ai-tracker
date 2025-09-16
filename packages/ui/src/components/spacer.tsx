import {
  Spacer as HeroUISpacer,
  SpacerProps as HeroUISpacerProps,
} from "@heroui/spacer";
import { cn } from "@workspace/ui/lib/utils";

export interface SpacerProps extends HeroUISpacerProps {}

export function Spacer({ className, ...props }: SpacerProps) {
  return <HeroUISpacer className={cn(className)} {...props} />;
}
