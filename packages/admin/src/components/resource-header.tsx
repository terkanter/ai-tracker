import { cn } from "@workspace/ui/lib/utils";
import type { ReactElement, ReactNode } from "react";

export function ResourceHeader({
  className,
  title,
  actions,
}: {
  className?: string;
  title?: ReactElement | ReactNode | string;
  actions?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "my-2 flex flex-wrap items-start justify-between gap-2",
        className,
      )}
    >
      <h2 className="text-2xl font-semibold ">{title}</h2>
      {actions ?? (
        <div className="flex items-center justify-end">{actions}</div>
      )}
    </div>
  );
}
