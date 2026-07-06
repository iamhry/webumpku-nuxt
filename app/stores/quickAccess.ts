import { defineStore } from 'pinia'

export const useQuickAccessStore = defineStore('quickAccess', {
  state: () => ({
    isOpen: false
  }),
  actions: {
    toggle() {
      this.isOpen = !this.isOpen
    },
    open() {
      this.isOpen = true
    },
    close() {
      this.isOpen = false
    }
  }
})
