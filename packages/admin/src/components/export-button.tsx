import { Button } from "@workspace/ui/button";
import { Download } from "lucide-react";
import type { Exporter } from "ra-core";
import {
  fetchRelatedRecords,
  Translate,
  useDataProvider,
  useListContext,
  useNotify,
} from "ra-core";
import type * as React from "react";
import { useCallback } from "react";

export function ExportButton(props: ExportButtonProps) {
  const {
    maxResults = 1000,
    onClick,
    label = "ra.action.export",
    icon = defaultIcon,
    exporter: customExporter,
    meta,
    className = "cursor-pointer",
  } = props;
  const {
    filter,
    filterValues,
    resource,
    sort,
    exporter: exporterFromContext,
    total,
  } = useListContext();
  const exporter = customExporter || exporterFromContext;
  const dataProvider = useDataProvider();
  const notify = useNotify();
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      dataProvider
        .getList(resource, {
          sort,
          filter: filter ? { ...filterValues, ...filter } : filterValues,
          pagination: { page: 1, perPage: maxResults },
          meta,
        })
        .then(({ data }) =>
          exporter?.(
            data,
            fetchRelatedRecords(dataProvider),
            dataProvider,
            resource,
          ),
        )
        .catch((_error) => {
          notify("HTTP Error", { type: "error" });
        });

      if (typeof onClick === "function") {
        onClick(event);
      }
    },
    [
      dataProvider,
      exporter,
      filter,
      filterValues,
      maxResults,
      notify,
      onClick,
      resource,
      sort,
      meta,
    ],
  );

  return (
    <Button
      className={className}
      disabled={total === 0}
      variant="outline"
      onClick={handleClick}
    >
      {icon}
      <Translate i18nKey={label}>Export</Translate>
    </Button>
  );
}

const defaultIcon = <Download />;

export interface ExportButtonProps {
  className?: string;
  exporter?: Exporter;
  icon?: React.ReactNode;
  label?: string;
  maxResults?: number;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  resource?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  meta?: any;
}
