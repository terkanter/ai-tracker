"use client";
import { LocalesMenuButton } from "@workspace/admin/locales-menu-button";
import { ThemeModeToggle } from "@workspace/admin/theme-mode-toggle";
import { Separator } from "@workspace/ui/separator";
import { Settings } from "lucide-react";
//
import {
  AccountButton,
  AccountDropdown,
} from "@/widgets/account/account-dropdown";
import {
  OrganizationButton,
  OrganizationDropdown,
} from "@/widgets/organization/organization-dropdown";
import {
  ProjectButton,
  ProjectDropdown,
} from "@/widgets/project/project-dropdown";

export function AppHeader() {
  return (
    <header className="bg-background z-50 flex w-full items-center border-b">
      <div className="flex h-(--header-height) w-full items-center gap-2 px-4">
        <div className="flex items-center gap-4">
          <OrganizationDropdown>
            <OrganizationButton />
          </OrganizationDropdown>
          <Separator orientation="vertical" className="h-4!" />
          <ProjectDropdown>
            <ProjectButton />
          </ProjectDropdown>
        </div>
        <div className="flex items-center gap-4 ml-auto">
          <LocalesMenuButton />
          <ThemeModeToggle />
          <Settings className="size-5" />
          <AccountDropdown>
            <AccountButton />
          </AccountDropdown>
        </div>
      </div>
    </header>
  );
}
