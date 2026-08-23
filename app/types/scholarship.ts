export interface Scholarship {
  id: number
  title: string
  slug: string
  description?: string
  content?: string
  requirements?: string
  flyer_image?: string
  coverage_discount?: string
  registration_url?: string
  image?: string
  deadline?: string
  created_at?: string
}

export interface ScholarshipResponse {
  data: Scholarship[]
  meta?: {
    current_page: number
    last_page: number
    total: number
    per_page?: number
  }
}