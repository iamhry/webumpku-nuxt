export interface HomepageSection {
  id: string;
  name: string;
  type: 'hero' | 'about' | 'statistics' | 'faculties' | 'study_programs' | 'news' | 'sdgs' | 'partners' | 'cta' | 'gallery' | 'video';
  title: string | null;
  subtitle: string | null;
  content: string | null;
  image: string | null;
  button_text: string | null;
  button_url: string | null;
  settings: Record<string, any> | null;
  sort_order: number;
}

export interface HomepageResponse {
  data: HomepageSection[];
}
