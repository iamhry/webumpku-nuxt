import type { PageSection } from '~/types/page'
import {
  hasMeaningfulHtml,
  sectionHasResolvableItems,
} from '~/composables/usePageSectionData'

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

const AUTO_FETCH_RELATED = [
  'related_news',
  'related_events',
  'related_sdgs',
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
  const hasItems = sectionHasResolvableItems(section)

  if ((ITEM_ONLY_TYPES as readonly string[]).includes(type)) {
    return hasItems
  }

  if (type === 'gallery') {
    return !!(section.items?.some(item => !!item.image))
  }

  // Related news/events/sdgs can auto-fetch when items are empty
  if ((AUTO_FETCH_RELATED as readonly string[]).includes(type)) {
    return true
  }

  if ((RELATED_TYPES as readonly string[]).includes(type)) {
    return !!(section.title || section.subtitle || hasItems)
  }

  if (type === 'rich_text' || type === 'content') {
    return !!(
      hasMeaningfulHtml(section.content) ||
      section.title ||
      section.subtitle ||
      section.image
    )
  }

  if (type === 'cta') {
    return !!(section.title || section.button_text || section.button_url)
  }

  if (type === 'video') {
    return hasVideoSource(section)
  }

  if (type === 'hero') return true

  if (type === 'image_text') {
    return !!(
      section.title ||
      section.subtitle ||
      hasMeaningfulHtml(section.content) ||
      section.image
    )
  }

  return !!(
    hasMeaningfulHtml(section.content) ||
    hasItems ||
    section.title ||
    section.image
  )
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
