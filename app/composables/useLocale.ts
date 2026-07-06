type LocaleCode = 'id' | 'en'

export const useLocale = () => {
  const locale = useCookie<LocaleCode>('site_locale', {
    default: () => 'id',
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
    path: '/',
  })

  const setLocale = async (value: LocaleCode) => {
    locale.value = value
    if (import.meta.client) {
      await refreshNuxtData()
    }
  }

  const toggleLocale = async () => {
    locale.value = locale.value === 'id' ? 'en' : 'id'
    if (import.meta.client) {
      await refreshNuxtData()
    }
  }

  const isLocale = (value: LocaleCode) => {
    return locale.value === value
  }

  return {
    locale,
    setLocale,
    toggleLocale,
    isLocale,
  }
}
