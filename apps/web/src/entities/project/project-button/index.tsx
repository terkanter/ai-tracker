import { Avatar, AvatarFallback } from "@workspace/ui/avatar";
import { Button, type ButtonProps } from "@workspace/ui/button";
import { cn } from "@workspace/ui/lib/utils";
import { ChevronsUpDown } from "lucide-react";
import { useGetIdentity } from "ra-core";

export function ProjectButton(props: ButtonProps) {
  const { data, isLoading } = useGetIdentity();

  if (isLoading) {
    return (
      <Avatar className="h-8 w-8 rounded-lg">
        <AvatarFallback className="rounded-lg">U</AvatarFallback>
      </Avatar>
    );
  }

  return (
    <Button
      {...props}
      variant="ghost"
      className={cn("cursor-pointer py-0 px-1", props.className)}
    >
      <div className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground flex items-center gap-1">
        <div className="grid flex-1 text-left text-sm leading-tight">
          <span className="truncate font-medium">Project</span>
        </div>
        <ChevronsUpDown className="ml-auto size-4 text-muted-foreground" />
      </div>
    </Button>
  );
}
