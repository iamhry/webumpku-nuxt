import type { HomepageResponse, HomepageSection } from '~/types/homepage'

export const homepageService = {
  async getSections(locale: string = 'id'): Promise<HomepageSection[]> {
    try {
      const config = useRuntimeConfig()
      const apiBase = config.public.apiBase || ''
      
      const response = await $fetch<HomepageResponse>('/api/v1/homepage', {
        baseURL: apiBase,
        query: { locale }
      })
      
      return response?.data || []
    } catch (error: any) {
      console.error('Failed to fetch homepage sections API.', error)
      return []
    }
  }
}
