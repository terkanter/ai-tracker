import { Badge } from "@workspace/ui/badge";
import { Button } from "@workspace/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@workspace/ui/chart";
import { Calendar, Info } from "lucide-react";
import { Area, AreaChart, XAxis, YAxis } from "recharts";
import {
  mockBrandVisibilityData,
  mockBrandVisibilityProviders,
} from "../data/mock-data";

const chartConfig = {
  gemini: {
    label: "Gemini",
    color: "#10b981",
  },
  perplexity: {
    label: "Perplexity",
    color: "#f59e0b",
  },
  chatgpt: {
    label: "ChatGPT",
    color: "#3b82f6",
  },
};

export const VisitorsChart = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CardTitle className="text-base font-medium">
              Overall Brand Visibility
            </CardTitle>
            <Info className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              Daily
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-2"
            >
              <Calendar className="h-4 w-4" />
              Aug 01 - Aug 26
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold">31.9%</span>
          <Badge
            variant="destructive"
            className="bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-900 dark:text-red-200"
          >
            -2.2%
          </Badge>
        </div>

        <div className="flex gap-6 text-sm">
          <Button
            variant="outline"
            size="sm"
            className="bg-gray-100 text-gray-700"
          >
            Regions
          </Button>
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            Topics
          </Button>
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            Branded & Non Branded
          </Button>
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            Prompt Intent
          </Button>
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            Providers
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chart Section */}
          <div className="lg:col-span-2">
            <div className="mb-4 text-sm text-muted-foreground">
              Your brand appears in 626 prompts out of 1965 total analyzed
              prompts
              <Button
                variant="ghost"
                size="sm"
                className="ml-auto text-muted-foreground p-0 h-auto"
              >
                View prompts →
              </Button>
            </div>

            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <AreaChart data={mockBrandVisibilityData}>
                <defs>
                  <linearGradient id="fillGemini" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
                  </linearGradient>
                  <linearGradient
                    id="fillPerplexity"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.1} />
                  </linearGradient>
                  <linearGradient id="fillChatgpt" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12 }}
                  className="text-muted-foreground"
                />
                <YAxis
                  domain={[0, 40]}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12 }}
                  className="text-muted-foreground"
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  type="monotone"
                  dataKey="chatgpt"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  fill="url(#fillChatgpt)"
                />
                <Area
                  type="monotone"
                  dataKey="perplexity"
                  stroke="#f59e0b"
                  strokeWidth={2}
                  fill="url(#fillPerplexity)"
                />
                <Area
                  type="monotone"
                  dataKey="gemini"
                  stroke="#10b981"
                  strokeWidth={2}
                  fill="url(#fillGemini)"
                />
              </AreaChart>
            </ChartContainer>
          </div>

          {/* Ranking Table */}
          <div className="space-y-4">
            <div className="grid grid-cols-4 gap-2 text-sm font-medium text-muted-foreground pb-2 border-b">
              <div>Rank</div>
              <div>Name</div>
              <div>Visibility</div>
              <div>Change</div>
            </div>

            {mockBrandVisibilityProviders.map((provider) => (
              <div
                key={provider.rank}
                className="grid grid-cols-4 gap-2 items-center py-2"
              >
                <div className="font-mono text-sm">
                  {String(provider.rank).padStart(2, "0")}
                </div>

                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: provider.color }}
                  />
                  <span className="font-medium text-sm">{provider.name}</span>
                </div>

                <div className="font-mono text-sm font-bold">
                  {provider.visibility}
                </div>

                <div>
                  <Badge
                    variant="default"
                    className="bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-200"
                  >
                    +{provider.change.toFixed(2)}%
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
