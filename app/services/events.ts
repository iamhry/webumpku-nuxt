import type { EventItem, EventsResponse, GetEventsParams } from '~/types/event'

export const eventService = {
  async getEvents(params: GetEventsParams = {}): Promise<EventsResponse | null> {
    try {
      const config = useRuntimeConfig()
      const nuxtApp = useNuxtApp()
      const { locale: localeRef } = useLocale();
      const locale = localeRef.value

      // Clean up empty params
      const queryParams: Record<string, any> = {
        locale,
        ...Object.fromEntries(
          Object.entries(params).filter(([_, v]) => v !== undefined && v !== null && v !== '')
        )
      }

      return await $fetch<EventsResponse>('/api/v1/events', {
        baseURL: config.public.apiBase || '',
        query: queryParams
      })
    } catch (error) {
      console.warn('Failed to fetch events list API.', error)
      return null
    }
  },

  async getEventBySlug(slug: string, query: { locale?: string } = {}): Promise<EventItem | null> {
    try {
      const config = useRuntimeConfig()
      const { locale: localeRef } = useLocale()
      const locale = query.locale || localeRef.value

      const response = await $fetch<any>(`/api/v1/events/${slug}`, {
        baseURL: config.public.apiBase || '',
        query: { locale }
      })

      // Standard Laravel response wrapping check
      if (response && response.data) {
        return response.data as EventItem
      }
      return response as EventItem
    } catch (error: any) {
      if (error.response?.status === 404) return null
      console.warn(`Failed to fetch event detail API for slug: ${slug}`, error)
      return null
    }
  }
}
