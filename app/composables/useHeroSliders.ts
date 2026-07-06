import { storeToRefs } from 'pinia'
import { useHeroSlidersStore } from '~/stores/hero-sliders'
import { useAsyncData, useI18n } from '#imports'

export const useHeroSliders = () => {
  const store = useHeroSlidersStore()
  const { sliders, loading, activeSlides } = storeToRefs(store)
  const { locale } = useLocale()

  const fetchHeroSliders = async () => {
    return await useAsyncData('hero-sliders-data', async () => {
      await store.loadSliders(locale.value)
      return true
    }, {
      watch: [locale]
    })
  }

  return {
    sliders,
    loading,
    activeSlides,
    fetchHeroSliders
  }
}
