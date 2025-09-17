import type {
  ResourceInformation,
  UseBulkExportProps,
} from "@workspace/admin/hooks/useBulkExport";
import { useBulkExport } from "@workspace/admin/hooks/useBulkExport";
import { Button } from "@workspace/ui/button";
import { Download } from "lucide-react";
import { Translate } from "ra-core";

/**
 * Export the selected rows
 *
 * To be used inside the <DataTable bulkActionsButtons> prop.
 *
 * @example // basic usage
 * import { BulkDeleteButton, BulkExportButton, DataTable, List } from '@workspace/admin/admin';
 *
 * export const PostList = () => (
 *   <List>
 *     <DataTable
 *       bulkActionsButtons={
 *         <>
 *           <BulkExportButton />
 *           <BulkDeleteButton />
 *         </>
 *       }
 *     >
 *       ...
 *     </DataTable>
 *   </List>
 * );
 */
export function BulkExportButton<T extends ResourceInformation>({
  icon = defaultIcon,
  label = "ra.action.export",
  onClick,
  ...props
}: BulkExportButtonProps<T>) {
  const { bulkExport } = useBulkExport(props);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    bulkExport();
    onClick?.(event);
  };

  return (
    <Button
      className="flex h-9 items-center gap-2"
      role="button"
      size="sm"
      variant="outline"
      onClick={handleClick}
      {...sanitizeRestProps(props)}
    >
      {icon}
      {label ? <Translate i18nKey={label}>{label}</Translate> : null}
    </Button>
  );
}

const defaultIcon = <Download className="h-4 w-4" />;

export type BulkExportButtonProps<T extends ResourceInformation> =
  UseBulkExportProps<T> & {
    icon?: React.ReactNode;
    label?: string;
  } & React.ComponentProps<typeof Button>;

const sanitizeRestProps = <T extends ResourceInformation>({
  resource: _resource,
  exporter: _exporter,
  onClick: _onClick,
  label: _label,
  icon: _icon,
  meta: _meta,
  ...rest
}: BulkExportButtonProps<T>) => rest;
