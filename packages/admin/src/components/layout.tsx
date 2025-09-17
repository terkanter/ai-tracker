import { AppSidebar } from "@workspace/admin/app-sidebar";
import { LocalesMenuButton } from "@workspace/admin/locales-menu-button";
import { Notification } from "@workspace/admin/notification";
import { RefreshButton } from "@workspace/admin/refresh-button";
import { ThemeModeToggle } from "@workspace/admin/theme-mode-toggle";
import { UserMenu } from "@workspace/admin/user-menu";
import { cn } from "@workspace/ui/lib/utils";
import { SidebarProvider, SidebarTrigger } from "@workspace/ui/sidebar";
import type { CoreLayoutProps } from "ra-core";

export function Layout(props: CoreLayoutProps) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main
        className={cn(
          "ml-auto w-full max-w-full",
          "peer-data-[state=collapsed]:w-[calc(100%-var(--sidebar-width-icon)-1rem)]",
          "peer-data-[state=expanded]:w-[calc(100%-var(--sidebar-width))]",
          "sm:transition-[width] sm:duration-200 sm:ease-linear",
          "flex h-svh flex-col",
          "group-data-[scroll-locked=1]/body:h-full",
          "has-[main.fixed-main]:group-data-[scroll-locked=1]/body:h-svh",
        )}
      >
        <header className="flex h-16 shrink-0 items-center gap-2 px-4 md:h-12">
          <SidebarTrigger className="scale-125 sm:scale-100" />
          <div className="flex flex-1 items-center" id="breadcrumb" />
          <LocalesMenuButton />
          <ThemeModeToggle />
          <RefreshButton />
          <UserMenu />
        </header>
        <div className="flex flex-1 flex-col px-4">{props.children}</div>
      </main>
      <Notification />
    </SidebarProvider>
  );
}
