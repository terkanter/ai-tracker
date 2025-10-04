"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@workspace/ui/avatar";
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
import { BadgeCheck, Bell, CreditCard, LogOut, Sparkles } from "lucide-react";
import {
  Translate,
  type UserIdentity,
  useGetIdentity,
  useLogout,
} from "ra-core";

export function AccountButton(props: ButtonProps) {
  const { data, isLoading } = useGetIdentity();

  if (isLoading) {
    return (
      <Avatar className="h-8 w-8 rounded-sm">
        <AvatarFallback className="rounded-lg">U</AvatarFallback>
      </Avatar>
    );
  }

  return (
    <Button
      {...props}
      size="icon"
      variant="ghost"
      className={cn(
        "cursor-pointer p-0 data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground rounded-md",
        props.className,
      )}
    >
      <Avatar className={cn("h-8 w-8 rounded-md")}>
        <AvatarImage src={data?.avatar} alt={data?.fullName} />
        <AvatarFallback className="rounded-sm">
          {data?.fullName?.charAt(0)}
        </AvatarFallback>
      </Avatar>
    </Button>
  );
}

export function AccountDropdown({
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
        align="end"
        sideOffset={4}
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <Avatar className="h-8 w-8 rounded-lg">
              <AvatarImage src={data?.avatar} alt={data?.fullName} />
              <AvatarFallback className="rounded-lg">CN</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">{data?.fullName}</span>
              <span className="truncate text-xs">{data?.email}</span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Sparkles />
            <Translate i18nKey="ra.auth.upgrade">Upgrade to Pro</Translate>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <BadgeCheck />
            <Translate i18nKey="ra.auth.account">Account</Translate>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CreditCard />
            <Translate i18nKey="ra.auth.billing">Billing</Translate>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Bell />
            <Translate i18nKey="ra.auth.notifications">Notifications</Translate>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout}>
          <LogOut />
          <Translate i18nKey="ra.auth.logout">Log out</Translate>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
