export interface Leader {
  id: number
  name?: string | null
  slug: string
  photo?: string | null
  position?: string | null
  category?: string | null
  description?: string | null
  locale?: string
}

export interface LeaderListResponse {
  data: Leader[]
  meta?: {
    current_page?: number
    last_page?: number
    per_page?: number
    total?: number
  }
  links?: Record<string, string | null>
}
