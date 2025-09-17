import { Button } from "@workspace/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@workspace/ui/tooltip";
import { useTranslate } from "ra-core";
import type { MouseEvent } from "react";
import * as React from "react";

/**
 * A Button with a tooltip which ensures the tooltip is closed on click to avoid ghost tooltips
 * when the button position changes.
 */
export function IconButtonWithTooltip({
  label,
  onClick,
  children,
  disabled,
  ...props
}: IconButtonWithTooltipProps) {
  const translate = useTranslate();
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  let translatedLabel = label;

  if (typeof label === "string") {
    translatedLabel = translate(label, { _: label });
  }

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    handleClose();
    onClick?.(event);
  };

  return (
    <TooltipProvider>
      <Tooltip open={open} onOpenChange={setOpen}>
        <TooltipTrigger asChild>
          <Button
            aria-label={
              typeof translatedLabel === "string" ? translatedLabel : undefined
            }
            disabled={disabled}
            size="icon"
            type="button"
            variant="ghost"
            onClick={handleClick}
            onMouseEnter={handleOpen}
            onMouseLeave={handleClose}
            {...props}
          >
            {children}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{translatedLabel}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export interface IconButtonWithTooltipProps
  extends React.ComponentProps<"button"> {
  label: React.ReactNode;
  children: React.ReactNode;
}
