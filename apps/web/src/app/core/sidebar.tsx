import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@workspace/ui/sidebar";
import { Skeleton } from "@workspace/ui/skeleton";
import { House, List } from "lucide-react";
import {
  useCanAccess,
  useCreatePath,
  useGetResourceLabel,
  useHasDashboard,
  useResourceDefinitions,
  useTranslate,
} from "ra-core";
import { createElement } from "react";
import { Link, useMatch } from "react-router";

export function AppSidebar() {
  const hasDashboard = useHasDashboard();
  const resources = useResourceDefinitions();
  const { openMobile, setOpenMobile } = useSidebar();
  const handleClick = () => {
    if (openMobile) {
      setOpenMobile(false);
    }
  };

  return (
    <Sidebar
      collapsible="icon"
      className="top-(--header-height) h-[calc(100svh-var(--header-height))]!"
    >
      {/* <SidebarHeader /> */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {hasDashboard ? (
                <DashboardMenuItem onClick={handleClick} />
              ) : null}
              {Object.keys(resources)
                .filter((name) => resources[name].hasList)
                .map((name) => (
                  <ResourceMenuItem
                    key={name}
                    name={name}
                    onClick={handleClick}
                  />
                ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarTrigger className="scale-125 sm:scale-100" />
      </SidebarFooter>
    </Sidebar>
  );
}

export function DashboardMenuItem({ onClick }: { onClick?: () => void }) {
  const translate = useTranslate();
  const label = translate("ra.page.dashboard", {
    _: "Dashboard",
  });
  const match = useMatch({ path: "/", end: true });

  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild isActive={!!match}>
        <Link to="/" onClick={onClick}>
          <House />
          {label}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

export function ResourceMenuItem({
  name,
  onClick,
}: {
  name: string;
  onClick?: () => void;
}) {
  const { canAccess, isPending } = useCanAccess({
    resource: name,
    action: "list",
  });
  const resources = useResourceDefinitions();
  const getResourceLabel = useGetResourceLabel();
  const createPath = useCreatePath();
  const to = createPath({
    resource: name,
    type: "list",
  });
  const match = useMatch({ path: to, end: false });

  if (isPending) {
    return <Skeleton className="h-8 w-full" />;
  }

  if (!resources || !resources[name] || !canAccess) return null;

  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild isActive={!!match}>
        <Link state={{ _scrollToTop: true }} to={to} onClick={onClick}>
          {resources[name].icon ? (
            createElement(resources[name].icon)
          ) : (
            <List />
          )}
          {getResourceLabel(name, 2)}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
