import { Code as HeroUICode, CodeProps as HeroUICodeProps } from "@heroui/code";
import { cn } from "@workspace/ui/lib/utils";

export interface CodeProps extends HeroUICodeProps {}

export function Code({ className, ...props }: CodeProps) {
  return <HeroUICode className={cn(className)} {...props} />;
}
