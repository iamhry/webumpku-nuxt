import type { Faculty } from '~/types/faculty'
import type { StudyProgram } from '~/types/study-program'

export interface GetFacultiesParams {
  locale?: string
}

export const facultyService = {
  async getFaculties(params: GetFacultiesParams = {}): Promise<Faculty[]> {
    const config = useRuntimeConfig()
    try {
      const response = await $fetch<{ data: Faculty[] }>('/api/v1/faculties', {
        baseURL: config.public.apiBase || '',
        params
      })
      return response.data || []
    } catch (e) {
      console.error('Failed to fetch faculties:', e)
      return []
    }
  },

  async getFacultyBySlug(slug: string, params: GetFacultiesParams = {}): Promise<Faculty | null> {
    const config = useRuntimeConfig()
    try {
      const response = await $fetch<{ data: Faculty }>(`/api/v1/faculties/${slug}`, {
        baseURL: config.public.apiBase || '',
        params
      })
      return response.data || null
    } catch (e) {
      console.error(`Failed to fetch faculty with slug ${slug}:`, e)
      return null
    }
  },

  async getFacultyStudyPrograms(slug: string, params: GetFacultiesParams = {}): Promise<StudyProgram[]> {
    const config = useRuntimeConfig()
    try {
      const response = await $fetch<{ data: StudyProgram[] }>(`/api/v1/faculties/${slug}/study-programs`, {
        baseURL: config.public.apiBase || '',
        params
      })
      return response.data || []
    } catch (e) {
      console.error(`Failed to fetch study programs for faculty ${slug}:`, e)
      return []
    }
  }
}
