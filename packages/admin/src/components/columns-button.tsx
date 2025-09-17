// eslint-disable-next-line @typescript-eslint/ban-ts-comment

import * as PopoverPrimitive from "@radix-ui/react-popover";
import { FieldToggle } from "@workspace/admin/field-toggle";
import { useIsMobile } from "@workspace/admin/hooks/use-mobile";
import { Button } from "@workspace/ui/button";
import { Input } from "@workspace/ui/input";
import { cn } from "@workspace/ui/lib/utils";
import { Popover, PopoverTrigger } from "@workspace/ui/popover";
import { Tooltip, TooltipContent, TooltipTrigger } from "@workspace/ui/tooltip";
import * as diacritic from "diacritic";
import { Columns, Search } from "lucide-react";
import {
  DataTableColumnFilterContext,
  DataTableColumnRankContext,
  type ExtractRecordPaths,
  type HintedString,
  type Identifier,
  type RaRecord,
  type SortPayload,
  useDataTableColumnFilterContext,
  useDataTableColumnRankContext,
  useDataTableStoreContext,
  useResourceContext,
  useStore,
  useTranslate,
  useTranslateLabel,
} from "ra-core";
import {
  Children,
  type ComponentProps,
  type ReactNode,
  useEffect,
  useState,
} from "react";
import { createPortal } from "react-dom";

/**
 * Renders a button that lets users show / hide columns in a DataTable
 *
 * @example
 * import { ColumnsButton, DataTable } from 'shadcn-admin-kit';
 *
 * const PostListActions = () => (
 *   <div className="flex items-center gap-2">
        <ColumnsButton />
        <FilterButton />
 *   </div>
 * );
 *
 * const PostList = () => (
 *   <List actions={<PostListActions />}>
 *     <DataTable>
 *       <DataTable.Col source="title" />
 *       <DataTable.Col source="author" />
         ...
 *     </DataTable>
 *   </List>
 * );
 */
export function ColumnsButton(props: ColumnsButtonProps) {
  const { className, storeKey: _, ...rest } = props;
  const resource = useResourceContext(props);
  const storeKey = props.storeKey || `${resource}.datatable`;

  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();
  const translate = useTranslate();

  const title = translate("ra.action.select_columns", { _: "Columns" });

  return (
    <span className={cn("inline-flex", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          {isMobile ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  aria-label={title}
                  size="icon"
                  variant="ghost"
                  {...rest}
                >
                  <Columns className="size-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>{title}</TooltipContent>
            </Tooltip>
          ) : (
            <Button className="cursor-pointer" variant="outline" {...rest}>
              <Columns />
              {title}
            </Button>
          )}
        </PopoverTrigger>
        <PopoverPrimitive.Portal forceMount>
          <div className={open ? "block" : "hidden"}>
            <PopoverPrimitive.Content
              align="start"
              className="bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 min-w-[200px] origin-(--radix-popover-content-transform-origin) rounded-md border p-0 shadow-md outline-hidden"
              data-slot="popover-content"
              sideOffset={4}
            >
              <div className="p-2" id={`${storeKey}-columnsSelector`} />
            </PopoverPrimitive.Content>
          </div>
        </PopoverPrimitive.Portal>
      </Popover>
    </span>
  );
}

export interface ColumnsButtonProps extends ComponentProps<typeof Button> {
  resource?: string;
  storeKey?: string;
}

/**
 * Render DataTable.Col elements in the ColumnsButton selector using a React Portal.
 *
 * @see ColumnsButton
 */
export function ColumnsSelector({ children }: ColumnsSelectorProps) {
  const translate = useTranslate();
  const { storeKey, defaultHiddenColumns } = useDataTableStoreContext();
  const [columnRanks, setColumnRanks] = useStore<number[] | undefined>(
    `${storeKey}_columnRanks`,
  );
  const [_hiddenColumns, setHiddenColumns] = useStore<string[]>(
    storeKey,
    defaultHiddenColumns,
  );
  const elementId = `${storeKey}-columnsSelector`;

  const [container, setContainer] = useState<HTMLElement | null>(() =>
    typeof document !== "undefined" ? document.getElementById(elementId) : null,
  );

  // on first mount, we don't have the container yet, so we wait for it
  useEffect(() => {
    if (
      container &&
      typeof document !== "undefined" &&
      document.body.contains(container)
    )
      return;

    // look for the container in the DOM every 100ms
    const interval = setInterval(() => {
      const target = document.getElementById(elementId);

      if (target) setContainer(target);
    }, 100);
    // stop looking after 500ms
    const timeout = setTimeout(() => clearInterval(interval), 500);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [elementId, container]);

  const [columnFilter, setColumnFilter] = useState<string>("");

  if (!container) return null;

  const childrenArray = Children.toArray(children);
  const paddedColumnRanks = padRanks(columnRanks ?? [], childrenArray.length);
  const shouldDisplaySearchInput = childrenArray.length > 5;

  return createPortal(
    <ul className="max-h-[50vh] overflow-auto p-1">
      {shouldDisplaySearchInput ? (
        <li className="pb-2" tabIndex={-1}>
          <div className="relative">
            <Input
              className="pr-8"
              placeholder={translate("ra.action.search_columns", {
                _: "Search columns",
              })}
              value={columnFilter}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setColumnFilter(e.target.value);
              }}
            />
            <Search className="text-muted-foreground absolute top-2 right-2 h-4 w-4" />
            {columnFilter ? (
              <button
                type="button"
                aria-label="Clear"
                className="text-muted-foreground absolute top-2 right-8 h-4 w-4"
                onClick={() => setColumnFilter("")}
              >
                ×
              </button>
            ) : null}
          </div>
        </li>
      ) : null}
      {paddedColumnRanks.map((position, index) => (
        <DataTableColumnRankContext.Provider key={index} value={position}>
          <DataTableColumnFilterContext.Provider
            key={index}
            value={columnFilter}
          >
            {childrenArray[position]}
          </DataTableColumnFilterContext.Provider>
        </DataTableColumnRankContext.Provider>
      ))}
      <li className="mt-2 px-3 text-center">
        <Button
          size="sm"
          variant="outline"
          onClick={() => {
            setColumnRanks(undefined);
            setHiddenColumns(defaultHiddenColumns);
          }}
        >
          Reset
        </Button>
      </li>
    </ul>,
    container,
  );
}

