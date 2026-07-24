export interface Facility {
  id: number
  name?: string | null
  slug: string
  excerpt?: string | null
  description?: string | null
  icon?: string | null
  image?: string | null
  category?: string | null
  tile: 'card' | 'image' | string
  accent?: 'primary' | 'secondary' | string | null
  url?: string | null
  locale?: string
}

export interface FacilityListResponse {
  data: Facility[]
  meta?: {
    current_page?: number
    last_page?: number
    per_page?: number
    total?: number
  }
  links?: Record<string, string | null>
}

export interface FacilityDetailResponse {
  data: Facility
}
