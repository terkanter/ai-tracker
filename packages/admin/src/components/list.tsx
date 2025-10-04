import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbPage,
} from "@workspace/admin/breadcrumb";
import { CreateButton } from "@workspace/admin/create-button";
import { FilterForm } from "@workspace/admin/filter-form";
import type { FilterElementProps } from "@workspace/admin/hooks/filter-context";
import { FilterContext } from "@workspace/admin/hooks/filter-context";
import { cn } from "@workspace/admin/lib/utils";
import { ListPagination } from "@workspace/admin/list-pagination";
import type { ListBaseProps, RaRecord } from "ra-core";
import {
  ListBase,
  type ListControllerResult,
  Translate,
  useGetResourceLabel,
  useHasDashboard,
  useResourceContext,
  useResourceDefinition,
  useTranslate,
} from "ra-core";
import type { ReactElement, ReactNode } from "react";
import { Link } from "react-router";
import { ResourceHeader } from "./resource-header";

export function List<RecordType extends RaRecord = RaRecord>(
  props: ListProps<RecordType>,
) {
  const {
    debounce,
    disableAuthentication,
    disableSyncWithLocation,
    exporter,
    filter,
    filterDefaultValues,
    loading,
    perPage,
    queryOptions,
    resource,
    sort,
    storeKey,
    ...rest
  } = props;

  return (
    <ListBase<RecordType>
      debounce={debounce}
      disableAuthentication={disableAuthentication}
      disableSyncWithLocation={disableSyncWithLocation}
      exporter={exporter}
      filter={filter}
      filterDefaultValues={filterDefaultValues}
      loading={loading}
      perPage={perPage}
      queryOptions={queryOptions}
      resource={resource}
      sort={sort}
      storeKey={storeKey}
    >
      <ListView<RecordType> {...rest} />
    </ListBase>
  );
}

export interface ListProps<RecordType extends RaRecord = RaRecord>
  extends ListBaseProps<RecordType>,
    ListViewProps<RecordType> {}

export function ListView<RecordType extends RaRecord = RaRecord>(
  props: ListViewProps<RecordType>,
) {
  const {
    filters,
    pagination = defaultPagination,
    title,
    children,
    actions,
  } = props;
  const translate = useTranslate();
  const resource = useResourceContext();

  if (!resource) {
    throw new Error(
      "The ListView component must be used within a ResourceContextProvider",
    );
  }

  const getResourceLabel = useGetResourceLabel();
  const resourceLabel = getResourceLabel(resource, 2);
  const finalTitle =
    title !== undefined
      ? title
      : translate("ra.page.list", {
          name: resourceLabel,
        });
  const { hasCreate } = useResourceDefinition({ resource });
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
        <BreadcrumbPage>{resourceLabel}</BreadcrumbPage>
      </Breadcrumb>

      <FilterContext.Provider value={filters}>
        <ResourceHeader
          title={finalTitle}
          actions={
            actions ?? (
              <>
                {hasCreate ? <CreateButton /> : null}
                {/* <ExportButton /> */}
              </>
            )
          }
        />
        <FilterForm />

        <div className={cn("my-2", props.className)}>{children}</div>
        {pagination}
      </FilterContext.Provider>
    </>
  );
}

const defaultPagination = <ListPagination />;

export interface ListViewProps<RecordType extends RaRecord = RaRecord> {
  children?: ReactNode;
  render?: (props: ListControllerResult<RecordType, Error>) => ReactNode;
  actions?: ReactElement | false;
  filters?: ReactElement<FilterElementProps>[];
  pagination?: ReactNode;
  title?: ReactNode | string | false;
  className?: string;
}

export type FiltersType =
  | ReactElement<FilterElementProps>
  | ReactElement<FilterElementProps>[];