interface ColumnsSelectorProps {
  children?: React.ReactNode;
}

export function ColumnsSelectorItem<
  RecordType extends RaRecord<Identifier> = RaRecord<Identifier>,
>({ source, label }: ColumnsSelectorItemProps<RecordType>) {
  const resource = useResourceContext();
  const { storeKey, defaultHiddenColumns } = useDataTableStoreContext();
  const [hiddenColumns, setHiddenColumns] = useStore<string[]>(
    storeKey,
    defaultHiddenColumns,
  );
  const columnRank = useDataTableColumnRankContext();
  const [columnRanks, setColumnRanks] = useStore<number[]>(
    `${storeKey}_columnRanks`,
  );
  const columnFilter = useDataTableColumnFilterContext();
  const translateLabel = useTranslateLabel();

  if (!source && !label) return null;

  const fieldLabel = translateLabel({
    label: typeof label === "string" ? label : undefined,
    resource,
    source,
  }) as string;
  const isColumnHidden = hiddenColumns.includes(source!);
  const isColumnFiltered = fieldLabelMatchesFilter(fieldLabel, columnFilter);

  const handleMove = (
    index1: number | string,
    index2: number | string | null,
  ) => {
    const colRanks = columnRanks
      ? Math.max(Number(index1), Number(index2 || 0)) > columnRanks.length - 1
        ? padRanks(
            columnRanks,
            Math.max(Number(index1), Number(index2 || 0)) + 1,
          )
        : columnRanks
      : padRanks([], Math.max(Number(index1), Number(index2 || 0)) + 1);
    const index1Pos = colRanks.indexOf(Number(index1));
    const index2Pos = colRanks.indexOf(Number(index2));

    if (index1Pos === -1 || index2Pos === -1) {
      return;
    }

    const newColumnRanks =
      index1Pos > index2Pos
        ? [
            ...colRanks.slice(0, index2Pos),
            colRanks[index1Pos],
            ...colRanks.slice(index2Pos, index1Pos),
            ...colRanks.slice(index1Pos + 1),
          ]
        : [
            ...colRanks.slice(0, index1Pos),
            ...colRanks.slice(index1Pos + 1, index2Pos + 1),
            colRanks[index1Pos],
            ...colRanks.slice(index2Pos + 1),
          ];

    setColumnRanks(newColumnRanks as number[]);
  };

  return isColumnFiltered ? (
    <FieldToggle
      key={columnRank}
      index={String(columnRank)}
      label={fieldLabel}
      selected={!isColumnHidden}
      source={source!}
      onMove={handleMove}
      onToggle={() =>
        isColumnHidden
          ? setHiddenColumns(
              hiddenColumns.filter((column) => column !== source!),
            )
          : setHiddenColumns([...hiddenColumns, source!])
      }
    />
  ) : null;
}

// this is the same interface as DataTableColumnProps
// but we copied it here to avoid circular dependencies with data-table
export interface ColumnsSelectorItemProps<
  RecordType extends RaRecord<Identifier> = RaRecord<Identifier>,
> {
  className?: string;
  cellClassName?: string;
  headerClassName?: string;
  conditionalClassName?: (record: RecordType) => string | false | undefined;
  children?: ReactNode;
  render?: (record: RecordType) => React.ReactNode;
  field?: React.ElementType;
  source?: NoInfer<HintedString<ExtractRecordPaths<RecordType>>>;
  label?: React.ReactNode;
  disableSort?: boolean;
  sortByOrder?: SortPayload["order"];
}
// Function to help with column ranking
const padRanks = (ranks: number[], length: number) =>
  ranks.concat(
    Array.from({ length: length - ranks.length }, (_, i) => ranks.length + i),
  );

const fieldLabelMatchesFilter = (fieldLabel: string, columnFilter?: string) =>
  columnFilter
    ? diacritic
        .clean(fieldLabel)
        .toLowerCase()
        .includes(diacritic.clean(columnFilter).toLowerCase())
    : true;
