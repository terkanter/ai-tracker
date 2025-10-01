"use client";

import { useControlledState } from "@workspace/ui/hooks/use-controlled-state";
import { getStrictContext } from "@workspace/ui/lib/get-strict-context";
import {
  type HTMLMotionProps,
  motion,
  type SVGMotionProps,
} from "motion/react";
import { Checkbox as CheckboxPrimitive } from "radix-ui";
import type * as React from "react";

type CheckboxContextType = {
  isChecked: boolean | "indeterminate";
  setIsChecked: (checked: boolean | "indeterminate") => void;
};

const [CheckboxProvider, useCheckbox] =
  getStrictContext<CheckboxContextType>("CheckboxContext");

type CheckboxProps = HTMLMotionProps<"button"> &
  Omit<React.ComponentProps<typeof CheckboxPrimitive.Root>, "asChild">;

function Checkbox({
  defaultChecked,
  checked,
  onCheckedChange,
  disabled,
  required,
  name,
  value,
  ...props
}: CheckboxProps) {
  const [isChecked, setIsChecked] = useControlledState({
    value: checked,
    defaultValue: defaultChecked,
    onChange: onCheckedChange,
  });

  return (
    <CheckboxProvider value={{ isChecked, setIsChecked }}>
      <CheckboxPrimitive.Root
        defaultChecked={defaultChecked}
        checked={checked}
        onCheckedChange={setIsChecked}
        disabled={disabled}
        required={required}
        name={name}
        value={value}
        asChild
      >
        <motion.button
          data-slot="checkbox"
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          {...props}
        />
      </CheckboxPrimitive.Root>
    </CheckboxProvider>
  );
}

type CheckboxIndicatorProps = SVGMotionProps<SVGSVGElement>;

function CheckboxIndicator(props: CheckboxIndicatorProps) {
  const { isChecked } = useCheckbox();

  return (
    <CheckboxPrimitive.Indicator forceMount asChild>
      <motion.svg
        data-slot="checkbox-indicator"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="3.5"
        stroke="currentColor"
        {...props}
      >
        {isChecked === "indeterminate" ? (
          <motion.line
            x1="5"
            y1="12"
            x2="19"
            y2="12"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: isChecked === "indeterminate" ? 1 : 0,
              opacity: isChecked === "indeterminate" ? 1 : 0,
              transition: { duration: 0.2 },
            }}
          />
        ) : null}
        <motion.path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.5 12.75l6 6 9-13.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: isChecked === true ? 1 : 0,
            opacity: isChecked === true ? 1 : 0,
            transition: {
              duration: 0.2,
              delay: isChecked === true ? 0.1 : 0,
            },
          }}
        />
      </motion.svg>
    </CheckboxPrimitive.Indicator>
  );
}

export {
  Checkbox,
  CheckboxIndicator,
  useCheckbox,
  type CheckboxContextType,
  type CheckboxIndicatorProps,
  type CheckboxProps,
};
