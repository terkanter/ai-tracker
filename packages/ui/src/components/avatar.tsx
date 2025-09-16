import {
  AvatarGroup,
  AvatarIcon,
  Avatar as HeroUIAvatar,
  AvatarProps as HeroUIAvatarProps,
} from "@heroui/avatar";
import { cn } from "@workspace/ui/lib/utils";

export interface AvatarProps extends HeroUIAvatarProps {}

export function Avatar({ className, ...props }: AvatarProps) {
  return <HeroUIAvatar className={cn(className)} {...props} />;
}

export { AvatarGroup, AvatarIcon };
