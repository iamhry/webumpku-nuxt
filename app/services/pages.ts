import type { PageDetail } from '~/types/page'

export const pagesService = {
  async getPageDetail(slug: string, locale: string): Promise<PageDetail> {
    const config = useRuntimeConfig()
    const apiBase = config.public.apiBase || ''
    
    // As requested, the API returns the page detail directly (not wrapped in data)
    const response = await $fetch<PageDetail>(`/api/v1/pages/${slug}`, {
      baseURL: apiBase,
      query: { locale }
    })
    
    return response;
  }
}
