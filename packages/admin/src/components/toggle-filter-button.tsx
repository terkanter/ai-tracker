import { Button } from "@workspace/ui/button";
import { cn } from "@workspace/ui/lib/utils";
import matches from "lodash/matches";
import omit from "lodash/omit";
import pickBy from "lodash/pickBy";
import { CircleX } from "lucide-react";
import { useListContext, useTranslate } from "ra-core";
import type React from "react";

export function ToggleFilterButton({
  label,
  size = "sm",
  value,
  className,
}: {
  label: React.ReactElement | string;
  value: any;
  className?: string;
  size?: "default" | "sm" | "lg" | "icon" | null | undefined;
}) {
  const { filterValues, setFilters } = useListContext();
  const translate = useTranslate();
  const isSelected = getIsSelected(value, filterValues);
  const handleClick = () => setFilters(toggleFilter(value, filterValues));

  return (
    <Button
      className={cn(
        "cursor-pointer",
        "flex w-full flex-row items-center justify-between gap-2 px-2.5",
        className,
      )}
      size={size}
      variant={isSelected ? "secondary" : "ghost"}
      onClick={handleClick}
    >
      {typeof label === "string" ? translate(label, { _: label }) : label}
      {isSelected ? <CircleX className="opacity-50" /> : null}
    </Button>
  );
}

const toggleFilter = (value: any, filters: any) => {
  const isSelected = matches(
    pickBy(value, (val) => typeof val !== "undefined"),
  )(filters);

  if (isSelected) {
    return omit(filters, Object.keys(value));
  }

  return { ...filters, ...value };
};

const getIsSelected = (value: any, filters: any) =>
  matches(pickBy(value, (val) => typeof val !== "undefined"))(filters);
