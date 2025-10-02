"use client";

import { useTheme } from "@workspace/admin/theme-provider";
import { Button } from "@workspace/ui/button";
import { cn } from "@workspace/ui/lib/utils";
import { Moon, Sun } from "lucide-react";

import { useCallback, useEffect, useRef } from "react";
import { flushSync } from "react-dom";

type Props = {
  className?: string;
};
export const ThemeModeToggle = ({ className }: Props) => {
  const { theme, setTheme } = useTheme();
  const buttonRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const updateTheme = () => {
      setTheme(
        document.documentElement.classList.contains("dark") ? "dark" : "light",
      );
    };
    updateTheme();
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);
  const toggleTheme = useCallback(async () => {
    if (!buttonRef.current) return;
    await document.startViewTransition(() => {
      flushSync(() => {
        const newTheme = theme === "dark" ? "light" : "dark";
        setTheme(newTheme);
        document.documentElement.classList.toggle("dark");
        localStorage.setItem("theme", newTheme ? "dark" : "light");
      });
    }).ready;
    const { top, left, width, height } =
      buttonRef.current.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const maxRadius = Math.hypot(
      Math.max(left, window.innerWidth - left),
      Math.max(top, window.innerHeight - top),
    );
    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${maxRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: 500,
        easing: "ease-in-out",
        pseudoElement: "::view-transition-new(root)",
      },
    );
  }, [theme]);

  return (
    <Button
      ref={buttonRef}
      onClick={toggleTheme}
      className={cn(className)}
      size="icon"
      variant="ghost"
    >
      {theme === "dark" ? (
        <Sun className="size-5" />
      ) : (
        <Moon className="size-5" />
      )}
    </Button>
  );
};
