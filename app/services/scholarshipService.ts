import type { ScholarshipResponse, Scholarship } from '~/types/scholarship'

export const scholarshipService = {
  async getScholarships(params: { page?: number; search?: string } = {}): Promise<ScholarshipResponse | null> {
    try {
      const config = useRuntimeConfig()
      const { locale: localeRef } = useLocale()

      return await $fetch<ScholarshipResponse>('/api/v1/scholarships', {
        baseURL: config.public.apiBase || '',
        query: { 
          page: params.page || 1, 
          search: params.search || undefined,
          locale: localeRef.value 
        }
      })
    } catch (error) {
      console.warn('Failed to fetch scholarships list API.', error)
      return null
    }
  },

  async getScholarshipBySlug(slug: string): Promise<Scholarship | null> {
    try {
      const config = useRuntimeConfig()
      const { locale: localeRef } = useLocale()

      return await $fetch<Scholarship>(`/api/v1/scholarships/${slug}`, {
        baseURL: config.public.apiBase || '',
        query: { locale: localeRef.value }
      })
    } catch (error: any) {
      if (error.response?.status === 404) return null
      console.warn('Failed to fetch scholarship detail API.', error)
      return null
    }
  }
}