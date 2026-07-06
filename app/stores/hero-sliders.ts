import { defineStore } from 'pinia'
import type { HeroSlider } from '~/types/hero-slider'
import { heroSlidersService } from '~/services/hero-sliders'

export const useHeroSlidersStore = defineStore('heroSliders', {
  state: () => ({
    sliders: [] as HeroSlider[],
    loading: false
  }),
  getters: {
    activeSlides: (state) => state.sliders
  },
  actions: {
    async loadSliders(locale?: string) {
      this.loading = true
      try {
        const response = await heroSlidersService.getHeroSliders(locale)
        if (response && response.data) {
          this.sliders = response.data
        } else {
          this.sliders = []
        }
      } catch (error) {
        console.error('Error loading hero sliders', error)
        this.sliders = []
      } finally {
        this.loading = false
      }
    }
  }
})
