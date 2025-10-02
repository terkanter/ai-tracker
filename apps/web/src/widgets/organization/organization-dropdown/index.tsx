"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@workspace/ui/avatar";
import { Button, type ButtonProps } from "@workspace/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@workspace/ui/dropdown-menu";
import { cn } from "@workspace/ui/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { type UserIdentity, useGetIdentity, useLogout } from "ra-core";

export function OrganizationButton(props: ButtonProps) {
  const { data, isLoading } = useGetIdentity();

  if (isLoading) {
    return (
      <Button
        {...props}
        variant="ghost"
        className={cn("cursor-pointer py-0 px-1", props.className)}
      >
        <div className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground flex items-center gap-1">
          <Avatar className="h-6 w-6 rounded-lg ">
            <AvatarFallback className="rounded-lg bg-foreground text-background"></AvatarFallback>
          </Avatar>
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
      variant="ghost"
      className={cn("cursor-pointer py-0 px-1", props.className)}
    >
      <div className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground flex items-center gap-1">
        <Avatar className="h-6 w-6 rounded-lg">
          <AvatarImage src={data?.avatar} alt={data?.name} />
          <AvatarFallback className="rounded-lg bg-foreground text-background">
            O
          </AvatarFallback>
        </Avatar>
        <div className="grid flex-1 text-left text-sm leading-tight">
          <span className="truncate font-medium">Organization</span>
        </div>
        <ChevronsUpDown className="ml-auto size-4 text-muted-foreground" />
      </div>
    </Button>
  );
}

export function OrganizationDropdown({
  children,
}: {
  children?:
    | React.ReactNode
    | (({ user }: { user: UserIdentity | undefined }) => React.ReactNode);
}) {
  const { data, isLoading } = useGetIdentity();
  const logout = useLogout();

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
          ORGANIZATIONS
        </DropdownMenuLabel>
        <DropdownMenuGroup>
          {new Array(2).fill(0).map((_, index) => (
            <DropdownMenuItem>
              {index === 0 ? <Check /> : <div className="w-4" />}
              <span>Organization {index + 1}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
