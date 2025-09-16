import { Chip as HeroUIChip, ChipProps as HeroUIChipProps } from "@heroui/chip";
import { cn } from "@workspace/ui/lib/utils";

export interface ChipProps extends HeroUIChipProps {}

function Chip({ className, ...props }: ChipProps) {
  return <HeroUIChip className={cn(className)} {...props} />;
}

export { Chip };
