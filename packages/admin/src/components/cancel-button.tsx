import { Button, type ButtonProps } from "@workspace/ui/button";
import { CircleX } from "lucide-react";
import { Translate } from "ra-core";
import { useNavigate } from "react-router";

export function CancelButton(props: Omit<ButtonProps, "asChild">) {
  const navigate = useNavigate();

  return (
    <Button
      className="cursor-pointer"
      type="button"
      variant="ghost"
      onClick={() => navigate(-1)}
      {...props}
    >
      <CircleX />
      <Translate i18nKey="ra.action.cancel">Cancel</Translate>
    </Button>
  );
}
