import {
  Table as HeroUITable,
  TableProps as HeroUITableProps,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/table";
import { cn } from "@workspace/ui/lib/utils";

export interface TableProps extends HeroUITableProps {}

export function Table({ className, ...props }: TableProps) {
  return <HeroUITable className={cn(className)} {...props} />;
}

export { TableBody, TableCell, TableColumn, TableHeader, TableRow };
