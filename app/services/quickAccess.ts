import type { QuickAccessResponse } from '~/types/quickAccess'

export const quickAccessService = {
  async getQuickAccess(): Promise<QuickAccessResponse | null> {
    try {
      const config = useRuntimeConfig()
      return await $fetch<QuickAccessResponse>('/api/v1/quick-access', {
        baseURL: config.public.apiBase || ''
      })
    } catch (error) {
      console.warn('Failed to fetch quick access API', error)
      return null
    }
  }
}
