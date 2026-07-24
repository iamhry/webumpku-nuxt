export interface Research {
  id: number
  title?: string | null
  slug: string
  image?: string | null
  category?: string | null
  description?: string | null
  year?: number | string | null
  locale?: string
}

export interface ResearchListResponse {
  data: Research[]
  meta?: {
    current_page?: number
    last_page?: number
    per_page?: number
    total?: number
  }
  links?: Record<string, string | null>
}
