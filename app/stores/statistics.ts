import { defineStore } from 'pinia'
import type { Statistic } from '~/types/statistic'
import { statisticsService } from '~/services/statistics'

interface StatisticsState {
  statistics: Statistic[];
  loading: boolean;
  error: string | null;
}

const fallbackStatistics: Statistic[] = [
  { id: 1, title: 'Mahasiswa Aktif', description: null, value: 0, suffix: '+', icon: 'student' },
  { id: 2, title: 'Dosen', description: null, value: 0, suffix: '+', icon: 'teacher' },
  { id: 3, title: 'Program Studi', description: null, value: 0, suffix: '+', icon: 'program' },
  { id: 4, title: 'Alumni', description: null, value: 0, suffix: '+', icon: 'alumni' }
]

export const useStatisticsStore = defineStore('statistics', {
  state: (): StatisticsState => ({
    statistics: [],
    loading: false,
    error: null,
  }),
  actions: {
    async fetchStatistics(locale: string) {
      this.loading = true
      this.error = null
      try {
        const response = await statisticsService.getStatistics(locale)
        this.statistics = response.data?.length ? response.data : fallbackStatistics
      } catch (error: any) {
        this.error = error.message || 'An error occurred'
        this.statistics = fallbackStatistics
      } finally {
        this.loading = false
      }
    }
  }
})
