import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbPage,
} from "@workspace/admin/breadcrumb";
import { EditButton } from "@workspace/admin/edit-button";
import {
  ShowBase,
  type ShowBaseProps,
  Translate,
  useCreatePath,
  useGetRecordRepresentation,
  useGetResourceLabel,
  useHasDashboard,
  useResourceContext,
  useResourceDefinition,
  useShowContext,
} from "ra-core";
import type { ReactNode } from "react";
import { Link } from "react-router";
import { ResourceHeader } from "./resource-header";

export interface ShowProps
  extends ShowViewProps,
    Omit<ShowBaseProps, "children"> {}

export function Show({
  disableAuthentication,
  id,
  queryOptions,
  resource,
  actions,
  title,
  children,
  className,
  render,
  loading,
}: ShowProps) {
  return (
    <ShowBase
      disableAuthentication={disableAuthentication}
      id={id}
      loading={loading}
      queryOptions={queryOptions}
      render={render}
      resource={resource}
    >
      <ShowView actions={actions} className={className} title={title}>
        {children}
      </ShowView>
    </ShowBase>
  );
}

export interface ShowViewProps {
  actions?: ReactNode;
  title?: ReactNode | string | false;
  children: ReactNode;
  className?: string;
  emptyWhileLoading?: boolean;
}

export function ShowView({
  actions,
  title,
  children,
  className,
  emptyWhileLoading,
}: ShowViewProps) {
  const context = useShowContext();

  const resource = useResourceContext();

  if (!resource) {
    throw new Error(
      "The ShowView component must be used within a ResourceContextProvider",
    );
  }

  const getResourceLabel = useGetResourceLabel();
  const listLabel = getResourceLabel(resource, 2);
  const createPath = useCreatePath();
  const listLink = createPath({
    resource,
    type: "list",
  });

  const getRecordRepresentation = useGetRecordRepresentation(resource);
  const recordRepresentation = getRecordRepresentation(context.record);

  const { hasEdit } = useResourceDefinition({ resource });
  const hasDashboard = useHasDashboard();

  if (context.isLoading || !context.record) {
    return null;
  }

  if (!context.record && emptyWhileLoading) {
    return null;
  }

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
        <BreadcrumbPage>{recordRepresentation}</BreadcrumbPage>
      </Breadcrumb>
      <ResourceHeader
        title={title !== undefined ? title : context.defaultTitle}
        actions={actions ?? <>{hasEdit ? <EditButton /> : null}</>}
      />
      <div className="my-2">{children}</div>
    </>
  );
}
