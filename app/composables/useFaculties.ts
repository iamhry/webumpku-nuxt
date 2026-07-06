import { computed, watch } from 'vue'
import { useAsyncData, useState } from '#imports'
import { facultyService } from '~/services/faculties'
import { useI18n } from 'vue-i18n'
import type { Faculty } from '~/types/faculty'

export const useFaculties = () => {
  const { locale } = useLocale()
  const facultiesState = useState<Faculty[]>('faculties-state', () => [])
  const isLoadingState = useState<boolean>('faculties-loading', () => false)
  const hasErrorState = useState<boolean>('faculties-error', () => false)
  
  const fetchFaculties = async () => {
    isLoadingState.value = true
    hasErrorState.value = false
    
    const { data, error } = await useAsyncData<Faculty[]>(`faculties-fetch-${locale.value}`, () => facultyService.getFaculties({
      locale: locale.value
    }), {
      lazy: false,
      server: true,
      watch: [locale]
    })
    
    watch(data, (newFaculties) => {
      if (newFaculties) {
        facultiesState.value = newFaculties
      }
      isLoadingState.value = false
    }, { immediate: true })
    
    if (error.value) {
      hasErrorState.value = true
      isLoadingState.value = false
    }
    
    return facultiesState.value
  }
  
  return {
    fetchFaculties,
    faculties: computed(() => facultiesState.value),
    isLoading: computed(() => isLoadingState.value),
    hasError: computed(() => hasErrorState.value)
  }
}
