export interface SdgTarget {
  code: string
  title: string
  title_id?: string
  title_en?: string
}

export interface SdgGoal {
  id: number
  goal_number?: number
  number?: number
  slug: string
  /** API may use `name`; legacy/list may use `title` */
  name?: string
  title?: string
  short_name?: string
  description?: string | null
  color?: string
  icon?: string
  image?: string
  icon_image?: string
  banner_image?: string
  official_url?: string | null
  statistics?: Record<string, any>
  targets?: SdgTarget[]
  meta_title?: string
  meta_description?: string
  og_image?: string
  related_news?: any[]
  news_count?: number
  article_count?: number
  activity_count?: number
}

/** Normalized detail object used by the detail page UI */
export interface SdgDetailView {
  id: number
  goal_number: number
  slug: string
  name: string
  name_id: string
  name_en: string
  short_name: string
  tagline: string
  description: string
  description_id: string
  description_en: string
  color: string
  icon: string
  image: string
  official_url: string | null
  targets: SdgTarget[]
}

export interface SdgsResponse {
  data: SdgGoal[]
  meta: {
    current_page: number
    last_page: number
    total: number
  }
}

export interface SdgDetailResponse {
  data?: SdgGoal
}
