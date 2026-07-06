import { computed, watch } from 'vue'
import { useAsyncData } from '#imports'
import { useMenuStore } from '~/stores/menu'
import { menuService } from '~/services/menu'
import { useI18n } from 'vue-i18n'
import type { MenuItem, FooterMenuGroup } from '~/types/menu'

export const useMenus = () => {
  const store = useMenuStore()
  const { locale } = useLocale()
  
  const fetchHeaderMenus = async () => {
    store.isLoadingHeader = true
    
    const { data, error } = await useAsyncData<MenuItem[]>(`menus-header-${locale.value}`, () => menuService.getMenus<MenuItem[]>({
      position: 'header',
      locale: locale.value
    }), {
      lazy: false,
      server: true,
      watch: [locale]
    })
    
    watch(data, (newMenus) => {
      if (newMenus) {
        store.setHeaderMenus(newMenus)
      }
      store.isLoadingHeader = false
    }, { immediate: true })
    
    if (error.value) {
      store.setHeaderError()
    }
    
    return store.headerMenus
  }
  
  const fetchFooterMenus = async () => {
    store.isLoadingFooter = true
    
    const { data, error } = await useAsyncData<FooterMenuGroup[]>(`menus-footer-${locale.value}`, () => menuService.getMenus<FooterMenuGroup[]>({
      position: 'footer',
      locale: locale.value
    }), {
      lazy: false,
      server: true,
      watch: [locale]
    })
    
    watch(data, (newMenus) => {
      if (newMenus) {
        store.setFooterMenus(newMenus)
      }
      store.isLoadingFooter = false
    }, { immediate: true })
    
    if (error.value) {
      store.setFooterError()
    }
    
    return store.footerMenus
  }
  
  return {
    fetchHeaderMenus,
    fetchFooterMenus,
    headerMenus: computed(() => store.headerMenus),
    footerMenus: computed(() => store.footerMenus),
    isLoadingHeader: computed(() => store.isLoadingHeader),
    isLoadingFooter: computed(() => store.isLoadingFooter),
    isHeaderLoaded: computed(() => store.isHeaderLoaded),
    isFooterLoaded: computed(() => store.isFooterLoaded),
    hasHeaderError: computed(() => store.hasHeaderError),
    hasFooterError: computed(() => store.hasFooterError)
  }
}
