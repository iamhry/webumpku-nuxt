import { defineStore } from 'pinia'
import type { SiteSettings } from '~/types/settings'

export const useSettingsStore = defineStore('settings', {
  state: (): { settings: Partial<SiteSettings> } => ({
    settings: {
      site_name: 'Universitas',
      site_short_name: 'Univ',
      logo: '/assets/img/logo.png',
      logo_white: '/assets/img/logo-white.png',
      favicon: '/favicon.ico',
      address: '66, Broklyn St, New York, USA',
      email: 'info@dustrian.com',
      phone: '',
      whatsapp: '',
      facebook: '#',
      instagram: '#',
      youtube: '#',
      linkedin: '#',
      default_locale: 'en'
    }
  }),
  actions: {
    setSettings(data: SiteSettings) {
      this.settings = { ...this.settings, ...data }
    }
  }
})
