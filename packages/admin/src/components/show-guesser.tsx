import { ArrayField } from "@workspace/admin/array-field";
import { BadgeField } from "@workspace/admin/badge-field";
import { NumberField } from "@workspace/admin/number-field";
import { RecordField } from "@workspace/admin/record-field";
import { ReferenceArrayField } from "@workspace/admin/reference-array-field";
import { ReferenceField } from "@workspace/admin/reference-field";
import { ShowView } from "@workspace/admin/show";
import { SingleFieldList } from "@workspace/admin/single-field-list";
import type { InferredTypeMap } from "ra-core";
import {
  getElementsFromRecords,
  InferredElement,
  ShowBase,
  useResourceContext,
  useShowContext,
} from "ra-core";
import type { ReactNode } from "react";
import { Children, isValidElement, useEffect, useState } from "react";
import { DateField } from "./date-field";

export function ShowGuesser(props: { enableLog?: boolean }) {
  return (
    <ShowBase>
      <ShowViewGuesser {...props} />
    </ShowBase>
  );
}

function ShowViewGuesser(props: { enableLog?: boolean }) {
  const resource = useResourceContext();

  if (!resource) {
    throw new Error(`Cannot use <ShowGuesser> outside of a ResourceContext`);
  }

  const { record } = useShowContext();
  const [child, setChild] = useState<ReactNode>(null);
  const { enableLog = process.env.NODE_ENV === "development", ...rest } = props;

  useEffect(() => {
    setChild(null);
  }, [resource]);

  useEffect(() => {
    if (record && !child) {
      const inferredElements = getElementsFromRecords([record], showFieldTypes);
      const inferredChild = new InferredElement(
        showFieldTypes.show,
        null,
        inferredElements,
      );

      setChild(inferredChild.getElement());

      if (!enableLog) return;

      const representation = inferredChild.getRepresentation();
      const _components = ["Show"]
        .concat(
          Array.from(
            new Set(
              Array.from(representation.matchAll(/<([^\s/>]+)/g))
                .map((match) => match[1])
                .filter(
                  (component) => component !== "span" && component !== "div",
                ),
            ),
          ),
        )
        .sort();
    }
  }, [record, child, resource, enableLog]);

  return <ShowView {...rest}>{child}</ShowView>;
}

const showFieldTypes: InferredTypeMap = {
  show: {
    component: (props: any) => (
      <div className="flex flex-col gap-4">{props.children}</div>
    ),
    representation: (
      _props: any,
      children: { getRepresentation: () => string }[],
    ) => `        <div className="flex flex-col gap-4">
${children.map((child) => `            ${child.getRepresentation()}`).join("\n")}
        </div>`,
  },
  reference: {
    component: (props: any) => (
      <RecordField source={props.source}>
        <ReferenceField reference={props.reference} source={props.source} />
      </RecordField>
    ),
    representation: (props: any) =>
      `<RecordField source="${props.source}">
                <ReferenceField source="${props.source}" reference="${props.reference}" />
            </RecordField>`,
  },
  array: {
    component: ({ children, ...props }: any) => {
      const childrenArray = Children.toArray(children);

      return (
        <RecordField source={props.source}>
          <ArrayField source={props.source}>
            <SingleFieldList>
              <BadgeField
                source={
                  childrenArray.length > 0 &&
                  isValidElement(childrenArray[0]) &&
                  (childrenArray[0].props as any).source
                }
              />
            </SingleFieldList>
          </ArrayField>
        </RecordField>
      );
    },
    representation: (props: any, children: any) =>
      `<RecordField source="${props.source}">
                <ArrayField source="${props.source}">
                    <SingleFieldList>
                        <BadgeField source="${
                          children.length > 0 && children[0].getProps().source
                        }" />
                    </SingleFieldList>
                </ArrayField>
            </RecordField>`,
  },
  referenceArray: {
    component: (props: any) => (
      <RecordField source={props.source}>
        <ReferenceArrayField {...props} />
      </RecordField>
    ),
    representation: (props: any) =>
      `<RecordField source="${props.source}">
                <ReferenceArrayField source="${props.source}" reference="${props.reference}" />
            </RecordField>`,
  },
  boolean: {
    component: (props: any) => (
      <RecordField
        render={(record) => (record[props.source] ? "Yes" : "No")}
        source={props.source}
      />
    ),
    representation: (props: any) =>
      `<RecordField source="${props.source}" render={record => record[${props.source}] ? 'Yes' : 'No'} />`,
  },
  date: {
    component: (props: any) => (
      <RecordField source={props.source}>
        <DateField source={props.source} />
      </RecordField>
    ),
    representation: (props: any) =>
      `<RecordField source="${props.source}">
                <DateField source="${props.source}" />
            </RecordField>`,
  },
  number: {
    component: (props: any) => (
      <RecordField source={props.source}>
        <NumberField source={props.source} />
      </RecordField>
    ),
    representation: (props: any) =>
      `<RecordField source="${props.source}">
                <NumberField source="${props.source}" />
            </RecordField>`,
  },
  string: {
    component: (props: any) => <RecordField source={props.source} />,
    representation: (props: any) => `<RecordField source="${props.source}" />`,
  },
};

const _kebabCase = (name: string) => {
  return name
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/([A-Z])([A-Z][a-z])/g, "$1-$2")
    .toLowerCase();
};
