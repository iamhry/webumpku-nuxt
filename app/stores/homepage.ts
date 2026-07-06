import { defineStore } from 'pinia'
import type { HomepageSection } from '~/types/homepage'
import { homepageService } from '~/services/homepage'

export const useHomepageStore = defineStore('homepage', {
  state: () => ({
    sections: [] as HomepageSection[],
    isLoading: false,
    hasLoaded: false,
  }),
  
  actions: {
    async fetchSections(locale: string = 'id', forceUpdate: boolean = false) {
      if (this.hasLoaded && !forceUpdate) return;
      
      this.isLoading = true;
      try {
        const data = await homepageService.getSections(locale);
        this.sections = data;
        this.hasLoaded = true;
      } catch (e) {
        console.error('Error in homepage store:', e);
      } finally {
        this.isLoading = false;
      }
    }
  }
})
