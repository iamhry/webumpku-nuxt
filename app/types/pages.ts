export interface PageSection {
  id: string | number;
  type: 'hero' | 'content' | 'gallery' | 'statistics' | 'cta';
  data: any;
  order: number;
}

export interface DynamicPage {
  id: number;
  title: string;
  slug: string;
  meta_title?: string;
  meta_description?: string;
  og_image?: string;
  sections: PageSection[];
}

export interface PageResponse {
  data: DynamicPage;
}
