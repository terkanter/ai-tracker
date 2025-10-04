"use client";

import { SettingsOutline } from "@workspace/icons/solar";
import { Button, type ButtonProps } from "@workspace/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@workspace/ui/dropdown-menu";
import { cn } from "@workspace/ui/lib/utils";
import { Check, ChevronsUpDown, Plus } from "lucide-react";
import { type UserIdentity, useGetIdentity } from "ra-core";

export function ProjectButton(props: ButtonProps) {
  const { data, isLoading } = useGetIdentity();

  if (isLoading) {
    return (
      <Button
        {...props}
        hoverScale={1.02}
        variant="ghost"
        className={cn("cursor-pointer py-0 px-1", props.className)}
      >
        <div className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground flex items-center gap-1">
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium min-w-10"></span>
          </div>
          <ChevronsUpDown className="ml-auto size-4 text-muted-foreground" />
        </div>
      </Button>
    );
  }

  return (
    <Button
      {...props}
      hoverScale={1.02}
      variant="ghost"
      className={cn("cursor-pointer py-0 pl-2 pr-1", props.className)}
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

export function ProjectDropdown({
  children,
}: {
  children?:
    | React.ReactNode
    | (({ user }: { user: UserIdentity | undefined }) => React.ReactNode);
}) {
  const { data, isLoading } = useGetIdentity();

  function renderChildren() {
    if (typeof children === "function") {
      return children({ user: data });
    }
    return children;
  }

  if (isLoading) {
    return renderChildren();
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{renderChildren()}</DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
        side="bottom"
        align="start"
        sideOffset={4}
      >
        <DropdownMenuLabel className="text-xs text-muted-foreground pl-8">
          PROJECTS
        </DropdownMenuLabel>
        <DropdownMenuGroup>
          {new Array(2).fill(0).map((_, index) => (
            <DropdownMenuItem>
              {index === 0 ? <Check /> : <div className="w-4" />}
              <span>Project {index + 1}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Plus />
          <span>Create Project</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <SettingsOutline />
          <span>Manage Projects</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
