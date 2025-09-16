import {
  Navbar as HeroUINavbar,
  NavbarProps as HeroUINavbarProps,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@heroui/navbar";
import { cn } from "@workspace/ui/lib/utils";

export interface NavbarProps extends HeroUINavbarProps {}

export function Navbar({ className, ...props }: NavbarProps) {
  return <HeroUINavbar className={cn(className)} {...props} />;
}

export {
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
};
