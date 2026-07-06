import { useHomepageStore } from '~/stores/homepage'
import { computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'

export const useHomepage = () => {
  const store = useHomepageStore()
  const { locale } = useLocale()
  
  const fetchSections = async (force: boolean = false) => {
    await store.fetchSections(locale.value, force)
  }

  // Automatically refresh when language changes
  watch(locale, async () => {
    await fetchSections(true)
  })

  return {
    sections: computed(() => store.sections),
    isLoading: computed(() => store.isLoading),
    hasLoaded: computed(() => store.hasLoaded),
    fetchSections,
  }
}
