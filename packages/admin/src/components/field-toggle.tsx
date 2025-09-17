import { cn } from "@workspace/ui/lib/utils";
import { Switch } from "@workspace/ui/switch";
import { GripVertical } from "lucide-react";
import { FieldTitle, useResourceContext } from "ra-core";
import * as React from "react";

/**
 * UI to enable/disable a field
 */
export function FieldToggle(props: FieldToggleProps) {
  const { selected, label, onToggle, onMove, source, index } = props;
  const resource = useResourceContext();
  const dropIndex = React.useRef<number | null>(null);
  const x = React.useRef<number | null>(null);
  const y = React.useRef<number | null>(null);

  const handleDocumentDragOver = React.useCallback((event: DragEvent) => {
    x.current = event.clientX;
    y.current = event.clientY;
  }, []);

  const handleDragStart = () => {
    document.addEventListener(
      "dragover",
      handleDocumentDragOver as EventListener,
    );
  };

  const handleDrag = (event: React.DragEvent) => {
    // imperative DOM manipulations using the native Drag API
    const selectedItem = event.target as HTMLElement;

    selectedItem.dataset.dragActive = "true";
    const list = selectedItem.closest("ul");

    if (x.current == null || y.current == null) {
      return;
    }

    const elementAtDragCoordinates = document.elementFromPoint(
      x.current,
      y.current,
    );
    let dropItem =
      elementAtDragCoordinates === null
        ? selectedItem
        : elementAtDragCoordinates.closest("li");

    if (!dropItem) {
      return;
    }

    if (dropItem.classList.contains("dragIcon")) {
      const parent = dropItem.parentNode;

      if (parent instanceof HTMLElement) {
        dropItem = parent;
      }
    }

    if (dropItem === selectedItem) {
      return;
    }

    const dropItemParent = dropItem.parentNode;

    if (
      list &&
      dropItemParent instanceof HTMLElement &&
      list === dropItemParent.closest("ul")
    ) {
      const dataIndex = dropItem.dataset.index;

      if (dataIndex) {
        dropIndex.current = Number.parseInt(dataIndex, 10);
      }

      if (dropItem === selectedItem.nextSibling) {
        dropItem = dropItem.nextSibling as HTMLElement;
      }

      list.insertBefore(selectedItem, dropItem);
    }
  };

  const handleDragEnd = (event: React.DragEvent) => {
    const selectedItem = event.target as HTMLElement;
    const list = selectedItem.closest("ul");

    const elementFromPoint =
      x.current != null && y.current != null
        ? document.elementFromPoint(x.current, y.current)
        : null;

    let dropItem =
      x.current == null || y.current == null || elementFromPoint === null
        ? selectedItem
        : elementFromPoint.closest("li");

    if (y.current !== null && list && !dropItem) {
      const closestUl = selectedItem.closest("ul");

      dropItem =
        closestUl && y.current > closestUl.getBoundingClientRect().bottom
          ? (list.lastChild as HTMLElement)
          : (list.firstChild as HTMLElement);
    }

    if (dropItem && list && dropItem.closest("ul") === list) {
      if (onMove)
        onMove(selectedItem.dataset.index as string, dropIndex.current);
    } else {
      event.preventDefault();
      event.stopPropagation();
    }

    selectedItem.dataset.dragActive = "false";
    document.removeEventListener(
      "dragover",
      handleDocumentDragOver as EventListener,
    );
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  return (
    <li
      key={source}
      className={cn(
        "flex items-center justify-between py-1",
        "data-[drag-active=true]:outline-border data-[drag-active=true]:bg-transparent data-[drag-active=true]:text-transparent data-[drag-active=true]:outline data-[drag-active=true]:outline-1",
      )}
      data-index={index}
      draggable={onMove ? "true" : undefined}
      onDrag={onMove ? handleDrag : undefined}
      onDragEnd={onMove ? handleDragEnd : undefined}
      onDragOver={onMove ? handleDragOver : undefined}
      onDragStart={onMove ? handleDragStart : undefined}
    >
      <label
        className="flex cursor-pointer items-center gap-2"
        htmlFor={`switch_${index}`}
      >
        <Switch
          checked={selected}
          id={`switch_${index}`}
          name={`${index}`}
          onCheckedChange={onToggle}
        />
        <span className="text-sm">
          <FieldTitle label={label} resource={resource} source={source} />
        </span>
      </label>
      {onMove ? (
        <GripVertical className="dragIcon text-muted-foreground h-4 w-4 cursor-move" />
      ) : null}
    </li>
  );
}

export interface FieldToggleProps {
  selected: boolean;
  label: React.ReactNode;
  onToggle?: (event: boolean) => void;
  onMove?: (
    dragIndex: string | number,
    dropIndex: string | number | null,
  ) => void;
  source: string;
  index: number | string;
}
