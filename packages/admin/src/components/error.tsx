import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@workspace/ui/accordion";
import { Button } from "@workspace/ui/button";
import { CircleAlert, History } from "lucide-react";
import {
  Translate,
  useDefaultTitle,
  useResetErrorBoundaryOnLocationChange,
} from "ra-core";
import type { ErrorInfo, HtmlHTMLAttributes } from "react";
import type { FallbackProps } from "react-error-boundary";

export function Error(props: InternalErrorProps & {}) {
  const { error, errorInfo, resetErrorBoundary, ...rest } = props;

  const title = useDefaultTitle();

  useResetErrorBoundaryOnLocationChange(resetErrorBoundary);

  return (
    <>
      {title ? <span>{title}</span> : null}
      <div className="flex flex-col items-center gap-5 p-20" {...rest}>
        <h1 className="mt-5 mb-5 flex items-center gap-3 text-3xl" role="alert">
          <CircleAlert className="w-2em h-2em" />
          <Translate i18nKey="ra.page.error" />
        </h1>
        <div>
          <Translate i18nKey="ra.message.error" />
        </div>
        {process.env.NODE_ENV !== "production" && (
          <>
            <Accordion className="bg-secondary mt-1 w-150 p-2" type="multiple">
              <AccordionItem value="error">
                <AccordionTrigger className="py-2">
                  <Translate i18nKey={error.message}>{error.message}</Translate>
                </AccordionTrigger>
                <AccordionContent className="pt-1 whitespace-pre-wrap">
                  <p>{errorInfo?.componentStack}</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <p className="text-center">
              Need help with this error? Try the following:
            </p>
            <div>
              <ul className="list-disc">
                <li>
                  Check the{" "}
                  <a
                    className="text-primary underline-offset-4 hover:underline"
                    href="https://marmelab.com/shadcn-admin-kit/docs"
                  >
                    shadcn-admin-kit documentation
                  </a>
                </li>
                <li>
                  Search on{" "}
                  <a
                    className="text-primary underline-offset-4 hover:underline"
                    href="https://stackoverflow.com/questions/tagged/shadcn-admin-kit"
                  >
                    StackOverflow
                  </a>{" "}
                  for community answers
                </li>
                <li>
                  Get help from the core team via{" "}
                  <a
                    className="text-primary underline-offset-4 hover:underline"
                    href="https://marmelab.com/shadcn-admin-kit/"
                  >
                    Shadcn Enterprise Edition
                  </a>
                </li>
              </ul>
            </div>
          </>
        )}
        <div className="mt-8">
          <Button onClick={goBack}>
            <History />
            <Translate i18nKey="ra.action.back" />
          </Button>
        </div>
      </div>
    </>
  );
}

interface InternalErrorProps
  extends Omit<HtmlHTMLAttributes<HTMLDivElement>, "title">,
    FallbackProps {
  className?: string;
  errorInfo?: ErrorInfo;
}

export interface ErrorProps extends Pick<FallbackProps, "error"> {
  errorInfo?: ErrorInfo;
}

function goBack() {
  window.history.go(-1);
}
