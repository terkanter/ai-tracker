import { UserMenuContext } from "@workspace/admin/hooks/user-menu-context";
import { Avatar, AvatarFallback, AvatarImage } from "@workspace/ui/avatar";
import { Button } from "@workspace/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@workspace/ui/dropdown-menu";
import { LogOut } from "lucide-react";
import { Translate, useAuthProvider, useGetIdentity, useLogout } from "ra-core";
import { Children, useCallback, useState } from "react";

export type UserMenuProps = {
  children?: React.ReactNode;
};

export function UserMenu({ children }: UserMenuProps) {
  const authProvider = useAuthProvider();
  const { data: identity } = useGetIdentity();
  const logout = useLogout();

  const [open, setOpen] = useState(false);

  const handleToggleOpen = useCallback(() => {
    setOpen((prevOpen) => !prevOpen);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  if (!authProvider) return null;

  return (
    <UserMenuContext.Provider value={{ onClose: handleClose }}>
      <DropdownMenu open={open} onOpenChange={handleToggleOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            className="relative ml-2 h-8 w-8 rounded-full"
            variant="ghost"
          >
            <Avatar className="h-8 w-8">
              <AvatarImage role="presentation" src={identity?.avatar} />
              <AvatarFallback>{identity?.fullName?.charAt(0)}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent forceMount align="end" className="w-56">
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm leading-none font-medium">
                {identity?.fullName}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {children}
          {Children.count(children) > 0 && <DropdownMenuSeparator />}
          <DropdownMenuItem className="cursor-pointer" onClick={() => logout()}>
            <LogOut />
            <Translate i18nKey="ra.auth.logout">Log out</Translate>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </UserMenuContext.Provider>
  );
}
