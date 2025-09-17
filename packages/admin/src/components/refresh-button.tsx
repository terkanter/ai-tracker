import { Button } from "@workspace/ui/button";
import { LoaderCircle, RotateCw } from "lucide-react";
import { useLoading, useRefresh } from "ra-core";

export function RefreshButton() {
  const refresh = useRefresh();
  const loading = useLoading();

  const handleRefresh = () => {
    refresh();
  };

  return (
    <Button
      className="hidden sm:inline-flex"
      size="icon"
      variant="ghost"
      onClick={handleRefresh}
    >
      {loading ? <LoaderCircle className="animate-spin" /> : <RotateCw />}
    </Button>
  );
}
