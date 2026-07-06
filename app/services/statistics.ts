import { useRuntimeConfig } from '#app'
import type { StatisticsResponse } from '~/types/statistic'

export class StatisticsService {
  async getStatistics(locale: string): Promise<StatisticsResponse> {
    const config = useRuntimeConfig()
    const apiBase = config.public.apiBase || ''
    return await $fetch<StatisticsResponse>(`/api/v1/statistics`, {
      baseURL: apiBase,
      query: { locale }
    })
  }
}

export const statisticsService = new StatisticsService()
