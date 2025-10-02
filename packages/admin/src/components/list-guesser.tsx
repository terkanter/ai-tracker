import { ArrayField } from "@workspace/admin/array-field";
import { BadgeField } from "@workspace/admin/badge-field";
import { DataTable } from "@workspace/admin/data-table";
import type { ListProps, ListViewProps } from "@workspace/admin/list";
import { ListView } from "@workspace/admin/list";
import { ReferenceArrayField } from "@workspace/admin/reference-array-field";
import { ReferenceField } from "@workspace/admin/reference-field";
import { SingleFieldList } from "@workspace/admin/single-field-list";
import type { RaRecord } from "ra-core";
import {
  getElementsFromRecords,
  InferredElement,
  ListBase,
  useListContext,
  usePrevious,
  useResourceContext,
} from "ra-core";
import * as React from "react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";

export function ListGuesser<RecordType extends RaRecord = RaRecord>(
  props: Omit<ListProps, "children"> & { enableLog?: boolean },
) {
  const {
    debounce,
    disableAuthentication,
    disableSyncWithLocation,
    exporter = false,
    filter,
    filterDefaultValues,
    perPage,
    resource,
    sort,
    ...rest
  } = props;

  // force a rerender of this component when any list parameter changes
  // otherwise the ListBase won't be rerendered when the sort changes
  // and the following check won't be performed
  useLocation();
  // keep previous data, unless the resource changes
  const resourceFromContext = useResourceContext(props);
  const previousResource = usePrevious(resourceFromContext);
  const keepPreviousData = previousResource === resourceFromContext;

  return (
    <ListBase<RecordType>
      debounce={debounce}
      disableAuthentication={disableAuthentication}
      disableSyncWithLocation={disableSyncWithLocation}
      exporter={exporter}
      filter={filter}
      filterDefaultValues={filterDefaultValues}
      perPage={perPage}
      queryOptions={{
        placeholderData: (previousData) =>
          keepPreviousData ? previousData : undefined,
      }}
      resource={resource}
      sort={sort}
    >
      <ListViewGuesser {...rest} />
    </ListBase>
  );
}

function ListViewGuesser(
  props: Omit<ListViewProps, "children"> & { enableLog?: boolean },
) {
  const { data } = useListContext();
  const resource = useResourceContext();
  const [child, setChild] = useState<React.ReactElement | null>(null);
  const { enableLog = process.env.NODE_ENV === "development", ...rest } = props;

  useEffect(() => {
    setChild(null);
  }, [resource]);

  useEffect(() => {
    if (data && data.length > 0 && !child) {
      const inferredElements = getElementsFromRecords(data, listFieldTypes);
      const inferredChild = new InferredElement(
        listFieldTypes.table,
        null,
        inferredElements,
      );
      const inferredChildElement = inferredChild.getElement();
      const representation = inferredChild.getRepresentation();

      if (!resource) {
        throw new Error(
          "Cannot use <ListGuesser> outside of a ResourceContext",
        );
      }

      if (!inferredChildElement || !representation) {
        return;
      }

      setChild(inferredChildElement);

      const _components = ["List"]
        .concat(
          Array.from(
            new Set(
              Array.from(representation.matchAll(/<([^\s./>\\]+)/g))
                .map((match) => match[1])
                .filter((component) => component !== "span"),
            ),
          ),
        )
        .sort();

      if (enableLog) {
      }
    }
  }, [data, child, resource, enableLog]);

  return <ListView {...rest}>{child}</ListView>;
}

const listFieldTypes = {
  table: {
    component: (props: any) => {
      return <DataTable {...props} />;
    },
    representation: (
      _props: any,
      children: { getRepresentation: () => string }[],
    ) =>
      `        <DataTable>
${children.map((child) => `            ${child.getRepresentation()}`).join("\n")}
        </DataTable>`,
  },

  reference: {
    component: (props: any) => (
      <DataTable.Col source={props.source}>
        <ReferenceField reference={props.reference} source={props.source} />
      </DataTable.Col>
    ),
    representation: (props: any) =>
      `<DataTable.Col source="${props.source}">
                <ReferenceField source="${props.source}" reference="${props.reference}" />
            </DataTable.Col>`,
  },
  array: {
    component: ({ children, ...props }: any) => {
      const childrenArray = React.Children.toArray(children);

      return (
        <DataTable.Col source={props.source}>
          <ArrayField source={props.source}>
            <SingleFieldList>
              <BadgeField
                source={
                  childrenArray.length > 0 &&
                  React.isValidElement(childrenArray[0]) &&
                  (childrenArray[0].props as any).source
                }
              />
            </SingleFieldList>
          </ArrayField>
        </DataTable.Col>
      );
    },
    representation: (props: any, children: any) =>
      `<DataTable.Col source="${props.source}">
               <ArrayField source="${props.source}">
                    <SingleFieldList>
                        <BadgeField source="${
                          children.length > 0 && children[0].getProps().source
                        }" />
                   </SingleFieldList>
                </ArrayField>
            </DataTable.Col>`,
  },
  referenceArray: {
    component: (props: any) => (
      <DataTable.Col {...props}>
        <ReferenceArrayField {...props} />
      </DataTable.Col>
    ),
    representation: (props: any) =>
      `<DataTable.Col source="${props.source}">
                <ReferenceArrayField source="${props.source}" reference="${props.reference}" />
            </DataTable.Col>`,
  },
  string: {
    component: DataTable.Col,
    representation: (props: any) =>
      `<DataTable.Col source="${props.source}" />`,
  },
};

const _kebabCase = (name: string) => {
  return name
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/([A-Z])([A-Z][a-z])/g, "$1-$2")
    .toLowerCase();
};
