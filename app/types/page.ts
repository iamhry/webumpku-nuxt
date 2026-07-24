import type { Facility } from '~/types/facility'
import type { Research } from '~/types/research'
import type { Leader } from '~/types/leader'

export interface PageSeo {
  title: string;
  description: string;
  keywords: string;
  og_image: string;
}

export interface PageSectionItem {
  id: number | string;
  title?: string;
  subtitle?: string;
  description?: string;
  content?: string;
  image?: string;
  icon?: string;
  url?: string;
  button_text?: string;
  settings?: any;
  sort_order: number;
}

export interface PageSection {
  id: number | string;
  type: string;
  title?: string;
  subtitle?: string;
  content?: string;
  image?: string;
  button_text?: string;
  button_url?: string;
  settings?: any;
  sort_order: number;
  items?: PageSectionItem[];
  /** Master embeds — facility_grid (not items) */
  facilities?: Facility[];
  /** Master embeds — research_grid (API key is researchs) */
  researchs?: Research[];
  /** Master embeds — leader_grid */
  leaders?: Leader[];
}

export interface PageDetail {
  id: number;
  slug: string;
  page_type: string;
  title: string;
  excerpt: string;
  content: string;
  featured_image: string;
  banner_image: string;
  video_url: string;
  seo: PageSeo;
  sections: PageSection[];
  updated_at: string;
  locale: string;
}
