import { Link as HeroUILink, LinkProps as HeroUILinkProps } from "@heroui/link";
import { cn } from "@workspace/ui/lib/utils";

export interface LinkProps extends HeroUILinkProps {}

export function Link({ className, ...props }: LinkProps) {
  return <HeroUILink className={cn(className)} {...props} />;
}
