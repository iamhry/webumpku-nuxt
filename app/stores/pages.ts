import { defineStore } from 'pinia'
import type { DynamicPage } from '~/types/pages'

export const usePagesStore = defineStore('pages', {
  state: () => ({
    page: null as DynamicPage | null,
    loading: false,
    error: null as string | null,
  }),
  actions: {
    setPage(data: DynamicPage | null) {
      this.page = data
    },
    setLoading(status: boolean) {
      this.loading = status
    },
    setError(err: string | null) {
      this.error = err
    }
  }
})
