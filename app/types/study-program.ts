import type { Faculty } from './faculty'

export interface StudyProgram {
  id: number | string
  slug: string
  name: string
  description?: string
  vision?: string
  mission?: string
  career_prospects?: string | string[]
  degree?: string
  accreditation?: string
  banner?: string
  head_name?: string
  head_title?: string
  head_photo?: string
  email?: string
  phone?: string
  website?: string
  student_count?: number
  graduate_count?: number
  theme_color?: string
  faculty?: Faculty
  seo_description?: string
}
