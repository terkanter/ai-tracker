import {
  CircularProgress,
  Progress as HeroUIProgress,
  ProgressProps as HeroUIProgressProps,
} from "@heroui/progress";
import { cn } from "@workspace/ui/lib/utils";

export interface ProgressProps extends HeroUIProgressProps {}

export function Progress({ className, ...props }: ProgressProps) {
  return <HeroUIProgress className={cn(className)} {...props} />;
}

export { CircularProgress };
