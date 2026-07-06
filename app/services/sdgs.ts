import type { SdgsResponse, SdgDetailResponse } from '~/types/sdgs'

export const sdgsService = {
  async getSdgs(page: number = 1): Promise<SdgsResponse | null> {
    try {
      const config = useRuntimeConfig()
      const nuxtApp = useNuxtApp()
      const { locale: localeRef } = useLocale();
      const locale = localeRef.value
      
      return await $fetch<SdgsResponse>('/api/v1/sdgs', {
        baseURL: config.public.apiBase || '',
        query: { page, locale }
      })
    } catch (error) {
      console.warn('Failed to fetch SDGs list API.', error)
      return null
    }
  },
  async getSdgBySlug(slug: string): Promise<SdgDetailResponse | null> {
    try {
      const config = useRuntimeConfig()
      const nuxtApp = useNuxtApp()
      const { locale: localeRef } = useLocale();
      const locale = localeRef.value

      return await $fetch<SdgDetailResponse>(`/api/v1/sdgs/${slug}`, {
        baseURL: config.public.apiBase || '',
        query: { locale }
      })
    } catch (error: any) {
      if (error.response?.status === 404) return null;
      console.warn('Failed to fetch SDG detail API.', error)
      return null
    }
  }
}
