import type { GalleryResponse } from '~/types/gallery'

export const galleryService = {
  async getHomepageGallery(limit: number = 12): Promise<GalleryResponse | null> {
    try {
      const config = useRuntimeConfig()
      const nuxtApp = useNuxtApp()
      const { locale: localeRef } = useLocale();
      const locale = localeRef.value

      return await $fetch<GalleryResponse>('/api/v1/gallery/homepage', {
        baseURL: config.public.apiBase || '',
        query: { locale, limit }
      })
    } catch (error) {
      console.warn('Failed to fetch homepage gallery.', error)
      return null
    }
  }
}
