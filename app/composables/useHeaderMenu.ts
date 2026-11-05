// composables/useHeaderMenu.ts
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useLocale } from '#imports'
import type { MenuItem as MenuItemType, MenuPromo, MenuType } from '~/types/menu'
import { isExternalUrl, resolveMenuType } from '~/utils/menu'

export interface HeaderMenu {
  id: number | string
  label: string
  to: string
  target?: string
  subtitle?: string | null
  menu_type: MenuType
  columns?: number | null
  icon?: string | null
  is_featured?: boolean
  promos: MenuPromo[]
  children: HeaderMenu[]
}

const MEGA_CLOSE_DELAY_MS = 160

export function useHeaderMenu(rawMenus: Ref<MenuItemType[] | undefined>) {
  const route = useRoute()
  const { locale } = useLocale()
  const openMegaId = ref<number | string | null>(null)
  let megaCloseTimer: ReturnType<typeof setTimeout> | null = null

  const clearMegaCloseTimer = () => {
    if (megaCloseTimer !== null) {
      clearTimeout(megaCloseTimer)
      megaCloseTimer = null
    }
  }

  const openMega = (id: number | string) => {
    clearMegaCloseTimer()
    openMegaId.value = id
  }

  const closeMega = () => {
    clearMegaCloseTimer()
    openMegaId.value = null
    if (import.meta.client) {
      const el = document.activeElement as HTMLElement | null
      if (el?.closest?.('.has-mega-menu')) el.blur()
    }
  }

  const scheduleCloseMega = () => {
    clearMegaCloseTimer()
    megaCloseTimer = setTimeout(() => {
      openMegaId.value = null
      megaCloseTimer = null
    }, MEGA_CLOSE_DELAY_MS)
  }

  const toggleMega = (id: number | string) => {
    clearMegaCloseTimer()
    openMegaId.value = openMegaId.value === id ? null : id
  }

  const onMegaFocusOut = (event: FocusEvent, id: number | string) => {
    const next = event.relatedTarget as Node | null
    const current = event.currentTarget as HTMLElement | null
    if (current && next && current.contains(next)) return
    if (openMegaId.value === id) scheduleCloseMega()
  }

  const getTitle = (item: MenuItemType): string => {
    if (!item) return ''
    if (typeof item.title === 'string') return item.title
    if (typeof item.title === 'object' && item.title !== null) {
      return item.title[locale.value] || item.title['id'] || Object.values(item.title)[0] || ''
    }
    return ''
  }

  const normalizeMenus = (items: MenuItemType[] = []): HeaderMenu[] => {
    return [...items]
      .sort((a, b) => ((a as any).sort_order ?? (a as any).order ?? 0) - ((b as any).sort_order ?? (b as any).order ?? 0))
      .map((item) => ({
        id: item.id,
        label: getTitle(item) || 'Menu',
        to: item.url || '#',
        target: item.target || '_self',
        subtitle: item.subtitle || null,
        menu_type: resolveMenuType(item),
        columns: item.columns ?? null,
        icon: item.icon || null,
        is_featured: !!item.is_featured,
        promos: Array.isArray(item.promos) ? [...item.promos].sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0)) : [],
        children: Array.isArray(item.children) && item.children.length
          ? normalizeMenus(item.children)
          : [],
      }))
  }

  const menus = computed<HeaderMenu[]>(() => normalizeMenus(rawMenus.value || []))
  const isMegaOpen = computed(() => openMegaId.value !== null)

  const isMegaMenuItem = (menu: HeaderMenu) => menu.menu_type === 'mega'
  const isGroupMenuItem = (menu: HeaderMenu) => menu.menu_type === 'group'

  const megaColumns = (menu: HeaderMenu) => {
    const n = Number(menu.columns)
    return Number.isFinite(n) ? Math.min(5, Math.max(2, Math.round(n))) : 3
  }

  const megaColumnGroups = (menu: HeaderMenu): HeaderMenu[] => {
    const children = menu.children || []
    const onlyGroups = children.filter(child => isGroupMenuItem(child))
    if (onlyGroups.length) return onlyGroups

    const withNested = children.filter(child => child.children.length > 0)
    if (withNested.length) return withNested

    if (!children.length) return []

    const mid = Math.ceil(children.length / 2)
    const chunks = [children.slice(0, mid), children.slice(mid)].filter(c => c.length)
    return chunks.map((chunk, index) => ({
      id: `${menu.id}-col-${index + 1}`,
      label: '',
      to: '#',
      menu_type: 'group' as const,
      promos: [],
      children: chunk,
    }))
  }

  const isInternalLink = (url?: string): boolean => {
    if (!url) return false
    return url.startsWith('/') && !url.startsWith('//')
  }

  const isActiveMenu = (menu: HeaderMenu): boolean => {
    if (menu.to && menu.to !== '#' && route.path === menu.to) return true
    return !!menu.children?.some(child => isActiveMenu(child))
  }

  return {
    menus,
    openMegaId,
    isMegaOpen,
    openMega,
    closeMega,
    toggleMega,
    scheduleCloseMega,
    onMegaFocusOut,
    isMegaMenuItem,
    megaColumns,
    megaColumnGroups,
    isInternalLink,
    isActiveMenu
  }
}