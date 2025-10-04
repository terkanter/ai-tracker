import { Badge } from "@workspace/ui/badge";
import { Card, CardContent, CardHeader } from "@workspace/ui/card";
import { TrendingDown, TrendingUp } from "lucide-react";
import { mockTopicMetrics } from "../data/mock-data";
import type { TopicMetricData } from "../types";

type TopicMetricProps = TopicMetricData;

const TopicMetricCard = ({
  title,
  value,
  change,
  trend,
  description,
  subtitle,
}: TopicMetricProps) => {
  const TrendIcon = trend === "up" ? TrendingUp : TrendingDown;
  const trendColor = trend === "up" ? "text-green-600" : "text-red-600";

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <Badge
          variant="secondary"
          className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
        >
          {title}
        </Badge>
        <div className={`flex items-center gap-1 text-sm ${trendColor}`}>
          <TrendIcon className="h-4 w-4" />
          {change}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="text-2xl font-bold">{value}</div>
          <div className="text-sm text-muted-foreground">
            <div className="font-medium">{subtitle}</div>
            <div>{description}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const TopicMetrics = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Topic Metrics</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {mockTopicMetrics.map((metric, index) => (
          <TopicMetricCard key={index} {...metric} />
        ))}
      </div>
    </div>
  );
};
