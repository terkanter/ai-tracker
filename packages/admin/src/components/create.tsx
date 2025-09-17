import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbPage,
} from "@workspace/admin/breadcrumb";
import { cn } from "@workspace/ui/lib/utils";
import {
  CreateBase,
  type CreateBaseProps,
  Translate,
  useCreateContext,
  useCreatePath,
  useGetResourceLabel,
  useHasDashboard,
  useResourceContext,
} from "ra-core";
import type { ReactNode } from "react";
import { Link } from "react-router";

export type CreateProps = CreateViewProps & CreateBaseProps;

export function Create({
  title,
  children,
  actions,
  className,
  ...rest
}: CreateProps) {
  return (
    <CreateBase {...rest}>
      <CreateView actions={actions} className={className} title={title}>
        {children}
      </CreateView>
    </CreateBase>
  );
}

export type CreateViewProps = {
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
  title?: ReactNode | string | false;
};

export function CreateView({
  actions,
  title,
  children,
  className,
}: CreateViewProps) {
  const context = useCreateContext();

  const resource = useResourceContext();

  if (!resource) {
    throw new Error(
      "The CreateView component must be used within a ResourceContextProvider",
    );
  }

  const getResourceLabel = useGetResourceLabel();
  const listLabel = getResourceLabel(resource, 2);
  const createPath = useCreatePath();
  const listLink = createPath({
    resource,
    type: "list",
  });
  const hasDashboard = useHasDashboard();

  return (
    <>
      <Breadcrumb>
        {hasDashboard ? (
          <BreadcrumbItem>
            <Link to="/">
              <Translate i18nKey="ra.page.dashboard">Home</Translate>
            </Link>
          </BreadcrumbItem>
        ) : null}
        <BreadcrumbItem>
          <Link to={listLink}>{listLabel}</Link>
        </BreadcrumbItem>
        <BreadcrumbPage>
          <Translate i18nKey="ra.action.create">Create</Translate>
        </BreadcrumbPage>
      </Breadcrumb>
      <div
        className={cn(
          "my-2 flex flex-wrap items-start justify-between gap-2",
          className,
        )}
      >
        <h2 className="text-2xl font-bold tracking-tight">
          {title !== undefined ? title : context.defaultTitle}
        </h2>
        {actions}
      </div>
      <div className="my-2">{children}</div>
    </>
  );
}
