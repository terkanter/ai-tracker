import type { FilterElementProps } from "@workspace/admin/hooks/filter-context";
import { useFilterContext } from "@workspace/admin/hooks/filter-context";
import type { SavedQuery } from "@workspace/admin/hooks/saved-queries";
import {
  extractValidSavedQueries,
  useSavedQueries,
} from "@workspace/admin/hooks/saved-queries";
import {
  AddSavedQueryDialog,
  RemoveSavedQueryDialog,
} from "@workspace/admin/saved-queries";
import { Button } from "@workspace/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@workspace/ui/dropdown-menu";
import { cn } from "@workspace/ui/lib/utils";
import get from "lodash/get";
import isEqual from "lodash/isEqual";
import {
  Bookmark,
  BookmarkMinus,
  BookmarkPlus,
  Check,
  Filter,
  MinusCircle,
  X,
} from "lucide-react";
import queryString from "query-string";
import {
  FieldTitle,
  FilterLiveForm,
  useListContext,
  useResourceContext,
  useTranslate,
} from "ra-core";
import * as React from "react";
import {
  type HtmlHTMLAttributes,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router";

export function FilterForm(inProps: FilterFormProps) {
  const { filters: filtersProps, ...rest } = inProps;
  const filters = useFilterContext() || filtersProps;

  return (
    <FilterLiveForm formComponent={StyledForm} {...sanitizeRestProps(rest)}>
      <FilterFormBase filters={filters} />
    </FilterLiveForm>
  );
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface FilterFormProps extends FilterFormBaseProps {}

/**
 * @deprecated Use FilterFormBase from `ra-core` once available.
 */
export function FilterFormBase(props: FilterFormBaseProps) {
  const { filters } = props;
  const resource = useResourceContext(props);
  const { displayedFilters = {}, filterValues, hideFilter } = useListContext();

  useEffect(() => {
    if (!filters) return;

    for (const filter of filters) {
      if (filter.props.alwaysOn && filter.props.defaultValue) {
        throw new Error(
          "Cannot use alwaysOn and defaultValue on a filter input. Please set the filterDefaultValues props on the <List> element instead.",
        );
      }
    }
  }, [filters]);

  const getShownFilters = () => {
    if (!filters) return [];

    const values = filterValues;

    return filters.filter((filterElement) => {
      const filterValue = get(values, filterElement.props.source);

      return (
        filterElement.props.alwaysOn ||
        displayedFilters[filterElement.props.source] ||
        !isEmptyValue(filterValue)
      );
    });
  };

  const handleHide = useCallback(
    (event: React.MouseEvent<HTMLElement>) =>
      // @ts-expect-error
      hideFilter(event.currentTarget.dataset.key),
    [hideFilter],
  );

  return (
    <>
      {getShownFilters().map((filterElement) => (
        <FilterFormInput
          key={filterElement.key || filterElement.props.source}
          filterElement={filterElement}
          handleHide={handleHide}
          resource={resource}
        />
      ))}
    </>
  );
}

const sanitizeRestProps = ({
  hasCreate: _hasCreate,
  resource: _resource,
  ...props
}: Partial<FilterFormBaseProps> & { hasCreate?: boolean }) => props;

export type FilterFormBaseProps = Omit<
  HtmlHTMLAttributes<HTMLFormElement>,
  "children"
> & {
  className?: string;
  resource?: string;
  filters?: React.ReactElement<FilterElementProps>[];
};

function StyledForm(props: React.FormHTMLAttributes<HTMLFormElement>) {
  return (
    <form
      {...props}
      className={cn(
        "pointer-events-none flex flex-row flex-wrap items-end justify-start gap-x-2 gap-y-3",
        "[&_.form-helper-text]:hidden",
        props.className,
      )}
    />
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isEmptyValue = (filterValue: any): boolean => {
  if (filterValue === "" || filterValue == null) return true;

  // If one of the value leaf is not empty
  // the value is considered not empty
  if (typeof filterValue === "object") {
    return Object.keys(filterValue).every((key) =>
      isEmptyValue(filterValue[key]),
    );
  }

  return false;
};

export function FilterFormInput(inProps: FilterFormInputProps) {
  const { filterElement, handleHide, className } = inProps;
  const resource = useResourceContext(inProps);
  const translate = useTranslate();

  return (
    <div
      className={cn(
        "filter-field pointer-events-auto relative flex flex-row gap-2",
        className,
      )}
      data-source={filterElement.props.source}
    >
      {React.cloneElement(filterElement, {
        resource,
        record: emptyRecord,
        size: filterElement.props.size ?? "small",
        helperText: false,
        // ignore defaultValue in Field because it was already set in Form (via mergedInitialValuesWithDefaultValues)
        defaultValue: undefined,
      })}
      {!filterElement.props.alwaysOn && (
        <Button
          className="hide-filter mt-auto h-9 w-9 cursor-pointer"
          data-key={filterElement.props.source}
          size="sm"
          title={translate("ra.action.remove_filter")}
          type="button"
          variant="ghost"
          onClick={handleHide}
        >
          <MinusCircle className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}

export interface FilterFormInputProps {
  filterElement: React.ReactElement<FilterElementProps>;
  handleHide: (event: React.MouseEvent<HTMLElement>) => void;
  className?: string;
  resource?: string;
}

const emptyRecord = {};

export function FilterButton(props: FilterButtonProps) {
  const {
    filters: filtersProp,
    className,
    disableSaveQuery,
    size,
    variant = "outline",
    ...rest
  } = props;
  const filters = useFilterContext() || filtersProp;
  const resource = useResourceContext(props);
  const translate = useTranslate();

  if (!resource && !disableSaveQuery) {
    throw new Error(
      "<FilterButton> must be called inside a ResourceContextProvider, or must provide a resource prop",
    );
  }

  const [savedQueries] = useSavedQueries(resource || "");
  const navigate = useNavigate();
  const {
    displayedFilters = {},
    filterValues,
    perPage,
    setFilters,
    showFilter,
    hideFilter,
    sort,
  } = useListContext();
  const hasFilterValues = !isEqual(filterValues, {});
  const validSavedQueries = extractValidSavedQueries(savedQueries);
  const hasSavedCurrentQuery = validSavedQueries.some((savedQuery) =>
    isEqual(savedQuery.value, {
      filter: filterValues,
      sort,
      perPage,
      displayedFilters,
    }),
  );
  const [open, setOpen] = useState(false);

  if (filters === undefined) {
    throw new Error(
      "The <FilterButton> component requires the <List filters> prop to be set",
    );
  }

  const allTogglableFilters = filters.filter(
    (filterElement: React.ReactElement<FilterElementProps>) =>
      !filterElement.props.alwaysOn,
  );

  const handleShow = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ({ source, defaultValue }: { source: string; defaultValue: any }) => {
      showFilter(source, defaultValue === "" ? undefined : defaultValue);
      // We have to fallback to imperative code because the new FilterFormInput
      // has no way of knowing it has just been displayed (and thus that it should focus its input)
      setTimeout(() => {
        const inputElement = document.querySelector(
          `input[name='${source}']`,
        ) as HTMLInputElement;

        if (inputElement) {
          inputElement.focus();
        }
      }, 50);
      setOpen(false);
    },
    [showFilter, setOpen],
  );

  const handleRemove = useCallback(
    ({ source }: { source: string }) => {
      hideFilter(source);
      setOpen(false);
    },
    [hideFilter, setOpen],
  );

  // add query dialog state
  const [addSavedQueryDialogOpen, setAddSavedQueryDialogOpen] = useState(false);
  const hideAddSavedQueryDialog = (): void => {
    setAddSavedQueryDialogOpen(false);
  };
  const showAddSavedQueryDialog = (): void => {
    setOpen(false);
    setAddSavedQueryDialogOpen(true);
  };

  // remove query dialog state
  const [removeSavedQueryDialogOpen, setRemoveSavedQueryDialogOpen] =
    useState(false);
  const hideRemoveSavedQueryDialog = (): void => {
    setRemoveSavedQueryDialogOpen(false);
  };
  const showRemoveSavedQueryDialog = (): void => {
    setOpen(false);
    setRemoveSavedQueryDialogOpen(true);
  };

  if (
    allTogglableFilters.length === 0 &&
    validSavedQueries.length === 0 &&
    !hasFilterValues
  ) {
    return null;
  }

  return (
    <div className={cn("inline-block", className)} {...rest}>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            aria-haspopup="true"
            className="add-filter"
            size={size}
            type="button"
            variant={variant}
          >
            <Filter className="h-4 w-4" />
            {translate("ra.action.add_filter")}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56">
          {allTogglableFilters.map(
            (
              filterElement: React.ReactElement<FilterElementProps>,
              index: number,
            ) => (
              <FilterButtonMenuItem
                key={filterElement.props.source}
                autoFocus={index === 0}
                displayed={!!displayedFilters[filterElement.props.source]}
                filter={filterElement}
                resource={resource}
                onHide={handleRemove}
                onShow={handleShow}
              />
            ),
          )}
          {hasFilterValues || validSavedQueries.length > 0 ? (
            <DropdownMenuSeparator />
          ) : null}
          {validSavedQueries.map((savedQuery: SavedQuery, index: number) =>
            isEqual(savedQuery.value, {
              filter: filterValues,
              sort,
              perPage,
              displayedFilters,
            }) ? (
              <DropdownMenuItem
                key={index}
                onClick={showRemoveSavedQueryDialog}
              >
                <BookmarkMinus className="mr-2 h-4 w-4" />
                {translate("ra.saved_queries.remove_label_with_name", {
                  _: 'Remove query "%{name}"',
                  name: savedQuery.label,
                })}
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem
                key={index}
                onClick={(): void => {
                  navigate({
                    search: queryString.stringify({
                      filter: JSON.stringify(savedQuery.value.filter),
                      sort: savedQuery.value.sort?.field,
                      order: savedQuery.value.sort?.order,
                      page: 1,
                      perPage: savedQuery.value.perPage,
                      displayedFilters: JSON.stringify(
                        savedQuery.value.displayedFilters,
                      ),
                    }),
                  });
                  setOpen(false);
                }}
              >
                <Bookmark className="mr-2 h-4 w-4" />
                {savedQuery.label}
              </DropdownMenuItem>
            ),
          )}
          {hasFilterValues && !hasSavedCurrentQuery && !disableSaveQuery ? (
            <DropdownMenuItem onClick={showAddSavedQueryDialog}>
              <BookmarkPlus className="mr-2 h-4 w-4" />
              {translate("ra.saved_queries.new_label", {
                _: "Save current query...",
              })}
            </DropdownMenuItem>
          ) : null}
          {hasFilterValues ? (
            <DropdownMenuItem
              onClick={() => {
                setFilters({}, {});
                setOpen(false);
              }}
            >
              <X className="mr-2 h-4 w-4" />
              {translate("ra.action.remove_all_filters", {
                _: "Remove all filters",
              })}
            </DropdownMenuItem>
          ) : null}
        </DropdownMenuContent>
      </DropdownMenu>
      {!disableSaveQuery && (
        <>
          <AddSavedQueryDialog
            open={addSavedQueryDialogOpen}
            onClose={hideAddSavedQueryDialog}
          />
          <RemoveSavedQueryDialog
            open={removeSavedQueryDialogOpen}
            onClose={hideRemoveSavedQueryDialog}
          />
        </>
      )}
    </div>
  );
}

export interface FilterButtonProps extends HtmlHTMLAttributes<HTMLDivElement> {
  className?: string;
  disableSaveQuery?: boolean;
  filters?: React.ReactElement<FilterElementProps>[];
  resource?: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

export const FilterButtonMenuItem = React.forwardRef<
  HTMLDivElement,
  FilterButtonMenuItemProps
>((props, ref) => {
  const { filter, onShow, onHide, displayed } = props;
  const resource = useResourceContext(props);
  const handleShow = useCallback(() => {
    onShow({
      source: filter.props.source,
      defaultValue: filter.props.defaultValue,
    });
  }, [filter.props.defaultValue, filter.props.source, onShow]);
  const handleHide = useCallback(() => {
    onHide({
      source: filter.props.source,
    });
  }, [filter.props.source, onHide]);

  return (
    <div
      ref={ref}
      aria-checked={displayed}
      className={cn(
        "new-filter-item hover:bg-accent flex cursor-pointer items-center rounded-sm px-2 py-1.5 text-sm",
        filter.props.disabled && "cursor-not-allowed opacity-50",
      )}
      data-default-value={filter.props.defaultValue}
      data-key={filter.props.source}
      role="menuitemcheckbox"
      onClick={
        filter.props.disabled ? undefined : displayed ? handleHide : handleShow
      }
    >
      <div className="mr-2 flex h-4 w-4 items-center justify-center">
        {displayed ? <Check className="h-3 w-3" /> : null}
      </div>
      <div>
        <FieldTitle
          label={filter.props.label}
          resource={resource}
          source={filter.props.source}
        />
      </div>
    </div>
  );
});

export interface FilterButtonMenuItemProps {
  filter: React.ReactElement<FilterElementProps>;
  displayed: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onShow: (params: { source: string; defaultValue: any }) => void;
  onHide: (params: { source: string }) => void;
  resource?: string;
  autoFocus?: boolean;
}
