import type { Menu, MenuType } from '~/types/menu'

/**
 * Resolve effective menu type from API payload (with legacy fallback).
 */
export function resolveMenuType(item: Menu | null | undefined): MenuType {
  if (!item) return 'link'

  if (item.menu_type === 'link' || item.menu_type === 'dropdown' || item.menu_type === 'mega' || item.menu_type === 'group') {
    return item.menu_type
  }

  return item.children?.length ? 'dropdown' : 'link'
}

export function isMegaMenu(item: Menu | null | undefined): boolean {
  return resolveMenuType(item) === 'mega'
}

export function isGroupMenu(item: Menu | null | undefined): boolean {
  return resolveMenuType(item) === 'group'
}

export function clampMenuColumns(columns?: number | null, fallback = 3): number {
  const value = Number(columns)
  if (!Number.isFinite(value)) return fallback
  return Math.min(5, Math.max(2, Math.round(value)))
}

export function isExternalUrl(url?: string | null): boolean {
  if (!url) return false
  return /^https?:\/\//i.test(url)
}

export function menuLinkTo(item: Pick<Menu, 'url'> | { url?: string | null }): string {
  const url = item.url?.trim()
  if (!url || url === '#') return '#'
  return url
}

export function hasMenuChildren(item: Menu | null | undefined): boolean {
  return !!(item?.children && item.children.length > 0)
}

export function getMenuTitle(
  item: Pick<Menu, 'title'> | null | undefined,
  locale = 'id',
): string {
  if (!item?.title) return ''
  if (typeof item.title === 'string') return item.title
  return item.title[locale] || item.title.id || item.title.en || ''
}
