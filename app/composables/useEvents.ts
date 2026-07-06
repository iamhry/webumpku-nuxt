import { computed } from 'vue'
import { useEventsStore } from '~/stores/events'
import { eventService } from '~/services/events'
import type { GetEventsParams } from '~/types/event'

export const useEvents = () => {
  const eventsStore = useEventsStore()

  const fetchEventsList = async (params: GetEventsParams = {}, append: boolean = false) => {
    eventsStore.setLoading(true)
    eventsStore.setError(null)

    try {
      const response = await eventService.getEvents(params)
      if (response && response.data) {
        if (append) {
          eventsStore.appendEvents(response.data, response.meta)
        } else {
          eventsStore.setEvents(response.data, response.meta)
        }
      } else {
        eventsStore.setError('Agenda belum dapat dimuat.')
        // Maintain empty list on error if not appending
        if (!append) {
          eventsStore.setEvents([], { current_page: 1, last_page: 1, total: 0 })
        }
      }
    } catch (err) {
      eventsStore.setError('Agenda belum dapat dimuat.')
      if (!append) {
        eventsStore.setEvents([], { current_page: 1, last_page: 1, total: 0 })
      }
    } finally {
      eventsStore.setLoading(false)
    }
  }

  const fetchEventDetail = async (slug: string) => {
    eventsStore.setLoading(true)
    eventsStore.setError(null)

    try {
      const event = await eventService.getEventBySlug(slug)
      if (event) {
        eventsStore.setCurrentEvent(event)
      } else {
        eventsStore.setError('Agenda tidak ditemukan.')
      }
    } catch (err) {
      eventsStore.setError('Agenda tidak ditemukan.')
    } finally {
      eventsStore.setLoading(false)
    }
  }

  return {
    events: computed(() => eventsStore.events),
    currentEvent: computed(() => eventsStore.currentEvent),
    meta: computed(() => eventsStore.meta),
    loading: computed(() => eventsStore.loading),
    error: computed(() => eventsStore.error),
    fetchEventsList,
    fetchEventDetail
  }
}
