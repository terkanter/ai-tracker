import { AutocompleteInput } from "@workspace/admin/autocomplete-input";
import { BooleanInput } from "@workspace/admin/boolean-input";
import { EditView } from "@workspace/admin/edit";
import { ReferenceArrayInput } from "@workspace/admin/reference-array-input";
import { ReferenceInput } from "@workspace/admin/reference-input";
import { SimpleForm } from "@workspace/admin/simple-form";
import { TextInput } from "@workspace/admin/text-input";
import type { InferredTypeMap } from "ra-core";
import {
  EditBase,
  getElementsFromRecords,
  InferredElement,
  useEditContext,
  useResourceContext,
} from "ra-core";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";

export function EditGuesser(props: { enableLog?: boolean }) {
  return (
    <EditBase>
      <EditViewGuesser {...props} />
    </EditBase>
  );
}

function EditViewGuesser(props: { enableLog?: boolean }) {
  const resource = useResourceContext();

  if (!resource) {
    throw new Error(`Cannot use <EditGuesser> outside of a ResourceContext`);
  }

  const { record } = useEditContext();
  const [child, setChild] = useState<ReactNode>(null);
  const { enableLog = process.env.NODE_ENV === "development", ...rest } = props;

  useEffect(() => {
    setChild(null);
  }, [resource]);

  useEffect(() => {
    if (record && !child) {
      const inferredElements = getElementsFromRecords([record], editFieldTypes);
      const inferredChild = new InferredElement(
        editFieldTypes.form,
        null,
        inferredElements,
      );

      setChild(inferredChild.getElement());

      if (!enableLog) return;

      const representation = inferredChild.getRepresentation();

      const _components = ["Edit"]
        .concat(
          Array.from(
            new Set(
              Array.from(representation.matchAll(/<([^\s/>]+)/g))
                .map((match) => match[1])
                .filter((component) => component !== "span"),
            ),
          ),
        )
        .sort();
    }
  }, [record, child, resource, enableLog]);

  return <EditView {...rest}>{child}</EditView>;
}

const editFieldTypes: InferredTypeMap = {
  form: {
    component: (props: any) => <SimpleForm {...props} />,
    representation: (
      _props: any,
      children: { getRepresentation: () => string }[],
    ) => `        <SimpleForm>
${children.map((child) => `            ${child.getRepresentation()}`).join("\n")}
        </SimpleForm>`,
  },
  reference: {
    component: (props: any) => (
      <ReferenceInput reference={props.reference} source={props.source}>
        <AutocompleteInput />
      </ReferenceInput>
    ),
    representation: (props: any) =>
      `<ReferenceInput source="${props.source}" reference="${props.reference}">
                  <AutocompleteInput />
              </ReferenceInput>`,
  },
  referenceArray: {
    component: (props: any) => <ReferenceArrayInput {...props} />,
    representation: (props: any) =>
      `<ReferenceArrayInput source="${props.source}" reference="${props.reference}" />`,
  },
  boolean: {
    component: (props: any) => <BooleanInput {...props} />,
    representation: (props: any) => `<BooleanInput source="${props.source}" />`,
  },
  string: {
    component: (props: any) => <TextInput {...props} />,
    representation: (props: any) => `<TextInput source="${props.source}" />`,
  },
};

const _kebabCase = (name: string) => {
  return name
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/([A-Z])([A-Z][a-z])/g, "$1-$2")
    .toLowerCase();
};
