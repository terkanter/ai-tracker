import { Notification } from "@workspace/admin/notification";
import { cn } from "@workspace/ui/lib/utils";
import { SidebarProvider } from "@workspace/ui/sidebar";
import type { CoreLayoutProps } from "ra-core";
import { AppHeader } from "./header";
import { AppSidebar } from "./sidebar";

export function Layout(props: CoreLayoutProps) {
  return (
    <div className="[--header-height:calc(--spacing(14))] bg-[#fff] max-h-[100vh] overflow-hidden">
      <SidebarProvider className="flex flex-col">
        <AppHeader />
        <div className="flex flex-1">
          <AppSidebar />
          <main
            className={cn(
              "ml-auto w-full max-w-full",
              "peer-data-[state=collapsed]:w-[calc(100%-var(--sidebar-width-icon)-1rem)]",
              "peer-data-[state=expanded]:w-[calc(100%-var(--sidebar-width))]",
              // "peer-data-[state=collapsed]:w-[calc(100%-var(--sidebar-width-icon)-2rem)]",
              // "peer-data-[state=expanded]:w-[calc(100%-var(--sidebar-width)-2rem)]",
              "sm:transition-[width] sm:duration-200 sm:ease-linear",
              "flex h-100svh flex-col",
              "group-data-[scroll-locked=1]/body:h-full",
              "has-[main.fixed-main]:group-data-[scroll-locked=1]/body:h-svh",
              "pr-3 pb-3",
              "flex flex-col",
              // "m-4 ml-2 mr-0",
              // "dark:bg-[#111113] rounded-lg",
            )}
          >
            <div
              className={cn(
                "flex flex-1 flex-col px-6 pt-2 pb-6",
                "bg-white dark:bg-[#161616] rounded-lg border dark:border-none",
                "overflow-y-auto h-full max-h-[calc(100vh-var(--header-height)-2rem)]",
                // "border rounded-lg",
              )}
            >
              {props.children}
            </div>
          </main>
        </div>
        <Notification />
      </SidebarProvider>
    </div>
  );
}
