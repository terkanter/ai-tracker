import {
  Tabs as HeroUITabs,
  TabsProps as HeroUITabsProps,
  Tab,
} from "@heroui/tabs";
import { cn } from "@workspace/ui/lib/utils";

export interface TabsProps extends HeroUITabsProps {}

export function Tabs({ className, ...props }: TabsProps) {
  return <HeroUITabs className={cn(className)} {...props} />;
}

export { Tab };
