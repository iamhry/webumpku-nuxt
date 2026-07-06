import { defineStore } from 'pinia'
import type { Reputation } from '~/types/reputation'

interface ReputationState {
  reputations: Reputation[]
  isLoading: boolean
  error: string | null
}

export const useReputationStore = defineStore('reputation', {
  state: (): ReputationState => ({
    reputations: [],
    isLoading: false,
    error: null
  }),
  actions: {
    setReputations(data: Reputation[]) {
      this.reputations = data
    },
    setLoading(status: boolean) {
      this.isLoading = status
    },
    setError(error: string | null) {
      this.error = error
    }
  }
})
