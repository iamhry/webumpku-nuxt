import type { ScholarshipResponse, Scholarship } from '~/types/scholarship'

export const useScholarship = () => {
  const config = useRuntimeConfig()
  const { locale } = useLocale()

  const getScholarships = (params: { page: Ref<number>; search: Ref<string> }) => {
    // Unique key dinamis untuk caching SSR
    const asyncKey = computed(() => `scholarships-p${params.page.value}-s${params.search.value}`)

    return useAsyncData<ScholarshipResponse>(
      asyncKey.value,
      () =>
        $fetch<ScholarshipResponse>('/api/v1/scholarships', {
          baseURL: config.public.apiBase || '',
          query: {
            page: params.page.value,
            search: params.search.value || undefined,
            locale: locale.value
          }
        }),
      {
        watch: [params.page, params.search],
        lazy: false
      }
    )
  }

  const getScholarshipDetail = (slug: string) => {
    return useAsyncData<Scholarship>(
      `scholarship-detail-${slug}`,
      async () => {
        const res = await $fetch<any>(`/api/v1/scholarships/${slug}`, {
          baseURL: config.public.apiBase || '',
          query: { locale: locale.value }
        })
        return res?.data || res
      }
    )
  }

  return {
    getScholarships,
    getScholarshipDetail
  }
}