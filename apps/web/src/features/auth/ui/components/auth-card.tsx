import { Card, CardBody, CardFooter, CardHeader } from "@workspace/ui/card";
import { ReactNode } from "react";

interface AuthCardProps {
  title: string;
  description: string;
  children?: ReactNode;
  footer?: ReactNode;
  compact?: boolean;
}

export function AuthCard({
  title,
  description,
  children,
  footer,
  compact = false,
}: AuthCardProps) {
  return (
    <Card className={compact ? "w-full" : "w-full max-w-md"}>
      <CardHeader className="pb-4">
        <div className="text-center">
          <h1 className={compact ? "text-xl font-bold" : "text-2xl font-bold"}>
            {title}
          </h1>
          <p className="text-small text-default-500 mt-2">{description}</p>
        </div>
      </CardHeader>
      {children && <CardBody className="space-y-4 p-4">{children}</CardBody>}
      {footer && <CardFooter className="pt-4">{footer}</CardFooter>}
    </Card>
  );
}
