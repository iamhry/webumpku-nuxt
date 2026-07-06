import { defineStore } from 'pinia'
import type { SdgGoal } from '~/types/sdgs'

export const useSdgsStore = defineStore('sdgs', {
  state: () => ({
    goals: [] as SdgGoal[],
    currentGoal: null as SdgGoal | null,
    meta: { current_page: 1, last_page: 1, total: 0 },
    loading: false,
    error: null as string | null,
  }),
  actions: {
    setGoals(data: SdgGoal[], meta: any) {
      this.goals = data
      if (meta) this.meta = meta
    },
    setCurrentGoal(goal: SdgGoal | null) {
      this.currentGoal = goal
    },
    setLoading(status: boolean) {
      this.loading = status
    },
    setError(err: string | null) {
      this.error = err
    }
  }
})
