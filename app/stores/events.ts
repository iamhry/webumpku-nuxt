import { defineStore } from 'pinia'
import type { EventItem } from '~/types/event'

export const useEventsStore = defineStore('events', {
  state: () => ({
    events: [] as EventItem[],
    currentEvent: null as EventItem | null,
    meta: { current_page: 1, last_page: 1, total: 0 },
    loading: false,
    error: null as string | null,
  }),
  actions: {
    setEvents(data: EventItem[], meta: any) {
      this.events = data
      if (meta) {
        this.meta = {
          current_page: meta.current_page || 1,
          last_page: meta.last_page || 1,
          total: meta.total || 0,
        }
      }
    },
    appendEvents(data: EventItem[], meta: any) {
      this.events = [...this.events, ...data]
      if (meta) {
        this.meta = {
          current_page: meta.current_page || 1,
          last_page: meta.last_page || 1,
          total: meta.total || 0,
        }
      }
    },
    setCurrentEvent(event: EventItem | null) {
      this.currentEvent = event
    },
    setLoading(status: boolean) {
      this.loading = status
    },
    setError(err: string | null) {
      this.error = err
    }
  }
})
