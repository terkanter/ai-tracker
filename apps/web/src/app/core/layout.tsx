import { Notification } from "@workspace/admin/notification";
import { cn } from "@workspace/ui/lib/utils";
import { SidebarProvider } from "@workspace/ui/sidebar";
import type { CoreLayoutProps } from "ra-core";
import { AppHeader } from "./header";
import { AppSidebar } from "./sidebar";

export function Layout(props: CoreLayoutProps) {
  return (
    <div className="[--header-height:calc(--spacing(14))]">
      <SidebarProvider className="flex flex-col">
        <AppHeader />
        <div className="flex flex-1">
          <AppSidebar />
          <main
            className={cn(
              "ml-auto w-full max-w-full",
              "peer-data-[state=collapsed]:w-[calc(100%-var(--sidebar-width-icon)-1rem)]",
              "peer-data-[state=expanded]:w-[calc(100%-var(--sidebar-width))]",
              "sm:transition-[width] sm:duration-200 sm:ease-linear",
              "flex h-100svh flex-col",
              "group-data-[scroll-locked=1]/body:h-full",
              "has-[main.fixed-main]:group-data-[scroll-locked=1]/body:h-svh",
              // "dark:bg-[#111113]",
            )}
          >
            <div className="flex flex-1 flex-col px-6 py-2">
              {props.children}
            </div>
          </main>
        </div>
        <Notification />
      </SidebarProvider>
    </div>
  );
}
