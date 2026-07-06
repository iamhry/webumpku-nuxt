import type { HeroSliderResponse } from '~/types/hero-slider'
import { useRuntimeConfig } from '#imports'

export const heroSlidersService = {
  async getHeroSliders(locale?: string): Promise<HeroSliderResponse | null> {
    try {
      const config = useRuntimeConfig()
      const apiBase = config.public.apiBase || ''
      
      const query = locale ? { locale } : {}
      
      const response = await $fetch<HeroSliderResponse>('/api/v1/hero-sliders', {
        baseURL: apiBase,
        query
      })
      
      return response
    } catch (error) {
      console.warn('Failed to fetch hero sliders API. Using fallbacks.', error)
      return null
    }
  }
}
