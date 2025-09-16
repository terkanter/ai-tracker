import {
  CardBody,
  CardFooter,
  CardHeader,
  Card as HeroUICard,
  CardProps as HeroUICardProps,
} from "@heroui/card";
import { cn } from "@workspace/ui/lib/utils";

export interface CardProps extends HeroUICardProps {}

export function Card({ className, ...props }: CardProps) {
  return <HeroUICard className={cn(className)} {...props} />;
}

export { CardBody, CardFooter, CardHeader };
