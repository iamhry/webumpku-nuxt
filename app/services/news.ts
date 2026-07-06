import type { NewsResponse, NewsDetailResponse } from '~/types/news'

export const newsService = {
  async getNews(page: number = 1): Promise<NewsResponse | null> {
    try {
      const config = useRuntimeConfig()
      const nuxtApp = useNuxtApp()
      const { locale: localeRef } = useLocale();
      const locale = localeRef.value
      
      return await $fetch<NewsResponse>('/api/v1/news', {
        baseURL: config.public.apiBase || '',
        query: { page, locale }
      })
    } catch (error) {
      console.warn('Failed to fetch news list API.', error)
      return null
    }
  },
  async getNewsBySlug(slug: string): Promise<NewsDetailResponse | null> {
    try {
      const config = useRuntimeConfig()
      const nuxtApp = useNuxtApp()
      const { locale: localeRef } = useLocale();
      const locale = localeRef.value

      return await $fetch<NewsDetailResponse>(`/api/v1/news/${slug}`, {
        baseURL: config.public.apiBase || '',
        query: { locale }
      })
    } catch (error: any) {
      if (error.response?.status === 404) return null;
      console.warn('Failed to fetch news detail API.', error)
      return null
    }
  },
  async getLatestNews(limit: number = 5): Promise<NewsResponse | null> {
    try {
      const config = useRuntimeConfig()
      const nuxtApp = useNuxtApp()
      const { locale: localeRef } = useLocale();
      const locale = localeRef.value
      
      return await $fetch<NewsResponse>('/api/v1/news/latest', {
        baseURL: config.public.apiBase || '',
        query: { limit, locale }
      })
    } catch (error) {
      console.warn('Failed to fetch latest news API.', error)
      return null
    }
  }
}
