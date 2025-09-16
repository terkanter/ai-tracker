import {
  Skeleton as HeroUISkeleton,
  SkeletonProps as HeroUISkeletonProps,
} from "@heroui/skeleton";
import { cn } from "@workspace/ui/lib/utils";

export interface SkeletonProps extends HeroUISkeletonProps {}

export function Skeleton({ className, ...props }: SkeletonProps) {
  return <HeroUISkeleton className={cn(className)} {...props} />;
}
