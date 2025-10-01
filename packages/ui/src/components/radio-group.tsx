import { cn } from "@/lib/utils";
import { CircleIcon } from "lucide-react";
import {
  RadioGroupIndicator as RadioGroupIndicatorPrimitive,
  RadioGroupItem as RadioGroupItemPrimitive,
  type RadioGroupItemProps as RadioGroupItemPrimitiveProps,
  RadioGroup as RadioGroupPrimitive,
  type RadioGroupProps as RadioGroupPrimitiveProps,
} from "./primitives/radix/radio-group";

type RadioGroupProps = RadioGroupPrimitiveProps;

function RadioGroup({ className, ...props }: RadioGroupProps) {
  return (
    <RadioGroupPrimitive className={cn("grid gap-3", className)} {...props} />
  );
}

type RadioGroupItemProps = RadioGroupItemPrimitiveProps;

function RadioGroupItem({ className, ...props }: RadioGroupItemProps) {
  return (
    <RadioGroupItemPrimitive
      className={cn(
        "border-input text-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 aspect-square size-4 shrink-0 rounded-full border shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <RadioGroupIndicatorPrimitive className="relative flex items-center justify-center">
        <CircleIcon className="fill-primary absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2" />
      </RadioGroupIndicatorPrimitive>
    </RadioGroupItemPrimitive>
  );
}

export {
  RadioGroup,
  RadioGroupItem,
  type RadioGroupItemProps,
  type RadioGroupProps,
};
