import { storeToRefs } from 'pinia'
import { useStatisticsStore } from '~/stores/statistics'
import { useI18n } from '#imports'
import { useAsyncData } from '#app'

export const useStatistics = () => {
  const store = useStatisticsStore()
  const { statistics, loading, error } = storeToRefs(store)
  const { locale } = useLocale()

  const fetchStatistics = async () => {
    await useAsyncData(
      `statistics-${locale.value}`,
      async () => {
        await store.fetchStatistics(locale.value)
        return true
      },
      {
        watch: [locale]
      }
    )
  }

  return {
    statistics,
    loading,
    error,
    fetchStatistics
  }
}
