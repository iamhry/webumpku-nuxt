import type { QuickAccessResponse } from '~/types/quickAccess'

export const quickAccessService = {
  async getQuickAccess(): Promise<QuickAccessResponse | null> {
    try {
      const config = useRuntimeConfig()
      const { locale } = useLocale()
      return await $fetch<QuickAccessResponse>('/api/v1/quick-access', {
        baseURL: config.public.apiBase || '',
        query: { locale: locale.value }
      })
    } catch (error) {
      console.warn('Failed to fetch quick access API', error)
      return null
    }
  }
}
