import type { ReputationResponse } from '~/types/reputation'

export const useReputationService = () => {
  const config = useRuntimeConfig()
  const apiBase = config.public.apiBase

  const getHomepageReputations = async (locale: string = 'id'): Promise<ReputationResponse> => {
    try {
      const response = await $fetch<ReputationResponse>(`${apiBase}/api/v1/reputations/homepage`, {
        params: { locale }
      })
      return response
    } catch (error) {
      console.error('Error fetching homepage reputations:', error)
      throw error
    }
  }

  return {
    getHomepageReputations
  }
}
