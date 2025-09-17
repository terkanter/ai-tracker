import { Badge } from "@workspace/ui/badge";
import {
  RecordContextProvider,
  RecordRepresentation,
  useListContext,
} from "ra-core";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function SingleFieldList<RecordType = any>({
  children,
  render,
  className,
}: {
  children?: React.ReactNode;
  render?: (record: RecordType, index: number) => React.ReactNode;
  className?: string;
}) {
  const { data } = useListContext();

  return (
    <div className={`flex gap-2 ${className}`}>
      {data?.map((record, index) => (
        <RecordContextProvider key={index} value={record}>
          {render ? render(record, index) : children || <DefaultChildren />}
        </RecordContextProvider>
      ))}
    </div>
  );
}

function DefaultChildren() {
  return (
    <Badge variant="outline">
      <RecordRepresentation />
    </Badge>
  );
}
