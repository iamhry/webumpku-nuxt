import { computed, watch } from 'vue'
import { useAsyncData, useState } from '#imports'
import { useI18n } from 'vue-i18n'
import { contactService } from '~/services/contact'
import type { CampusLocation, ContactResponse, SocialMedia } from '~/types/contact'

export const useContact = () => {
  const { locale } = useLocale()

  const mainLocationState = useState<CampusLocation | null>('contact-main-location', () => null)
  const locationsState    = useState<CampusLocation[]>('contact-locations', () => [])
  const socialMediaState  = useState<SocialMedia | null>('contact-social-media', () => null)
  const isLoadingState    = useState<boolean>('contact-loading', () => false)
  const hasErrorState     = useState<boolean>('contact-error', () => false)

  const fetchContact = async () => {
    isLoadingState.value = true
    hasErrorState.value  = false

    const { data, error } = await useAsyncData<ContactResponse>(
      `contact-data-${locale.value}`,
      () => contactService.getContact({ locale: locale.value }),
      {
        lazy:   false,
        server: true,
        watch:  [locale],
      }
    )

    watch(
      data,
      (response) => {
        if (response) {
          mainLocationState.value = response.main_location
          locationsState.value    = response.locations ?? []
          socialMediaState.value  = response.social_media ?? null
        }
        isLoadingState.value = false
      },
      { immediate: true }
    )

    if (error.value) {
      hasErrorState.value  = true
      isLoadingState.value = false
    }
  }

  return {
    fetchContact,
    mainLocation: computed(() => mainLocationState.value),
    locations:    computed(() => locationsState.value),
    socialMedia:  computed(() => socialMediaState.value),
    isLoading:    computed(() => isLoadingState.value),
    hasError:     computed(() => hasErrorState.value),
  }
}
