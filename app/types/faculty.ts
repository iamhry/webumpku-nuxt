import type { StudyProgram } from './study-program'

export interface Faculty {
  id: number | string
  slug: string
  name: string
  short_name?: string
  description?: string
  logo?: string
  banner?: string
  dean_name?: string
  dean_title?: string
  dean_photo?: string
  email?: string
  phone?: string
  website?: string
  theme_color?: string
  vision?: string
  mission?: string
  address?: string
  seo_description?: string
  study_programs?: StudyProgram[]
}
