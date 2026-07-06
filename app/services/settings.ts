import type { SiteSettings, SettingsResponse } from '~/types/settings'

export const settingsService = {
  async getSettings(): Promise<SiteSettings | null> {
    try {
      const config = useRuntimeConfig()
      const apiBase = config.public.apiBase || ''
      
      const response = await $fetch<SiteSettings>('/api/v1/settings', {
        baseURL: apiBase,
      })
      
      if (response && response.logo && !response.logo.startsWith('http')) {
        response.logo = `${apiBase}${response.logo}`
      }
      
      return response || null
    } catch (error) {
      console.warn('Failed to fetch settings API. Using fallbacks.', error)
      return null
    }
  }
}
