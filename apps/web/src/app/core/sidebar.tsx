import { HomeOutline } from "@workspace/icons/solar";
import { Button } from "@workspace/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/ui/card";
import {
  Sidebar,
  SidebarContent,
  SidebarFeature,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@workspace/ui/sidebar";
import { Skeleton } from "@workspace/ui/skeleton";
import { List } from "lucide-react";
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
      variant="inset"
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
              <SidebarGroupLabel>Resources</SidebarGroupLabel>
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
        <SidebarFeature className="flex-1 pb-2">
          <Card className="w-full dark:bg-transparent">
            <CardHeader>
              <CardTitle>Upgrade to Pro</CardTitle>
              <CardDescription className="text-xs text-muted-foreground">
                Upgrade to Pro to get more features
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button size="sm" color="primary">
                Upgrade to Pro
              </Button>
            </CardFooter>
          </Card>
        </SidebarFeature>
        <SidebarTrigger className="" />
      </SidebarFooter>
    </Sidebar>
  );
}

export function DashboardMenuItem({ onClick }: { onClick?: () => void }) {
  const translate = useTranslate();
  const label = translate("ra.page.overview", {
    _: "Overview",
  });
  const match = useMatch({ path: "/", end: true });

  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild isActive={!!match}>
        <Link to="/" onClick={onClick}>
          <HomeOutline />
          {/* <ChartSquareOutline /> */}
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
