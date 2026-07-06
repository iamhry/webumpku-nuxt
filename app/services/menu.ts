import type { MenuItem, FooterMenuGroup } from '~/types/menu'

export interface GetMenuParams {
  position?: string
  section?: string
  locale?: string
}

export const menuService = {
  /**
   * Fetch all menus from backend
   */
  async getMenus<T = MenuItem[]>(params: GetMenuParams = {}): Promise<T> {
    const config = useRuntimeConfig()
    try {
      const response = await $fetch<{ data: T }>('/api/v1/menus', {
        baseURL: config.public.apiBase || '',
        params
      })
      return response.data as T
    } catch (e) {
      console.error('Failed to fetch menus:', e)
      return [] as any as T
    }
  }
}
