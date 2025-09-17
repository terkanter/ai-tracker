import { useIsMobile } from "@workspace/admin/hooks/use-mobile";
import { Button } from "@workspace/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@workspace/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@workspace/ui/tooltip";
import { ArrowUpDown, ChevronDown } from "lucide-react";
import {
  shallowEqual,
  useListSortContext,
  useTranslate,
  useTranslateLabel,
} from "ra-core";
import * as React from "react";
import { memo } from "react";

type ButtonProps = React.ComponentProps<typeof Button>;

function SortButtonComponent(props: SortButtonProps) {
  const {
    fields,
    label = "ra.sort.sort_by",
    icon = defaultIcon,
    resource: resourceProp,
    ...rest
  } = props;
  const { resource: resourceFromContext, sort, setSort } = useListSortContext();
  const resource = resourceProp || resourceFromContext;
  const translate = useTranslate();
  const translateLabel = useTranslateLabel();
  const isMobile = useIsMobile();
  const [open, setOpen] = React.useState(false);

  const handleChangeSort = (field: string) => {
    setSort({
      field,
      order: field === sort.field ? inverseOrder(sort.order) : "ASC",
    });
    setOpen(false);
  };

  const fieldLabel = translateLabel({
    resource,
    source: sort.field,
  });
  const buttonLabel = translate(label, {
    field: fieldLabel,
    field_lower_first:
      typeof fieldLabel === "string"
        ? fieldLabel.charAt(0).toLowerCase() + fieldLabel.slice(1)
        : undefined,
    order: translate(`ra.sort.${sort.order}`),
    _: label,
  });

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      {isMobile ? (
        <TooltipProvider>
          <Tooltip>
            <DropdownMenuTrigger asChild>
              <TooltipTrigger asChild>
                <Button
                  aria-label={buttonLabel}
                  size="icon"
                  variant="outline"
                  {...rest}
                >
                  {icon}
                </Button>
              </TooltipTrigger>
            </DropdownMenuTrigger>
            <TooltipContent>
              <p>{buttonLabel}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        <DropdownMenuTrigger asChild>
          <Button className="h-9" size="sm" variant="outline" {...rest}>
            {icon}
            <span className="ml-2">{buttonLabel}</span>
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
      )}
      <DropdownMenuContent align="start">
        {fields.map((field) => (
          <DropdownMenuItem key={field} onClick={() => handleChangeSort(field)}>
            {translateLabel({
              resource,
              source: field,
            })}{" "}
            {translate(
              `ra.sort.${sort.field === field ? inverseOrder(sort.order) : "ASC"}`,
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const defaultIcon = <ArrowUpDown className="h-4 w-4" />;

const inverseOrder = (sort: string) => (sort === "ASC" ? "DESC" : "ASC");

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const arePropsEqual = (prevProps: any, nextProps: any) =>
  shallowEqual(prevProps.fields, nextProps.fields);

export interface SortButtonProps extends ButtonProps {
  fields: string[];
  icon?: React.ReactNode;
  label?: string;
  resource?: string;
}

export const SortButton = memo(SortButtonComponent, arePropsEqual);
