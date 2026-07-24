import type { Facility, FacilityDetailResponse, FacilityListResponse } from '~/types/facility'

export const facilitiesService = {
  async getFacilities(params: {
    locale?: string
    category?: string
    tile?: string
    limit?: number
    page?: number
  } = {}): Promise<FacilityListResponse | null> {
    try {
      const config = useRuntimeConfig()
      const { locale: localeRef } = useLocale()
      const locale = params.locale || localeRef.value

      return await $fetch<FacilityListResponse>('/api/v1/facilities', {
        baseURL: config.public.apiBase || '',
        query: {
          locale,
          category: params.category,
          tile: params.tile,
          limit: params.limit,
          page: params.page,
        },
      })
    } catch (error) {
      console.warn('Failed to fetch facilities list API.', error)
      return null
    }
  },

  async getFacilityBySlug(slug: string, locale?: string): Promise<Facility | null> {
    try {
      const config = useRuntimeConfig()
      const { locale: localeRef } = useLocale()
      const loc = locale || localeRef.value

      const response = await $fetch<FacilityDetailResponse | Facility>(`/api/v1/facilities/${slug}`, {
        baseURL: config.public.apiBase || '',
        query: { locale: loc },
      })

      // Support both wrapped `{ data }` and bare Facility payloads
      if (response && typeof response === 'object' && 'data' in response) {
        return (response as FacilityDetailResponse).data || null
      }
      return (response as Facility) || null
    } catch (error: any) {
      if (error?.response?.status === 404 || error?.statusCode === 404) return null
      console.warn('Failed to fetch facility detail API.', error)
      return null
    }
  },
}
