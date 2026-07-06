export default defineNuxtPlugin((nuxtApp) => {
  const { locale } = useLocale()

  watch(locale, (value) => {
    if (import.meta.client) {
      document.documentElement.lang = value
    }
    // Sync with vue-i18n if available
    if (nuxtApp.$i18n) {
      nuxtApp.$i18n.setLocale(value)
    }
  }, { immediate: true })
})
