import type { PageSection } from '~/types/page'

const ITEM_ONLY_TYPES = [
  'feature_cards',
  'timeline',
  'downloads',
  'cards',
  'statistics',
  'stats',
  'faq',
] as const

const RELATED_TYPES = [
  'related_news',
  'related_events',
  'related_sdgs',
  'related_research',
  'related_partnerships',
  'contact',
] as const

function settingsObj(section: PageSection): Record<string, any> {
  const s = section.settings
  return s && !Array.isArray(s) && typeof s === 'object' ? s : {}
}

function hasVideoSource(section: PageSection): boolean {
  const s = settingsObj(section)
  const videoUrl =
    s.video_file ||
    s.video_url ||
    s.youtube_url ||
    (section as any).video_url ||
    section.image ||
    ''
  const hasIframe = !!section.content?.includes('<iframe')
  return !!(videoUrl || hasIframe)
}

/**
 * Whether a CMS page section should render in production (or always in preview).
 */
export function shouldShowPageSection(section: PageSection | null | undefined, preview = false): boolean {
  if (!section) return false
  if (preview) return true

  const type = section.type
  const hasItems = !!(section.items && section.items.length > 0)

  if ((ITEM_ONLY_TYPES as readonly string[]).includes(type)) {
    return hasItems
  }

  if (type === 'gallery') {
    return !!(section.items?.some(item => !!item.image))
  }

  if ((RELATED_TYPES as readonly string[]).includes(type)) {
    return !!(section.title || section.subtitle || hasItems)
  }

  if (type === 'rich_text' || type === 'content') {
    return !!(section.content || section.title || section.subtitle)
  }

  if (type === 'cta') {
    return !!(section.title || section.button_text || section.button_url)
  }

  if (type === 'video') {
    return hasVideoSource(section)
  }

  if (type === 'hero') return true

  if (type === 'image_text') {
    return !!(section.title || section.subtitle || section.content || section.image)
  }

  return !!(section.content || hasItems || section.title || section.image)
}

export function sortPageSections(sections: PageSection[]): PageSection[] {
  return [...sections].sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))
}

export function usePageSections() {
  const route = useRoute()

  const isPreview = computed(() => {
    const q = route.query.preview
    return q === '1' || q === 'true' || q === 'yes'
  })

  const filterSections = (sections: PageSection[] | null | undefined) => {
    if (!sections?.length) return []
    return sortPageSections(sections).filter(s => shouldShowPageSection(s, isPreview.value))
  }

  return {
    isPreview,
    filterSections,
    shouldShowPageSection,
  }
}
