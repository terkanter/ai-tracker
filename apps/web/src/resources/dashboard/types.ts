export interface MetricData {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  description: string;
  color: "purple" | "blue" | "green" | "orange";
}

export interface ChartDataPoint {
  date: string;
  visitors: number;
  previousPeriod: number;
}

export interface CompetitorData {
  rank: number;
  name: string;
  share: number;
  change: number;
  color: string;
}

export interface TopicMetricData {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  description: string;
  subtitle: string;
}

export interface SOVData {
  name: string;
  value: number;
  color: string;
}

export interface SentimentScoreData {
  date: string;
  gemini: number;
  perplexity: number;
  openai: number;
}

export interface SentimentProvider {
  rank: number;
  name: string;
  score: number;
  change: number;
  icon?: string;
}

export interface BrandVisibilityData {
  date: string;
  gemini: number;
  perplexity: number;
  chatgpt: number;
}

export interface BrandVisibilityProvider {
  rank: number;
  name: string;
  visibility: string;
  change: number;
  color: string;
}
