import { Badge } from "@workspace/ui/badge";
import { Button } from "@workspace/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@workspace/ui/chart";
import { Info } from "lucide-react";
import { Area, AreaChart, XAxis, YAxis } from "recharts";
import { mockSentimentData, mockSentimentProviders } from "../data/mock-data";

const chartConfig = {
  gemini: {
    label: "GEMINI",
    color: "#10b981",
  },
  perplexity: {
    label: "PERPLEXITY",
    color: "#f59e0b",
  },
  openai: {
    label: "OPENAI",
    color: "#3b82f6",
  },
};

export const SentimentScore = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CardTitle className="text-base font-medium">
              Sentiment Score
            </CardTitle>
            <Info className="h-4 w-4 text-muted-foreground" />
          </div>
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            Breakdown →
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold">36</span>
          <Badge
            variant="destructive"
            className="bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-900 dark:text-red-200"
          >
            -2%
          </Badge>
        </div>
        <div className="flex gap-4 text-sm">
          <Button
            variant="outline"
            size="sm"
            className="bg-gray-100 text-gray-700"
          >
            Provider
          </Button>
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            Topic
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chart Section */}
          <div className="lg:col-span-2">
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <AreaChart data={mockSentimentData}>
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
                  <linearGradient id="fillOpenai" x1="0" y1="0" x2="0" y2="1">
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
                  domain={[0, 100]}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12 }}
                  className="text-muted-foreground"
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  type="monotone"
                  dataKey="openai"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  fill="url(#fillOpenai)"
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

            {/* Legend */}
            <div className="flex items-center justify-center gap-6 mt-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span>GEMINI: 75</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-orange-500" />
                <span>PERPLEXITY: 67</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500" />
                <span>OPENAI: 0</span>
              </div>
            </div>
          </div>

          {/* Ranking Table */}
          <div className="space-y-4">
            <div className="grid grid-cols-4 gap-2 text-sm font-medium text-muted-foreground pb-2 border-b">
              <div>Rank</div>
              <div>Name</div>
              <div>Score</div>
              <div>Change</div>
            </div>

            {mockSentimentProviders.map((provider) => (
              <div
                key={provider.rank}
                className="grid grid-cols-4 gap-2 items-center py-2"
              >
                <div className="font-mono text-sm">
                  {String(provider.rank).padStart(2, "0")}
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold">
                    {provider.name.charAt(0)}
                  </div>
                  <span className="font-medium text-sm">{provider.name}</span>
                </div>

                <div className="font-mono text-sm font-bold">
                  {provider.score}
                </div>

                <div>
                  <Badge
                    variant={provider.change >= 0 ? "default" : "destructive"}
                    className={
                      provider.change >= 0
                        ? "bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-200"
                        : "bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-900 dark:text-red-200"
                    }
                  >
                    {provider.change > 0 ? "+" : ""}
                    {provider.change.toFixed(provider.change % 1 === 0 ? 0 : 2)}
                    %
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
