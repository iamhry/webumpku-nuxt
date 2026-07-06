import type { ContactResponse } from '~/types/contact'

export interface GetContactParams {
  locale?: string
}

export const contactService = {
  async getContact(params: GetContactParams = {}): Promise<ContactResponse> {
    const config = useRuntimeConfig()
    try {
      const response = await $fetch<ContactResponse>('/api/v1/contact', {
        baseURL: config.public.apiBase || '',
        params,
      })
      return response
    } catch (e) {
      console.error('Failed to fetch contact data:', e)
      return {
        main_location: null,
        locations: [],
        social_media: {
          facebook: null,
          instagram: null,
          youtube: null,
          linkedin: null,
          tiktok: null,
          twitter: null,
        },
      }
    }
  },
}
