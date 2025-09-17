import {
  extractValidSavedQueries,
  useSavedQueries,
} from "@workspace/admin/hooks/saved-queries";
import { Button } from "@workspace/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/dialog";
import { Input } from "@workspace/ui/input";
import { Label } from "@workspace/ui/label";
import isEqual from "lodash/isEqual";
import { useListContext, useTranslate } from "ra-core";
import type { ChangeEvent, FormEvent, ReactElement } from "react";
import { useState } from "react";

export function AddSavedQueryDialog({
  open,
  onClose,
}: AddSavedQueryDialogProps): ReactElement {
  const translate = useTranslate();
  const { resource, filterValues, displayedFilters, sort, perPage } =
    useListContext();

  const [savedQueries, setSavedQueries] = useSavedQueries(resource);

  // input state
  const [queryName, setQueryName] = useState("");
  const handleQueryNameChange = (
    event: ChangeEvent<HTMLInputElement>,
  ): void => {
    setQueryName(event.target.value);
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    addQuery();
  };

  const addQuery = (): void => {
    const newSavedQuery = {
      label: queryName,
      value: {
        filter: filterValues,
        sort,
        perPage,
        displayedFilters,
      },
    };
    const newSavedQueries = extractValidSavedQueries(savedQueries);

    setSavedQueries(newSavedQueries.concat(newSavedQuery));
    setQueryName("");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {translate("ra.saved_queries.new_dialog_title", {
              _: "Save current query as",
            })}
          </DialogTitle>
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleFormSubmit}>
          <div className="space-y-2">
            <Label htmlFor="name">
              {translate("ra.saved_queries.query_name", {
                _: "Query name",
              })}
            </Label>
            <Input
              autoFocus
              id="name"
              value={queryName}
              onChange={handleQueryNameChange}
            />
          </div>
        </form>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            {translate("ra.action.cancel")}
          </Button>
          <Button onClick={addQuery}>{translate("ra.action.save")}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export interface AddSavedQueryDialogProps {
  open: boolean;
  onClose: () => void;
}

export function RemoveSavedQueryDialog({
  open,
  onClose,
}: RemoveSavedQueryDialogProps): ReactElement {
  const translate = useTranslate();
  const { resource, filterValues, sort, perPage, displayedFilters } =
    useListContext();

  const [savedQueries, setSavedQueries] = useSavedQueries(resource);

  const removeQuery = (): void => {
    const savedQueryToRemove = {
      filter: filterValues,
      sort,
      perPage,
      displayedFilters,
    };

    const newSavedQueries = extractValidSavedQueries(savedQueries);
    const index = newSavedQueries.findIndex((savedFilter) =>
      isEqual(savedFilter.value, savedQueryToRemove),
    );

    setSavedQueries([
      ...newSavedQueries.slice(0, index),
      ...newSavedQueries.slice(index + 1),
    ]);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {translate("ra.saved_queries.remove_dialog_title", {
              _: "Remove saved query?",
            })}
          </DialogTitle>
          <DialogDescription>
            {translate("ra.saved_queries.remove_message", {
              _: "Are you sure you want to remove that item from your list of saved queries?",
            })}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            {translate("ra.action.cancel")}
          </Button>
          <Button autoFocus onClick={removeQuery}>
            {translate("ra.action.confirm")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export interface RemoveSavedQueryDialogProps {
  open: boolean;
  onClose: () => void;
}
