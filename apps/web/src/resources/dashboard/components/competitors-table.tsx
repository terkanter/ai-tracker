import { Badge } from "@workspace/ui/badge";
import { Button } from "@workspace/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/card";
import { mockCompetitors } from "../data/mock-data";

export const CompetitorsTable = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">
            Competitors Analysis
          </CardTitle>
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            Analyze competitors →
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-4 gap-4 text-sm font-medium text-muted-foreground pb-2 border-b">
            <div>Rank</div>
            <div>Name</div>
            <div>Share</div>
            <div>Change</div>
          </div>

          {mockCompetitors.map((competitor) => (
            <div
              key={competitor.rank}
              className="grid grid-cols-4 gap-4 items-center py-2"
            >
              <div className="font-mono text-sm">
                {String(competitor.rank).padStart(2, "0")}
              </div>

              <div className="flex items-center gap-3">
                <div
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: competitor.color }}
                />
                <span className="font-medium">{competitor.name}</span>
              </div>

              <div className="font-mono text-sm">{competitor.share}%</div>

              <div>
                <Badge
                  variant={competitor.change > 0 ? "default" : "destructive"}
                  className={
                    competitor.change > 0
                      ? "bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-200"
                      : "bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-900 dark:text-red-200"
                  }
                >
                  {competitor.change > 0 ? "+" : ""}
                  {competitor.change}%
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
