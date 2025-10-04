import type {
  BrandVisibilityData,
  BrandVisibilityProvider,
  ChartDataPoint,
  CompetitorData,
  MetricData,
  SentimentProvider,
  SentimentScoreData,
  SOVData,
  TopicMetricData,
} from "../types";

export const mockMetrics: MetricData[] = [
  {
    title: "Visibility",
    value: "$1,250.00",
    change: "+12.5%",
    trend: "up",
    description: "Trending up this month",
    color: "purple",
  },
  {
    title: "SOV",
    value: "1,234",
    change: "-20%",
    trend: "down",
    description: "Down 20% this period",
    color: "blue",
  },
  {
    title: "Average position",
    value: "45,678",
    change: "+12.5%",
    trend: "up",
    description: "Strong user retention",
    color: "green",
  },
  {
    title: "Sentiment score",
    value: "4.5%",
    change: "+4.5%",
    trend: "up",
    description: "Steady performance increase",
    color: "orange",
  },
];

export const mockChartData: ChartDataPoint[] = [
  { date: "Apr 3", visitors: 2400, previousPeriod: 2200 },
  { date: "Apr 9", visitors: 1800, previousPeriod: 2100 },
  { date: "Apr 15", visitors: 3200, previousPeriod: 2800 },
  { date: "Apr 22", visitors: 2800, previousPeriod: 2600 },
  { date: "Apr 29", visitors: 3800, previousPeriod: 3200 },
  { date: "May 6", visitors: 2200, previousPeriod: 2400 },
  { date: "May 13", visitors: 4200, previousPeriod: 3800 },
  { date: "May 20", visitors: 3400, previousPeriod: 3100 },
  { date: "May 27", visitors: 3800, previousPeriod: 3400 },
  { date: "Jun 3", visitors: 4400, previousPeriod: 4000 },
  { date: "Jun 9", visitors: 3600, previousPeriod: 3300 },
  { date: "Jun 15", visitors: 4800, previousPeriod: 4200 },
  { date: "Jun 22", visitors: 4200, previousPeriod: 3900 },
  { date: "Jun 30", visitors: 4600, previousPeriod: 4100 },
];

export const mockSOVData: SOVData[] = [
  { name: "Tastewise", value: 50.0, color: "#3b82f6" },
  { name: "NielsenIQ", value: 22.7, color: "#10b981" },
  { name: "Mintel", value: 13.6, color: "#f59e0b" },
  { name: "Innova Market Insights", value: 13.6, color: "#8b5cf6" },
];

export const mockCompetitors: CompetitorData[] = [
  { rank: 1, name: "Tastewise", share: 50.0, change: -21.43, color: "#3b82f6" },
  { rank: 2, name: "NielsenIQ", share: 22.7, change: 150, color: "#10b981" },
  { rank: 3, name: "Mintel", share: 13.6, change: 200, color: "#f59e0b" },
  {
    rank: 4,
    name: "Innova Market Insights",
    share: 13.6,
    change: 50,
    color: "#8b5cf6",
  },
];

export const mockTopicMetrics: TopicMetricData[] = [
  {
    title: "Average position",
    value: "$1,250.00",
    change: "+12.5%",
    trend: "up",
    subtitle: "Trending up this month",
    description: "Visitors for the last 6 months",
  },
  {
    title: "topic",
    value: "1,234",
    change: "-20%",
    trend: "down",
    subtitle: "Down 20% this period",
    description: "Acquisition needs attention",
  },
  {
    title: "topic",
    value: "45,678",
    change: "+12.5%",
    trend: "up",
    subtitle: "Strong user retention",
    description: "Engagement exceed targets",
  },
  {
    title: "topic",
    value: "4.5%",
    change: "+4.5%",
    trend: "up",
    subtitle: "Steady performance increase",
    description: "Meets growth projections",
  },
];

export const mockSentimentData: SentimentScoreData[] = [
  { date: "2 янв.", gemini: 75, perplexity: 67, openai: 0 },
  { date: "3 янв.", gemini: 50, perplexity: 45, openai: 0 },
  { date: "14 янв.", gemini: 25, perplexity: 30, openai: 0 },
  { date: "15 янв.", gemini: 75, perplexity: 80, openai: 0 },
  { date: "27 янв.", gemini: 85, perplexity: 90, openai: 0 },
  { date: "28 янв.", gemini: 75, perplexity: 85, openai: 0 },
  { date: "10 февр.", gemini: 95, perplexity: 100, openai: 0 },
  { date: "11 февр.", gemini: 85, perplexity: 75, openai: 0 },
  { date: "27 февр.", gemini: 100, perplexity: 67, openai: 0 },
  { date: "28 февр.", gemini: 0, perplexity: 0, openai: 0 },
  { date: "15 сент.", gemini: 75, perplexity: 50, openai: 0 },
  { date: "16 сент.", gemini: 50, perplexity: 75, openai: 0 },
];

export const mockSentimentProviders: SentimentProvider[] = [
  { rank: 1, name: "ChatGPT", score: 100, change: 100 },
  { rank: 2, name: "Grok", score: 100, change: 0 },
  { rank: 3, name: "Perplexity", score: 67, change: 103.03 },
  { rank: 4, name: "Google AI", score: 25, change: -62.69 },
];

export const mockBrandVisibilityData: BrandVisibilityData[] = [
  { date: "4 серп. - 5 серп.", gemini: 36, perplexity: 32, chatgpt: 30 },
  { date: "8 серп. - 9 серп.", gemini: 35, perplexity: 30, chatgpt: 29 },
  { date: "14 серп. - 15 серп.", gemini: 37, perplexity: 33, chatgpt: 31 },
  { date: "19 серп. - 20 серп.", gemini: 12, perplexity: 28, chatgpt: 26 },
  { date: "25 серп. - 26 серп.", gemini: 30, perplexity: 32, chatgpt: 28 },
];

export const mockBrandVisibilityProviders: BrandVisibilityProvider[] = [
  {
    rank: 1,
    name: "Gemini",
    visibility: "35.7%",
    change: 0.76,
    color: "#10b981",
  },
  {
    rank: 2,
    name: "Perplexity",
    visibility: "31.6%",
    change: 0.15,
    color: "#f59e0b",
  },
  {
    rank: 3,
    name: "ChatGPT",
    visibility: "28.2%",
    change: 1.07,
    color: "#3b82f6",
  },
];
