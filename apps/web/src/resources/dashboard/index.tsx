import { ResourceHeader } from "@workspace/admin/resource-header";
import {
  CompetitorsTable,
  MetricCards,
  SentimentScore,
  SOVChart,
  TopicMetrics,
  VisitorsChart,
} from "./components";

export const Dashboard = () => {
  return (
    <div className="space-y-6">
      <ResourceHeader title="Overview" />

      <div className="flex flex-col gap-6 pt-2">
        <MetricCards />

        <VisitorsChart />
        <SOVChart />

        <CompetitorsTable />

        <TopicMetrics />

        <SentimentScore />
      </div>
    </div>
  );
};
