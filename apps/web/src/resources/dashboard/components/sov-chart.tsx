import { Button } from "@workspace/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@workspace/ui/chart";
import { Cell, Pie, PieChart } from "recharts";
import { mockSOVData } from "../data/mock-data";

const chartConfig = {
  value: {
    label: "Share",
  },
};

export const SOVChart = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base font-medium flex items-center gap-2">
              SOV
              <span className="text-sm font-normal text-green-600">+21%</span>
            </CardTitle>
            <p className="text-lg font-bold">50%</p>
          </div>
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            Analyze competitors →
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-8">
          <div className="flex-1">
            <ChartContainer
              config={chartConfig}
              className="h-[200px] w-[200px]"
            >
              <PieChart>
                <Pie
                  data={mockSOVData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {mockSOVData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      formatter={(value) => [`${value}%`, "Share"]}
                    />
                  }
                />
              </PieChart>
            </ChartContainer>
          </div>

          <div className="flex-1 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">Rank</span>
              <span className="font-medium">Name</span>
              <span className="font-medium">Share</span>
              <span className="font-medium">Change</span>
            </div>

            {mockSOVData.map((item, index) => (
              <div
                key={item.name}
                className="flex items-center justify-between text-sm"
              >
                <span className="w-8 text-center font-mono">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="flex items-center gap-2 flex-1">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span>{item.name}</span>
                </div>
                <span className="w-12 text-right font-mono">{item.value}%</span>
                <span
                  className={`w-16 text-right font-mono ${
                    index === 0 ? "text-red-600" : "text-green-600"
                  }`}
                >
                  {index === 0
                    ? "-21.43%"
                    : index === 1
                      ? "+150%"
                      : index === 2
                        ? "+200%"
                        : "+50%"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
