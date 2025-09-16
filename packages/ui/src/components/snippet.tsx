import {
  Snippet as HeroUISnippet,
  SnippetProps as HeroUISnippetProps,
} from "@heroui/snippet";
import { cn } from "@workspace/ui/lib/utils";

export interface SnippetProps extends HeroUISnippetProps {}

export function Snippet({ className, ...props }: SnippetProps) {
  return <HeroUISnippet className={cn(className)} {...props} />;
}
