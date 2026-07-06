export interface Statistic {
  id: number;
  title: string;
  description: string | null;
  value: number;
  suffix: string | null;
  icon: string;
}

export interface StatisticsResponse {
  data: Statistic[];
}
