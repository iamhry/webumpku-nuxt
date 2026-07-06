import { computed } from 'vue'
import { useSdgsStore } from '~/stores/sdgs'
import { sdgsService } from '~/services/sdgs'
import type { SdgGoal } from '~/types/sdgs'

const fallbackSdgList: SdgGoal[] = [
    { id: 1, title: 'No Poverty', slug: 'no-poverty', description: 'End poverty in all its forms everywhere.', banner_image: '/assets/img/project/1.jpg', icon_image: '/assets/img/icon/1.png', statistics: { poverty_rate: '2%' } },
    { id: 2, title: 'Quality Education', slug: 'quality-education', description: 'Ensure inclusive and equitable quality education.', banner_image: '/assets/img/project/2.jpg', icon_image: '/assets/img/icon/2.png', statistics: { literacy_rate: '99%' } }
]

export const useSdgs = () => {
  const sdgsStore = useSdgsStore()

  const fetchSdgsList = async (page: number = 1) => {
    sdgsStore.setLoading(true)
    sdgsStore.setError(null)

    const { data, error } = await useAsyncData(`sdgs-list-${page}`, () => sdgsService.getSdgs(page))

    if (data.value && data.value.data) {
      sdgsStore.setGoals(data.value.data, data.value.meta)
    } else {
      sdgsStore.setGoals(fallbackSdgList, { current_page: 1, last_page: 1, total: 2 })
    }

    sdgsStore.setLoading(false)
  }

  const fetchSdgDetail = async (slug: string) => {
    sdgsStore.setLoading(true)
    sdgsStore.setError(null)

    const { data, error } = await useAsyncData(`sdg-detail-${slug}`, () => sdgsService.getSdgBySlug(slug))

    if (data.value && data.value.data) {
      sdgsStore.setCurrentGoal(data.value.data)
    } else if (error.value?.statusCode === 404) {
      sdgsStore.setCurrentGoal(null)
      sdgsStore.setError('SDG Not Found')
    } else {
      sdgsStore.setCurrentGoal({ ...fallbackSdgList[0], slug, title: `Fallback SDG: ${slug}` })
    }

    sdgsStore.setLoading(false)
  }

  return {
    goals: computed(() => sdgsStore.goals),
    currentGoal: computed(() => sdgsStore.currentGoal),
    meta: computed(() => sdgsStore.meta),
    loading: computed(() => sdgsStore.loading),
    error: computed(() => sdgsStore.error),
    fetchSdgsList,
    fetchSdgDetail
  }
}
