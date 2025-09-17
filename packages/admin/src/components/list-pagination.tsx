import { cn } from "@workspace/ui/lib/utils";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@workspace/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/select";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Translate, useListPaginationContext, useTranslate } from "ra-core";

export function ListPagination({
  rowsPerPageOptions = [5, 10, 25, 50],
  className,
}: {
  rowsPerPageOptions?: number[];
  className?: string;
}) {
  const translate = useTranslate();
  const {
    hasPreviousPage,
    hasNextPage,
    page,
    perPage,
    setPerPage,
    total,
    setPage,
  } = useListPaginationContext();

  const pageStart = (page - 1) * perPage + 1;
  const pageEnd = hasNextPage ? page * perPage : total;

  const boundaryCount = 1;
  const siblingCount = 1;
  const count = total ? Math.ceil(total / perPage) : 1;

  const range = (start: number, end: number) => {
    const length = end - start + 1;

    return Array.from({ length }, (_, i) => start + i);
  };

  const startPages = range(1, Math.min(boundaryCount, count));
  const endPages = range(
    Math.max(count - boundaryCount + 1, boundaryCount + 1),
    count,
  );

  const siblingsStart = Math.max(
    Math.min(
      // Natural start
      page - siblingCount,
      // Lower boundary when page is high
      count - boundaryCount - siblingCount * 2 - 1,
    ),
    // Greater than startPages
    boundaryCount + 2,
  );

  const siblingsEnd = Math.min(
    Math.max(
      // Natural end
      page + siblingCount,
      // Upper boundary when page is low
      boundaryCount + siblingCount * 2 + 2,
    ),
    // Less than endPages
    count - boundaryCount - 1,
  );

  const siblingPages = range(siblingsStart, siblingsEnd);

  const pageChangeHandler = (newPage: number) => {
    return (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      setPage(newPage);
    };
  };

  return (
    <div
      className={`flex items-center justify-end gap-4 space-x-2 ${className}`}
    >
      <div className="hidden items-center space-x-2 md:flex">
        <p className="text-sm font-medium">
          <Translate i18nKey="ra.navigation.page_rows_per_page">
            Rows per page
          </Translate>
        </p>
        <Select
          value={perPage.toString()}
          onValueChange={(value) => {
            setPerPage(Number(value));
          }}
        >
          <SelectTrigger className="h-8 w-[70px]">
            <SelectValue placeholder={perPage} />
          </SelectTrigger>
          <SelectContent side="top">
            {rowsPerPageOptions.map((pageSize) => (
              <SelectItem key={pageSize} value={`${pageSize}`}>
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="text-muted-foreground text-sm">
        <Translate
          i18nKey="ra.navigation.page_range_info"
          options={{
            offsetBegin: pageStart,
            offsetEnd: pageEnd,
            total: total === -1 ? pageEnd : total,
          }}
        >
          {total != null
            ? `${pageStart}-${pageEnd} of ${total === -1 ? pageEnd : total}`
            : null}
        </Translate>
      </div>
      <Pagination className="-w-full -mx-auto">
        <PaginationContent>
          <PaginationItem>
            <PaginationLink
              aria-label={translate("ra.navigation.previous", {
                _: "Previous",
              })}
              className={cn(
                "gap-1 px-2.5 sm:pr-2.5",
                hasPreviousPage ? "" : "cursor-not-allowed opacity-50",
              )}
              href="#"
              size="default"
              onClick={pageChangeHandler(page - 1)}
            >
              <ChevronLeftIcon />
            </PaginationLink>
          </PaginationItem>
          {startPages.map((pageNumber) => (
            <PaginationItem key={pageNumber}>
              <PaginationLink
                href="#"
                isActive={pageNumber === page}
                size="default"
                onClick={pageChangeHandler(pageNumber)}
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          ))}
          {siblingsStart > boundaryCount + 2 ? (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          ) : boundaryCount + 1 < count - boundaryCount ? (
            <PaginationItem>
              <PaginationLink
                href="#"
                isActive={boundaryCount + 1 === page}
                onClick={pageChangeHandler(boundaryCount + 1)}
              >
                {boundaryCount + 1}
              </PaginationLink>
            </PaginationItem>
          ) : null}
          {siblingPages.map((pageNumber) => (
            <PaginationItem key={pageNumber}>
              <PaginationLink
                href="#"
                isActive={pageNumber === page}
                size="default"
                onClick={pageChangeHandler(pageNumber)}
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          ))}
          {siblingsEnd < count - boundaryCount - 1 ? (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          ) : count - boundaryCount > boundaryCount ? (
            <PaginationItem>
              <PaginationLink
                href="#"
                isActive={count - boundaryCount === page}
                onClick={pageChangeHandler(count - boundaryCount)}
              >
                {count - boundaryCount}
              </PaginationLink>
            </PaginationItem>
          ) : null}
          {endPages.map((pageNumber) => (
            <PaginationItem key={pageNumber}>
              <PaginationLink
                href="#"
                isActive={pageNumber === page}
                size="default"
                onClick={pageChangeHandler(pageNumber)}
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationLink
              aria-label={translate("ra.navigation.next", { _: "Next" })}
              className={cn(
                "gap-1 px-2.5 sm:pr-2.5",
                hasNextPage ? "" : "cursor-not-allowed opacity-50",
              )}
              href="#"
              size="default"
              onClick={pageChangeHandler(page + 1)}
            >
              <ChevronRightIcon />
            </PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
