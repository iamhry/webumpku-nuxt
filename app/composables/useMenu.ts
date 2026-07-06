import { computed } from 'vue'
import { useAsyncData } from '#imports'
import { useMenuStore } from '~/stores/menu'
import { menuService } from '~/services/menu'

export const useMenu = () => {
  const store = useMenuStore()
  
  const fetchMenus = async () => {
    // If we already have the menus cached, return them immediately
    if (store.isLoaded) return store.menus
    
    store.isLoading = true
    
    // SSR safe fetch (lazy: false to ensure it renders on server)
    const { data, error } = await useAsyncData('main-menus', () => menuService.getMenus(), {
      lazy: false,
      server: true
    })
    
    // Once data resolves (on server or client), save it to store
    watch(data, (newMenus) => {
      if (newMenus) {
        store.setMenus(newMenus)
      }
      store.isLoading = false
    }, { immediate: true })
    
    if (error.value) {
      store.setError()
    }
    
    return store.menus
  }
  
  return {
    fetchMenus,
    menus: computed(() => store.menus),
    isLoading: computed(() => store.isLoading),
    isLoaded: computed(() => store.isLoaded),
    hasError: computed(() => store.hasError)
  }
}
