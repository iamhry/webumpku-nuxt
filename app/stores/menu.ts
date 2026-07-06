import { defineStore } from 'pinia'
import type { MenuItem, FooterMenuGroup } from '~/types/menu'

export const useMenuStore = defineStore('menu', {
  state: () => ({
    headerMenus: [] as MenuItem[],
    footerMenus: [] as FooterMenuGroup[],
    isHeaderLoaded: false,
    isFooterLoaded: false,
    isLoadingHeader: false,
    isLoadingFooter: false,
    hasHeaderError: false,
    hasFooterError: false
  }),
  actions: {
    setHeaderMenus(data: MenuItem[]) {
      this.headerMenus = data
      this.isHeaderLoaded = true
      this.hasHeaderError = false
    },
    setFooterMenus(data: FooterMenuGroup[]) {
      this.footerMenus = data
      this.isFooterLoaded = true
      this.hasFooterError = false
    },
    setHeaderError() {
      this.hasHeaderError = true
      this.isLoadingHeader = false
    },
    setFooterError() {
      this.hasFooterError = true
      this.isLoadingFooter = false
    }
  }
})
