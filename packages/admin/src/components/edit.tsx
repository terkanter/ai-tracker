import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbPage,
} from "@workspace/admin/breadcrumb";
import { ShowButton } from "@workspace/admin/show-button";
import { cn } from "@workspace/ui/lib/utils";
import type { EditBaseProps } from "ra-core";
import {
  EditBase,
  Translate,
  useCreatePath,
  useEditContext,
  useGetRecordRepresentation,
  useGetResourceLabel,
  useHasDashboard,
  useResourceContext,
  useResourceDefinition,
} from "ra-core";
import type { ReactNode } from "react";
import { Link } from "react-router";
import { DeleteButton } from "./delete-button";

export interface EditProps extends EditViewProps, EditBaseProps {}

export function Edit({
  title,
  children,
  actions,
  className,
  ...rest
}: EditProps) {
  return (
    <EditBase {...rest}>
      <EditView actions={actions} className={className} title={title}>
        {children}
      </EditView>
    </EditBase>
  );
}

export interface EditViewProps {
  title?: ReactNode | string | false;
  actions?: ReactNode;
  children?: ReactNode;
  className?: string;
}

export function EditView({
  title,
  actions,
  className,
  children,
}: EditViewProps) {
  const context = useEditContext();

  const resource = useResourceContext();

  if (!resource) {
    throw new Error(
      "The EditView component must be used within a ResourceContextProvider",
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

  const { hasShow } = useResourceDefinition({ resource });
  const hasDashboard = useHasDashboard();

  if (context.isLoading || !context.record) {
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
      <div
        className={cn(
          "my-2 flex flex-wrap items-start justify-between gap-2",
          className,
        )}
      >
        <h2 className="text-2xl font-bold tracking-tight">
          {title !== undefined ? title : context.defaultTitle}
        </h2>
        {actions ?? (
          <div className="flex items-center justify-end gap-2">
            {hasShow ? <ShowButton /> : null}
            <DeleteButton />
          </div>
        )}
      </div>
      <div className="my-2">{children}</div>
    </>
  );
}
