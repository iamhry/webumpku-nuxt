export interface Reputation {
  id: number;
  slug: string;
  type: string;
  title: string;
  subtitle: string;
  value: string;
  description: string;
  icon: string;
  color: string;
  image: string;
  url: string;
  target: string;
}

export interface ReputationResponse {
  data: Reputation[];
}
