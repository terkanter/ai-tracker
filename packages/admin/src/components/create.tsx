import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbPage,
} from "@workspace/admin/breadcrumb";
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
import { ResourceHeader } from "./resource-header";

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
      <ResourceHeader
        title={title !== undefined ? title : context.defaultTitle}
        actions={actions}
      />
      <div className="my-2">{children}</div>
    </>
  );
}
